import { GetMyAuctionListResponse } from "@/apis/auction/auctionAPIService.types";
import { authAxiosInstance } from "@/apis/common";

type Props = { pageParam?: number };
export async function getMyAuctionList({ pageParam }: Props) {
  const { data } = await authAxiosInstance.get<GetMyAuctionListResponse>(
    `auction-service/api/auction/bid/consumer?page=${pageParam}&size=5`
  );
  return data.data;
}
