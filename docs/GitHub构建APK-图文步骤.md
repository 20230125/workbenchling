# 用 GitHub 免费云端构建 APK（保姆级图文说明）

> 目标：不用在自己电脑上装 Android Studio / JDK / SDK，让 GitHub 的服务器帮你把 APK 编出来，然后下载到华为 Mate 60 上安装。
> 全程免费，第一次大约 10 分钟。

---

## 一、先搞清楚流程（3 句话）

```
你上传代码 → GitHub 服务器自动编译 → 产出 app-debug.apk → 你下载安装
```

需要做的事：
1. 注册 GitHub 账号（已有就跳过）
2. 新建一个仓库（Repository）
3. 把 `GitHub仓库包.zip` 里的东西全部传上去
4. 点一下「Run workflow」
5. 等 5～10 分钟，下载 APK

---

## 二、注册 GitHub 账号

1. 电脑或手机浏览器打开 <https://github.com/signup>
2. 填邮箱 → 设密码 → 起用户名（英文，例如 `zhangsan-work`）
3. 收邮件验证码，验证通过即可

> 建议用电脑操作，手机浏览器也能做，但上传文件比较麻烦。

---

## 三、新建仓库

1. 登录后点右上角 **「+」** → **New repository**
2. 填写：
   - **Repository name**（仓库名）：`workbench`（随便起，英文）
   - **Description**：可不填
   - **Public / Private**：**选 Public（公开）**
     > 重要：公开仓库的 Actions 构建**完全免费不限量**；私有仓库每月只有 2000 分钟额度。
     > 这个项目里没有任何隐私数据（数据都存在你手机本地），公开没有任何风险。
   - 不要勾选「Add a README file」（我们自带）
3. 点 **Create repository**

---

## 四、上传代码（两种方式，选一种）

### 方式 A：网页拖拽上传（推荐新手，不用装任何软件）

1. **在电脑上把 `GitHub仓库包.zip` 解压**，得到一个文件夹，里面有：
   ```
   .github/     ← 构建脚本（关键，别漏）
   docs/        ← 说明文档
   frontend/    ← 项目源码（含 android/ 安卓工程）
   .gitignore
   README.md
   ```
2. 在新建好的仓库页面，点 **「uploading an existing file」**（或 `Add file` → `Upload files`）
3. **把解压出来的所有内容全选，一起拖进浏览器**（注意：拖的是**文件夹里的东西**，不是 zip 文件本身）
4. 等进度条走完 → 页面底部 **Commit changes** 点一下

> ⚠️ 两个注意点：
> - **`.github` 是隐藏文件夹**，Windows 需要在「查看」里勾选「隐藏的项目」才能看到；Mac 按 `Cmd + Shift + .` 显示。
> - 如果浏览器不支持拖文件夹，就改用方式 B。

### 方式 B：命令行上传（更稳，适合有点基础）

电脑装好 Git 后，在解压出来的文件夹里执行：

```bash
cd 解压后的文件夹
git init
git add .
git commit -m "初始化：我的工作台"
git branch -M main
git remote add origin https://github.com/你的用户名/workbench.git
git push -u origin main
```

> `git push` 时会要求登录：用户名填 GitHub 用户名，密码填 **Personal Access Token**（不是登录密码）。
> 获取方式：GitHub → 头像 → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token → 勾选 `repo` 和 `workflow` → 复制生成的字符串。

---

## 五、开始构建 APK

1. 进入仓库页面，点顶部标签 **「Actions」**
2. 如果提示「Workflows aren't being run on this repository」，点 **「I understand my workflows, go ahead and enable them」**
3. 左侧点 **「构建安卓 APK」**
4. 右侧点 **「Run workflow」** 下拉 → 分支选 `main` → 绿色 **「Run workflow」** 按钮
5. 刷新页面，会出现一条黄色圆点（运行中）的记录，点进去可以看实时日志

> 如果你是用方式 A/B 上传的，且包含 `.github/workflows/build-apk.yml`，**上传完成后就已经自动开始跑一次了**，不需要再手动触发。

---

## 六、下载 APK

构建成功（绿色 ✅）后：

1. 在运行记录页面**向下滚动到底部**，找到 **「Artifacts」** 区域
2. 点 **「我的工作台-APK」** 下载（会得到一个 zip）
3. 解压，里面就是 **`app-debug.apk`**

> ⚠️ GitHub 的 Artifacts 下载需要**登录账号**，且**手机浏览器上经常点不动**，建议用电脑下载后传到手机（微信文件传输助手 / 数据线 / 网盘都行）。

---

## 七、装到华为 Mate 60

1. 把 `app-debug.apk` 传到手机（微信「文件传输助手」发给自己最简单）
2. 在手机上点开这个 apk 文件 → **允许安装未知应用**
3. **华为必须关掉「纯净模式」**，否则会拦截：
   - 设置 → 搜索「纯净模式」→ 关闭
   - 或在安装弹窗里点 **「继续安装」**（部分系统版本有效）
4. 安装完成后，桌面会出现 **「我的工作台」** 图标，点开即全屏运行，没有地址栏

> 这是 **Debug 签名**的包，用于个人使用完全没问题，只是不能上架应用商店。华为可能提示「未经华为应用市场检测」，忽略即可。

---

## 八、每次改完代码怎么重新出包

- 修改代码 → 推送（`git push`）或网页上传覆盖
- GitHub 会**自动重新构建**（因为 workflow 配了 `push` 触发）
- 回到 Actions 页面等新的 Artifacts 即可

---

## 九、常见问题

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| Actions 页面什么都没有 | `.github/workflows/build-apk.yml` 没上传成功 | 检查仓库里是否有 `.github/workflows/` 目录，重新上传（注意隐藏文件夹） |
| 报错 `SDK location not found` | 用了旧版 workflow | 用本仓库自带的 yml，里面已用 `setup-android` 配好 |
| 卡在 Gradle 下载很久 | 首次构建需要下载依赖 | 正常，约 3～8 分钟；已配阿里云镜像加速 |
| 报 `invalid source release: 21` | JDK 版本太低 | 本仓库已固定 `java-version: '21'`，不要改 |
| 构建成功但 Artifacts 点不动 | 手机浏览器限制 | 换电脑下载 |
| 安装被拦截 | 华为纯净模式 | 设置里关掉纯净模式 |
| 私有仓库额度用完 | 私有库 2000 分钟/月 | 改成 Public 仓库即可无限 |

---

## 十、APK 版和网页版的数据关系

**互相独立**，不共享。

| 使用方式 | 数据存在哪 |
| --- | --- |
| 网页版（浏览器打开 html） | 该浏览器的 LocalStorage |
| 托管版（网址访问） | 该网址的 LocalStorage |
| APK 版 | App 自己的 WebView 存储 |

迁移方法：打开 App/网页底部「更多」→「数据管理」→ **导出备份**，得到一个 `.json` 文件；在另一端同一位置点 **导入备份** 选择该文件即可。
