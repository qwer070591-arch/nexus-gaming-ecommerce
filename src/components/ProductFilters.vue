<script setup>
import { computed } from 'vue'

const props = defineProps({
  categories: { type: Array, required: true },
  products: { type: Array, required: true },
  searchTerm: { type: String, default: '' },
  category: { type: String, default: 'All' },
  dealOnly: { type: Boolean, default: false },
  price: { type: Number, default: 20000 },
  showHeading: { type: Boolean, default: true },
})

const emit = defineEmits([
  'update:searchTerm',
  'update:category',
  'update:dealOnly',
  'update:price',
  'clear',
])

const searchTermModel = computed({
  get: () => props.searchTerm,
  set: (value) => emit('update:searchTerm', value),
})
const categoryModel = computed({
  get: () => props.category,
  set: (value) => emit('update:category', value),
})
const dealOnlyModel = computed({
  get: () => props.dealOnly,
  set: (value) => emit('update:dealOnly', value),
})
const priceModel = computed({
  get: () => props.price,
  set: (value) => emit('update:price', Number(value)),
})

function categoryCount(item) {
  return item === 'All'
    ? props.products.length
    : props.products.filter((product) => product.category === item).length
}
</script>

<template>
  <div v-if="showHeading" class="filter-title">
    <h2>Filters</h2>
    <button type="button" class="text-link small" @click="emit('clear')">Clear all</button>
  </div>

  <label class="filter-search">
    <span class="sr-only">Search products</span>
    <input v-model="searchTermModel" type="search" placeholder="Search products" />
    <b aria-hidden="true">⌕</b>
  </label>

  <fieldset>
    <legend>Category</legend>
    <label v-for="item in categories" :key="item" class="filter-option">
      <input v-model="categoryModel" type="radio" :value="item" />
      <span>{{ item }}</span>
      <small>{{ categoryCount(item) }}</small>
    </label>
  </fieldset>

  <fieldset>
    <legend>Price range <output>Up to NT${{ price.toLocaleString() }}</output></legend>
    <input v-model.number="priceModel" class="range-input" type="range" min="500" max="20000" step="500" />
    <div class="range-label"><span>NT$500</span><span>NT$20,000</span></div>
  </fieldset>

  <label class="checkbox-option">
    <input v-model="dealOnlyModel" type="checkbox" />
    <span>On sale only</span>
  </label>
</template>
