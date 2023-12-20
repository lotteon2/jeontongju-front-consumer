import { authAxiosInstance, unAuthAxiosInstance } from "../common";
import {
  GetCropProductsResponse,
  GetPopularProductsBySellerIdResponse,
  GetProductDetailByProductIdResponse,
} from "./searchAPIService.types";

const searchAPI = {
  getProductDetailByProductId: async (productId: string) => {
    const { data } =
      await authAxiosInstance.get<GetProductDetailByProductIdResponse>(
        `/search-service/api/products/${productId}`
      );
    return data;
  },
  getPopularProductsBySellerId: async (
    sellerId: number,
    sort: "totalSalesCount" | "reviewCount"
  ) => {
    const { data } =
      await authAxiosInstance.get<GetPopularProductsBySellerIdResponse>(
        `/search-service/api/sellers/${sellerId}/products?sort=${sort},desc&size=5`
      );

    return data;
  },
  getCropProducts: async () => {
    const { data } = await unAuthAxiosInstance.get<GetCropProductsResponse>(
      `/search-service/api/products?sort=totalSalesCount,desc&size=10&topic=cerealCrops`
    );
    console.log(data);
    return data;
  },
};
export default searchAPI;
