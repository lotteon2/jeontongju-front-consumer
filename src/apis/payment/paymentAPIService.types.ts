interface ApiResponse<T> {
  code: number;
  message: string;
  detail?: string;
  data: T;
  failure?: string;
}

export type KakaoParams = {
  paymentType: string;
  paymentMethod: string;
  pointUsageAmount: number;
  couponCode: string;
  couponAmount: number;
  recipientName: string;
  recipientPhoneNumber: string;
  basicAddress: string;
  addressDetail: string;
  zoneCode: string;
  totalAmount: number;
  realAmount: number; // 실금액 - 쿠폰금액 - 포인트금액
  titleName: string;
  products: {
    productId: string;
    productCount: number;
  }[];
};

export type MembershipParams = {
  paymentType: string;
  paymentMethod: string;
  itemName: string;
  subscriptionType: string;
};

export type BuyCreditParams = {
  chargeCredit: number;
  paymentType: string;
  paymentMethod: string;
  itemName: string;
};

export interface PayResponseData {
  tid?: string;
  tms_result?: boolean;
  next_redirect_app_url?: string;
  next_redirect_mobile_url?: string;
  next_redirect_pc_url?: string;
  android_app_scheme?: string;
  ios_app_scheme?: string;
  created_at?: string;
  message?: string;
}
