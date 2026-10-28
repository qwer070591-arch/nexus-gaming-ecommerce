<script setup>
import { computed, defineAsyncComponent, h, onMounted, onUnmounted, ref, watch } from 'vue'
import { products } from '@/data/products'
import { useStore } from '@/composables/useStore'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ToastNotice from '@/components/ToastNotice.vue'
import ProductsView from '@/views/ProductsView.vue'

const RouteLoading = { render: () => h('main', { class: 'page-shell route-loading', role: 'status' }, '頁面載入中…') }
const RouteLoadError = { render: () => h('main', { class: 'page-shell route-loading', role: 'alert' }, [
  h('p', '頁面載入失敗，請重新整理後再試。'),
  h('button', { class: 'btn btn-primary', type: 'button', onClick: () => window.location.reload() }, '重新載入'),
]) }
const asyncView = (loader) => defineAsyncComponent({ loader, loadingComponent: RouteLoading, errorComponent: RouteLoadError, delay: 0 })
const HomeView = asyncView(() => import('@/views/HomeView.vue'))
const ProductDetailView = asyncView(() => import('@/views/ProductDetailView.vue'))
const CartView = asyncView(() => import('@/views/CartView.vue'))
const CheckoutView = asyncView(() => import('@/views/CheckoutView.vue'))
const AuthView = asyncView(() => import('@/views/AuthView.vue'))
const AccountView = asyncView(() => import('@/views/AccountView.vue'))
const WishlistView = asyncView(() => import('@/views/WishlistView.vue'))
const AboutView = asyncView(() => import('@/views/AboutView.vue'))

const { cart, wishlistIds, cartCount, subtotal, addToCart, updateQuantity, removeFromCart, toggleWishlist } = useStore()
const route = ref(window.location.pathname)
const query = ref(Object.fromEntries(new URLSearchParams(window.location.search)))
const toast = ref('')
let toastTimer

const product = computed(() => {
  const match = route.value.match(/^\/products\/(\d+)$/)
  return match ? products.find((item) => item.id === Number(match[1])) : null
})
const isAuth = computed(() => route.value === '/login' || route.value === '/register')
const pageTitle = computed(() => {
  if (route.value === '/') return 'NEXUS — 電競周邊展示網站'
  if (route.value === '/about') return '關於 NEXUS — 電競裝備與桌面體驗展示'
  if (route.value === '/products') return `${query.value.q ? `搜尋「${query.value.q}」` : '所有商品'} — NEXUS`
  if (route.value.startsWith('/products/')) return `${product.value?.name || '找不到商品'} — NEXUS`
  const names = { '/cart': '購物車', '/wishlist': '我的收藏', '/checkout': '展示結帳', '/account': '會員展示', '/login': '登入展示', '/register': '註冊展示' }
  return `${names[route.value] || '找不到頁面'} — NEXUS`
})
watch(pageTitle, (title) => { document.title = title }, { immediate: true })

function syncLocation() { route.value = window.location.pathname; query.value = Object.fromEntries(new URLSearchParams(window.location.search)); window.scrollTo({ top: 0, behavior: 'instant' }) }
function navigate(path) { window.history.pushState({}, '', path); syncLocation() }
function openProduct(item) { navigate(`/products/${item.id}`) }
function add(input) { const item = input.product || input; addToCart(item, input.quantity || 1); notify(`已將 ${item.name} 加入購物車。`) }
function update(line) { updateQuantity(line.id, line.quantity) }
function handleWishlist(id) {
  const removing = wishlistIds.value.includes(id)
  toggleWishlist(id)
  notify(removing ? '已從收藏移除。' : '已加入收藏。')
}
function notify(message) { toast.value = message; clearTimeout(toastTimer); toastTimer = setTimeout(() => { toast.value = '' }, 3200) }
function search(term) { navigate(`/products?q=${encodeURIComponent(term)}`) }

onMounted(() => window.addEventListener('popstate', syncLocation))
onUnmounted(() => window.removeEventListener('popstate', syncLocation))
</script>

<template>
  <div class="app-shell" :class="{ 'app-shell--home': route === '/', 'app-shell--about': route === '/about' }">
    <AppHeader v-if="!isAuth" :route="route" :query="query" :cart-count="cartCount" :wishlist-count="wishlistIds.length" @navigate="navigate" @search="search" />
    <HomeView v-if="route === '/'" :products="products" :wishlist-ids="wishlistIds" @navigate="navigate" @add="add" @toggle-wishlist="handleWishlist" @open="openProduct" @notice="notify" />
    <ProductsView v-else-if="route === '/products'" :products="products" :wishlist-ids="wishlistIds" :query="query" @navigate="navigate" @add="add" @toggle-wishlist="handleWishlist" @open="openProduct" />
    <ProductDetailView v-else-if="route.startsWith('/products/')" :product="product" :products="products" :wishlist-ids="wishlistIds" @navigate="navigate" @add="add" @toggle-wishlist="handleWishlist" @open="openProduct" />
    <CartView v-else-if="route === '/cart'" :cart="cart" :subtotal="subtotal" @navigate="navigate" @update-quantity="update" @remove="removeFromCart" />
    <CheckoutView v-else-if="route === '/checkout'" :cart="cart" :subtotal="subtotal" @navigate="navigate" @notice="notify" />
    <AuthView v-else-if="route === '/login'" mode="login" @navigate="navigate" @notice="notify" />
    <AuthView v-else-if="route === '/register'" mode="register" @navigate="navigate" @notice="notify" />
    <AccountView v-else-if="route === '/account'" @navigate="navigate" @notice="notify" />
    <WishlistView v-else-if="route === '/wishlist'" :products="products" :wishlist-ids="wishlistIds" @navigate="navigate" @add="add" @toggle-wishlist="handleWishlist" @open="openProduct" />
    <AboutView v-else-if="route === '/about'" @navigate="navigate" />
    <main v-else class="page-shell"><div class="empty-state"><span>◌</span><h2>找不到頁面</h2><p>此展示網站沒有這個頁面。</p><button class="btn btn-primary" @click="navigate('/')">返回首頁</button></div></main>
    <AppFooter v-if="!isAuth" @navigate="navigate" />
    <ToastNotice :message="toast" />
  </div>
</template>
