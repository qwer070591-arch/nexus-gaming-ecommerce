const categories = {
  All: '全部', Keyboards: '鍵盤', Mice: '滑鼠', 'Mouse Pads': '滑鼠墊',
  Headsets: '耳機', Monitors: '螢幕', Microphones: '麥克風',
  'Laptop Stands': '筆電支架', 'Gaming Chairs': '電競椅', Accessories: '配件',
}

const badges = { New: '新品', 'Best seller': '展示精選', Bundle: '組合商品' }

const descriptions = {
  1: '精巧的無數字鍵鍵盤，帶來靈敏而沉穩的操作體驗。',
  2: '輕量無線滑鼠，追蹤精準，握感適合長時間使用。',
  3: '經過調校的單體與可拆式麥克風，讓聲音細節更清晰。',
  4: '低摩擦編織表面搭配防滑底部，讓滑鼠移動更順暢。',
  5: '75% 配列鍵盤，具備緩衝結構、熱插拔軸體與飽滿敲擊聲。',
  6: '180 Hz QHD 螢幕，兼顧流暢畫面、清晰色彩與可調式支架。',
  7: '即插即用的電容式麥克風，適合語音聊天、直播與通話。',
  8: '以舒適度為重點的無線耳機，具備低延遲模式與長效電池。',
  9: '符合手型的滑鼠，操作可靠，主要按鍵觸感安靜。',
  10: '寬廣的超寬螢幕，為遊戲、工作與影音留出更多空間。',
  11: '鋁製筆電支架，提供多種觀看角度與良好的散熱空間。',
  12: '高背椅身搭配腰部支撐，適合較長時間的遊戲與工作。',
  13: '適合攜帶的 65% 機械鍵盤，保留方向鍵與 RGB 燈效。',
  14: '大面積桌墊，以平順耐用的表面整合整套桌面配置。',
  15: '具備即時監聽的 USB 麥克風，適合直播與 Podcast 錄音。',
  16: '精巧的 Full HD 螢幕，適合空間有限的桌面配置。',
  17: '輕盈耳機搭配柔軟耳罩，提供均衡的遊戲聲音體驗。',
  18: '對稱式無線滑鼠，兼顧速度、重量與穩定操作。',
  19: '堅固且可調高度的筆電支架，讓桌面與坐姿更俐落。',
  20: '可調式電競椅，適合遊戲與需要專注的工作時段。',
  21: '先試用六種精選軸體，再選擇適合自己的手感。',
  22: '加重底座固定滑鼠線材，讓桌面保持整潔。',
  23: '鍵盤、滑鼠與桌墊組合，為第一套桌面配置提供一致的選擇。',
  24: '低矮的螢幕燈條，提供桌面照明並減少眩光。',
}

const specificationNames = {
  Switches: '軸體', Layout: '配列', Connection: '連接方式', Lighting: '燈效',
  Sensor: '感測器', Weight: '重量', Battery: '電池續航', Drivers: '單體',
  Microphone: '麥克風', Size: '尺寸', Surface: '表面', Base: '底部',
  Thickness: '厚度', Panel: '面板', Resolution: '解析度', Refresh: '更新率',
  Response: '反應時間', Capsule: '收音單體', Pattern: '指向性', Controls: '控制方式',
  Wireless: '無線連接', Buttons: '按鍵', Curve: '曲率', Material: '材質',
  Compatibility: '適用規格', Adjustments: '調整方式', Load: '承重',
  Upholstery: '椅面材質', Recline: '椅背角度', Frame: '框架', Capacity: '承重',
  Sampling: '取樣規格', Types: '種類', Case: '收納盒', Cable: '線材',
  Color: '顏色', Includes: '內容物', Keyboard: '鍵盤', Mouse: '滑鼠',
  Savings: '組合優惠', Height: '高度', Length: '長度',
}

const specificationValues = {
  'Keyboard, mouse, desk mat': '鍵盤、滑鼠、桌墊', '75% mechanical': '75% 機械式',
  'Wireless optical': '無線光學式', 'Linear red switches': '線性紅軸',
  'Tactile brown switches': '段落茶軸', 'Linear silver': '線性銀軸',
  '87-key TKL': '87 鍵 TKL', '75% compact': '精巧 75% 配列',
  'USB-C wired': 'USB-C 有線', 'Per-key RGB': '單鍵 RGB',
  'Up to 90 hours': '最長 90 小時', 'Up to 45 hours': '最長 45 小時',
  'Wireless / Bluetooth': '無線／藍牙', 'Tri-mode wireless': '三模無線',
  'Control weave': '控制型編織表面', 'Natural rubber': '天然橡膠',
  'Spill-resistant weave': '防潑水編織表面', 'Rubber grip': '防滑橡膠',
  'Detachable cardioid': '可拆式心形指向', 'Flip-to-mute': '翻轉靜音',
  'Cardioid': '心形指向', 'Cardioid / omni': '心形指向／全指向',
  '6 programmable': '6 顆可自訂按鍵', '6 height settings': '6 段高度',
  'Up to 8 kg': '最高 8 kg', 'Anodized aluminum': '陽極處理鋁材',
  'Aluminum alloy': '鋁合金', 'Breathable PU hybrid': '透氣複合 PU',
  'Soft fabric': '柔軟布料', Steel: '鋼材', 'Reinforced steel': '強化鋼材',
  '24 assorted pieces': '24 顆混合軸體', 'Linear / tactile / clicky': '線性／段落／聲響',
  'Reusable storage case': '可重複使用的收納盒', 'Silicone + zinc alloy': '矽膠與鋅合金',
  'Fits 2.5–4 mm cable': '適用 2.5–4 mm 線材', 'Non-slip': '防滑',
  Graphite: '石墨色', 'RGBIC + warm white': 'RGBIC 與暖白光',
  'Touch + app': '觸控與應用程式', 'Gain / mute / headphone': '增益／靜音／耳機',
  'South-facing RGB': '下燈位 RGB', '11–17 inches': '11–17 吋',
  'Up to 16-inch': '最高 16 吋', '34-inch VA curved': '34 吋曲面 VA',
  '27-inch Fast IPS': '27 吋 Fast IPS', '24.5-inch IPS': '24.5 吋 IPS',
  '26K optical': '26K 光學式', '18K optical': '18K 光學式',
  '30K optical': '30K 光學式', '50 mm neodymium': '50 mm 釹磁單體',
  '16 mm condenser': '16 mm 電容式', 'Large diaphragm condenser': '大振膜電容式',
  '100 hours': '100 小時',
}

export function categoryLabel(value) { return categories[value] || value }
export function badgeLabel(value) { return badges[value] || value }
export function productDescription(product) { return descriptions[product?.id] || product?.description || '' }
export function specificationLabel(value) { return specificationNames[value] || value }
export function specificationValue(value) { return specificationValues[value] || value }
