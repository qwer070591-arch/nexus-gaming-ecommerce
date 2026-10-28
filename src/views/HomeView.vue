<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { categories } from '@/data/products'
import { money } from '@/utils/format'
import { categoryLabel, specificationValue, productDescription } from '@/utils/locale'
import MediaPlaceholder from '@/components/MediaPlaceholder.vue'
import HeroCoverflow from '@/components/HeroCoverflow.vue'
import ProductGrid from '@/components/ProductGrid.vue'

const props = defineProps({ products: Array, wishlistIds: Array })
const emit = defineEmits(['navigate', 'add', 'toggle-wishlist', 'open'])
const root = ref(null)
const featured = computed(() => props.products.filter((product) => product.featured).slice(0, 5))
const storyProduct = computed(() => props.products.find((product) => product.id === 23))
const homeCategories = [...categories.slice(0, 2), { name: 'Mouse Pads' }, ...categories.slice(2)]
const categoryMedia = { Keyboards: 'HOME_CATEGORY_KEYBOARD', Mice: 'HOME_CATEGORY_MOUSE', 'Mouse Pads': 'HOME_CATEGORY_MOUSEPAD', Headsets: 'HOME_CATEGORY_HEADSET', Monitors: 'HOME_CATEGORY_MONITOR', Accessories: 'HOME_CATEGORY_ACCESSORY' }
const categoryAssets = {
  Keyboards: { src: '/media/home/category-keyboard.webp', width: 1536, height: 1024 },
  Mice: { src: '/media/home/category-mouse.webp', mobileSrc: '/media/home/category-mouse-mobile.webp', width: 1122, height: 1402 },
  'Mouse Pads': { src: '/media/home/category-mousepad.webp', mobileSrc: '/media/home/category-mousepad-mobile.webp', width: 1122, height: 1402 },
  Headsets: { src: '/media/home/category-headset.webp', mobileSrc: '/media/home/category-headset-mobile.webp', width: 1122, height: 1402 },
  Monitors: { src: '/media/home/category-monitor.webp', mobileSrc: '/media/home/category-monitor-mobile.webp', width: 1122, height: 1402 },
  Accessories: { src: '/media/home/category-accessory.webp', width: 1536, height: 1024 },
}
let motionContext
let mediaQuery

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  motionContext = gsap.context(() => {
    mediaQuery = gsap.matchMedia()
    mediaQuery.add({ desktop: '(min-width: 801px)', mobile: '(max-width: 800px)', reduce: '(prefers-reduced-motion: reduce)' }, ({ conditions }) => {
      if (conditions.reduce) return
      root.value.querySelectorAll('[data-scroll-section]').forEach((section) => {
        const items = section.querySelectorAll('[data-reveal]')
        if (!items.length) return
        ScrollTrigger.create({ trigger: section, start: 'top 88%', once: true, onEnter: () => {
          gsap.fromTo(items, { y: conditions.desktop ? 24 : 12, opacity: 0 }, { y: 0, opacity: 1, duration: .65, stagger: .09, ease: 'power2.out', clearProps: 'transform,opacity' })
        } })
      })
      const storyFrame = root.value.querySelector('.nexus-story__visual')
      if (storyFrame) ScrollTrigger.create({ trigger: storyFrame, start: 'top 85%', once: true, onEnter: () => {
        gsap.fromTo(storyFrame.querySelector('.media-placeholder'), { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: .8, ease: 'power2.out', clearProps: 'clipPath' })
      } })
      if (conditions.desktop) {
        gsap.fromTo(storyFrame, { y: 18 }, { y: -18, ease: 'none', scrollTrigger: { trigger: root.value.querySelector('.nexus-story'), start: 'top bottom', end: 'bottom top', scrub: .6 } })
      }
    })
  }, root.value)
})

onUnmounted(() => { mediaQuery?.revert(); motionContext?.revert() })
</script>

