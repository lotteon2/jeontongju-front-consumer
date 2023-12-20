import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import style from "@/app/(mainLayout)/_component/ProductContainer/ProductContainer.module.css";

type Props = {
  productId: string;
  productName: string;
  productImg: string;
  price: number;
  sellerName?: string;
  sellerProfileImg?: string;
  capacityToPriceRatio: number;
};
export default function ProductContainer({
  productId,
  productName,
  productImg,
  price,
  sellerName,
  sellerProfileImg,
  capacityToPriceRatio,
}: Props) {
  return (
    <div className={style.productContainer}>
      <Script id="my-script">{`console.log('Rendering on client:', typeof window !== 'undefined');`}</Script>
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
          <div>
            <Image
              alt="sellerThumbnail"
              src={
                sellerProfileImg ||
                "https://img.freepik.com/free-photo/concrete-background-cement-texture-with-blank-space_53876-129755.jpg"
              }
              width={0}
              height={0}
              style={{ cursor: "pointer", width: "80%", height: "80%" }}
            />
            <div>{sellerName}</div>
          </div>
        )}

        <div className={style.capacityToPriceRatio}>
          100ml당 {capacityToPriceRatio}원
        </div>
      </Link>
    </div>
  );
}
