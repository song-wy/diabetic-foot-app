<template>
  <view class="register-container">
    <!-- 卡片式注册表单 -->
    <view class="register-card">
      <!-- 欢迎区域 -->
      <view class="welcome-area">
        <text class="welcome-title">创建账号</text>
        <text class="welcome-subtitle">请填写注册信息</text>
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
        
        <!-- 确认密码输入 -->
        <view class="input-group">
          <text class="input-label">确认密码</text>
          <view class="input-wrapper">
            <input 
              class="input-field" 
              type="password" 
              v-model="formData.confirmPassword" 
              placeholder="请再次输入密码"
              placeholder-class="input-placeholder"
            />
          </view>
        </view>
        
        <!-- 用户协议 -->
        <view class="agreement-row">
          <checkbox-group @change="handleAgreementChange">
            <label class="agreement-label">
              <checkbox :checked="formData.agreement" color="#a49dfc" style="transform:scale(0.7)" />
              <text class="agreement-text">我已阅读并同意<text class="link-text">用户协议</text>和<text class="link-text">隐私政策</text></text>
            </label>
          </checkbox-group>
        </view>
        
        <!-- 注册按钮 -->
        <button class="register-button" @click="handleRegister">注册</button>
        
        <!-- 登录链接 -->
        <view class="login-link">
          <text>已有账号？</text>
          <text class="login-text" @click="goBack">返回登录</text>
        </view>

        <!-- 返回箭头 -->
        <view class="back-area" @click="goBack">
          <text class="back-text">返回登录</text>
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
  confirmPassword: '',
  agreement: false
});

// 处理用户协议变更
const handleAgreementChange = (e) => {
  formData.value.agreement = e.detail.value.length > 0;
};

// 处理注册
const handleRegister = () => {
  console.log('注册按钮被点击');
  
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
  
  if (formData.value.password !== formData.value.confirmPassword) {
    uni.showToast({
      title: '两次输入的密码不一致',
      icon: 'none'
    });
    return;
  }
  
  if (!formData.value.agreement) {
    uni.showToast({
      title: '请阅读并同意用户协议和隐私政策',
      icon: 'none'
    });
    return;
  }
  
  // 这里添加注册逻辑，例如调用API
  console.log('注册信息：', formData.value);
  uni.showLoading({
    title: '注册中...'
  });
  
  // 模拟注册请求
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: '注册成功',
      icon: 'success',
      duration: 1500,
      success: () => {
        // 注册成功后跳转到登录页
        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
      }
    });
  }, 1500);
};

// 返回登录页
const goBack = () => {
  // 使用最直接的方式返回登录页
  const currentUrl = window.location.href;
  const baseUrl = currentUrl.split('#')[0];
  window.location.href = baseUrl + '#/pages/login/index';
};
</script>

<style>
.register-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #a49dfc, #a09bfa);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

/* 白色卡片区域 */
.register-card {
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

/* 用户协议 */
.agreement-row {
  margin: 20rpx 0 40rpx;
}

.agreement-label {
  display: flex;
  align-items: center;
}

.agreement-text {
  font-size: 24rpx;
  color: #666;
  margin-left: 8rpx;
}

.link-text {
  color: #a49dfc;
}

/* 注册按钮 */
.register-button {
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

/* 登录链接 */
.login-link {
  text-align: center;
  color: #666;
  font-size: 26rpx;
}

.login-text {
  color: #a49dfc;
  font-weight: 600;
  margin-left: 8rpx;
}

/* 返回箭头 */
.back-area {
  text-align: center;
  margin-top: 20rpx;
  color: #a49dfc;
  font-size: 26rpx;
  cursor: pointer;
}

.back-text {
  font-weight: 600;
}

/* 响应式调整 */
@media screen and (min-width: 768px) {
  .register-card {
    max-width: 440px;
  }
}
</style> 