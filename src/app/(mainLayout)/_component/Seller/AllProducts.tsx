"use client";
import LoadingImg from "/public/loading.gif";
import NotFoundImg from "/public/jeontongju_notfound.png";
import { GetPopularProductsBySellerIdResponseData } from "@/apis/search/searchAPIService.types";
import ProductContainer from "../ProductContainer/ProductContainer";
import { useEffect, useState } from "react";
import searchAPI from "@/apis/search/searchAPIService";
import style from "@/app/(mainLayout)/seller/[sellerId]/seller.module.css";

export default function AllProducts({ sellerId }: { sellerId: number }) {
  const [img, setImg] = useState<string>(LoadingImg);
  const [sellerProducts, setSellerProducts] =
    useState<GetPopularProductsBySellerIdResponseData[]>(null);

  const getAllProductsBySellerId = async (sellerId: number) => {
    try {
      setImg(LoadingImg);
      const data = await searchAPI.getAllProductsBySellerId(
        sellerId,
        "_score",
        10,
        0
      );
      if (data.code === 200) {
        setSellerProducts(data.data.content);
        setImg("");
      }
    } catch (err) {
      console.error(err);
      setImg(NotFoundImg);
    }
  };

  useEffect(() => {
    getAllProductsBySellerId(sellerId);
  }, []);

  return (
    <div className={style.products}>
      {sellerProducts?.map(
        (product: GetPopularProductsBySellerIdResponseData) => (
          <ProductContainer
            productName={product.productName}
            productId={product.productId}
            productImg={product.productThumbnailImageUrl}
            price={product.productPrice}
            capacityToPriceRatio={product.capacityToPriceRatio}
            key={product.productId}
            isLikes={product.isLikes}
          />
        )
      )}
    </div>
  );
}
