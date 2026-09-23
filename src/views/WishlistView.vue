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
  <main class="page-shell wishlist-page">

    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <a
        href="/"
        @click.prevent="emit('navigate', '/')"
      >
        Home
      </a>

      <span>/</span>
      <span>Wishlist</span>
    </div>

    <!-- Page title -->
    <div class="page-title compact">
      <div>
        <p class="eyebrow">Saved for later</p>

        <h1>Your wishlist</h1>

        <p>
          Keep an eye on the gear that caught your attention.
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
      <span>♡</span>

      <h2>Your wishlist is empty</h2>

      <p>
        Save your favorite gear and come back to it anytime.
      </p>

      <button
        type="button"
        class="btn btn-primary"
        @click="emit('navigate', '/products')"
      >
        Explore products
        <span>→</span>
      </button>
    </div>

  </main>
</template>