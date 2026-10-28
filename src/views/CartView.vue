<script setup>
import { computed } from 'vue'
import QuantitySelector from '@/components/QuantitySelector.vue'
import { money } from '@/utils/format'
import { categoryLabel } from '@/utils/locale'

const props = defineProps({ cart: Array, subtotal: Number })
const emit = defineEmits(['navigate', 'update-quantity', 'remove'])
const shipping = computed(() => props.subtotal >= 2000 || props.subtotal === 0 ? 0 : 150)
const total = computed(() => props.subtotal + shipping.value)
</script>

<template>
  <main class="page-shell cart-page"><div class="breadcrumb"><a href="/" @click.prevent="emit('navigate', '/')">首頁</a><span>/</span><span>購物車</span></div><div class="page-title compact"><div><p class="eyebrow">展示購物籃</p><h1>購物車 <small v-if="cart.length">({{ cart.length }} 件商品)</small></h1></div></div><div v-if="cart.length" class="cart-layout"><section class="cart-lines"><article v-for="item in cart" :key="item.id" class="cart-line"><a href="#" class="cart-image" @click.prevent="emit('navigate', `/products/${item.id}`)"><img :src="item.image" :alt="item.name" /></a><div class="cart-item-info"><p class="eyebrow">{{ item.brand }} · {{ categoryLabel(item.category) }}</p><h2><a href="#" @click.prevent="emit('navigate', `/products/${item.id}`)">{{ item.name }}</a></h2><p class="cart-item-price">{{ money(item.price) }}</p><button class="remove-link" @click="emit('remove', item.id)">移除</button></div><div class="cart-line-actions"><QuantitySelector :model-value="item.quantity" @update:model-value="emit('update-quantity', { id: item.id, quantity: $event })" /><strong>{{ money(item.price * item.quantity) }}</strong></div></article><button class="text-link continue-link" @click="emit('navigate', '/products')">← 繼續選購</button></section><aside class="order-summary"><h2>展示訂單摘要</h2><p><span>商品小計</span><strong>{{ money(subtotal) }}</strong></p><p><span>示意運費</span><strong>{{ shipping ? money(shipping) : '免運費' }}</strong></p><p class="summary-total"><span>合計</span><strong>{{ money(total) }}</strong></p><button class="btn btn-primary full" @click="emit('navigate', '/checkout')">體驗展示結帳 <span>→</span></button><small>作品集展示用途，不會產生真實訂單、付款或配送。</small><div class="summary-note"><b>✓</b><span>運費金額僅供介面示範。</span></div></aside></div><div v-else class="empty-state cart-empty"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8.5h12l-1 11H7l-1-11Z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg><h2>購物車目前是空的</h2><p>從精選裝備開始打造你的桌面。</p><button class="btn btn-primary" @click="emit('navigate', '/products')">瀏覽商品 <span>→</span></button></div></main>
</template>
