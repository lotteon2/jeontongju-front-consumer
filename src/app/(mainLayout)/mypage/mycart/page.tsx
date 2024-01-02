"use client";
import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { Page } from "@/constants/PageResponseType";
import { GetMyCartListResponseData } from "@/apis/wishCart/wishAPIService.types";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import style from "@/app/(mainLayout)/mypage/mycart/mycart.module.css";
import { getMyCartList } from "../_lib/getMyCartList";
import MyCartBox from "../_component/MyCartBox/MyCartBox";
import wishAPI from "@/apis/wishCart/wishAPIService";
import { toast } from "react-toastify";

export default function MyCartpage() {
  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery<
      Page<GetMyCartListResponseData[]>,
      Object,
      InfiniteData<Page<GetMyCartListResponseData[]>>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ["cart", "list"],
      queryFn: getMyCartList,
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

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const handleDeleteAllMyCart = async () => {
    try {
      const data = await wishAPI.deleteAllCart();
      if (data.code === 200) {
        toast("장바구니가 전부 비워졌어요.");
        refetch();
      }
    } catch (error) {}
  };
  return (
    <div className={style.myCartPage}>
      <div className={style.myWishHeader}>
        <h2>나의 장바구니 내역</h2>
      </div>
      <div className={style.deleteButton} onClick={handleDeleteAllMyCart}>
        전체 삭제
      </div>
      <div className={style.myWishList}>
        {data ? (
          data?.pages?.map((page, i) => (
            <Fragment key={i}>
              {page?.content.map((it) => (
                <MyCartBox key={it.productId} item={it} refetch={refetch} />
              ))}
            </Fragment>
          ))
        ) : (
          <div>장바구니 목록이 없어요</div>
        )}
      </div>
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
}
