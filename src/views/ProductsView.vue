<script setup>
import { computed, ref, watch } from 'vue'
import { allCategories } from '@/data/products'
import ProductFilters from '@/components/ProductFilters.vue'
import ProductGrid from '@/components/ProductGrid.vue'

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

function applyQuery() {
  searchTerm.value = props.query.q || ''
  category.value = props.query.category || 'All'
  dealOnly.value = props.query.deals === 'true'
  featuredOnly.value = props.query.featured === 'true'
  sort.value = props.query.sort || 'featured'
  count.value = 8
}

watch(() => props.query, applyQuery, { immediate: true, deep: true })
watch([searchTerm, category, dealOnly, featuredOnly, sort, price], () => { count.value = 8 })

const results = computed(() => {
  const term = searchTerm.value.toLowerCase().trim()
  const items = props.products.filter((product) => (
    (!term || [product.name, product.category, product.brand].some((value) => value.toLowerCase().includes(term)))
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
  if (searchTerm.value.trim()) filters.push({ key: 'search', label: `Search: ${searchTerm.value.trim()}` })
  if (category.value !== 'All') filters.push({ key: 'category', label: category.value })
  if (dealOnly.value) filters.push({ key: 'deals', label: 'On sale' })
  if (price.value < 20000) filters.push({ key: 'price', label: `Under NT$${price.value.toLocaleString()}` })
  return filters
})
const activeFilterCount = computed(() => activeFilters.value.length)
const emptyStateDescription = computed(() => {
  if (searchTerm.value.trim()) return 'Try another search term, or remove a filter to broaden the results.'
  if (activeFilterCount.value) return 'Try removing a filter or increasing your price range to discover more gear.'
  return 'Check back soon for newly added performance gear.'
})

function resetFilters() {
  searchTerm.value = ''
  category.value = 'All'
  dealOnly.value = false
  featuredOnly.value = false
  price.value = 20000
  sort.value = 'featured'
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
</script>

<template>
  <main class="page-shell">
    <div class="breadcrumb">
      <a href="/" @click.prevent="emit('navigate', '/')">Home</a>
      <span>/</span>
      <span>Products</span>
    </div>

    <div class="page-title">
      <div>
        <p class="eyebrow">Built for better play</p>
        <h1>{{ category === 'All' ? 'All gaming gear' : category }}</h1>
        <p>Explore our collection of considered performance equipment.</p>
      </div>
    </div>

    <div class="mobile-catalog-controls">
      <button
        type="button"
        class="mobile-filter-trigger"
        :aria-expanded="mobileFiltersOpen"
        aria-controls="mobile-filters"
        @click="mobileFiltersOpen = true"
      >
        Filters<span v-if="activeFilterCount"> ({{ activeFilterCount }})</span>
      </button>
      <label class="mobile-sort-control">
        <span>Sort by</span>
        <select v-model="sort" aria-label="Sort products">
          <option value="featured">Featured</option>
          <option value="rating">Top rated</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
        </select>
      </label>
    </div>

    <div class="catalog-layout">
      <aside class="filters filters-desktop">
        <ProductFilters
          :categories="allCategories"
          :products="products"
          :search-term="searchTerm"
          :category="category"
          :deal-only="dealOnly"
          :price="price"
          @update:search-term="searchTerm = $event"
          @update:category="category = $event"
          @update:deal-only="dealOnly = $event"
          @update:price="price = $event"
          @clear="resetFilters"
        />
      </aside>

      <section class="catalog-results">
        <div class="catalog-toolbar">
          <p aria-live="polite"><b>{{ results.length }}</b> products found</p>
          <label>Sort by
            <select v-model="sort">
              <option value="featured">Featured</option>
              <option value="rating">Top rated</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>

        <div v-if="activeFilters.length" class="active-filters" aria-label="Active filters">
          <span>Active filters</span>
          <button
            v-for="filter in activeFilters"
            :key="filter.key"
            type="button"
            :aria-label="`Remove ${filter.label} filter`"
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
        <button v-if="visible.length < results.length" class="btn btn-outline load-more" @click="count += 8">Load more products</button>
      </section>
    </div>

    <div v-if="mobileFiltersOpen" class="mobile-filter-drawer" @click.self="closeMobileFilters">
      <section id="mobile-filters" class="filters mobile-filters" role="dialog" aria-modal="true" aria-labelledby="mobile-filter-title" @keydown.esc="closeMobileFilters">
        <div class="mobile-filter-heading">
          <h2 id="mobile-filter-title">Filters</h2>
          <button type="button" class="text-link small" @click="resetFilters">Clear all</button>
          <button v-focus type="button" class="drawer-close" aria-label="Close filters" @click="closeMobileFilters">×</button>
        </div>
        <ProductFilters
          :categories="allCategories"
          :products="products"
          :search-term="searchTerm"
          :category="category"
          :deal-only="dealOnly"
          :price="price"
          :show-heading="false"
          @update:search-term="searchTerm = $event"
          @update:category="category = $event"
          @update:deal-only="dealOnly = $event"
          @update:price="price = $event"
          @clear="resetFilters"
        />
        <button type="button" class="btn btn-primary mobile-filter-results" @click="closeMobileFilters">View {{ results.length }} {{ results.length === 1 ? 'product' : 'products' }}</button>
      </section>
    </div>
  </main>
</template>
