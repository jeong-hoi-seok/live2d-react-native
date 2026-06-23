import { MessageCircle } from "lucide-react-native";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DESIGN_COLORS, DESIGN_SPACING } from "@/shared/lib/design-system";

export default function ChatTab() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-app-background">
      <View
        style={{ paddingTop: insets.top + 16, paddingHorizontal: DESIGN_SPACING.containerPadding }}
        className="bg-app-background pb-5"
      >
        <Text className="text-[28px] leading-9 font-bold text-app-on-surface">대화</Text>
      </View>
      <View className="flex-1 items-center justify-center px-8">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-app-surface-container-high">
          <MessageCircle size={36} color={DESIGN_COLORS.onSurfaceVariant} strokeWidth={1.5} />
        </View>
        <Text className="mt-5 text-lg font-semibold text-app-on-surface">
          대화목록이 비어있어요
        </Text>
        <Text className="mt-2 text-center text-base text-app-on-surface-variant">
          원하시는 캐릭터와 대화를 나눠보세요.
        </Text>
      </View>
    </View>
  );
}
