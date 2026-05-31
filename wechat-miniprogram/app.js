// app.js
App({
  onLaunch() {
    // Mini program initialized status
    console.log('VOGUE AI 针对微信小程序真机调试准备就绪');
  },
  globalData: {
    userInfo: null,
    themeColor: '#4f46e5',
    userProfile: {
      name: '林夏',
      englishName: 'Lin Xia',
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
    }
  }
})
