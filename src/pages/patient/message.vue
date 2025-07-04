<template>
  <view class="notifications-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <view class="back-circle">
          <text class="iconfont icon-back"></text>
        </view>
      </view>
      <text class="title">消息通知</text>
    </view>

    <!-- 消息列表 -->
    <scroll-view scroll-y class="message-list">
      <view 
        v-for="(msg, idx) in messages" 
        :key="msg.id" 
        class="message-item" 
        :class="{ unread: !msg.read }"
        @click="markAsRead(idx)"
      >
        <view class="msg-header">
          <text class="msg-title">{{ msg.title }}</text>
          <text class="msg-time">{{ msg.time }}</text>
        </view>
        <view class="msg-content">{{ msg.content }}</view>
        <view v-if="!msg.read" class="unread-dot"></view>
      </view>
      <view v-if="messages.length === 0" class="empty-tip">暂无消息</view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 消息列表，实际开发中应从后端获取
      messages: []
    }
  },
  onShow() {
    // 页面显示时自动获取消息列表
    this.fetchMessages();
  },
  methods: {
    goBack() {
      uni.navigateBack({ delta: 1 });
    },
    // 获取消息列表（对接后端）
    fetchMessages() {
      const userId = uni.getStorageSync('userId');
      const token = uni.getStorageSync('token');
      if (!userId || !token) return;
      uni.request({
        url: `http://localhost:3000/api/patient/${userId}/messages`,
        method: 'GET',
        header: {
          Authorization: 'Bearer ' + token
        },
        success: (res) => {
          if (res.statusCode === 200 && Array.isArray(res.data)) {
            this.messages = res.data;
          } else {
            this.messages = [];
          }
        },
        fail: () => {
          this.messages = [];
        }
      });
    },
    // 点击消息，标记为已读
    markAsRead(idx) {
      const msg = this.messages[idx];
      if (!msg.read) {
        // 前端先本地标记为已读
        this.messages[idx].read = true;
        // 调用后端接口标记为已读
        const userId = uni.getStorageSync('userId');
        const token = uni.getStorageSync('token');
        uni.request({
          url: `http://localhost:3000/api/patient/${userId}/messages/${msg.id}/read`,
          method: 'POST',
          header: {
            Authorization: 'Bearer ' + token
          },
          success: () => {
            // 可选：重新获取未读数，通知首页刷新
            uni.$emit && uni.$emit('refreshUnreadCount');
          }
        });
      }
    }
  }
}
</script>

<style>
.notifications-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 88rpx;
  background-color: #4AB8B8;
  padding: 0 30rpx;
  color: #ffffff;
}

.nav-bar .title {
  font-size: 32rpx;
  font-weight: bold;
  margin-left: 30rpx;
}

.back-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 让按钮区域更大，便于点击 */
}

.back-circle {
  width: 60rpx;
  height: 60rpx;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.08);
}

.back-btn .iconfont {
  font-size: 40rpx;
  color: #4AB8B8;
}

.message-list {
  padding: 20rpx 30rpx;
}

.message-item {
  background-color: #fff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  position: relative;
  cursor: pointer;
}

.message-item.unread {
  border-left: 8rpx solid #FF6B6B;
}

.msg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.msg-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.msg-time {
  font-size: 22rpx;
  color: #999;
}

.msg-content {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.unread-dot {
  position: absolute;
  top: 30rpx;
  right: 30rpx;
  width: 18rpx;
  height: 18rpx;
  background-color: #FF6B6B;
  border-radius: 9rpx;
}

.empty-tip {
  text-align: center;
  color: #999;
  font-size: 28rpx;
  margin-top: 100rpx;
}
</style> 