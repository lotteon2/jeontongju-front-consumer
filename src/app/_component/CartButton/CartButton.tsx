"use client";
import style from "./CartButton.module.css";
import Image from "next/image";
import FiSrShoppingCart from "/public/fi-sr-shopping-cart.svg";
import { useRouter } from "next/navigation";
import { useMyInfoStore } from "@/app/store/myInfo/myInfo";
import { toast } from "react-toastify";

export default function CartButton() {
  const router = useRouter();
  const [isLogin] = useMyInfoStore((state) => [state.isLogin]);
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("accessToken")) {
        toast("로그인한 유저만 이용할 수 있어요.");
        return;
      }
      router.push("/mypage/mycart");
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      className={style.scrollContainer}
      style={{ display: isLogin ? "block" : "none" }}
    >
      <button className={style.top} onClick={scrollToTop} type="button">
        <Image
          src={FiSrShoppingCart}
          width={0}
          height={0}
          alt="top"
          style={{ cursor: "pointer", width: "2rem", height: "3rem" }}
        />
      </button>
    </div>
  );
}
