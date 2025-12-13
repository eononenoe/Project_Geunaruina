-- 사주 앱 데이터베이스 스키마
-- MySQL/MariaDB

-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS saju_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE saju_db;

-- ============================================
-- 1. 사용자 관리 테이블
-- ============================================

-- 사용자 기본 정보
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,

  -- 로그인 정보
  email VARCHAR(255) UNIQUE,                 -- 이메일 (로그인용, 선택)
  phone VARCHAR(20) UNIQUE,                  -- 전화번호 (로그인용, 선택)
  password_hash VARCHAR(255) NOT NULL,       -- 비밀번호 해시

  -- 기본 정보 (회원가입 시 필수)
  name VARCHAR(50) NOT NULL,                 -- 이름
  nickname VARCHAR(50),                      -- 닉네임 (선택)
  birth_date DATE NOT NULL,                  -- 생년월일
  birth_time TIME,                           -- 태어난 시간
  gender ENUM('M', 'F') NOT NULL,            -- 성별
  is_lunar BOOLEAN DEFAULT FALSE,            -- 음력 여부

  -- 계정 상태
  status ENUM('active', 'inactive', 'deleted') DEFAULT 'active',

  -- 프리미엄 여부
  is_premium BOOLEAN DEFAULT FALSE,
  premium_expire_at DATETIME,                -- 프리미엄 만료일

  -- 타임스탬프
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP,

  INDEX idx_email (email),
  INDEX idx_phone (phone),
  INDEX idx_status (status),
  INDEX idx_birth (birth_date)
) ENGINE=InnoDB;

-- ============================================
-- 2. 만세력 마스터 데이터 (미리 계산해서 넣어둠)
-- ============================================

CREATE TABLE manseruk (
  id INT PRIMARY KEY AUTO_INCREMENT,
  solar_date DATE NOT NULL,              -- 양력 날짜
  lunar_date VARCHAR(20),                -- 음력 날짜 (예: 2023-01-15)
  year_gan VARCHAR(2),                   -- 년주 천간 (甲乙丙...)
  year_ji VARCHAR(2),                    -- 년주 地支 (子丑寅...)
  month_gan VARCHAR(2),                  -- 월주 천간
  month_ji VARCHAR(2),                   -- 월주 地支
  day_gan VARCHAR(2),                    -- 일주 천간
  day_ji VARCHAR(2),                     -- 일주 地支
  jeolgi VARCHAR(10),                    -- 해당 절기 (입춘, 경칩...)
  jeolgi_date DATE,                      -- 절기 입절일

  UNIQUE KEY uk_solar_date (solar_date),
  INDEX idx_lunar (lunar_date)
) ENGINE=InnoDB;

-- ============================================
-- 3. 시주 데이터 (시간별)
-- ============================================

CREATE TABLE time_column (
  id INT PRIMARY KEY AUTO_INCREMENT,
  day_gan VARCHAR(2),                    -- 일간 (甲乙丙...)
  time_range VARCHAR(10),                -- 시간대 (23:00-01:00)
  time_gan VARCHAR(2),                   -- 시주 천간
  time_ji VARCHAR(2),                    -- 시주 地支 (子丑寅...)

  INDEX idx_day_gan (day_gan),
  UNIQUE KEY uk_day_time (day_gan, time_range)
) ENGINE=InnoDB;

-- ============================================
-- 4. 사용자별 사주 정보 (사용자가 조회한 사주)
-- ============================================

