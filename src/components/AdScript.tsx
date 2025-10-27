"use client";
import Script from "next/script";
import { useEffect } from "react";

export default function AdScript() {
  useEffect(() => {
    // ExoClick ke script ko reload karne ke liye
    if (typeof window !== "undefined" && (window as any).ExoLoader) {
      (window as any).ExoLoader.load();
    }
  }, []);

  return (
    <>
      {/* ✅ Load ExoClick script */}
      <Script
        id="exoclick-script"
        src="https://a.exdynsrv.com/ad-provider.js"
        strategy="afterInteractive"
      />

      {/* ✅ Ye hai actual ad placement */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <ins
          className="eas6a97888e"
          data-zoneid="5757610" // <-- yahan apna ExoClick zone ID daal
          style={{ display: "block", width: "300px", height: "250px" }}
        ></ins>
      </div>
    </>
  );
}
