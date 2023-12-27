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

export type AddDeleteWishResponse = ApiResponse<string>;
export type DeleteAllWishResponse = ApiResponse<string>;
export type GetMyWishListResponse = ApiResponse<
  Page<GetMyWishListResponseData[]>
>;
