from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
PORT = int(os.getenv('PORT', 5000))

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'OK', 'message': 'Python Flask service is running'}), 200

@app.route('/api/saju/calculate', methods=['POST'])
def calculate_saju():
    """
    사주 계산 엔드포인트
    Request body: {
        "year": 1990,
        "month": 1,
        "day": 15,
        "hour": 14,
        "minute": 30,
        "is_lunar": false,
        "gender": "M"
    }
    """
    try:
        data = request.get_json()

        # TODO: 사주 계산 로직 구현
        # from modules.saju_calculator import SajuCalculator
        # calculator = SajuCalculator()
        # result = calculator.calculate(data)

        return jsonify({
            'success': True,
            'message': '사주 계산 기능은 구현 예정입니다',
            'data': data
        }), 200

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    print(f'Starting Flask server on port {PORT}...')
    app.run(host='0.0.0.0', port=PORT, debug=True)
