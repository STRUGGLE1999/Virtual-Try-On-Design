// pages/mine/mine.js
const app = getApp();

Page({
  data: {
    userProfile: {
      name: '林夏 (Lin Xia)',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBcvXdqLUjXdg9uJuXrbBMtkSH6RBO89u1AQa1w3AkUDdIPSGU5pxjTYq2riKTyo67sNgilaQ5xeiMRlYc79y9D4188R27U0fnQy2FJ4dwta8tb8-4tfXxL4Qntqq26jt8cjRFaJfjN31n0vYylelhW4gDdTdxx8MNax0YomaZZtTVUquyzsGZH1sOgfMybupeWBfnakEzNygFkuHrZxLZAiMP8VsBaT_M2KBadEtJyvd05qmDyRcLcW2sZSXwQ9Kz6DSLH5MhKy_H',
      styleTags: ['简约', '职场', '韩式'],
      height: '168cm',
      weight: '52kg',
      bodyShape: '沙漏型',
      diagnostic: {
        overallScore: 78,
        regularRate: 38,
        idleRate: 13,
        suggestion: '外套比例偏低，建议增加一件深色长款风衣以丰富您的职场简约风格。'
      }
    },
    stylesList: ['简约', '极简', '雅痞', '先锋冷感', '名媛', '高能街头', '商务休闲'],
    avoidedColors: [
      { name: '亮黄', hex: '#FFD700' },
      { name: '荧光绿', hex: '#39FF14' }
    ]
  },

  onLoad() {
    // Sync with app.globalData if needed
    if (app && app.globalData && app.globalData.userProfile) {
      this.setData({
        userProfile: app.globalData.userProfile
      });
    }
  },

  onEditProfile() {
    wx.showModal({
      title: '更改偏好设置',
      content: '进入微信小程序偏好设置管理？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '进入偏合设置页面',
            icon: 'none'
          });
        }
      }
    });
  },

  onRefreshDiagnosis() {
    wx.showLoading({
      title: 'AI 重新扫描诊断'
    });
    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        'userProfile.diagnostic.overallScore': 83,
        'userProfile.diagnostic.suggestion': '衣橱整体搭配度优异！最近配衬搭配契合度提高，建议在包袋配饰上稍作点缀。'
      });
      wx.showToast({
        title: '衣橱诊断已更新',
        icon: 'success'
      });
    }, 1200);
  },

  onAddAvoidedColor() {
    wx.showToast({
      title: '添加避免颜色',
      icon: 'none'
    });
  }
})
