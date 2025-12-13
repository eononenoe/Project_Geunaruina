# 사주 앱 (React Native + Expo)

크로스 플랫폼 사주 모바일 앱

## 설치

```bash
npm install
```

## 실행

```bash
# 개발 서버 시작
npm start

# Android 에뮬레이터에서 실행
npm run android

# iOS 시뮬레이터에서 실행
npm run ios

# 웹 브라우저에서 실행
npm run web
```

## 폴더 구조

```
mobile-app/
├── src/
│   ├── api/             # API 통신 관련
│   ├── components/      # 재사용 가능한 컴포넌트
│   ├── navigation/      # 네비게이션 설정
│   ├── screens/         # 화면 컴포넌트
│   ├── store/           # Redux 상태 관리
│   └── utils/           # 유틸리티 함수
├── assets/              # 이미지, 폰트 등
├── App.js               # 앱 진입점
├── app.json             # Expo 설정
├── package.json
└── babel.config.js
```

## 기술 스택

- **React Native**: 크로스 플랫폼 앱 개발
- **Expo**: 빌드 및 배포 자동화
- **React Navigation**: 화면 네비게이션
- **Redux Toolkit**: 상태 관리
- **Axios**: API 통신
- **React Native Paper**: UI 컴포넌트

## 주요 기능

- 사주 계산 및 조회
- 사용자 인증
- 결제 시스템 (토스페이먼츠)
- 히스토리 관리

## 개발 가이드

### 새 화면 추가
1. `src/screens/`에 화면 컴포넌트 생성
2. `src/navigation/`에서 네비게이션에 등록

### API 호출
1. `src/api/`에 API 함수 추가
2. 컴포넌트에서 호출

### 상태 관리
1. `src/store/slices/`에 slice 생성
2. `src/store/index.js`에 리듀서 등록
