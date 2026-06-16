import type { ImageSourcePropType } from "react-native";

export type Character = {
  id: string;
  name: string;
  thumbnail?: ImageSourcePropType;
};

export const CHARACTERS: Character[] = [
  {
    id: "mao",
    name: "마오",
    thumbnail: require("../../../assets/images/model_tumbnail/mao.png"),
  },
];
