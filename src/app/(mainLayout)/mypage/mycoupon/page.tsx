"use client";
import { GetMyCouponListResponseData } from "@/apis/coupon/couponAPIService.types";
import style from "@/app/(mainLayout)/mypage/mywish/mywish.module.css";
import { Page } from "@/constants/PageResponseType";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getMyCouponList } from "../_lib/getMyCouponList";
import { useInView } from "react-intersection-observer";
import { Fragment, useEffect } from "react";
import couponAPI from "@/apis/coupon/couponAPIService";
import CouponBox from "../../_component/CouponBox/CouponBox";

export default function MyCouponPage() {
  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery<
      Page<GetMyCouponListResponseData[]>,
      Object,
      InfiniteData<Page<GetMyCouponListResponseData[]>>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ["coupon", "list"],
      queryFn: ({ pageParam = 0 }) =>
        couponAPI.getMyCouponList(pageParam, "available", 10),
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
      <h2 className={style.myWishHeader}>나의 쿠폰 내역</h2>
      <div>
        <div>사용가능</div>
        <div>사용 / 만료</div>
      </div>
      <div className={style.myWishList}>
        {data ? (
          data?.pages?.map((page, i) => (
            <Fragment key={i}>
              {page?.content.map((it) => (
                <CouponBox coupon={it} key={it.couponCode}>
                  {it.couponCode}
                </CouponBox>
              ))}
            </Fragment>
          ))
        ) : (
          <div>내 쿠폰 내역이 없어요</div>
        )}
      </div>
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
}
