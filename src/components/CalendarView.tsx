/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Plus, Star, BellRing, BellOff,
  History, Calendar, ClipboardCheck, Award, TrendingUp, Lightbulb, Sparkles
} from 'lucide-react';
import { CalendarLog, WardrobeItem } from '../types';

interface CalendarViewProps {
  logs: CalendarLog[];
  onUpdateLogRating: (date: string, rating: number) => void;
  onUpdateLogAlert: (date: string, alert: boolean) => void;
  onAddCustomItemToLog: (date: string, itemName: string) => void;
}

export default function CalendarView({ 
  logs, 
  onUpdateLogRating, 
  onUpdateLogAlert,
  onAddCustomItemToLog
}: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState('2026-05-13');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [newLogForm, setNewLogForm] = useState({ date: '2026-05-14', title: '', score: '5' });

  // Get active log
  const activeLog = logs.find(log => log.date === selectedDate);

  // May 2026 Constants setup
  // May 1st 2026 starts on Friday (5 empty cells offset: Sun=0, Mon=1, Tue=2, Wed=3, Thu=4)
  const offsetDays = Array(5).fill(null);
  const calDays = Array.from({ length: 23 }, (_, i) => i + 1); // 1 to 23 of May

  // Check if a calendar day (e.g. 13 -> "2026-05-13") has a log.
  const getLogForDay = (day: number) => {
    const formattedDate = `2026-05-${day.toString().padStart(2, '0')}`;
    return logs.find(l => l.date === formattedDate);
  };

  const handleDaySelect = (day: number) => {
    const formattedDate = `2026-05-${day.toString().padStart(2, '0')}`;
    setSelectedDate(formattedDate);
  };

  const handleLogFeedbackSubmit = () => {
    if (!feedbackText.trim()) return;
    alert(`您的主观反馈：\n"${feedbackText}"\n已成功提交给 AI 模型，多维语义评估将在下次生成中体现！`);
    setFeedbackText('');
    setShowFeedbackForm(false);
  };

  const handleAddCustomLogItem = () => {
    const itemName = prompt('输入新加单品名称 (例如: 珍珠毛绒围巾):', '');
    if (itemName && itemName.trim()) {
      onAddCustomItemToLog(selectedDate, itemName.trim());
      alert(`已成功向 ${selectedDate} 穿搭追加暂存单品 【${itemName}】!`);
    }
  };

  return (
    <div className="space-y-8 pb-10 select-none">
      {/* Header and month controllers */}
      <section className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif font-semibold text-stone-900 leading-tight">穿搭日历</h2>
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#444748] mt-1">2026年5月</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => alert('已切换至前一个月。由于是演示配置，仅支持展示 2026 年 5 月。')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 cursor-pointer text-stone-600 active:scale-90"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => alert('展示未来记录：本年度未来推荐暂不需要补录。')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 cursor-pointer text-stone-600 active:scale-90"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Grid Calendar Area */}
      <section className="bg-white rounded-3xl p-5 border border-stone-200/60 shadow-sm animate-in fade-in duration-500">
        <div className="grid grid-cols-7 mb-3 text-center text-[10px] uppercase font-bold tracking-widest text-stone-400">
          <div>日</div>
          <div>一</div>
          <div>二</div>
          <div>三</div>
          <div>四</div>
          <div>五</div>
          <div>六</div>
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-y-3.5 gap-x-1.5 text-center text-xs font-semibold text-stone-800">
          
          {/* Empty offset days for start of month Friday */}
          {offsetDays.map((_, idx) => (
            <div key={`offset-${idx}`} className="h-10" />
          ))}

          {/* Symmetrical clickable days */}
          {calDays.map((day) => {
            const dateStr = `2026-05-${day.toString().padStart(2, '0')}`;
            const logEntry = logs.find(l => l.date === dateStr);
            const isTodayIndex = dateStr === '2026-05-13';
            const isCurrentPageSelected = dateStr === selectedDate;

            return (
              <div 
                key={day}
                onClick={() => handleDaySelect(day)}
                className={`h-10 flex items-center justify-center rounded-xl cursor-pointer transition-all ${
                  isCurrentPageSelected 
                    ? 'border-2 border-[#0041c9] text-[#0041c9] font-black font-serif bg-blue-50/20 scale-105'
                    : isTodayIndex
                      ? 'border-2 border-[#0041c9] text-[#0041c9] font-bold'
                      : logEntry 
                        ? 'bg-black text-white hover:bg-stone-800 font-bold' 
                        : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{day}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Log Detail Area */}
      <section className="bg-white rounded-3xl p-6 border border-stone-200/60 shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center mb-5 border-b border-stone-100 pb-4">
          <h3 className="text-base font-serif font-bold text-stone-950">今日穿搭记录</h3>
          <span className="bg-[#EFEBE9] uppercase tracking-wider font-bold text-[10px] text-stone-700 px-3 py-1 rounded-full">
            {selectedDate.replace(/-/g, '年').slice(0, 11)}日
          </span>
        </div>

        {activeLog ? (
          <div>
            <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-3 select-none">
              {activeLog.items.map((item, idx) => (
                <div key={item.id || idx} className="shrink-0 w-24">
                  <div className="h-32 rounded-xl bg-stone-100 mb-2 overflow-hidden border border-stone-200/50">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-[9px] uppercase font-bold tracking-widest text-[#444748] text-center truncate px-0.5">
                    {item.name}
                  </p>
                </div>
              ))}

              {/* Add item append box */}
              <div 
                onClick={handleAddCustomLogItem}
                className="shrink-0 w-24 flex flex-col items-center justify-center cursor-pointer hover:bg-stone-50 transition-colors"
              >
                <div className="h-32 rounded-xl bg-stone-50 border-2 border-dashed border-stone-200 text-stone-400 mb-2 flex items-center justify-center w-full">
                  <Plus className="w-6 h-6 text-stone-400 hover:scale-110 active:scale-95 transition-all" />
                </div>
                <p className="text-[9px] uppercase font-bold tracking-widest text-stone-400 text-center">添加单品</p>
              </div>
            </div>

            {/* Satisfaction Rating and Notification Alert Toggle */}
            <div className="mt-5 flex justify-between items-center pt-4 border-t border-stone-100">
              <div className="flex items-center gap-1.5 text-xs text-stone-700">
                <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mr-2">
                  满意度
                </span>
                
                {/* 5-star selector */}
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const filled = star <= activeLog.rating;
                    return (
                      <button 
                        key={star}
                        onClick={() => onUpdateLogRating(selectedDate, star)}
                        className="p-0.5 text-stone-300 hover:text-yellow-400 transition-colors cursor-pointer"
                      >
                        <Star className={`w-4 h-4 ${filled ? 'text-yellow-400 fill-[#FFD700]' : 'text-stone-300'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notification Toggling */}
              <button 
                onClick={() => onUpdateLogAlert(selectedDate, !activeLog.repeatAlert)}
                className={`text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer select-none transition-all ${
                  activeLog.repeatAlert 
                    ? 'bg-blue-50 text-[#0041c9] border border-blue-100/50' 
                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                }`}
              >
                {activeLog.repeatAlert ? <BellRing className="w-3 h-3" /> : <BellOff className="w-3 h-3" />}
                <span>重复提醒</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-stone-400 flex flex-col items-center">
            <Calendar className="w-8 h-8 text-stone-300 mb-2" />
            <p className="text-xs font-bold uppercase tracking-wider">这天没有登记穿搭记录</p>
            <p className="text-[10px] text-stone-300 mt-1">请选择前序标有深黑色滑块的高频日期，或补录日志。</p>
          </div>
        )}
      </section>

      {/* Statistics Bento Counters */}
      <section className="grid grid-cols-3 gap-4">
        {/* Bento cell 1 */}
        <div className="bg-stone-50/85 p-5 rounded-2xl border border-stone-200/50 text-center">
          <p className="text-3xl font-serif font-bold text-stone-900 leading-tight">12</p>
          <span className="text-[9px] uppercase font-bold tracking-widest text-[#818394] mt-1 block">累计记录</span>
        </div>

        {/* Bento cell 2 */}
        <div className="bg-stone-50/85 p-5 rounded-2xl border border-stone-200/50 text-center">
          <p className="text-3xl font-serif font-bold text-[#1A1A1A] leading-tight">64%</p>
          <span className="text-[9px] uppercase font-bold tracking-widest text-[#818394] mt-1 block">衣橱覆盖率</span>
        </div>

        {/* Bento cell 3 */}
        <div className="bg-stone-50/85 p-5 rounded-2xl border border-stone-200/50 text-center">
          <p className="text-3xl font-serif font-bold text-[#0041c9] leading-tight">5</p>
          <span className="text-[9px] uppercase font-bold tracking-widest text-[#818394] mt-1 block">连续记录</span>
        </div>
      </section>

      {/* AI Advisory insight panel */}
      <section className="bg-purple-50/80 p-5 rounded-3xl border border-stone-200/40 flex items-start gap-3.5 select-none">
        <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-serif font-bold text-sm text-stone-900 mb-0.5">AI 穿搭洞察</h4>
          <p className="text-xs text-stone-600 leading-relaxed font-medium">
            记录建议：连续记录 7 天后，系统将为您识别高频与闲置单品。
          </p>
        </div>
      </section>

      {/* Buttons quick triggers */}
      <section className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => {
            alert('补录历史功能一触即发！请选择前序任何时间并在日历格内手动记录。');
          }}
          className="flex items-center justify-center gap-2 py-4 border border-stone-900 rounded-full hover:bg-stone-50 text-xs font-bold uppercase tracking-widest font-sans transition-all cursor-pointer active:scale-95 text-stone-900"
        >
          <History className="w-4 h-4" />
          <span>补录历史</span>
        </button>

        <button 
          onClick={() => setShowFeedbackForm(true)}
          className="flex items-center justify-center gap-2 py-4 bg-[#0041c9] hover:bg-[#0356ff] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-md shadow-blue-500/10 cursor-pointer active:scale-95"
        >
          <ClipboardCheck className="w-4 h-4" />
          <span>今日反馈</span>
        </button>
      </section>

      {/* Feedback notes Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowFeedbackForm(false)} />
          <div className="relative bg-white w-full max-w-sm p-6 rounded-3xl border border-stone-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-serif font-bold text-stone-950 mb-1">提交今日反馈</h3>
            <p className="text-xs text-stone-500 mb-4">您可以写下衣服舒适度或相亲相容性的主观评测，供 AI 生成下次穿品参考：</p>
            
            <textarea 
              rows={4}
              placeholder="例如: 呢子外套保暖度极高，但内穿重磅衬里活动度略微受阻..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="w-full p-4 border border-stone-200 rounded-2xl outline-none text-xs text-stone-800 focus:ring-2 focus:ring-stone-400 placeholder:text-stone-300"
            />

            <div className="flex gap-2.5 mt-4">
              <button 
                onClick={() => {
                  setFeedbackText('');
                  setShowFeedbackForm(false);
                }}
                className="flex-1 py-3 text-xs bg-stone-100 hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-full font-bold cursor-pointer active:scale-95 transition-all text-center"
              >
                取消
              </button>
              <button 
                onClick={handleLogFeedbackSubmit}
                className="flex-1 py-3 text-xs bg-black text-white hover:bg-stone-800 rounded-full font-bold cursor-pointer active:scale-95 transition-all text-center"
              >
                送交 AI 拟真运算
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
