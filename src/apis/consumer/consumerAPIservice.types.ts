import { Page } from "@/constants/PageResponseType";
import { POINT } from "@/constants/PointEnum";

interface ApiResponse<T> {
  code: number;
  message: string;
  detail?: string;
  data: T;
  failure?: string;
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

export type Credit = {
  tradeCreditId: number;
  tradeCredit: number;
  tradePath: "CHARGE" | "BID";
  tradeDate: string;
};

export type GetMyPointListResponseData = {
  point: number;
  totalAcc: number;
  totalUse: number;
  histories: Page<Trade[]>;
};

export type GetMyCreditListResponseData = {
  credit: number;
  totalAcc: number;
  totalUse: number;
  histories: Page<Credit[]>;
};

export type GetMyInfoForStoreResponseData = {
  email: string;
  profileImageUrl: string;
  name: string;
  isAdult: boolean;
  isRegularPayment: boolean;
  point: number;
  credit: number;
  phoneNumber: string;
  isAddressDefault: boolean;
  memberId: number;
};

export type GetMyMembershipResponseData = {
  subscriptionId: number;
  startDate: string;
  endDate: string;
  subscriptionType: "YANGBAN";
  paymentType: "KAKAO";
  paymentAmount: number;
};

export type GetMyInfoResponse = ApiResponse<GetMyInfoResponseData>;
export type GetMyPointListResponse = ApiResponse<GetMyPointListResponseData>;
export type GetMyCreditListResponse = ApiResponse<GetMyCreditListResponseData>;
export type GetMyInfoForStoreResponse =
  ApiResponse<GetMyInfoForStoreResponseData>;
export type GetMyMembershipResponse = ApiResponse<
  Page<GetMyMembershipResponseData[]>
>;
