import type { Metadata } from "next";
import "@/app/(mainLayout)/globals.css";
import RQProvider from "./_component/RQProvider";
import Header from "./_component/Header/Header";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import consumerAPI from "@/apis/consumer/consumerAPIService";

export const metadata: Metadata = {
  title: "전통주점",
  description: "전통주, 마침표를 찍다.",
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["consumer", "myinfo"],
    queryFn: consumerAPI.getMyInfoForStore,
  });
  const dehydratedState = dehydrate(queryClient);
  queryClient.getQueryData(["consumer", "myinfo"]);

  return (
    <section>
      <HydrationBoundary state={dehydratedState}>
        <Header />
        <RQProvider>{children}</RQProvider>
      </HydrationBoundary>
    </section>
  );
}
