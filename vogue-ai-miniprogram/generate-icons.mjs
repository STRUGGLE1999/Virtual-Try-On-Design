import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 生成图标 SVG
const iconConfigs = [
  { name: 'home', label: '首页' },
  { name: 'wardrobe', label: '衣橱' },
  { name: 'match', label: '搭配' },
  { name: 'calendar', label: '日历' },
  { name: 'mine', label: '我的' }
];

// SVG 图标定义
const iconSVGs = {
  home: (color) => `<svg width="81" height="81" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="${color}"/>
  </svg>`,
  wardrobe: (color) => `<svg width="81" height="81" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="2" width="18" height="20" rx="2" fill="${color}"/>
    <rect x="3" y="6" width="18" height="2" fill="white" opacity="0.3"/>
    <line x1="12" y1="2" x2="12" y2="22" stroke="white" stroke-width="1.5" opacity="0.3"/>
  </svg>`,
  match: (color) => `<svg width="81" height="81" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="${color}" stroke-width="2" fill="none"/>
    <circle cx="12" cy="12" r="4" fill="${color}"/>
    <circle cx="12" cy="5" r="2" fill="${color}"/>
    <circle cx="19" cy="12" r="2" fill="${color}"/>
    <circle cx="12" cy="19" r="2" fill="${color}"/>
    <circle cx="5" cy="12" r="2" fill="${color}"/>
  </svg>`,
  calendar: (color) => `<svg width="81" height="81" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" fill="${color}"/>
    <line x1="16" y1="2" x2="16" y2="6" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <line x1="8" y1="2" x2="8" y2="6" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <line x1="3" y1="10" x2="21" y2="10" stroke="white" stroke-width="2"/>
  </svg>`,
  mine: (color) => `<svg width="81" height="81" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="7" r="4" fill="${color}"/>
    <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21H5Z" fill="${color}"/>
  </svg>`
};

// 颜色定义
const COLOR_NORMAL = '#9ca3af';
const COLOR_ACTIVE = '#0041c9';

// 主函数
async function main() {
  const iconsDir = path.join(__dirname, 'icons');
  
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  console.log('正在生成 tabBar 图标 SVG 源文件...\n');
  
  for (const config of iconConfigs) {
    // 生成普通状态图标
    const svgNormal = iconSVGs[config.name](COLOR_NORMAL);
    const svgActive = iconSVGs[config.name](COLOR_ACTIVE);
    
    fs.writeFileSync(path.join(iconsDir, `${config.name}.svg`), svgNormal);
    fs.writeFileSync(path.join(iconsDir, `${config.name}-active.svg`), svgActive);
    
    console.log(`✓ ${config.label} 图标已生成`);
  }
  
  // 创建使用说明
  const readmeContent = `# TabBar 图标配置说明

## 📋 微信小程序要求

### 图标规格
- **格式**: PNG (仅支持 PNG)
- **尺寸**: 81px × 81px (推荐) / 40px × 40px (最小)
- **文件大小**: 不超过 40KB
- **背景**: 透明

### 颜色规范
| 状态 | 颜色值 |
|------|--------|
| 普通未选中 | \`#9ca3af\` (石灰色) |
| 选中状态 | \`#0041c9\` (品牌蓝) |

## 📁 文件命名

| 页面 | 普通图标 | 选中图标 |
|------|---------|---------|
| 首页 | \`home.png\` | \`home-active.png\` |
| 衣橱 | \`wardrobe.png\` | \`wardrobe-active.png\` |
| 搭配 | \`match.png\` | \`match-active.png\` |
| 日历 | \`calendar.png\` | \`calendar-active.png\` |
| 我的 | \`mine.png\` | \`mine-active.png\` |

## 🔧 如何转换 SVG 到 PNG

### 方法 1: 使用设计工具 (推荐)
1. 在 Figma / Sketch / Adobe XD 中打开 SVG 文件
2. 调整画布大小为 81px × 81px
3. 导出为 PNG 格式，确保背景透明
4. 保存到 \`icons/\` 目录

### 方法 2: 使用在线工具
- https://cloudconvert.com/svg-to-png
- https://convertio.co/zh/svg-png/
- https://ezgif.com/svg-to-png

### 方法 3: 命令行 (需要安装 ImageMagick)
\`\`\`bash
cd icons
for file in *.svg; do
  convert -background none -resize 81x81 "$file" "${file%.svg}.png"
done
\`\`\`

## ✅ 验证步骤

1. 将所有 PNG 图标放置在 \`vogue-ai-miniprogram/icons/\` 目录
2. 在微信开发者工具中打开项目
3. 查看底部导航栏，确认图标显示正常
4. 点击每个 tab，确认选中状态图标切换正常

## 📝 当前状态

✅ app.json tabBar 配置已完成  
✅ SVG 图标源文件已生成  
⬜️ 需要转换为 PNG 格式后才能在小程序中显示
`;
  
  fs.writeFileSync(path.join(iconsDir, 'README.md'), readmeContent);
  
  console.log('\n✅ SVG 图标源文件已生成到 icons/ 目录');
  console.log('\n📌 下一步：将 SVG 转换为 PNG 格式');
  console.log('   详细说明请查看 icons/README.md');
}

main().catch(console.error);
