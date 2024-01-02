"use client";
import orderAPI from "@/apis/order/orderAPIService";
import LoadingImg from "/public/loading.gif";
import MyOrderBox from "../MyOrderBox/MyOrderBox";
import Image from "next/image";
import { GetMyOrderListResponseData } from "@/apis/order/orderAPIService.types";
import { useEffect, useState } from "react";
import style from "@/app/(mainLayout)/mypage/_component/MyList.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

async function getOrderList() {
  const { data } = await orderAPI.getMyOrderList(0, 10, false);
  return { data };
}

export default function MyOrderList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [content, setContent] = useState<GetMyOrderListResponseData[]>();
  const router = useRouter();

  const getMyOrderList = async () => {
    try {
      setIsLoading(true);
      const { data } = await getOrderList();
      setContent(data.content as GetMyOrderListResponseData[]);
    } catch (err) {
      toast("내 주문 내역을 불러오는데 실패했어요");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyOrderList();
  }, []);

  return (
    <div className={style.list}>
      <div className={style.listHeader}>
        <h2>나의 주문 내역</h2>
        <div
          className={style.goDetail}
          onClick={() => router.push("/mypage/myorder")}
        >
          자세히 보기
        </div>
      </div>
      {!isLoading ? (
        content ? (
          content
            .slice(0, 5)
            .map((it) => <MyOrderBox params={it} key={it.order.ordersId} />)
        ) : (
          <div>주문 내역이 없어요.</div>
        )
      ) : (
        <Image
          src={LoadingImg}
          alt="jeontongju-notfound"
          width={0}
          height={0}
          style={{ cursor: "pointer", width: "80%", height: "80%" }}
        />
      )}
    </div>
  );
}
