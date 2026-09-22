# HomePage 项目长期笔记

## 项目概览
- 基于 WowPage 模板的 Jekyll 学术主页，在线地址 https://weiganglu.github.io/HomePage/
- 部署分支：`master/root`，推送后 GitHub Pages 自动构建。
- 本地**未安装 jekyll**（`bundle exec jekyll` 不可用），无法本地 build 预览，只能用 `ruby -ryaml` 校验 `_config.yml`。

## 内容修改入口（不要改 _includes / _layouts / _sass）
| 想改什么 | 改哪个文件 |
| --- | --- |
| 姓名、简介 description、单位 employer、地址 location、各学术链接 | `_config.yml` 的 `author:` 段 |
| News / Experience / Publications / Awards / Services | `_pages/about.md`（单一文件，含 HTML 片段） |
| 导航菜单 | `_data/navigation.yml` |
| 图片 | `images/`，logo 在 `images/education/`，头像 `images/you.jpg` |

## 注意事项
- 侧栏 author-profile 只渲染 `author.location` 和 `author.employer`；`institute` 字段目前无用。`bio` 默认被注释掉（不显示）。
- Experience 卡片结构：`.experience-container > .experience-card > img.experience-logo + .experience-info`，logo 被 CSS 固定 60x60（`assets/css/home.css`）。
- 学校名称：**西北大学 = Northwest University (NWU)**，不是 Northwestern University。计算机学院官网 https://cs.nwu.edu.cn/
