import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import CostContainer from "../../_component/Cost/CostContainer";
import searchAPI from "@/apis/search/searchAPIService";

export default async function Cost() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["event", "cost"],
    queryFn: () => searchAPI.getCropProducts("capacityToPriceRatio"),
  });
  const dehydratedState = dehydrate(queryClient);
  queryClient.getQueryData(["event", "cost"]);

  return (
    <div>
      <HydrationBoundary state={dehydratedState}>
        <CostContainer />
      </HydrationBoundary>
    </div>
  );
}
