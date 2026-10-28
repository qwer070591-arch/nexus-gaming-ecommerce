# NEXUS Phase 2A — Media Plan

Phase 2B-5 已接入四系列 Coverflow 的桌面與手機 WebP，以及 About 九個獨立媒體槽位。首頁 Category、Featured Story、Brand Film 與 Closing Visual 仍為 **PENDING**。頁面保留 `MediaPlaceholder.vue` 的固定比例容器與 CSS 後備；商品卡仍使用既有圖片。規劃尺寸是建議輸出尺寸，後續應依實際裁切與檔案大小調整。

| Media ID | 頁面／區塊 | 類型 | Desktop 比例 | Mobile 比例 | 建議構圖 | 建議輸出尺寸（桌面／手機） | 未來檔案位置 | 狀態 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `HOME_COVERFLOW_PRECISION` | Home / Precision carousel | Image | 16:9 | 4:5 | 滑鼠主體在右側中部，左下保留低細節文字區；深墨綠與炭黑 | 1672x941 desktop / 1122x1402 mobile | public/media/home/coverflow-precision-desktop.webp<br>public/media/home/coverflow-precision-mobile.webp | READY / READY |
| `HOME_COVERFLOW_CONTROL` | Home / Control carousel | Image | 16:9 | 4:5 | 黑色鍵盤偏右，左側為文字安全區；手機使用獨立構圖 | 1672x941 desktop / 1122x1402 mobile | public/media/home/coverflow-control.webp<br>public/media/home/coverflow-control-mobile.webp | READY / READY |
| `HOME_COVERFLOW_IMMERSION` | Home / Immersion carousel | Image | 16:9 | 4:5 | 耳機完整輪廓偏右，左側保留文字安全區；低飽和灰紫 | 1672x941 desktop / 1122x1402 mobile | public/media/home/coverflow-immersion-desktop.webp<br>public/media/home/coverflow-immersion-mobile.webp | READY / READY |
| `HOME_COVERFLOW_FOUNDATION` | Home / Foundation carousel | Image | 16:9 | 4:5 | 大型桌墊與材質偏右，可帶少量桌面情境；深橄欖與黑灰 | 1672x941 desktop / 1122x1402 mobile | public/media/home/coverflow-foundation-desktop.webp<br>public/media/home/coverflow-foundation-mobile.webp | READY / READY |
| `HOME_CATEGORY_KEYBOARD` | Home／Keyboards | 圖 | 3:2 | 16:9 | 鍵盤特寫，主體置中偏上並保留底部分類名稱的對比區 | 1800×1200／1600×900 | `public/media/home/category-keyboard.*` | PENDING |
| `HOME_CATEGORY_MOUSE` | Home／Mice | 圖 | 4:5 | 16:9 | 滑鼠與桌面局部，主體須能適應橫向裁切 | 1200×1500／1600×900 | `public/media/home/category-mouse.*` | PENDING |
| `HOME_CATEGORY_MOUSEPAD` | Home／Mouse Pads | 圖 | 4:5 | 16:9 | 表面織紋與桌墊尺度，主體須能適應橫向裁切 | 1200×1500／1600×900 | `public/media/home/category-mousepad.*` | PENDING |
| `HOME_CATEGORY_HEADSET` | Home／Headsets | 圖 | 4:5 | 16:9 | 頭戴結構與材質細節，保留橫向裁切空間 | 1200×1500／1600×900 | `public/media/home/category-headset.*` | PENDING |
| `HOME_CATEGORY_MONITOR` | Home／Monitors | 圖 | 4:5 | 16:9 | 螢幕外形與支架，不使用誤導性的展示畫面 | 1200×1500／1600×900 | `public/media/home/category-monitor.*` | PENDING |
| `HOME_CATEGORY_ACCESSORY` | Home／Accessories | 圖 | 3:2 | 16:9 | 多件配件組合，保留底部名稱的對比區 | 1800×1200／1600×900 | `public/media/home/category-accessory.*` | PENDING |
| `HOME_FEATURE_STORY` | Home／Featured Story | 圖或靜音短影片 | 4:5 | 4:3 | 現有 HyperGear Full Desk Bundle 的鍵盤、滑鼠、桌墊同框；不加入未列出的商品 | 1200×1500／1200×900 | `public/media/home/feature-story.*` | PENDING |
| `HOME_BRAND_FILM` | Home／Brand Philosophy | 靜音短影片，可用圖替代 | 4:5 | 16:9 | 抽象桌面光影與材質，不宣稱不存在的技術或品牌歷史 | 1200×1500／1600×900 | `public/media/home/brand-film.*` | PENDING |
| `HOME_CLOSING_VISUAL` | Home／Closing CTA | 圖或靜音短影片 | 21:9 | 4:5 | 視覺重心靠右／上，左側 CTA 保持高對比 | 2520×1080／1080×1350 | `public/media/home/closing-visual.*` | PENDING |

## 替換方式與驗收

1. 取得可公開使用的原創或明確授權素材，逐張記錄來源／授權。不要沿用本地既有商品圖作全幅敘事圖，直到確認解析度與授權。
2. 在對應 `MediaPlaceholder` 提供 `#media` slot 的 `<picture>`、`<img>` 或 `<video>`。素材填滿容器並使用適合桌面與手機的 `object-fit: cover`／`object-position`；保留既有外框比例、文字層與 CTA。
   首頁一般瀏覽狀態隱藏工程標記；`data-media-id` 仍保留在 DOM。開發預覽時可將 `show-meta` 設為 `true` 顯示 ID、用途與比例。
3. 圖片採適當壓縮、響應式來源與 alt；裝飾影片使用靜音、無限循環、`playsinline`、poster，且在 `prefers-reduced-motion: reduce` 下顯示靜態畫面。不應自動載入所有後段影片。
4. 驗證 320／390／768／1024／1440px 裁切、文字對比、LCP、CLS、觸控與鍵盤操作。任何素材都不得遮住 CTA。

Coverflow 使用全卡媒體容器與獨立文字對比漸層。四張圖均採 `object-fit: cover`、獨立桌面與手機焦點，放在既有 `MediaPlaceholder` slot 內，保留媒體內層視差、原有媒體 ID 與 CSS 後備。Control 為 1672×941；其餘三張只有約 833×468，大型桌面與高像素密度螢幕可能顯得不夠銳利，未經重製不能靠放大改善。390px 實測顯示四張寬幅圖都無法在直式裁切中完整呈現產品；Precision 滑鼠與 Immersion 耳機的側邊、Control 鍵盤兩端及 Foundation 桌墊尺寸感尤其受影響。四系列的 4:5 手機專用構圖仍待製作。

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
