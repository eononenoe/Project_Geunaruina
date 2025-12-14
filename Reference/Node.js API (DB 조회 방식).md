// routes/saju.js
const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 사주 조회
router.post('/calculate', async (req, res) => {
  const { birthDate, birthTime, gender } = req.body;
  // birthDate: "1990-05-15"
  // birthTime: "14:30"
  
  try {
    // 1. 만세력 DB에서 조회
    const [rows] = await db.query(
      `SELECT * FROM manseruk WHERE solar_date = ?`,
      [birthDate]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: '데이터 없음' });
    }
    
    const manseruk = rows[0];
    
    // 2. 시주 계산
    const hour = parseInt(birthTime.split(':')[0]);
    const [timeRows] = await db.query(
      `SELECT * FROM time_column 
       WHERE day_gan = ? 
       AND time_range LIKE ?`,
      [manseruk.day_gan, `%${hour}:%`]
    );
    
    const timeColumn = timeRows[0];
    
    // 3. 반합, 원진 계산
    const banhap = calculateBanhap([
      manseruk.year_ji,
      manseruk.month_ji,
      manseruk.day_ji,
      timeColumn.time_ji
    ]);
    
    const wonjin = calculateWonjin(
      manseruk.day_ji,
      [manseruk.year_ji, manseruk.month_ji, timeColumn.time_ji]
    );
    
    // 4. 결과 반환
    res.json({
      사주: {
        년주: `${manseruk.year_gan}${manseruk.year_ji}`,
        월주: `${manseruk.month_gan}${manseruk.month_ji}`,
        일주: `${manseruk.day_gan}${manseruk.day_ji}`,
        시주: `${timeColumn.time_gan}${timeColumn.time_ji}`
      },
      음력: manseruk.lunar_date,
      절기: manseruk.jeolgi,
      반합: banhap,
      원진: wonjin
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 재회 사주 조회 (유료)
router.post('/reunion', async (req, res) => {
  const { userId, birthDate, birthTime, gender } = req.body;
  
  // 결제 확인
  const isPaid = await checkPayment(userId);
  if (!isPaid) {
    return res.status(403).json({ error: '결제 필요' });
  }
  
  // 사주 조회 (위와 동일)
  const saju = await getSaju(birthDate, birthTime);
  
  // 재회 해석 조회 (템플릿 DB)
  const [interpretation] = await db.query(
    `SELECT * FROM interpretation_template
     WHERE template_type = 'reunion'
     AND JSON_CONTAINS(conditions, ?)`,
    [JSON.stringify({ day_gan: saju.일주[0] })]
  );
  
  res.json({
    사주: saju,
    해석: interpretation[0].interpretation_text,
    조언: interpretation[0].advice,
    좋은시기: interpretation[0].best_period
  });
});

module.exports = router;