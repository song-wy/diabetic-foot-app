# 糖尿病足管理系统

一个基于 Vue3 + UniApp + Node.js + SQL Server 的跨平台糖尿病足健康管理系统，支持患者、医生、护士、管理员多角色管理。

## 📋 项目简介

本项目是一个专业的糖尿病足健康管理平台，旨在为糖尿病患者提供全方位的健康管理服务。系统支持多端运行（H5、微信小程序、APP等），具备完整的用户管理、健康数据监测、在线问诊、预约管理等功能。

## 🚀 技术栈

### 前端技术
- **框架**: Vue 3 + UniApp 3.0
- **构建工具**: Vite
- **样式**: SCSS + 响应式设计
- **状态管理**: Vue 3 Composition API
- **跨平台**: 支持 H5、微信小程序、APP 等多端

### 后端技术
- **运行环境**: Node.js
- **Web框架**: Express.js
- **数据库**: SQL Server
- **身份认证**: JWT + bcryptjs
- **文件上传**: Multer
- **数据验证**: express-validator

## 🏗️ 系统架构

```
├── src/                    # 前端源码
│   ├── pages/             # 页面文件
│   │   ├── patient/       # 患者端页面
│   │   ├── doctor/        # 医生端页面
│   │   ├── nurse/         # 护士端页面
│   │   ├── admin/         # 管理员端页面
│   │   ├── login/         # 登录页面
│   │   └── register/      # 注册页面
│   ├── components/        # 公共组件
│   ├── static/           # 静态资源
│   └── api/              # API 接口
├── server/                # 后端源码
│   ├── controllers/       # 控制器
│   ├── routes/           # 路由
│   ├── middlewares/      # 中间件
│   ├── models/           # 数据模型
│   ├── config/           # 配置文件
│   └── utils/            # 工具函数
└── database/             # 数据库脚本
```

## ✨ 功能特性

### 👤 多角色管理
- **患者端**: 健康数据监测、在线问诊、预约管理、用药提醒
- **医生端**: 患者管理、排班管理、在线问诊、健康报告
- **护士端**: 患者随访、数据录入、健康教育、任务管理
- **管理员端**: 用户管理、系统监控、数据统计、权限管理

### 📊 健康管理
- **血糖监测**: 实时血糖数据录入、趋势分析、异常提醒
- **血压管理**: 血压数据记录、趋势图表、健康评估
- **体重管理**: 体重变化追踪、BMI计算、健康建议
- **用药管理**: 用药提醒、用药记录、药物相互作用提醒

### 🏥 医疗服务
- **在线问诊**: 实时聊天、视频问诊、病情咨询
- **预约管理**: 在线预约、排班查看、预约提醒
- **健康档案**: 完整的健康记录、检查报告、治疗历史
- **健康教育**: 健康知识推送、个性化建议、康复指导

### 🔐 安全特性
- **JWT身份认证**: 安全的用户身份验证
- **角色权限控制**: 基于角色的访问控制
- **数据加密**: 敏感数据加密存储
- **操作日志**: 完整的操作记录和审计

### 患者端功能
- 用户注册/登录
- 个人信息管理
- 血糖数据记录和查看
- 健康报告生成
- 在线咨询
- 消息通知

### 医生端功能
- 医生登录认证
- 患者管理
- 病情跟踪
- 医嘱下达
- 健康报告查看
- 消息通知
- 数据分析
- 排班管理

### 护士端功能
- 护士登录认证
- 患者管理
- 随访管理
- 健康数据监控
- 消息通知
- 个人中心

### 管理员端功能
- 系统数据管理
- 用户管理
- 数据统计分析

## 🛠️ 安装部署

### 环境要求
- Node.js >= 16.0.0
- SQL Server >= 2016
- npm >= 8.0.0

### 1. 克隆项目
```bash
git clone [项目地址]
cd uni-preset-vue-vite
```

### 2. 安装前端依赖
```bash
npm install
```

### 3. 安装后端依赖
```bash
cd server
npm install
```

### 4. 数据库配置
1. 创建 SQL Server 数据库
2. 执行数据库脚本：
   ```sql
   -- 执行 SQLQuery2.sql 创建基础表结构
   -- 执行 SQLQuery3.sql 创建用户表和关联关系
   ```

### 5. 环境变量配置
在 `server` 目录下创建 `.env` 文件：
```env
# 数据库配置
DB_USER=your_username
DB_PASSWORD=your_password
DB_SERVER=your_server
DB_DATABASE=DiabetesFootDB
DB_PORT=1433

# JWT密钥
JWT_SECRET=your_jwt_secret

# 服务器端口
PORT=3000
```

### 6. 启动服务
```bash
# 启动后端服务
cd server
npm run dev

# 启动前端开发服务器
npm run dev:h5
```

