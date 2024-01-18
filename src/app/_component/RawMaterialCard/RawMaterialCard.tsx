import Image from "next/image";
import style from "@/app/_component/RawMaterialCard/RawMaterialCard.module.css";
import { RAW_MATERIAL } from "@/constants/MaterialEnum";
import CHESTNUT from "public/rawMaterial/CHESTNUT.png";
import SWEET_POTATO from "public/rawMaterial/SWEET_POTATO.png";
import RICE from "public/rawMaterial/RICE.png";
import CORN from "public/rawMaterial/CORN.png";
import PUMPKIN from "public/rawMaterial/PUMPKIN.png";
import POTATO from "public/rawMaterial/POTATO.png";
import BOKBUNJA_IMAGE from "public/rawMaterial/BOKBUNJA.png";
import GRAPE_IMAGE from "public/rawMaterial/GRAPE.png";
import APPLE_IMAGE from "public/rawMaterial/APPLE.png";
import MANDARIN_IMAGE from "public/rawMaterial/MANDARIN.png";
import CRISPY_RICE_CRUST_IMAGE from "public/rawMaterial/CRISPY_RICE_CRUST.png";
import CARROT_IMAGE from "public/rawMaterial/CARROT.png";
import PEAR_IMAGE from "public/rawMaterial/PEAR.png";
import MUSHROOM_IMAGE from "public/rawMaterial/MUSHROOM.png";
import HONEY_IMAGE from "public/rawMaterial/HONEY.png";
import PINT_NUT_IMAGE from "public/rawMaterial/PINT_NUT.png";

export default function RawMaterialCard({
  rawMaterial,
}: {
  rawMaterial: keyof typeof RAW_MATERIAL;
}) {
  const getImageByRawMaterial = () => {
    console.log(rawMaterial);
    switch (rawMaterial) {
      case RAW_MATERIAL.CHESTNUT:
        return CHESTNUT;
      case RAW_MATERIAL.SWEET_POTATO:
        return SWEET_POTATO;
      case RAW_MATERIAL.RICE:
        return RICE;
      case RAW_MATERIAL.CORN:
        return CORN;
      case RAW_MATERIAL.PUMPKIN:
        return PUMPKIN;
      case RAW_MATERIAL.POTATO:
        return POTATO;
      case RAW_MATERIAL.BOKBUNJA:
        return BOKBUNJA_IMAGE;
      case RAW_MATERIAL.GRAPE:
        return GRAPE_IMAGE;
      case RAW_MATERIAL.APPLE:
        return APPLE_IMAGE;
      case RAW_MATERIAL.MANDARIN:
        return MANDARIN_IMAGE;
      case RAW_MATERIAL.CRISPY_RICE_CRUST:
        return CRISPY_RICE_CRUST_IMAGE;
      case RAW_MATERIAL.CARROT:
        return CARROT_IMAGE;
      case RAW_MATERIAL.PEAR:
        return PEAR_IMAGE;
      case RAW_MATERIAL.MUSHROOM:
        return MUSHROOM_IMAGE;
      case RAW_MATERIAL.HONEY:
        return HONEY_IMAGE;
      case RAW_MATERIAL.PINT_NUT:
        return PINT_NUT_IMAGE;
      default:
        return "";
    }
  };
  return (
    <div className={style.SnackCard}>
      <Image
        alt="rawMaterial"
        width={0}
        height={0}
        src={getImageByRawMaterial()}
        style={{ width: "10rem", height: "10rem" }}
      />
      <div className={style.Snack}>{rawMaterial}</div>
    </div>
  );
}
