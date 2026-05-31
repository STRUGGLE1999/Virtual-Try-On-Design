# TabBar 图标配置说明

## 📋 微信小程序要求

### 图标规格
- **格式**: PNG (仅支持 PNG)
- **尺寸**: 81px × 81px (推荐)
- **文件大小**: 不超过 40KB
- **背景**: 透明

### 颜色规范
| 状态 | 颜色值 |
|------|--------|
| 普通未选中 | #9ca3af (石灰色) |
| 选中状态 | #0041c9 (品牌蓝) |

## 📁 文件命名

| 页面 | 普通图标 | 选中图标 |
|------|---------|---------|
| 首页 | home.png | home-active.png |
| 衣橱 | wardrobe.png | wardrobe-active.png |
| 搭配 | match.png | match-active.png |
| 日历 | calendar.png | calendar-active.png |
| 我的 | mine.png | mine-active.png |

## 🔧 如何转换 SVG 到 PNG

### 方法 1: 使用设计工具 (推荐)
1. 在 Figma / Sketch / Adobe XD 中打开 SVG 文件
2. 调整画布大小为 81px × 81px
3. 导出为 PNG 格式，确保背景透明
4. 保存到 icons/ 目录

### 方法 2: 使用在线工具
- https://cloudconvert.com/svg-to-png
- https://convertio.co/zh/svg-png/

## ✅ 验证步骤

1. 将所有 PNG 图标放置在 vogue-ai-miniprogram/icons/ 目录
2. 在微信开发者工具中打开项目
3. 查看底部导航栏，确认图标显示正常
