import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Send } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Live2dView } from "@/features/live2d-viewer";

type ChatMessage = {
  id: string;
  text: string;
};

export default function CharacterRoom() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (messages.length === 0) return;
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { id: `${Date.now()}`, text: trimmed }]);
    setInput("");
  };

  return (
    <View className="flex-1 bg-app-background">
      <Live2dView key={id} />

      <View className="absolute inset-0" pointerEvents="box-none">
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

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1 justify-end"
          pointerEvents="box-none"
        >
          <View
            className="px-4"
            style={{ paddingBottom: insets.bottom + 12 }}
            pointerEvents="box-none"
          >
            {messages.length > 0 ? (
              <ScrollView
                ref={scrollRef}
                className="mb-3 max-h-64"
                contentContainerStyle={{ gap: 8 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                {messages.map((message) => (
                  <View key={message.id} className="max-w-[80%] self-end">
                    <View className="rounded-2xl rounded-br-sm bg-black/75 px-4 py-2.5">
                      <Text className="text-base text-white">{message.text}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            ) : null}

            <View className="flex-row items-end gap-3">
              <View className="flex-1 rounded-full border border-black/10 bg-white/90 px-4 py-2">
                <TextInput
                  value={input}
                  onChangeText={setInput}
                  placeholder="메시지를 입력하세요"
                  placeholderTextColor="#94a3b8"
                  className="max-h-24 py-2 text-base text-app-text"
                  multiline
                  maxLength={500}
                  accessibilityLabel="채팅 메시지 입력"
                />
              </View>
              <Pressable
                onPress={handleSend}
                disabled={!input.trim()}
                accessibilityRole="button"
                accessibilityLabel="메시지 보내기"
                className="mb-2 active:opacity-70 disabled:opacity-40"
                hitSlop={8}
              >
                <Send color="#000" size={24} />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
