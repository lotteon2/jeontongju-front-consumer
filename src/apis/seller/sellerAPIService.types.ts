interface ApiResponse<T> {
  code: number;
  message: string;
  detail?: string;
  data: T;
  failure?: string;
}

export type GetSellerInfoResponseData = {
  sellerId: number;
  storeName: string;
  storeDescription: string;
  storePhoneNumber: string;
  storeImageUrl: string;
};

export type GetSellerInfoResponse = ApiResponse<GetSellerInfoResponseData>;
