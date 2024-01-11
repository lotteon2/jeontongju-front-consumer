"use client";
import loadingImg from "/public/loading.gif";
import Image from "next/image";
import style from "@/app/(mainLayout)/credit/list/creditList.module.css";
import { useEffect, useState } from "react";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import { Credit, Trade } from "@/apis/consumer/consumerAPIservice.types";
import CreditBox from "../../_component/PointCreditBox/PointCreditBox";
import { toast } from "react-toastify";
import { Button, Input } from "antd";
import paymentAPI from "@/apis/payment/paymentAPIService";
import { useRouter } from "next/navigation";
export default function CreditList() {
  const router = useRouter();
  const [userInputMoney, setUserInputMoney] = useState<number>(0);
  const [type, setType] = useState<"charge" | "bid">("charge");
  const [currentCredit, setCurrentCredit] = useState<number>();
  const [accCredit, setAccCredit] = useState<number>();
  const [useCredit, setUseCredit] = useState<number>();
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [credits, setCredits] = useState<Credit[]>();
  const [mounted, setMounted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getMyCredit = async () => {
    try {
      setIsLoading(true);
      const data = await consumerAPI.getMyCreditList(type, page, size);
      setCredits((prev) => data.data?.histories.content);
      setCurrentCredit(data.data.credit);
      setAccCredit(data.data.totalAcc);
      setUseCredit(data.data.totalUse);
    } catch (err) {
      toast("크레딧 내역을 불러오는데 실패했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyCredit();
    console.log("credit", credits);
  }, [type, page, size]);

  const handleBuyCredit = async (money: number) => {
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
      {mounted && !isLoading ? (
        <div className={style.creditList}>
          <div className={style.creditHeader}>
            <div className={style.creditTitle}>크레딧 내역</div>
            <div>
              <div>현재 내 크레딧 | {currentCredit}</div>
              <div>총 적립 크레딧 | {accCredit}</div>
              <div>총 사용 크레딧 | {useCredit}</div>
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
              className={
                type === "charge" ? style.selectedButton : style.button
              }
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
            {credits?.map((credit) => (
              <CreditBox params={credit} key={credit.tradeCreditId} />
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
