import LoadingImg from "/public/loading.gif";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import wishAPI from "@/apis/wishCart/wishAPIService";
import style from "@/app/(mainLayout)/mypage/_component/MyList.module.css";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyCartList } from "../../_lib/getMyCartList";
import MyCartBox from "../MyCartBox/MyCartBox";

export default function MyCartList() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { data, refetch } = useQuery({
    queryKey: ["cart", "list"],
    queryFn: () => wishAPI.getMyCartList(0, 5),
  });

  queryClient.prefetchInfiniteQuery({
    queryKey: ["cart", "list"],
    queryFn: getMyCartList,
    initialPageParam: 0,
  });

  const getMyCart = async () => {
    try {
      setIsLoading(true);
      refetch();
    } catch (err) {
      toast("내 장바구니 내역을 불러오는데 실패했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyCart();
  }, []);

  return (
    <div className={style.list}>
      <div className={style.listHeader}>
        <h2>나의 장바구니 내역</h2>
        <div
          className={style.goDetail}
          onClick={() => router.push("/mypage/mycart")}
        >
          자세히 보기
        </div>
      </div>
      <div className={style.listBody}>
        {!isLoading ? (
          data?.content ? (
            data.content.slice(0, 5)?.map((it, i) => (
              <Fragment key={i}>
                <MyCartBox key={it.productId} item={it} refetch={refetch} />
              </Fragment>
            ))
          ) : (
            <div>장바구니에 담은 상품이 없어요.</div>
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
    </div>
  );
}
