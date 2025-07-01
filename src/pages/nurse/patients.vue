<template>
  <view class="patients-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="iconfont icon-back"></text>
      </view>
      <text class="title">患者管理</text>
      <view class="right-btn" @click="refreshPatients">
        <text class="iconfont icon-refresh"></text>
      </view>
    </view>

    <!-- 搜索栏 -->
    <view class="search-section">
      <view class="search-bar">
        <text class="iconfont icon-search"></text>
        <input 
          type="text" 
          v-model="searchKey" 
          placeholder="搜索患者姓名或ID" 
          confirm-type="search"
          @input="onSearch"
        />
        <text class="iconfont icon-clear" v-if="searchKey" @click="clearSearch"></text>
      </view>
      <view class="filter-btn" @click="showFilterPopup">
        <text class="iconfont icon-filter"></text>
      </view>
    </view>

    <!-- 筛选标签 -->
    <view class="tags-section" v-if="activeTags.length > 0">
      <scroll-view scroll-x class="tags-scroll">
        <view class="tags-content">
          <view 
            v-for="(tag, index) in activeTags" 
            :key="index"
            class="tag-item"
          >
            <text>{{tag}}</text>
            <text class="iconfont icon-close" @click="removeTag(index)"></text>
          </view>
        </view>
      </scroll-view>
      <view class="clear-tags" @click="clearAllTags">
        <text>清除</text>
      </view>
    </view>

    <!-- 患者列表 -->
    <scroll-view 
      scroll-y 
      class="patient-list"
      @scrolltolower="loadMore"
      refresher-enabled
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
    >
      <view 
        v-for="(item, index) in patientList" 
        :key="index"
        class="patient-item"
        @click="viewPatient(item)"
      >
        <view class="patient-basic">
          <view class="avatar-section">
            <image class="avatar" :src="item.avatar || '/static/default-avatar.png'" mode="aspectFill"></image>
          </view>
          <view class="info-section">
            <view class="name-row">
              <text class="name">{{item.name}}</text>
              <text class="gender">{{item.gender}}</text>
              <text class="age">{{item.age}}岁</text>
            </view>
            <view class="id-row">
              <text class="id">ID: {{item.id}}</text>
              <text class="tel">电话: {{item.tel}}</text>
            </view>
          </view>
        </view>
        <view class="patient-medical">
          <view class="doctor-row">
            <text class="label">主治医生:</text>
            <text class="value">{{item.doctor}}</text>
          </view>
          <view class="follow-row">
            <view class="follow-item">
              <text class="label">上次随访:</text>
              <text class="value">{{item.lastFollow || '暂无'}}</text>
            </view>
            <view class="follow-item">
              <text class="label">下次随访:</text>
              <text class="value" :class="{ highlight: isUpcoming(item.nextFollow) }">{{item.nextFollow || '暂无'}}</text>
            </view>
          </view>
          <view class="tags-row">
            <view 
              v-for="(tag, tagIndex) in item.tags" 
              :key="tagIndex"
              class="tag"
              :class="getTagClass(tag.type)"
            >
              {{tag.name}}
            </view>
          </view>
        </view>
        <view class="corner-arrow">
          <text class="iconfont icon-right"></text>
        </view>
      </view>
      <view class="empty-tip" v-if="patientList.length === 0">
        <text class="iconfont icon-empty"></text>
        <text>暂无患者</text>
      </view>
      <view class="loading-tip" v-if="isLoading">
        <text class="iconfont icon-loading"></text>
        <text>加载中...</text>
      </view>
    </scroll-view>

    <!-- 添加患者按钮 -->
    <view class="add-btn" @click="showAddPatient">
      <text class="iconfont icon-add"></text>
      <text>添加患者</text>
    </view>

    <!-- 筛选弹窗 -->
    <uni-popup ref="filterPopup" type="bottom">
      <view class="popup-content">
        <view class="popup-header">
          <text class="title">筛选患者</text>
          <text class="close-btn iconfont icon-close" @click="closeFilterPopup"></text>
        </view>
        <view class="filter-content">
          <view class="filter-section">
            <text class="section-title">患者分类</text>
            <view class="checkbox-group">
              <view 
                v-for="(item, index) in patientTypes" 
                :key="index"
                class="checkbox-item"
                :class="{ checked: item.checked }"
                @click="toggleCheckbox('patientTypes', index)"
              >
                <text class="checkbox">
                  <text class="iconfont icon-check" v-if="item.checked"></text>
                </text>
                <text class="label">{{item.name}}</text>
              </view>
            </view>
          </view>
          <view class="filter-section">
            <text class="section-title">随访状态</text>
            <view class="checkbox-group">
              <view 
                v-for="(item, index) in followStatus" 
                :key="index"
                class="checkbox-item"
                :class="{ checked: item.checked }"
                @click="toggleCheckbox('followStatus', index)"
              >
                <text class="checkbox">
                  <text class="iconfont icon-check" v-if="item.checked"></text>
                </text>
                <text class="label">{{item.name}}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="popup-footer">
          <button class="reset-btn" @click="resetFilter">重置</button>
          <button class="apply-btn" @click="applyFilter">确定</button>
        </view>
      </view>
    </uni-popup>

    <!-- 底部导航 -->
    <view class="tab-bar">
      <view class="tab-item" @click="navigateTo('/pages/nurse/index')">
        <text class="tab-icon">首</text>
        <text class="tab-text">首页</text>
      </view>
      <view class="tab-item" @click="navigateTo('/pages/nurse/follow')">
        <text class="tab-icon">访</text>
        <text class="tab-text">回访</text>
      </view>
      <view class="tab-item active">
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
      searchKey: '',
      patientList: [],
      isRefreshing: false,
      isLoading: false,
      activeTags: [],
      patientTypes: [
        { name: '高血压', checked: false },
        { name: '糖尿病', checked: false },
        { name: '冠心病', checked: false },
        { name: '脑卒中', checked: false }
      ],
      followStatus: [
        { name: '待随访', checked: false },
        { name: '按时随访', checked: false },
        { name: '随访超期', checked: false },
        { name: '暂无随访', checked: false }
      ]
    }
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1
      })
    },
    refreshPatients() {
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
    onSearch() {
      this.loadPatientList()
    },
    clearSearch() {
      this.searchKey = ''
      this.loadPatientList()
    },
    showFilterPopup() {
      this.$refs.filterPopup.open()
    },
    closeFilterPopup() {
      this.$refs.filterPopup.close()
    },
    toggleCheckbox(type, index) {
      this[type][index].checked = !this[type][index].checked
    },
    resetFilter() {
      this.patientTypes.forEach(item => item.checked = false)
      this.followStatus.forEach(item => item.checked = false)
    },
    applyFilter() {
      this.activeTags = []
      
      this.patientTypes.forEach(item => {
        if (item.checked) {
          this.activeTags.push(item.name)
        }
      })
      
      this.followStatus.forEach(item => {
        if (item.checked) {
          this.activeTags.push(item.name)
        }
      })
      
      this.closeFilterPopup()
      this.loadPatientList()
    },
    removeTag(index) {
      const tag = this.activeTags[index]
      
      this.patientTypes.forEach(item => {
        if (item.name === tag) {
          item.checked = false
        }
      })
      
      this.followStatus.forEach(item => {
        if (item.name === tag) {
          item.checked = false
        }
      })
      
      this.activeTags.splice(index, 1)
      this.loadPatientList()
    },
    clearAllTags() {
      this.activeTags = []
      this.resetFilter()
      this.loadPatientList()
    },
    loadPatientList() {
      // 实际应该调用API获取患者列表
      this.patientList = [
        {
          id: 'P20240301',
          name: '张三',
          gender: '男',
          age: 68,
          tel: '138****6789',
          avatar: '',
          doctor: '王主任',
          lastFollow: '2024-03-01',
          nextFollow: '2024-04-01',
          tags: [
            { name: '高血压', type: 'disease' },
            { name: '糖尿病', type: 'disease' },
            { name: '待随访', type: 'status' }
          ]
        },
        {
          id: 'P20240302',
          name: '李四',
          gender: '女',
          age: 62,
          tel: '139****5678',
          avatar: '',
          doctor: '李医生',
          lastFollow: '2024-02-15',
          nextFollow: '2024-03-15',
          tags: [
            { name: '冠心病', type: 'disease' },
            { name: '随访超期', type: 'status' }
          ]
        },
        {
          id: 'P20240303',
          name: '王五',
          gender: '男',
          age: 72,
          tel: '137****4567',
          avatar: '',
          doctor: '张医生',
          lastFollow: '2024-02-28',
          nextFollow: '2024-03-28',
          tags: [
            { name: '脑卒中', type: 'disease' },
            { name: '高血压', type: 'disease' },
            { name: '待随访', type: 'status' }
          ]
        }
      ]
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
    viewPatient(item) {
      uni.navigateTo({
        url: `/pages/nurse/patientDetail?id=${item.id}`
      })
    },
    showAddPatient() {
      uni.navigateTo({
        url: '/pages/nurse/addPatient'
      })
    },
    getTagClass(type) {
      return {
        'tag-disease': type === 'disease',
        'tag-status': type === 'status'
      }
    },
    isUpcoming(date) {
      if (!date) return false
      const upcoming = new Date(date)
      const now = new Date()
      const diffDays = Math.floor((upcoming - now) / (24 * 60 * 60 * 1000))
      return diffDays >= 0 && diffDays <= 7
    }
  },
  onLoad() {
    this.loadPatientList()
  }
}
</script>

