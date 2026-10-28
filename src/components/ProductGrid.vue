<script setup>
import ProductCard from './ProductCard.vue'
defineProps({ products: { type: Array, default: () => [] }, wishlistIds: { type: Array, default: () => [] }, emptyDescription: { type: String, default: '換個關鍵字，或清除篩選條件再試一次。' } })
const emit = defineEmits(['add', 'toggle-wishlist', 'open'])
</script>

<template>
  <div v-if="products.length" class="product-grid"><ProductCard v-for="product in products" :key="product.id" :product="product" :wishlisted="wishlistIds.includes(product.id)" @add="emit('add', $event)" @toggle-wishlist="emit('toggle-wishlist', $event)" @open="emit('open', $event)" /></div>
  <div v-else class="empty-state" role="status"><span>⌕</span><h2>找不到商品</h2><p>{{ emptyDescription }}</p></div>
</template>
