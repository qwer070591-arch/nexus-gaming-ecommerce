<script setup>
import { ref } from 'vue'

const active = ref('Profile')
const tabs = ['Profile', 'Orders', 'Wishlist', 'Addresses', 'Settings']
const emit = defineEmits(['navigate', 'notice'])

function saveProfile() {
  emit('notice', 'Profile updated in this demo view. Changes are not stored after you leave it.')
}
</script>

<template>
  <main class="page-shell account-page">
    <div class="breadcrumb"><a href="/" @click.prevent="emit('navigate', '/')">Home</a><span>/</span><span>Account</span></div>
    <div class="account-layout">
      <aside class="account-sidebar">
        <div class="account-avatar">JC</div>
        <h2>Jamie Chen</h2>
        <p>jamie@nexus.test</p>
        <nav>
          <button v-for="tab in tabs" :key="tab" :class="{ active: active === tab }" @click="active = tab">
            <span>{{ { Profile: '◯', Orders: '□', Wishlist: '♡', Addresses: '⌂', Settings: '⚙' }[tab] }}</span>{{ tab }}
          </button>
        </nav>
        <button class="signout" @click="emit('navigate', '/')">↗ Sign out</button>
      </aside>

      <section class="account-content">
        <template v-if="active === 'Profile'">
          <p class="eyebrow">Member centre</p>
          <h1>Profile</h1>
          <p class="section-intro">Manage the details connected to your Nexus demo profile.</p>
          <form class="profile-form" @submit.prevent="saveProfile">
            <label>Full name<input value="Jamie Chen" /></label>
            <label>Email address<input value="jamie@nexus.test" type="email" /></label>
            <label>Phone number<input placeholder="Add a phone number" /></label>
            <button class="btn btn-primary">Save changes</button>
          </form>
        </template>

        <template v-else-if="active === 'Orders'">
          <p class="eyebrow">Order history</p><h1>Your orders</h1>
          <div class="account-empty"><span>□</span><h2>No orders yet</h2><p>When you place an order, it will appear here.</p><button class="btn btn-outline" @click="emit('navigate', '/products')">Start shopping</button></div>
        </template>

        <template v-else-if="active === 'Wishlist'">
          <p class="eyebrow">Saved gear</p><h1>Your wishlist</h1>
          <div class="account-empty"><span>♡</span><h2>Your saved products are one click away</h2><p>View and manage the gear you have saved.</p><button class="btn btn-outline" @click="emit('navigate', '/wishlist')">View wishlist</button></div>
        </template>

        <template v-else-if="active === 'Addresses'">
          <p class="eyebrow">Delivery preferences</p><h1>Saved addresses</h1>
          <div class="account-empty"><span>⌂</span><h2>No saved addresses</h2><p>Save an address at checkout to make future orders faster.</p></div>
        </template>

        <template v-else>
          <p class="eyebrow">Preferences</p><h1>Account settings</h1>
          <div class="settings-list"><label><span><b>Product emails</b><small>News, early access, and useful deals.</small></span><input type="checkbox" checked /></label><label><span><b>Order updates</b><small>Delivery and order status notifications.</small></span><input type="checkbox" checked /></label></div>
        </template>
      </section>
    </div>
  </main>
</template>
