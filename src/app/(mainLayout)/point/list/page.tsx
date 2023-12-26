"use client";
import loadingImg from "/public/loading.gif";
import Image from "next/image";
import Link from "next/link";
import style from "@/app/(mainLayout)/point/list/pointList.module.css";
import { useEffect, useState } from "react";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import { Trade } from "@/apis/consumer/consumerAPIservice.types";
import CreditBox from "../../_component/PointCreditBox/PointCreditBox";
import { toast } from "react-toastify";
export default function PointList() {
  const [type, setType] = useState<"acc" | "use">("acc");
  const [currentPoint, setCurrentPoint] = useState<number>();
  const [accPoint, setAccPoint] = useState<number>();
  const [usePoint, setUsePoint] = useState<number>();
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [points, setPoints] = useState<Trade[]>();
  const [mounted, setMounted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getMyCredit = async () => {
    try {
      setIsLoading(true);
      const data = await consumerAPI.getMyPointList(type, page, size);
      setPoints((prev) => data.data?.histories.content);
      setCurrentPoint(data.data.point);
      setAccPoint(data.data.totalAcc);
      setUsePoint(data.data.totalUse);
    } catch (err) {
      toast("포인트 내역을 불러오는데 실패했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyCredit();
    console.log("credit", points);
  }, [type, page, size]);

  return (
    <>
      {mounted && !isLoading ? (
        <div className={style.creditList}>
          <div className={style.creditHeader}>
            <div className={style.creditTitle}>포인트 내역</div>
            <div>
              <div>현재 내 포인트 | {currentPoint}</div>
              <div>총 적립 포인트 | {accPoint}</div>
              <div>총 사용 포인트 | {usePoint}</div>
            </div>
          </div>
          <div className={style.creditBtns}>
            <div
              className={type === "acc" ? style.selectedButton : style.button}
              onClick={() => setType("acc")}
            >
              충전 내역
            </div>
            <div
              className={type === "use" ? style.selectedButton : style.button}
              onClick={() => setType("use")}
            >
              사용 내역
            </div>
          </div>
          <div className={style.credits}>
            {points?.map((point) => (
              <CreditBox params={point} key={point.tradeId} />
            ))}
          </div>
        </div>
      ) : (
        <Image
          src={loadingImg}
          width={0}
          height={0}
          alt="loading"
          style={{ cursor: "pointer", width: "50%", height: "50%" }}
        />
      )}
    </>
  );
}
