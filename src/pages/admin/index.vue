<template>
  <view class="container">
    <!-- 顶部栏 -->
    <view class="header">
      <view class="user-info">
        <image class="avatar" src="/static/avatar.svg"></image>
        <view class="user-details">
          <text class="username">赵管理员</text>
          <text class="user-id">系统管理员</text>
        </view>
      </view>
      <view class="notification">
        <text class="iconfont">通</text>
        <text class="badge">3</text>
      </view>
    </view>

    <!-- 系统概览 -->
    <view class="system-overview">
      <view class="chart-card">
        <view class="chart-header">
          <text class="chart-title">系统使用概览</text>
          <text class="chart-period">近7天</text>
        </view>
        <view class="chart-metrics">
          <view class="metric">
            <text class="metric-value">386</text>
            <text class="metric-label">活跃用户</text>
            <text class="metric-change increase">+12%</text>
          </view>
          <view class="metric">
            <text class="metric-value">1,432</text>
            <text class="metric-label">数据记录</text>
            <text class="metric-change increase">+8%</text>
          </view>
          <view class="metric">
            <text class="metric-value">92%</text>
            <text class="metric-label">系统稳定性</text>
            <text class="metric-change stable">持平</text>
          </view>
        </view>
        <view class="chart-area">
          <image class="chart-image" src="/static/chart.svg" mode="aspectFit"></image>
        </view>
      </view>
    </view>

    <!-- 功能模块 -->
    <view class="module-grid">
      <view class="module-item" @click="navigateTo('/pages/admin/user-management')">
        <view class="module-icon user-icon">
          <text class="icon-text">用</text>
        </view>
        <text class="module-name">用户管理</text>
      </view>
      <view class="module-item" @click="navigateTo('/pages/admin/data-management')">
        <view class="module-icon data-icon">
          <text class="icon-text">数</text>
        </view>
        <text class="module-name">数据管理</text>
      </view>
      <view class="module-item" @click="navigateTo('/pages/admin/system-settings')">
        <view class="module-icon settings-icon">
          <text class="icon-text">设</text>
        </view>
        <text class="module-name">系统设置</text>
      </view>
      <view class="module-item" @click="navigateTo('/pages/admin/statistics')">
        <view class="module-icon stats-icon">
          <text class="icon-text">统</text>
        </view>
        <text class="module-name">统计分析</text>
      </view>
      <view class="module-item" @click="navigateTo('/pages/admin/resource-management')">
        <view class="module-icon resource-icon">
          <text class="icon-text">资</text>
          <text class="module-badge">5</text>
        </view>
        <text class="module-name">资源管理</text>
      </view>
      <view class="module-item" @click="navigateTo('/pages/admin/feedback')">
        <view class="module-icon feedback-icon">
          <text class="icon-text">反</text>
          <text class="module-badge">3</text>
        </view>
        <text class="module-name">用户反馈</text>
      </view>
    </view>

    <!-- 系统告警 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">系统告警</text>
        <text class="section-more" @click="navigateTo('/pages/admin/all-alerts')">查看全部 ></text>
      </view>
      <view class="alert-list">
        <view class="alert-item" @click="navigateTo('/pages/admin/alert-detail?id=1')">
          <view class="alert-icon warning">
            <text class="alert-icon-text">警</text>
          </view>
          <view class="alert-content">
            <view class="alert-title-row">
              <text class="alert-title">数据库存储空间不足</text>
              <text class="alert-time">2小时前</text>
            </view>
            <text class="alert-desc">系统数据库存储空间低于20%，请及时清理或扩容</text>
            <view class="alert-footer">
              <text class="alert-tag">存储</text>
              <text class="alert-severity warning">中等</text>
            </view>
          </view>
        </view>
        <view class="alert-item" @click="navigateTo('/pages/admin/alert-detail?id=2')">
          <view class="alert-icon critical">
            <text class="alert-icon-text">危</text>
          </view>
          <view class="alert-content">
            <view class="alert-title-row">
              <text class="alert-title">数据备份失败</text>
              <text class="alert-time">昨天</text>
            </view>
            <text class="alert-desc">昨日自动备份任务失败，请检查备份配置和存储空间</text>
            <view class="alert-footer">
              <text class="alert-tag">备份</text>
              <text class="alert-severity critical">严重</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 待审核资源 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">待审核资源</text>
        <text class="section-more" @click="navigateTo('/pages/admin/all-pending-resources')">查看全部 ></text>
      </view>
      <view class="resource-list">
        <view class="resource-item" @click="navigateTo('/pages/admin/resource-detail?id=1')">
          <image class="resource-thumb" src="/static/foot.svg" mode="aspectFill"></image>
          <view class="resource-info">
            <text class="resource-title">糖尿病足照护指南 - 视频教程</text>
            <view class="resource-meta">
              <text class="resource-type">视频</text>
              <text class="resource-size">32.5MB</text>
              <text class="resource-author">李医生</text>
            </view>
            <text class="resource-desc">详细介绍糖尿病足的照护方法和注意事项的视频教程</text>
            <view class="resource-actions">
              <text class="action-btn approve">审核通过</text>
              <text class="action-btn reject">拒绝</text>
            </view>
          </view>
        </view>
        <view class="resource-item" @click="navigateTo('/pages/admin/resource-detail?id=2')">
          <image class="resource-thumb" src="/static/blood-test.svg" mode="aspectFill"></image>
          <view class="resource-info">
            <text class="resource-title">血糖监测方法 - PDF指南</text>
            <view class="resource-meta">
              <text class="resource-type">PDF</text>
              <text class="resource-size">4.8MB</text>
              <text class="resource-author">王护士</text>
            </view>
            <text class="resource-desc">专业的血糖监测方法和结果解读指南</text>
            <view class="resource-actions">
              <text class="action-btn approve">审核通过</text>
              <text class="action-btn reject">拒绝</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 用户反馈 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">最新用户反馈</text>
        <text class="section-more" @click="navigateTo('/pages/admin/all-feedback')">查看全部 ></text>
      </view>
      <view class="feedback-list">
        <view class="feedback-item" @click="navigateTo('/pages/admin/feedback-detail?id=1')">
          <view class="feedback-header">
            <view class="feedback-user">
              <image class="feedback-avatar" src="/static/avatar.svg"></image>
              <text class="feedback-username">张先生</text>
            </view>
            <text class="feedback-time">2小时前</text>
          </view>
          <view class="feedback-content">
            <text class="feedback-text">血糖记录页面在输入数据时经常出现卡顿，希望能优化一下性能</text>
            <view class="feedback-footer">
              <text class="feedback-type">功能问题</text>
              <text class="feedback-status pending">待处理</text>
            </view>
          </view>
        </view>
        <view class="feedback-item" @click="navigateTo('/pages/admin/feedback-detail?id=2')">
          <view class="feedback-header">
            <view class="feedback-user">
              <image class="feedback-avatar" src="/static/avatar.svg"></image>
              <text class="feedback-username">李医生</text>
            </view>
            <text class="feedback-time">昨天</text>
          </view>
          <view class="feedback-content">
            <text class="feedback-text">建议在健康报告生成页面增加更多模板选项，当前模板种类较少</text>
            <view class="feedback-footer">
              <text class="feedback-type">功能建议</text>
              <text class="feedback-status processed">已处理</text>
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
      <view class="tab-item" @click="navigateTo('/pages/admin/data')">
        <text class="tab-icon">数</text>
        <text class="tab-text">数据</text>
      </view>
      <view class="tab-item" @click="navigateTo('/pages/admin/users')">
        <text class="tab-icon">用</text>
        <text class="tab-text">用户</text>
      </view>
      <view class="tab-item" @click="navigateTo('/pages/admin/profile')">
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
        name: '赵管理员',
        role: '系统管理员'
      },
      systemOverview: {
        activeUsers: {
          value: 386,
          change: '+12%',
          trend: 'increase'
        },
        dataRecords: {
          value: 1432,
          change: '+8%',
          trend: 'increase'
        },
        stability: {
          value: '92%',
          change: '持平',
          trend: 'stable'
        }
      },
      alerts: [
        {
          id: 1,
          title: '数据库存储空间不足',
          desc: '系统数据库存储空间低于20%，请及时清理或扩容',
          time: '2小时前',
          type: '存储',
          severity: 'warning'
        },
        {
          id: 2,
          title: '数据备份失败',
          desc: '昨日自动备份任务失败，请检查备份配置和存储空间',
          time: '昨天',
          type: '备份',
          severity: 'critical'
        }
      ],
      pendingResources: [
        {
          id: 1,
          title: '糖尿病足照护指南 - 视频教程',
          type: '视频',
          size: '32.5MB',
          author: '李医生',
          desc: '详细介绍糖尿病足的照护方法和注意事项的视频教程',
          thumb: '/static/foot.svg'
        },
        {
          id: 2,
          title: '血糖监测方法 - PDF指南',
          type: 'PDF',
          size: '4.8MB',
          author: '王护士',
          desc: '专业的血糖监测方法和结果解读指南',
          thumb: '/static/blood-test.svg'
        }
      ],
      feedback: [
        {
          id: 1,
          username: '张先生',
          time: '2小时前',
          text: '血糖记录页面在输入数据时经常出现卡顿，希望能优化一下性能',
          type: '功能问题',
          status: 'pending'
        },
        {
          id: 2,
          username: '李医生',
          time: '昨天',
          text: '建议在健康报告生成页面增加更多模板选项，当前模板种类较少',
          type: '功能建议',
          status: 'processed'
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

/* 系统概览卡片 */
.system-overview {
  margin: 30rpx;
}

.chart-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.chart-title {
  font-size: 32rpx;
  font-weight: bold;
}

.chart-period {
  font-size: 24rpx;
  color: #999;
  background-color: #f5f5f5;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
}

.chart-metrics {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.metric {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.metric-value {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 5rpx;
}

.metric-label {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 5rpx;
}

.metric-change {
  font-size: 22rpx;
}

.increase {
  color: #28C76F;
}

.decrease {
  color: #FF6B6B;
}

.stable {
  color: #666EE8;
}

.chart-area {
  height: 200rpx;
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

.icon-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
}

.user-icon {
  background-color: #666EE8;
}

.data-icon {
  background-color: #28C76F;
}

.settings-icon {
  background-color: #1E9FF2;
}

.stats-icon {
  background-color: #FF9F43;
}

.resource-icon {
  background-color: #00CFB4;
}

.feedback-icon {
  background-color: #FF6B6B;
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

/* 系统告警 */
.alert-list {
  display: flex;
  flex-direction: column;
}

.alert-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.alert-item:last-child {
  border-bottom: none;
}

.alert-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20rpx;
}

.alert-icon-text {
  color: #fff;
  font-size: 30rpx;
  font-weight: bold;
}

.warning {
  background-color: #FF9F43;
}

.critical {
  background-color: #FF6B6B;
}

.alert-content {
  flex: 1;
}

.alert-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.alert-title {
  font-size: 28rpx;
  font-weight: bold;
}

.alert-time {
  font-size: 24rpx;
  color: #999;
}

.alert-desc {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 10rpx;
  line-height: 1.4;
}

.alert-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.alert-tag {
  font-size: 22rpx;
  color: #1E9FF2;
  background-color: rgba(30, 159, 242, 0.1);
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
}

.alert-severity {
  font-size: 22rpx;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
}

.alert-severity.warning {
  color: #FF9F43;
  background-color: rgba(255, 159, 67, 0.1);
}

.alert-severity.critical {
  color: #FF6B6B;
  background-color: rgba(255, 107, 107, 0.1);
}

/* 待审核资源 */
.resource-list {
  display: flex;
  flex-direction: column;
}

.resource-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.resource-item:last-child {
  border-bottom: none;
}

.resource-thumb {
  width: 120rpx;
  height: 120rpx;
  border-radius: 10rpx;
  margin-right: 20rpx;
}

.resource-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.resource-title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.resource-meta {
  display: flex;
  margin-bottom: 10rpx;
}

.resource-type, .resource-size, .resource-author {
  font-size: 22rpx;
  color: #999;
  margin-right: 15rpx;
}

.resource-desc {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 15rpx;
  line-height: 1.4;
}

.resource-actions {
  display: flex;
}

.action-btn {
  font-size: 24rpx;
  padding: 6rpx 20rpx;
  border-radius: 4rpx;
  margin-right: 15rpx;
}

.approve {
  color: #28C76F;
  background-color: rgba(40, 199, 111, 0.1);
}

.reject {
  color: #FF6B6B;
  background-color: rgba(255, 107, 107, 0.1);
}

/* 用户反馈 */
.feedback-list {
  display: flex;
  flex-direction: column;
}

.feedback-item {
  display: flex;
  flex-direction: column;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.feedback-item:last-child {
  border-bottom: none;
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15rpx;
}

.feedback-user {
  display: flex;
  align-items: center;
}

.feedback-avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 30rpx;
  margin-right: 15rpx;
}

.feedback-username {
  font-size: 26rpx;
  font-weight: bold;
}

.feedback-time {
  font-size: 24rpx;
  color: #999;
}

.feedback-content {
  flex: 1;
}

.feedback-text {
  font-size: 26rpx;
  color: #333;
  margin-bottom: 15rpx;
  line-height: 1.4;
}

.feedback-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.feedback-type {
  font-size: 22rpx;
  color: #666EE8;
  background-color: rgba(102, 110, 232, 0.1);
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
}

.feedback-status {
  font-size: 22rpx;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
}

.pending {
  color: #FF9F43;
  background-color: rgba(255, 159, 67, 0.1);
}

.processed {
  color: #28C76F;
  background-color: rgba(40, 199, 111, 0.1);
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