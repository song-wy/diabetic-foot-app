<template>
  <view class="users-container">
    <!-- 顶部搜索栏 -->
    <view class="search-bar">
      <view class="search-input">
        <text class="iconfont icon-search"></text>
        <input 
          type="text" 
          v-model="searchKey" 
          placeholder="搜索用户名/姓名" 
          @input="onSearch"
        />
      </view>
      <view class="filter-btn" @click="showFilter">
        <text class="iconfont icon-filter"></text>
      </view>
    </view>

    <!-- 用户列表 -->
    <scroll-view scroll-y class="user-list">
      <view 
        v-for="(user, index) in userList" 
        :key="index"
        class="user-item"
      >
        <view class="basic-info">
          <view class="left">
            <text class="name">{{user.name}}</text>
            <text class="username">@{{user.username}}</text>
          </view>
          <view class="right">
            <text class="role" :class="user.role">{{user.roleText}}</text>
          </view>
        </view>
        <view class="detail-info">
          <view class="info-row">
            <text class="label">部门：</text>
            <text class="value">{{user.department}}</text>
          </view>
          <view class="info-row">
            <text class="label">状态：</text>
            <text class="value" :class="user.status">{{user.statusText}}</text>
          </view>
          <view class="info-row">
            <text class="label">最后登录：</text>
            <text class="value">{{user.lastLogin}}</text>
          </view>
        </view>
        <view class="actions">
          <view class="btn edit" @click="editUser(user)">
            <text class="iconfont icon-edit"></text>
            <text>编辑</text>
          </view>
          <view class="btn reset" @click="resetPassword(user)">
            <text class="iconfont icon-lock"></text>
            <text>重置密码</text>
          </view>
          <view class="btn" :class="user.status === 'active' ? 'disable' : 'enable'" @click="toggleUserStatus(user)">
            <text class="iconfont" :class="user.status === 'active' ? 'icon-disable' : 'icon-enable'"></text>
            <text>{{user.status === 'active' ? '禁用' : '启用'}}</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 添加用户按钮 -->
    <view class="add-btn" @click="showAddUser">
      <text class="iconfont icon-add"></text>
    </view>

    <!-- 筛选弹窗 -->
    <uni-popup ref="filterPopup" type="right">
      <view class="filter-popup">
        <view class="popup-header">
          <text class="title">筛选条件</text>
          <text class="close" @click="closeFilter">×</text>
        </view>
        <view class="filter-content">
          <view class="filter-section">
            <text class="section-title">角色</text>
            <view class="checkbox-group">
              <view 
                v-for="(role, index) in roles" 
                :key="index"
                class="checkbox-item"
                :class="{ active: selectedRoles.includes(role.value) }"
                @click="toggleRole(role.value)"
              >
                <text>{{role.label}}</text>
              </view>
            </view>
          </view>
          <view class="filter-section">
            <text class="section-title">状态</text>
            <view class="checkbox-group">
              <view 
                v-for="(status, index) in statuses" 
                :key="index"
                class="checkbox-item"
                :class="{ active: selectedStatuses.includes(status.value) }"
                @click="toggleStatus(status.value)"
              >
                <text>{{status.label}}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="filter-footer">
          <button class="btn reset" @click="resetFilter">重置</button>
          <button class="btn confirm" @click="applyFilter">确定</button>
        </view>
      </view>
    </uni-popup>

    <!-- 底部导航 -->
    <view class="tab-bar">
      <view class="tab-item" @click="navigateTo('/pages/admin/index')">
        <text class="tab-icon">首</text>
        <text class="tab-text">首页</text>
      </view>
      <view class="tab-item active">
        <text class="tab-icon">用</text>
        <text class="tab-text">用户</text>
      </view>
      <view class="tab-item" @click="navigateTo('/pages/admin/data')">
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
      searchKey: '',
      userList: [
        {
          id: 1,
          username: 'doctor001',
          name: '张医生',
          role: 'doctor',
          roleText: '医生',
          department: '内分泌科',
          status: 'active',
          statusText: '正常',
          lastLogin: '2024-03-20 14:30'
        },
        {
          id: 2,
          username: 'nurse001',
          name: '王护士',
          role: 'nurse',
          roleText: '护士',
          department: '内分泌科',
          status: 'inactive',
          statusText: '已禁用',
          lastLogin: '2024-03-19 10:00'
        }
      ],
      roles: [
        { label: '医生', value: 'doctor' },
        { label: '护士', value: 'nurse' },
        { label: '管理员', value: 'admin' }
      ],
      statuses: [
        { label: '正常', value: 'active' },
        { label: '已禁用', value: 'inactive' }
      ],
      selectedRoles: [],
      selectedStatuses: []
    }
  },
  methods: {
    onSearch() {
      // 实际应该调用搜索API
      console.log('搜索关键词：', this.searchKey)
    },
    showFilter() {
      this.$refs.filterPopup.open()
    },
    closeFilter() {
      this.$refs.filterPopup.close()
    },
    toggleRole(role) {
      const index = this.selectedRoles.indexOf(role)
      if (index > -1) {
        this.selectedRoles.splice(index, 1)
      } else {
        this.selectedRoles.push(role)
      }
    },
    toggleStatus(status) {
      const index = this.selectedStatuses.indexOf(status)
      if (index > -1) {
        this.selectedStatuses.splice(index, 1)
      } else {
        this.selectedStatuses.push(status)
      }
    },
    resetFilter() {
      this.selectedRoles = []
      this.selectedStatuses = []
    },
    applyFilter() {
      // 实际应该调用筛选API
      this.closeFilter()
    },
    showAddUser() {
      uni.navigateTo({
        url: '/pages/admin/user-add'
      })
    },
    editUser(user) {
      uni.navigateTo({
        url: `/pages/admin/user-edit?id=${user.id}`
      })
    },
    resetPassword(user) {
      uni.showModal({
        title: '确认重置',
        content: `是否重置 ${user.name} 的密码？`,
        success: (res) => {
          if (res.confirm) {
            // 实际应该调用重置密码API
          }
        }
      })
    },
    toggleUserStatus(user) {
      const action = user.status === 'active' ? '禁用' : '启用'
      uni.showModal({
        title: `确认${action}`,
        content: `是否${action}用户 ${user.name}？`,
        success: (res) => {
          if (res.confirm) {
            // 实际应该调用状态更新API
          }
        }
      })
    }
  }
}
</script>

