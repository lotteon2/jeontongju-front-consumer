import { authAxiosInstance } from "../common";
import {
  AddDeleteWishResponse,
  DeleteAllWishResponse,
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
};
export default wishAPI;
