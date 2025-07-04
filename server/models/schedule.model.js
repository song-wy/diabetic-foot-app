// 医生排班模型
// 使用 Sequelize 定义数据库表结构
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize;

// 定义 ScheduleModel
const ScheduleModel = sequelize.define('Schedule', {
  // 医生ID
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // 排班日期
  scheduleDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  // 开始时间
  startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  // 结束时间
  endTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  // 排班类型（如门诊、手术等）
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'DoctorSchedules', // 数据库表名
  timestamps: false // 不自动添加createdAt/updatedAt
});

module.exports = ScheduleModel; 