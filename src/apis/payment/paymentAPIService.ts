import { authAxiosInstance } from "../common";
import { KakaoParams, KakaoPayResponse } from "./paymentAPIService.types";

const paymentAPI = {
  kakaoPay: async (params: KakaoParams) => {
    const { data } = await authAxiosInstance.post<KakaoPayResponse>(
      "/payment-service/api/order",
      params
    );
    return data;
  },
};
export default paymentAPI;
