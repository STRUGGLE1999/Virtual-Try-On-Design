/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WardrobeItem, Outfit, UserProfile, CalendarLog } from './types';

// Let's create high quality item entries with exact hotlinks from the mockups
export const initialWardrobeItems: WardrobeItem[] = [
  {
    id: 'item_shir_polo',
    name: '牛津纺扣领衬衫',
    brand: 'POLO RALPH',
    category: 'top',
    categoryLabel: '上装',
    tags: ['#重磅棉', '#经典款', '#极简主义'],
    material: '100% 纯棉',
    colorName: '白',
    colorHex: '#FFFFFF',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3xaPoCvAzs_02nHvNKjGlPfwEE2mzOy3BfvRw3NUepkOolOJtAc1_QJGDdpHQ2HKQ1M_0jJOJEdzPuvSWufV0zHHM4IQhuOJbMFOSieJ_RrHm2qmVvFzvCvnC2g9JOx2HhpybpQmOCXUr3s77K9iuTmq4-jR_rG5C0ZJCyCWCdUEz7O2VHVsCwRkcrwSLINIRcFwKLtI6qBB0DBaDp6B_LB7ZW9-bjEZRWKCXi1ul8C2PNOEkQhYh6lVnMIeYzXvPh-_lTwbhUF0D',
    isWornCount: 14,
    isRecentFavorite: true,
    season: '四季通用',
    dateAdded: '2026-04-10',
  },
  {
    id: 'item_jeans_levi',
    name: '501 原创直筒裤',
    brand: "LEVI'S",
    category: 'bottom',
    categoryLabel: '下装',
    tags: ['#丹宁', '#直筒款', '#日式经典'],
    material: '100% 丹宁纯棉',
    colorName: '经典蓝',
    colorHex: '#3F51B5',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnb9QCyoa2Efs44UFpx_cnentXXYnMb62G35bQKS7HKlzdY06OhAfq2KOvDvTg_EwlXNrEEflhuVbX63x06GbburnzFmWsqgmOkywUDdYQ6CGITuSjU16YHjZcHMq2Nr54D3fk934jnwxSYKXQnyoz_BeUbWWllj2xPUQ7G6FFfnAEe_Kn0P9dd_C7jj7QXjVOdWSJSHgqVG7zLW5hu3atMP-JhopCoCxMhTNcesRqKScvRGYnVgjAq9cSoNnrcwf2wbKk8Nn9HTIJ',
    isWornCount: 18,
    isRecentFavorite: true,
    season: '四季通用',
    dateAdded: '2026-03-12',
  },
  {
    id: 'item_blazer_zara',
    name: '修身西装外套',
    brand: 'ZARA',
    category: 'outerwear',
    categoryLabel: '外套',
    tags: ['#羊毛', '#修身', '#先锋冷感'],
    material: '45% 细羊毛混纺',
    colorName: '曜石黑',
    colorHex: '#121212',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrEtiGKycjtE-3PUldT-JHAjhc8c391ghwGWVG8EX1OjFsXVaWouQv8040T0v36t32aafV0c0GkAHMIYjaiLqrRcduGPd-UiC5kmxaOrQoGSbI9yXq6YXm3q7HfGW-dvp1WZE7IEGFfyIbFImmvPeE4-88VVLxdOKGYYXueVwTxk4a8i4KQqZuKt9-kpTXIUcsbv7-8brnWl6PNTc8ed6IXvfwosWn21qDhJppfnmUKAGKbgseeOmj59AT8vwi8bInOyBZ7kKt5bHT',
    isWornCount: 4,
    isRecentFavorite: true,
    season: '秋冬',
    dateAdded: '2026-05-02',
  },
  {
    id: 'item_sweat_uniq',
    name: '羊绒圆领毛衣',
    brand: 'UNIQLO',
    category: 'top',
    categoryLabel: '上装',
    tags: ['#羊绒', '#极简主义', '#慵懒松弛'],
    material: '100% 细羊绒',
    colorName: '鼠尾草绿',
    colorHex: '#8F9779',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVKZ_x40PeluBUVgL9WyQOxIs-5viPvPkORHOpA2cPdaiS3RRtn-OpjHdTwDUGQLiLv4970NO0vi8kZrk6Yjzg41-KGJBWJXsc2YKtHwGjLqFkD7MeGH6Y2CUI_IGKmRZ3SdbmTKt43Y-FHtz-xwZwE818uW08G0CAIx0HHyQ0-fpKK0m4V6Yu8MYY7X6fUzOSWkUwJUN037mEBcpR4w_SrXcw7oWr0Ptneorti7T0xIk-Sj2GwUgrZ-FooHezYf6XhjmnOxD3oWSU',
    isWornCount: 9,
    isRecentFavorite: false,
    season: '春秋',
    dateAdded: '2025-11-20',
  },
  {
    id: 'item_coat_lux',
    name: 'Tailored Overcoat',
    brand: 'SILK & WOOL',
    category: 'outerwear',
    categoryLabel: '外套',
    tags: ['#双面呢', '#经典黑', '#职场通勤'],
    material: '80% 羊毛 + 20% 真丝',
    colorName: '暗岩灰',
    colorHex: '#303030',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqj8w4PJZ9rMumoiBWD-GZLP6gVBmU9nXjzieU_P1eZDkoGs-9bpuD3Tw4Gck9YJ98wogfKnBmSSpxS84r6DQ0MZYVBG2vAVdTLSOW25KiwiP0g8glM50N5ktZXl_NBKB4RvDcxYmwc6-Lm431AE7ZQVfqnCN7NYYXObbXO0EBkJ-oFEsoovVmae8KrzO5ClLbeeeaMDAhVXtZVSE2tHiDf_GJZgcu9FNxYQX3z13IIioUMW6x37jZ3oeZGlDUL_HEqlMgs1qWjj4c',
    isWornCount: 22,
    isRecentFavorite: true,
    season: '秋冬',
    dateAdded: '2025-10-15',
  },
  {
    id: 'item_shoes_pumps',
    name: 'Geometric Pumps',
    brand: 'PREMIUM LEATHER',
    category: 'shoes',
    categoryLabel: '鞋履',
    tags: ['#几何尖头', '#漆皮', '#高跟'],
    material: '亮面胎牛皮',
    colorName: '深钴蓝',
    colorHex: '#1E2B4B',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYY1-c3C_eifvci0zk6cPTc6H9WvBY7PQre3J_tZ2NjrqwbePcoe_R_TCDGep8k4rL4yYJY6JpnyM_zQvf0sorNWaClWCGZ8lPLz-EMRIybgqnzyt39-89n3YOYosh8ifmI489rgmc2NqxeMyt5a5qHdDNOGj5qzZ5EY1kUPFSUF8kUMzITTa45kqYGELRGrh87WyNOyhER4-74bXD3ADzIejwpdt0XqdMLZ8_gKxCQWfwAEPTGTTWlMgfApMLVHibZ1zqPhfx58E4',
    isWornCount: 6,
    isRecentFavorite: true,
    season: '春秋',
    dateAdded: '2026-01-10',
  },
  {
    id: 'item_coat_cream',
    name: '羊绒流苏毛呢风衣',
    brand: 'DIOR ATELIER',
    category: 'outerwear',
    categoryLabel: '外套',
    tags: ['#真丝羊绒', '#乳白色', '#高阶设计'],
    material: '90% 羊绒 + 10% 桑蚕丝',
    colorName: '米白色',
    colorHex: '#FFFDF0',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg18Do5ndal-bpW1pkKm6MlQUJYESCdmO0e7YZ1n0H5g9YigAgCswf0vN4ldIPEV4mypL9OYMx_rZ6xoqgIsRfhGCuTxUMZUDTry6UKz7xbWzzDFsOxA-B37jEUFbfd32su-ZceOtFHs4Tj1Can-uPL_61_8dxL5bkRE7PmaG4rHROCckWbXFpjXMOAcq6-Luz00Biu5Ii6cx9Wcdh42aJLRbcRg8oP6wdhzVVlk9E9GM_cGF5M1QKC7s5vYFPMieARXnKufuv7eDJ',
    isWornCount: 12,
    isRecentFavorite: true,
    season: '春秋',
    dateAdded: '2026-02-18',
  },
  {
    id: 'item_pants_charcoal',
    name: '修身高级正装西裤',
    brand: 'ARMANI EDIT',
    category: 'bottom',
    categoryLabel: '下装',
    tags: ['#冷灰色', '#修身立体', '#职场高级'],
    material: '100% 美利奴精纺羊毛',
    colorName: '木炭灰',
    colorHex: '#2A2C30',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxT1bjlWEqxAAoov8KFR9CDMmBcSWnHFqYHDcRGZPrqRdE7uw8Hdg5sXENDTBaksyfRE8iHTmF2SkSoE7tbSpkpDLc2u-ZVMkElyC5k6aoWv2F5QKnCuLyx2BDtektIpRLLZ_zYSL4ba5q6eDk24EQOcXjSN-D8YyM_7ItpTdZ6_sPFVQWbrqqxMCgEq9dETrG6A8mUBgrxbNATtKzhb7G03LW9w8G8Ef3RyDNVDNSxDxTHyGpLH9ej70-DCXP2ERQ9m3fStN2EDtf',
    isWornCount: 16,
    isRecentFavorite: true,
    season: '四季通用',
    dateAdded: '2026-03-30',
  }
];

