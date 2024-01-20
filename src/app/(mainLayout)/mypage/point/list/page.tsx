"use client";
import loadingImg from "/public/loading.gif";
import Image from "next/image";
import style from "@/app/(mainLayout)/mypage/point/list/pointList.module.css";
import { Fragment, useEffect, useState } from "react";
import consumerAPI from "@/apis/consumer/consumerAPIService";
import { GetMyPointListResponseData } from "@/apis/consumer/consumerAPIservice.types";
import CreditBox from "../../../_component/PointCreditBox/PointCreditBox";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMyInfoStore } from "@/app/store/myInfo/myInfo";
import { useInView } from "react-intersection-observer";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

export default function PointList() {
  const router = useRouter();

  const [type, setType] = useState<"acc" | "use">("acc");

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery<
      GetMyPointListResponseData,
      Object,
      InfiniteData<GetMyPointListResponseData>,
      [_1: string, _2: string, _3: string],
      number
    >({
      queryKey: ["credit", "list", type],
      queryFn: ({ pageParam = 0 }) =>
        consumerAPI.getMyPointList(type, pageParam, 10),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.histories.last === false
          ? lastPage.histories.number + 1
          : null,
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

  const [isLogin] = useMyInfoStore((state) => [state.isLogin]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("accessToken")) {
        toast("로그인한 유저만 접근할 수 있어요.");
        router.push("/init/signin");
      }
    }
  }, []);

  return (
    <>
      <div className={style.creditList}>
        <div className={style.creditHeader}>
          <div className={style.creditTitle}>포인트 내역</div>
          <div>
            <div>현재 내 포인트 | {data?.pages[0].point.toLocaleString()}</div>
            <div>
              총 적립 포인트 | {data?.pages[0].totalAcc.toLocaleString()}
            </div>
            <div>
              총 사용 포인트 | {data?.pages[0].totalUse.toLocaleString()}
            </div>
          </div>
        </div>
        <div className={style.creditBtns}>
          <div
            className={type === "acc" ? style.selectedButton : style.button}
            onClick={() => setType("acc")}
          >
            적립 내역
          </div>
          <div
            className={type === "use" ? style.selectedButton : style.button}
            onClick={() => setType("use")}
          >
            사용 내역
          </div>
        </div>
        <div className={style.credits}>
          {!isLoading ? (
            <>
              {data?.pages?.map((page, i) => (
                <Fragment key={i}>
                  {page?.histories.content.map((point) => (
                    <CreditBox params={point} key={point.tradeId} />
                  ))}
                </Fragment>
              ))}
              <div ref={ref} style={{ height: 50 }} />
            </>
          ) : (
            <Image
              src={loadingImg}
              width={10}
              height={10}
              alt="loading"
              style={{ width: "50%", height: "50%" }}
            />
          )}
          {data?.pages[0].histories.content.length === 0 && (
            <div>내역이 없어요.</div>
          )}
        </div>
      </div>
    </>
  );
}
