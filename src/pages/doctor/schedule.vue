<template>
  <view class="schedule-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="iconfont icon-back"></text>
      </view>
      <text class="title">排班管理</text>
      <view class="right-btn" @click="refreshSchedule">
        <text class="iconfont icon-refresh"></text>
      </view>
    </view>

    <!-- 日历视图 -->
    <view class="calendar-section">
      <view class="calendar-header">
        <view class="month-selector">
          <text class="iconfont icon-left" @click="prevMonth"></text>
          <text class="current-month">{{currentYear}}年{{currentMonth}}月</text>
          <text class="iconfont icon-right" @click="nextMonth"></text>
        </view>
        <view class="weekday-header">
          <text v-for="day in weekDays" :key="day">{{day}}</text>
        </view>
      </view>
      <view class="calendar-body">
        <view 
          v-for="(day, index) in calendarDays" 
          :key="index"
          class="calendar-day"
          :class="{ 
            'other-month': day.otherMonth,
            'today': day.isToday,
            'selected': day.selected,
            'has-schedule': day.hasSchedule
          }"
          @click="selectDate(day)"
        >
          <text class="day-number">{{day.date}}</text>
          <view class="schedule-dot" v-if="day.hasSchedule"></view>
        </view>
      </view>
    </view>

    <!-- 排班列表 -->
    <view class="schedule-list">
      <view class="list-header">
        <text class="date">{{selectedDate}}</text>
        <view class="add-btn" @click="showAddSchedule">
          <text class="iconfont icon-add"></text>
          <text>添加排班</text>
        </view>
      </view>
      <scroll-view scroll-y class="list-content">
        <view 
          v-for="(item, index) in scheduleList" 
          :key="index"
          class="schedule-item"
        >
          <view class="time-info">
            <text class="time">{{item.time}}</text>
            <text class="type">{{item.type}}</text>
          </view>
          <view class="schedule-info">
            <text class="location">{{item.location}}</text>
            <text class="remark">{{item.remark}}</text>
          </view>
          <view class="actions">
            <view class="action-btn edit" @click="editSchedule(item)">
              <text class="iconfont icon-edit"></text>
            </view>
            <view class="action-btn delete" @click="deleteSchedule(item)">
              <text class="iconfont icon-delete"></text>
            </view>
          </view>
        </view>
        <view class="empty-tip" v-if="scheduleList.length === 0">
          <text class="iconfont icon-empty"></text>
          <text>暂无排班</text>
        </view>
      </scroll-view>
    </view>

    <!-- 添加/编辑排班弹窗 -->
    <uni-popup ref="popup" type="bottom">
      <view class="popup-content">
        <view class="popup-header">
          <text class="title">{{isEdit ? '编辑排班' : '添加排班'}}</text>
          <text class="close-btn iconfont icon-close" @click="closePopup"></text>
        </view>
        <view class="form-content">
          <view class="form-item">
            <text class="label">时间</text>
            <picker mode="time" :value="formData.time" @change="onTimeChange">
              <view class="picker-content">
                <text>{{formData.time}}</text>
                <text class="iconfont icon-time"></text>
              </view>
            </picker>
          </view>
          <view class="form-item">
            <text class="label">类型</text>
            <picker mode="selector" :range="scheduleTypes" :value="formData.typeIndex" @change="onTypeChange">
              <view class="picker-content">
                <text>{{scheduleTypes[formData.typeIndex]}}</text>
                <text class="iconfont icon-down"></text>
              </view>
            </picker>
          </view>
          <view class="form-item">
            <text class="label">地点</text>
            <input type="text" v-model="formData.location" placeholder="请输入地点" />
          </view>
          <view class="form-item">
            <text class="label">备注</text>
            <textarea v-model="formData.remark" placeholder="请输入备注信息" />
          </view>
        </view>
        <view class="popup-footer">
          <button class="cancel-btn" @click="closePopup">取消</button>
          <button class="confirm-btn" @click="saveSchedule">确定</button>
        </view>
      </view>
    </uni-popup>

    <!-- 底部导航 -->
    <view class="tab-bar">
      <view class="tab-item" @click="navigateTo('/pages/doctor/index')">
        <text class="tab-icon">首</text>
        <text class="tab-text">首页</text>
      </view>
      <view class="tab-item" @click="navigateTo('/pages/doctor/patients')">
        <text class="tab-icon">患</text>
        <text class="tab-text">患者</text>
      </view>
      <view class="tab-item active">
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
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      weekDays: ['日', '一', '二', '三', '四', '五', '六'],
      calendarDays: [],
      selectedDate: '',
      scheduleList: [],
      isEdit: false,
      scheduleTypes: ['门诊', '手术', '会诊', '教学', '其他'],
      formData: {
        time: '09:00',
        typeIndex: 0,
        location: '',
        remark: ''
      }
    }
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1
      })
    },
    refreshSchedule() {
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
    initCalendar() {
      // 初始化日历数据
      const date = new Date(this.currentYear, this.currentMonth - 1, 1)
      const firstDay = date.getDay()
      const lastDate = new Date(this.currentYear, this.currentMonth, 0).getDate()
      const prevLastDate = new Date(this.currentYear, this.currentMonth - 1, 0).getDate()
      
      this.calendarDays = []
      
      // 上个月的日期
      for (let i = firstDay - 1; i >= 0; i--) {
        this.calendarDays.push({
          date: prevLastDate - i,
          otherMonth: true,
          isToday: false,
          selected: false,
          hasSchedule: false
        })
      }
      
      // 当前月的日期
      const today = new Date()
      for (let i = 1; i <= lastDate; i++) {
        this.calendarDays.push({
          date: i,
          otherMonth: false,
          isToday: today.getDate() === i && 
                   today.getMonth() === this.currentMonth - 1 && 
                   today.getFullYear() === this.currentYear,
          selected: false,
          hasSchedule: Math.random() > 0.7 // 模拟数据
        })
      }
      
      // 下个月的日期
      const remainingDays = 42 - this.calendarDays.length
      for (let i = 1; i <= remainingDays; i++) {
        this.calendarDays.push({
          date: i,
          otherMonth: true,
          isToday: false,
          selected: false,
          hasSchedule: false
        })
      }
    },
    prevMonth() {
      if (this.currentMonth === 1) {
        this.currentYear--
        this.currentMonth = 12
      } else {
        this.currentMonth--
      }
      this.initCalendar()
    },
    nextMonth() {
      if (this.currentMonth === 12) {
        this.currentYear++
        this.currentMonth = 1
      } else {
        this.currentMonth++
      }
      this.initCalendar()
    },
    selectDate(day) {
      this.calendarDays.forEach(d => d.selected = false)
      day.selected = true
      this.selectedDate = `${this.currentYear}年${this.currentMonth}月${day.date}日`
      this.loadScheduleList()
    },
    loadScheduleList() {
      // 实际应该调用API获取排班列表
      this.scheduleList = [
        {
          time: '09:00-10:00',
          type: '门诊',
          location: '门诊楼3层304室',
          remark: '普通门诊'
        },
        {
          time: '14:00-15:00',
          type: '手术',
          location: '手术室2',
          remark: '腹腔镜手术'
        }
      ]
    },
    showAddSchedule() {
      this.isEdit = false
      this.formData = {
        time: '09:00',
        typeIndex: 0,
        location: '',
        remark: ''
      }
      this.$refs.popup.open()
    },
    editSchedule(item) {
      this.isEdit = true
      this.formData = {
        time: item.time.split('-')[0],
        typeIndex: this.scheduleTypes.indexOf(item.type),
        location: item.location,
        remark: item.remark
      }
      this.$refs.popup.open()
    },
    deleteSchedule(item) {
      uni.showModal({
        title: '提示',
        content: '确定要删除该排班吗？',
        success: (res) => {
          if (res.confirm) {
            // 实际应该调用删除API
            uni.showToast({
              title: '删除成功',
              icon: 'success'
            })
          }
        }
      })
    },
    closePopup() {
      this.$refs.popup.close()
    },
    onTimeChange(e) {
      this.formData.time = e.detail.value
    },
    onTypeChange(e) {
      this.formData.typeIndex = e.detail.value
    },
    saveSchedule() {
      // 实际应该调用保存API
      uni.showLoading({
        title: '保存中...'
      })
      setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
          title: '保存成功',
          icon: 'success'
        })
        this.closePopup()
        this.loadScheduleList()
      }, 1000)
    }
  },
  onLoad() {
    this.initCalendar()
    this.selectedDate = `${this.currentYear}年${this.currentMonth}月${new Date().getDate()}日`
    this.loadScheduleList()
  }
}
</script>

