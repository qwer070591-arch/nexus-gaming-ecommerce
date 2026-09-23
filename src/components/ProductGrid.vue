<script setup>
import ProductCard from './ProductCard.vue'
defineProps({ products: { type: Array, default: () => [] }, wishlistIds: { type: Array, default: () => [] }, emptyDescription: { type: String, default: 'Try a different search term or clear a filter to discover more gear.' } })
const emit = defineEmits(['add', 'toggle-wishlist', 'open'])
</script>

<template>
  <div v-if="products.length" class="product-grid"><ProductCard v-for="product in products" :key="product.id" :product="product" :wishlisted="wishlistIds.includes(product.id)" @add="emit('add', $event)" @toggle-wishlist="emit('toggle-wishlist', $event)" @open="emit('open', $event)" /></div>
  <div v-else class="empty-state" role="status"><span>⌕</span><h2>No products found</h2><p>{{ emptyDescription }}</p></div>
</template>
