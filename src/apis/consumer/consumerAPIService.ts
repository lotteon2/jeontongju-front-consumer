import { authAxiosInstance } from "../common";
import {
  GetMyPointListResponse,
  GetMyInfoResponse,
  GetMyCreditListResponse,
  GetMyInfoForStoreResponse,
  GetMyMembershipResponse,
  GetMyAddressListResponse,
  GetMyAddressByAddressIdResponse,
  DeleteMyAddressByAddressIdResponse,
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
  getMyInfoForStore: async () => {
    const { data } = await authAxiosInstance.get<GetMyInfoForStoreResponse>(
      `/consumer-service/api/consumers/my-info`
    );
    return data;
  },
  getMyMembershipList: async (page: number, size: number) => {
    const { data } = await authAxiosInstance.get<GetMyMembershipResponse>(
      `consumer-service/api/consumers/subscription-history?page=${page}&size=${size}`
    );
    return data;
  },
  getMyAddressList: async () => {
    const { data } = await authAxiosInstance.get<GetMyAddressListResponse>(
      `/consumer-service/api/consumers/addresses`
    );
    return data;
  },
  getMyAddressByAddressId: async (addressId: number) => {
    const { data } =
      await authAxiosInstance.get<GetMyAddressByAddressIdResponse>(
        `/consumer-service/api/consumers/addresses/${addressId}`
      );
    return data;
  },
  deleteMyAddressByAddressId: async (addressId: number) => {
    const { data } =
      await authAxiosInstance.delete<DeleteMyAddressByAddressIdResponse>(
        `/consumer-service/api/consumers/addresses/${addressId}`
      );
    return data;
  },
};
export default consumerAPI;
