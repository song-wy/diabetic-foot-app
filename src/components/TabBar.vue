<template>
  <view class="tab-bar">
    <view 
      v-for="(item, index) in tabItems" 
      :key="index" 
      class="tab-bar-item"
      :class="{ active: currentTab === index }"
      @click="switchTab(index, item.url)"
    >
      <text class="iconfont" :class="item.icon"></text>
      <text class="tab-bar-text">{{ item.text }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'TabBar',
  props: {
    role: {
      type: String,
      default: 'patient'
    },
    currentTab: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      patientTabs: [
        { text: '首页', icon: 'icon-home', url: '/pages/patient/index' },
        { text: '数据', icon: 'icon-chart', url: '/pages/patient/data' },
        { text: '咨询', icon: 'icon-consult', url: '/pages/patient/consult' },
        { text: '我的', icon: 'icon-user', url: '/pages/patient/profile' }
      ],
      doctorTabs: [
        { text: '首页', icon: 'icon-home', url: '/pages/doctor/index' },
        { text: '患者', icon: 'icon-patient', url: '/pages/doctor/patients' },
        { text: '排班', icon: 'icon-schedule', url: '/pages/doctor/schedule' },
        { text: '我的', icon: 'icon-user', url: '/pages/doctor/profile' }
      ],
      nurseTabs: [
        { text: '首页', icon: 'icon-home', url: '/pages/nurse/index' },
        { text: '随访', icon: 'icon-follow', url: '/pages/nurse/follow' },
        { text: '患者', icon: 'icon-patient', url: '/pages/nurse/patients' },
        { text: '我的', icon: 'icon-user', url: '/pages/nurse/profile' }
      ],
      adminTabs: [
        { text: '首页', icon: 'icon-home', url: '/pages/admin/index' },
        { text: '用户', icon: 'icon-users', url: '/pages/admin/users' },
        { text: '数据', icon: 'icon-chart', url: '/pages/admin/data' },
        { text: '我的', icon: 'icon-user', url: '/pages/admin/profile' }
      ]
    }
  },
  computed: {
    tabItems() {
      switch (this.role) {
        case 'patient':
          return this.patientTabs;
        case 'doctor':
          return this.doctorTabs;
        case 'nurse':
          return this.nurseTabs;
        case 'admin':
          return this.adminTabs;
        default:
          return this.patientTabs;
      }
    }
  },
  methods: {
    switchTab(index, url) {
      if (this.currentTab !== index) {
        uni.switchTab({
          url: url
        });
      }
    }
  }
}
</script>

<style>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background-color: #fff;
  display: flex;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  z-index: 999;
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

/* 图标样式 */
.iconfont {
  font-size: 40rpx;
}

/* 患者端图标颜色 */
.tab-bar-item:nth-child(1) .iconfont {
  color: #4AB8B8;
}

.tab-bar-item:nth-child(2) .iconfont {
  color: #FF6B6B;
}

.tab-bar-item:nth-child(3) .iconfont {
  color: #FFA53D;
}

.tab-bar-item:nth-child(4) .iconfont {
  color: #666EE8;
}

/* 医生端图标颜色 */
.tab-bar-item:nth-child(1) .iconfont {
  color: #5A8DEE;
}

.tab-bar-item:nth-child(2) .iconfont {
  color: #FF6B6B;
}

.tab-bar-item:nth-child(3) .iconfont {
  color: #FFA53D;
}

.tab-bar-item:nth-child(4) .iconfont {
  color: #666EE8;
}

/* 护士端图标颜色 */
.tab-bar-item:nth-child(1) .iconfont {
  color: #00CFB4;
}

.tab-bar-item:nth-child(2) .iconfont {
  color: #FF6B6B;
}

.tab-bar-item:nth-child(3) .iconfont {
  color: #FFA53D;
}

.tab-bar-item:nth-child(4) .iconfont {
  color: #666EE8;
}

/* 管理员端图标颜色 */
.tab-bar-item:nth-child(1) .iconfont {
  color: #666EE8;
}

.tab-bar-item:nth-child(2) .iconfont {
  color: #FF6B6B;
}

.tab-bar-item:nth-child(3) .iconfont {
  color: #FFA53D;
}

.tab-bar-item:nth-child(4) .iconfont {
  color: #4AB8B8;
}
</style> 