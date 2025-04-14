<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-8">
    <div class="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
      <h1 class="text-2xl font-bold text-center mb-6">📋 My Todo List</h1>

      <!-- Add/Edit Task -->
      <div class="flex gap-2 mb-4">
        <input
          v-model="taskInput"
          placeholder="Add or edit task"
          @keyup.enter="isEditing ? updateTask() : addTask()"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          @click="isEditing ? updateTask() : addTask()"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          {{ isEditing ? 'Update' : 'Add' }}
        </button>
      </div>

      <!-- Task List with Animations -->
      <transition-group name="fade" tag="ul" class="space-y-3 max-h-[300px] overflow-y-auto">
        <li
          v-for="(task, index) in tasks"
          :key="task.id"
          class="flex justify-between items-center bg-gray-50 p-3 rounded-lg border"
        >
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              :checked="task.completed"
              @change="toggleTask(index)"
              class="accent-blue-600 h-5 w-5"
            />
            <span :class="{ 'line-through text-gray-400': task.completed }" class="text-gray-800">
              {{ task.text }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <button @click="editTask(index)" class="text-yellow-500 hover:text-yellow-600 text-sm">
              Edit
            </button>
            <button @click="deleteTask(index)" class="text-red-500 hover:text-red-600 text-sm">
              Delete
            </button>
          </div>
        </li>
      </transition-group>

      <p v-if="tasks.length === 0" class="text-center text-gray-400 mt-6">No tasks yet 💤</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const taskInput = ref('')
const isEditing = ref(false)
const editIndex = ref<number | null>(null)

const store = useTaskStore()

// 🔥 Make sure it's reactive
const tasks = computed(() => store.tasks)

onMounted(() => {
  store.loadTasks()
})

const addTask = () => {
  if (taskInput.value.trim() !== '') {
    store.addTask(taskInput.value)
    taskInput.value = ''
  }
}

const deleteTask = (index: number) => {
  store.deleteTask(index)
}

const toggleTask = (index: number) => {
  store.toggleTask(index)
}

const editTask = (index: number) => {
  taskInput.value = store.tasks[index].text
  isEditing.value = true
  editIndex.value = index
}

const updateTask = () => {
  if (taskInput.value.trim() !== '' && editIndex.value !== null) {
    store.updateTask(editIndex.value, taskInput.value)
    taskInput.value = ''
    isEditing.value = false
    editIndex.value = null
  }
}
</script>

<style>
/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
