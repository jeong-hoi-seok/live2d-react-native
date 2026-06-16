import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Play } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
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

type ChatMessage = {
  id: string;
  text: string;
  role: "user" | "bot";
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
          className="absolute active:opacity-70"
          style={{ top: insets.top + 8, left: 16 }}
          hitSlop={12}
        >
          <ChevronLeft color="#000" size={28} />
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
              {messages.map((message) =>
                message.role === "user" ? (
                  <View
                    key={message.id}
                    className="max-w-[80%] self-end rounded-2xl rounded-br-sm bg-black/75 px-4 py-2.5"
                  >
                    <Text className="text-base text-white">{message.text}</Text>
                  </View>
                ) : (
                  <View
                    key={message.id}
                    className="max-w-[80%] self-start rounded-2xl rounded-bl-sm bg-orange-500 px-4 py-2.5"
                  >
                    <Text className="text-base text-white">{message.text}</Text>
                  </View>
                ),
              )}
            </ScrollView>
          )}

          <View className="flex-row items-center gap-3">
            <View className="flex-1 min-h-10 justify-center rounded-[20px] border border-black/10 bg-white/90 px-4 py-2">
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="메시지를 입력하세요"
                placeholderTextColor="#94a3b8"
                className="w-full p-0 font-sans text-base leading-5 max-h-[60px] text-app-text"
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
              className="active:opacity-70 disabled:opacity-40 rounded-full bg-orange-500 size-10 flex items-center justify-center"
              hitSlop={8}
            >
              <Play color="white" size={16} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
