const app = getApp();

Page({
  data: {
    selectedDate: '2026-05-13',
    calendarLogs: [],
    activeLog: null,
    weekDays: ['日', '一', '二', '三', '四', '五', '六'],
    offsetDays: 5,
    calDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    showFeedbackForm: false,
    feedbackText: ''
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const globalData = app.globalData;
    this.setData({
      calendarLogs: globalData.calendarLogs
    });
    this.updateActiveLog();
  },

  updateActiveLog() {
    const log = this.data.calendarLogs.find(l => l.date === this.data.selectedDate);
    this.setData({ activeLog: log || null });
  },

  getDayClass(dayData, day) {
    const dateStr = `2026-05-${day.toString().padStart(2, '0')}`;
    const logEntry = this.data.calendarLogs.find(l => l.date === dateStr);
    const isToday = dateStr === '2026-05-13';
    const isSelected = dateStr === this.data.selectedDate;
    
    let classes = 'calendar-day ';
    
    if (isSelected) {
      classes += 'calendar-day-selected ';
    } else if (isToday) {
      classes += 'calendar-day-today ';
    } else if (logEntry) {
      classes += 'calendar-day-logged ';
    }
    
    return classes;
  },

  onDaySelect(e) {
    const day = e.currentTarget.dataset.day;
    const dateStr = `2026-05-${day.toString().padStart(2, '0')}`;
    this.setData({ selectedDate: dateStr });
    this.updateActiveLog();
  },

  formatDate(dateStr) {
    const parts = dateStr.split('-');
    return `${parts[0]}年${parseInt(parts[1])}月${parseInt(parts[2])}日`;
  },

  onRatingChange(e) {
    const rating = e.currentTarget.dataset.rating;
    const globalData = app.globalData;
    
    const updatedLogs = globalData.calendarLogs.map(log => {
      if (log.date === this.data.selectedDate) {
        return { ...log, rating };
      }
      return log;
    });
    
    globalData.calendarLogs = updatedLogs;
    this.setData({ calendarLogs: updatedLogs });
    this.updateActiveLog();
  },

  onToggleAlert() {
    const globalData = app.globalData;
    
    const updatedLogs = globalData.calendarLogs.map(log => {
      if (log.date === this.data.selectedDate) {
        return { ...log, repeatAlert: !log.repeatAlert };
      }
      return log;
    });
    
    globalData.calendarLogs = updatedLogs;
    this.setData({ calendarLogs: updatedLogs });
    this.updateActiveLog();
  },

  onAddCustomItem() {
    wx.showModal({
      title: '添加单品',
      placeholderText: '输入新加单品名称',
      content: '',
      success: (res) => {
        if (res.confirm && res.content) {
          const newItem = {
            id: `custom_log_item_${Date.now()}`,
            name: res.content || '珍珠毛绒围巾',
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
            dateAdded: this.data.selectedDate
          };
          
          const globalData = app.globalData;
          const updatedLogs = globalData.calendarLogs.map(log => {
            if (log.date === this.data.selectedDate) {
              return { ...log, items: [...log.items, newItem] };
            }
            return log;
          });
          
          globalData.calendarLogs = updatedLogs;
          this.setData({ calendarLogs: updatedLogs });
          this.updateActiveLog();
          
          wx.showToast({
            title: '单品已添加',
            icon: 'success'
          });
        }
      }
    });
  },

  onPrevMonth() {
    wx.showToast({
      title: '已是当前月份',
      icon: 'none'
    });
  },

  onNextMonth() {
    wx.showToast({
      title: '已是当前月份',
      icon: 'none'
    });
  },

  onHistoryFill() {
    wx.showModal({
      title: '补录历史',
      content: '补录历史功能一触即发！请选择前序任何时间并在日历格内手动记录。',
      showCancel: false
    });
  },

  onShowFeedback() {
    this.setData({ showFeedbackForm: true });
  },

  onCloseFeedback() {
    this.setData({ showFeedbackForm: false, feedbackText: '' });
  },

  onFeedbackInput(e) {
    this.setData({ feedbackText: e.detail.value });
  },

  onSubmitFeedback() {
    if (!this.data.feedbackText.trim()) {
      wx.showToast({
        title: '请输入反馈内容',
        icon: 'none'
      });
      return;
    }
    
    wx.showToast({
      title: '反馈已提交',
      icon: 'success'
    });
    
    this.setData({ showFeedbackForm: false, feedbackText: '' });
  }
});
