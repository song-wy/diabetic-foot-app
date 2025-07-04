//认证中间件
const jwt = require('jsonwebtoken');
const ApiResponse = require('../utils/response');

module.exports = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) throw new Error('缺少认证令牌');

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // 角色检查
      if (requiredRole && decoded.role !== requiredRole) {
        throw new Error('权限不足');
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json(ApiResponse.error(40100, error.message));
    }
  };
};