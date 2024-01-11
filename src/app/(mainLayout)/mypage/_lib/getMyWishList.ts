import { authAxiosInstance } from "@/apis/common";
import { GetMyWishListResponse } from "@/apis/wishCart/wishAPIService.types";

type Props = { pageParam?: number };
export async function getMyWishList({ pageParam }: Props) {
  const { data } = await authAxiosInstance.get<GetMyWishListResponse>(
    `/wish-cart-service/api/wish?page=${pageParam}&size=5&sort=createdAt,desc`
  );
  return data.data;
}
