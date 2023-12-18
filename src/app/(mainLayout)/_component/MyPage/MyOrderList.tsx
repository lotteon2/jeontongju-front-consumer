"use client";
import orderAPI from "@/apis/order/orderAPIService";
import LoadingImg from "/public/loading.gif";
import MyOrderBox from "./MyOrderBox/MyOrderBox";
import Image from "next/image";
import { GetMyOrderListResponseData } from "@/apis/order/orderAPIService.types";
import { useEffect, useState } from "react";

async function getOrderList() {
  const { data } = await orderAPI.getMyOrderList(0, 10, false);
  return { data };
}

export default function MyOrderList() {
  const [content, setContent] = useState<GetMyOrderListResponseData[]>();
  const getMyOrderList = async () => {
    const { data } = await getOrderList();
    setContent(data.content as GetMyOrderListResponseData[]);
    console.log(data.content);
  };
  useEffect(() => {
    getMyOrderList();
  }, []);
  return (
    <>
      {content ? (
        content.map((it) => <MyOrderBox params={it} key={it.order.ordersId} />)
      ) : (
        <Image
          src={LoadingImg}
          alt="jeontongju-notfound"
          width={0}
          height={0}
          style={{ cursor: "pointer", width: "80%", height: "80%" }}
        />
      )}
    </>
  );
}
