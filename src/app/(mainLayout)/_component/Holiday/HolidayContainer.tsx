"use client";
import { ProductData } from "@/apis/search/searchAPIService.types";
import LoadingImg from "/public/loading.gif";
import Image from "next/image";
import style from "@/app/(mainLayout)/_component/Crop/CropContainer.module.css";
import ProductContainer from "../ProductContainer/ProductContainer";
import { useQuery } from "@tanstack/react-query";
import searchAPI from "@/apis/search/searchAPIService";
import { useEffect, useState } from "react";

export default function HolidayContainer() {
  const { data, isLoading } = useQuery({
    queryKey: ["event", "holiday"],
    queryFn: () => searchAPI.getHolidayProducts(),
  });
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className={style.cropContainer}>
      <div className={style.banner}>명절 전통주 모아보기</div>
      {mounted && !isLoading ? (
        <div className={style.costBody}>
          {data?.data.map((crop: ProductData) => (
            <ProductContainer
              key={crop.productId}
              isLikes={crop.isLikes}
              productId={crop.productId}
              productImg={crop.productThumbnailImageUrl}
              sellerName={crop.storeName}
              sellerProfileImg={crop.storeImageUrl}
              price={crop.productPrice}
              capacityToPriceRatio={crop.capacityToPriceRatio}
              productName={crop.productName}
            />
          ))}
        </div>
      ) : (
        <Image
          src={LoadingImg}
          alt="jeontongju-notfound"
          width={0}
          height={0}
          style={{ cursor: "pointer", width: "80%", height: "80%" }}
        />
      )}
    </div>
  );
}
