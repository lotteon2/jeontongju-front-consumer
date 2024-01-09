"use client";
import productAPI from "@/apis/product/productAPIService";
import { Short } from "@/apis/product/productAPIService.types";
import { useEffect, useState } from "react";
import style from "@/app/page.module.css";
import ShortsDetail from "../(mainLayout)/shorts/[id]/page";
import { useRouter } from "next/navigation";

export default function MainShortsContainer() {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const [data, setData] = useState<Short[]>();
  async function getAuction() {
    const data = await productAPI.getAllShorts(0, 5);
    setData(data.content);
  }
  useEffect(() => {
    getAuction();
    setMounted(true);
  }, []);

  return (
    <div className={style.mainShortsContainer}>
      <div className={style.mainShortsTop}>
        <h2>지금 뜨고 있는 쇼츠!</h2>
        <div
          className={style.goList}
          onClick={() => router.push("/shorts/list")}
        >
          더 많은 쇼츠 보러가기 {">"}
        </div>
      </div>

      <div className={style.shortsContainer}>
        {data?.map((short) => (
          <ShortsDetail
            params={{ id: short.shortsId }}
            shorts={short}
            key={short.shortsId}
            isMain={true}
          />
        ))}
      </div>
    </div>
  );
}
