<template>
  <view class="data-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="iconfont icon-back"></text>
      </view>
      <text class="title">个人数据</text>
      <view class="right-btn" @click="showDatePicker">
        <text class="date">{{currentDate}}</text>
        <text class="iconfont icon-calendar"></text>
      </view>
    </view>

    <!-- 数据总览 -->
    <view class="data-overview">
      <scroll-view scroll-x class="overview-scroll" show-scrollbar="false">
        <view class="overview-cards">
          <view class="overview-card blood-sugar">
            <view class="card-tag">血糖</view>
            <view class="card-value">
              <text class="value">{{bloodSugarData.current}}</text>
              <text class="unit">mmol/L</text>
            </view>
            <view class="card-status" :class="getStatusClass(bloodSugarData.status)">
              <text>{{bloodSugarData.status}}</text>
            </view>
          </view>
          <view class="overview-card weight">
            <view class="card-tag">体重</view>
            <view class="card-value">
              <text class="value">{{weightData.current}}</text>
              <text class="unit">kg</text>
            </view>
            <view class="card-status" :class="getStatusClass(weightData.status)">
              <text>{{weightData.status}}</text>
            </view>
          </view>
          <view class="overview-card blood-pressure">
            <view class="card-tag">血压</view>
            <view class="card-value">
              <text class="value">{{bloodPressureData.current}}</text>
              <text class="unit">mmHg</text>
            </view>
            <view class="card-status" :class="getStatusClass(bloodPressureData.status)">
              <text>{{bloodPressureData.status}}</text>
            </view>
          </view>
          <view class="overview-card heart-rate">
            <view class="card-tag">心率</view>
            <view class="card-value">
              <text class="value">{{heartRateData.current}}</text>
              <text class="unit">次/分</text>
            </view>
            <view class="card-status" :class="getStatusClass(heartRateData.status)">
              <text>{{heartRateData.status}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 数据卡片列表 -->
    <scroll-view 
      scroll-y 
      class="data-list"
      refresher-enabled
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
    >
      <!-- 血糖数据卡片 -->
      <view class="data-card">
        <view class="card-header">
          <view class="left">
            <text class="iconfont icon-blood"></text>
            <text class="title">血糖记录</text>
          </view>
          <view class="right">
            <view class="time-select">
              <text 
                class="time-option" 
                :class="{ active: bloodSugarTimeRange === 'week' }"
                @click="changeTimeRange('bloodSugar', 'week')"
              >周</text>
              <text 
                class="time-option" 
                :class="{ active: bloodSugarTimeRange === 'month' }"
                @click="changeTimeRange('bloodSugar', 'month')"
              >月</text>
              <text 
                class="time-option" 
                :class="{ active: bloodSugarTimeRange === 'year' }"
                @click="changeTimeRange('bloodSugar', 'year')"
              >年</text>
            </view>
            <view class="more-btn" @click="navigateTo('/pages/patient/blood-sugar-detail')">
              <text class="more">查看详情</text>
              <text class="iconfont icon-right"></text>
            </view>
          </view>
        </view>
        <view class="card-content">
          <view class="chart-info">
            <view class="info-item">
              <text class="label">平均值</text>
              <text class="value">{{bloodSugarData.average}} mmol/L</text>
            </view>
            <view class="info-item">
              <text class="label">最高值</text>
              <text class="value">{{bloodSugarData.max}} mmol/L</text>
            </view>
            <view class="info-item">
              <text class="label">最低值</text>
              <text class="value">{{bloodSugarData.min}} mmol/L</text>
            </view>
          </view>
          <view class="chart-container">
            <!-- 这里可以接入echarts等图表组件 -->
            <view class="chart-placeholder">
              <view class="trend-line"></view>
              <view class="trend-line-highlight"></view>
              <view class="chart-labels">
                <text v-for="(label, index) in getChartLabels(bloodSugarTimeRange)" :key="index">{{label}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 体重数据卡片 -->
      <view class="data-card">
        <view class="card-header">
          <view class="left">
            <text class="iconfont icon-weight"></text>
            <text class="title">体重记录</text>
          </view>
          <view class="right">
            <view class="time-select">
              <text 
                class="time-option" 
                :class="{ active: weightTimeRange === 'week' }"
                @click="changeTimeRange('weight', 'week')"
              >周</text>
              <text 
                class="time-option" 
                :class="{ active: weightTimeRange === 'month' }"
                @click="changeTimeRange('weight', 'month')"
              >月</text>
              <text 
                class="time-option" 
                :class="{ active: weightTimeRange === 'year' }"
                @click="changeTimeRange('weight', 'year')"
              >年</text>
            </view>
            <view class="more-btn" @click="navigateTo('/pages/patient/weight-detail')">
              <text class="more">查看详情</text>
              <text class="iconfont icon-right"></text>
            </view>
          </view>
        </view>
        <view class="card-content">
          <view class="chart-info">
            <view class="info-item">
              <text class="label">平均值</text>
              <text class="value">{{weightData.average}} kg</text>
            </view>
            <view class="info-item">
              <text class="label">最高值</text>
              <text class="value">{{weightData.max}} kg</text>
            </view>
            <view class="info-item">
              <text class="label">最低值</text>
              <text class="value">{{weightData.min}} kg</text>
            </view>
          </view>
          <view class="chart-container">
            <view class="chart-placeholder">
              <view class="trend-line"></view>
              <view class="trend-line-highlight"></view>
              <view class="chart-labels">
                <text v-for="(label, index) in getChartLabels(weightTimeRange)" :key="index">{{label}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 血压数据卡片 -->
      <view class="data-card">
        <view class="card-header">
          <view class="left">
            <text class="iconfont icon-pressure"></text>
            <text class="title">血压记录</text>
          </view>
          <view class="right">
            <view class="time-select">
              <text 
                class="time-option" 
                :class="{ active: bloodPressureTimeRange === 'week' }"
                @click="changeTimeRange('bloodPressure', 'week')"
              >周</text>
              <text 
                class="time-option" 
                :class="{ active: bloodPressureTimeRange === 'month' }"
                @click="changeTimeRange('bloodPressure', 'month')"
              >月</text>
              <text 
                class="time-option" 
                :class="{ active: bloodPressureTimeRange === 'year' }"
                @click="changeTimeRange('bloodPressure', 'year')"
              >年</text>
            </view>
            <view class="more-btn" @click="navigateTo('/pages/patient/blood-pressure-detail')">
              <text class="more">查看详情</text>
              <text class="iconfont icon-right"></text>
            </view>
          </view>
        </view>
        <view class="card-content">
          <view class="chart-info">
            <view class="info-item">
              <text class="label">平均收缩压</text>
              <text class="value">{{bloodPressureData.avgSys}} mmHg</text>
            </view>
            <view class="info-item">
              <text class="label">平均舒张压</text>
              <text class="value">{{bloodPressureData.avgDia}} mmHg</text>
            </view>
          </view>
          <view class="chart-container">
            <view class="chart-placeholder">
              <view class="dual-trend-line sys"></view>
              <view class="dual-trend-line dia"></view>
              <view class="chart-labels">
                <text v-for="(label, index) in getChartLabels(bloodPressureTimeRange)" :key="index">{{label}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 添加数据浮动按钮 -->
    <view class="float-btn" @click="showAddDataModal">
      <text class="iconfont icon-add"></text>
    </view>

    <!-- 日期选择弹窗 -->
    <view class="date-picker-modal" v-if="showDatePickerModal">
      <view class="modal-mask" @click="hideDatePicker"></view>
      <view class="modal-content">
        <view class="modal-header">
          <text>选择日期</text>
          <view class="close-btn" @click="hideDatePicker">
            <text class="iconfont icon-close"></text>
          </view>
        </view>
        <view class="modal-body">
          <picker
            mode="date"
            :value="currentDate"
            :start="startDate"
            :end="endDate"
            @change="onDateChange"
          >
            <view class="picker-item">
              <text>{{currentDate}}</text>
              <text class="iconfont icon-calendar"></text>
            </view>
          </picker>
        </view>
        <view class="modal-footer">
          <view class="btn confirm-btn" @click="confirmDateSelection">确定</view>
          <view class="btn cancel-btn" @click="hideDatePicker">取消</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentDate: '',
      selectedDate: '',
      startDate: '2020-01-01',
      endDate: '2025-12-31',
      showDatePickerModal: false,
      isRefreshing: false,
      bloodSugarTimeRange: 'week',
      weightTimeRange: 'week',
      bloodPressureTimeRange: 'week',
      bloodSugarData: {
        current: '5.6',
        status: '正常',
        average: '5.8',
        max: '6.5',
        min: '5.1',
        history: [] // 用于绘制趋势图的历史数据
      },
      weightData: {
        current: '65.0',
        status: '标准',
        average: '65.5',
        max: '67.0',
        min: '64.2',
        history: []
      },
      bloodPressureData: {
        current: '120/80',
        status: '正常',
        avgSys: '122',
        avgDia: '82',
        history: []
      },
      heartRateData: {
        current: '72',
        status: '正常',
        history: []
      }
    }
  },
  onLoad() {
    this.getCurrentDate()
    // 这里可以添加获取历史数据的方法
  },
  methods: {
    getCurrentDate() {
      const date = new Date()
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      this.currentDate = `${year}-${month}-${day}`
      this.selectedDate = this.currentDate
    },
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
    showAddDataModal() {
      uni.showActionSheet({
        itemList: ['添加血糖', '添加体重', '添加血压', '添加心率'],
        success: (res) => {
          switch(res.tapIndex) {
            case 0:
              this.navigateTo('/pages/patient/add-blood-sugar')
              break
            case 1:
              this.navigateTo('/pages/patient/add-weight')
              break
            case 2:
              this.navigateTo('/pages/patient/add-blood-pressure')
              break
            case 3:
              this.navigateTo('/pages/patient/add-heart-rate')
              break
          }
        }
      })
    },
    showDatePicker() {
      this.showDatePickerModal = true
    },
    hideDatePicker() {
      this.showDatePickerModal = false
    },
    onDateChange(e) {
      this.selectedDate = e.detail.value
    },
    confirmDateSelection() {
      this.currentDate = this.selectedDate
      this.hideDatePicker()
      this.fetchDataForDate(this.currentDate)
    },
    fetchDataForDate(date) {
      // 这里实际应该调用API获取指定日期的数据
      console.log('获取日期数据:', date)
      uni.showLoading({
        title: '加载中...'
      })
      // 模拟数据加载
      setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
          title: '数据已更新',
          icon: 'success'
        })
      }, 1000)
    },
    getStatusClass(status) {
      switch(status) {
        case '偏高':
        case '超重':
          return 'status-high'
        case '偏低':
        case '过轻':
          return 'status-low'
        case '正常':
        case '标准':
          return 'status-normal'
        default:
          return 'status-normal'
      }
    },
    onRefresh() {
      this.isRefreshing = true
      // 模拟刷新数据
      setTimeout(() => {
        this.isRefreshing = false
        uni.showToast({
          title: '数据已刷新',
          icon: 'success'
        })
      }, 1500)
    },
    changeTimeRange(dataType, range) {
      switch(dataType) {
        case 'bloodSugar':
          this.bloodSugarTimeRange = range
          break
        case 'weight':
          this.weightTimeRange = range
          break
        case 'bloodPressure':
          this.bloodPressureTimeRange = range
          break
      }
      // 这里应该请求相应时间范围的数据
      console.log(`更改${dataType}的时间范围为${range}`)
    },
    getChartLabels(timeRange) {
      if (timeRange === 'week') {
        return ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      } else if (timeRange === 'month') {
        return ['第1周', '第2周', '第3周', '第4周']
      } else if (timeRange === 'year') {
        return ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      }
      return []
    }
  }
}
</script>

