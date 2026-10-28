<script setup>
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { allCategories } from '@/data/products'
import ProductFilters from '@/components/ProductFilters.vue'
import ProductGrid from '@/components/ProductGrid.vue'
import { categoryLabel } from '@/utils/locale'

const props = defineProps({ products: Array, wishlistIds: Array, query: Object })
const emit = defineEmits(['add', 'toggle-wishlist', 'open', 'navigate'])
const searchTerm = ref('')
const category = ref('All')
const dealOnly = ref(false)
const featuredOnly = ref(false)
const sort = ref('featured')
const price = ref(20000)
const count = ref(8)
const mobileFiltersOpen = ref(false)
const mobileFilterTrigger = ref(null)
const mobileFilterDialog = ref(null)
let previousBodyOverflow

watch(mobileFiltersOpen, async (open) => {
  if (open) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return
  }

  if (previousBodyOverflow !== undefined) {
    document.body.style.overflow = previousBodyOverflow
    previousBodyOverflow = undefined
  }
  await nextTick()
  mobileFilterTrigger.value?.focus()
})

onUnmounted(() => {
  if (previousBodyOverflow !== undefined) document.body.style.overflow = previousBodyOverflow
})

function applyQuery() {
  searchTerm.value = props.query.q || ''
  category.value = props.query.category || 'All'
  dealOnly.value = props.query.deals === 'true'
  featuredOnly.value = props.query.featured === 'true'
  sort.value = props.query.sort || 'featured'
  const requestedPrice = Number(props.query.price)
  price.value = requestedPrice >= 500 && requestedPrice <= 20000 ? requestedPrice : 20000
  count.value = 8
}

watch(() => props.query, applyQuery, { immediate: true, deep: true })
watch([searchTerm, category, dealOnly, featuredOnly, sort, price], () => { count.value = 8 })

const results = computed(() => {
  const term = searchTerm.value.toLowerCase().trim()
  const items = props.products.filter((product) => (
    (!term || [product.name, product.category, categoryLabel(product.category), product.brand].some((value) => value.toLowerCase().includes(term)))
    && (category.value === 'All' || product.category === category.value)
    && (!dealOnly.value || product.originalPrice)
    && (!featuredOnly.value || product.featured === true)
    && product.price <= price.value
  ))

  if (sort.value === 'price-low') items.sort((a, b) => a.price - b.price)
  else if (sort.value === 'price-high') items.sort((a, b) => b.price - a.price)
  else if (sort.value === 'rating') items.sort((a, b) => b.rating - a.rating)
  else items.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating)

  return items
})

const visible = computed(() => results.value.slice(0, count.value))
const activeFilters = computed(() => {
  const filters = []
  if (category.value !== 'All') filters.push({ key: 'category', label: categoryLabel(category.value) })
  if (dealOnly.value) filters.push({ key: 'deals', label: '優惠商品' })
  if (price.value < 20000) filters.push({ key: 'price', label: `NT$${price.value.toLocaleString()} 以下` })
  return filters
})
const activeFilterCount = computed(() => activeFilters.value.length)
const emptyStateDescription = computed(() => {
  if (searchTerm.value.trim()) return '換個搜尋詞或移除篩選條件，查看更多商品。'
  if (activeFilterCount.value) return '試著移除篩選條件或提高價格上限。'
  return '目前沒有符合條件的商品，歡迎稍後再看看。'
})

function resetFilters() {
  emit('navigate', '/products')
}

function clearSearch() {
  const params = new URLSearchParams()
  if (category.value !== 'All') params.set('category', category.value)
  if (dealOnly.value) params.set('deals', 'true')
  if (featuredOnly.value) params.set('featured', 'true')
  if (sort.value !== 'featured') params.set('sort', sort.value)
  if (price.value < 20000) params.set('price', String(price.value))
  emit('navigate', `/products${params.size ? `?${params}` : ''}`)
}

function removeFilter(key) {
  if (key === 'search') searchTerm.value = ''
  if (key === 'category') category.value = 'All'
  if (key === 'deals') dealOnly.value = false
  if (key === 'price') price.value = 20000
}

function closeMobileFilters() {
  mobileFiltersOpen.value = false
}

