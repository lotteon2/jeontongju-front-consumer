"use client";
import NotFoundImg from "/public/jeontongju_notfound.png";
import { useSearchParams } from "next/navigation";
import { ProductData } from "@/apis/search/searchAPIService.types";
import { Page } from "@/constants/PageResponseType";
import { SORT, SortOptions } from "@/constants/SortEnum";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import { SNACK, SnackOptions } from "@/constants/SnackTypeEnum";
import { useInView } from "react-intersection-observer";
import style from "@/app/(mainLayout)/product/list/productList.module.css";
import { Select, Slider } from "antd";
import { CONCEPT, ConceptOptions } from "@/constants/ConceptEnum";
import { RAW_MATERIAL, RawMaterialOptions } from "@/constants/MaterialEnum";
import searchAPI from "@/apis/search/searchAPIService";
import Script from "next/script";
import Image from "next/image";
import ProductContainer from "../../_component/ProductContainer/ProductContainer";

type Props = {
  params: { categoryId: string };
};

export default function CategoryPage({ params }: Props) {
  const { categoryId } = params;
  const [sort, setSort] = useState<keyof typeof SORT>("_score,desc");
  const [rawMaterial, setRawMaterial] = useState<(keyof typeof RAW_MATERIAL)[]>(
    []
  );
  const [food, setFoods] = useState<(keyof typeof SNACK)[]>([]);
  const [concepts, setConcepts] = useState<(keyof typeof CONCEPT)[]>([]);
  const [minPrice, setMinPrice] = useState<number>(-1);
  const [maxPrice, setMaxPrice] = useState<number>(-1);
  const [minAlcoholDegree, setMinAlcoholDegree] = useState<number>(-1);
  const [maxAlcoholDegree, setMaxAlcoholDegree] = useState<number>(-1);

  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery<
      Page<ProductData[]>,
      Object,
      InfiniteData<Page<ProductData[]>>,
      [
        _1: string,
        _2: string,
        _3: (keyof typeof RAW_MATERIAL)[],
        _4: (keyof typeof SNACK)[],
        _5: number,
        _6: number,
        _7: number,
        _8: number,
        _9: (keyof typeof CONCEPT)[],
        _10: string
      ],
      number
    >({
      queryKey: [
        "search",
        "category",
        rawMaterial,
        food,
        minPrice,
        maxPrice,
        minAlcoholDegree,
        maxAlcoholDegree,
        concepts,
        categoryId,
      ],
      queryFn: ({ pageParam = 0 }) =>
        searchAPI.getAllProductListForCategoryId(
          Number(categoryId),
          pageParam,
          sort,
          10,
          rawMaterial,
          food,
          minPrice,
          maxPrice,
          minAlcoholDegree,
          maxAlcoholDegree,
          concepts
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

  useEffect(() => {}, [params]);
  const onChangeComplete = (value: number[]) => {
    setMinAlcoholDegree(value[0]);
    setMaxAlcoholDegree(value[1]);
  };

  const onChangeCompletePrice = (value: number[]) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  return (
    <>
      <Script id="my-script">{`console.log('Rendering on client:', typeof window !== 'undefined');`}</Script>
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
          <div>
            <div>원료</div>
            <Select
              mode="multiple"
              placeholder=""
              options={RawMaterialOptions}
              onChange={setRawMaterial}
              style={{ width: "100%" }}
              value={rawMaterial}
              allowClear
            />
          </div>
          <div>
            <div>잘 어울리는 안주</div>
            <Select
              mode="multiple"
              placeholder=""
              options={SnackOptions}
              onChange={setFoods}
              style={{ width: "100%" }}
              value={food}
              allowClear
            />
          </div>
          <div>
            <div>잘 어울리는 컨셉</div>
            <Select
              mode="multiple"
              placeholder=""
              options={ConceptOptions}
              onChange={setConcepts}
              style={{ width: "100%" }}
              value={concepts}
              allowClear
            />
          </div>
        </div>
        <div className={style.productRightBar}>
          {data?.pages[0]?.content.length && (
            <Select
              style={{
                marginRight: "auto",
                position: "absolute",
                right: 0,
              }}
              options={SortOptions}
              onChange={setSort}
              placeholder="기본 검색순"
            />
          )}

          <div className={style.productRightBar}>
            <div className={style.products}>
              {data?.pages[0].content.length === 0 && (
                <>
                  <Image
                    src={NotFoundImg}
                    alt="notfound"
                    width={0}
                    height={0}
                    style={{ width: "80%", height: "80%" }}
                  />
                  <div>해당 상품이 없어요</div>
                </>
              )}
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
        </div>
      </div>
    </>
  );
}
