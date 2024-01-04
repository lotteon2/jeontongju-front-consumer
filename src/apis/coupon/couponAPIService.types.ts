import { Page } from "@/constants/PageResponseType";

interface ApiResponse<T> {
  code: number;
  message: string;
  detail?: string;
  data: T;
  failure?: string;
}

export type GetCouponResponseData = {
  isSoldOut: boolean;
  isOpen: boolean;
  isDuplicated: boolean;
};

export type GetMyCouponListResponseData = {
  couponCode: string;
  couponName: "PROMOTION" | "WELCOME" | "YANGBAN";
  discountAmount: number;
  expiredAt: string;
  minOrderPrice: number;
};

export type GetCouponResponse = ApiResponse<GetCouponResponseData>;

export type GetMyCouponListResponse = ApiResponse<
  Page<GetMyCouponListResponseData[]>
>;
