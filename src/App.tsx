/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Menu, Sparkles, Shirt, Calendar, User, Home, ArrowLeftRight
} from 'lucide-react';

import { 
  initialWardrobeItems, 
  initialAlternativeItems, 
  pendingIdentificationQueue, 
  userProfileDetails, 
  defaultCalendarLogs 
} from './data';
import { WardrobeItem, Outfit, CalendarLog } from './types';

// Importing Tab Components
import HomeView from './components/HomeView';
import WardrobeView from './components/WardrobeView';
import MatchView from './components/MatchView';
import CalendarView from './components/CalendarView';
import MineView from './components/MineView';
import NavDrawer from './components/NavDrawer';

export default function App() {
  // Tab Management State
  const [activeTab, setActiveTab] = useState<'home' | 'wardrobe' | 'match' | 'calendar' | 'mine'>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // WeChat Integration Vibe simulating states
  const [showWeChatActionSheet, setShowWeChatActionSheet] = useState(false);
  const [weChatToast, setWeChatToast] = useState<string | null>(null);

  // Live status bar clock simulation
  const [statusBarTime, setStatusBarTime] = useState(() => {
    const d = new Date();
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${mins}`;
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      const hours = String(d.getHours()).padStart(2, '0');
      const mins = String(d.getMinutes()).padStart(2, '0');
      setStatusBarTime(`${hours}:${mins}`);
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  const triggerWeChatToast = (msg: string) => {
    setWeChatToast(msg);
    setTimeout(() => {
      setWeChatToast(null);
    }, 2500);
  };

  // Core Databases in React States for live interactions
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>(initialWardrobeItems);
  const [pendingQueue, setPendingQueue] = useState<WardrobeItem[]>(pendingIdentificationQueue);
  const [calendarLogs, setCalendarLogs] = useState<CalendarLog[]>(defaultCalendarLogs);
  const [userProfile, setUserProfile] = useState(userProfileDetails);
  
  // Outstanding Outfit recommend state simulation
  const [alternateOutfitIndex, setAlternateOutfitIndex] = useState(0);

  // List of pre-configured Simulated outfits for swapping
  const simulatedOutfits: Outfit[] = [
    {
      id: 'outfit_1',
      name: '极简双面大衣西裤穿搭',
      matchScore: 92,
      wearCount: 5,
      styleRisk: 'low',
      styleRiskLabel: '低',
      categoryTag: '简约职场',
      items: [wardrobeItems[6], wardrobeItems[0], wardrobeItems[7]] // Cream coat + white shirt + Charcoal trousers
    },
    {
      id: 'outfit_2',
      name: '冷灰色慵懒松弛搭配',
      matchScore: 89,
      wearCount: 8,
      styleRisk: 'low',
      styleRiskLabel: '低',
      categoryTag: '周末休闲',
      items: [wardrobeItems[3], wardrobeItems[1]] // Sweater + denim jeans
    },
    {
      id: 'outfit_3',
      name: '先锋都市呢风大衣配丹宁',
      matchScore: 96,
      wearCount: 3,
      styleRisk: 'medium',
      styleRiskLabel: '中',
      categoryTag: '前卫冷感',
      items: [wardrobeItems[4], wardrobeItems[0], wardrobeItems[1]] // Tailored overcoat + White shirt + denim jeans
    }
  ];

  const activeOutfit = simulatedOutfits[alternateOutfitIndex];

  // ACTION 1: Cycle simulated outfits on today recommend
  const handleRefreshTodayOutfit = () => {
    setActiveTab('match'); // Focus on match recommendation page
    setAlternateOutfitIndex((prev) => (prev + 1) % simulatedOutfits.length);
  };

  // ACTION 2: Move clothing item from AI queue list directly into closet database! (Deposit)
  const handleIdentifyAndAdd = (itemId: string) => {
    const matchedItem = pendingQueue.find(item => item.id === itemId);
    if (!matchedItem) return;

    // Remove from scanner queue
    setPendingQueue(pendingQueue.filter(item => item.id !== itemId));

    // Prepare deposited instance
    const deposited: WardrobeItem = {
      ...matchedItem,
      id: `item_dep_${Date.now()}`,
      isWornCount: 1,
      isRecentFavorite: true,
      dateAdded: new Date().toISOString().slice(0, 10)
    };

    // Push into wardrobe items list
    setWardrobeItems([deposited, ...wardrobeItems]);
    
    // Update profile diagnostic numbers!
    setUserProfile({
      ...userProfile,
      diagnostic: {
        ...userProfile.diagnostic,
        overallScore: Math.min(userProfile.diagnostic.overallScore + 2, 98),
        常穿率: Math.min(userProfile.diagnostic.常穿率 + 1, 95)
      }
    });
  };

  // ACTION 3: Append virtual recommended outfit into calendar log list for May 13!
  const handleAddCalendarLog = (outfit: Outfit) => {
    const exists = calendarLogs.find(log => log.date === '2026-05-13');
    if (exists) {
      alert('📝 今日已成功保存穿搭模型日志。系统将用最新方案覆盖原记录！');
      setCalendarLogs(
        calendarLogs.map(log => 
          log.date === '2026-05-13'
            ? { ...log, items: outfit.items, outfitName: outfit.name }
            : log
        )
      );
    } else {
      const newLog: CalendarLog = {
        date: '2026-05-13',
        rating: 5,
        repeatAlert: true,
        outfitName: outfit.name,
        items: outfit.items
      };
      setCalendarLogs([...calendarLogs, newLog]);
    }
    alert('🎉 【记录成功】已记录在今日 5月13日 穿搭行程表中。可在大衣与风衣穿搭日历页查阅！');
  };

  // ACTION 4: Toggle recent favorite flag inside Wardrobe DB lists
  const handleToggleFavoriteOutfit = (outfit: Outfit) => {
    // Collect a standard list item to toggling
    const companion = outfit.items[0];
    if (!companion) return;

    const updated = wardrobeItems.map((item) => {
      if (item.name === companion.name) {
        return { ...item, isRecentFavorite: !item.isRecentFavorite };
      }
      return item;
    });
    setWardrobeItems(updated);
    alert(`⭐ 【已调整】 成功为您${companion.isRecentFavorite ? '取消' : '追加'}当前搭配单品 "${companion.name}" 在您的星标专属收藏池！`);
  };

  // ACTION 5: Update rating log stars
  const handleUpdateLogRating = (date: string, rating: number) => {
    setCalendarLogs(
      calendarLogs.map(log => 
        log.date === date ? { ...log, rating } : log
      )
    );
  };

  // ACTION 6: Update alerts on calendar logs
  const handleUpdateLogAlert = (date: string, repeatAlert: boolean) => {
    setCalendarLogs(
      calendarLogs.map(log => 
        log.date === date ? { ...log, repeatAlert } : log
      )
    );
  };

  // ACTION 7: Apping custom clothing item to Calendar Day Log manually
  const handleAddCustomItemToLog = (date: string, itemName: string) => {
    const newItem: WardrobeItem = {
      id: `custom_log_item_${Date.now()}`,
      name: itemName,
      brand: 'USER ATELIER',
      category: 'accessory',
      categoryLabel: '配件',
      tags: ['#追加配饰', '#风格化'],
      material: '天然织造/皮草/真丝',
      colorName: '优雅拼色',
      colorHex: '#3E2723',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzW0wVrNWK4Fcu_L9gn7rfV3QQSZ1E1uHbJNHeS6E78al1eCJuPGLlirdwiLc7m-Pzxkq6b2surk2iwydvfzySJMp560TZhuQQ8M_9cxdP6LWhZpIfzJdncFKW1T8hQJS0eTUfOu5XFxr-PEfxuYzrgyX1Akxb5qgRRk47DZIleED7IQW7zIjX5u1GrdJCBJXddKQtP6G4UATCblggeaEBLwKZu54EuEXMX8TDoVSOXCTpzFtAIXnMyAcUi2aitxp1Pa5K_GZwal-5',
      isWornCount: 1,
      isRecentFavorite: false,
      season: '四季通用',
      dateAdded: date
    };

    setCalendarLogs(
      calendarLogs.map(log => {
        if (log.date === date) {
          return {
            ...log,
            items: [...log.items, newItem]
          };
        }
        return log;
      })
    );
  };

  // Filters favorites list for recent favorites display row
  const recentFavorites = wardrobeItems.filter(item => item.isRecentFavorite);

  // Check if active outfit's outerwear is favorited
  const checkOutfitFavorited = () => {
    const primaryCoat = activeOutfit.items[0];
    if (!primaryCoat) return false;
    const found = wardrobeItems.find(item => item.name === primaryCoat.name);
    return found ? found.isRecentFavorite : false;
  };

  const isOutfitFavorited = checkOutfitFavorited();

  return (
    <div className="w-full min-h-screen bg-stone-100/40 md:py-8 flex items-center justify-center font-sans">
      
      {/* Phone/Container layout framing with refined smartphone outline */}
      <div className="w-full max-w-md min-h-screen md:min-h-[860px] md:max-h-[920px] md:rounded-[36px] bg-[#f8f9fa] border-[6px] border-stone-800 shadow-2xl overflow-hidden relative flex flex-col justify-between">
        
        {/* WeChat Simulation: Mobile Status Bar (iOS Style) */}
        <div className="w-full bg-white px-5 pt-3.5 pb-1.5 flex items-center justify-between text-[11px] font-bold text-stone-900 select-none border-b border-stone-50">
          {/* Current Dynamic Time */}
          <span className="font-sans antialiased text-[11.5px] leading-none shrink-0 tracking-tight">{statusBarTime}</span>
          
          {/* Dynamic Bezel Center Indicator (e.g. Ear speaker notch outline) */}
          <div className="hidden md:block w-24 h-4.5 bg-black rounded-full absolute left-1/2 -translate-x-1/2 -top-[1.2px] z-50 overflow-hidden" />

          {/* Status Icons on the right */}
          <div className="flex items-center gap-1.5 shrink-0 select-none">
            {/* Cellular Signal waves icon */}
            <svg className="w-4 h-3 text-stone-800 fill-current opacity-90" viewBox="0 0 24 24">
              <rect x="2" y="16" width="2.5" height="4" rx="0.5" />
              <rect x="6.5" y="12" width="2.5" height="8" rx="0.5" />
              <rect x="11" y="8" width="2.5" height="12" rx="0.5" />
              <rect x="15.5" y="4" width="2.5" height="16" rx="0.5" />
              <rect x="20" y="1" width="2.5" height="19" rx="0.5" />
            </svg>
            
            <span className="text-[9px] font-extrabold tracking-tighter text-stone-800 scale-95 opacity-90 -mr-0.5">5G</span>
            
            {/* Battery Level Wrapper */}
            <div className="flex items-center outline outline-1 outline-stone-700/60 rounded-[3px] px-[1.5px] py-[0.5px] w-5.5 h-3 relative">
              <div className="bg-stone-900 h-full w-[88%] rounded-[1.5px]" />
              <div className="absolute -right-[1.5px] top-1/2 -translate-y-1/2 w-[1.5px] h-[3.5px] rounded-r-[1px] bg-stone-700/60" />
            </div>
          </div>
        </div>

        {/* WeChat Mini Program Styled Navigation Bar */}
        <header className="sticky top-0 z-40 bg-white border-b border-stone-200/40 px-4 py-3 flex items-center justify-between select-none">
          {/* Left Drawer Menu Action */}
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="p-1.5 hover:bg-stone-50 active:scale-95 transition-all text-stone-700 cursor-pointer rounded-full"
            title="小程序属性设置"
          >
            <Menu className="w-5.5 h-5.5" />
          </button>
          
          {/* Main Title of WeChat Mini Program container */}
          <div 
            className="flex items-center gap-1.5 cursor-pointer max-w-[50%] truncate" 
            onClick={() => setActiveTab('home')}
            id="header-title-container"
          >
            <span 
              id="header-title-text" 
              className="text-stone-800 font-sans font-bold text-[15px] tracking-wide truncate transition-all duration-300"
            >
              {activeTab === 'home' && 'VOGUE AI 智能穿搭'}
              {activeTab === 'wardrobe' && '我的智能衣橱'}
              {activeTab === 'match' && 'AI 智能搭配'}
              {activeTab === 'calendar' && '今日行历穿搭'}
              {activeTab === 'mine' && '个人档案中心'}
            </span>
          </div>

          {/* Right Classic WeChat Mini Program Capsule Button (微信小程序胶囊按钮) */}
          <div className="flex items-center select-none">
            <div className="h-7.5 rounded-full border border-stone-200/80 bg-stone-50/70 backdrop-blur-sm flex items-center px-3 relative gap-2.5 text-stone-800 shadow-sm">
              
              {/* Three dots button (Actions Menu) */}
              <button 
                onClick={() => setShowWeChatActionSheet(true)}
                className="flex items-center justify-center p-1 hover:text-blue-600 focus:outline-none cursor-pointer text-stone-800"
                title="小程序属性/分享菜单"
              >
                <svg className="w-[17px] h-[17px] fill-current" viewBox="0 0 24 24">
                  <circle cx="5" cy="12" r="2.2" />
                  <circle cx="12" cy="12" r="2.2" />
                  <circle cx="19" cy="12" r="2.2" />
                </svg>
              </button>

              {/* Capsule middle separation line */}
              <div className="w-[1px] h-3.5 bg-stone-200/90" />

              {/* Exit/Close round button */}
              <button 
                onClick={() => triggerWeChatToast('已模拟正常终止小程序运行，点击可继续测试调试')}
                className="flex items-center justify-center p-1 hover:text-rose-500 focus:outline-none cursor-pointer text-stone-800"
                title="退出小程序"
              >
                <svg className="w-[17px] h-[17px] stroke-current stroke-2.2 fill-none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="2.5" className="fill-current" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic View container body */}
        <main className="flex-1 overflow-y-auto custom-scrollbar px-5 py-5 scroll-smooth bg-[#f8f9fa] max-h-[calc(100vh-140px)] md:max-h-[calc(920px-150px)]">
          {activeTab === 'home' && (
            <HomeView 
              onOpenDrawer={() => setIsDrawerOpen(true)}
              activeOutfit={activeOutfit}
              onRefreshOutfit={handleRefreshTodayOutfit}
              onAddCalendarLog={handleAddCalendarLog}
              onToggleFavoriteOutfit={handleToggleFavoriteOutfit}
              isOutfitFavorited={isOutfitFavorited}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              wardrobeItems={wardrobeItems}
              recentFavorites={recentFavorites}
            />
          )}

          {activeTab === 'wardrobe' && (
            <WardrobeView 
              wardrobeItems={wardrobeItems}
              pendingQueue={pendingQueue}
              onIdentifyAndAdd={handleIdentifyAndAdd}
            />
          )}

          {activeTab === 'match' && (
            <MatchView 
              wardrobeItems={wardrobeItems}
              alternativeItems={initialAlternativeItems}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarView 
              logs={calendarLogs}
              onUpdateLogRating={handleUpdateLogRating}
              onUpdateLogAlert={handleUpdateLogAlert}
              onAddCustomItemToLog={handleAddCustomItemToLog}
            />
          )}

          {activeTab === 'mine' && (
            <MineView 
              userProfile={userProfile}
              favorites={recentFavorites}
              onNavigateToTab={(tab) => setActiveTab(tab)}
            />
          )}
        </main>

        {/* Floating Bottom tab bar navigation (Selected Colors kept strictly unchanged) */}
        <nav className="sticky bottom-0 z-30 bg-white/95 border-t border-stone-200/50 py-3.5 px-3 flex items-center justify-around select-none">
          {/* Tab Button 1: Home */}
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
              activeTab === 'home' ? 'text-[#0041c9] scale-105 font-bold' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <Home className="w-5.5 h-5.5" />
            <span className="text-[9px] uppercase tracking-widest block font-bold">首页</span>
          </button>

          {/* Tab Button 2: Wardrobe */}
          <button 
            onClick={() => setActiveTab('wardrobe')}
            className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
              activeTab === 'wardrobe' ? 'text-[#0041c9] scale-105 font-bold' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <Shirt className="w-5.5 h-5.5" />
            <span className="text-[9px] uppercase tracking-widest block font-bold">衣橱</span>
          </button>

          {/* Tab Button 3: Match */}
          <button 
            onClick={() => setActiveTab('match')}
            className={`flex flex-col items-center gap-1 transition-all cursor-pointer bg-stone-50 hover:bg-stone-100 rounded-full px-4.5 py-1.5 border border-stone-100 ${
              activeTab === 'match' ? 'text-[#0041c9] border-[#0041c9]/25 bg-blue-50/40' : 'text-stone-500'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-stone-700 active:rotate-12 transition-transform" />
              <span className="text-[9px] uppercase tracking-widest block font-bold">搭配</span>
            </div>
          </button>

          {/* Tab Button 4: Calendar */}
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
              activeTab === 'calendar' ? 'text-[#0041c9] scale-105 font-bold' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <Calendar className="w-5.5 h-5.5" />
            <span className="text-[9px] uppercase tracking-widest block font-bold">日历</span>
          </button>

          {/* Tab Button 5: Profile */}
          <button 
            onClick={() => setActiveTab('mine')}
            className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
              activeTab === 'mine' ? 'text-[#0041c9] scale-105 font-bold' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <User className="w-5.5 h-5.5" />
            <span className="text-[9px] uppercase tracking-widest block font-bold">我的</span>
          </button>
        </nav>

        {/* Global Sidebar Menu Drawer */}
        <NavDrawer 
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          userProfile={userProfile}
          onChangeTab={(tab) => setActiveTab(tab)}
        />

        {/* WeChat Custom Modal Action Sheet */}
        {showWeChatActionSheet && (
          <div className="absolute inset-0 z-50 flex flex-col justify-end">
            <div 
              className="absolute inset-0 bg-black/60 transition-opacity duration-300 animate-in fade-in"
              onClick={() => setShowWeChatActionSheet(false)}
            />
            
            <div className="relative bg-[#f7f7f7] rounded-t-3xl border-t border-stone-200/80 p-5 pb-8 space-y-6 animate-in slide-in-from-bottom duration-300 z-50">
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-sm font-bold text-stone-800">VOGUE AI 智能穿搭</span>
                <span className="text-[10px] text-stone-400 mt-0.5">本应用已针对微信小程序环境进行深度适配</span>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-center">
                <button 
                  onClick={() => {
                    setShowWeChatActionSheet(false);
                    triggerWeChatToast('已调起微信聊天窗口进行穿搭讨论');
                  }}
                  className="flex flex-col items-center gap-1.5 focus:outline-none group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-stone-100 hover:bg-stone-50 active:scale-95 transition-all text-emerald-600 shadow-sm">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
                    </svg>
                  </div>
                  <span className="text-[10px] text-stone-600 font-bold">发送给朋友</span>
                </button>

                <button 
                  onClick={() => {
                    setShowWeChatActionSheet(false);
                    triggerWeChatToast('正在生成穿搭卡片，即将分享到朋友圈');
                  }}
                  className="flex flex-col items-center gap-1.5 focus:outline-none group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-stone-100 hover:bg-stone-50 active:scale-95 transition-all text-amber-500 shadow-sm">
                    <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10" />
                      <line x1="2.5" y1="12" x2="21.5" y2="12" />
                      <line x1="12" y1="2" x2="12" y2="22" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-stone-600 font-bold">分享到朋友圈</span>
                </button>

                <button 
                  onClick={() => {
                    setShowWeChatActionSheet(false);
                    triggerWeChatToast('当前搭配方案已成功加入微信个人收藏柜');
                  }}
                  className="flex flex-col items-center gap-1.5 focus:outline-none group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-stone-100 hover:bg-stone-50 active:scale-95 transition-all text-red-500 shadow-sm">
                    <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-stone-600 font-bold">收藏本方案</span>
                </button>

                <button 
                  onClick={() => {
                    setShowWeChatActionSheet(false);
                    triggerWeChatToast('已添加到小游戏/常用小程序下拉抽屉');
                  }}
                  className="flex flex-col items-center gap-1.5 focus:outline-none group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-stone-100 hover:bg-stone-50 active:scale-95 transition-all text-blue-500 shadow-sm">
                    <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-stone-600 font-bold">添加到我的</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4 text-center">
                <button 
                  onClick={() => {
                    setShowWeChatActionSheet(false);
                    triggerWeChatToast('正在重载小程序虚拟树...');
                    setTimeout(() => {
                      setActiveTab('home');
                    }, 500);
                  }}
                  className="flex flex-col items-center gap-1.5 focus:outline-none group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-stone-100 hover:bg-stone-50 active:scale-95 transition-all text-stone-600 shadow-sm">
                    <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38s.16-.14.28-.27l5.62-5.65" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-stone-600 font-bold">重新加载</span>
                </button>

                <button 
                  onClick={() => {
                    setShowWeChatActionSheet(false);
                    setIsDrawerOpen(true);
                  }}
                  className="flex flex-col items-center gap-1.5 focus:outline-none group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-stone-100 hover:bg-stone-50 active:scale-95 transition-all text-stone-600 shadow-sm">
                    <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-stone-600 font-bold">偏好设置</span>
                </button>

                <button 
                  onClick={() => {
                    setShowWeChatActionSheet(false);
                    triggerWeChatToast('多功能反馈表单已准备就绪');
                  }}
                  className="flex flex-col items-center gap-1.5 focus:outline-none group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-stone-100 hover:bg-stone-50 active:scale-95 transition-all text-stone-600 shadow-sm">
                    <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-stone-600 font-bold">反馈与投诉</span>
                </button>

                <button 
                  onClick={() => {
                    setShowWeChatActionSheet(false);
                    triggerWeChatToast('VOGUE AI 穿搭助手1.2.0');
                  }}
                  className="flex flex-col items-center gap-1.5 focus:outline-none group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-stone-100 hover:bg-stone-50 active:scale-95 transition-all text-indigo-500 shadow-sm">
                    <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-stone-600 font-bold">关于我们</span>
                </button>
              </div>
              
              <button 
                onClick={() => setShowWeChatActionSheet(false)}
                className="w-full py-3.5 bg-white border border-stone-200/80 rounded-2xl text-xs font-bold text-stone-700 hover:bg-stone-50 active:scale-95 transition-all cursor-pointer block text-center shadow-sm"
              >
                取消关闭
              </button>
            </div>
          </div>
        )}

        {/* WeChat Custom Toast notifications center */}
        {weChatToast && (
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black/90 text-white px-5 py-3.5 rounded-2xl text-xs text-center border border-white/10 shadow-2xl flex flex-col items-center gap-2 max-w-[240px] animate-in fade-in scale-in duration-250 select-none">
            <svg className="w-7 h-7 text-emerald-400 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="font-semibold leading-relaxed">{weChatToast}</span>
          </div>
        )}

      </div>
    </div>
  );
}
