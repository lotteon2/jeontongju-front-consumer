import { QueryClient } from "@tanstack/react-query";
import { getSellerList } from "../_lib/getSellerList";
import SellerList from "../_component/SellerList";

export default async function SellerPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["seller", "list"],
    queryFn: getSellerList,
    initialPageParam: 0,
  });
  return (
    <div>
      <SellerList />
    </div>
  );
}
