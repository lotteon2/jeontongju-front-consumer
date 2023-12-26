import { authAxiosInstance } from "@/apis/common";
import sellerAPI from "@/apis/seller/sellerAPIService";
import { GetSellerListResponse } from "@/apis/seller/sellerAPIService.types";

type Props = { pageParam?: number };
export async function getSellerList({ pageParam }: Props) {
  const { data } = await authAxiosInstance.get<GetSellerListResponse>(
    `/seller-service/api/sellers/all?page=${pageParam}&size=10`
  );
  return data.data.content;
}
