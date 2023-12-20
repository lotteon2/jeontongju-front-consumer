import searchAPI from "@/apis/search/searchAPIService";
import { useQuery } from "@tanstack/react-query";

export default function useGetCropQuery() {
  return useQuery({
    queryKey: ["event", "crop"],
    queryFn: () => searchAPI.getCropProducts(),
    enabled: true,
  });
}
