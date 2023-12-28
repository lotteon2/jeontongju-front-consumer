import FiSrBellSVG from "/public/fi-sr-bell.svg";
import NewFiSrBellSVG from "/public/fi-sr-new-bell.svg";
import React, { useEffect, useState } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import styles from "./Noti.module.scss";
import Image from "next/image";
import notificationAPI from "@/apis/notification/notificationAPIService";
import { toast } from "react-toastify";

export default function Noti() {
  const [newNoti, setNewNoti] = useState<string[]>([]);
  const [notiOpen, setNotiOpen] = useState<boolean>(false);
  const [animationClass, setAnimationClass] = useState(styles["slide-in"]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      const EventSource = EventSourcePolyfill || NativeEventSource;
      const eventSource = new EventSource(
        "https://jeontongju-dev.shop/notification-service/api/notifications/connect",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Connection: "keep-alive",
            Accept: "text/event-stream",
          },
          heartbeatTimeout: 86400000,
        }
      );

      // eslint-disable-next-line
      eventSource.addEventListener("connect", (event: any) => {
        console.log(event);
        const { data: receivedConnectData } = event;
        if (receivedConnectData === "SSE 연결이 완료되었습니다.") {
          console.log("SSE CONNECTED");
        } else {
          console.log(event);
        }
      });

      // eslint-disable-next-line
      eventSource.addEventListener("happy", (event: any) => {
        console.log(event);
        const newNoti = event.data;
        console.log("HI");
        setNewNoti((prev) => [...prev, newNoti]);
        setAnimationClass(styles["slide-in"]); // 슬라이드 애니메이션

        // 5초 후에 알림 언마운트하고 상태 비우기
        const slideOutTimer = setTimeout(() => {
          setAnimationClass(styles["slide-out"]);
        }, 5000);

        return () => clearTimeout(slideOutTimer);
      });

      // return () => {
      //   eventSource.close();
      //   console.log("SSE CLOSED");
      // };
    }
    // eslint-disable-next-line
  }, []);

  // if (newNoti) {
  //   return <div className={`${styles.background} ${animationClass}`}>...</div>;
  // }

  const handleOpenNoti = () => {
    setNotiOpen((notiOpen) => !notiOpen);
  };

  const handleAllRead = async () => {
    try {
      const data = await notificationAPI.readAllNoti();
      if (data.code === 200) {
        toast("전체 읽음 처리에 성공했어요.");
      }
    } catch (error) {
      toast("전체 읽음 처리에 실패했어요");
    }
  };

  return (
    <div>
      <Image
        alt="bell"
        width={0}
        height={0}
        src={newNoti.length > 0 ? NewFiSrBellSVG : FiSrBellSVG}
        style={{
          cursor: "pointer",
          width: "1rem",
          height: "1rem",
          position: "relative",
        }}
        onClick={handleOpenNoti}
      />

      {notiOpen ? (
        newNoti.length === 0 ? (
          <div className={styles.alarmBox}>알람 확인 완료 끝!</div>
        ) : (
          <div className={styles.alarmBox}>
            <div className={styles.everyReadButton} onClick={handleAllRead}>
              전체 읽음
            </div>
            {newNoti.map((it, i) => (
              <div className={styles.alarmDiv} key={i}>
                {it}
              </div>
            ))}
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}
