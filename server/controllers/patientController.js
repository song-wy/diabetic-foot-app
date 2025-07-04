const { poolPromise, sql } = require('../config/db');

// 正确引用血糖模型
const GlucoseModel = require('../models/glucosemodel');
const ApiResponse = require('../utils/response');

class PatientController {
  // 提交血糖数据
  async submitGlucose(req, res) {
    try {
      const { patientId } = req.params;
      const { value, mealType, notes } = req.body;

      // 数据校验
      if (![2.2, 33.3].includes(parseFloat(value))) {
        return res.status(400).json(ApiResponse.error(40001, '血糖值超出合理范围'));
      }

      // 业务处理
      const record = await GlucoseModel.create({
        patientId,
        value,
        mealType,
        notes,
        recordTime: new Date()
      });

      res.status(201).json(ApiResponse.success(record));
    } catch (error) {
      res.status(500).json(ApiResponse.error(50000, error.message));
    }
  }

  // 获取血糖趋势（带分页）
  async getGlucoseTrend(req, res) {
    const { patientId } = req.params;
    const { page = 1, pageSize = 30, days } = req.query;

    try {
      const where = { patientId };
      if (days) {
        where.recordTime = { [Op.gte]: new Date(Date.now() - days * 86400000) };
      }

      const { count, rows } = await GlucoseModel.findAndCountAll({
        where,
        order: [['recordTime', 'DESC']],
        offset: (page - 1) * pageSize,
        limit: parseInt(pageSize)
      });

      res.json(ApiResponse.success({
        total: count,
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        data: rows
      }));
    } catch (error) {
      res.status(500).json(ApiResponse.error(50000, error.message));
    }
  }
}

// 获取患者健康数据
const getHealthData = async (req, res) => {
  try {
    const { patientId } = req.params;
    const pool = await poolPromise;
    
    const result = await pool.request()
      .input('patientId', sql.Int, patientId)
      .execute('GetPatientHealthData');
    
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '服务器错误' });
  }
};

// 上传伤口记录
const uploadWoundRecord = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { description, painLevel } = req.body;
    const images = req.files?.map(file => file.path) || [];
    const pool = await poolPromise;
    
    await pool.request()
      .input('patientId', sql.Int, patientId)
      .input('description', sql.NVarChar, description)
      .input('painLevel', sql.Int, painLevel)
      .input('images', sql.NVarChar, JSON.stringify(images))
      .query(`INSERT INTO WoundRecords (patient_id, description, pain_level, images)
              VALUES (@patientId, @description, @painLevel, @images)`);
    
    res.status(201).json({ message: '伤口记录上传成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '上传伤口记录失败' });
  }
};

// 获取伤口记录
const getWoundRecords = async (req, res) => {
  try {
    const { patientId } = req.params;
    const pool = await poolPromise;
    
    const result = await pool.request()
      .input('patientId', sql.Int, patientId)
      .query(`SELECT * FROM WoundRecords 
              WHERE patient_id = @patientId
              ORDER BY record_time DESC`);
    
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '获取伤口记录失败' });
  }
};

// 实例化PatientController
const patientControllerInstance = new PatientController();

// 导出所有需要的控制器方法
module.exports = { 
  // 获取健康数据
  getHealthData,
  // 上传伤口记录
  uploadWoundRecord,
  // 获取伤口记录
  getWoundRecords,
  // 提交血糖数据
  submitGlucose: patientControllerInstance.submitGlucose.bind(patientControllerInstance),
  // 获取血糖趋势
  getGlucoseTrend: patientControllerInstance.getGlucoseTrend.bind(patientControllerInstance),
  // 兼容路由中的createWoundRecord（指向uploadWoundRecord）
  createWoundRecord: uploadWoundRecord
};