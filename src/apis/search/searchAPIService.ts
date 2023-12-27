import { SORT } from "@/constants/SortEnum";
import { authAxiosInstance, unAuthAxiosInstance } from "../common";
import {
  GetCropProductsResponse,
  GetAllProductsBySellerIdResponse,
  GetPopularProductsBySellerIdResponse,
  GetProductDetailByProductIdResponse,
  GetCostProductsResponse,
} from "./searchAPIService.types";

const searchAPI = {
  getProductDetailByProductId: async (productId: string) => {
    const { data } =
      await unAuthAxiosInstance.get<GetProductDetailByProductIdResponse>(
        `/search-service/api/products/${productId}`
      );
    return data;
  },
  getPopularProductsBySellerId: async (
    sellerId: number,
    sort: "totalSalesCount" | "reviewCount"
  ) => {
    const { data } =
      await unAuthAxiosInstance.get<GetPopularProductsBySellerIdResponse>(
        `/search-service/api/sellers/${sellerId}/products?sort=${sort},desc&size=5`
      );

    return data;
  },
  getCropProducts: async () => {
    const { data } = await unAuthAxiosInstance.get<GetCropProductsResponse>(
      `/search-service/api/products/cereal-crops?sort=totalSalesCount,desc&size=10`
    );
    return data;
  },
  getCostProducts: async () => {
    const { data } = await unAuthAxiosInstance.get<GetCostProductsResponse>(
      `/search-service/api/products?sort=capacityToPriceRatio,desc&size=6`
    );
    return data;
  },
  getAllProductsBySellerId: async (
    sellerId: number,
    sort: keyof typeof SORT,
    size: number,
    page: number
  ) => {
    const { data } =
      await authAxiosInstance.get<GetAllProductsBySellerIdResponse>(
        `/search-service/api/sellers/${sellerId}/products/all?sort=${sort}&size=${size}&page=${page}`
      );
    return data.data;
  },
};
export default searchAPI;
