import { authAxiosInstance } from "../common";

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
  },
};

export default notificationAPI;
