# agent.md — AI Agent 작업 가이드

이 문서는 본 repo에서 Claude / AI 에이전트가 코드를 작성·수정할 때 따라야 하는 기술 스펙과 컨벤션을 정의한다.

## 1. 프로젝트 정체성

- **목표**: React Native(Expo) 앱 내부에서 Live2D Cubism 캐릭터 렌더링.
- **렌더링 전략**: WebView 호스트 + Cubism Web SDK. 네이티브 모듈 작성 금지 (별도 합의 전까지).
- **유저 배경**: 웹 모던 프론트엔드 개발자 (Next.js, Biome, Tailwind, TanStack Query, Zustand, FSD). RN 첫 프로젝트.

## 2. Tech Stack — 고정값

변경 시 반드시 사용자 확인.

| 영역 | 선택 | 비고 |
|---|---|---|
| Framework | Expo SDK 56 Managed | Bare 전환 전까지 native code 직접 수정 금지 |
| Routing | Expo Router v4 | file-based, `app/` 디렉토리 |
| Language | TypeScript strict | `any` 금지, `unknown` 후 narrowing |
| Styling | NativeWind v4 | Tailwind className. inline style 최소화 |
| Animation | react-native-reanimated v3 | UI thread 애니메이션 우선 |
| Gesture | react-native-gesture-handler v2 | |
| State (client) | Zustand | slice 패턴, devtools middleware dev only |
| State (server) | TanStack Query v5 | suspense 모드 권장, queryKey factory 사용 |
| Storage | react-native-mmkv | AsyncStorage 사용 금지 |
| Lint/Format | Biome | ESLint/Prettier 도입 금지 |
| Test (unit) | Vitest | jest-expo 회피, Vitest + RN preset |
| Test (E2E) | Maestro | Detox 회피 |
| Package manager | pnpm | npm/yarn 사용 금지 |

### Live2D 의존성

- `react-native-webview` (RN 측)
- `pixi.js@^7` (WebView 측, v8은 pixi-live2d-display 미지원)
- `pixi-live2d-display@^0.4` (Cubism 4 모델용)
- `live2dcubismcore.min.js` — Live2D 공식 배포, npm 미배포. `webview/vendor/`에 직접 배치.

## 3. Folder Structure (FSD)

```
src/
├── app/          # Expo Router 라우트 파일만. 로직 금지, pages/ import만.
├── shared/       # 어디서나 import 가능. 다른 layer import 금지.
├── entities/     # shared만 import.
├── features/     # shared, entities만 import.
├── widgets/      # shared, entities, features만 import.
└── pages/        # 모든 하위 layer import 가능. app/이 이걸 import.
```

**의존성 규칙**: 위 → 아래 import 금지. 위반 시 PR 반려.

slice 내부:
```
features/live2d-viewer/
├── ui/           # 컴포넌트
├── model/        # zustand store, 타입
├── api/          # TanStack Query hooks
├── lib/          # 순수 유틸
└── index.ts      # public API. 외부는 이것만 import.
```

외부에서 슬라이스 내부 직접 import 금지. 반드시 `index.ts` 경유.

## 4. Live2D WebView 브릿지 프로토콜

메시지 포맷:

```ts
type Live2DMessage =
  | { type: "LOAD_MODEL"; payload: { url: string } }
  | { type: "SET_EXPRESSION"; payload: { id: string } }
  | { type: "PLAY_MOTION"; payload: { group: string; index: number } }
  | { type: "SET_PARAMETER"; payload: { id: string; value: number } }
  | { type: "TAP"; payload: { x: number; y: number } }
  | { type: "READY" }
  | { type: "ERROR"; payload: { message: string } };
```

- RN → WebView: `webViewRef.current?.injectJavaScript`로 `window.__live2dBridge.receive(msg)` 호출.
- WebView → RN: `window.ReactNativeWebView.postMessage(JSON.stringify(msg))`.
- 모든 메시지 JSON 직렬화. 함수·undefined 금지.
- 새 메시지 타입 추가 시 union에 추가 + 양쪽 핸들러 갱신 (exhaustive switch).

## 5. 코딩 컨벤션

- **export**: named export 우선. default export는 Expo Router 라우트 파일만 허용.
- **컴포넌트**: 함수 컴포넌트만. class 금지.
- **hook**: `use*` 네이밍. 조건부 호출 금지.
- **에러 처리**: 외부 경계(API, WebView 메시지, 파일 IO)에서만 try/catch. 내부 코드는 throw 위임.
- **주석**: WHY만. WHAT 금지. 한국어 OK.
- **타입**: `type` 우선, extends 필요 시 `interface`.
- **네이밍**: [docs/naming-convention.md](./docs/naming-convention.md) 준수. 파일명 kebab-case (`live2d-viewer.tsx`), 컴포넌트 PascalCase (`Live2dViewer`), 약어도 첫 글자만 대문자.

## 6. 금지 사항

- AsyncStorage 추가
- ESLint, Prettier 추가
- styled-components, emotion 추가
- Redux, Recoil, Jotai 추가
- npm, yarn 사용
- `any` 타입
- 네이티브 코드 직접 수정 (Expo Managed 유지)
- Live2D 모델 파일 라이선스 미확인 커밋
- Cubism Core 파일 npm 배포 시도

## 7. 작업 플로우

1. 작업 전: 사용자에게 의도 확인. 모호하면 질문.
2. 의존성 추가: `pnpm add` 전 사용자 승인.
3. 폴더 layer 결정: FSD 규칙 위반 시 거부.
4. 구현: 작은 단위로. PR 단위로 검증.
5. 검증: `pnpm typecheck && pnpm lint && pnpm test` 통과.
6. 커밋: [docs/commit-convention.md](./docs/commit-convention.md) 준수. `type(scope): subject` 형식, 한국어 OK.

## 8. 참고 자료

- Expo Router: https://docs.expo.dev/router/introduction/
- NativeWind: https://www.nativewind.dev/
- pixi-live2d-display: https://github.com/guansss/pixi-live2d-display
- Cubism SDK: https://www.live2d.com/en/sdk/about/
- FSD: https://feature-sliced.design/
- 커밋 컨벤션: [docs/commit-convention.md](./docs/commit-convention.md)
- 네이밍 컨벤션: [docs/naming-convention.md](./docs/naming-convention.md)

## 9. 결정 보류 항목

작업 진행 중 사용자 결정 필요:

- [ ] Live2D 모델 파일 출처 / 라이선스
- [ ] 백엔드 유무 (TanStack Query 대상 API)
- [ ] 인증 방식
- [ ] 타깃 플랫폼 우선순위 (iOS / Android / Web)
- [ ] 최소 지원 OS 버전
- [ ] 라이선스 (MIT? Proprietary?)
