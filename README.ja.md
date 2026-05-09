# 🚀 LINE Flex Message 高品質テンプレート集 (50種類以上)

[English](README.md) | [繁體中文](README.zh-TW.md)

**複雑な JSON の手書きは、もう必要ありません。**

このリポジトリは、LINE Messaging API を利用する開発者のためのプロ仕様テンプレート集です。50種類以上の検証済みレイアウトを収録し、**Nuxt 4** や **FlexCraft** との親和性も抜群です。

---

## 📸 テンプレートプレビュー
*すべてのプレビューは **[FlexCraft](https://liming.me)** で視覚的にカスタマイズ可能です。*

| 飲食・カフェ | 美容・サロン | EC・商品 | 注文確認 |
| :---: | :---: | :---: | :---: |
| <img src="previews/1_ja_レストラン・カフェ.png" width="200"> | <img src="previews/2_ja_美容・サロン予約.png" width="200"> | <img src="previews/4_ja_商品カード.png" width="200"> | <img src="previews/5_ja_注文確認.png" width="200"> |
| [JSON](./jsons/1_ja_レストラン・カフェ.json) | [JSON](./jsons/2_ja_美容・サロン予約.json) | [JSON](./jsons/4_ja_商品カード.json) | [JSON](./jsons/5_ja_注文確認.json) |
---

## ✨ このプロジェクトのメリット

- **開発スピードの劇的向上**：検証済みの JSON 構造により、レイアウト調整の手間を徹底的に排除。
- **マルチデバイス対応**：iOS と Android での表示差異を最小限に抑えた高品質なコーディング。
- **ビジュアル編集対応**：[FlexCraft](https://liming.me) にインポートして、ノーコードで自由に色やレイアウトを調整可能。

## 📂 収録カテゴリ
- **ビジネス**: デジタル名刺、ミーティング案内、イベントチケット。
- **EC・リテール**: 領収書、商品カタログ、限定クーポン。
- **飲食**: デジタルメニュー、予約完了通知、店舗案内。
- **システム通知**: メンテナンス告知、認証コード、アラート通知。


## 🛠️ 開発者向けインテグレーション

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
Designed with ❤️ by [Li Ming](https://liming.me). 役に立ったら ⭐ をお願いします！