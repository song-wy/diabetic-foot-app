<template>
  <view class="container">
    <!-- 顶部栏 -->
    <view class="header">
      <view class="user-info">
        <image class="avatar" src="/static/avatar.svg"></image>
        <view class="user-details">
          <text class="username">李医生</text>
          <text class="user-id">主治医师 | 内分泌科</text>
        </view>
      </view>
      <view class="notification">
        <text class="iconfont">通</text>
        <text class="badge">3</text>
      </view>
    </view>

    <!-- 工作概览 -->
    <view class="work-overview">
      <view class="overview-item">
        <text class="overview-value">42</text>
        <text class="overview-label">患者总数</text>
      </view>
      <view class="separator"></view>
      <view class="overview-item">
        <text class="overview-value">5</text>
        <text class="overview-label">今日复诊</text>
      </view>
      <view class="separator"></view>
      <view class="overview-item">
        <text class="overview-value">8</text>
        <text class="overview-label">待处理消息</text>
      </view>
    </view>

    <!-- 功能模块 -->
    <view class="module-grid">
      <view class="module-item" @click="navigateTo('/pages/doctor/patient-list')">
        <view class="module-icon patient-icon">
          <text class="icon-text">患</text>
        </view>
        <text class="module-name">患者管理</text>
      </view>
      <view class="module-item" @click="navigateTo('/pages/doctor/condition-track')">
        <view class="module-icon track-icon">
          <text class="icon-text">跟</text>
        </view>
        <text class="module-name">病情跟踪</text>
      </view>
      <view class="module-item" @click="navigateTo('/pages/doctor/prescription')">
        <view class="module-icon prescription-icon">
          <text class="icon-text">医</text>
          <text class="module-badge">3</text>
        </view>
        <text class="module-name">医嘱下达</text>
      </view>
      <view class="module-item" @click="navigateTo('/pages/doctor/health-report')">
        <view class="module-icon report-icon">
          <text class="icon-text">报</text>
        </view>
        <text class="module-name">健康报告</text>
      </view>
      <view class="module-item" @click="navigateTo('/pages/doctor/messages')">
        <view class="module-icon message-icon">
          <text class="icon-text">消</text>
          <text class="module-badge">8</text>
        </view>
        <text class="module-name">消息通知</text>
      </view>
      <view class="module-item" @click="navigateTo('/pages/doctor/data-analysis')">
        <view class="module-icon analysis-icon">
          <text class="icon-text">析</text>
        </view>
        <text class="module-name">数据分析</text>
      </view>
    </view>

    <!-- 今日复诊 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">今日复诊（5）</text>
        <text class="section-more" @click="navigateTo('/pages/doctor/all-appointments')">查看全部 ></text>
      </view>
      <view class="appointment-list">
        <view class="appointment-item" @click="navigateTo('/pages/doctor/patient-detail?id=1')">
          <image class="patient-avatar" src="/static/avatar.svg"></image>
          <view class="appointment-info">
            <view class="patient-info">
              <text class="patient-name">张先生</text>
              <text class="patient-tag">糖尿病足</text>
            </view>
            <view class="appointment-detail">
              <text class="appointment-time">09:30-10:00</text>
              <text class="appointment-status waiting">等待中</text>
            </view>
          </view>
          <view class="appointment-action">
            <text class="action-btn view">查看</text>
          </view>
        </view>
        <view class="appointment-item" @click="navigateTo('/pages/doctor/patient-detail?id=2')">
          <image class="patient-avatar" src="/static/avatar.svg"></image>
          <view class="appointment-info">
            <view class="patient-info">
              <text class="patient-name">王女士</text>
              <text class="patient-tag">2型糖尿病</text>
            </view>
            <view class="appointment-detail">
              <text class="appointment-time">10:30-11:00</text>
              <text class="appointment-status upcoming">即将到来</text>
            </view>
          </view>
          <view class="appointment-action">
            <text class="action-btn view">查看</text>
          </view>
        </view>
        <view class="appointment-item" @click="navigateTo('/pages/doctor/patient-detail?id=3')">
          <image class="patient-avatar" src="/static/avatar.svg"></image>
          <view class="appointment-info">
            <view class="patient-info">
              <text class="patient-name">刘先生</text>
              <text class="patient-tag">糖尿病肾病</text>
            </view>
            <view class="appointment-detail">
              <text class="appointment-time">14:00-14:30</text>
              <text class="appointment-status upcoming">即将到来</text>
            </view>
          </view>
          <view class="appointment-action">
            <text class="action-btn view">查看</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 需关注患者 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">需关注患者</text>
        <text class="section-more" @click="navigateTo('/pages/doctor/attention-patients')">查看全部 ></text>
      </view>
      <view class="attention-list">
        <view class="attention-item" @click="navigateTo('/pages/doctor/patient-detail?id=4')">
          <view class="attention-level high"></view>
          <image class="patient-avatar" src="/static/avatar.svg"></image>
          <view class="attention-info">
            <view class="attention-name-row">
              <text class="patient-name">赵先生</text>
              <text class="attention-tag">高血糖警报</text>
            </view>
            <view class="attention-detail">
              <text class="attention-value">血糖: 12.8 mmol/L</text>
              <text class="attention-time">2小时前</text>
            </view>
          </view>
          <view class="attention-action">
            <text class="action-btn contact">联系</text>
          </view>
        </view>
        <view class="attention-item" @click="navigateTo('/pages/doctor/patient-detail?id=5')">
          <view class="attention-level medium"></view>
          <image class="patient-avatar" src="/static/avatar.svg"></image>
          <view class="attention-info">
            <view class="attention-name-row">
              <text class="patient-name">钱女士</text>
              <text class="attention-tag">伤口恶化</text>
            </view>
            <view class="attention-detail">
              <text class="attention-value">伤口面积: 2.3cm²</text>
              <text class="attention-time">昨天</text>
            </view>
          </view>
          <view class="attention-action">
            <text class="action-btn contact">联系</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 待处理医嘱 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">待处理医嘱（3）</text>
        <text class="section-more" @click="navigateTo('/pages/doctor/all-prescriptions')">查看全部 ></text>
      </view>
      <view class="prescription-list">
        <view class="prescription-item" @click="navigateTo('/pages/doctor/prescription-detail?id=1')">
          <view class="prescription-icon">
            <image class="prescription-image" src="/static/medicine.svg"></image>
          </view>
          <view class="prescription-info">
            <text class="prescription-name">张先生 - 用药调整申请</text>
            <text class="prescription-desc">申请将二甲双胍用量由每日两次调整为每日三次</text>
            <view class="prescription-meta">
              <text class="prescription-time">2小时前</text>
              <text class="prescription-status urgent">紧急</text>
            </view>
          </view>
        </view>
        <view class="prescription-item" @click="navigateTo('/pages/doctor/prescription-detail?id=2')">
          <view class="prescription-icon">
            <image class="prescription-image" src="/static/blood-test.svg"></image>
          </view>
          <view class="prescription-info">
            <text class="prescription-name">王女士 - 检验结果确认</text>
            <text class="prescription-desc">糖化血红蛋白检验结果需要医生确认</text>
            <view class="prescription-meta">
              <text class="prescription-time">昨天</text>
              <text class="prescription-status normal">普通</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航 -->
    <view class="tab-bar">
      <view class="tab-item active">
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
      <view class="tab-item" @click="navigateTo('/pages/doctor/profile')">
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
        name: '李医生',
        title: '主治医师',
        department: '内分泌科'
      },
      overview: {
        totalPatients: 42,
        todayAppointments: 5,
        unreadMessages: 8
      },
      appointments: [
        {
          id: 1,
          name: '张先生',
          condition: '糖尿病足',
          time: '09:30-10:00',
          status: 'waiting'
        },
        {
          id: 2,
          name: '王女士',
          condition: '2型糖尿病',
          time: '10:30-11:00',
          status: 'upcoming'
        },
        {
          id: 3,
          name: '刘先生',
          condition: '糖尿病肾病',
          time: '14:00-14:30',
          status: 'upcoming'
        }
      ],
      attentionPatients: [
        {
          id: 4,
          name: '赵先生',
          issue: '高血糖警报',
          detail: '血糖: 12.8 mmol/L',
          time: '2小时前',
          level: 'high'
        },
        {
          id: 5,
          name: '钱女士',
          issue: '伤口恶化',
          detail: '伤口面积: 2.3cm²',
          time: '昨天',
          level: 'medium'
        }
      ],
      prescriptions: [
        {
          id: 1,
          name: '张先生',
          type: '用药调整申请',
          desc: '申请将二甲双胍用量由每日两次调整为每日三次',
          time: '2小时前',
          status: 'urgent',
          icon: '/static/medicine.svg'
        },
        {
          id: 2,
          name: '王女士',
          type: '检验结果确认',
          desc: '糖化血红蛋白检验结果需要医生确认',
          time: '昨天',
          status: 'normal',
          icon: '/static/blood-test.svg'
        }
      ]
    }
  },
  methods: {
    navigateTo(url) {
      uni.navigateTo({
        url: url
      });
    }
  }
}
</script>

