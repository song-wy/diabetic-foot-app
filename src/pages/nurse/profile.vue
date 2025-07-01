<template>
  <view class="profile-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="iconfont icon-back"></text>
      </view>
      <text class="title">个人中心</text>
      <view class="right-btn" @click="showSettings">
        <text class="iconfont icon-settings"></text>
      </view>
    </view>

    <!-- 个人资料卡 -->
    <view class="profile-card">
      <view class="avatar-section">
        <image class="avatar" :src="nurseInfo.avatar || '/static/default-avatar.png'" mode="aspectFill"></image>
        <view class="edit-avatar" @click="editAvatar">
          <text class="iconfont icon-camera"></text>
        </view>
      </view>
      <view class="info-section">
        <view class="name">{{nurseInfo.name}}</view>
        <view class="subtitle">
          <text class="title">{{nurseInfo.title}}</text>
          <text class="department">{{nurseInfo.department}}</text>
        </view>
      </view>
      <view class="edit-btn" @click="editProfile">
        <text class="iconfont icon-edit"></text>
      </view>
    </view>

    <!-- 工作统计卡片 -->
    <view class="stats-card">
      <view class="card-header">
        <text class="title">工作统计</text>
        <view class="date-picker" @click="showDatePicker">
          <text>{{currentMonth}}月</text>
          <text class="iconfont icon-down"></text>
        </view>
      </view>
      <view class="stats-grid">
        <view class="stats-item">
          <text class="value">{{nurseInfo.patientCount}}</text>
          <text class="label">负责患者</text>
        </view>
        <view class="stats-item">
          <text class="value">{{nurseInfo.followCount}}</text>
          <text class="label">随访任务</text>
        </view>
        <view class="stats-item">
          <text class="value">{{nurseInfo.taskCount}}</text>
          <text class="label">待办事项</text>
        </view>
      </view>
      <view class="divider"></view>
      <view class="monthly-stats">
        <view class="stats-row">
          <text class="label">已完成随访</text>
          <text class="value">{{monthlyStats.completedFollows}}次</text>
        </view>
        <view class="stats-row">
          <text class="label">数据录入</text>
          <text class="value">{{monthlyStats.dataEntries}}条</text>
        </view>
        <view class="stats-row">
          <text class="label">健康宣教</text>
          <text class="value">{{monthlyStats.healthEducation}}次</text>
        </view>
      </view>
      <view class="chart-placeholder">
        <text class="placeholder-text">近期工作趋势图表</text>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="function-list">
      <view class="function-group">
        <text class="group-title">账号管理</text>
        <view class="function-item" @click="navigateTo('/pages/nurse/account-info')">
          <view class="item-left">
            <text class="iconfont icon-user"></text>
            <text class="item-name">账号信息</text>
          </view>
          <view class="item-right">
            <text class="iconfont icon-right"></text>
          </view>
        </view>
        <view class="function-item" @click="navigateTo('/pages/nurse/change-password')">
          <view class="item-left">
            <text class="iconfont icon-lock"></text>
            <text class="item-name">修改密码</text>
          </view>
          <view class="item-right">
            <text class="iconfont icon-right"></text>
          </view>
        </view>
      </view>

      <view class="function-group">
        <text class="group-title">工作设置</text>
        <view class="function-item" @click="navigateTo('/pages/nurse/notifications')">
          <view class="item-left">
            <text class="iconfont icon-notification"></text>
            <text class="item-name">消息通知</text>
          </view>
          <view class="item-right">
            <view class="badge" v-if="unreadCount > 0">{{unreadCount}}</view>
            <text class="iconfont icon-right"></text>
          </view>
        </view>
        <view class="function-item" @click="navigateTo('/pages/nurse/schedule-settings')">
          <view class="item-left">
            <text class="iconfont icon-calendar"></text>
            <text class="item-name">排班管理</text>
          </view>
          <view class="item-right">
            <text class="iconfont icon-right"></text>
          </view>
        </view>
      </view>

      <view class="function-group">
        <text class="group-title">其他</text>
        <view class="function-item" @click="navigateTo('/pages/nurse/help-center')">
          <view class="item-left">
            <text class="iconfont icon-help"></text>
            <text class="item-name">帮助中心</text>
          </view>
          <view class="item-right">
            <text class="iconfont icon-right"></text>
          </view>
        </view>
        <view class="function-item" @click="navigateTo('/pages/nurse/about')">
          <view class="item-left">
            <text class="iconfont icon-info"></text>
            <text class="item-name">关于我们</text>
          </view>
          <view class="item-right">
            <text class="iconfont icon-right"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view class="logout-btn" @click="showLogoutConfirm">
      <text>退出登录</text>
    </view>

    <!-- 日期选择器弹窗 -->
    <uni-popup ref="datePopup" type="bottom">
      <view class="popup-content">
        <view class="popup-header">
          <text class="title">选择月份</text>
          <text class="close-btn iconfont icon-close" @click="closeDatePicker"></text>
        </view>
        <view class="date-content">
          <picker mode="date" fields="month" :value="dateValue" @change="onDateChange">
            <view class="date-picker-btn">
              <text>点击选择</text>
            </view>
          </picker>
        </view>
        <view class="popup-footer">
          <button class="cancel-btn" @click="closeDatePicker">取消</button>
          <button class="confirm-btn" @click="confirmDate">确定</button>
        </view>
      </view>
    </uni-popup>

    <!-- 底部导航 -->
    <view class="tab-bar">
      <view class="tab-item" @click="navigateTo('/pages/nurse/index')">
        <text class="tab-icon">首</text>
        <text class="tab-text">首页</text>
      </view>
      <view class="tab-item" @click="navigateTo('/pages/nurse/follow')">
        <text class="tab-icon">访</text>
        <text class="tab-text">回访</text>
      </view>
      <view class="tab-item" @click="navigateTo('/pages/nurse/patients')">
        <text class="tab-icon">患</text>
        <text class="tab-text">患者</text>
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
      nurseInfo: {
        name: '李护士',
        title: '主管护师',
        department: '心内科',
        avatar: '',
        patientCount: 28,
        followCount: 12,
        taskCount: 5
      },
      currentMonth: new Date().getMonth() + 1,
      dateValue: '',
      unreadCount: 3,
      monthlyStats: {
        completedFollows: 18,
        dataEntries: 45,
        healthEducation: 6
      }
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
        url: '/pages/nurse/settings'
      })
    },
    editAvatar() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          // 实际应该调用上传API
          uni.showToast({
            title: '头像更新成功',
            icon: 'success'
          })
        }
      })
    },
    editProfile() {
      uni.navigateTo({
        url: '/pages/nurse/edit-profile'
      })
    },
    showDatePicker() {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      this.dateValue = `${year}-${month}`
      this.$refs.datePopup.open()
    },
    closeDatePicker() {
      this.$refs.datePopup.close()
    },
    onDateChange(e) {
      this.dateValue = e.detail.value
    },
    confirmDate() {
      if (this.dateValue) {
        const date = new Date(this.dateValue)
        this.currentMonth = date.getMonth() + 1
        this.loadMonthlyStats()
      }
      this.closeDatePicker()
    },
    loadMonthlyStats() {
      // 实际应该根据所选月份调用API获取数据
      uni.showLoading({
        title: '加载中...'
      })
      setTimeout(() => {
        uni.hideLoading()
        // 模拟数据
        this.monthlyStats = {
          completedFollows: Math.floor(Math.random() * 30),
          dataEntries: Math.floor(Math.random() * 100),
          healthEducation: Math.floor(Math.random() * 10)
        }
      }, 500)
    },
    navigateTo(url) {
      uni.navigateTo({ url })
    },
    showLogoutConfirm() {
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
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    this.dateValue = `${year}-${month}`
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
  margin: 20rpx;
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  position: relative;
}

