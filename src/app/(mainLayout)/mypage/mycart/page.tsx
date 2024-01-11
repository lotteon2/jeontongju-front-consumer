"use client";
import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { Page } from "@/constants/PageResponseType";
import { GetMyCartListResponseData } from "@/apis/wishCart/wishAPIService.types";
import { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import style from "@/app/(mainLayout)/mypage/mycart/mycart.module.css";
import { getMyCartList } from "../_lib/getMyCartList";
import MyCartBox from "../_component/MyCartBox/MyCartBox";
import wishAPI from "@/apis/wishCart/wishAPIService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loading from "@/app/_component/Loading/Loading";

export default function MyCartpage() {
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const { data, fetchNextPage, hasNextPage, isFetching, refetch, isLoading } =
    useInfiniteQuery<
      Page<GetMyCartListResponseData[]>,
      Object,
      InfiniteData<Page<GetMyCartListResponseData[]>>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ["cart", "list"],
      queryFn: getMyCartList,
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("accessToken")) {
        toast("로그인한 유저만 접근할 수 있어요.");
        router.replace("/");
      }
    }
  }, []);

  const handleDeleteAllMyCart = async () => {
    try {
      const data = await wishAPI.deleteAllCart();
      if (data.code === 200) {
        toast("장바구니가 전부 비워졌어요.");
        refetch();
      }
    } catch (error) {}
  };
  return (
    <div className={style.myCartPage}>
      <div className={style.myWishHeader}>
        <h2>나의 장바구니 내역</h2>
      </div>
      <div className={style.deleteButton} onClick={handleDeleteAllMyCart}>
        전체 삭제
      </div>
      <div className={style.myWishList}>
        {data?.pages &&
          data?.pages?.map((page, i) => (
            <Fragment key={i}>
              {page?.content.map((it) => (
                <MyCartBox key={it.productId} item={it} refetch={refetch} />
              ))}
            </Fragment>
          ))}
        <div ref={ref} style={{ height: 50 }} />
        {data?.pages[0]?.content.length === 0 && (
          <div className={style.desc}>
            <div>장바구니가 비었어요</div>
            <div
              className={style.goDesc}
              onClick={() => router.push("/product/list")}
            >
              상품 구경하러가기
            </div>
          </div>
        )}
      </div>
      <div className={style.myWishRightBar}>
        <div>주문 예상 금액</div>
        <div>
          <div>총 상품 가격</div>
          <div>{totalAmount}</div>
        </div>
        <div>
          <div>총 배송비</div>
          <div>전통주점은 언제나 무료배송!</div>
        </div>
        <div>구매하기</div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
}
