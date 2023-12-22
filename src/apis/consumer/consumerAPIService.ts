import { authAxiosInstance } from "../common";
import {
  GetMyPointListResponse,
  GetMyInfoResponse,
  GetMyCreditListResponse,
  GetMyMembershipResponse,
} from "./consumerAPIservice.types";

const consumerAPI = {
  getMyInfo: async () => {
    const { data } = await authAxiosInstance.get<GetMyInfoResponse>(
      "/consumer-service/api/consumers"
    );
    return data;
  },
  getMyPointList: async (search: "acc" | "use", page: number, size: number) => {
    const { data } = await authAxiosInstance.get<GetMyPointListResponse>(
      `/consumer-service/api/consumers/point-history?search=${search}&page=${page}&size=${size}`
    );
    return data;
  },
  getMyCreditList: async (
    search: "charge" | "bid",
    page: number,
    size: number
  ) => {
    const { data } = await authAxiosInstance.get<GetMyCreditListResponse>(
      `/consumer-service/api/consumers/credit-history?search=${search}&page=${page}&size=${size}`
    );
    return data;
  },
  getMyMembershipList: async (page: number, size: number) => {
    const { data } = await authAxiosInstance.get<GetMyMembershipResponse>(
      `consumer-service/api/consumers/subscription-history?page=${page}&size=${size}`
    );
    return data;
  },
};
export default consumerAPI;
