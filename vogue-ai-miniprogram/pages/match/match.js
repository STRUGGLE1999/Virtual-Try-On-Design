const app = getApp();

Page({
  data: {
    coatItem: '',
    shirtItem: '',
    trousersItem: '',
    matchScore: 92,
    rewornCount: 5,
    styleRisk: '低',
    styleTag: '简约职场',
    checkoutNotify: '',
    alternativeItems: [],
    coatsPool: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDg18Do5ndal-bpW1pkKm6MlQUJYESCdmO0e7YZ1n0H5g9YigAgCswf0vN4ldIPEV4mypL9OYMx_rZ6xoqgIsRfhGCuTxUMZUDTry6UKz7xbWzzDFsOxA-B37jEUFbfd32su-ZceOtFHs4Tj1Can-uPL_61_8dxL5bkRE7PmaG4rHROCckWbXFpjXMOAcq6-Luz00Biu5Ii6cx9Wcdh42aJLRbcRg8oP6wdhzVVlk9E9GM_cGF5M1QKC7s5vYFPMieARXnKufuv7eDJ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCdUTa7BTPoM3CltV3lklEnAfR_N_qhVQJjP1q8LGgWAeAN7969uCJbGZRBUhjURqR3JE-Bm-aKeOgjGWQqNJIFmJ1d6pt3-a_u2BQ3cnMwIvAjcK4VHvCLNLHYuos8vB9OjfRSeCDRyZAkAqoV44uWqZSjftLmlrcaGL9Y15MgVZkVDuV0WQCnyIIwzeIjLL3CKFrxvbKKolWmWqhG7kNuEnJDBib1olXJq2NE55CpBmEmhHshaiw4WoLF06mliQOiTGFKROvGXSAU',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDrEtiGKycjtE-3PUldT-JHAjhc8c391ghwGWVG8EX1OjFsXVaWouQv8040T0v36t32aafV0c0GkAHMIYjaiLqrRcduGPd-UiC5kmxaOrQoGSbI9yXq6YXm3q7HfGW-dvp1WZE7IEGFfyIbFImmvPeE4-88VVLxdOKGYYXueVwTxk4a8i4KQqZuKt9-kpTXIUcsbv7-8brnWl6PNTc8ed6IXvfwosWn21qDhJppfnmUKAGKbgseeOmj59AT8vwi8bInOyBZ7kKt5bHT'
    ],
    shirtPool: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-BDobsRWnlbi97Zj_5Xg4kmkiWMXZlJEcI5tye3A04Uda1brBVv4JnrlvOnRjItWjMxmV-zIdKwlmFrLDX-gOeqYIEgMHFN4DioTfquQxzAKeRJB9o9euFVoM2QkKEOcaIiC29p3AIP5DANHBktyOu27iX3hGUE-ExEmOmhAfA5BuNl8oIJ04MIB6YyUdnXUNO2q6F0vNNQ51NO23Zk0C4143D8N5g7mhppCekFkLnThGBwopU1lssPg0g_8bHRIZcdn83UqpPBxl',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB3xaPoCvAzs_02nHvNKjGlPfwEE2mzOy3BfvRw3NUepkOolOJtAc1_QJGDdpHQ2HKQ1M_0jJOJEdzPuvSWufV0zHHM4IQhuOJbMFOSieJ_RrHm2qmVvFzvCvnC2g9JOx2HhpybpQmOCXUr3s77K9iuTmq4-jR_rG5C0ZJCyCWCdUEz7O2VHVsCwRkcrwSLINIRcFwKLtI6qBB0DBaDp6B_LB7ZW9-bjEZRWKCXi1ul8C2PNOEkQhYh6lVnMIeYzXvPh-_lTwbhUF0D',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDzW0wVrNWK4Fcu_L9gn7rfV3QQSZ1E1uHbJNHeS6E78al1eCJuPGLlirdwiLc7m-Pzxkq6b2surk2iwydvfzySJMp560TZhuQQ8M_9cxdP6LWhZpIfzJdncFKW1T8hQJS0eTUfOu5XFxr-PEfxuYzrgyX1Akxb5qgRRk47DZIleED7IQW7zIjX5u1GrdJCBJXddKQtP6G4UATCblggeaEBLwKZu54EuEXMX8TDoVSOXCTpzFtAIXnMyAcUi2aitxp1Pa5K_GZwal-5'
    ],
    trousersPool: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCxT1bjlWEqxAAoov8KFR9CDMmBcSWnHFqYHDcRGZPrqRdE7uw8Hdg5sXENDTBaksyfRE8iHTmF2SkSoE7tbSpkpDLc2u-ZVMkElyC5k6aoWv2F5QKnCuLyx2BDtektIpRLLZ_zYSL4ba5q6eDk24EQOcXjSN-D8YyM_7ItpTdZ6_sPFVQWbrqqxMCgEq9dETrG6A8mUBgrxbNATtKzhb7G03LW9w8G8Ef3RyDNVDNSxDxTHyGpLH9ej70-DCXP2ERQ9m3fStN2EDtf',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAnb9QCyoa2Efs44UFpx_cnentXXYnMb62G35bQKS7HKlzdY06OhAfq2KOvDvTg_EwlXNrEEflhuVbX63x06GbburnzFmWsqgmOkywUDdYQ6CGITuSjU16YHjZcHMq2Nr54D3fk934jnwxSYKXQnyoz_BeUbWWllj2xPUQ7G6FFfnAEe_Kn0P9dd_C7jj7QXjVOdWSJSHgqVG7zLW5hu3atMP-JhopCoCxMhTNcesRqKScvRGYnVgjAq9cSoNnrcwf2wbKk8Nn9HTIJ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB0zCrmEJYwhsvR2yEK3242lyXCXxjvfex-8umcRQJdFiN4xQqzebxxPP2Y-ps0Ag-D0RT24dHF_O0WyRKIfwtWrwy_7FYDYFMwdNZD0SbDvwHW3CkLeba-f2avMbt5d4twfirL9DoskbeJqpTyAkNZ85W4X9LbIuS33Ae3FYnkMsdRn1lH8I4LvDN5xzkySi_Lk2WiAHKp8F4W0DyZUvOwV7wMkChjCjrSnawia0IbyLlZ_NaNjc_At9lA6BMFfILpjERyM0nfXOEv'
    ]
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const { coatsPool, shirtPool, trousersPool } = this.data;
    
    const coatIdx = Math.floor(Math.random() * coatsPool.length);
    const shirtIdx = Math.floor(Math.random() * shirtPool.length);
    const trouserIdx = Math.floor(Math.random() * trousersPool.length);
    
    const tags = ['简约职场', '韩式松弛', '周末休闲', '前卫冷感'];
    const styleTag = tags[Math.floor(Math.random() * tags.length)];
    
    this.setData({
      coatItem: coatsPool[coatIdx],
      shirtItem: shirtPool[shirtIdx],
      trousersItem: trousersPool[trouserIdx],
      matchScore: Math.floor(Math.random() * 10) + 90,
      rewornCount: Math.floor(Math.random() * 8) + 1,
      styleTag: styleTag,
      alternativeItems: [
        { id: 'item_sub_cardigan', name: '米色羊绒针织开衫', brand: 'LORO PIANA', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSzDLae7uPxJspwTHozhlL3vbtickM0T7zHZ4JIoWwye0p6YXyDmPrWGHHkjEkAVdUSq7AoIfhejLtUU89Dn8yYH0VTeNe_bUTy24fYur-kB6aqB-18Ivl61oJbPP_C6KQ9TNZ0w0sQeHBiOavBGAED-CLRrIsSKGSofkA6qT6YweyQNhj7hKjcFpuiCScBT6horZ-mUu12ZwUiYJ9VCsVFOFDlwAAc6m9A51zS4iz1ldKuzQsio-0n0iZqTvbr09qY9cxYg-nryaH', material: '100% 顶级羊绒', category: 'outerwear' },
        { id: 'item_sub_pant', name: '高腰羊毛阔腿西裤', brand: 'MAX MARA', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0zCrmEJYwhsvR2yEK3242lyXCXxjvfex-8umcRQJdFiN4xQqzebxxPP2Y-ps0Ag-D0RT24dHF_O0WyRKIfwtWrwy_7FYDYFMwdNZD0SbDvwHW3CkLeba-f2avMbt5d4twfirL9DoskbeJqpTyAkNZ85W4X9LbIuS33Ae3FYnkMsdRn1lH8I4LvDN5xzkySi_Lk2WiAHKp8F4W0DyZUvOwV7wMkChjCjrSnawia0IbyLlZ_NaNjc_At9lA6BMFfILpjERyM0nfXOEv', material: '羊毛+弹性混纺', category: 'bottom' },
        { id: 'item_sub_camisole', name: '法式真丝吊带背心', brand: 'LA PERLA', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzW0wVrNWK4Fcu_L9gn7rfV3QQSZ1E1uHbJNHeS6E78al1eCJuPGLlirdwiLc7m-Pzxkq6b2surk2iwydvfzySJMp560TZhuQQ8M_9cxdP6LWhZpIfzJdncFKW1T8hQJS0eTUfOu5XFxr-PEfxuYzrgyX1Akxb5qgRRk47DZIleED7IQW7zIjX5u1GrdJCBJXddKQtP6G4UATCblggeaEBLwKZu54EuEXMX8TDoVSOXCTpzFtAIXnMyAcUi2aitxp1Pa5K_GZwal-5', material: '100% 桑蚕真丝', category: 'top' }
      ]
    });
  },

  onRefreshAll() {
    const { coatsPool, shirtPool, trousersPool } = this.data;
    const coatIdx = Math.floor(Math.random() * coatsPool.length);
    const shirtIdx = Math.floor(Math.random() * shirtPool.length);
    const trouserIdx = Math.floor(Math.random() * trousersPool.length);
    
    const tags = ['简约职场', '韩式松弛', '周末休闲', '前卫冷感'];
    const styleTag = tags[Math.floor(Math.random() * tags.length)];
    
    this.setData({
      coatItem: coatsPool[coatIdx],
      shirtItem: shirtPool[shirtIdx],
      trousersItem: trousersPool[trouserIdx],
      matchScore: Math.floor(Math.random() * 10) + 90,
      rewornCount: Math.floor(Math.random() * 8) + 1,
      styleTag: styleTag,
      checkoutNotify: `🎉 全套 AI 穿搭已被重置，已切换至：【${styleTag}】方案`
    });
    
    setTimeout(() => {
      this.setData({ checkoutNotify: '' });
    }, 3000);
  },

  onSwapOuterwear() {
    const { coatsPool, coatItem } = this.data;
    const nextIdx = (coatsPool.indexOf(coatItem) + 1) % coatsPool.length;
    
    this.setData({
      coatItem: coatsPool[nextIdx],
      matchScore: Math.floor(Math.random() * 15) + 82,
      checkoutNotify: '已切换外套样式！AI 实时重估搭配平衡率...'
    });
    
    setTimeout(() => {
      this.setData({ checkoutNotify: '' });
    }, 2500);
  },

  onSwapTop() {
    const { shirtPool, shirtItem } = this.data;
    const nextIdx = (shirtPool.indexOf(shirtItem) + 1) % shirtPool.length;
    
    this.setData({
      shirtItem: shirtPool[nextIdx],
      matchScore: Math.floor(Math.random() * 15) + 82,
      checkoutNotify: '已替换上装衬里！相容性算法更新完毕'
    });
    
    setTimeout(() => {
      this.setData({ checkoutNotify: '' });
    }, 2500);
  },

  onSwapBottom() {
    const { trousersPool, trousersItem } = this.data;
    const nextIdx = (trousersPool.indexOf(trousersItem) + 1) % trousersPool.length;
    
    this.setData({
      trousersItem: trousersPool[nextIdx],
      matchScore: Math.floor(Math.random() * 10) + 88,
      styleRisk: Math.random() > 0.5 ? '低' : '中',
      checkoutNotify: '下装更换！风格风险等级重新校准'
    });
    
    setTimeout(() => {
      this.setData({ checkoutNotify: '' });
    }, 2500);
  },

  onItemOverwrite(e) {
    const item = e.currentTarget.dataset.item;
    
    if (item.category === 'outerwear') {
      this.setData({ coatItem: item.imageUrl, matchScore: 96, styleRisk: '低' });
    } else if (item.category === 'top') {
      this.setData({ shirtItem: item.imageUrl, matchScore: 91 });
    } else if (item.category === 'bottom') {
      this.setData({ trousersItem: item.imageUrl, matchScore: 95, styleRisk: '低' });
    }
    
    this.setData({ checkoutNotify: `🎉 成功将 【${item.name}】 替换置入您当前的主推配对中！` });
    
    setTimeout(() => {
      this.setData({ checkoutNotify: '' });
    }, 3000);
  },

  onTryOn() {
    wx.showModal({
      title: 'AI 虚拟试穿',
      content: '👗 AI 虚拟试穿：\n已在后台启动高级渲染模式！试装效果极高相容。可在首页虚拟试穿面板查看 3D 对齐图像。',
      showCancel: false
    });
  },

  onShopHelper() {
    wx.showModal({
      title: '买前试穿',
      content: '买前试穿服务已开启：您可以在商场直接拍照对比相容度！',
      showCancel: false
    });
  },

  onTravelPacking() {
    wx.showModal({
      title: '旅行打包',
      content: '旅行打包规划已激活：输入天数及气温，AI 为您精炼安排最小体积行李！',
      showCancel: false
    });
  }
});
