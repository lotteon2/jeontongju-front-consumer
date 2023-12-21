import loadingImg from "/public/loading.gif";
import Image from "next/image";
import membershipBannerImg from "/public/membership_banner.png";
import style from "@/app/page.module.css";
import Link from "next/link";
import AuctionContainer from "./_component/AuctionContainer";
import auctionAPI from "@/apis/auction/auctionAPIService";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import RQProvider from "./(mainLayout)/_component/RQProvider";
import Head from "next/head";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["auction", "detail"],
    queryFn: () => auctionAPI.getAuctionDetailInfo(),
  });
  const dehydratedState = dehydrate(queryClient);
  queryClient.getQueryData(["auction", "detail"]);

  return (
    <>
      <Head>
        <script src="../app/_component/swiper.js" defer></script>
      </Head>
      <div className={style.mainPage}>
        <RQProvider>
          <HydrationBoundary state={dehydratedState}>
            <AuctionContainer />
            <Link href={"/membership"}>
              <Image
                src={loadingImg}
                width={0}
                height={0}
                alt="membership_banner"
                style={{ cursor: "pointer", width: "100%", height: "20%" }}
              />
            </Link>
          </HydrationBoundary>
        </RQProvider>
      </div>
    </>
  );
}
