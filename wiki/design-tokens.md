# Design Tokens

앱 전체 다크 톤 색상·레이아웃 토큰 정리. NativeWind className에 직접 박아 사용 중.

## 색상

| 용도 | 값 |
|------|-----|
| 전체 배경 | `#1a1a1a` |
| 카드/네비 배경 | `#1f1f1f` |
| 보조 표면 (아바타 배경, divider hover) | `#2a2a2a` |
| 글자 (기본) | `#dadada` |
| 글자 (보조) | `#7f7f7f` |
| 글자 (희미) | `#5a5a5a` |
| 탭 활성 아이콘 | `#dadada` |
| 탭 비활성 아이콘 | `#7f7f7f` |
| 강조 (트윙클·충전) | `yellow-400` (#facc15) |
| 알림 뱃지 | `red-500` |
| 스플래시 배경 | `#272727` |

## 레이아웃

- **수평 패딩**: `14px` (헤더·컨텐츠 모두 통일)
  - Tailwind 기본 `px-4`(16) 사용 금지. `style={{ paddingHorizontal: 14 }}` 사용
- **헤더 패턴**: ScrollView 밖에 sticky 헤더 배치
  ```tsx
  <View flex-1>
    <View style={{ paddingTop: insets.top + 12, paddingHorizontal: 14 }}>
      <Text>타이틀</Text>
    </View>
    <ScrollView contentContainerStyle={{ paddingHorizontal: 14 }}>
      ...
    </ScrollView>
  </View>
  ```
- **카드 그리드 (2열)**: `Dimensions` 기반 정확한 카드 너비 계산
  - `CARD_WIDTH = (screenWidth - HORIZONTAL_PADDING*2 - CARD_GAP) / 2`
  - 부모에 `columnGap`/`rowGap` 사용. 자식엔 패딩/마진 X
- **섹션 카드**: `rounded-2xl bg-[#1f1f1f]`
- **Row 터치**: `Pressable` + `active:bg-[#2a2a2a]`
- **safe area**: `useSafeAreaInsets()`의 `top + 12`, `bottom + 24~32`

## 패턴 예시 위치

- 헤더 + sticky: `src/app/(tabs)/profile.tsx`, `chat.tsx`, `features/characters/ui/character-list-screen.tsx`
- 그리드 카드: `features/characters/ui/character-list-screen.tsx`
- 섹션 + Row: `src/app/(tabs)/profile.tsx`

## 향후 개선 후보

- 토큰을 `src/shared/lib/colors.ts` 상수로 분리하거나 `tailwind.config.js`에 커스텀 컬러 등록
  - 예: `bg-app-bg`, `text-app-text`로 단축
- 14px 패딩도 `tailwind.config.js`의 spacing scale에 등록 (또는 기본 `px-3.5` 활용 검토)
