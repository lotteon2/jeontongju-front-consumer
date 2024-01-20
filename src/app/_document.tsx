"use client";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
declare global {
  interface Window {
    Kakao: any;
    IMP: any;
    dataLayer: unknown;
    gtag: unknown;
    daum: { Postcode: any };
  }
}

export default function Document() {
  if (process.env.NEXT_MANUAL_SIG_HANDLE) {
    process.on("SIGTERM", () => {
      console.log("Received SIGTERM: cleaning up");
      process.exit(0);
    });
    process.on("SIGINT", () => {
      console.log("Received SIGINT: cleaning up");
      process.exit(0);
    });
  }

  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffa1a1" />
        <link rel="manifest" href="./manifest.ts" />
        <link
          href="splashscreens/iphone5_splash.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphone6_splash.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphoneplus_splash.png"
          media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphonex_splash.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphonexr_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphonexsmax_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/ipad_splash.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/ipadpro1_splash.png"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/ipadpro3_splash.png"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/ipadpro2_splash.png"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <script
          src="https://apis.google.com/js/platform.js"
          async
          defer
        ></script>
        <script src="https://code.jquery.com/jquery-1.12.4.min.js" async />
        <script
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
          async
        />
        <script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          defer
        ></script>
        <script
          src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          async
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
      />
    </Html>
  );
}
