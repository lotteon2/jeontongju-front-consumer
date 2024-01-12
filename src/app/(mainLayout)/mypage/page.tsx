"use client";
import MyInfoBox from "./_component/MyInfoBox/MyInfoBox";
import MyOrderList from "./_component/MyOrderList/MyOrderList";
import { useEffect } from "react";
import { Metadata, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import MyWishList from "./_component/MyWishList/MyWishList";
import { QueryClient } from "@tanstack/react-query";
import MyCartList from "./_component/MyCartList/MyCartList";
import MyReviewList from "./_component/MyReviewList/MyReviewList";
import { Anchor } from "antd";
import style from "@/app/(mainLayout)/mypage/mypage.module.css";
import MyAuctionList from "./_component/MyAuctionList/MyAuctionList";

export default function MyPage() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      toast("로그인한 유저만 접근할 수 있어요.");
      router.push("/init/signin");
    }
  });

  return (
    <div className={style.myPage}>
      <MyInfoBox />
      <div className={style.myPageBody}>
        <Anchor
          className={style.leftBar}
          affix={true}
          items={[
            {
              key: "1",
              href: "#myWish",
              title: "찜 내역",
            },
            {
              key: "2",
              href: "#myOrder",
              title: "주문 내역",
            },
            {
              key: "3",
              href: "#myCart",
              title: "장바구니 내역",
            },
            {
              key: "3",
              href: "#myReview",
              title: "리뷰 내역",
            },
            {
              key: "4",
              href: "#myAuction",
              title: "경매 내역",
            },
          ]}
        />
        <div className={style.rightBar}>
          <div id="myWish">
            <MyWishList />
          </div>
          <div id="myOrder">
            <MyOrderList />
          </div>
          <div id="myCart">
            <MyCartList />
          </div>
          <div id="myReview">
            <MyReviewList />
          </div>
          <div id="myAuction">
            <MyAuctionList />
          </div>
        </div>
      </div>
    </div>
  );
}
