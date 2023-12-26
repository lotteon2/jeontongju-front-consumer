import { authAxiosInstance } from "../common";
import { GetSellerInfoResponse } from "./sellerAPIService.types";

const sellerAPI = {
  getSellerInfo: async (sellerId: number) => {
    const { data } = await authAxiosInstance.get<GetSellerInfoResponse>(
      `/seller-service/api/sellers/${sellerId}/info`
    );
    return data;
  },
  getSellerList: async (page: number, size: number) => {
    const { data } = await authAxiosInstance.get<GetSellerListResponse>(
      `/seller-service/api/sellers/all?page=${page}&size=${size}`
    );
    return data;
  },
};
export default sellerAPI;
