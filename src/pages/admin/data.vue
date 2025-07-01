<template>
  <view class="data-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="iconfont icon-back"></text>
      </view>
      <text class="title">数据统计</text>
      <view class="right-btn" @click="refreshData">
        <text class="iconfont icon-refresh"></text>
      </view>
    </view>

    <!-- 数据概览卡片 -->
    <view class="overview-cards">
      <view class="card" v-for="(item, index) in overviewData" :key="index">
        <view class="card-content">
          <text class="label">{{item.label}}</text>
          <text class="value">{{item.value}}</text>
          <text class="trend" :class="item.trend">
            <text class="iconfont" :class="item.trend === 'up' ? 'icon-up' : 'icon-down'"></text>
            <text>{{item.rate}}%</text>
          </text>
        </view>
        <view class="card-icon" :class="item.type">
          <text class="iconfont" :class="item.icon"></text>
        </view>
      </view>
    </view>

    <!-- 趋势图表 -->
    <view class="chart-section">
      <view class="section-header">
        <text class="title">数据趋势</text>
        <view class="chart-actions">
          <picker mode="selector" :range="timeRanges" :value="currentTimeRange" @change="onTimeRangeChange">
            <view class="picker-content">
              <text>{{timeRanges[currentTimeRange]}}</text>
              <text class="iconfont icon-down"></text>
            </view>
          </picker>
        </view>
      </view>
      <view class="chart-container">
        <!-- 这里可以集成图表组件 -->
        <view class="placeholder-chart"></view>
      </view>
      <view class="chart-legend">
        <view class="legend-item" v-for="(item, index) in chartLegend" :key="index">
          <view class="dot" :style="{backgroundColor: item.color}"></view>
          <text>{{item.name}}</text>
        </view>
      </view>
    </view>

    <!-- 详细统计 -->
    <view class="stats-section">
      <view class="section-header">
        <text class="title">详细统计</text>
        <view class="tab-group">
          <view 
            v-for="(tab, index) in statsTabs" 
            :key="index"
            class="tab-item"
            :class="{ active: currentTab === index }"
            @click="switchTab(index)"
          >
            <text>{{tab}}</text>
          </view>
        </view>
      </view>
      <view class="stats-content">
        <view class="stats-table">
          <view class="table-header">
            <view class="th" v-for="(header, index) in tableHeaders" :key="index">
              <text>{{header}}</text>
            </view>
          </view>
          <scroll-view scroll-y class="table-body">
            <view 
              v-for="(row, rowIndex) in tableData" 
              :key="rowIndex"
              class="table-row"
            >
              <view class="td" v-for="(cell, cellIndex) in row" :key="cellIndex">
                <text>{{cell}}</text>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>

    <!-- 导出按钮 -->
    <view class="export-btn" @click="exportData">
      <text class="iconfont icon-export"></text>
      <text>导出数据</text>
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
      <view class="tab-item active">
        <text class="tab-icon">数</text>
        <text class="tab-text">数据</text>
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
      overviewData: [
        {
          label: '总用户数',
          value: '1,286',
          rate: '12.5',
          trend: 'up',
          type: 'users',
          icon: 'icon-user'
        },
        {
          label: '活跃用户',
          value: '986',
          rate: '8.2',
          trend: 'up',
          type: 'active',
          icon: 'icon-active'
        },
        {
          label: '患者数',
          value: '856',
          rate: '15.3',
          trend: 'up',
          type: 'patients',
          icon: 'icon-patient'
        },
        {
          label: '随访数',
          value: '2,356',
          rate: '5.8',
          trend: 'down',
          type: 'follow',
          icon: 'icon-follow'
        }
      ],
      timeRanges: ['最近7天', '最近30天', '最近90天', '最近一年'],
      currentTimeRange: 0,
      chartLegend: [
        { name: '用户数', color: '#4AB8B8' },
        { name: '患者数', color: '#FF6B6B' },
        { name: '随访数', color: '#FFA53D' }
      ],
      statsTabs: ['用户统计', '随访统计', '数据录入'],
      currentTab: 0,
      tableHeaders: ['日期', '新增用户', '活跃用户', '随访数', '数据录入'],
      tableData: [
        ['2024-03-20', '12', '986', '156', '89'],
        ['2024-03-19', '15', '952', '142', '76'],
        ['2024-03-18', '8', '968', '138', '82'],
        ['2024-03-17', '10', '945', '129', '75'],
        ['2024-03-16', '11', '932', '125', '71']
      ]
    }
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1
      })
    },
    refreshData() {
      uni.showLoading({
        title: '刷新中...'
      })
      // 实际应该调用刷新API
      setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
          title: '刷新成功',
          icon: 'success'
        })
      }, 1000)
    },
    onTimeRangeChange(e) {
      this.currentTimeRange = e.detail.value
      // 实际应该根据时间范围更新图表数据
      this.loadChartData()
    },
    loadChartData() {
      // 实际应该调用API获取图表数据
      console.log('加载', this.timeRanges[this.currentTimeRange], '的图表数据')
    },
    switchTab(index) {
      this.currentTab = index
      // 实际应该根据标签更新表格数据
      this.loadTableData()
    },
    loadTableData() {
      // 实际应该调用API获取表格数据
      console.log('加载', this.statsTabs[this.currentTab], '的表格数据')
    },
    exportData() {
      uni.showLoading({
        title: '导出中...'
      })
      // 实际应该调用导出API
      setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
          title: '导出成功',
          icon: 'success'
        })
      }, 1500)
    }
  },
  onLoad() {
    // 页面加载时获取数据
    this.loadChartData()
    this.loadTableData()
  }
}
</script>

