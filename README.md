# THAI-Entertain-Calendar

一个现代化的多区域娱乐日历 Web 应用，帮助用户发现和管理来自泰国、中国及海外的娱乐活动和文化节日。

![Stars](https://img.shields.io/github/stars/fonrhythm/THAI-Entertain-Calendar?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

## ✨ 功能特性

### 📅 多区域日历
- **泰国日历** - 浏览泰国的娱乐活动和传统节日
- **中国日历** - 发现中国的文化节庆和娱乐事件
- **国际日历** - 探索全球范围的海外娱乐活动
- **仪表板视图** - 统一查看所有日程安排

### 👤 用户系统
- 用户注册和登录
- 个人账户管理
- 用户偏好设置

### 🔍 搜索和发现
- 快速搜索功能
- 按日期、地点、类型筛选
- 收藏夹系统 - 保存喜爱的活动

### 📱 Progressive Web App (PWA)
- 离线访问支持
- 快速加载性能
- 类似原生应用的体验
- 可安装到设备主屏幕

### 🔐 云端存储
- 基于 Firebase 的用户数据同步
- 跨设备数据同步
- 安全的用户认证

## 🚀 快速开始

### 环境要求
- 现代浏览器（Chrome、Firefox、Safari、Edge）
- Node.js 14+ (用于开发)
- Firebase 账户（用于后端服务）

### 安装

1. **克隆仓库**
```bash
git clone https://github.com/fonrhythm/THAI-Entertain-Calendar.git
cd THAI-Entertain-Calendar
```

2. **配置 Firebase**
编辑 `firebase-global.js` 文件，添加你的 Firebase 配置信息：
```javascript
// firebase-global.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

3. **启动本地服务器**
```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx http-server
```

4. **访问应用**
在浏览器中打开 `http://localhost:8000`

## 📁 项目结构

```
THAI-Entertain-Calendar/
├── index.html              # 主入口页面
├── control.html            # 控制面板页面
├── manifest.json           # PWA 配置文件
├── sw.js                   # Service Worker
├── firebase-global.js      # Firebase 初始化
├── About/                  # 关于应用信息
├── account/                # 账户管理模块
├── assets/                 # 静态资源（图片、样式等）
├── chinese-calendar/       # 中文日历模块
├── dashboard/              # 仪表板模块
├── favorite/               # 收藏夹模块
├── functions/              # 工具函数
├── icon/                   # 应用图标
├── login/                  # 登录模块
├── oversea-calendar/       # 国际日历模块
├── register/               # 注册模块
├── search/                 # 搜索模块
└── thai-calendar/          # 泰国日历模块
```

## 🛠️ 技术栈

- **前端框架**: HTML5, CSS3, JavaScript (Vanilla)
- **实时数据库**: Firebase Firestore
- **身份认证**: Firebase Authentication
- **离线支持**: Service Worker (PWA)
- **部署**: GitHub Pages / Cloudflare Pages

## 📖 使用指南

### 注册新账户
1. 点击应用中的"注册"按钮
2. 填写邮箱和密码
3. 验证邮件并完成注册

### 浏览日历
1. 登录后进入仪表板
2. 选择要查看的日历：泰国、中国或国际
3. 点击具体日期查看该天的活动详情

### 收藏活动
1. 在日历中找到感兴趣的活动
2. 点击❤️ 图标加入收藏
3. 在收藏夹中管理你的活动列表

### 搜索功能
1. 使用顶部搜索栏输入关键词
2. 按类型、日期或地点筛选结果
3. 点击结果查看详细信息

## 🤝 贡献指南

欢迎提交 Pull Request 和 Issue！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 开发提示

### 添加新的日历数据
在对应的日历模块中编辑数据文件，或通过 Firebase Console 直接管理数据。

### 自定义样式
修改 `assets` 文件夹中的 CSS 文件来定制应用外观。

### PWA 更新
修改 `manifest.json` 来更新应用元数据（名称、图标、主题色等）。

## 🐛 已知问题

- 某些地区的活动数据可能不完整
- 首次加载时可能需要较长时间

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 👨‍💻 作者

**fonrhythm**
- GitHub: [@fonrhythm](https://github.com/fonrhythm)

## 📮 联系方式

如有问题或建议，欢迎：
- 提交 [GitHub Issue](https://github.com/fonrhythm/THAI-Entertain-Calendar/issues)
- 发送 Pull Request
- 通过 GitHub 直接联系

## 🙏 致谢

感谢所有贡献者和使用者的支持！

---

**⭐ 如果这个项目对你有帮助，请给个 Star 吧！**
