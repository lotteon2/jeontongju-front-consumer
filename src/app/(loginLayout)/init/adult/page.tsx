"use client";
import { useState } from "react";
import adultValidImg from "/public/adultValid.png";
import Image from "next/image";
import { toast } from "react-toastify";
import authAPI from "@/apis/authentication/authenticationAPIService";
import { useRouter } from "next/navigation";
import { Steps } from "antd";
import Script from "next/script";
import style from "@/app/page.module.css";

export default function Adult() {
  const router = useRouter();

  const callback = async (response: any) => {
    const { success, error_msg: errorMsg, imp_uid: responseImpUid } = response;

    if (success) {
      const data = await authAPI.adultCheckAfterLogin(responseImpUid);
      if (data.code === 200) {
        toast("성인인증이 완료되었어요.");
        router.replace("/");
      }
    } else {
      toast("성인인증에 실패했어요.");
    }
  };

  const handleAdultValid = async () => {
    if (!window.IMP) return;
    console.log(window);
    const { IMP } = window;
    IMP.init(process.env.NEXT_PUBLIC_INICIS);
    const data = {
      pg: "inicis_unified",
      popup: true,
    };

    IMP.certification(data, callback);
  };

  return (
    <>
      <Script src="https://code.jquery.com/jquery-1.12.4.min.js" async />
      <Script src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js" async />
      <div className={style.adultPage}>
        <Steps
          current={1}
          items={[
            {
              title: "🤝 소셜 로그인",
              description: "전통주점과 인연 맺기!",
            },
            {
              title: "🍶 성인인증",
              description: "전통주점은 19세 이상만 이용가능해요!",
            },
            {
              title: "🎉 완료",
              description: "전통주점에서 다양한 전통주를 만나보세요!",
            },
          ]}
        />
        <Image
          alt="adultValidImg"
          width={1000}
          height={1000}
          src={adultValidImg}
          style={{ cursor: "pointer", width: "100%", height: "auto" }}
          onClick={handleAdultValid}
        />
      </div>
    </>
  );
}
