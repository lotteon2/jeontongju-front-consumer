import loadingImg from "/public/loading.gif";
import Image from "next/image";
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
import Banner from "./_component/Banner";
import Header from "./(mainLayout)/_component/Header/Header";
import notificationAPI from "@/apis/notification/notificationAPIService";

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
      <div className={style.mainPage}>
        <RQProvider>
          <HydrationBoundary state={dehydratedState}>
            <Header />
            <AuctionContainer />
            <Banner type="membership" href="/membership/buy" />
            <Banner type="crop" href="/event/crop" />
            <Banner type="cost" href="/event/cost" />
          </HydrationBoundary>
        </RQProvider>
      </div>
    </>
  );
}
