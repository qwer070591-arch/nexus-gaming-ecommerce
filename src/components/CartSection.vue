<script setup>
defineProps({
  cart: {
    type: Array,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update-quantity', 'remove-from-cart', 'checkout', 'close'])

</script>

<template>
  <div class="cart-drawer-overlay" :class="{ 'is-open': isOpen }" @click.self="$emit('close')">

    <div class="cart-section">
      <div class="cart-header">
        <h2>購物車</h2>
        <button class="btn-close-drawer" @click="$emit('close')">✕</button>
      </div>

      <div v-if="cart.length === 0" class="empty-cart">
        購物車目前是空的
      </div>

      <ul v-else class="cart-list">
        <li v-for="item in cart" :key="item.id" class="cart-item">
          <span class="item-name">{{ item.name }}</span>
          
          <div class="item-actions">
            <button @click="$emit('update-quantity', item.id, item.quantity - 1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="$emit('update-quantity', item.id, item.quantity + 1)">+</button>

            <button @click="$emit('remove-from-cart', item.id)" class="btn-delete">✕</button>
          </div>
        </li>
      </ul>

      <div class="cart-total">
        <h3>總金額：NT$ {{ totalPrice }}</h3>
        <button @click="$emit('checkout')" class="btn-checkout" :disabled="cart.length === 0">前往結帳</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.cart-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(44, 37, 35, 0.5);
  z-index: 9999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}


.cart-drawer-overlay.is-open {
  opacity: 1;
  pointer-events: auto;
}

.cart-section {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100%;
  background: var(--bg-main, #FAF7F2);
  padding: 24px;
  box-shadow: -8px 0 30px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
}

.cart-drawer-overlay.is-open .cart-section {
  transform: translateX(0);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color, #E8DFD8);
}

.cart-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--brand-color, #B87D7B);
  letter-spacing: 0.5px;
}

.btn-close-drawer {
  background: transparent;
  border: none;
  font-size: 18px;
  color: var(--text-sub);
  cursor: pointer;
}

.btn-close-drawer:hover {
  background: rgba(184, 125, 123, 0.1);
  color: var(--brand-color, #B87D7B);
}

.empty-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #A39391;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.6;
}

.cart-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  margin-top: 16px;
}

.cart-list {
  list-style: none; 
  padding: 0;
  margin: 0;
  overflow-y: auto;
  flex: 1;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border-color, #E8DFD8);
  position: relative;
}

.item-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  background: #FFF;
  border: 1px solid var(--border-color, #E8DFD8);
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main, #4A3E3D);
  padding-right: 20px;
}

.item-price {
  font-size: 13px;
  color: var(--brand-color, #B87D7B);
  font-weight: 500;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
}

.btn-qty {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid var(--border-color, #E8DFD8);
  background: #FFFFFF;
  color: var(--text-main, #4A3E3D);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.2s;
}

.btn-qty:hover {
  background: var(--brand-color, #B87D7B);
  color: #FFF;
  border-color: var(--brand-color, #B87D7B);
}

.qty-num {
  font-size: 13px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.btn-delete {
  background: transparent;
  border: none;
  color: #C2B3B0;
  cursor: pointer;
  font-size: 16px;
  padding: 4px 8px;
  transition: color 0.2s;
  position: absolute;
  top: 12px;
  right: 0;
}

.btn-delete:hover {
  color: var(--accent-cta, #D98880);
}

.cart-footer {
  padding-top: 16px;
  border-top: 2px solid var(--border-color, #E8DFD8);
  margin-top: 12px;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 15px;
  color: var(--text-main, #4A3E3D);
}

.total-amount {
  font-size: 20px;
  font-weight: 700;
  color: var(--brand-color, #B87D7B);
}

.btn-checkout {
  width: 100%;
  padding: 14px;
  background: var(--brand-color, #B87D7B);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(184, 125, 123, 0.25);
  transition: all 0.2s ease;
}

.btn-checkout:hover:not(:disabled) {
  background: var(--accent-cta, #C26B66);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(184, 125, 123, 0.35);
}

.btn-checkout:disabled {
  background: #D8D0C9;
  cursor: not-allowed;
  box-shadow: none;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-actions button:not(.btn-delete) {
  width: 26px;
  height: 26px;
  padding: 0;
  border: 1px solid var(--border-color, #E8DFD8);
  background: #FFFFFF;
  color: var(--text-main, #4A3E3D);
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
}

.item-actions button:not(.btn-delete):hover {
  background: var(--brand-color, #B87D7B);
  color: #FFFFFF;
  border-color: var(--brand-color, #B87D7B);
}

.item-actions span {
  font-size: 14px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}
</style>