# 사주 계산 서비스 (Python Flask)

사주 계산 전용 마이크로서비스

## 설치

```bash
# 가상환경 생성
python -m venv venv

# 가상환경 활성화 (Windows)
venv\Scripts\activate

# 가상환경 활성화 (Linux/Mac)
source venv/bin/activate

# 패키지 설치
pip install -r requirements.txt
```

## 환경 설정

1. `.env.example` 파일을 `.env`로 복사
2. `.env` 파일에서 필요한 값 수정

## 실행

```bash
python app.py
```

서버는 `http://localhost:5000`에서 실행됩니다.

## 폴더 구조

```
python-saju/
├── modules/             # 사주 계산 모듈
│   └── saju_calculator.py
├── data/                # 만세력 데이터
├── app.py               # Flask 앱 진입점
├── requirements.txt     # Python 패키지
└── .env                 # 환경 변수
```

## API 엔드포인트

### POST /api/saju/calculate
사주 계산

**Request:**
```json
{
  "year": 1990,
  "month": 1,
  "day": 15,
  "hour": 14,
  "minute": 30,
  "is_lunar": false,
  "gender": "M"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "year_pillar": "경오",
    "month_pillar": "정축",
    "day_pillar": "신해",
    "hour_pillar": "을미"
  }
}
```