<template>
  <main ref="root" class="nexus-home">
    <HeroCoverflow @navigate="emit('navigate', $event)" />

    <section id="discover" class="nexus-home-section nexus-discovery" aria-labelledby="discovery-title" data-scroll-section>
      <div class="nexus-section-head" data-reveal><p class="nexus-overline">01 / 探索分類</p><h2 id="discovery-title">找到適合你的<br><em>桌面節奏。</em></h2><p>從 NEXUS 展示商品中，探索適合自己的裝備。</p></div>
      <div class="nexus-category-grid"><a v-for="(category, index) in homeCategories" :key="category.name" class="nexus-category" :class="{ 'nexus-category--wide': index === 0 || index === homeCategories.length - 1 }" :href="`/products?category=${encodeURIComponent(category.name)}`" @click.prevent="emit('navigate', `/products?category=${encodeURIComponent(category.name)}`)" data-reveal><MediaPlaceholder :media-id="categoryMedia[category.name]" :label="`${categoryLabel(category.name)}分類媒體預留區`" intended-type="image" :aspect-ratio="index === 0 || index === homeCategories.length - 1 ? '3 / 2' : '4 / 5'" mobile-aspect-ratio="16 / 9" variant="category" priority="P2" :show-meta="false" v-bind="categoryAssets[category.name]" alt="" /><span class="nexus-category__footer"><span><small>0{{ index + 1 }} / 分類</small><strong>{{ categoryLabel(category.name) }}</strong></span><span class="nexus-category__arrow" aria-hidden="true">↗</span></span></a></div>
      <a class="nexus-inline-link" href="/products" @click.prevent="emit('navigate', '/products')">瀏覽所有分類 <span aria-hidden="true">↗</span></a>
    </section>

    <section v-if="storyProduct" class="nexus-home-section nexus-story" aria-labelledby="story-title" data-scroll-section>
      <div class="nexus-story__visual" data-reveal><MediaPlaceholder media-id="HOME_FEATURE_STORY" :label="`${storyProduct.name} product story`" intended-type="image" aspect-ratio="4 / 5" mobile-aspect-ratio="4 / 3" variant="story" priority="P1" :show-meta="false" src="/media/home/feature-story.webp" alt="深色桌墊上的機械鍵盤與無線滑鼠，呈現桌面組合配置" :width="1122" :height="1402" /></div>
      <div class="nexus-story__copy"><p class="nexus-overline" data-reveal>02 / 焦點配置</p><h2 id="story-title" data-reveal>一張桌面，<br><em>細節到位。</em></h2><p class="nexus-story__name" data-reveal>{{ storyProduct.name }} <span>{{ money(storyProduct.price) }} · 展示價格</span></p><p data-reveal>{{ productDescription(storyProduct) }}</p><div class="nexus-story__points" data-reveal><p><span>01</span> {{ specificationValue(storyProduct.specifications.Includes) }}</p><p><span>02</span> {{ specificationValue(storyProduct.specifications.Keyboard) }}</p><p><span>03</span> {{ specificationValue(storyProduct.specifications.Mouse) }}</p></div><a class="btn btn-primary" :href="`/products/${storyProduct.id}`" @click.prevent="emit('navigate', `/products/${storyProduct.id}`)" data-reveal>查看組合商品 <span aria-hidden="true">↗</span></a></div>
    </section>

    <section class="nexus-home-section nexus-featured" aria-labelledby="featured-title" data-scroll-section><div class="nexus-section-head nexus-section-head--row" data-reveal><div><p class="nexus-overline">03 / 精選裝備</p><h2 id="featured-title">精選日常，<br><em>由你掌握。</em></h2></div><a class="nexus-inline-link" href="/products?featured=true" @click.prevent="emit('navigate', '/products?featured=true')">瀏覽精選商品 <span aria-hidden="true">↗</span></a></div><p class="nexus-featured__note">商品、價格與評分均為展示資料；購物車和收藏僅保存在此瀏覽器。</p><ProductGrid :products="featured" :wishlist-ids="wishlistIds" @add="emit('add', $event)" @toggle-wishlist="emit('toggle-wishlist', $event)" @open="emit('open', $event)" /></section>

    <section class="nexus-philosophy" aria-labelledby="philosophy-title" data-scroll-section><div class="nexus-philosophy__copy"><p class="nexus-overline" data-reveal>04 / NEXUS 理念</p><h2 id="philosophy-title" data-reveal>減少雜訊，<br><em>專注所愛。</em></h2><p data-reveal>在細節中追求精準，在重要時刻保持專注。讓選擇裝備的過程更從容。</p><div class="nexus-philosophy__values" data-reveal><span>精準</span><span>效能</span><span>簡約</span></div></div><MediaPlaceholder class="nexus-philosophy__media" media-id="HOME_BRAND_FILM" label="NEXUS 品牌桌面情境" intended-type="image" aspect-ratio="4 / 5" mobile-aspect-ratio="16 / 9" variant="brand" priority="P2" :show-meta="false" src="/media/home/brand-philosophy.webp" alt="深色桌面配置，包含螢幕、鍵盤、滑鼠、耳機與桌墊" :width="1122" :height="1402" /></section>

    <section class="nexus-closing" aria-labelledby="closing-title" data-scroll-section><MediaPlaceholder class="nexus-closing__media" media-id="HOME_CLOSING_VISUAL" label="結尾系列媒體預留區" intended-type="either" aspect-ratio="21 / 9" mobile-aspect-ratio="4 / 5" variant="closing" priority="P2" :show-meta="false" /><div class="nexus-closing__content"><p class="nexus-overline" data-reveal>05 / 從這裡開始</p><h2 id="closing-title" data-reveal>找到你的<br><em>下一步。</em></h2><a class="btn btn-primary" href="/products" @click.prevent="emit('navigate', '/products')" data-reveal>瀏覽所有商品 <span aria-hidden="true">↗</span></a><p data-reveal>展示用途，不會產生真實訂單、付款或配送</p></div></section>
  </main>
</template>

<style src="../assets/home-motion.css"></style>
