<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MediaPlaceholder from '@/components/MediaPlaceholder.vue'
import '@/assets/about.css'

const emit = defineEmits(['navigate'])
const root = ref(null)
const media = {
  ABOUT_HERO_DESK: { src: '/media/about/about-hero.webp', mobileSrc: '/media/about/about-hero-mobile.webp', width: 1916, height: 821, alt: '' },
  ABOUT_COLLECTION_PRECISION: { src: '/media/about/about-precision.webp', width: 1122, height: 1402, alt: '' },
  ABOUT_COLLECTION_CONTROL: { src: '/media/about/about-control.webp', width: 1122, height: 1402, alt: '' },
  ABOUT_COLLECTION_IMMERSION: { src: '/media/about/about-immersion.webp', width: 1122, height: 1402, alt: '' },
  ABOUT_COLLECTION_FOUNDATION: { src: '/media/about/about-foundation.webp', width: 1122, height: 1402, alt: '' },
  ABOUT_DETAIL_KEYBOARD: { src: '/media/about/about-detail-keyboard.webp', width: 1122, height: 1402, alt: '黑色機械鍵盤的鍵帽、機身邊緣與露出的鍵軸特寫' },
  ABOUT_DETAIL_MOUSE: { src: '/media/about/about-detail-mouse.webp', width: 1536, height: 1024, alt: '黑色滑鼠滾輪、按鍵分界與側面材質特寫' },
  ABOUT_DETAIL_HEADSET: { src: '/media/about/about-detail-headset.webp', width: 1536, height: 1024, alt: '黑色耳機的耳罩、頭帶軟墊與連接結構特寫' },
  ABOUT_DETAIL_MOUSEPAD: { src: '/media/about/about-detail-mousepad.webp', width: 1122, height: 1402, alt: '黑色桌墊的布面紋理、厚度與邊緣縫線特寫' },
}
const collections = [
  { number: '01', name: '精準掌控', type: '滑鼠', category: 'Mice', mediaId: 'ABOUT_COLLECTION_PRECISION' },
  { number: '02', name: '操控之道', type: '鍵盤', category: 'Keyboards', mediaId: 'ABOUT_COLLECTION_CONTROL' },
  { number: '03', name: '沉浸體驗', type: '耳機', category: 'Headsets', mediaId: 'ABOUT_COLLECTION_IMMERSION' },
  { number: '04', name: '穩固基礎', type: '滑鼠墊', category: 'Mouse Pads', mediaId: 'ABOUT_COLLECTION_FOUNDATION' },
]
const values = [
  { number: '01', title: '精準表現', description: '關注每一次操作回饋，讓控制與反應更加直覺。' },
  { number: '02', title: '舒適體驗', description: '重視長時間使用的感受，從握持、按鍵到配戴細節。' },
  { number: '03', title: '沉浸感受', description: '讓聲音、操作與視覺配置共同建立更完整的遊戲環境。' },
  { number: '04', title: '設計一致性', description: '讓每件裝備在功能與外觀上，都能融入個人的桌面風格。' },
]
const criteria = [
  { number: '01', title: '使用手感', description: '操作回饋、人體工學與長時間使用情境。' },
  { number: '02', title: '功能配置', description: '連接方式、相容性、實際需求與規格清晰度。' },
  { number: '03', title: '桌面整合', description: '尺寸、材質、色彩與整體使用空間。' },
]
const details = [
  { number: '01', title: '每一次按下', subject: '機械鍵盤的按鍵與機身', mediaId: 'ABOUT_DETAIL_KEYBOARD', ratio: '4 / 5' },
  { number: '02', title: '貼合手感的曲線', subject: '滑鼠的曲線與材質', mediaId: 'ABOUT_DETAIL_MOUSE', ratio: '3 / 2' },
  { number: '03', title: '長時間的舒適', subject: '耳機的耳罩與頭帶', mediaId: 'ABOUT_DETAIL_HEADSET', ratio: '3 / 2' },
  { number: '04', title: '從桌面開始', subject: '桌墊的布面與邊緣', mediaId: 'ABOUT_DETAIL_MOUSEPAD', ratio: '4 / 5' },
]
let motionContext
let mediaQuery
let originalDescription

