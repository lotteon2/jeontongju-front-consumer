"use client";
import { useEffect, useState } from "react";
import style from "@/app/page.module.css";
import { useRouter } from "next/navigation";
import searchAPI from "@/apis/search/searchAPIService";
import { ProductData } from "@/apis/search/searchAPIService.types";
import ProductContainer from "../(mainLayout)/_component/ProductContainer/ProductContainer";
import { useQuery } from "@tanstack/react-query";

export default function MainProductContainer() {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const { data, refetch } = useQuery({
    queryKey: ["product", "list"],
    queryFn: () => searchAPI.getAllProducts(0, "totalSalesCount", 5),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={style.mainShortsContainer}>
      <div className={style.mainShortsTop}>
        <h2>다들 사고 있어요!</h2>
        <div
          className={style.goList}
          onClick={() => router.push("/product/list")}
        >
          더 많은 상품 보러가기
        </div>
      </div>

      <div className={style.shortsContainer}>
        {data?.content.map((product: ProductData) => (
          <ProductContainer
            productName={product.productName}
            productId={product.productId}
            productImg={product.productThumbnailImageUrl}
            price={product.productPrice}
            capacityToPriceRatio={product.capacityToPriceRatio}
            key={product.productId}
            isLikes={product.isLikes}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
}
