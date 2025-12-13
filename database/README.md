# 데이터베이스 스키마 및 초기 데이터

사주 앱의 MySQL/MariaDB 데이터베이스 관련 파일

## 파일 설명

- `schema.sql`: 데이터베이스 테이블 스키마
- `init_data.sql`: 초기 데이터 (만세력 등)
- `migrations/`: 데이터베이스 마이그레이션 스크립트
- `seeds/`: 테스트용 시드 데이터

## 데이터베이스 초기화

```bash
# MySQL 접속
mysql -u root -p

# 스키마 생성
source schema.sql

# 초기 데이터 삽입
source init_data.sql
```

## 주요 테이블

1. **users**: 사용자 정보
2. **manseryeok**: 만세력 데이터
3. **saju_history**: 사주 조회 히스토리
4. **payments**: 결제 내역

자세한 내용은 `DB 스키마 설계.md` 파일을 참고하세요.

## 데이터베이스 설정

### 개발 환경
- Host: localhost
- Port: 3306
- Database: saju_db
- Charset: utf8mb4

### 백업

```bash
# 데이터베이스 백업
mysqldump -u root -p saju_db > backup.sql

# 데이터베이스 복원
mysql -u root -p saju_db < backup.sql
```
