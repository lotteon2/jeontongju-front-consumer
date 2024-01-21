"use client";
import eventHolidayImg from "/public/event_holiday.png";
import logoImg from "/public/logo.png";
import FiSrMenuBurger from "/public/fi-sr-menu-burger.svg";
import FiSrHomeSvg from "/public/fi-sr-home.svg";
import FiSrHomeActiveSvg from "/public/fi-sr-home-active.svg";
import FiSrAltSvg from "/public/fi-sr-play-alt.svg";
import FiSrAltActiveSvg from "/public/fi-sr-play-alt-active.svg";
import FiSrLiveSvg from "/public/fi-sr-live.svg";
import FiSrLiveActiveSvg from "/public/fi-sr-live-active.svg";
import FiSrSellersSvg from "/public/fi-sr-sellers.svg";
import FiSrSellersActiveSvg from "/public/fi-sr-sellers-active.svg";
import FiSrProductsSvg from "/public/fi-sr-briefcase.svg";
import FiSrProductsActiveSvg from "/public/fi-sr-briefcase-active.svg";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import style from "@/app/(mainLayout)/_component/Header/Header.module.css";
import { useMyInfoStore } from "@/app/store/myInfo/myInfo";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useRef, useState } from "react";
import Noti from "../Noti/Noti";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import searchAPI from "@/apis/search/searchAPIService";
import { Modal } from "antd";

const Header = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(
    typeof window !== "undefined"
      ? localStorage.getItem("isModalOpen") === "false"
        ? false
        : true
      : true
  );
  const pathname = usePathname();
  const searchRef = useRef(null);
  const [search, setSearch] = useState<string>("");
  const [placeHolder, setPlaceHolder] =
    useState<string>("전통주점에게 뭐든 물어보세요");
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(true);
  const { data } = useQuery({
    queryKey: ["consumer", "myinfo"],
    queryFn: () => consumerAPI.getMyInfoForStore(),
  });

  const { data: autoSearchKeyword, refetch } = useQuery({
    queryKey: ["search", "keyword", search],
    queryFn: () => searchAPI.getAutoCompleteForSearch(search),
  });

  const [
    setMemberId,
    isLogin,
    setIsLogin,
    setIsAdult,
    setIsRegularPayment,
    setIsPaymentReservation,
  ] = useMyInfoStore((state) => [
    state.dispatchMemberId,
    state.isLogin,
    state.dispatchIsLogin,
    state.dispatchIsAdult,
    state.dispatchIsRegularPayment,
    state.dispatchIsPaymentReservation,
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
      setIsPaymentReservation(data.data.isPaymentReservation);
      if (!data?.data.name) {
        router.replace("/init/adult");
      }
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchBarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.keycode === 13) {
      router.push(`/search?keyword=${encodeURIComponent(search)}`);
      setIsSearchBarOpen(false);
    } else {
      setSearch(e.target.value);
      setIsSearchBarOpen(true);
    }
  };
  const clearPlaceholder = () => {
    setPlaceHolder("");
  };

  return (
    <div className={style.header}>
      <div className={style.headerTop}>
        <div onClick={() => router.push("/")}>
          <Image
            src={logoImg}
            width={0}
            height={0}
            priority
            alt="logo"
            layout="fixed"
            className={style.logo}
          />
        </div>
        <div className={style.searchContainer} ref={searchRef}>
          <input
            type="text"
            placeholder={placeHolder}
            className={style.input}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            value={search}
            onFocus={clearPlaceholder}
          />
          <div
            onClick={handleSearch}
            style={{
              position: "absolute",
              right: "20px",
              cursor: "pointer",
              display: "flex",
            }}
          >
            <Image
              alt="search"
              width={32}
              height={32}
              style={{
                width: "1.5rem",
                height: "1.5rem",
              }}
              src="https://static.lotteon.com/p/common/foCommon/assets/img/icon_search_black.svg"
            />
          </div>

          {autoSearchKeyword?.data?.length > 0 && isSearchBarOpen && (
            <div className={style.autoSearchContainer}>
              {autoSearchKeyword?.data.map((it) => (
                <ul
                  key={it.productId}
                  style={{ listStyle: "none", padding: "0", cursor: "pointer" }}
                  onClick={() => router.push(`/product/${it.productId}`)}
                >
                  <li className={style.autoSearchData}>
                    <div>
                      <Image
                        src={it.productThumbnailImageUrl}
                        alt="img"
                        width={30}
                        height={30}
                        style={{
                          position: "absolute",
                          right: "5px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div>{it.productName}</div>
                  </li>
                </ul>
              ))}
            </div>
          )}
        </div>
        <div className={style.headerRight}>
          {isLogin ? (
            <>
              <Noti />
              <Link
                href={"/mypage"}
                style={{
                  color: pathname.startsWith("/mypage") ? "red" : "black",
                }}
              >
                마이페이지
              </Link>
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
      <div>
        <div className={style.topnav}>
          <Link href={"/"} className={style.menu}>
            <Image
              alt="search"
              width={32}
              height={32}
              src={FiSrHomeSvg}
              className={style.headerImgButton}
            />
            <div className={style.categoryMenu}>홈</div>
          </Link>
          <Link href={"/product/list"} className={style.menu}>
            <Image
              alt="products"
              width={32}
              height={32}
              src={
                pathname.startsWith("/product")
                  ? FiSrProductsActiveSvg
                  : FiSrProductsSvg
              }
              className={style.headerImgButton}
            />
            <div className={style.categoryMenu}>전체 상품</div>
          </Link>
          <Link href={"/shorts/list"} className={style.menu}>
            <Image
              alt="products"
              width={32}
              height={32}
              className={style.headerImgButton}
              src={
                pathname.startsWith("/shorts") ? FiSrAltActiveSvg : FiSrAltSvg
              }
            />
            <div className={style.categoryMenu}>쇼츠</div>
          </Link>
          <Link href={"/seller/list"}>
            <Image
              alt="products"
              width={32}
              height={32}
              className={style.headerImgButton}
              src={
                pathname.startsWith("/seller")
                  ? FiSrSellersActiveSvg
                  : FiSrSellersSvg
              }
            />
            <div className={style.categoryMenu}>주모</div>
          </Link>
          <Link href={"/auction/list"}>
            <Image
              alt="products"
              width={32}
              height={32}
              className={style.headerImgButton}
              src={
                pathname.startsWith("/auction")
                  ? FiSrLiveActiveSvg
                  : FiSrLiveSvg
              }
            />
            <div className={style.categoryMenu}>라이브</div>
          </Link>
        </div>
      </div>
      <Modal
        onCancel={() => {
          setIsModalOpen(false);
          localStorage.setItem("isModalOpen", "false");
        }}
        open={isModalOpen}
        destroyOnClose
        afterClose={() => {
          setIsModalOpen(false);
          localStorage.setItem("isModalOpen", "false");
        }}
        maskClosable={false}
        footer={null}
      >
        <div
          role="dialog"
          aria-label="이벤트 팝업"
          onClick={() => {
            setIsModalOpen(false);
            localStorage.setItem("isModalOpen", "false");
            router.push("/event/holiday");
          }}
        >
          <Image
            src={eventHolidayImg}
            width={1000}
            height={1000}
            alt="holiday"
            priority
            style={{ width: "20rem", height: "25rem" }}
          />
        </div>
      </Modal>
    </div>
  );
};
export default React.memo(Header);
