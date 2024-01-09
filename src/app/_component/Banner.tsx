"use client";
import Image from "next/image";
import Link from "next/link";
import membershipBannerImg from "/public/membership_banner.png";
import eventCouponImg from "/public/event_coupon.png";
import eventCostImg from "/public/event_cost.png";
import eventCropImg from "/public/event_crop.png";
import { toast } from "react-toastify";
import couponAPI from "@/apis/coupon/couponAPIService";

export default function Banner({
  type,
  href = "/",
}: {
  type: "crop" | "coupon" | "membership" | "cost";
  href?: string;
}) {
  const getCoupon = async () => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("accessToken")) {
        toast("로그인한 유저만 쿠폰 발급이 가능해요.");
        return;
      } else {
        const data = await couponAPI.getCoupon();
        if (data.code === 200) {
          console.log(data);
          if (!data.data.isOpen) {
            toast("아직 오픈 전이에요");
            return;
          } else if (data.data.isSoldOut) {
            toast("쿠폰이 매진되었어요");
            return;
          } else if (data.data.isDuplicated) {
            toast("쿠폰은 한 장만 발급받을 수 있어요.");
            return;
          } else {
            toast("쿠폰이 발급되었어요.");
            return;
          }
        }
      }
    }
  };

  return type === "coupon" ? (
    <div onClick={getCoupon}>
      <Image
        src={eventCouponImg}
        width={0}
        height={0}
        alt={type || "banner"}
        style={{ cursor: "pointer", width: "100%", height: "20%" }}
      />
    </div>
  ) : (
    <Link href={href}>
      <Image
        src={
          type === "membership"
            ? membershipBannerImg
            : type === "cost"
            ? eventCostImg
            : eventCropImg
        }
        width={0}
        height={0}
        alt={type || "banner"}
        style={{ cursor: "pointer", width: "100%", height: "20%" }}
      />
    </Link>
  );
}
