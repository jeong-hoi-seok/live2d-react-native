# live2d-react-native

React Native 앱에서 Live2D 캐릭터를 렌더링하는 프로젝트.

## Goal

Expo 기반 RN 앱 안에서 Live2D Cubism 모델을 띄우고, 표정·모션·립싱크·터치 인터랙션을 제어한다.

## Architecture

WebView 호스트 방식.

```
┌─────────────────────────────────────┐
│  React Native (Expo)                │
│  - 화면, 라우팅, 상태 관리          │
│  - 비즈니스 로직                    │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ react-native-webview          │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │ Live2D Renderer (Web)   │  │  │
│  │  │ - Cubism Web SDK        │  │  │
│  │  │ - pixi-live2d-display   │  │  │
│  │  │ - PixiJS WebGL          │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
       ↕ postMessage bridge
   { type, payload } JSON
```

RN ↔ WebView 통신은 `postMessage` 기반 JSON 프로토콜. 모델 로드·모션 재생·파라미터 조작·터치 이벤트 모두 메시지로 주고받음.

## Tech Stack

### Runtime
- **Expo SDK 52+** (Managed workflow, 추후 Bare 전환 가능)
- **Expo Router v4** — file-based routing (Next.js App Router 유사)
- **TypeScript** strict

### UI
- **NativeWind v4** — Tailwind CSS for RN
- **react-native-reanimated** — 애니메이션
- **react-native-gesture-handler** — 제스처

### State / Data
- **Zustand** — 클라이언트 상태
- **TanStack Query v5** — 서버 상태 / 캐싱
- **MMKV** (`react-native-mmkv`) — 영속 스토리지 (AsyncStorage 대체, 30배 빠름)

### Live2D
- **react-native-webview**
- **pixi-live2d-display** (Cubism 4 지원)
- **PixiJS v7**
- **Cubism Core** (`live2dcubismcore.min.js`)

### Tooling
- **Biome** — lint + format (ESLint/Prettier 대체)
- **TypeScript** strict
- **Vitest** — 유닛 테스트 (RN 호환 모드)
- **Maestro** — E2E

## Folder Structure (FSD)

```
src/
├── app/               # Expo Router 라우트 (FSD app layer와 별개, Expo 규약)
├── shared/            # 공용 유틸·UI·config·api
│   ├── ui/
│   ├── lib/
│   ├── api/
│   └── config/
├── entities/          # 도메인 엔티티 (character, user 등)
│   └── character/
├── features/          # 사용자 행위 단위 기능
│   ├── live2d-viewer/
│   ├── motion-control/
│   └── expression-picker/
├── widgets/           # 페이지 조합 블록
└── pages/             # 화면 단위 (Expo Router 라우트가 이걸 import)

webview/               # Live2D WebView 호스트 (별도 빌드)
├── src/
│   ├── live2d/        # Cubism + Pixi 래퍼
│   └── bridge/        # postMessage 핸들러
├── assets/            # .moc3 .model3.json 모델
└── dist/              # 빌드 산출물 (RN bundle에 포함)
```

Expo Router는 `app/` 디렉토리 규약을 강제하므로 FSD `pages/`는 `app/` 라우트가 import하는 화면 구현체로 사용.

## Setup

```bash
pnpm install
pnpm webview:build      # WebView 번들 빌드
pnpm start              # Expo 개발 서버
pnpm ios                # iOS 시뮬레이터
pnpm android            # Android 에뮬레이터
```

## License

- 프로젝트 코드: MIT (TBD)
- **Live2D Cubism SDK**: 매출 $10M 이하 무료 (Free Material License). 그 이상 상용 계약 필요. https://www.live2d.com/en/sdk/license/
- **Live2D 모델 파일**: 모델 제작자 별도 라이선스 확인 필수.
