<template>
  <main>
    <!--heading-->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia-logo" class="src" />
      <h1>{{ taskStore.name }}</h1>
    </header>

    <div class="new-task-form">
      <TaskForm />
    </div>

    <!--filter-->
    <nav class="filter">
      <p>Filter</p>
      <button @click="filter = 'all'">All</button>
      <button @click="filter = 'favs'">Favorites</button>
    </nav>

    <div class="loading" v-if="isLoading">Loading tasks...</div>

    <!--task list-->
    <div class="task-list" v-if="filter === 'all'">
      <p>All Tasks ({{ totalCount }})</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <!--task list-->
    <div class="task-list" v-if="filter === 'favs'">
      <p>Favorite Tasks ({{ favCount }} / {{ totalCount }})</p>
      <div v-for="task in favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <button @click="taskStore.$reset">Reset Tasks</button>
  </main>
</template>

<script setup>
import TaskDetails from "@/components/Tasks/TaskDetails.vue";
import TaskForm from "@/components/Tasks/TaskForm.vue";
import { useTaskStore } from "@/stores/TaskStore";
import { ref } from "vue";
import { storeToRefs } from "pinia";

const taskStore = useTaskStore();

const { tasks, isLoading, favs, totalCount, favCount } = storeToRefs(taskStore);

taskStore.getTasks();
const filter = ref("all");
</script>
