import { authAxiosInstance } from "../common";
import { GetSellerInfoResponse } from "./sellerAPIService.types";

const sellerAPI = {
  getSellerInfo: async (sellerId: number) => {
    const { data } = await authAxiosInstance.get<GetSellerInfoResponse>(
      `/seller-service/api/sellers/${sellerId}/info`
    );
    return data;
  },
};
export default sellerAPI;
