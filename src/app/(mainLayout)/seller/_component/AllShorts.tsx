"use client";
import productAPI from "@/apis/product/productAPIService";
import { Short } from "@/apis/product/productAPIService.types";
import { Page } from "@/constants/PageResponseType";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import style from "@/app/(mainLayout)/seller/[sellerId]/seller.module.css";
import ShortsDetail from "../../shorts/[id]/page";

export default function AllShorts({ sellerId }: { sellerId: number }) {
  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery<
      Page<Short[]>,
      Object,
      InfiniteData<Page<Short[]>>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ["seller", "shorts"],
      queryFn: ({ pageParam = 0 }) =>
        productAPI.getShortListBySellerId(sellerId, pageParam),
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
    <div className={style.shorts}>
      {data?.pages[0].content.length === 0 ? (
        <div>아직 등록된 쇼츠가 없어요.</div>
      ) : (
        data?.pages?.map((page, parentIdx) => (
          <Fragment key={parentIdx}>
            <div key={parentIdx} className={style.shortsParentWrapper}>
              {page.content.map((short, idx) => (
                <div key={short.shortsId} className={style.shortsWrapper}>
                  <ShortsDetail
                    params={{ id: short.shortsId }}
                    key={short.shortsId}
                    shorts={short}
                    isMain={true}
                  />
                </div>
              ))}
            </div>
          </Fragment>
        ))
      )}
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
}
