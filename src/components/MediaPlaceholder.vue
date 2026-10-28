<script setup>
import { computed, ref, useSlots, watch } from 'vue'

const props = defineProps({
  mediaId: { type: String, required: true },
  label: { type: String, required: true },
  intendedType: { type: String, default: 'image', validator: (value) => ['image', 'video', 'either'].includes(value) },
  aspectRatio: { type: String, default: '16 / 9' },
  mobileAspectRatio: { type: String, default: '4 / 5' },
  variant: { type: String, default: 'default' },
  priority: { type: String, default: 'standard' },
  showMeta: { type: Boolean, default: true },
  fit: { type: String, default: 'cover', validator: (value) => ['cover', 'contain'].includes(value) },
  mobileFit: { type: String, default: 'cover', validator: (value) => ['cover', 'contain'].includes(value) },
  src: { type: String, default: '' },
  mobileSrc: { type: String, default: '' },
  alt: { type: String, default: '' },
  width: { type: Number, default: undefined },
  height: { type: Number, default: undefined },
  loading: { type: String, default: 'lazy' },
  fetchPriority: { type: String, default: 'low' },
})

const slots = useSlots()
const imageFailed = ref(false)
watch(() => props.src, () => { imageFailed.value = false })
const mediaStyle = computed(() => ({ '--media-ratio': props.aspectRatio, '--media-mobile-ratio': props.mobileAspectRatio, '--media-fit': props.fit, '--media-mobile-fit': props.mobileFit }))
</script>

<template>
  <div class="media-placeholder" :class="`media-placeholder--${variant}`" :style="mediaStyle" :data-media-id="mediaId">
    <div class="media-placeholder__motion-layer">
      <slot v-if="slots.media" name="media" />
      <picture v-else-if="src && mobileSrc && !imageFailed"><source media="(max-width: 580px)" :srcset="mobileSrc" type="image/webp" /><img :src="src" :alt="alt" :width="width" :height="height" :loading="loading" :fetchpriority="fetchPriority" decoding="async" @error="imageFailed = true" /></picture>
      <img v-else-if="src && !imageFailed" :src="src" :alt="alt" :width="width" :height="height" :loading="loading" :fetchpriority="fetchPriority" decoding="async" @error="imageFailed = true" />
      <div v-else class="media-placeholder__inner" aria-hidden="true">
        <div v-if="variant === 'hero' || variant === 'coverflow'" class="media-placeholder__hero-art"><span class="media-placeholder__hero-halo"></span><span class="media-placeholder__hero-shadow"></span><span class="media-placeholder__hero-device"></span></div>
        <span v-if="variant !== 'hero' && variant !== 'coverflow'" class="media-placeholder__axis"></span>
        <template v-if="showMeta">
          <div class="media-placeholder__top"><span>NEXUS / 媒體預覽</span><span>{{ priority }}</span></div>
          <div class="media-placeholder__center"><span class="media-placeholder__glyph">{{ intendedType === 'video' ? '▶' : intendedType === 'either' ? '◇' : '▧' }}</span><strong>{{ label }}</strong><small>{{ intendedType }} / {{ aspectRatio }}</small></div>
          <div class="media-placeholder__bottom"><span>{{ mediaId }}</span><span>素材待製作 ↗</span></div>
        </template>
      </div>
    </div>
  </div>
</template>
