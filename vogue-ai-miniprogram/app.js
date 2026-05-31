App({
  globalData: {
    userInfo: null,
    wardrobeItems: [],
    pendingQueue: [],
    calendarLogs: {},
    userProfile: null,
    savedOutfits: [],
    activeOutfitIndex: 0
  },

  onLaunch() {
    this.initData();
  },

  initData() {
    // 模拟衣橱数据
    this.globalData.wardrobeItems = [
      {
        id: 'item_shir_polo',
        brand: 'POLO RALPH',
        category: 'Tops',
        color: '白',
        season: '四季',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3xaPoCvAzs_02nHvNKjGlPfwEE2mzOy3BfvRw3NUepkOolOJtAc1_QJGDdpHQ2HKQ1M_0jJOJEdzPuvSWufV0zHHM4IQhuOJbMFOSieJ_RrHm2qmVvFzvCvnC2g9JOx2HhpybpQmOCXUr3s77K9iuTmq4-jR_rG5C0ZJCyCWCdUEz7O2VHVsCwRkcrwSLINIRcFwKLtI6qBB0DBaDp6B_LB7ZW9-bjEZRWKCXi1ul8C2PNOEkQhYh6lVnMIeYzXvPh-_lTwbhUF0D',
        isFavorite: true
      },
      {
        id: 'item_jeans_levi',
        brand: "LEVI'S",
        category: 'Bottoms',
        color: '蓝',
        season: '四季',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnb9QCyoa2Efs44UFpx_cnentXXYnMb62G35bQKS7HKlzdY06OhAfq2KOvDvTg_EwlXNrEEflhuVbX63x06GbburnzFmWsqgmOkywUDdYQ6CGITuSjU16YHjZcHMq2Nr54D3fk934jnwxSYKXQnyoz_BeUbWWllj2xPUQ7G6FFfnAEe_Kn0P9dd_C7jj7QXjVOdWSJSHgqVG7zLW5hu3atMP-JhopCoCxMhTNcesRqKScvRGYnVgjAq9cSoNnrcwf2wbKk8Nn9HTIJ',
        isFavorite: true
      },
      {
        id: 'item_blazer_zara',
        brand: 'ZARA',
        category: 'Outerwear',
        color: '黑',
        season: '秋冬',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrEtiGKycjtE-3PUldT-JHAjhc8c391ghwGWVG8EX1OjFsXVaWouQv8040T0v36t32aafV0c0GkAHMIYjaiLqrRcduGPd-UiC5kmxaOrQoGSbI9yXq6YXm3q7HfGW-dvp1WZE7IEGFfyIbFImmvPeE4-88VVLxdOKGYYXueVwTxk4a8i4KQqZuKt9-kpTXIUcsbv7-8brnWl6PNTc8ed6IXvfwosWn21qDhJppfnmUKAGKbgseeOmj59AT8vwi8bInOyBZ7kKt5bHT',
        isFavorite: true
      },
      {
        id: 'item_sweat_uniq',
        brand: 'UNIQLO',
        category: 'Tops',
        color: '绿',
        season: '春秋',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVKZ_x40PeluBUVgL9WyQOxIs-5viPvPkORHOpA2cPdaiS3RRtn-OpjHdTwDUGQLiLv4970NO0vi8kZrk6Yjzg41-KGJBWJXsc2YKtHwGjLqFkD7MeGH6Y2CUI_IGKmRZ3SdbmTKt43Y-FHtz-xwZwE818uW08G0CAIx0HHyQ0-fpKK0m4V6Yu8MYY7X6fUzOSWkUwJUN037mEBcpR4w_SrXcw7oWr0Ptneorti7T0xIk-Sj2GwUgrZ-FooHezYf6XhjmnOxD3oWSU',
        isFavorite: false
      },
      {
        id: 'item_coat_lux',
        brand: 'SILK & WOOL',
        category: 'Outerwear',
        color: '灰',
        season: '秋冬',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqj8w4PJZ9rMumoiBWD-GZLP6gVBmU9nXjzieU_P1eZDkoGs-9bpuD3Tw4Gck9YJ98wogfKnBmSSpxS84r6DQ0MZYVBG2vAVdTLSOW25KiwiP0g8glM50N5ktZXl_NBKB4RvDcxYmwc6-Lm431AE7ZQVfqnCN7NYYXObbXO0EBkJ-oFEsoovVmae8KrzO5ClLbeeeaMDAhVXtZVSE2tHiDf_GJZgcu9FNxYQX3z13IIioUMW6x37jZ3oeZGlDUL_HEqlMgs1qWjj4c',
        isFavorite: true
      },
      {
        id: 'item_coat_cream',
        brand: 'DIOR ATELIER',
        category: 'Outerwear',
        color: '米白',
        season: '春秋',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg18Do5ndal-bpW1pkKm6MlQUJYESCdmO0e7YZ1n0H5g9YigAgCswf0vN4ldIPEV4mypL9OYMx_rZ6xoqgIsRfhGCuTxUMZUDTry6UKz7xbWzzDFsOxA-B37jEUFbfd32su-ZceOtFHs4Tj1Can-uPL_61_8dxL5bkRE7PmaG4rHROCckWbXFpjXMOAcq6-Luz00Biu5Ii6cx9Wcdh42aJLRbcRg8oP6wdhzVVlk9E9GM_cGF5M1QKC7s5vYFPMieARXnKufuv7eDJ',
        isFavorite: true
      },
      {
        id: 'item_pants_charcoal',
        brand: 'ARMANI EDIT',
        category: 'Bottoms',
        color: '炭灰',
        season: '四季',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxT1bjlWEqxAAoov8KFR9CDMmBcSWnHFqYHDcRGZPrqRdE7uw8Hdg5sXENDTBaksyfRE8iHTmF2SkSoE7tbSpkpDLc2u-ZVMkElyC5k6aoWv2F5QKnCuLyx2BDtektIpRLLZ_zYSL4ba5q6eDk24EQOcXjSN-D8YyM_7ItpTdZ6_sPFVQWbrqqxMCgEq9dETrG6A8mUBgrxbNATtKzhb7G03LW9w8G8Ef3RyDNVDNSxDxTHyGpLH9ej70-DCXP2ERQ9m3fStN2EDtf',
        isFavorite: true
      },
      {
        id: 'item_shoes_1',
        brand: 'NIKE',
        category: 'Shoes',
        color: '白',
        season: '四季',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        isFavorite: true
      },
      {
        id: 'item_shoes_2',
        brand: 'COMMON PROJECTS',
        category: 'Shoes',
        color: '黑',
        season: '四季',
        imageUrl: 'https://images.unsplash.com/photo-1551197403-d471403a166e?w=400&h=400&fit=crop',
        isFavorite: false
      }
    ];

    this.globalData.pendingQueue = [];

    this.globalData.userProfile = {
      name: '林夏'
    };

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const dayBefore = new Date(today);
    dayBefore.setDate(dayBefore.getDate() - 2);
    
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    this.globalData.savedOutfits = [
      {
        id: 'outfit_1',
        style: '休闲街头',
        items: [
          this.globalData.wardrobeItems[0],
          this.globalData.wardrobeItems[1],
          this.globalData.wardrobeItems[7]
        ],
        date: new Date().toISOString()
      },
      {
        id: 'outfit_2',
        style: '职场通勤',
        items: [
          this.globalData.wardrobeItems[2],
          this.globalData.wardrobeItems[6],
          this.globalData.wardrobeItems[8]
        ],
        date: new Date().toISOString()
      }
    ];

    this.globalData.calendarLogs = {
      [formatDate(dayBefore)]: this.globalData.savedOutfits[0],
      [formatDate(yesterday)]: this.globalData.savedOutfits[1]
    };
  }
});
