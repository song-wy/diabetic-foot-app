<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="user-info">
        <image class="avatar" src="/static/avatar.svg"></image>
        <text class="username">糖尿足</text>
      </view>
      <text class="date">{{currentDate}} {{greeting}}!</text>
      <view class="menu-icon">
        <text class="iconfont icon-menu">三</text>
      </view>
    </view>

    <!-- 功能选项卡 -->
    <view class="tab-container">
      <scroll-view scroll-x="true" class="tab-scroll">
        <view class="tab-item active">
          <text class="iconfont">血</text>
          <text class="tab-text">血糖检测</text>
        </view>
        <view class="tab-item">
          <text class="iconfont">药</text>
          <text class="tab-text">药约管理</text>
        </view>
        <view class="tab-item">
          <text class="iconfont">空</text>
          <text class="tab-text">空血 J</text>
        </view>
      </scroll-view>
    </view>

    <!-- 主要功能入口 -->
    <view class="function-entry">
      <view class="function-item">
        <view class="function-icon blood-icon">
          <image class="icon-image" src="/static/blood-test.svg"></image>
        </view>
        <text class="function-text">血糖检测</text>
      </view>
      <view class="function-item">
        <view class="function-icon medicine-icon">
          <image class="icon-image" src="/static/medicine.svg"></image>
          <text class="badge">3</text>
        </view>
        <text class="function-text">药约护理</text>
      </view>
      <view class="function-item">
        <view class="function-icon consult-icon">
          <image class="icon-image" src="/static/doctor.svg"></image>
          <text class="badge-dot">2</text>
        </view>
        <text class="function-text">视频问诊</text>
      </view>
    </view>

    <!-- 血糖报告 -->
    <view class="report-card">
      <view class="report-header">
        <text class="report-title">查看完毕报告</text>
        <text class="report-more">查看全部报告 ></text>
      </view>
      <view class="chart-container">
        <image class="chart-img" src="/static/chart.svg" mode="aspectFit"></image>
      </view>
    </view>

    <!-- 功能推广 -->
    <view class="promo-card">
      <view class="promo-content">
        <view class="promo-text">
          <text class="promo-title">功能滑扣查估</text>
          <text class="promo-desc">健康数据管理指南.</text>
          <text class="promo-tip">症状描述门：脚痛疼痛感</text>
        </view>
        <view class="promo-btn">查看并预约</view>
      </view>
      <image class="promo-img" src="/static/foot.svg" mode="aspectFit"></image>
    </view>

    <!-- 内容推荐 -->
    <view class="recommend-section">
      <view class="recommend-header">
        <text class="recommend-title">动态内容推荐</text>
        <text class="recommend-more">查看更多 ></text>
      </view>
      <view class="recommend-item">
        <view class="recommend-info">
          <image class="recommend-icon" src="/static/blood-test.svg"></image>
          <view class="recommend-detail">
            <text class="recommend-name">最新血糖管理指南</text>
            <view class="recommend-tags">
              <text class="recommend-time">13:00</text>
              <text class="recommend-count">1+</text>
            </view>
            <view class="tag-list">
              <text class="tag highlight">推荐</text>
              <text class="tag">阿卡勃图片</text>
              <text class="tag-count">1片</text>
            </view>
          </view>
        </view>
        <image class="recommend-thumb" src="/static/foot.svg" mode="aspectFill"></image>
      </view>
    </view>

    <!-- 角色选择区域 -->
    <view class="role-entries">
      <view class="role-title">选择角色</view>
      <view class="role-buttons">
        <button class="role-button patient" @click="navigateToRole('patient')">患者端</button>
        <button class="role-button doctor" @click="navigateToRole('doctor')">医生端</button>
        <button class="role-button nurse" @click="navigateToRole('nurse')">护士端</button>
        <button class="role-button admin" @click="navigateToRole('admin')">管理员端</button>
      </view>
    </view>

    <!-- 底部导航 -->
    <view class="tab-bar">
      <view class="tab-bar-item active">
        <text class="iconfont">首</text>
        <text class="tab-bar-text">首页</text>
      </view>
      <view class="tab-bar-item">
        <text class="iconfont">资</text>
        <text class="tab-bar-text">资讯</text>
      </view>
      <view class="tab-bar-item">
        <text class="iconfont">健</text>
        <text class="tab-bar-text">健忘</text>
      </view>
      <view class="tab-bar-item">
        <text class="iconfont">我</text>
        <text class="tab-bar-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '糖尿足',
      greeting: '下午好',
      currentDate: '2023年10月25日'
    }
  },
  onLoad() {
    this.setGreeting();
    this.setCurrentDate();
  },
  methods: {
    // 设置问候语
    setGreeting() {
      const hour = new Date().getHours();
      if (hour < 12) {
        this.greeting = '上午好';
      } else if (hour < 18) {
        this.greeting = '下午好';
      } else {
        this.greeting = '晚上好';
      }
    },
    // 设置当前日期
    setCurrentDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      this.currentDate = `${year}年${month}月${day}日`;
    },
    navigateToRole(role) {
      // 保存选择的角色
      uni.setStorageSync('userRole', role);
      
      // 根据角色跳转
      switch (role) {
        case 'patient':
          uni.navigateTo({ url: '/pages/patient/index' });
          break;
        case 'doctor':
          uni.navigateTo({ url: '/pages/doctor/index' });
          break;
        case 'nurse':
          uni.navigateTo({ url: '/pages/nurse/index' });
          break;
        case 'admin':
          uni.navigateTo({ url: '/pages/admin/index' });
          break;
      }
    }
  },
}
</script>

