const app = getApp()

Page({
  data: {
    userProfile: null,
    wardrobeCount: 0,
    outfitCount: 0,
    streak: 3
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    this.setData({
      userProfile: app.globalData.userProfile,
      wardrobeCount: app.globalData.wardrobeItems.length,
      outfitCount: (app.globalData.savedOutfits || []).length
    })
  }
})
