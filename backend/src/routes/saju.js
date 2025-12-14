const express = require('express');
const router = express.Router();
const sajuController = require('../controllers/sajuController');

/**
 * POST /api/saju/calculate
 * 사주 계산
 */
router.post('/calculate', sajuController.calculateSaju);

/**
 * GET /api/saju/health
 * Python 서비스 상태 확인
 */
router.get('/health', sajuController.checkPythonService);

module.exports = router;
