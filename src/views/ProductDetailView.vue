<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import ProductGrid from '@/components/ProductGrid.vue'
import QuantitySelector from '@/components/QuantitySelector.vue'
import { money } from '@/utils/format'

const props = defineProps({ product: Object, products: Array, wishlistIds: Array })
const emit = defineEmits(['navigate', 'add', 'toggle-wishlist', 'open'])
const image = ref('')
const quantity = ref(1)
const selectedTab = ref('Description')
const tabs = ['Description', 'Specifications', 'Shipping']
const tabButtons = ref([])

const galleryImages = computed(() => Array.from(new Set([
  props.product?.image,
  ...(Array.isArray(props.product?.images) ? props.product.images : []),
].filter(Boolean))))

const related = computed(() => props.products
  .filter((item) => item.category === props.product?.category && item.id !== props.product?.id)
  .slice(0, 4))

watch(galleryImages, (images) => {
  if (!images.includes(image.value)) image.value = images[0] || ''
}, { immediate: true })

function add() {
  emit('add', { product: props.product, quantity: quantity.value })
}

function buy() {
  add()
  emit('navigate', '/cart')
}

function selectTab(tab) {
  selectedTab.value = tab
}

function handleTabKeydown(event, index) {
  let nextIndex = index
  if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length
  else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length
  else if (event.key === 'Home') nextIndex = 0
  else if (event.key === 'End') nextIndex = tabs.length - 1
  else return

  event.preventDefault()
  selectTab(tabs[nextIndex])
  nextTick(() => tabButtons.value[nextIndex]?.focus())
}
</script>

<template>
  <main v-if="product" class="page-shell product-page">
    <div class="breadcrumb">
      <a href="/" @click.prevent="emit('navigate', '/')">Home</a>
      <span>/</span>
      <a href="/products" @click.prevent="emit('navigate', '/products')">Products</a>
      <span>/</span>
      <span>{{ product.name }}</span>
    </div>

    <div class="detail-layout">
      <section class="product-gallery" :aria-label="`${product.name} image gallery`">
        <div class="gallery-main">
          <span v-if="product.badge" class="product-badge">{{ product.badge }}</span>
          <img :src="image || product.image" :alt="product.name" />
        </div>
        <div v-if="galleryImages.length > 1" class="gallery-thumbnails" aria-label="Product image thumbnails">
          <button
            v-for="(item, index) in galleryImages"
            :key="item"
            type="button"
            :class="{ active: image === item }"
            :aria-label="`View ${product.name}, image ${index + 1}`"
            :aria-pressed="image === item"
            @click="image = item"
          >
            <img :src="item" :alt="`${product.name}, thumbnail ${index + 1}`" loading="lazy" />
          </button>
        </div>
      </section>

      <section class="product-info">
        <p class="eyebrow">{{ product.brand }} · {{ product.category }}</p>
        <h1>{{ product.name }}</h1>
        <div class="detail-rating">
          <span aria-hidden="true">★★★★★</span>
          <b>{{ product.rating }}</b>
          <a href="#reviews">{{ product.reviews }} reviews</a>
        </div>
        <div class="detail-price">
          <strong>{{ money(product.price) }}</strong>
          <del v-if="product.originalPrice">{{ money(product.originalPrice) }}</del>
          <span v-if="product.originalPrice">Save {{ money(product.originalPrice - product.price) }}</span>
        </div>
        <p class="detail-summary">{{ product.description }}</p>
        <div class="purchase-row">
          <QuantitySelector v-model="quantity" />
          <button class="btn btn-primary add-button" @click="add">Add to cart <span>→</span></button>
          <button
            class="wishlist-btn detail-wish"
            :class="{ active: wishlistIds.includes(product.id) }"
            :aria-label="wishlistIds.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'"
            :aria-pressed="wishlistIds.includes(product.id)"
            @click="emit('toggle-wishlist', product.id)"
          >
            {{ wishlistIds.includes(product.id) ? '♥' : '♡' }}
          </button>
        </div>
        <button class="btn btn-dark buy-button" @click="buy">Buy now</button>
        <div class="delivery-notes">
          <p><b>◈</b><span><strong>Free standard shipping</strong><small>On orders over NT$2,000</small></span></p>
          <p><b>↺</b><span><strong>30-day easy returns</strong><small>Return unused items, no questions asked</small></span></p>
        </div>
      </section>
    </div>

    <section class="detail-tabs">
      <div role="tablist" aria-label="Product information">
        <button v-for="(tab, index) in tabs" :key="tab" :ref="(element) => { tabButtons[index] = element }" type="button" role="tab" :id="`product-tab-${tab.toLowerCase()}`" :class="{ active: selectedTab === tab }" :aria-controls="`product-panel-${tab.toLowerCase()}`" :aria-selected="selectedTab === tab" :tabindex="selectedTab === tab ? 0 : -1" @click="selectTab(tab)" @keydown="handleTabKeydown($event, index)">{{ tab }}</button>
      </div>
      <div v-if="selectedTab === 'Description'" id="product-panel-description" class="tab-content" role="tabpanel" aria-labelledby="product-tab-description" tabindex="0">
        <h2>Designed to perform. Built to last.</h2>
        <p>{{ product.description }} Every detail is considered to make your desk feel more capable and your next session more comfortable.</p>
      </div>
      <dl v-else-if="selectedTab === 'Specifications'" id="product-panel-specifications" class="spec-list" role="tabpanel" aria-labelledby="product-tab-specifications" tabindex="0">
        <template v-for="(value, key) in product.specifications" :key="key"><dt>{{ key }}</dt><dd>{{ value }}</dd></template>
      </dl>
      <div v-else id="product-panel-shipping" class="tab-content" role="tabpanel" aria-labelledby="product-tab-shipping" tabindex="0">
        <h2>Simple, reliable delivery.</h2>
        <p>Orders are prepared within 1–2 business days. Standard delivery is free above NT$2,000; express delivery options appear at checkout.</p>
      </div>
    </section>

    <section class="content-section related-section">
      <div class="section-heading"><div><p class="eyebrow">Complete the setup</p><h2>You may also like</h2></div></div>
      <ProductGrid :products="related" :wishlist-ids="wishlistIds" @add="emit('add', { product: $event, quantity: 1 })" @toggle-wishlist="emit('toggle-wishlist', $event)" @open="emit('open', $event)" />
    </section>
  </main>

  <main v-else class="page-shell">
    <div class="empty-state"><span>◌</span><h2>This product is unavailable</h2><p>It may have been moved or no longer exists in this catalogue.</p><button class="btn btn-primary" @click="emit('navigate', '/products')">Browse products</button></div>
  </main>
</template>
