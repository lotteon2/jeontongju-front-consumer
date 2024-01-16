"use client";
import Image from "next/image";
import Link from "next/link";
import membershipBannerImg from "/public/membership_banner.png";
import eventCouponImg from "/public/event_coupon.png";
import eventCostImg from "/public/event_cost.png";
import eventCropImg from "/public/event_crop.png";
import { toast } from "react-toastify";
import couponAPI from "@/apis/coupon/couponAPIService";
import style from "@/app/page.module.css";
import { Particle } from "./pangpang/page";

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
          if (data.detail === "쿠폰 수령 성공") {
            toast("쿠폰이 발급되었어요.");
            const party = new Particle("successCoupon", {
              number: 200,
              colors: ["#ffca76", "#ffb9b9", "#fff180"],
            });
            party.start();
            return;
          }
          if (!data.data.isOpen) {
            toast("아직 오픈 전이에요");
            return;
          } else if (data.data.isSoldOut) {
            toast("쿠폰이 매진되었어요");
            return;
          } else if (data.data.isDuplicated) {
            toast("쿠폰은 한 장만 발급받을 수 있어요.");
            return;
          }
        }
      }
    }
  };

  return type === "coupon" ? (
    <div onClick={getCoupon} className={style.banner}>
      <Image
        src={eventCouponImg}
        width={0}
        height={0}
        alt={type || "banner"}
        style={{ cursor: "pointer", width: "100%", height: "20%" }}
      />
      <div id="successCoupon"></div>
    </div>
  ) : (
    <div className={style.banner}>
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
    </div>
  );
}
