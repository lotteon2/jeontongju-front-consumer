import { authAxiosInstance } from "../common";
import { GetMyOrderListResponse } from "./orderAPIService.types";

const orderAPI = {
  getMyOrderList: async (page: number, size: number, isAuction: boolean) => {
    const { data } = await authAxiosInstance.get<GetMyOrderListResponse>(
      `/order-service/api/order/user?page=${page}&size=${size}&isAuction=${isAuction}`
    );
    return data;
  },
};
export default orderAPI;
