export const CONCEPT = {
  CAMPING: "⛺ 캠핑 ",
  FISHING: "🎣 낚시",
  PARTY: "🪩 파티",
  GATHERING: "👥 모임",
  YEAR_END: "🎉연말",
  HIKING: "🧗‍♀️등산",
  OUTING: "🧺 나들이",
  TRIP: "🚗 여행",
  GIFT: "🎁 선물",
  MEETING_THE_FAMILY: "👨‍👩‍👧‍👧상견례",
  HOLIDAY: "🎎 명절",
  ROOPTOP: "🌕 루프탑",
  HEALING: "🏥 힐링",
  EMOTION: "❤️감성",
  HANGOVER_REMEDY: "🤮 숙취퇴치",
};

export const CONCEPT_CONST = {
  CAMPING: "CAMPING",
  FISHING: "FISHING",
  PARTY: "PARTY",
  GATHERING: "GATHERING",
  YEAR_END: "YEAR_END",
  HIKING: "HIKING",
  OUTING: "OUTING",
  TRIP: "TRIP",
  GIFT: "GIFT",
  MEETING_THE_FAMILY: "MEETING_THE_FAMILY",
  HOLIDAY: "HOLIDAY",
  ROOPTOP: "ROOPTOP",
  HEALING: "HEALING",
  EMOTION: "EMOTION",
  HANGOVER_REMEDY: "HANGOVER_REMEDY",
} as const;

type CONCEPT_CONST = (typeof CONCEPT_CONST)[keyof typeof CONCEPT_CONST];

export const ConceptOptions: { value: string; label: string }[] = [];
Object.entries(CONCEPT).forEach(([key, value]) =>
  ConceptOptions.push({ value: key, label: value })
);

export const translateConcept = (status: CONCEPT_CONST) => {
  let translatedConcept = "";
  switch (status) {
    case "CAMPING":
      translatedConcept = "⛺️ 캠핑";
      break;
    case "FISHING":
      translatedConcept = "🎣 낚시";
      break;
    case "PARTY":
      translatedConcept = "🪩 파티";
      break;
    case "GATHERING":
      translatedConcept = "👥 모임";
      break;
    case "YEAR_END":
      translatedConcept = "🎉 연말";
      break;
    case "HIKING":
      translatedConcept = "🧗‍♀️ 등산";
      break;
    case "OUTING":
      translatedConcept = "🧺 나들이";
      break;
    case "TRIP":
      translatedConcept = "🚗 여행";
      break;
    case "GIFT":
      translatedConcept = "🎁 선물";
      break;
    case "MEETING_THE_FAMILY":
      translatedConcept = "👨‍👩‍👧‍👧 상견례";
      break;
    case "HOLIDAY":
      translatedConcept = "🎎 명절";
      break;
    case "ROOPTOP":
      translatedConcept = "🌕 루프탑";
      break;
    case "MEETING_THE_FAMILY":
      translatedConcept = "👨‍👩‍👧‍👧 상견례";
      break;
    case "HEALING":
      translatedConcept = "🏥 힐링";
      break;
    case "EMOTION":
      translatedConcept = "❤️ 감성";
      break;
    case "HANGOVER_REMEDY":
      translatedConcept = "🤮 숙취퇴치";
      break;
    default:
      translatedConcept = "";
  }
  return translatedConcept;
};
