import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 简单的 SVG 模板，用于生成图标
const generateIconSVG = (type, isActive = false) => {
  const color = isActive ? '#0041c9' : '#9ca3af';
  const icons = {
    home: `<svg width="81" height="81" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="${color}"/>
    </svg>`,
    wardrobe: `<svg width="81" height="81" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="2" width="18" height="20" rx="2" fill="${color}"/>
      <rect x="3" y="6" width="18" height="2" fill="white" opacity="0.3"/>
      <line x1="12" y1="2" x2="12" y2="22" stroke="white" stroke-width="1.5" opacity="0.3"/>
    </svg>`,
    match: `<svg width="81" height="81" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="${color}" stroke-width="2" fill="none"/>
      <circle cx="12" cy="12" r="4" fill="${color}"/>
      <circle cx="12" cy="5" r="2" fill="${color}"/>
      <circle cx="19" cy="12" r="2" fill="${color}"/>
      <circle cx="12" cy="19" r="2" fill="${color}"/>
      <circle cx="5" cy="12" r="2" fill="${color}"/>
    </svg>`,
    calendar: `<svg width="81" height="81" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="18" rx="2" fill="${color}"/>
      <line x1="16" y1="2" x2="16" y2="6" stroke="white" stroke-width="2" stroke-linecap="round"/>
      <line x1="8" y1="2" x2="8" y2="6" stroke="white" stroke-width="2" stroke-linecap="round"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke="white" stroke-width="2"/>
      <text x="7" y="17" fill="white" font-size="8" font-weight="bold">15</text>
    </svg>`,
    mine: `<svg width="81" height="81" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="7" r="4" fill="${color}"/>
      <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21H5Z" fill="${color}"/>
    </svg>`
  };
  return icons[type] || icons.home;
};

// 生成简单的 PNG 文件（使用 base64 编码的 PNG）
const generateSimplePNG = (color) => {
  // 一个简单的 81x81 PNG 占位符
  // 实际上我们应该使用 canvas，但这里为了简单，我们使用一个基础的实现
  return Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
    0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR
    0x00, 0x00, 0x00, 0x51, 0x00, 0x00, 0x00, 0x51, // 81x81
    0x08, 0x02, 0x00, 0x00, 0x00, 0x55, 0x8D, 0x7E,
    0x00, 0x00, 0x00, 0x09, 0x70, 0x48, 0x59, 0x73, // pHYs
    0x00, 0x00, 0x0B, 0x13, 0x00, 0x00, 0x0B, 0x13,
    0x01, 0x00, 0x9A, 0x9C, 0x18, 0x00, 0x00, 0x00,
    0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0xD7, 0x63,
    0xF8, 0xFF, 0xFF, 0x3F, 0x03, 0x02, 0x62, 0x01,
    0x00, 0x0A, 0xE3, 0x01, 0x35, 0x52, 0xB8, 0x00,
    0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE,
    0x42, 0x60, 0x82
  ]);
};

// 主函数
async function main() {
  const iconsDir = path.join(__dirname, 'icons');
  
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  const iconTypes = ['home', 'wardrobe', 'match', 'calendar', 'mine'];
  
  console.log('正在生成 tabBar 图标...');
  
  for (const type of iconTypes) {
    // 生成普通状态图标 (灰色)
    const svgNormal = generateIconSVG(type, false);
    const svgActive = generateIconSVG(type, true);
    
    console.log(`✓ 准备 ${type} 图标`);
    
    // 由于我们没有完整的 SVG 到 PNG 转换库，
    // 我们创建一个说明文件，并保存 SVG 源文件
    fs.writeFileSync(path.join(iconsDir, `${type}.svg`), svgNormal);
    fs.writeFileSync(path.join(iconsDir, `${type}-active.svg`), svgActive);
  }
  
  console.log('\n⚠️  重要提示：');
  console.log('微信小程序 tabBar 需要 PNG 格式的图标。');
  console.log('请按照以下步骤完成配置：');
  console.log('\n1. 将 icons/ 目录下的 SVG 图标转换为 PNG 格式');
  console.log('2. 确保图标尺寸为 81x81 像素');
  console.log('3. 普通状态图标使用灰色 #9ca3af');
  console.log('4. 选中状态图标使用品牌蓝 #0041c9');
  console.log('5. 将转换后的 PNG 文件放置在 icons/ 目录下');
  console.log('\n文件命名规范：');
  console.log('  - 普通状态：home.png, wardrobe.png, match.png, calendar.png, mine.png');
  console.log('  - 选中状态：home-active.png, wardrobe-active.png, match-active.png, calendar-active.png, mine-active.png');
  
  // 创建一个使用说明文件
  const readmeContent = `# TabBar 图标说明

## 图标规格要求
- 格式：PNG
- 尺寸：81px × 81px
- 文件大小：不超过 40KB

## 颜色规范
- 普通状态：#9ca3af
- 选中状态：#0041c9

## 文件命名
| Tab | 普通状态 | 选中状态 |
|-----|---------|---------|
| 首页 | home.png | home-active.png |
| 衣橱 | wardrobe.png | wardrobe-active.png |
| 搭配 | match.png | match-active.png |
| 日历 | calendar.png | calendar-active.png |
| 我的 | mine.png | mine-active.png |

## 如何转换 SVG 到 PNG
你可以使用以下工具之一：
1. Figma/Sketch/Adobe XD 等设计工具
2. 在线转换工具：cloudconvert.com, convertio.co
3. 命令行工具：ImageMagick, Inkscape

## 当前状态
本目录下的 .svg 文件是图标源文件，请转换为 .png 后使用。
`;
  
  fs.writeFileSync(path.join(iconsDir, 'README.md'), readmeContent);
  
  console.log('\n✓ 图标配置完成！SVG 源文件已保存到 icons/ 目录');
}

main().catch(console.error);
