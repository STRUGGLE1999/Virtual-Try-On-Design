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
      <img src="input_file_0.png" alt="智能穿搭首页推荐" referrerPolicy="no-referrer" style="border-radius: 16px; border: 1px solid #eaeaea; margin-bottom: 8px;" width="100%"/>
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

## 🛠️ 设计方案与技术实现

* **原型框架：** React 18 & TypeScript + Tailwind CSS 自适应层。
* **原生方案：** 已为您同步生成符合腾讯官方规范的 **微信小程序原生代码框架 (WeChat Native WXML/WXSS/JS/JSON)**。它位于项目根目录下的 `/wechat-miniprogram` 文件夹中。

---

## 🚀 微信开发者工具导入与运行指南 (WeChat Native Code Deployment)

想直接在真机、模拟器或 **微信开发者工具** 中体验或发布这款时尚穿搭小程序？请按照以下极简步骤操作：

### 1. 导出/下载小程序原生工程
* 您可以通过 AI Studio 的右侧文件树或设置导出菜单，下载 **整个项目 ZIP 包** 或是只提取 `wechat-miniprogram` 独立文件夹。
* `/wechat-miniprogram` 文件夹已按微信官方标准规划好目录结构：
  ```bash
  wechat-miniprogram/
  ├── app.js           # 全局配置 & 生命周期 & 林夏等初始画像数据
  ├── app.json         # 底部 5 大 Tab 路由导航、顶栏配色与窗口配置
  ├── app.wxss         # 极致高对比度奢华设计全局样式底盘
  └── pages/           # 五大时尚模块核心页面
      ├── home/        # 1. 智能穿搭推荐主页
      ├── wardrobe/    # 2. 数字实景衣橱（含动态AI队列）
      ├── match/       # 3. AI 交互式衣片重组/合体试穿板
      ├── calendar/    # 4. 行程穿搭日记记录日历
      └── mine/        # 5. 体型档案及诊断分析中心
  ```

### 2. 导入到微信开发者工具
1. 打开 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)。
2. 选择 **「小程序」**，点击右侧的 **「+ (新建/导入)」**。
3. **选择项目目录：** 将路径指定为您下载或提取的 `wechat-miniprogram` 文件夹（也就是包含 `app.json` 的直属目录）。
4. **AppID：** 
   * 如果您只是离线预览或调试功能，可以选择 **「测试号 (游客模式)」**；
   * 如果您拥有自己的小程序账号，可填入您微信公众平台的 `AppID`，即可一键上传至草稿箱并进行真机扫码预览。
5. 点击 **「确定/导入」**。

### 3. 特色互动核验
* **AI 真实数据同步：** 预置了牛津纺衬衫、CELINE大衣等时尚单品的在线高清资源图，无任何本地损坏报错风险。
* **双模态快捷交互：** 
  * 在「衣橱」页轻点 AI 识别队列单品，然后点击 **「确认入库」** 即可瞬间将服装移动到「我的衣橱」格子里。
  * 在「搭配」页轻点三大卡片槽，会即刻唤起底部半屏组件，选择心水单品进行一键换装，重新计算得分。
  * 在「日历」页点击有蓝色标记的日期（3-7、10-13日），下方将无缝呈现那天的打卡穿衣、星级打分以及防撞衫警报状态。

