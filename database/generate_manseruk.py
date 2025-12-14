"""
만세력 데이터 생성 스크립트
1900년 ~ 2100년까지의 만세력 데이터를 생성합니다.
"""

from datetime import datetime, timedelta

# 천간 (10개)
CHEONGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

# 지지 (12개)
JIJI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

# 월지 (절기 기준)
MONTH_JI = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑']

# 24절기 (간략화 - 실제로는 정확한 계산 필요)
JEOLGI = [
    '입춘', '우수', '경칩', '춘분', '청명', '곡우',
    '입하', '소만', '망종', '하지', '소서', '대서',
    '입추', '처서', '백로', '추분', '한로', '상강',
    '입동', '소설', '대설', '동지', '소한', '대한'
]

def get_year_gan_ji(year):
    """년주 천간지지 계산 (기준년: 1984년 甲子)"""
    base_year = 1984  # 甲子년
    offset = (year - base_year) % 60
    gan = CHEONGAN[offset % 10]
    ji = JIJI[offset % 12]
    return gan, ji

def get_month_gan_ji(year, month):
    """월주 천간지지 계산"""
    # 월지는 입춘부터 시작 (1월=인월, 2월=묘월...)
    # 실제로는 절기 기준이지만 간략화
    year_gan_idx = CHEONGAN.index(get_year_gan_ji(year)[0])

    # 월간 계산 (년간에 따라 달라짐)
    # 甲己년: 丙寅월부터, 乙庚년: 戊寅월부터...
    month_gan_start = {
        0: 2, 5: 2,  # 甲, 己 -> 丙
        1: 4, 6: 4,  # 乙, 庚 -> 戊
        2: 6, 7: 6,  # 丙, 辛 -> 庚
        3: 8, 8: 8,  # 丁, 壬 -> 壬
        4: 0, 9: 0,  # 戊, 癸 -> 甲
    }

    start_idx = month_gan_start[year_gan_idx]
    month_gan_idx = (start_idx + month - 1) % 10
    month_gan = CHEONGAN[month_gan_idx]
    month_ji = MONTH_JI[month - 1]

    return month_gan, month_ji

def get_day_gan_ji(date):
    """일주 천간지지 계산 (기준일: 2000-01-01 = 庚辰)"""
    base_date = datetime(2000, 1, 1)  # 庚辰일
    base_gan_idx = 6  # 庚
    base_ji_idx = 4   # 辰

    delta = (date - base_date).days
    gan_idx = (base_gan_idx + delta) % 10
    ji_idx = (base_ji_idx + delta) % 12

    return CHEONGAN[gan_idx], JIJI[ji_idx]

def get_jeolgi_for_month(month):
    """월별 절기 반환 (간략화)"""
    # 실제로는 정확한 계산 필요
    jeolgi_idx = (month - 1) * 2
    return JEOLGI[jeolgi_idx]

def generate_manseruk_sql(start_year=1900, end_year=2100):
    """만세력 SQL INSERT 문 생성"""

    output_file = 'manseruk_data.sql'

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("-- 만세력 데이터 (1900-2100)\n")
        f.write("-- 자동 생성된 파일\n\n")
        f.write("USE saju_db;\n\n")
        f.write("-- 만세력 데이터 삽입\n")
        f.write("INSERT INTO manseruk (solar_date, lunar_date, year_gan, year_ji, month_gan, month_ji, day_gan, day_ji, jeolgi, jeolgi_date) VALUES\n")

        values = []
        current_date = datetime(start_year, 1, 1)
        end_date = datetime(end_year, 12, 31)

        count = 0
        while current_date <= end_date:
            year = current_date.year
            month = current_date.month

            # 년주
            year_gan, year_ji = get_year_gan_ji(year)

            # 월주
            month_gan, month_ji = get_month_gan_ji(year, month)

            # 일주
            day_gan, day_ji = get_day_gan_ji(current_date)

            # 절기 (간략화)
            jeolgi = get_jeolgi_for_month(month)
            jeolgi_date = current_date.replace(day=min(6, 28))  # 임시

            # 음력 (임시 - 실제로는 변환 라이브러리 필요)
            lunar_date = f"{year}-{month:02d}-{current_date.day:02d}"

            # SQL 값
            value = f"('{current_date.strftime('%Y-%m-%d')}', '{lunar_date}', '{year_gan}', '{year_ji}', '{month_gan}', '{month_ji}', '{day_gan}', '{day_ji}', '{jeolgi}', '{jeolgi_date.strftime('%Y-%m-%d')}')"
            values.append(value)

            count += 1
            if count % 1000 == 0:
                print(f"처리 중... {count}개 레코드 생성됨")

            current_date += timedelta(days=1)

        # SQL 파일에 쓰기 (1000개씩 묶어서)
        for i in range(0, len(values), 1000):
            chunk = values[i:i+1000]
            f.write(',\n'.join(chunk))
            if i + 1000 < len(values):
                f.write(';\n\nINSERT INTO manseruk (solar_date, lunar_date, year_gan, year_ji, month_gan, month_ji, day_gan, day_ji, jeolgi, jeolgi_date) VALUES\n')
            else:
                f.write(';\n')

        print(f"\n완료! {output_file}에 {count}개의 레코드가 생성되었습니다.")

if __name__ == "__main__":
    print("만세력 데이터 생성 시작...")
    generate_manseruk_sql(1900, 2100)
    print("완료!")
