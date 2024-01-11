"use client";
import logoImg from "/public/logo.png";
import styles from "@/app/page.module.css";
import Script from "next/script";
import Link from "next/link";
import NextServer from "next/script";
import Footer from "../(mainLayout)/_component/Footer/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode | typeof NextServer;
}) {
  const router = useRouter();
  return (
    <div className={styles.loginContainer}>
      <header className={styles.loginHeader}>
        <div onClick={() => router.push("/")}>
          <Image
            src={logoImg}
            width={0}
            height={0}
            alt="loading"
            style={{ cursor: "pointer", width: "5rem", height: "5rem" }}
          />
        </div>
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
