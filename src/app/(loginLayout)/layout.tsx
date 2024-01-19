"use client";
import logoImg from "/public/logo.png";
import styles from "@/app/page.module.css";
import Script from "next/script";
import Link from "next/link";
import NextServer from "next/script";
import Footer from "../(mainLayout)/_component/Footer/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { usePushNotification } from "@/utils/usePushNotification";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode | typeof NextServer;
}) {
  const router = useRouter();

  const { fireNotificationWithTimeout } = usePushNotification();

  fireNotificationWithTimeout("Babble 채팅 메시지", 5000, {
    body: `냥:`,
  });

  const onMessageFCM = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;
      const app = !getApps().length
        ? initializeApp({
            apiKey: "AIzaSyA1GNxBU0SnupYmC1mg4kH_AIDWNQWZp5g",
            authDomain: "jeontongjujum-4d228.firebaseapp.com",
            projectId: "jeontongjujum-4d228",
            storageBucket: "jeontongjujum-4d228.appspot.com",
            messagingSenderId: "499842917350",
            appId: "1:499842917350:web:869b329ab1566c099eac27",
            measurementId: "G-9YFD581KH3",
          })
        : getApp();

      // const firebaseApp = initializeApp({
      //   apiKey: "AIzaSyA1GNxBU0SnupYmC1mg4kH_AIDWNQWZp5g",
      //   authDomain: "jeontongjujum-4d228.firebaseapp.com",
      //   projectId: "jeontongjujum-4d228",
      //   storageBucket: "jeontongjujum-4d228.appspot.com",
      //   messagingSenderId: "499842917350",
      //   appId: "1:499842917350:web:869b329ab1566c099eac27",
      //   measurementId: "G-9YFD581KH3",
      // });

      const messaging = getMessaging(app);

      getToken(messaging, {
        vapidKey:
          "BGbg4JO9g6cuz-h7WYhIduveZuXRHX9HSXvu0gylq-FEhNTkt58kVYhp6skOd1ZbfmPTRddiZHK0m9FtZ4JS0wo",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log(currentToken);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });

      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
      });
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    onMessageFCM();
  });
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
