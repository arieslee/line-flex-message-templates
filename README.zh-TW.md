# 🚀 50+ 精選 LINE Flex Message 範本庫

**專為 LINE Bot 開發者與數位行銷團隊打造的頂級設計庫。**

還在為 LINE Flex Message 複雜的層級結構感到頭痛嗎？本專案提供 50+ 套橫跨各產業的專業範本，讓你僅需「複製、貼上」，即可擁有大廠等級的訊息視覺效果。所有範本均經過實機渲染優化，確保在 iOS 與 Android 上皆有完美表現。

---

## 📸 範本視覺展示
*所有範本均可透過 **[FlexCraft 可視化編輯器](https://liming.me)** 直接修改。*

| 餐飲美食 | 美容預約 | 電商展示 | 訂單確認 |
| :---: | :---: | :---: | :---: |
| <img src="previews/1_zh-TW_☕%20餐廳_咖啡店卡片.png" width="200"> | <img src="previews/2_zh-TW_✂️%20美業預約卡片.png" width="200"> | <img src="previews/4_zh-TW_🛍️%20商品卡片.png" width="200"> | <img src="previews/5_zh-TW_🧾%20訂單確認.png" width="200"> |
| [JSON](./jsons/1_zh-TW_☕%20餐廳_咖啡店卡片.json) | [JSON](./jsons/2_zh-TW_✂️%20美業預約卡片.json) | [JSON](./jsons/4_zh-TW_🛍️%20商品卡片.json) | [JSON](./jsons/5_zh-TW_📄%20訂單確認.json) |

---

## 🔥 專案價值與特色

- **解決渲染痛點**：針對 LINE iOS/Android 端進行深度調優，避免常見的字體位移、圖片變形與邊距縮進問題。
- **全產業覆蓋**：包含餐飲、電商、教育、系統警報、個人名片等 50 種以上常用範本。
- **完全可視化支援**：所有 JSON 檔案皆可導入 **[FlexCraft](https://liming.me)**，讓設計師也能直接調整排版，無需依賴工程師。
- **極致開發效率**：僅需複製 JSON 內容，即可完成原本需要數小時調整的複雜 Flex 佈局。

## 📂 範本類別概覽
- **商業與辦公**：數位名片、會議邀請函、專案進度卡、活動票券。
- **零售與電商**：熱銷商品展示、訂單收據明細、滿額優惠券、限時快閃卡片。
- **餐飲與服務**：可視化數位菜單、預約成功通知、店家導航位置卡。
- **系統與通知**：OTP 驗證碼、維護公告、系統異常警報。

## ⚙️ 開發者整合 (Developer Integration)
您可以直接讀取 `jsons/` 目錄下的檔案，並將內容傳遞至 LINE Messaging API。

**Node.js 範例：**
```javascript
const flexContents = require('./jsons/5_zh-TW_訂單確認.json');

// 使用 LINE SDK 發送訊息
client.replyMessage(event.replyToken, {
  type: 'flex',
  altText: '您的訂單已確認',
  contents: flexContents
});
```

---
Designed with ❤️ by [Li Ming](https://liming.me). 如果本專案對你有幫助，請給一個 ⭐ 支持！