<script setup>
import { onBeforeUnmount, ref } from 'vue'

defineProps({
  active: { type: Boolean, default: false },
})

const emit = defineEmits(['toggle'])
const isPulsing = ref(false)
let pulseTimer

function toggle(event) {
  event.stopPropagation()
  isPulsing.value = false
  clearTimeout(pulseTimer)
  pulseTimer = setTimeout(() => {
    isPulsing.value = true
    pulseTimer = setTimeout(() => { isPulsing.value = false }, 240)
  }, 0)
  emit('toggle')
}

onBeforeUnmount(() => clearTimeout(pulseTimer))
</script>

<template>
  <button
    type="button"
    class="wishlist-btn"
    :class="{ active, pulse: isPulsing }"
    :aria-label="active ? '從收藏移除' : '加入收藏'"
    :aria-pressed="active"
    @click="toggle"
  >
    <svg viewBox="0 0 24 24" :fill="active ? 'currentColor' : 'none'" aria-hidden="true"><path d="M20.5 8.6c0 4.8-8.5 10.5-8.5 10.5S3.5 13.4 3.5 8.6a4.4 4.4 0 0 1 8.5-1.5 4.4 4.4 0 0 1 8.5 1.5Z"/></svg>
    <span class="sr-only">{{ active ? '已收藏' : '尚未收藏' }}</span>
  </button>
</template>
