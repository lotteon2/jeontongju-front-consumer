"use client";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import style from "@/app/(mainLayout)/_component/Header/Header.module.css";
import { useMyInfoStore } from "@/app/store/myInfo/myInfo";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Noti from "../Noti/Noti";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Input } from "antd";

const { Search } = Input;

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
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
      }
    }
    if (data?.data) {
      setMemberId(data.data.memberId);
      setIsAdult(data.data.isAdult);
      setIsRegularPayment(data.data.isRegularPayment);
    }
  }, [data]);

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.keycode === 13) {
      if (search.length < 2) {
        toast("2글자 이상 입력해주세요");
      }
      router.push(`/search?keyword=${encodeURIComponent(search)}`);
    } else {
      setSearch(e.target.value);
    }
  };

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
          {/* <Search
            placeholder="전통주점은 전상품 무료베송"
            enterButton={Search}
            size="large"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={handleSearch}
          /> */}
          <input
            type="text"
            placeholder="전통주점은 전상품 무료배송"
            className={style.input}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            value={search}
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
            <Noti />
            <Link href={"/mypage"}>마이페이지</Link>
            <Link href={"/init/logout"}>로그아웃</Link>
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
