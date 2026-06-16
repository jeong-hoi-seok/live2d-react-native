import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import WebView from "react-native-webview";

import { type BootstrapResult, bootstrapModel } from "../lib/bootstrap-model";

export function Live2dView() {
  if (Platform.OS === "web") {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="text-center text-base text-gray-600">
          Live2D 뷰는 iOS / Android에서만 동작합니다. (웹 미지원)
        </Text>
      </View>
    );
  }
  return <Live2dViewNative />;
}

function Live2dViewNative() {
  const [bundle, setBundle] = useState<BootstrapResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    bootstrapModel()
      .then((res) => {
        if (!cancelled) setBundle(res);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="text-base text-red-600">bootstrap 실패: {error}</Text>
      </View>
    );
  }

  if (!bundle) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
        <Text className="mt-2 text-sm text-gray-500">모델 파일 준비 중…</Text>
      </View>
    );
  }

  return (
    <WebView
      source={{ html: bundle.html, baseUrl: bundle.baseUrl }}
      originWhitelist={["*"]}
      allowFileAccess
      allowFileAccessFromFileURLs
      allowUniversalAccessFromFileURLs
      allowingReadAccessToURL={bundle.baseUrl}
      javaScriptEnabled
      domStorageEnabled
      mixedContentMode="always"
      style={{ flex: 1, backgroundColor: "transparent" }}
      onMessage={(e) => console.log("[live2d webview]", e.nativeEvent.data)}
    />
  );
}
