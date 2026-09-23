<script setup>
import { computed } from 'vue'
import { categories } from '@/data/products'
import ProductGrid from '@/components/ProductGrid.vue'

const props = defineProps({ products: Array, wishlistIds: Array })
const emit = defineEmits(['navigate', 'add', 'toggle-wishlist', 'open', 'notice'])
const featured = computed(() => props.products.filter((product) => product.featured).slice(0, 5))
const popular = computed(() => {
  const candidates = props.products.filter((product) => product.popular)
  const notFeatured = candidates.filter((product) => !product.featured)
  return [...notFeatured, ...candidates.filter((product) => product.featured)].slice(0, 4)
})
</script>

<template>
  <main>
    <section class="hero"><div class="hero-copy"><p class="hero-kicker"><i></i> New collection 2026</p><h1>Find your <em>competitive</em> edge.</h1><p class="hero-lede">Precision gear, thoughtfully curated for the way you play. Build a setup that never gets in your way.</p><div class="hero-actions"><button class="btn btn-primary" @click="emit('navigate', '/products')">Shop the collection <span>→</span></button><button class="btn btn-ghost" @click="emit('navigate', '/products?category=Keyboards')">Explore keyboards</button></div><div class="hero-trust"><span><b>4.9/5</b> customer rating</span><span><b>Free shipping</b> over NT$2,000</span></div></div><div class="hero-visual"><div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div><div class="hero-label top">NEXUS // PERFORMANCE</div><img src="/images/products/apex-k87/main.webp" alt="Apex K87 mechanical gaming keyboard" /><div class="hero-label bottom"><span>01</span> APEX K87<br><small>MECHANICAL KEYBOARD</small></div></div></section>

    <section class="content-section category-section"><div class="section-heading"><div><p class="eyebrow">Curated for play</p><h2>Shop by category</h2></div><button class="text-link" @click="emit('navigate', '/products')">View all gear <span>→</span></button></div><div class="category-grid"><button v-for="category in categories" :key="category.name" class="category-card" @click="emit('navigate', `/products?category=${category.name}`)"><img :src="category.image" :alt="category.name" /><span class="category-overlay"></span><span class="category-icon">{{ category.icon }}</span><span class="category-copy"><strong>{{ category.name }}</strong><small>{{ category.description }}</small></span><span class="category-arrow">↗</span></button></div></section>

    <section class="content-section"><div class="section-heading"><div><p class="eyebrow">Ready when you are</p><h2>Featured gear</h2></div><button class="text-link" @click="emit('navigate', '/products?featured=true')">See all products <span>→</span></button></div><ProductGrid :products="featured" :wishlist-ids="wishlistIds" @add="emit('add', $event)" @toggle-wishlist="emit('toggle-wishlist', $event)" @open="emit('open', $event)" /></section>

    <section class="promo-banner"><div><p class="eyebrow">Limited setup offer</p><h2>More desk.<br><em>Less compromise.</em></h2><p>Save on our hand-picked Full Desk Bundle. The essentials, dialled in.</p><button class="btn btn-primary" @click="emit('navigate', '/products/23')">Shop the bundle <span>→</span></button></div><img src="/images/products/hypergear-full-desk-bundle/lifestyle.webp" alt="HyperGear Full Desk Bundle on a gaming desk" /><div class="promo-stat"><b>NT$1,300</b><span>bundle saving</span></div></section>

    <section class="content-section"><div class="section-heading"><div><p class="eyebrow">Community favourites</p><h2>Popular right now</h2></div><button class="text-link" @click="emit('navigate', '/products?sort=rating')">Top rated gear <span>→</span></button></div><ProductGrid :products="popular" :wishlist-ids="wishlistIds" @add="emit('add', $event)" @toggle-wishlist="emit('toggle-wishlist', $event)" @open="emit('open', $event)" /></section>

    <section class="brand-strip"><p>Trusted by serious players</p><div><b>HYPER<span>GEAR</span></b><b>NOVA<span>TECH</span></b><b>TITAN<span>///</span></b><b>PULSE<span>+</span></b><b>APEX<span>®</span></b></div></section>
    <section class="newsletter"><div><p class="eyebrow">Stay in the loop</p><h2>Fresh drops. Useful deals.<br><em>Zero noise.</em></h2></div><form @submit.prevent="emit('notice', 'You’re on the list — welcome to Nexus.')"><label for="newsletter-email" class="sr-only">Email address</label><input id="newsletter-email" required type="email" placeholder="Your email address" /><button class="btn btn-primary">Subscribe <span>→</span></button><small>By subscribing, you agree to our privacy policy.</small></form></section>
  </main>
</template>
