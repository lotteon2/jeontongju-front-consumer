"use client";
import paymentAPI from "@/apis/payment/paymentAPIService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import style from "@/app/(mainLayout)/payment/payment.module.css";
import MyAddressBox from "../mypage/_component/MyAddressBox/MyAddressBox";
import MyAddressAddBox from "../mypage/_component/MyAddressAddBox/MyAddressAddBox";
import { useQuery } from "@tanstack/react-query";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import couponAPI from "@/apis/coupon/couponAPIService";
import CouponBox from "../_component/CouponBox/CouponBox";
import { GetMyCouponListResponseData } from "@/apis/coupon/couponAPIService.types";

export default function Payment() {
  const router = useRouter();
  const params = useSearchParams();
  const products = JSON.parse(params.get("products"));
  const totalAmount = params.get("totalAmount");
  const realAmount = params.get("realAmount");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recipientName, setRecipientName] = useState<string>("");
  const [basicAddress, setBasicAddress] = useState<string>("");
  const [addressDetail, setAddressDetail] = useState<string>("");
  const [zonecode, setZonecode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [isUsingDefaultAddress, setIsUsingDefaultAddress] =
    useState<boolean>(false);
  const [point, setPoint] = useState<number>(null);
  const [coupon, setCoupon] = useState<GetMyCouponListResponseData>(null);

  const { data: myDefaultAddress, refetch: refetchMyAddressForOrder } =
    useQuery({
      queryKey: ["address", "default"],
      queryFn: () => consumerAPI.getMyAddressForOrder(),
    });

  const { data: myInfo, refetch: refetchMyInfo } = useQuery({
    queryKey: ["consumer", "myinfo"],
    queryFn: () => consumerAPI.getMyInfoForStore(),
  });

  const { data: myCoupons, refetch: refetchMyCoupon } = useQuery({
    queryKey: ["consumer", "myCoupon", "order"],
    queryFn: () => couponAPI.getMyCouponListForOrder(totalAmount),
  });

  const { data: myPoint, refetch: refetchMyPoint } = useQuery({
    queryKey: ["consumer", "myPoint", "order"],
    queryFn: () => consumerAPI.getMyPointForOrder(totalAmount),
  });

  const handlePay = async () => {
    const params = {
      paymentType: "ORDER",
      paymentMethod: "KAKAO",
      pointUsageAmount: point,
      couponCode: coupon?.couponCode,
      couponAmount: coupon?.discountAmount,
      recipientName: "최성훈",
      recipientPhoneNumber: "01012345678",
      basicAddress: "서울특별시 서대문구 연희동 블라블라",
      addressDetail: "101",
      zoneCode: "12345",
      totalAmount,
      realAmount: totalAmount - coupon?.discountAmount - point, // 실금액 - 쿠폰금액 - 포인트금액
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

  const handleCheckCoupon = (coupon: GetMyCouponListResponseData) => {
    setCoupon(coupon);
  };

  console.log("here", myCoupons?.data.coupons);

  const handleAddAddress = async () => {
    try {
      setIsLoading(true);
      const data = await consumerAPI.addMyAddress({
        isDefault,
        recipientPhoneNumber: phoneNumber,
        recipientName,
        zonecode,
        addressDetail,
        basicAddress,
      });
      if (data.code === 200) {
        toast("주소지가 추가되었어요.");
        setIsDefault(false);
        setRecipientName("");
        setPhoneNumber("");
        setZonecode("");
        setBasicAddress("");
        setAddressDetail("");
        refetchMyAddressForOrder();
      }
    } catch (err) {
      toast("내 주소지를 추가하는데 실패했어요");
    } finally {
      setIsLoading(false);
    }
  };

  const isDisableToAddAddress = () => {
    if (
      !recipientName ||
      !basicAddress ||
      !zonecode ||
      !phoneNumber ||
      !recipientName
    )
      return true;
    return false;
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
        <div className={style.paymentBox}>
          <div className={style.paymentHeader}>배송지</div>
          <div>
            {isUsingDefaultAddress && myDefaultAddress ? (
              <MyAddressBox
                item={myDefaultAddress?.data}
                refetch={refetchMyAddressForOrder}
              />
            ) : (
              <MyAddressAddBox
                setRecipientName={setRecipientName}
                recipientName={recipientName}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                isDefault={isDefault}
                setIsDefault={setIsDefault}
                addAddress={handleAddAddress}
                basicAddress={basicAddress}
                setBasicAddress={setBasicAddress}
                zonecode={zonecode}
                setZonecode={setZonecode}
                addressDetail={addressDetail}
                setAddressDetail={setAddressDetail}
                isDisableToAddAddress={isDisableToAddAddress()}
              />
            )}
          </div>
          {myDefaultAddress && (
            <div>
              <input
                id="defaultAddress"
                type="checkbox"
                checked={isUsingDefaultAddress}
                onChange={(e) => setIsUsingDefaultAddress(e.target.checked)}
              />
              <label htmlFor="defaultAddress">기본 주소지 사용</label>
            </div>
          )}
        </div>
        <div className={style.paymentBox}>
          <div className={style.paymentHeader}>포인트 및 쿠폰</div>
          <div className={style.pointBox}>
            <input
              className={style.input}
              value={point}
              onChange={(e) => setPoint(Number(e.target.value))}
            />
            <div className={style.inputDesc}>
              사용가능 {myPoint ? myPoint?.data.availablePoints : 0} 포인트
            </div>
          </div>
          <div>
            {myCoupons?.data.coupons.map((myCoupon) => (
              <div
                className={style.couponSelectBox}
                onClick={() => handleCheckCoupon(myCoupon)}
                key={myCoupon.couponCode}
              >
                <input
                  type="radio"
                  checked={
                    coupon ? coupon.couponCode === myCoupon.couponCode : false
                  }
                />
                <CouponBox coupon={myCoupon} key={myCoupon.couponCode} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className={style.payButton} onClick={handlePay}>
        결제하기
      </button>
    </div>
  );
}
