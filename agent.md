# agent.md

이 저장소는 React Native 기반 Live2D 앱 프로젝트입니다. 모든 답변, 주석성 설명, 작업 보고는 한국어로 작성합니다.

## 프로젝트 기준

- 앱 목적: 모바일에서 Live2D 모델을 표시하고 모션, 표정, 상호작용을 제어하는 앱.
- Expo 버전은 `54.0.2`로 고정합니다.
  - 이유: App Store의 Expo 앱 최대 호환 버전에 맞춤.
- React Native, React, TypeScript, Biome, NativeWind, Zustand는 프로젝트에서 허용되는 범위 안에서 최신 버전을 사용합니다.
- Expo SDK와 충돌하는 최신 버전은 임의 적용하지 않습니다. Expo 54 호환성을 먼저 확인합니다.

## 작업 전 확인

1. `docs/commit-convention.md`를 확인합니다.
2. `docs/naming-convention.md`를 확인합니다.
3. 기존 코드와 설정 파일이 있으면 먼저 읽고, 같은 패턴으로 작업합니다.
4. 새 의존성 추가 전 현재 설치된 라이브러리와 Expo SDK 54 기본 제공 기능으로 해결 가능한지 확인합니다.
5. 네이티브 설정 변경이 필요하면 Expo managed workflow와 EAS 설정 영향을 먼저 확인합니다.

## 기술 스택 원칙

- UI: React Native + Expo.
- 스타일링: NativeWind를 1순위로 사용합니다.
- 상태 관리: Zustand를 사용합니다.
- 언어: TypeScript strict 기준으로 작성합니다.
- 포맷/린트: Biome 기준으로 정리합니다.
- 패키지 버전 변경 시 Expo SDK 54 호환성을 우선합니다.

## 스타일링 규칙

- 모든 스타일은 NativeWind className으로 먼저 작성합니다.
- `StyleSheet.create`, inline style, CSS-in-JS는 마지막 수단입니다.
- 예외:
  - 런타임 계산값
  - NativeWind가 직접 표현하지 못하는 네이티브 전용 속성
  - 3rd-party 컴포넌트 강제 오버라이드
- 안전 영역과 Dynamic Island를 항상 고려합니다.
  - 화면 최상단 UI는 `SafeAreaView`, `useSafeAreaInsets`, Expo Router header 설정을 검토합니다.
  - iPhone Dynamic Island 영역에 버튼, 상태 텍스트, 터치 타깃이 겹치지 않게 합니다.
  - 전체 화면 Live2D 뷰도 상단/하단 인터랙션 영역은 safe area inset을 반영합니다.

## 네이밍 규칙

자세한 규칙은 `docs/naming-convention.md`를 따릅니다.

- 모든 파일과 디렉토리는 kebab-case를 사용합니다.
- 컴포넌트는 PascalCase를 사용합니다.
- 훅은 `use` prefix가 있는 camelCase를 사용합니다.
- 상수는 UPPER_SNAKE_CASE를 사용합니다.
- 약어도 PascalCase 규칙을 따릅니다.
  - `Live2dViewer` 사용
  - `Live2DViewer` 사용 금지
- Expo Router 규약 파일명은 예외로 허용합니다.
  - `[id].tsx`
  - `[...slug].tsx`
  - `(tabs)/`

## 권장 구조

Feature-Sliced Design에 맞춰 도메인별 slice를 구성합니다.

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
```

- slice 외부에서는 `index.ts` public API를 통해 import합니다.
- 같은 계층의 다른 slice 내부 파일을 직접 import하지 않습니다.
- Live2D 관련 기능은 우선 `features/live2d-viewer`에 둡니다.
- 공용 UI, 유틸, 타입은 `shared`에 둡니다.

## Live2D 작업 규칙

- Live2D 모델 원본 디렉토리와 manifest 파일명은 가능한 변경하지 않습니다.
  - 예: `assets/models/haru/haru.model3.json`
- 모델 경로 변경은 manifest 내부 참조가 깨질 수 있으므로 반드시 함께 검증합니다.
- 렌더링 화면은 로딩, 실패, 모델 준비 완료 상태를 분리합니다.
- 모션, 표정, 시선 추적, 터치 반응은 상태와 UI 제어를 분리합니다.
- WebView나 네이티브 브릿지를 쓰는 경우 메시지 타입을 TypeScript 타입으로 먼저 정의합니다.

## 상태 관리 규칙

- 전역 클라이언트 상태는 Zustand store로 관리합니다.
- store 파일은 `*-store.ts` 형식을 사용합니다.
  - 예: `live2d-store.ts`, `character-store.ts`
- 렌더링 상태, 선택된 캐릭터, 모션 상태, 로딩 상태를 명확히 분리합니다.
- 서버 상태나 파일 로딩 상태를 무조건 전역화하지 않습니다.

## 접근성 및 모바일 UX

- 터치 타깃은 충분한 크기로 둡니다.
- 노치, Dynamic Island, 홈 인디케이터와 UI가 겹치지 않게 합니다.
- 작은 화면에서 Live2D 모델이 주요 조작 버튼을 가리지 않게 합니다.
- 가로/세로 전환이 필요한 화면은 레이아웃 깨짐을 확인합니다.
- 애니메이션과 모션은 성능을 우선합니다.

## 커밋 규칙

자세한 규칙은 `docs/commit-convention.md`를 따릅니다.

형식:

```txt
type(scope): subject
```

주요 type:

- `feat`: 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 포맷/스타일 변경
- `refactor`: 기능 변화 없는 구조 개선
- `test`: 테스트 추가/수정
- `chore`: 빌드, 도구, 설정 변경

subject는 50자 이내 한국어 명사형으로 간결하게 작성합니다.

## 검증 규칙

작업 종류에 따라 가능한 검증을 실행합니다.

- 타입 체크
- Biome lint/format
- Expo start 또는 빌드 검증
- 주요 화면 iOS safe area 확인
- Live2D 모델 로딩 확인

검증 명령이 없거나 아직 프로젝트가 초기 상태면, 실행하지 못한 이유를 작업 보고에 명시합니다.

## AI 작업 원칙

- 작업 전 관련 파일과 docs를 먼저 읽습니다.
- 사용자 변경분을 되돌리지 않습니다.
- 요청 범위 밖 리팩터링은 하지 않습니다.
- 새 파일은 kebab-case로 만듭니다.
- 주석은 복잡한 의도 설명이 필요할 때만 짧게 작성합니다.
- 불확실한 최신 버전, Expo 호환성, 네이티브 제약은 확인 후 반영합니다.
- 결과 보고에는 변경 파일, 핵심 변경 내용, 검증 여부를 포함합니다.
