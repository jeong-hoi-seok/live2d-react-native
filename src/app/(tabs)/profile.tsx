import { router } from "expo-router";
import { BellRing, ChevronRight, Headphones, Megaphone, Plus, Sparkles } from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TWINKLE_BALANCE = 1240;
const USER_NAME = "회석";

export default function ProfileTab() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-[#1a1a1a]">
      <View
        style={{ paddingTop: insets.top + 12, paddingHorizontal: 14 }}
        className="bg-[#1a1a1a] pb-3"
      >
        <Text className="text-2xl font-bold text-[#dadada]">MY</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + 32,
          paddingHorizontal: 14,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader name={USER_NAME} />
        <TwinkleCard balance={TWINKLE_BALANCE} onCharge={() => {}} />

        <Section title="문의 및 알림">
          <Row icon={Megaphone} label="공지사항" badge="N" onPress={() => {}} />
          <Divider />
          <Row icon={Headphones} label="고객센터" onPress={() => {}} />
        </Section>

        <Section title="알림">
          <Row
            icon={BellRing}
            label="알림 설정"
            onPress={() => router.push("/settings/notifications")}
          />
        </Section>

        <Text className="mt-8 text-center text-xs text-[#5a5a5a]">v0.1.0</Text>
      </ScrollView>
    </View>
  );
}

function ProfileHeader({ name }: { name: string }) {
  return (
    <View className="mt-6 flex-row items-center gap-4">
      <View className="h-16 w-16 items-center justify-center rounded-full bg-[#2a2a2a]">
        <Text className="text-2xl font-bold text-[#dadada]">{name.charAt(0)}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-lg font-semibold text-[#dadada]">{name}님</Text>
        <Text className="mt-1 text-sm text-[#7f7f7f]">환영합니다</Text>
      </View>
    </View>
  );
}

function TwinkleCard({ balance, onCharge }: { balance: number; onCharge: () => void }) {
  return (
    <View className="mt-6 overflow-hidden rounded-2xl bg-[#1f1f1f] p-5">
      <View className="flex-row items-center justify-between">
        <View>
          <View className="flex-row items-center gap-1.5">
            <Sparkles size={14} color="#facc15" />
            <Text className="text-xs font-medium text-[#7f7f7f]">보유 트윙클</Text>
          </View>
          <Text className="mt-2 text-3xl font-bold text-[#dadada]">
            {balance.toLocaleString()}
          </Text>
        </View>
        <Pressable
          onPress={onCharge}
          className="flex-row items-center gap-1 rounded-full bg-yellow-400 px-4 py-2 active:opacity-80"
        >
          <Plus size={16} color="#1a1a1a" strokeWidth={2.5} />
          <Text className="text-sm font-bold text-[#1a1a1a]">충전</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mt-8">
      <Text className="mb-3 text-xs font-semibold text-[#7f7f7f]">{title}</Text>
      <View className="overflow-hidden rounded-2xl bg-[#1f1f1f]">{children}</View>
    </View>
  );
}

function Row({
  icon: Icon,
  label,
  badge,
  onPress,
}: {
  icon: LucideIcon;
  label: string;
  badge?: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center px-4 py-4 active:bg-[#2a2a2a]"
    >
      <Icon size={20} color="#7f7f7f" />
      <Text className="ml-3 flex-1 text-base text-[#dadada]">{label}</Text>
      {badge ? (
        <View className="mr-2 h-5 w-5 items-center justify-center rounded-full bg-red-500">
          <Text className="text-[10px] font-bold text-[#dadada]">{badge}</Text>
        </View>
      ) : null}
      <ChevronRight size={18} color="#5a5a5a" />
    </Pressable>
  );
}

function Divider() {
  return <View className="ml-12 h-px bg-[#2a2a2a]" />;
}
