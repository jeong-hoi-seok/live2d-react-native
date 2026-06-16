# AI Wiki 작성 가이드

AI Wiki는 AI 에이전트가 작업을 수행하기 위해 참조하고, 작업 중 발견한 지식을 스스로 기록하는 AI 전용 지식/문서 시스템입니다.

## 목적

- 반복되는 탐색 비용을 줄입니다.
- 프로젝트 의사결정과 구현 맥락을 보존합니다.
- 코드 구조, 제약, 주의사항을 AI가 빠르게 이해하게 합니다.
- 작업 중 새로 확인한 사실을 다음 작업자가 재사용할 수 있게 합니다.

## 위치

모든 AI Wiki 문서는 `wiki/` 디렉토리에 작성합니다.

```txt
wiki/
  index.md
  architecture.md
  live2d-rendering.md
  state-management.md
  troubleshooting.md
```

## 파일명 규칙

- 파일명은 kebab-case를 사용합니다.
- 문서 주제가 명확하게 드러나야 합니다.
- 너무 넓은 이름은 피합니다.

예시:

```txt
live2d-rendering.md
expo-safe-area.md
nativewind-styling.md
webview-bridge.md
model-assets.md
```

## 생성 기준

아래 상황이면 새 wiki 문서를 만듭니다.

- 같은 내용을 이후 작업에서도 반복 참조할 가능성이 큼
- 코드만 보고 의도를 파악하기 어려움
- Live2D, Expo, NativeWind, Zustand 같은 핵심 도메인 지식임
- 시행착오, 제약, 호환성 문제를 기록해야 함
- 여러 파일에 걸친 구조나 데이터 흐름 설명이 필요함

아래 상황이면 새 문서 대신 기존 문서를 갱신합니다.

- 이미 같은 주제 문서가 있음
- 기존 결정의 보충 설명임
- 작은 명령어, 경로, 주의사항 추가임

## 작성 원칙

- 사람이 읽는 README가 아니라 AI 작업 보조 문서로 작성합니다.
- 설명은 짧고 명확하게 씁니다.
- 추측과 확인된 사실을 분리합니다.
- 오래될 수 있는 버전 정보에는 확인 날짜를 적습니다.
- 관련 파일 경로를 가능한 함께 기록합니다.
- 작업 결과보다 재사용 가능한 지식을 남깁니다.
- 민감 정보, 토큰, 개인 계정 정보는 기록하지 않습니다.

## 문서 템플릿

새 wiki 문서는 아래 형식을 기본으로 사용합니다.

```md
# 문서 제목

## 목적

이 문서가 어떤 작업에 필요한지 적습니다.

## 핵심 요약

- 중요한 사실 1
- 중요한 사실 2
- 중요한 사실 3

## 관련 경로

- `path/to/file.ts`
- `path/to/directory/`

## 상세 내용

구조, 흐름, 제약, 구현 맥락을 적습니다.

## 작업 시 주의사항

- 깨지기 쉬운 부분
- 변경 전 확인할 부분
- 검증해야 할 부분

## 검증 방법

```sh
검증 명령
```

## 갱신 기록

- YYYY-MM-DD: 작성 또는 변경 내용 요약
```

## 주제별 권장 문서

프로젝트가 커지면 아래 문서를 우선 만듭니다.

- `wiki/index.md`: wiki 목차와 문서별 설명
- `wiki/project-overview.md`: 프로젝트 목적과 핵심 스택
- `wiki/architecture.md`: 폴더 구조와 계층 규칙
- `wiki/live2d-rendering.md`: Live2D 렌더링 방식
- `wiki/model-assets.md`: Live2D 모델 자산 경로와 관리 규칙
- `wiki/webview-bridge.md`: WebView/네이티브 브릿지 메시지 규칙
- `wiki/state-management.md`: Zustand store 구조
- `wiki/nativewind-styling.md`: NativeWind 스타일링 규칙
- `wiki/expo-safe-area.md`: Dynamic Island와 safe area 대응
- `wiki/troubleshooting.md`: 자주 발생한 문제와 해결 방법

## 작업 흐름

AI 에이전트는 작업 시작 시 필요한 wiki 문서를 먼저 읽습니다.

1. `wiki/index.md`가 있으면 먼저 확인합니다.
2. 작업 주제와 관련된 wiki 문서를 확인합니다.
3. 기존 docs와 코드 내용을 함께 확인합니다.
4. 작업 중 새로 알게 된 재사용 가능 지식이 있으면 wiki를 갱신합니다.
5. 변경 보고에 갱신한 wiki 문서를 함께 적습니다.

## 갱신 규칙

- 코드 변경으로 wiki 내용이 틀려지면 같은 작업 안에서 수정합니다.
- 불확실한 내용은 단정하지 않고 `확인 필요`로 표시합니다.
- 더 이상 유효하지 않은 내용은 삭제보다 `폐기됨` 표시 후 이유를 남깁니다.
- 같은 주제 중복 문서가 생기면 하나로 합치고 `wiki/index.md`를 갱신합니다.

## 금지 사항

- 비밀 키, 토큰, 인증 정보 기록 금지
- 개인 계정, 로컬 환경 고유 경로 남발 금지
- 코드와 불일치하는 오래된 절차 방치 금지
- 단순 작업 로그만 남기는 문서 생성 금지
- README, docs, agent.md와 같은 내용을 그대로 복사 금지
