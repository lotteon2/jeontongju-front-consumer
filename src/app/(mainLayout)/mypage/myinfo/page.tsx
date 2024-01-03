"use client";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function MyInfo() {
  const router = useRouter();

  //TODO : alert
  const handleWithDrawal = async () => {
    try {
      const data = await consumerAPI.withdrawal();
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
