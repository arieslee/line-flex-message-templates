# 🚀 50+ Premium LINE Flex Message Templates

[日本語](README.ja.md) | [繁體中文](README.zh-TW.md)

**Stop hand-coding complex nested JSON.** This repository provides 50+ professionally designed, production-ready LINE Flex Message templates. Optimized for high conversion and pixel-perfect rendering across iOS and Android.

---

## 📸 Preview Gallery
*All templates are captured from [FlexCraft Editor](https://liming.me).*

| Restaurant & Cafe | Beauty & Salon | E-commerce | Order Confirmation |
| :---: | :---: | :---: | :---: |
| ![Cafe](https://github.com/arieslee/line-flex-message-templates/blob/main/previews/1_zh-TW_餐廳咖啡店卡片.png?raw=true) | ![Salon](https://github.com/arieslee/line-flex-message-templates/blob/main/previews/2_zh-TW_美業預約卡片.png?raw=true) | ![Product](https://github.com/arieslee/line-flex-message-templates/blob/main/previews/4_zh-TW_商品卡片.png?raw=true) | ![Order](https://github.com/arieslee/line-flex-message-templates/blob/main/previews/5_zh-TW_訂單確認.png?raw=true) |
| [Get JSON](./jsons/1_zh-TW_餐廳咖啡店卡片.json) | [Get JSON](./jsons/2_zh-TW_美業預約卡片.json) | [Get JSON](./jsons/4_zh-TW_商品卡片.json) | [Get JSON](./jsons/5_zh-TW_訂單確認.json) |

---

## ✨ Key Features

- **Pixel-Perfect Consistency**: Deeply tested to ensure identical rendering on both iOS and Android.
- **Industry Standard UX**: Ready-made layouts for E-commerce, F&B, Education, and FinTech.
- **Visual Editing Support**: 100% compatible with [FlexCraft](https://liming.me). Import any JSON to modify colors and content visually.
- **Developer Optimized**: Clean, validated JSON structures following LINE's latest rendering best practices.

## 📂 Template Categories
- **E-commerce**: Product showcases, flash sale coupons, order receipts.
- **Services**: Digital menus, reservation confirmations, location cards.
- **System Notifications**: OTP verification, maintenance notices, error alerts.
- **Personal**: Digital business cards, portfolio showcases, greeting cards.

## 🛠️ Usage
1. Browse the `previews/` folder to find a design.
2. Copy the corresponding JSON from the `jsons/` folder.
3. Use it in your LINE Messaging API project or LINE OA Manager.

## 🛠️ Developer Integration
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
Designed with ❤️ by [Li Ming](https://liming.me). **Give us a ⭐** if this repository helps!