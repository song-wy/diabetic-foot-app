// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../config/db');

const authController = require('../controllers/authController');

// 用户注册
router.post('/register', authController.register);

// 用户登录
router.post('/login', authController.login);

// 获取所有用户
router.get('/users', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Users');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 创建新用户
router.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('name', sql.NVarChar, name)
      .input('email', sql.NVarChar, email)
      .query('INSERT INTO Users (Name, Email) OUTPUT inserted.* VALUES (@name, @email)');
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;