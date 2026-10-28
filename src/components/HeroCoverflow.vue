<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import useEmblaCarousel from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'
import gsap from 'gsap'
import MediaPlaceholder from './MediaPlaceholder.vue'
import { categoryLabel } from '@/utils/locale'

const emit = defineEmits(['navigate'])
const slides = [
  { title: '精準', category: 'Mice', line: '每次移動，都能準確回應你的想法。', mediaId: 'HOME_COVERFLOW_PRECISION', mediaSrc: '/media/home/coverflow-precision-desktop.webp', mobileSrc: '/media/home/coverflow-precision-mobile.webp', mediaAlt: '黑色電競滑鼠置於深色桌面，後方有萊姆綠光線。', mediaWidth: 1672, mediaHeight: 941, ambient: 'rgba(68, 101, 94, .28)', visualStart: '47%', copySafe: '48%' },
  { title: '掌控', category: 'Keyboards', line: '每一次按下，都有恰到好處的手感。', mediaId: 'HOME_COVERFLOW_CONTROL', mediaSrc: '/media/home/coverflow-control.webp', mobileSrc: '/media/home/coverflow-control-mobile.webp', mediaAlt: '黑色機械鍵盤置於深色桌面，周圍有萊姆綠光線。', mediaWidth: 1672, mediaHeight: 941, ambient: 'rgba(72, 91, 83, .27)', visualStart: '42%', copySafe: '47%' },
  { title: '沉浸', category: 'Headsets', line: '聽見關鍵細節，專注每一場對戰。', mediaId: 'HOME_COVERFLOW_IMMERSION', mediaSrc: '/media/home/coverflow-immersion-desktop.webp', mobileSrc: '/media/home/coverflow-immersion-mobile.webp', mediaAlt: '黑色電競耳機與麥克風置於低飽和紫黑色桌面。', mediaWidth: 1672, mediaHeight: 941, ambient: 'rgba(65, 82, 105, .29)', visualStart: '48%', copySafe: '47%' },
  { title: '基石', category: 'Mouse Pads', line: '穩定的桌面基礎，讓操作更從容。', mediaId: 'HOME_COVERFLOW_FOUNDATION', mediaSrc: '/media/home/coverflow-foundation-desktop.webp', mobileSrc: '/media/home/coverflow-foundation-mobile.webp', mediaAlt: '大型黑色電競桌墊鋪於桌面，可看見表面紋理與萊姆色邊緣。', mediaWidth: 1672, mediaHeight: 941, ambient: 'rgba(89, 84, 68, .26)', visualStart: '46%', copySafe: '47%' },
]
const autoplay = Autoplay({ delay: 6000, playOnInit: false, stopOnInteraction: false, stopOnMouseEnter: false, stopOnFocusIn: false })
const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center', containScroll: false, loop: true, startIndex: 1, dragFree: false, watchFocus: false, breakpoints: { '(prefers-reduced-motion: reduce)': { duration: 0 } } }, [autoplay])
const root = ref(null)
const stage = ref(null)
const cursor = ref(null)
const selected = ref(1)
const failedMedia = ref(new Set())
const canPrev = ref(true)
const canNext = ref(true)
const cursorVisible = ref(false)
const cursorDirection = ref('下一張')
const wantsAutoplay = ref(true)
const autoplayRunning = ref(false)
const carouselVisible = ref(false)
let context
let revealTween
let revealRevision = 0
let quickX
let quickY
let pointerStart
let dragged = false
let suppressUntil = 0
let mediaLayers = []
let snapPositions = []
let stageRect
let pointerPosition
let observer
let motionPreference
let hovering = false
let focused = false
let pointerHeld = false

