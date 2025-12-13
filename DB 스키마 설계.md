# 사주 앱 데이터베이스 스키마 설계

## 📊 전체 테이블 구성 (22개)

### 핵심 기능 (10개)
| 번호 | 테이블명 | 설명 |
|------|----------|------|
| 1 | users | 회원 기본 정보 (이름, 생년월일, 성별, 시간) |
| 2 | manseruk | 만세력 마스터 데이터 |
| 3 | time_column | 시주 데이터 (시간별) |
| 4 | user_saju | 사용자별 저장한 사주들 |
| 5 | saju_history | 사주 조회 히스토리 |
| 6 | saju_relations | 신살 정보 (반합, 원진살 등) |
| 7 | interpretation_template | 해석 템플릿 |
| 8 | payments | 결제 내역 |
| 9 | user_favorites | 즐겨찾기 |
| 10 | push_tokens | 푸시 알림 토큰 (FCM) |

### 보안 & 인증 (4개)
| 번호 | 테이블명 | 설명 |
|------|----------|------|
| 11 | refresh_tokens | JWT 리프레시 토큰 |
| 12 | daily_query_limit | 무료 조회 횟수 제한 |
| 13 | social_accounts | 소셜 로그인 연동 |
| 14 | login_attempts | 로그인 실패 기록 |

### 운영 & 관리 (3개)
| 번호 | 테이블명 | 설명 |
|------|----------|------|
| 15 | notices | 공지사항 |
| 16 | faqs | 자주 묻는 질문 |
| 17 | inquiries | 1:1 문의 |

### 마케팅 & 프로모션 (2개)
| 번호 | 테이블명 | 설명 |
|------|----------|------|
| 18 | promo_codes | 프로모션 코드/쿠폰 |
| 19 | promo_code_usage | 프로모션 사용 내역 |

### 사용자 경험 (3개)
| 번호 | 테이블명 | 설명 |
|------|----------|------|
| 20 | user_settings | 앱 설정 (알림, 테마) |
| 21 | deleted_users | 탈퇴 사용자 보관 |
| 22 | admins | 관리자 계정 |

---

## 📋 상세 테이블 정의

