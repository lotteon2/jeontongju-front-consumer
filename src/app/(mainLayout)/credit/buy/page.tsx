"use client";
import paymentAPI from "@/apis/payment/paymentAPIService";
import { useRouter } from "next/navigation";

export default function BuyCredit() {
  const router = useRouter();
  const handleBuyCredit = async () => {
    const params = {
      chargeCredit: 2000,
      paymentType: "CREDIT",
      paymentMethod: "KAKAO",
      itemName: "크레딧 2000원",
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
    <div>
      <button onClick={handleBuyCredit}>크레딧 결제</button>
    </div>
  );
}
