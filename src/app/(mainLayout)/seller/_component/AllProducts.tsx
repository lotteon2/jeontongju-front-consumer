"use client";
import LoadingImg from "/public/loading.gif";
import NotFoundImg from "/public/jeontongju_notfound.png";
import { GetPopularProductsBySellerIdResponseData } from "@/apis/search/searchAPIService.types";
import ProductContainer from "../../_component/ProductContainer/ProductContainer";
import { Fragment, useEffect, useState } from "react";
import searchAPI from "@/apis/search/searchAPIService";
import style from "@/app/(mainLayout)/seller/[sellerId]/seller.module.css";
import { Page } from "@/constants/PageResponseType";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

export default function AllProducts({ sellerId }: { sellerId: number }) {
  const [img, setImg] = useState<string>(LoadingImg);

  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery<
      Page<GetPopularProductsBySellerIdResponseData[]>,
      Object,
      InfiniteData<Page<GetPopularProductsBySellerIdResponseData[]>>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ["seller", "products"],
      queryFn: ({ pageParam = 0 }) =>
        searchAPI.getAllProductsBySellerId(
          sellerId,
          "_score,desc",
          10,
          pageParam
        ),
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
    <div className={style.products}>
      {data?.pages?.map((page, i) => (
        <Fragment key={i}>
          {page.content.map((product) => (
            <ProductContainer
              productName={product.productName}
              productId={product.productId}
              productImg={product.productThumbnailImageUrl}
              price={product.productPrice}
              capacityToPriceRatio={product.capacityToPriceRatio}
              key={product.productId}
              isLikes={product.isLikes}
              reviewCount={product.reviewCount}
              refetch={refetch}
            />
          ))}
        </Fragment>
      ))}
      {!data?.pages[0].content && <div>아직 등록된 상품이 없어요.</div>}
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
}