### 1. users (회원 정보)
회원 본인의 기본 정보를 저장합니다.

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,

  -- 로그인 정보
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,

  -- 기본 정보 (회원가입 시 필수)
  name VARCHAR(50) NOT NULL,
  nickname VARCHAR(50),
  birth_date DATE NOT NULL,
  birth_time TIME,
  gender ENUM('M', 'F') NOT NULL,
  is_lunar BOOLEAN DEFAULT FALSE,

  -- 계정 상태
  status ENUM('active', 'inactive', 'deleted') DEFAULT 'active',

  -- 프리미엄
  is_premium BOOLEAN DEFAULT FALSE,
  premium_expire_at DATETIME,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP
);
```

**회원가입 시 필수 정보:**
- 아이디: email 또는 phone (둘 중 하나)
- 비밀번호
- 이름
- 생년월일
- 성별

**선택 정보:**
- 태어난 시간
- 음력 여부
- 닉네임

---

### 2. manseruk (만세력 마스터 데이터)
미리 계산된 만세력 데이터를 저장합니다. (1900-2100년 등)

```sql
CREATE TABLE manseruk (
  id INT PRIMARY KEY AUTO_INCREMENT,
  solar_date DATE NOT NULL,
  lunar_date VARCHAR(20),
  year_gan VARCHAR(2),
  year_ji VARCHAR(2),
  month_gan VARCHAR(2),
  month_ji VARCHAR(2),
  day_gan VARCHAR(2),
  day_ji VARCHAR(2),
  jeolgi VARCHAR(10),
  jeolgi_date DATE,

  UNIQUE KEY uk_solar_date (solar_date)
);
```

---

### 3. time_column (시주 데이터)
일간별 시간대별 시주를 저장합니다.

```sql
CREATE TABLE time_column (
  id INT PRIMARY KEY AUTO_INCREMENT,
  day_gan VARCHAR(2),
  time_range VARCHAR(10),
  time_gan VARCHAR(2),
  time_ji VARCHAR(2),

  UNIQUE KEY uk_day_time (day_gan, time_range)
);
```

---

### 4. user_saju (사용자별 사주 저장)
사용자가 저장한 사주들 (본인, 가족, 친구 등 여러 개 저장 가능)

```sql
CREATE TABLE user_saju (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,

  name VARCHAR(50),              -- 사주 주인 이름
  birth_date DATE NOT NULL,
  birth_time TIME,
  gender ENUM('M', 'F') NOT NULL,
  is_lunar BOOLEAN DEFAULT FALSE,

  -- 계산된 사주
  year_gan VARCHAR(2),
  year_ji VARCHAR(2),
  month_gan VARCHAR(2),
  month_ji VARCHAR(2),
  day_gan VARCHAR(2),
  day_ji VARCHAR(2),
  time_gan VARCHAR(2),
  time_ji VARCHAR(2),

  lunar_date VARCHAR(20),
  jeolgi VARCHAR(10),
  memo TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**용도:**
- users 테이블: 회원 본인 정보 (1인 1개)
- user_saju 테이블: 본인 + 가족/친구 사주 (1인 다수)

---

### 5. saju_history (조회 히스토리)
사용자의 사주 조회 내역을 추적합니다.

```sql
CREATE TABLE saju_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  user_saju_id INT,

  query_type ENUM('basic', 'yearly', 'monthly', 'daily', 'reunion', 'meeting') NOT NULL,
  query_date DATE,
  result_json JSON,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (user_saju_id) REFERENCES user_saju(id) ON DELETE SET NULL
);
```

---

### 6. saju_relations (신살 정보)
각 사주의 관계 및 신살 정보를 저장합니다.

```sql
CREATE TABLE saju_relations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_saju_id INT NOT NULL,

  banhap JSON,           -- 반합
  wonjin JSON,           -- 원진살
  cheonul_gwiin JSON,    -- 천을귀인
  taeeulsal JSON,        -- 태을살

  FOREIGN KEY (user_saju_id) REFERENCES user_saju(id) ON DELETE CASCADE
);
```

---

### 7. interpretation_template (해석 템플릿)
재회, 만남 등의 해석 템플릿을 저장합니다.

```sql
CREATE TABLE interpretation_template (
  id INT PRIMARY KEY AUTO_INCREMENT,
  template_type ENUM('reunion', 'meeting', 'monthly', 'yearly', 'daily'),

  conditions JSON,
  interpretation_text TEXT,
  advice TEXT,
  best_period VARCHAR(50),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 8. payments (결제 내역)
토스페이먼츠 결제 정보를 저장합니다.

```sql
CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,

  payment_key VARCHAR(255) UNIQUE,
  order_id VARCHAR(255) UNIQUE,
  amount INT NOT NULL,

  product_type ENUM('premium_month', 'premium_3month', 'premium_year', 'query_once') NOT NULL,
  product_name VARCHAR(100),

  status ENUM('ready', 'in_progress', 'done', 'canceled', 'failed') DEFAULT 'ready',
  payment_method VARCHAR(50),

  paid_at TIMESTAMP,
  canceled_at TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

### 9. user_favorites (즐겨찾기)
자주 보는 사주를 즐겨찾기로 저장합니다.

```sql
CREATE TABLE user_favorites (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  user_saju_id INT NOT NULL,

  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE KEY uk_user_saju (user_id, user_saju_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (user_saju_id) REFERENCES user_saju(id) ON DELETE CASCADE
);
```

---

### 10. push_tokens (푸시 알림)
FCM 푸시 알림 토큰을 저장합니다.

```sql
CREATE TABLE push_tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,

  device_token VARCHAR(255) NOT NULL,
  device_type ENUM('ios', 'android') NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,

  UNIQUE KEY uk_token (device_token),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

### 11. refresh_tokens (리프레시 토큰)
JWT 갱신을 위한 리프레시 토큰을 저장합니다.

```sql
CREATE TABLE refresh_tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,

  token VARCHAR(500) NOT NULL,
  expires_at DATETIME NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

### 12. daily_query_limit (무료 조회 제한)
무료 사용자의 일일 조회 횟수를 관리합니다.

```sql
CREATE TABLE daily_query_limit (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,

  query_date DATE NOT NULL,
  query_count INT DEFAULT 0,

  UNIQUE KEY uk_user_date (user_id, query_date),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**제한:**
- 무료 사용자: 하루 3회
- 프리미엄 사용자: 무제한

---

### 13. social_accounts (소셜 로그인)
카카오, 네이버, 구글, 애플 로그인을 연동합니다.

```sql
CREATE TABLE social_accounts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,

  provider ENUM('kakao', 'naver', 'google', 'apple') NOT NULL,
  provider_id VARCHAR(255) NOT NULL,

  UNIQUE KEY uk_provider (provider, provider_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

### 14. login_attempts (로그인 실패 기록)
로그인 실패를 추적하고 악용을 방지합니다.

```sql
CREATE TABLE login_attempts (
  id INT PRIMARY KEY AUTO_INCREMENT,

  identifier VARCHAR(255) NOT NULL,
  ip_address VARCHAR(45),
  attempt_count INT DEFAULT 1,
  locked_until DATETIME,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**보안:**
- 5회 실패 시 30분 계정 잠금

---

### 15. notices (공지사항)
앱 공지사항을 관리합니다.

```sql
CREATE TABLE notices (
  id INT PRIMARY KEY AUTO_INCREMENT,

  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  notice_type ENUM('general', 'update', 'maintenance', 'event') DEFAULT 'general',

  is_popup BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  start_date DATETIME,
  end_date DATETIME,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 16. faqs (자주 묻는 질문)
FAQ를 관리합니다.

```sql
CREATE TABLE faqs (
  id INT PRIMARY KEY AUTO_INCREMENT,

  category VARCHAR(50),
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,

  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 17. inquiries (1:1 문의)
사용자 문의를 관리합니다.

```sql
CREATE TABLE inquiries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,

  category VARCHAR(50),
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,

  answer TEXT,
  answered_at DATETIME,
  answered_by INT,

  status ENUM('pending', 'answered', 'closed') DEFAULT 'pending',

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

### 18. promo_codes (프로모션 코드)
쿠폰 및 프로모션 코드를 관리합니다.

```sql
CREATE TABLE promo_codes (
  id INT PRIMARY KEY AUTO_INCREMENT,

  code VARCHAR(50) UNIQUE NOT NULL,
  description VARCHAR(200),

  discount_type ENUM('free_trial', 'discount_percent', 'discount_amount', 'free_queries'),
  discount_value INT,

  max_uses INT,
  used_count INT DEFAULT 0,

  valid_from DATETIME,
  valid_until DATETIME,
  is_active BOOLEAN DEFAULT TRUE
);
```

**예시:**
- `WELCOME2024`: 첫 달 50% 할인
- `FREE10`: 무료 조회 10회

---

### 19. promo_code_usage (프로모션 사용 내역)
사용자별 프로모션 사용 내역을 추적합니다.

```sql
CREATE TABLE promo_code_usage (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  promo_code_id INT NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE KEY uk_user_promo (user_id, promo_code_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (promo_code_id) REFERENCES promo_codes(id) ON DELETE CASCADE
);
```

---

### 20. user_settings (앱 설정)
사용자별 앱 설정을 저장합니다.

```sql
CREATE TABLE user_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,

  push_enabled BOOLEAN DEFAULT TRUE,
  email_enabled BOOLEAN DEFAULT TRUE,

  language VARCHAR(10) DEFAULT 'ko',
  theme VARCHAR(20) DEFAULT 'light',

  UNIQUE KEY uk_user (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

### 21. deleted_users (탈퇴 사용자)
탈퇴한 사용자 정보를 30일간 보관합니다.

```sql
CREATE TABLE deleted_users (
  id INT PRIMARY KEY AUTO_INCREMENT,

  original_user_id INT,
  user_data JSON,

  deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  delete_scheduled_at DATETIME
);
```

**용도:**
- 실수로 탈퇴한 경우 복구
- 법적 요구사항 대응 (30일 유예)

---

### 22. admins (관리자)
앱 관리자 계정을 관리합니다.

```sql
CREATE TABLE admins (
  id INT PRIMARY KEY AUTO_INCREMENT,

  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(50) NOT NULL,

  role ENUM('super', 'admin', 'manager') DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE,

  last_login_at TIMESTAMP
);
```

**권한:**
- super: 모든 권한
- admin: 사용자 관리, 공지사항 등
- manager: 문의 답변, 통계 조회

---

## 🔗 테이블 관계도

```
users (회원)
  ├── user_saju (저장한 사주들)
  │     ├── saju_relations (신살 정보)
  │     └── user_favorites (즐겨찾기)
  ├── saju_history (조회 히스토리)
  ├── payments (결제 내역)
  ├── daily_query_limit (조회 제한)
  ├── refresh_tokens (인증 토큰)
  ├── social_accounts (소셜 로그인)
  ├── push_tokens (푸시 알림)
  ├── user_settings (앱 설정)
  ├── inquiries (문의)
  └── promo_code_usage (프로모션 사용)

manseruk (만세력 마스터)
time_column (시주 마스터)
interpretation_template (해석 템플릿)

notices (공지사항)
faqs (FAQ)
promo_codes (프로모션)
login_attempts (로그인 실패)
deleted_users (탈퇴 사용자)
admins (관리자)
```

---

## 🎯 주요 기능별 사용 테이블

### 회원가입/로그인
- users
- social_accounts
- login_attempts
- refresh_tokens

### 사주 조회
- users
- user_saju
- manseruk
- time_column
- saju_relations
- interpretation_template
- saju_history

### 무료/프리미엄 관리
- users (is_premium)
- daily_query_limit
- payments
- promo_codes
- promo_code_usage

### 사용자 경험
- user_favorites
- user_settings
- push_tokens

### 운영 관리
- notices
- faqs
- inquiries
- admins

---

## 📝 인덱스 최적화

모든 테이블에 적절한 인덱스가 설정되어 있습니다:

- **users**: email, phone, status, birth_date
- **manseruk**: solar_date (UNIQUE), lunar_date
- **time_column**: day_gan, (day_gan, time_range) UNIQUE
- **user_saju**: user_id, (birth_date, birth_time)
- **saju_history**: user_id, user_saju_id, created_at
- **payments**: user_id, payment_key, order_id, status
- **daily_query_limit**: (user_id, query_date) UNIQUE

---

## 🔒 보안 및 제약사항

### Foreign Key Cascade 설정
- **ON DELETE CASCADE**: users 삭제 시 관련 데이터 자동 삭제
  - user_saju, payments, inquiries 등

- **ON DELETE SET NULL**: 참조 데이터 삭제 시 NULL로 설정
  - saju_history의 user_saju_id

### UNIQUE 제약
- users: email, phone
- manseruk: solar_date
- time_column: (day_gan, time_range)
- payments: payment_key, order_id
- social_accounts: (provider, provider_id)
- user_favorites: (user_id, user_saju_id)

---

## 💾 저장 용량 예상

| 항목 | 예상 크기 |
|------|----------|
| manseruk (200년) | ~7MB |
| time_column | ~1KB |
| users (100만명) | ~200MB |
| user_saju (평균 3개/인) | ~600MB |
| saju_history (평균 50개/인) | ~2GB |
| payments | ~100MB |
| 기타 테이블 | ~500MB |
| **합계** | **~3.5GB** |

초기에는 1GB 미만, 사용자 증가 시 확장 필요

---

## 🚀 다음 단계

1. ✅ 스키마 정의 완료
2. 📝 schema.sql 파일 실행하여 테이블 생성
3. 📝 초기 데이터 삽입 (만세력, 시주, FAQ 등)
4. 📝 백엔드 API 구현
5. 📝 앱 UI 개발