onMounted(() => {
  const description = document.querySelector('meta[name="description"]')
  originalDescription = description?.content
  if (description) description.content = '認識 NEXUS 的電競裝備與桌面體驗理念。這是作品集展示專案，不提供真實購買、付款或訂單服務。'

  gsap.registerPlugin(ScrollTrigger)
  motionContext = gsap.context(() => {
    mediaQuery = gsap.matchMedia()
    mediaQuery.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(root.value.querySelectorAll('.nexus-about__hero [data-about-reveal]'),
        { y: 18, opacity: .78 },
        { y: 0, opacity: 1, duration: .75, stagger: .09, ease: 'power2.out', clearProps: 'transform,opacity' })
      root.value.querySelectorAll('[data-about-section]').forEach((section) => {
        const items = section.querySelectorAll('[data-about-reveal]')
        if (!items.length) return
        ScrollTrigger.create({ trigger: section, start: 'top 88%', once: true, onEnter: () => {
          gsap.fromTo(items, { y: 16, opacity: .82 },
            { y: 0, opacity: 1, duration: .65, stagger: .07, ease: 'power2.out', clearProps: 'transform,opacity' })
        } })
      })
    })
  }, root.value)
})

onUnmounted(() => {
  mediaQuery?.revert()
  motionContext?.revert()
  const description = document.querySelector('meta[name="description"]')
  if (description && originalDescription !== undefined) description.content = originalDescription
})
</script>

