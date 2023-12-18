interface ApiResponse<T> {
  code: number;
  message: string;
  detail?: string;
  data: T;
  failure?: string;
}

export interface Page<T> {
  content: T;
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export type GetMyOrderListResponseData = {
  order: {
    ordersId: string;
    orderDate: string;
    orderStatus: "NORMAL";
    isAuction: false;
  };
  product: {
    productOrderId: number;
    productId: string;
    productName: string;
    productCount: number;
    productPrice: number;
    productTotalAmount: number;
    productOrderStatus: "CANCEL";
    productThumbnailImageUrl: string;
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
  Page<GetMyOrderListResponse[]>
>;
