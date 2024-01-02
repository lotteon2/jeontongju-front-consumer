export const SORT = {
  _score: "기본 검색순",
  createdAt: "최신순",
  reviewCount: "리뷰 많은 순",
  totalSalesCount: "판매 많은 순",
  stockQuantity: "재고 적은 순",
  capacityToPriceRatio: "가성비순",
};

export const SortOptions: { value: string; label: string }[] = [];
Object.entries(SORT).forEach(([key, value]) =>
  SortOptions.push({ value: key, label: value })
);