<template>
  <main ref="root" class="nexus-about">
    <section class="nexus-about__hero" aria-labelledby="about-title">
      <div class="nexus-about__container">
        <nav class="nexus-about__breadcrumb" aria-label="麵包屑導覽" data-about-reveal><a href="/" @click.prevent="emit('navigate', '/')">首頁</a><span aria-hidden="true">/</span><span aria-current="page">關於我們</span></nav>
        <div class="nexus-about__hero-copy"><p class="nexus-about__eyebrow" data-about-reveal>關於 NEXUS <span>／</span> 品牌展示概念</p><h1 id="about-title" data-about-reveal>不只是裝備，<em>更是每一次投入的起點。</em></h1><p class="nexus-about__lead" data-about-reveal>NEXUS 以遊戲裝備與桌面體驗為核心，探索性能、手感與設計之間的理想平衡。</p></div>
        <MediaPlaceholder class="nexus-about__hero-media" media-id="ABOUT_HERO_DESK" label="完整電競桌面配置媒體預留區" intended-type="image" aspect-ratio="21 / 9" mobile-aspect-ratio="4 / 5" variant="hero" :show-meta="false" :src="media.ABOUT_HERO_DESK.src" :mobile-src="media.ABOUT_HERO_DESK.mobileSrc" :alt="media.ABOUT_HERO_DESK.alt" :width="media.ABOUT_HERO_DESK.width" :height="media.ABOUT_HERO_DESK.height" loading="eager" fetch-priority="high" aria-hidden="true" />
        <div class="nexus-about__hero-caption"><span>01 / 08</span><span>為熱愛遊戲的每個細節</span></div>
      </div>
    </section>

    <section class="nexus-about__section nexus-about__story" aria-labelledby="about-story-title" data-about-section><div class="nexus-about__container nexus-about__story-grid"><div data-about-reveal><p class="nexus-about__eyebrow">02 / 品牌故事</p><h2 id="about-story-title">為熱愛遊戲的<br>每個細節而設計。</h2></div><div class="nexus-about__prose" data-about-reveal><p>從滑鼠移動的每一個瞬間、鍵盤按下的每一次回饋，到長時間佩戴耳機的舒適感，細節會影響我們與遊戲互動的方式。</p><p>NEXUS 是一個以電競裝備為主題的數位品牌展示概念。我們希望透過更清楚的產品資訊、更直覺的探索流程與一致的視覺設計，呈現理想中的遊戲裝備選購體驗。</p><p>好的裝備不只是規格的集合，也應該自然融入使用者的操作習慣與桌面環境。</p></div></div></section>

    <section class="nexus-about__section nexus-about__values" aria-labelledby="about-values-title" data-about-section><div class="nexus-about__container"><div class="nexus-about__section-heading" data-about-reveal><p class="nexus-about__eyebrow">03 / 核心理念</p><h2 id="about-values-title">讓體驗，從細節開始。</h2></div><div class="nexus-about__value-grid"><article v-for="value in values" :key="value.number" class="nexus-about__value" data-about-reveal><span class="nexus-about__number">{{ value.number }}</span><span class="nexus-about__value-mark" aria-hidden="true">✳</span><h3>{{ value.title }}</h3><p>{{ value.description }}</p></article></div></div></section>

    <section class="nexus-about__section nexus-about__collections" aria-labelledby="about-collections-title" data-about-section><div class="nexus-about__container"><div class="nexus-about__section-heading nexus-about__section-heading--split" data-about-reveal><div><p class="nexus-about__eyebrow">04 / 精選系列</p><h2 id="about-collections-title">找到自己的桌面節奏。</h2></div><p>由操作、聆聽到桌面配置，從四個系列開始探索。</p></div><div class="nexus-about__collection-grid"><a v-for="collection in collections" :key="collection.mediaId" class="nexus-about__collection" :href="`/products?category=${encodeURIComponent(collection.category)}`" @click.prevent="emit('navigate', `/products?category=${encodeURIComponent(collection.category)}`)" data-about-reveal><MediaPlaceholder :media-id="collection.mediaId" :label="`${collection.type}系列媒體預留區`" intended-type="image" aspect-ratio="4 / 5" mobile-aspect-ratio="3 / 2" variant="category" :show-meta="false" :src="media[collection.mediaId].src" :alt="media[collection.mediaId].alt" :width="media[collection.mediaId].width" :height="media[collection.mediaId].height" aria-hidden="true" /><span class="nexus-about__collection-info"><span class="nexus-about__number">{{ collection.number }} / {{ collection.type }}</span><strong>{{ collection.name }}</strong><span class="nexus-about__collection-arrow" aria-hidden="true">↗</span><span class="nexus-about__collection-action">探索系列</span></span></a></div></div></section>

    <section class="nexus-about__section nexus-about__criteria" aria-labelledby="about-criteria-title" data-about-section><div class="nexus-about__container nexus-about__criteria-grid"><div data-about-reveal><p class="nexus-about__eyebrow">05 / 選物觀點</p><h2 id="about-criteria-title">從實際使用出發，<br>重新看待裝備的價值。</h2><p class="nexus-about__aside">以下是 NEXUS 展示網站的選物理念，不代表實際商品測試或品質認證。</p></div><ol class="nexus-about__criteria-list"><li v-for="criterion in criteria" :key="criterion.number" data-about-reveal><span class="nexus-about__number">{{ criterion.number }}</span><div><h3>{{ criterion.title }}</h3><p>{{ criterion.description }}</p></div></li></ol></div></section>

    <section class="nexus-about__section nexus-about__details" aria-labelledby="about-details-title" data-about-section><div class="nexus-about__container"><div class="nexus-about__section-heading" data-about-reveal><p class="nexus-about__eyebrow">06 / 產品設計細節</p><h2 id="about-details-title">值得細看的，<br>藏在日常使用裡。</h2></div><div class="nexus-about__detail-grid"><article v-for="detail in details" :key="detail.mediaId" class="nexus-about__detail" data-about-reveal><MediaPlaceholder :media-id="detail.mediaId" :label="`${detail.subject}特寫媒體預留區`" intended-type="image" :aspect-ratio="detail.ratio" mobile-aspect-ratio="3 / 2" variant="brand" :show-meta="false" :src="media[detail.mediaId].src" :alt="media[detail.mediaId].alt" :width="media[detail.mediaId].width" :height="media[detail.mediaId].height" /><div><span class="nexus-about__number">{{ detail.number }} / 細節</span><h3>{{ detail.title }}</h3><p>{{ detail.subject }}</p></div></article></div></div></section>

    <section class="nexus-about__section nexus-about__project" aria-labelledby="about-project-title" data-about-section><div class="nexus-about__container nexus-about__project-grid"><p class="nexus-about__eyebrow" data-about-reveal>07 / 展示專案說明</p><div data-about-reveal><h2 id="about-project-title">一個持續探索<br>數位購物體驗的作品。</h2><p>NEXUS 為電競裝備主題的作品集展示專案。網站中的商品、價格、收藏、購物車及結帳介面用於展示網頁設計與互動功能，不提供真實購買、付款或訂單服務。</p></div></div></section>

    <section class="nexus-about__closing" aria-labelledby="about-closing-title" data-about-section><div class="nexus-about__container" data-about-reveal><p class="nexus-about__eyebrow">08 / 開始探索</p><h2 id="about-closing-title">找到適合你的<br><em>下一件裝備。</em></h2><p>從細節出發，探索不同的遊戲與桌面配置。</p><div class="nexus-about__actions"><a class="btn btn-primary" href="/products" @click.prevent="emit('navigate', '/products')">探索所有商品 <span aria-hidden="true">↗</span></a><a class="nexus-about__text-link" href="/" @click.prevent="emit('navigate', '/')">瀏覽精選系列 <span aria-hidden="true">↗</span></a></div></div></section>
  </main>
</template>