.avatar-section {
  position: relative;
  margin-right: 30rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  background-color: #f0f0f0;
}

.edit-avatar {
  position: absolute;
  right: -10rpx;
  bottom: -10rpx;
  width: 50rpx;
  height: 50rpx;
  background-color: #4AB8B8;
  border-radius: 25rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-avatar .iconfont {
  font-size: 30rpx;
  color: #ffffff;
}

.info-section {
  flex: 1;
}

.name {
  font-size: 36rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 10rpx;
}

.subtitle {
  font-size: 28rpx;
  color: #666666;
  display: flex;
  align-items: center;
}

.subtitle .title {
  margin-right: 20rpx;
  background-color: rgba(74, 184, 184, 0.1);
  color: #4AB8B8;
  padding: 6rpx 16rpx;
  border-radius: 4rpx;
}

.edit-btn {
  position: absolute;
  top: 30rpx;
  right: 30rpx;
  width: 60rpx;
  height: 60rpx;
  background-color: #f5f5f5;
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-btn .iconfont {
  font-size: 36rpx;
  color: #999999;
}

.stats-card {
  margin: 20rpx;
  background-color: #ffffff;
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
  border-radius: 30rpx;
}

.date-picker text {
  font-size: 28rpx;
  color: #666666;
}

.date-picker .iconfont {
  font-size: 24rpx;
  margin-left: 10rpx;
  color: #999999;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.stats-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.stats-item .value {
  font-size: 48rpx;
  font-weight: bold;
  color: #4AB8B8;
  margin-bottom: 10rpx;
}

.stats-item .label {
  font-size: 24rpx;
  color: #999999;
}

.divider {
  height: 1rpx;
  background-color: #f0f0f0;
  margin: 20rpx 0;
}

.monthly-stats {
  margin-bottom: 30rpx;
}

.stats-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.stats-row .label {
  font-size: 28rpx;
  color: #666666;
}

.stats-row .value {
  font-size: 28rpx;
  color: #333333;
  font-weight: bold;
}

.chart-placeholder {
  height: 300rpx;
  background-color: #f8f8f8;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-text {
  font-size: 28rpx;
  color: #999999;
}

.function-list {
  margin: 20rpx;
}

.function-group {
  background-color: #ffffff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  padding: 0 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.group-title {
  font-size: 28rpx;
  color: #999999;
  padding: 30rpx 0 20rpx;
  display: block;
}

.function-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 0;
  border-top: 1rpx solid #f5f5f5;
}

.function-item:first-child {
  border-top: none;
}

.item-left {
  display: flex;
  align-items: center;
}

.item-left .iconfont {
  font-size: 40rpx;
  color: #4AB8B8;
  margin-right: 20rpx;
}

.item-name {
  font-size: 28rpx;
  color: #333333;
}

.item-right {
  display: flex;
  align-items: center;
}

.item-right .iconfont {
  font-size: 36rpx;
  color: #cccccc;
}

.badge {
  min-width: 36rpx;
  height: 36rpx;
  background-color: #FF6B6B;
  border-radius: 18rpx;
  font-size: 22rpx;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10rpx;
  margin-right: 20rpx;
}

.logout-btn {
  margin: 60rpx 40rpx;
  height: 90rpx;
  background-color: #ffffff;
  border-radius: 45rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #FF6B6B;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.popup-content {
  background-color: #ffffff;
  border-radius: 24rpx 24rpx 0 0;
  padding: 30rpx;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.popup-header .title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.close-btn {
  font-size: 40rpx;
  color: #999999;
}

.date-content {
  padding: 30rpx 0;
}

.date-picker-btn {
  height: 80rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #666666;
}

.popup-footer {
  display: flex;
  gap: 20rpx;
  margin-top: 30rpx;
}

.popup-footer button {
  flex: 1;
  height: 80rpx;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #666666;
}

.confirm-btn {
  background-color: #4AB8B8;
  color: #ffffff;
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
  color: #00CFB4;
}

.tab-icon {
  font-size: 36rpx;
}

.tab-text {
  font-size: 22rpx;
  margin-top: 4rpx;
}
</style> 