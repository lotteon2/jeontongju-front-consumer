"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import orderFailImg from "/public/order_fail.gif";
export default function OrderFail() {
  const router = useRouter();
  const handleGoPrevPage = () => {
    router.back();
  };

  return (
    <Image
      alt="orderFailImg"
      width={10}
      height={10}
      src={orderFailImg}
      preview={false}
      style={{ cursor: "pointer", width: "100%", height: "auto" }}
      onClick={handleGoPrevPage}
    />
  );
}
