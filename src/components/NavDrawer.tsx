/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Settings, BarChart3, Brain, HelpCircle, X, ChevronRight, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onChangeTab?: (tab: 'home' | 'wardrobe' | 'match' | 'calendar' | 'mine') => void;
}

export default function NavDrawer({ isOpen, onClose, userProfile, onChangeTab }: NavDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Content Panel */}
      <div 
        className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl py-8 flex flex-col justify-between rounded-r-3xl border-r border-stone-100 transform transition-transform duration-300"
        style={{ transform: 'translateX(0%)' }}
      >
        <div className="px-6 flex-1 flex flex-col">
          {/* Header & Close Button */}
          <div className="flex justify-between items-center mb-8">
            <span className="text-serif font-bold tracking-widest text-[#1A1A1A]">MENU</span>
            <button 
              onClick={onClose} 
              className="p-1 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-stone-500" />
            </button>
          </div>

          {/* Profile Card Summary */}
          <div className="mb-8 flex items-center gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-100">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-stone-200">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoU4_Rf4t6xdsS41JfldAhrzIfOJfKKea6vk3rVWH1ETmdpGJVByJhmMqG2FbsbIxlREQF-3ep5nrWFg8XAQDAOPRiDPgRBBEYKgNEevYMUhPXdqabPktzKI3IlvXd2BO5Yk7EZttNUMhC_zgCGnik322NaXQZhF0O-UmrdNUewQLHBQ-jX8botLXboG9aPQfELipvQrlPVwwUvjrANWMrbe89S8o64nAeTKc5P00Xeq1woBzhwLr9MO-N1Rq3Gmi_UF7ylL8R4yAm"
                alt="AI Digital Couture avatar" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-lg">数字定制专家</h4>
              <p className="text-xs text-stone-500 font-medium">风格特征：前卫先锋</p>
              <div className="inline-flex items-center gap-1 mt-1 bg-violet-50 text-violet-600 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">
                <Sparkles className="w-2.5 h-2.5" />
                衣橱评分: {userProfile.diagnostic.overallScore + 10}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 flex-1 select-none">
            <button
              onClick={() => {
                if (onChangeTab) {
                  onChangeTab('calendar');
                  onClose();
                }
              }}
              className="w-full flex items-center justify-between py-3 px-4 text-stone-700 hover:bg-stone-50 active:bg-stone-100 rounded-xl transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-stone-400" />
                <span className="text-sm font-medium text-stone-800">穿搭日历</span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>

            <button
              onClick={() => {
                if (onChangeTab) {
                  onChangeTab('mine');
                  onClose();
                }
              }}
              className="w-full flex items-center justify-between py-3 px-4 text-stone-700 hover:bg-stone-50 active:bg-stone-100 rounded-xl transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-stone-400" />
                <span className="text-sm font-medium text-stone-800">衣橱洞察</span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>

            <button
              onClick={() => {
                alert('正在载入 AI 造型顾问的高级配置特征页面...');
              }}
              className="w-full flex items-center justify-between py-3 px-4 text-stone-700 hover:bg-stone-50 active:bg-stone-100 rounded-xl transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-stone-400" />
                <span className="text-sm font-medium text-stone-800">AI 造型顾问配置</span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>

            <button
              onClick={() => {
                alert('设置选项已激活：可以配置免密登入及自定义衣橱单位。');
              }}
              className="w-full flex items-center justify-between py-3 px-4 text-stone-700 hover:bg-stone-50 active:bg-stone-100 rounded-xl transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-stone-400" />
                <span className="text-sm font-medium text-stone-800">设置</span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>

            <button
              onClick={() => {
                alert('帮助中心：支持在线匹配度计算和常见问题。');
              }}
              className="w-full flex items-center justify-between py-3 px-4 text-stone-700 hover:bg-stone-50 active:bg-stone-100 rounded-xl transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-stone-400" />
                <span className="text-sm font-medium text-stone-800">帮助与支持</span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
          </nav>
        </div>

        {/* Footer info banner */}
        <div className="px-6 py-4 border-t border-stone-100">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 text-center">Vogue AI Atelier v1.1</p>
          <p className="text-[8px] text-stone-300 text-center mt-1">Inspired by luxury high fashion tech and design</p>
        </div>
      </div>
    </div>
  );
}
