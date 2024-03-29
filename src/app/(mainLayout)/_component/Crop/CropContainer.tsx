"use client";
import { useEffect, useState } from "react";
import ProductContainer from "../ProductContainer/ProductContainer";
import { ProductData } from "@/apis/search/searchAPIService.types";
import style from "@/app/(mainLayout)/_component/Crop/CropContainer.module.css";
import { useQuery } from "@tanstack/react-query";
import searchAPI from "@/apis/search/searchAPIService";

export default function CropContainer() {
  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  const [selectedValue, setSelectedValue] = useState<string>("sweetPotato");
  const { data, refetch } = useQuery({
    queryKey: ["event", "crop"],
    queryFn: () => searchAPI.getCropProducts(),
  });

  useEffect(() => {
    if (selectedMenu === 0) {
      setSelectedValue("sweetPotato");
    } else if (selectedMenu === 1) {
      setSelectedValue("potato");
    } else {
      setSelectedValue("corn");
    }
  }, [selectedMenu]);

  return (
    <>
      <div className={style.cropContainer}>
        <div className={style.banner}>구황작물 전통주 모아보기</div>
        <div className={style.cropHeader}>
          <div
            className={selectedMenu === 0 ? style.selected : style.cropMenu}
            onClick={() => setSelectedMenu(0)}
          >
            🍠 고구마
          </div>
          <div
            className={selectedMenu === 1 ? style.selected : style.cropMenu}
            onClick={() => setSelectedMenu(1)}
          >
            🥔 감자
          </div>
          <div
            className={selectedMenu === 2 ? style.selected : style.cropMenu}
            onClick={() => setSelectedMenu(2)}
          >
            🌽 옥수수
          </div>
        </div>
        <div className={style.cropBody}>
          {data?.data[selectedValue].map((crop: ProductData) => (
            <ProductContainer
              key={crop.productId}
              productId={crop.productId}
              productImg={crop.productThumbnailImageUrl}
              sellerName={crop.storeName}
              sellerProfileImg={crop.storeImageUrl}
              price={crop.productPrice}
              capacityToPriceRatio={crop.capacityToPriceRatio}
              productName={crop.productName}
              isLikes={crop.isLikes}
              reviewCount={crop.reviewCount}
              refetch={refetch}
            />
          ))}
        </div>
      </div>
    </>
  );
}