<style>
/* 全局样式 */
page {
  background-color: #f7f8fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  color: #333;
  font-size: 28rpx;
}

.container {
  padding-bottom: a120rpx;
}

/* 顶部栏 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  background-color: #fff;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 90rpx;
  height: 90rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 5rpx;
}

.user-id {
  font-size: 24rpx;
  color: #999;
}

.notification {
  position: relative;
  width: 60rpx;
  height: 60rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.badge {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  background-color: #FF6B6B;
  color: #fff;
  font-size: 20rpx;
  min-width: 32rpx;
  height: 32rpx;
  border-radius: 16rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 6rpx;
}

/* 工作概览 */
.work-overview {
  margin: 30rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 25rpx 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.overview-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.overview-value {
  font-size: 40rpx;
  font-weight: bold;
  color: #5A8DEE;
  margin-bottom: 8rpx;
}

.overview-label {
  font-size: 24rpx;
  color: #999;
}

.separator {
  width: 2rpx;
  height: 60rpx;
  background-color: #eee;
}

/* 功能模块 */
.module-grid {
  display: flex;
  flex-wrap: wrap;
  padding: 20rpx 15rpx;
  background-color: #fff;
  margin: 30rpx;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.module-item {
  width: 33.33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 0;
}

.module-icon {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15rpx;
  position: relative;
}

.icon-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
}

.patient-icon {
  background-color: #5A8DEE;
}

.track-icon {
  background-color: #39DA8A;
}

.prescription-icon {
  background-color: #FF9F43;
}

.report-icon {
  background-color: #00CFDD;
}

.message-icon {
  background-color: #FF6B6B;
}

.analysis-icon {
  background-color: #886CFF;
}

.module-badge {
  position: absolute;
  top: -5rpx;
  right: -5rpx;
  background-color: #FF6B6B;
  color: #fff;
  font-size: 20rpx;
  min-width: 30rpx;
  height: 30rpx;
  border-radius: 15rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 6rpx;
}

.module-name {
  font-size: 26rpx;
  color: #333;
}

/* 通用区域样式 */
.section {
  margin: 30rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
}

.section-more {
  font-size: 24rpx;
  color: #999;
}

/* 复诊列表 */
.appointment-list {
  display: flex;
  flex-direction: column;
}

.appointment-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.appointment-item:last-child {
  border-bottom: none;
}

.patient-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
  margin-right: 20rpx;
}

