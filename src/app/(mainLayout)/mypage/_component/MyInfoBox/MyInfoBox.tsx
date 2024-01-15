"use client";
import UserDefaultImg from "/public/UserDefault.png";
import type { Metadata } from "next";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import { GetMyInfoResponseData } from "@/apis/consumer/consumerAPIservice.types";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "@/app/(mainLayout)/mypage/_component//MyInfoBox/MyInfoBox.module.css";
import { useRouter } from "next/navigation";
import { useQueries, useQuery } from "@tanstack/react-query";
import Loading from "@/app/_component/Loading/Loading";

export const metadata: Metadata = {
  title: `전통주점 | 마이 페이지`,
  description: "전통주, 마침표를 찍다.",
  openGraph: {
    title: "전통주점 | 마이 페이지",
    description: "전통주, 마침표를 찍다.",
    type: "website",
    url: "https://jeontongju.shop/mypage",
    locale: "ko_KR",
  },
};

export default function MyInfoBox() {
  const router = useRouter();

  const { data: myInfo, isLoading } = useQuery({
    queryKey: ["consumer", "myinfo", "get"],
    queryFn: () => consumerAPI.getMyInfo(),
  });

  return (
    <>
      <div className={style.myInfoBox}>
        <div className={style.infoHeader}>
          <div>
            <Image
              src={myInfo?.data.profileImageUrl || UserDefaultImg}
              alt="img"
              width="100"
              height="100"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div>
            <div className={style.name}>{myInfo?.data.name}</div>
            <div>{myInfo?.data.email}</div>
            <div>{myInfo?.data.phoneNumber}</div>
            <div
              className={style.membership}
              onClick={() =>
                router.push(
                  myInfo?.data.isRegularPayments
                    ? "/membership/list"
                    : "/membership/buy"
                )
              }
            >
              {myInfo?.data.isRegularPayments ? "양반" : "나그네"}
            </div>
          </div>
          <div>
            <div
              onClick={() => router.push("/mypage/myaddress")}
              className={style.myGoDetailButton}
            >
              내 주소지 수정
            </div>
            <div
              onClick={() => router.push("/mypage/myinfo")}
              className={style.myGoDetailButton}
            >
              내 정보 수정
            </div>
          </div>
        </div>
        <div className={style.infoFooter}>
          <div
            className={style.infoDiv}
            onClick={() => router.push("/point/list")}
          >
            <div className={style.infoTitle}>포인트</div>
            <div className={style.infoDesc}>
              {myInfo?.data.point.toLocaleString()}
            </div>
          </div>
          <div
            className={style.infoDiv}
            onClick={() => router.push("/mypage/mycoupon")}
          >
            <div className={style.infoTitle}>쿠폰</div>
            <div className={style.infoDesc}>쿠폰함 가기</div>
          </div>
          <div
            className={style.infoDiv}
            onClick={() => router.push("/credit/list")}
          >
            <div className={style.infoTitle}>크레딧</div>
            <div className={style.infoDesc}>
              {myInfo?.data.credit.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </>
  );
}
