import { defineStore } from 'pinia'

// Define a Task type
export interface Task {
  id: number
  text: string
  completed: boolean
}

export const useTaskStore = defineStore('taskStore', {
  state: (): { tasks: Task[] } => ({
    tasks: [],
  }),

  actions: {
    loadTasks() {
      const stored = localStorage.getItem('tasks')
      this.tasks = stored ? (JSON.parse(stored) as Task[]) : []
      this.saveTasks()
    },

    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },

    addTask(text: string) {
      const newTask: Task = {
        id: Date.now(),
        text,
        completed: false,
      }
      this.tasks.push(newTask)
      this.saveTasks()
    },

    deleteTask(index: number) {
      this.tasks.splice(index, 1)
      this.saveTasks()
    },

    updateTask(index: number, newText: string) {
      if (this.tasks[index]) {
        this.tasks[index].text = newText
        this.saveTasks()
      }
    },

    toggleTask(index: number) {
      if (this.tasks[index]) {
        this.tasks[index].completed = !this.tasks[index].completed
        this.saveTasks()
      }
    },
  },
})
