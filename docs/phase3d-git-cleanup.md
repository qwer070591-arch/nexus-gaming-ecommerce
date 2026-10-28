# NEXUS Phase 3D — Git Release Content Cleanup

檢查日期：2026-10-28。範圍：目前工作樹的公開內容整理；沒有 Stage、Commit、Push、部署或 Git 歷史改寫。Phase 3C 的 60 檔草案是起點，以下清單以本次實際檔案為準。

## 1. 舊截圖清理

四張已追蹤的舊英文截圖已由 `docs/screenshots/` 移至受 `.gitignore` 的 `output/phase3d/legacy-screenshots/`。移動前確認目的檔不存在；移動後逐檔 SHA-256 相符。Git 工作樹顯示原路徑四筆 **D（未暫存刪除）**，本機備份仍在。

| 原路徑 | 公開內容問題 | 本機備份 |
| --- | --- | --- |
| `docs/screenshots/home.png` | 顧客評價及免運等舊版購物承諾 | `output/phase3d/legacy-screenshots/home.png` |
| `docs/screenshots/products.png` | 舊英文版商品介面，不符合目前繁體中文展示 | `output/phase3d/legacy-screenshots/products.png` |
| `docs/screenshots/products-detail.png` | 真實退貨／免運承諾 | `output/phase3d/legacy-screenshots/products-detail.png` |
| `docs/screenshots/cart.png` | 「Secure checkout」真實結帳暗示 | `output/phase3d/legacy-screenshots/cart.png` |

README 已使用 `docs/portfolio-screenshots/` 的新版圖片，沒有引用上述四張。舊圖目前仍存在本機 `origin/main` 追蹤快照與初始 Git 提交；將四筆刪除納入未來提交後，最新版才不再包含它們。**舊版 Git 歷史不會因此消失**。本次沒有連線刷新遠端，因此對遠端現況的確認以本機 `origin/main` 快照為限；不改寫歷史或 Force Push。

## 2. DESIGN.md 與 README

- `DESIGN.md` 保留原有色彩、字級、版面、元件、互動規範，只將 Phase 1 草案標題與過時的 GSAP「待評估安裝」改成現況，新增 Vue 3／Vite、GSAP／ScrollTrigger、Embla／Autoplay、六區塊與全幅 Coverflow、桌面／手機 WebP、MediaPlaceholder、鍵盤、暫停／恢復及 reduced-motion 的實作狀態。其他媒體仍 PENDING，未宣稱全站規格皆已完成。
- `README.md` 本次核對後無需再改。既有未提交版本清楚說明純展示、無後端帳號／真實訂單／付款／配送／客服；24 筆示範商品、四系列、About、`localStorage`、Vue／Vite／GSAP／Embla 與 `npm ci`／build／preview 指令均與本次檢查相符。沒有宣稱公開 Demo、Lighthouse 分數或 WCAG AA 認證。AI 概念攝影已明示不是特定真實商品的精確外觀；四個 README 圖片連結均存在。

## 3. 更新後 Git 白名單

建議以**一筆完整且可建置的發布準備提交**涵蓋下列 **61 個修改或新增路徑**，另含四張舊圖的刪除，合計 **65 個 Git 變更路徑**。此為未來提交候選；本次未 Stage，尚未完成 Staged 內容比對。

### 已追蹤修改（24）

```text
.gitignore
README.md
index.html
package.json
package-lock.json
vercel.json
src/App.vue
src/assets/main.css
src/components/AppFooter.vue
src/components/AppHeader.vue
src/components/ProductCard.vue
src/components/ProductFilters.vue
src/components/ProductGrid.vue
src/components/QuantitySelector.vue
src/components/WishlistButton.vue
src/views/AboutView.vue
src/views/AccountView.vue
src/views/AuthView.vue
src/views/CartView.vue
src/views/CheckoutView.vue
src/views/HomeView.vue
src/views/ProductDetailView.vue
src/views/ProductsView.vue
src/views/WishlistView.vue
```

### 新原始碼（5）與設計文件（1）

```text
src/assets/about.css
src/assets/home-motion.css
src/components/HeroCoverflow.vue
src/components/MediaPlaceholder.vue
src/utils/locale.js
DESIGN.md
```

### 公開資源（19）

```text
public/robots.txt
public/media/home/coverflow-precision-desktop.webp
public/media/home/coverflow-precision-mobile.webp
public/media/home/coverflow-control.webp
public/media/home/coverflow-control-mobile.webp
public/media/home/coverflow-immersion-desktop.webp
public/media/home/coverflow-immersion-mobile.webp
public/media/home/coverflow-foundation-desktop.webp
public/media/home/coverflow-foundation-mobile.webp
public/media/about/about-hero.webp
public/media/about/about-hero-mobile.webp
public/media/about/about-precision.webp
public/media/about/about-control.webp
public/media/about/about-immersion.webp
public/media/about/about-foundation.webp
public/media/about/about-detail-keyboard.webp
public/media/about/about-detail-mouse.webp
public/media/about/about-detail-headset.webp
public/media/about/about-detail-mousepad.webp
```

