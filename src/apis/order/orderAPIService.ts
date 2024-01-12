import { authAxiosInstance } from "../common";
import {
  CancelMyOrderByOrderIdResponse,
  CancelMyOrderByProductOrderIdResponse,
  ConfirmMyOrderByProductOrderIdResponse,
  GetMyOrderListResponse,
} from "./orderAPIService.types";

const orderAPI = {
  getMyOrderList: async (page: number, size: number) => {
    const { data } = await authAxiosInstance.get<GetMyOrderListResponse>(
      `/order-service/api/order/consumer?page=${page}&size=${size}`
    );
    return data.data;
  },
  cancelMyOrderByOrderId: async (ordersId: string) => {
    const { data } =
      await authAxiosInstance.post<CancelMyOrderByOrderIdResponse>(
        `/order-service/api/order-cancel`,
        {
          ordersId,
        }
      );
    return data;
  },
  cancelMyOrderByProductOrderId: async (productOrderId: number) => {
    const { data } =
      await authAxiosInstance.post<CancelMyOrderByProductOrderIdResponse>(
        `/order-service/api/product-order-cancel`,
        {
          productOrderId,
        }
      );
    return data;
  },
  confirmMyOrderByOrderId: async (productOrderId: number) => {
    const { data } =
      await authAxiosInstance.patch<ConfirmMyOrderByProductOrderIdResponse>(
        `/order-service/api/product-order-confirm/${productOrderId}`
      );
    return data;
  },
};
export default orderAPI;
