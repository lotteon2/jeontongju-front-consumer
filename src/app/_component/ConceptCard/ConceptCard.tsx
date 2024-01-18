import Image from "next/image";
import style from "@/app/_component/RawMaterialCard/RawMaterialCard.module.css";
import { CONCEPT } from "@/constants/ConceptEnum";
import CAMPING from "public/concept/CAMPING.png";
import EMOTION from "public/concept/EMOTION.png";
import FISHING from "public/concept/FISHING.png";
import GATHERING from "public/concept/GATHERING.png";
import GIFT from "public/concept/GIFT.png";
import HANGOVER_REMEDY from "public/concept/HANGOVER_REMEDY.png";
import HEALING from "public/concept/HEALING.png";
import HIKING from "public/concept/HIKING.png";
import HOLIDAY from "public/concept/HOLIDAY.png";
import MEETING_THE_FAMILY from "public/concept/MEETING_THE_FAMILY.png";
import OUTING from "public/concept/OUTING.png";
import PARTY from "public/concept/PARTY.png";
import ROOPTOP from "public/concept/ROOPTOP.png";
import TRIP from "public/concept/TRIP.png";
import YEAR_END from "public/concept/YEAR_END.png";

export default function ConceptCard({
  concept,
}: {
  concept: keyof typeof CONCEPT;
}) {
  const getImageByRawMaterial = () => {
    switch (concept) {
      case CONCEPT.CAMPING:
        return CAMPING;
      case CONCEPT.FISHING:
        return FISHING;
      case CONCEPT.PARTY:
        return PARTY;
      case CONCEPT.YEAR_END:
        return YEAR_END;
      case CONCEPT.GATHERING:
        return GATHERING;
      case CONCEPT.EMOTION:
        return EMOTION;
      case CONCEPT.HIKING:
        return HIKING;
      case CONCEPT.OUTING:
        return OUTING;
      case CONCEPT.TRIP:
        return TRIP;
      case CONCEPT.GIFT:
        return GIFT;
      case CONCEPT.MEETING_THE_FAMILY:
        return MEETING_THE_FAMILY;
      case CONCEPT.HOLIDAY:
        return HOLIDAY;
      case CONCEPT.ROOPTOP:
        return ROOPTOP;
      case CONCEPT.HEALING:
        return HEALING;
      case CONCEPT.MEETING_THE_FAMILY:
        return MEETING_THE_FAMILY;
      case CONCEPT.EMOTION:
        return EMOTION;
      case CONCEPT.HANGOVER_REMEDY:
        return HANGOVER_REMEDY;
      default:
        return "";
    }
  };
  return (
    <div className={style.SnackCard}>
      <Image
        alt="concept"
        width={0}
        height={0}
        src={getImageByRawMaterial()}
        style={{ width: "10rem", height: "10rem" }}
      />
      <div className={style.Snack}>{concept}</div>
    </div>
  );
}
