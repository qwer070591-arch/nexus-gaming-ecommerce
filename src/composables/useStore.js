import { computed, ref, watch } from 'vue'

const CART_KEY = 'nexus-cart'
const WISHLIST_KEY = 'nexus-wishlist'

function load(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

const cart = ref(load(CART_KEY, []))
const wishlistIds = ref(load(WISHLIST_KEY, []))

watch(cart, (value) => localStorage.setItem(CART_KEY, JSON.stringify(value)), { deep: true })
watch(wishlistIds, (value) => localStorage.setItem(WISHLIST_KEY, JSON.stringify(value)), { deep: true })

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
