"use client";
import paymentAPI from "@/apis/payment/paymentAPIService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import style from "@/app/(mainLayout)/payment/payment.module.css";

export default function Payment() {
  const router = useRouter();
  const params = useSearchParams();
  const products = JSON.parse(params.get("products"));
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
      titleName: products[0].productName,
      products: Array.from(products),
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("accessToken")) {
        router.replace("/init/signin");
        toast("로그인한 유저만 구매할 수 있어요");
      }
    }
  }, []);
  return (
    <div className={style.paymentPage}>
      <div>
        <div className={style.paymentBox}>
          <div className={style.paymentHeader}>주문 상품 총 1개</div>
          <div className={style.paymentProductBox}>
            <div>
              <Image
                src={products[0].productImg}
                alt="img"
                width={100}
                height={100}
                style={{ borderRadius: "12px" }}
              />
            </div>
            <div>
              <div className={style.productName}>{products[0].productName}</div>
              <div>{products[0].productPrice} 원</div>
              <div>{products[0].productCount} 개</div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handlePay}>결제하기</button>
    </div>
  );
}
