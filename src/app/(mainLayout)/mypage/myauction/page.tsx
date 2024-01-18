"use client";
import LoadingImg from "/public/loading.gif";
import Image from "next/image";
import style from "@/app/(mainLayout)/mypage/mywish/mywish.module.css";
import { Fragment, useEffect, useState } from "react";
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import auctionAPI from "@/apis/auction/auctionAPIService";
import { GetMyAuctionListResponseData } from "@/apis/auction/auctionAPIService.types";
import { Page } from "@/constants/PageResponseType";
import { useInView } from "react-intersection-observer";

export default function MyAuction() {
  const { data, fetchNextPage, hasNextPage, isFetching, refetch, isLoading } =
    useInfiniteQuery<
      Page<GetMyAuctionListResponseData[]>,
      Object,
      InfiniteData<Page<GetMyAuctionListResponseData[]>>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ["auction", "list"],
      queryFn: ({ pageParam = 0 }) =>
        auctionAPI.GetMyAuctionList(pageParam, 10),
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

  const getMyAuctionList = async () => {
    try {
      refetch();
    } catch (err) {
      toast("내 경매 내역을 불러오는데 실패했어요.");
    } finally {
    }
  };

  useEffect(() => {
    getMyAuctionList();
  }, []);

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);
  return (
    <div className={style.myWishPage}>
      <h2 className={style.myWishHeader}>나의 경매내역</h2>
      <div className={style.myWishList}>
        {data &&
          data?.pages[0].content.slice(0, 5)?.map((page, i) => (
            <Fragment key={i}>
              {page?.map((it) => (
                <div key={it.auctionId}>{it.auctionName}</div>
              ))}
            </Fragment>
          ))}
        {!data?.pages[0]?.content.length && <div>나의 경매 목록이 없어요</div>}
      </div>
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
}
