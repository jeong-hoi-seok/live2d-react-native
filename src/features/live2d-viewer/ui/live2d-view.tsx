import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import WebView from "react-native-webview";

import { type BootstrapResult, bootstrapModel } from "../lib/bootstrap-model";
import type { Live2dCommand } from "../lib/live2d-commands";

export type Live2dViewHandle = {
  sendCommand: (command: Live2dCommand) => void;
};

export const Live2dView = forwardRef<Live2dViewHandle>(function Live2dView(_, ref) {
  if (Platform.OS === "web") {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="text-center text-base text-gray-600">
          Live2D 뷰는 iOS / Android에서만 동작합니다. (웹 미지원)
        </Text>
      </View>
    );
  }

  return <Live2dViewNative ref={ref} />;
});

const Live2dViewNative = forwardRef<Live2dViewHandle>(function Live2dViewNative(_, ref) {
  const webViewRef = useRef<WebView>(null);
  const [bundle, setBundle] = useState<BootstrapResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [webViewReady, setWebViewReady] = useState(false);
  const pendingCommandsRef = useRef<Live2dCommand[]>([]);

  useImperativeHandle(ref, () => ({
    sendCommand: (command) => {
      if (!webViewReady) {
        pendingCommandsRef.current.push(command);
        return;
      }

      webViewRef.current?.postMessage(JSON.stringify(command));
    },
  }));

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

  const flushPendingCommands = () => {
    if (!webViewRef.current || pendingCommandsRef.current.length === 0) return;

    for (const command of pendingCommandsRef.current) {
      webViewRef.current.postMessage(JSON.stringify(command));
    }
    pendingCommandsRef.current = [];
  };

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
      ref={webViewRef}
      source={{ uri: bundle.htmlUri }}
      originWhitelist={["*"]}
      allowFileAccess
      allowFileAccessFromFileURLs
      allowUniversalAccessFromFileURLs
      allowingReadAccessToURL={bundle.baseUrl}
      javaScriptEnabled
      domStorageEnabled
      mixedContentMode="always"
      style={{ flex: 1, backgroundColor: "transparent" }}
      onLoadEnd={() => {
        setWebViewReady(true);
        flushPendingCommands();
      }}
      onMessage={(e) => console.log("[live2d webview]", e.nativeEvent.data)}
    />
  );
});
