//医生排班服务层
const { Op } = require('sequelize');
const ScheduleModel = require('../models/schedule.model');

class ScheduleService {
  async createSchedule(doctorId, scheduleData) {
    // 检查时间冲突
    const conflict = await ScheduleModel.findOne({
      where: {
        doctorId,
        scheduleDate: scheduleData.scheduleDate,
        [Op.or]: [
          {
            startTime: { [Op.lt]: scheduleData.endTime },
            endTime: { [Op.gt]: scheduleData.startTime }
          }
        ]
      }
    });

    if (conflict) {
      throw new Error('该时间段已有排班安排');
    }

    return ScheduleModel.create({ ...scheduleData, doctorId });
  }

  async getSchedules(doctorId, startDate, endDate) {
    return ScheduleModel.findAll({
      where: {
        doctorId,
        scheduleDate: { [Op.between]: [startDate, endDate] }
      },
      order: [['scheduleDate', 'ASC'], ['startTime', 'ASC']]
    });
  }
}