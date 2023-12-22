export const POINT = {
  YANGBAN_CONFIRMED: "양반 구매 확정",
  GENEREAL_CONFIRMED: "일반 구매 확정",
  PURCHASE_USE: "구매 사용",
  PURCHASE_CANCEL: "구매 취소",
  PHOTO_REVIEW: "사진 리뷰",
  TEXT_REVIEW: "글 리뷰",
};

export const PointOptions: { value: string; label: string }[] = [];
Object.entries(POINT).forEach(([key, value]) =>
  PointOptions.push({ value: key, label: value })
);
