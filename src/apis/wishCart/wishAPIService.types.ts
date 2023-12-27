import { Page } from "@/constants/PageResponseType";

interface ApiResponse<T> {
  code: number;
  message: string;
  detail?: string;
  data: T;
  failure?: string;
}

export type GetMyWishListResponseData = {
  productId: string;
  productName: string;
  productPrice: number;
  productThumbnailImageUrl: string;
  isSoldOut: boolean;
  isActivate: boolean;
  isLikes: boolean;
};

export type GetMyCartListResponseData = {
  productId: string;
  name: string;
  price: number;
  productThumbnailImageUrl: string;
  amount: number;
  isSoldOut: boolean;
  isActivate: boolean;
};

export type AddMyCartListResponseData = {
  stock: number;
};

export type AddDeleteWishResponse = ApiResponse<string>;
export type DeleteAllWishResponse = ApiResponse<string>;
export type GetMyWishListResponse = ApiResponse<
  Page<GetMyWishListResponseData[]>
>;

export type GetMyCartListResponse = ApiResponse<
  Page<GetMyCartListResponseData[]>
>;

export type AddMyCartListResponse = ApiResponse<
  Page<AddMyCartListResponseData[]>
>;

export type UpdateCartResponse = ApiResponse<string>;

export type DeleteCartItemResponse = ApiResponse<string>;
