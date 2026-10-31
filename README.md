# 我的工作台

手机端优先的个人生活管理工作台。**所有数据保存在浏览器本地（LocalStorage）**，无需登录、后端仅保留模板空壳，打开即用。

## 技术栈

React 19 + TypeScript + Vite 7 + Tailwind CSS 4 + Framer Motion + Lucide Icons

## 快速开始

```bash
cd frontend && pnpm dev     # 开发（http://localhost:5173）
cd frontend && pnpm build   # 生产构建
```

## 打包成独立安卓 App

已配置 Capacitor 安卓工程，可打包成真正的原生 APK（无需浏览器、不依赖网址）。

### 方式一：GitHub 云端构建（不用装任何开发环境，推荐）

仓库已内置 GitHub Actions 工作流 `.github/workflows/build-apk.yml`，推送代码即自动出包。

1. 把本仓库推到 GitHub（Public 仓库 Actions 免费不限量）
2. 进入 **Actions** → **构建安卓 APK** → **Run workflow**
3. 等 5～10 分钟 → 页面底部 **Artifacts** 下载 `我的工作台-APK.zip`
4. 解压得到 `app-debug.apk` → 传到手机安装（华为需先关闭「纯净模式」）

完整图文步骤见 [`docs/GitHub构建APK-图文步骤.md`](docs/GitHub构建APK-图文步骤.md)。

### 方式二：本地构建（需要 Android Studio / JDK 21 / Android SDK 36）

```bash
cd frontend
pnpm cap:sync     # 构建并同步到安卓工程
pnpm cap:open     # 用 Android Studio 打开
```

或用命令行构建：`cd android && ./gradlew assembleDebug`

> 国内网络下如果 Gradle 卡在下载，加 `-I ci-mirrors.gradle` 走阿里云镜像：
> `./gradlew assembleDebug -I ci-mirrors.gradle`

详细步骤见 [`docs/打包成安卓App.md`](docs/打包成安卓App.md)。

## 手机使用 / 部署

两种产物，都已生成在项目根目录：

| 产物 | 说明 |
| --- | --- |
| `工作台.html` | 自包含单文件（JS/CSS/图标全内联），传到手机用浏览器打开即可 |
| `工作台-托管版.zip` | 解压得 `dist-web/`，拖到任意静态托管（Netlify / Vercel / Pages / 自家服务器） |

```bash
cd frontend
pnpm build:web      # → ../dist-web/
pnpm build:single   # → ../工作台.html
```

两版统一使用 **HashRouter**（`...#/todos`），刷新和分享链接都不会 404，无需服务器路由配置。
详细步骤见 [`docs/DEPLOY-手机部署.md`](docs/DEPLOY-手机部署.md)。

## 功能

| 模块 | 路径 | 说明 |
| --- | --- | --- |
| 今日（首页） | `/` | 实时时钟、每日激励语、打卡按钮、5 张统计卡片、快速跳转 |
| 待办清单 | `/todos` | 优先级、截止日期、备注、今日/未完成/已完成视图 |
| 事项提醒 | `/reminders` | 分类（工作/生活/健康/学习/其他）、日期时间、逾期高亮 |
| 习惯打卡 | `/habits` | 自定义习惯、连续天数、近 7 天补卡、近 30 天热力图 |
| 记账本 | `/ledger` | 收支记录、分类占比、月度汇总、较上月对比 |
| 储物清单 | `/storage` | 物品位置、区域分组、搜索、借出/归还标记 |
| 灵感库 | `/ideas` | 标签分类、收藏、一键转待办 |
| 周度复盘 | `/review` | 自动统计本周数据 + 三段式手写复盘，按周存档 |
| 更多 | `/more` | 全部功能入口、数据导出/导入/清空 |
| 外观设置 | `/appearance` | 8 套配色预设、色相/饱和度调节、深色模式、圆角、字号 |

## 首页统计卡片

1. **事项提醒** — 今日到期 + 已过期未完成
2. **本月已完成待办** — 本月完成条数
3. **连续打卡天数** — 所有习惯均打卡的连续天数
4. **本月支出汇总** — 本月支出 + 较上月增减
5. **待处理事项** — 未完成待办 + 待处理提醒 + 借出物品

## 数据存储

统一前缀 `wb.v1.`，键位：`todos` `reminders` `habits` `ledger` `storage` `ideas` `reviews` `meta`。

- **每日重置**：打卡状态按当天日期判定；提醒过期按今天实时计算；激励语每天轮换
- **累积记录**：待办、记账、储物、灵感长期保留；周复盘按自然周独立存档
- 备份：`更多 → 导出备份 / 导入备份`（JSON 文件）
- 外观：`wb.v1.theme`（配色、深浅色、圆角、字号）

## 体验演示数据

在浏览器控制台粘贴执行 `docs/demo-data.js` 后刷新即可（清除：`localStorage.clear()`）。

## 目录

```
frontend/src/
├── lib/          date.ts（本地时区日期） store.ts（localStorage 同步） stats.ts（统计） quotes.ts（激励语）
├── hooks/        useWorkspace.ts（各模块 CRUD）
├── types/        workspace.ts
├── components/workspace/   UI.tsx / Sheet.tsx / TabBar.tsx / HomeWidgets.tsx
└── pages/        Index / Todos / Reminders / Habits / Ledger / Storage / Ideas / Review / More
```

产品说明见 `docs/product/features.md`。
