// 引入文件上传中间件
const upload = require('../middlewares/upload');

//患者路由
const router = require('express').Router();
const patientController = require('../controllers/patientController');
const auth = require('../middlewares/auth')('patient');
const validator = require('../utils/validator');

// 血糖数据接口
router.post('/:patientId/glucose', 
  auth,
  validator.validateGlucose,
  patientController.submitGlucose
);

router.get('/:patientId/glucose/trend',
  auth,
  patientController.getGlucoseTrend
);

// 伤口记录接口
router.post('/:patientId/wounds', 
  auth,
  upload.array('images', 3),
  patientController.createWoundRecord
);

module.exports = router;