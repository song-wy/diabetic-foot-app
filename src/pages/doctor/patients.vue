<template>
  <view class="patients-container">
    <!-- 顶部标题栏 -->
    <view class="header">
      <text class="title">患者管理</text>
    </view>

    <!-- 搜索和筛选区域 -->
    <view class="search-filter">
      <view class="search-box">
        <text class="iconfont icon-search"></text>
        <input 
          type="text" 
          v-model="searchKey" 
          placeholder="搜索患者姓名/ID" 
          @input="handleSearch"
        />
      </view>
      <view class="filter-box">
        <picker 
          mode="selector" 
          :range="filterOptions" 
          range-key="label"
          @change="handleFilterChange"
        >
          <view class="filter-btn">
            <text>{{currentFilter.label}}</text>
            <text class="iconfont icon-down"></text>
          </view>
        </picker>
      </view>
    </view>

    <!-- 患者列表 -->
    <scroll-view scroll-y class="patient-list">
      <view 
        v-for="(patient, index) in filteredPatients" 
        :key="index"
        class="patient-card"
        @click="viewPatientDetail(patient)"
      >
        <view class="basic-info">
          <image class="avatar" :src="patient.avatar || '/static/avatar.svg'" mode="aspectFill"></image>
          <view class="info">
            <view class="name-id">
              <text class="name">{{patient.name}}</text>
              <text class="id">ID: {{patient.patientId}}</text>
            </view>
            <view class="tags">
              <text class="tag" :class="patient.gender">{{patient.gender === 'male' ? '男' : '女'}}</text>
              <text class="tag age">{{patient.age}}岁</text>
              <text class="tag" :class="patient.riskLevel">{{patient.riskLevel}}</text>
            </view>
          </view>
        </view>
        <view class="medical-info">
          <view class="info-item">
            <text class="label">最近血糖</text>
            <text class="value">{{patient.lastBloodSugar}} mmol/L</text>
          </view>
          <view class="info-item">
            <text class="label">上次随访</text>
            <text class="value">{{patient.lastVisit}}</text>
          </view>
          <view class="info-item">
            <text class="label">下次随访</text>
            <text class="value">{{patient.nextVisit}}</text>
          </view>
        </view>
        <view class="action-buttons">
          <view class="btn consult" @click.stop="startConsult(patient)">
            <text class="iconfont icon-message"></text>
            <text>发起咨询</text>
          </view>
          <view class="btn follow" @click.stop="addFollowUp(patient)">
            <text class="iconfont icon-edit"></text>
            <text>随访记录</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 添加患者按钮 -->
    <view class="add-patient" @click="navigateTo('/pages/doctor/add-patient')">
      <text class="iconfont icon-add"></text>
    </view>
    <!-- 底部导航 -->
    <view class="tab-bar">
      <view class="tab-item" @click="navigateTo('/pages/doctor/index')">
        <text class="tab-icon">首</text>
        <text class="tab-text">首页</text>
      </view>
      <view class="tab-item active">
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
      searchKey: '',
      filterOptions: [
        { value: 'all', label: '全部患者' },
        { value: 'high-risk', label: '高危患者' },
        { value: 'follow-up', label: '待随访' },
        { value: 'new', label: '新入组' }
      ],
      currentFilter: { value: 'all', label: '全部患者' },
      patients: [
        {
          id: 1,
          name: '张三',
          patientId: 'P202403150001',
          gender: 'male',
          age: 45,
          avatar: '',
          riskLevel: '高危',
          lastBloodSugar: '7.8',
          lastVisit: '2024-03-10',
          nextVisit: '2024-03-24'
        },
        {
          id: 2,
          name: '李四',
          patientId: 'P202403150002',
          gender: 'female',
          age: 58,
          avatar: '',
          riskLevel: '中危',
          lastBloodSugar: '6.2',
          lastVisit: '2024-03-12',
          nextVisit: '2024-03-26'
        },
        {
          id: 3,
          name: '王五',
          patientId: 'P202403150003',
          gender: 'male',
          age: 62,
          avatar: '',
          riskLevel: '低危',
          lastBloodSugar: '5.6',
          lastVisit: '2024-03-15',
          nextVisit: '2024-03-29'
        }
      ]
    }
  },
  computed: {
    filteredPatients() {
      return this.patients.filter(patient => {
        const matchSearch = this.searchKey === '' || 
          patient.name.includes(this.searchKey) || 
          patient.patientId.includes(this.searchKey)
        
        const matchFilter = this.currentFilter.value === 'all' || 
          (this.currentFilter.value === 'high-risk' && patient.riskLevel === '高危') ||
          (this.currentFilter.value === 'follow-up' && new Date(patient.nextVisit) <= new Date()) ||
          (this.currentFilter.value === 'new' && new Date(patient.lastVisit) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
        
        return matchSearch && matchFilter
      })
    }
  },
  methods: {
    handleSearch(e) {
      this.searchKey = e.detail.value
    },
    handleFilterChange(e) {
      this.currentFilter = this.filterOptions[e.detail.value]
    },
    viewPatientDetail(patient) {
      uni.navigateTo({
        url: `/pages/doctor/patient-detail?id=${patient.id}`
      })
    },
    startConsult(patient) {
      uni.navigateTo({
        url: `/pages/doctor/chat?patientId=${patient.id}`
      })
    },
    addFollowUp(patient) {
      uni.navigateTo({
        url: `/pages/doctor/follow-up?patientId=${patient.id}`
      })
    },
    navigateTo(url) {
      uni.navigateTo({
        url
      })
    }
  }
}
</script>

