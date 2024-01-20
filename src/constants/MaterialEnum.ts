import { SelectProps } from "antd";

export const RAW_MATERIAL = {
  CHESTNUT: "🌰밤",
  SWEET_POTATO: "🍠고구마",
  RICE: "🍚쌀",
  CORN: "🌽옥수수",
  PUMPKIN: "🎃호박",
  POTATO: "🥔감자",
  BOKBUNJA: "🫐복분자",
  GRAPE: "🍇포도",
  APPLE: "🍏사과",
  MANDARIN: "🍊귤",
  CRISPY_RICE_CRUST: "🍘누룽지",
  CARROT: "🥕당근",
  PEAR: "🍐배",
  MUSHROOM: "🍄버섯",
  HONEY: "🍯벌꿀",
  PINT_NUT: "🫘 잣",
};

export const RawMaterialOptions: SelectProps["options"] = [];
Object.entries(RAW_MATERIAL).forEach(([key, value]) =>
  RawMaterialOptions.push({ value: key, label: value })
);
