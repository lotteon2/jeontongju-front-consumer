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
    orderStatus: string;
    isAuction: boolean;
  };
  product: {
    productOrderId: number;
    productId: string;
    productName: string;
    productCount: number;
    productPrice: number;
    productTotalAmount: number;
    productOrderStatus: string;
    productThumbnailImageUrl: string;
    sellerId: number;
    sellerName: string;
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

export type GetMyOrderListResponse = ApiResponse<
  Page<GetMyOrderListResponseData[]>
>;
