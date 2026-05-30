# VOGUE AI 智能穿搭 - 微信小程序原型
> **优雅、高效、智能的个人数字衣橱管理与穿搭助手**

本项是一个针对**微信小程序环境**进行深度定制与视觉适配的模型原型应用程序。程序不仅完美保留了核心的 AI 智能搭配和衣橱分析模块，还针对微信小程序内嵌环境设计了经典的 **微信小程序顶栏胶囊控制按钮 (WeChat Capsule)**、**模拟 iOS/Android 端移动状态栏** 以及一套完整的模拟 **微信特色交互式 ActionSheet 分享面板** 与 **高对比绿态 Toast 弹窗反馈机制**。

* **线上演示体验（推荐用手机或浏览器模拟器查看）：**
  * **🎯 演示发布版 (Shared/Publish URL):** [https://ais-pre-jizggzswyagmblfjcshf4k-205002041116.us-east1.run.app](https://ais-pre-jizggzswyagmblfjcshf4k-205002041116.us-east1.run.app)
  * **🛠️ 开发者预览版 (Development URL):** [https://ais-dev-jizggzswyagmblfjcshf4k-205002041116.us-east1.run.app](https://ais-dev-jizggzswyagmblfjcshf4k-205002041116.us-east1.run.app)

---

## 🎨 微信小程序专属适配特色

为了在标准的 Web App 主线框架上真实地表现出微信内嵌小程序的高级拟真原型感，我们特别打磨了以下移动端和小程序 UI 底座：

1. **拟真移动状态栏 (Simulated System Status Bar)**
   * 在顶端集成了 iOS 风的纯白状态栏，支持**实时动态时间刷新**机制。
   * 同时配备了蜂窝 5G 信号强度指示图标、无线电量以及手机听筒黑孔微刘海形态。

2. **微信官方视觉：双联圆形小程序胶囊 (WeChat Capsule Bar)**
   * **左侧「三点 (More)」按钮：** 轻点直接唤醒高拟真的深色遮罩半屏 **微信 ActionSheet 分享与重载小工具菜单**。
   * **右侧「闭环 (Close)」按钮：** 优雅模拟退出小程序操作，配合提示弹幕，无需断开连接及报错直接支持一键返回与重置。

3. **高拟真半屏分享菜单与 ActionSheet 抽屉**
   * 集成标准微信风格：**发送给朋友 (私聊讨论)**、**分享到朋友圈 (生成图文)**、**我的收藏**、**添加到我的小程序**、**重新加载虚拟树**、**反馈与投诉**等六个核心模拟功能，以及退出按钮、小程序版本号详情栏。
   * 采用微交互回弹动画（Micro-Interactions via motion/react），从屏幕下方弹性弹出，并带高对比纯黑不透明遮罩层。

4. **精致墨绿色轻量微信弹窗 (WeChat Standard Toast)**
   * 轻量级的悬浮气泡，采用小程序规范中经典的黑色半透明背景配合亮绿（Emerald）提示图标与文字，轻响 2.5 秒后自动隐退，体验丝般顺滑。

---

## 👔 核心功能板块结构与原型图预览

在保留小程序底座的同时，主线业务板块（各个底栏选项卡）的颜色色调、亮色质感、交互设计和配色哲学均保持了时尚奢华的主色调，给您营造出完美的“掌上时尚试衣间”体验：

### 📸 小程序原型界面预览 (Prototype Mockup Previews)

<table width="100%">
  <tr>
    <td width="50%" align="center">
      <b>🏠 1. 智能穿衣推荐（小程序首页）</b><br/><br/>
      <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600" alt="智能穿搭首页推荐" referrerPolicy="no-referrer" style="border-radius: 12px; margin-bottom: 8px;" width="100%"/>
      <p align="left"><font size="2" color="gray"><b>设计亮点：</b> 顶部展示当地天气与今日空气质量，AI 根据气温自动进行材质推荐。配有简洁的场合及风格过滤操作，展现时尚流利的大图精美推荐。</font></p>
    </td>
    <td width="50%" align="center">
      <b>👚 2. 可视化衣橱（我的数字衣柜）</b><br/><br/>
      <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=600" alt="可视化数字衣柜" referrerPolicy="no-referrer" style="border-radius: 12px; margin-bottom: 8px;" width="100%"/>
      <p align="left"><font size="2" color="gray"><b>设计亮点：</b> 采用 2×2 精美格子布局，带分类过滤切片（上装、下装、鞋履、配饰），支持输入框模糊实时搜索，更有智能上架管理，打理每一件精美服饰。</font></p>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <b>✨ 3. AI 智能搭配（单品组合看板）</b><br/><br/>
      <img src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=600" alt="AI智能组合推荐" referrerPolicy="no-referrer" style="border-radius: 12px; margin-bottom: 8px;" width="100%"/>
      <p align="left"><font size="2" color="gray"><b>设计亮点：</b> 内置「生成新搭配」、「今日幸运色」双模式引擎。AI 自动拼出高契合度单品配方。支持一键重组、喜爱款快捷收藏保存。</font></p>
    </td>
    <td width="50%" align="center">
      <b>📅 4. 穿穿搭日历（出行穿搭行程指南）</b><br/><br/>
      <img src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600" alt="穿搭出行日历日程" referrerPolicy="no-referrer" style="border-radius: 12px; margin-bottom: 8px;" width="100%"/>
      <p align="left"><font size="2" color="gray"><b>设计亮点：</b> 月历日程与穿搭管理完美绑定。轻松添加派对、会议或休闲运动行程，一键附上最合心水的当日搭配，出行大步流星、自信随心。</font></p>
    </td>
  </tr>
</table>

---

## 🛠️ 技术实现要点

* **驱动框架：** React 18 & TypeScript
* **动态编译机制：** Vite HMR Disabled Mode, 支持热打包 Cloud Run 服务
* **设计语言：** 移动优先的 Tailwind CSS 响应式原子化框架配合
* **动态模拟器容器：** 外围包裹有立体硬核磨砂感「黑色智能机边框」，在电脑屏幕上查看亦可获得等同于物理真机屏幕的纵横比（Perfect Mobile Ratio）。
