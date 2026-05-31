// pages/match/match.js
Page({
  data: {
    matchScore: 92,
    repeatCount: 5,
    styleRisk: '低风险',
    activeSlot: null, // "outerwear", "top", "bottom"

    // Initial selected elements
    outerwear: {
      id: 'item_blazer_zara',
      name: '修身设计西装外套',
      categoryLabel: '外套',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrEtiGKycjtE-3PUldT-JHAjhc8c391ghwGWVG8EX1OjFsXVaWouQv8040T0v36t32aafV0c0GkAHMIYjaiLqrRcduGPd-UiC5kmxaOrQoGSbI9yXq6YXm3q7HfGW-dvp1WZE7IEGFfyIbFImmvPeE4-88VVLxdOKGYYXueVwTxk4a8i4KQqZuKt9-kpTXIUcsbv7-8brnWl6PNTc8ed6IXvfwosWn21qDhJppfnmUKAGKbgseeOmj59AT8vwi8bInOyBZ7kKt5bHT'
    },
    top: {
      id: 'item_shir_polo',
      name: '牛津纺扣领衬衫',
      categoryLabel: '内搭',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3xaPoCvAzs_02nHvNKjGlPfwEE2mzOy3BfvRw3NUepkOolOJtAc1_QJGDdpHQ2HKQ1M_0jJOJEdzPuvSWufV0zHHM4IQhuOJbMFOSieJ_RrHm2qmVvFzvCvnC2g9JOx2HhpybpQmOCXUr3s77K9iuTmq4-jR_rG5C0ZJCyCWCdUEz7O2VHVsCwRkcrwSLINIRcFwKLtI6qBB0DBaDp6B_LB7ZW9-bjEZRWKCXi1ul8C2PNOEkQhYh6lVnMIeYzXvPh-_lTwbhUF0D'
    },
    bottom: {
      id: 'item_pants_charcoal',
      name: '修身高级正装西裤',
      categoryLabel: '下装',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxT1bjlWEqxAAoov8KFR9CDMmBcSWnHFqYHDcRGZPrqRdE7uw8Hdg5sXENDTBaksyfRE8iHTmF2SkSoE7tbSpkpDLc2u-ZVMkElyC5k6aoWv2F5QKnCuLyx2BDtektIpRLLZ_zYSL4ba5q6eDk24EQOcXjSN-D8YyM_7ItpTdZ6_sPFVQWbrqqxMCgEq9dETrG6A8mUBgrxbNATtKzhb7G03LW9w8G8Ef3RyDNVDNSxDxTHyGpLH9ej70-DCXP2ERQ9m3fStN2EDtf'
    },

    // Swapping pools
    outerwearOptions: [
      { id: 'item_blazer_zara', name: '修身设计西装外套', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrEtiGKycjtE-3PUldT-JHAjhc8c391ghwGWVG8EX1OjFsXVaWouQv8040T0v36t32aafV0c0GkAHMIYjaiLqrRcduGPd-UiC5kmxaOrQoGSbI9yXq6YXm3q7HfGW-dvp1WZE7IEGFfyIbFImmvPeE4-88VVLxdOKGYYXueVwTxk4a8i4KQqZuKt9-kpTXIUcsbv7-8brnWl6PNTc8ed6IXvfwosWn21qDhJppfnmUKAGKbgseeOmj59AT8vwi8bInOyBZ7kKt5bHT' },
      { id: 'item_coat_lux', name: 'Tailored Overcoat', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqj8w4PJZ9rMumoiBWD-GZLP6gVBmU9nXjzieU_P1eZDkoGs-9bpuD3Tw4Gck9YJ98wogfKnBmSSpxS84r6DQ0MZYVBG2vAVdTLSOW25KiwiP0g8glM50N5ktZXl_NBKB4RvDcxYmwc6-Lm431AE7ZQVfqnCN7NYYXObbXO0EBkJ-oFEsoovVmae8KrzO5ClLbeeeaMDAhVXtZVSE2tHiDf_GJZgcu9FNxYQX3z13IIioUMW6x37jZ3oeZGlDUL_HEqlMgs1qWjj4c' },
      { id: 'item_sub_cardigan', name: '米色羊绒针织开衫', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSzDLae7uPxJspwTHozhlL3vbtickM0T7zHZ4JIoWwye0p6YXyDmPrWGHHkjEkAVdUSq7AoIfhejLtUU89Dn8yYH0VTeNe_bUTy24fYur-kB6aqB-18Ivl61oJbPP_C6KQ9TNZ0w0sQeHBiOavBGAED-CLRrIsSKGSofkA6qT6YweyQNhj7hKjcFpuiCScBT6horZ-mUu12ZwUiYJ9VCsVFOFDlwAAc6m9A51zS4iz1ldKuzQsio-0n0iZqTvbr09qY9cxYg-nryaH' }
    ],
    topOptions: [
      { id: 'item_shir_polo', name: '牛津纺扣领衬衫', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3xaPoCvAzs_02nHvNKjGlPfwEE2mzOy3BfvRw3NUepkOolOJtAc1_QJGDdpHQ2HKQ1M_0jJOJEdzPuvSWufV0zHHM4IQhuOJbMFOSieJ_RrHm2qmVvFzvCvnC2g9JOx2HhpybpQmOCXUr3s77K9iuTmq4-jR_rG5C0ZJCyCWCdUEz7O2VHVsCwRkcrwSLINIRcFwKLtI6qBB0DBaDp6B_LB7ZW9-bjEZRWKCXi1ul8C2PNOEkQhYh6lVnMIeYzXvPh-_lTwbhUF0D' },
      { id: 'item_sweat_uniq', name: '羊绒圆领保暖毛衣', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVKZ_x40PeluBUVgL9WyQOxIs-5viPvPkORHOpA2cPdaiS3RRtn-OpjHdTwDUGQLiLv4970NO0vi8kZrk6Yjzg41-KGJBWJXsc2YKtHwGjLqFkD7MeGH6Y2CUI_IGKmRZ3SdbmTKt43Y-FHtz-xwZwE818uW08G0CAIx0HHyQ0-fpKK0m4V6Yu8MYY7X6fUzOSWkUwJUN037mEBcpR4w_SrXcw7oWr0Ptneorti7T0xIk-Sj2GwUgrZ-FooHezYf6XhjmnOxD3oWSU' }
    ],
    bottomOptions: [
      { id: 'item_pants_charcoal', name: '修身高级正装西裤', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxT1bjlWEqxAAoov8KFR9CDMmBcSWnHFqYHDcRGZPrqRdE7uw8Hdg5sXENDTBaksyfRE8iHTmF2SkSoE7tbSpkpDLc2u-ZVMkElyC5k6aoWv2F5QKnCuLyx2BDtektIpRLLZ_zYSL4ba5q6eDk24EQOcXjSN-D8YyM_7ItpTdZ6_sPFVQWbrqqxMCgEq9dETrG6A8mUBgrxbNATtKzhb7G03LW9w8G8Ef3RyDNVDNSxDxTHyGpLH9ej70-DCXP2ERQ9m3fStN2EDtf' },
      { id: 'item_jeans_levi', name: '501 原创直筒裤', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnb9QCyoa2Efs44UFpx_cnentXXYnMb62G35bQKS7HKlzdY06OhAfq2KOvDvTg_EwlXNrEEflhuVbX63x06GbburnzFmWsqgmOkywUDdYQ6CGITuSjU16YHjZcHMq2Nr54D3fk934jnwxSYKXQnyoz_BeUbWWllj2xPUQ7G6FFfnAEe_Kn0P9dd_C7jj7QXjVOdWSJSHgqVG7zLW5hu3atMP-JhopCoCxMhTNcesRqKScvRGYnVgjAq9cSoNnrcwf2wbKk8Nn9HTIJ' }
    ]
  },

  onLoad() {
    // Initializer
  },

  onSlotSelect(e) {
    const slot = e.currentTarget.dataset.slot;
    this.setData({
      activeSlot: this.data.activeSlot === slot ? null : slot
    });
  },

  selectOption(e) {
    const { slot, option } = e.currentTarget.dataset;
    this.setData({
      [slot]: option,
      activeSlot: null,
      matchScore: Math.floor(Math.random() * 10) + 88
    });
    wx.showToast({
      title: '单品已替换并重新校验',
      icon: 'success'
    });
  },

  onGenerateOutfit() {
    wx.showLoading({
      title: 'AI 组合生成里'
    });
    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        matchScore: 96,
        repeatCount: 1,
        styleRisk: '低风险',
        outerwear: this.data.outerwearOptions[1],
        top: this.data.topOptions[1],
        bottom: this.data.bottomOptions[0]
      });
      wx.showToast({
        title: '全新AI混搭比率就绪',
        icon: 'success'
      });
    }, 1000);
  },

  onVirtualTryOn() {
    wx.showLoading({
      title: '3D 合合虚拟试穿中'
    });
    setTimeout(() => {
      wx.hideLoading();
      wx.showModal({
        title: '试穿完毕',
        content: `恭喜您！系统基于林夏(168cm, 52kg) 的三维模型进行3D虚拟裁片合成，【${this.data.outerwear.name}】胸围适中，袖长略微宽松 2cm，整体评分为【合身（A）】。`,
        showCancel: false,
        confirmText: '极好'
      });
    }, 1500);
  }
})