export const initialAlternativeItems: WardrobeItem[] = [
  {
    id: 'item_sub_cardigan',
    name: '米色羊绒针织开衫',
    brand: 'LORO PIANA',
    category: 'outerwear',
    categoryLabel: '外套',
    tags: ['#羊绒', '#软糯厚实', '#大地色'],
    material: '100% 顶级羊绒',
    colorName: '燕麦色',
    colorHex: '#D7CCC8',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSzDLae7uPxJspwTHozhlL3vbtickM0T7zHZ4JIoWwye0p6YXyDmPrWGHHkjEkAVdUSq7AoIfhejLtUU89Dn8yYH0VTeNe_bUTy24fYur-kB6aqB-18Ivl61oJbPP_C6KQ9TNZ0w0sQeHBiOavBGAED-CLRrIsSKGSofkA6qT6YweyQNhj7hKjcFpuiCScBT6horZ-mUu12ZwUiYJ9VCsVFOFDlwAAc6m9A51zS4iz1ldKuzQsio-0n0iZqTvbr09qY9cxYg-nryaH',
    isWornCount: 7,
    isRecentFavorite: false,
    season: '秋冬',
    dateAdded: '2026-04-18',
  },
  {
    id: 'item_sub_pant',
    name: '高腰羊毛阔腿西裤',
    brand: 'MAX MARA',
    category: 'bottom',
    categoryLabel: '下装',
    tags: ['#羊毛混纺', '#高腰显高', '#百搭黑'],
    material: '羊毛+弹性混纺',
    colorName: '雅黑',
    colorHex: '#1A1A1A',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0zCrmEJYwhsvR2yEK3242lyXCXxjvfex-8umcRQJdFiN4xQqzebxxPP2Y-ps0Ag-D0RT24dHF_O0WyRKIfwtWrwy_7FYDYFMwdNZD0SbDvwHW3CkLeba-f2avMbt5d4twfirL9DoskbeJqpTyAkNZ85W4X9LbIuS33Ae3FYnkMsdRn1lH8I4LvDN5xzkySi_Lk2WiAHKp8F4W0DyZUvOwV7wMkChjCjrSnawia0IbyLlZ_NaNjc_At9lA6BMFfILpjERyM0nfXOEv',
    isWornCount: 11,
    isRecentFavorite: false,
    season: '四季通用',
    dateAdded: '2026-04-20',
  },
  {
    id: 'item_sub_camisole',
    name: '法式真丝吊带背心',
    brand: 'LA PERLA',
    category: 'top',
    categoryLabel: '上装',
    tags: ['#桑蚕丝', '#高级细光泽', '#内搭神品'],
    material: '100% 桑蚕真丝',
    colorName: '香槟金',
    colorHex: '#F5ECDB',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzW0wVrNWK4Fcu_L9gn7rfV3QQSZ1E1uHbJNHeS6E78al1eCJuPGLlirdwiLc7m-Pzxkq6b2surk2iwydvfzySJMp560TZhuQQ8M_9cxdP6LWhZpIfzJdncFKW1T8hQJS0eTUfOu5XFxr-PEfxuYzrgyX1Akxb5qgRRk47DZIleED7IQW7zIjX5u1GrdJCBJXddKQtP6G4UATCblggeaEBLwKZu54EuEXMX8TDoVSOXCTpzFtAIXnMyAcUi2aitxp1Pa5K_GZwal-5',
    isWornCount: 4,
    isRecentFavorite: false,
    season: '夏季',
    dateAdded: '2026-05-01',
  }
];

