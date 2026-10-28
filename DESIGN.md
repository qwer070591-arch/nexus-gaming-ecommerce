# NEXUS 設計系統

此文件定義視覺與互動規格，並區分現有實作與後續建議。NEXUS 是 **Premium Gaming Peripherals & Desk Setup** 的作品集展示站。商品、價格、評價與優惠均為示範資料；購物車和收藏可操作，但沒有真實訂單、付款或配送。

## 目前實作狀態

- **架構：**Vue 3 + Vite；首頁使用 GSAP 動畫、Embla Carousel Vue 與 Embla Autoplay。其他建議規格須以實際元件為準，不能視為全站已完成。
- **首頁：**已採用 Obsidian Editorial 的六區塊敘事與全幅媒體 Coverflow；四個系列以桌面／手機 WebP、HTML 標題及 CTA 呈現，沿用 `MediaPlaceholder.vue` 的媒體槽位與圖片未載入時的後備。其他首頁敘事媒體槽位仍有 PENDING 項目，詳見 `docs/media-plan.md`。
- **輪播操作：**Embla 負責拖曳與循環；目前設定 6 秒自動播放，提供 Previous／Next、播放／暫停與鍵盤操作。滑鼠懸停、焦點、拖曳或頁面不可見時的暫停由元件控制；`prefers-reduced-motion: reduce` 下停止自動播放並簡化動畫。

## 視覺方向

採用 **Obsidian Editorial**：保留 NEXUS 的深墨色、萊姆色標誌及現有商品圖，以深色敘事區塊建立品牌氛圍，讓商品列表與購買決策區維持明亮、易讀。萊姆色只用於主要 CTA、焦點及少量重點；減少多餘 Glow、Gradient 和裝飾線。設計參考的原則是編輯式排版與產品敘事，不複製其他品牌的版面或素材。

## Color Tokens

現有來源在 `src/assets/main.css` 的 `:root`。以下語意值包含既有色彩與後續元件遷移建議；不表示全站已逐一套用。

| 語意 | 深色品牌區 | 明亮商務區 | 現有來源／用途 |
| --- | --- | --- | --- |
| Background | `#101619` | `#ffffff` | `--night`／`--paper` |
| Surface | `#1b262a` | `#f8f9f8` | `--night-soft`／`--surface` |
| Surface Elevated | `#253238` | `#ffffff` | 深色浮層建議值／`--paper` |
| Text Primary | `#ffffff` | `#121619` | 白／`--ink` |
| Text Secondary | `#b9c7c9` | `#526067` | 深色區建議值／`--ink-soft` |
| Accent | `#d8f25b` | `#c5e73a` | `--lime`／`--lime-strong`；文字需用 `--ink` |
| Border | `#3a474a` | `#dce2e3` | 深色區建議值／`--line` |
| Success | `#8fd49b` | `#237a44` | 狀態文字／輔助背景；須實測對比 |
| Warning | `#ffd080` | `#9c5700` | 狀態文字／輔助背景；須實測對比 |
| Error | `#ff9d98` | `#b63530` | 狀態文字／`--red` 可作邊框 |

不要單靠顏色傳達錯誤、庫存或選取狀態。正式採用新色前，以實際背景檢查 WCAG 文字對比。

## Typography

沿用現有 `Manrope`（`--sans`）及 `DM Mono`（`--mono`），系統字體作下載失敗時的後備。現有 Georgia 斜體僅作少量品牌強調，不承載長文。字重 400／500／700／800；內文行高 1.55–1.7，標題 1.05–1.2。

