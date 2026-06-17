import { MessageCircle } from "lucide-react-native";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatTab() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-[#1a1a1a]">
      <View
        style={{ paddingTop: insets.top + 12, paddingHorizontal: 14 }}
        className="bg-[#1a1a1a] pb-3"
      >
        <Text className="text-2xl font-bold text-[#dadada]">대화</Text>
      </View>
      <View className="flex-1 items-center justify-center px-8">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-[#1f1f1f]">
          <MessageCircle size={36} color="#7f7f7f" strokeWidth={1.5} />
        </View>
        <Text className="mt-5 text-lg font-semibold text-[#dadada]">대화목록이 비어있어요</Text>
        <Text className="mt-2 text-center text-md text-[#7f7f7f]">
          원하시는 캐릭터와 대화를 나눠보세요.
        </Text>
      </View>
    </View>
  );
}