// Identification queue waiting for AI classification
export const pendingIdentificationQueue: WardrobeItem[] = [
  {
    id: 'pending_camel_coat',
    name: '驼色羊毛呢料大衣',
    brand: 'CELINE',
    category: 'outerwear',
    categoryLabel: '外套',
    tags: ['#极简主义', '#基础款', '#修身'],
    material: '100% 澳大利亚美利奴羊毛',
    colorName: '经典驼色',
    colorHex: '#C5A059',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdUTa7BTPoM3CltV3lklEnAfR_N_qhVQJjP1q8LGgWAeAN7969uCJbGZRBUhjURqR3JE-Bm-aKeOgjGWQqNJIFmJ1d6pt3-a_u2BQ3cnMwIvAjcK4VHvCLNLHYuos8vB9OjfRSeCDRyZAkAqoV44uWqZSjftLmlrcaGL9Y15MgVZkVDuV0WQCnyIIwzeIjLL3CKFrxvbKKolWmWqhG7kNuEnJDBib1olXJq2NE55CpBmEmhHshaiw4WoLF06mliQOiTGFKROvGXSAU',
    isWornCount: 0,
    isRecentFavorite: false,
    season: '秋冬',
    dateAdded: '2026-05-30',
  },
  {
    id: 'pending_white_tshirt',
    name: '基础款圆领 T 恤',
    brand: 'MAISON MARGIELA',
    category: 'top',
    categoryLabel: '上装',
    tags: ['#极简主义', '#基础款', '#修身'],
    material: '100% 重磅高级棉',
    colorName: '珍珠白',
    colorHex: '#FAFAFA',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7UOIl3ay46kVk1k3cOPNZY85Nq8-iZ1shCux4xzlMwr-YhUX_uyv0LHQrdN2dQy5GTFgZD8CgDBLRhPDjsrF0W2X6G4LNrk0sGd-c1gl9TLWlnl_zhI1KkDaUxUozboSfT9jfIAeS7jaS3y2Ns27_e4cEX5dvM3v3d1mydqSaWShTjo1oScAlsevHMY1Ct7V9Ap19Hd0rbGv8SdnrCe86O9CAsYT3LsZ43jy3DIqa5KQ06UF9prCQQjRXgJI7nw76fZnaw0zxgQjy',
    isWornCount: 0,
    isRecentFavorite: false,
    season: '四季通用',
    dateAdded: '2026-05-30',
  },
  {
    id: 'pending_denim_jacket',
    name: '高奢水洗丹宁夹克',
    brand: 'BALENCIAGA',
    category: 'outerwear',
    categoryLabel: '外套',
    tags: ['#街头', '#复古重影', '#日常休闲'],
    material: '12oz 重实纯棉丹宁',
    colorName: '高山冰蓝',
    colorHex: '#4A6984',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe1RP9yRk0Cco30JMe9bYq5KR5wAhHe9p-EhLnBBb7zMnf1zk2IB9wXu0N2GdLecqm232zyI4L37lNt0WrKo9s56eI6bdzQiLMLpqgvi84TDpjJnKbZD6klPOmADe4ddjyFHx2gaegQQu4sUgaEowg1XXkC-iAaZmlBZiAtw01A03x5g3IElYTFz5vQHEfxJrzPCYT4Wqk129yQanTj8e_8gcUh7A4efh5cWMsHO0twxfIEcRx7juDIea7Kf1jUkskuFW9O0UpX9uS',
    isWornCount: 0,
    isRecentFavorite: false,
    season: '春秋',
    dateAdded: '2026-05-30',
  }
];

