export const ORDER_STATUS = {
  ORDER: "주문 완료",
  CANCEL: "주문 취소",
  SHIPPING: "배송중",
  COMPLETED: "배송 완료",
  CONFIRMED: "구매 확정",
};

export const OrderOptions: { value: string; label: string }[] = [];
Object.entries(ORDER_STATUS).forEach(([key, value]) =>
  OrderOptions.push({ value: key, label: value })
);