<style>
.patients-container {
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

.search-section {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 30rpx;
  padding: 10rpx 20rpx;
  margin-right: 20rpx;
}

.search-bar .iconfont {
  font-size: 32rpx;
  color: #999999;
  margin-right: 10rpx;
}

.search-bar input {
  flex: 1;
  height: 60rpx;
  font-size: 28rpx;
}

.search-bar .icon-clear {
  font-size: 28rpx;
}

.filter-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 30rpx;
}

.filter-btn .iconfont {
  font-size: 36rpx;
  color: #666666;
}

.tags-section {
  display: flex;
  align-items: center;
  padding: 10rpx 20rpx;
  background-color: #ffffff;
  border-top: 1rpx solid #f0f0f0;
}

.tags-scroll {
  flex: 1;
  white-space: nowrap;
}

.tags-content {
  display: inline-flex;
  padding: 6rpx 0;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  background-color: #f0f6f6;
  padding: 6rpx 16rpx;
  border-radius: 30rpx;
  margin-right: 16rpx;
  font-size: 24rpx;
  color: #4AB8B8;
}

.tag-item .iconfont {
  font-size: 24rpx;
  margin-left: 8rpx;
}

.clear-tags {
  margin-left: 20rpx;
  font-size: 24rpx;
  color: #999999;
  padding: 6rpx 10rpx;
}

