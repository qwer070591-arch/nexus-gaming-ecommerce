<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { products } from '@/data/products'
import { useStore } from '@/composables/useStore'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ToastNotice from '@/components/ToastNotice.vue'
import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import CartView from '@/views/CartView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import AuthView from '@/views/AuthView.vue'
import AccountView from '@/views/AccountView.vue'
import WishlistView from '@/views/WishlistView.vue'
import AboutView from '@/views/AboutView.vue'

const { cart, wishlistIds, cartCount, subtotal, addToCart, updateQuantity, removeFromCart, clearCart, toggleWishlist } = useStore()
const route = ref(window.location.pathname)
const query = ref(Object.fromEntries(new URLSearchParams(window.location.search)))
const toast = ref('')
let toastTimer

const product = computed(() => {
  const match = route.value.match(/^\/products\/(\d+)$/)
  return match ? products.find((item) => item.id === Number(match[1])) : null
})
const isAuth = computed(() => route.value === '/login' || route.value === '/register')

function syncLocation() { route.value = window.location.pathname; query.value = Object.fromEntries(new URLSearchParams(window.location.search)); window.scrollTo({ top: 0, behavior: 'smooth' }) }
function navigate(path) { window.history.pushState({}, '', path); syncLocation() }
function openProduct(item) { navigate(`/products/${item.id}`) }
function add(input) { const item = input.product || input; addToCart(item, input.quantity || 1); notify(`${item.name} added to cart.`) }
function update(line) { updateQuantity(line.id, line.quantity) }
function handleWishlist(id) {
  const removing = wishlistIds.value.includes(id)
  toggleWishlist(id)
  notify(removing ? 'Removed from wishlist.' : 'Added to wishlist.')
}
function notify(message) { toast.value = message; clearTimeout(toastTimer); toastTimer = setTimeout(() => { toast.value = '' }, 3200) }
function search(term) { navigate(`/products?q=${encodeURIComponent(term)}`) }

onMounted(() => window.addEventListener('popstate', syncLocation))
onUnmounted(() => window.removeEventListener('popstate', syncLocation))
</script>

<template>
  <div class="app-shell">
    <AppHeader v-if="!isAuth" :route="route" :query="query" :cart-count="cartCount" :wishlist-count="wishlistIds.length" @navigate="navigate" @search="search" />
    <HomeView v-if="route === '/'" :products="products" :wishlist-ids="wishlistIds" @navigate="navigate" @add="add" @toggle-wishlist="handleWishlist" @open="openProduct" @notice="notify" />
    <ProductsView v-else-if="route === '/products'" :products="products" :wishlist-ids="wishlistIds" :query="query" @navigate="navigate" @add="add" @toggle-wishlist="handleWishlist" @open="openProduct" />
    <ProductDetailView v-else-if="route.startsWith('/products/')" :product="product" :products="products" :wishlist-ids="wishlistIds" @navigate="navigate" @add="add" @toggle-wishlist="handleWishlist" @open="openProduct" />
    <CartView v-else-if="route === '/cart'" :cart="cart" :subtotal="subtotal" @navigate="navigate" @update-quantity="update" @remove="removeFromCart" />
    <CheckoutView v-else-if="route === '/checkout'" :cart="cart" :subtotal="subtotal" @navigate="navigate" @clear-cart="clearCart" @notice="notify" />
    <AuthView v-else-if="route === '/login'" mode="login" @navigate="navigate" @notice="notify" />
    <AuthView v-else-if="route === '/register'" mode="register" @navigate="navigate" @notice="notify" />
    <AccountView v-else-if="route === '/account'" @navigate="navigate" />
    <WishlistView v-else-if="route === '/wishlist'" :products="products" :wishlist-ids="wishlistIds" @navigate="navigate" @add="add" @toggle-wishlist="handleWishlist" @open="openProduct" />
    <AboutView v-else-if="route === '/about'" @navigate="navigate" />
    <main v-else class="page-shell"><div class="empty-state"><span>◌</span><h2>Page not found</h2><p>That page doesn’t exist in this demo storefront.</p><button class="btn btn-primary" @click="navigate('/')">Return home</button></div></main>
    <AppFooter v-if="!isAuth" @navigate="navigate" />
    <ToastNotice :message="toast" />
  </div>
</template>
