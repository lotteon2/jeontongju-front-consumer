import { authAxiosInstance } from "../common";
import {
  AddDeleteWishResponse,
  AddMyCartListResponse,
  DeleteAllWishResponse,
  DeleteCartItemResponse,
  GetMyCartListResponse,
  GetMyWishListResponse,
  UpdateCartResponse,
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
  getMyCartList: async (page: number, size: number) => {
    const { data } = await authAxiosInstance.get<GetMyCartListResponse>(
      `/wish-cart-service/api/cart?page=${page}&size=${size}&sort=createdAt,desc`
    );
    return data.data;
  },
  addCart: async (productId: string, amount: number) => {
    const { data } = await authAxiosInstance.post<AddMyCartListResponse>(
      `/wish-cart-service/api/cart/${productId}?amount=${amount}`
    );
    return data;
  },
  updateCart: async (productId: string, amount: number) => {
    const { data } = await authAxiosInstance.patch<UpdateCartResponse>(
      `/wish-cart-service/api/cart/${productId}?amount=${amount}`
    );
    return data;
  },
  deleteCartItem: async (productId: string) => {
    const { data } = await authAxiosInstance.delete<DeleteCartItemResponse>(
      `/wish-cart-service/api/cart/${productId}`
    );
    return data;
  },
  deleteAllCart: async () => {
    const { data } = await authAxiosInstance.delete<DeleteCartItemResponse>(
      `/wish-cart-service/api/cart/all`
    );
    return data;
  },
};
export default wishAPI;
