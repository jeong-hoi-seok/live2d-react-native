# 네이밍 컨벤션

## 1. 파일명 — kebab-case

모든 파일·디렉토리는 kebab-case.

```
✅ live2d-viewer.tsx
✅ use-character-store.ts
✅ motion-control/
✅ expression-picker.tsx
✅ character-card.test.tsx

❌ Live2DViewer.tsx
❌ useCharacterStore.ts
❌ motion_control/
❌ ExpressionPicker.tsx
```

예외:
- Expo Router 동적 라우트: `[id].tsx`, `[...slug].tsx` (Expo 규약)
- Expo Router 그룹: `(tabs)/`, `(auth)/` (Expo 규약)
- 설정 파일: `tsconfig.json`, `biome.json` 등 도구 강제 규약

## 2. 내부 식별자

| 종류 | 규칙 | 예시 |
|---|---|---|
| 컴포넌트 | PascalCase | `Live2dViewer`, `ExpressionPicker`, `CharacterCard` |
| 훅 | camelCase, `use` prefix | `useCharacterStore`, `useLive2dBridge` |
| 함수 | camelCase | `loadModel`, `playMotion` |
| 변수 | camelCase | `currentModel`, `isLoading` |
| 상수 | UPPER_SNAKE_CASE | `DEFAULT_MOTION_GROUP`, `MAX_RETRY` |
| 타입/인터페이스 | PascalCase | `Live2dMessage`, `CharacterState` |
| 제네릭 | PascalCase, 한 글자 또는 의미 있는 이름 | `T`, `TPayload` |
| enum 멤버 | PascalCase | `MotionType.Idle` |
| zustand store | camelCase, `Store` suffix | `characterStore`, `live2dStore` |
| 이벤트 핸들러 | `handle*` / `on*` | `handleTap`, `onModelReady` |
| boolean | `is/has/should/can` prefix | `isReady`, `hasModel`, `shouldAutoPlay` |

## 3. 파일 ↔ 식별자 매핑 규칙

**파일명은 kebab-case, 내부 export는 PascalCase/camelCase로 변환.**

```ts
// live2d-viewer.tsx
export function Live2dViewer() { ... }

// use-character-store.ts
export function useCharacterStore() { ... }

// motion-types.ts
export type MotionType = ...

// default-motion-group.ts
export const DEFAULT_MOTION_GROUP = "Idle";
```

**약어 처리**: 약어도 PascalCase 규칙 따름. 전부 대문자 금지.

```
✅ Live2dViewer    (Live2D → Live2d)
✅ useApiClient    (API → Api)
✅ HtmlParser      (HTML → Html)

❌ Live2DViewer
❌ useAPIClient
❌ HTMLParser
```

이유: 약어 연속 시 경계 모호 (`useAPIURL` vs `useApiUrl`). 일관성 위해 첫 글자만 대문자.

## 4. 디렉토리 구조 명명

FSD slice 내부 디렉토리는 고정 이름 사용.

```
features/live2d-viewer/
├── ui/           # 컴포넌트
├── model/        # 상태, 타입, 비즈니스 로직
├── api/          # 외부 통신
├── lib/          # 순수 유틸
└── index.ts      # public API
```

slice 자체 이름은 kebab-case + 도메인-기능 형태.

```
✅ live2d-viewer
✅ motion-control
✅ expression-picker
✅ character-list

❌ live2dViewer
❌ Live2DViewer
❌ viewer  (도메인 모호)
```

## 5. 테스트 / 스토리북 파일

```
live2d-viewer.tsx
live2d-viewer.test.tsx       # 유닛
live2d-viewer.e2e.ts         # E2E
live2d-viewer.stories.tsx    # 스토리북 (도입 시)
```

## 6. 에셋

- 이미지: `kebab-case.png` — `character-thumbnail.png`
- Live2D 모델 디렉토리: 모델 원본 이름 유지 (Cubism 규약). 변경 시 manifest 깨짐.
  - `assets/models/haru/haru.model3.json` ← 원본 그대로

## 7. RN 특수 케이스

- 플랫폼별 파일: `component.ios.tsx`, `component.android.tsx`, `component.web.tsx` (RN resolver 규약)
- 환경별 파일: `config.dev.ts`, `config.prod.ts`

## 8. 자동 검증

Biome 규칙으로 강제 (도입 후):

```jsonc
{
  "linter": {
    "rules": {
      "style": {
        "useFilenamingConvention": {
          "level": "error",
          "options": { "filenameCases": ["kebab-case"] }
        },
        "useNamingConvention": "error"
      }
    }
  }
}
```
