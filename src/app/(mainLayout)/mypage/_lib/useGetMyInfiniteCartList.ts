import { GetMyCartListResponseData } from "@/apis/wishCart/wishAPIService.types";
import { Page } from "@/constants/PageResponseType";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getMyCartList } from "./getMyCartList";

export const useGetMyInfiniteCartList = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, refetch, isLoading } =
    useInfiniteQuery<
      Page<GetMyCartListResponseData[]>,
      Object,
      InfiniteData<Page<GetMyCartListResponseData[]>>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ["cart", "list"],
      queryFn: getMyCartList,
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.last === false ? lastPage.number + 1 : null,
      staleTime: 60 * 1000,
      gcTime: 300 * 1000,
    });
  return { data, fetchNextPage, hasNextPage, isFetching, refetch, isLoading };
};
