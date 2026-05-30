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
    <div className="w-full min-h-screen bg-stone-100/40 md:py-10 flex items-center justify-center font-sans">
      
      {/* Phone/Container layout framing */}
      <div className="w-full max-w-md min-h-screen md:min-h-[850px] md:max-h-[920px] md:rounded-[40px] bg-[#f8f9fa] border border-stone-200/60 shadow-2xl overflow-hidden relative flex flex-col justify-between">
        
        {/* Sticky Glassmorphic Header */}
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-stone-200/50 px-5 py-4 flex items-center justify-between select-none">
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="p-1 px-1.5 hover:bg-stone-50 active:scale-95 transition-all text-stone-700 cursor-pointer rounded-full"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div 
            className="flex items-center gap-1 cursor-pointer" 
            onClick={() => setActiveTab('home')}
            id="header-title-container"
          >
            <span 
              id="header-title-text" 
              className="font-serif font-black tracking-[0.15em] text-[#1A1A1A] text-lg transition-all duration-300"
            >
              {activeTab === 'home' && '首页'}
              {activeTab === 'wardrobe' && '我的衣橱'}
              {activeTab === 'match' && '智能搭配'}
              {activeTab === 'calendar' && '穿搭日历'}
              {activeTab === 'mine' && '个人中心'}
            </span>
          </div>

          <button 
            onClick={() => setActiveTab('mine')}
            className="w-8 h-8 rounded-full overflow-hidden border border-stone-200 shadow-sm hover:scale-105 transition-transform"
          >
            <img 
              src={userProfile.avatarUrl} 
              alt="Avatar Profile portal" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        </header>

        {/* Dynamic View container body */}
        <main className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 scroll-smooth bg-[#f8f9fa] max-h-[calc(100vh-140px)] md:max-h-[calc(920px-140px)]">
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

        {/* Floating Bottom tab bar navigation */}
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
      </div>
    </div>
  );
}
