"use client";

import { useEffect } from "react";
import Script from "next/script";

type AdConfig = {
  ads_host: string;
  syndication_host: string;
  idzone: number; // replace with your zone id
  popup_fallback: boolean;
  popup_force: boolean;
  chrome_enabled: boolean;
  new_tab: boolean;
  frequency_period: number;
  frequency_count: number;
  trigger_method: number;
  trigger_class: string;
  trigger_delay: number;
  capping_enabled: boolean;
  tcf_enabled: boolean;
  only_inline: boolean;
};

export default function AdScript() {
  useEffect(() => {
    // small log to confirm script is mounted
    // remove in production if you want
    // eslint-disable-next-line no-console
    console.log("AdScript mounted — PEMSRV popunder will be loaded (if allowed).");
  }, []);

  // === UPDATE THESE VALUES: put your real zone id here ===
  const config: AdConfig = {
    ads_host: "a.pemsrv.com",
    syndication_host: "s.pemsrv.com",
    idzone: 5757610, // <-- REPLACE THIS with your real zone id from dashboard
    popup_fallback: false,
    popup_force: false,
    chrome_enabled: true,
    new_tab: false,
    frequency_period: 1,
    frequency_count: 3,
    trigger_method: 1, // 1 = document click trigger
    trigger_class: "",
    trigger_delay: 0,
    capping_enabled: true,
    tcf_enabled: true,
    only_inline: false,
  };

  // Inline config script (creates the adConfig var and calls the hosted script)
  const inlineConfig = `(function(){var adConfig=${JSON.stringify(
    config
  )};window.__pemsrv_adConfig=adConfig;})();`;

  // We will load the hosted popunder script from the ads_host.
  // The hosted script (popunder1000.js) will read data-exo-* attributes if present.
  // Inserting it dynamically also ensures it runs after page becomes interactive.
  const hostedScriptSrc = `//${config.ads_host}/popunder1000.js`;

  return (
    <>
      {/* 1) Add a small inline config so the hosted script can read it if needed */}
      <Script id="pemsrv-inline-config" strategy="afterInteractive">
        {inlineConfig}
      </Script>

      {/* 2) Load the provider script (popunder) */}
      <Script
        id="pemsrv-popunder"
        strategy="afterInteractive"
        // we use dangerouslySetInnerHTML alternative via children string
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              try{
                // Create script element and set data-exo-* attributes for config
                var s = document.createElement('script');
                s.type = 'application/javascript';
                s.async = true;
                s.src = '${hostedScriptSrc}';
                s.id = 'popmagicldr';
                // set attributes for the hosted script to read if it wants
                s.setAttribute('data-exo-idzone', '${config.idzone}');
                s.setAttribute('data-exo-ads_host', '${config.ads_host}');
                s.setAttribute('data-exo-syndication_host', '${config.syndication_host}');
                s.setAttribute('data-exo-trigger_method', '${config.trigger_method}');
                s.setAttribute('data-exo-frequency_count', '${config.frequency_count}');
                s.setAttribute('data-exo-frequency_period', '${config.frequency_period}');
                // insert near top of body
                var b = document.getElementsByTagName('body')[0];
                if(b){
                  b.insertBefore(s, b.firstChild);
                } else {
                  document.head.appendChild(s);
                }
                console.log('PEMSRV popunder script appended');
              }catch(e){
                console.error('Error injecting PEMSRV script', e);
              }
            })();
          `,
        }}
      />
    </>
  );
}


