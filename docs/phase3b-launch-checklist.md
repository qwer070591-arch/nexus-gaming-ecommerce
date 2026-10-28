# NEXUS Phase 3B — Pre-Launch Verification & Git Readiness

檢查日期：2026-10-28。專案：`D:\ChatGPT\Workspace\gaming-ecommerce`，分支 `main`。本次只進行本機驗證及提交規劃；沒有 Stage、Commit、Push 或部署。

## 1. Lighthouse Results

| 項目 | 狀態 | 結果 |
| --- | --- | --- |
| Lighthouse Performance／Accessibility／Best Practices／SEO | **BLOCKED** | 本機沒有已安裝的 Lighthouse CLI。嘗試查詢 npm 套件時，`https://registry.npmjs.org/lighthouse` 回傳 `EACCES`；因此無法安全取得 CLI，也沒有原始 Lighthouse 報告或分數。 |
| 首頁 `/` | **BLOCKED** | Lighthouse 未執行，無裝置模式、節流條件或測試次數。 |
| 商品列表 `/products` | **BLOCKED** | 同上。 |
| 商品詳情 `/products/1` | **BLOCKED** | 同上。 |
| About `/about` | **BLOCKED** | 同上。 |
| LCP／CLS／TBT（Lighthouse） | **BLOCKED** | 沒有本階段 Lighthouse 數值。Phase 3 的無節流本機 PerformanceObserver 數字不能替代節流後的 Lighthouse 成績。 |
| INP（真實使用者） | **NOT RUN** | 尚無正式站及真實使用者資料；不能以 TBT 推定。 |
| Production build | **PASS** | `npm run build`：Vite 8.3.3，45 modules；JS 310.43 kB（gzip 114.62 kB）、CSS 88.29 kB（gzip 17.97 kB）。 |

### 在使用者 Chrome 手動補測

1. 在專案目錄執行 `npm run build`、`npm run preview -- --host 127.0.0.1 --port 4193 --strictPort`。
2. 依序開啟 `http://127.0.0.1:4193/`、`/products`、`/products/1`、`/about`。每頁按 F12，進入 **Lighthouse** 面板，選 **Navigation**、**Mobile**，勾選 Performance、Accessibility、Best Practices、SEO，使用相同的模擬節流條件產生報告。
3. 每頁至少執行三次並記錄中位數、Chrome 版本、裝置模式、節流設定、網址與測試時間。匯出每次原始 JSON／HTML 至本機 `output/lighthouse/`（已受 `.gitignore` 排除）。另以 Desktop 模式補測四頁。
4. 分別抄錄 LCP、CLS、TBT；INP 等正式站取得真實使用者資料再評估。若 Google Fonts 或其他網路請求失敗，應在報告註明，不能將該次結果視為正式網路代表值。

## 2. Security Audit

| 項目 | 狀態 | 結果 |
| --- | --- | --- |
| `npm audit` | **BLOCKED** | `https://registry.npmjs.org/-/npm/v1/security/advisories/bulk` 請求失敗，npm 回報 `audit endpoint returned an error`；無法得出弱點數。 |
| `npm audit --omit=dev` | **BLOCKED** | 同一安全公告端點錯誤；不能宣稱正式依賴零弱點。 |
| `npm ls --depth=0` | **PASS** | Vue 3.5.43、Vite 8.3.3、Embla 8.6.0、GSAP 3.15.0 等已安裝依賴可解析，未發現輸出的 peer conflict。 |
| 敏感檔名／常見 Secret 樣式 | **PASS（指向性掃描）** | Git 已追蹤及未忽略候選檔沒有 `.env`、資料庫備份、私鑰或認證狀態類檔名；`src`、`public`、`docs`、README、設定檔未匹配常見 Secret 樣式。掃描不等於完整秘密偵測或圖片內容審查。 |
| 依賴修補 | **NOT RUN** | 本次沒有執行 `npm audit fix --force`、升級或安裝依賴。待公告端點可用後再判斷是否需要定向修補。 |

## 3. Git Status

- **PASS：**`git status`、`git diff --stat`、`git diff --check` 已執行。`git diff --check` exit 0，僅出現 Windows LF→CRLF 提示，沒有差異空白錯誤。
- 工作樹含 Phase 1～3 的大量未提交成果。`git diff --stat` 在本次初查顯示 23 個已追蹤修改；本次另加入 `.gitignore` 一處增量修改。`git diff --stat` **不包含未追蹤檔案**。
- **PASS：**`node_modules/`、`dist/`、`.env`、`.env.*` 原已忽略；本次將只含本機 QA／生成原檔的 `output/` 納入忽略。`git ls-files` 沒有列出這些路徑，原有檔案沒有刪除。
- **待審：**目前約有 55 張根層 Phase 2 舊截圖與 `docs/audit-screenshots/` 21 張舊截圖未追蹤。它們保留本機，**不列入建議提交白名單**。既有 `docs/screenshots/` 四張舊圖已在 Git 歷史中；Phase 3C 的實際檢查結果見下方第 8 節。
- 遠端 `origin` 指向既有 `qwer070591-arch/nexus-gaming-ecommerce`，本次未連線或更改遠端。沒有執行任何 Git 寫入操作。

