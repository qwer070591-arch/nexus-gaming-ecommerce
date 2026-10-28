<script setup>
import { computed, ref } from 'vue'
import { money } from '@/utils/format'

const props = defineProps({ cart: { type: Array, default: () => [] }, subtotal: { type: Number, default: 0 } })
const emit = defineEmits(['navigate', 'notice'])
const shipping = ref('standard')
const completed = ref(false)
const shippingCost = computed(() => shipping.value === 'express' ? 250 : (props.subtotal >= 2000 ? 0 : 150))
const total = computed(() => props.subtotal + shippingCost.value)

function finishDemo() {
  completed.value = true
  emit('notice', '展示流程已完成。不會產生真實訂單或付款，購物車內容仍會保留。')
}
</script>

<template>
  <main class="page-shell checkout-page">
    <div class="breadcrumb"><a href="/cart" @click.prevent="emit('navigate', '/cart')">購物車</a><span>/</span><span>展示結帳</span></div>
    <div v-if="cart.length && !completed" class="checkout-layout">
      <section class="checkout-form" aria-labelledby="checkout-title">
        <div class="checkout-heading"><p class="eyebrow">作品集展示流程</p><h1 id="checkout-title">結帳流程預覽。</h1><p>此頁僅供展示用途，不會收集個資或付款資料，也不會產生真實訂單或配送。展示購物車仍會保留。</p></div>
        <div class="demo-checkout-panel"><h2>示意收件人</h2><p>展示收件人 · 展示城市</p><small>僅為示意資料；本頁沒有個資輸入欄位。</small></div>
        <fieldset class="demo-shipping"><legend>示意配送選項</legend><label class="choice-card"><input v-model="shipping" value="standard" type="radio" name="demo-shipping" /><span><b>一般配送示意</b><small>僅供版面預覽</small></span><strong>{{ subtotal >= 2000 ? 'NT$0' : 'NT$150' }}</strong></label><label class="choice-card"><input v-model="shipping" value="express" type="radio" name="demo-shipping" /><span><b>快速配送示意</b><small>僅供版面預覽</small></span><strong>NT$250</strong></label></fieldset>
        <div class="demo-checkout-panel"><h2>付款</h2><p>展示網站不提供付款功能。</p><small>不會要求信用卡、銀行或貨到付款資料。</small></div>
        <button type="button" class="btn btn-primary checkout-button" @click="finishDemo">完成展示流程 <span aria-hidden="true">→</span></button>
        <p class="demo-checkout-footnote">此操作不會產生訂單，也不會清空購物車。</p>
      </section>
      <aside class="checkout-summary" aria-label="示意購物車摘要"><h2>展示購物車摘要</h2><div class="checkout-items"><div v-for="item in cart" :key="item.id"><img :src="item.image" :alt="item.name" /><span><b>{{ item.name }}</b><small>數量 {{ item.quantity }}</small></span><strong>{{ money(item.price * item.quantity) }}</strong></div></div><p><span>商品小計</span><strong>{{ money(subtotal) }}</strong></p><p><span>示意運費</span><strong>{{ money(shippingCost) }}</strong></p><p class="summary-total"><span>示意合計</span><strong>{{ money(total) }}</strong></p><small>不提供實際付款或配送。</small></aside>
    </div>
    <div v-else class="empty-state"><span aria-hidden="true">✓</span><h1>{{ completed ? '展示流程已完成' : '購物車目前是空的' }}</h1><p>{{ completed ? '不會產生真實訂單或付款，購物車內容仍會保留。' : '加入展示商品，即可體驗結帳介面。' }}</p><button type="button" class="btn btn-primary" @click="emit('navigate', completed ? '/cart' : '/products')">{{ completed ? '返回展示購物車' : '瀏覽商品' }}</button></div>
  </main>
</template>
