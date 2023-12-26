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

export type GetSellerListResponseData = {
  sellerId: number;
  email: string;
  businessmanName: string;
  storeName: string;
  storePhoneNumber: string;
  createdAt: string;
  storeDescription: string;
  storeImageUrl: string;
};

export type GetSellerInfoResponse = ApiResponse<GetSellerInfoResponseData>;
