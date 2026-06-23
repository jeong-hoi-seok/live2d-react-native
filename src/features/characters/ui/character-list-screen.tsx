import { LinearGradient } from "expo-linear-gradient";
import { type Href, Link } from "expo-router";
import { Heart, Search } from "lucide-react-native";
import { Image, Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DESIGN_COLORS, DESIGN_SPACING } from "@/shared/lib/design-system";

import { CHARACTERS } from "../data";

const HORIZONTAL_PADDING = DESIGN_SPACING.containerPadding;
const CARD_GAP = DESIGN_SPACING.gutter;
const CATEGORY_GAP = 10;
const CATEGORIES = ["전체", "마법", "영혼", "신비", "신규", "청순", "귀여움"];

export function CharacterListScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const cardWidth = (width - HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;
  const featuredCharacter =
    CHARACTERS.find((character) => character.id === "huohuo") ?? CHARACTERS[0];
  const trendingCharacter = CHARACTERS.find((character) => character.id === "mao") ?? CHARACTERS[0];

  return (
    <View className="flex-1 bg-app-background">
      <ScrollView
        contentContainerStyle={{
          gap: DESIGN_SPACING.stackLg,
          paddingBottom: insets.bottom + 120,
          paddingHorizontal: HORIZONTAL_PADDING,
          paddingTop: insets.top + 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-[28px] font-bold leading-9 text-app-on-surface">홈</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="캐릭터 검색"
            className="size-10 items-center justify-center rounded-full active:bg-app-surface-container"
            hitSlop={8}
          >
            <Search size={22} color={DESIGN_COLORS.primary} strokeWidth={2.5} />
          </Pressable>
        </View>

        <PromoBanner character={featuredCharacter} />

        <ScrollView
          horizontal
          contentContainerStyle={{ gap: CATEGORY_GAP }}
          showsHorizontalScrollIndicator={false}
        >
          {CATEGORIES.map((category, index) => (
            <Pressable
              key={category}
              accessibilityRole="button"
              accessibilityLabel={`${category} 카테고리`}
              className={
                index === 0
                  ? "rounded-full bg-app-primary-container px-6 py-2.5 active:opacity-80"
                  : "rounded-full bg-app-surface-container px-6 py-2.5 active:bg-app-surface-container-high"
              }
            >
              <Text
                className={
                  index === 0
                    ? "text-[13px] font-bold leading-4 text-app-on-primary-container"
                    : "text-[13px] font-bold leading-4 text-app-on-surface-variant"
                }
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View className="flex-row flex-wrap" style={{ columnGap: CARD_GAP, rowGap: CARD_GAP }}>
          {CHARACTERS.map((character) => (
            <CharacterCard key={character.id} character={character} width={cardWidth} />
          ))}
        </View>

        <TrendingCard character={trendingCharacter} />
      </ScrollView>
    </View>
  );
}

type CharacterListItem = (typeof CHARACTERS)[number];

function PromoBanner({ character }: { character: CharacterListItem }) {
  return (
    <View className="h-48 overflow-hidden rounded-3xl bg-app-surface-container">
      {character.thumbnail ? (
        <Image
          source={character.thumbnail}
          className="absolute bottom-0 right-[-18px] h-full w-[62%]"
          resizeMode="cover"
        />
      ) : null}
      <LinearGradient
        colors={[DESIGN_COLORS.surfaceContainer, "rgba(29,32,34,0.86)", "rgba(29,32,34,0.18)"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
      />
      <View className="h-full justify-center gap-4 p-6">
        <View className="gap-1">
          <Text className="text-[10px] font-bold uppercase tracking-[2px] text-app-primary">
            새로운 캐릭터!
          </Text>
          <Text className="max-w-[220px] text-[28px] font-bold leading-9 text-app-on-surface">
            신규 Live2D{"\n"}라인업
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="프로모션 둘러보기"
          className="w-[104px] items-center rounded-xl bg-app-primary-container py-2.5 active:opacity-80"
        >
          <Text className="text-xs font-bold text-app-on-primary-container">보러가기</Text>
        </Pressable>
      </View>
    </View>
  );
}

function CharacterCard({ character, width }: { character: CharacterListItem; width: number }) {
  return (
    <View style={{ width }}>
      <Link href={`/character/${character.id}` as Href} asChild>
        <Pressable className="active:opacity-70">
          <View className="aspect-[2/3] overflow-hidden rounded-2xl bg-app-surface-container">
            {character.thumbnail ? (
              <Image source={character.thumbnail} className="h-full w-full" resizeMode="cover" />
            ) : null}
            <LinearGradient
              colors={["transparent", "rgba(16,20,21,0.5)", "rgba(16,20,21,0.94)"]}
              locations={[0, 0.48, 1]}
              style={{ position: "absolute", right: 0, bottom: 0, left: 0, height: "62%" }}
            />
            <View className="absolute right-2 top-2 size-8 items-center justify-center rounded-full bg-app-background/70">
              <Heart size={17} color={DESIGN_COLORS.primary} strokeWidth={2.2} />
            </View>
            <View className="absolute bottom-0 left-0 right-0 gap-1 px-3 pb-4">
              <Text className="text-xl font-bold text-app-on-surface" numberOfLines={1}>
                {character.name}
              </Text>
              <Text className="text-xs font-semibold text-app-on-surface-variant" numberOfLines={1}>
                {character.description ?? "Live2D character"}
              </Text>
            </View>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}

function TrendingCard({ character }: { character: CharacterListItem }) {
  return (
    <View className="gap-4">
      <Text className="text-2xl font-bold text-app-on-surface">지금 인기</Text>
      <View className="aspect-[0.86] overflow-hidden rounded-3xl bg-app-surface-container">
        {character.thumbnail ? (
          <Image
            source={character.thumbnail}
            className="h-full w-full opacity-70"
            resizeMode="cover"
          />
        ) : null}
        <LinearGradient
          colors={["rgba(16,20,21,0.1)", "rgba(16,20,21,0.92)"]}
          style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
        />
        <View className="absolute bottom-0 left-0 right-0 gap-1 p-6">
          <Text className="text-[30px] font-bold leading-9 text-app-on-surface">에디터의 선택</Text>
          <Text className="text-base leading-6 text-app-on-surface-variant">
            이번 주에 주목할 개성 있는 캐릭터를 만나보세요.
          </Text>
        </View>
      </View>
    </View>
  );
}
