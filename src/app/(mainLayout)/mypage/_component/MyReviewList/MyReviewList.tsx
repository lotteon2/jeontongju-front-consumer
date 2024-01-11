"use client";
import style from "@/app/(mainLayout)/mypage/_component/MyList.module.css";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import reviewAPI from "@/apis/review/reviewAPIService";
import MyReviewBox from "../MyReviewBox/MyReviewBox";

export default function MyReviewList() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, refetch } = useQuery({
    queryKey: ["review", "list", "get"],
    queryFn: () => reviewAPI.getMyReviewList(0, 5),
  });

  queryClient.prefetchInfiniteQuery({
    queryKey: ["review", "list"],
    queryFn: () => reviewAPI.getMyReviewList(0, 5),
    initialPageParam: 0,
  });

  return (
    <div className={style.list}>
      <div className={style.listHeader}>
        <h2>나의 리뷰 내역</h2>
        <div
          className={style.goDetail}
          onClick={() => router.push("/mypage/myreview")}
        >
          자세히 보기 {">"}
        </div>
      </div>
      {data?.content ? (
        data.content.map((it) => (
          <MyReviewBox params={it} key={it.reviewId} refetch={refetch} />
        ))
      ) : (
        <div>리뷰 내역이 없어요.</div>
      )}
    </div>
  );
}
