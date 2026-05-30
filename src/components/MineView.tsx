/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, Lightbulb, Star, Award, Heart, History, 
  ShoppingBag, Settings2, Trash2, Plus, Sparkles
} from 'lucide-react';
import { UserProfile, WardrobeItem } from '../types';

interface MineViewProps {
  userProfile: UserProfile;
  favorites: WardrobeItem[];
  onNavigateToTab: (tab: 'home' | 'wardrobe' | 'match' | 'calendar' | 'mine') => void;
}

export default function MineView({ userProfile, favorites, onNavigateToTab }: MineViewProps) {
  const [avoidedColors, setAvoidedColors] = useState(userProfile.avoidedColors);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [newColor, setNewColor] = useState({ name: '', hex: '#000000' });

  const handleAddAvoidColor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColor.name.trim()) return;
    setAvoidedColors([...avoidedColors, { name: newColor.name.trim(), hex: newColor.hex }]);
    setNewColor({ name: '', hex: '#000000' });
    setShowColorPicker(false);
  };

  const handleRemoveColor = (nameToDel: string) => {
    setAvoidedColors(avoidedColors.filter(c => c.name !== nameToDel));
  };

  return (
    <div className="space-y-8 pb-10 select-none">
      {/* Profile Header section */}
      <section className="flex flex-col items-center text-center space-y-4 pt-2">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-stone-100 shadow-sm relative group">
          <img 
            src={userProfile.avatarUrl} 
            alt="Lin Xia digital portrait" 
            className="w-full h-full object-cover group-hover:scale-105 transition-all"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="space-y-1.5">
          <h2 className="text-3xl font-serif font-bold text-stone-900 leading-tight">
            {userProfile.name} ({userProfile.englishName})
          </h2>
          <div className="flex flex-wrap justify-center gap-2 select-none">
            {userProfile.styleTags.map((tag, idx) => {
              const bgColors = [
                'bg-tag-linen text-amber-900', 
                'bg-tag-cotton text-emerald-900', 
                'bg-tag-silk text-purple-900'
              ];
              return (
                <span 
                  key={idx} 
                  className={`px-3 py-1 font-bold text-xs uppercase tracking-wider rounded-full ${
                    bgColors[idx % bgColors.length]
                  }`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>

        {/* Physical parameter grid */}
        <div className="w-full grid grid-cols-3 gap-4 py-4 border-y border-stone-200/50 mt-4 text-xs">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-bold tracking-widest text-[#444748] opacity-60">身高</span>
            <span className="font-bold text-stone-900 text-sm mt-0.5">{userProfile.height}</span>
          </div>
          <div className="flex flex-col border-x border-stone-100">
            <span className="text-[9px] uppercase font-bold tracking-widest text-[#444748] opacity-60">体重</span>
            <span className="font-bold text-stone-900 text-sm mt-0.5">{userProfile.weight}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-bold tracking-widest text-[#444748] opacity-60">体型</span>
            <span className="font-bold text-stone-900 text-sm mt-0.5">{userProfile.bodyShape}</span>
          </div>
        </div>

        {/* Avoided Colors panel */}
        <div className="w-full flex items-center justify-between pt-1 select-none">
          <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">避免颜色</span>
          <div className="flex items-center gap-2">
            {avoidedColors.map((color, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  if (confirm(`是否从避免色中移除 【${color.name}】?`)) {
                    handleRemoveColor(color.name);
                  }
                }}
                className="w-6 h-6 rounded-full border border-stone-200 shadow-sm relative group cursor-pointer active:scale-90"
                style={{ backgroundColor: color.hex }}
                title={`${color.name} (点击可移除)`}
              >
                <div className="absolute inset-0 bg-black/45 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => setShowColorPicker(true)}
              className="w-6 h-6 rounded-full border border-stone-300 bg-stone-50 flex items-center justify-center cursor-pointer hover:bg-stone-100 text-stone-400"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Wardrobe diagnostics section */}
      <section className="space-y-4">
        <h3 className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block tracking-widest">
          衣橱诊断
        </h3>

        <div className="space-y-4">
          
          {/* Diagnostic 1: Score & circle SVG progress */}
          <div className="glass-card rounded-3xl p-5 flex items-center justify-between relative overflow-hidden bg-white/75 border border-stone-200/50 shadow-sm">
            <div className="space-y-1.5 z-10">
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">智能综合评分</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-serif font-black text-[#1A1A1A]">
                  {70 + avoidedColors.length * 4}
                </span>
                <span className="text-xs font-bold text-stone-500">/100</span>
              </div>
            </div>

            {/* Circular progress SVG */}
            <div className="w-20 h-20 shrink-0 relative z-10 select-none">
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  cx="40" 
                  cy="40" 
                  r="34" 
                  fill="transparent" 
                  stroke="#F3F4F5" 
                  strokeWidth="6" 
                />
                <circle 
                  cx="40" 
                  cy="40" 
                  r="34" 
                  fill="transparent" 
                  stroke="#0041c9" 
                  strokeWidth="6" 
                  strokeDasharray="213.6"
                  strokeDashoffset={213.6 - (213.6 * (70 + avoidedColors.length * 4)) / 100}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-serif font-bold text-stone-800">
                A LEVEL
              </div>
            </div>
            
            {/* Decors background aura */}
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-stone-100 rounded-full blur-3xl -z-10" />
          </div>

          {/* Diagnostic 2: Double stats grid */}
          <div className="grid grid-cols-2 gap-4">
            
            <div className="glass-card rounded-3xl p-5 space-y-1 bg-white border border-stone-200/50 shadow-sm">
              <span className="text-[9px] uppercase font-bold tracking-widest text-stone-400 block">常穿率</span>
              <span className="text-2xl font-serif font-bold text-stone-900">{userProfile.diagnostic.常穿率}%</span>
              <div className="w-full h-1 bg-stone-100 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-stone-900 rounded-full" 
                  style={{ width: `${userProfile.diagnostic.常穿率}%` }}
                />
              </div>
            </div>

            <div className="glass-card rounded-3xl p-5 space-y-1 bg-white border border-stone-200/50 shadow-sm">
              <span className="text-[9px] uppercase font-bold tracking-widest text-stone-400 block">闲置率</span>
              <span className="text-2xl font-serif font-bold text-stone-900">{userProfile.diagnostic.闲置率}%</span>
              <div className="w-full h-1 bg-stone-100 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-full" 
                  style={{ width: `${userProfile.diagnostic.闲置率}%` }}
                />
              </div>
            </div>
          </div>

          {/* Diagnostic 3: Gaps and advice */}
          <div className="glass-card rounded-3xl p-5 flex gap-4 items-start bg-white border border-stone-200/50 shadow-sm">
            <div className="p-2 bg-stone-50 border border-stone-100 rounded-xl text-stone-800 shrink-0">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="space-y-0.5 text-xs text-left">
              <span className="text-[9px] uppercase font-bold tracking-widest text-stone-800 font-sans block">
                {userProfile.diagnostic.gapTitle} (GAPS RECOMMEND)
              </span>
              <p className="text-stone-600 leading-relaxed font-medium">
                {userProfile.diagnostic.gapSuggestion}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prefence summury */}
      <section className="space-y-4">
        <h3 className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block tracking-widest">
          风格偏好总结
        </h3>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-100 rounded-2xl shadow-sm text-xs">
            <div className="flex items-center gap-3">
              <Award className="w-4 h-4 text-stone-800" />
              <span className="font-bold text-stone-800">职场通勤风格</span>
            </div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-stone-400 bg-stone-100 px-2.5 py-0.5 rounded-full">
              高频首选
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-100 rounded-2xl shadow-sm text-xs">
            <div className="flex items-center gap-3">
              <Award className="w-4 h-4 text-[#0041c9]" />
              <span className="font-bold text-[#0041c9]">周末休闲松弛款</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-white bg-[#0041c9] px-2.5 py-0.5 rounded-full">
              快速上升趋势
            </span>
          </div>
        </div>
      </section>

      {/* Tool grids */}
      <section className="grid grid-cols-4 gap-3 select-none text-center">
        
        {/* Shortcut 1 */}
        <button 
          onClick={() => {
            alert(`已收藏单品 X 套:\n${favorites.map(f => `[${f.brand}] ${f.name}`).join('\n') || '暂无单品收藏'}`);
          }}
          className="flex flex-col items-center gap-2 group pointer-events-auto cursor-pointer"
        >
          <div className="w-14 h-14 rounded-2xl bg-stone-100 mb-1 flex items-center justify-center group-active:scale-90 shadow-sm hover:bg-stone-200 transition-colors">
            <Heart className="w-4.5 h-4.5 text-stone-800" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#444748]">我的收藏</span>
        </button>

        {/* Shortcut 2 */}
        <button 
          onClick={() => onNavigateToTab('calendar')}
          className="flex flex-col items-center gap-2 group pointer-events-auto cursor-pointer"
        >
          <div className="w-14 h-14 rounded-2xl bg-stone-100 mb-1 flex items-center justify-center group-active:scale-90 shadow-sm hover:bg-stone-200 transition-colors">
            <History className="w-4.5 h-4.5 text-stone-800" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#444748]">穿搭历史</span>
        </button>

        {/* Shortcut 3 */}
        <button 
          onClick={() => {
            alert('一键跳转至首页的【买前试穿】服务展开智能模拟！');
            onNavigateToTab('home');
          }}
          className="flex flex-col items-center gap-2 group pointer-events-auto cursor-pointer"
        >
          <div className="w-14 h-14 rounded-2xl bg-stone-100 mb-1 flex items-center justify-center group-active:scale-90 shadow-sm hover:bg-stone-200 transition-colors">
            <ShoppingBag className="w-4.5 h-4.5 text-stone-800" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#444748]">买前试穿</span>
        </button>

        {/* Shortcut 4 */}
        <button 
          onClick={() => {
            alert('AI 造型顾问高级特征推荐人格：已锁定为【先锋前卫设计师】风格特征评分 88。');
          }}
          className="flex flex-col items-center gap-2 group pointer-events-auto cursor-pointer"
        >
          <div className="w-14 h-14 rounded-2xl bg-stone-100 mb-1 flex items-center justify-center group-active:scale-90 shadow-sm hover:bg-stone-200 transition-colors">
            <Settings2 className="w-4.5 h-4.5 text-stone-800" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#444748]">AI配置</span>
        </button>
      </section>

      {/* Verified Algorithm disclaimer footer */}
      <footer className="pt-8 pb-10 border-t border-stone-200/60 text-center space-y-2">
        <div className="flex justify-center items-center gap-2 text-stone-400">
          <ShieldCheck className="w-4.5 h-4.5 text-[#818394] opacity-80" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#818394] block mt-0.5">
            AI 智能算法保障体系
          </span>
        </div>
        <p className="text-[10.5px] text-stone-400 font-medium max-w-[280px] mx-auto opacity-70 leading-relaxed font-sans">
          穿搭建议根据体型数据与全球高定时尚大数据拟真重绘。本平台仅提供客观顾问意见，尊重每种多元风格主张。
        </p>
      </footer>

      {/* Avoided color adding modal */}
      {showColorPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowColorPicker(false)} />
          <form 
            onSubmit={handleAddAvoidColor}
            className="relative bg-white w-full max-w-sm p-6 rounded-3xl border border-stone-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200 space-y-4"
          >
            <h3 className="text-lg font-serif font-bold text-stone-900">追加避免色</h3>
            
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#444748]">颜色名称</label>
              <input 
                type="text" 
                placeholder="例如: 暖粉色, 莫兰迪蓝" 
                value={newColor.name}
                onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
                className="w-full p-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 outline-none text-xs text-stone-800"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#444748] block">颜色拾取 (Hex 编码)</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={newColor.hex}
                  onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })}
                  className="w-10 h-10 border border-stone-200 rounded-lg cursor-pointer bg-white"
                />
                <span className="text-xs font-bold text-stone-500 font-mono uppercase">{newColor.hex}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                type="button"
                onClick={() => setShowColorPicker(false)}
                className="flex-1 py-3 text-xs bg-stone-100 hover:bg-stone-50 text-stone-700 font-bold border border-stone-200 rounded-full cursor-pointer text-center"
              >
                取消
              </button>
              <button 
                type="submit"
                className="flex-1 py-3 text-xs bg-black hover:bg-stone-800 text-white font-bold rounded-full cursor-pointer text-center"
              >
                确认追加
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
