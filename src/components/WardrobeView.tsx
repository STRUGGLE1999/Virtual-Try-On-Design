/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Sparkles, Check, Plus, SlidersHorizontal } from 'lucide-react';
import { WardrobeItem } from '../types';

interface WardrobeViewProps {
  wardrobeItems: WardrobeItem[];
  pendingQueue: WardrobeItem[];
  onIdentifyAndAdd: (itemId: string) => void;
}

export default function WardrobeView({ 
  wardrobeItems, 
  pendingQueue, 
  onIdentifyAndAdd 
}: WardrobeViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'top' | 'bottom' | 'outerwear'>('all');
  const [selectedQueueId, setSelectedQueueId] = useState<string>('pending_white_tshirt');
  const [isClassifying, setIsClassifying] = useState(false);
  const [scannedNotify, setScannedNotify] = useState<string | null>(null);

  // Get active selected queue item
  const selectedQueueItem = pendingQueue.find(item => item.id === selectedQueueId) || pendingQueue[0];

  // AI Classification logic simulation
  const handleAIScan = () => {
    if (!selectedQueueItem) return;
    setIsClassifying(true);
    setTimeout(() => {
      setIsClassifying(false);
      setScannedNotify(`AI 已重新精确扫描 【${selectedQueueItem.name}】，匹配度达到 99%！`);
      setTimeout(() => setScannedNotify(null), 3000);
    }, 1200);
  };

  const handleDeposit = () => {
    if (!selectedQueueItem) return;
    onIdentifyAndAdd(selectedQueueItem.id);
    
    // Select next item in queue if available
    const remaining = pendingQueue.filter(item => item.id !== selectedQueueItem.id);
    if (remaining.length > 0) {
      setSelectedQueueId(remaining[0].id);
    } else {
      setSelectedQueueId('');
    }

    const depositedName = selectedQueueItem.name;
    setScannedNotify(`🎉 【${depositedName}】 成功入库并编入您的奢华数字资产中！`);
    setTimeout(() => setScannedNotify(null), 4000);
  };

  // Filtering existing inventory items
  const filteredItems = wardrobeItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedFilter === 'all' || item.category === selectedFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-10 select-none">
      {/* Top Search bar block */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-widest font-sans">
            {wardrobeItems.length} 件入库单品 · {pendingQueue.length} 件待识别
          </span>
        </div>
        <div className="relative flex items-center bg-stone-100/90 rounded-2xl px-4 py-3.5 border border-stone-200/50 group focus-within:ring-2 focus-within:ring-black/5 focus-within:bg-white transition-all">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input 
            type="text" 
            placeholder="搜索衣物名称，如：白衬衫" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:outline-none w-full text-sm font-medium ml-2.5 outline-none text-stone-800"
          />
        </div>
      </section>

      {/* AI Identification Queue */}
      {pendingQueue.length > 0 ? (
        <section className="animate-in fade-in duration-500">
          <div className="flex items-end justify-between mb-4">
            <h3 className="text-lg font-serif font-bold text-stone-900">AI 识别队列</h3>
            <span className="text-xs font-bold text-stone-400 tracking-wider">
              {pendingQueue.length} 件待处理
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2">
            {pendingQueue.map((item) => {
              const isSelected = item.id === selectedQueueId;
              return (
                <div 
                  key={item.id}
                  onClick={() => setSelectedQueueId(item.id)}
                  className={`relative shrink-0 w-28 aspect-[3/4] rounded-2xl overflow-hidden border border-stone-200 cursor-pointer transition-all ${
                    isSelected ? 'ring-2 ring-[#0041c9] ring-offset-2 scale-95' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {isSelected ? (
                    <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center gap-1.5 p-2 text-center text-white">
                      <Check className="w-5 h-5" />
                      <span className="text-[10px] font-bold tracking-wider uppercase bg-white text-stone-900 px-2 py-0.5 rounded-full shadow">确认中</span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Upload New Queue Trigger Box */}
            <div 
              onClick={() => {
                const nameInput = prompt("输入上传衣物名称:", "真丝长款吊带裙");
                if (nameInput) {
                  alert("自定义添加单品照片成功！AI 已将其压入识别队列。");
                }
              }}
              className="shrink-0 w-28 aspect-[3/4] rounded-2xl border-2 border-dashed border-stone-300 flex flex-col items-center justify-center text-stone-400 hover:bg-stone-50 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-6 h-6 mb-1 text-stone-400" />
              <span className="text-[10px] font-bold tracking-widest uppercase">添加单品</span>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-stone-50 p-6 rounded-2xl text-center text-stone-400 border border-dashed border-stone-200">
          <Sparkles className="w-8 h-8 text-stone-300 mx-auto mb-2" />
          <p className="text-xs font-bold uppercase tracking-wider">AI 待识别队列已放空</p>
          <p className="text-[10px] text-stone-400 mt-0.5">所有上传单品都已妥善整理入库</p>
        </section>
      )}

      {/* AI Identify Panel & Results */}
      {selectedQueueItem && (
        <section className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-3">
            {scannedNotify && (
              <div className="p-3.5 bg-green-50 border border-green-100 text-green-700 rounded-2xl text-xs font-medium animate-bounce">
                {scannedNotify}
              </div>
            )}

            <button 
              onClick={handleAIScan}
              disabled={isClassifying}
              className={`w-full py-4 bg-[#0041c9] hover:bg-[#0356ff] text-white rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/10 cursor-pointer active:scale-95 ${
                isClassifying ? 'opacity-70 cursor-not-allowed animate-pulse' : ''
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isClassifying ? 'AI 模型正在提取织物折折痕特征...' : 'AI 极致重新识别'}</span>
            </button>

            {/* Frost Glass classification result Card */}
            <div className="glass-card rounded-3xl p-6 border border-stone-200/50 bg-white/70">
              <div className="flex justify-between items-start mb-5">
                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-stone-400">AI 识别结果</span>
                  <h4 className="text-xl font-serif font-bold text-stone-900">{selectedQueueItem.name}</h4>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  98% 匹配
                </span>
              </div>

              {/* Attributes Form Sheet Grid */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-6 border-b border-stone-100 pb-5 text-xs">
                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#444748]">品类</span>
                  <p className="font-bold text-stone-800">{selectedQueueItem.categoryLabel} / {selectedQueueItem.name.slice(-2)}</p>
                </div>
                
                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#444748]">颜色</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div 
                      className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-sm" 
                      style={{ backgroundColor: selectedQueueItem.colorHex }}
                    />
                    <p className="font-bold text-stone-800">{selectedQueueItem.colorName}</p>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#444748]">材质</span>
                  <p className="font-bold text-stone-800">{selectedQueueItem.material}</p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#444748]">季节匹配</span>
                  <p className="font-bold text-stone-800">{selectedQueueItem.season}</p>
                </div>

                <div className="col-span-2 space-y-1">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#444748] block">服装标签</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedQueueItem.tags.map((tg, idx) => (
                      <span key={idx} className="bg-stone-50 border border-stone-100 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-stone-600 block">
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="col-span-2 space-y-1 pt-4 border-t border-stone-100">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#0041c9] block">AI 推荐理由</span>
                  <p className="text-xs text-stone-600 leading-relaxed italic font-medium font-serif bg-stone-50/50 p-3 rounded-xl border border-stone-100">
                    “这款【{selectedQueueItem.brand}】的特质面料编织精湛，是不可多得的胶囊基础。配合林夏现有的深色直筒系列西装，能大幅拓宽日常休闲的层次宽度。”
                  </p>
                </div>
              </div>

              {/* Confirm deposit button */}
              <button 
                onClick={handleDeposit}
                className="w-full py-4 bg-stone-900 border border-stone-800 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-widest rounded-2xl cursor-pointer active:scale-95 transition-all"
              >
                确认单品安全入库
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Tabs list filtering for existing inventory */}
      <section className="space-y-4">
        <div className="flex gap-2 overflow-x-auto custom-scrollbar select-none">
          <button 
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shrink-0 transition-colors cursor-pointer ${
              selectedFilter === 'all' ? 'bg-black text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            全部
          </button>
          <button 
            onClick={() => setSelectedFilter('top')}
            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shrink-0 transition-colors cursor-pointer ${
              selectedFilter === 'top' ? 'bg-black text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            上装
          </button>
          <button 
            onClick={() => setSelectedFilter('bottom')}
            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shrink-0 transition-colors cursor-pointer ${
              selectedFilter === 'bottom' ? 'bg-black text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            下装
          </button>
          <button 
            onClick={() => setSelectedFilter('outerwear')}
            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shrink-0 transition-colors cursor-pointer ${
              selectedFilter === 'outerwear' ? 'bg-black text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            外套
          </button>
        </div>

        {/* Existing Grid Section */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-serif font-bold text-stone-900">已入库单品</h3>
          <button className="text-stone-400 hover:text-stone-900 cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className="group cursor-pointer select-none"
                onClick={() => {
                  alert(`详情信息:\n[${item.brand}] ${item.name}\n颜色: ${item.colorName}\n复穿频次: ${item.isWornCount}次\n材质: ${item.material}`);
                }}
              >
                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/50 mb-2 relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 flex gap-1">
                    <span className="bg-white/90 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-bold text-stone-800 leading-none">
                      {item.material.split(' ').pop()}
                    </span>
                  </div>
                </div>
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#444748] px-1 truncate">{item.brand}</h4>
                <p className="text-xs font-semibold text-stone-800 px-1 truncate block">{item.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-stone-400 border border-dashed border-stone-200 rounded-3xl bg-stone-50/50">
            <p className="text-xs font-bold uppercase tracking-wider">未找到筛选的单品</p>
            <p className="text-[10px] text-stone-300 mt-1">请输入其他搜索字符或调整类别筛选</p>
          </div>
        )}
      </section>
    </div>
  );
}
