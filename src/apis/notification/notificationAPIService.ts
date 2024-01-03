import { authAxiosInstance } from "../common";
import { ReadAllNotiResponse } from "./notificationAPIService.types";

const notificationAPI = {
  connectNoti: async () => {
    const { data } = await authAxiosInstance.get(
      `/notification-service/api/notifications/connect`
    );
    return data;
  },
  getNoti: async () => {
    const { data } = await authAxiosInstance.get(
      `/notification-service/api/notifications`
    );
    return data;
  },
  clickNoti: async (notificationId: number) => {
    const { data } = await authAxiosInstance.get(
      `/notification-service/api/notifications/${notificationId}/to`
    );
    return data;
  },
  readAllNoti: async () => {
    const { data } = await auth
    AxiosInstance.patch<ReadAllNotiResponse>(
      `/notification-service/api/notifications`
    );
    return data;
  },
};

export default notificationAPI;
