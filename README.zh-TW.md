# 🚀 50+ 精選 LINE Flex Message 範本庫

[English](README.md) | [日本語](README.ja.md)

**告別繁瑣的 JSON 嵌套，讓訊息開發回歸設計本質。**

本專案專為 LINE Bot 開發者與數位行銷團隊打造，收錄 50+ 套橫跨各產業的高品質 Flex Message 範本。所有設計均遵循 LINE 官方渲染引擎最佳實踐，確保在不同手機型號上皆有完美的視覺呈現。

---

## 📸 視覺範本展示
*所有範本均可透過 **[FlexCraft 可視化編輯器](https://liming.me)** 直接修改。*

| 餐飲美食 | 美容預約 | 電商熱銷 | 訂單通知 |
| :---: | :---: | :---: | :---: |
| ![餐廳](https://github.com/arieslee/line-flex-message-templates/blob/main/previews/1_zh-TW_餐廳咖啡店卡片.png?raw=true) | ![美業](https://github.com/arieslee/line-flex-message-templates/blob/main/previews/2_zh-TW_美業預約卡片.png?raw=true) | ![商品](https://github.com/arieslee/line-flex-message-templates/blob/main/previews/4_zh-TW_商品卡片.png?raw=true) | ![訂單](https://github.com/arieslee/line-flex-message-templates/blob/main/previews/5_zh-TW_訂單確認.png?raw=true) |
| [JSON 代碼](./jsons/1_zh-TW_餐廳咖啡店卡片.json) | [JSON 代碼](./jsons/2_zh-TW_美業預約卡片.json) | [JSON 代碼](./jsons/4_zh-TW_商品卡片.json) | [JSON 代碼](./jsons/5_zh-TW_訂單確認.json) |

---

## 🔥 為什麼選擇本專案？

- **解決渲染痛點**：完美應對 iOS 與 Android 端的字體位移、圖片變形等渲染差異。
- **全產業覆蓋**：包含餐飲、電商、教育、系統警報、個人名片等 50 種以上範本。
- **可視化編輯**：支援 [FlexCraft](https://liming.me)，讓非開發人員也能輕鬆透過拖拽調整排版。
- **極致開發效率**：僅需「複製、貼上」，即可完成原本需要數小時調整的複雜佈局。

## 📂 範本分類概覽
- **商業應用**：數位名片、會議邀請函、活動報名表。
- **零售電商**：訂單明細收據、限時優惠券、商品畫廊。
- **餐飲服務**：電子菜單、預約確認卡、店家位置導航。
- **系統通知**：OTP 驗證碼、維護公告、異常警報。


## 🛠️ 開發者整合

```javascript
const flexContents = require('./jsons/5_zh-TW_訂單確認.json');

// Send via LINE Messaging API SDK
client.pushMessage(userId, {
  type: 'flex',
  altText: 'Your Order is Confirmed',
  contents: flexContents
});
```

---
Designed with ❤️ by [Li Ming](https://liming.me). 如果本專案對你有幫助，請給一個 ⭐ 支持！