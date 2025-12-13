# saju_calculator.py
from datetime import datetime, timedelta
from korean_lunar_calendar import KoreanLunarCalendar
import mysql.connector

# 천간, 지지
CHEONGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
JIJI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

# 절기 데이터 (간략화 - 실제론 천문연 데이터 사용)
JEOLGI = {
    '입춘': (2, 4), '경칩': (3, 6), '청명': (4, 5),
    '입하': (5, 6), '망종': (6, 6), '소서': (7, 7),
    '입추': (8, 8), '백로': (9, 8), '한로': (10, 8),
    '입동': (11, 7), '대설': (12, 7), '소한': (1, 6)
}

def calculate_year_column(year):
    """년주 계산 (입춘 기준)"""
    # 갑자년: 1984, 2044...
    base_year = 1984
    offset = (year - base_year) % 60
    gan = CHEONGAN[offset % 10]
    ji = JIJI[offset % 12]
    return gan, ji

def calculate_month_column(year, month, day):
    """월주 계산 (절입 기준)"""
    # 절기 확인 후 월주 결정
    # 실제론 천문연 절기 데이터 활용
    month_index = get_month_by_jeolgi(year, month, day)
    
    # 년간에 따른 월간 계산 (공식 있음)
    year_gan_index = calculate_year_column(year)[0]
    month_gan_index = (year_gan_index * 2 + month_index) % 10
    
    gan = CHEONGAN[month_gan_index]
    ji = JIJI[month_index % 12]
    return gan, ji

def calculate_day_column(date):
    """일주 계산"""
    # 기준일(갑자일) 부터 일수 계산
    base_date = datetime(1984, 2, 2)  # 갑자일
    days_diff = (date - base_date).days
    
    gan_index = days_diff % 10
    ji_index = days_diff % 12
    
    return CHEONGAN[gan_index], JIJI[ji_index]

def calculate_time_column(day_gan, hour):
    """시주 계산 (자시 23:00 기준)"""
    # 시간을 시지로 변환
    if hour >= 23 or hour < 1:
        time_ji_index = 0  # 子時
    else:
        time_ji_index = (hour + 1) // 2
    
    # 일간에 따른 시간 계산 (공식 있음)
    day_gan_index = CHEONGAN.index(day_gan)
    time_gan_index = (day_gan_index * 2 + time_ji_index) % 10
    
    return CHEONGAN[time_gan_index], JIJI[time_ji_index]

def calculate_banhap(year_ji, month_ji, day_ji, time_ji):
    """반합 관계 계산"""
    jijis = [year_ji, month_ji, day_ji, time_ji]
    banhap_list = []
    
    # 반합 조합
    BANHAP = {
        ('寅', '午'): '인오반합',
        ('午', '戌'): '오술반합',
        ('申', '子'): '신자반합',
        ('子', '辰'): '자진반합',
        ('巳', '酉'): '사유반합',
        ('酉', '丑'): '유축반합',
        ('亥', '卯'): '해묘반합',
        ('卯', '未'): '묘미반합'
    }
    
    for i, ji1 in enumerate(jijis):
        for ji2 in jijis[i+1:]:
            key = tuple(sorted([ji1, ji2]))
            if key in BANHAP:
                banhap_list.append(BANHAP[key])
    
    return banhap_list

def calculate_wonjin(day_ji, other_jis):
    """원진살 계산"""
    WONJIN = {
        '子': '未', '丑': '午', '寅': '巳', '卯': '辰',
        '辰': '卯', '巳': '寅', '午': '丑', '未': '子',
        '申': '亥', '酉': '戌', '戌': '酉', '亥': '申'
    }
    
    wonjin_ji = WONJIN.get(day_ji)
    if wonjin_ji in other_jis:
        return [f"{day_ji}{wonjin_ji} 원진"]
    return []

def generate_manseruk_data(start_year, end_year):
    """만세력 데이터 생성 (DB에 삽입할 데이터)"""
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="password",
        database="saju_app"
    )
    cursor = db.cursor()
    
    start_date = datetime(start_year, 1, 1)
    end_date = datetime(end_year, 12, 31)
    
    current_date = start_date
    while current_date <= end_date:
        # 음력 변환
        calendar = KoreanLunarCalendar()
        calendar.setSolarDate(
            current_date.year,
            current_date.month,
            current_date.day
        )
        lunar = calendar.getLunarDate()
        
        # 사주 계산
        year_gan, year_ji = calculate_year_column(current_date.year)
        month_gan, month_ji = calculate_month_column(
            current_date.year,
            current_date.month,
            current_date.day
        )
        day_gan, day_ji = calculate_day_column(current_date)
        
        # 절기 확인
        jeolgi, jeolgi_date = get_jeolgi(current_date)
        
        # DB 삽입
        sql = """
        INSERT INTO manseruk 
        (solar_date, lunar_date, year_gan, year_ji, 
         month_gan, month_ji, day_gan, day_ji, 
         jeolgi, jeolgi_date)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        cursor.execute(sql, (
            current_date.date(),
            f"{lunar[0]}-{lunar[1]:02d}-{lunar[2]:02d}",
            year_gan, year_ji,
            month_gan, month_ji,
            day_gan, day_ji,
            jeolgi, jeolgi_date
        ))
        
        current_date += timedelta(days=1)
    
    db.commit()
    cursor.close()
    db.close()

# 실행
if __name__ == "__main__":
    # 1900년~2100년 만세력 데이터 생성
    generate_manseruk_data(1900, 2100)
    print("만세력 데이터 생성 완료!")