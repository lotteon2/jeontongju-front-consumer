"use client";
import authAPI from "@/apis/authentication/authenticationAPIService";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import { Alert } from "@/app/_component/Alert";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function MyInfo() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("accessToken")) {
        toast("로그인한 유저만 접근할 수 있어요.");
        router.replace("/");
      }
    }
  }, []);

  const handleWithDrawalAlert = async () => {
    try {
      Alert({
        title: "정말로 탈퇴하시겠어요?",
        text: "탈퇴시 철회할 수 없어요.",
        submitBtnText: "탈퇴하기",
      }).then((res) => {
        if (res.isConfirmed) handleWithDrawal();
      });
    } catch (err) {
      toast("탈퇴에 실패했어요.");
    }
  };

  const handleWithDrawal = async () => {
    try {
      const data = await authAPI.withdrawal();
      if (data.code === 200) {
        toast("회원 탈퇴가 완료되었어요.");
        localStorage.removeItem("accessToken");
        router.replace("/init/signin");
      }
    } catch (error) {}
  };

  return (
    <div>
      <div onClick={handleWithDrawalAlert}>회원 탈퇴</div>
    </div>
  );
}
