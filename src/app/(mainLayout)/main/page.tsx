import consumerAPI from "@/apis/consumer/consumerAPIService";
import orderAPI from "@/apis/order/orderAPIService";
import { useEffect } from "react";
import { QueryClient, dehydrate } from "react-query";

async function getOrderList() {
  const { data } = await orderAPI.getMyOrderList(0, 10, false);
  return {
    data,
  };
}

export default function MainPage() {
  console.log(consumerAPI.getMyInfo());

  return <div>MYPAGE</div>;
}
