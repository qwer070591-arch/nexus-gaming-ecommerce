# NEXUS Phase 3 — Production Readiness QA

檢查日期：2026-10-28。環境：Windows、本機 `http://127.0.0.1:4193`、Vite production build + preview、Playwright Chromium。以下是本機 QA，沒有執行雲端部署。

## Executive Summary

**CONDITIONAL PASS（可供作品集人工驗收，正式公開前仍有發布門檻）。** 五種寬度的 30 組核心頁面檢查與 23 項新增互動測試均通過；另有先前 Phase 2B-5 的 12 項 About、輪播、購物流程回歸再次通過。修正了 About 手機標題孤字、各路由共用標題、Vercel SPA fallback、價格滑桿名稱與手機選單鍵盤關閉。Lighthouse 和 npm 安全公告端點在本環境無法執行，正式雲端服務也尚未驗證。

## Lighthouse Results & Core Web Vitals

| 檢查 | 狀態 | 實際結果與限制 |
| --- | --- | --- |
| Lighthouse：首頁、商品、詳情、About | **BLOCKED** | 本機沒有可用的 Lighthouse 安裝，`npx --no-install lighthouse --version` 無法取得執行檔；受限環境也無法可靠下載。沒有分數、裝置模式或節流數據，不宣稱達到 90 分。 |
| LCP | **PASS（僅本機觀測）** | Playwright Chromium 無節流、1440px：首頁約 244ms、商品 100ms、詳情 96ms、About 116ms；390px：約 168／68／116／112ms。這些值只代表本機快取／網路條件，不可當作正式站的 2.5 秒驗收。 |
| CLS | **PASS（僅本機觀測）** | 上述頁面觀測到 0.0000；這是短時間載入測試，無法涵蓋所有使用者捲動與後續互動。 |
| INP | **NOT RUN** | 沒有真實使用者資料，不以 TBT 代替。 |
| TBT | **BLOCKED** | 需 Lighthouse 或等效可重現的長任務分析，本次沒有分數。 |
| Bundle | **PASS** | 最終 Vite build：JS 310.43 kB（gzip 114.62 kB）、CSS 88.29 kB（gzip 17.97 kB）。 |
| 首屏媒體／重複請求 | **PASS（抽查）** | 390px 首頁載入 Control、Precision、Immersion 手機 WebP，未同時請求對應桌面版；初始資源記錄為 6 項。完整媒體 21 個 WebP 約 3.26 MB，不代表單次頁面傳輸量。 |
| 字體 | **P2 待改善** | `main.css` 使用 Google Fonts CSS 請求；已有系統後備字體。正式站需在節流環境評估延遲與授權後的自託管方案。 |

本機測試原始資料位於 `output/playwright/phase3/qa-results.json`；`output/` 不列入公開提交。LCP／CLS 是 PerformanceObserver 的本機觀測；沒有 Lighthouse 節流、實際使用者資料或完整動畫剖析。

## Accessibility Findings

| 項目 | 狀態 | 說明 |
| --- | --- | --- |
| Landmark／H1／語言 | **PASS（抽查）** | 六個核心路由在五種寬度均有一個 H1；文件 `lang="zh-TW"`，主內容為 `<main>`。 |
| Header 搜尋 | **PASS** | 開啟後焦點移入輸入框；關閉時返回觸發鈕。 |
| 手機導覽 | **PASS** | 開啟後焦點移到第一個連結；Escape 關閉並還焦觸發鈕。 |
| 手機篩選 Drawer | **PASS（鍵盤抽查）** | 有 dialog 名稱、開啟焦點、Escape 關閉與還焦；現有 Tab 邊界處理保留。 |
| 價格滑桿 | **PASS** | 新增「最高價格」可存取名稱。 |
| Coverflow／Reduced Motion | **PASS（互動抽查）** | Previous／Next、觸控滑動、暫停、循環與 reduced-motion 的自動播放停止均通過；頁面有狀態 live region。 |
| 全站 WCAG 2.2 AA | **NOT RUN** | 本環境無 axe-core；未完成輔助技術、全站色彩對比及全部焦點路徑的正式稽核，不能宣稱全面符合 AA。 |

