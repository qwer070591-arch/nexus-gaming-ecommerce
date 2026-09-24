# NEXUS — Gaming E-commerce

NEXUS 是一個以高階 Gaming Hardware 為主題的前端電商作品集專案。

專案以 Vue 3 + Vite 建立，聚焦於產品瀏覽、商品篩選、購物車、收藏清單與電商常見互動流程，並透過 Responsive Design 與一致的 UI 回饋，打造完整的單頁式購物體驗。

> 此專案為前端作品集專案。Login、Register、Checkout 與 Account 為 Demo 流程，目前未串接真實後端、付款服務或會員資料庫。

---

## Live Demo

🔗 [View Live Demo](https://nexus-gaming-ecommerce.vercel.app)

---

## 專案畫面

### 首頁

![NEXUS 首頁](./docs/screenshots/home.png)

### 商品列表

![NEXUS 商品列表](./docs/screenshots/products.png)

### 商品詳情

![NEXUS 商品詳情](./docs/screenshots/products-detail.png)

### 購物車

![NEXUS 購物車](./docs/screenshots/cart.png)

---

## 專案介紹

此專案以「專業遊戲周邊選購」為情境，練習將產品資料、篩選邏輯、狀態管理與電商常見互動整合到 Vue 3 介面中。

視覺方向採用黑、白與 Acid Green 作為主要配色，搭配大型產品圖片、清楚的資訊層級與一致的互動回饋，呈現 Gaming Hardware 電商的品牌風格。

專案目前以 Frontend 為主要開發範圍，商品資料由前端資料檔管理，Cart 與 Wishlist 則使用 Browser `localStorage` 保存狀態。

---

## 主要功能

- **商品目錄**
  - 提供 24 項 Gaming Hardware 商品資料
  - 支援不同商品分類瀏覽

- **搜尋與篩選**
  - 關鍵字搜尋
  - 商品分類
  - 價格範圍
  - Deals
  - Featured Products

- **商品排序**
  - Featured
  - 評分
  - 價格由低至高
  - 價格由高至低

- **商品詳情**
  - 商品資訊
  - 規格資訊
  - 圖片 Gallery
  - 數量選擇
  - Related Products

- **Wishlist**
  - 加入收藏
  - 取消收藏
  - 使用 `localStorage` 保存狀態

- **Cart**
  - 加入購物車
  - 修改商品數量
  - 移除商品
  - 運費計算
  - 購物車總額計算
  - 使用 `localStorage` 保存狀態

- **Checkout Demo**
  - 收件資料
  - 運送方式
  - 付款方式
  - 完成 Demo Order 後清空購物車

- **Login / Register Demo**
  - 基本表單驗證
  - Login / Register 前端流程
  - Demo Account 操作

- **Toast Feedback**
  - 加入購物車
  - Wishlist
  - Login / Register
  - Checkout
  - Account 操作

- **Responsive Design**
  - Desktop / Tablet / Mobile
  - 手機版 Navigation
  - 商品篩選 Drawer
  - Responsive Product Grid

---

## UI / UX 設計

- 以 Gaming Hardware E-commerce 為主要視覺方向
- 黑白基底搭配 Acid Green 強調色
- 維持一致的商品卡與圖片比例
- Product Detail 使用 Gallery 呈現產品圖片
- 清楚區分 Primary / Secondary Actions
- 互動元件提供 Hover 與 Focus 狀態
- 關鍵操作提供 Toast Feedback
- 支援 Keyboard Navigation 的主要互動元件
- Responsive Layout 適應不同螢幕尺寸

---

## 技術使用

- [Vue 3](https://vuejs.org/)
  - Composition API
  - Component-based UI
  - Reactive State
  - Computed State

- [Vite](https://vite.dev/)
  - Development Server
  - Production Build

- JavaScript
  - ES Modules
  - Event Handling
  - Browser APIs

- CSS
  - Responsive Layout
  - CSS Variables / Design Tokens
  - Component States
  - Mobile Navigation

- Browser `localStorage`
  - Cart Persistence
  - Wishlist Persistence
  - Defensive Data Validation

- History API
  - Client-side Navigation
  - Query Parameters

- Playwright
  - Browser-based Functional QA
  - Navigation Testing
  - Cart / Wishlist Flow Verification
  - Console Error Checking

---

## 測試與品質驗證

專案完成後進行 Production Build 與實際瀏覽器功能驗證。

### Production Build

```bash
npm run build
```

Production Build 驗證成功。

### Browser QA

使用 Playwright 實際操作並驗證主要使用流程：

- 首頁載入
- Navigation
- Products 商品列表
- Product Detail
- Featured Products 篩選
- Cart 加入商品
- Cart 數量修改
- Cart 商品移除
- Wishlist 收藏 / 取消收藏
- Cart / Wishlist `localStorage` Persistence
- Login / Register Demo
- Account Save Feedback
- JavaScript / Vue Runtime Console Errors

主要測試流程未發現 JavaScript 或 Vue Runtime Error。

> Playwright 目前用於開發階段的瀏覽器 QA，尚未建立為專案內正式的自動化 E2E Test Suite。

---

## 專案結構

```text
src/
├─ assets/          # 全域樣式與靜態資源
├─ components/      # Header、Footer、商品卡、Filter、Toast 等可重用元件
├─ composables/     # Cart 與 Wishlist 狀態管理
├─ data/            # 商品與分類資料
├─ utils/           # 金額格式化等共用工具
├─ views/           # 首頁、商品、詳情、購物車、Checkout、Account 等頁面
├─ App.vue          # 應用程式頁面與路由狀態
└─ main.js          # Vue Application Entry

public/
└─ images/          # 商品圖片與 Gallery Assets
```

---

## 安裝與執行

Clone 專案後安裝 dependencies：

```bash
npm install
```

啟動 Development Server：

```bash
npm run dev
```

建立 Production Build：

```bash
npm run build
```

預覽 Production Build：

```bash
npm run preview
```

---

## 開發重點

### Data-driven Components

商品列表與商品詳情皆由資料驅動，避免為不同商品重複建立相同 UI 結構。

### State Management

將購物車與收藏相關邏輯集中於 `useStore` composable，並透過 `localStorage` 保存使用者狀態。

針對異常或格式錯誤的 localStorage 資料加入防禦性驗證，避免錯誤資料造成 Runtime Error。

### Product Filtering

商品搜尋、分類、Featured、Deals、價格與排序透過 Reactive / Computed State 處理，維持 UI 與資料狀態一致。

### Responsive UI

依照 Desktop、Tablet 與 Mobile 調整 Navigation、商品 Grid、Filter 與主要操作區域。

### Client-side Navigation

使用 Browser History API 處理頁面切換與 Query Parameters，在不額外依賴 Router Library 的情況下維持輕量化 SPA Navigation。

---

## 後續改善

- 串接 Backend API
- 建立真實會員驗證系統
- 建立會員與訂單資料庫
- 串接實際付款流程
- 建立正式 Playwright E2E Test Suite
- 補充 Unit Test / Component Test
- 導入 CI，自動執行 Build 與 Test
