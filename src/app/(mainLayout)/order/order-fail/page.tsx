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
      width={0}
      height={0}
      src={orderFailImg}
      preview={false}
      style={{ cursor: "pointer", width: "80%", height: "auto" }}
      onClick={handleGoPrevPage}
    />
  );
}
