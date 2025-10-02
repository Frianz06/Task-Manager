<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { loginUser } from '@/services/auth'
import { setupCSRF } from '@/services/csrf' // ✅ Import from csrf.js

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)

// Setup CSRF when component mounts
onMounted(async () => {
  try {
    await setupCSRF();
  } catch (error) {
    console.warn('CSRF setup failed:', error)
  }
})

const handleLogin = async () => {
  if (!email.value || !password.value) {
    toast.error('Please fill in all fields', { autoClose: 2000 })
    return
  }

  isLoading.value = true
  try {
    const response = await loginUser({
      email: email.value,
      password: password.value
    })

    toast.success('🎉 Login successful!', { autoClose: 1000 })
    
    setTimeout(() => {
      router.push('/task-manager')
    }, 1000)

  } catch (error) {
    console.error('Login error:', error)
    
    if (error.response?.status === 419) {
      toast.error('Session expired. Please refresh the page and try again.', { 
        autoClose: 3000 
      })
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message, { autoClose: 2000 })
    } else if (error.response?.data?.errors) {
      const errors = error.response.data.errors
      const firstError = Object.values(errors)[0][0]
      toast.error(firstError, { autoClose: 2000 })
    } else {
      toast.error("Login failed. Please check your credentials and try again.", {
        autoClose: 2000,
      })
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
    <div class="w-full max-w-md p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-white mb-2">Welcome Back</h2>
        <p class="text-gray-300 text-sm">Sign in to your account</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <input 
            v-model="email" 
            type="email" 
            placeholder="Email Address" 
            required
            class="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          >
        </div>

        <div>
          <input 
            v-model="password" 
            type="password" 
            placeholder="Password" 
            required
            class="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          >
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <span v-if="!isLoading" class="flex items-center justify-center">
            <span>Sign In</span>
          </span>
          <span v-else class="flex items-center justify-center">
            <div class="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-5 w-5 mr-2"></div>
            Signing In...
          </span>
        </button>

        <p class="text-center text-gray-400 text-sm pt-4">
          Don't have an account?
          <router-link 
            to="/register" 
            class="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200 ml-1"
          >
            Create account
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>
