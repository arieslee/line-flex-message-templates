# 🚀 50+ Premium LINE Flex Message Templates

[日本語](README.ja.md) | [繁體中文](README.zh-TW.md)

**Stop hand-coding complex nested JSON.** This repository is a curated collection of 50+ professional, production-ready LINE Flex Message templates. Optimized for high conversion and pixel-perfect rendering across both iOS and Android devices.

---

## 📸 Preview Gallery
*All templates can be visually customized via **[FlexCraft Editor](https://liming.me)**.*

| Restaurant & Cafe | Beauty & Salon | E-commerce | Order Confirmation |
| :---: | :---: | :---: | :---: |
| ![Cafe](https://github.com/arieslee/line-flex-message-templates/blob/main/previews/1_zh-TW_%E9%A4%90%E5%BB%B3%E5%92%96%E5%95%A1%E5%BA%97%E5%8D%A1%E7%89%87.png?raw=true) | ![Salon](https://github.com/arieslee/line-flex-message-templates/blob/main/previews/2_zh-TW_%E7%BE%8E%E6%A5%AD%E9%A0%90%E7%B4%84%E5%8D%A1%E7%89%87.png?raw=true) | ![Product](https://github.com/arieslee/line-flex-message-templates/blob/main/previews/4_zh-TW_%E5%95%86%E5%93%81%E5%8D%A1%E7%89%87.png?raw=true) | ![Order](https://github.com/arieslee/line-flex-message-templates/blob/main/previews/5_zh-TW_%E8%A8%BA%E5%96%AE%E7%A2%BA%E8%AA%8D.png?raw=true) |
| [Get JSON](./jsons/1_zh-TW_%E9%A4%90%E5%BB%B3%E5%92%96%E5%95%A1%E5%BA%97%E5%8D%A1%E7%89%87.json) | [Get JSON](./jsons/2_zh-TW_%E7%BE%8E%E6%A5%AD%E9%A0%90%E7%B4%84%E5%8D%A1%E7%89%87.json) | [Get JSON](./jsons/4_zh-TW_%E5%95%86%E5%93%81%E5%8D%A1%E7%89%87.json) | [Get JSON](./jsons/5_zh-TW_%E8%A8%BA%E5%96%AE%E7%A2%BA%E8%AA%8D.json) |

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