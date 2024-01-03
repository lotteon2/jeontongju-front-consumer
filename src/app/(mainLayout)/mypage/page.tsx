"use client";
import MyInfoBox from "./_component/MyInfoBox/MyInfoBox";
import MyOrderList from "./_component/MyOrderList/MyOrderList";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import MyWishList from "./_component/MyWishList/MyWishList";
import { QueryClient } from "@tanstack/react-query";
import MyCartList from "./_component/MyCartList/MyCartList";
import MyReviewList from "./_component/MyReviewList/MyReviewList";

export default function MyPage() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      toast("로그인한 유저만 접근할 수 있어요.");
      router.push("/init/signin");
    }
  });

  return (
    <div>
      <MyInfoBox />
      <MyWishList />
      <MyOrderList />
      <MyCartList />
      <MyReviewList />
    </div>
  );
}
