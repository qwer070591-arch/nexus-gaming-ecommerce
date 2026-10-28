# NEXUS Phase 2A — Media Plan

Phase 2B-6 已為首頁六張分類卡、主打商品故事與品牌理念接入各自的正式 WebP；四系列 Coverflow 的桌面／手機圖及 About 正式素材沿用既有成果。Featured Products 繼續使用現有商品圖；Closing CTA 經視覺審核保留深色漸層與媒體槽位，不加入多餘攝影。`MediaPlaceholder.vue` 的固定比例容器與載入失敗 CSS 後備仍在。以下尺寸如標示「建議」為原規劃值，實際輸出見 Phase 2B-6 紀錄。

| Media ID | 頁面／區塊 | 類型 | Desktop 比例 | Mobile 比例 | 建議構圖 | 建議輸出尺寸（桌面／手機） | 未來檔案位置 | 狀態 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `HOME_COVERFLOW_PRECISION` | Home / Precision carousel | Image | 16:9 | 4:5 | 滑鼠主體在右側中部，左下保留低細節文字區；深墨綠與炭黑 | 1672x941 desktop / 1122x1402 mobile | public/media/home/coverflow-precision-desktop.webp<br>public/media/home/coverflow-precision-mobile.webp | READY / READY |
| `HOME_COVERFLOW_CONTROL` | Home / Control carousel | Image | 16:9 | 4:5 | 黑色鍵盤偏右，左側為文字安全區；手機使用獨立構圖 | 1672x941 desktop / 1122x1402 mobile | public/media/home/coverflow-control.webp<br>public/media/home/coverflow-control-mobile.webp | READY / READY |
| `HOME_COVERFLOW_IMMERSION` | Home / Immersion carousel | Image | 16:9 | 4:5 | 耳機完整輪廓偏右，左側保留文字安全區；低飽和灰紫 | 1672x941 desktop / 1122x1402 mobile | public/media/home/coverflow-immersion-desktop.webp<br>public/media/home/coverflow-immersion-mobile.webp | READY / READY |
| `HOME_COVERFLOW_FOUNDATION` | Home / Foundation carousel | Image | 16:9 | 4:5 | 大型桌墊與材質偏右，可帶少量桌面情境；深橄欖與黑灰 | 1672x941 desktop / 1122x1402 mobile | public/media/home/coverflow-foundation-desktop.webp<br>public/media/home/coverflow-foundation-mobile.webp | READY / READY |
| `HOME_CATEGORY_KEYBOARD` | Home／Keyboards | 圖 | 3:2 | 16:9 | 完整機械鍵盤與底部標題安全區 | 1536×1024；手機同圖裁切 | `public/media/home/category-keyboard.webp` | READY |
| `HOME_CATEGORY_MOUSE` | Home／Mice | 圖 | 4:5 | 16:9 | 滑鼠三分之四側面與可辨識滾輪 | 1122×1402／1672×941 | `public/media/home/category-mouse.webp`<br>`category-mouse-mobile.webp` | READY |
| `HOME_CATEGORY_MOUSEPAD` | Home／Mouse Pads | 圖 | 4:5 | 16:9 | 長形織物桌墊、縫線與尺寸輪廓 | 1122×1402／1672×941 | `public/media/home/category-mousepad.webp`<br>`category-mousepad-mobile.webp` | READY |
| `HOME_CATEGORY_HEADSET` | Home／Headsets | 圖 | 4:5 | 16:9 | 完整耳罩、頭帶與麥克風 | 1122×1402／1672×941 | `public/media/home/category-headset.webp`<br>`category-headset-mobile.webp` | READY |
| `HOME_CATEGORY_MONITOR` | Home／Monitors | 圖 | 4:5 | 16:9 | 無產品宣稱畫面的螢幕、外框及支架 | 1122×1402／1672×941 | `public/media/home/category-monitor.webp`<br>`category-monitor-mobile.webp` | READY |
| `HOME_CATEGORY_ACCESSORY` | Home／Accessories | 圖 | 3:2 | 16:9 | 軸體樣品盒、理線配件與線材 | 1536×1024；手機同圖裁切 | `public/media/home/category-accessory.webp` | READY |
| `HOME_FEATURE_STORY` | Home／Featured Story | 圖 | 4:5 | 4:3 | HyperGear Full Desk Bundle 概念攝影：鍵盤、滑鼠與桌墊同框；非型號外觀保證 | 1122×1402；手機同圖裁切 | `public/media/home/feature-story.webp` | READY |
| `HOME_BRAND_FILM` | Home／Brand Philosophy | 圖；ID 沿用影片規劃名稱 | 4:5 | 16:9 | 完整桌面工作情境，有螢幕、鍵盤、滑鼠、耳機與桌墊 | 1122×1402；手機同圖裁切 | `public/media/home/brand-philosophy.webp` | READY |
| `HOME_CLOSING_VISUAL` | Home／Closing CTA | CSS 氛圍與預留槽位 | 21:9 | 4:5 | 現有暗色漸層襯托 CTA，暫無額外攝影必要 | 不產生圖片 | 現有 `MediaPlaceholder` CSS 後備 | CSS ONLY |

