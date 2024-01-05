"use client";
import searchAPI from "@/apis/search/searchAPIService";
import { ProductData } from "@/apis/search/searchAPIService.types";
import { Page } from "@/constants/PageResponseType";
import { SORT } from "@/constants/SortEnum";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import ProductContainer from "../../_component/ProductContainer/ProductContainer";
import { SNACK } from "@/constants/SnackTypeEnum";
import { useInView } from "react-intersection-observer";
import style from "@/app/(mainLayout)/product/list/productList.module.css";
import { Slider } from "antd";

export default function ProductList() {
  const [sort, setSort] = useState<keyof typeof SORT>("_score");
  const [rawMaterial, setRawMaterial] = useState<string>(null);
  const [food, setFood] = useState<keyof typeof SNACK>(null);
  const [minPrice, setMinPrice] = useState<number>(null);
  const [maxPrice, setMaxPrice] = useState<number>(null);
  const [minAlcoholDegree, setMinAlcoholDegree] = useState<number>(null);
  const [maxAlcoholDegree, setMaxAlcoholDegree] = useState<number>(null);

  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery<
      Page<ProductData[]>,
      Object,
      InfiniteData<Page<ProductData[]>>,
      [
        _1: string,
        _2: string,
        _3: string,
        _4: keyof typeof SNACK,
        _5: number,
        _6: number,
        _7: number,
        _8: number
      ],
      number
    >({
      queryKey: [
        "product",
        "all",
        rawMaterial,
        food,
        minPrice,
        maxPrice,
        minAlcoholDegree,
        maxAlcoholDegree,
      ],
      queryFn: ({ pageParam = 0 }) =>
        searchAPI.getAllProducts(
          pageParam,
          sort,
          10,
          rawMaterial,
          food,
          minPrice,
          maxPrice,
          minAlcoholDegree,
          maxAlcoholDegree
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

  const onChangeComplete = (value: number[]) => {
    setMinAlcoholDegree(value[0]);
    setMaxAlcoholDegree(value[1]);
  };

  const onChangeCompletePrice = (value: number[]) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  return (
    <div className={style.productList}>
      <div className={style.productSideBar}>
        <div>
          <div>도수별(0~100)</div>
          <Slider
            min={0}
            max={100}
            range
            step={10}
            onChangeComplete={onChangeComplete}
          />
        </div>
        <div>
          <div>가격별(0~1,000,000)</div>
          <Slider
            min={0}
            max={1000000}
            range
            step={100}
            onChangeComplete={onChangeCompletePrice}
          />
        </div>
      </div>
      <div className={style.productRightBar}>
        {data?.pages.map((page, i) => (
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
                refetch={refetch}
              />
            ))}
          </Fragment>
        ))}
        <div ref={ref} style={{ height: 50 }} />
      </div>
    </div>
  );
}
