<template>
  <view class="profile-container">
    <!-- 顶部个人信息卡片 -->
    <view class="profile-card">
      <view class="avatar-section">
        <image class="avatar" :src="doctorInfo.avatar || '/static/avatar.svg'" mode="aspectFill"></image>
        <view class="info">
          <text class="name">{{doctorInfo.name}}</text>
          <text class="title">{{doctorInfo.title}}</text>
          <text class="department">{{doctorInfo.department}}</text>
        </view>
      </view>
      <view class="stats">
        <view class="stat-item">
          <text class="number">{{doctorInfo.patientCount}}</text>
          <text class="label">患者数</text>
        </view>
        <view class="stat-item">
          <text class="number">{{doctorInfo.consultCount}}</text>
          <text class="label">咨询数</text>
        </view>
        <view class="stat-item">
          <text class="number">{{doctorInfo.followUpCount}}</text>
          <text class="label">随访数</text>
        </view>
      </view>
    </view>

    <!-- 工作统计 -->
    <view class="stats-card">
      <view class="card-header">
        <text class="title">工作统计</text>
        <text class="date">{{currentMonth}}月</text>
      </view>
      <view class="stats-content">
        <view class="chart-container">
          <!-- 这里可以集成图表组件 -->
          <view class="placeholder-chart"></view>
        </view>
        <view class="stats-list">
          <view class="stats-item">
            <text class="label">门诊接诊</text>
            <text class="value">{{monthlyStats.outpatient}}次</text>
          </view>
          <view class="stats-item">
            <text class="label">手术台数</text>
            <text class="value">{{monthlyStats.surgery}}台</text>
          </view>
          <view class="stats-item">
            <text class="label">随访完成</text>
            <text class="value">{{monthlyStats.followUp}}次</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="function-list">
      <view class="function-group">
        <view class="group-title">账号管理</view>
        <view class="function-item" @click="navigateTo('/pages/doctor/account')">
          <text class="iconfont icon-user"></text>
          <text class="name">账号信息</text>
          <text class="iconfont icon-right"></text>
        </view>
        <view class="function-item" @click="navigateTo('/pages/doctor/password')">
          <text class="iconfont icon-lock"></text>
          <text class="name">修改密码</text>
          <text class="iconfont icon-right"></text>
        </view>
      </view>

      <view class="function-group">
        <view class="group-title">工作设置</view>
        <view class="function-item" @click="navigateTo('/pages/doctor/schedule')">
          <text class="iconfont icon-calendar"></text>
          <text class="name">排班管理</text>
          <text class="iconfont icon-right"></text>
        </view>
        <view class="function-item" @click="navigateTo('/pages/doctor/notification')">
          <text class="iconfont icon-bell"></text>
          <text class="name">消息通知</text>
          <text class="iconfont icon-right"></text>
        </view>
      </view>

      <view class="function-group">
        <view class="group-title">其他</view>
        <view class="function-item" @click="navigateTo('/pages/doctor/help')">
          <text class="iconfont icon-help"></text>
          <text class="name">帮助中心</text>
          <text class="iconfont icon-right"></text>
        </view>
        <view class="function-item" @click="navigateTo('/pages/doctor/about')">
          <text class="iconfont icon-info"></text>
          <text class="name">关于我们</text>
          <text class="iconfont icon-right"></text>
        </view>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view class="logout-btn" @click="handleLogout">
      <text>退出登录</text>
    </view>

    <!-- 底部导航 -->
    <view class="tab-bar">
      <view class="tab-item" @click="navigateTo('/pages/doctor/index')">
        <text class="tab-icon">首</text>
        <text class="tab-text">首页</text>
      </view>
      <view class="tab-item" @click="navigateTo('/pages/doctor/patients')">
        <text class="tab-icon">患</text>
        <text class="tab-text">患者</text>
      </view>
      <view class="tab-item" @click="navigateTo('/pages/doctor/schedule')">
        <text class="tab-icon">排</text>
        <text class="tab-text">排班</text>
      </view>
      <view class="tab-item active">
        <text class="tab-icon">我</text>
        <text class="tab-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      doctorInfo: {
        name: '张医生',
        title: '主任医师',
        department: '内分泌科',
        avatar: '',
        patientCount: 128,
        consultCount: 256,
        followUpCount: 64
      },
      currentMonth: new Date().getMonth() + 1,
      monthlyStats: {
        outpatient: 86,
        surgery: 12,
        followUp: 45
      }
    }
  },
  methods: {
    navigateTo(url) {
      uni.navigateTo({
        url
      })
    },
    handleLogout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            // 实际应该调用退出登录API
            uni.reLaunch({
              url: '/pages/login/index'
            })
          }
        }
      })
    }
  }
}
</script>

<style>
.profile-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 40rpx;
}

.profile-card {
  background-color: #4AB8B8;
  padding: 60rpx 30rpx 30rpx;
  color: #ffffff;
}

.avatar-section {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  margin-right: 30rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
}

.info {
  flex: 1;
}

.name {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  display: block;
}

.title {
  font-size: 28rpx;
  opacity: 0.9;
  margin-bottom: 6rpx;
  display: block;
}

.department {
  font-size: 24rpx;
  opacity: 0.8;
}

.stats {
  display: flex;
  justify-content: space-around;
  padding-top: 30rpx;
  border-top: 1rpx solid rgba(255, 255, 255, 0.2);
}

.stat-item {
  text-align: center;
}

.stat-item .number {
  font-size: 36rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 6rpx;
}

.stat-item .label {
  font-size: 24rpx;
  opacity: 0.8;
}

.stats-card {
  background-color: #ffffff;
  margin: 20rpx;
  border-radius: 12rpx;
  padding: 30rpx;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.card-header .title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.card-header .date {
  font-size: 28rpx;
  color: #999999;
}

.chart-container {
  height: 300rpx;
  margin-bottom: 30rpx;
}

.placeholder-chart {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  border-radius: 8rpx;
}

.stats-list {
  display: flex;
  justify-content: space-between;
}

.stats-list .stats-item {
  text-align: center;
}

.stats-list .label {
  font-size: 24rpx;
  color: #999999;
  margin-bottom: 6rpx;
  display: block;
}

.stats-list .value {
  font-size: 32rpx;
  color: #333333;
  font-weight: bold;
}

.function-list {
  margin: 20rpx;
}

.function-group {
  background-color: #ffffff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
}

.group-title {
  font-size: 28rpx;
  color: #999999;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.function-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.function-item:last-child {
  border-bottom: none;
}

.function-item .iconfont {
  font-size: 40rpx;
  color: #4AB8B8;
  margin-right: 20rpx;
}

.function-item .name {
  flex: 1;
  font-size: 28rpx;
  color: #333333;
}

.function-item .icon-right {
  font-size: 32rpx;
  color: #999999;
}

.logout-btn {
  margin: 40rpx 20rpx;
  height: 88rpx;
  background-color: #ffffff;
  border-radius: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FF6B6B;
  font-size: 32rpx;
}

/* 底部导航 */
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background-color: #fff;
  display: flex;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tab-item.active {
  color: #5A8DEE;
}

.tab-icon {
  font-size: 36rpx;
}

.tab-text {
  font-size: 22rpx;
  margin-top: 4rpx;
}
</style> 