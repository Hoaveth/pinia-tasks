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

    <!--task list-->
    <div class="task-list" v-if="filter === 'all'">
      <p>All Tasks ({{ taskStore.totalCount }})</p>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <!--task list-->
    <div class="task-list" v-if="filter === 'favs'">
      <p>
        Favorite Tasks ({{ taskStore.favCount }} / {{ taskStore.totalCount }})
      </p>
      <div v-for="task in taskStore.favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script setup>
import TaskDetails from "@/components/Tasks/TaskDetails.vue";
import TaskForm from "@/components/Tasks/TaskForm.vue";
import { useTaskStore } from "@/stores/TaskStore";
import { ref } from "vue";

const taskStore = useTaskStore();
const filter = ref("all");
</script>
