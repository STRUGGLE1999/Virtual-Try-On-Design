const app = getApp()
const { formatDate } = require('../../utils/util')

Page({
  data: {
    styles: [
      { id: 'casual', name: '休闲日常', desc: '舒适自在', icon: '☕' },
      { id: 'formal', name: '商务通勤', desc: '专业得体', icon: '💼' },
      { id: 'date', name: '浪漫约会', desc: '精致迷人', icon: '🌹' },
      { id: 'sport', name: '运动活力', desc: '元气满满', icon: '🏃' }
    ],
    selectedStyle: 'casual',
    wardrobeItems: [],
    savedOutfits: [],
    generatedOutfit: null
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const wardrobeItems = app.globalData.wardrobeItems
    const savedOutfits = app.globalData.savedOutfits || []
    
    this.setData({
      wardrobeItems,
      savedOutfits: savedOutfits.map(o => ({
        ...o,
        date: formatDate(o.date)
      }))
    })

    if (wardrobeItems.length >= 3) {
      this.generateOutfit()
    }
  },

  onSelectStyle(e) {
    const id = e.currentTarget.dataset.id
    this.setData({ selectedStyle: id })
    this.generateOutfit()
  },

  generateOutfit() {
    const tops = this.data.wardrobeItems.filter(i => 
      i.category === 'Tops' || i.category === '上装' || i.category === '外套' || i.category === 'Outerwear'
    )
    const bottoms = this.data.wardrobeItems.filter(i => 
      i.category === 'Bottoms' || i.category === '下装'
    )
    const shoes = this.data.wardrobeItems.filter(i => 
      i.category === 'Shoes' || i.category === '鞋履'
    )

    if (tops.length && bottoms.length && shoes.length) {
      const generatedOutfit = {
        top: tops[Math.floor(Math.random() * tops.length)],
        bottom: bottoms[Math.floor(Math.random() * bottoms.length)],
        shoes: shoes[Math.floor(Math.random() * shoes.length)]
      }
      this.setData({ generatedOutfit })
    }
  },

  onRegenerate() {
    this.generateOutfit()
  },

  onReplaceItem(e) {
    const slot = e.currentTarget.dataset.slot
    const items = this.data.wardrobeItems.filter(i => {
      if (slot === 'top') return i.category === 'Tops' || i.category === '上装' || i.category === '外套' || i.category === 'Outerwear'
      if (slot === 'bottom') return i.category === 'Bottoms' || i.category === '下装'
      if (slot === 'shoes') return i.category === 'Shoes' || i.category === '鞋履'
      return false
    })

    if (items.length > 1) {
      const current = this.data.generatedOutfit[slot]
      let newItem
      do {
        newItem = items[Math.floor(Math.random() * items.length)]
      } while (newItem.id === current.id && items.length > 1)

      this.setData({
        [`generatedOutfit.${slot}`]: newItem
      })
    }
  },

  onSaveOutfit() {
    if (!this.data.generatedOutfit) return

    const styleNames = {
      'casual': '休闲日常',
      'formal': '商务通勤',
      'date': '浪漫约会',
      'sport': '运动活力'
    }

    const newOutfit = {
      id: Date.now().toString(),
      items: [
        this.data.generatedOutfit.top,
        this.data.generatedOutfit.bottom,
        this.data.generatedOutfit.shoes
      ],
      style: styleNames[this.data.selectedStyle] || '自定义',
      date: new Date().toISOString()
    }

    if (!app.globalData.savedOutfits) {
      app.globalData.savedOutfits = []
    }
    app.globalData.savedOutfits.unshift(newOutfit)

    wx.showToast({ title: '已保存搭配', icon: 'success' })
    this.setData({
      savedOutfits: app.globalData.savedOutfits.map(o => ({
        ...o,
        date: formatDate(o.date)
      }))
    })
  },

  onOpenCamera() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera', 'album'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        wx.navigateTo({
          url: `/pages/capture/capture?image=${encodeURIComponent(tempFilePath)}`
        })
      }
    })
  },

  onViewAllOutfits() {
    wx.showToast({ title: '全部搭配页面开发中', icon: 'none' })
  }
})