### 發布文件（4）與精選截圖（8）

```text
docs/media-plan.md
docs/phase3-production-readiness.md
docs/phase3b-launch-checklist.md
docs/phase3d-git-cleanup.md
docs/portfolio-screenshots/home-1440.png
docs/portfolio-screenshots/home-390.png
docs/portfolio-screenshots/products-1440.png
docs/portfolio-screenshots/products-390.png
docs/portfolio-screenshots/about-1440.png
docs/portfolio-screenshots/about-390.png
docs/portfolio-screenshots/cart-390.png
docs/portfolio-screenshots/wishlist-390.png
```

### 刪除（4）

```text
docs/screenshots/home.png
docs/screenshots/products.png
docs/screenshots/products-detail.png
docs/screenshots/cart.png
```

排除且保留本機：`output/` 生成原稿與 QA 資料、`docs/audit-screenshots/`、約 55 張 Phase 2 過程截圖、`docs/redesign-audit.md`、`docs/homepage-visual-review.md`、三張已被新版桌面圖取代的 `public/media/home/coverflow-{precision,immersion,foundation}.webp`。不納入 `node_modules/`、`dist/`、`.env*`、測試暫存、私人資料或備份。已追蹤但本次未變更的基礎程式與商品圖片會保留在 Git，無需重複 Stage；專案根 `AGENTS.md` 不屬於本次候選變更。

## 4. 驗證

| 檢查 | 狀態 | 結果 |
| --- | --- | --- |
| `npm.cmd run build` | **PASS** | Vite 8.3.3，45 modules；輸出在受忽略的 `dist/`。PowerShell 的 `npm.ps1` 曾被執行原則阻擋，改用同一安裝的 `npm.cmd` 成功；沒有變更系統政策。 |
| `npm.cmd ls --depth=0` | **PASS** | Vue 3.5.43、Vite 8.3.3、Embla 8.6.0、GSAP 3.15.0；命令 exit 0。 |
| `git diff --check` | **PASS** | exit 0；僅有 Windows LF→CRLF 提示。新建未追蹤文件不在此命令範圍，需於未來 Stage 後再跑 `git diff --cached --check`。 |
| README 圖片連結 | **PASS** | 四條圖片連結全部存在；無舊 `docs/screenshots/` 引用。 |
| 正式 Hero／About 圖片 | **PASS** | 原始碼引用的 18 個 WebP 路徑全部存在；沒有移動正式素材。 |
| Vercel 設定 | **PASS（靜態設定）** | `vercel.json` 可解析，SPA rewrite 為 `/(.*)` → `/index.html`；雲端尚未驗證。 |
| 本機備份與 Git 忽略 | **PASS** | 四張備份 SHA-256 與原圖相符；`output/` 受忽略。 |
| 白名單及敏感檔名抽查 | **PASS（本機候選）** | 65 個候選路徑互不重複；61 個現有檔均存在，另四個為預期刪除。28 個已追蹤差異全在清單中；候選路徑無 `.env`、`node_modules`、`dist`、`output`、私鑰或備份副檔名。候選文字檔未匹配常見 Secret 變數賦值樣式；此指向性掃描不替代未來 Staged 完整審查。 |
| Lighthouse／LCP／CLS／TBT | **BLOCKED** | Phase 3B／3C 的 Lighthouse 環境限制仍在；本次依要求未重試，沒有新分數。 |
| `npm audit`／`npm audit --omit=dev` | **BLOCKED** | Phase 3B／3C 的 npm 安全公告端點錯誤仍未解除；本次依要求未重試，不能推定零弱點。 |
| 真實使用者 INP／正式部署 | **NOT RUN** | 尚無正式站與真實使用者數據；本次未部署。 |

## 5. 判定與人工補測

**CONDITIONAL PASS。** 四張誤導性截圖已從當前工作樹移出並保留本機備份，DESIGN 狀態與 README 展示邊界一致。依目前檔案可準備**第一筆本機發布準備 Commit**，但在另行授權 Stage 前須逐檔比對上述 65 個路徑，執行 Staged 差異與敏感內容檢查，確認四筆刪除一同納入；本次沒有進行這些 Git 寫入。若要公開 Push／正式部署，仍須在可用環境補跑四頁 Mobile／Desktop Lighthouse 與兩種 `npm audit`，並驗證雲端子路由、資源、Console／Network 與展示說明。既有 Git 歷史中的舊截圖會繼續可見，若未來要求歷史層級清除，必須另行評估並授權高風險操作。
