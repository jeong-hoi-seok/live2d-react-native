# Splash Screen 설정

iOS 풀스크린 스플래시 적용 기록.

## 결론

`app.json` `expo-splash-screen` 플러그인에 **`enableFullScreenImage_legacy: true`** 필요. 없으면 storyboard에 100x100 imageView로 박혀서 화면 중앙에 작게 표시됨.

## 현재 설정

```json
[
  "expo-splash-screen",
  {
    "image": "./assets/images/splash-full.png",
    "enableFullScreenImage_legacy": true,
    "backgroundColor": "#272727"
  }
]
```

## 이미지 사양

- 경로: `assets/images/splash-full.png`
- 사이즈: **1290 x 2796** (iPhone 15 Pro Max 해상도, 19.5:9)
- 안전 구역: 중앙 1290x1290 정사각형 (iPad 양옆 잘림 대응)
- 로고는 중앙 60% 안에 배치

## 옵션 동작 차이

| 옵션 | 동작 |
|------|------|
| `imageWidth` | contain 모드 로고 너비 (기본 100) |
| `resizeMode: cover` | imageWidth 박스 안에서 cover (풀스크린 X) |
| `enableFullScreenImage_legacy: true` | iOS Storyboard imageView를 화면 전체로 확장. SDK 50+에서 진짜 풀스크린 |

`_legacy`는 SDK 50 이전 풀스크린 동작 복원용. SDK 50부터 기본이 "중앙 로고" 방식으로 바뀜.

## Android 주의

`enableFullScreenImage_legacy`는 iOS 전용. Android 12+ 스플래시 API는 풀스크린이 제한적이라 중앙 로고가 OS 표준. 필요 시 `android.image`로 별도 분기.

## 재빌드 필수

스플래시는 네이티브 리소스. JS 변경 아님.

- `expo-splash-screen` 옵션 변경 후 → `pnpm dlx expo prebuild --clean && pnpm ios`
- 이미지 파일만 교체 시 → 재빌드 필요
- OTA 업데이트(`eas update`)로 반영 안 됨. 새 빌드 필요

## JS 단의 hideAsync

`src/app/_layout.tsx`에서 `SplashScreen.preventAutoHideAsync()` + 폰트 로딩 후 `hideAsync()` 호출. 손대지 말 것.
