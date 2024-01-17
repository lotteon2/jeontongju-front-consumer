import FiSrBellSVG from "/public/fi-sr-bell.svg";
import NewFiSrBellSVG from "/public/fi-sr-new-bell.svg";
import React, { useEffect, useRef, useState } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import styles from "./Noti.module.scss";
import Image from "next/image";
import notificationAPI from "@/apis/notification/notificationAPIService";
import { toast } from "react-toastify";
import { NOTI, translateNoti } from "@/constants/NotiEnum";
import { useRouter } from "next/navigation";

function Noti() {
  const router = useRouter();

  const notiRef = useRef(null);
  const [newNoti, setNewNoti] = useState<
    { notificationId: number; data: keyof typeof NOTI; redirectUrl: string }[]
  >([]);
  const [notiOpen, setNotiOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notiRef.current && !notiRef.current.contains(event.target)) {
        setNotiOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      const EventSource = EventSourcePolyfill || NativeEventSource;
      const eventSource = new EventSource(
        "https://api.jeontongju.shop/notification-service/api/notifications/connect",
        {
          headers: {
            Authorization: `${accessToken}`,
            Connection: "keep-alive",
            Accept: "text/event-stream",
          },
          heartbeatTimeout: 60000,
          withCredentials: true,
        }
      );

      eventSource.onopen = () => {
        console.log("OPEN");

        eventSource.removeEventListener("connect", () => {});
        eventSource.removeEventListener("happy", () => {});

        eventSource.addEventListener("happy", (event: any) => {
          const newNoti = event.data;
          console.log(event);
          setNewNoti((prev) => [...prev, JSON.parse(newNoti)]);
          console.log(newNoti);
        });

        eventSource.addEventListener("connect", (event: any) => {
          const newNoti = event.data;
          if (JSON.parse(newNoti).notificationId !== null) {
            setNewNoti((prev) => [JSON.parse(newNoti)]);
          }
          console.log(event);
          // setNewNoti((prev) => [JSON.parse(newNoti)]);
          console.log("SSE CONNECTED");
        });
      };

      return () => {
        eventSource.close();
        console.log("SSE CLOSED");
      };
    }
  }, []);

  const handleClickByNotificationId = async (id: number, url: string) => {
    try {
      const data = await notificationAPI.clickNoti(id);
      if (data.code === 200) {
        console.log("알림 읽음 처리 완료");
        router.replace(url);
        toast("알림이 읽음 처리되었어요");
      }
    } catch (error) {
      toast("알림 읽음 처리에 실패했어요.");
    }
  };
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
    <div ref={notiRef}>
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
          <div className={styles.alarmBox}>알림이 없어요!</div>
        ) : (
          <div className={styles.alarmBox}>
            <div className={styles.everyReadButton} onClick={handleAllRead}>
              전체 읽음
            </div>
            {newNoti.map((it, i) => (
              <div
                className={styles.alarmDiv}
                key={i}
                onClick={() =>
                  handleClickByNotificationId(it.notificationId, it.redirectUrl)
                }
              >
                {translateNoti(it.data)}
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
