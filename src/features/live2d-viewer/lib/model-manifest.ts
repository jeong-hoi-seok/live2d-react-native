type ModelFile = { path: string; module: number };
type JsonFile = { path: string; data: unknown };

export type ModelManifest = {
  subdir: string;
  entryRel: string;
  binaryFiles: readonly ModelFile[];
  jsonFiles: readonly JsonFile[];
  fitScale?: number;
};

export const DEFAULT_FIT_SCALE = 1.2;

const MAO: ModelManifest = {
  subdir: "mao_pro/",
  entryRel: "runtime/mao_pro.model3.json",
  binaryFiles: [
    {
      path: "runtime/mao_pro.moc3",
      module: require("../../../../assets/models/mao_pro_en/runtime/mao_pro.moc3"),
    },
    {
      path: "runtime/mao_pro.4096/texture_00.png",
      module: require("../../../../assets/models/mao_pro_en/runtime/mao_pro.4096/texture_00.png"),
    },
  ],
  jsonFiles: [
    {
      path: "runtime/mao_pro.model3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/mao_pro.model3.json"),
    },
    {
      path: "runtime/mao_pro.physics3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/mao_pro.physics3.json"),
    },
    {
      path: "runtime/mao_pro.pose3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/mao_pro.pose3.json"),
    },
    {
      path: "runtime/mao_pro.cdi3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/mao_pro.cdi3.json"),
    },
    {
      path: "runtime/motions/mtn_01.motion3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/motions/mtn_01.motion3.json"),
    },
    {
      path: "runtime/motions/mtn_02.motion3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/motions/mtn_02.motion3.json"),
    },
    {
      path: "runtime/motions/mtn_03.motion3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/motions/mtn_03.motion3.json"),
    },
    {
      path: "runtime/motions/mtn_04.motion3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/motions/mtn_04.motion3.json"),
    },
    {
      path: "runtime/motions/special_01.motion3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/motions/special_01.motion3.json"),
    },
    {
      path: "runtime/motions/special_02.motion3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/motions/special_02.motion3.json"),
    },
    {
      path: "runtime/motions/special_03.motion3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/motions/special_03.motion3.json"),
    },
    {
      path: "runtime/expressions/exp_01.exp3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/expressions/exp_01.exp3.json"),
    },
    {
      path: "runtime/expressions/exp_02.exp3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/expressions/exp_02.exp3.json"),
    },
    {
      path: "runtime/expressions/exp_03.exp3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/expressions/exp_03.exp3.json"),
    },
    {
      path: "runtime/expressions/exp_04.exp3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/expressions/exp_04.exp3.json"),
    },
    {
      path: "runtime/expressions/exp_05.exp3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/expressions/exp_05.exp3.json"),
    },
    {
      path: "runtime/expressions/exp_06.exp3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/expressions/exp_06.exp3.json"),
    },
    {
      path: "runtime/expressions/exp_07.exp3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/expressions/exp_07.exp3.json"),
    },
    {
      path: "runtime/expressions/exp_08.exp3.json",
      data: require("../../../../assets/models/mao_pro_en/runtime/expressions/exp_08.exp3.json"),
    },
  ],
};

const HUOHUO: ModelManifest = {
  subdir: "huohuo/",
  entryRel: "huohuo.model3.json",
  binaryFiles: [
    {
      path: "huohuo.moc3",
      module: require("../../../../assets/models/huohuo/huohuo.moc3"),
    },
    {
      path: "huohuo.8192/texture_00.png",
      module: require("../../../../assets/models/huohuo/huohuo.8192/texture_00.png"),
    },
    {
      path: "huohuo.8192/texture_01.png",
      module: require("../../../../assets/models/huohuo/huohuo.8192/texture_01.png"),
    },
    {
      path: "huohuo.8192/texture_02.png",
      module: require("../../../../assets/models/huohuo/huohuo.8192/texture_02.png"),
    },
    {
      path: "huohuo.8192/texture_03.png",
      module: require("../../../../assets/models/huohuo/huohuo.8192/texture_03.png"),
    },
  ],
  jsonFiles: [
    {
      path: "huohuo.model3.json",
      data: require("../../../../assets/models/huohuo/huohuo.model3.json"),
    },
    {
      path: "huohuo.physics3.json",
      data: require("../../../../assets/models/huohuo/huohuo.physics3.json"),
    },
    {
      path: "huohuo.cdi3.json",
      data: require("../../../../assets/models/huohuo/huohuo.cdi3.json"),
    },
  ],
};

const CHA3: ModelManifest = {
  subdir: "cha3/",
  entryRel: "cha3.model3.json",
  fitScale: 0.8,
  binaryFiles: [
    {
      path: "cha3.moc3",
      module: require("../../../../assets/models/cha3/main/cha3.moc3"),
    },
    {
      path: "cha3.4096/texture_00.png",
      module: require("../../../../assets/models/cha3/main/cha3.4096/texture_00.png"),
    },
    {
      path: "cha3.4096/texture_01.png",
      module: require("../../../../assets/models/cha3/main/cha3.4096/texture_01.png"),
    },
    {
      path: "cha3.4096/texture_02.png",
      module: require("../../../../assets/models/cha3/main/cha3.4096/texture_02.png"),
    },
  ],
  jsonFiles: [
    {
      path: "cha3.model3.json",
      data: require("../../../../assets/models/cha3/main/cha3.model3.json"),
    },
    {
      path: "cha3.physics3.json",
      data: require("../../../../assets/models/cha3/main/cha3.physics3.json"),
    },
    {
      path: "cha3.cdi3.json",
      data: require("../../../../assets/models/cha3/main/cha3.cdi3.json"),
    },
  ],
};

export const MODEL_MANIFESTS: Record<string, ModelManifest> = {
  mao: MAO,
  huohuo: HUOHUO,
  cha3: CHA3,
};

export const DEFAULT_MODEL_ID = "mao";
