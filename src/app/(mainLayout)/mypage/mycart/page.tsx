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
import Link from "next/link";
import { useGetMyInfiniteCartList } from "../_lib/useGetMyInfiniteCartList";

export default function MyCartpage() {
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedCart, setSelectedCart] = useState<GetMyCartListResponseData[]>(
    []
  );

  const {data, fetchNextPage, hasNextPage, isFetching, refetch, isLoading} = useGetMyInfiniteCartList();
  // const { data, fetchNextPage, hasNextPage, isFetching, refetch, isLoading } =
  //   useInfiniteQuery<
  //     Page<GetMyCartListResponseData[]>,
  //     Object,
  //     InfiniteData<Page<GetMyCartListResponseData[]>>,
  //     [_1: string, _2: string],
  //     number
  //   >({
  //     queryKey: ["cart", "list"],
  //     queryFn: getMyCartList,
  //     initialPageParam: 0,
  //     getNextPageParam: (lastPage) =>
  //       lastPage.last === false ? lastPage.number + 1 : null,
  //     staleTime: 60 * 1000,
  //     gcTime: 300 * 1000,
  //   });

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

  const handleUpdateSum = (e, it: GetMyCartListResponseData) => {
    if (e.target.checked) {
      setSelectedCart((prev) => [...prev, it]);
    } else {
      const updatedCart = selectedCart.filter(
        (cart) => cart.productId !== it.productId
      );
      console.log(updatedCart);
      setSelectedCart(updatedCart);
    }
  };

  useEffect(() => {
    let total = 0;

    const matchedItems: GetMyCartListResponseData[] = [];
    selectedCart.forEach((cartItem) => {
      data?.pages.forEach((page) => {
        page.content.forEach((dataItem) => {
          if (cartItem.productId === dataItem.productId) {
            matchedItems.push(dataItem);
            cartItem.amount = dataItem.amount;
          }
        });
      });
    });
    matchedItems.forEach(
      (matchedItem) => (total += matchedItem.amount * matchedItem.productPrice)
    );
    setTotalAmount(total);
  }, [selectedCart, data]);

  return (
    <div className={style.myCartPage}>
      <div className={style.myWishHeader}>
        <h2>나의 장바구니 내역</h2>
      </div>
      <div className={style.deleteButton} onClick={handleDeleteAllMyCart}>
        전체 삭제
      </div>
      <div className={style.myCartBody}>
        <div className={style.myWishList}>
          {data?.pages &&
            data?.pages?.map((page, i) => (
              <Fragment key={i}>
                {page?.content.map((it) => (
                  <div className={style.cartInnerBox} key={it.productId}>
                    <input
                      type="checkbox"
                      onChange={(e) => handleUpdateSum(e, it)}
                    />
                    <MyCartBox key={it.productId} item={it} refetch={refetch} />
                  </div>
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
          <h2>주문 예상 금액</h2>
          <div className={style.myWishInner}>
            <div>총 상품 가격</div>
            <div>{totalAmount.toLocaleString()} 원</div>
          </div>
          <div className={style.myWishInner}>
            <div>총 배송비</div>
            <div>전통주점은 언제나 무료배송!</div>
          </div>
          {selectedCart?.length > 0 ? (
            <Link
              className={style.button}
              href={{
                pathname: "/payment",
                query: {
                  realAmount: totalAmount,
                  totalAmount: totalAmount,
                  isCart: true,
                  products: JSON.stringify(
                    selectedCart.map((cart) => ({
                      productCount: cart.amount,
                      productId: cart.productId,
                      productName: cart.productName,
                      productThumbnailImageUrl: cart.productThumbnailImageUrl,
                      productPrice: cart.productPrice,
                    }))
                  ),
                },
              }}
            >
              결제하기
            </Link>
          ) : (
            <div className={style.button}>카트를 선택해주세요</div>
          )}
        </div>
      </div>

      {isLoading && <Loading />}
    </div>
  );
}
