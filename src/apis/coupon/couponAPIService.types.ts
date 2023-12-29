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
};

export type GetCouponResponse = ApiResponse<GetCouponResponseData>;
