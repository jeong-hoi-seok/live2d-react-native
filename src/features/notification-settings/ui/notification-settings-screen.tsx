import { router } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Linking, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DESIGN_COLORS, DESIGN_SPACING } from "@/shared/lib/design-system";

import { useNotificationSettingsStore } from "../model/use-notification-settings-store";

const SWITCH_TRACK_COLOR = {
  false: DESIGN_COLORS.surfaceContainerHighest,
  true: DESIGN_COLORS.primary,
} as const;

export function NotificationSettingsScreen() {
  const insets = useSafeAreaInsets();
  const pushEnabled = useNotificationSettingsStore((state) => state.pushEnabled);
  const chatEnabled = useNotificationSettingsStore((state) => state.chatEnabled);
  const marketingEnabled = useNotificationSettingsStore((state) => state.marketingEnabled);
  const setPushEnabled = useNotificationSettingsStore((state) => state.setPushEnabled);
  const setChatEnabled = useNotificationSettingsStore((state) => state.setChatEnabled);
  const setMarketingEnabled = useNotificationSettingsStore((state) => state.setMarketingEnabled);

  const handleOpenSystemSettings = () => {
    void Linking.openSettings();
  };

  return (
    <View className="flex-1 bg-app-background">
      <View
        style={{ paddingTop: insets.top + 12, paddingHorizontal: DESIGN_SPACING.containerPadding }}
        className="flex-row items-center bg-app-background pb-5"
      >
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="뒤로 가기"
          className="mr-2 p-1 active:opacity-70"
          hitSlop={12}
        >
          <ChevronLeft size={28} color={DESIGN_COLORS.onSurface} />
        </Pressable>
        <Text className="text-xl font-bold text-app-on-surface">알림 설정</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + 32,
          paddingHorizontal: DESIGN_SPACING.containerPadding,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Section title="앱 알림">
          <ToggleRow
            label="푸시 알림"
            description="앱의 주요 알림을 받습니다"
            value={pushEnabled}
            onValueChange={setPushEnabled}
          />
          <Divider />
          <ToggleRow
            label="채팅 알림"
            description="캐릭터와의 대화 메시지를 받습니다"
            value={chatEnabled}
            onValueChange={setChatEnabled}
          />
          <Divider />
          <ToggleRow
            label="마케팅 알림"
            description="이벤트 및 프로모션 소식을 받습니다"
            value={marketingEnabled}
            onValueChange={setMarketingEnabled}
          />
        </Section>

        <Section title="기기 설정">
          <Pressable
            onPress={handleOpenSystemSettings}
            accessibilityRole="button"
            accessibilityLabel="시스템 알림 설정 열기"
            className="flex-row items-center px-4 py-4 active:bg-app-surface-container-high"
          >
            <View className="flex-1">
              <Text className="text-base text-app-on-surface">시스템 알림 설정</Text>
              <Text className="mt-1 text-xs text-app-on-surface-variant">
                기기 설정에서 알림 권한을 변경할 수 있습니다
              </Text>
            </View>
            <ChevronRight size={18} color={DESIGN_COLORS.outline} />
          </Pressable>
        </Section>
      </ScrollView>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mt-6">
      <Text className="mb-3 text-xs font-semibold text-app-on-surface-variant">{title}</Text>
      <View className="overflow-hidden rounded-3xl bg-app-surface-container">{children}</View>
    </View>
  );
}

function ToggleRow({
  label,
  description,
  value,
  onValueChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View className="flex-row items-center px-4 py-4">
      <View className="mr-3 flex-1">
        <Text className="text-base text-app-on-surface">{label}</Text>
        <Text className="mt-1 text-xs text-app-on-surface-variant">{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={SWITCH_TRACK_COLOR}
        thumbColor={DESIGN_COLORS.onSurface}
        accessibilityLabel={label}
      />
    </View>
  );
}

function Divider() {
  return <View className="ml-4 h-px bg-app-outline-variant" />;
}
