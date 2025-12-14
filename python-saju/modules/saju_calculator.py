# 사주 계산 모듈
# 천간, 지지, 오행 등의 사주 계산 로직

from datetime import datetime
from .db_connector import DatabaseConnector

class SajuCalculator:
    """사주 계산을 위한 클래스"""

    def __init__(self):
        # 천간 (Heavenly Stems) - 한자
        self.cheongan_hanja = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
        # 천간 - 한글
        self.cheongan_hangul = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계']

        # 지지 (Earthly Branches) - 한자
        self.jiji_hanja = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
        # 지지 - 한글
        self.jiji_hangul = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해']

        # 오행
        self.five_elements = {
            '甲': '목', '乙': '목',
            '丙': '화', '丁': '화',
            '戊': '토', '己': '토',
            '庚': '금', '辛': '금',
            '壬': '수', '癸': '수'
        }

        # DB 커넥터
        self.db = DatabaseConnector()

    def hanja_to_hangul(self, hanja, is_gan=True):
        """한자를 한글로 변환"""
        if is_gan:
            try:
                idx = self.cheongan_hanja.index(hanja)
                return self.cheongan_hangul[idx]
            except ValueError:
                return hanja
        else:
            try:
                idx = self.jiji_hanja.index(hanja)
                return self.jiji_hangul[idx]
            except ValueError:
                return hanja

    def get_time_pillar(self, day_gan, hour):
        """시주 계산 - time_column 테이블에서 조회"""
        # 시간대 변환
        time_ranges = [
            (23, 1, '23:00-01:00'),
            (1, 3, '01:00-03:00'),
            (3, 5, '03:00-05:00'),
            (5, 7, '05:00-07:00'),
            (7, 9, '07:00-09:00'),
            (9, 11, '09:00-11:00'),
            (11, 13, '11:00-13:00'),
            (13, 15, '13:00-15:00'),
            (15, 17, '15:00-17:00'),
            (17, 19, '17:00-19:00'),
            (19, 21, '19:00-21:00'),
            (21, 23, '21:00-23:00')
        ]

        time_range = None
        for start, end, range_str in time_ranges:
            if start <= hour < end or (start == 23 and (hour >= 23 or hour < 1)):
                time_range = range_str
                break

        if not time_range:
            time_range = '23:00-01:00'

        # DB에서 조회
        query = """
        SELECT time_gan, time_ji
        FROM time_column
        WHERE day_gan = %s AND time_range = %s
        LIMIT 1
        """
        result = self.db.execute_one(query, (day_gan, time_range))

        if result:
            return {
                'gan': result['time_gan'],
                'ji': result['time_ji'],
                'gan_hangul': self.hanja_to_hangul(result['time_gan'], True),
                'ji_hangul': self.hanja_to_hangul(result['time_ji'], False)
            }
        return None

    def calculate(self, birth_data):
        """
        생년월일시로부터 사주 계산

        Args:
            birth_data (dict): 생년월일시 정보
            {
                'year': 1990,
                'month': 1,
                'day': 15,
                'hour': 14,
                'minute': 30,
                'is_lunar': False,
                'gender': 'M'
            }

        Returns:
            dict: 사주 계산 결과
        """

        year = birth_data.get('year')
        month = birth_data.get('month')
        day = birth_data.get('day')
        hour = birth_data.get('hour', 0)
        is_lunar = birth_data.get('is_lunar', False)

        # 양력 날짜 생성
        if is_lunar:
            # TODO: 음력을 양력으로 변환 (korean-lunar-calendar 라이브러리 사용)
            # 현재는 간단히 그대로 사용
            solar_date = f"{year}-{month:02d}-{day:02d}"
        else:
            solar_date = f"{year}-{month:02d}-{day:02d}"

        # 만세력에서 년주, 월주, 일주 조회
        query = """
        SELECT solar_date, lunar_date,
               year_gan, year_ji, month_gan, month_ji,
               day_gan, day_ji, jeolgi, jeolgi_date
        FROM manseruk
        WHERE solar_date = %s
        LIMIT 1
        """

        manseruk_data = self.db.execute_one(query, (solar_date,))

        if not manseruk_data:
            raise ValueError(f"해당 날짜의 만세력 데이터를 찾을 수 없습니다: {solar_date}")

        # 시주 계산
        time_pillar = self.get_time_pillar(manseruk_data['day_gan'], hour)

        # 결과 조합
        result = {
            'birth_info': {
                'solar_date': solar_date,
                'lunar_date': manseruk_data['lunar_date'],
                'is_lunar': is_lunar,
                'time': f"{hour:02d}:{birth_data.get('minute', 0):02d}",
                'gender': birth_data.get('gender', 'M')
            },
            'pillars': {
                'year': {
                    'gan': manseruk_data['year_gan'],
                    'ji': manseruk_data['year_ji'],
                    'gan_hangul': self.hanja_to_hangul(manseruk_data['year_gan'], True),
                    'ji_hangul': self.hanja_to_hangul(manseruk_data['year_ji'], False),
                    'combined': f"{manseruk_data['year_gan']}{manseruk_data['year_ji']}",
                    'combined_hangul': f"{self.hanja_to_hangul(manseruk_data['year_gan'], True)}{self.hanja_to_hangul(manseruk_data['year_ji'], False)}"
                },
                'month': {
                    'gan': manseruk_data['month_gan'],
                    'ji': manseruk_data['month_ji'],
                    'gan_hangul': self.hanja_to_hangul(manseruk_data['month_gan'], True),
                    'ji_hangul': self.hanja_to_hangul(manseruk_data['month_ji'], False),
                    'combined': f"{manseruk_data['month_gan']}{manseruk_data['month_ji']}",
                    'combined_hangul': f"{self.hanja_to_hangul(manseruk_data['month_gan'], True)}{self.hanja_to_hangul(manseruk_data['month_ji'], False)}"
                },
                'day': {
                    'gan': manseruk_data['day_gan'],
                    'ji': manseruk_data['day_ji'],
                    'gan_hangul': self.hanja_to_hangul(manseruk_data['day_gan'], True),
                    'ji_hangul': self.hanja_to_hangul(manseruk_data['day_ji'], False),
                    'combined': f"{manseruk_data['day_gan']}{manseruk_data['day_ji']}",
                    'combined_hangul': f"{self.hanja_to_hangul(manseruk_data['day_gan'], True)}{self.hanja_to_hangul(manseruk_data['day_ji'], False)}"
                },
                'time': time_pillar if time_pillar else {
                    'gan': '-',
                    'ji': '-',
                    'gan_hangul': '-',
                    'ji_hangul': '-',
                    'combined': '-',
                    'combined_hangul': '-'
                }
            },
            'additional': {
                'jeolgi': manseruk_data.get('jeolgi'),
                'jeolgi_date': str(manseruk_data.get('jeolgi_date'))
            }
        }

        # 시주 combined 추가
        if time_pillar:
            result['pillars']['time']['combined'] = f"{time_pillar['gan']}{time_pillar['ji']}"
            result['pillars']['time']['combined_hangul'] = f"{time_pillar['gan_hangul']}{time_pillar['ji_hangul']}"

        return result
