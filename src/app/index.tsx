import { View } from "react-native";

import { Live2dView } from "@/features/live2d-viewer";

export default function Index() {
  return (
    <View className="flex-1 bg-app-background">
      <Live2dView />
    </View>
  );
}
