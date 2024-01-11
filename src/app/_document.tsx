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
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="#ffa1a1" />
        <link rel="manifest" href="../../public/manifest.json" />
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
        <meta
          name="google-signin-client_id"
          content="239926923495-3v7i8t922da18fc2ftjrgt29acp1asr5.apps.googleusercontent.com"
        />
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
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
      />
    </Html>
  );
}
