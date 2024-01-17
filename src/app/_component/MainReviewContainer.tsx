"use client";
import searchAPI from "@/apis/search/searchAPIService";
import { ProductData } from "@/apis/search/searchAPIService.types";
import style from "@/app/page.module.css";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductContainer from "../(mainLayout)/_component/ProductContainer/ProductContainer";

export default function MainReviewContainer() {
  const router = useRouter();

  const { data, refetch } = useQuery({
    queryKey: ["product", "bestReview"],
    queryFn: () => searchAPI.getBestReviewProducts(),
  });

  return (
    <div className={style.mainShortsContainer}>
      <div className={style.mainShortsTop}>
        <h2>리뷰가 많이 달리는 상품들!</h2>
        <div
          className={style.goList}
          onClick={() => router.push("/product/list")}
        >
          더 많은 상품 보러가기 {">"}
        </div>
      </div>

      <div className={style.shortsContainer}>
        {data?.data.map((product: ProductData) => (
          <ProductContainer
            productName={product.productName}
            productId={product.productId}
            productImg={product.productThumbnailImageUrl}
            price={product.productPrice}
            capacityToPriceRatio={product.capacityToPriceRatio}
            key={product.productId}
            isLikes={product.isLikes}
            reviewCount={product.reviewCount}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
}
