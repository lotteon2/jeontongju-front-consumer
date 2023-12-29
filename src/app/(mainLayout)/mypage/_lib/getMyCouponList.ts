import { authAxiosInstance } from "@/apis/common";
import { GetMyCouponListResponse } from "@/apis/coupon/couponAPIService.types";

type Props = { pageParam?: number; size: number };
export async function getMyCouponList({ pageParam, size }: Props) {
  const { data } = await authAxiosInstance.get<GetMyCouponListResponse>(
    `/coupon-service/api/coupons?search=used&page=${pageParam}&size=${size}`
  );
  return data.data;
}
