<template>
  <view class="profile-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="iconfont icon-back"></text>
      </view>
      <text class="title">个人中心</text>
      <view class="right-btn" @click="navigateTo('/pages/patient/settings')">
        <text class="iconfont icon-settings"></text>
      </view>
    </view>

    <!-- 个人信息卡片 -->
    <view class="profile-card">
      <view class="user-section">
        <view class="avatar-wrapper">
          <image class="avatar" :src="userInfo.avatar || '/static/default-avatar.png'" mode="aspectFill"></image>
          <view class="edit-avatar" @click="changeAvatar">
            <text class="iconfont icon-camera"></text>
          </view>
        </view>
        <view class="info-section">
          <view class="name-row">
            <text class="name">{{userInfo.name}}</text>
            <view class="tag" v-if="userInfo.vip">VIP会员</view>
          </view>
          <text class="id">ID: {{userInfo.patientId}}</text>
          <view class="edit-info" @click="navigateTo('/pages/patient/edit-profile')">
            <text class="edit-text">编辑资料</text>
            <text class="iconfont icon-edit"></text>
          </view>
        </view>
      </view>
      
      <view class="info-grid">
        <view class="info-item" @click="navigateTo('/pages/patient/health-records')">
          <text class="iconfont icon-card"></text>
          <text class="item-text">就诊卡</text>
        </view>
        <view class="divider"></view>
        <view class="info-item" @click="navigateTo('/pages/patient/appointments')">
          <text class="iconfont icon-doctor"></text>
          <text class="item-text">家庭医生</text>
        </view>
        <view class="divider"></view>
        <view class="info-item" @click="navigateTo('/pages/patient/insurance')">
          <text class="iconfont icon-insurance"></text>
          <text class="item-text">医保信息</text>
        </view>
      </view>
    </view>

    <!-- 健康数据概览 -->
    <view class="health-card">
      <view class="card-header">
        <view class="title-wrapper">
          <text class="iconfont icon-health"></text>
          <text class="section-title">健康数据</text>
        </view>
        <text class="view-more" @click="navigateTo('/pages/patient/data')">查看详情</text>
      </view>
      <view class="health-grid">
        <view class="health-item" @click="navigateTo('/pages/patient/blood-monitor')">
          <text class="value" :class="getValueClass(healthData.bloodSugar, 'sugar')">{{healthData.bloodSugar}}</text>
          <text class="unit">mmol/L</text>
          <text class="label">血糖</text>
        </view>
        <view class="health-item" @click="navigateTo('/pages/patient/weight-monitor')">
          <text class="value" :class="getValueClass(healthData.weight, 'weight')">{{healthData.weight}}</text>
          <text class="unit">kg</text>
          <text class="label">体重</text>
        </view>
        <view class="health-item" @click="navigateTo('/pages/patient/pressure-monitor')">
          <text class="value" :class="getValueClass(healthData.bloodPressure, 'pressure')">{{healthData.bloodPressure}}</text>
          <text class="unit">mmHg</text>
          <text class="label">血压</text>
        </view>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="function-list">
      <view class="function-group">
        <view class="group-header">
          <text class="iconfont icon-manage"></text>
          <text class="group-title">健康管理</text>
        </view>
        <view class="function-grid">
          <view class="function-item" @click="navigateTo('/pages/patient/health-records')">
            <view class="function-icon health">
              <text class="iconfont icon-record"></text>
            </view>
            <text class="function-title">健康档案</text>
          </view>
          <view class="function-item" @click="navigateTo('/pages/patient/medication')">
            <view class="function-icon medicine">
              <text class="iconfont icon-medicine"></text>
            </view>
            <text class="function-title">用药管理</text>
          </view>
          <view class="function-item" @click="navigateTo('/pages/patient/diet')">
            <view class="function-icon diet">
              <text class="iconfont icon-diet"></text>
            </view>
            <text class="function-title">饮食记录</text>
          </view>
          <view class="function-item" @click="navigateTo('/pages/patient/sport')">
            <view class="function-icon sport">
              <text class="iconfont icon-sport"></text>
            </view>
            <text class="function-title">运动记录</text>
          </view>
        </view>
      </view>

      <view class="function-group">
        <view class="group-header">
          <text class="iconfont icon-medical"></text>
          <text class="group-title">医疗服务</text>
        </view>
        <view class="function-grid">
          <view class="function-item" @click="navigateTo('/pages/patient/appointments')">
            <view class="function-icon appointment">
              <text class="iconfont icon-calendar"></text>
            </view>
            <text class="function-title">预约记录</text>
          </view>
          <view class="function-item" @click="navigateTo('/pages/patient/consultations')">
            <view class="function-icon consult">
              <text class="iconfont icon-consult"></text>
            </view>
            <text class="function-title">咨询记录</text>
          </view>
          <view class="function-item" @click="navigateTo('/pages/patient/reports')">
            <view class="function-icon report">
              <text class="iconfont icon-report"></text>
            </view>
            <text class="function-title">检查报告</text>
          </view>
          <view class="function-item" @click="navigateTo('/pages/patient/prescriptions')">
            <view class="function-icon prescription">
              <text class="iconfont icon-prescription"></text>
            </view>
            <text class="function-title">处方信息</text>
          </view>
        </view>
      </view>

      <view class="function-group">
        <view class="function-item full" @click="navigateTo('/pages/patient/feedback')">
          <text class="iconfont icon-feedback"></text>
          <text class="title">意见反馈</text>
          <text class="iconfont icon-right"></text>
        </view>
        <view class="function-item full" @click="navigateTo('/pages/patient/about')">
          <text class="iconfont icon-about"></text>
          <text class="title">关于我们</text>
          <text class="iconfont icon-right"></text>
        </view>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view class="logout-btn" @click="handleLogout">
      退出登录
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: '张三',
        patientId: 'P202403150001',
        avatar: '',
        vip: true
      },
      healthData: {
        bloodSugar: '5.6',
        weight: '65',
        bloodPressure: '120/80'
      }
    }
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1
      })
    },
    navigateTo(url) {
      uni.navigateTo({
        url
      })
    },
    changeAvatar() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths
          // 实际应用中应该上传图片到服务器
          this.userInfo.avatar = tempFilePaths[0]
          uni.showToast({
            title: '头像更新成功',
            icon: 'success'
          })
        }
      })
    },
    getValueClass(value, type) {
      if (type === 'sugar') {
        const numValue = parseFloat(value)
        if (numValue < 3.9) return 'value-low'
        if (numValue > 6.1) return 'value-high'
        return 'value-normal'
      } else if (type === 'weight') {
        // 简化的体重判断逻辑
        return 'value-normal'
      } else if (type === 'pressure') {
        // 从血压字符串中提取收缩压
        const systolic = parseInt(value.split('/')[0])
        if (systolic < 90) return 'value-low'
        if (systolic > 140) return 'value-high'
        return 'value-normal'
      }
      return 'value-normal'
    },
    handleLogout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            // 清除登录状态
            uni.clearStorageSync()
            // 跳转到登录页
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

