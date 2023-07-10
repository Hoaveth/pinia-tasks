<template>
  <form @submit.prevent="addTask">
    <input
      type="text"
      placeholder="Add a new task"
      v-model="taskName"
      required
    />
    <button type="submit">Add</button>
  </form>
</template>

<script setup>
import { useTaskStore } from "@/stores/TaskStore";
import { ref } from "vue";
const taskStore = useTaskStore();
const taskName = ref("");

const addTask = () => {
  if (taskName.value.trim() === "") return;
  taskStore.addTask(taskName.value);
  taskName.value = "";
};
</script>
