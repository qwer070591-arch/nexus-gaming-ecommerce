<script setup>
const emit = defineEmits(['navigate'])
</script>
<template>
  <footer class="site-footer">
    <div class="footer-grid">
      <div>
        <a class="brand footer-brand" href="/" @click.prevent="emit('navigate', '/')"><span class="brand-mark">N</span><span>NEXUS<span class="accent">//</span></span></a>
        <p>精選電競裝備，打造更專注、更自在的桌面配置。</p>
        <div class="socials" aria-label="社群平台展示圖示">
          <span class="socials__icon" role="img" aria-label="Instagram 展示圖示，未提供連結"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg></span>
          <span class="socials__icon" role="img" aria-label="X 展示圖示，未提供連結"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20"/><path d="M4 4h4l12 16h-4"/></svg></span>
          <span class="socials__icon" role="img" aria-label="YouTube 展示圖示，未提供連結"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none"/></svg></span>
        </div>
        <p class="socials-caption">社群圖示僅供展示，未提供連結。</p>
      </div>
      <div><h3>選購</h3><a href="/products" @click.prevent="emit('navigate', '/products')">所有商品</a><a href="/products?category=Keyboards" @click.prevent="emit('navigate', '/products?category=Keyboards')">鍵盤</a><a href="/products?category=Mice" @click.prevent="emit('navigate', '/products?category=Mice')">滑鼠</a><a href="/products?deals=true" @click.prevent="emit('navigate', '/products?deals=true')">優惠</a></div>
      <div class="footer-static"><h3>網站資訊</h3><a href="/about" @click.prevent="emit('navigate', '/about')">關於我們</a><p>配送與退貨：不提供</p><p>商品保養：展示內容</p><p>常見問題：未提供</p></div>
      <div><h3>聯絡資訊</h3><p>示意信箱（非客服）</p><p>hello@nexusgear.test</p><p>不提供實際客服服務。</p></div>
    </div>
    <div class="footer-bottom"><span>© 2026 NEXUS。作品集展示用途，不會產生真實訂單或付款。</span><span>隱私權與使用條款頁面未提供。</span></div>
  </footer>
</template>
