<template>
  <view class="consult-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="iconfont icon-back"></text>
      </view>
      <text class="title">在线问诊</text>
      <view class="right-btn" @click="navigateTo('/pages/patient/consult-history')">
        <text class="iconfont icon-history"></text>
      </view>
    </view>

    <!-- 状态标签 -->
    <view class="status-tags">
      <view class="tag-section">
        <view 
          v-for="(status, index) in statusOptions" 
          :key="index"
          class="status-tag"
          :class="{ active: currentStatus === status.value }"
          @click="selectStatus(status.value)"
        >
          <text class="tag-name">{{status.name}}</text>
          <text class="tag-count" v-if="status.count > 0">({{status.count}})</text>
        </view>
      </view>
    </view>

    <!-- 搜索框 -->
    <view class="search-section">
      <view class="search-box">
        <text class="iconfont icon-search"></text>
        <input 
          type="text" 
          v-model="searchKey" 
          placeholder="搜索医生姓名或科室" 
          confirm-type="search"
          @input="handleSearch"
        />
        <text class="iconfont icon-clear" v-if="searchKey" @click="clearSearch"></text>
      </view>
    </view>

    <!-- 科室分类 -->
    <scroll-view scroll-x class="department-scroll" show-scrollbar="false">
      <view class="department-list">
        <view 
          v-for="(item, index) in departments" 
          :key="index"
          class="department-item"
          :class="{ active: currentDepartment === item.id }"
          @click="selectDepartment(item.id)"
        >
          <text>{{item.name}}</text>
        </view>
      </view>
    </scroll-view>

    <!-- 医生列表 -->
    <scroll-view 
      scroll-y 
      class="doctor-list"
      @scrolltolower="loadMore"
      refresher-enabled
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
    >
      <view 
        v-for="(doctor, index) in filteredDoctors" 
        :key="index" 
        class="doctor-card"
        @click="viewDoctorDetail(doctor)"
      >
        <view class="card-left">
          <image class="avatar" :src="doctor.avatar || '/static/default-avatar.png'" mode="aspectFill"></image>
          <view class="online-indicator" :class="{ online: doctor.isOnline }"></view>
        </view>
        <view class="card-middle">
          <view class="name-row">
            <text class="name">{{doctor.name}}</text>
            <text class="title">{{doctor.title}}</text>
          </view>
          <view class="department-row">
            <text class="department">{{doctor.department}}</text>
          </view>
          <view class="specialty-row">
            <text class="specialty-label">擅长：</text>
            <text class="specialty">{{doctor.specialty}}</text>
          </view>
          <view class="rating-row">
            <view class="stars">
              <text 
                v-for="n in 5" 
                :key="n" 
                class="iconfont" 
                :class="n <= doctor.rating ? 'icon-star-filled' : 'icon-star'"
              ></text>
            </view>
            <text class="rating-value">{{doctor.rating}}</text>
            <text class="consult-count">({{doctor.consultCount}}次问诊)</text>
          </view>
        </view>
        <view class="card-right">
          <view class="status-badge" :class="{ online: doctor.isOnline }">
            <text>{{doctor.isOnline ? '在线' : '离线'}}</text>
          </view>
          <view class="action-btn" :class="{ disabled: !doctor.isOnline }" @click.stop="startConsult(doctor)">
            <text>立即问诊</text>
          </view>
        </view>
      </view>
      <view class="empty-tip" v-if="filteredDoctors.length === 0">
        <text class="iconfont icon-empty"></text>
        <text>暂无符合条件的医生</text>
      </view>
      <view class="loading-tip" v-if="isLoading">
        <text class="iconfont icon-loading"></text>
        <text>加载中...</text>
      </view>
    </scroll-view>

    <!-- 底部提示 -->
    <view class="bottom-tip">
      <text>如需紧急医疗救助，请拨打急救电话120</text>
    </view>

    <!-- 浮动按钮 -->
    <view class="float-btn" @click="navigateTo('/pages/patient/family-doctor')">
      <view class="btn-inner">
        <text class="iconfont icon-family-doctor"></text>
        <text class="btn-text">我的家庭医生</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 新增：用于存储后端返回的用户信息
      userInfo: {
        username: '', // 用户名
        patientId: '', // 患者ID
        avatar: '/static/yonghu.png' // 头像（可选）
      },
      searchKey: '',
      currentDepartment: 'all',
      currentStatus: 'all',
      isRefreshing: false,
      isLoading: false,
      statusOptions: [
        { value: 'all', name: '全部', count: 10 },
        { value: 'online', name: '在线', count: 6 },
        { value: 'appointment', name: '可预约', count: 8 }
      ],
      departments: [
        { id: 'all', name: '全部科室' },
        { id: 'internal', name: '内科' },
        { id: 'surgery', name: '外科' },
        { id: 'endocrine', name: '内分泌科' },
        { id: 'cardiology', name: '心血管科' },
        { id: 'neurology', name: '神经内科' },
        { id: 'orthopedic', name: '骨科' },
        { id: 'ophthalmology', name: '眼科' },
        { id: 'ent', name: '耳鼻喉科' }
      ],
      doctors: [
        {
          id: 1,
          name: '张医生',
          title: '主任医师',
          department: '内分泌科',
          specialty: '糖尿病、甲状腺疾病',
          avatar: '/static/doctor-avatar.png',
          isOnline: true,
          rating: 4.9,
          consultCount: 2568
        },
        {
          id: 2,
          name: '李医生',
          title: '副主任医师',
          department: '内科',
          specialty: '糖尿病并发症、高血压',
          avatar: '/static/doctor-avatar.png',
          isOnline: true,
          rating: 4.7,
          consultCount: 1893
        },
        {
          id: 3,
          name: '王医生',
          title: '主治医师',
          department: '外科',
          specialty: '糖尿病足、慢性伤口',
          avatar: '/static/doctor-avatar.png',
          isOnline: false,
          rating: 4.5,
          consultCount: 1245
        },
        {
          id: 4,
          name: '刘医生',
          title: '主任医师',
          department: '心血管科',
          specialty: '冠心病、高血压、心力衰竭',
          avatar: '/static/doctor-avatar.png',
          isOnline: true,
          rating: 4.8,
          consultCount: 2103
        },
        {
          id: 5,
          name: '陈医生',
          title: '副主任医师',
          department: '神经内科',
          specialty: '脑卒中、头痛、癫痫',
          avatar: '/static/doctor-avatar.png',
          isOnline: false,
          rating: 4.6,
          consultCount: 1762
        }
      ]
    }
  },
  computed: {
    filteredDoctors() {
      return this.doctors.filter(doctor => {
        // 搜索关键词匹配
        const matchSearch = this.searchKey === '' || 
          doctor.name.includes(this.searchKey) || 
          doctor.department.includes(this.searchKey) ||
          doctor.specialty.includes(this.searchKey)
        
        // 科室匹配
        const matchDepartment = this.currentDepartment === 'all' || 
          doctor.department === this.departments.find(d => d.id === this.currentDepartment)?.name
        
        // 状态匹配
        const matchStatus = this.currentStatus === 'all' || 
          (this.currentStatus === 'online' && doctor.isOnline) ||
          (this.currentStatus === 'appointment' && true) // 假设所有医生都可预约
        
        return matchSearch && matchDepartment && matchStatus
      })
    }
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1
      })
    },
    handleSearch() {
      // 实时搜索，不需要额外操作
    },
    clearSearch() {
      this.searchKey = ''
    },
    selectDepartment(id) {
      this.currentDepartment = id
    },
    selectStatus(status) {
      this.currentStatus = status
    },
    viewDoctorDetail(doctor) {
      uni.navigateTo({
        url: `/pages/patient/doctor-detail?id=${doctor.id}`
      })
    },
    startConsult(doctor) {
      if (!doctor.isOnline) {
        uni.showModal({
          title: '医生不在线',
          content: '该医生当前不在线，您可以选择预约问诊或留言。',
          confirmText: '预约问诊',
          cancelText: '取消',
          success: (res) => {
            if (res.confirm) {
              uni.navigateTo({
                url: `/pages/patient/appointment?doctorId=${doctor.id}`
              })
            }
          }
        })
        return
      }
      
      uni.navigateTo({
        url: `/pages/patient/chat?doctorId=${doctor.id}`
      })
    },
    navigateTo(url) {
      uni.navigateTo({
        url
      })
    },
    loadMore() {
      if (this.isLoading) return
      this.isLoading = true
      // 实际应该调用加载更多API
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    onRefresh() {
      this.isRefreshing = true
      // 实际应该调用刷新API
      setTimeout(() => {
        this.isRefreshing = false
        uni.showToast({
          title: '刷新成功',
          icon: 'success'
        })
      }, 1000)
    },
    onShow() {
      // 页面显示时自动获取用户信息
      const userId = uni.getStorageSync('userId');
      const token = uni.getStorageSync('token');
      if (userId && token) {
        uni.request({
          url: `http://localhost:3000/api/patient/${userId}/profile`,
          method: 'GET',
          header: {
            Authorization: 'Bearer ' + token
          },
          success: (res) => {
            if (res.statusCode === 200 && res.data && res.data.length > 0) {
              this.userInfo = {
                username: res.data[0].name || res.data[0].username || '',
                patientId: res.data[0].patient_id || res.data[0].id || '',
                avatar: '/static/yonghu.png'
              };
            }
          },
          fail: (err) => {
            uni.showToast({ title: '获取用户信息失败', icon: 'none' });
          }
        });
      }
    }
  }
}
</script>

