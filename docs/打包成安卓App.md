# 打包成独立安卓 App（APK）

把你的工作台变成一个**真正独立的 App**：桌面有图标、可安装、无需浏览器、不依赖网址。

---

## 已完成的准备工作

安卓原生工程已经搭好并配置完毕，位于 `frontend/android/`。包含：

| 配置项 | 说明 |
| --- | --- |
| 应用名称 | 我的工作台 |
| 包名 | `com.workbench.life` |
| 应用图标 | 暖橙珊瑚渐变 + 日历勾选，5 种密度全覆盖 |
| 自适应图标 | 支持华为/小米等圆形、方形、水滴形桌面 |
| 启动画面 | 主题色底 + 应用图标，无白屏闪现 |
| 沉浸式状态栏 | 内容延伸到状态栏下方，配合安全区自动避让 |
| 竖屏锁定 | 手机上固定竖屏，转动不会错乱 |
| 返回键处理 | 子页面按返回回上一层，首页按返回才退出 |
| 最低系统版本 | Android 7.0（API 24）及以上 |

---

## 方法一：用自己的电脑构建（推荐，最可靠）

### 1. 准备环境

需要安装两样东西：

- **Android Studio**（含 Android SDK）：https://developer.android.com/studio
  安装时勾选 "Android SDK"、"Android SDK Platform 36"、"Android SDK Build-Tools"
- **Node.js 18+**：https://nodejs.org

> 首次打开 Android Studio 后，等它自动下载完 SDK 组件再继续。

### 2. 拿到源代码

把整个项目文件夹拷到自己电脑上。

### 3. 安装依赖并同步

在 `frontend` 目录下执行：

```bash
# 安装依赖
pnpm install     # 或 npm install

# 构建网页产物 + 同步到安卓工程
pnpm cap:sync
```

### 4. 构建 APK

**方式 A：Android Studio 图形界面（最简单）**

```bash
pnpm cap:open
```

Android Studio 会自动打开项目，然后：

1. 等右下角 Gradle 同步完成（首次需要几分钟下载依赖）
2. 菜单 **Build → Build Bundle(s) / APK(s) → Build APK(s)**
3. 完成后右下角弹窗点 **locate**，文件在：
   `android/app/build/outputs/apk/debug/app-debug.apk`

**方式 B：命令行**

```bash
cd android
./gradlew assembleDebug
```

产物同样在 `android/app/build/outputs/apk/debug/app-debug.apk`。

### 5. 安装到手机

把 `app-debug.apk` 传到手机（微信/QQ/数据线都行），点击安装。

华为设备第一次安装会拦截，需要：

1. 系统提示「纯净模式已拦截」时，点「**继续安装**」
2. 若没有该按钮，去 **设置 → 系统 → 安全和隐私 → 纯净模式 → 退出纯净模式**
3. 再允许「**安装未知应用**」权限

---

## 方法二：GitHub Actions 云端构建（不用装环境）

如果电脑装 Android Studio 太麻烦，可以让 GitHub 帮你构建。

### 步骤

1. 把项目推到 GitHub 仓库
2. 在仓库根目录创建 `.github/workflows/android.yml`：

```yaml
name: Build APK
on: [push, workflow_dispatch]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '21'

      - uses: android-actions/setup-android@v3

      - name: Build
        run: |
          cd frontend
          pnpm install
          pnpm build:app
          npx cap sync android
          cd android
          chmod +x gradlew
          ./gradlew assembleDebug

      - uses: actions/upload-artifact@v4
        with:
          name: app-debug
          path: frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

3. 推送到 GitHub 后，在仓库 **Actions** 页面能看到构建进度
4. 完成后在 Artifacts 里下载 `app-debug`，解压就是 APK

---

## 重要：数据存在哪里

打包成 APK 后，数据存在 **App 自己的私有存储**里：

- ✅ 卸载 App 会清空数据
- ✅ 和浏览器版本的数据**不互通**
- ✅ 换手机不会自动同步
- ⚠️ 请定期用「更多 → 导出备份」保存 JSON

> 想在手机和电脑之间同步数据，只能用「导出/导入备份」手动搬。

---

## 改了代码后怎么更新

```bash
cd frontend
pnpm cap:sync        # 重新构建 + 同步
cd android
./gradlew assembleDebug
```

或者直接在 Android Studio 里点运行按钮。

---

## 常见问题

**Q：构建报错 `SDK location not found`？**

在 `android/` 下新建 `local.properties`，写入你的 SDK 路径：

```properties
sdk.dir=/Users/你的用户名/Library/Android/sdk        # macOS
sdk.dir=C\:\\Users\\你的用户名\\AppData\\Local\\Android\\Sdk   # Windows
sdk.dir=/home/你的用户名/Android/Sdk                 # Linux
```

**Q：Gradle 下载依赖很慢或失败？**

国内网络建议配置镜像，在 `android/build.gradle` 的 `repositories` 里加上阿里云镜像：

```gradle
maven { url 'https://maven.aliyun.com/repository/google' }
maven { url 'https://maven.aliyun.com/repository/public' }
maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
```

**Q：想要正式版 APK（能上应用商店）？**

需要生成签名密钥：

```bash
keytool -genkey -v -keystore my-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias workbench
```

然后在 `android/app/build.gradle` 配置 `signingConfigs`，执行 `./gradlew assembleRelease`。

**Q：APK 文件多大？**

约 5-8 MB。因为网页产物只有 700KB 左右，剩下的是 Capacitor 运行时和 Android 基础库。

**Q：能上架华为应用市场吗？**

可以，但需要：
- 华为开发者账号（需实名认证）
- 签名后的 release APK
- 应用截图、隐私政策等材料

个人自用不需要上架，直接装 APK 就行。

---

## 目录说明

```
frontend/
├── android/                  安卓原生工程（可直接用 Android Studio 打开）
│   └── app/src/main/
│       ├── java/.../MainActivity.java   沉浸式全屏配置
│       ├── res/mipmap-*/                各密度应用图标
│       ├── res/values/styles.xml        主题与启动画面
│       └── assets/public/               打包进去的网页资源
├── capacitor.config.ts       应用 ID、名称、插件配置
├── app 入口                  src/app-entry.tsx（原生入口，含状态栏/返回键）
├── src/lib/native.ts         原生能力封装（状态栏、启动图、返回键）
└── scripts/gen-android-icons.mjs  图标生成脚本
```

重新生成图标（改了 `public/icon.svg` 后）：

```bash
cd frontend
pnpm android:icons
```
