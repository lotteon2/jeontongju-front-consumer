import { POINT } from "@/constants/PointEnum";

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

export type GetMyInfoResponseData = {
  email: string;
  name: string;
  phoneNumber: string;
  profileImageUrl: string;
  point: number;
  credit: number;
  isRegularPayments: boolean;
};

export type Trade = {
  tradeId: number;
  tradePoint: number;
  tradePath: keyof typeof POINT;
  tradeDate: string;
};

export type GetMyPointListResponseData = {
  point: number;
  totalAcc: number;
  totalUse: number;
  histories: Page<Trade[]>;
};

export type GetMyInfoResponse = ApiResponse<GetMyInfoResponseData>;
export type GetMyPointListResponse = ApiResponse<GetMyPointListResponseData>;
