import FiSrHeartSVG from "/public/fi-sr-heart.svg";
import FiSrHeartFullSVG from "/public/fi-sr-heart-fill.svg";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import style from "@/app/(mainLayout)/_component/ProductContainer/ProductContainer.module.css";
import { useMyInfoStore } from "@/app/store/myInfo/myInfo";
import wishAPI from "@/apis/wishCart/wishAPIService";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  productId: string;
  productName: string;
  productImg: string;
  price: number;
  isLikes?: boolean;
  sellerName?: string;
  sellerProfileImg?: string;
  capacityToPriceRatio?: number;
  reviewCount?: number;
  refetch?: () => void;
};
export default function ProductContainer({
  productId,
  productName,
  productImg,
  price,
  sellerName,
  isLikes,
  sellerProfileImg,
  capacityToPriceRatio,
  reviewCount,
  refetch,
}: Props) {
  const isLogin = useMyInfoStore((state) => state.isLogin);
  const queryClient = useQueryClient();

  const handleLike = async () => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("accessToken")) {
        toast("로그인한 유저만 장바구니에 담을 수 있어요.");
        return;
      }
    }
    try {
      const data = await wishAPI.addDeleteWish(productId);
      if (data.code === 200) {
        console.log("refetch");
        refetch && refetch();
      }
    } catch (error) {
      toast("서버에 오류가 발생했어요.");
    }
  };

  return (
    <div className={style.productContainer}>
      <Script id="my-script">{`console.log('Rendering on client:', typeof window !== 'undefined');`}</Script>
      {isLogin && (
        <div onClick={handleLike} className={style.isLiked}>
          <Image
            alt="bell"
            width={0}
            height={0}
            src={isLikes ? FiSrHeartFullSVG : FiSrHeartSVG}
            style={{
              cursor: "pointer",
              width: "1rem",
              height: "1rem",
              position: "relative",
            }}
          />
        </div>
      )}
      <Link href={`/product/${productId}`}>
        <Image
          alt="productThumbnail"
          src={productImg}
          width={0}
          height={0}
          style={{
            cursor: "pointer",
            width: "100%",
            height: "70%",
            borderRadius: "12px",
          }}
        />
        <div className={style.productName}>
          {productName.length > 10
            ? productName.slice(0, 10) + "..."
            : productName}
        </div>
        <div className={style.price}>{price.toLocaleString()}원</div>
        {sellerProfileImg && (
          <div className={style.sellerInfo}>
            <Image
              alt="sellerThumbnail"
              priority
              src={
                sellerProfileImg ||
                "https://img.freepik.com/free-photo/concrete-background-cement-texture-with-blank-space_53876-129755.jpg"
              }
              width={0}
              height={0}
              style={{ cursor: "pointer", width: "3rem", height: "3rem" }}
            />
            <div>{sellerName}</div>
          </div>
        )}

        {capacityToPriceRatio && (
          <div className={style.capacityToPriceRatio}>
            100ml당 {capacityToPriceRatio.toLocaleString()}원
          </div>
        )}
        <div className={style.capacityToPriceRatio}>
          리뷰 {reviewCount ? reviewCount.toLocaleString() : 0} 개
        </div>
      </Link>
    </div>
  );
}
