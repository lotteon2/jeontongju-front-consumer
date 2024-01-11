import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import searchAPI from "@/apis/search/searchAPIService";
import HolidayContainer from "../../_component/Holiday/HolidayContainer";

export default async function Crop() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["event", "holiday"],
    queryFn: () => searchAPI.getHolidayProducts(),
  });
  const dehydratedState = dehydrate(queryClient);
  queryClient.getQueryData(["event", "holiday"]);

  return (
    <div>
      <HydrationBoundary state={dehydratedState}>
        <HolidayContainer />
      </HydrationBoundary>
    </div>
  );
}
