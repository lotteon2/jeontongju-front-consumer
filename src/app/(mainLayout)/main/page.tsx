"use client";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import orderAPI from "@/apis/order/orderAPIService";
import { useEffect } from "react";

async function getOrderList() {
  const { data } = await orderAPI.getMyOrderList(0, 10, false);
  return {
    data,
  };
}

export default function MainPage() {
  console.log(consumerAPI.getMyInfo());
  // console.log(getOrderList());
  useEffect(() => {
    getOrderList();
  }, []);
  return <div>MYPAGE</div>;
}
