<script setup>
import { computed } from 'vue'
import { categoryLabel } from '@/utils/locale'

const props = defineProps({
  categories: { type: Array, required: true },
  products: { type: Array, required: true },
  category: { type: String, default: 'All' },
  dealOnly: { type: Boolean, default: false },
  price: { type: Number, default: 20000 },
  showHeading: { type: Boolean, default: true },
})

const emit = defineEmits([
  'update:category',
  'update:dealOnly',
  'update:price',
  'clear',
])

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
    <h2>篩選</h2>
    <button type="button" class="text-link small" @click="emit('clear')">清除全部</button>
  </div>

  <fieldset>
    <legend>分類</legend>
    <label v-for="item in categories" :key="item" class="filter-option">
      <input v-model="categoryModel" type="radio" :value="item" />
      <span>{{ categoryLabel(item) }}</span>
      <small>{{ categoryCount(item) }}</small>
    </label>
  </fieldset>

  <fieldset>
    <legend>價格範圍 <output>最高 NT${{ price.toLocaleString() }}</output></legend>
    <input v-model.number="priceModel" class="range-input" type="range" min="500" max="20000" step="500" aria-label="最高價格" />
    <div class="range-label"><span>NT$500</span><span>NT$20,000</span></div>
  </fieldset>

  <label class="checkbox-option">
    <input v-model="dealOnlyModel" type="checkbox" />
    <span>僅顯示優惠商品</span>
  </label>
</template>
