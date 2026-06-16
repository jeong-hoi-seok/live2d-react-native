import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "tomato",
      }}
    >
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
        Hello Live2D
      </Text>
    </View>
  );
}
