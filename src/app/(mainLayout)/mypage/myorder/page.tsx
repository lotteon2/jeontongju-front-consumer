"use client";
import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { Page } from "@/constants/PageResponseType";
import { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import orderAPI from "@/apis/order/orderAPIService";
import { GetMyOrderListResponseData } from "@/apis/order/orderAPIService.types";
import style from "@/app/(mainLayout)/mypage/mywish/mywish.module.css";
import MyOrderBox from "../_component/MyOrderBox/MyOrderBox";

export default function MyOrderPage() {
  const [isAuction, setIsAuction] = useState<boolean>(true);
  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery<
      Page<GetMyOrderListResponseData[]>,
      Object,
      InfiniteData<Page<GetMyOrderListResponseData[]>>,
      [_1: string, _2: string, _3: boolean],
      number
    >({
      queryKey: ["review", "list", isAuction],
      queryFn: ({ pageParam = 0 }) =>
        orderAPI.getMyOrderList(pageParam, 10, isAuction),
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

  return (
    <div className={style.myWishPage}>
      <h2 className={style.myWishHeader}>
        <div>나의 주문 내역</div>
      </h2>
      <div className={style.menus}>
        <div
          className={!isAuction ? style.selectedButton : style.button}
          onClick={() => setIsAuction(false)}
        >
          상품 주문 내역
        </div>
        <div
          className={isAuction ? style.selectedButton : style.button}
          onClick={() => setIsAuction(true)}
        >
          경매 주문 내역
        </div>
      </div>
      <div>
        {data &&
          data?.pages?.map((page, i) => (
            <Fragment key={i}>
              {page?.content.map((it) => (
                <MyOrderBox
                  params={it}
                  key={it.order.ordersId}
                  refetch={refetch}
                />
              ))}
            </Fragment>
          ))}

        {data?.pages[0].content.length === 0 && (
          <div>나의 주문 내역이 없어요</div>
        )}
      </div>
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
}