.appointment-info {
  flex: 1;
}

.patient-info {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.patient-name {
  font-size: 28rpx;
  font-weight: bold;
  margin-right: 15rpx;
}

.patient-tag {
  font-size: 22rpx;
  color: #5A8DEE;
  background-color: rgba(90, 141, 238, 0.1);
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
}

.appointment-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.appointment-time {
  font-size: 24rpx;
  color: #999;
}

.appointment-status {
  font-size: 24rpx;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
}

.waiting {
  color: #FF6B6B;
  background-color: rgba(255, 107, 107, 0.1);
}

.upcoming {
  color: #FF9F43;
  background-color: rgba(255, 159, 67, 0.1);
}

.completed {
  color: #39DA8A;
  background-color: rgba(57, 218, 138, 0.1);
}

.appointment-action {
  margin-left: 20rpx;
}

.action-btn {
  font-size: 24rpx;
  padding: 8rpx 20rpx;
  border-radius: 30rpx;
}

.view {
  color: #5A8DEE;
  background-color: rgba(90, 141, 238, 0.1);
}

.contact {
  color: #FF9F43;
  background-color: rgba(255, 159, 67, 0.1);
}

/* 需关注患者 */
.attention-list {
  display: flex;
  flex-direction: column;
}

.attention-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.attention-item:last-child {
  border-bottom: none;
}

.attention-level {
  width: 10rpx;
  height: 60rpx;
  border-radius: 5rpx;
  margin-right: 15rpx;
}

.high {
  background-color: #FF6B6B;
}

.medium {
  background-color: #FF9F43;
}

.low {
  background-color: #39DA8A;
}

.attention-info {
  flex: 1;
  margin-left: 15rpx;
}

.attention-name-row {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.attention-tag {
  font-size: 22rpx;
  color: #FF6B6B;
  background-color: rgba(255, 107, 107, 0.1);
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
  margin-left: 15rpx;
}

.attention-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.attention-value {
  font-size: 24rpx;
  color: #333;
}

.attention-time {
  font-size: 24rpx;
  color: #999;
}

/* 待处理医嘱 */
.prescription-list {
  display: flex;
  flex-direction: column;
}

.prescription-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.prescription-item:last-child {
  border-bottom: none;
}

.prescription-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20rpx;
}

.prescription-image {
  width: 60rpx;
  height: 60rpx;
}

.prescription-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.prescription-name {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.prescription-desc {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 10rpx;
  line-height: 1.4;
}

.prescription-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.prescription-time {
  font-size: 22rpx;
  color: #999;
}

.prescription-status {
  font-size: 22rpx;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
}

.urgent {
  color: #FF6B6B;
  background-color: rgba(255, 107, 107, 0.1);
}

.normal {
  color: #5A8DEE;
  background-color: rgba(90, 141, 238, 0.1);
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