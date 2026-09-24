import { computed, ref, watch } from 'vue'

const CART_KEY = 'nexus-cart'
const WISHLIST_KEY = 'nexus-wishlist'

function load(key, fallback, isValid) {
  try {
    const saved = localStorage.getItem(key)
    if (!saved) return fallback

    const value = JSON.parse(saved)
    return isValid(value) ? value : fallback
  } catch {
    return fallback
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Keep the in-memory store usable when browser storage is unavailable.
  }
}

function isCart(value) {
  return Array.isArray(value) && value.every((item) => (
    item
    && typeof item === 'object'
    && typeof item.id === 'number'
    && typeof item.price === 'number'
    && Number.isFinite(item.price)
    && typeof item.quantity === 'number'
    && Number.isFinite(item.quantity)
    && item.quantity > 0
  ))
}

function isWishlist(value) {
  return Array.isArray(value) && value.every((id) => typeof id === 'number')
}

const cart = ref(load(CART_KEY, [], isCart))
const wishlistIds = ref(load(WISHLIST_KEY, [], isWishlist))

watch(cart, (value) => save(CART_KEY, value), { deep: true })
watch(wishlistIds, (value) => save(WISHLIST_KEY, value), { deep: true })

export function useStore() {
  const cartCount = computed(() => cart.value.reduce((total, item) => total + item.quantity, 0))
  const subtotal = computed(() => cart.value.reduce((total, item) => total + item.price * item.quantity, 0))

  function addToCart(product, quantity = 1) {
    const line = cart.value.find((item) => item.id === product.id)
    if (line) line.quantity += quantity
    else cart.value.push({ ...product, quantity })
  }

  function updateQuantity(id, quantity) {
    const line = cart.value.find((item) => item.id === id)
    if (!line) return
    if (quantity < 1) removeFromCart(id)
    else line.quantity = quantity
  }

  function removeFromCart(id) {
    cart.value = cart.value.filter((item) => item.id !== id)
  }

  function clearCart() { cart.value = [] }
  function toggleWishlist(id) {
    wishlistIds.value = wishlistIds.value.includes(id)
      ? wishlistIds.value.filter((itemId) => itemId !== id)
      : [...wishlistIds.value, id]
  }
  function isWishlisted(id) { return wishlistIds.value.includes(id) }

  return { cart, wishlistIds, cartCount, subtotal, addToCart, updateQuantity, removeFromCart, clearCart, toggleWishlist, isWishlisted }
}