## SEO Findings

- **PASS：**`zh-TW`、viewport、首頁 description、favicon、`robots.txt` 存在；首頁、商品、商品詳情、About、購物車、收藏與其他已知路由有對應文件標題。首頁加入網站層級 Open Graph 與 Twitter summary 描述。
- **PASS（本機 preview）：**直接開啟 `/products/1`、`/about`，以及瀏覽器 Back／Forward；搜尋 query 可保留。
- **P2：**SPA 的 `index.html` 是同一份 HTML，client-side 動態標題／description 不保證所有社群爬蟲取得路由專屬預覽。若要每個商品的獨立分享卡片，需另行規劃預先渲染或 SSR；本階段不改架構。
- **P2 待決策：**正式網域未知，因此沒有 canonical URL、絕對 OG 圖片或 sitemap.xml。不能填入假網址。未知頁面由 SPA 顯示找不到頁面，但靜態 fallback 的 HTTP 回應仍可能是 200；正式 SEO 應再處理 404 語義。

## Function Regression

| 範圍 | 狀態 | 實測 |
| --- | --- | --- |
| Header、搜尋、手機選單 | **PASS** | 搜尋開啟／焦點／送出／清除；清除關鍵字保留分類；手機進入 About。 |
| Home | **PASS** | 六區塊、四張輪播卡；自動播放、暫停、循環、手機滑動；四個系列 CTA。 |
| Products | **PASS** | 搜尋、空結果、分類、價格、排序、載入更多；商品詳情直接載入。 |
| Product Detail／Cart／Wishlist | **PASS** | 圖庫存在、加入購物車、重整保留；上一輪回歸驗證收藏加入／取消與 LocalStorage。 |
| 損壞的 LocalStorage | **PASS** | 寫入格式錯誤 JSON 後購物車顯示空狀態，無 page error。 |
| About | **PASS** | 四系列路由與結尾 CTA；九個正式媒體槽位及缺圖後備在 Phase 2B-5 回歸測試通過。 |
| Demo Checkout | **PASS** | 沒有真實個資欄位，完成時明示不產生訂單或付款。 |
| 全量端到端流程 | **NOT RUN** | 本專案尚未建立正式 E2E Suite；本次為指向性瀏覽器 QA，不聲稱涵蓋每個 UI 狀態。 |

本機詳細結果位於 `output/playwright/phase3/flows-results.json`；測試在 production preview 執行，無新增 JavaScript pageerror。

## Responsive Findings

**PASS：**320／390／768／1024／1440px，首頁、商品列表、詳情、About、購物車、收藏共 30 組頁面均沒有全頁水平溢出或當下已完成載入圖片破圖。390px About 標題先前「點。」獨立成行；調整行寬與平衡斷行後，320px、390px 局部截圖均顯示自然兩行。1440px／390px 全頁截圖列於下方。1920px **NOT RUN**（本次為選測）。

## Security Findings

- `npm ls --depth=0`：**PASS**，主要套件可解析；Vite 8.3.3、Vue 3.5.43、Embla 8.6.0、GSAP 3.15.0。未修改依賴。
- `npm audit` 與 `npm audit --omit=dev`：**BLOCKED**，npm Registry 安全公告端點請求失敗；不能據此宣稱零弱點。前次修補狀態只可參考既有紀錄，本次沒有重新取得公告。
- 指向性文字掃描：**PASS（有限範圍）**，`src`、`public`、`docs`、README、HTML 未匹配常見 API key／secret／私鑰樣式；未發現 `.env`。這不是完整機密偵測或二進位素材內容審查。
- Demo 聯絡信箱使用 `.test` 網域，社群圖示沒有外連且標為展示；結帳不收真實個資。Cart／Wishlist 存於使用者瀏覽器，不能當作可信的後端訂單資料。

## README／Portfolio Readiness

