"use client";
import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { Page } from "@/constants/PageResponseType";
import { GetMyWishListResponseData } from "@/apis/wishCart/wishAPIService.types";
import { getMyWishList } from "../_lib/getMyWishList";
import ProductContainer from "../../_component/ProductContainer/ProductContainer";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import style from "@/app/(mainLayout)/mypage/mywish/mywish.module.css";
import wishAPI from "@/apis/wishCart/wishAPIService";
import { toast } from "react-toastify";
export default function MyWishPage() {
  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery<
      Page<GetMyWishListResponseData[]>,
      Object,
      InfiniteData<Page<GetMyWishListResponseData[]>>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ["wish", "list"],
      queryFn: getMyWishList,
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.last === false ? lastPage.number + 1 : null,
      staleTime: 60 * 1000,
      gcTime: 300 * 1000,
    });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  const handleDeleteAllMyWish = async () => {
    try {
      const data = await wishAPI.deleteAllWish();
      if (data.code === 200) {
        toast("찜 내역이 전부 비워졌어요.");
        refetch();
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <div className={style.myWishPage}>
      <h2 className={style.myWishHeader}>나의 찜 내역</h2>
      <div className={style.deleteButton} onClick={handleDeleteAllMyWish}>
        전체 삭제
      </div>
      <div className={style.myWishList}>
        {data?.pages?.map((page, i) => (
          <Fragment key={i}>
            {page?.content.map((it) => (
              <ProductContainer
                key={it.productId}
                isLikes={it.isLikes}
                productId={it.productId}
                productImg={it.productThumbnailImageUrl}
                price={it.productPrice}
                productName={it.productName}
                refetch={refetch}
              />
            ))}
          </Fragment>
        ))}
        {!data?.pages[0]?.content.length && <div>찜 목록이 없어요</div>}
      </div>
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
}
