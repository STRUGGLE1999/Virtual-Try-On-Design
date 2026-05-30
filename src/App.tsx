/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu, Sparkles, Shirt, Calendar, User, Home, ArrowLeftRight,
  Signal, Wifi, Search, Plus, ChevronRight, ChevronLeft, Send,
  RotateCw, HelpCircle, ArrowLeft, MoreHorizontal, Bell, Volume2,
  Compass, Eye, Heart, CheckCircle, MessageSquare
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
  // WeChat Mini Program Outer Framework States
  const [isWeChatActive, setIsWeChatActive] = useState(false); // Start inside the Mini Program to showcase it instantly!
  const [activeWeChatView, setActiveWeChatView] = useState<'chats' | 'chat_linxia'>('chats');
  const [isWeChatPullDownRevealed, setIsWeChatPullDownRevealed] = useState(false);
  const [launchState, setLaunchState] = useState<'closed' | 'launching' | 'open'>('open');
  const [isCapsuleMenuOpen, setIsCapsuleMenuOpen] = useState(false);
  
  // Custom WeChat Alert State (to capture and prettify alerts)
  const [weChatAlert, setWeChatAlert] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    showCancel?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
  } | null>(null);

  // Styled Chat Messages with Personal Stylist Lin Xia
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    sender: 'linxia' | 'user';
    text?: string;
    isCard?: boolean;
    timestamp: string;
  }>>([
    {
      id: 'msg_1',
      sender: 'linxia',
      text: '嗨，精选的【先锋都市风大衣配丹宁】方案，极简冷感，快点击下方的小程序卡片体验 3D 虚拟试穿并加入到你的穿搭安排日程表吧！',
      timestamp: '上午 11:32'
    },
    {
      id: 'msg_2',
      sender: 'linxia',
      isCard: true,
      timestamp: '上午 11:32'
    }
  ]);
  const [isLinXiaTyping, setIsLinXiaTyping] = useState(false);

  // Monkey-patch window.alert after mounting to capture child component alert notices automatically
  useEffect(() => {
    const originalAlert = window.alert;
    window.alert = (message: any) => {
      setWeChatAlert({
        isOpen: true,
        title: '小程序通知',
        message: String(message),
        showCancel: false
      });
    };
    return () => {
      window.alert = originalAlert;
    };
  }, []);

  // Keyboard Quick Prompt Replies with Lin Xia
  const handleUserReply = (suggestedText: string, suggestedKey: string) => {
    if (isLinXiaTyping) return;
    
    const userMsg = {
      id: `msg_user_${Date.now()}`,
      sender: 'user' as const,
      text: suggestedText,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, userMsg]);
    setIsLinXiaTyping(true);
    
    setTimeout(() => {
      let replyText = "";
      if (suggestedKey === 'recommend') {
        replyText = "今天极力推介你的【先锋都市风大衣配丹宁】。深咖色修剪呢子质地高雅显气质，融合白色棉衬底，防风又保暖！搭配微宽直筒牛仔，冷感酷帅，非常适合今天在轻寒的清晨散步或通勤哦！点击上方的小程序卡片就能立即虚拟试穿加星收藏啦！";
      } else if (suggestedKey === 'add') {
        replyText = "有两种超级方便的主动方式哦！直接启动我们的【Vogue AI 穿搭助手】小程序：\n1. 在小程序【衣橱】页面底部，可以直接滑入/拖拽本地的图片，或者从手机里拍照上传。\n2. AI 智能抠图算法会自动剔透掉冗余背景，并在识别后将标签（材质、颜色、风格推荐）保存，您直接点击‘一键入库’确认就可以啦！省时又好玩！";
      } else {
        replyText = "您可以一键使用我们的“穿搭日历”工作流！在小程序【日历】选项卡中，您会看见整齐的五月份日程格子。标记了深黑色圆形底座的就是穿搭高发日期！您可以在里面自主追加个性单品备注，还可以给主观体验打分🌟，AI 会不断学习你的喜好。本月的 5月13日，大衣和风衣穿搭专属方案已经为您精心规划好了，可以一键追加到那一天哦！";
      }
      
      const responseMsg = {
        id: `msg_lx_${Date.now()}`,
        sender: 'linxia' as const,
        text: replyText,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, responseMsg]);
      setIsLinXiaTyping(false);
    }, 1200);
  };

  // Tab Management State
  const [activeTab, setActiveTab ] = useState<'home' | 'wardrobe' | 'match' | 'calendar' | 'mine'>('home');
  const [isDrawerOpen, setIsDrawerOpen ] = useState(false);

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

  // ACTION 7: Adding custom clothing item to Calendar Day Log manually
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
    <div className="w-full min-h-screen bg-gradient-to-br from-stone-100 via-stone-50 to-stone-100/60 py-6 md:py-12 flex items-center justify-center font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl w-full mx-auto px-4 justify-center items-center">
        
        {/* Left Hand: High Fidelity Simulated WeChat/Phone Screen */}
        <div className="col-span-1 lg:col-span-5 flex justify-center items-center">
          <div className="w-full max-w-[390px] h-[812px] rounded-[50px] bg-black p-3.5 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.35)] relative border-[10px] border-stone-900 flex flex-col justify-between overflow-hidden select-none">
            
            {/* Screen Content Wrapper */}
            <div className="w-full h-full bg-[#f8f9fa] rounded-[32px] overflow-hidden relative flex flex-col justify-between">
              
              {/* iOS Status Bar (Always Rendered on Top of Screen) */}
              <div className={`w-full h-7 ${isWeChatActive ? 'bg-[#f7f7f7] text-stone-800' : 'bg-white text-stone-800'} px-6 flex items-center justify-between text-[11px] font-semibold z-55 select-none shrink-0 relative`}>
                <span>12:00</span>
                {/* Simulated dynamic notch */}
                <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-28 h-4.5 rounded-full bg-black flex items-center justify-center gap-1.5 px-3 z-55">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                  <span className="w-1 h-3 rounded-full bg-stone-900" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Signal className="w-3 h-3" />
                  <span className="font-mono text-[9px]">5G</span>
                  <Wifi className="w-3 h-3" />
                  <div className="w-5.5 h-2.5 border border-stone-800 rounded-[3px] p-[1px] flex items-center justify-start">
                    <div className="w-3.5 h-full bg-[#07C160] rounded-[1px]" />
                  </div>
                </div>
              </div>

              {isWeChatActive ? (
                /* WeChat Environment Active */
                <div className="flex-1 flex flex-col justify-between bg-[#ededed] h-full relative">
                  
                  {/* WeChat Navigation Bar */}
                  {activeWeChatView === 'chats' ? (
                    <div className="bg-[#f7f7f7] border-b border-[#E5E5E5] px-4 py-2.5 flex items-center justify-between select-none shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-stone-900 text-base">微信 (1)</span>
                      </div>
                      <div className="flex items-center gap-4 text-stone-800">
                        <Search className="w-4.5 h-4.5 cursor-pointer hover:opacity-80" />
                        <Plus 
                          onClick={() => {
                            setWeChatAlert({
                              isOpen: true,
                              title: '微信专属玩法',
                              message: '加好友、面对面建群和扫一扫已就绪！点击林夏对话，直接和 AI 穿搭顾问展开趣味风格互动吧。',
                              showCancel: false
                            });
                          }}
                          className="w-5 h-5 cursor-pointer hover:opacity-80" 
                        />
                      </div>
                    </div>
                  ) : (
                    /* WeChat Lin Xia Chat Window Header */
                    <div className="bg-[#f7f7f7] border-b border-[#E5E5E5] px-3 py-2.5 flex items-center justify-between select-none shrink-0 border-t border-stone-100">
                      <button 
                        onClick={() => setActiveWeChatView('chats')}
                        className="flex items-center text-stone-800 cursor-pointer hover:opacity-80"
                      >
                        <ChevronLeft className="w-5.5 h-5.5" />
                        <span className="text-sm">微信(1)</span>
                      </button>
                      <span className="font-bold text-stone-900 text-sm">AI 造型顾问 - 林夏 🌸</span>
                      <div className="w-5" /> {/* Spacer */}
                    </div>
                  )}

                  {/* Pull-Down Mini Program Drawer Desk Trigger Area (Shown on chats screen) */}
                  {activeWeChatView === 'chats' && (
                    <div 
                      onClick={() => setIsWeChatPullDownRevealed(!isWeChatPullDownRevealed)}
                      className="w-full bg-[#f1f1f1] hover:bg-[#eaeaea] transition-colors py-1.5 border-b border-[#E5E5E5]/50 flex flex-col items-center justify-center gap-0.5 cursor-pointer select-none group shrink-0"
                    >
                      <div className="w-10 h-1 bg-stone-300 rounded-full group-hover:bg-stone-400" />
                      <span className="text-[9px] text-stone-400 font-semibold tracking-wide flex items-center gap-1">
                        {isWeChatPullDownRevealed ? '↑ 上轻扫收起快捷小程序' : '↓ 点击下拉展现“小程序桌面”快捷面板'}
                      </span>
                    </div>
                  )}

                  {/* Pull-Down Grid Panel Drawer */}
                  {activeWeChatView === 'chats' && isWeChatPullDownRevealed && (
                    <div className="absolute top-[41px] inset-x-0 bg-[#141414] text-white py-5 px-6 rounded-b-[24px] shadow-2xl z-30 transition-all duration-300 border-b border-white/10 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider flex items-center gap-1">
                          ★ 我的小程序
                        </span>
                        <span className="text-[9px] text-[#07C160] hover:underline cursor-pointer">编辑</span>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 py-2 text-center">
                        <button 
                          onClick={() => {
                            setIsWeChatPullDownRevealed(false);
                            setLaunchState('launching');
                            setTimeout(() => {
                              setLaunchState('open');
                              setIsWeChatActive(false);
                            }, 1200);
                          }}
                          className="flex flex-col items-center gap-1.5 cursor-pointer group"
                        >
                          <div className="w-11 h-11 bg-stone-900 rounded-full flex items-center justify-center border border-white/10 shadow-md transform group-active:scale-95 transition-transform">
                            <Shirt className="w-5.5 h-5.5 text-white" />
                          </div>
                          <span className="text-[10px] font-semibold truncate w-full text-stone-200">Vogue AI ...</span>
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => setIsWeChatPullDownRevealed(false)}
                        className="text-[10px] text-stone-400 hover:text-white py-1 flex items-center justify-center gap-1 border-t border-white/5 mt-2"
                      >
                        ↑ 收起小程序快捷桌面
                      </button>
                    </div>
                  )}

                  {/* Chats List Page UI */}
                  {activeWeChatView === 'chats' && (
                    <div className="flex-1 overflow-y-auto px-1 py-1 space-y-[2px]">
                      
                      {/* Stylist chat card portal item */}
                      <div 
                        onClick={() => setActiveWeChatView('chat_linxia')}
                        className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-200/40 hover:bg-stone-50 cursor-pointer shadow-sm transition-all"
                      >
                        {/* Avatar */}
                        <div className="relative shrink-0">
                          <img 
                            src={userProfile.avatarUrl} 
                            alt="Lin Xia Portal" 
                            className="w-12 h-12 rounded-lg object-cover border border-stone-200"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                            1
                          </span>
                        </div>
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-bold text-[#111111] text-sm">AI 造型顾问 - 林夏 🌸</span>
                            <span className="text-[9px] text-stone-400 font-mono">11:32</span>
                          </div>
                          <p className="text-xs text-stone-500 truncate">
                            嗨，精选的大衣风裤方案极有冷感，快点击进入小程序试穿加星吧...
                          </p>
                        </div>
                      </div>

                      {/* WeChat Pay */}
                      <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-200/40 hover:bg-stone-50 cursor-pointer shadow-sm transition-all text-stone-700">
                        <div className="w-12 h-12 rounded-lg bg-[#07C160] flex items-center justify-center text-white shrink-0">
                          <Volume2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-bold text-[#111111] text-sm">微信支付</span>
                            <span className="text-[9px] text-stone-400 font-mono">昨天</span>
                          </div>
                          <p className="text-xs text-stone-400 truncate">
                            支付凭证：您录入的新衣服已通过 AI 抠图，本次服务全免额。
                          </p>
                        </div>
                      </div>

                      {/* Tencent News */}
                      <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-200/40 hover:bg-stone-50 cursor-pointer shadow-sm transition-all text-stone-700">
                        <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center text-white shrink-0">
                          <Bell className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-bold text-[#111111] text-sm">订阅号消息</span>
                            <span className="text-[9px] text-stone-400 font-mono">周三</span>
                          </div>
                          <p className="text-xs text-stone-400 truncate">
                            《2026年夏季呢冷感风穿搭白皮书》：简约衬衫和冷色大衣...
                          </p>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Lin Xia Conversation Chat Window */}
                  {activeWeChatView === 'chat_linxia' && (
                    <div className="flex-1 flex flex-col justify-between overflow-hidden">
                      {/* Messages Logs Area */}
                      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar">
                        {chatMessages.map((msg) => (
                          <div 
                            key={msg.id}
                            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                          >
                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-200 shrink-0 select-none">
                              {msg.sender === 'linxia' ? (
                                <img 
                                  src={userProfile.avatarUrl} 
                                  alt="Lin Xia" 
                                  className="w-full h-full object-cover" 
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="w-full h-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold font-mono">
                                  MINE
                                </div>
                              )}
                            </div>

                            {/* Bubble Content */}
                            {msg.isCard ? (
                              /* Dynamic Mini Program Card Link inside Chat! */
                              <div className="bg-white border border-stone-200 rounded-xl p-3 max-w-[245px] shadow-sm flex flex-col gap-2 select-none shrink-0 group hover:border-[#07C160]/40 transition-colors">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-4.5 h-4.5 rounded-full bg-stone-950 flex items-center justify-center">
                                    <Shirt className="w-2.5 h-2.5 text-white" />
                                  </div>
                                  <span className="text-[10px] text-stone-400 font-semibold tracking-wide">Vogue AI 穿搭助手</span>
                                </div>
                                <div className="text-xs text-stone-800 font-bold leading-relaxed">
                                  🌸 今日最推荐：先锋风呢大衣
                                </div>
                                <div className="w-full h-24 rounded-lg bg-stone-100 overflow-hidden relative border border-stone-150">
                                  <img 
                                    src={wardrobeItems[4]?.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzW0wVrNWK4Fcu_L9gn7rfV3QQSZ1E1uHbJNHeS6E78al1eCJuPGLlirdwiLc7m-Pzxkq6b2surk2iwydvfzySJMp560TZhuQQ8M_9cxdP6LWhZpIfzJdncFKW1T8hQJS0eTUfOu5XFxr-PEfxuYzrgyX1Akxb5qgRRk47DZIleED7IQW7zIjX5u1GrdJCBJXddKQtP6G4UATCblggeaEBLwKZu54EuEXMX8TDoVSOXCTpzFtAIXnMyAcUi2aitxp1Pa5K_GZwal-5'} 
                                    alt="Recommended coat" 
                                    className="w-full h-full object-cover font-mono text-[9px] text-stone-400 mt-2" 
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute top-1 right-1 px-1 bg-black/60 rounded text-[8px] text-white font-mono">
                                    96配对分
                                  </div>
                                </div>
                                <button 
                                  onClick={() => {
                                    setLaunchState('launching');
                                    setTimeout(() => {
                                      setLaunchState('open');
                                      setIsWeChatActive(false);
                                    }, 1200);
                                  }}
                                  className="border-t border-stone-100 pt-2 flex items-center justify-between text-[11px] text-[#576B95] font-bold cursor-pointer group-hover:text-[#07C160] transition-colors"
                                >
                                  <span>进入小程序体验试穿</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              /* Standard message bubble */
                              <div className={`relative px-3.5 py-2.5 rounded-xl text-[13px] max-w-[230px] leading-relaxed shadow-sm ${
                                msg.sender === 'user'
                                  ? 'bg-[#95EC69] text-stone-900 border border-[#85DC59]/30 rounded-tr-none'
                                  : 'bg-white text-stone-800 border border-stone-200/50 rounded-tl-none'
                              }`}>
                                {msg.text}
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Typing Animation Loader */}
                        {isLinXiaTyping && (
                          <div className="flex items-start gap-2.5">
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-200 shrink-0">
                              <img 
                                src={userProfile.avatarUrl} 
                                alt="Lin Xia Typing" 
                                className="w-full h-full object-cover" 
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="px-4 py-3 bg-white border border-stone-150 rounded-xl rounded-tl-none flex items-center justify-center gap-1">
                              <span className="w-1.5 h-1.5 bg-[#07C160] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-1.5 h-1.5 bg-[#07C160] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-1.5 h-1.5 bg-[#07C160] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Prompt recommendation tags (Fast Interactive replies) */}
                      <div className="bg-stone-50 border-t border-stone-200 px-3 py-2 flex flex-wrap gap-1.5 select-none shrink-0">
                        <button 
                          onClick={() => handleUserReply('林夏，请问今日大衣搭配推荐有什么好处？', 'recommend')}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-stone-200/80 hover:border-[#07C160] hover:text-[#07C160] text-stone-600 font-semibold cursor-pointer shrink-0 transition-colors"
                        >
                          🌸 推荐今日穿搭？
                        </button>
                        <button 
                          onClick={() => handleUserReply('林夏，新衣服怎么放进我的衣橱？', 'add')}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-stone-200/80 hover:border-[#07C160] hover:text-[#07C160] text-stone-600 font-semibold cursor-pointer shrink-0 transition-colors"
                        >
                          🧣 怎么添加新衣？
                        </button>
                        <button 
                          onClick={() => handleUserReply('我想规划一下本月大衣穿搭，在小程序里怎么看？', 'calendar')}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-stone-200/80 hover:border-[#07C160] hover:text-[#07C160] text-stone-600 font-semibold cursor-pointer shrink-0 transition-colors"
                        >
                          📅 日历怎么使用？
                        </button>
                      </div>

                      {/* WeChat footer standard mockup bar */}
                      <div className="bg-[#f7f7f7] border-t border-[#E5E5E5] px-3.5 py-2.5 flex items-center gap-2 select-none shrink-0">
                        <div className="w-6.5 h-6.5 rounded-full border border-stone-400 text-stone-600 flex items-center justify-center font-bold text-base cursor-pointer hover:bg-stone-200">
                          ⌨
                        </div>
                        <input 
                          type="text" 
                          disabled 
                          placeholder="和林夏聊天：请选择上方快捷标签互动" 
                          className="flex-1 bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-xs outline-none cursor-not-allowed select-none"
                        />
                        <div className="w-6.5 h-6.5 rounded-full border border-stone-400 text-stone-600 flex items-center justify-center font-bold text-base cursor-pointer hover:bg-stone-200">
                          +
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Normal WeChat Shell tab bar */}
                  {activeWeChatView === 'chats' && (
                    <div className="bg-[#f8f8f8] border-t border-[#E5E5E5] py-1.5 px-4 flex items-center justify-around select-none shrink-0 text-stone-400">
                      <div className="flex flex-col items-center gap-0.5 text-[#07C160] cursor-pointer">
                        <MessageSquare className="w-5.5 h-5.5 fill-current" />
                        <span className="text-[9px] font-bold">微信</span>
                      </div>
                      <div 
                        onClick={() => {
                          setWeChatAlert({
                            isOpen: true,
                            title: '发现新玩法',
                            message: '此微信运行于 Vogue AI 高保真沙盒，快点击第一个会话卡片咨询林夏顾问，一键进入穿搭小程序！',
                            showCancel: false
                          });
                        }} 
                        className="flex flex-col items-center gap-0.5 hover:text-stone-700 cursor-pointer"
                      >
                        <Compass className="w-5.5 h-5.5" />
                        <span className="text-[9px]">发现</span>
                      </div>
                      <div 
                        onClick={() => {
                          setWeChatAlert({
                            isOpen: true,
                            title: '关于小沙盒',
                            message: '已经无侵入安全运行。小程序在微信沙盒内支持 3D 抠图、衣橱管理、穿搭指数反馈！',
                            showCancel: false
                          });
                        }} 
                        className="flex flex-col items-center gap-0.5 hover:text-stone-700 cursor-pointer"
                      >
                        <User className="w-5.5 h-5.5" />
                        <span className="text-[9px]">我</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Mini Program is Running */
                <div className="flex-1 flex flex-col justify-between overflow-hidden relative bg-[#f8f9fa] h-full">
                  
                  {/* WeChat Mini Program standard Navigation Bar */}
                  <header className="bg-white border-b border-stone-200/50 px-4 py-2.5 flex items-center justify-between select-none shrink-0 z-40 relative">
                    {/* Native side trigger or Back back (if deep) */}
                    <button 
                      onClick={() => setIsDrawerOpen(true)}
                      className="p-1 px-1.5 hover:bg-stone-50 active:scale-95 transition-all text-stone-700 cursor-pointer rounded-full"
                    >
                      <Menu className="w-5 h-5" />
                    </button>
                    
                    {/* Centered Applet name which matches active tab titles */}
                    <div className="flex items-center gap-1 cursor-default select-none" id="header-title-container">
                      <span id="header-title-text" className="font-sans font-bold text-stone-900 text-[14px]">
                        {activeTab === 'home' && 'Vogue AI · 穿搭推荐'}
                        {activeTab === 'wardrobe' && 'Vogue AI · 我的衣橱'}
                        {activeTab === 'match' && 'Vogue AI · 智能搭配'}
                        {activeTab === 'calendar' && 'Vogue AI · 穿搭日历'}
                        {activeTab === 'mine' && 'Vogue AI · 个人中心'}
                      </span>
                    </div>

                    {/* Classic WeChat Capsule Button (胶囊按键) */}
                    <div className="h-8 border border-stone-200/80 bg-white/60 backdrop-blur-sm px-2.5 py-1 flex items-center justify-between rounded-full gap-3 text-[#111111] shadow-xs cursor-default">
                      {/* More button */}
                      <button 
                        title="小程序选项"
                        onClick={() => setIsCapsuleMenuOpen(true)}
                        className="p-0.5 hover:bg-stone-100 active:scale-90 transition-transform rounded-full cursor-pointer text-stone-750"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {/* Slim divider line */}
                      <div className="w-[1px] h-3.5 bg-stone-200" />
                      {/* Exit concentric-dots button */}
                      <button 
                        title="退出小程序"
                        onClick={() => {
                          setIsWeChatActive(true);
                          setWeChatAlert({
                            isOpen: true,
                            title: '退出成功',
                            message: '已安全为您最小化 Vogue AI。您可以随后点击林夏微信对话或通过主页面下拉抽屉重新唤醒小程序！',
                            showCancel: false
                          });
                        }}
                        className="p-0.5 hover:bg-stone-100 active:scale-90 transition-transform rounded-full cursor-pointer text-stone-750"
                      >
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-current flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        </div>
                      </button>
                    </div>
                  </header>

                  {/* Body Page Main viewport */}
                  <main className="flex-1 overflow-y-auto custom-scrollbar px-5 py-5 scroll-smooth bg-[#f8f9fa] max-h-[calc(100vh-140px)] select-text">
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

                  {/* Elegant Floating WeChat-style Bottom tab bar navigation */}
                  <nav className="bg-white border-t border-stone-200/50 py-3 px-3 flex items-center justify-around select-none shrink-0 z-40">
                    {/* Tab 1 */}
                    <button 
                      onClick={() => setActiveTab('home')}
                      className={`flex flex-col items-center gap-0.5 transition-all text-[10px] font-bold cursor-pointer flex-1 ${
                        activeTab === 'home' ? 'text-[#07C160] scale-102 font-bold' : 'text-stone-400 hover:text-stone-700'
                      }`}
                    >
                      <Home className="w-5 h-5" />
                      <span>首页</span>
                    </button>

                    {/* Tab 2 */}
                    <button 
                      onClick={() => setActiveTab('wardrobe')}
                      className={`flex flex-col items-center gap-0.5 transition-all text-[10px] font-bold cursor-pointer flex-1 ${
                        activeTab === 'wardrobe' ? 'text-[#07C160] scale-102 font-bold' : 'text-stone-400 hover:text-stone-700'
                      }`}
                    >
                      <Shirt className="w-5 h-5" />
                      <span>衣橱</span>
                    </button>

                    {/* Tab 3 */}
                    <button 
                      onClick={() => setActiveTab('match')}
                      className={`flex flex-col items-center gap-0.5 transition-all text-[10px] font-bold cursor-pointer flex-1 ${
                        activeTab === 'match' ? 'text-[#07C160] scale-102 font-bold' : 'text-stone-400 hover:text-stone-700 font-medium'
                      }`}
                    >
                      <div className="relative p-1 rounded-full border border-stone-100 bg-stone-50/50 hover:bg-stone-50 flex items-center justify-center">
                        <Sparkles className="w-4.5 h-4.5" />
                      </div>
                      <span>搭配</span>
                    </button>

                    {/* Tab 4 */}
                    <button 
                      onClick={() => setActiveTab('calendar')}
                      className={`flex flex-col items-center gap-0.5 transition-all text-[10px] font-bold cursor-pointer flex-1 ${
                        activeTab === 'calendar' ? 'text-[#07C160] scale-102 font-bold' : 'text-stone-400 hover:text-stone-700'
                      }`}
                    >
                      <Calendar className="w-5 h-5" />
                      <span>日历</span>
                    </button>

                    {/* Tab 5 */}
                    <button 
                      onClick={() => setActiveTab('mine')}
                      className={`flex flex-col items-center gap-0.5 transition-all text-[10px] font-bold cursor-pointer flex-1 ${
                        activeTab === 'mine' ? 'text-[#07C160] scale-102 font-bold' : 'text-stone-400 hover:text-stone-700'
                      }`}
                    >
                      <User className="w-5.5 h-5.5" />
                      <span>我的</span>
                    </button>
                  </nav>
                </div>
              )}

              {/* iOS Bottom Swipe line indicator overlay */}
              <div className="w-full h-5 bg-white shrink-0 flex items-center justify-center select-none">
                <div className="w-32 h-1 bg-stone-300 rounded-full" />
              </div>

              {/* WeChat Mini Program default Loading Splash Screen overlay */}
              {launchState === 'launching' && (
                <div className="absolute inset-0 z-50 bg-white flex flex-col justify-between items-center py-20 animate-fadeIn select-none">
                  <div />
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-18 h-18 rounded-full bg-stone-950 flex items-center justify-center shadow-md relative">
                      <Shirt className="w-9 h-9 text-white animate-pulse" />
                      <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#07C160] border border-white" />
                    </div>
                    <div className="flex flex-col items-center gap-1.5 text-center px-4">
                      <h2 className="font-sans font-bold text-base text-stone-900 tracking-wider">Vogue AI 穿搭助手</h2>
                      <span className="text-xs text-stone-400 font-semibold">微信小程序 · AI造型专属沙盒</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-1.5 justify-center pb-3">
                      <span className="w-2 h-2 rounded-full bg-[#07C160] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[#07C160] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[#07C160] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <p className="text-[9px] text-stone-300 font-mono tracking-widest leading-none">WeChat Secure Engine Tunnel</p>
                  </div>
                </div>
              )}

              {/* Custom High fidelity WeChat Style Modal alert box overlay */}
              {weChatAlert?.isOpen && (
                <div className="absolute inset-0 z-55 bg-black/55 backdrop-blur-[1px] flex items-center justify-center p-6 select-none animate-fadeIn">
                  <div className="bg-white rounded-2xl w-full max-w-[280px] overflow-hidden shadow-xl transform animate-scaleIn border border-stone-100">
                    <div className="pt-6 px-5 pb-4 text-center">
                      <h3 className="text-sm font-bold text-stone-900 mb-2">{weChatAlert.title}</h3>
                      <p className="text-[12px] text-stone-500 whitespace-pre-wrap leading-relaxed">
                        {weChatAlert.message}
                      </p>
                    </div>
                    <div className="border-t border-stone-200/80 flex items-center text-center">
                      {weChatAlert.showCancel && (
                        <button 
                          onClick={() => {
                            if (weChatAlert.onCancel) weChatAlert.onCancel();
                            setWeChatAlert(null);
                          }}
                          className="flex-1 py-3 text-sm font-medium text-stone-500 hover:bg-stone-50 active:bg-stone-100 border-r border-stone-200 flex items-center justify-center cursor-pointer"
                        >
                          取消
                        </button>
                      )}
                      <button 
                        onClick={() => {
                          if (weChatAlert.onConfirm) weChatAlert.onConfirm();
                          setWeChatAlert(null);
                        }}
                        className="flex-1 py-3 text-sm font-bold text-[#576B95] hover:bg-stone-50 active:bg-stone-100 flex items-center justify-center cursor-pointer"
                      >
                        确定
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Classic WeChat bottom drawer options capsule menu overlay */}
              {isCapsuleMenuOpen && (
                <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-[1px] flex flex-col justify-end">
                  <div className="flex-1 cursor-pointer" onClick={() => setIsCapsuleMenuOpen(false)} />
                  <div className="bg-[#f7f7f7] rounded-t-[20px] px-5 pt-5 pb-6 space-y-5 animate-slideUp border-t border-stone-200 select-none">
                    <div className="flex items-center justify-between border-b border-stone-200/55 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-stone-950 flex items-center justify-center">
                          <Shirt className="w-4.5 h-4.5 text-white" />
                        </div>
                        <div className="text-left">
                          <h4 className="text-xs font-bold text-stone-800 leading-none mb-1">Vogue AI 穿搭助手</h4>
                          <p className="text-[9px] text-stone-400">评分 · 3D试穿 · 行程日志管理</p>
                        </div>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-stone-200/60 text-stone-500 font-semibold">
                        ★ 三星服务商
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-y-4 text-center">
                      {/* Share Card */}
                      <button 
                        onClick={() => {
                          setIsCapsuleMenuOpen(false);
                          setWeChatAlert({
                            isOpen: true,
                            title: '转发成功',
                            message: '已成功生成微信 Mini Card 方案转发链！对方可以直接在当前微信沙盒内开启体验。',
                            showCancel: false
                          });
                        }}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-stone-150 transform group-active:scale-95 transition-transform shadow-xs">
                          <Send className="w-5 h-5 text-stone-700" />
                        </div>
                        <span className="text-[10px] text-stone-600 block">转发好友</span>
                      </button>

                      {/* Moments */}
                      <button 
                        onClick={() => {
                          setIsCapsuleMenuOpen(false);
                          setWeChatAlert({
                            isOpen: true,
                            title: '保存到图库',
                            message: '您的今日推荐卡片 【先锋风呢子大衣】 高清试穿渲染图已经成功保存在系统相层，去朋友圈晒一晒风格吧！',
                            showCancel: false
                          });
                        }}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-stone-150 transform group-active:scale-95 transition-transform shadow-xs">
                          <Sparkles className="w-5 h-5 text-yellow-500" />
                        </div>
                        <span className="text-[10px] text-stone-600 block">朋友圈</span>
                      </button>

                      {/* Add to shortcut */}
                      <button 
                        onClick={() => {
                          setIsCapsuleMenuOpen(false);
                          setWeChatAlert({
                            isOpen: true,
                            title: '固定成功',
                            message: '已将 Vogue AI 将永久加入到您的微信“我的小程序”列表。可在首页轻扫下拉极速一键唤醒！',
                            showCancel: false
                          });
                        }}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-stone-150 transform group-active:scale-95 transition-transform shadow-xs">
                          <Heart className="w-5 h-5 text-[#07C160]" />
                        </div>
                        <span className="text-[10px] text-stone-600 block">置顶小程序</span>
                      </button>

                      {/* Reload info */}
                      <button 
                        onClick={() => {
                          setIsCapsuleMenuOpen(false);
                          setLaunchState('launching');
                          setTimeout(() => {
                            setLaunchState('open');
                          }, 1200);
                        }}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-stone-150 transform group-active:scale-95 transition-transform shadow-xs">
                          <RotateCw className="w-5 h-5 text-teal-600" />
                        </div>
                        <span className="text-[10px] text-stone-600 block">重启小程序</span>
                      </button>

                      {/* About info */}
                      <button 
                        onClick={() => {
                          setIsCapsuleMenuOpen(false);
                          setWeChatAlert({
                            isOpen: true,
                            title: '关于 Vogue AI',
                            message: '小程序：Vogue AI v2.4.1\n算法引擎：Gemini Personalization Core\n功能模块：3D虚拟试配对、多季风大衣日历、智能抠图剔景，全自动化入仓系统。\n开发商：VOGUE PERSONALITY TECH CO.',
                            showCancel: false
                          });
                        }}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-stone-150 transform group-active:scale-95 transition-transform shadow-xs">
                          <HelpCircle className="w-5 h-5 text-stone-500" />
                        </div>
                        <span className="text-[10px] text-stone-600 block">关于小程序</span>
                      </button>

                      {/* Reset permission */}
                      <button 
                        onClick={() => {
                          setIsCapsuleMenuOpen(false);
                          setWeChatAlert({
                            isOpen: true,
                            title: '微信沙盒设定',
                            message: '已成功配置：相机拍摄权限（智能录入）、写入相册特征权限、基本个人数据获取服务。',
                            showCancel: false
                          });
                        }}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-stone-150 transform group-active:scale-95 transition-transform shadow-xs">
                          <User className="w-5 h-5 text-stone-500" />
                        </div>
                        <span className="text-[10px] text-stone-600 block">设置权限</span>
                      </button>

                      {/* Feedback item */}
                      <button 
                        onClick={() => {
                          setIsCapsuleMenuOpen(false);
                          setWeChatAlert({
                            isOpen: true,
                            title: '意见反馈已递交',
                            message: '微信已打包装载您的运行栈，我们的研发造型客服将于24小时内联系您。感谢支持！',
                            showCancel: false
                          });
                        }}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-stone-150 transform group-active:scale-95 transition-transform shadow-xs">
                          <Eye className="w-5 h-5 text-stone-500" />
                        </div>
                        <span className="text-[10px] text-stone-600 block">反馈建议</span>
                      </button>

                      {/* Exit program */}
                      <button 
                        onClick={() => {
                          setIsCapsuleMenuOpen(false);
                          setIsWeChatActive(true);
                        }}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-rose-50 hover:bg-rose-100 flex items-center justify-center border border-rose-100 transform group-active:scale-95 transition-transform shadow-xs">
                          <span className="text-xs text-rose-600 font-bold">✕</span>
                        </div>
                        <span className="text-[10px] text-rose-600 block font-bold">退出程序</span>
                      </button>
                    </div>

                    <button 
                      onClick={() => setIsCapsuleMenuOpen(false)}
                      className="w-full bg-white active:bg-stone-50 transition-colors py-2.5 rounded-xl text-xs font-bold text-stone-700 shadow-xs border border-stone-200 cursor-pointer flex items-center justify-center"
                    >
                      取消
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Right Hand: Elegant Developer Interactive Workbench (Shown on Desktop) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-start space-y-6 bg-white/70 border border-stone-200/40 rounded-[28px] p-7 md:p-8 shadow-xl hidden lg:flex leading-relaxed max-w-lg">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#07C160]/10 text-[#07C160] text-xs font-bold font-mono tracking-wide">
              MOCK SANDBOX ACTIVE
            </span>
            <span className="text-xs text-stone-400">·</span>
            <span className="text-xs text-stone-500 font-medium">微信小程序高保真沙盒</span>
          </div>
          
          <div className="space-y-2 text-left">
            <h1 className="text-2xl font-black text-stone-900 tracking-tight flex items-center gap-1.5">
              Vogue AI 穿搭助手 📱
            </h1>
            <p className="text-xs text-stone-500 font-medium">
              自适应手机壳套框架 · 双重沙盒链路完美融合
            </p>
          </div>

          <div className="space-y-4 text-stone-600 text-xs text-left">
            <p className="leading-relaxed">
              根据您的需要，我已经成功将此 AI 穿搭应用程序升级并<strong>重构为微信小程序高保真运行沙盒</strong>。
            </p>
            
            <div className="space-y-2.5 bg-stone-50/60 border border-stone-150 p-4 rounded-xl text-left">
              <h3 className="font-bold text-stone-850 flex items-center gap-1.5 text-xs text-stone-900">
                ⚡ 标准微信小程序特色交互体验点：
              </h3>
              <ul className="space-y-1.5 list-none pl-1 text-[11px] text-stone-600">
                <li className="flex items-start gap-1">
                  <span className="text-[#07C160]">❶</span>
                  <span><strong>经典胶囊按键 (Capsule Bar)</strong>：右上角带有 <code>...</code>（呼出小程序抽屉）和 <code>O</code>（无缝最小化退回微信）。</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-[#07C160]">❷</span>
                  <span><strong>微信聊天会话 (Chat Hub)</strong>：最小化后进入微信，可与造型师 <strong>林夏 🌸</strong> 发送推荐对话并接收即时 AI 风格答复。</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-[#07C160]">❸</span>
                  <span><strong>微信快捷下拉桌面 (Swipe Drawer)</strong>：微信列表页下拉触发“小程序快置顶桌面”，一键重新启用。</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-[#07C160]">❹</span>
                  <span><strong>无侵入 Alert 劫持转换</strong>：所有子页面的浏览器 <code>alert()</code> 已全自动拦截，重绘为优雅的微信Modal。</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-left">
            <h4 className="text-xs font-bold text-stone-800">🛠️ 沙盒一键辅助控制器：</h4>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => {
                  setIsWeChatActive(true);
                  setActiveWeChatView('chat_linxia');
                }}
                className="px-3.5 py-2 rounded-xl bg-stone-900 text-white font-bold text-[11px] flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-transform"
              >
                💬 呼出林夏微信对话
              </button>
              
              <button 
                onClick={() => {
                  setIsWeChatActive(false);
                  setLaunchState('launching');
                  setTimeout(() => {
                    setLaunchState('open');
                  }, 1200);
                }}
                className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-[11px] flex items-center gap-1.5 cursor-pointer active:scale-95 transition-transform border border-stone-200"
              >
                🔄 重启小程序 (Splash)
              </button>
              
              <button 
                onClick={() => {
                  setWeChatAlert({
                    isOpen: true,
                    title: '测试微信号支付',
                    message: '微信卡密代扣服务正常，本次沙盒操作不计入账单。',
                    showCancel: true
                  });
                }}
                className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-[11px] flex items-center gap-1.5 cursor-pointer active:scale-95 transition-transform border border-stone-200"
              >
                💳 模拟微信支付凭证
              </button>
            </div>
          </div>

          <div className="border-t border-stone-200/55 pt-4 flex items-center justify-between text-[11px] text-stone-400">
            <span>演示版本：v2.4.1 (Stable Release)</span>
            <span>华东地区 · 上海 22°C</span>
          </div>

        </div>

      </div>

      {/* Global Sidebar Menu Drawer */}
      <NavDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        userProfile={userProfile}
        onChangeTab={(tab) => setActiveTab(tab)}
      />

    </div>
  );
}
