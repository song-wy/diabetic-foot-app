//统一响应封装
class ApiResponse {
  constructor(code, message, data = null) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.timestamp = Date.now();
  }

  static success(data = null, message = '操作成功') {
    return new ApiResponse(0, message, data);
  }

  static error(code, message) {
    return new ApiResponse(code, message);
  }
}

module.exports = ApiResponse;