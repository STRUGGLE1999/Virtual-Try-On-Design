const app = getApp()

Page({
  data: {
    categories: [
      { id: 'all', label: '全部' },
      { id: 'Tops', label: '上装' },
      { id: 'Bottoms', label: '下装' },
      { id: 'Outerwear', label: '外套' },
      { id: 'Shoes', label: '鞋履' },
      { id: 'Accessories', label: '配饰' }
    ],
    activeCategory: 'all',
    items: [],
    filteredItems: [],
    selectedItem: null
  },

  onLoad() {
    this.loadItems()
  },

  onShow() {
    this.loadItems()
  },

  loadItems() {
    const items = app.globalData.wardrobeItems
    this.setData({ items })
    this.filterItems()
  },

  filterItems() {
    const { activeCategory, items } = this.data
    let filteredItems = items

    if (activeCategory !== 'all') {
      filteredItems = items.filter(item => 
        item.category === activeCategory || 
        item.category === this.getCategoryLabel(activeCategory)
      )
    }

    this.setData({ filteredItems })
  },

  getCategoryLabel(id) {
    const map = {
      'Tops': '上装',
      'Bottoms': '下装',
      'Outerwear': '外套',
      'Shoes': '鞋履',
      'Accessories': '配饰'
    }
    return map[id] || id
  },

  onSelectCategory(e) {
    const id = e.currentTarget.dataset.id
    this.setData({ activeCategory: id })
    this.filterItems()
  },

  onViewItem(e) {
    const item = e.currentTarget.dataset.item
    this.setData({ selectedItem: item })
  },

  onCloseItem() {
    this.setData({ selectedItem: null })
  },

  onToggleFavorite(e) {
    const id = e.currentTarget.dataset.id
    const items = app.globalData.wardrobeItems.map(item => {
      if (item.id === id) {
        return { ...item, isFavorite: !item.isFavorite }
      }
      return item
    })
    app.globalData.wardrobeItems = items
    this.loadItems()
    
    if (this.data.selectedItem && this.data.selectedItem.id === id) {
      const updated = items.find(i => i.id === id)
      this.setData({ selectedItem: updated })
    }
  },

  onDeleteItem(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这件衣物吗？',
      success: (res) => {
        if (res.confirm) {
          app.globalData.wardrobeItems = app.globalData.wardrobeItems.filter(i => i.id !== id)
          this.loadItems()
          this.setData({ selectedItem: null })
          wx.showToast({ title: '已删除', icon: 'success' })
        }
      }
    })
  },

  onEditItem(e) {
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/capture/capture?editId=${item.id}`
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

  onOpenSearch() {
    // 暂时使用 toast
    wx.showToast({ title: '搜索功能开发中', icon: 'none' })
  },

  getSeasonBg(season) {
    const map = {
      '春': 'bg-green-50',
      '夏': 'bg-blue-50',
      '秋': 'bg-amber-50',
      '冬': 'bg-stone-100',
      '四季': 'bg-purple-50',
      'Spring': 'bg-green-50',
      'Summer': 'bg-blue-50',
      'Fall': 'bg-amber-50',
      'Winter': 'bg-stone-100',
      'All-season': 'bg-purple-50'
    }
    return map[season] || 'bg-stone-100'
  },

  getSeasonText(season) {
    const map = {
      '春': 'text-emerald-700',
      '夏': 'text-blue-600',
      '秋': 'text-amber-900',
      '冬': 'text-stone-600',
      '四季': 'text-purple-900',
      'Spring': 'text-emerald-700',
      'Summer': 'text-blue-600',
      'Fall': 'text-amber-900',
      'Winter': 'text-stone-600',
      'All-season': 'text-purple-900'
    }
    return map[season] || 'text-stone-600'
  },

  getColorBg(color) {
    const map = {
      '黑色': 'bg-black text-white',
      '白色': 'bg-stone-100',
      '红色': 'bg-red-500 text-white',
      '蓝色': 'bg-blue-600 text-white',
      '绿色': 'bg-emerald-600 text-white',
      '黄色': 'bg-yellow-400',
      '粉色': 'bg-pink-200',
      '紫色': 'bg-purple-600 text-white',
      '灰色': 'bg-stone-400 text-white',
      '棕色': 'bg-amber-800 text-white',
      '米色': 'bg-amber-100',
      'Orange': 'bg-orange-500 text-white',
      'Black': 'bg-black text-white',
      'White': 'bg-stone-100'
    }
    return map[color] || 'bg-stone-100'
  }
})