function sideOf(index) {
  const difference = index - selected.value
  return difference === slides.length - 1 ? -1 : difference === 1 - slides.length ? 1 : difference
}
function reconcileAutoplay(reset = false) {
  const shouldPlay = wantsAutoplay.value && carouselVisible.value && !document.hidden && !hovering && !focused && !pointerHeld
  if (!shouldPlay) { autoplay.stop(); autoplayRunning.value = false; return }
  if (autoplay.isPlaying()) { if (reset) autoplay.reset() }
  else autoplay.play()
  autoplayRunning.value = autoplay.isPlaying()
}
function toggleAutoplay() { wantsAutoplay.value = !wantsAutoplay.value; reconcileAutoplay(true) }
function onMouseEnter() { hovering = true; reconcileAutoplay() }
function onMouseLeave() { hovering = false; reconcileAutoplay(true) }
function onFocusIn(event) { focused = event.target.matches(':focus-visible'); reconcileAutoplay() }
function onFocusOut(event) { if (!root.value?.contains(event.relatedTarget)) { focused = false; reconcileAutoplay(true) } }
function onVisibilityChange() { reconcileAutoplay(true) }
function onMotionChange(event) { if (event.matches) wantsAutoplay.value = false; reconcileAutoplay() }

function hideCursor() {
  if (!cursorVisible.value) return
  cursorVisible.value = false
  if (cursor.value) gsap.to(cursor.value, { scale: .72, duration: .2, ease: 'power2.out', overwrite: 'auto' })
}
function sync(api) {
  selected.value = api.selectedScrollSnap()
  canPrev.value = api.canScrollPrev()
  canNext.value = api.canScrollNext()
  refreshCursor()
  const focusedSlide = document.activeElement?.closest?.('.coverflow-slide')
  if (focusedSlide && root.value?.contains(focusedSlide) && Number(focusedSlide.dataset.slideIndex) !== selected.value) {
    nextTick(() => {
      const target = root.value?.querySelector('.coverflow-slide.is-active .coverflow-card__media[tabindex="0"]')
        || root.value?.querySelector('.coverflow-viewport')
      target?.focus({ preventScroll: true })
    })
  }
}
function parallax(api) {
  if (!root.value || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const progress = api.scrollProgress()
  mediaLayers.forEach((layer, index) => {
    // Embla transforms the track; only its decorative media child moves here.
    gsap.set(layer, { x: Math.max(-17, Math.min(17, (snapPositions[index] - progress) * 22)) })
  })
}
watch(emblaApi, (api, _old, cleanup) => {
  if (!api) return
  const refresh = () => {
    mediaLayers = [...root.value.querySelectorAll('.coverflow-slide .media-placeholder__motion-layer')]
    snapPositions = api.scrollSnapList()
  }
  const update = () => { sync(api); parallax(api) }
  const move = () => parallax(api)
  const reinit = () => { refresh(); update() }
  const settled = () => refreshCursor()
  api.on('select', update).on('reInit', reinit).on('scroll', move).on('settle', settled)
  refresh()
  update()
  reconcileAutoplay()
  cleanup(() => { api.off('select', update); api.off('reInit', reinit); api.off('scroll', move); api.off('settle', settled); mediaLayers = []; snapPositions = [] })
}, { immediate: true })
watch(selected, async () => {
  const revision = ++revealRevision
  revealTween?.kill()
  if (!root.value) return
  const allCopy = root.value.querySelectorAll('.coverflow-card h2, .coverflow-card__description, .coverflow-card__cta')
  gsap.set(allCopy, { clearProps: 'transform,opacity' })
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  await nextTick()
  if (!root.value || revision !== revealRevision) return
  const items = root.value.querySelectorAll('.coverflow-slide.is-active .coverflow-card h2, .coverflow-slide.is-active .coverflow-card__description, .coverflow-slide.is-active .coverflow-card__cta')
  revealTween = gsap.fromTo(items, { y: 12, opacity: .78 }, { y: 0, opacity: 1, duration: .43, stagger: .065, ease: 'power2.out', overwrite: true, clearProps: 'transform,opacity' })
})

function prev() { if (canPrev.value) { emblaApi.value?.scrollPrev(); reconcileAutoplay(true) } }
function next() { if (canNext.value) { emblaApi.value?.scrollNext(); reconcileAutoplay(true) } }
function go(index) { emblaApi.value?.scrollTo(index); reconcileAutoplay(true) }
function suppressed() { return dragged || performance.now() < suppressUntil }
function pointerDown(event) {
  if (event.pointerType === 'mouse' && event.button !== 0) return
  pointerHeld = true
  reconcileAutoplay()
  pointerStart = { x: event.clientX, y: event.clientY }
  dragged = false
}
function pointerMove(event) {
  if (!pointerStart) return
  const dx = Math.abs(event.clientX - pointerStart.x)
  const dy = Math.abs(event.clientY - pointerStart.y)
  if (dx > 9 && dx > dy * .8) { dragged = true; hideCursor() }
}
function pointerUp() {
  if (dragged) suppressUntil = performance.now() + 420
  pointerStart = undefined
  dragged = false
  pointerHeld = false
  reconcileAutoplay(true)
}
function slideClick(index, event) {
  if (suppressed()) { event.preventDefault(); return }
  if (index !== selected.value) go(index)
}
function mediaClick(index, event) {
  if (suppressed()) { event.preventDefault(); return }
  if (index !== selected.value) go(index)
}
function collection(slide, event) {
  if (suppressed()) { event.preventDefault(); return }
  emit('navigate', `/products?category=${encodeURIComponent(slide.category)}`)
}
function cursorMove(event, index) {
  if (event.pointerType !== 'mouse' || !quickX || !quickY) return
  pointerPosition = { x: event.clientX, y: event.clientY }
  if (index === selected.value || dragged) { hideCursor(); return }
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const box = stageRect || (stageRect = stage.value.getBoundingClientRect())
  const card = root.value.querySelector(`.coverflow-slide[data-slide-index="${index}"] .coverflow-card`).getBoundingClientRect()
  const viewport = root.value.querySelector('.coverflow-viewport').getBoundingClientRect()
  const halfWidth = cursor.value.offsetWidth / 2
  const halfHeight = cursor.value.offsetHeight / 2
  const left = Math.max(card.left, viewport.left) + halfWidth + 8
  const right = Math.min(card.right, viewport.right) - halfWidth - 8
  const x = Math.min(Math.max(event.clientX, Math.min(left, right)), Math.max(left, right)) - box.left
  const y = Math.min(Math.max(event.clientY, card.top + halfHeight + 8), card.bottom - halfHeight - 8) - box.top
  cursorDirection.value = sideOf(index) < 0 ? '上一張' : '下一張'
  if (!cursorVisible.value) {
    gsap.set(cursor.value, { x, y })
    gsap.to(cursor.value, { scale: 1, duration: .22, ease: 'power2.out', overwrite: 'auto' })
  }
  else { quickX(x); quickY(y) }
  cursorVisible.value = true
}
function cursorEnter(event, index) {
  stageRect = stage.value.getBoundingClientRect()
  cursorMove(event, index)
}
function cursorLeave() { pointerPosition = undefined; stageRect = undefined; hideCursor() }
function refreshCursor() {
  if (!pointerPosition || !root.value) { hideCursor(); return }
  const slide = document.elementFromPoint(pointerPosition.x, pointerPosition.y)?.closest('.coverflow-slide')
  if (!slide || !root.value.contains(slide)) { hideCursor(); return }
  stageRect = stage.value.getBoundingClientRect()
  cursorMove({ clientX: pointerPosition.x, clientY: pointerPosition.y, pointerType: 'mouse' }, Number(slide.dataset.slideIndex))
}
function invalidateStageRect() { stageRect = undefined }

onMounted(() => {
  motionPreference = matchMedia('(prefers-reduced-motion: reduce)')
  wantsAutoplay.value = !motionPreference.matches
  motionPreference.addEventListener('change', onMotionChange)
  document.addEventListener('visibilitychange', onVisibilityChange)
  observer = new IntersectionObserver(([entry]) => { carouselVisible.value = entry.isIntersecting && entry.intersectionRatio >= .25; reconcileAutoplay(true) }, { threshold: [.25] })
  observer.observe(root.value)
  window.addEventListener('scroll', invalidateStageRect, { passive: true })
  window.addEventListener('resize', invalidateStageRect)
  context = gsap.context(() => {
    const motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const header = document.querySelector('.app-shell--home .site-header .header-shell')
      if (header) gsap.from(header, { y: -8, opacity: .8, duration: .45, ease: 'power2.out', clearProps: 'transform,opacity' })
      gsap.from(root.value.querySelector('.coverflow-intro'), { y: 16, opacity: .7, duration: .6, delay: .08, ease: 'power2.out', clearProps: 'transform,opacity' })
    })
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      gsap.set(cursor.value, { xPercent: -50, yPercent: -50, scale: .72 })
      quickX = gsap.quickTo(cursor.value, 'x', { duration: .25, ease: 'power3.out' })
      quickY = gsap.quickTo(cursor.value, 'y', { duration: .25, ease: 'power3.out' })
    }
    return () => motion.revert()
  }, root.value)
})
onUnmounted(() => {
  observer?.disconnect()
  motionPreference?.removeEventListener('change', onMotionChange)
  document.removeEventListener('visibilitychange', onVisibilityChange)
  autoplay.stop()
  window.removeEventListener('scroll', invalidateStageRect)
  window.removeEventListener('resize', invalidateStageRect)
  revealRevision++
  revealTween?.kill()
  pointerPosition = undefined
  if (cursor.value) gsap.killTweensOf(cursor.value)
  context?.revert()
})
</script>

