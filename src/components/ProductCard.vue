<script setup>
import { computed } from 'vue'
import { money } from '@/utils/format'
import { categoryLabel, badgeLabel } from '@/utils/locale'
import WishlistButton from './WishlistButton.vue'

const props = defineProps({ product: { type: Object, required: true }, wishlisted: Boolean })
const emit = defineEmits(['add', 'toggle-wishlist', 'open'])
const discount = computed(() => props.product.originalPrice ? Math.round((1 - props.product.price / props.product.originalPrice) * 100) : null)
</script>

<template>
  <article class="product-card">
    <div class="product-media">
      <a :href="`/products/${product.id}`" class="product-media-link" @click.prevent="emit('open', product)">
        <img :src="product.image" :alt="product.name" loading="lazy" />
        <span v-if="product.badge" class="product-badge" :class="{ light: product.badge === 'New' }">{{ badgeLabel(product.badge) }}</span>
      </a>
      <WishlistButton :active="wishlisted" @toggle="emit('toggle-wishlist', product.id)" />
    </div>
    <div class="product-content">
      <p class="eyebrow">{{ product.brand }} · {{ categoryLabel(product.category) }}</p>
      <h3><a :href="`/products/${product.id}`" @click.prevent="emit('open', product)">{{ product.name }}</a></h3>
      <div class="rating" :aria-label="`${product.rating} 分，滿分 5 分`"><span>★</span> {{ product.rating }} <small>({{ product.reviews }})</small></div>
      <div class="card-bottom"><p class="price"><span>{{ money(product.price) }}</span><del v-if="product.originalPrice">{{ money(product.originalPrice) }}</del><em v-if="discount">省下 {{ discount }}%</em></p><button class="icon-cart" type="button" aria-label="加入購物車" @click="emit('add', product)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg><span class="add-to-cart-label">加入購物車</span></button></div>
    </div>
  </article>
</template>
