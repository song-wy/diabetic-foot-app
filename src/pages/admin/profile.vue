<template>
  <view class="profile-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="iconfont icon-back"></text>
      </view>
      <text class="title">个人中心</text>
      <view class="right-btn" @click="showSettings">
        <text class="iconfont icon-setting"></text>
      </view>
    </view>

    <!-- 顶部个人信息卡片 -->
    <view class="profile-card">
      <view class="avatar-section">
        <image class="avatar" :src="adminInfo.avatar || '/static/avatar.svg'" mode="aspectFill"></image>
        <view class="info">
          <text class="name">{{adminInfo.name}}</text>
          <text class="title">{{adminInfo.title}}</text>
          <text class="department">{{adminInfo.department}}</text>
        </view>
        <view class="edit-btn" @click="navigateTo('/pages/admin/account')">
          <text class="iconfont icon-edit"></text>
        </view>
      </view>
      <view class="stats">
        <view class="stat-item">
          <text class="number">{{adminInfo.userCount}}</text>
          <text class="label">用户数</text>
        </view>
        <view class="stat-item">
          <text class="number">{{adminInfo.patientCount}}</text>
          <text class="label">患者数</text>
        </view>
        <view class="stat-item">
          <text class="number">{{adminInfo.followCount}}</text>
          <text class="label">随访数</text>
        </view>
      </view>
    </view>

    <!-- 工作统计 -->
    <view class="stats-card">
      <view class="card-header">
        <text class="title">工作统计</text>
        <view class="date-picker">
          <picker mode="date" fields="month" :value="currentDate" @change="onDateChange">
            <text>{{currentDate}}</text>
            <text class="iconfont icon-calendar"></text>
          </picker>
        </view>
      </view>
      <view class="stats-content">
        <view class="chart-container">
          <!-- 这里可以集成图表组件 -->
          <view class="placeholder-chart"></view>
        </view>
        <view class="stats-list">
          <view class="stats-item">
            <text class="label">新增用户</text>
            <text class="value">{{monthlyStats.newUsers}}人</text>
          </view>
          <view class="stats-item">
            <text class="label">活跃用户</text>
            <text class="value">{{monthlyStats.activeUsers}}人</text>
          </view>
          <view class="stats-item">
            <text class="label">系统访问</text>
            <text class="value">{{monthlyStats.visits}}次</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="function-list">
      <view class="function-group">
        <view class="group-title">账号管理</view>
        <view class="function-item" @click="navigateTo('/pages/admin/account')">
          <text class="iconfont icon-user"></text>
          <text class="name">账号信息</text>
          <text class="iconfont icon-right"></text>
        </view>
        <view class="function-item" @click="navigateTo('/pages/admin/password')">
          <text class="iconfont icon-lock"></text>
          <text class="name">修改密码</text>
          <text class="iconfont icon-right"></text>
        </view>
      </view>

      <view class="function-group">
        <view class="group-title">系统设置</view>
        <view class="function-item" @click="navigateTo('/pages/admin/notification')">
          <text class="iconfont icon-bell"></text>
          <text class="name">消息通知</text>
          <text class="badge" v-if="unreadCount > 0">{{unreadCount}}</text>
          <text class="iconfont icon-right"></text>
        </view>
        <view class="function-item" @click="navigateTo('/pages/admin/system')">
          <text class="iconfont icon-setting"></text>
          <text class="name">系统配置</text>
          <text class="iconfont icon-right"></text>
        </view>
      </view>

      <view class="function-group">
        <view class="group-title">其他</view>
        <view class="function-item" @click="navigateTo('/pages/admin/help')">
          <text class="iconfont icon-help"></text>
          <text class="name">帮助中心</text>
          <text class="iconfont icon-right"></text>
        </view>
        <view class="function-item" @click="navigateTo('/pages/admin/about')">
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
      <view class="tab-item" @click="navigateTo('/pages/admin/index')">
        <text class="tab-icon">首</text>
        <text class="tab-text">首页</text>
      </view>
      <view class="tab-item" @click="navigateTo('/pages/admin/users')">
        <text class="tab-icon">用</text>
        <text class="tab-text">用户</text>
      </view>
      <view class="tab-item" @click="navigateTo('/pages/admin/data')">
        <text class="tab-icon">数</text>
        <text class="tab-text">数据</text>
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
      adminInfo: {
        name: '张管理员',
        title: '系统管理员',
        department: '信息中心',
        avatar: '',
        userCount: 1286,
        patientCount: 856,
        followCount: 2356
      },
      currentDate: '2024-03',
      monthlyStats: {
        newUsers: 156,
        activeUsers: 986,
        visits: 3562
      },
      unreadCount: 3
    }
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1
      })
    },
    showSettings() {
      uni.navigateTo({
        url: '/pages/admin/system'
      })
    },
    navigateTo(url) {
      uni.navigateTo({
        url
      })
    },
    onDateChange(e) {
      this.currentDate = e.detail.value
      // 实际应该根据选择的日期更新统计数据
      this.loadMonthlyStats()
    },
    loadMonthlyStats() {
      // 实际应该调用API获取所选月份的统计数据
      console.log('加载', this.currentDate, '的统计数据')
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
  },
  onLoad() {
    // 页面加载时获取当前月份的统计数据
    this.loadMonthlyStats()
  }
}
</script>

<style>
.profile-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 40rpx;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 88rpx;
  background-color: #4AB8B8;
  padding: 0 30rpx;
  color: #ffffff;
}

.nav-bar .title {
  font-size: 32rpx;
  font-weight: bold;
}

.back-btn, .right-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn .iconfont, .right-btn .iconfont {
  font-size: 36rpx;
}

.profile-card {
  background-color: #4AB8B8;
  padding: 30rpx;
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

.edit-btn {
  width: 60rpx;
  height: 60rpx;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-btn .iconfont {
  font-size: 32rpx;
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
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
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

.date-picker {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10rpx 20rpx;
  border-radius: 6rpx;
}

.date-picker text {
  font-size: 24rpx;
  color: #666666;
}

.date-picker .iconfont {
  font-size: 24rpx;
  margin-left: 10rpx;
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
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
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
  position: relative;
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

.badge {
  position: absolute;
  top: 20rpx;
  right: 80rpx;
  background-color: #FF6B6B;
  color: #ffffff;
  font-size: 20rpx;
  min-width: 32rpx;
  height: 32rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6rpx;
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
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
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
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tab-item.active {
  color: #666EE8;
}

.tab-icon {
  font-size: 36rpx;
}

.tab-text {
  font-size: 22rpx;
  margin-top: 4rpx;
}
</style> 