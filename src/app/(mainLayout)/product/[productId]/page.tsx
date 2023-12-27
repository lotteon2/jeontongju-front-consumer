"use client";
import LoadingImg from "/public/loading.gif";
import NotFoundImg from "/public/jeontongju_notfound.png";
import searchAPI from "@/apis/search/searchAPIService";
import Image from "next/image";
import style from "@/app/(mainLayout)/product/[productId]/product.module.css";
import MemberShipBox from "../../_component/MemberShipBox/MemberShipBox";
import QualityInput from "../../_component/QualityInput/QualityInput";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetProductDetailByProductIdResponseData } from "@/apis/search/searchAPIService.types";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import wishAPI from "@/apis/wishCart/wishAPIService";

type Props = {
  params: { productId: string };
};

export default function Page({ params }: Props) {
  const router = useRouter();
  const notify = (message: string) => toast(message);
  const { productId } = params;
  const [mounted, setMounted] = useState<boolean>(false);
  const [img, setImg] = useState<string>(LoadingImg);
  const [productData, setProductData] =
    useState<GetProductDetailByProductIdResponseData>(null);

  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(
    productData ? productData.productPrice : 0
  );

  const handleClickCounter = (num: number) => {
    console.log(num);
    setQuantity((prev) => (prev as number) + num);
    setTotal((prev) => prev + productData.productPrice * num);
  };

  const handleBlurInput = (quantity: number) => {
    console.log(quantity);
    const newQuantity = quantity;
    setQuantity(newQuantity);
    setTotal(productData.productPrice * newQuantity);
  };

  const getProductData = async (productId: string) => {
    try {
      const data = await searchAPI.getProductDetailByProductId(
        productId as string
      );
      if (data.code === 200) {
        setProductData(data.data);
        setTotal(data.data.productPrice);
        setImg("");
      }
    } catch (err) {
      console.error(err);
      setImg(NotFoundImg);
      notify("없는 상품이에요.");
    }
  };

  const handleAddCart = async () => {
    try{
      const data = await wishAPI.addCart(productId, quantity);
      if(data.code === 200){
        toast("장바구니 담기에 성공했어요.")
      }
    }catch(err){
      toast("장바구니 담기에 실패했어요.")
    }
  };

  useEffect(() => {
    getProductData(params.productId);
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && productData ? (
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
              <div className={style.quantityBox}>
                <QualityInput
                  quantity={quantity}
                  stock={productData.registeredQuantity}
                  onClick={handleClickCounter}
                  setQuantity={setQuantity}
                  onBlur={handleBlurInput}
                />
                <div>{total}원</div>
              </div>
              <div className={style.btnGroup}>
                <div className={style.button} onClick={handleAddCart}>
                  장바구니 담기
                </div>
                <Link
                  className={style.button}
                  href={{
                    pathname: "/payment",
                    query: {
                      realAmount: total,
                      totalAmount: total,
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
          src={img}
          alt="jeontongju-notfound"
          width={0}
          height={0}
          style={{ cursor: "pointer", width: "80%", height: "80%" }}
        />
      )}
    </>
  );
}