export const userProfileDetails: UserProfile = {
  name: '林夏',
  englishName: 'Lin Xia',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBcvXdqLUjXdg9uJuXrbBMtkSH6RBO89u1AQa1w3AkUDdIPSGU5pxjTYq2riKTyo67sNgilaQ5xeiMRlYc79y9D4188R27U0fnQy2FJ4dwta8tb8-4tfXxL4Qntqq26jt8cjRFaJfjN31n0vYylelhW4gDdTdxx8MNax0YomaZZtTVUquyzsGZH1sOgfMybupeWBfnakEzNygFkuHrZxLZAiMP8VsBaT_M2KBadEtJyvd05qmDyRcLcW2sZSXwQ9Kz6DSLH5MhKy_H',
  styleTags: ['简约', '职场', '韩式'],
  height: '168cm',
  weight: '52kg',
  bodyShape: '沙漏型',
  avoidedColors: [
    { name: '亮黄', hex: '#FFD700' },
    { name: '荧光绿', hex: '#39FF14' }
  ],
  diagnostic: {
    overallScore: 78,
    常穿率: 38,
    闲置率: 13,
    gapTitle: '衣橱缺口',
    gapSuggestion: '外套比例偏低，建议增加一件深色长款风衣以丰富您的职场简约风格。'
  }
};

