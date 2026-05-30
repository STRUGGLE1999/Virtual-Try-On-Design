const app = getApp();

Page({
  data: {
    activeOutfit: {
      id: 'outfit_1',
      name: '极简双面大衣西裤穿搭',
      matchScore: 92,
      wearCount: 5,
      styleRisk: '低',
      categoryTag: '简约职场',
      items: []
    },
    recentFavorites: [],
    isOutfitFavorited: false,
    showUploadModal: false,
    showTryOnModal: false,
    showShopModal: false,
    uploadedFile: '',
    dragActive: false,
    tryOnProgress: 0,
    tryOnPhase: '正在进行 3D 体型对齐...',
    hasLoggedToday: false,
    wardrobeItems: [],
    alternativeItems: []
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const globalData = app.globalData;
    
    const simulatedOutfits = [
      {
        id: 'outfit_1',
        name: '极简双面大衣西裤穿搭',
        matchScore: 92,
        wearCount: 5,
        styleRisk: '低',
        categoryTag: '简约职场',
        items: globalData.wardrobeItems.length >= 1 ? [globalData.wardrobeItems[5] || globalData.wardrobeItems[0], globalData.wardrobeItems[0], globalData.wardrobeItems[6]] : []
      },
      {
        id: 'outfit_2',
        name: '冷灰色慵懒松弛搭配',
        matchScore: 89,
        wearCount: 8,
        styleRisk: '低',
        categoryTag: '周末休闲',
        items: globalData.wardrobeItems.length >= 2 ? [globalData.wardrobeItems[3], globalData.wardrobeItems[1]] : []
      },
      {
        id: 'outfit_3',
        name: '先锋都市呢风大衣配丹宁',
        matchScore: 96,
        wearCount: 3,
        styleRisk: '中',
        categoryTag: '前卫冷感',
        items: globalData.wardrobeItems.length >= 3 ? [globalData.wardrobeItems[4], globalData.wardrobeItems[0], globalData.wardrobeItems[1]] : []
      }
    ];

    const activeIndex = globalData.activeOutfitIndex || 0;
    const activeOutfit = simulatedOutfits[activeIndex % simulatedOutfits.length];
    
    const recentFavorites = globalData.wardrobeItems.filter(item => item.isRecentFavorite).slice(0, 4);
    
    let isOutfitFavorited = false;
    if (activeOutfit.items.length > 0) {
      const primaryCoat = activeOutfit.items[0];
      const found = globalData.wardrobeItems.find(item => item.name === primaryCoat.name);
      isOutfitFavorited = found ? found.isRecentFavorite : false;
    }

    this.setData({
      activeOutfit,
      recentFavorites,
      isOutfitFavorited,
      wardrobeItems: globalData.wardrobeItems,
      alternativeItems: [
        { id: 'item_sub_cardigan', name: '米色羊绒针织开衫', brand: 'LORO PIANA', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSzDLae7uPxJspwTHozhlL3vbtickM0T7zHZ4JIoWwye0p6YXyDmPrWGHHkjEkAVdUSq7AoIfhejLtUU89Dn8yYH0VTeNe_bUTy24fYur-kB6aqB-18Ivl61oJbPP_C6KQ9TNZ0w0sQeHBiOavBGAED-CLRrIsSKGSofkA6qT6YweyQNhj7hKjcFpuiCScBT6horZ-mUu12ZwUiYJ9VCsVFOFDlwAAc6m9A51zS4iz1ldKuzQsio-0n0iZqTvbr09qY9cxYg-nryaH', material: '100% 顶级羊绒' },
        { id: 'item_sub_pant', name: '高腰羊毛阔腿西裤', brand: 'MAX MARA', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0zCrmEJYwhsvR2yEK3242lyXCXxjvfex-8umcRQJdFiN4xQqzebxxPP2Y-ps0Ag-D0RT24dHF_O0WyRKIfwtWrwy_7FYDYFMwdNZD0SbDvwHW3CkLeba-f2avMbt5d4twfirL9DoskbeJqpTyAkNZ85W4X9LbIuS33Ae3FYnkMsdRn1lH8I4LvDN5xzkySi_Lk2WiAHKp8F4W0DyZUvOwV7wMkChjCjrSnawia0IbyLlZ_NaNjc_At9lA6BMFfILpjERyM0nfXOEv', material: '羊毛+弹性混纺' },
        { id: 'item_sub_camisole', name: '法式真丝吊带背心', brand: 'LA PERLA', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzW0wVrNWK4Fcu_L9gn7rfV3QQSZ1E1uHbJNHeS6E78al1eCJuPGLlirdwiLc7m-Pzxkq6b2surk2iwydvfzySJMp560TZhuQQ8M_9cxdP6LWhZpIfzJdncFKW1T8hQJS0eTUfOu5XFxr-PEfxuYzrgyX1Akxb5qgRRk47DZIleED7IQW7zIjX5u1GrdJCBJXddKQtP6G4UATCblggeaEBLwKZu54EuEXMX8TDoVSOXCTpzFtAIXnMyAcUi2aitxp1Pa5K_GZwal-5', material: '100% 桑蚕真丝' }
      ]
    });
  },

  onRefreshOutfit() {
    const globalData = app.globalData;
    const nextIndex = ((globalData.activeOutfitIndex || 0) + 1) % 3;
    globalData.activeOutfitIndex = nextIndex;
    
    wx.switchTab({
      url: '/pages/match/match'
    });
  },

  onLogToday() {
    const activeOutfit = this.data.activeOutfit;
    const exists = app.globalData.calendarLogs.find(log => log.date === '2026-05-13');
    
    if (!exists) {
      const newLog = {
        date: '2026-05-13',
        rating: 5,
        repeatAlert: true,
        outfitName: activeOutfit.name,
        items: activeOutfit.items
      };
      app.globalData.calendarLogs.push(newLog);
    } else {
      exists.items = activeOutfit.items;
      exists.outfitName = activeOutfit.name;
    }
    
    this.setData({ hasLoggedToday: true });
    wx.showToast({
      title: '记录成功',
      icon: 'success'
    });
    
    setTimeout(() => {
      this.setData({ hasLoggedToday: false });
    }, 2000);
  },

  onToggleFavorite() {
    const activeOutfit = this.data.activeOutfit;
    if (activeOutfit.items.length === 0) return;
    
    const companion = activeOutfit.items[0];
    const globalData = app.globalData;
    
    const updated = globalData.wardrobeItems.map(item => {
      if (item.name === companion.name) {
        return { ...item, isRecentFavorite: !item.isRecentFavorite };
      }
      return item;
    });
    globalData.wardrobeItems = updated;
    
    const found = updated.find(item => item.name === companion.name);
    this.setData({
      isOutfitFavorited: found ? found.isRecentFavorite : false,
      recentFavorites: updated.filter(item => item.isRecentFavorite).slice(0, 4)
    });
    
    wx.showToast({
      title: found && found.isRecentFavorite ? '已收藏' : '已取消',
      icon: 'success'
    });
  },

  onUploadItem() {
    this.setData({ showUploadModal: true });
  },

  closeUploadModal() {
    this.setData({ showUploadModal: false, uploadedFile: '' });
  },

  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        this.setData({ uploadedFile: tempFilePath });
      }
    });
  },

  confirmUpload() {
    if (!this.data.uploadedFile) {
      wx.showToast({
        title: '请先选择图片',
        icon: 'none'
      });
      return;
    }
    
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
      imageUrl: this.data.uploadedFile,
      isWornCount: 0,
      isRecentFavorite: false,
      season: '待识别',
      dateAdded: new Date().toISOString().slice(0, 10)
    };
    
    app.globalData.pendingQueue.push(newItem);
    
    wx.showToast({
      title: '已添加到识别队列',
      icon: 'success'
    });
    
    this.setData({ showUploadModal: false, uploadedFile: '' });
    
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/wardrobe/wardrobe'
      });
    }, 1500);
  },

  onTryOn() {
    this.setData({ showTryOnModal: true, tryOnProgress: 0, tryOnPhase: '正在进行 3D 体型对齐...' });
    this.startTryOnSim();
  },

  startTryOnSim() {
    const phases = [
      { progress: 10, phase: '正在进行 3D 体型对齐...' },
      { progress: 30, phase: 'AI 提取面料物理渲染特征...' },
      { progress: 60, phase: '融合林夏 (Lin Xia) 的沙漏型轮廓度量...' },
      { progress: 85, phase: '计算光源折射阴影效果...' },
      { progress: 100, phase: '试穿配对成功！' }
    ];
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < phases.length) {
        this.setData({
          tryOnProgress: phases[index].progress,
          tryOnPhase: phases[index].phase
        });
        index++;
      } else {
        clearInterval(timer);
      }
    }, 400);
  },

  restartTryOn() {
    this.setData({ tryOnProgress: 0, tryOnPhase: '正在进行 3D 体型对齐...' });
    this.startTryOnSim();
  },

  confirmTryOn() {
    this.setData({ showTryOnModal: false });
    wx.showToast({
      title: '已选用此搭配',
      icon: 'success'
    });
  },

  onShopHelper() {
    this.setData({ showShopModal: true });
  },

  closeShopModal() {
    this.setData({ showShopModal: false });
  },

  goToWardrobe() {
    wx.switchTab({
      url: '/pages/wardrobe/wardrobe'
    });
  },

  goToMine() {
    wx.switchTab({
      url: '/pages/mine/mine'
    });
  },

  showItemDetail(e) {
    const item = e.currentTarget.dataset.item;
    wx.showModal({
      title: `${item.brand} ${item.name}`,
      content: `材质: ${item.material}\n颜色: ${item.colorName}\n复穿频次: ${item.isWornCount}次`,
      showCancel: false
    });
  }
});