## Phase 2B-6：首頁新增素材

使用內建 `imagegen` 各自獨立產生 PNG；四張直式分類圖經實際手機截圖發現產品輪廓被 16:9 裁切，另產生獨立橫式手機構圖。原稿保留於受 Git 忽略的 `output/imagegen/phase2b6/originals/`；網站檔以 WebP quality 82、未放大轉出。分類卡圖片採空 `alt`，因同一連結已具可見分類名稱，避免重複朗讀；故事與品牌照片則有描述性替代文字。以下產品照片皆為概念攝影，不宣稱與商品頁型號完全一致。

| 網站檔名（`public/media/home/`） | 原稿尺寸 | WebP 大小 | 生成構圖摘要 |
| --- | --- | --- | --- |
| `category-keyboard.webp` | 1536×1024 | 75,074 B | 完整黑色機械鍵盤，斜向桌面視角 |
| `category-mouse.webp` | 1122×1402 | 68,784 B | 單一黑色滑鼠，低角度三分之四視角 |
| `category-mouse-mobile.webp` | 1672×941 | 66,640 B | 滑鼠完整橫幅構圖，手機專用 |
| `category-mousepad.webp` | 1122×1402 | 127,606 B | 桌墊縫線與完整矩形輪廓，斜俯視 |
| `category-mousepad-mobile.webp` | 1672×941 | 185,668 B | 完整桌墊橫幅構圖，手機專用 |
| `category-headset.webp` | 1122×1402 | 70,312 B | 完整耳機及麥克風，立體展示角度 |
| `category-headset-mobile.webp` | 1672×941 | 91,002 B | 耳機頭帶、兩側耳罩與麥克風完整入鏡 |
| `category-monitor.webp` | 1122×1402 | 37,714 B | 無內容螢幕與支架，側前方視角 |
| `category-monitor-mobile.webp` | 1672×941 | 43,462 B | 螢幕外框與底座完整入鏡 |
| `category-accessory.webp` | 1536×1024 | 83,886 B | 軸體盒、理線配件與線材，桌面平鋪 |
| `feature-story.webp` | 1122×1402 | 174,764 B | 機械鍵盤、滑鼠及桌墊同框，對應組合商品類型 |
| `brand-philosophy.webp` | 1122×1402 | 85,736 B | 完整深色桌面工作情境，與 About Hero 不重複 |

此組 12 張素材總計 1,110,648 B；每個分類卡透過 `<picture>` 按寬度選擇一張來源，不會同時下載桌面及手機版本。首屏後的區塊採懶載入；保留原有固定比例容器，下載前及失敗時顯示 CSS 後備。Keyboards 與 Accessories 的橫式圖在手機仍使用同圖輕度裁切；Story 與 Brand 圖在手機維持同圖裁切。

本機 Playwright Chromium 驗收於 320／390／768／1024／1440px 執行，51 項檢查通過：八個新媒體槽位及五張精選商品圖皆成功載入、六張分類卡每張只請求一個適用圖片來源、無水平溢出、觀測期間 CLS 為 0、無 page error；另確認圖片失敗時恢復 Placeholder。獨立輪播回歸確認 Loop、Pause／Resume、約 6 秒自動切換及零 page error。實際完整首頁與各區塊截圖、機器可讀結果存於受忽略的 `output/playwright/phase2b6/`。這是本機無節流觀測，不等於正式站效能分數。

## 替換方式與驗收

1. 取得可公開使用的原創或明確授權素材，逐張記錄來源／授權。不要沿用本地既有商品圖作全幅敘事圖，直到確認解析度與授權。
2. 在對應 `MediaPlaceholder` 提供 `#media` slot 的 `<picture>`、`<img>` 或 `<video>`。素材填滿容器並使用適合桌面與手機的 `object-fit: cover`／`object-position`；保留既有外框比例、文字層與 CTA。
   首頁一般瀏覽狀態隱藏工程標記；`data-media-id` 仍保留在 DOM。開發預覽時可將 `show-meta` 設為 `true` 顯示 ID、用途與比例。
