import { ReactNode } from "react";
import styles from "@/app/page.module.css";
import Script from "next/script";
import Link from "next/link";
import NextServer from "next/script";
import Footer from "../(mainLayout)/_component/Footer/Footer";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode | typeof NextServer;
}) {
  return (
    <div className={styles.loginContainer}>
      <header className={styles.loginHeader}>
        <Link href="/">LOGO</Link>
        <a href="/">LOGO</a>
      </header>
      {children}
      <Footer />
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
