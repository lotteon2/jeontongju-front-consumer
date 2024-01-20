"use client";
import { Short } from "@/apis/product/productAPIService.types";
import ShortsDetail from "../[id]/page";
import { Page } from "@/constants/PageResponseType";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import productAPI from "@/apis/product/productAPIService";
import { useEffect, useRef } from "react";
import style from "@/app/(mainLayout)/shorts/list/shortsList.module.css";

export default function ShortsList() {
  const snapScrollWrapperRef = useRef();

  const playVideo = (e) => {
    const snapScrollWrapperRect = e.target.getBoundingClientRect();
    const snapScrollWrapperTopY = snapScrollWrapperRect.top;
    const snapScrollWrapperBottomY = snapScrollWrapperRect.bottom;
    const snapScrollItems = e.target.childNodes;
    snapScrollItems.forEach((item) => {
      // 이미지나 비디오는 snap-scroll-item의 0번째 자식
      const snapScrollItem = item.childNodes[0];
      // 비디오일 때만 부모의 뷰포트 맨위와 맨 아래에 중심이 들어왔을 때 실행
      if (snapScrollItem.tagName === "VIDEO") {
        const snapScrollItemRect = item.childNodes[0].getBoundingClientRect();
        // snapScrollItem의 뷰포트에서 중앙 Y 좌표
        const snapScrollItemCenter =
          (snapScrollItemRect.top + snapScrollItemRect.bottom) / 2;
        if (
          snapScrollItemCenter > snapScrollWrapperTopY &&
          snapScrollItemCenter < snapScrollWrapperBottomY
        ) {
          snapScrollItem.play();
        } else {
          snapScrollItem.pause();
        }
      }
    });
  };

  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery<
      Page<Short[]>,
      Object,
      InfiniteData<Page<Short[]>>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ["shorts", "list"],
      queryFn: ({ pageParam = 0 }) => productAPI.getAllShorts(pageParam, 1),
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
    <div>
      <div
        className={style.snapScrollWrapper}
        ref={snapScrollWrapperRef}
        onScroll={playVideo}
      >
        {data?.pages?.map((page, index) => (
          <div className={style.snapScrollItem} key={index}>
            {page.content.map((short) => (
              <ShortsDetail
                params={{ id: short.shortsId }}
                shorts={short}
                key={short.shortsId}
                isMain={false}
              />
            ))}
          </div>
        ))}
      </div>
      <div style={{ height: 50 }} ref={ref}></div>
    </div>
  );
}
