"use client";
import authAPI from "@/apis/authentication/authenticationAPIService";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import { Alert } from "@/app/_component/Alert";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import style from "@/app/(mainLayout)/mypage/myinfo/myinfo.module.css";
import EditMyInfo from "./_component/EditMyInfo/EditMyInfo";
import Withdraw from "./_component/Withdraw/Withdraw";
import { useQuery } from "@tanstack/react-query";

export default function MyInfo() {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("accessToken")) {
        toast("로그인한 유저만 접근할 수 있어요.");
        router.replace("/");
      }
    }
  }, []);

  return (
    <div className={style.myInfoPage}>
      <div className={style.menus}>
        <div
          className={selectedMenu === 1 ? style.selected : style.menu}
          onClick={() => setSelectedMenu(1)}
        >
          내 이미지 수정하기
        </div>
        <div
          className={selectedMenu === 2 ? style.selected : style.menu}
          onClick={() => setSelectedMenu(2)}
        >
          내 비밀번호 변경하기
        </div>
        <div
          className={selectedMenu === 3 ? style.selected : style.menu}
          onClick={() => setSelectedMenu(3)}
        >
          탈퇴하기
        </div>
      </div>
      <div className={style.myInfoContent}>
        {selectedMenu === 1 ? (
          <EditMyInfo />
        ) : selectedMenu === 2 ? (
          <div> </div>
        ) : selectedMenu === 3 ? (
          <Withdraw />
        ) : (
          <div>냥</div>
        )}
      </div>
    </div>
  );
}
