/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WardrobeItem {
  id: string;
  name: string;
  brand: string;
  category: 'top' | 'bottom' | 'outerwear' | 'shoes' | 'accessory';
  categoryLabel: string; // e.g. "上装", "下装", "外套"
  tags: string[]; // e.g. ["#极简主义", "#基础款"]
  material: string; // e.g. "100% 重磅棉"
  colorName: string; // e.g. "珍珠白"
  colorHex: string; // e.g. "#FFFFFF"
  imageUrl: string;
  isWornCount: number;
  isRecentFavorite: boolean;
  isCustomUploaded?: boolean;
  season: string; // e.g. "四季通用", "秋冬"
  dateAdded: string; // e.g. "2026-05-13"
}

export interface Outfit {
  id: string;
  name: string; // e.g. "简约职场搭配"
  matchScore: number; // e.g. 92
  wearCount: number; // e.g. 5
  styleRisk: 'low' | 'medium' | 'high';
  styleRiskLabel: '低' | '中' | '高';
  items: WardrobeItem[];
  categoryTag: string; // e.g. "简约职场", "周末休闲"
}

export interface CalendarLog {
  date: string; // "YYYY-MM-DD" e.g., "2026-05-13"
  rating: number; // 1-5 stars
  repeatAlert: boolean;
  items: WardrobeItem[];
  outfitName: string;
}

export interface ClosetDiagnostic {
  overallScore: number;
  常穿率: number; // e.g. 38
  闲置率: number; // e.g. 13
  gapTitle: string; // "衣橱缺口"
  gapSuggestion: string; // "外套比例偏低，建议增加一件深色长款风衣以丰富您的职场简约风格。"
}

export interface UserProfile {
  name: string;
  englishName: string;
  avatarUrl: string;
  styleTags: string[]; // ["简约", "职场", "韩式"]
  height: string; // "168cm"
  weight: string; // "52kg"
  bodyShape: string; // "沙漏型"
  avoidedColors: Array<{ name: string; hex: string }>;
  diagnostic: ClosetDiagnostic;
}
