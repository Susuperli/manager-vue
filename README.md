# manager-vue

基于 Vue 3 + Express 的全栈后台管理系统，用于日常练习和功能实验。

## 技术栈

### 前端
- Vue 3 - 渐进式 JavaScript 框架
- Vite - 下一代前端构建工具
- Element Plus - Vue 3 组件库
- Vue Router - 官方路由管理器
- OpenAI SDK - AI 功能集成
- VConsole - 移动端调试工具

### 后端
- Express - Node.js Web 框架
- MongoDB + Mongoose - NoSQL 数据库
- JWT - JSON Web Token 身份认证
- OpenAI SDK - AI 服务集成
- dayjs - 轻量级时间处理库

## 功能模块

- 🔐 **用户系统** - 注册、登录、JWT 认证
- 🤖 **AI 对话** - 集成 OpenAI API 实现智能对话
- ⏰ **打卡系统** - 支持 PC 和移动端打卡记录
- 📁 **文件管理** - 文件上传和下载功能
- 🎨 **响应式布局** - 适配多端设备

## 环境要求

- Node.js: 22.x
- pnpm: 最新版本
- MongoDB: 本地或云端实例

## 快速开始

### 安装依赖

```bash
# 安装根目录依赖
pnpm install

# 安装前端依赖
cd client && pnpm install

# 安装后端依赖
cd server && pnpm install
```

### 配置环境变量

在 `server` 目录下创建 `.env` 文件（如需要）：

```env
# MongoDB 连接字符串
MONGODB_URI=your_mongodb_uri

# JWT 密钥
JWT_SECRET=your_jwt_secret

# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key
```

### 启动项目

#### 开发模式（同时启动前后端）

```bash
pnpm run dev
```

#### 分别启动

```bash
# 启动前端（端口 5173）
cd client && pnpm run dev

# 启动后端（端口 3030）
cd server && pnpm run start
```

### 构建部署

```bash
# 构建前端
cd client && pnpm run build

# 生产环境启动后端
cd server && pnpm run start
```

## 项目结构

```
manager-vue/
├── client/                 # 前端项目
│   ├── src/
│   │   ├── pages/         # 页面组件
│   │   ├── layout/        # 布局组件
│   │   ├── components/    # 公共组件
│   │   ├── router.js      # 路由配置
│   │   ├── request/       # API 请求封装
│   │   ├── stores/        # 状态管理
│   │   └── utils/         # 工具函数
│   ├── vite.config.js     # Vite 配置
│   └── package.json
│
└── server/                 # 后端项目
    ├── router/            # 路由定义
    ├── controller/        # 业务控制器
    ├── services/          # 服务层
    ├── db/                # 数据库连接和模型
    ├── middleware/        # 中间件
    ├── utils/             # 工具函数
    ├── index.js           # 服务入口
    └── package.json
```

## API 端口

- 前端开发服务器: `http://localhost:5173`
- 后端 API 服务: `http://localhost:3030`

## 开发说明

### 前端代码规范

```bash
# 代码检查
cd client && pnpm run lint

# 代码格式化
cd client && pnpm run format
```

### 浏览器支持

现代浏览器和 IE11+（需要 polyfills）

## License

ISC
