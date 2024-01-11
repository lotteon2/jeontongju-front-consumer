import "@/app/(mainLayout)/globals.css";
import style from "@/app/page.module.css";
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
import productAPI from "@/apis/product/productAPIService";
import MainShortsContainer from "./_component/MainShortsContainer";
import MainProductContainer from "./_component/MainProductContainer";
import TopButton from "./_component/TopButton/TopButton";
import CartButton from "./_component/CartButton/CartButton";
import MainReviewContainer from "./_component/MainReviewContainer";
import Footer from "./(mainLayout)/_component/Footer/Footer";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["auction", "detail"],
    queryFn: () => auctionAPI.getAuctionDetailInfo(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["shorts", "main"],
    queryFn: () => productAPI.getAllShorts(0, 5),
  });

  const dehydratedState = dehydrate(queryClient);
  queryClient.getQueryData(["auction", "detail"]);
  queryClient.getQueryData(["shorts", "main"]);

  return (
    <>
      <div className={style.mainPage}>
        <RQProvider>
          <HydrationBoundary state={dehydratedState}>
            <Header />
            <MainProductContainer />
            <Banner type="membership" href="/membership/buy" />
            <AuctionContainer />
            <Banner type="coupon" />
            <MainShortsContainer />
            <Banner type="crop" href="/event/crop" />
            <MainReviewContainer />
            <Banner type="cost" href="/event/cost" />
            <CartButton />
            <TopButton />
            <Footer />
          </HydrationBoundary>
        </RQProvider>
      </div>
    </>
  );
}
