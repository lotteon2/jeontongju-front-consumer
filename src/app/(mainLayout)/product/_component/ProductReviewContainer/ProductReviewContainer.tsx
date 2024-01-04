import LoadingImg from "/public/loading.gif";
import reviewAPI from "@/apis/review/reviewAPIService";
import { GetReviewListByProductIdResponseData } from "@/apis/review/reviewAPIService.types";
import MyReviewBox from "@/app/(mainLayout)/mypage/_component/MyReviewBox/MyReviewBox";
import Select from "@/app/_component/Select/Select";
import { Page } from "@/constants/PageResponseType";
import { REVIEW, ReviewOptions } from "@/constants/ReviewEnum";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function ProductReviewContainer({
  productId,
}: {
  productId: string;
}) {
  const [sort, setSort] = useState<keyof typeof REVIEW>("sympathy");
  const { data, fetchNextPage, hasNextPage, isFetching, refetch, isLoading } =
    useInfiniteQuery<
      GetReviewListByProductIdResponseData,
      Object,
      InfiniteData<Page<GetReviewListByProductIdResponseData>>,
      [_1: string, _2: string, _3: string, _4: string],
      number
    >({
      queryKey: ["product", "review", "list", sort],
      queryFn: ({ pageParam = 0 }) =>
        reviewAPI.getReviewListByProductId(productId, pageParam, sort, 10),
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
  console.log(ReviewOptions);
  const handleChangeSort = (e: any) => {
    setSort(e.target.value);
  };
  return (
    <div>
      <div>
        <Select
          options={ReviewOptions}
          value={sort}
          setValue={handleChangeSort}
        />
      </div>
      {data?.pages[0]?.content && (
        <>
          <div>이 상품과 잘 어울리는 태그는</div>
          {data?.pages[0]?.content?.representativeReview.map((it) => (
            <div key={it}>{it}</div>
          ))}
        </>
      )}

      <div>
        {!isLoading ? (
          data ? (
            data?.pages?.map((page, i) => (
              <Fragment key={i}>
                {page?.content?.histories.content.map((it) => (
                  <MyReviewBox
                    key={it.reviewId}
                    params={it}
                    refetch={refetch}
                  />
                ))}
              </Fragment>
            ))
          ) : (
            <div>아직 리뷰가 없어요!</div>
          )
        ) : (
          <Image
            src={LoadingImg}
            alt="jeontongju-notfound"
            width={0}
            height={0}
            style={{ cursor: "pointer", width: "80%", height: "80%" }}
          />
        )}
      </div>
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
}
