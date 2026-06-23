import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, ImagePlus, Play } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Live2dView, type Live2dViewHandle } from "@/features/live2d-viewer";
import { DESIGN_COLORS } from "@/shared/lib/design-system";

type ChatMessage = {
  id: string;
  role: "user" | "bot";
  text?: string;
  imageUri?: string;
};

const ANDROID_INPUT_STYLE =
  Platform.OS === "android" ? ({ includeFontPadding: false } as const) : undefined;

const isGreetingMessage = (text: string) => /안녕/.test(text);

export default function CharacterRoom() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const live2dRef = useRef<Live2dViewHandle>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (messages.length === 0) return;
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    const showEvt = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvt = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const showSub = Keyboard.addListener(showEvt, (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener(hideEvt, () => setKeyboardHeight(0));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const now = Date.now();
    const greeting = isGreetingMessage(trimmed);

    setMessages((prev) => [
      ...prev,
      { id: `${now}-u`, text: trimmed, role: "user" },
      ...(greeting ? [{ id: `${now}-b`, text: "안녕, 반가워", role: "bot" as const }] : []),
    ]);
    setInput("");

    if (greeting) {
      live2dRef.current?.sendCommand({ type: "greet" });
    }
  };

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "권한 필요",
        "사진 첨부를 위해 갤러리 접근 권한이 필요합니다. 설정에서 허용해주세요.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: false,
      quality: 0.8,
    });

    if (result.canceled || !result.assets[0]) return;

    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-u-img`, role: "user", imageUri: result.assets[0].uri },
    ]);
  };

  const canSend = input.trim().length > 0;
  const keyboardVisible = keyboardHeight > 0;
  const bottomPadding = keyboardVisible ? keyboardHeight + 8 : insets.bottom + 12;

  return (
    <View className="flex-1 bg-app-background">
      <Live2dView ref={live2dRef} key={id} modelId={id} />

      <View className="absolute inset-0" pointerEvents="box-none">
        {keyboardVisible && (
          <Pressable
            onPress={Keyboard.dismiss}
            accessibilityLabel="키보드 닫기"
            accessible={false}
            className="absolute inset-0"
          />
        )}

        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="뒤로 가기"
          className="absolute h-11 w-11 items-center justify-center rounded-full bg-app-surface-container-high/90 active:opacity-70"
          style={{ top: insets.top + 8, left: 16 }}
          hitSlop={12}
        >
          <ChevronLeft color={DESIGN_COLORS.onSurface} size={28} />
        </Pressable>

        <View
          className="absolute left-0 right-0 bottom-0 px-4"
          style={{ paddingBottom: bottomPadding }}
          pointerEvents="box-none"
        >
          {messages.length > 0 && (
            <ScrollView
              ref={scrollRef}
              className="mb-3 max-h-64"
              contentContainerStyle={{ gap: 8 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {messages.map((message) => {
                const isUser = message.role === "user";
                const bubbleClass = isUser
                  ? "max-w-[80%] self-end rounded-3xl rounded-br-md bg-app-primary"
                  : "max-w-[80%] self-start rounded-3xl rounded-bl-md bg-app-surface-container-high";

                if (message.imageUri) {
                  return (
                    <View key={message.id} className={`${bubbleClass} overflow-hidden p-1`}>
                      <Image
                        source={{ uri: message.imageUri }}
                        className="h-48 w-48 rounded-xl"
                        resizeMode="cover"
                      />
                    </View>
                  );
                }

                return (
                  <View key={message.id} className={`${bubbleClass} px-4 py-2.5`}>
                    <Text
                      className={
                        isUser ? "text-base text-app-on-primary" : "text-base text-app-on-surface"
                      }
                    >
                      {message.text}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          )}

          <View className="flex-row items-center gap-3">
            <Pressable
              onPress={handlePickImage}
              accessibilityRole="button"
              accessibilityLabel="이미지 첨부"
              className="active:opacity-70 flex size-10 items-center justify-center rounded-full bg-app-surface-container-high/95"
              hitSlop={8}
            >
              <ImagePlus color={DESIGN_COLORS.onSurfaceVariant} size={20} />
            </Pressable>
            <View className="min-h-10 flex-1 justify-center rounded-full border border-app-outline-variant bg-app-surface-container-high/95 px-4 py-2">
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="메시지를 입력하세요"
                placeholderTextColor={DESIGN_COLORS.outline}
                className="max-h-[60px] w-full p-0 font-sans text-base leading-5 text-app-on-surface"
                multiline
                scrollEnabled
                maxLength={500}
                accessibilityLabel="채팅 메시지 입력"
                style={ANDROID_INPUT_STYLE}
              />
            </View>
            <Pressable
              onPress={handleSend}
              disabled={!canSend}
              accessibilityRole="button"
              accessibilityLabel="메시지 보내기"
              className="active:opacity-70 disabled:opacity-40 flex size-10 items-center justify-center rounded-full bg-app-primary"
              hitSlop={8}
            >
              <Play color={DESIGN_COLORS.onPrimary} size={16} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
