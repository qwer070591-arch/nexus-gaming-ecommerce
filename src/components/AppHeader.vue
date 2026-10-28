<script setup>
import { nextTick, ref, watch } from 'vue'
const props = defineProps({ route: { type: String, required: true }, query: { type: Object, default: () => ({}) }, cartCount: { type: Number, default: 0 }, wishlistCount: { type: Number, default: 0 } })
const emit = defineEmits(['navigate', 'search'])
const menuOpen = ref(false)
const searchOpen = ref(false)
const searchTerm = ref('')
const searchInput = ref(null)
const searchTrigger = ref(null)
const menuTrigger = ref(null)
const menuNav = ref(null)
watch(() => props.query.q, (value) => { searchTerm.value = value || '' }, { immediate: true })
function go(path) { menuOpen.value = false; searchOpen.value = false; emit('navigate', path) }
async function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) { await nextTick(); searchInput.value?.focus() }
  else searchTrigger.value?.focus()
}
function closeSearch() { searchOpen.value = false; searchTrigger.value?.focus() }
function submitSearch() { if (searchTerm.value.trim()) { emit('search', searchTerm.value.trim()); searchOpen.value = false } }
async function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) { await nextTick(); menuNav.value?.querySelector('a')?.focus() }
  else menuTrigger.value?.focus()
}
function closeMenu() { menuOpen.value = false; menuTrigger.value?.focus() }
</script>

<template>
  <header class="site-header">
    <div class="header-shell">
      <a class="brand" href="/" @click.prevent="go('/')"><span class="brand-mark">N</span><span>NEXUS<span class="accent">//</span></span></a>
      <nav ref="menuNav" class="primary-nav" :class="{ open: menuOpen }" aria-label="主要導覽" @keydown.esc.prevent="closeMenu">
        <a href="/" :class="{ active: route === '/' }" @click.prevent="go('/')">首頁</a>
        <a href="/products" :class="{ active: route.startsWith('/products') && !query.category && query.deals !== 'true' }" @click.prevent="go('/products')">商品</a>
        <a href="/products?category=Accessories" :class="{ active: route === '/products' && Boolean(query.category) }" @click.prevent="go('/products?category=Accessories')">分類</a>
        <a href="/products?deals=true" :class="{ active: route === '/products' && query.deals === 'true' }" @click.prevent="go('/products?deals=true')">優惠</a>
        <a href="/about" :class="{ active: route === '/about' }" @click.prevent="go('/about')">關於我們</a>
        <a href="/account" class="mobile-account-link" :class="{ active: route === '/account' }" @click.prevent="go('/account')">會員展示</a>
      </nav>
      <div class="header-actions">
        <button ref="searchTrigger" type="button" class="header-icon search-trigger" aria-label="搜尋商品" :aria-expanded="searchOpen" aria-controls="header-search-panel" @click="toggleSearch"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.2"/><path d="m15.5 15.5 4.2 4.2"/></svg></button>
        <a href="/wishlist" class="header-icon with-count" aria-label="收藏清單" @click.prevent="go('/wishlist')"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 8.6c0 4.8-8.5 10.5-8.5 10.5S3.5 13.4 3.5 8.6a4.4 4.4 0 0 1 8.5-1.5 4.4 4.4 0 0 1 8.5 1.5Z"/></svg><b v-if="wishlistCount">{{ wishlistCount }}</b></a>
        <a href="/cart" class="header-icon with-count" aria-label="購物車" @click.prevent="go('/cart')"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8.5h12l-1 11H7l-1-11Z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/></svg><b v-if="cartCount">{{ cartCount }}</b></a>
        <a href="/account" class="header-icon account-link" aria-label="會員展示頁" @click.prevent="go('/account')"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/></svg></a>
        <button ref="menuTrigger" type="button" class="menu-button" :aria-expanded="menuOpen" :aria-label="menuOpen ? '關閉選單' : '開啟選單'" @click="toggleMenu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18M3 17h18"/></svg></button>
      </div>
    </div>
    <form v-if="searchOpen" id="header-search-panel" class="search-panel" role="search" @submit.prevent="submitSearch" @keydown.esc.prevent="closeSearch">
      <label for="header-search" class="sr-only">搜尋商品</label>
      <input ref="searchInput" id="header-search" v-model="searchTerm" type="search" placeholder="搜尋商品、品牌或分類" />
      <button class="btn btn-primary" type="submit">搜尋</button>
    </form>
  </header>
</template>
