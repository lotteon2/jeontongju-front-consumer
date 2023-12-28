import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import styles from "./Noti.module.scss";

export default function Noti() {
  const queryClient = useQueryClient();

  const [newNotice, setNewNotice] = useState();
  const [newStatus, setStatus] = useState();
  const [newApply, setNewApply] = useState();
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
        const { data: receivedConnectData } = event;
        if (receivedConnectData === "SSE 연결이 완료되었습니다.") {
          console.log("SSE CONNECTED");
        } else {
          console.log(event);
        }
      });

      // eslint-disable-next-line
      eventSource.addEventListener("newNotice", (event: any) => {
        const newNoticeInfo: INewNotice = JSON.parse(event.data);
        setNewNotice(newNoticeInfo);
        setAnimationClass(styles["slide-in"]); // 슬라이드 애니메이션
        queryClient.invalidateQueries("noticeCnt"); // 쪽지수 업데이트
        queryClient.invalidateQueries("noticeList"); // 쪽지리스트 업데이트
        queryClient.invalidateQueries(["unreadReceiveList", 0]); // 안읽은 쪽지리스트 업데이트

        const slideOutTimer = setTimeout(() => {
          setAnimationClass(styles["slide-out"]);

          const clearNoticeTimer = setTimeout(() => {
            setNewNotice(undefined);
          }, 500);

          return () => clearTimeout(clearNoticeTimer);
        }, 5000);

        return () => clearTimeout(slideOutTimer);
      });

      eventSource.addEventListener("statusChange", (event: any) => {
        const newNoticeInfo = JSON.parse(event.data);
        setStatus(newNoticeInfo);
        setAnimationClass(styles["slide-in"]); // 슬라이드 애니메이션
        queryClient.invalidateQueries("noticeCnt"); // 쪽지수 업데이트
        queryClient.invalidateQueries("noticeList"); // 쪽지리스트 업데이트
        queryClient.invalidateQueries(["unreadReceiveList"]); // 안읽은 쪽지리스트 업데이트
        queryClient.invalidateQueries("apiCount"); // 상태 수 업데이트
        queryClient.invalidateQueries("apiStatuslist 전체"); // 상태 리스트 업데이트
        queryClient.invalidateQueries(["apiStatus"]); // 상태 리스트 업데이트

        // 5초 후에 알림 언마운트하고 상태 비우기
        const slideOutTimer = setTimeout(() => {
          setAnimationClass(styles["slide-out"]);

          const clearStatusTimer = setTimeout(() => {
            setStatus(undefined);
          }, 500);

          return () => clearTimeout(clearStatusTimer);
        }, 5000);

        return () => clearTimeout(slideOutTimer);
      });

      // eslint-disable-next-line
      eventSource.addEventListener("sse", (event: any) => {
        const newApplyInfo = JSON.parse(event.data);
        console.log("HI");
        setNewApply(newApplyInfo);
        setAnimationClass(styles["slide-in"]); // 슬라이드 애니메이션
        queryClient.invalidateQueries("noticeCnt"); // 쪽지수 업데이트
        queryClient.invalidateQueries("noticeList"); // 쪽지리스트 업데이트
        queryClient.invalidateQueries(["unreadReceiveList"]); // 안읽은 쪽지리스트 업데이트
        queryClient.invalidateQueries(["provideApplyList"]); // 제공 신청 리스트 업데이트
        queryClient.invalidateQueries(["useApplyList"]); // 제공 신청 리스트 업데이트

        // 5초 후에 알림 언마운트하고 상태 비우기
        const slideOutTimer = setTimeout(() => {
          setAnimationClass(styles["slide-out"]);

          const clearStatusTimer = setTimeout(() => {
            setStatus(undefined);
          }, 500);

          return () => clearTimeout(clearStatusTimer);
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

  const handleClose = () => {
    setAnimationClass(styles["slide-out"]);
  };

  if (!newNotice && !newStatus && !newApply) {
    return null;
  }

  if (newNotice) {
    return <div className={`${styles.background} ${animationClass}`}>...</div>;
  }

  if (newStatus) {
    return <div className={`${styles.background} ${animationClass}`}>...</div>;
  }

  if (newApply) {
    return <div className={`${styles.background} ${animationClass}`}>...</div>;
  }

  return <div>대충 종모양</div>;
}
