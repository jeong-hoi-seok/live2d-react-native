# Live2D React Native

React Native와 Expo 기반 Live2D 캐릭터 대화 앱입니다.

## ✨ 소개

화면에 Live2D 캐릭터를 띄우고, 사용자가 캐릭터와 대화하는 모바일 앱을 목표로 합니다. 캐릭터는 대화 흐름에 맞춰 표정, 모션, 터치 반응을 보여주며 더 자연스러운 인터랙션을 제공합니다.

## 🎯 주요 목표

- 🧍 Live2D 캐릭터 화면 렌더링
- 💬 캐릭터와 대화하는 채팅 경험
- 🙂 표정, 모션, 터치 반응 제어
- 📱 iOS Dynamic Island와 safe area를 고려한 모바일 UI
- 🎨 NativeWind 기반 스타일링

## 🧱 기술 스택

- ⚛️ React
- 📱 React Native
- 🚀 Expo `54.0.2`
- 🟦 TypeScript
- 🎨 NativeWind
- 🐻 Zustand
- 🧹 Biome

## 📁 권장 프로젝트 구조

```txt
app/
features/
  live2d-viewer/
    ui/
    model/
    api/
    lib/
    index.ts
entities/
shared/
assets/
  models/
docs/
wiki/
```

## 🚀 앱 실행 방법

의존성 설치:

```sh
pnpm install
```

개발 서버 실행:

```sh
pnpm expo start
```

iOS 네이티브 빌드(첫 빌드 또는 네이티브 변경 후):

```sh
pnpm ios
```

Android 네이티브 빌드:

```sh
pnpm android
```

> 웹은 지원하지 않습니다. 모바일(iOS/Android) 전용 앱입니다.

## 🧪 검증 명령

프로젝트 스크립트가 추가되면 아래 명령을 기준으로 확인합니다.

```sh
pnpm lint
pnpm typecheck
pnpm format
```
