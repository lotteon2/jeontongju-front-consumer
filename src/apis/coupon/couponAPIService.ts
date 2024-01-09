import { authAxiosInstance } from "../common";
import {
  GetCouponResponse,
  GetMyCouponListForOrderResponse,
  GetMyCouponListResponse,
} from "./couponAPIService.types";

const couponAPI = {
  getCoupon: async () => {
    const { data } = await authAxiosInstance.post<GetCouponResponse>(
      "/coupon-service/api/consumers/coupons"
    );
    return data;
  },
  getMyCouponList: async (page: number, sort: string, size: number) => {
    const { data } = await authAxiosInstance.get<GetMyCouponListResponse>(
      `/coupon-service/api/coupons?search=${sort}&page=${page}&size=${size}`
    );
    return data.data;
  },
  getMyCouponListForOrder: async (totalAmount: number) => {
    const { data } =
      await authAxiosInstance.post<GetMyCouponListForOrderResponse>(
        `/coupon-service/api/consumers/coupons-count`,
        { totalAmount }
      );
    return data;
  },
};

export default couponAPI;
