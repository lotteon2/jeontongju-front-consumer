import { authAxiosInstance } from "../common";
import {
  AddDeleteWishResponse,
  DeleteAllWishResponse,
  GetMyWishListResponse,
} from "./wishAPIService.types";

const wishAPI = {
  addDeleteWish: async (productId: string) => {
    const { data } = await authAxiosInstance.post<AddDeleteWishResponse>(
      `/wish-cart-service/api/wish/${productId}`
    );
    return data;
  },
  deleteAllWish: async (page: number, size: number) => {
    const { data } = await authAxiosInstance.delete<DeleteAllWishResponse>(
      `/wish-cart-service/api/wish/all`
    );
    return data;
  },
  getMyWishList: async (page: number, size: number) => {
    const { data } = await authAxiosInstance.get<GetMyWishListResponse>(
      `/wish-cart-service/api/wish?page=${page}&size=${size}&sort=createdAt,desc`
    );
    return data.data;
  },
};
export default wishAPI;