**PASS（本機文件）：**README 已移除未核實的 Live Demo 連結、舊結帳個資流程描述及不準確的路由說法，補充四系列輪播、About、真實技術、執行命令、Demo 邊界、AI 示意攝影與本次截圖。發佈前只應挑選經審核的 `docs/portfolio-screenshots/` 圖片；`output/` 含開發過程產物，不宜整個加入公開提交。

## Deployment Readiness

**CONDITIONAL PASS：**`npm run build` 輸出 `dist/`；`vercel.json` 已加入官方 Vite SPA rewrite，將子路由回寫至 `/index.html`。Vercel 專案應以根目錄建置、使用符合 `engines` 的 Node、Build Command `npm run build`、Output Directory `dist`，不需後端環境變數。`/media/...` 圖片為站點根目錄絕對路徑。本機 preview 的子路由直接開啟成功；Vercel 真正部署、HTTPS、靜態檔案與 Console／Network **BLOCKED**（未部署）。

官方設定依據：[Vercel Vite SPA 文件](https://vercel.com/docs/frameworks/frontend/vite)。

## Issues Fixed

| 優先級 | 修補前 | 修補後 |
| --- | --- | --- |
| P1 | 缺 Vercel SPA fallback，雲端子路由直接開啟可能 404。 | 新增 `vercel.json`，依官方範例設定 rewrite；雲端驗證仍待部署。 |
| P2 | About 390px Hero 標題末字獨立成行。 | 英文式硬斷行改由強調文字區塊平衡換行，320／390px 已截圖核對。 |
| P2 | 多數路由沿用首頁文件標題。 | 依現有 History API route 更新 title，包含商品詳情與搜尋。 |
| P2 | 價格範圍輸入未具獨立可存取名稱；手機選單 Escape／焦點處理不足。 | 加上 `aria-label`；手機選單開啟移入焦點、Escape 關閉及還焦。 |
| P2 | README 宣稱未驗證的 Live Demo 和舊 Checkout 流程。 | 如實記錄當前作品集功能、限制與畫面。 |

## Remaining Issues

- **P2／發布門檻：**待有可用 Lighthouse 時，以手機及桌面正式節流設定分別測首頁、商品、詳情、About；取得 Performance、LCP、CLS、TBT。正式站上線後再收集真實使用者 INP。
- **P2／發布門檻：**npm 安全公告端點恢復後重跑 `npm audit` 和 `npm audit --omit=dev`，檢查新公告。
- **P2：**需對正式站進行 WCAG 2.2 AA 的工具與人工稽核，尤其色彩對比、螢幕閱讀器和完整鍵盤路徑。
- **P2：**正式網域確定後再設定 canonical、sitemap、OG 圖片與路由分享策略；目前不能宣稱商品詳情具備獨立社群卡片。
- **P3：**`vue-router` 列在依賴但目前路由實作沒有使用；將來整理依賴時再評估移除，本次不進行無關變動。
- **P3：**字體由 Google Fonts 提供，正式效能審查後可評估授權清楚的自託管字體。

## Screenshots

- [首頁 1440px](portfolio-screenshots/home-1440.png)／[390px](portfolio-screenshots/home-390.png)
- [About 1440px](portfolio-screenshots/about-1440.png)／[390px](portfolio-screenshots/about-390.png)
- [商品列表 1440px](portfolio-screenshots/products-1440.png)／[390px](portfolio-screenshots/products-390.png)
- [購物車 390px](portfolio-screenshots/cart-390.png)／[收藏 390px](portfolio-screenshots/wishlist-390.png)
- About 標題修補後的 320px／390px 局部截圖保留本機 `output/playwright/phase3/`；公開截圖請見上方 About 全頁畫面。

## Files Changed in Phase 3

`src/App.vue`、`src/views/AboutView.vue`、`src/assets/about.css`、`src/components/AppHeader.vue`、`src/components/ProductFilters.vue`、`index.html`、`public/robots.txt`、`vercel.json`、`README.md`、`docs/media-plan.md`、本報告、`docs/portfolio-screenshots/` 8 張經挑選截圖，以及 `output/playwright/phase3/` 本機 QA 腳本／結果。既有未提交成果均保留；沒有 Commit、Push 或部署。