<template>
  <section ref="root" class="nexus-home-hero nexus-coverflow" aria-labelledby="home-title" aria-roledescription="輪播" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @focusin="onFocusIn" @focusout="onFocusOut">
    <div v-for="(slide, index) in slides" :key="`${slide.mediaId}-ambient`" class="coverflow-ambient" :class="{ 'is-active': selected === index }" :style="{ '--ambient': slide.ambient }" aria-hidden="true"></div>
    <div class="coverflow-intro">
      <div><p class="nexus-overline"><span class="nexus-overline__dot"></span> NEXUS / 精選系列</p><h1 id="home-title">為每個<br><em>關鍵時刻。</em></h1><p>精選電競裝備，陪你找到自己的節奏。</p></div>
      <a class="coverflow-shop-all" href="/products" @click.prevent="emit('navigate', '/products')">瀏覽所有商品 <span aria-hidden="true">&rarr;</span></a>
    </div>
    <div ref="stage" class="coverflow-stage">
      <div ref="emblaRef" class="coverflow-viewport" role="group" aria-label="NEXUS 精選系列。使用左右方向鍵切換。" tabindex="0" @keydown.left.prevent="prev" @keydown.right.prevent="next" @pointerdown.capture="pointerDown" @pointermove.capture="pointerMove" @pointerup.capture="pointerUp" @pointercancel.capture="pointerUp">
        <div class="coverflow-track">
          <article v-for="(slide, index) in slides" :key="slide.mediaId" class="coverflow-slide" :class="{ 'is-active': selected === index, 'is-before': sideOf(index) < 0, 'is-after': sideOf(index) > 0 }" :data-slide-index="index" :role="selected === index ? 'group' : 'button'" :aria-roledescription="selected === index ? '投影片' : undefined" :aria-label="selected === index ? `第 ${index + 1} 張，共 ${slides.length} 張：${slide.title}` : `顯示${slide.title}系列`" :aria-hidden="Math.abs(sideOf(index)) > 1 ? true : undefined" :tabindex="Math.abs(sideOf(index)) === 1 ? 0 : -1" @keydown.enter.stop.prevent="index !== selected && go(index)" @keydown.space.stop.prevent="index !== selected && go(index)" @pointerenter="cursorEnter($event, index)" @pointermove="cursorMove($event, index)" @pointerleave="cursorLeave" @click="slideClick(index, $event)">
            <div class="coverflow-card" :style="{ '--visual-start': slide.visualStart, '--copy-safe': slide.copySafe }">
              <div class="coverflow-card__media" @click.stop="mediaClick(index, $event)">
                <MediaPlaceholder v-if="slide.mediaSrc && !failedMedia.has(slide.mediaId)" :media-id="slide.mediaId" :label="`${slide.title}系列媒體`" intended-type="image" aspect-ratio="16 / 9" mobile-aspect-ratio="4 / 5" variant="coverflow" :show-meta="false" fit="cover" mobile-fit="cover">
                  <template #media><picture><source media="(max-width: 580px)" :srcset="slide.mobileSrc" type="image/webp" /><img :src="slide.mediaSrc" :alt="slide.mediaAlt" :width="slide.mediaWidth" :height="slide.mediaHeight" :loading="index === 1 ? 'eager' : 'lazy'" :fetchpriority="index === 1 ? 'high' : 'low'" decoding="async" @error="failedMedia.add(slide.mediaId)" /></picture></template>
                </MediaPlaceholder>
                <MediaPlaceholder v-else :media-id="slide.mediaId" :label="`${slide.title}系列媒體預留區`" intended-type="either" aspect-ratio="16 / 9" mobile-aspect-ratio="4 / 5" variant="coverflow" :show-meta="false" fit="cover" mobile-fit="cover" />
              </div>
              <div class="coverflow-card__copy"><p class="coverflow-card__eyebrow">NEXUS / 系列 0{{ index + 1 }}</p><h2>{{ slide.title }}<span>.</span></h2><p class="coverflow-card__description">{{ slide.line }}</p><a v-if="selected === index" class="coverflow-card__cta" :href="`/products?category=${encodeURIComponent(slide.category)}`" @click.stop.prevent="collection(slide, $event)">探索{{ categoryLabel(slide.category) }} <span aria-hidden="true">&rarr;</span></a><p class="coverflow-card__index" aria-hidden="true">0{{ index + 1 }} / 0{{ slides.length }}</p></div>
            </div>
          </article>
        </div>
      </div>
      <div ref="cursor" class="coverflow-cursor" :class="{ 'is-visible': cursorVisible }" aria-hidden="true">{{ cursorDirection }}</div>
    </div>
    <div class="coverflow-controls"><div class="coverflow-controls__buttons"><button type="button" aria-label="上一個系列" :disabled="!canPrev" @click="prev">&larr;</button><button type="button" aria-label="下一個系列" :disabled="!canNext" @click="next">&rarr;</button></div><p class="coverflow-controls__count">0{{ selected + 1 }} <span>/ 0{{ slides.length }}</span></p><div class="coverflow-controls__dots" role="group" aria-label="選擇系列"><button v-for="(slide, index) in slides" :key="slide.mediaId" type="button" :aria-label="`顯示${slide.title}系列`" :aria-current="selected === index ? 'true' : undefined" :class="{ 'is-active': selected === index }" @click="go(index)"></button></div><button type="button" class="coverflow-playback" :aria-label="wantsAutoplay ? '暫停自動輪播' : '播放自動輪播'" :aria-pressed="wantsAutoplay" @click="toggleAutoplay"><span aria-hidden="true">{{ wantsAutoplay ? 'Ⅱ' : '▶' }}</span><small>{{ autoplayRunning ? '播放中' : '已暫停' }}</small></button></div>
    <p class="coverflow-status sr-only" role="status" aria-live="polite">第 {{ selected + 1 }} 張，共 {{ slides.length }} 張： {{ slides[selected].title }}</p>
    <p class="nexus-demo-note">作品集展示用途 &middot; 商品與價格為示範資料 &middot; 不會產生真實訂單或付款</p>
  </section>
</template>