| 層級 | 建議桌面／手機字級 | 字重、行高與用途 |
| --- | --- | --- |
| Display | `clamp(3rem, 7vw, 6rem)`／約 48–64px | Manrope 700，1.02；首頁 Hero，最多兩行 |
| H1 | `clamp(2.125rem, 4vw, 4rem)` | Manrope 700，1.08；每頁一個 |
| H2 | `clamp(1.875rem, 3vw, 2.75rem)` | Manrope 700，1.15；區塊標題 |
| H3 | `clamp(1.25rem, 1.7vw, 1.75rem)` | Manrope 700，1.25；故事／群組標題 |
| Body | 15–16px | Manrope 400／500，1.6；手機不低於 14px |
| Caption | 12–13px | Manrope 或 DM Mono 500，1.45；輔助資訊，不用 9px 承載重要內容 |
| Product Price | 22–30px 詳情；15–18px 卡片 | DM Mono 500，1.2；價格與幣別一同呈現 |

長標題需要實測 320px 換行；不要把文字做成圖片。外部字體載入失敗時，系統後備字體仍須保持版面穩定。

## Layout

| 項目 | 規格 |
| --- | --- |
| Container Max Width | 沿用 `--content-width: 1360px`；桌面兩側至少 32px、手機 16–20px |
| Section Spacing | 沿用 `--section-space: clamp(72px, 6vw, 104px)`；手機約 48–64px |
| Grid System | 首頁精選桌面 4 欄、型錄 3 欄；平板 2 欄；≤420px 單欄；大圖故事區不塞入卡片網格 |
| Breakpoints | 沿用 1040、800、640、420px；以內容實際需要調整，不新增無用斷點 |
| Header Height | 桌面 80px、≤800px 66px；黏性導覽不得遮住鍵盤焦點 |
| Card Spacing | 桌面 gap 16–20px、手機 10–16px；卡片內邊距至少 14px |
| Border Radius | 沿用 `--radius-sm: 5px`、`--radius-md: 8px`；大圖可用 8–12px |

## Components

| 元件 | 規格 |
| --- | --- |
| Primary Button | 萊姆底＋深色字，動詞明確；hover 只微調色彩，focus-visible 3px 輪廓；禁用狀態不依賴透明度辨識 |
| Secondary Button | 透明或淺色表面＋可見邊框；優先沿用 `.btn-ghost`／`.btn-outline` |
| Product Card | 保留名稱、分類、示範價格與收藏／加入按鈕；圖像比例一致，整卡不得偽裝成單一不可辨識連結 |
| Navigation | 桌面直接展示主類別；手機 Menu/Close 需 `aria-expanded`、Escape、可見焦點及返回觸發按鈕 |
| Search Input | 有可讀標籤與明確清除方式；搜尋結果數和空狀態需同步宣告 |
| Filter | 桌面側欄、手機底部抽屜；開啟時鎖背景捲動並限制焦點，關閉後返回觸發按鈕 |
| Badge | 只呈現可驗證或已明示為示範的狀態；不要暗示真實庫存或銷量 |
| Dialog／Drawer | 正確名稱、`aria-modal`、初始焦點、焦點限制、Escape、背景不可操作、關閉後還焦 |
| Toast | 簡短、非阻斷；加入購物車／收藏需告知狀態；示範訂閱和帳號不能宣稱真實成功 |

## Interaction & Motion

- Hover：只對可 hover 裝置套用卡片小幅位移／圖片縮放；不隱藏重要操作。
- Focus-visible：沿用現有 3px 輪廓，抽屜、縮圖、篩選與卡片按鈕都要可見。
- Active：按下提供即時視覺回饋，選中的篩選與縮圖同時具文字或 ARIA 狀態。
- Loading：圖片及商品卡使用佔位尺寸，避免版面跳動；不要無限顯示骨架。
- Disabled／Error：控制項需說明原因，表單錯誤與輸入欄關聯。
- Reduced Motion：`prefers-reduced-motion: reduce` 時移除視差、scrub、入場位移及自動播放；內容立即可見。現有 CSS 的 reduced-motion 規則需保留。
- 動畫以敘事和操作回饋為目的；優先 CSS。首頁目前使用 GSAP，敘事區塊使用 ScrollTrigger；輪播水平位移由 Embla 控制，避免 GSAP 與 Embla 同時操作相同軌道。新增動畫仍須保留 Vue 路由離開時的清理與 reduced-motion 支援。
