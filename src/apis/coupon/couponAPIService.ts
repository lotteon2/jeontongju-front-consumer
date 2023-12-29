import { authAxiosInstance } from "../common";
import { GetCouponResponse } from "./couponAPIService.types";

const couponAPI = {
  getCoupon: async () => {
    const { data } = await authAxiosInstance.post<GetCouponResponse>(
      "/coupon-service/api/consumers/coupons"
    );
    return data;
  },
};

export default couponAPI;
