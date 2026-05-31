// pages/calendar/calendar.js
Page({
  data: {
    currentYear: 2026,
    currentMonthName: '5月',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    
    // Calendar days matching May 2026 (Starts with Fri as May 1st)
    days: [
      { num: '', active: false, hasLog: false }, // empty pad
      { num: '', active: false, hasLog: false }, // empty pad
      { num: '', active: false, hasLog: false }, // empty pad
      { num: '', active: false, hasLog: false }, // empty pad
      { num: '', active: false, hasLog: false }, // empty pad
      { num: 1, active: false, hasLog: false },
      { num: 2, active: false, hasLog: false },
      { num: 3, active: false, hasLog: true },
      { num: 4, active: false, hasLog: true },
      { num: 5, active: false, hasLog: true },
      { num: 6, active: false, hasLog: true },
      { num: 7, active: false, hasLog: true },
      { num: 8, active: false, hasLog: false },
      { num: 9, active: false, hasLog: false },
      { num: 10, active: false, hasLog: true },
      { num: 11, active: false, hasLog: true },
      { num: 12, active: false, hasLog: true },
      { num: 13, active: true, hasLog: true }, // Default selected day
      { num: 14, active: false, hasLog: false },
      { num: 15, active: false, hasLog: false },
      { num: 16, active: false, hasLog: false },
      { num: 17, active: false, hasLog: false },
      { num: 18, active: false, hasLog: false },
      { num: 19, active: false, hasLog: false },
      { num: 20, active: false, hasLog: false },
      { num: 21, active: false, hasLog: false },
      { num: 22, active: false, hasLog: false },
      { num: 23, active: false, hasLog: false },
      { num: 24, active: false, hasLog: false },
      { num: 25, active: false, hasLog: false },
      { num: 26, active: false, hasLog: false },
      { num: 27, active: false, hasLog: false },
      { num: 28, active: false, hasLog: false },
      { num: 29, active: false, hasLog: false },
      { num: 30, active: false, hasLog: false },
      { num: 31, active: false, hasLog: false }
    ],

    selectedDayNum: 13,
    activeDayLog: {
      dateStr: '2026年05月13日',
      outfitName: '极简摩登大衣装',
      rating: 4,
      repeatAlert: true,
      items: [
        {
          id: 'log_coat_alt',
          name: '高级炭黑呢子大衣',
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHJ1OJkqqYrGNH-4GBYNWYIM4Qi4k5BRyIcD2JIc0pPe2r4T3Aru0-CTVTIY5kZg0JhB72qN6MfloEqkqOrwb2xrh_qZxVX9cw-d2fuVD80OowpXM0A0BakG8wpoLeQzincRZLkA73y4uje53mwyIYzbA_aQpEI-K2t_4EydF_HxpRxo2JoSiIxQtqkNw6oY-YW9PS83xNanqQgd1GvHJfi8G2hZ1LdCUzvg0iFHpozkgRI4hYbU7w32RhKj4MobdJIp9U1YJtwR7T'
        },
        {
          id: 'log_pants_alt',
          name: '微光感真丝通勤长裤',
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9S2YmEJgXpt5EuPI6JwBRaU8nhX1z2lhNco6Q3ST44mQT4H47BrBypZdYnDDjTh8G3KBa5GbjmfwzdQDpdV31L48BR-TA4djVVk04eWqIxlRQxRG0Mn3lmoOwEtmuAKLz9GZZUHef1yUZ7NbJdFR3sM0XwcZjcKbTqiWDQkMMhpGEUiw2VB4e-yF8_PpK1hcJehmJzO3YnBgYk2cBW8wo5zOmtOFIWivnKq5_FNp6dMnk1M0v_MDfJjpI8lI5RNLWp86pBlkciFF2'
        }
      ]
    },

    logsDatabase: {
      '3': { outfitName: '职场干练风', rating: 5, repeatAlert: false, items: [{ name: '修身设计西装外套', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrEtiGKycjtE-3PUldT-JHAjhc8c391ghwGWVG8EX1OjFsXVaWouQv8040T0v36t32aafV0c0GkAHMIYjaiLqrRcduGPd-UiC5kmxaOrQoGSbI9yXq6YXm3q7HfGW-dvp1WZE7IEGFfyIbFImmvPeE4-88VVLxdOKGYYXueVwTxk4a8i4KQqZuKt9-kpTXIUcsbv7-8brnWl6PNTc8ed6IXvfwosWn21qDhJppfnmUKAGKbgseeOmj59AT8vwi8bInOyBZ7kKt5bHT' }] },
      '4': { outfitName: '休闲白衬衣配原色牛仔', rating: 4, repeatAlert: true, items: [{ name: '牛津纺扣领衬衫', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3xaPoCvAzs_02nHvNKjGlPfwEE2mzOy3BfvRw3NUepkOolOJtAc1_QJGDdpHQ2HKQ1M_0jJOJEdzPuvSWufV0zHHM4IQhuOJbMFOSieJ_RrHm2qmVvFzvCvnC2g9JOx2HhpybpQmOCXUr3s77K9iuTmq4-jR_rG5C0ZJCyCWCdUEz7O2VHVsCwRkcrwSLINIRcFwKLtI6qBB0DBaDp6B_LB7ZW9-bjEZRWKCXi1ul8C2PNOEkQhYh6lVnMIeYzXvPh-_lTwbhUF0D' }] },
      '13': {
        outfitName: '极简摩登大衣装',
        rating: 4,
        repeatAlert: true,
        items: [
          { name: '高级炭黑呢子大衣', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHJ1OJkqqYrGNH-4GBYNWYIM4Qi4k5BRyIcD2JIc0pPe2r4T3Aru0-CTVTIY5kZg0JhB72qN6MfloEqkqOrwb2xrh_qZxVX9cw-d2fuVD80OowpXM0A0BakG8wpoLeQzincRZLkA73y4uje53mwyIYzbA_aQpEI-K2t_4EydF_HxpRxo2JoSiIxQtqkNw6oY-YW9PS83xNanqQgd1GvHJfi8G2hZ1LdCUzvg0iFHpozkgRI4hYbU7w32RhKj4MobdJIp9U1YJtwR7T' },
          { name: '微光感真丝通勤长裤', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9S2YmEJgXpt5EuPI6JwBRaU8nhX1z2lhNco6Q3ST44mQT4H47BrBypZdYnDDjTh8G3KBa5GbjmfwzdQDpdV31L48BR-TA4djVVk04eWqIxlRQxRG0Mn3lmoOwEtmuAKLz9GZZUHef1yUZ7NbJdFR3sM0XwcZjcKbTqiWDQkMMhpGEUiw2VB4e-yF8_PpK1hcJehmJzO3YnBgYk2cBW8wo5zOmtOFIWivnKq5_FNp6dMnk1M0v_MDfJjpI8lI5RNLWp86pBlkciFF2' }
        ]
      }
    }
  },

  onLoad() {
    // Initializer
  },

  selectDay(e) {
    const dayNum = e.currentTarget.dataset.day;
    if (!dayNum) return; // Pad cell

    const newDays = this.data.days.map(d => {
      d.active = (d.num === dayNum);
      return d;
    });

    const hasLog = this.data.logsDatabase[dayNum.toString()];
    let activeDayLog = null;

    if (hasLog) {
      activeDayLog = {
        dateStr: `2026年05月${dayNum < 10 ? '0' + dayNum : dayNum}日`,
        outfitName: hasLog.outfitName,
        rating: hasLog.rating,
        repeatAlert: hasLog.repeatAlert,
        items: hasLog.items
      };
    }

    this.setData({
      days: newDays,
      selectedDayNum: dayNum,
      activeDayLog: activeDayLog
    });

    wx.showToast({
      title: `查看 5月${dayNum}日`,
      icon: 'none'
    });
  },

  onTriggerRepeatAlert() {
    wx.showToast({
      title: '已重置防撞衫每日提醒',
      icon: 'success'
    });
  },

  addDayLog() {
    wx.showActionSheet({
      itemList: ['选择衣橱单品加入', '导入今日推荐穿搭', '一键生成自适应日程搭配'],
      success: (res) => {
        if (res.tapIndex === 1) {
          const dayNum = this.data.selectedDayNum;
          const key = dayNum.toString();
          
          const newDb = { ...this.data.logsDatabase };
          newDb[key] = {
            outfitName: 'AI 一键生成新日程搭配',
            rating: 5,
            repeatAlert: false,
            items: [
              { name: '501 原创直筒裤', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnb9QCyoa2Efs44UFpx_cnentXXYnMb62G35bQKS7HKlzdY06OhAfq2KOvDvTg_EwlXNrEEflhuVbX63x06GbburnzFmWsqgmOkywUDdYQ6CGITuSjU16YHjZcHMq2Nr54D3fk934jnwxSYKXQnyoz_BeUbWWllj2xPUQ7G6FFfnAEe_Kn0P9dd_C7jj7QXjVOdWSJSHgqVG7zLW5hu3atMP-JhopCoCxMhTNcesRqKScvRGYnVgjAq9cSoNnrcwf2wbKk8Nn9HTIJ' }
            ]
          };

          const newDays = this.data.days.map(d => {
            if (d.num === dayNum) d.hasLog = true;
            return d;
          });

          this.setData({
            logsDatabase: newDb,
            days: newDays
          }, () => {
            // Trigger load UI update
            const selectEvent = { currentTarget: { dataset: { day: dayNum } } };
            this.selectDay(selectEvent);
          });
        }
      }
    });
  }
})
