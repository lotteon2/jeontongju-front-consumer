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
import { Input } from "antd";
import { ProductData } from "@/apis/search/searchAPIService.types";

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
  const [point, setPoint] = useState<number>(0);
  const [coupon, setCoupon] = useState<GetMyCouponListResponseData>(null);

  const { data: myDefaultAddress, refetch: refetchMyAddressForOrder } =
    useQuery({
      queryKey: ["address", "default"],
      queryFn: () => consumerAPI.getMyAddressForOrder(),
    });

  console.log("myDefaultAddress", myDefaultAddress);

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

  useEffect(() => {
    if (isUsingDefaultAddress) {
      setRecipientName(myDefaultAddress?.data.recipientName);
      setPhoneNumber(myDefaultAddress?.data.recipientPhoneNumber);
      setBasicAddress(myDefaultAddress?.data.basicAddress);
      setAddressDetail(myDefaultAddress?.data.addressDetail);
      setZonecode(myDefaultAddress?.data.zonecode);
    } else {
      setRecipientName("");
      setPhoneNumber("");
      setBasicAddress("");
      setAddressDetail("");
      setZonecode("");
    }
  }, [isUsingDefaultAddress]);

  console.log(products);

  const handlePay = async () => {
    const params = {
      paymentType: "ORDER",
      paymentMethod: "KAKAO",
      pointUsageAmount: point,
      couponCode: coupon?.couponCode,
      couponAmount: coupon?.discountAmount,
      recipientName,
      recipientPhoneNumber: phoneNumber,
      basicAddress,
      addressDetail,
      zoneCode: zonecode,
      totalAmount,
      realAmount:
        totalAmount -
        (coupon ? coupon?.discountAmount : 0) -
        (point ? point : 0), // 실금액 - 쿠폰금액 - 포인트금액
      titleName: products.length > 0 ? `${products[0].productName}외 ${products.length - 1} 개`: products[0].productName,
      products: Array.from(products),
    };
    try {
      console.log(totalAmount);
      console.log(coupon?.discountAmount);
      console.log(point);
      console.log(totalAmount - coupon?.discountAmount - point);
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

  const handleChangePoint = (e) => {
    if (Number(e.target.value) > Number(myPoint?.data.availablePoints)) {
      toast("사용 가능 포인트보다 더 쓸 수 없어요.");
      setPoint(myPoint?.data.availablePoints);
    } else {
      setPoint(Number(e.target.value));
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
          <div className={style.paymentHeader}>
            주문 상품 총 {products.length}개
          </div>
          {products.map((product) => (
            <div className={style.paymentProductBox} key={product.productId}>
              <div>
                <Image
                  src={product.productThumbnailImageUrl}
                  alt="img"
                  width={100}
                  height={100}
                  style={{ borderRadius: "12px" }}
                />
              </div>
              <div>
                <div className={style.productName}>{product.productName}</div>
                <div>{product.productPrice} 원</div>
                <div>{product.amount} 개</div>
              </div>
            </div>
          ))}
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
                isMyPage={false}
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
          {myDefaultAddress?.data?.addressId && (
            <div className={style.myDefaultAddressAddBox}>
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
              disabled={myPoint?.data.availablePoints === 0}
              onChange={handleChangePoint}
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
            {myCoupons?.data.availableCount === 0 && (
              <div>사용가능한 쿠폰이 없어요.</div>
            )}
          </div>
        </div>
      </div>
      <button className={style.payButton} onClick={handlePay}>
        결제하기
      </button>
    </div>
  );
}