export const defaultCalendarLogs: CalendarLog[] = [
  {
    date: '2026-05-03',
    rating: 5,
    repeatAlert: false,
    outfitName: '职场干练风',
    items: [
      initialWardrobeItems[2], // Zara Blazer
      initialWardrobeItems[7]  // Charcoal West trousers
    ]
  },
  {
    date: '2026-05-04',
    rating: 4,
    repeatAlert: true,
    outfitName: '休闲白衬衫搭配',
    items: [
      initialWardrobeItems[0], // White Shirt
      initialWardrobeItems[1]  // Levis Jeans
    ]
  },
  {
    date: '2026-05-05',
    rating: 5,
    repeatAlert: false,
    outfitName: '冷感羊绒松弛感',
    items: [
      initialWardrobeItems[3], // Uniqlo knit sweat
      initialWardrobeItems[7]  // Charcoal trousers
    ]
  },
  {
    date: '2026-05-06',
    rating: 4,
    repeatAlert: false,
    outfitName: '羊西装利索装',
    items: [
      initialWardrobeItems[2], // Zara Blazer
      initialWardrobeItems[0]  // White shirt
    ]
  },
  {
    date: '2026-05-07',
    rating: 3,
    repeatAlert: false,
    outfitName: '高饱和对比装',
    items: [
      initialAlternativeItems[0], // Oat cardigan
      initialWardrobeItems[1]     // Levis jeans
    ]
  },
  {
    date: '2026-05-10',
    rating: 5,
    repeatAlert: true,
    outfitName: '大衣配西裤精英感',
    items: [
      initialWardrobeItems[4], // Silk & wool coat
      initialWardrobeItems[7]  // Charcoal trousers
    ]
  },
  {
    date: '2026-05-11',
    rating: 4,
    repeatAlert: false,
    outfitName: '质感双面呢外套配牛仔',
    items: [
      initialWardrobeItems[4], // Overcoat
      initialWardrobeItems[1]  // Denim Jeans
    ]
  },
  {
    date: '2026-05-12',
    rating: 5,
    repeatAlert: true,
    outfitName: '全白衬托配西裤',
    items: [
      initialWardrobeItems[0], // White shirt
      initialWardrobeItems[7]  // Pants
    ]
  },
  {
    date: '2026-05-13',
    rating: 4,
    repeatAlert: true,
    outfitName: '大衣西裤高街标配',
    items: [
      {
        id: 'log_coat_alt',
        name: '高级炭黑呢子大衣',
        brand: 'WARDROBE',
        category: 'outerwear',
        categoryLabel: '大衣',
        tags: ['#双面羊毛', '#修身立体'],
        material: '100% 极细美利奴呢绒',
        colorName: '炭黑',
        colorHex: '#212121',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHJ1OJkqqYrGNH-4GBYNWYIM4Qi4k5BRyIcD2JIc0pPe2r4T3Aru0-CTVTIY5kZg0JhB72qN6MfloEqkqOrwb2xrh_qZxVX9cw-d2fuVD80OowpXM0A0BakG8wpoLeQzincRZLkA73y4uje53mwyIYzbA_aQpEI-K2t_4EydF_HxpRxo2JoSiIxQtqkNw6oY-YW9PS83xNanqQgd1GvHJfi8G2hZ1LdCUzvg0iFHpozkgRI4hYbU7w32RhKj4MobdJIp9U1YJtwR7T',
        isWornCount: 4,
        isRecentFavorite: false,
        season: '秋冬',
        dateAdded: '2026-05-01'
      },
      {
        id: 'log_pants_alt',
        name: '微光感真丝通勤长裤',
        brand: 'VOGUE SELECTION',
        category: 'bottom',
        categoryLabel: '真丝长裤',
        tags: ['#高腰', '#蚕丝缎'],
        material: '70% 桑蚕丝 + 30% 天丝',
        colorName: '象牙白',
        colorHex: '#FFFFFA',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9S2YmEJgXpt5EuPI6JwBRaU8nhX1z2lhNco6Q3ST44mQT4H47BrBypZdYnDDjTh8G3KBa5GbjmfwzdQDpdV31L48BR-TA4djVVk04eWqIxlRQxRG0Mn3lmoOwEtmuAKLz9GZZUHef1yUZ7NbJdFR3sM0XwcZjcKbTqiWDQkMMhpGEUiw2VB4e-yF8_PpK1hcJehmJzO3YnBgYk2cBW8wo5zOmtOFIWivnKq5_FNp6dMnk1M0v_MDfJjpI8lI5RNLWp86pBlkciFF2',
        isWornCount: 8,
        isRecentFavorite: false,
        season: '春秋',
        dateAdded: '2026-04-20'
      }
    ]
  }
];
