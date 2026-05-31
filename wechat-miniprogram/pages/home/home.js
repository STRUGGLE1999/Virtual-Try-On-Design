// pages/home/home.js
Page({
  data: {
    statusBarHeight: 20,
    activeOccasion: 'office',
    occasionLabel: '简约职场',
    weatherTemp: 22,
    weatherDesc: '多云天气匹配',
    currentOutfit: {
      name: '极简春日通勤套系',
      favorite: false,
      score: 95,
      imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600',
      desc: '精选高级牛津纺长袖衬衫 + 深咖羊毛西装直筒长裤'
    },
    quickActions: [
      { id: 'upload', icon: '📤', title: '上传单品', desc: '新衣服到队列' },
      { id: 'scan', icon: '🔍', title: '单品识别', desc: 'AI 自动扫描' },
      { id: '3d', icon: '✨', title: '虚拟试穿', desc: '3D 模型合身' },
      { id: 'prebuy', icon: '🛍️', title: '买前试穿', desc: '避雷省心铺' }
    ]
  },

  onLoad() {
    // Page load setup
  },

  toggleFavorite() {
    const fav = !this.data.currentOutfit.favorite;
    this.setData({
      'currentOutfit.favorite': fav
    });
    wx.showToast({
      title: fav ? '已添加收藏柜' : '已取消收藏',
      icon: 'success'
    });
  },

  switchOccasion(e) {
    const oc = e.currentTarget.dataset.oc;
    let label = '简约职场';
    let outfitName = '极简春日通勤套系';
    let img = 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600';
    let desc = '精选高级牛津纺长袖配修身羊毛直筒西裤';

    if (oc === 'weekend') {
      label = '周末度假';
      outfitName = '松弛感条纹卫衣风';
      img = 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=600';
      desc = '精选美色美利奴羊毛针织配经典复古蓝色牛仔裤';
    } else if (oc === 'date') {
      label = '晚宴聚会';
      outfitName = '雅致高贵流苏大衣装';
      img = 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=600';
      desc = '法式高级米黄色流苏配深黑牛皮皮鞋';
    }

    this.setData({
      activeOccasion: oc,
      occasionLabel: label,
      'currentOutfit.name': outfitName,
      'currentOutfit.imageUrl': img,
      'currentOutfit.desc': desc
    });

    wx.showToast({
      title: `换至${label}搭配`,
      icon: 'none'
    });
  },

  changeOutfit() {
    wx.showLoading({
      title: 'AI 重新生成中'
    });
    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        'currentOutfit.score': Math.floor(Math.random() * 8) + 92
      });
      wx.showToast({
        title: '已生成新搭配配方',
        icon: 'success'
      });
    }, 800);
  },

  recordToday() {
    wx.showModal({
      title: '记录今日穿搭',
      content: `是否确认将「${this.data.currentOutfit.name}」记入 5月31日 穿搭行程？`,
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '行程记录成功',
            icon: 'success'
          });
        }
      }
    });
  },

  onActionTap(e) {
    const action = e.currentTarget.dataset.id;
    wx.showToast({
      title: `唤起 ${action} 模块`,
      icon: 'none'
    });
  }
})
