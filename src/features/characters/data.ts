import type { ImageSourcePropType } from "react-native";

export type Character = {
  id: string;
  name: string;
  description?: string;
  thumbnail?: ImageSourcePropType;
};

export const CHARACTERS: Character[] = [
  {
    id: "mao",
    name: "마오",
    description: "마법사를 꿈꾸는 마법소녀",
    thumbnail: require("../../../assets/images/model_tumbnail/mao.png"),
  },
  {
    id: "huohuo",
    name: "후오후오",
    description: "영혼을 다루는 소녀",
    thumbnail: require("../../../assets/images/model_tumbnail/huohuo.png"),
  },
  {
    id: "cha3",
    name: "츠바키",
    description: "신비로운 캐릭터",
    thumbnail: require("../../../assets/images/model_tumbnail/cha3.png"),
  },
];
