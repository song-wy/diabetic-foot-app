//数据校验工具
const { body } = require('express-validator');

module.exports = {
  validateGlucose: [
    body('value').isFloat({ min: 2.2, max: 33.3 })
      .withMessage('血糖值必须在2.2-33.3mmol/L之间'),
    body('mealType').isIn(['fasting', 'postprandial', 'random'])
      .withMessage('无效的餐食类型')
  ],

  validateAppointment: [
    body('doctorId').isInt(),
    body('appointmentTime').isISO8601(),
    body('symptoms').optional().isString()
  ]
};