3. 圖片採適當壓縮、響應式來源與 alt；裝飾影片使用靜音、無限循環、`playsinline`、poster，且在 `prefers-reduced-motion: reduce` 下顯示靜態畫面。不應自動載入所有後段影片。
4. 驗證 320／390／768／1024／1440px 裁切、文字對比、LCP、CLS、觸控與鍵盤操作。任何素材都不得遮住 CTA。

Coverflow 使用全卡媒體容器與獨立文字對比漸層。四張圖均採 `object-fit: cover`、獨立桌面與手機焦點，放在既有 `MediaPlaceholder` slot 內，保留媒體內層視差、原有媒體 ID 與 CSS 後備。Phase 2B-3 曾使用低解析度寬幅圖，該階段裁切與銳利度問題已在 Phase 2B-4／2B-5 以桌面及手機獨立 WebP 處理；目前檔案見下方 Coverflow 表格。

## About 頁媒體槽位

Phase 2B-5 已將九個槽位接入獨立生成的 WebP；圖片載入失敗時仍顯示固定比例的 Placeholder。

| Media ID | 區塊 | Desktop／Mobile 容器比例 | 正式檔案（`public/media/about/`） | 原生尺寸 | 狀態 |
| --- | --- | --- | --- | --- | --- |
| `ABOUT_HERO_DESK` | 品牌 Hero | 21:9／4:5 | `about-hero.webp`／`about-hero-mobile.webp` | 1916×821／1122×1402 | READY |
| `ABOUT_COLLECTION_PRECISION` | 精準掌控 | 4:5／3:2 | `about-precision.webp` | 1122×1402 | READY |
| `ABOUT_COLLECTION_CONTROL` | 操控之道 | 4:5／3:2 | `about-control.webp` | 1122×1402 | READY |
| `ABOUT_COLLECTION_IMMERSION` | 沉浸體驗 | 4:5／3:2 | `about-immersion.webp` | 1122×1402 | READY |
| `ABOUT_COLLECTION_FOUNDATION` | 穩固基礎 | 4:5／3:2 | `about-foundation.webp` | 1122×1402 | READY |
| `ABOUT_DETAIL_KEYBOARD` | 鍵盤特寫 | 4:5／3:2 | `about-detail-keyboard.webp` | 1122×1402 | READY |
| `ABOUT_DETAIL_MOUSE` | 滑鼠特寫 | 3:2／3:2 | `about-detail-mouse.webp` | 1536×1024 | READY |
| `ABOUT_DETAIL_HEADSET` | 耳機特寫 | 3:2／3:2 | `about-detail-headset.webp` | 1536×1024 | READY |
| `ABOUT_DETAIL_MOUSEPAD` | 桌墊特寫 | 4:5／3:2 | `about-detail-mousepad.webp` | 1122×1402 | READY |


## Phase 2B-4／2B-5：Coverflow 正式素材

桌面四圖沿用 Phase 2B-4 成果；Phase 2B-5 只重製 Immersion 與 Foundation 手機圖。手機舊版 WebP 備份於 `output/imagegen/phase2b5/backups/`，本次原始 PNG 保留於 `output/imagegen/phase2b5/originals/`。網站使用 WebP，寬度 580px 以下由 `<picture>` 選用手機圖，避免同時請求兩種版本。

| Media ID | 桌面 WebP | 手機 WebP | 原生尺寸 | 狀態 |
| --- | --- | --- | --- | --- |
| `HOME_COVERFLOW_PRECISION` | `coverflow-precision-desktop.webp` | `coverflow-precision-mobile.webp` | 1672×941／1122×1402 | READY |
| `HOME_COVERFLOW_CONTROL` | `coverflow-control.webp` | `coverflow-control-mobile.webp` | 1672×941／1122×1402 | READY |
| `HOME_COVERFLOW_IMMERSION` | `coverflow-immersion-desktop.webp` | `coverflow-immersion-mobile.webp` | 1672×941／1122×1402 | READY，手機圖已精修 |
| `HOME_COVERFLOW_FOUNDATION` | `coverflow-foundation-desktop.webp` | `coverflow-foundation-mobile.webp` | 1672×941／1122×1402 | READY，手機圖已精修 |

About 原始生成 PNG 位於 `output/imagegen/phase2b5/originals/`。這些圖是作品集展示概念素材，不能視為真實在售商品的精確外觀或規格。圖片保持即時 HTML 標題與 CTA；尚未達原規劃的 2560×1440／1200×1500 原生解析度，若大螢幕需要更高 DPI，須重新製作。
