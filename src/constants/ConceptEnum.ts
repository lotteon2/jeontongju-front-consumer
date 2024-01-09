export const CONCEPT = {
  CAMPING: "⛺️ 캠핑",
  FISHING: "🎣 낚시",
  PARTY: "🪩 파티",
  GATHERING: "👥 모임",
  YEAR_END: "🎉 연말",
  HIKING: "🧗‍♀️ 등산",
  OUTING: "🧺 나들이",
  TRIP: "🚗 여행",
  GIFT: "🎁 선물",
  MEETING_THE_FAMILY: "👨‍👩‍👧‍👧 상견례",
  HOLIDAY: "🎎 명절",
  ROOPTOP: "🌕 루프탑",
  HEALING: "🏥 힐링",
  EMOTION: "❤️ 감성",
  HANGOVER_REMEDY: "🤮 숙취퇴치",
};

export const ConceptOptions: { value: string; label: string }[] = [];
Object.entries(CONCEPT).forEach(([key, value]) =>
  ConceptOptions.push({ value: value, label: value })
);