## 📱 使用说明

### 注册登录
1. 访问注册页面，选择用户角色（患者/医生/护士）
2. 填写基本信息完成注册
3. 使用注册的账号密码登录系统

### 患者使用
1. **健康数据录入**: 在数据页面录入血糖、血压等健康数据
2. **在线问诊**: 在问诊页面选择医生进行在线咨询
3. **健康档案**: 在个人中心查看完整的健康记录
4. **用药提醒**: 设置用药提醒，按时服药

### 医生使用
1. **患者管理**: 查看和管理负责的患者
2. **在线问诊**: 接收患者咨询，提供专业建议
3. **排班管理**: 设置工作时间，管理预约
4. **健康报告**: 查看患者健康数据，生成健康报告

### 护士使用
1. **患者随访**: 定期随访患者，记录随访情况
2. **数据录入**: 协助患者录入健康数据
3. **健康教育**: 推送健康知识，提供康复指导
4. **任务管理**: 管理日常工作任务

### 管理员使用
1. **用户管理**: 管理系统用户，分配权限
2. **系统监控**: 监控系统运行状态
3. **数据统计**: 查看系统使用统计
4. **系统设置**: 配置系统参数

## 🔧 开发指南

### 前端开发
```bash
# 开发模式
npm run dev:h5          # H5开发
npm run dev:mp-weixin   # 微信小程序开发

# 构建
npm run build:h5        # H5构建
npm run build:mp-weixin # 微信小程序构建
```

### 后端开发
```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

### 代码规范
- 使用 ESLint 进行代码检查
- 遵循 Vue 3 组合式 API 规范
- 使用 TypeScript 类型定义（可选）

## 📊 数据库设计

### 核心表结构
- **Users**: 用户基础信息表
- **Patient**: 患者详细信息表
- **Doctor**: 医生信息表
- **BloodGlucose**: 血糖数据表
- **BloodPressure**: 血压数据表
- **Medication**: 用药记录表
- **Appointment**: 预约记录表
- **HealthReport**: 健康报告表

### 关联关系
- Users 表通过 user_id 字段关联 Patient/Doctor 表
- 支持多对多关系（医生-患者、护士-患者）

### 数据库设计

#### 核心表结构

**Users表** - 用户基础信息
- `id`: 主键，用户ID
- `username`: 用户名（唯一）
- `password`: 密码（加密存储）
- `role`: 用户角色（patient/doctor/nurse/admin）
- `created_at`: 创建时间

**Patient表** - 患者详细信息
- `patient_id`: 主键，患者ID
- `name`: 患者姓名
- `gender`: 性别
- `age`: 年龄
- `phone`: 手机号（唯一）
- `address`: 地址
- `user_id`: 关联Users表的ID
- `register_time`: 注册时间

**Doctor表** - 医生详细信息
- `doctor_id`: 主键，医生ID
- `name`: 医生姓名
- `gender`: 性别
- `age`: 年龄
- `phone`: 手机号（唯一）
- `address`: 地址
- `user_id`: 关联Users表的ID
- `register_time`: 注册时间

**Nurse表** - 护士详细信息
- `nurse_id`: 主键，护士ID
- `name`: 护士姓名
- `gender`: 性别
- `age`: 年龄
- `phone`: 手机号（唯一）
- `address`: 地址
- `user_id`: 关联Users表的ID
- `register_time`: 注册时间

**GlucoseRecord表** - 血糖记录
- `id`: 主键
- `patient_id`: 患者ID
- `glucose_value`: 血糖值
- `record_time`: 记录时间
- `meal_type`: 餐次类型
- `notes`: 备注

**Schedule表** - 排班信息
- `id`: 主键
- `doctor_id`: 医生ID
- `patient_id`: 患者ID
- `schedule_date`: 排班日期
- `schedule_time`: 排班时间
- `status`: 状态
- `notes`: 备注

## 🚀 部署说明

### 生产环境部署
1. **前端部署**:
   ```bash
   npm run build:h5
   # 将 dist/build/h5 目录部署到 Web 服务器
   ```

2. **后端部署**:
   ```bash
   npm run build
   # 使用 PM2 或 Docker 部署 Node.js 应用
   ```

3. **数据库部署**:
   - 配置生产环境数据库连接
   - 设置数据库备份策略
   - 配置数据库性能优化

### Docker 部署
```dockerfile
# 前端 Dockerfile
FROM nginx:alpine
COPY dist/build/h5 /usr/share/nginx/html
EXPOSE 80

# 后端 Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

- 项目维护者: [维护者姓名]
- 邮箱: [邮箱地址]
- 项目地址: [项目仓库地址]

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户！

---

**注意**: 本项目仅供学习和研究使用，请勿用于商业用途。如有商业需求，请联系项目维护者。 
