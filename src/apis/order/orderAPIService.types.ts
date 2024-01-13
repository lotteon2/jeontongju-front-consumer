import { ORDER_STATE } from "@/constants/OrderStatusEnum";
import { Page } from "@/constants/PageResponseType";

interface ApiResponse<T> {
  code: number;
  message: string;
  detail?: string;
  data: T;
  failure?: string;
}

export type GetMyOrderListResponseData = {
  order: {
    ordersId: string;
    orderDate: string;
    orderStatus: keyof typeof ORDER_STATE;
    isAuction: boolean;
    isAbleToCancel: boolean;
  };
  product: {
    productOrderId: number;
    productId: string;
    productName: string;
    productCount: number;
    productPrice: number;
    productTotalAmount: number;
    productOrderStatus: keyof typeof ORDER_STATE;
    productThumbnailImageUrl: string;
    sellerId: number;
    sellerName: string;
    isAuction: boolean;
    isConfirmAllowed: boolean;
    isReviewAllowed: boolean;
  }[];
  payment: {
    minusPointAmount: number;
    minusCouponAmount: number;
    totalPrice: number;
    couponCode: string;
    realPrice: number;
  };
  delivery: {
    recipientName: string;
    recipientPhoneNumber: string;
    basicAddress: string;
    addressDetail: string;
    zonecode: string;
  };
};

export type CancelMyOrderByOrderIdResponse = ApiResponse<string>;

export type CancelMyOrderByProductOrderIdResponse = ApiResponse<string>;

export type GetMyOrderListResponse = ApiResponse<
  Page<GetMyOrderListResponseData[]>
>;

export type ConfirmMyOrderByProductOrderIdResponse = ApiResponse<{
  point: number;
}>;
