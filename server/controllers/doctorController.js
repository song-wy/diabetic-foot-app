//医生控制器
const { poolPromise, sql } = require('../config/db');

// 获取医生排班
const getSchedule = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const pool = await poolPromise;
    
    const result = await pool.request()
      .input('doctorId', sql.Int, doctorId)
      .execute('GetDoctorSchedule');
    
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '获取排班失败' });
  }
};

// 添加排班
const addSchedule = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { scheduleDate, startTime, endTime, type } = req.body;
    const pool = await poolPromise;
    
    await pool.request()
      .input('doctorId', sql.Int, doctorId)
      .input('scheduleDate', sql.Date, scheduleDate)
      .input('startTime', sql.Time, startTime)
      .input('endTime', sql.Time, endTime)
      .input('type', sql.NVarChar, type)
      .query(`INSERT INTO DoctorSchedules (doctor_id, schedule_date, start_time, end_time, type)
              VALUES (@doctorId, @scheduleDate, @startTime, @endTime, @type)`);
    
    res.status(201).json({ message: '排班添加成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '添加排班失败' });
  }
};

// 获取医生管理的患者列表
const getPatients = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const pool = await poolPromise;
    
    const result = await pool.request()
      .input('doctorId', sql.Int, doctorId)
      .query(`SELECT p.patient_id, p.name, p.phone 
              FROM Patient p
              JOIN Doctor_Patient dp ON p.patient_id = dp.patient_id
              WHERE dp.doctor_id = @doctorId`);
    
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '获取患者列表失败' });
  }
};

// 获取患者档案
const getPatientProfile = async (req, res) => {
  try {
    const { patientId } = req.params;
    const pool = await poolPromise;
    
    const result = await pool.request()
      .input('patientId', sql.Int, patientId)
      .execute('GetPatientHealthData');
    
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '获取患者档案失败' });
  }
};

module.exports = { getSchedule, addSchedule, getPatients, getPatientProfile };