const app = getApp()
const { formatDate } = require('../../utils/util')

Page({
  data: {
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    selectedDate: null,
    calendarDays: [],
    selectedOutfit: null,
    stats: {
      totalDays: 0,
      recordedDays: 0,
      streak: 3
    }
  },

  onLoad() {
    const today = new Date()
    const selectedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    
    this.setData({ selectedDate })
    this.generateCalendar()
    this.loadSelectedDateOutfit()
  },

  onShow() {
    this.generateCalendar()
    this.loadSelectedDateOutfit()
  },

  generateCalendar() {
    const { currentYear, currentMonth, selectedDate } = this.data
    const today = new Date()
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const startWeekDay = firstDay.getDay()
    
    const days = []
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate()
    
    for (let i = startWeekDay - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i
      const date = new Date(currentYear, currentMonth - 1, day)
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      days.push({
        day,
        date: dateStr,
        currentMonth: false,
        isToday: dateStr === todayStr,
        isSelected: dateStr === selectedDate,
        hasOutfit: this.hasOutfitForDate(dateStr)
      })
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
      days.push({
        day: i,
        date: dateStr,
        currentMonth: true,
        isToday: dateStr === todayStr,
        isSelected: dateStr === selectedDate,
        hasOutfit: this.hasOutfitForDate(dateStr)
      })
    }
    
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(currentYear, currentMonth + 1, i)
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      days.push({
        day: i,
        date: dateStr,
        currentMonth: false,
        isToday: dateStr === todayStr,
        isSelected: dateStr === selectedDate,
        hasOutfit: this.hasOutfitForDate(dateStr)
      })
    }

    const recordedDays = days.filter(d => d.currentMonth && d.hasOutfit).length

    this.setData({
      calendarDays: days,
      currentMonthLabel: `${currentYear}年${currentMonth + 1}月`,
      selectedDateLabel: this.formatSelectedDateLabel(),
      'stats.totalDays': lastDay.getDate(),
      'stats.recordedDays': recordedDays
    })
  },

  hasOutfitForDate(dateStr) {
    return app.globalData.calendarLogs && app.globalData.calendarLogs[dateStr]
  },

  formatSelectedDateLabel() {
    const { selectedDate } = this.data
    if (!selectedDate) return '选择日期'
    const [year, month, day] = selectedDate.split('-')
    return `${parseInt(month)}月${parseInt(day)}日`
  },

  onPrevMonth() {
    let { currentYear, currentMonth } = this.data
    currentMonth--
    if (currentMonth < 0) {
      currentMonth = 11
      currentYear--
    }
    this.setData({ currentYear, currentMonth })
    this.generateCalendar()
  },

  onNextMonth() {
    let { currentYear, currentMonth } = this.data
    currentMonth++
    if (currentMonth > 11) {
      currentMonth = 0
      currentYear++
    }
    this.setData({ currentYear, currentMonth })
    this.generateCalendar()
  },

  onSelectDate(e) {
    const date = e.currentTarget.dataset.date
    this.setData({ selectedDate: date })
    this.generateCalendar()
    this.loadSelectedDateOutfit()
  },

  loadSelectedDateOutfit() {
    const { selectedDate } = this.data
    if (!selectedDate) return

    if (app.globalData.calendarLogs && app.globalData.calendarLogs[selectedDate]) {
      this.setData({ selectedOutfit: app.globalData.calendarLogs[selectedDate] })
    } else {
      this.setData({ selectedOutfit: null })
    }
  },

  onAddOutfit() {
    const savedOutfits = app.globalData.savedOutfits || []
    if (savedOutfits.length === 0) {
      wx.showToast({ title: '还没有保存的搭配', icon: 'none' })
      return
    }

    wx.showActionSheet({
      itemList: savedOutfits.slice(0, 6).map(o => o.style),
      success: (res) => {
        const outfit = savedOutfits[res.tapIndex]
        if (!app.globalData.calendarLogs) {
          app.globalData.calendarLogs = {}
        }
        app.globalData.calendarLogs[this.data.selectedDate] = outfit
        this.loadSelectedDateOutfit()
        this.generateCalendar()
        wx.showToast({ title: '已添加', icon: 'success' })
      }
    })
  },

  onRemoveOutfit() {
    wx.showModal({
      title: '确认移除',
      content: '确定要移除这天的穿搭记录吗？',
      success: (res) => {
        if (res.confirm) {
          if (app.globalData.calendarLogs) {
            delete app.globalData.calendarLogs[this.data.selectedDate]
          }
          this.loadSelectedDateOutfit()
          this.generateCalendar()
          wx.showToast({ title: '已移除', icon: 'success' })
        }
      }
    })
  }
})
