import { ReactNode } from "react";
import styles from "@/app/page.module.css";
import Script from "next/script";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      LOGIN LAYOUT
      {children}
      <Script
        src="https://code.jquery.com/jquery-1.12.4.min.js"
        strategy="worker"
        async
      />
      <Script
        src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        strategy="worker"
      />
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="worker"
      />
    </div>
  );
}
