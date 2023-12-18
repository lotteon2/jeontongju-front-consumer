import paymentAPI from "@/apis/payment/paymentAPIService";
import { useRouter } from "next/navigation";

export default function Payment() {
  const router = useRouter();
  const handlePay = async () => {
    const params = {
      paymentType: "ORDER",
      paymentMethod: "KAKAO",
      pointUsageAmount: 1500,
      couponCode: "12345-67890",
      couponAmount: 3000,
      recipientName: "최성훈",
      recipientPhoneNumber: "01012345678",
      basicAddress: "서울특별시 서대문구 연희동 블라블라",
      addressDetail: "101",
      zoneCode: "12345",
      totalAmount: 35000,
      realAmount: 30500, // 실금액 - 쿠폰금액 - 포인트금액
      titleName: "복순도가외1",
      products: [
        {
          productId: "12345-1123",
          productCount: 3,
        },
        {
          productId: "12345-98764",
          productCount: 1,
        },
      ],
    };
    try {
      const data = await paymentAPI.kakaoPay(params);
      if (data.code === 200) {
        router.replace(data.data.next_redirect_pc_url);
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
