export const SORT = {
  "_score,desc": "기본 검색순",
  "createdAt,desc": "최신순",
  "reviewCount,desc": "리뷰 많은 순",
  "totalSalesCount,desc": "판매 많은 순",
  "stockQuantity,desc": "재고 적은 순",
  "accumulateTotalSalesCount,desc": "누적 판매 많은 순",
  "capacityToPriceRatio,asc": "가성비순",
} as const;

type SORT = (typeof SORT)[keyof typeof SORT];

export const SortOptions: { value: string; label: string }[] = [];
Object.entries(SORT).forEach(([key, value]) =>
  SortOptions.push({ value: key, label: value })
);
