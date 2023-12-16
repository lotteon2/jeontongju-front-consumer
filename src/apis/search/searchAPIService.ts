import { authAxiosInstance, unAuthAxiosInstance } from "../common";
import { GetProductDetailByProductIdResponse } from "./searchAPIService.types";

const searchAPI = {
  getProductDetailByProductId: async (productId: string) => {
    const { data } =
      await authAxiosInstance.get<GetProductDetailByProductIdResponse>(
        `/search-service/api/products/${productId}`
      );
    return data;
  },
};
export default searchAPI;
