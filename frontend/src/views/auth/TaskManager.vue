<script setup>

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
        <button class="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded font-medium">
          + New Task
        </button>
      </header>

      <!-- TASK LIST -->
      <section>
        <h3 class="text-xl font-medium mb-4">Your Tasks</h3>
        <div class="space-y-4">
          <!-- Example Task -->
          <div class="flex items-center justify-between bg-gray-800 px-4 py-3 rounded-lg hover:bg-gray-700 transition">
            <div>
              <h4 class="font-medium">Finish Vue Task Manager UI</h4>
              <p class="text-sm text-gray-400">Due: 2025-10-05</p>
            </div>
            <span class="text-xs bg-green-600 px-2 py-1 rounded-full">In Progress</span>
          </div>

          <div class="flex items-center justify-between bg-gray-800 px-4 py-3 rounded-lg hover:bg-gray-700 transition">
            <div>
              <h4 class="font-medium">Design Login & Register Pages</h4>
              <p class="text-sm text-gray-400">Due: 2025-10-03</p>
            </div>
            <span class="text-xs bg-yellow-500 px-2 py-1 rounded-full">Pending</span>
          </div>

          <div class="flex items-center justify-between bg-gray-800 px-4 py-3 rounded-lg hover:bg-gray-700 transition">
            <div>
              <h4 class="font-medium">Deploy to Production</h4>
              <p class="text-sm text-gray-400">Due: 2025-10-10</p>
            </div>
            <span class="text-xs bg-gray-500 px-2 py-1 rounded-full">Not Started</span>
          </div>
        </div>
      </section>
    </main>

  </div>
</template>

