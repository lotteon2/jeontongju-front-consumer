export const REVIEW = {
  sympathy: "👍 공감순",
  createdAt: "👥 최신순",
};

export const ReviewOptions: { value: string; label: string }[] = [];
Object.entries(REVIEW).forEach(([key, value]) =>
  ReviewOptions.push({ value: key, label: value })
);
