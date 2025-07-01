<template>
  <view class="follow-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="iconfont icon-back"></text>
      </view>
      <text class="title">随访管理</text>
      <view class="right-btn" @click="refreshFollow">
        <text class="iconfont icon-refresh"></text>
      </view>
    </view>

    <!-- 状态筛选 -->
    <view class="filter-section">
      <view class="tab-group">
        <view 
          v-for="(tab, index) in statusTabs" 
          :key="index"
          class="tab-item"
          :class="{ active: currentTab === index }"
          @click="switchTab(index)"
        >
          <text>{{tab.name}}</text>
          <text class="count" v-if="tab.count > 0">({{tab.count}})</text>
        </view>
      </view>
    </view>

    <!-- 随访列表 -->
    <scroll-view 
      scroll-y 
      class="follow-list"
      @scrolltolower="loadMore"
      refresher-enabled
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
    >
      <view 
        v-for="(item, index) in followList" 
        :key="index"
        class="follow-item"
      >
        <view class="patient-info">
          <view class="basic-info">
            <text class="name">{{item.patientName}}</text>
            <text class="gender">{{item.gender}}</text>
            <text class="age">{{item.age}}岁</text>
            <text class="id">ID: {{item.patientId}}</text>
          </view>
          <view class="doctor-info">
            <text class="label">主治医生：</text>
            <text class="value">{{item.doctorName}}</text>
          </view>
        </view>
        <view class="follow-info">
          <view class="info-row">
            <text class="label">随访时间：</text>
            <text class="value">{{item.followTime}}</text>
          </view>
          <view class="info-row">
            <text class="label">随访方式：</text>
            <text class="value">{{item.followType}}</text>
          </view>
          <view class="info-row">
            <text class="label">随访内容：</text>
            <text class="value">{{item.content}}</text>
          </view>
        </view>
        <view class="status-tag" :class="item.status">
          <text>{{getStatusText(item.status)}}</text>
        </view>
        <view class="actions">
          <view class="action-btn edit" @click="editFollow(item)">
            <text class="iconfont icon-edit"></text>
            <text>编辑</text>
          </view>
          <view class="action-btn complete" @click="completeFollow(item)" v-if="item.status === 'pending'">
            <text class="iconfont icon-check"></text>
            <text>完成</text>
          </view>
          <view class="action-btn delete" @click="deleteFollow(item)">
            <text class="iconfont icon-delete"></text>
            <text>删除</text>
          </view>
        </view>
      </view>
      <view class="empty-tip" v-if="followList.length === 0">
        <text class="iconfont icon-empty"></text>
        <text>暂无随访记录</text>
      </view>
      <view class="loading-tip" v-if="isLoading">
        <text class="iconfont icon-loading"></text>
        <text>加载中...</text>
      </view>
    </scroll-view>

    <!-- 添加随访按钮 -->
    <view class="add-btn" @click="showAddFollow">
      <text class="iconfont icon-add"></text>
      <text>添加随访</text>
    </view>

    <!-- 添加/编辑随访弹窗 -->
    <uni-popup ref="popup" type="bottom">
      <view class="popup-content">
        <view class="popup-header">
          <text class="title">{{isEdit ? '编辑随访' : '添加随访'}}</text>
          <text class="close-btn iconfont icon-close" @click="closePopup"></text>
        </view>
        <view class="form-content">
          <view class="form-item">
            <text class="label">患者</text>
            <picker mode="selector" :range="patientList" range-key="name" :value="formData.patientIndex" @change="onPatientChange">
              <view class="picker-content">
                <text>{{patientList[formData.patientIndex].name}}</text>
                <text class="iconfont icon-down"></text>
              </view>
            </picker>
          </view>
          <view class="form-item">
            <text class="label">随访时间</text>
            <picker mode="date" :value="formData.followTime" @change="onTimeChange">
              <view class="picker-content">
                <text>{{formData.followTime}}</text>
                <text class="iconfont icon-calendar"></text>
              </view>
            </picker>
          </view>
          <view class="form-item">
            <text class="label">随访方式</text>
            <picker mode="selector" :range="followTypes" :value="formData.typeIndex" @change="onTypeChange">
              <view class="picker-content">
                <text>{{followTypes[formData.typeIndex]}}</text>
                <text class="iconfont icon-down"></text>
              </view>
            </picker>
          </view>
          <view class="form-item">
            <text class="label">随访内容</text>
            <textarea v-model="formData.content" placeholder="请输入随访内容" />
          </view>
        </view>
        <view class="popup-footer">
          <button class="cancel-btn" @click="closePopup">取消</button>
          <button class="confirm-btn" @click="saveFollow">确定</button>
        </view>
      </view>
    </uni-popup>

    <!-- 底部导航 -->
    <view class="tab-bar">
      <view class="tab-item" @click="navigateTo('/pages/nurse/index')">
        <text class="tab-icon">首</text>
        <text class="tab-text">首页</text>
      </view>
      <view class="tab-item active">
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
      statusTabs: [
        { name: '待随访', count: 12 },
        { name: '已完成', count: 8 },
        { name: '已取消', count: 2 }
      ],
      currentTab: 0,
      followList: [],
      isRefreshing: false,
      isLoading: false,
      isEdit: false,
      patientList: [
        { id: '001', name: '张三' },
        { id: '002', name: '李四' },
        { id: '003', name: '王五' }
      ],
      followTypes: ['电话随访', '上门随访', '视频随访', '其他'],
      formData: {
        patientIndex: 0,
        followTime: '',
        typeIndex: 0,
        content: ''
      }
    }
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1
      })
    },
    refreshFollow() {
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
    switchTab(index) {
      this.currentTab = index
      this.loadFollowList()
    },
    loadFollowList() {
      // 实际应该调用API获取随访列表
      this.followList = [
        {
          patientId: '001',
          patientName: '张三',
          gender: '男',
          age: 45,
          doctorName: '李医生',
          followTime: '2024-03-20',
          followType: '电话随访',
          content: '患者恢复情况良好，建议继续按医嘱服药',
          status: 'pending'
        },
        {
          patientId: '002',
          patientName: '李四',
          gender: '女',
          age: 38,
          doctorName: '王医生',
          followTime: '2024-03-19',
          followType: '上门随访',
          content: '患者反映有轻微不适，建议及时复查',
          status: 'completed'
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
    getStatusText(status) {
      const statusMap = {
        pending: '待随访',
        completed: '已完成',
        cancelled: '已取消'
      }
      return statusMap[status] || status
    },
    showAddFollow() {
      this.isEdit = false
      this.formData = {
        patientIndex: 0,
        followTime: this.formatDate(new Date()),
        typeIndex: 0,
        content: ''
      }
      this.$refs.popup.open()
    },
    editFollow(item) {
      this.isEdit = true
      this.formData = {
        patientIndex: this.patientList.findIndex(p => p.id === item.patientId),
        followTime: item.followTime,
        typeIndex: this.followTypes.indexOf(item.followType),
        content: item.content
      }
      this.$refs.popup.open()
    },
    completeFollow(item) {
      uni.showModal({
        title: '提示',
        content: '确定要将该随访标记为已完成吗？',
        success: (res) => {
          if (res.confirm) {
            // 实际应该调用完成API
            uni.showToast({
              title: '操作成功',
              icon: 'success'
            })
          }
        }
      })
    },
    deleteFollow(item) {
      uni.showModal({
        title: '提示',
        content: '确定要删除该随访记录吗？',
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
    onPatientChange(e) {
      this.formData.patientIndex = e.detail.value
    },
    onTimeChange(e) {
      this.formData.followTime = e.detail.value
    },
    onTypeChange(e) {
      this.formData.typeIndex = e.detail.value
    },
    formatDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    saveFollow() {
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
        this.loadFollowList()
      }, 1000)
    }
  },
  onLoad() {
    this.loadFollowList()
  }
}
</script>

<style>
.follow-container {
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

.filter-section {
  background-color: #ffffff;
  padding: 20rpx;
  margin-bottom: 20rpx;
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
  font-size: 28rpx;
  color: #666666;
  border-radius: 6rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-item.active {
  background-color: #ffffff;
  color: #4AB8B8;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.tab-item .count {
  font-size: 24rpx;
  margin-left: 6rpx;
}

.follow-list {
  height: calc(100vh - 200rpx);
}

.follow-item {
  background-color: #ffffff;
  margin: 20rpx;
  border-radius: 12rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  position: relative;
}

.patient-info {
  margin-bottom: 20rpx;
}

.basic-info {
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
}

.id {
  font-size: 24rpx;
  color: #999999;
}

.doctor-info {
  font-size: 24rpx;
  color: #666666;
}

.follow-info {
  background-color: #f5f5f5;
  border-radius: 8rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.info-row {
  display: flex;
  margin-bottom: 10rpx;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-row .label {
  font-size: 24rpx;
  color: #999999;
  width: 140rpx;
}

.info-row .value {
  font-size: 24rpx;
  color: #333333;
  flex: 1;
}

.status-tag {
  position: absolute;
  top: 30rpx;
  right: 30rpx;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}

.status-tag.pending {
  background-color: rgba(255, 165, 61, 0.1);
  color: #FFA53D;
}

.status-tag.completed {
  background-color: rgba(74, 184, 184, 0.1);
  color: #4AB8B8;
}

.status-tag.cancelled {
  background-color: rgba(153, 153, 153, 0.1);
  color: #999999;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 20rpx;
}

.action-btn {
  display: flex;
  align-items: center;
  padding: 10rpx 20rpx;
  border-radius: 6rpx;
  font-size: 24rpx;
}

.action-btn .iconfont {
  font-size: 24rpx;
  margin-right: 6rpx;
}

.action-btn.edit {
  background-color: rgba(74, 184, 184, 0.1);
  color: #4AB8B8;
}

.action-btn.complete {
  background-color: rgba(255, 165, 61, 0.1);
  color: #FFA53D;
}

.action-btn.delete {
  background-color: rgba(255, 107, 107, 0.1);
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