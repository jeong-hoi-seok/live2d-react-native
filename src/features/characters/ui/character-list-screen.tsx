import MaskedView from "@react-native-masked-view/masked-view";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { type Href, Link } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CHARACTERS } from "../data";

export function CharacterListScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-[#1b1b1f]">
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom + 24,
          paddingHorizontal: 16,
        }}
      >
        <Text className="mb-6 text-2xl font-bold text-white">홈</Text>
        <View className="flex-row flex-wrap">
          {CHARACTERS.map((c) => (
            <View key={c.id} className="w-1/2 px-2 mb-4">
              <Link href={`/character/${c.id}` as Href} asChild>
                <Pressable className="active:opacity-70">
                  <View className="aspect-[2/3] w-full overflow-hidden rounded-[32px] bg-slate-900">
                    {c.thumbnail ? (
                      <Image source={c.thumbnail} className="h-full w-full" resizeMode="cover" />
                    ) : null}

                    {/* 그라디언트 마스크 블러 */}
                    <MaskedView
                      style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%" }}
                      maskElement={
                        <LinearGradient colors={["transparent", "black"]} style={{ flex: 1 }} />
                      }
                    >
                      <BlurView intensity={60} tint="dark" style={{ flex: 1 }} />
                    </MaskedView>

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
