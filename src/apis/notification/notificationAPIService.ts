import { authAxiosInstance } from "../common";
import {
  ClickNotiResponse,
  ReadAllNotiResponse,
} from "./notificationAPIService.types";

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
    const { data } = await authAxiosInstance.get<ClickNotiResponse>(
      `/notification-service/api/notifications/${notificationId}/to`
    );
    return data;
  },
  readAllNoti: async () => {
    const { data } = await authAxiosInstance.patch<ReadAllNotiResponse>(
      `/notification-service/api/notifications`
    );
    return data;
  },
  notiFcm: async (title: string, body: string) => {
    const { data } = await authAxiosInstance.post(
      `/notification-service/api/notifications/fcm`,
      {
        title,
        body,
      }
    );
    return data;
  },
};

export default notificationAPI;