/* 导航栏样式 */
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

/* 个人信息卡片样式 */
.profile-card {
  margin: 20rpx;
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.user-section {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.avatar-wrapper {
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
  width: 40rpx;
  height: 40rpx;
  background-color: #4AB8B8;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-avatar .iconfont {
  font-size: 24rpx;
  color: #ffffff;
}

.info-section {
  flex: 1;
}

.name-row {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.name {
  font-size: 36rpx;
  font-weight: bold;
  color: #333333;
  margin-right: 20rpx;
}

.tag {
  font-size: 22rpx;
  color: #FF9645;
  background-color: rgba(255, 150, 69, 0.1);
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
}

.id {
  font-size: 26rpx;
  color: #999999;
  margin-bottom: 16rpx;
  display: block;
}

.edit-info {
  display: inline-flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 8rpx 16rpx;
  border-radius: 30rpx;
}

.edit-text {
  font-size: 24rpx;
  color: #666666;
  margin-right: 6rpx;
}

.edit-info .iconfont {
  font-size: 24rpx;
  color: #666666;
}

.info-grid {
  display: flex;
  align-items: center;
  border-top: 1rpx solid #f0f0f0;
  padding-top: 30rpx;
}

.info-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.divider {
  width: 1rpx;
  height: 50rpx;
  background-color: #f0f0f0;
}

.info-item .iconfont {
  font-size: 40rpx;
  color: #4AB8B8;
  margin-bottom: 10rpx;
}

.item-text {
  font-size: 24rpx;
  color: #666666;
}

/* 健康数据卡片样式 */
.health-card {
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

.title-wrapper {
  display: flex;
  align-items: center;
}

.title-wrapper .iconfont {
  font-size: 36rpx;
  color: #4AB8B8;
  margin-right: 16rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.view-more {
  font-size: 24rpx;
  color: #999999;
}

.health-grid {
  display: flex;
  justify-content: space-around;
}

.health-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 0;
}

.health-item .value {
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 4rpx;
}

.value-normal {
  color: #4AB8B8;
}

.value-high {
  color: #FF6B6B;
}

.value-low {
  color: #FFA53D;
}

.health-item .unit {
  font-size: 22rpx;
  color: #999999;
  margin-bottom: 10rpx;
}

.health-item .label {
  font-size: 26rpx;
  color: #666666;
}

/* 功能列表样式 */
.function-list {
  margin: 20rpx;
}

.function-group {
  background-color: #ffffff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.group-header {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.group-header .iconfont {
  font-size: 36rpx;
  color: #4AB8B8;
  margin-right: 16rpx;
}

.group-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.function-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30rpx;
}

.function-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.function-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
}

.function-icon .iconfont {
  font-size: 40rpx;
  color: #ffffff;
}

.function-icon.health {
  background-color: #4AB8B8;
}

.function-icon.medicine {
  background-color: #FF9645;
}

.function-icon.diet {
  background-color: #64D28D;
}

.function-icon.sport {
  background-color: #7662E9;
}

.function-icon.appointment {
  background-color: #5887FF;
}

.function-icon.consult {
  background-color: #FC7A99;
}

.function-icon.report {
  background-color: #FFA53D;
}

.function-icon.prescription {
  background-color: #FF6B6B;
}

.function-title {
  font-size: 24rpx;
  color: #666666;
  text-align: center;
}

.function-item.full {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.function-item.full:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.function-item.full .iconfont:first-child {
  font-size: 40rpx;
  color: #4AB8B8;
  margin-right: 20rpx;
}

.function-item.full .title {
  flex: 1;
  font-size: 28rpx;
  color: #333333;
}

.function-item.full .icon-right {
  font-size: 32rpx;
  color: #cccccc;
}

/* 退出登录按钮样式 */
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
</style> 