export const NOTI = {
  SUCCESS_SUBSCRIPTION_PAYMENTS: "SUCCESS_SUBSCRIPTION_PAYMENTS",
  INTERNAL_ORDER_SERVER_ERROR: "INTERNAL_ORDER_SERVER_ERROR",
  INTERNAL_PAYMENT_SERVER_ERROR: "INTERNAL_PAYMENT_SERVER_ERROR",
  INTERNAL_PRODUCT_SERVER_ERROR: "INTERNAL_PRODUCT_SERVER_ERROR",
  INTERNAL_CONSUMER_SERVER_ERROR: "INTERNAL_CONSUMER_SERVER_ERROR",
  INTERNAL_COUPON_SERVER_ERROR: "INTERNAL_COUPON_SERVER_ERROR",
} as const;

type NOTI = (typeof NOTI)[keyof typeof NOTI];

export function getMyPointList(params: NOTI) {
  return NOTI[params] as string;
}

export const translateNoti = (status: NOTI) => {
  let translatedNotiState = "";
  switch (status) {
    case "SUCCESS_SUBSCRIPTION_PAYMENTS":
      translatedNotiState = "양반 멤버십 결제 성공";
      break;
    case "INTERNAL_ORDER_SERVER_ERROR":
      translatedNotiState = "결제 실패 | 주문 서버 오류";
      break;
    case "INTERNAL_PAYMENT_SERVER_ERROR":
      translatedNotiState = "결제 실패 | 결제 서버 오류";
      break;
    case "INTERNAL_PRODUCT_SERVER_ERROR":
      translatedNotiState = "결제 실패 | 상품 서버 오류";
      break;
    case "INTERNAL_CONSUMER_SERVER_ERROR":
      translatedNotiState = "결제 실패 | 소비자 서버 오류";
      break;
    case "INTERNAL_COUPON_SERVER_ERROR":
      translatedNotiState = "결제 실패 | 쿠폰 서버 오류";
      break;
    default:
      translatedNotiState = "";
  }
  return translatedNotiState;
};
