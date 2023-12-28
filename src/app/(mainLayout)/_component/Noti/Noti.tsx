import FiSrBellSVG from "/public/fi-sr-bell.svg";
import NewFiSrBellSVG from "/public/fi-sr-new-bell.svg";
import React, { useEffect, useState } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import styles from "./Noti.module.scss";
import Image from "next/image";
import notificationAPI from "@/apis/notification/notificationAPIService";
import { toast } from "react-toastify";

function Noti() {
  const [newNoti, setNewNoti] = useState<string[]>([]);
  const [notiOpen, setNotiOpen] = useState<boolean>(false);

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

      eventSource.onopen = () => {
        console.log("OPEN");

        eventSource.addEventListener("happy", (event: any) => {
          const newNoti = event.data;
          console.log("HI");
          setNewNoti((prev) => [...prev, newNoti]);
        });

        eventSource.addEventListener("connect", (event: any) => {
          console.log(event);
          const { data: receivedConnectData } = event;
          if (receivedConnectData === "SSE 연결이 완료되었습니다.") {
            console.log("SSE CONNECTED");
          } else {
            console.log(event);
          }
        });
      };

      return () => {
        eventSource.close();
        console.log("SSE CLOSED");
      };
    }
  }, []);

  const handleOpenNoti = () => {
    setNotiOpen((notiOpen) => !notiOpen);
  };

  const handleAllRead = async () => {
    try {
      const data = await notificationAPI.readAllNoti();
      if (data.code === 200) {
        toast("전체 읽음 처리에 성공했어요.");
        setNewNoti([]);
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

export default React.memo(Noti);
