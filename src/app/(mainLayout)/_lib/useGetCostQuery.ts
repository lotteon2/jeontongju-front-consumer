import searchAPI from "@/apis/search/searchAPIService";
import { useQuery } from "@tanstack/react-query";

export default function useGetCostQuery() {
  return useQuery({
    queryKey: ["event", "cost"],
    queryFn: () => searchAPI.getCostProducts(),
    enabled: true,
  });
}
