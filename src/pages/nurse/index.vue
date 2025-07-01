<template>
  <view class="container">
    <!-- 顶部栏 -->
    <view class="header">
      <view class="user-info">
        <image class="avatar" src="/static/avatar.svg"></image>
        <view class="user-details">
          <text class="username">陈护士</text>
          <text class="user-id">护理师 | 内分泌科</text>
        </view>
      </view>
      <view class="notification">
        <text class="iconfont">通</text>
        <text class="badge">7</text>
      </view>
    </view>

    <!-- 工作概览 -->
    <view class="work-overview">
      <view class="overview-item">
        <text class="overview-value">18</text>
        <text class="overview-label">今日待访</text>
      </view>
      <view class="separator"></view>
      <view class="overview-item">
        <text class="overview-value">6</text>
        <text class="overview-label">已完成</text>
      </view>
      <view class="separator"></view>
      <view class="overview-item">
        <text class="overview-value">12</text>
        <text class="overview-label">未完成</text>
      </view>
    </view>

    <!-- 功能模块 -->
    <view class="module-grid">
      <view class="module-item" @click="navigateTo('/pages/nurse/patient-data')">
        <view class="module-icon data-icon">
          <text class="icon-text">录</text>
        </view>
        <text class="module-name">数据录入</text>
      </view>
      <view class="module-item" @click="navigateTo('/pages/nurse/patient-visit')">
        <view class="module-icon visit-icon">
          <text class="icon-text">访</text>
          <text class="module-badge">12</text>
        </view>
        <text class="module-name">患者回访</text>
      </view>
      <view class="module-item" @click="navigateTo('/pages/nurse/health-education')">
        <view class="module-icon education-icon">
          <text class="icon-text">教</text>
        </view>
        <text class="module-name">健康教育</text>
      </view>
      <view class="module-item" @click="navigateTo('/pages/nurse/messages')">
        <view class="module-icon message-icon">
          <text class="icon-text">消</text>
          <text class="module-badge">7</text>
        </view>
        <text class="module-name">消息通知</text>
      </view>
      <view class="module-item" @click="navigateTo('/pages/nurse/data-statistics')">
        <view class="module-icon statistics-icon">
          <text class="icon-text">统</text>
        </view>
        <text class="module-name">数据统计</text>
      </view>
      <view class="module-item" @click="navigateTo('/pages/nurse/visit-record')">
        <view class="module-icon record-icon">
          <text class="icon-text">记</text>
        </view>
        <text class="module-name">回访登记</text>
      </view>
    </view>

    <!-- 今日任务 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">今日待访任务</text>
        <text class="section-more" @click="navigateTo('/pages/nurse/all-tasks')">查看全部 ></text>
      </view>
      <view class="task-list">
        <view class="task-item" @click="navigateTo('/pages/nurse/task-detail?id=1')">
          <view class="task-time-line">
            <view class="task-time">
              <text class="time">09:00</text>
              <text class="time-marker">上午</text>
            </view>
            <view class="vertical-line"></view>
          </view>
          <view class="task-content">
            <view class="task-header">
              <text class="task-title">张先生 - 糖尿病足检查</text>
              <text class="task-status todo">待完成</text>
            </view>
            <view class="task-info">
              <text class="task-detail">检查伤口愈合情况，记录血糖值</text>
              <view class="task-tags">
                <text class="task-tag">血糖监测</text>
                <text class="task-tag">伤口护理</text>
              </view>
            </view>
            <view class="task-location">
              <text class="location-text">地址：朝阳区建国路88号 望京花园5号楼2单元</text>
            </view>
          </view>
        </view>
        <view class="task-item" @click="navigateTo('/pages/nurse/task-detail?id=2')">
          <view class="task-time-line">
            <view class="task-time">
              <text class="time">11:00</text>
              <text class="time-marker">上午</text>
            </view>
            <view class="vertical-line"></view>
          </view>
          <view class="task-content">
            <view class="task-header">
              <text class="task-title">李女士 - 用药指导</text>
              <text class="task-status done">已完成</text>
            </view>
            <view class="task-info">
              <text class="task-detail">指导正确注射胰岛素，检查血糖监测情况</text>
              <view class="task-tags">
                <text class="task-tag">用药指导</text>
                <text class="task-tag">血糖监测</text>
              </view>
            </view>
            <view class="task-location">
              <text class="location-text">地址：海淀区万柳西路1号 金色家园3号楼1单元</text>
            </view>
          </view>
        </view>
        <view class="task-item" @click="navigateTo('/pages/nurse/task-detail?id=3')">
          <view class="task-time-line">
            <view class="task-time">
              <text class="time">14:30</text>
              <text class="time-marker">下午</text>
            </view>
            <view class="vertical-line"></view>
          </view>
          <view class="task-content">
            <view class="task-header">
              <text class="task-title">王先生 - 健康教育</text>
              <text class="task-status todo">待完成</text>
            </view>
            <view class="task-info">
              <text class="task-detail">饮食指导，运动方案制定</text>
              <view class="task-tags">
                <text class="task-tag">健康教育</text>
                <text class="task-tag">饮食指导</text>
              </view>
            </view>
            <view class="task-location">
              <text class="location-text">地址：东城区东四十条35号 福华园7号楼3单元</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 待录入数据 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">待录入数据</text>
        <text class="section-more" @click="navigateTo('/pages/nurse/all-data-entry')">查看全部 ></text>
      </view>
      <view class="data-entry-list">
        <view class="data-entry-item" @click="navigateTo('/pages/nurse/data-entry?type=blood&id=1')">
          <view class="data-icon">
            <image class="data-image" src="/static/blood-test.svg"></image>
          </view>
          <view class="data-info">
            <text class="data-name">张先生 - 血糖数据</text>
            <text class="data-desc">昨日回访的血糖监测数据尚未录入</text>
            <view class="data-meta">
              <text class="data-time">截止时间：今日17:00前</text>
              <text class="data-status urgent">紧急</text>
            </view>
          </view>
        </view>
        <view class="data-entry-item" @click="navigateTo('/pages/nurse/data-entry?type=wound&id=2')">
          <view class="data-icon">
            <image class="data-image" src="/static/foot.svg"></image>
          </view>
          <view class="data-info">
            <text class="data-name">王先生 - 伤口情况</text>
            <text class="data-desc">需录入伤口面积、感染情况和恢复程度</text>
            <view class="data-meta">
              <text class="data-time">截止时间：明日12:00前</text>
              <text class="data-status normal">普通</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 健康教育资料 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">健康教育资料</text>
        <text class="section-more" @click="navigateTo('/pages/nurse/all-education-materials')">查看全部 ></text>
      </view>
      <view class="education-list">
        <view class="education-item" @click="navigateTo('/pages/nurse/education-detail?id=1')">
          <image class="education-image" src="/static/foot.svg" mode="aspectFill"></image>
          <view class="education-info">
            <text class="education-title">糖尿病足日常护理指南</text>
            <text class="education-desc">包含糖尿病足的日常护理要点、预防措施和注意事项</text>
            <view class="education-meta">
              <text class="education-type">护理指南</text>
              <text class="education-count">已发放: 28次</text>
            </view>
          </view>
        </view>
        <view class="education-item" @click="navigateTo('/pages/nurse/education-detail?id=2')">
          <image class="education-image" src="/static/blood-test.svg" mode="aspectFill"></image>
          <view class="education-info">
            <text class="education-title">血糖自我监测图解手册</text>
            <text class="education-desc">通过图解方式详细介绍血糖仪的使用方法和注意事项</text>
            <view class="education-meta">
              <text class="education-type">使用指南</text>
              <text class="education-count">已发放: 35次</text>
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
      <view class="tab-item" @click="navigateTo('/pages/nurse/follow')">
        <text class="tab-icon">访</text>
        <text class="tab-text">回访</text>
      </view>
      <view class="tab-item" @click="navigateTo('/pages/nurse/patients')">
        <text class="tab-icon">患</text>
        <text class="tab-text">患者</text>
      </view>
      <view class="tab-item" @click="navigateTo('/pages/nurse/profile')">
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
        name: '陈护士',
        title: '护理师',
        department: '内分泌科'
      },
      workOverview: {
        todayTasks: 18,
        completed: 6,
        remaining: 12
      },
      tasks: [
        {
          id: 1,
          patientName: '张先生',
          taskType: '糖尿病足检查',
          time: '09:00',
          period: '上午',
          status: 'todo',
          detail: '检查伤口愈合情况，记录血糖值',
          tags: ['血糖监测', '伤口护理'],
          location: '朝阳区建国路88号 望京花园5号楼2单元'
        },
        {
          id: 2,
          patientName: '李女士',
          taskType: '用药指导',
          time: '11:00',
          period: '上午',
          status: 'done',
          detail: '指导正确注射胰岛素，检查血糖监测情况',
          tags: ['用药指导', '血糖监测'],
          location: '海淀区万柳西路1号 金色家园3号楼1单元'
        },
        {
          id: 3,
          patientName: '王先生',
          taskType: '健康教育',
          time: '14:30',
          period: '下午',
          status: 'todo',
          detail: '饮食指导，运动方案制定',
          tags: ['健康教育', '饮食指导'],
          location: '东城区东四十条35号 福华园7号楼3单元'
        }
      ],
      dataEntries: [
        {
          id: 1,
          patientName: '张先生',
          dataType: '血糖数据',
          desc: '昨日回访的血糖监测数据尚未录入',
          deadline: '今日17:00前',
          status: 'urgent',
          icon: '/static/blood-test.svg'
        },
        {
          id: 2,
          patientName: '王先生',
          dataType: '伤口情况',
          desc: '需录入伤口面积、感染情况和恢复程度',
          deadline: '明日12:00前',
          status: 'normal',
          icon: '/static/foot.svg'
        }
      ],
      educationMaterials: [
        {
          id: 1,
          title: '糖尿病足日常护理指南',
          desc: '包含糖尿病足的日常护理要点、预防措施和注意事项',
          type: '护理指南',
          count: 28,
          image: '/static/foot.svg'
        },
        {
          id: 2,
          title: '血糖自我监测图解手册',
          desc: '通过图解方式详细介绍血糖仪的使用方法和注意事项',
          type: '使用指南',
          count: 35,
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
  color: #00CFB4;
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

.data-icon {
  background-color: #00CFB4;
}

.visit-icon {
  background-color: #FF9F43;
}

.education-icon {
  background-color: #37B2C5;
}

.message-icon {
  background-color: #FF6B6B;
}

.statistics-icon {
  background-color: #666EE8;
}

.record-icon {
  background-color: #28C76F;
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

/* 任务列表 */
.task-list {
  display: flex;
  flex-direction: column;
}

.task-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.task-item:last-child {
  border-bottom: none;
}

.task-time-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120rpx;
}

.task-time {
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

.vertical-line {
  width: 2rpx;
  flex: 1;
  background-color: #eee;
  margin: 10rpx 0;
}

.task-content {
  flex: 1;
  padding-left: 20rpx;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.task-title {
  font-size: 28rpx;
  font-weight: bold;
}

.task-status {
  font-size: 22rpx;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
}

.todo {
  color: #FF9F43;
  background-color: rgba(255, 159, 67, 0.1);
}

.done {
  color: #28C76F;
  background-color: rgba(40, 199, 111, 0.1);
}

.task-info {
  margin-bottom: 10rpx;
}

.task-detail {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 10rpx;
  line-height: 1.4;
}

.task-tags {
  display: flex;
  flex-wrap: wrap;
}

.task-tag {
  font-size: 22rpx;
  color: #00CFB4;
  background-color: rgba(0, 207, 180, 0.1);
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
  margin-right: 10rpx;
  margin-bottom: 5rpx;
}

.task-location {
  font-size: 22rpx;
  color: #999;
  margin-top: 10rpx;
}

/* 待录入数据 */
.data-entry-list {
  display: flex;
  flex-direction: column;
}

.data-entry-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.data-entry-item:last-child {
  border-bottom: none;
}

.data-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20rpx;
}

.data-image {
  width: 60rpx;
  height: 60rpx;
}

.data-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.data-name {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.data-desc {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 10rpx;
  line-height: 1.4;
}

.data-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.data-time {
  font-size: 22rpx;
  color: #999;
}

.data-status {
  font-size: 22rpx;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
}

.urgent {
  color: #FF6B6B;
  background-color: rgba(255, 107, 107, 0.1);
}

.normal {
  color: #00CFB4;
  background-color: rgba(0, 207, 180, 0.1);
}

/* 健康教育资料 */
.education-list {
  display: flex;
  flex-direction: column;
}

.education-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.education-item:last-child {
  border-bottom: none;
}

.education-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 10rpx;
  margin-right: 20rpx;
}

.education-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.education-title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.education-desc {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 10rpx;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.education-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.education-type {
  font-size: 22rpx;
  color: #37B2C5;
  background-color: rgba(55, 178, 197, 0.1);
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
}

.education-count {
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