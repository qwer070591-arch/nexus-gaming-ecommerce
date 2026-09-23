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
    :aria-label="active ? 'Remove from wishlist' : 'Add to wishlist'"
    :aria-pressed="active"
    @click="toggle"
  >
    <span aria-hidden="true">{{ active ? '♥' : '♡' }}</span>
    <span class="sr-only">{{ active ? 'Saved to wishlist' : 'Not saved to wishlist' }}</span>
  </button>
</template>
