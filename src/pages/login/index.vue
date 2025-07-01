<template>
  <view class="login-container">
    <!-- 卡片式登录表单 -->
    <view class="login-card">
      <!-- 欢迎区域 -->
      <view class="welcome-area">
        <text class="welcome-title">欢迎</text>
        <text class="welcome-subtitle">请登录您的账号</text>
      </view>
      
      <!-- 表单区域 -->
      <view class="form-area">
        <!-- 用户名输入 -->
        <view class="input-group">
          <text class="input-label">用户名</text>
          <view class="input-wrapper">
            <input 
              class="input-field" 
              type="text" 
              v-model="formData.username" 
              placeholder="请输入用户名"
              placeholder-class="input-placeholder"
            />
          </view>
        </view>
        
        <!-- 密码输入 -->
        <view class="input-group">
          <text class="input-label">密码</text>
          <view class="input-wrapper">
            <input 
              class="input-field" 
              type="password" 
              v-model="formData.password" 
              placeholder="请输入密码"
              placeholder-class="input-placeholder"
            />
          </view>
        </view>
        
        <!-- 角色选择 -->
        <view class="input-group">
          <text class="input-label">选择角色</text>
          <view class="role-selector">
            <view 
              class="role-item" 
              :class="{ active: formData.role === 'patient' }"
              @click="formData.role = 'patient'"
            >
              <text class="role-text">患者</text>
            </view>
            <view 
              class="role-item" 
              :class="{ active: formData.role === 'doctor' }"
              @click="formData.role = 'doctor'"
            >
              <text class="role-text">医生</text>
            </view>
            <view 
              class="role-item" 
              :class="{ active: formData.role === 'nurse' }"
              @click="formData.role = 'nurse'"
            >
              <text class="role-text">护士</text>
            </view>
            <view 
              class="role-item" 
              :class="{ active: formData.role === 'admin' }"
              @click="formData.role = 'admin'"
            >
              <text class="role-text">管理员</text>
            </view>
          </view>
        </view>
        
        <!-- 记住我和忘记密码 -->
        <view class="options-row">
          <label class="remember-option" @click="formData.rememberMe = !formData.rememberMe">
            <checkbox 
              :checked="formData.rememberMe" 
              color="#a49dfc"
              style="transform:scale(0.7)"
            />
            <text>记住我</text>
          </label>
          <text class="forgot-password" @click="forgotPassword">忘记密码?</text>
        </view>
        
        <!-- 登录按钮 -->
        <button class="login-button" @click="handleLogin">登录</button>
        
        <!-- 注册链接 -->
        <view class="register-link">
          <text>还没有账号？</text>
          <text class="register-text" @click="openRegisterPage">立即注册</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 表单数据
const formData = ref({
  username: '',
  password: '',
  rememberMe: false,
  role: 'patient' // 默认选择患者角色
});

// 处理登录
const handleLogin = () => {
  // 表单验证
  if (!formData.value.username) {
    uni.showToast({
      title: '请输入用户名',
      icon: 'none'
    });
    return;
  }
  
  if (!formData.value.password) {
    uni.showToast({
      title: '请输入密码',
      icon: 'none'
    });
    return;
  }
  
  if (!formData.value.role) {
    uni.showToast({
      title: '请选择角色',
      icon: 'none'
    });
    return;
  }
  
  // 这里添加登录逻辑，例如调用API
  console.log('登录信息：', formData.value);
  uni.showLoading({
    title: '登录中...'
  });
  
  // 模拟登录请求
  setTimeout(() => {
    uni.hideLoading();
    
    // 保存登录状态和角色信息
    uni.setStorageSync('token', 'mock-token-123');
    uni.setStorageSync('userRole', formData.value.role);
    
    // 根据角色跳转到不同页面
    switch (formData.value.role) {
      case 'patient':
        uni.reLaunch({ url: '/pages/patient/index' });
        break;
      case 'doctor':
        uni.reLaunch({ url: '/pages/doctor/index' });
        break;
      case 'nurse':
        uni.reLaunch({ url: '/pages/nurse/index' });
        break;
      case 'admin':
        uni.reLaunch({ url: '/pages/admin/index' });
        break;
      default:
        uni.reLaunch({ url: '/pages/index/index' });
    }
  }, 1500);
};

// 忘记密码
const forgotPassword = () => {
  uni.navigateTo({
    url: '/pages/forgot-password/index'
  });
};

// 去注册页面
const openRegisterPage = () => {
  console.log('正在跳转到注册页面');
  
  // 使用最直接的方式 - 通过window.location跳转
  const currentUrl = window.location.href;
  const baseUrl = currentUrl.split('#')[0];
  window.location.href = baseUrl + '#/pages/register/index';
  
  // 如果上面的方法不工作，可以尝试以下方法
  /*
  setTimeout(() => {
    uni.reLaunch({
      url: '/pages/register/index'
    });
  }, 100);
  */
};

// 返回
const goBack = () => {
  uni.navigateBack();
};
</script>

<style>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #a49dfc, #a09bfa);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

/* 白色卡片区域 */
.login-card {
  width: 100%;
  max-width: 440px;
  background-color: #ffffff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.08);
  padding: 40rpx;
  box-sizing: border-box;
}

/* 欢迎区域 */
.welcome-area {
  text-align: center;
  margin-bottom: 40rpx;
}

.welcome-title {
  font-size: 44rpx;
  font-weight: 600;
  display: block;
  margin-bottom: 12rpx;
  color: #333;
}

.welcome-subtitle {
  font-size: 28rpx;
  color: #999;
}

/* 表单区域 */
.form-area {
  width: 100%;
}

.input-group {
  margin-bottom: 30rpx;
}

.input-label {
  display: block;
  color: #333;
  font-size: 28rpx;
  margin-bottom: 12rpx;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 1rpx solid #e0e0e0;
  border-radius: 8rpx;
  background-color: #f5f5f5;
}

.input-field {
  flex: 1;
  height: 80rpx;
  padding: 0 20rpx;
  color: #333;
  font-size: 28rpx;
  background: transparent;
}

.input-placeholder {
  color: #999;
}

/* 角色选择器 */
.role-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.role-item {
  flex: 1;
  min-width: 120rpx;
  height: 80rpx;
  border: 1rpx solid #e0e0e0;
  border-radius: 8rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.role-item.active {
  border-color: #a49dfc;
  background-color: rgba(164, 157, 252, 0.1);
}

.role-text {
  color: #333;
  font-size: 28rpx;
}

.role-item.active .role-text {
  color: #a49dfc;
  font-weight: 600;
}

/* 选项行 */
.options-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30rpx 0 40rpx;
}

.remember-option {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 26rpx;
}

.forgot-password {
  color: #a49dfc;
  font-size: 26rpx;
}

/* 登录按钮 */
.login-button {
  width: 100%;
  height: 90rpx;
  background: linear-gradient(135deg, #a49dfc, #a09bfa);
  color: #fff;
  border: none;
  border-radius: 8rpx;
  font-size: 32rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10rpx 20rpx rgba(164, 157, 252, 0.3);
  margin-bottom: 30rpx;
}

/* 注册链接 */
.register-link {
  text-align: center;
  color: #666;
  font-size: 26rpx;
}

.register-text {
  color: #a49dfc;
  font-weight: 600;
  margin-left: 8rpx;
}

/* 响应式调整 */
@media screen and (min-width: 768px) {
  .login-card {
    max-width: 440px;
  }
}
</style> 