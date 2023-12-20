import { GetCropProductsResponseData } from "@/apis/search/searchAPIService.types";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import getCropData from "../../_lib/useGetCropQuery";
import CropContainer from "../../_component/Crop/CropContainer";

export default async function Crop() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<
    GetCropProductsResponseData,
    unknown,
    unknown,
    string[]
  >({
    queryKey: ["event", "crop"],
    queryFn: getCropData,
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
