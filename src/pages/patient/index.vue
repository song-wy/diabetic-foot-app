<template>
  <view class="container">
    <!-- 顶部栏 -->
    <view class="header">
      <view class="user-info">
        <image class="avatar" src="/src/static/yonghu.png"></image>
        <view class="user-details">
          <text class="username">张先生</text>
          <text class="user-id">患者ID: P12345</text>
        </view>
      </view>
      <view class="notification">
        <image class="notification-icon" src="/src/static/image/comment-dots (2).png"></image>
        <text class="badge">5</text>
      </view>
    </view>

    <!-- 健康数据概览 -->
    <view class="health-overview">
      <view class="health-card">
        <view class="health-title">
          <text>今日血糖</text>
          <text class="health-time">08:30 更新</text>
        </view>
        <view class="health-value">
          <text class="value">6.8</text>
          <text class="unit">mmol/L</text>
          <text class="status normal">正常</text>
        </view>
      </view>
      <view class="overview-chart">
        <image class="chart-image" src="/static/chart.svg" mode="aspectFit"></image>
      </view>
    </view>

    <!-- 功能模块 -->
    <view class="module-grid">
      <view class="module-item" @click="navigateTo('/pages/patient/blood-monitor')">
        <view class="module-icon blood">
          <image class="module-image" src="/static/blood-test.svg"></image>
        </view>
        <text class="module-name">血糖监测</text>
      </view>
      <view class="module-item" @click="navigateTo('/pages/patient/wound-care')">
        <view class="module-icon wound">
          <image class="module-image" src="/static/foot.svg"></image>
        </view>
        <text class="module-name">伤口护理</text>
      </view>
      <view class="module-item" @click="navigateTo('/pages/patient/medication')">
        <view class="module-icon medicine">
          <image class="module-image" src="/static/medicine.svg"></image>
          <text class="module-badge">2</text>
        </view>
        <text class="module-name">药物管理</text>
      </view>
    </view>

    <!-- 健康提醒 -->
    <view class="reminder-section">
      <view class="section-header">
        <text class="section-title">今日提醒</text>
        <text class="section-more" @click="navigateTo('/pages/patient/all-reminders')">查看全部 ></text>
      </view>
      <view class="reminder-list">
        <view class="reminder-item">
          <view class="reminder-time">
            <text class="time">08:00</text>
            <text class="time-marker">上午</text>
          </view>
          <view class="reminder-content medicine-remind">
            <view class="reminder-title">服药提醒</view>
            <view class="reminder-desc">二甲双胍 1片 餐前30分钟</view>
          </view>
          <view class="reminder-action">
            <text class="done">已完成</text>
          </view>
        </view>
        <view class="reminder-item">
          <view class="reminder-time">
            <text class="time">12:00</text>
            <text class="time-marker">中午</text>
          </view>
          <view class="reminder-content blood-remind">
            <view class="reminder-title">血糖监测</view>
            <view class="reminder-desc">餐后2小时血糖</view>
          </view>
          <view class="reminder-action">
            <text class="todo">待完成</text>
          </view>
        </view>
        <view class="reminder-item">
          <view class="reminder-time">
            <text class="time">15:00</text>
            <text class="time-marker">下午</text>
          </view>
          <view class="reminder-content foot-remind">
            <view class="reminder-title">足部护理</view>
            <view class="reminder-desc">伤口消毒与换药</view>
          </view>
          <view class="reminder-action">
            <text class="todo">待完成</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 健康资讯 -->
    <view class="news-section">
      <view class="section-header">
        <text class="section-title">健康资讯</text>
        <text class="section-more" @click="navigateTo('/pages/patient/all-news')">更多资讯 ></text>
      </view>
      <view class="news-list">
        <view class="news-item" @click="navigateTo('/pages/patient/news-detail?id=1')">
          <image class="news-image" src="/static/foot.svg" mode="aspectFill"></image>
          <view class="news-info">
            <text class="news-title">糖尿病足预防的五个关键步骤</text>
            <text class="news-desc">每天检查足部、保持足部清洁干燥、避免赤脚行走...</text>
            <view class="news-meta">
              <text class="news-tag">预防知识</text>
              <text class="news-time">2小时前</text>
            </view>
          </view>
        </view>
        <view class="news-item" @click="navigateTo('/pages/patient/news-detail?id=2')">
          <image class="news-image" src="/static/blood-test.svg" mode="aspectFill"></image>
          <view class="news-info">
            <text class="news-title">如何科学监测血糖，避免大幅波动</text>
            <text class="news-desc">正确使用血糖仪、合理安排监测时间、记录影响因素...</text>
            <view class="news-meta">
              <text class="news-tag">血糖管理</text>
              <text class="news-time">昨天</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航 -->
    <view class="tab-bar">
      <view class="tab-item active">
        <text class="iconfont icon-home"></text>
        <text class="tab-text">首页</text>
      </view>
      <view class="tab-item" @click="navigateTo('/pages/patient/data')">
        <text class="iconfont icon-home"></text>
        <text class="tab-text">数据</text>
      </view>
      <view class="tab-item" @click="navigateTo('/pages/patient/consult')">
        <text class="iconfont icon-user"></text>
        <text class="tab-text">问诊</text>
      </view>
      <view class="tab-item" @click="navigateTo('/pages/patient/mine')">
        <text class="iconfont icon-user"></text>
        <text class="tab-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '张先生',
      userId: 'P12345',
      bloodSugar: {
        value: 6.8,
        unit: 'mmol/L',
        status: 'normal',
        time: '08:30'
      },
      reminders: [
        {
          time: '08:00',
          period: '上午',
          title: '服药提醒',
          desc: '二甲双胍 1片 餐前30分钟',
          type: 'medicine',
          status: 'done'
        },
        {
          time: '12:00',
          period: '中午',
          title: '血糖监测',
          desc: '餐后2小时血糖',
          type: 'blood',
          status: 'todo'
        },
        {
          time: '15:00',
          period: '下午',
          title: '足部护理',
          desc: '伤口消毒与换药',
          type: 'foot',
          status: 'todo'
        }
      ],
      news: [
        {
          id: 1,
          title: '糖尿病足预防的五个关键步骤',
          desc: '每天检查足部、保持足部清洁干燥、避免赤脚行走...',
          tag: '预防知识',
          time: '2小时前',
          image: '/static/foot.svg'
        },
        {
          id: 2,
          title: '如何科学监测血糖，避免大幅波动',
          desc: '正确使用血糖仪、合理安排监测时间、记录影响因素...',
          tag: '血糖管理',
          time: '昨天',
          image: '/static/blood-test.svg'
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
  padding-bottom: 120rpx;
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

.notification-icon {
  width: 40rpx;
  height: 40rpx;
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

/* 健康数据概览 */
.health-overview {
  margin: 30rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.health-card {
  margin-bottom: 20rpx;
}

.health-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.health-time {
  font-size: 24rpx;
  color: #999;
}

.health-value {
  display: flex;
  align-items: baseline;
}

.value {
  font-size: 48rpx;
  font-weight: bold;
  margin-right: 10rpx;
}

.unit {
  font-size: 24rpx;
  color: #999;
  margin-right: 20rpx;
}

.status {
  font-size: 24rpx;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
}

.normal {
  background-color: rgba(74, 184, 184, 0.1);
  color: #4AB8B8;
}

.warning {
  background-color: rgba(255, 159, 67, 0.1);
  color: #FF9F43;
}

.danger {
  background-color: rgba(255, 107, 107, 0.1);
  color: #FF6B6B;
}

.overview-chart {
  height: 220rpx;
}

.chart-image {
  width: 100%;
  height: 100%;
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

.module-image {
  width: 100%;
  height: 100%;
}

.icon-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
}

.blood {
  background-color: #ffffff;
  border: 2rpx solid #4AB8B8;
}

.wound {
  background-color: #ffffff;
  border: 2rpx solid #FF6B6B;
}

.medicine {
  background-color: #ffffff;
  border: 2rpx solid #FF9F43;
}

.report {
  background-color: #5A8DEE;
  color: #fff;
}

.message {
  background-color: #ffffff;
  border: 2rpx solid #FF6B6B;
}

.education {
  background-color: #39DA8A;
  color: #fff;
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

/* 健康提醒 */
.reminder-section {
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

.reminder-list {
  display: flex;
  flex-direction: column;
}

.reminder-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.reminder-item:last-child {
  border-bottom: none;
}

.reminder-time {
  width: 100rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time {
  font-size: 28rpx;
  font-weight: bold;
}

.time-marker {
  font-size: 22rpx;
  color: #999;
}

.reminder-content {
  flex: 1;
  padding: 0 20rpx;
  border-left: 6rpx solid #ccc;
  margin-left: 20rpx;
}

.medicine-remind {
  border-color: #FF9F43;
}

.blood-remind {
  border-color: #4AB8B8;
}

.foot-remind {
  border-color: #FF6B6B;
}

.reminder-title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 5rpx;
}

.reminder-desc {
  font-size: 24rpx;
  color: #999;
}

.reminder-action {
  padding: 0 20rpx;
}

.done {
  color: #4AB8B8;
  font-size: 24rpx;
}

.todo {
  color: #FF9F43;
  font-size: 24rpx;
}

/* 健康资讯 */
.news-section {
  margin: 30rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.news-list {
  display: flex;
  flex-direction: column;
}

.news-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.news-item:last-child {
  border-bottom: none;
}

.news-image {
  width: 160rpx;
  height: 120rpx;
  border-radius: 8rpx;
  margin-right: 20rpx;
}

.news-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.news-title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  line-height: 1.4;
}

.news-desc {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 10rpx;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.news-tag {
  font-size: 22rpx;
  color: #4AB8B8;
  background-color: rgba(74, 184, 184, 0.1);
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
}

.news-time {
  font-size: 22rpx;
  color: #999;
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
  color: #4AB8B8;
}

.tab-icon {
  font-size: 36rpx;
}

.tab-text {
  font-size: 22rpx;
  margin-top: 4rpx;
}
</style> 