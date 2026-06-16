# 프로젝트 초기 세팅

## 목적

Expo 54 기반 React Native 앱 실행을 위한 기본 설정과 선택 이유를 기록합니다.

## 핵심 요약

- Expo SDK는 `54.0.2`로 고정합니다.
- Expo SDK 54는 React Native `0.81`, React `19.1.0` 대상입니다.
- NativeWind는 v4 안정 버전을 사용합니다.
- NativeWind v4에서는 React Native 기본 컴포넌트에 `className`을 직접 사용합니다.
- NativeWind v4 설정에는 `babel.config.js`, `metro.config.js`, `tailwind.config.js`, `global.css`가 필요합니다.
- Dynamic Island와 safe area 대응을 위해 `react-native-safe-area-context`를 사용합니다.

## 관련 경로

- `package.json`
- `index.ts`
- `app.json`
- `App.tsx`
- `babel.config.js`
- `metro.config.js`
- `tailwind.config.js`
- `global.css`
- `src/features/live2d-viewer/ui/live2d-home-screen.tsx`

## 상세 내용

`index.ts`는 Expo 기본 엔트리로 사용합니다. `registerRootComponent(App)`로 루트 컴포넌트를 등록하고, `package.json`의 `main`은 `index.ts`를 가리킵니다. Expo Router는 아직 설치하지 않았으므로 `app/` 라우트 구조를 만들지 않습니다.

NativeWind v4는 `nativewind/metro`, `nativewind/babel`, Tailwind CSS v3 조합을 사용합니다. `View`, `Text` 같은 React Native 기본 컴포넌트에 `className`을 직접 작성합니다. 별도 `tw/` 래퍼 폴더는 만들지 않습니다.

Biome는 `global.css`의 `@tailwind` at-rule를 표준 CSS가 아니라고 볼 수 있으므로 해당 파일에만 `noUnknownAtRules` 예외를 둡니다.

Safe area는 `SafeAreaProvider`와 `useSafeAreaInsets`로 처리합니다. 화면 최상단/하단 padding은 Dynamic Island와 홈 인디케이터를 가리지 않도록 inset 기준으로 계산합니다.

## 작업 시 주의사항

- `ios/`, `android/` 폴더는 Expo managed 기준으로 만들지 않습니다. 필요할 때 `expo prebuild`로 생성합니다.
- Expo Router 도입 전에는 `main`을 `expo-router/entry`로 설정하지 않습니다.
- Expo 앱 엔트리는 `index.ts`와 `registerRootComponent(App)`를 유지합니다.
- Live2D 모델 자산은 원본 manifest 경로가 깨지지 않게 유지합니다.
- NativeWind v4 설정에서는 `nativewind/babel` preset을 유지합니다.

## 검증 방법

```sh
pnpm typecheck
pnpm lint
```

## 갱신 기록

- 2026-06-16: Expo 54, NativeWind, Biome, SafeArea 초기 세팅 기록
- 2026-06-16: Expo 기본 엔트리 `index.ts`와 `registerRootComponent(App)` 규칙 추가
- 2026-06-16: NativeWind v5 preview 구조를 v4 안정 구조로 변경하고 `tw/` 래퍼 제거
