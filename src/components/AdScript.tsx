"use client";
import Script from "next/script";
import { useEffect } from "react";

export default function AdScript() {
  useEffect(() => {
    console.log("PEMSRV Popunder initialized");
  }, []);

  return (
    <>
      {/* ✅ Popunder script */}
      <Script
        id="pemsrv-popunder"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var adConfig = {
                ads_host: "a.pemsrv.com",
                syndication_host: "s.pemsrv.com",
                idzone: 5757610,
                popup_fallback: false,
                popup_force: false,
                chrome_enabled: true,
                new_tab: false,
                frequency_period: 1,
                frequency_count: 3,
                trigger_method: 1,
                trigger_class: "",
                trigger_delay: 0,
                capping_enabled: true,
                tcf_enabled: true,
                only_inline: false
              };
              (function() {
                var e = document.createElement("script");
                e.type = "application/javascript";
                e.async = true;
                e.src = "//" + adConfig.ads_host + "/popunder1000.js";
                for (var attr in adConfig) {
                  if (adConfig.hasOwnProperty(attr)) {
                    e.setAttribute("data-exo-" + attr, adConfig[attr]);
                  }
                }
                document.body.appendChild(e);
              })();
            })();
          `,
        }}
      />

      {/* ✅ Browser delegation meta */}
      <meta
        httpEquiv="Delegate-CH"
        content="Sec-CH-UA https://s.pemsrv.com; Sec-CH-UA-Mobile https://s.pemsrv.com; Sec-CH-UA-Arch https://s.pemsrv.com; Sec-CH-UA-Model https://s.pemsrv.com; Sec-CH-UA-Platform https://s.pemsrv.com; Sec-CH-UA-Platform-Version https://s.pemsrv.com; Sec-CH-UA-Bitness https://s.pemsrv.com; Sec-CH-UA-Full-Version-List https://s.pemsrv.com; Sec-CH-UA-Full-Version https://s.pemsrv.com;"
      />
    </>
  );
}