## 4. Files to Commit — 建議計畫

**建議一次建立完整、可建置的功能提交。** `src/App.vue`、`main.css`、Header、商品流程與多階段首頁修改彼此交錯，沒有可靠的階段邊界；硬拆成多個 Commit 會需要重排差異並提高破壞現有工作樹的風險。以下為未來人工核准後的分類白名單草案，**本次沒有 Stage**。

| 用途 | 候選範圍 |
| --- | --- |
| 設計系統與首頁 | `DESIGN.md`、`src/views/HomeView.vue`、`src/assets/main.css`、`src/assets/home-motion.css`、`src/components/MediaPlaceholder.vue` |
| Hero 輪播與正式媒體 | `src/components/HeroCoverflow.vue`、`public/media/home/` 中實際被引用的 8 個 WebP、`docs/media-plan.md` |
| 商品列表與商品詳情 | `src/components/ProductCard.vue`、`ProductFilters.vue`、`ProductGrid.vue`、`src/views/ProductsView.vue`、`ProductDetailView.vue`、`src/utils/locale.js` |
| 購物車與收藏／Demo | `src/components/QuantitySelector.vue`、`WishlistButton.vue`、`src/views/CartView.vue`、`WishlistView.vue`、`CheckoutView.vue`、`AccountView.vue`、`AuthView.vue` |
| About 品牌頁 | `src/views/AboutView.vue`、`src/assets/about.css`、`public/media/about/` 的 10 個 WebP |
| 無障礙、SEO、效能與文件 | `src/App.vue`、`src/components/AppHeader.vue`、`AppFooter.vue`、`index.html`、`public/robots.txt`、`vercel.json`、`package.json`、`package-lock.json`、`.gitignore`、`README.md`、`docs/phase3-production-readiness.md`、本文件、`docs/portfolio-screenshots/` 的 8 張截圖 |

Phase 3C 核對後，草案修正為 **60 個變更或新增檔案**（24 個已追蹤修改、5 個新原始碼、19 個新 public 檔〔Hero 8、About 10、`robots.txt` 1〕、1 個 DESIGN、3 個報告／媒體文件、8 張精選截圖）。原先的 63 檔草案多列了三張未被執行期引用的 `coverflow-precision.webp`、`coverflow-immersion.webp`、`coverflow-foundation.webp`。正式 Stage 前仍須重新計數及逐檔比對。**排除**這三張舊媒體、`output/`、55 張 Phase 2 過程截圖、`docs/audit-screenshots/`、`docs/redesign-audit.md` 與 `docs/homepage-visual-review.md`；這些歷史材料保留本機。若未來決定公開 `redesign-audit.md`，必須同步審查它引用的舊截圖，避免失效連結。

正式提交前只可依核准白名單逐檔 Stage，再檢查 `git diff --cached --name-only`、`git diff --cached --check`、Staged 敏感資訊及圖片內容；不要使用 `git add .`。

## 5. Deployment Configuration

