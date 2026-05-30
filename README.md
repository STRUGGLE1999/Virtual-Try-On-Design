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

我们在下方为您展示了 5 个核心交互页面的真实移动端小程序原型截图：

<table width="100%">
  <tr>
    <td width="33%" align="center">
      <b>🏠 1. 智能穿搭推荐 (首页)</b><br/><br/>
      <img src="https://github.com/user-attachments/assets/87968274-2af4-4907-9659-a2be7ec18145" alt="智能穿搭首页推荐" referrerPolicy="no-referrer" style="border-radius: 16px; border: 1px solid #eaeaea; margin-bottom: 8px;" width="100%"/>
      <p align="left"><font size="2" color="gray"><b>设计亮点：</b> 顶部展示天气极简卡片、精美推荐封面，以及多功能快捷入口（单品识别、虚拟试穿、买前试穿等）。</font></p>
    </td>
    <td width="33%" align="center">
      <b>👚 2. 精致数字衣橱 (衣橱)</b><br/><br/>
      <img src="input_file_1.png" alt="高级数字衣橱" referrerPolicy="no-referrer" style="border-radius: 16px; border: 1px solid #eaeaea; margin-bottom: 8px;" width="100%"/>
      <p align="left"><font size="2" color="gray"><b>设计亮点：</b> 可视化卡片滑动式「AI 识别队列」，对上新单品材质、品类、颜色和风格标签进行无感识别入库。</font></p>
    </td>
    <td width="33%" align="center">
      <b>✨ 3. AI 智能搭配 (搭配)</b><br/><br/>
      <img src="input_file_2.png" alt="AI智能组合推荐" referrerPolicy="no-referrer" style="border-radius: 16px; border: 1px solid #eaeaea; margin-bottom: 8px;" width="100%"/>
      <p align="left"><font size="2" color="gray"><b>设计亮点：</b> 匹配度、风格风险与复穿度数字化量化，生成科学配比多件套，可对内搭/鞋履/下装点击智能一键重组。</font></p>
    </td>
  </tr>
  <tr>
    <td width="33%" align="center">
      <b>📅 4. 穿法出行日历 (日历)</b><br/><br/>
      <img src="input_file_3.png" alt="穿搭出行日历日程" referrerPolicy="no-referrer" style="border-radius: 16px; border: 1px solid #eaeaea; margin-bottom: 8px;" width="100%"/>
      <p align="left"><font size="2" color="gray"><b>设计亮点：</b> 极简月历式行程提醒，每天日程深度联结穿搭打卡记录，可一键批量设置气味、满意度星级与明日出行提醒。</font></p>
    </td>
    <td width="33%" align="center">
      <b>👤 5. 个人档案中心 (我的)</b><br/><br/>
      <img src="input_file_4.png" alt="个人穿搭健康档案" referrerPolicy="no-referrer" style="border-radius: 16px; border: 1px solid #eaeaea; margin-bottom: 8px;" width="100%"/>
      <p align="left"><font size="2" color="gray"><b>设计亮点：</b> 体维与形象特征模型（身高、体重、沙漏体型），衣橱诊断等级大底盘（利用率、闲置比率与缺口推荐）。</font></p>
    </td>
    <td width="33%" align="center" valign="top">
      <b>🔗 联结互动设计理念</b><br/><br/>
      <div style="text-align: left; background-color: #f9f9f9; padding: 12px; border-radius: 14px; border: 1px solid #eaeaea; height: auto;">
        <font size="2" color="gray">
          ● <b>微信双胶囊按键</b> 实时弹出底部快捷工具：提供「发送给朋友」、「朋友圈打卡」、「加入收藏」、「关于我们」等菜单。<br/>
          ● <b>微动画流畅体验</b>：所有的视图切换与浮窗在移动设备中拥有平滑缓动，提供舒适的微信生态沉浸感。
        </font>
      </div>
    </td>
  </tr>
</table>

---

## 🛠️ 技术实现要点

* **驱动框架：** React 18 & TypeScript
* **动态编译机制：** Vite HMR Disabled Mode, 支持热打包 Cloud Run 服务
* **设计语言：** 移动优先的 Tailwind CSS 响应式原子化框架配合
* **动态模拟器容器：** 外围包裹有立体硬核磨砂感「黑色智能机边框」，在电脑屏幕上查看亦可获得等同于物理真机屏幕的纵横比（Perfect Mobile Ratio）。
