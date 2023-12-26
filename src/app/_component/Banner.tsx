"use client";
import Image from "next/image";
import Link from "next/link";
import membershipBannerImg from "/public/membership_banner.png";
import eventCostImg from "/public/event_cost.png";
import eventCropImg from "/public/event_crop.png";

export default function Banner({ type, href }: { type: string; href: string }) {
  return (
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
