import { authAxiosInstance, unAuthAxiosInstance } from "../common";
import {
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
};
export default searchAPI;
