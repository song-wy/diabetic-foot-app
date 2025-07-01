<script>
export default {
  onLaunch: function () {
    console.log('App Launch');
    
    // 应用启动时检查是否需要登录
    setTimeout(() => {
      const token = uni.getStorageSync('token');
      if (!token) {
        uni.reLaunch({
          url: '/pages/login/index'
        });
      } else {
        // 根据存储的用户角色跳转到对应页面
        const userRole = uni.getStorageSync('userRole');
        if (userRole) {
          switch (userRole) {
            case 'patient':
              uni.reLaunch({ url: '/pages/patient/index' });
              break;
            case 'doctor':
              uni.reLaunch({ url: '/pages/doctor/index' });
              break;
            case 'nurse':
              uni.reLaunch({ url: '/pages/nurse/index' });
              break;
            case 'admin':
              uni.reLaunch({ url: '/pages/admin/index' });
              break;
            default:
              uni.reLaunch({ url: '/pages/index/index' });
          }
        } else {
          uni.reLaunch({ url: '/pages/index/index' });
        }
      }
    }, 100);
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
/* 引入图标字体 */
@import './static/iconfont.css';

/* 全局样式 */
page {
  background-color: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica,
    Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei',
    sans-serif;
}

/* 去除默认边距 */
view, text, scroll-view {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}
</style>
