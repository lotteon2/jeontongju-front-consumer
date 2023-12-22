import { authAxiosInstance } from "../common";
import {
  GetMyPointListResponse,
  GetMyInfoResponse,
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
};
export default consumerAPI;
