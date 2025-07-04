//认证相关
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { poolPromise, sql } = require('../config/db');

const register = async (req, res) => {
  try {
    const { username, password, role, phone } = req.body;
    const pool = await poolPromise;
    
    // 检查用户是否存在
    const userExists = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT id FROM Users WHERE username = @username');
    
    if (userExists.recordset.length > 0) {
      return res.status(400).json({ error: '用户名已存在' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 创建用户
    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .input('password', sql.NVarChar, hashedPassword)
      .input('role', sql.NVarChar, role)
      .input('phone', sql.NVarChar, phone)
      .query(`INSERT INTO Users (username, password, role, phone) 
              VALUES (@username, @password, @role, @phone)`);
    
    res.status(201).json({ message: '用户注册成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '服务器错误' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const pool = await poolPromise;
    
    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT id, password, role FROM Users WHERE username = @username');
    
    const user = result.recordset[0];
    if (!user) return res.status(401).json({ error: '无效凭证' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: '无效凭证' });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    
    res.json({ 
      token,
      userId: user.id,
      role: user.role,
      username: user.username
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '服务器错误' });
  }
};

module.exports = { register, login };