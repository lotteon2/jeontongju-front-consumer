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
          heartbeatTimeout: 6000000,
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
          console.log("DATA");
          console.log(newNoti.data);
          if (typeof Notification !== "undefined") {
            new Notification("전통주점", {
              badge:
                "https://github.com/lotteon2/jeontongju-front-consumer/assets/72402747/0c2d1ad9-36bf-4024-93d8-434617c5791e",
              icon: "https://github.com/lotteon2/jeontongju-front-consumer/assets/72402747/0c2d1ad9-36bf-4024-93d8-434617c5791e",
              body: translateNoti(newNoti.data),
            });
          }
        });

        eventSource.addEventListener("connect", (event: any) => {
          const newNoti = event.data;
          if (JSON.parse(newNoti).notificationId !== null) {
            setNewNoti((prev) => [JSON.parse(newNoti)]);
          }
          console.log(event);
        });
      };

      return () => {
        eventSource.close();
        console.log("SSE CLOSED");
      };
    }
  }, []);

  const handleClickByNotificationId = async (
    id: number,
    url: string,
    notiType: keyof typeof NOTI
  ) => {
    try {
      const data = await notificationAPI.clickNoti(id);
      if (data.code === 200) {
        if (
          notiType === "SUCCESS_SUBSCRIPTION_PAYMENTS" ||
          notiType === "INTERNAL_ORDER_SERVER_ERROR" ||
          notiType === "INTERNAL_CONSUMER_SERVER_ERROR" ||
          notiType === "INTERNAL_PAYMENT_SERVER_ERROR" ||
          notiType === "INTERNAL_COUPON_SERVER_ERROR" ||
          notiType === "INTERNAL_PRODUCT_SERVER_ERROR"
        ) {
          const filteredNoti = newNoti.filter(
            (item) => item.notificationId !== id
          );
          setNewNoti(filteredNoti);
          window.location.href = data.data.redirectUrl;
        }
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
                  handleClickByNotificationId(
                    it.notificationId,
                    it.redirectUrl,
                    it.data
                  )
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