<style>
.schedule-container {
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

.calendar-section {
  background-color: #ffffff;
  margin: 20rpx;
  border-radius: 12rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.calendar-header {
  margin-bottom: 30rpx;
}

.month-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
}

.month-selector .iconfont {
  font-size: 32rpx;
  color: #666666;
  padding: 0 20rpx;
}

.current-month {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.weekday-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 20rpx;
}

.weekday-header text {
  font-size: 24rpx;
  color: #999999;
}

.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10rpx;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 8rpx;
}

.calendar-day.other-month {
  opacity: 0.3;
}

.calendar-day.today {
  background-color: #4AB8B8;
}

.calendar-day.today .day-number {
  color: #ffffff;
}

.calendar-day.selected {
  background-color: rgba(74, 184, 184, 0.1);
}

.day-number {
  font-size: 28rpx;
  color: #333333;
}

.schedule-dot {
  width: 8rpx;
  height: 8rpx;
  background-color: #4AB8B8;
  border-radius: 4rpx;
  margin-top: 6rpx;
}

.schedule-list {
  background-color: #ffffff;
  margin: 20rpx;
  border-radius: 12rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.list-header .date {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.add-btn {
  display: flex;
  align-items: center;
  background-color: #4AB8B8;
  color: #ffffff;
  padding: 10rpx 20rpx;
  border-radius: 6rpx;
}

.add-btn .iconfont {
  font-size: 24rpx;
  margin-right: 6rpx;
}

.add-btn text {
  font-size: 24rpx;
}

.list-content {
  max-height: 600rpx;
}

.schedule-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.time-info {
  width: 200rpx;
}

.time {
  font-size: 28rpx;
  color: #333333;
  font-weight: bold;
  display: block;
}

.type {
  font-size: 24rpx;
  color: #4AB8B8;
  margin-top: 6rpx;
  display: block;
}

.schedule-info {
  flex: 1;
  margin: 0 20rpx;
}

.location {
  font-size: 28rpx;
  color: #333333;
  display: block;
}

.remark {
  font-size: 24rpx;
  color: #999999;
  margin-top: 6rpx;
  display: block;
}

.actions {
  display: flex;
  gap: 20rpx;
}

.action-btn {
  width: 60rpx;
  height: 60rpx;
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn.edit {
  background-color: rgba(74, 184, 184, 0.1);
}

.action-btn.delete {
  background-color: rgba(255, 107, 107, 0.1);
}

.action-btn .iconfont {
  font-size: 32rpx;
}

.action-btn.edit .iconfont {
  color: #4AB8B8;
}

.action-btn.delete .iconfont {
  color: #FF6B6B;
}

.empty-tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 0;
  color: #999999;
}

.empty-tip .iconfont {
  font-size: 80rpx;
  margin-bottom: 20rpx;
}

.empty-tip text {
  font-size: 28rpx;
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

.form-content {
  margin-bottom: 30rpx;
}

.form-item {
  margin-bottom: 30rpx;
}

.form-item .label {
  font-size: 28rpx;
  color: #666666;
  margin-bottom: 10rpx;
  display: block;
}

.picker-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 20rpx;
  border-radius: 8rpx;
}

.picker-content text {
  font-size: 28rpx;
  color: #333333;
}

.picker-content .iconfont {
  font-size: 24rpx;
  color: #999999;
}

input {
  background-color: #f5f5f5;
  padding: 20rpx;
  border-radius: 8rpx;
  font-size: 28rpx;
}

textarea {
  background-color: #f5f5f5;
  padding: 20rpx;
  border-radius: 8rpx;
  font-size: 28rpx;
  width: 100%;
  height: 160rpx;
}

.popup-footer {
  display: flex;
  gap: 20rpx;
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