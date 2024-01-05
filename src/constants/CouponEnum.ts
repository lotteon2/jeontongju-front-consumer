export const COUPON_STATE = {
  WELCOME: "WELCOME",
  YANGBAN: "YANGBAN",
  PROMOTION: "PROMOTION",
} as const;

type COUPON_STATE = (typeof COUPON_STATE)[keyof typeof COUPON_STATE];

export const translateCouponState = (status: COUPON_STATE) => {
  let translatedCouponState = "";
  switch (status) {
    case "WELCOME":
      translatedCouponState = "귀하신 분이 누추한 곳에";
      break;
    case "YANGBAN":
      translatedCouponState = "전통주점의 양반 회원님";
      break;
    case "PROMOTION":
      translatedCouponState = "전통주점과 오후 5시에 만나요";
      break;
    default:
      translatedCouponState = "";
  }
  return translatedCouponState;
};
