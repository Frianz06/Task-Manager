<script setup lang="ts">
import { ref } from 'vue'

// make a reactive variable
const description = ref('')
</script>

<template>
  <div class="min-h-screen bg-gray-950">
    <div class="w-full max-w-2xl mx-auto mt-10 bg-gray-900 text-gray-200 rounded-2xl shadow-lg border border-gray-800 p-6 space-y-5">
      
      <!-- Title -->
      <input 
        type="text" 
        placeholder="Task Title"
        class="w-full bg-gray-800/50 rounded-lg px-4 py-3 text-lg font-semibold text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <!-- Description -->
      <textarea 
        v-model="description"
        placeholder="Write a description..."
        rows="4"
        class="w-full bg-gray-800/50 rounded-lg px-4 py-3 resize-none text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      ></textarea>

      <!-- Bottom actions -->
      <div class="flex items-center justify-between pt-2">
        <button class="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" 
               fill="none" 
               viewBox="0 0 24 24" 
               stroke-width="1.5" 
               stroke="currentColor" 
               class="w-4 h-4">
            <path stroke-linecap="round" 
                  stroke-linejoin="round" 
                  d="M18.364 5.636l-7.071 7.071a4 4 0 01-5.657-5.657l7.071-7.071a4 4 0 115.657 5.657z" />
            <path stroke-linecap="round" 
                  stroke-linejoin="round" 
                  d="M13.121 6.879l4.95 4.95" />
          </svg>
          Attach a file
        </button>

        <button class="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white text-sm font-medium px-6 py-2.5 rounded-lg shadow-md">
          Create
        </button>
      </div>
    </div>

    <!-- ✅ Task List Section -->
    <div class="w-full max-w-2xl mx-auto mt-6 space-y-3">
      <!-- Example task card -->
      <div class="bg-gray-900 text-gray-200 rounded-xl border border-gray-800 p-4 shadow-md">
        <h3 class="text-base font-semibold">✅ Example Task Title</h3>
        <!-- show ref value here -->
        <p class="text-sm text-gray-400">{{ description }}</p>
      </div>
    </div>
  </div>
</template>



<style scoped></style>
