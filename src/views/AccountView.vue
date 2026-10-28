<script setup>
import { ref } from 'vue'

const active = ref('Profile')
const tabs = ['Profile', 'Orders', 'Wishlist', 'Addresses', 'Settings']
const emit = defineEmits(['navigate', 'notice'])

function saveProfile() {
  emit('notice', '展示資料已更新；離開此頁後不會保存。')
}
</script>

<template>
  <main class="page-shell account-page">
    <div class="breadcrumb"><a href="/" @click.prevent="emit('navigate', '/')">首頁</a><span>/</span><span>會員展示</span></div>
    <div class="account-layout">
      <aside class="account-sidebar">
        <div class="account-avatar">示</div>
        <h2>展示使用者</h2>
        <p>jamie@nexus.test</p>
        <nav>
          <button v-for="tab in tabs" :key="tab" :class="{ active: active === tab }" @click="active = tab">
            <span>{{ { Profile: '◯', Orders: '□', Wishlist: '♡', Addresses: '⌂', Settings: '⚙' }[tab] }}</span>{{ { Profile: '個人資料', Orders: '訂單', Wishlist: '收藏', Addresses: '地址', Settings: '設定' }[tab] }}
          </button>
        </nav>
        <button class="signout" @click="emit('navigate', '/')">↗ 離開展示頁</button>
      </aside>

      <section class="account-content">
        <template v-if="active === 'Profile'">
          <p class="eyebrow">展示會員中心</p>
          <h1>個人資料</h1>
          <p class="section-intro">此頁僅供介面展示，請勿輸入真實個資。</p>
          <form class="profile-form" @submit.prevent="saveProfile">
            <label>姓名<input value="展示使用者" /></label>
            <label>電子郵件<input value="jamie@nexus.test" type="email" /></label>
            <label>電話<input placeholder="請使用虛構號碼" /></label>
            <button class="btn btn-primary">儲存展示變更</button>
          </form>
        </template>

        <template v-else-if="active === 'Orders'">
          <p class="eyebrow">展示訂單紀錄</p><h1>我的訂單</h1>
          <div class="account-empty"><span>□</span><h2>目前沒有訂單</h2><p>此網站不會產生真實訂單或付款。</p><button class="btn btn-outline" @click="emit('navigate', '/products')">瀏覽商品</button></div>
        </template>

        <template v-else-if="active === 'Wishlist'">
          <p class="eyebrow">收藏裝備</p><h1>我的收藏</h1>
          <div class="account-empty"><span>♡</span><h2>喜歡的商品隨時可看</h2><p>查看與管理已收藏的展示商品。</p><button class="btn btn-outline" @click="emit('navigate', '/wishlist')">查看收藏</button></div>
        </template>

        <template v-else-if="active === 'Addresses'">
          <p class="eyebrow">配送資料展示</p><h1>儲存地址</h1>
          <div class="account-empty"><span>⌂</span><h2>沒有儲存地址</h2><p>展示結帳不收集或儲存真實地址。</p></div>
        </template>

        <template v-else>
          <p class="eyebrow">偏好設定</p><h1>會員設定</h1>
          <div class="settings-list"><label><span><b>商品通知（展示）</b><small>此選項僅為介面展示，不會寄送郵件。</small></span><input type="checkbox" checked /></label><label><span><b>訂單通知（展示）</b><small>不會產生真實訂單或配送通知。</small></span><input type="checkbox" checked /></label></div>
        </template>
      </section>
    </div>
  </main>
</template>
