<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
    product: {
        type: Object,
        default: null
    }
})
const emit = defineEmits(['close', 'add-to-cart'])

const selectedQuantity = ref(1)

watch(() => props.isOpen, (newVal)=> {
    if (newVal) {
        selectedQuantity.value = 1
    }
})

const handleAddToCart = () => {
    if (!props.product) return
    emit('add-to-cart', props.product, selectedQuantity.value)
    emit('close')
}
</script>

<template>
    <div v-if="isOpen && product" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-content">
            <button class="btn-close" @click="$emit('close')">✕</button>
            
            <div class="modal-body">
                <div class="detail-image-wrapper">
                    <img :src="product.image" :alt="product.name" class="detail-image"/>
                </div>
            </div>
            
            <div class="detail-info">
                <h2>{{ product.name }}</h2>
                <p class="detail-price">NT$ {{ product.price }}</p>
                <p class="detail-desc">
                    {{ product.description || '精心挑選極簡高質感設計，完美融入您的日常辦公與生活空間'}}
                </p>

                <div class="quantity-selector">
                    <label>選擇數量:</label>
                    <div class="quantity-controls">
                        <button @click="selectedQuantity > 1 && selectedQuantity--">-</button>
                        <span>{{ selectedQuantity }}</span>
                        <button @click="selectedQuantity++">+</button>
                    </div>
                </div>
                <button class="btn-add-detail" @click="handleAddToCart">加入購物車 (NT$ {{ product.price * selectedQuantity }})</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgb(44, 37, 35, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9998;
}

.modal-content {
    background: var(--bg-main);
    border-radius: 16px;
    width: 90%;
    max-width: 600px;
    padding: 30px;
    position: relative;
    border: 1px solid var(--border-color);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.btn-close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: transparent;
    border: none;
    font-size: 18px;
    color: var(--text-sub);
    cursor: pointer;
}

.modal-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
    align-items: center;
}

.detail-image-wrapper {
    width: 100%;
    height: 220px;
    background: var(--bg-sub);
    border-radius: 12px;
    overflow: hidden;
}

.detail-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.detail-info h2 {
    font-size: 20px;
    color: var(--text-main);
    margin: 0 0 8px 0;
}

.detail-price {
    font-size: 18px;
    color: var(--border-color);
    font-weight: bold;
    margin-bottom: 12px;
}

.detail-desc {
  font-size: 13px;
  color: var(--text-sub);
  line-height: 1.5;
  margin-bottom: 20px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  font-size: 14px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-controls button {
  background: #fff;
  border: 1px solid var(--border-color);
  width: 28px;
  height: 28px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-add-detail {
  width: 100%;
  background: var(--accent-cta);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-add-detail:hover {
  background: var(--accent-hover);
}
</style>