import { Page } from "@/constants/PageResponseType";

interface ApiResponse<T> {
  code: number;
  message: string;
  detail?: string;
  data: T;
  failure?: string;
}

export type BidParams = {
  auctionId: string;
  bidPrice: number;
};

export interface EnterAuctionResponseData {
  auctionName: string;
  status: "ING" | "BEFORE" | "AFTER";
}

export type AuctionProduct = {
  sellerId: number;
  sellerName: string;
  sellerEmail: string;
  businessmanName: string;
  storePhoneNumber: string;
  storeImageUrl: string;
  auctionProductId: string;
  productName: string;
  description: string;
  startingPrice: number;
  capacity: number;
  alcoholDegree: number;
  productImageUrl: string;
  createdAt: string;
};

export interface GetAuctionDetailInfoResponseData {
  auction: {
    auctionId: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: "ING" | "BEFORE" | "AFTER";
  };
  productList: AuctionProduct[];
}

export type GetMyAuctionListResponseData = {
  auctionId: string;
  auctionName: string;
  productName: string;
  productImageUrl: string;
  startingPrice: number;
  lastBidPrice: number;
  myLastBidPrice: number;
  isBid: boolean;
  bidDate: string;
};

export type EnterAuctionResponse = ApiResponse<EnterAuctionResponseData>;
export type GetAuctionDetailInfoResponse =
  ApiResponse<GetAuctionDetailInfoResponseData>;
export type BidResponse = ApiResponse<string>;
export type GetMyAuctionListResponse = ApiResponse<
  Page<GetMyAuctionListResponseData[]>
>;
