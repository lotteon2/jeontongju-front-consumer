import LoadingImg from "/public/loading.gif";
import Link from "next/link";
import Image from "next/image";
import { GetMyOrderListResponseData } from "@/apis/order/orderAPIService.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import wishAPI from "@/apis/wishCart/wishAPIService";
import { GetMyWishListResponseData } from "@/apis/wishCart/wishAPIService.types";
import ProductContainer from "../../../_component/ProductContainer/ProductContainer";
import style from "@/app/(mainLayout)/mypage/_component/MyList.module.css";
import { toast } from "react-toastify";

export default function MyWishList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [content, setContent] = useState<GetMyWishListResponseData[]>();
  const router = useRouter();

  const getMyWishList = async () => {
    try {
      setIsLoading(true);
      const data = await wishAPI.getMyWishList(0, 5);
      setContent(data.content as GetMyWishListResponseData[]);
      console.log(data.content);
    } catch (err) {
      toast("내 찜 내역을 불러오는데 실패했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyWishList();
  }, []);

  return (
    <div className={style.list}>
      <div className={style.listHeader}>
        <h2>나의 찜 내역</h2>
        <div
          className={style.goDetail}
          onClick={() => router.push("/mypage/mywish")}
        >
          자세히 보기
        </div>
      </div>
      {!isLoading ? (
        content?.length ? (
          content
            .slice(0, 5)
            .map((it) => (
              <ProductContainer
                key={it.productId}
                isLikes={it.isLikes}
                productId={it.productId}
                productImg={it.productThumbnailImageUrl}
                price={it.productPrice}
                productName={it.productName}
              />
            ))
        ) : (
          <div>찜한 상품이 없어요.</div>
        )
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
