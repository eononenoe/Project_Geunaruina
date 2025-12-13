# 사주 앱 백엔드 API

Node.js + Express 기반 백엔드 API 서버

## 설치

```bash
npm install
```

## 환경 설정

1. `.env.example` 파일을 `.env`로 복사
2. `.env` 파일에서 필요한 값 수정

## 실행

```bash
# 개발 모드
npm run dev

# 프로덕션 모드
npm start
```

## 폴더 구조

```
backend/
├── src/
│   ├── config/          # 설정 파일 (DB, JWT 등)
│   ├── controllers/     # 비즈니스 로직
│   ├── middleware/      # 미들웨어 (인증, 검증 등)
│   ├── models/          # 데이터 모델
│   ├── routes/          # API 라우트
│   ├── utils/           # 유틸리티 함수
│   └── server.js        # 서버 진입점
├── package.json
└── .env
```

## API 엔드포인트

작성 예정
