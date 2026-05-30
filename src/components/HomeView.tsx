/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  RotateCw, Heart, CalendarPlus, Upload, ShieldCheck, 
  FileSearch, Sparkles, ShoppingBag, Cloud, ChevronRight, Check
} from 'lucide-react';
import { WardrobeItem, Outfit, CalendarLog } from '../types';

interface HomeViewProps {
  onOpenDrawer: () => void;
  activeOutfit: Outfit;
  onRefreshOutfit: () => void;
  onAddCalendarLog: (outfit: Outfit) => void;
  onToggleFavoriteOutfit: (outfit: Outfit) => void;
  isOutfitFavorited: boolean;
  onNavigateToTab: (tab: 'home' | 'wardrobe' | 'match' | 'calendar' | 'mine') => void;
  wardrobeItems: WardrobeItem[];
  recentFavorites: WardrobeItem[];
}

export default function HomeView({ 
  onOpenDrawer, 
  activeOutfit, 
  onRefreshOutfit, 
  onAddCalendarLog, 
  onToggleFavoriteOutfit,
  isOutfitFavorited,
  onNavigateToTab,
  wardrobeItems,
  recentFavorites
}: HomeViewProps) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showTryOnModal, setShowTryOnModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [tryOnProgress, setTryOnProgress] = useState(0);
  const [tryOnPhase, setTryOnPhase] = useState('');
  const [hasLoggedToday, setHasLoggedToday] = useState(false);
  
  // Simulated file upload form states
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Triggering virtual fitting simulation with beautiful staggered progress
  const startTryOnSim = () => {
    setTryOnProgress(0);
    setTryOnPhase('正在进行 3D 体型对齐...');
    
    const interval = setInterval(() => {
      setTryOnProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTryOnPhase('试穿配对成功！');
          return 100;
        }
        const next = prev + 10;
        if (next === 30) setTryOnPhase('AI 提取面料物理渲染特征...');
        if (next === 60) setTryOnPhase('融合林夏 (Lin Xia) 的沙漏型轮廓度量...');
        if (next === 85) setTryOnPhase('计算光源折射阴影效果...');
        return next;
      });
    }, 200);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedFile(reader.result as string);
      };
      reader.readAsDataURL(e.dataTransfer.files[0]);
    }
  };

  const triggerLogToday = () => {
    onAddCalendarLog(activeOutfit);
    setHasLoggedToday(true);
    setTimeout(() => setHasLoggedToday(false), 2000);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Top Welcome Title Grid */}
      <section className="flex justify-between items-end">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-1">今日穿搭选择</span>
          <h2 className="text-3xl font-serif font-semibold text-stone-900 leading-tight">AI 智能推荐</h2>
        </div>
        <div className="bg-stone-100/80 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-stone-200/50">
          <Cloud className="w-4 h-4 text-stone-500" />
          <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider">简约职场</span>
        </div>
      </section>

      {/* Hero Section: Main Today's Outfit Model */}
      <section className="animate-in fade-in duration-700">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">今日推荐</span>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">智能搭配</h3>
          </div>
          <button 
            onClick={onRefreshOutfit}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-full hover:bg-stone-50 active:scale-95 transition-all text-xs font-bold text-stone-700 cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5 text-stone-500" />
            <span>换一套</span>
          </button>
        </div>

        {/* Immersive mannequin showcase frame */}
        <div className="relative w-full aspect-[3/4] md:aspect-[16/9] rounded-3xl overflow-hidden group border border-stone-200/60 shadow-md bg-stone-50">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBX9UKgvmXBwrQxM3vZV4Mb_hKNMQ63udGBlgO0utn2FbLVG2OKKbHT-VZi0Ba5VEjarc8ywILUI-FzrFfkP1TZareRSQaECfa9jvOdmPM4FLp5MfTZ8ivVW5LVMZEA-w420HBWs9q-TCLXGhNezkZ605XAcFWUtRmns74UbaFcUVoIql-J-61Pg2aGpxwijSuOJlpkzzQsRJ7KLoXthPkZlo4GMtoEURJi2dOkDwnCHgO_s58w2y-Kua-hjkZdZYcUTV8JknKnIPmy"
            alt="Recommended Outfit Mannequin Setup" 
            className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Back light glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-5 md:p-8" />
          
          {/* Action buttons embedded in picture */}
          <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center z-10">
            <div className="flex gap-2.5">
              <button 
                onClick={() => onToggleFavoriteOutfit(activeOutfit)}
                className={`px-5 py-2.5 rounded-full flex items-center gap-2 text-xs font-bold transition-all shadow cursor-pointer ${
                  isOutfitFavorited 
                    ? 'bg-rose-500 text-white hover:bg-rose-600' 
                    : 'bg-white text-stone-900 hover:bg-stone-50'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isOutfitFavorited ? 'fill-current' : ''}`} />
                <span>{isOutfitFavorited ? '已收藏' : '收藏'}</span>
              </button>

              <button 
                onClick={triggerLogToday}
                className="bg-[#0041c9] hover:bg-[#0356ff] text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-xs font-bold transition-all shadow cursor-pointer active:scale-95"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span>{hasLoggedToday ? '成功录入!' : '记录今日'}</span>
              </button>
            </div>
            
            <div className="hidden md:flex flex-col items-end text-white text-right">
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-200/80">上海气温</span>
              <span className="text-sm font-bold mt-0.5">22°C 多云天气匹配</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Entry Box Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Entry: Upload Photo */}
        <div 
          onClick={() => setShowUploadModal(true)}
          className="flex flex-col items-center justify-center p-6 rounded-2xl bg-stone-50 hover:bg-black hover:text-white transition-all border border-stone-200/50 cursor-pointer group shadow-sm text-center"
        >
          <div className="w-12 h-12 rounded-full border border-stone-200 group-hover:border-stone-800 flex items-center justify-center mb-3 transition-colors bg-white group-hover:bg-stone-900">
            <Upload className="w-5 h-5 text-stone-600 group-hover:text-white" />
          </div>
          <span className="text-xs font-bold tracking-wider uppercase group-hover:text-white text-stone-700">上传单品</span>
          <p className="text-[10px] text-stone-400/80 mt-1">添加新衣服到队列</p>
        </div>

        {/* Entry: Match AI Identify */}
        <div 
          onClick={() => onNavigateToTab('wardrobe')}
          className="flex flex-col items-center justify-center p-6 rounded-2xl bg-stone-50 hover:bg-black hover:text-white transition-all border border-stone-200/50 cursor-pointer group shadow-sm text-center"
        >
          <div className="w-12 h-12 rounded-full border border-stone-200 group-hover:border-stone-800 flex items-center justify-center mb-3 transition-colors bg-white group-hover:bg-stone-900">
            <FileSearch className="w-5 h-5 text-stone-600 group-hover:text-white" />
          </div>
          <span className="text-xs font-bold tracking-wider uppercase group-hover:text-white text-stone-700">单品识别</span>
          <p className="text-[10px] text-stone-400/80 mt-1">AI 识别材质与推荐</p>
        </div>

        {/* Entry: Try On Model fit */}
        <div 
          onClick={() => {
            setShowTryOnModal(true);
            startTryOnSim();
          }}
          className="flex flex-col items-center justify-center p-6 rounded-2xl bg-blue-50/50 hover:bg-[#0041c9] hover:text-white transition-all border border-blue-100 cursor-pointer group shadow-sm text-center"
        >
          <div className="w-12 h-12 rounded-full border border-blue-200 group-hover:border-blue-700 flex items-center justify-center mb-3 transition-colors bg-white group-hover:bg-[#0356ff]">
            <Sparkles className="w-5 h-5 text-[#0041c9] group-hover:text-white" />
          </div>
          <span className="text-xs font-bold tracking-wider uppercase text-[#0041c9] group-hover:text-white">虚拟试穿</span>
          <p className="text-[10px] text-[#0041c9]/70 group-hover:text-blue-100 mt-1">3D 模特智能试穿</p>
        </div>

        {/* Entry: Shop Helper */}
        <div 
          onClick={() => setShowShopModal(true)}
          className="flex flex-col items-center justify-center p-6 rounded-2xl bg-stone-50 hover:bg-black hover:text-white transition-all border border-stone-200/50 cursor-pointer group shadow-sm text-center"
        >
          <div className="w-12 h-12 rounded-full border border-stone-200 group-hover:border-stone-800 flex items-center justify-center mb-3 transition-colors bg-white group-hover:bg-stone-900">
            <ShoppingBag className="w-5 h-5 text-stone-600 group-hover:text-white" />
          </div>
          <span className="text-xs font-bold tracking-wider uppercase group-hover:text-white text-stone-700">买前试穿</span>
          <p className="text-[10px] text-stone-400/80 mt-1">购物辅助降低闲置</p>
        </div>
      </section>

      {/* Wardrobe Status Stats */}
      <section className="space-y-4">
        <h3 className="text-xl font-serif font-semibold text-stone-900">衣橱状态</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Stat 1: Saturation and Capacity */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/60 flex items-center gap-6 shadow-sm">
            <div className="flex-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">衣橱饱和度</span>
              <div className="text-3xl font-serif font-bold text-stone-900 my-1">84%</div>
              <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-900 w-[84%] rounded-full" />
              </div>
            </div>
            <div className="text-right border-l border-stone-100 pl-6 shrink-0">
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">总件数</span>
              <div className="text-lg font-bold text-stone-900 mt-1">142 件</div>
            </div>
          </div>

          {/* Stat 2: Unworn rate */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm">
            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">未穿率</span>
            <div className="flex items-end justify-between mt-1">
              <div className="flex items-center gap-1.5">
                <span className="text-3xl font-serif font-bold text-[#0041c9]">12%</span>
                <span className="text-[10px] font-bold text-[#0041c9] bg-blue-50/80 px-2 py-0.5 rounded-full uppercase tracking-wider block">▼ 较上月</span>
              </div>
              
              {/* Minimal bar chart illustration */}
              <div className="flex gap-1 h-9 items-end select-none">
                <div className="w-2 bg-stone-200 h-10/12 rounded-t-sm" />
                <div className="w-2 bg-stone-200 h-6/12 rounded-t-sm" />
                <div className="w-2 bg-stone-200 h-8/12 rounded-t-sm" />
                <div className="w-2 bg-[#0041c9] h-2/12 rounded-t-sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Favorites List */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-serif font-semibold text-stone-900">近期收藏</h3>
          <button 
            onClick={() => onNavigateToTab('mine')}
            className="text-[10px] font-bold text-stone-500 uppercase tracking-widest underline hover:text-stone-900 cursor-pointer"
          >
            查看全部
          </button>
        </div>

        {/* Diagonal bento scroll */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-2">
          {recentFavorites.slice(0, 4).map((fav) => (
            <div 
              key={fav.id}
              className="group cursor-pointer select-none"
              onClick={() => {
                alert(`查看详情: [${fav.brand}] ${fav.name}\n材质: ${fav.material}\n价格参考: 奢华单品`);
              }}
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-2 bg-stone-100 border border-stone-200/50 relative">
                <img 
                  src={fav.imageUrl} 
                  alt={fav.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[9px] uppercase font-bold tracking-widest text-stone-400 block px-1 truncate">{fav.brand}</span>
              <span className="text-xs font-semibold text-stone-800 px-1 truncate block">{fav.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL 1: Uploading New Clothes */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowUploadModal(false)} />
          <div className="relative bg-white w-full max-w-md p-6 rounded-3xl border border-stone-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-serif font-bold text-stone-900 mb-4">上传衣服入库</h3>
            
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all ${
                dragActive ? 'border-[#0041c9] bg-blue-50/50' : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <Upload className="w-10 h-10 text-stone-400 mx-auto mb-3" />
              <p className="text-sm text-stone-800 font-medium">拖放图片文件至此处，或</p>
              
              <label className="mt-2.5 inline-block text-xs font-bold text-white bg-black hover:bg-stone-800 cursor-pointer px-4 py-2 rounded-full transition-all">
                点击选择文件
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const reader = new FileReader();
                      reader.onload = () => setUploadedFile(reader.result as string);
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
              </label>

              {uploadedFile && (
                <div className="mt-4 p-2 bg-stone-50 border border-stone-100 rounded-2xl relative">
                  <span className="text-[10px] text-green-600 font-bold block mb-2">✓ 文件已成功读取</span>
                  <div className="w-20 h-24 mx-auto rounded-lg overflow-hidden border border-stone-200 bg-white">
                    <img src={uploadedFile} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => {
                  setUploadedFile(null);
                  setShowUploadModal(false);
                }}
                className="flex-1 py-3 border border-stone-200 hover:bg-stone-50 text-xs font-bold text-stone-700 rounded-full cursor-pointer"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  if (!uploadedFile) {
                    alert('请先选择或拖拽或拍摄衣服图片！');
                    return;
                  }
                  alert('衣服照片成功添加到 AI 待识别队列！请前往【衣橱】页面确认入库。');
                  setUploadedFile(null);
                  setShowUploadModal(false);
                  onNavigateToTab('wardrobe');
                }}
                className="flex-1 py-3 bg-black hover:bg-stone-800 text-xs font-bold text-white rounded-full cursor-pointer"
              >
                送入 AI 识别队列
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Try On Simulator */}
      {showTryOnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowTryOnModal(false)} />
          <div className="relative bg-white w-full max-w-sm p-6 rounded-3xl border border-stone-100 shadow-2xl overflow-hidden flex flex-col items-center">
            <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">AI 虚拟试穿</h3>
            <p className="text-xs text-stone-500 mb-6 text-center">融合体型肖像与虚拟裁剪折射</p>

            {tryOnProgress < 100 ? (
              <div className="w-full py-8 text-center space-y-4">
                {/* Immersive Loader circular spinner */}
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 border-4 border-stone-100 rounded-full" />
                  <div 
                    className="absolute inset-0 border-4 border-t-pink-500 border-r-indigo-500 rounded-full animate-spin"
                    style={{ animationDuration: '0.8s' }}
                  />
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-bold text-stone-800">{tryOnProgress}%</p>
                  <p className="text-xs text-stone-500 italic font-medium px-4">{tryOnPhase}</p>
                </div>

                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden max-w-[200px] mx-auto">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full transition-all duration-200"
                    style={{ width: `${tryOnProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full text-center space-y-4 animate-in zoom-in-95 duration-300">
                {/* Render fitted model illustration using mockup photo context! */}
                <div className="w-56 h-72 rounded-2xl overflow-hidden border border-stone-200/50 mx-auto shadow-md">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBX9UKgvmXBwrQxM3vZV4Mb_hKNMQ63udGBlgO0utn2FbLVG2OKKbHT-VZi0Ba5VEjarc8ywILUI-FzrFfkP1TZareRSQaECfa9jvOdmPM4FLp5MfTZ8ivVW5LVMZEA-w420HBWs9q-TCLXGhNezkZ605XAcFWUtRmns74UbaFcUVoIql-J-61Pg2aGpxwijSuOJlpkzzQsRJ7KLoXthPkZlo4GMtoEURJi2dOkDwnCHgO_s58w2y-Kua-hjkZdZYcUTV8JknKnIPmy"
                    alt="Try on success model preview" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-3 bg-green-50 rounded-2xl border border-green-100/50 text-left space-y-1">
                  <div className="flex items-center gap-1.5 text-green-700 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>试穿诊断意见</span>
                  </div>
                  <p className="text-[10px] text-green-700 leading-relaxed">
                    米白毛呢风衣与木炭西裤轮廓完美契合。您的沙漏型体态在略宽大立领大衣修饰下比例更为鲜明。
                  </p>
                </div>

                <div className="flex gap-2 pt-2 w-full">
                  <button 
                    onClick={startTryOnSim}
                    className="flex-1 py-3 text-xs bg-stone-100 hover:bg-stone-50 border border-stone-200 rounded-full font-bold cursor-pointer transition-all active:scale-95 text-stone-700"
                  >
                    重新运算
                  </button>
                  <button 
                    onClick={() => setShowTryOnModal(false)}
                    className="flex-1 py-3 text-xs bg-black text-white hover:bg-stone-800 rounded-full font-bold cursor-pointer transition-all active:scale-95"
                  >
                    确认选用
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: Shop Helper */}
      {showShopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowShopModal(false)} />
          <div className="relative bg-white w-full max-w-md p-6 rounded-3xl border border-stone-100 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">买前决策辅助</h3>
            <p className="text-xs text-stone-500 mb-6">上传商场中试穿衣服，AI 帮您判断其是否契合您已有衣橱风格，降低盲目网购闲置概率。</p>
            
            <div className="space-y-4">
              <div className="bg-stone-50 p-4 rounded-2xl space-y-2">
                <p className="text-xs font-bold text-stone-700">演示：对比您的林夏 (Lin Xia) 个人特质：</p>
                <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
                  <div className="p-2.5 bg-white border border-stone-200 rounded-xl">
                    <span className="text-[9px] text-stone-400 font-bold block">身高比例</span>
                    <span className="font-bold text-stone-800">168cm</span>
                  </div>
                  <div className="p-2.5 bg-white border border-stone-200 rounded-xl">
                    <span className="text-[9px] text-stone-400 font-bold block">推荐风格</span>
                    <span className="font-bold text-stone-800">简约 / 职场</span>
                  </div>
                  <div className="p-2.5 bg-white border border-stone-200 rounded-xl">
                    <span className="text-[9px] text-stone-400 font-bold block">衣橱相容度</span>
                    <span className="font-bold text-emerald-600 font-serif text-sm">高</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-stone-200/80 rounded-2xl flex items-center gap-4 bg-white hover:border-stone-800 transition-colors cursor-pointer">
                <div className="w-12 h-16 rounded overflow-hidden bg-stone-100">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSzDLae7uPxJspwTHozhlL3vbtickM0T7zHZ4JIoWwye0p6YXyDmPrWGHHkjEkAVdUSq7AoIfhejLtUU89Dn8yYH0VTeNe_bUTy24fYur-kB6aqB-18Ivl61oJbPP_C6KQ9TNZ0w0sQeHBiOavBGAED-CLRrIsSKGSofkA6qT6YweyQNhj7hKjcFpuiCScBT6horZ-mUu12ZwUiYJ9VCsVFOFDlwAAc6m9A51zS4iz1ldKuzQsio-0n0iZqTvbr09qY9cxYg-nryaH" alt="Test" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <span className="text-xs font-bold text-stone-800 block">Doubt Items: 米色羊绒开衫</span>
                  <span className="text-[10px] text-stone-400 font-medium">诊断: 匹配度 92% (非常安全! 完美解决外套不足缺口)</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowShopModal(false)}
              className="w-full py-3.5 bg-black hover:bg-stone-800 text-xs text-white rounded-full font-bold cursor-pointer transition-all mt-6"
            >
              关闭诊断
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
