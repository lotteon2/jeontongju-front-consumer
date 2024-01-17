import searchAPI from "@/apis/search/searchAPIService";
import style from "@/app/(mainLayout)/_component/SoPTBox/SoPTBox.module.css";
import { useQuery } from "@tanstack/react-query";
import ProductContainer from "../ProductContainer/ProductContainer";
export default function SoPTBox({ gptQuestion }: { gptQuestion: string }) {
  const { data, refetch } = useQuery({
    queryKey: ["search", "sopt", gptQuestion],
    queryFn: () => searchAPI.getSoPTData(gptQuestion),
  });

  return (
    <div className={style.SoPTBox}>
      <div className={style.typedOut}> {gptQuestion}</div>
      {data?.data?.length > 0 ? (
        <div>
          {data?.data.map((crop) => (
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
              refetch={refetch}
            />
          ))}
        </div>
      ) : (
        <div>추천 데이터 X</div>
      )}
    </div>
  );
}
