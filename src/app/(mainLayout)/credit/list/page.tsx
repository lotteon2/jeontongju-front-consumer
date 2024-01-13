"use client";
import loadingImg from "/public/loading.gif";
import Image from "next/image";
import style from "@/app/(mainLayout)/credit/list/creditList.module.css";
import { Fragment, useEffect, useState } from "react";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import {
  Credit,
  GetMyCreditListResponseData,
  Trade,
} from "@/apis/consumer/consumerAPIservice.types";
import CreditBox from "../../_component/PointCreditBox/PointCreditBox";
import { toast } from "react-toastify";
import { Button, Input } from "antd";
import paymentAPI from "@/apis/payment/paymentAPIService";
import { useRouter } from "next/navigation";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
export default function CreditList() {
  const router = useRouter();
  const [userInputMoney, setUserInputMoney] = useState<number>(0);
  const [type, setType] = useState<"charge" | "bid">("charge");

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery<
      GetMyCreditListResponseData,
      Object,
      InfiniteData<GetMyCreditListResponseData>,
      [_1: string, _2: string, _3: string],
      number
    >({
      queryKey: ["credit", "list", type],
      queryFn: ({ pageParam = 0 }) =>
        consumerAPI.getMyCreditList(type, pageParam, 10),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.histories.last === false
          ? lastPage.histories.number + 1
          : null,
      staleTime: 60 * 1000,
      gcTime: 300 * 1000,
    });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const [currentCredit, setCurrentCredit] = useState<number>();
  const [accCredit, setAccCredit] = useState<number>();
  const [useCredit, setUseCredit] = useState<number>();
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [credits, setCredits] = useState<Credit[]>();
  const [mounted, setMounted] = useState<boolean>(false);

  const handleBuyCredit = async (money: number) => {
    if (money > 10000000) {
      toast("최대 천만원까지 결제 가능해요.");
      setUserInputMoney(10000000);
      return;
    }
    const params = {
      chargeCredit: money,
      paymentType: "CREDIT",
      paymentMethod: "KAKAO",
      itemName: `크레딧 ${money}원`,
    };

    try {
      const data = await paymentAPI.buyCredit(params);
      if (data.message) {
        console.error(data.message);
      } else {
        router.replace(data.next_redirect_pc_url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={style.creditList}>
        <div className={style.creditHeader}>
          <div className={style.creditTitle}>크레딧 내역</div>
          <div>
            <div>현재 내 크레딧 | {data?.pages[0].credit || 0}</div>
            <div>총 적립 크레딧 | {data?.pages[0].totalAcc || 0}</div>
            <div>총 사용 크레딧 | {data?.pages[0].totalUse || 0}</div>
          </div>
        </div>
        <div>
          <div>크레딧 충전하기</div>
          <div className={style.credits}>
            <Button onClick={() => handleBuyCredit(10000)}>만원</Button>
            <Button onClick={() => handleBuyCredit(50000)}>오만원</Button>
            <Button onClick={() => handleBuyCredit(100000)}>십만원</Button>
            <Button onClick={() => handleBuyCredit(1000000)}>백만원</Button>
            <div className={style.credits}>
              <Input
                value={userInputMoney}
                onChange={(e) => setUserInputMoney(Number(e.target.value))}
              />
              <Button onClick={() => handleBuyCredit(userInputMoney)}>
                결제
              </Button>
            </div>
          </div>
        </div>
        <div className={style.creditBtns}>
          <div
            className={type === "charge" ? style.selectedButton : style.button}
            onClick={() => setType("charge")}
          >
            충전 내역
          </div>
          <div
            className={type === "bid" ? style.selectedButton : style.button}
            onClick={() => setType("bid")}
          >
            사용 내역
          </div>
        </div>
        <div className={style.credits}>
          {!isLoading ? (
            data?.pages?.map((page, i) => (
              <Fragment key={i}>
                {page?.histories.content.map((credit) => (
                  <CreditBox params={credit} key={credit.tradeCreditId} />
                ))}
              </Fragment>
            ))
          ) : (
            <Image
              src={loadingImg}
              width={0}
              height={0}
              alt="loading"
              style={{ width: "50%", height: "50%" }}
            />
          )}
          {data?.pages[0].histories.content.length === 0 && (
            <div>내역이 없어요.</div>
          )}
        </div>
      </div>
    </>
  );
}
