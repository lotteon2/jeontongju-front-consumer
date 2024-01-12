import { authAxiosInstance, unAuthAxiosInstance } from "../common";
import {
  BidParams,
  BidResponse,
  EnterAuctionResponse,
  GetAuctionDetailInfoResponse,
  GetMyAuctionListResponse,
} from "./auctionAPIService.types";

const auctionAPI = {
  enterAuction: async (auctionId: string) => {
    const { data } = await authAxiosInstance.get<EnterAuctionResponse>(
      `/auction-service/api/auction/room/${auctionId}`
    );
    return data;
  },
  getAuctionDetailInfo: async () => {
    const { data } =
      await unAuthAxiosInstance.get<GetAuctionDetailInfoResponse>(
        "/auction-service/api/auction/consumer/detail"
      );
    return data;
  },
  // 현재가 + 호가만큼 입찰하기
  bid: async (params: BidParams) => {
    const { data } = await authAxiosInstance.post<BidResponse>(
      `auction-service/api/auction/bid`,
      params
    );
    return data;
  },
  GetMyAuctionList: async () => {
    const { data } = await authAxiosInstance.get<GetMyAuctionListResponse>(
      `auction-service/api/auction/bid/consumer`
    );
    return data;
  },
};
export default auctionAPI;
