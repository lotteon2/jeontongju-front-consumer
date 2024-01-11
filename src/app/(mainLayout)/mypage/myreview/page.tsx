"use client";
import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { Page } from "@/constants/PageResponseType";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import style from "@/app/(mainLayout)/mypage/mywish/mywish.module.css";
import reviewAPI from "@/apis/review/reviewAPIService";
import { GetMyReviewListResponseData } from "@/apis/review/reviewAPIService.types";
import MyReviewBox from "../_component/MyReviewBox/MyReviewBox";
export default function MyOrderPage() {
  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery<
      Page<GetMyReviewListResponseData[]>,
      Object,
      InfiniteData<Page<GetMyReviewListResponseData[]>>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ["review", "list"],
      queryFn: ({ pageParam = 0 }) => reviewAPI.getMyReviewList(pageParam, 10),
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
      <h2 className={style.myWishHeader}>나의 리뷰 내역</h2>
      <div>
        {data &&
          data?.pages?.map((page, i) => (
            <Fragment key={i}>
              {page?.content.map((it) => (
                <MyReviewBox params={it} key={it.reviewId} refetch={refetch} />
              ))}
            </Fragment>
          ))}
        {!data?.pages[0]?.content.length && <div>리뷰 목록이 없어요</div>}
      </div>
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
}
