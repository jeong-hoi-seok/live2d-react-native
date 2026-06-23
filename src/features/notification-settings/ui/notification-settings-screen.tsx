import { router } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Linking, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNotificationSettingsStore } from "../model/use-notification-settings-store";

const SWITCH_TRACK_COLOR = { false: "#3a3a3a", true: "#facc15" } as const;

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
    <View className="flex-1 bg-[#1a1a1a]">
      <View
        style={{ paddingTop: insets.top + 8, paddingHorizontal: 14 }}
        className="flex-row items-center bg-[#1a1a1a] pb-3"
      >
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="뒤로 가기"
          className="mr-2 p-1 active:opacity-70"
          hitSlop={12}
        >
          <ChevronLeft size={28} color="#dadada" />
        </Pressable>
        <Text className="text-xl font-bold text-[#dadada]">알림 설정</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + 32,
          paddingHorizontal: 14,
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
            className="flex-row items-center px-4 py-4 active:bg-[#2a2a2a]"
          >
            <View className="flex-1">
              <Text className="text-base text-[#dadada]">시스템 알림 설정</Text>
              <Text className="mt-1 text-xs text-[#7f7f7f]">
                기기 설정에서 알림 권한을 변경할 수 있습니다
              </Text>
            </View>
            <ChevronRight size={18} color="#5a5a5a" />
          </Pressable>
        </Section>
      </ScrollView>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mt-6">
      <Text className="mb-3 text-xs font-semibold text-[#7f7f7f]">{title}</Text>
      <View className="overflow-hidden rounded-2xl bg-[#1f1f1f]">{children}</View>
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
        <Text className="text-base text-[#dadada]">{label}</Text>
        <Text className="mt-1 text-xs text-[#7f7f7f]">{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={SWITCH_TRACK_COLOR}
        thumbColor="#dadada"
        accessibilityLabel={label}
      />
    </View>
  );
}

function Divider() {
  return <View className="ml-4 h-px bg-[#2a2a2a]" />;
}
