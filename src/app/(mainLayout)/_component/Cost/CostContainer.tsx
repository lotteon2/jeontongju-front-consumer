"use client";
import { ProductData } from "@/apis/search/searchAPIService.types";
import loadingImg from "/public/loading.gif";
import Image from "next/image";
import style from "@/app/(mainLayout)/_component/Crop/CropContainer.module.css";
import ProductContainer from "../ProductContainer/ProductContainer";
import { useQuery } from "@tanstack/react-query";
import searchAPI from "@/apis/search/searchAPIService";
import { useEffect, useState } from "react";

export default function CostContainer() {
  const { data, isLoading } = useQuery({
    queryKey: ["event", "cost"],
    queryFn: () => searchAPI.getCropProducts("capacityToPriceRatio"),
  });
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  console.log("!!! cost data", data);
  return (
    <div className={style.costBody}>
      {mounted && !isLoading ? (
        data?.data.map((crop: ProductData) => (
          <ProductContainer
            key={crop.productId}
            productId={crop.productId}
            productImg={crop.productThumbnailImageUrl}
            sellerName={crop.storeName}
            sellerProfileImg={crop.storeImageUrl}
            price={crop.productPrice}
            capacityToPriceRatio={crop.capacityToPriceRatio}
            productName={crop.productName}
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
