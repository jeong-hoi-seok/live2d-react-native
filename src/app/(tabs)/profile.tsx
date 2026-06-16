import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileTab() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1 bg-[#1b1b1f] px-4"
      style={{ paddingTop: insets.top + 24 }}
    >
      <Text className="text-2xl font-bold text-white">마이페이지</Text>
    </View>
  );
}
