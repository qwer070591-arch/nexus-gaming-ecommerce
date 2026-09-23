<script setup>
import { reactive } from 'vue';

defineProps({
  isOpen: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close', 'submit'])
const form = reactive({
    name: '',
    phone: '',
    address: '',
})

const handleSubmit = () => {
    emit('submit', {...form })
    form.name = ''
    form.phone = ''
    form.address = ''
}
</script>

<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <h2>填寫收件訊息</h2>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>收件人姓名</label>
          <input v-model="form.name" type="text" placeholder="請輸入姓名" required />
        </div>

        <div class="form-group">
          <label>聯絡電話</label>
          <input v-model="form.phone" type="text" placeholder="請輸入電話" required />
        </div>
        
        <div class="form-group">
          <label>收件地址</label>
          <input v-model="form.address" type="text" placeholder="請輸入寄送地址" required />
        </div>

        <div class="modal-actions">
          <button type="button" @click="$emit('close')" class="btn-secondary">取消</button>
          <button type="submit" class="btn-submit">確認下單</button>
        </div>
      </form>
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
  background: rgba(44, 37, 35, 0.6); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; 
}

.modal-content {
  background: var(--bg-main);
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  color: var(--border-color);
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: var(--text-sub);
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: #FFFFFF;
  color: var(--text-main);
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: var(--accent-cta);
}

.modal-actions {
  display: flex;
  gap: 10px;
  margin-top: 25px;
}

.btn-secondary {
  flex: 1;
  background: #FFFFFF;
  border: 1px solid var(--border-color);
  color: var(--text-main);
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.btn-secondary:hover {
  background: var(--bg-sub);
}

.btn-submit {
  flex: 1;
  background: var(--accent-cta);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.btn-submit:hover {
  background: var(--accent-hover);
}
</style>