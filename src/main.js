import {
	createSSRApp
} from "vue";
import App from "./App.vue";

export function createApp() {
	const app = createSSRApp(App);

	// 添加全局导航守卫，检查登录状态
	app.config.globalProperties.$navigateToLogin = () => {
		// 在这里可以添加判断登录的逻辑
		const token = uni.getStorageSync('token');
		if (!token) {
			uni.reLaunch({
				url: '/pages/login/index'
			});
		}
	};

	return {
		app,
	};
}
