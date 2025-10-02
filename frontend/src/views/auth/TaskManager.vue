<script setup>
import { ref, onMounted } from 'vue';
import api from '../../services/api.js';

// reactive variables
const tasks = ref([]);
const newTask = ref({ title: '', description: '', due_date: '' });
const showForm = ref(false);

// fetch tasks from backend
const fetchTasks = async () => {
  try {
    const response = await api.get('/tasks');
    tasks.value = response.data;
  } catch (err) {
    console.error('Failed to fetch tasks:', err);
  }
};

// create new task
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

// delete task
const deleteTask = async (taskId) => {
  try {
    await api.delete(`/tasks/${taskId}`);
    tasks.value = tasks.value.filter(task => task.id !== taskId);
  } catch (err) {
    console.error('Failed to delete task:', err);
  }
};

// change status
const updateStatus = async (task, status) => {
  try {
    const response = await api.put(`/tasks/${task.id}`, { 
      ...task,
      status
    });
    const index = tasks.value.findIndex(t => t.id === task.id);
    tasks.value[index] = response.data;
  } catch (err) {
    console.error('Failed to update status:', err);
  }
};

// fetch tasks on mount
onMounted(fetchTasks);
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white flex">

    <!-- SIDEBAR -->
    <aside class="w-64 bg-gray-800 p-6 flex flex-col">
      <h1 class="text-2xl font-bold mb-8">TaskManager</h1>
      <nav class="space-y-4">
        <a href="#" class="block py-2 px-3 rounded hover:bg-gray-700">Dashboard</a>
        <a href="#" class="block py-2 px-3 rounded hover:bg-gray-700">My Tasks</a>
        <a href="#" class="block py-2 px-3 rounded hover:bg-gray-700">Completed</a>
        <a href="#" class="block py-2 px-3 rounded hover:bg-gray-700">Settings</a>
      </nav>
      <div class="mt-auto">
        <router-link to="/login"
          class="block mt-8 py-2 px-3 rounded bg-indigo-600 hover:bg-indigo-500 text-center font-medium">
          Logout
        </router-link>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="flex-1 p-8 bg-gray-900">
      <!-- HEADER -->
      <header class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-semibold">Dashboard</h2>
        <button @click="showForm = !showForm" class="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded font-medium">
          + New Task
        </button>
      </header>

    <!-- NEW TASK FORM -->
    <div v-if="showForm" class="mb-6 bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800 w-full">
      <!-- Title -->
      <input 
        v-model="newTask.title"
        type="text" 
        placeholder="Task Title"
        class="w-full bg-gray-800/50 rounded-lg px-4 py-3 text-lg font-semibold text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
      />

      <!-- Description -->
      <textarea 
        v-model="newTask.description"
        placeholder="Write a description..."
        rows="4"
        class="w-full bg-gray-800/50 rounded-lg px-4 py-3 resize-none text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
      ></textarea>

      <!-- Due Date -->
      <input 
        v-model="newTask.due_date"
        type="date"
        class="w-full bg-gray-800/50 rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
      />

      <!-- Buttons -->
      <div class="flex justify-end space-x-2">
        <button @click="showForm = false" class="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 font-medium">Cancel</button>
        <button @click="createTask" class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-medium">Save Task</button>
      </div>
    </div>



      <!-- TASK LIST -->
      <section>
        <h3 class="text-xl font-medium mb-4">Your Tasks</h3>
        <div class="space-y-4">
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
