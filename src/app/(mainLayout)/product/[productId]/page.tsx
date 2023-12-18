"use client";
import JeontongjuNotFoundImg from "/public/jeontongju_notfound.png";
import searchAPI from "@/apis/search/searchAPIService";
import Image from "next/image";
import style from "@/app/(mainLayout)/product/[productId]/product.module.css";
import MemberShipBox from "../../_component/MemberShipBox/MemberShipBox";
import QualityInput from "../../_component/QualityInput/QualityInput";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetProductDetailByProductIdResponseData } from "@/apis/search/searchAPIService.types";
import { useRouter } from "next/navigation";

type Props = {
  params: { productId: string };
};

export default function Page({ params }: Props) {
  const router = useRouter();
  const { productId } = params;
  const [productData, setProductData] =
    useState<GetProductDetailByProductIdResponseData>(null);

  // const data = await getProductData(productId);
  // const productData = data.data;

  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(
    productData ? productData.productPrice : 0
  );

  const handleClickCounter = (num: number) => {
    console.log(num);
    setQuantity((prev) => prev + num);
    setTotal((prev) => prev + productData.productPrice * num);
  };

  const handleBlurInput = (quantity: number) => {
    const newQuantity = quantity;
    setQuantity(newQuantity);
    setTotal(productData.productPrice * newQuantity);
  };

  const getProductData = async (productId: string) => {
    const { data } = await searchAPI.getProductDetailByProductId(
      productId as string
    );
    setProductData(data);
  };

  useEffect(() => {
    getProductData(params.productId);
  }, []);

  return (
    <>
      {productData ? (
        <div>
          <div className={style.productTop}>
            <div className={style.thumbnail}>
              <Image
                src={productData.productThumbnailImageUrl}
                alt="productImg"
                width={0}
                height={0}
                style={{ cursor: "pointer", width: "100%", height: "auto" }}
              />
            </div>
            <div className={style.info}>
              <div className={style.title}>{productData.productName}</div>
              <div className={style.desc}>{productData.productDescription}</div>
              <div className={style.hr} />
              <div className={style.productPrice}>
                {productData.productPrice}원
              </div>
              <MemberShipBox />
              <div>
                <QualityInput
                  quantity={quantity}
                  stock={100}
                  onClick={handleClickCounter}
                  onBlur={handleBlurInput}
                />
                {total}
              </div>
              <div className={style.btnGroup}>
                <Link
                  className={style.button}
                  href={{
                    pathname: "/payment",
                    query: { productId, productCount: quantity },
                  }}
                  replace
                >
                  장바구니 담기
                </Link>
                <Link
                  className={style.button}
                  href={{
                    pathname: "/payment",
                    query: {
                      products: JSON.stringify([
                        {
                          productId,
                          productCount: quantity,
                        },
                      ]),
                    },
                  }}
                >
                  바로 구매하기
                </Link>
              </div>
              <div className={style.hr} />
              <div>리뷰 적립시 3% 추가 적립</div>
              <Link
                href={`/seller/${productData.sellerId}`}
                className={style.sellerInfo}
              >
                <img
                  src={productData.storeImageUrl}
                  alt="img"
                  className={style.storeImg}
                />
                <div>판매자 | {productData.storeName}</div>
              </Link>
            </div>
          </div>
          <div className={style.hr}></div>
        </div>
      ) : (
        <Image
          src={JeontongjuNotFoundImg}
          alt="jeontongju-notfound"
          width={0}
          height={0}
          style={{ cursor: "pointer", width: "80%", height: "80%" }}
        />
      )}
    </>
  );
}
