<script setup>
defineProps({ message: { type: String, default: '' } })
</script>
<template><Transition name="toast"><div v-if="message" class="toast-notice" role="status"><span>✓</span>{{ message }}</div></Transition></template>