<style>
.consult-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 140rpx;
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

/* 状态标签样式 */
.status-tags {
  background-color: #ffffff;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.tag-section {
  display: flex;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  padding: 4rpx;
}

.status-tag {
  flex: 1;
  text-align: center;
  padding: 16rpx 0;
  font-size: 28rpx;
  color: #666666;
  border-radius: 6rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-tag.active {
  background-color: #ffffff;
  color: #4AB8B8;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.tag-name {
  margin-right: 6rpx;
}

.tag-count {
  font-size: 24rpx;
}

/* 搜索框样式 */
.search-section {
  background-color: #ffffff;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 30rpx;
  padding: 10rpx 20rpx;
}

.search-box .iconfont {
  font-size: 32rpx;
  color: #999999;
  margin-right: 10rpx;
}

.search-box input {
  flex: 1;
  height: 60rpx;
  font-size: 28rpx;
}

.search-box .icon-clear {
  font-size: 28rpx;
  color: #cccccc;
}

/* 科室分类样式 */
.department-scroll {
  background-color: #ffffff;
  padding: 20rpx 0;
  white-space: nowrap;
  border-bottom: 1rpx solid #f0f0f0;
}

.department-list {
  padding: 0 30rpx;
  display: inline-flex;
}

.department-item {
  padding: 12rpx 30rpx;
  margin-right: 20rpx;
  border-radius: 30rpx;
  font-size: 28rpx;
  color: #666666;
  background-color: #f5f5f5;
}

.department-item.active {
  background-color: #4AB8B8;
  color: #ffffff;
  box-shadow: 0 4rpx 12rpx rgba(74, 184, 184, 0.2);
}

/* 医生列表样式 */
.doctor-list {
  height: calc(100vh - 450rpx);
  padding: 20rpx 30rpx;
}

.doctor-card {
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  display: flex;
  position: relative;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.card-left {
  position: relative;
  margin-right: 20rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  background-color: #f0f0f0;
}

.online-indicator {
  position: absolute;
  width: 20rpx;
  height: 20rpx;
  border-radius: 10rpx;
  background-color: #cccccc;
  right: 0;
  bottom: 0;
  border: 4rpx solid #ffffff;
}

.online-indicator.online {
  background-color: #64D28D;
}

.card-middle {
  flex: 1;
  overflow: hidden;
}

.name-row {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
  margin-right: 16rpx;
}

.title {
  font-size: 24rpx;
  color: #4AB8B8;
  background-color: rgba(74, 184, 184, 0.1);
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
}

.department-row {
  margin-bottom: 6rpx;
}

.department {
  font-size: 26rpx;
  color: #666666;
}

.specialty-row {
  display: flex;
  margin-bottom: 10rpx;
}

.specialty-label {
  font-size: 24rpx;
  color: #999999;
}

.specialty {
  font-size: 24rpx;
  color: #666666;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rating-row {
  display: flex;
  align-items: center;
}

.stars {
  display: flex;
  margin-right: 10rpx;
}

.stars .iconfont {
  font-size: 24rpx;
  color: #cccccc;
  margin-right: 4rpx;
}

.stars .icon-star-filled {
  color: #FFA53D;
}

.rating-value {
  font-size: 24rpx;
  color: #FFA53D;
  margin-right: 6rpx;
}

.consult-count {
  font-size: 22rpx;
  color: #999999;
}

.card-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  margin-left: 20rpx;
}

.status-badge {
  font-size: 22rpx;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
  background-color: #f5f5f5;
  color: #999999;
}

.status-badge.online {
  background-color: rgba(100, 210, 141, 0.1);
  color: #64D28D;
}

.action-btn {
  background-color: #4AB8B8;
  color: #ffffff;
  font-size: 24rpx;
  padding: 10rpx 20rpx;
  border-radius: 30rpx;
  margin-top: 20rpx;
}

.action-btn.disabled {
  background-color: #cccccc;
}

/* 空状态和加载提示 */
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

.loading-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30rpx 0;
  color: #999999;
}

.loading-tip .iconfont {
  font-size: 32rpx;
  margin-right: 10rpx;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 底部提示 */
.bottom-tip {
  text-align: center;
  padding: 30rpx;
  font-size: 24rpx;
  color: #999999;
}

/* 浮动按钮样式 */
.float-btn {
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  z-index: 100;
}

.btn-inner {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 20rpx 30rpx;
  border-radius: 40rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.btn-inner .iconfont {
  font-size: 40rpx;
  color: #4AB8B8;
  margin-right: 10rpx;
}

.btn-text {
  font-size: 28rpx;
  color: #333333;
}
</style> 