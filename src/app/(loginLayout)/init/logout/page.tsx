"use client";
import { useMyInfoStore } from "@/app/store/myInfo/myInfo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  const [setIsLogin] = useMyInfoStore((state) => [state.dispatchIsLogin]);
  useEffect(() => {
    window.localStorage.removeItem("accessToken");
    setIsLogin(false);
    router.replace("/");
  }, []);
  return <></>;
}
