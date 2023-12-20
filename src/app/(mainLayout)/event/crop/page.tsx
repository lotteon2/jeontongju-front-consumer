import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import CropContainer from "../../_component/Crop/CropContainer";
import searchAPI from "@/apis/search/searchAPIService";

export default async function Crop() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["event", "crop"],
    queryFn: () => searchAPI.getCropProducts(),
  });
  const dehydratedState = dehydrate(queryClient);
  queryClient.getQueryData(["event", "crop"]);

  return (
    <div>
      <HydrationBoundary state={dehydratedState}>
        <CropContainer />
      </HydrationBoundary>
    </div>
  );
}
