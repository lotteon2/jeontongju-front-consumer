"use client";
import authAPI from "@/apis/authentication/authenticationAPIService";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function MyInfo() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("accessToken")) {
        toast("로그인한 유저만 접근할 수 있어요.");
        router.replace("/init/signin");
      }
    }
  }, []);
  //TODO : alert
  const handleWithDrawal = async () => {
    try {
      const data = await authAPI.withdrawal();
      if (data.code === 200) {
        toast("회원 탈퇴가 완료되었어요.");
        router.replace("/init/signin");
      }
    } catch (error) {}
  };

  return (
    <div>
      <div onClick={handleWithDrawal}>회원 탈퇴</div>
    </div>
  );
}
