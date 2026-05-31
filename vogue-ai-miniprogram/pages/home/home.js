const app = getApp()

Page({
  data: {
    userName: '时尚达人',
    wardrobeCount: 0,
    outfitCount: 0,
    streak: 0,
    pendingQueueCount: 0,
    currentOutfit: null,
    recentItems: []
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const wardrobeItems = app.globalData.wardrobeItems
    const recentItems = wardrobeItems.slice(0, 4)
    const pendingQueue = app.globalData.pendingQueue

    this.setData({
      userName: app.globalData.userProfile?.name || '时尚达人',
      wardrobeCount: wardrobeItems.length,
      outfitCount: app.globalData.savedOutfits?.length || 0,
      streak: 3,
      pendingQueueCount: pendingQueue.length,
      recentItems
    })

    this.generateOutfit()
  },

  generateOutfit() {
    const tops = app.globalData.wardrobeItems.filter(i => i.category === '上装' || i.category === 'Tops')
    const bottoms = app.globalData.wardrobeItems.filter(i => i.category === '下装' || i.category === 'Bottoms')
    const shoes = app.globalData.wardrobeItems.filter(i => i.category === '鞋履' || i.category === 'Shoes')

    if (tops.length && bottoms.length && shoes.length) {
      const styles = ['休闲街头', '商务通勤', '周末约会', '运动活力']
      const currentOutfit = {
        top: tops[Math.floor(Math.random() * tops.length)],
        bottom: bottoms[Math.floor(Math.random() * bottoms.length)],
        shoes: shoes[Math.floor(Math.random() * shoes.length)],
        style: styles[Math.floor(Math.random() * styles.length)]
      }
      this.setData({ currentOutfit })
    }
  },

  onRefreshOutfit() {
    this.generateOutfit()
  },

  onSaveOutfit() {
    if (!this.data.currentOutfit) return
    
    const newOutfit = {
      id: Date.now().toString(),
      items: [
        this.data.currentOutfit.top,
        this.data.currentOutfit.bottom,
        this.data.currentOutfit.shoes
      ],
      style: this.data.currentOutfit.style,
      date: new Date().toISOString()
    }

    if (!app.globalData.savedOutfits) {
      app.globalData.savedOutfits = []
    }
    app.globalData.savedOutfits.unshift(newOutfit)

    wx.showToast({ title: '已保存搭配', icon: 'success' })
    this.setData({ outfitCount: app.globalData.savedOutfits.length })
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

  onOpenMatch() {
    wx.switchTab({
      url: '/pages/match/match'
    })
  },

  onViewWardrobe() {
    wx.switchTab({
      url: '/pages/wardrobe/wardrobe'
    })
  },

  onGetUserInfo(e) {
    console.log('User info:', e.detail)
  }
})
