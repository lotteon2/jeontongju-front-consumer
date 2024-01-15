"use client";
import FiSrCoffee from "/public/fi-sr-coffee.svg";
import wishAPI from "@/apis/wishCart/wishAPIService";
import { GetMyCartListResponseData } from "@/apis/wishCart/wishAPIService.types";
import Image from "next/image";
import { toast } from "react-toastify";
import style from "@/app/(mainLayout)/mypage/_component/MyCartBox/MyCartBox.module.css";
import { useState } from "react";
import QualityInput from "@/app/(mainLayout)/_component/QualityInput/QualityInput";

export default function MyCartBox({
  item,
  refetch,
}: {
  item: GetMyCartListResponseData;
  refetch: any;
}) {
  const handleDeleteCartItem = async () => {
    try {
      const data = await wishAPI.deleteCartItem(item.productId);
      if (data.code === 200) {
        toast("장바구니에서 삭제 되었어요.");
        refetch();
      }
    } catch (error) {}
  };

  const [quantity, setQuantity] = useState(item.amount);
  const [total, setTotal] = useState(item.amount * item.productPrice);

  const handleClickCounter = async (num: number) => {
    setQuantity((prev) => (prev as number) + num);
    setTotal((prev) => prev + item.productPrice * num);
    const data = await wishAPI.updateCart(item.productId, quantity + num);
    refetch();
    if (data.code !== 200) {
      toast("수량 수정에 실패했어요.");
    }
  };

  const handleBlurInput = (quantity: number) => {
    const newQuantity = quantity;
    setQuantity(newQuantity);
    setTotal(item.productPrice * newQuantity);
  };

  return (
    <div className={style.myCartBox}>
      <div className={style.deleteButton}>
        <Image
          alt="삭제"
          width={0}
          height={0}
          src={FiSrCoffee}
          style={{
            cursor: "pointer",
            width: "1rem",
            height: "1rem",
            position: "relative",
          }}
          onClick={handleDeleteCartItem}
        />
      </div>
      <div className={style.myCartBody}>
        <div style={{ width: "10rem", height: "10rem", position: "relative" }}>
          <Image
            src={item.productThumbnailImageUrl}
            alt="img"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div>
          <div className={style.productName}>{item.productName}</div>
          <div>{item.productPrice}원</div>
        </div>
      </div>
      <div className={style.qualityInputBox}>
        <QualityInput
          quantity={quantity}
          stock={100}
          onClick={handleClickCounter}
          setQuantity={setQuantity}
          onBlur={handleBlurInput}
        />
        <div>{total} 원</div>
      </div>
    </div>
  );
}
