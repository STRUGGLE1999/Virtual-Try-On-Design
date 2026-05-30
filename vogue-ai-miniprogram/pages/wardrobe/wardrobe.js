const app = getApp();

Page({
  data: {
    wardrobeItems: [],
    pendingQueue: [],
    searchQuery: '',
    selectedFilter: 'all',
    selectedQueueId: '',
    isClassifying: false,
    scannedNotify: '',
    filteredItems: [],
    filterTabs: [
      { key: 'all', label: '全部' },
      { key: 'top', label: '上装' },
      { key: 'bottom', label: '下装' },
      { key: 'outerwear', label: '外套' }
    ]
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
      wardrobeItems: globalData.wardrobeItems,
      pendingQueue: globalData.pendingQueue
    });
    
    if (globalData.pendingQueue.length > 0 && !this.data.selectedQueueId) {
      this.setData({ selectedQueueId: globalData.pendingQueue[0].id });
    }
    
    this.updateFilteredItems();
  },

  updateFilteredItems() {
    const { wardrobeItems, searchQuery, selectedFilter } = this.data;
    
    let filtered = wardrobeItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedFilter === 'all' || item.category === selectedFilter;
      return matchesSearch && matchesCategory;
    });
    
    this.setData({ filteredItems: filtered });
  },

  onSearchInput(e) {
    this.setData({ searchQuery: e.detail.value });
    this.updateFilteredItems();
  },

  onFilterChange(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({ selectedFilter: filter });
    this.updateFilteredItems();
  },

  selectQueueItem(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({ selectedQueueId: id });
  },

  onAIScan() {
    const selectedItem = this.data.pendingQueue.find(item => item.id === this.data.selectedQueueId);
    if (!selectedItem) return;
    
    this.setData({ isClassifying: true });
    
    setTimeout(() => {
      this.setData({
        isClassifying: false,
        scannedNotify: `AI 已重新精确扫描 【${selectedItem.name}】，匹配度达到 99%！`
      });
      
      setTimeout(() => {
        this.setData({ scannedNotify: '' });
      }, 3000);
    }, 1200);
  },

  onDeposit() {
    const selectedItem = this.data.pendingQueue.find(item => item.id === this.data.selectedQueueId);
    if (!selectedItem) return;
    
    const deposited = {
      ...selectedItem,
      id: `item_dep_${Date.now()}`,
      isWornCount: 1,
      isRecentFavorite: true,
      dateAdded: new Date().toISOString().slice(0, 10)
    };
    
    app.globalData.wardrobeItems.unshift(deposited);
    app.globalData.pendingQueue = app.globalData.pendingQueue.filter(item => item.id !== this.data.selectedQueueId);
    
    const remaining = app.globalData.pendingQueue;
    if (remaining.length > 0) {
      this.setData({ selectedQueueId: remaining[0].id });
    } else {
      this.setData({ selectedQueueId: '' });
    }
    
    this.setData({
      wardrobeItems: app.globalData.wardrobeItems,
      pendingQueue: app.globalData.pendingQueue
    });
    this.updateFilteredItems();
    
    wx.showToast({
      title: `【${selectedItem.name}】已入库`,
      icon: 'success'
    });
  },

  onAddQueueItem() {
    wx.showModal({
      title: '添加单品',
      placeholderText: '输入上传衣物名称',
      content: '真丝长款吊带裙',
      success: (res) => {
        if (res.confirm) {
          wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            success: (res) => {
              const tempFilePath = res.tempFiles[0].tempFilePath;
              const newItem = {
                id: `pending_${Date.now()}`,
                name: '待识别单品',
                brand: '用户上传',
                category: 'top',
                categoryLabel: '上装',
                tags: ['#待识别'],
                material: '待识别',
                colorName: '待识别',
                colorHex: '#888888',
                imageUrl: tempFilePath,
                isWornCount: 0,
                isRecentFavorite: false,
                season: '待识别',
                dateAdded: new Date().toISOString().slice(0, 10)
              };
              
              app.globalData.pendingQueue.push(newItem);
              this.setData({
                pendingQueue: app.globalData.pendingQueue,
                selectedQueueId: newItem.id
              });
              
              wx.showToast({
                title: '已添加到识别队列',
                icon: 'success'
              });
            }
          });
        }
      }
    });
  },

  showItemDetail(e) {
    const item = e.currentTarget.dataset.item;
    wx.showModal({
      title: `${item.brand} ${item.name}`,
      content: `颜色: ${item.colorName}\n复穿频次: ${item.isWornCount}次\n材质: ${item.material}`,
      showCancel: false
    });
  }
});
