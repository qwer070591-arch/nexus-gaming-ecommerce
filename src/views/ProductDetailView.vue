<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import ProductGrid from '@/components/ProductGrid.vue'
import QuantitySelector from '@/components/QuantitySelector.vue'
import { money } from '@/utils/format'
import { categoryLabel, badgeLabel, productDescription, specificationLabel, specificationValue } from '@/utils/locale'

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
      <a href="/" @click.prevent="emit('navigate', '/')">首頁</a>
      <span>/</span>
      <a href="/products" @click.prevent="emit('navigate', '/products')">商品</a>
      <span>/</span>
      <span>{{ product.name }}</span>
    </div>

    <div class="detail-layout">
      <section class="product-gallery" :aria-label="`${product.name} 圖片瀏覽區`">
        <div class="gallery-main">
          <span v-if="product.badge" class="product-badge">{{ badgeLabel(product.badge) }}</span>
          <img :src="image || product.image" :alt="product.name" />
        </div>
        <div v-if="galleryImages.length > 1" class="gallery-thumbnails" aria-label="商品圖片縮圖">
          <button
            v-for="(item, index) in galleryImages"
            :key="item"
            type="button"
            :class="{ active: image === item }"
            :aria-label="`查看 ${product.name} 第 ${index + 1} 張圖片`"
            :aria-pressed="image === item"
            @click="image = item"
          >
            <img :src="item" :alt="`${product.name}，第 ${index + 1} 張縮圖`" loading="lazy" />
          </button>
        </div>
      </section>

      <section class="product-info">
        <p class="eyebrow">{{ product.brand }} · {{ categoryLabel(product.category) }}</p>
        <h1>{{ product.name }}</h1>
        <div class="detail-rating">
          <span aria-hidden="true">★★★★★</span>
          <b>{{ product.rating }}</b>
          <a href="#reviews">{{ product.reviews }} 則評價</a>
        </div>
        <div class="detail-price">
          <strong>{{ money(product.price) }}</strong>
          <del v-if="product.originalPrice">{{ money(product.originalPrice) }}</del>
          <span v-if="product.originalPrice">省下 {{ money(product.originalPrice - product.price) }}</span>
        </div>
        <p class="detail-summary">{{ productDescription(product) }} 商品與價格均為展示資料，不會產生真實訂單或付款。</p>
        <div class="purchase-row">
          <QuantitySelector v-model="quantity" />
          <button class="btn btn-primary add-button" @click="add">加入購物車 <span>→</span></button>
          <button
            class="wishlist-btn detail-wish"
            :class="{ active: wishlistIds.includes(product.id) }"
            :aria-label="wishlistIds.includes(product.id) ? '從收藏移除' : '加入收藏'"
            :aria-pressed="wishlistIds.includes(product.id)"
            @click="emit('toggle-wishlist', product.id)"
          >
            <svg viewBox="0 0 24 24" :fill="wishlistIds.includes(product.id) ? 'currentColor' : 'none'" aria-hidden="true"><path d="M20.5 8.6c0 4.8-8.5 10.5-8.5 10.5S3.5 13.4 3.5 8.6a4.4 4.4 0 0 1 8.5-1.5 4.4 4.4 0 0 1 8.5 1.5Z"/></svg>
          </button>
        </div>
        <button class="btn btn-dark buy-button" @click="buy">查看展示購物車</button>
        <div class="delivery-notes">
          <p><b>◈</b><span><strong>作品集展示網站</strong><small>不提供實際配送或退貨。</small></span></p>
          <p><b>↺</b><span><strong>體驗展示功能</strong><small>購物車與收藏僅保存在此瀏覽器。</small></span></p>
        </div>
      </section>
    </div>

    <section class="detail-tabs">
      <div role="tablist" aria-label="商品資訊">
        <button v-for="(tab, index) in tabs" :key="tab" :ref="(element) => { tabButtons[index] = element }" type="button" role="tab" :id="`product-tab-${tab.toLowerCase()}`" :class="{ active: selectedTab === tab }" :aria-controls="`product-panel-${tab.toLowerCase()}`" :aria-selected="selectedTab === tab" :tabindex="selectedTab === tab ? 0 : -1" @click="selectTab(tab)" @keydown="handleTabKeydown($event, index)">{{ { Description: '商品介紹', Specifications: '商品規格', Shipping: '配送說明' }[tab] }}</button>
      </div>
      <div v-if="selectedTab === 'Description'" id="product-panel-description" class="tab-content" role="tabpanel" aria-labelledby="product-tab-description" tabindex="0">
        <h2>用心設計，融入你的桌面。</h2>
        <p>{{ productDescription(product) }} 以上規格與介紹僅供作品集展示。</p>
      </div>
      <dl v-else-if="selectedTab === 'Specifications'" id="product-panel-specifications" class="spec-list" role="tabpanel" aria-labelledby="product-tab-specifications" tabindex="0">
        <template v-for="(value, key) in product.specifications" :key="key"><dt>{{ specificationLabel(key) }}</dt><dd>{{ specificationValue(value) }}</dd></template>
      </dl>
      <div v-else id="product-panel-shipping" class="tab-content" role="tabpanel" aria-labelledby="product-tab-shipping" tabindex="0">
        <h2>此展示網站不提供配送。</h2>
        <p>展示結帳中的配送選項僅為介面示範，不會產生真實訂單、付款或配送。</p>
      </div>
    </section>

    <section class="content-section related-section">
      <div class="section-heading"><div><p class="eyebrow">搭配更多裝備</p><h2>你可能也喜歡</h2></div></div>
      <ProductGrid :products="related" :wishlist-ids="wishlistIds" @add="emit('add', { product: $event, quantity: 1 })" @toggle-wishlist="emit('toggle-wishlist', $event)" @open="emit('open', $event)" />
    </section>
  </main>

  <main v-else class="page-shell">
    <div class="empty-state"><span>◌</span><h2>此商品目前無法顯示</h2><p>商品可能已移動或不在展示清單中。</p><button class="btn btn-primary" @click="emit('navigate', '/products')">瀏覽商品</button></div>
  </main>
</template>
