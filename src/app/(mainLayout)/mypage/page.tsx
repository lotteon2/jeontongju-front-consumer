"use client";
import { useMyInfoStore } from "@/app/store/myInfo/myInfo";
import MyInfoBox from "../_component/MyPage/MyInfoBox/MyInfoBox";
import MyOrderList from "../_component/MyPage/MyOrderList";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function MyPage() {
  const router = useRouter();

  const [isLogin] = useMyInfoStore((state) => [state.isLogin]);

  useEffect(() => {
    if (!isLogin) {
      toast("로그인한 유저만 접근할 수 있어요.");
      router.push("/404");
    }
  });
  return (
    <div>
      <MyInfoBox />
      <MyOrderList />
    </div>
  );
}
