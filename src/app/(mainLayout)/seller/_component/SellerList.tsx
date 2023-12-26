"use client";

import {
  GetSellerListResponse,
  GetSellerListResponseData,
} from "@/apis/seller/sellerAPIService.types";
import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { getSellerList } from "../_lib/getSellerList";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Seller from "./Seller";
import style from "@/app/(mainLayout)/seller/_component/sellerList.module.css";

export default function SellerList() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    GetSellerListResponseData[],
    Object,
    InfiniteData<GetSellerListResponseData[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["seller", "list"],
    queryFn: getSellerList,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.sellerId,
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
    <div className={style.sellerList}>
      <div className={style.banner}>전통주점 주모님들을 소개합니다</div>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.map((seller) => (
            <Seller key={seller.sellerId} seller={seller} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
}
