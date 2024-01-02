"use client";
import { useState } from "react";
import style from "@/app/(mainLayout)/product/[productId]/product.module.css";

type Props = {
  stock: number;
  quantity: number;
  onClick: (value: number) => void;
  onBlur: () => void;
  setQuantity: Dispatch<SetStateAction<number>>;
};

export default function QualityInput({
  stock,
  quantity,
  onClick,
  onBlur,
  setQuantity,
}: Props) {
  const handleChangeInput = (e) => {
    const newValue = parseInt(e.target.value);
    if (isNaN(newValue) || newValue < 1) {
      setQuantity(1);
    } else {
      setQuantity(newValue);
    }
  };

  const handleBlurInput = (e) => {
    let newValue = parseInt(e.target.value);

    if (stock < newValue) {
      alert(`${stock}개 이하로 구매하실 수 있습니다.`);
      newValue = stock;
    }
    onBlur(newValue);
  };

  return (
    <div className={style.quantityInput}>
      <button
        type="button"
        disabled={quantity === 1}
        aria-label="수량 내리기"
        onClick={() => onClick(-1)}
        className={style.button}
      >
        -
      </button>
      <label>
        <input
          className={style.input}
          type="number"
          min={1}
          disabled
          value={quantity}
          max={stock}
          onChange={handleChangeInput}
          onBlur={handleBlurInput}
        />
      </label>
      <button
        type="button"
        disabled={stock < 1 || stock === quantity}
        aria-label="수량 올리기"
        onClick={() => onClick(1)}
        className={style.button}
      >
        +
      </button>
    </div>
  );
}
