import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html>
      <Head>
        <script src="https://code.jquery.com/jquery-1.12.4.min.js" async />
        <script
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
          async
        />
        <script src="https://developers.kakao.com/sdk/js/kakao.js" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