.patient-list {
  height: calc(100vh - 200rpx);
}

.patient-item {
  background-color: #ffffff;
  margin: 20rpx;
  border-radius: 12rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  position: relative;
}

.patient-basic {
  display: flex;
  margin-bottom: 20rpx;
}

.avatar-section {
  margin-right: 20rpx;
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50rpx;
  background-color: #f0f0f0;
}

.info-section {
  flex: 1;
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
  margin-right: 20rpx;
}

.gender, .age {
  font-size: 24rpx;
  color: #666666;
  margin-right: 20rpx;
  background-color: #f5f5f5;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
}

.id-row {
  font-size: 24rpx;
  color: #999999;
  display: flex;
  align-items: center;
}

.id {
  margin-right: 30rpx;
}

.patient-medical {
  background-color: #f8f8f8;
  border-radius: 8rpx;
  padding: 20rpx;
}

.doctor-row {
  font-size: 26rpx;
  margin-bottom: 16rpx;
}

.doctor-row .label {
  color: #999999;
  margin-right: 10rpx;
}

.doctor-row .value {
  color: #666666;
  font-weight: bold;
}

.follow-row {
  display: flex;
  margin-bottom: 16rpx;
}

.follow-item {
  flex: 1;
  font-size: 24rpx;
}

.follow-item .label {
  color: #999999;
  margin-right: 10rpx;
}

.follow-item .value {
  color: #666666;
}

.follow-item .value.highlight {
  color: #FF9645;
  font-weight: bold;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  font-size: 22rpx;
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
  margin-right: 12rpx;
  margin-bottom: 8rpx;
}

.tag-disease {
  background-color: rgba(74, 184, 184, 0.1);
  color: #4AB8B8;
}

.tag-status {
  background-color: rgba(255, 150, 69, 0.1);
  color: #FF9645;
}

.corner-arrow {
  position: absolute;
  right: 30rpx;
  top: 50%;
  transform: translateY(-50%);
}

.corner-arrow .iconfont {
  font-size: 36rpx;
  color: #cccccc;
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

.add-btn {
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

.add-btn .iconfont {
  font-size: 32rpx;
  margin-right: 10rpx;
}

.add-btn text {
  font-size: 28rpx;
}

.popup-content {
  background-color: #ffffff;
  border-radius: 24rpx 24rpx 0 0;
  padding: 30rpx;
  max-height: 80vh;
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

.filter-content {
  max-height: 60vh;
  overflow-y: auto;
}

.filter-section {
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 28rpx;
  color: #333333;
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
}

.checkbox-item {
  display: flex;
  align-items: center;
  margin-right: 30rpx;
  margin-bottom: 20rpx;
  padding: 10rpx 0;
}

.checkbox {
  width: 36rpx;
  height: 36rpx;
  border-radius: 6rpx;
  border: 1rpx solid #cccccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10rpx;
}

.checkbox-item.checked .checkbox {
  background-color: #4AB8B8;
  border-color: #4AB8B8;
}

.checkbox-item.checked .iconfont {
  color: #ffffff;
  font-size: 24rpx;
}

.checkbox-item .label {
  font-size: 28rpx;
  color: #666666;
}

.popup-footer {
  display: flex;
  gap: 20rpx;
  margin-top: 30rpx;
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

.reset-btn {
  background-color: #f5f5f5;
  color: #666666;
}

.apply-btn {
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