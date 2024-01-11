"use client";
import orderAPI from "@/apis/order/orderAPIService";
import MyOrderBox from "../MyOrderBox/MyOrderBox";
import style from "@/app/(mainLayout)/mypage/_component/MyList.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function MyOrderList() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, refetch } = useQuery({
    queryKey: ["order", "list", "get"],
    queryFn: () => orderAPI.getMyOrderList(0, 10, false),
  });

  queryClient.prefetchInfiniteQuery({
    queryKey: ["order", "list"],
    queryFn: () => orderAPI.getMyOrderList(0, 10, false),
    initialPageParam: 0,
  });

  return (
    <div className={style.list}>
      <div className={style.listHeader}>
        <h2>나의 주문 내역</h2>
        <div
          className={style.goDetail}
          onClick={() => router.push("/mypage/myorder")}
        >
          자세히 보기 {">"}
        </div>
      </div>
      {data?.content?.length > 0 ? (
        data.content.map((it) => (
          <MyOrderBox params={it} key={it.order.ordersId} refetch={refetch} />
        ))
      ) : (
        <div>주문 내역이 없어요.</div>
      )}
    </div>
  );
}
