<script setup>
const props = defineProps({ modelValue: { type: Number, default: 1 }, min: { type: Number, default: 1 } })
const emit = defineEmits(['update:modelValue'])
function set(value) { emit('update:modelValue', Math.max(props.min, value)) }
</script>
<template><div class="quantity-selector" aria-label="Quantity selector"><button type="button" aria-label="Decrease quantity" @click="set(modelValue - 1)">−</button><output>{{ modelValue }}</output><button type="button" aria-label="Increase quantity" @click="set(modelValue + 1)">+</button></div></template>
