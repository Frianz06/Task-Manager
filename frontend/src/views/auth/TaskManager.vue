<script setup>
import { ref, onMounted } from 'vue';
import api from '../../services/api.js';

const tasks = ref([]);
const newTask = ref({ title: '', description: '', due_date: '' });
const showForm = ref(false);
const dropdownOpen = ref(false);
const loading = ref(false); // <-- NEW

// Fetch tasks with loading
const fetchTasks = async () => {
  loading.value = true; // start loading
  try {
    const response = await api.get('/tasks');
    tasks.value = response.data;
  } catch (err) {
    console.error('Failed to fetch tasks:', err);
  } finally {
    loading.value = false; // stop loading
  }
};

const createTask = async () => {
  try {
    const response = await api.post('/tasks', newTask.value);
    tasks.value.push(response.data);
    newTask.value = { title: '', description: '', due_date: '' };
    showForm.value = false;
  } catch (err) {
    console.error('Failed to create task:', err);
  }
};

const deleteTask = async (taskId) => {
  try {
    await api.delete(`/tasks/${taskId}`);
    tasks.value = tasks.value.filter(task => task.id !== taskId);
  } catch (err) {
    console.error('Failed to delete task:', err);
  }
};

const updateStatus = async (task, status) => {
  try {
    const response = await api.put(`/tasks/${task.id}`, { ...task, status });
    const index = tasks.value.findIndex(t => t.id === task.id);
    tasks.value[index] = response.data;
  } catch (err) {
    console.error('Failed to update status:', err);
  }
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

onMounted(fetchTasks);
</script>


<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <!-- HEADER / PROFILE -->
    <header class="flex justify-between items-center p-6 bg-gray-800">
      <h1 class="text-2xl font-bold">Task Manager</h1>
      <div class="relative">
        <button @click="toggleDropdown" class="flex items-center space-x-2">
          <img src="@/assets/profile-placeholder.png" alt="Profile" class="w-8 h-8 rounded-full"/>
          <svg :class="{'rotate-180': dropdownOpen}" class="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-700 rounded shadow-lg z-10">
          <router-link to="/login" class="block px-4 py-2 text-sm text-white hover:bg-gray-700 rounded">
            Logout
          </router-link>
        </div>
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="flex-1 p-8 bg-gray-900">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-semibold">Dashboard</h2>
        <button @click="showForm = !showForm" class="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded font-medium">
          + New Task
        </button>
      </div>

      <!-- NEW TASK FORM -->
      <div v-if="showForm" class="mb-6 bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800 w-full">
        <input v-model="newTask.title" type="text" placeholder="Task Title" class="w-full bg-gray-800/50 rounded-lg px-4 py-3 text-lg font-semibold text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"/>
        <textarea v-model="newTask.description" placeholder="Write a description..." rows="4" class="w-full bg-gray-800/50 rounded-lg px-4 py-3 resize-none text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"></textarea>
        <input v-model="newTask.due_date" type="date" class="w-full bg-gray-800/50 rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"/>
        <div class="flex justify-end space-x-2">
          <button @click="showForm = false" class="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 font-medium">Cancel</button>
          <button @click="createTask" class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-medium">Save Task</button>
        </div>
      </div>

      <!-- TASK LIST -->
      <section>
        <h3 class="text-xl font-medium mb-4">Your Tasks</h3>

        <!-- Loading indicator -->
        <div v-if="loading" class="text-gray-400">Loading tasks...</div>

        <div v-else class="space-y-4">
          <div v-for="task in tasks" :key="task.id" class="flex items-center justify-between bg-gray-800 px-4 py-3 rounded-lg hover:bg-gray-700 transition">
            <div>
              <h4 class="font-medium">{{ task.title }}</h4>
              <p class="text-sm text-gray-400">Due: {{ task.due_date }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <select v-model="task.status" @change="updateStatus(task, task.status)" class="bg-gray-700 text-white px-2 py-1 rounded">
                <option>Not Started</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <button @click="deleteTask(task.id)" class="bg-red-600 hover:bg-red-500 px-2 py-1 rounded text-xs">Delete</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

