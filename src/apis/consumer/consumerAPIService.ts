import { authAxiosInstance } from "../common";
import { GetMyInfoResponse } from "./consumerAPIservice.types";

const consumerAPI = {
  getMyInfo: async () => {
    const { data } = await authAxiosInstance.get<GetMyInfoResponse>(
      "/consumer-service/api/consumers"
    );
    return data;
  },
};
export default consumerAPI;
