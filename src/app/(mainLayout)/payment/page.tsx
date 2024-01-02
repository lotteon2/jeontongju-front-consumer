"use client";
import paymentAPI from "@/apis/payment/paymentAPIService";
import { useRouter, useSearchParams } from "next/navigation";

export default function Payment() {
  const router = useRouter();
  const params = useSearchParams();
  const products = params.get("products");
  const totalAmount = params.get("totalAmount");
  const realAmount = params.get("realAmount");
  const handlePay = async () => {
    const params = {
      paymentType: "ORDER",
      paymentMethod: "KAKAO",
      pointUsageAmount: null,
      couponCode: null,
      couponAmount: null,
      recipientName: "최성훈",
      recipientPhoneNumber: "01012345678",
      basicAddress: "서울특별시 서대문구 연희동 블라블라",
      addressDetail: "101",
      zoneCode: "12345",
      totalAmount,
      realAmount, // 실금액 - 쿠폰금액 - 포인트금액
      titleName: "복순도가외1",
      products: Array.from(JSON.parse(products)),
    };
    try {
      const data = await paymentAPI.kakaoPay(params);
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
      <button onClick={handlePay}>결제하기</button>
    </>
  );
}
