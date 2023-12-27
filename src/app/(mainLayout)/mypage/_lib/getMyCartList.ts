import { authAxiosInstance } from "@/apis/common";
import { GetMyCartListResponse } from "@/apis/wishCart/wishAPIService.types";

type Props = { pageParam?: number };
export async function getMyCartList({ pageParam }: Props) {
  const { data } = await authAxiosInstance.get<GetMyCartListResponse>(
    `/wish-cart-service/api/cart?page=${pageParam}&size=5&sort=createdAt,desc`
  );
  return data;
}
