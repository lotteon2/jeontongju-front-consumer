import { authAxiosInstance, unAuthAxiosInstance } from "../common";
import {
  GetCategoriesResponse,
  GetShortDetailResponse,
  GetShortsListResponse,
} from "./productAPIService.types";

const productAPI = {
  getAllShorts: async (page: number, size: number) => {
    const { data } = await unAuthAxiosInstance.get<GetShortsListResponse>(
      `/product-service/api/shorts?page=${page}&sort=shortsHits,desc&size=${size}`
    );
    return data.data;
  },
  getShortListBySellerId: async (sellerId: number, page: number) => {
    const { data } = await unAuthAxiosInstance.get<GetShortsListResponse>(
      `/product-service/api/sellers/${sellerId}/shorts?page=${page}&sort=shortsHits,desc&size=5`
    );
    return data.data;
  },
  getShortsDetail: async (shortsId: number) => {
    const { data } = await unAuthAxiosInstance.get<GetShortDetailResponse>(
      `/product-service/api/shorts/${shortsId}`
    );
    return data;
  },
  getCategories: async () => {
    const { data } = await unAuthAxiosInstance.get<GetCategoriesResponse>(
      `/product-service/api/categories`
    );
    return data;
  },
};

export default productAPI;
