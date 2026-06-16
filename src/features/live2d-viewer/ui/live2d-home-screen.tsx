import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Live2dHomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-app-background px-5"
      style={{
        paddingBottom: Math.max(insets.bottom, 20),
        paddingTop: Math.max(insets.top, 20),
      }}
    >
      <View className="flex-1 items-center justify-center gap-6">
        <View className="h-72 w-full items-center justify-center rounded-2xl bg-app-accent-soft">
          <Text className="text-center text-2xl font-bold text-app-accent">Live2D Area</Text>
          <Text className="mt-2 text-center text-sm text-app-muted">
            캐릭터 렌더링 영역 준비 중
          </Text>
        </View>

        <View className="w-full gap-3 rounded-2xl bg-app-surface p-5">
          <Text className="text-xl font-bold text-app-text">캐릭터와 대화하기</Text>
          <Text className="text-base leading-6 text-app-muted">
            Live2D 캐릭터가 표정과 모션으로 반응하는 대화 경험을 준비합니다.
          </Text>
        </View>
      </View>
    </View>
  );
}