CREATE TABLE user_saju (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,

  -- 기본 정보
  name VARCHAR(50),                      -- 사주 주인 이름 (별칭)
  birth_date DATE NOT NULL,              -- 생년월일 (양력)
  birth_time TIME,                       -- 태어난 시간
  gender ENUM('M', 'F') NOT NULL,
  is_lunar BOOLEAN DEFAULT FALSE,        -- 음력 여부

  -- 사주 (미리 조회해서 저장)
  year_gan VARCHAR(2),
  year_ji VARCHAR(2),
  month_gan VARCHAR(2),
  month_ji VARCHAR(2),
  day_gan VARCHAR(2),
  day_ji VARCHAR(2),
  time_gan VARCHAR(2),
  time_ji VARCHAR(2),

  -- 추가 정보
  lunar_date VARCHAR(20),
  jeolgi VARCHAR(10),

  -- 메모
  memo TEXT,                             -- 사용자 메모

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_user (user_id),
  INDEX idx_birth (birth_date, birth_time),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- 5. 사주 조회 히스토리
-- ============================================

CREATE TABLE saju_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  user_saju_id INT,                      -- user_saju와 연결 (저장된 사주라면)

  -- 조회 정보
  query_type ENUM('basic', 'yearly', 'monthly', 'daily', 'reunion', 'meeting') NOT NULL,
  query_date DATE,                       -- 조회한 날짜 (월운, 일운 등)

  -- 결과 캐싱 (선택)
  result_json JSON,                      -- 조회 결과를 JSON으로 저장

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_user (user_id),
  INDEX idx_user_saju (user_saju_id),
  INDEX idx_created (created_at),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (user_saju_id) REFERENCES user_saju(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================
-- 6. 관계 및 신살 정보
-- ============================================

CREATE TABLE saju_relations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_saju_id INT NOT NULL,

  -- 반합 관계
  banhap JSON,                           -- 예: ["인묘진", "사오미"]

  -- 원진살
  wonjin JSON,                           -- 예: ["자미", "축오"]

  -- 기타 신살
  cheonul_gwiin JSON,                    -- 천을귀인
  taeeulsal JSON,                        -- 태을살

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_saju_id) REFERENCES user_saju(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- 7. 재회/만남 해석 템플릿
-- ============================================

CREATE TABLE interpretation_template (
  id INT PRIMARY KEY AUTO_INCREMENT,
  template_type ENUM('reunion', 'meeting', 'monthly', 'yearly', 'daily'),

  -- 조건들 (JSON으로 유연하게)
  conditions JSON,                       -- 예: {"day_gan": "甲", "month_ji": "子"}

  interpretation_text TEXT,              -- 해석 내용
  advice TEXT,                           -- 조언
  best_period VARCHAR(50),               -- 좋은 시기

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================
-- 8. 결제 내역
-- ============================================

CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,

  -- 결제 정보
  payment_key VARCHAR(255) UNIQUE,       -- 토스페이먼츠 결제 키
  order_id VARCHAR(255) UNIQUE,          -- 주문 번호
  amount INT NOT NULL,                   -- 결제 금액

  -- 상품 정보
  product_type ENUM('premium_month', 'premium_3month', 'premium_year', 'query_once') NOT NULL,
  product_name VARCHAR(100),

  -- 결제 상태
  status ENUM('ready', 'in_progress', 'done', 'canceled', 'failed') DEFAULT 'ready',

  -- 결제 방법
  payment_method VARCHAR(50),            -- 카드, 계좌이체 등

  -- 결제 시간
  paid_at TIMESTAMP,
  canceled_at TIMESTAMP,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_user (user_id),
  INDEX idx_payment_key (payment_key),
  INDEX idx_order_id (order_id),
  INDEX idx_status (status),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- 9. 사용자 저장 목록 (즐겨찾기)
-- ============================================

CREATE TABLE user_favorites (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  user_saju_id INT NOT NULL,

  -- 즐겨찾기 순서
  sort_order INT DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_user (user_id),
  UNIQUE KEY uk_user_saju (user_id, user_saju_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (user_saju_id) REFERENCES user_saju(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- 10. 푸시 알림 토큰 (FCM)
-- ============================================

CREATE TABLE push_tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,

  device_token VARCHAR(255) NOT NULL,    -- FCM 토큰
  device_type ENUM('ios', 'android') NOT NULL,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_user (user_id),
  UNIQUE KEY uk_token (device_token),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- 11. 리프레시 토큰 (JWT 갱신용)
-- ============================================

CREATE TABLE refresh_tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,

  token VARCHAR(500) NOT NULL,           -- 리프레시 토큰
  expires_at DATETIME NOT NULL,          -- 만료 시간

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_user (user_id),
  INDEX idx_token (token(255)),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- 12. 무료 조회 횟수 관리
-- ============================================

CREATE TABLE daily_query_limit (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,

  query_date DATE NOT NULL,              -- 조회 날짜
  query_count INT DEFAULT 0,             -- 당일 조회 횟수

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uk_user_date (user_id, query_date),
  INDEX idx_user (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- 13. 소셜 로그인 연동
-- ============================================

CREATE TABLE social_accounts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,

  provider ENUM('kakao', 'naver', 'google', 'apple') NOT NULL,
  provider_id VARCHAR(255) NOT NULL,     -- 소셜 로그인 업체에서 제공하는 ID

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE KEY uk_provider (provider, provider_id),
  INDEX idx_user (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- 14. 로그인 실패 기록 (보안)
-- ============================================

CREATE TABLE login_attempts (
  id INT PRIMARY KEY AUTO_INCREMENT,

  identifier VARCHAR(255) NOT NULL,      -- 이메일 또는 전화번호
  ip_address VARCHAR(45),                -- IP 주소
  attempt_count INT DEFAULT 1,
  locked_until DATETIME,                 -- 계정 잠금 시간

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_identifier (identifier),
  INDEX idx_ip (ip_address)
) ENGINE=InnoDB;

-- ============================================
-- 15. 공지사항
-- ============================================

CREATE TABLE notices (
  id INT PRIMARY KEY AUTO_INCREMENT,

  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  notice_type ENUM('general', 'update', 'maintenance', 'event') DEFAULT 'general',

  is_popup BOOLEAN DEFAULT FALSE,        -- 팝업으로 띄울지 여부
  is_active BOOLEAN DEFAULT TRUE,

  start_date DATETIME,                   -- 게시 시작일
  end_date DATETIME,                     -- 게시 종료일

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_active (is_active),
  INDEX idx_dates (start_date, end_date)
) ENGINE=InnoDB;

-- ============================================
-- 16. FAQ (자주 묻는 질문)
-- ============================================

CREATE TABLE faqs (
  id INT PRIMARY KEY AUTO_INCREMENT,

  category VARCHAR(50),                  -- 카테고리 (사용법, 결제, 기타 등)
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,

  sort_order INT DEFAULT 0,              -- 정렬 순서
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_category (category),
  INDEX idx_active (is_active)
) ENGINE=InnoDB;

-- ============================================
-- 17. 사용자 문의
-- ============================================

CREATE TABLE inquiries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,

  category VARCHAR(50),                  -- 문의 유형
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,

  -- 답변
  answer TEXT,
  answered_at DATETIME,
  answered_by INT,                       -- 관리자 ID

  status ENUM('pending', 'answered', 'closed') DEFAULT 'pending',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_user (user_id),
  INDEX idx_status (status),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- 18. 프로모션 코드 / 쿠폰
-- ============================================

CREATE TABLE promo_codes (
  id INT PRIMARY KEY AUTO_INCREMENT,

  code VARCHAR(50) UNIQUE NOT NULL,      -- 프로모션 코드
  description VARCHAR(200),

  -- 혜택
  discount_type ENUM('free_trial', 'discount_percent', 'discount_amount', 'free_queries'),
  discount_value INT,                    -- 할인율(%) 또는 금액, 무료 조회 횟수

  -- 사용 제한
  max_uses INT,                          -- 최대 사용 횟수 (NULL이면 무제한)
  used_count INT DEFAULT 0,              -- 사용된 횟수

  -- 유효 기간
  valid_from DATETIME,
  valid_until DATETIME,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_code (code),
  INDEX idx_active (is_active)
) ENGINE=InnoDB;

-- ============================================
-- 19. 프로모션 코드 사용 내역
-- ============================================

CREATE TABLE promo_code_usage (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  promo_code_id INT NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE KEY uk_user_promo (user_id, promo_code_id),
  INDEX idx_user (user_id),
  INDEX idx_promo (promo_code_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (promo_code_id) REFERENCES promo_codes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- 20. 앱 설정 (사용자별)
-- ============================================

CREATE TABLE user_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,

  -- 알림 설정
  push_enabled BOOLEAN DEFAULT TRUE,
  email_enabled BOOLEAN DEFAULT TRUE,

  -- 기타 설정
  language VARCHAR(10) DEFAULT 'ko',     -- 언어 설정
  theme VARCHAR(20) DEFAULT 'light',     -- 테마 (light/dark)

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uk_user (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- 21. 탈퇴 사용자 보관 (복구 대비)
-- ============================================

CREATE TABLE deleted_users (
  id INT PRIMARY KEY AUTO_INCREMENT,

  original_user_id INT,                  -- 원래 users 테이블의 ID
  user_data JSON,                        -- 사용자 데이터 백업 (JSON)

  deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  delete_scheduled_at DATETIME,          -- 완전 삭제 예정일 (30일 후 등)

  INDEX idx_deleted (deleted_at),
  INDEX idx_scheduled (delete_scheduled_at)
) ENGINE=InnoDB;

-- ============================================
-- 22. 관리자 계정
-- ============================================

CREATE TABLE admins (
  id INT PRIMARY KEY AUTO_INCREMENT,

  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(50) NOT NULL,

  role ENUM('super', 'admin', 'manager') DEFAULT 'admin',

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP,

  INDEX idx_username (username),
  INDEX idx_active (is_active)
) ENGINE=InnoDB;
