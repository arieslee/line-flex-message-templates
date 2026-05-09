# 🚀 50+ Premium LINE Flex Message Templates

[日本語](README.ja.md) | [繁體中文](README.zh-TW.md)

**Stop hand-coding complex nested JSON.** This repository is a curated collection of 50+ professional, production-ready LINE Flex Message templates. Optimized for high conversion and pixel-perfect rendering across both iOS and Android devices.

---

## 📸 Preview Gallery
*Captured from [FlexCraft Editor](https://liming.me).*

| Restaurant & Cafe | Beauty & Salon | E-commerce | Order Confirmation |
| :---: | :---: | :---: | :---: |
| <img src="previews/1_zh-TW_☕%20餐廳_咖啡店卡片.png" width="200"> | <img src="previews/2_zh-TW_✂️%20美業預約卡片.png" width="200"> | <img src="previews/4_zh-TW_🛍️%20商品卡片.png" width="200"> | <img src="previews/5_zh-TW_🧾%20訂單確認.png" width="200"> |
| [JSON](./jsons/02_zh-TW_美業預約卡片.json) | [JSON](./jsons/2_zh-TW_✂️%20美業預約卡片.json) | [JSON](./jsons/04_zh-TW_商品卡片.json) | [JSON](./jsons/05_zh-TW_訂單確認.json) |

---

## ✨ Why Choose This Library?

- **Cross-Platform Consistency**: Deeply optimized to prevent layout shifts and font rendering issues between iOS and Android.
- **Industry Standard UX**: Ready-made layouts for F&B, Retail, Education, and System Notifications.
- **Visual Editing Support**: 100% compatible with [FlexCraft](https://liming.me). Import any JSON to modify colors and content visually without touching code.
- **Developer Productivity**: Save 90% of your time by copy-pasting validated JSON structures instead of manual coding.

## 📂 Template Categories
- **Business**: Digital business cards, meeting invites, project trackers, event tickets.
- **E-commerce**: Product showcases, order receipts, discount coupons, flash sale alerts.
- **Hospitality**: Digital menus, reservation confirmations, location maps.
- **System**: OTP verification, maintenance notices, error reports.

## ⚙️ Developer Integration
Directly load JSON files from the `jsons/` folder and pass the content to the LINE Messaging API SDK.

**Node.js Example:**
```javascript
const flexContents = require('./jsons/5_zh-TW_訂單確認.json');

// Send via LINE Messaging API SDK
client.replyMessage(event.replyToken, {
  type: 'flex',
  altText: 'Order Confirmed',
  contents: flexContents
});
```

---
Designed with ❤️ by [Li Ming](https://liming.me). **Give us a ⭐** if this repository helps!