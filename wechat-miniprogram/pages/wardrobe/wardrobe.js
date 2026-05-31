// pages/wardrobe/wardrobe.js
Page({
  data: {
    selectedCategory: 'all',
    searchTerm: '',
    itemsCount: 8,
    activePendingIndex: 1, // 0 = celine, 1 = maison, 2 = balenciaga
    pendingQueue: [
      {
        id: 'pending_0',
        name: '驼色羊毛呢料大衣',
        brand: 'CELINE',
        category: 'outerwear',
        tags: ['#极简主义', '#基础款', '#修身'],
        material: '100% 澳大利亚美利奴羊毛',
        colorName: '经典驼色',
        colorHex: '#C5A059',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdUTa7BTPoM3CltV3lklEnAfR_N_qhVQJjP1q8LGgWAeAN7969uCJbGZRBUhjURqR3JE-Bm-aKeOgjGWQqNJIFmJ1d6pt3-a_u2BQ3cnMwIvAjcK4VHvCLNLHYuos8vB9OjfRSeCDRyZAkAqoV44uWqZSjftLmlrcaGL9Y15MgVZkVDuV0WQCnyIIwzeIjLL3CKFrxvbKKolWmWqhG7kNuEnJDBib1olXJq2NE55CpBmEmhHshaiw4WoLF06mliQOiTGFKROvGXSAU',
        isWornCount: 0,
        season: '秋冬'
      },
      {
        id: 'pending_1',
        name: '基础款圆领 T 恤',
        brand: 'MAISON MARGIELA',
        category: 'top',
        tags: ['#极简主义', '#基础款', '#修身'],
        material: '100% 重磅高级棉',
        colorName: '珍珠白',
        colorHex: '#FAFAFA',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7UOIl3ay46kVk1k3cOPNZY85Nq8-iZ1shCux4xzlMwr-YhUX_uyv0LHQrdN2dQy5GTFgZD8CgDBLRhPDjsrF0W2X6G4LNrk0sGd-c1gl9TLWlnl_zhI1KkDaUxUozboSfT9jfIAeS7jaS3y2Ns27_e4cEX5dvM3v3d1mydqSaWShTjo1oScAlsevHMY1Ct7V9Ap19Hd0rbGv8SdnrCe86O9CAsYT3LsZ43jy3DIqa5KQ06UF9prCQQjRXgJI7nw76fZnaw0zxgQjy',
        isWornCount: 0,
        season: '四季通用'
      },
      {
        id: 'pending_2',
        name: '高奢水洗丹宁夹克',
        brand: 'BALENCIAGA',
        category: 'outerwear',
        tags: ['#街头', '#复古重影', '#日常休闲'],
        material: '12oz 重实纯棉丹宁',
        colorName: '高山冰蓝',
        colorHex: '#4A6984',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe1RP9yRk0Cco30JMe9bYq5KR5wAhHe9p-EhLnBBb7zMnf1zk2IB9wXu0N2GdLecqm232zyI4L37lNt0WrKo9s56eI6bdzQiLMLpqgvi84TDpjJnKbZD6klPOmADe4ddjyFHx2gaegQQu4sUgaEowg1XXkC-iAaZmlBZiAtw01A03x5g3IElYTFz5vQHEfxJrzPCYT4Wqk129yQanTj8e_8gcUh7A4efh5cWMsHO0twxfIEcRx7juDIea7Kf1jUkskuFW9O0UpX9uS',
        isWornCount: 0,
        season: '春秋'
      }
    ],
    initialWardrobeItems: [
      {
        id: 'item_shir_polo',
        name: '牛津纺扣领衬衫',
        brand: 'POLO RALPH',
        category: 'top',
        tags: ['#重磅棉', '#经典款', '#极简'],
        material: '100% 纯棉',
        colorHex: '#FFFFFF',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3xaPoCvAzs_02nHvNKjGlPfwEE2mzOy3BfvRw3NUepkOolOJtAc1_QJGDdpHQ2HKQ1M_0jJOJEdzPuvSWufV0zHHM4IQhuOJbMFOSieJ_RrHm2qmVvFzvCvnC2g9JOx2HhpybpQmOCXUr3s77K9iuTmq4-jR_rG5C0ZJCyCWCdUEz7O2VHVsCwRkcrwSLINIRcFwKLtI6qBB0DBaDp6B_LB7ZW9-bjEZRWKCXi1ul8C2PNOEkQhYh6lVnMIeYzXvPh-_lTwbhUF0D',
        isWornCount: 14
      },
      {
        id: 'item_jeans_levi',
        name: '501 原创直筒裤',
        brand: "LEVI'S",
        category: 'bottom',
        tags: ['#丹宁', '#直筒裤', '#经典'],
        material: '100% 纯质丹宁',
        colorHex: '#3F51B5',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnb9QCyoa2Efs44UFpx_cnentXXYnMb62G35bQKS7HKlzdY06OhAfq2KOvDvTg_EwlXNrEEflhuVbX63x06GbburnzFmWsqgmOkywUDdYQ6CGITuSjU16YHjZcHMq2Nr54D3fk934jnwxSYKXQnyoz_BeUbWWllj2xPUQ7G6FFfnAEe_Kn0P9dd_C7jj7QXjVOdWSJSHgqVG7zLW5hu3atMP-JhopCoCxMhTNcesRqKScvRGYnVgjAq9cSoNnrcwf2wbKk8Nn9HTIJ',
        isWornCount: 18
      },
      {
        id: 'item_blazer_zara',
        name: '修身设计西装外套',
        brand: 'ZARA',
        category: 'outerwear',
        tags: ['#羊毛', '#修身', '#冷感'],
        material: '羊毛混纺',
        colorHex: '#121212',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrEtiGKycjtE-3PUldT-JHAjhc8c391ghwGWVG8EX1OjFsXVaWouQv8040T0v36t32aafV0c0GkAHMIYjaiLqrRcduGPd-UiC5kmxaOrQoGSbI9yXq6YXm3q7HfGW-dvp1WZE7IEGFfyIbFImmvPeE4-88VVLxdOKGYYXueVwTxk4a8i4KQqZuKt9-kpTXIUcsbv7-8brnWl6PNTc8ed6IXvfwosWn21qDhJppfnmUKAGKbgseeOmj59AT8vwi8bInOyBZ7kKt5bHT',
        isWornCount: 4
      },
      {
        id: 'item_sweat_uniq',
        name: '羊绒圆领保暖毛衣',
        brand: 'UNIQLO',
        category: 'top',
        tags: ['#羊绒', '#极简', '#松弛'],
        material: '100% 羊绒',
        colorHex: '#8F9779',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVKZ_x40PeluBUVgL9WyQOxIs-5viPvPkORHOpA2cPdaiS3RRtn-OpjHdTwDUGQLiLv4970NO0vi8kZrk6Yjzg41-KGJBWJXsc2YKtHwGjLqFkD7MeGH6Y2CUI_IGKmRZ3SdbmTKt43Y-FHtz-xwZwE818uW08G0CAIx0HHyQ0-fpKK0m4V6Yu8MYY7X6fUzOSWkUwJUN037mEBcpR4w_SrXcw7oWr0Ptneorti7T0xIk-Sj2GwUgrZ-FooHezYf6XhjmnOxD3oWSU',
        isWornCount: 9
      },
      {
        id: 'item_coat_lux',
        name: 'Tailored Overcoat',
        brand: 'SILK & WOOL',
        category: 'outerwear',
        tags: ['#双面呢', '#极薄'],
        material: '混真丝绒羊毛',
        colorHex: '#303030',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqj8w4PJZ9rMumoiBWD-GZLP6gVBmU9nXjzieU_P1eZDkoGs-9bpuD3Tw4Gck9YJ98wogfKnBmSSpxS84r6DQ0MZYVBG2vAVdTLSOW25KiwiP0g8glM50N5ktZXl_NBKB4RvDcxYmwc6-Lm431AE7ZQVfqnCN7NYYXObbXO0EBkJ-oFEsoovVmae8KrzO5ClLbeeeaMDAhVXtZVSE2tHiDf_GJZgcu9FNxYQX3z13IIioUMW6x37jZ3oeZGlDUL_HEqlMgs1qWjj4c',
        isWornCount: 22
      },
      {
        id: 'item_shoes_pumps',
        name: 'Geometric Pumps',
        brand: 'PREMIUM LEATHER',
        category: 'shoes',
        tags: ['#漆皮', '#高奢'],
        material: '亮面正皮',
        colorHex: '#1E2B4B',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYY1-c3C_eifvci0zk6cPTc6H9WvBY7PQre3J_tZ2NjrqwbePcoe_R_TCDGep8k4rL4yYJY6JpnyM_zQvf0sorNWaClWCGZ8lPLz-EMRIybgqnzyt39-89n3YOYosh8ifmI489rgmc2NqxeMyt5a5qHdDNOGj5qzZ5EY1kUPFSUF8kUMzITTa45kqYGELRGrh87WyNOyhER4-74bXD3ADzIejwpdt0XqdMLZ8_gKxCQWfwAEPTGTTWlMgfApMLVHibZ1zqPhfx58E4',
        isWornCount: 6
      }
    ],
    filteredItems: []
  },

  onLoad() {
    this.filterWardrobe();
  },

  onCategorySelect(e) {
    const cat = e.currentTarget.dataset.category;
    this.setData({
      selectedCategory: cat
    }, () => {
      this.filterWardrobe();
    });
  },

  onSearchInput(e) {
    this.setData({
      searchTerm: e.detail.value.toLowerCase()
    }, () => {
      this.filterWardrobe();
    });
  },

  filterWardrobe() {
    const { initialWardrobeItems, selectedCategory, searchTerm } = this.data;
    let filtered = initialWardrobeItems;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().indexOf(searchTerm) > -1 || 
        item.brand.toLowerCase().indexOf(searchTerm) > -1
      );
    }

    this.setData({
      filteredItems: filtered
    });
  },

  selectPending(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activePendingIndex: index
    });
    wx.showToast({
      title: '切换AI候选单品',
      icon: 'none'
    });
  },

  triggerAIReidentification() {
    wx.showLoading({
      title: 'AI 极智重新扫描'
    });

    setTimeout(() => {
      wx.hideLoading();
      const currentPending = this.data.pendingQueue[this.data.activePendingIndex];
      wx.showModal({
        title: '扫描核验成功',
        content: `AI 识别为：${currentPending.brand} - ${currentPending.name}\n面料：${currentPending.material}\n是否按此规格入库到衣橱？`,
        confirmText: '确认入库',
        cancelText: '重新扫描',
        success: (res) => {
          if (res.confirm) {
            const newItems = [...this.data.initialWardrobeItems];
            newItems.unshift({
              id: currentPending.id,
              name: currentPending.name,
              brand: currentPending.brand,
              category: currentPending.category,
              tags: currentPending.tags,
              material: currentPending.material,
              colorHex: currentPending.colorHex,
              imageUrl: currentPending.imageUrl,
              isWornCount: 1
            });

            const newPending = this.data.pendingQueue.filter((_, i) => i !== this.data.activePendingIndex);

            this.setData({
              initialWardrobeItems: newItems,
              pendingQueue: newPending,
              activePendingIndex: 0
            }, () => {
              this.filterWardrobe();
              wx.showToast({
                title: '成功入库新单品',
                icon: 'success'
              });
            });
          }
        }
      });
    }, 1200);
  },

  onAddItem() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        wx.showLoading({
          title: '上传识别中...'
        });
        setTimeout(() => {
          wx.hideLoading();
          wx.showToast({
            title: '已放入AI队列待识印',
            icon: 'success'
          });
        }, 1000);
      }
    });
  }
})
