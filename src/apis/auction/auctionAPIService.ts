import { authAxiosInstance } from "../common";
import {
  EnterAuctionResponse,
  GetAuctionDetailInfoResponse,
} from "./auctionAPIService.types";

const auctionAPI = {
  enterAuction: async (auctionId: string) => {
    const { data } = await authAxiosInstance.get<EnterAuctionResponse>(
      `/auction-service/api/auction/room/${auctionId}`
    );
    return data;
  },
  getAuctionDetailInfo: async () => {
    const { data } = await authAxiosInstance.get<GetAuctionDetailInfoResponse>(
      "/auction-service/api/auction/consumer/detail"
    );
    return data;
  },
};
export default auctionAPI;