<style>
.data-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;
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

.overview-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  margin: 20rpx;
}

.card {
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.card-content {
  flex: 1;
}

.card .label {
  font-size: 24rpx;
  color: #999999;
  margin-bottom: 10rpx;
  display: block;
}

.card .value {
  font-size: 36rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 10rpx;
  display: block;
}

.card .trend {
  font-size: 24rpx;
  display: flex;
  align-items: center;
}

.trend.up {
  color: #4AB8B8;
}

.trend.down {
  color: #FF6B6B;
}

.trend .iconfont {
  font-size: 24rpx;
  margin-right: 6rpx;
}

.card-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20rpx;
}

.card-icon .iconfont {
  font-size: 40rpx;
  color: #ffffff;
}

.card-icon.users {
  background-color: #4AB8B8;
}

.card-icon.active {
  background-color: #FFA53D;
}

.card-icon.patients {
  background-color: #FF6B6B;
}

.card-icon.follow {
  background-color: #8B5CF6;
}

.chart-section {
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
  margin: 0 20rpx 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.section-header .title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.chart-actions .picker-content {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10rpx 20rpx;
  border-radius: 6rpx;
}

.chart-actions text {
  font-size: 24rpx;
  color: #666666;
}

.chart-actions .iconfont {
  font-size: 24rpx;
  margin-left: 10rpx;
}

.chart-container {
  height: 400rpx;
  margin-bottom: 20rpx;
}

.placeholder-chart {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  border-radius: 8rpx;
}

.chart-legend {
  display: flex;
  justify-content: center;
  margin-top: 20rpx;
}

.legend-item {
  display: flex;
  align-items: center;
  margin: 0 20rpx;
}

.legend-item .dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 8rpx;
  margin-right: 8rpx;
}

.legend-item text {
  font-size: 24rpx;
  color: #666666;
}

.stats-section {
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
  margin: 0 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.tab-group {
  display: flex;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  padding: 4rpx;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 16rpx 0;
  font-size: 24rpx;
  color: #666666;
  border-radius: 6rpx;
}

.tab-item.active {
  background-color: #ffffff;
  color: #4AB8B8;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.stats-table {
  margin-top: 30rpx;
}

.table-header {
  display: flex;
  background-color: #f5f5f5;
  padding: 20rpx 0;
  border-radius: 8rpx 8rpx 0 0;
}

.th {
  flex: 1;
  text-align: center;
  font-size: 24rpx;
  color: #666666;
}

.table-body {
  max-height: 600rpx;
}

.table-row {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.td {
  flex: 1;
  text-align: center;
  font-size: 24rpx;
  color: #333333;
}

.export-btn {
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  background-color: #4AB8B8;
  color: #ffffff;
  padding: 20rpx 40rpx;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 4rpx 16rpx rgba(74, 184, 184, 0.3);
}

.export-btn .iconfont {
  font-size: 32rpx;
  margin-right: 10rpx;
}

.export-btn text {
  font-size: 28rpx;
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