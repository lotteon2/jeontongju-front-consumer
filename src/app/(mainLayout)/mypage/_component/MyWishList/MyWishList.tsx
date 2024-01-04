import LoadingImg from "/public/loading.gif";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import wishAPI from "@/apis/wishCart/wishAPIService";
import ProductContainer from "../../../_component/ProductContainer/ProductContainer";
import style from "@/app/(mainLayout)/mypage/_component/MyList.module.css";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyCartList } from "../../_lib/getMyCartList";

export default function MyWishList() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { data, refetch } = useQuery({
    queryKey: ["wish", "list", "get"],
    queryFn: () => wishAPI.getMyWishList(0, 5),
  });

  queryClient.prefetchInfiniteQuery({
    queryKey: ["wish", "list"],
    queryFn: getMyCartList,
    initialPageParam: 0,
  });

  const getMyWish = async () => {
    try {
      setIsLoading(true);
      refetch();
    } catch (err) {
      toast("내 찜 내역을 불러오는데 실패했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyWish();
  }, []);

  return (
    <div className={style.list}>
      <div className={style.listHeader}>
        <h2>나의 찜 내역</h2>
        <div
          className={style.goDetail}
          onClick={() => router.push("/mypage/mywish")}
        >
          자세히 보기 {">"}
        </div>
      </div>
      <div className={style.listBody}>
        {!isLoading ? (
          data?.content ? (
            data.content.slice(0, 5)?.map((it, i) => (
              <Fragment key={i}>
                <ProductContainer
                  key={it.productId}
                  isLikes={it.isLikes}
                  productId={it.productId}
                  productImg={it.productThumbnailImageUrl}
                  price={it.productPrice}
                  productName={it.productName}
                  refetch={refetch}
                />
              </Fragment>
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
    </div>
  );
}
