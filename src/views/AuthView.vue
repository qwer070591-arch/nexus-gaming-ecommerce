<script setup>
import { reactive, ref } from 'vue'
const props = defineProps({ mode: { type: String, default: 'login' } })
const emit = defineEmits(['navigate', 'notice'])
const form = reactive({ name: '', email: '', password: '', confirm: '', terms: false, remember: false })
const error = ref('')
function submit() {
  error.value = ''
  if (props.mode === 'register' && form.password !== form.confirm) { error.value = 'Passwords do not match.'; return }
  if (props.mode === 'register' && !form.terms) { error.value = 'Please accept the terms to continue.'; return }
  emit('notice', props.mode === 'login' ? 'Welcome back — this portfolio uses a demo sign-in.' : 'Account created in demo mode — welcome to Nexus.')
  emit('navigate', '/account')
}
</script>

<template>
  <main class="auth-page"><section class="auth-aside"><a class="brand light-brand" href="/" @click.prevent="emit('navigate', '/')"><span class="brand-mark">N</span><span>NEXUS<span class="accent">//</span></span></a><div><p class="eyebrow">Designed for the game ahead</p><h1>Your setup<br><em>starts here.</em></h1><p>Premium performance gear from people who care about the details.</p></div><div class="auth-quote"><span>★★★★★</span><p>“The kinds of details that make a desk feel like your own.”</p><small>— NEXUS COMMUNITY</small></div></section><section class="auth-form-wrap"><div class="auth-form"><p class="eyebrow">{{ mode === 'login' ? 'Welcome back' : 'Join the community' }}</p><h1>{{ mode === 'login' ? 'Sign in to Nexus' : 'Create your account' }}</h1><p class="auth-switch">{{ mode === 'login' ? 'New to Nexus?' : 'Already have an account?' }} <a href="#" @click.prevent="emit('navigate', mode === 'login' ? '/register' : '/login')">{{ mode === 'login' ? 'Create an account' : 'Sign in' }}</a></p><form @submit.prevent="submit"><label v-if="mode === 'register'">Full name<input v-model.trim="form.name" required autocomplete="name" placeholder="Jamie Chen" /></label><label>Email address<input v-model.trim="form.email" required type="email" autocomplete="email" placeholder="you@example.com" /></label><label>Password<input v-model="form.password" required minlength="6" type="password" autocomplete="current-password" placeholder="At least 6 characters" /></label><label v-if="mode === 'register'">Confirm password<input v-model="form.confirm" required type="password" autocomplete="new-password" placeholder="Repeat your password" /></label><div class="auth-options" :class="{ register: mode === 'register' }"><label v-if="mode === 'register'" class="check-label">
  <input v-model="form.terms" required type="checkbox" />
  <span>I agree to the terms and privacy policy</span>
</label>
<label v-else class="check-label">
  <input v-model="form.remember" type="checkbox" />
  <span>Remember me</span>
</label><a v-if="mode === 'login'" href="#" @click.prevent="emit('notice', 'Password reset is not available in this frontend demo.')">Forgot password?</a></div><p v-if="error" class="form-error" role="alert">{{ error }}</p><button class="btn btn-primary full">{{ mode === 'login' ? 'Sign in' : 'Create account' }} <span>→</span></button></form><div class="demo-note"><b>◌</b> This is a frontend-only demo. No account details are stored.</div></div></section></main>
</template>
