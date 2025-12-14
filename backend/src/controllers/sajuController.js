const axios = require('axios');

const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:5000';

/**
 * 사주 계산 컨트롤러
 */
exports.calculateSaju = async (req, res) => {
  try {
    const { year, month, day, hour, minute, is_lunar, gender } = req.body;

    // 필수 필드 검증
    if (!year || !month || !day) {
      return res.status(400).json({
        success: false,
        error: '생년월일은 필수 입력 항목입니다.'
      });
    }

    // Python Flask 서비스 호출
    const response = await axios.post(`${PYTHON_SERVICE_URL}/api/saju/calculate`, {
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      hour: parseInt(hour) || 0,
      minute: parseInt(minute) || 0,
      is_lunar: is_lunar || false,
      gender: gender || 'M'
    });

    if (response.data.success) {
      return res.status(200).json({
        success: true,
        message: '사주 계산이 완료되었습니다.',
        data: response.data.data
      });
    } else {
      return res.status(500).json({
        success: false,
        error: response.data.error || '사주 계산에 실패했습니다.'
      });
    }

  } catch (error) {
    console.error('Error in calculateSaju:', error.message);

    if (error.response) {
      // Python 서비스에서 에러 응답
      return res.status(error.response.status).json({
        success: false,
        error: error.response.data.error || '사주 계산 중 오류가 발생했습니다.'
      });
    } else if (error.request) {
      // Python 서비스에 연결할 수 없음
      return res.status(503).json({
        success: false,
        error: 'Python 사주 계산 서비스에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.'
      });
    } else {
      return res.status(500).json({
        success: false,
        error: '서버 오류가 발생했습니다.'
      });
    }
  }
};

/**
 * Python 서비스 상태 확인
 */
exports.checkPythonService = async (req, res) => {
  try {
    const response = await axios.get(`${PYTHON_SERVICE_URL}/health`);

    return res.status(200).json({
      success: true,
      message: 'Python 서비스가 정상 작동 중입니다.',
      data: response.data
    });
  } catch (error) {
    return res.status(503).json({
      success: false,
      error: 'Python 서비스에 연결할 수 없습니다.'
    });
  }
};
