import { authAxiosInstance } from "../common";
import {
  BuyCreditParams,
  KakaoParams,
  MembershipParams,
  PayResponseData,
} from "./paymentAPIService.types";

const paymentAPI = {
  kakaoPay: async (params: KakaoParams) => {
    const { data } = await authAxiosInstance.post<PayResponseData>(
      "/payment-service/api/order",
      params
    );
    return data;
  },
  membership: async (params: MembershipParams) => {
    const { data } = await authAxiosInstance.post<PayResponseData>(
      `/payment-service/api/subscription`,
      params
    );
    return data;
  },
  buyCredit: async (params: BuyCreditParams) => {
    const { data } = await authAxiosInstance.post<PayResponseData>(
      `/payment-service/api/credit`,
      params
    );
    return data;
  },
};
export default paymentAPI;
