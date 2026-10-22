# 短视频编导个人作品集

React + Vite 基础版。参考 PDF 的奶油白、黑白影像、衬线大字、错落卡片及粉色收尾设计。

## 本地运行

```sh
npm install
npm run dev
```

生产构建：`npm run build`，产物在 `docs/`；预览构建：`npm run preview`。

## 替换资料

- `src/content.js`：姓名、简介、头像、背景视频、联系信息、项目数据与作品列表。
- `src/main.jsx`：页面模块与交互。
- `src/style.css`：版式、颜色及响应式规则，最大版心为 1700px。
- 建议将正式头像、封面、视频放入 `public/`，在内容文件里使用 `/文件名` 路径。
- 姓名、联系方式、教育和工作经历已按提供的简历填写；10+ 条垂类视频产出来自简历，11 支作品为本次提供的视频文件数。
- 11 支视频及封面已保存到 `public/media/works/`。原文件与网站编号对应关系见 `reference/media-index.json`。标题与分类根据画面整理，项目职责按本人确认，标注为选题、脚本、拍摄、出镜与剪辑。
- 首页视频 `public/media/showreel.mp4` 为所提供的三支视频片段并列展示，无音轨；卡片弹窗播放各自的完整原视频。
- 人物照片为提供的 JPG；卡通形象保存在 `public/media/avatar.png` 备用。个人素材均为本地加载，Google Fonts 加载失败时回退到本机字体。
- 联系方式未设置时会显示提示；填写后支持邮件、拨号和复制微信号。

已包含：背景视频暂停、作品分类、视频弹窗、Esc 关闭、键盘焦点恢复、页内导航和返回顶部。

## GitHub Pages

构建产物 `docs/` 与源码一起提交到 `main` 分支。在仓库 Settings → Pages 中选择 `Deploy from a branch`，分支 `main`，目录 `/docs`。后续修改源码后，先运行 `npm run build`，再将源码和更新后的 `docs/` 一起提交。资源使用相对路径，支持仓库子路径部署。`public/.nojekyll` 会复制到构建目录。