<style>
.patients-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 100rpx;
}

.header {
  background-color: #4AB8B8;
  padding: 60rpx 30rpx 30rpx;
  color: #ffffff;
}

.header .title {
  font-size: 36rpx;
  font-weight: bold;
}

.search-filter {
  padding: 20rpx;
  display: flex;
  align-items: center;
  background-color: #ffffff;
}

.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  padding: 16rpx 20rpx;
  margin-right: 20rpx;
}

.search-box .icon-search {
  font-size: 32rpx;
  color: #999999;
  margin-right: 10rpx;
}

.search-box input {
  flex: 1;
  font-size: 28rpx;
}

.filter-box {
  width: 180rpx;
}

.filter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16rpx 20rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
}

.filter-btn text {
  font-size: 28rpx;
  color: #666666;
}

.filter-btn .icon-down {
  font-size: 24rpx;
  margin-left: 6rpx;
}

.patient-list {
  padding: 20rpx;
}

.patient-card {
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.basic-info {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50rpx;
  margin-right: 20rpx;
}

.info {
  flex: 1;
}

.name-id {
  margin-bottom: 10rpx;
}

.name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
  margin-right: 20rpx;
}

.id {
  font-size: 24rpx;
  color: #999999;
}

.tags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  font-size: 24rpx;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  margin-right: 16rpx;
  margin-bottom: 8rpx;
}

.tag.male {
  background-color: #E8F3F3;
  color: #4AB8B8;
}

.tag.female {
  background-color: #FFF0F0;
  color: #FF6B6B;
}

.tag.age {
  background-color: #F5F5F5;
  color: #999999;
}

.tag.高危 {
  background-color: #FFF0F0;
  color: #FF6B6B;
}

.tag.中危 {
  background-color: #FFF7E6;
  color: #FFA53D;
}

.tag.低危 {
  background-color: #E8F3F3;
  color: #4AB8B8;
}

.medical-info {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 0;
  border-top: 1rpx solid #f5f5f5;
  border-bottom: 1rpx solid #f5f5f5;
  margin-bottom: 20rpx;
}

.info-item {
  text-align: center;
}

.info-item .label {
  font-size: 24rpx;
  color: #999999;
  margin-bottom: 6rpx;
  display: block;
}

.info-item .value {
  font-size: 28rpx;
  color: #333333;
  display: block;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
}

.btn {
  display: flex;
  align-items: center;
  padding: 12rpx 24rpx;
  border-radius: 32rpx;
  margin-left: 20rpx;
}

.btn .iconfont {
  font-size: 28rpx;
  margin-right: 6rpx;
}

.btn.consult {
  background-color: #4AB8B8;
  color: #ffffff;
}

.btn.follow {
  background-color: #E8F3F3;
  color: #4AB8B8;
}

.add-patient {
  position: fixed;
  right: 30rpx;
  bottom: 120rpx;
  width: 100rpx;
  height: 100rpx;
  background-color: #4AB8B8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(74, 184, 184, 0.3);
}

.add-patient .icon-add {
  font-size: 48rpx;
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