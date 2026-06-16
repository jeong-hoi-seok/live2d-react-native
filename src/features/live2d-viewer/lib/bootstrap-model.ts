import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";

import { LIVE2D_HTML } from "./live2d-html";
import { DEFAULT_FIT_SCALE, DEFAULT_MODEL_ID, MODEL_MANIFESTS } from "./model-manifest";

const BASE_DIR = `${FileSystem.documentDirectory}live2d/`;

export type BootstrapResult = {
  baseUrl: string;
  htmlUri: string;
  html: string;
};

export async function bootstrapModel(modelId?: string): Promise<BootstrapResult> {
  const manifest = MODEL_MANIFESTS[modelId ?? DEFAULT_MODEL_ID] ?? MODEL_MANIFESTS[DEFAULT_MODEL_ID];
  const modelRoot = `${BASE_DIR}${manifest.subdir}`;
  const htmlFilename = `index-${modelId ?? DEFAULT_MODEL_ID}.html`;
  const htmlUri = `${BASE_DIR}${htmlFilename}`;

  await FileSystem.makeDirectoryAsync(BASE_DIR, { intermediates: true });

  const subdirs = new Set<string>();
  for (const f of [...manifest.jsonFiles, ...manifest.binaryFiles]) {
    const slash = f.path.lastIndexOf("/");
    if (slash > -1) subdirs.add(`${modelRoot}${f.path.slice(0, slash)}`);
  }
  for (const dir of subdirs) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }

  for (const f of manifest.jsonFiles) {
    await FileSystem.writeAsStringAsync(`${modelRoot}${f.path}`, JSON.stringify(f.data));
  }

  for (const f of manifest.binaryFiles) {
    const asset = Asset.fromModule(f.module);
    if (!asset.localUri) await asset.downloadAsync();
    const src = asset.localUri ?? asset.uri;
    if (!src) throw new Error(`Asset has no URI: ${f.path}`);
    const dest = `${modelRoot}${f.path}`;
    const existing = await FileSystem.getInfoAsync(dest);
    if (existing.exists) await FileSystem.deleteAsync(dest, { idempotent: true });
    await FileSystem.copyAsync({ from: src, to: dest });
  }

  const modelUrl = `./${manifest.subdir}${manifest.entryRel}`;
  const fitScale = manifest.fitScale ?? DEFAULT_FIT_SCALE;
  const html = LIVE2D_HTML.replace("__MODEL_URL__", modelUrl).replace(
    "__FIT_SCALE__",
    String(fitScale),
  );
  await FileSystem.writeAsStringAsync(htmlUri, html);

  return { baseUrl: BASE_DIR, htmlUri, html };
}
