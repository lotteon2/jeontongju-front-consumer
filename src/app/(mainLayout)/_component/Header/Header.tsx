"use client";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import notificationAPI from "@/apis/notification/notificationAPIService";
import style from "@/app/(mainLayout)/_component/Header/Header.module.css";
import { useMyInfoStore } from "@/app/store/myInfo/myInfo";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Noti from "../Noti/Noti";
export default function Header() {
  const { data } = useQuery({
    queryKey: ["consumer", "myinfo"],
    queryFn: () => consumerAPI.getMyInfoForStore(),
  });

  const [setMemberId, isLogin, setIsLogin, setIsAdult, setIsRegularPayment] =
    useMyInfoStore((state) => [
      state.dispatchMemberId,
      state.isLogin,
      state.dispatchIsLogin,
      state.dispatchIsAdult,
      state.dispatchIsRegularPayment,
    ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("accessToken")) {
        setIsLogin(true);
        // notificationAPI.connectNoti();
      }
    }
    if (data?.data) {
      setMemberId(data.data.memberId);
      setIsAdult(data.data.isAdult);
      setIsRegularPayment(data.data.isRegularPayment);
    }
  }, [data]);

  return (
    <div className={style.header}>
      <div className={style.topnav}>
        <Link href={"/"} className={style.active}>
          Home
        </Link>
        <Link href={"/product/list"}>전체 상품</Link>
        <Link href={"/shorts/list"}>쇼츠</Link>
        <Link href={"/seller/list"}>셀러</Link>
        <Link href={"/auction/list"}>경매</Link>
        <div className={style.searchBar}>
          <input
            type="text"
            placeholder="전통주점은 전상품 무료배송"
            className={style.input}
          />
          <Image
            alt="search"
            width={32}
            height={32}
            src="https://static.lotteon.com/p/common/foCommon/assets/img/icon_search_black.svg"
          />
        </div>
      </div>
      <div className={style.headerBottom}>
        {isLogin ? (
          <>
            <Link href={"/mypage"}>마이페이지</Link>
            <Link href={"/init/logout"}>로그아웃</Link>
            <Noti />
          </>
        ) : (
          <>
            <Link href={"/init/signin"}>로그인</Link>
            <Link href={"/init/signup"}>회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
}
