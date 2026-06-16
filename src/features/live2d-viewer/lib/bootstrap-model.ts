import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";

import { LIVE2D_HTML } from "./live2d-html";
import {
  BINARY_FILES,
  JSON_FILES,
  MODEL_ENTRY_REL,
  MODEL_SUBDIR,
} from "./model-manifest";

const BASE_DIR = `${FileSystem.documentDirectory}live2d/`;
const HTML_FILENAME = "index.html";

export type BootstrapResult = {
  baseUrl: string;
  htmlUri: string;
  html: string;
};

export async function bootstrapModel(): Promise<BootstrapResult> {
  const modelRoot = `${BASE_DIR}${MODEL_SUBDIR}`;
  const htmlUri = `${BASE_DIR}${HTML_FILENAME}`;

  await FileSystem.makeDirectoryAsync(BASE_DIR, { intermediates: true });

  const subdirs = new Set<string>();
  for (const f of [...JSON_FILES, ...BINARY_FILES]) {
    const slash = f.path.lastIndexOf("/");
    if (slash > -1) subdirs.add(`${modelRoot}${f.path.slice(0, slash)}`);
  }
  for (const dir of subdirs) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }

  for (const f of JSON_FILES) {
    await FileSystem.writeAsStringAsync(`${modelRoot}${f.path}`, JSON.stringify(f.data));
  }

  for (const f of BINARY_FILES) {
    const asset = Asset.fromModule(f.module);
    if (!asset.localUri) await asset.downloadAsync();
    const src = asset.localUri ?? asset.uri;
    if (!src) throw new Error(`Asset has no URI: ${f.path}`);
    const dest = `${modelRoot}${f.path}`;
    const existing = await FileSystem.getInfoAsync(dest);
    if (existing.exists) await FileSystem.deleteAsync(dest, { idempotent: true });
    await FileSystem.copyAsync({ from: src, to: dest });
  }

  const modelUrl = `./${MODEL_SUBDIR}${MODEL_ENTRY_REL}`;
  const html = LIVE2D_HTML.replace("__MODEL_URL__", modelUrl);
  await FileSystem.writeAsStringAsync(htmlUri, html);

  return { baseUrl: BASE_DIR, htmlUri, html };
}
