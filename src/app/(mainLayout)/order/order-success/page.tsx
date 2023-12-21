"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import orderSuccessImg from "/public/order_success.gif";
export default function OrderSuccess() {
  const router = useRouter();
  const handleGoPrevPage = () => {
    router.replace("/");
  };

  return (
    <Image
      alt="orderFailImg"
      width={0}
      height={0}
      src={orderSuccessImg}
      style={{ cursor: "pointer", width: "80%", height: "auto" }}
      onClick={handleGoPrevPage}
    />
  );
}
