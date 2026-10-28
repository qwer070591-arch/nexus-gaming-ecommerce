<script setup>
import { reactive, ref } from 'vue'
const props = defineProps({ mode: { type: String, default: 'login' } })
const emit = defineEmits(['navigate', 'notice'])
const form = reactive({ name: '', email: '', password: '', confirm: '', terms: false, remember: false })
const error = ref('')
function submit() {
  error.value = ''
  if (props.mode === 'register' && form.password !== form.confirm) { error.value = '兩次輸入的密碼不一致。'; return }
  if (props.mode === 'register' && !form.terms) { error.value = '請先同意展示條款。'; return }
  emit('notice', props.mode === 'login' ? '歡迎回來。此為展示登入，不會建立真實登入工作階段。' : '已開啟展示會員頁；未建立真實帳號。')
  emit('navigate', '/account')
}
</script>

<template>
  <main class="auth-page"><section class="auth-aside"><a class="brand light-brand" href="/" @click.prevent="emit('navigate', '/')"><span class="brand-mark">N</span><span>NEXUS<span class="accent">//</span></span></a><div><p class="eyebrow">為下一場遊戲做好準備</p><h1>你的桌面，<br><em>從這裡開始。</em></h1><p>從細節出發，探索適合你的電競裝備。</p></div><div class="auth-quote"><span>★★★★★</span><p>「讓每個細節，都更貼近自己的桌面。」</p><small>— NEXUS 展示社群</small></div></section><section class="auth-form-wrap"><div class="auth-form"><p class="eyebrow">{{ mode === 'login' ? '歡迎回來' : '加入展示社群' }}</p><h1>{{ mode === 'login' ? '登入 NEXUS 展示頁' : '建立展示帳號頁面' }}</h1><p class="auth-switch">{{ mode === 'login' ? '第一次來嗎？' : '已經看過展示登入？' }} <a href="#" @click.prevent="emit('navigate', mode === 'login' ? '/register' : '/login')">{{ mode === 'login' ? '查看註冊展示' : '前往登入展示' }}</a></p><form @submit.prevent="submit"><label v-if="mode === 'register'">姓名（請使用虛構資料）<input v-model.trim="form.name" required autocomplete="name" placeholder="展示使用者" /></label><label>電子郵件（請使用虛構資料）<input v-model.trim="form.email" required type="email" autocomplete="email" placeholder="you@example.com" /></label><label>密碼（請勿使用真實密碼）<input v-model="form.password" required minlength="6" type="password" autocomplete="current-password" placeholder="至少 6 個字元" /></label><label v-if="mode === 'register'">確認密碼<input v-model="form.confirm" required type="password" autocomplete="new-password" placeholder="再次輸入展示密碼" /></label><div class="auth-options" :class="{ register: mode === 'register' }"><label v-if="mode === 'register'" class="check-label">
  <input v-model="form.terms" required type="checkbox" />
  <span>我了解此為展示頁，資料不會建立真實帳號</span>
</label>
<label v-else class="check-label">
  <input v-model="form.remember" type="checkbox" />
  <span>記住我（展示）</span>
</label><a v-if="mode === 'login'" href="#" @click.prevent="emit('notice', '此純前端展示不提供密碼重設。')">忘記密碼？</a></div><p v-if="error" class="form-error" role="alert">{{ error }}</p><button class="btn btn-primary full">{{ mode === 'login' ? '進入展示會員頁' : '查看展示會員頁' }} <span>→</span></button></form><div class="demo-note"><b>◌</b> 此為純前端展示。請勿輸入真實個資或密碼；不會建立帳號或付款。</div></div></section></main>
</template>