| 項目 | 狀態 | 結果 |
| --- | --- | --- |
| Vercel 設定 | **PASS（設定檢查）** | 專案根目錄建置，Build Command `npm run build`，Output Directory `dist`；本機 Node 24.20.0 符合 `package.json` 的 `engines`，雲端需選相容版本。 |
| SPA rewrite | **PASS（設定檢查）** | `vercel.json` 的 `/(.*)` → `/index.html` 符合 [Vercel 官方 Vite SPA 指南](https://vercel.com/docs/frameworks/frontend/vite)。雲端實際行為未驗證。 |
| 本機 production preview | **PASS** | `/`、`/products`、`/products/1`、`/about` 均回 200 HTML；Control、About Hero WebP 回 200 `image/webp`，`robots.txt` 回 200 `text/plain`。 |
| 執行期圖片與 README | **PASS** | 24 筆商品及五個分類所使用的圖片、18 個 Hero／About 路徑全部存在；README 引用的四張精選截圖路徑有效。 |
| localhost／Demo 邊界 | **PASS（程式檢查）** | 正式程式與 Vercel 設定沒有硬編碼 localhost；結帳不收真實付款或個資，Footer 的 `.test` 信箱及社群圖示明示為展示。 |
| 正式 Vercel 部署 | **NOT RUN** | 本次未部署；正式網址、HTTPS、CDN 資產、Console／Network 仍待驗證。 |

`src/data/products.js` 的舊 `categoryDefinitions` 仍含 `/images/product2.png` 字串，但建立 `categories` 時即被有效路徑覆寫；執行期圖片檢查無缺檔。此屬 P3 歷史參照整理，不在本次改商品資料。

## 6. Outstanding Blockers

1. **P2／BLOCKED：**Lighthouse 四頁的 Mobile／Desktop 原始報告與 LCP、CLS、TBT 缺失；無法宣稱達成效能或無障礙分數目標。
2. **P2／BLOCKED：**npm Registry 安全公告端點失敗，正式與開發依賴漏洞數未知。
3. **P2／NOT RUN：**正式部署、真實網路條件及真實使用者 INP 尚未驗證。
4. **P2／待人工審核：**公開提交前需逐張確認八張精選截圖及既有已追蹤舊圖沒有私人資訊或過時說法。

## 7. Recommended Next Action

先在可連接 npm Registry 且有 Chrome Lighthouse 的本機環境補測四頁、保留原始報告，並重跑兩種 `npm audit`。在公開提交前，更新或從目前版本移除 `docs/screenshots/` 四張過時畫面，尤其是其中的「Secure checkout」、退貨與免運承諾；不需為了此事重寫 Git 歷史。同時更新 `DESIGN.md` 的 Phase 1／GSAP 狀態，或將它排除於公開白名單。再依修正後的白名單做最後一次內容與圖片審核，確認無阻擋問題後另行授權 Git Stage／Commit／Push。正式站部署後重新測試子路由、WebP、Console／Network 與分享預覽。

## 8. Phase 3C Final Release Gate（2026-10-28）

| 檢查 | 狀態 | 最終結果 |
| --- | --- | --- |
| Lighthouse 四頁 Mobile／Desktop | **BLOCKED** | 現有 Chrome／Chromium 存在，但沒有 Lighthouse CLI；npm 套件取得在 Phase 3B 回傳 `EACCES`。本次嘗試連接現有 Chrome 視窗時，電腦操作工具回報 `Accessibility state unavailable for window 396368`，無法可靠操作 DevTools。未取得分數、原始報告或 LCP／CLS／TBT；停止重試。上方手動步驟仍適用。 |
| 真實使用者 INP | **NOT RUN** | 沒有正式站的真實使用者數據；不以 TBT 代替。 |
| `npm audit`／`npm audit --omit=dev` | **BLOCKED** | 兩者再次回報 `audit endpoint returned an error`，目標為 npm Registry 的 `/-/npm/v1/security/advisories/bulk`。未變更 Registry、網路或依賴，停止重試。 |
| `npm ls --depth=0` | **PASS** | 主要依賴可解析，版本與 Phase 3B 一致。 |
| `npm run build`／`git diff --check` | **PASS** | 45 modules；JS 310.43 kB、CSS 88.29 kB；Git 差異檢查 exit 0，只有 LF→CRLF 提示。 |
| 60 檔白名單完整性 | **PASS（草案）** | 已逐類核對新元件、`package-lock.json`、Vercel rewrite、README／必要文件、Hero 8 圖、About 10 圖、8 張精選截圖。24 個已追蹤修改與 36 個必要未追蹤檔相符；沒有將 QA 暫存、生成 PNG 原稿或三張舊 Hero WebP 列入。尚未 Stage，故無 Staged 比對結果。 |
| 執行期素材 | **PASS** | 18 個 Hero／About 圖片路徑、49 個實際商品／分類圖片路徑均存在。`.gitignore` 沒有排除正式 WebP 或精選截圖；README 的四張圖片連結有效。 |
| 機密與 Demo 文案 | **PASS（指向性檢查）** | Git 候選檔無 `.env`、私鑰／認證狀態類檔名；文字掃描未匹配常見 Secret。正式程式碼無 localhost 連結；README、結帳與 Footer 明示展示用途。 |
| 既有四張 `docs/screenshots/` | **FAIL（發布內容）** | 四張皆為舊英文介面；`home.png` 顯示 customer rating／Free shipping、`products-detail.png` 顯示退貨承諾、`cart.png` 顯示 Secure checkout。它們不含明顯個資，但與現有 Demo 範圍衝突。已在 Git 歷史中，排除新檔白名單無法使目前版本不再顯示。 |
| `DESIGN.md` 文件時效 | **FAIL（文件）** | 目前仍稱「Phase 1 草案」及「GSAP／ScrollTrigger 待 Phase 2 評估安裝」，與已完成的輪播實作不一致。它是白名單中的展示文件；公開前應將歷史狀態清楚標示或更新為現況，本次未修改設計規格。 |
| 正式部署 | **NOT RUN** | 本階段未登入或操作 Vercel。 |

**Git Commit 判定：目前不建議建立作為公開發布的 Commit。** 60 檔草案本身沒有發現缺少必要執行期檔案或多餘大型生成原稿，但已追蹤舊截圖的誤導內容與 `DESIGN.md` 的過時狀態尚未處理，且 Lighthouse／npm 安全結果仍缺失。處理內容後可重新審核白名單，再由使用者決定是否在兩項 BLOCKED 尚未解除時先建立本機提交；本次未 Stage、Commit、Push 或部署。
