/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, RefreshCw, Shirt, Layers, Accessibility, 
  ArrowLeftRight, HelpCircle, Briefcase, Check
} from 'lucide-react';
import { WardrobeItem, Outfit } from '../types';

interface MatchViewProps {
  wardrobeItems: WardrobeItem[];
  alternativeItems: WardrobeItem[];
}

export default function MatchView({ wardrobeItems, alternativeItems }: MatchViewProps) {
  // Main recommended items inside grid state
  const [coatItem, setCoatItem] = useState<string>(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDg18Do5ndal-bpW1pkKm6MlQUJYESCdmO0e7YZ1n0H5g9YigAgCswf0vN4ldIPEV4mypL9OYMx_rZ6xoqgIsRfhGCuTxUMZUDTry6UKz7xbWzzDFsOxA-B37jEUFbfd32su-ZceOtFHs4Tj1Can-uPL_61_8dxL5bkRE7PmaG4rHROCckWbXFpjXMOAcq6-Luz00Biu5Ii6cx9Wcdh42aJLRbcRg8oP6wdhzVVlk9E9GM_cGF5M1QKC7s5vYFPMieARXnKufuv7eDJ'
  );
  const [shirtItem, setShirtItem] = useState<string>(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA-BDobsRWnlbi97Zj_5Xg4kmkiWMXZlJEcI5tye3A04Uda1brBVv4JnrlvOnRjItWjMxmV-zIdKwlmFrLDX-gOeqYIEgMHFN4DioTfquQxzAKeRJB9o9euFVoM2QkKEOcaIiC29p3AIP5DANHBktyOu27iX3hGUE-ExEmOmhAfA5BuNl8oIJ04MIB6YyUdnXUNO2q6F0vNNQ51NO23Zk0C4143D8N5g7mhppCekFkLnThGBwopU1lssPg0g_8bHRIZcdn83UqpPBxl'
  );
  const [trousersItem, setTrousersItem] = useState<string>(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCxT1bjlWEqxAAoov8KFR9CDMmBcSWnHFqYHDcRGZPrqRdE7uw8Hdg5sXENDTBaksyfRE8iHTmF2SkSoE7tbSpkpDLc2u-ZVMkElyC5k6aoWv2F5QKnCuLyx2BDtektIpRLLZ_zYSL4ba5q6eDk24EQOcXjSN-D8YyM_7ItpTdZ6_sPFVQWbrqqxMCgEq9dETrG6A8mUBgrxbNATtKzhb7G03LW9w8G8Ef3RyDNVDNSxDxTHyGpLH9ej70-DCXP2ERQ9m3fStN2EDtf'
  );

  // Statistics affected by modifications
  const [matchScore, setMatchScore] = useState(92);
  const [rewornCount, setRewornCount] = useState(5);
  const [styleRisk, setStyleRisk] = useState<'低' | '中' | '高'>('低');
  const [styleTag, setStyleTag] = useState('简约职场');

  const [activeTab, setActiveTab] = useState<'outfit' | 'baggage' | 'shopping'>('outfit');
  const [checkoutNotify, setCheckoutNotify] = useState<string | null>(null);

  // Hardcoded pool for cycle actions
  const coatsPool = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDg18Do5ndal-bpW1pkKm6MlQUJYESCdmO0e7YZ1n0H5g9YigAgCswf0vN4ldIPEV4mypL9OYMx_rZ6xoqgIsRfhGCuTxUMZUDTry6UKz7xbWzzDFsOxA-B37jEUFbfd32su-ZceOtFHs4Tj1Can-uPL_61_8dxL5bkRE7PmaG4rHROCckWbXFpjXMOAcq6-Luz00Biu5Ii6cx9Wcdh42aJLRbcRg8oP6wdhzVVlk9E9GM_cGF5M1QKC7s5vYFPMieARXnKufuv7eDJ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCdUTa7BTPoM3CltV3lklEnAfR_N_qhVQJjP1q8LGgWAeAN7969uCJbGZRBUhjURqR3JE-Bm-aKeOgjGWQqNJIFmJ1d6pt3-a_u2BQ3cnMwIvAjcK4VHvCLNLHYuos8vB9OjfRSeCDRyZAkAqoV44uWqZSjftLmlrcaGL9Y15MgVZkVDuV0WQCnyIIwzeIjLL3CKFrxvbKKolWmWqhG7kNuEnJDBib1olXJq2NE55CpBmEmhHshaiw4WoLF06mliQOiTGFKROvGXSAU',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDrEtiGKycjtE-3PUldT-JHAjhc8c391ghwGWVG8EX1OjFsXVaWouQv8040T0v36t32aafV0c0GkAHMIYjaiLqrRcduGPd-UiC5kmxaOrQoGSbI9yXq6YXm3q7HfGW-dvp1WZE7IEGFfyIbFImmvPeE4-88VVLxdOKGYYXueVwTxk4a8i4KQqZuKt9-kpTXIUcsbv7-8brnWl6PNTc8ed6IXvfwosWn21qDhJppfnmUKAGKbgseeOmj59AT8vwi8bInOyBZ7kKt5bHT'
  ];

  const shirtPool = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA-BDobsRWnlbi97Zj_5Xg4kmkiWMXZlJEcI5tye3A04Uda1brBVv4JnrlvOnRjItWjMxmV-zIdKwlmFrLDX-gOeqYIEgMHFN4DioTfquQxzAKeRJB9o9euFVoM2QkKEOcaIiC29p3AIP5DANHBktyOu27iX3hGUE-ExEmOmhAfA5BuNl8oIJ04MIB6YyUdnXUNO2q6F0vNNQ51NO23Zk0C4143D8N5g7mhppCekFkLnThGBwopU1lssPg0g_8bHRIZcdn83UqpPBxl',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB3xaPoCvAzs_02nHvNKjGlPfwEE2mzOy3BfvRw3NUepkOolOJtAc1_QJGDdpHQ2HKQ1M_0jJOJEdzPuvSWufV0zHHM4IQhuOJbMFOSieJ_RrHm2qmVvFzvCvnC2g9JOx2HhpybpQmOCXUr3s77K9iuTmq4-jR_rG5C0ZJCyCWCdUEz7O2VHVsCwRkcrwSLINIRcFwKLtI6qBB0DBaDp6B_LB7ZW9-bjEZRWKCXi1ul8C2PNOEkQhYh6lVnMIeYzXvPh-_lTwbhUF0D',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDzW0wVrNWK4Fcu_L9gn7rfV3QQSZ1E1uHbJNHeS6E78al1eCJuPGLlirdwiLc7m-Pzxkq6b2surk2iwydvfzySJMp560TZhuQQ8M_9cxdP6LWhZpIfzJdncFKW1T8hQJS0eTUfOu5XFxr-PEfxuYzrgyX1Akxb5qgRRk47DZIleED7IQW7zIjX5u1GrdJCBJXddKQtP6G4UATCblggeaEBLwKZu54EuEXMX8TDoVSOXCTpzFtAIXnMyAcUi2aitxp1Pa5K_GZwal-5'
  ];

  const trousersPool = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCxT1bjlWEqxAAoov8KFR9CDMmBcSWnHFqYHDcRGZPrqRdE7uw8Hdg5sXENDTBaksyfRE8iHTmF2SkSoE7tbSpkpDLc2u-ZVMkElyC5k6aoWv2F5QKnCuLyx2BDtektIpRLLZ_zYSL4ba5q6eDk24EQOcXjSN-D8YyM_7ItpTdZ6_sPFVQWbrqqxMCgEq9dETrG6A8mUBgrxbNATtKzhb7G03LW9w8G8Ef3RyDNVDNSxDxTHyGpLH9ej70-DCXP2ERQ9m3fStN2EDtf',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAnb9QCyoa2Efs44UFpx_cnentXXYnMb62G35bQKS7HKlzdY06OhAfq2KOvDvTg_EwlXNrEEflhuVbX63x06GbburnzFmWsqgmOkywUDdYQ6CGITuSjU16YHjZcHMq2Nr54D3fk934jnwxSYKXQnyoz_BeUbWWllj2xPUQ7G6FFfnAEe_Kn0P9dd_C7jj7QXjVOdWSJSHgqVG7zLW5hu3atMP-JhopCoCxMhTNcesRqKScvRGYnVgjAq9cSoNnrcwf2wbKk8Nn9HTIJ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB0zCrmEJYwhsvR2yEK3242lyXCXxjvfex-8umcRQJdFiN4xQqzebxxPP2Y-ps0Ag-D0RT24dHF_O0WyRKIfwtWrwy_7FYDYFMwdNZD0SbDvwHW3CkLeba-f2avMbt5d4twfirL9DoskbeJqpTyAkNZ85W4X9LbIuS33Ae3FYnkMsdRn1lH8I4LvDN5xzkySi_Lk2WiAHKp8F4W0DyZUvOwV7wMkChjCjrSnawia0IbyLlZ_NaNjc_At9lA6BMFfILpjERyM0nfXOEv'
  ];

  // Specific single slots custom swaps
  const handleSwapOuterwear = () => {
    const nextIdx = (coatsPool.indexOf(coatItem) + 1) % coatsPool.length;
    setCoatItem(coatsPool[nextIdx]);
    setMatchScore(Math.floor(Math.random() * 15) + 82);
    setRewornCount(prev => (prev + 1) % 9);
    setCheckoutNotify('已切换外套样式！AI 实时重估搭配平衡率...');
    setTimeout(() => setCheckoutNotify(null), 2500);
  };

  const handleSwapTop = () => {
    const nextIdx = (shirtPool.indexOf(shirtItem) + 1) % shirtPool.length;
    setShirtItem(shirtPool[nextIdx]);
    setMatchScore(Math.floor(Math.random() * 15) + 82);
    setRewornCount(prev => (prev + 1) % 9);
    setCheckoutNotify('已替换上装衬里！相容性算法更新完毕');
    setTimeout(() => setCheckoutNotify(null), 2500);
  };

  const handleSwapBottom = () => {
    const nextIdx = (trousersPool.indexOf(trousersItem) + 1) % trousersPool.length;
    setTrousersItem(trousersPool[nextIdx]);
    setMatchScore(Math.floor(Math.random() * 10) + 88);
    setStyleRisk(Math.random() > 0.5 ? '低' : '中');
    setCheckoutNotify('下装更换！风格风险等级重新校准');
    setTimeout(() => setCheckoutNotify(null), 2500);
  };

  const handleRefreshAll = () => {
    const nextCoat = coatsPool[Math.floor(Math.random() * coatsPool.length)];
    const nextShirt = shirtPool[Math.floor(Math.random() * shirtPool.length)];
    const nextTrouser = trousersPool[Math.floor(Math.random() * trousersPool.length)];
    
    setCoatItem(nextCoat);
    setShirtItem(nextShirt);
    setTrousersItem(nextTrouser);
    
    setMatchScore(Math.floor(Math.random() * 10) + 90);
    setRewornCount(Math.floor(Math.random() * 8) + 1);
    
    const tags = ['简约职场', '韩式松弛', '周末休闲', '前卫冷感'];
    setStyleTag(tags[Math.floor(Math.random() * tags.length)]);
    setCheckoutNotify('🎉 全套 AI 穿搭已被重置，已切换至：【' + styleTag + '】方案');
    setTimeout(() => setCheckoutNotify(null), 3000);
  };

  // Replace candidate handler when clicking swap button in bottom carousel
  const handleItemOverwrite = (item: WardrobeItem) => {
    if (item.category === 'outerwear') {
      setCoatItem(item.imageUrl);
      setMatchScore(96);
      setStyleRisk('低');
    } else if (item.category === 'top') {
      setShirtItem(item.imageUrl);
      setMatchScore(91);
      setRewornCount(prev => prev + 1);
    } else if (item.category === 'bottom') {
      setTrousersItem(item.imageUrl);
      setMatchScore(95);
      setStyleRisk('低');
    }
    setCheckoutNotify(`🎉 成功将 【${item.name}】 替换置入您当前的主推配对中！`);
    setTimeout(() => setCheckoutNotify(null), 3000);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header and Style Filter tag */}
      <section className="flex justify-between items-end">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-1">今日穿搭选择</span>
          <h2 className="text-3xl font-serif font-semibold text-stone-900 leading-tight">AI 智能推荐</h2>
        </div>
        <div className="bg-[#EFEBE9] px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-stone-200">
          <Briefcase className="w-3.5 h-3.5 text-stone-600" />
          <span className="text-[10px] font-bold text-stone-700 uppercase tracking-wider">{styleTag}</span>
        </div>
      </section>

      {/* Main recommendation canvas metrics */}
      <section className="glass-card rounded-3xl overflow-hidden p-6 shadow-sm border border-stone-200/50 bg-white/75 relative">
        {checkoutNotify && (
          <div className="absolute top-4 left-4 right-4 z-20 p-3 bg-stone-900 text-white rounded-2xl text-[11px] font-semibold text-center shadow-lg transform translate-y-0 transition-transform animate-bounce">
            {checkoutNotify}
          </div>
        )}

        {/* Top metrics dashboard */}
        <div className="flex justify-around mb-6 border-b border-stone-100 pb-5">
          <div className="text-center">
            <div className="text-3xl font-serif font-bold text-[#1A1A1A]">{matchScore}%</div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#444748] mt-1">匹配度</div>
          </div>
          <div className="text-center border-x border-stone-100 px-6">
            <div className="text-3xl font-serif font-bold text-[#1A1A1A]">{rewornCount}</div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#444748] mt-1">复穿次数</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-serif font-[#0041c9] font-bold text-[#0041c9]">{styleRisk}</div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#444748] mt-1">风格风险</div>
          </div>
        </div>

        {/* Outfit Preview Grid (Responsive, left is spanned double rows) */}
        <div className="outfit-grid mb-6 select-none">
          {/* Slot: Outerwear Coat */}
          <div className="rounded-2xl overflow-hidden bg-white aspect-[3/4] border border-stone-100/60 shadow-sm relative group">
            <img 
              src={coatItem} 
              alt="Mannequin selection outerwear" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 flex items-center justify-center transition-colors">
              <span className="bg-white/90 backdrop-blur rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-stone-800 shadow">外套款式</span>
            </div>
          </div>

          {/* Slot: Inner Shirt */}
          <div className="rounded-2xl overflow-hidden bg-white aspect-square border border-stone-100/60 shadow-sm relative group">
            <img 
              src={shirtItem} 
              alt="Mannequin selection shirts" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 flex items-center justify-center transition-colors">
              <span className="bg-white/90 backdrop-blur rounded-full px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-stone-800 shadow">内搭上装</span>
            </div>
          </div>

          {/* Slot: Trousers Leg */}
          <div className="rounded-2xl overflow-hidden bg-white aspect-square border border-stone-100/60 shadow-sm relative group">
            <img 
              src={trousersItem} 
              alt="Mannequin legs selection" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 flex items-center justify-center transition-colors">
              <span className="bg-white/90 backdrop-blur rounded-full px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-stone-800 shadow">搭配下装</span>
            </div>
          </div>
        </div>

        {/* Big Action virtual Try-On Trigger */}
        <button 
          onClick={() => {
            alert('👗 AI 虚拟试穿：\n已在后台启动高级渲染模式！试装效果极高相容。可在首页虚拟试穿面板查看 3D 对齐图像。');
          }}
          className="w-full bg-[#0041c9] hover:bg-[#0356ff] text-white text-xs font-bold uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/15 cursor-pointer active:scale-98 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI 虚拟试穿</span>
        </button>
      </section>

      {/* Action Row / Circular Buttons controllers */}
      <section className="flex justify-between items-center overflow-x-auto custom-scrollbar gap-3 pb-2 select-none">
        
        {/* controller 1 */}
        <button 
          onClick={handleRefreshAll}
          className="flex flex-col items-center min-w-[70px] group cursor-pointer active:scale-95 transition-transform"
        >
          <div className="w-12 h-12 rounded-full border border-stone-200 bg-white shadow-sm flex items-center justify-center mb-1.5 hover:bg-stone-50 group-hover:bg-neutral-900 group-hover:border-neutral-900 group-hover:text-white transition-all">
            <RefreshCw className="w-4 h-4 text-stone-600 group-hover:text-white" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#444748] block">换一套</span>
        </button>

        {/* controller 2 */}
        <button 
          onClick={handleSwapTop}
          className="flex flex-col items-center min-w-[70px] group cursor-pointer active:scale-95 transition-transform"
        >
          <div className="w-12 h-12 rounded-full border border-stone-200 bg-white shadow-sm flex items-center justify-center mb-1.5 hover:bg-stone-50 group-hover:bg-neutral-900 group-hover:border-neutral-900 group-hover:text-white transition-all">
            <Shirt className="w-4 h-4 text-stone-600 group-hover:text-white" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#444748] block">换上装</span>
        </button>

        {/* controller 3 */}
        <button 
          onClick={handleSwapBottom}
          className="flex flex-col items-center min-w-[70px] group cursor-pointer active:scale-95 transition-transform"
        >
          <div className="w-12 h-12 rounded-full border border-stone-200 bg-white shadow-sm flex items-center justify-center mb-1.5 hover:bg-stone-50 group-hover:bg-neutral-900 group-hover:border-neutral-900 group-hover:text-white transition-all">
            <Layers className="w-4 h-4 text-stone-600 group-hover:text-white" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#444748] block">换下装</span>
        </button>

        {/* controller 4 */}
        <button 
          onClick={handleSwapOuterwear}
          className="flex flex-col items-center min-w-[70px] group cursor-pointer active:scale-95 transition-transform"
        >
          <div className="w-12 h-12 rounded-full border border-stone-200 bg-white shadow-sm flex items-center justify-center mb-1.5 hover:bg-stone-50 group-hover:bg-neutral-900 group-hover:border-neutral-900 group-hover:text-white transition-all">
            <Accessibility className="w-4 h-4 text-stone-600 group-hover:text-white" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#444748] block">换外套</span>
        </button>
      </section>

      {/* Bento entries */}
      <section className="grid grid-cols-2 gap-4 select-none">
        {/* Card 1 */}
        <div 
          onClick={() => alert('买前试穿服务已开启：您可以在商场直接拍照对比相容度！')}
          className="relative rounded-2xl overflow-hidden aspect-[4/5] p-5 flex flex-col justify-end group cursor-pointer border border-stone-200/50 shadow-sm"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc21YltjnlvO_OZuxxBcL3Xh3sk3gxgbAfCO89CAmPPUGueSyeSAM-lrbAoH8HFAZrcCrZDF7VYQFlT4DS6-aH3Iimd0tJcx7W268tVejDxsXCAf6wIXjVidjl-q1waEO8rvrJfs_0qtnTKBcxl_Gf78FKQoYgpoIIA8zZ_Eqd1TOO6TWR2Ot1ZLg5HDKhH1nmkhgT362_VvEPbacZqZ4b4QQE2IbBW7Bkrliy0eUwqLGYnmLFe0MODYMhHr9bJ1Tc2vwwB7RQdbhd" 
            alt="Shopping decisions" 
            className="absolute inset-0 w-full h-full object-cover -z-10 brightness-[0.70] group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <h4 className="text-lg font-serif font-bold text-white mb-0.5">买前试穿</h4>
          <p className="text-white/80 text-[11px] leading-relaxed">购物决策辅助，降低闲置风险。</p>
        </div>

        {/* Card 2 */}
        <div 
          onClick={() => alert('旅行打包规划已激活：输入天数及气温，AI 为您精炼安排最小体积行李！')}
          className="relative rounded-2xl overflow-hidden aspect-[4/5] p-5 flex flex-col justify-end group cursor-pointer border border-stone-200/50 shadow-sm"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD40ZqZa49VW1USsfHqC4kiRMM9x7ra3jDVxrR48rm3oAXH_PUltoeX0dIvZCjXNCzhIq80LyEbkcBqmv19k8SsY2dlO7_7jpUWf2ZE7NXrcmHrA62QSCyZ3s-BvxQ2PIWeXELKz7gLzsJsioQmQ4ulrfTaty0pG0qvCWHTm7O7RAUpMm6O-GCE6EEzo8Obq7p36VR2wNhdWquDtujrzzlp5NbOuVnrXHqlRtntdURkuUaQpPeXATNjnwYhwfLF__r7K1-tEiJZ8q24" 
            alt="Open travel bag" 
            className="absolute inset-0 w-full h-full object-cover -z-10 brightness-[0.70] group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <h4 className="text-lg font-serif font-bold text-white mb-0.5">旅行打包</h4>
          <p className="text-white/80 text-[11px] leading-relaxed">高效规划行李，每一件都用得上。</p>
        </div>
      </section>

      {/* Alternative Replaceable single items list */}
      <section className="space-y-4">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-serif font-bold text-stone-900">可替换单品</h3>
          <span className="text-[10px] font-bold text-[#0041c9] uppercase tracking-widest cursor-pointer underline">查看全部</span>
        </div>

        <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-3">
          {alternativeItems.map((item) => (
            <div key={item.id} className="min-w-[130px] w-32 flex flex-col gap-2 rounded-2xl">
              <div className="aspect-[3/4] rounded-2xl bg-white overflow-hidden border border-stone-200/60 relative group shadow-sm">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                
                {/* CIRCULAR SWAP BUTTON */}
                <button 
                  onClick={() => handleItemOverwrite(item)}
                  className="absolute top-2.5 right-2.5 bg-white/95 text-stone-900 hover:bg-black hover:text-white rounded-full p-1.5 border border-stone-200 shadow hover:scale-110 active:scale-95 transition-all cursor-pointer pointer-events-auto"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="px-1 text-left">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#444748] truncate">{item.name}</h4>
                <div className="bg-stone-100 text-[8px] font-bold px-2 py-0.5 inline-block text-stone-600 rounded mt-1 uppercase tracking-wider">
                  {item.material}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
