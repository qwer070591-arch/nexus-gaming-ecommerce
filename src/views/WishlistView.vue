<script setup>
import { computed } from 'vue'
import ProductGrid from '@/components/ProductGrid.vue'

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  },
  wishlistIds: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  'navigate',
  'add',
  'toggle-wishlist',
  'open'
])

const items = computed(() =>
  props.products.filter((product) =>
    props.wishlistIds.includes(product.id)
  )
)
</script>

<template>
  <main class="page-shell wishlist-page" :class="{ 'wishlist-page--empty': !items.length }">

    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <a
        href="/"
        @click.prevent="emit('navigate', '/')"
      >
        首頁
      </a>

      <span>/</span>
      <span>收藏清單</span>
    </div>

    <!-- Page title -->
    <div class="page-title compact">
      <div>
        <p class="eyebrow">稍後再看</p>

        <h1>我的收藏</h1>

        <p>
          把喜歡的裝備存起來，隨時回來看看。
        </p>
      </div>
    </div>

    <!-- 有收藏商品 -->
    <ProductGrid
      v-if="items.length"
      :products="items"
      :wishlist-ids="wishlistIds"
      @add="emit('add', $event)"
      @toggle-wishlist="emit('toggle-wishlist', $event)"
      @open="emit('open', $event)"
    />

    <!-- 沒有收藏商品 -->
    <div
      v-else
      class="empty-state wishlist-empty"
    >
      <svg class="wishlist-empty__icon" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 40.5 7.8 24.7a10.1 10.1 0 0 1 14.3-14.3L24 12.3l1.9-1.9a10.1 10.1 0 0 1 14.3 14.3L24 40.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

      <h2>收藏清單目前是空的</h2>

      <p>
        瀏覽商品，將喜歡的裝備加入收藏。
      </p>

      <button
        type="button"
        class="btn btn-primary"
        @click="emit('navigate', '/products')"
      >
        瀏覽商品
        <span>→</span>
      </button>
    </div>

  </main>
</template>
