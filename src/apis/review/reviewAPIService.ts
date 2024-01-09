import { REVIEW } from "@/constants/ReviewEnum";
import { authAxiosInstance, unAuthAxiosInstance } from "../common";
import {
  AddReviewParams,
  AddReviewResponse,
  GetMyReviewListResponse,
  GetReviewListByProductIdResponse,
  LikeReviewResponse,
} from "./reviewAPIService.types";

const reviewAPI = {
  addReview: async (params: AddReviewParams) => {
    const { data } = await authAxiosInstance.post<AddReviewResponse>(
      `/review-service/api/products/reviews`,
      params
    );
    return data;
  },
  getReviewListByProductId: async (
    productId: string,
    page: number,
    sort: keyof typeof REVIEW,
    size: number
  ) => {
    const { data } =
      await authAxiosInstance.get<GetReviewListByProductIdResponse>(
        `/review-service/api/products/${productId}/reviews?page=${page}&sort=${sort},desc&size=${size}`
      );
    return data.data;
  },
  likeReview: async (reviewId: number) => {
    const { data } = await authAxiosInstance.post<LikeReviewResponse>(
      `/review-service/api/reviews/${reviewId}/sympathy`
    );
    return data;
  },
  getMyReviewList: async (page: number, size: number) => {
    const { data } = await authAxiosInstance.get<GetMyReviewListResponse>(
      `/review-service/api/reviews?page=${page}&size=${size}`
    );
    return data.data;
  },
};
export default reviewAPI;
