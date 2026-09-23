<script setup>
import { computed } from 'vue'
import { money } from '@/utils/format'
import WishlistButton from './WishlistButton.vue'

const props = defineProps({ product: { type: Object, required: true }, wishlisted: Boolean })
const emit = defineEmits(['add', 'toggle-wishlist', 'open'])
const discount = computed(() => props.product.originalPrice ? Math.round((1 - props.product.price / props.product.originalPrice) * 100) : null)
</script>

<template>
  <article class="product-card">
    <div class="product-media" role="button" tabindex="0" @click="emit('open', product)" @keydown.enter="emit('open', product)">
      <img :src="product.image" :alt="product.name" loading="lazy" />
      <span v-if="product.badge" class="product-badge" :class="{ light: product.badge === 'New' }">{{ product.badge }}</span>
      <WishlistButton :active="wishlisted" @toggle="emit('toggle-wishlist', product.id)" />
    </div>
    <div class="product-content">
      <p class="eyebrow">{{ product.brand }} · {{ product.category }}</p>
      <h3><a href="#" @click.prevent="emit('open', product)">{{ product.name }}</a></h3>
      <div class="rating" :aria-label="`${product.rating} out of 5 stars`"><span>★</span> {{ product.rating }} <small>({{ product.reviews }})</small></div>
      <div class="card-bottom"><p class="price"><span>{{ money(product.price) }}</span><del v-if="product.originalPrice">{{ money(product.originalPrice) }}</del><em v-if="discount">Save {{ discount }}%</em></p><button class="icon-cart" type="button" aria-label="Add to cart" @click="emit('add', product)"><span aria-hidden="true">＋</span><span class="add-to-cart-label">Add to cart</span></button></div>
    </div>
  </article>
</template>
