import { SORT } from "@/constants/SortEnum";
import { authAxiosInstance, unAuthAxiosInstance } from "../common";
import {
  GetCropProductsResponse,
  GetAllProductsBySellerIdResponse,
  GetPopularProductsBySellerIdResponse,
  GetProductDetailByProductIdResponse,
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
  getCropProducts: async (sort: "capacityToPriceRatio" | "totalSalesCount") => {
    if (sort === "totalSalesCount") {
      const { data } = await unAuthAxiosInstance.get<GetCropProductsResponse>(
        `/search-service/api/products?sort=${sort},desc&size=10&topic=cerealCrops`
      );
      return data;
    } else {
      const { data } = await unAuthAxiosInstance.get<GetCropProductsResponse>(
        `/search-service/api/products?sort=${sort},desc&size=10`
      );
      return data;
    }
  },
  getAllProductsBySellerId: async (
    sellerId: number,
    sort: keyof typeof SORT,
    size: number,
    page: number
  ) => {
    const { data } =
      await unAuthAxiosInstance.get<GetAllProductsBySellerIdResponse>(
        `/search-service/api/sellers/${sellerId}/products/all?sort=${sort}&size=${size}&page=${page}`
      );
    return data;
  },
};
export default searchAPI;
