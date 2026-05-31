const app = getApp()

Page({
  data: {
    imageUrl: '',
    category: 'Tops',
    brand: '',
    color: '黑',
    season: '四季',
    categories: [
      { id: 'Tops', label: '上装' },
      { id: 'Bottoms', label: '下装' },
      { id: 'Outerwear', label: '外套' },
      { id: 'Shoes', label: '鞋履' },
      { id: 'Accessories', label: '配饰' }
    ],
    colors: [
      { name: '黑' },
      { name: '白' },
      { name: '蓝' },
      { name: '灰' },
      { name: '绿' },
      { name: '红' }
    ],
    seasons: [
      { name: '春' },
      { name: '夏' },
      { name: '秋' },
      { name: '冬' },
      { name: '四季' }
    ],
    editId: null
  },

  onLoad(options) {
    if (options.image) {
      this.setData({ imageUrl: decodeURIComponent(options.image) })
    }
    if (options.editId) {
      this.loadEditItem(options.editId)
    }
  },

  loadEditItem(id) {
    const item = app.globalData.wardrobeItems.find(i => i.id === id)
    if (item) {
      this.setData({
        editId: id,
        imageUrl: item.imageUrl,
        category: item.category,
        brand: item.brand || '',
        color: item.color || '黑',
        season: item.season || '四季'
      })
    }
  },

  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera', 'album'],
      success: (res) => {
        this.setData({ imageUrl: res.tempFiles[0].tempFilePath })
      }
    })
  },

  clearImage() {
    this.setData({ imageUrl: '' })
  },

  selectCategory(e) {
    this.setData({ category: e.currentTarget.dataset.id })
  },

  selectColor(e) {
    this.setData({ color: e.currentTarget.dataset.name })
  },

  selectSeason(e) {
    this.setData({ season: e.currentTarget.dataset.name })
  },

  onBrandInput(e) {
    this.setData({ brand: e.detail.value })
  },

  saveItem() {
    if (!this.data.imageUrl) {
      wx.showToast({ title: '请上传照片', icon: 'none' })
      return
    }

    const newItem = {
      id: this.data.editId || `item_${Date.now()}`,
      brand: this.data.brand,
      category: this.data.category,
      color: this.data.color,
      season: this.data.season,
      imageUrl: this.data.imageUrl,
      isFavorite: false
    }

    if (this.data.editId) {
      const index = app.globalData.wardrobeItems.findIndex(i => i.id === this.data.editId)
      if (index !== -1) {
        const oldFavorite = app.globalData.wardrobeItems[index].isFavorite
        newItem.isFavorite = oldFavorite
        app.globalData.wardrobeItems[index] = newItem
      }
    } else {
      app.globalData.wardrobeItems.unshift(newItem)
    }

    wx.showToast({ title: '保存成功', icon: 'success' })
    setTimeout(() => {
      wx.navigateBack()
    }, 1000)
  }
})
