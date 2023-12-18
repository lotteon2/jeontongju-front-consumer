import { authAxiosInstance } from "../common";
import { KakaoParams, KakaoPayResponseData } from "./paymentAPIService.types";

const paymentAPI = {
  kakaoPay: async (params: KakaoParams) => {
    const { data } = await authAxiosInstance.post<KakaoPayResponseData>(
      "/payment-service/api/order",
      params
    );
    return data;
  },
};
export default paymentAPI;
