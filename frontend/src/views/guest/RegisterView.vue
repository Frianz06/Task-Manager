<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { registerUser } from '@/services/auth'
import { setupCSRF } from '@/services/csrf' // ✅ Import from csrf.js

const router = useRouter()
const name = ref('')
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

const handleRegister = async () => {
  isLoading.value = true
  try {
    const response = await registerUser({
      name: name.value,
      email: email.value,
      password: password.value
    })

    if (response.status === 201) {
      toast.success('✅ Account created successfully!', { autoClose: 1500 })
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    }
  } catch (error) {
    if (error.response?.data) {
      const errors = error.response.data.errors || error.response.data
      Object.keys(errors).forEach(field => {
        toast.error(errors[field][0], { autoClose: 2000 })
      })
    } else {
      toast.error('Something went wrong. Please try again later.', {
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
        <h2 class="text-3xl font-bold text-white mb-2">Create Account</h2>
        <p class="text-gray-300 text-sm">Join us today and get started</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <input 
            v-model="name" 
            type="text" 
            placeholder="Full Name" 
            required
            class="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          >
        </div>

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
            <span>Create Account</span>
          </span>
          <span v-else class="flex items-center justify-center">
            <div class="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-5 w-5 mr-2"></div>
            Creating Account...
          </span>
        </button>

        <p class="text-center text-gray-400 text-sm pt-4">
          Already have an account?
          <router-link 
            to="/login" 
            class="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200 ml-1"
          >
            Sign in
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>