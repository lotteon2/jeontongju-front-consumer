import { authAxiosInstance } from "@/apis/common";
import sellerAPI from "@/apis/seller/sellerAPIService";
import { GetSellerListResponse } from "@/apis/seller/sellerAPIService.types";

type Props = { pageParam?: number };
export async function getSellerList({ pageParam }: Props) {
  const { data } = await authAxiosInstance.get<GetSellerListResponse>(
    `/seller-service/api/sellers/all?page=${pageParam}&size=10`
  );
  return data.data.content;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/seller-service/api/sellers/all?page=${pageParam}&size=10`,
    {
      next: {
        tags: ["seller", "list"],
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  console.log(res.json());
  return res.json();
}
