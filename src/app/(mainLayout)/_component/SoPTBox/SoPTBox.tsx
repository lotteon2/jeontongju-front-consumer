import searchAPI from "@/apis/search/searchAPIService";
import style from "@/app/(mainLayout)/_component/SoPTBox/SoPTBox.module.css";
import { useQuery } from "@tanstack/react-query";
import ProductContainer from "../ProductContainer/ProductContainer";
import { useEffect, useState } from "react";
import {
  GetSoPTDataResponse,
  ProductData,
} from "@/apis/search/searchAPIService.types";
export default function SoPTBox({ gptQuestion }: { gptQuestion: string }) {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [data, setData] = useState<ProductData[]>([]);

  const getGptResponse = async () => {
    try {
      setIsLoading(true);
      const data = await searchAPI.getSoPTData(gptQuestion);
      if (data.code === 200) {
        setData(data.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGptResponse();
  }, []);

  return (
    <div className={style.SoPTBox}>
      <div className={style.typedOut}>
        🔍 "{gptQuestion}"에 대한 추천 검색 결과에요.
      </div>
      {!isLoading && data?.length > 0 ? (
        <div className={style.SoPTInnerBox}>
          {data?.map((crop) => (
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
        <div className={style.SoPTInnerBox}>
          🥲 아쉽지만 추천 데이터가 없어요.
        </div>
      )}
    </div>
  );
}
