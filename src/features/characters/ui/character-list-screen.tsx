import { LinearGradient } from "expo-linear-gradient";
import { type Href, Link } from "expo-router";
import { Dimensions, Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CHARACTERS } from "../data";

const HORIZONTAL_PADDING = 14;
const CARD_GAP = 16;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;

export function CharacterListScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-[#1a1a1a]">
      <View
        style={{ paddingTop: insets.top + 12, paddingHorizontal: 14 }}
        className="bg-[#1a1a1a] pb-4"
      >
        <Text className="text-2xl font-bold text-[#dadada]">홈</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + 24,
          paddingHorizontal: HORIZONTAL_PADDING,
        }}
      >
        <View className="flex-row flex-wrap" style={{ columnGap: CARD_GAP, rowGap: CARD_GAP }}>
          {CHARACTERS.map((c) => (
            <View key={c.id} style={{ width: CARD_WIDTH }}>
              <Link href={`/character/${c.id}` as Href} asChild>
                <Pressable className="active:opacity-70">
                  <View className="aspect-[2/3] w-full overflow-hidden rounded-2xl bg-slate-900">
                    {c.thumbnail ? (
                      <Image source={c.thumbnail} className="h-full w-full" resizeMode="cover" />
                    ) : null}

                    <LinearGradient
                      colors={["transparent", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.88)"]}
                      locations={[0, 0.45, 1]}
                      style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55%" }}
                    />

                    <View className="absolute bottom-0 left-0 right-0 items-center pb-4 px-6">
                      <Text className="text-2xl font-bold text-white mb-1">{c.name}</Text>
                      <Text
                        className="text-md text-center text-white/70"
                        lineBreakStrategyIOS="hangul-word"
                        textBreakStrategy="balanced"
                      >
                        {c.description}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </Link>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
