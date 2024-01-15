"use client";
import Image from "next/image";
import SuccessImg from "/public/success.png";
import { useRouter } from "next/navigation";
import orderSuccessImg from "/public/order_success.gif";
export default function OrderSuccess() {
  const router = useRouter();
  const handleGoPrevPage = () => {
    router.replace("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        alt="OrderSuccess"
        width={0}
        height={0}
        src={SuccessImg}
        style={{ cursor: "pointer", width: "5rem", height: "auto" }}
        onClick={handleGoPrevPage}
      />
      <h2>결제가 성공했어요.</h2>
    </div>
  );
}
