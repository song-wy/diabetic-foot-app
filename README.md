# 医疗健康管理系统

基于uni-app + Vue3 + Vite开发的跨平台医疗健康管理系统，支持微信小程序、H5等多端运行。

## 项目特点

- 🚀 基于Vue3 + Vite开发，性能优异
- 📱 支持多端运行（微信小程序、H5等）
- 🎨 现代化UI设计，用户体验优秀
- 📊 完整的数据可视化功能
- 🔒 完善的用户权限管理
- 📝 详细的健康数据记录

## 主要功能

### 患者端
- 个人健康数据管理
- 在线问诊
- 预约挂号
- 健康档案
- 用药提醒
- 检查报告查询

### 护士端
- 患者管理
- 随访管理
- 健康宣教
- 数据录入
- 工作统计

## 技术栈

- Vue 3
- uni-app
- Vite
- Pinia
- Vue Router
- uView UI

## 开发环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

## 快速开始

1. 克隆项目
```bash
git clone https://github.com/你的用户名/uni-preset-vue-vite.git
```

2. 安装依赖
```bash
npm install
```

3. 运行项目
```bash
# 运行到H5
npm run dev:h5

# 运行到微信小程序
npm run dev:mp-weixin
```

4. 打包项目
```bash
# 打包H5
npm run build:h5

# 打包微信小程序
npm run build:mp-weixin
```

## 项目结构

```
├── src                     # 源代码
│   ├── pages              # 页面文件
│   ├── components         # 公共组件
│   ├── store              # 状态管理
│   ├── utils              # 工具函数
│   ├── api                # 接口请求
│   └── static             # 静态资源
├── public                 # 公共资源
└── package.json          # 项目配置
```

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (git checkout -b feature/AmazingFeature)
3. 提交你的改动 (git commit -m 'Add some AmazingFeature')
4. 推送到分支 (git push origin feature/AmazingFeature)
5. 打开一个 Pull Request

## 许可证

[MIT License](LICENSE)

## 联系方式

如有问题或建议，请提交 Issue 或 Pull Request。 