<style>
.users-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;
}

.search-bar {
  background-color: #ffffff;
  padding: 20rpx 30rpx;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.search-input {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20rpx;
  border-radius: 8rpx;
  margin-right: 20rpx;
}

.search-input .icon-search {
  font-size: 32rpx;
  color: #999999;
  margin-right: 20rpx;
}

.search-input input {
  flex: 1;
  font-size: 28rpx;
}

.filter-btn {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 8rpx;
}

.filter-btn .icon-filter {
  font-size: 32rpx;
  color: #666666;
}

.user-list {
  padding: 20rpx;
}

.user-item {
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.basic-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.basic-info .left {
  display: flex;
  align-items: center;
}

.basic-info .name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
  margin-right: 20rpx;
}

.basic-info .username {
  font-size: 24rpx;
  color: #999999;
}

.role {
  font-size: 24rpx;
  padding: 6rpx 20rpx;
  border-radius: 20rpx;
}

.role.doctor {
  background-color: #E8F3F3;
  color: #4AB8B8;
}

.role.nurse {
  background-color: #FFF0F0;
  color: #FF6B6B;
}

.role.admin {
  background-color: #FFF3E0;
  color: #FFA53D;
}

.detail-info {
  margin-bottom: 20rpx;
}

.info-row {
  display: flex;
  margin-bottom: 10rpx;
}

.info-row .label {
  font-size: 28rpx;
  color: #666666;
  width: 160rpx;
}

.info-row .value {
  font-size: 28rpx;
  color: #333333;
  flex: 1;
}

.value.active {
  color: #4AB8B8;
}

.value.inactive {
  color: #999999;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.btn {
  display: flex;
  align-items: center;
  padding: 10rpx 20rpx;
  border-radius: 6rpx;
  margin-left: 20rpx;
  font-size: 24rpx;
}

.btn .iconfont {
  font-size: 28rpx;
  margin-right: 6rpx;
}

.btn.edit {
  background-color: #E8F3F3;
  color: #4AB8B8;
}

.btn.reset {
  background-color: #FFF3E0;
  color: #FFA53D;
}

.btn.disable {
  background-color: #FFF0F0;
  color: #FF6B6B;
}

.btn.enable {
  background-color: #E8F3F3;
  color: #4AB8B8;
}

.add-btn {
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  width: 100rpx;
  height: 100rpx;
  background-color: #4AB8B8;
  border-radius: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(74, 184, 184, 0.3);
}

.add-btn .icon-add {
  font-size: 48rpx;
  color: #ffffff;
}

.filter-popup {
  width: 600rpx;
  height: 100vh;
  background-color: #ffffff;
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

.popup-header .close {
  font-size: 40rpx;
  color: #999999;
}

.filter-section {
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 28rpx;
  color: #666666;
  margin-bottom: 20rpx;
  display: block;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
}

.checkbox-item {
  padding: 10rpx 30rpx;
  border-radius: 6rpx;
  background-color: #f5f5f5;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
}

.checkbox-item.active {
  background-color: #4AB8B8;
}

.checkbox-item.active text {
  color: #ffffff;
}

.filter-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 30rpx;
}

.filter-footer .btn {
  width: 160rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40rpx;
  font-size: 28rpx;
  margin-left: 20rpx;
}

.btn.reset {
  background-color: #f5f5f5;
  color: #666666;
}

.btn.confirm {
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