"use client";
import LoadingImg from "/public/loading.gif";
import NotFoundImg from "/public/jeontongju_notfound.png";
import sellerAPI from "@/apis/seller/sellerAPIService";
import { GetSellerInfoResponseData } from "@/apis/seller/sellerAPIService.types";
import { useEffect, useState } from "react";
import style from "@/app/(mainLayout)/seller/[sellerId]/seller.module.css";
import Image from "next/image";

type Props = {
  params: { sellerId: string };
};

export default function Seller({ params }: Props) {
  const { sellerId } = params;
  const [sellerInfo, setSellerInfo] = useState<GetSellerInfoResponseData>(null);
  const [img, setImg] = useState<string>(LoadingImg);

  const getSellerInfo = async (sellerId: number) => {
    try {
      const data = await sellerAPI.getSellerInfo(sellerId);
      if (data.code === 200) {
        setSellerInfo(data.data);
        setImg("");
      }
    } catch (err) {
      console.error(err);
      setImg(NotFoundImg);
    }
  };

  useEffect(() => {
    getSellerInfo(parseInt(params.sellerId));
  }, []);

  return (
    <>
      {sellerInfo ? (
        <div className={style.sellerPage}>
          <div className={style.sellerHeader}>
            <Image 
            <Image
              src={sellerInfo.storeImageUrl}
              alt="seller-thumbnail"
              width={0}
              height={0}
              style={{
                cursor: "pointer",
                width: "3rem",
                height: "3rem",
                borderRadius: "50%",
              }}
            />
            <div className={style.storeName}>{sellerInfo.storeName}</div>
            <div>{sellerInfo.storeDescription}</div>
          </div>
        </div>
      ) : (
        <Image
          src={img}
          alt="seller-notfound"
          width={0}
          height={0}
          style={{ cursor: "pointer", width: "80%", height: "80%" }}
        />
      )}
    </>
  );
}
