//医生路由
const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
// 只导入auth中间件
const auth = require('../middlewares/auth');

// 在本文件内实现authorizeRoles函数
// 用于校验用户角色
function authorizeRoles(role) {
  return (req, res, next) => {
    // req.user 是auth中间件解码后挂载的
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: '无权限访问' });
    }
    next();
  };
}

// 排班管理
router.get('/:doctorId/schedule', auth('doctor'), authorizeRoles('doctor'), doctorController.getSchedule);
router.post('/:doctorId/schedule', auth('doctor'), authorizeRoles('doctor'), doctorController.addSchedule);

// 患者管理
router.get('/:doctorId/patients', auth('doctor'), authorizeRoles('doctor'), doctorController.getPatients);
router.get('/patients/:patientId/profile', auth('doctor'), authorizeRoles('doctor'), doctorController.getPatientProfile);

module.exports = router;