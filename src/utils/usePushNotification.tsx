"use client";
import { useEffect, useRef } from "react";

export const usePushNotification = () => {
  const notificationRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (
      typeof Notification !== "undefined" &&
      Notification.permission !== "granted"
    ) {
      try {
        Notification.requestPermission().then((permission) => {
          if (permission !== "granted") return;
        });
      } catch (error) {
        if (error instanceof TypeError) {
          Notification.requestPermission((permission) => {
            if (permission !== "granted") return;
          });
        } else {
          console.error(error);
        }
      }
    }
  }, []);

  if (Notification.permission !== "granted") {
    try {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") return;
      });
    } catch (error) {
      if (error instanceof TypeError) {
        Notification.requestPermission((permission) => {
          if (permission !== "granted") return;
        });
      } else {
        console.error(error);
      }
    }
  }

  const setNotificationClickEvent = () => {
    notificationRef.current.onclick = (event) => {
      event.preventDefault();
      window.focus();
      notificationRef.current.close();
    };
  };

  const setNotificationTimer = (timeout) => {
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      notificationRef.current.close();
      notificationRef.current = null;
    }, timeout);
  };

  const fireNotificationWithTimeout = (title, timeout, options = {}) => {
    if (typeof Notification === "undefined") return;
    if (Notification.permission !== "granted") return;

    const newOption = {
      badge:
        "https://github.com/lotteon2/jeontongju-front-consumer/assets/72402747/0c2d1ad9-36bf-4024-93d8-434617c5791e",
      icon: "https://github.com/lotteon2/jeontongju-front-consumer/assets/72402747/0c2d1ad9-36bf-4024-93d8-434617c5791e",
      ...options,
    };

    if (!notificationRef.current) {
      setNotificationTimer(timeout);

      notificationRef.current = new Notification(title, newOption);

      setNotificationClickEvent();
    }
  };

  return { fireNotificationWithTimeout };
};
