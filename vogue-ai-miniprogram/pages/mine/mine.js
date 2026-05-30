const app = getApp();

Page({
  data: {
    userProfile: null,
    avoidedColors: [],
    showColorPicker: false,
    newColorName: '',
    newColorHex: '#000000'
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const globalData = app.globalData;
    const userProfile = globalData.userProfile;
    
    const score = userProfile.diagnostic.overallScore + userProfile.avoidedColors.length * 4;
    const scoreRotate = (score / 100) * 360;
    
    this.setData({
      userProfile: userProfile,
      avoidedColors: userProfile.avoidedColors,
      diagnosticScore: Math.min(score, 100),
      scoreRotate: scoreRotate
    });
  },

  getTagClass(index) {
    const classes = ['bg-tag-linen text-amber-900', 'bg-tag-cotton text-emerald-900', 'bg-tag-silk text-purple-900'];
    return classes[index % classes.length];
  },

  onRemoveColor(e) {
    const name = e.currentTarget.dataset.name;
    wx.showModal({
      title: '移除颜色',
      content: `是否从避免色中移除 【${name}】?`,
      success: (res) => {
        if (res.confirm) {
          const globalData = app.globalData;
          const updated = globalData.userProfile.avoidedColors.filter(c => c.name !== name);
          globalData.userProfile.avoidedColors = updated;
          this.setData({
            avoidedColors: updated,
            diagnosticScore: globalData.userProfile.diagnostic.overallScore + updated.length * 4
          });
          wx.showToast({
            title: '已移除',
            icon: 'success'
          });
        }
      }
    });
  },

  onShowColorPicker() {
    this.setData({ showColorPicker: true, newColorName: '', newColorHex: '#000000' });
  },

  onCloseColorPicker() {
    this.setData({ showColorPicker: false });
  },

  onColorNameInput(e) {
    this.setData({ newColorName: e.detail.value });
  },

  onColorHexInput(e) {
    let hex = e.detail.value;
    if (!hex.startsWith('#')) {
      hex = '#' + hex;
    }
    this.setData({ newColorHex: hex });
  },

  onPickColor() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    this.setData({ newColorHex: randomColor });
  },

  onConfirmAddColor() {
    if (!this.data.newColorName.trim()) {
      wx.showToast({
        title: '请输入颜色名称',
        icon: 'none'
      });
      return;
    }
    
    const globalData = app.globalData;
    const newColor = {
      name: this.data.newColorName.trim(),
      hex: this.data.newColorHex
    };
    
    globalData.userProfile.avoidedColors.push(newColor);
    
    this.setData({
      avoidedColors: globalData.userProfile.avoidedColors,
      diagnosticScore: globalData.userProfile.diagnostic.overallScore + globalData.userProfile.avoidedColors.length * 4,
      showColorPicker: false
    });
    
    wx.showToast({
      title: '颜色已添加',
      icon: 'success'
    });
  },

  onShowFavorites() {
    const globalData = app.globalData;
    const favorites = globalData.wardrobeItems.filter(item => item.isRecentFavorite);
    
    if (favorites.length === 0) {
      wx.showToast({
        title: '暂无收藏',
        icon: 'none'
      });
      return;
    }
    
    let content = favorites.map(f => `[${f.brand}] ${f.name}`).join('\n');
    wx.showModal({
      title: `已收藏单品 ${favorites.length} 套`,
      content: content,
      showCancel: false
    });
  },

  goToCalendar() {
    wx.switchTab({
      url: '/pages/calendar/calendar'
    });
  },

  goToShopHelper() {
    wx.switchTab({
      url: '/pages/home/home'
    });
    setTimeout(() => {
      wx.showModal({
        title: '买前试穿',
        content: '一键跳转至首页的【买前试穿】服务展开智能模拟！',
        showCancel: false
      });
    }, 500);
  },

  onAIConfig() {
    wx.showModal({
      title: 'AI配置',
      content: 'AI 造型顾问高级特征推荐人格：已锁定为【先锋前卫设计师】风格特征评分 88。',
      showCancel: false
    });
  }
});
