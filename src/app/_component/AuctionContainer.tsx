import auctionAPI from "@/apis/auction/auctionAPIService";
import Image from "next/image";
import style from "@/app/page.module.css";
import Link from "next/link";
import Swiper, {
  Autoplay,
  Navigation,
  Pagination,
  Controller,
  EffectFade,
  SwiperSlide,
} from "swiper";

import {
  AuctionProduct,
  GetAuctionDetailInfoResponseData,
} from "@/apis/auction/auctionAPIService.types";

async function getAuction() {
  const data = await auctionAPI.getAuctionDetailInfo();
  if (data.code === 200) return data.data;
}
export default async function AuctionContainer() {
  const data = await getAuction();
  Swiper.use([Autoplay, Navigation, Pagination, Controller, EffectFade]);
  console.log(data);
  return (
    <div className={style.auctionContainer}>
      <div className={style.auctionHeader}>
        매주 금요일 17시! 실시간으로 만나는 전통주
      </div>
      <Link href={`/auction/${data?.auction.auctionId}`}>
        <div className={style.auctionBody}>
          <div className={style.auctionLeft}>
            <Image
              src={data ? data.productList[0].productImageUrl : ""}
              alt="img"
              width={0}
              height={0}
              style={{ width: "100%", height: "100%", cursor: "pointer" }}
            />
            <div className={style.auctionTitle}>{data?.auction.title}</div>
            <div className={style.auctionDesc}>
              {data?.auction.startDate.slice(0, 10)} 오후 5시
            </div>
          </div>
          <div className={style.auctionRight}>
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              // pagination={{ clickable: true }}
              navigation
            >
              {data?.productList?.map((product: AuctionProduct) => (
                <SwiperSlide key={product.auctionProductId}>
                  <Image
                    src={product.productImageUrl || ""}
                    alt={product.description}
                    width={400}
                    height={300}
                    priority
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide">Slide 1</div>
                <div className="swiper-slide">Slide 2</div>
                <div className="swiper-slide">Slide 3</div>
              </div>
              <div className="swiper-pagination"></div>

              <div className="swiper-scrollbar"></div>
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
}
