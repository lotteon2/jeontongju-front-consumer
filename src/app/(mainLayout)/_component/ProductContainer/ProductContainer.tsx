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
}: Props) {
  const isLogin = useMyInfoStore((state) => state.isLogin);
  const queryClient = useQueryClient();
  const handleRefetch = () => {
    queryClient.invalidateQueries(["wish", "list"]);
    queryClient.invalidateQueries(["event", "crop"]);
    queryClient.invalidateQueries(["event", "cost"]);
  };

  const handleLike = async () => {
    try {
      const data = await wishAPI.addDeleteWish(productId);
      if (data.code === 200) {
        console.log("refetch");
        handleRefetch();
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
          {isLikes ? "❤️" : "🤍"}
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
            width: "80%",
            height: "80%",
            borderRadius: "12px",
          }}
        />
        <div className={style.productName}>{productName}</div>
        <div className={style.price}>{price}</div>
        {sellerProfileImg && (
          <div className={style.sellerInfo}>
            <Image
              alt="sellerThumbnail"
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
            100ml당 {capacityToPriceRatio}원
          </div>
        )}
      </Link>
    </div>
  );
}
