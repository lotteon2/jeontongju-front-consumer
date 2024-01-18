import Image from "next/image";
import PIZZA from "public/snack/PIZZA.png";
import KOREAN_PIZZA from "public/snack/KOREAN_PIZZA.png";
import CHEESE_IMAGE from "/public/snack/CHEESE.png";
import FRUIT from "public/snack/FRUIT.png";
import CHOCOLATE from "public/snack/CHOCOLATE.png";
import FINGER_FOOD from "public/snack/FINGER_FOOD.png";
import BEEF from "public/snack/BEEF.png";
import LAMB from "public/snack/LAMB.png";
import PIG_HOCKS from "public/snack/PIG_HOCKS.png";
import BARBECUE from "public/snack/BARBECUE.png";
import BOILED_CHICKEN from "public/snack/BOILED_CHICKEN.png";
import CHICKEN from "public/snack/CHICKEN.png";
import RAW_FISH from "public/snack/RAW_FISH.png";
import GRILLED_SEAFOOD from "public/snack/GRILLED_SEAFOOD.png";
import WHITE_SOUP from "public/snack/WHITE_SOUP.png";
import RED_SOUP from "public/snack/RED_SOUP.png";
import style from "@/app/_component/SnackCard/SnackCard.module.css";

import { SNACK } from "@/constants/SnackTypeEnum";

export default function SnackCard({ snack }: { snack: keyof typeof SNACK }) {
  const getImageBySnack = () => {
    switch (snack) {
      case SNACK.CHEESE:
        return CHEESE_IMAGE;
      case SNACK.PIZZA:
        return PIZZA;
      case SNACK.KOREAN_PIZZA:
        return KOREAN_PIZZA;
      case SNACK.FRUIT:
        return FRUIT;
      case SNACK.CHOCOLATE:
        return CHOCOLATE;
      case SNACK.FINGER_FOOD:
        return FINGER_FOOD;
      case SNACK.BEEF:
        return BEEF;
      case SNACK.LAMB:
        return LAMB;
      case SNACK.BEEF:
        return BEEF;
      case SNACK.PIG_HOCKS:
        return PIG_HOCKS;
      case SNACK.BARBECUE:
        return BARBECUE;
      case SNACK.BOILED_CHICKEN:
        return BOILED_CHICKEN;
      case SNACK.CHICKEN:
        return CHICKEN;
      case SNACK.RAW_FISH:
        return RAW_FISH;
      case SNACK.GRILLED_SEAFOOD:
        return GRILLED_SEAFOOD;
      case SNACK.WHITE_SOUP:
        return WHITE_SOUP;
      case SNACK.RED_SOUP:
        return RED_SOUP;
      default:
        return "";
    }
  };

  return (
    <div className={style.SnackCard}>
      <Image
        alt="snack"
        width={0}
        height={0}
        src={getImageBySnack()}
        style={{ width: "10rem", height: "10rem" }}
      />
      <div className={style.Snack}>{snack}</div>
    </div>
  );
}