<style>
.data-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;
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
  height: 60rpx;
  display: flex;
  align-items: center;
}

.back-btn .iconfont {
  font-size: 36rpx;
}

.right-btn {
  font-size: 24rpx;
  opacity: 0.9;
}

.right-btn .date {
  margin-right: 10rpx;
}

.right-btn .iconfont {
  font-size: 28rpx;
}

/* 数据总览样式 */
.data-overview {
  padding: 20rpx 0;
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.overview-scroll {
  white-space: nowrap;
}

.overview-cards {
  display: inline-flex;
  padding: 0 20rpx;
}

.overview-card {
  width: 200rpx;
  height: 160rpx;
  border-radius: 12rpx;
  margin-right: 20rpx;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.overview-card.blood-sugar {
  background: linear-gradient(135deg, #4AB8B8, #40A5A5);
}

.overview-card.weight {
  background: linear-gradient(135deg, #6A8BE9, #5A7AD9);
}

.overview-card.blood-pressure {
  background: linear-gradient(135deg, #F8A555, #F79145);
}

.overview-card.heart-rate {
  background: linear-gradient(135deg, #F87D7D, #F56969);
}

.card-tag {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.9);
}

.card-value {
  margin: 10rpx 0;
}

.card-value .value {
  font-size: 40rpx;
  color: #ffffff;
  font-weight: bold;
}

.card-value .unit {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.9);
  margin-left: 6rpx;
}

.card-status {
  display: inline-block;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
  align-self: flex-start;
}

.status-normal {
  background-color: rgba(100, 210, 141, 0.2);
  color: #64D28D;
}

.status-high {
  background-color: rgba(255, 122, 122, 0.2);
  color: #FF7A7A;
}

.status-low {
  background-color: rgba(255, 190, 100, 0.2);
  color: #FFBE64;
}

/* 数据卡片列表样式 */
.data-list {
  height: calc(100vh - 300rpx);
  padding: 0 20rpx;
}

.data-card {
  background-color: #ffffff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.card-header .left {
  display: flex;
  align-items: center;
}

.card-header .iconfont {
  font-size: 40rpx;
  margin-right: 10rpx;
  color: #4AB8B8;
}

.card-header .title {
  font-size: 28rpx;
  color: #333333;
  font-weight: bold;
}

.card-header .right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.time-select {
  display: flex;
  background-color: #f5f5f5;
  border-radius: 6rpx;
  margin-bottom: 10rpx;
  overflow: hidden;
}

.time-option {
  padding: 4rpx 16rpx;
  font-size: 24rpx;
  color: #666666;
}

.time-option.active {
  background-color: #4AB8B8;
  color: #ffffff;
}

.more-btn {
  display: flex;
  align-items: center;
}

.more {
  font-size: 24rpx;
  color: #999999;
}

.icon-right {
  font-size: 24rpx;
  color: #999999;
  margin-left: 6rpx;
}

.card-content {
  border-top: 1rpx solid #f5f5f5;
  padding-top: 20rpx;
}

.chart-info {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20rpx;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-item .label {
  font-size: 22rpx;
  color: #999999;
  margin-bottom: 4rpx;
}

.info-item .value {
  font-size: 26rpx;
  color: #333333;
  font-weight: bold;
}

.chart-container {
  height: 200rpx;
  background-color: #f8f8f8;
  border-radius: 8rpx;
  padding: 20rpx;
  position: relative;
}

.chart-placeholder {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.trend-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 60rpx;
  background: linear-gradient(90deg, rgba(74, 184, 184, 0.1), rgba(74, 184, 184, 0.3));
  border-radius: 30rpx;
}

.trend-line-highlight {
  position: absolute;
  top: 60%;
  left: 30rpx;
  width: 60%;
  height: 40rpx;
  background: #4AB8B8;
  opacity: 0.7;
  border-radius: 20rpx;
}

.dual-trend-line {
  position: absolute;
  height: 30rpx;
  border-radius: 15rpx;
}

.dual-trend-line.sys {
  top: 30%;
  left: 0;
  right: 20%;
  background: rgba(255, 165, 61, 0.7);
}

.dual-trend-line.dia {
  top: 70%;
  left: 10%;
  right: 10%;
  background: rgba(106, 139, 233, 0.7);
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 10rpx;
}

.chart-labels text {
  font-size: 20rpx;
  color: #999999;
}

/* 浮动按钮样式 */
.float-btn {
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50rpx;
  background-color: #4AB8B8;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(74, 184, 184, 0.4);
  z-index: 100;
}

.float-btn .iconfont {
  font-size: 48rpx;
  color: #ffffff;
}

/* 日期选择弹窗样式 */
.date-picker-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
}

.modal-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.modal-header text {
  font-size: 30rpx;
  font-weight: bold;
  color: #333333;
}

.close-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn .iconfont {
  font-size: 36rpx;
  color: #999999;
}

.modal-body {
  padding: 40rpx 30rpx;
}

.picker-item {
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.picker-item text {
  font-size: 28rpx;
  color: #333333;
}

.picker-item .iconfont {
  margin-left: 10rpx;
  color: #999999;
}

.modal-footer {
  display: flex;
  padding: 20rpx 30rpx 50rpx;
}

.btn {
  flex: 1;
  height: 80rpx;
  margin: 0 20rpx;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
}

.confirm-btn {
  background-color: #4AB8B8;
  color: #ffffff;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #666666;
}
</style> 