<style>
/* 全局样式 */
page {
  background-color: #f7f7f7;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  color: #333;
  font-size: 28rpx;
}

.container {
  padding-bottom: 120rpx;
}

/* 顶部导航栏 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  background-color: #fff;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.username {
  font-size: 32rpx;
  font-weight: bold;
}

.date {
  font-size: 26rpx;
  color: #999;
}

.menu-icon {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 功能选项卡 */
.tab-container {
  background-color: #fff;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
}

.tab-scroll {
  white-space: nowrap;
}

.tab-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 0 30rpx;
  padding: 10rpx 20rpx;
}

.tab-item.active {
  color: #4AB8B8;
  border-bottom: 4rpx solid #4AB8B8;
}

.tab-text {
  font-size: 26rpx;
  margin-top: 8rpx;
}

/* 主要功能入口 */
.function-entry {
  display: flex;
  justify-content: space-around;
  padding: 40rpx 30rpx;
  background-color: #fff;
  margin-top: 20rpx;
}

.function-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.function-icon {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 20rpx;
}

.icon-image {
  width: 100%;
  height: 100%;
}

.blood-icon {
  background-color: #ffffff;
  color: #fff;
  border: 2rpx solid #4AB8B8;
}

.medicine-icon {
  background-color: #ffffff;
  color: #fff;
  border: 2rpx solid #FF6B6B;
}

.consult-icon {
  background-color: #ffffff;
  color: #fff;
  border: 2rpx solid #FFA53D;
}

.badge {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  background-color: #FF6B6B;
  color: #fff;
  font-size: 22rpx;
  min-width: 40rpx;
  height: 40rpx;
  border-radius: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10rpx;
}

.badge-dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 20rpx;
  height: 20rpx;
  border-radius: 10rpx;
  background-color: #FF6B6B;
}

.function-text {
  font-size: 26rpx;
}

/* 血糖报告 */
.report-card {
  margin: 20rpx 30rpx;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.report-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.report-title {
  font-size: 30rpx;
  font-weight: bold;
}

.report-more {
  font-size: 24rpx;
  color: #999;
}

.chart-container {
  height: 300rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-img {
  width: 100%;
  height: 100%;
}

/* 功能推广 */
.promo-card {
  margin: 20rpx 30rpx;
  background-color: #4AB8B8;
  border-radius: 20rpx;
  padding: 30rpx;
  color: #fff;
  display: flex;
  position: relative;
  overflow: hidden;
}

.promo-content {
  flex: 1;
  z-index: 1;
}

.promo-title {
  font-size: 32rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 10rpx;
}

.promo-desc {
  font-size: 26rpx;
  display: block;
  margin-bottom: 30rpx;
}

.promo-tip {
  font-size: 24rpx;
  opacity: 0.8;
  display: block;
  margin-bottom: 20rpx;
}

.promo-btn {
  display: inline-block;
  background-color: #fff;
  color: #4AB8B8;
  padding: 10rpx 30rpx;
  border-radius: 30rpx;
  font-size: 24rpx;
}

.promo-img {
  width: 200rpx;
  height: 200rpx;
  position: absolute;
  right: 20rpx;
  bottom: -20rpx;
}

/* 内容推荐 */
.recommend-section {
  margin: 20rpx 30rpx;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.recommend-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30rpx;
}

.recommend-title {
  font-size: 30rpx;
  font-weight: bold;
}

.recommend-more {
  font-size: 24rpx;
  color: #999;
}

.recommend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recommend-info {
  display: flex;
  flex: 1;
}

.recommend-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.recommend-detail {
  flex: 1;
}

.recommend-name {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  display: block;
}

.recommend-tags {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.recommend-time, .recommend-count {
  font-size: 24rpx;
  color: #999;
  margin-right: 20rpx;
}

.tag-list {
  display: flex;
  align-items: center;
}

.tag {
  font-size: 22rpx;
  color: #999;
  background-color: #f5f5f5;
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
  margin-right: 10rpx;
}

.tag.highlight {
  color: #FF6B6B;
  background-color: rgba(255, 107, 107, 0.1);
}

.tag-count {
  font-size: 22rpx;
  color: #999;
}

.recommend-thumb {
  width: 120rpx;
  height: 120rpx;
  border-radius: 10rpx;
}

/* 角色选择区域样式 */
.role-entries {
  margin: 30rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.role-title {
  font-size: 32rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30rpx;
}

.role-buttons {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.role-button {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  border-radius: 16rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
}

.role-button.patient {
  background-color: #4AB8B8;
}

.role-button.doctor {
  background-color: #5A8DEE;
}

.role-button.nurse {
  background-color: #00CFB4;
}

.role-button.admin {
  background-color: #666EE8;
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

.tab-bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tab-bar-item.active {
  color: #4AB8B8;
}

.tab-bar-text {
  font-size: 22rpx;
  margin-top: 6rpx;
}
</style>