function handleDrawerKeydown(event) {
  if (event.key === 'Escape') {
    closeMobileFilters()
    return
  }
  if (event.key !== 'Tab') return

  const controls = [...mobileFilterDialog.value.querySelectorAll('button, input, select, a[href]')]
    .filter((element) => !element.disabled && element.getClientRects().length)
  if (!controls.length) return
  const first = controls[0]
  const last = controls[controls.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}
</script>

<template>
  <main class="page-shell">
    <div class="breadcrumb">
      <a href="/" @click.prevent="emit('navigate', '/')">首頁</a>
      <span>/</span>
      <span>商品</span>
    </div>

    <div class="page-title">
      <div>
        <p class="eyebrow">為更好的遊戲體驗而選</p>
        <h1>{{ category === 'All' ? '所有電競裝備' : categoryLabel(category) }}</h1>
        <p>探索精選的遊戲與桌面裝備。</p>
      </div>
    </div>

    <div class="mobile-catalog-controls">
      <button
        ref="mobileFilterTrigger"
        type="button"
        class="mobile-filter-trigger"
        :aria-expanded="mobileFiltersOpen"
        aria-controls="mobile-filters"
        @click="mobileFiltersOpen = true"
      >
        篩選<span v-if="activeFilterCount"> ({{ activeFilterCount }})</span>
      </button>
      <label class="mobile-sort-control">
        <span>排序方式</span>
        <select v-model="sort" aria-label="商品排序">
          <option value="featured">精選優先</option>
          <option value="rating">評分最高</option>
          <option value="price-low">價格：低到高</option>
          <option value="price-high">價格：高到低</option>
        </select>
      </label>
    </div>

    <div class="catalog-layout">
      <aside class="filters filters-desktop">
        <ProductFilters
          :categories="allCategories"
          :products="products"
          :category="category"
          :deal-only="dealOnly"
          :price="price"
          @update:category="category = $event"
          @update:deal-only="dealOnly = $event"
          @update:price="price = $event"
          @clear="resetFilters"
        />
      </aside>

      <section class="catalog-results">
        <div v-if="searchTerm.trim()" class="catalog-search-summary">
          <p>目前搜尋：<strong>{{ searchTerm.trim() }}</strong></p>
          <button type="button" @click="clearSearch">清除關鍵字</button>
        </div>
        <div class="catalog-toolbar">
          <p aria-live="polite"><b>{{ results.length }}</b> 件商品</p>
          <label>排序方式
            <select v-model="sort">
              <option value="featured">精選優先</option>
              <option value="rating">評分最高</option>
              <option value="price-low">價格：低到高</option>
              <option value="price-high">價格：高到低</option>
            </select>
          </label>
        </div>

        <div v-if="activeFilters.length" class="active-filters" aria-label="已套用篩選條件">
          <span>已套用篩選</span>
          <button
            v-for="filter in activeFilters"
            :key="filter.key"
            type="button"
            :aria-label="`移除${filter.label}篩選`"
            @click="removeFilter(filter.key)"
          >
            {{ filter.label }} <b aria-hidden="true">×</b>
          </button>
        </div>

        <ProductGrid
          :products="visible"
          :wishlist-ids="wishlistIds"
          :empty-description="emptyStateDescription"
          @add="emit('add', $event)"
          @toggle-wishlist="emit('toggle-wishlist', $event)"
          @open="emit('open', $event)"
        />
        <button v-if="visible.length < results.length" class="btn btn-outline load-more" @click="count += 8">載入更多商品</button>
      </section>
    </div>

    <div v-if="mobileFiltersOpen" class="mobile-filter-drawer" @click.self="closeMobileFilters">
      <section id="mobile-filters" ref="mobileFilterDialog" class="filters mobile-filters" role="dialog" aria-modal="true" aria-labelledby="mobile-filter-title" @keydown="handleDrawerKeydown">
        <div class="mobile-filter-heading">
          <h2 id="mobile-filter-title">篩選</h2>
          <button type="button" class="text-link small" @click="resetFilters">清除全部</button>
          <button v-focus type="button" class="drawer-close" aria-label="關閉篩選" @click="closeMobileFilters">×</button>
        </div>
        <ProductFilters
          :categories="allCategories"
          :products="products"
          :category="category"
          :deal-only="dealOnly"
          :price="price"
          :show-heading="false"
          @update:category="category = $event"
          @update:deal-only="dealOnly = $event"
          @update:price="price = $event"
          @clear="resetFilters"
        />
        <button type="button" class="btn btn-primary mobile-filter-results" @click="closeMobileFilters">查看 {{ results.length }} 件商品</button>
      </section>
    </div>
  </main>
</template>
