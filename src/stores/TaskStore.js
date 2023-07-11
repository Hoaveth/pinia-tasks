import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    isLoading: false,
  }),
  getters: {
    //create a getter function titled favs to return all tasks with isFav property set to true, using 'this' object
    favs() {
      return this.tasks.filter((task) => task.isFav);
    },
    //create a getter function to count all the favorites
    favCount() {
      return this.favs.length;
    },
    totalCount() {
      return this.tasks.length;
    },
  },
  actions: {
    async getTasks() {
      this.isLoading = true;
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();
      this.tasks = data;
      this.isLoading = false;
    },
    async addTask(task) {
      const taskObj = { id: this.tasks.length + 1, title: task, isFav: false };
      this.tasks.push(taskObj);

      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(taskObj),
        headers: { "Content-Type": "application/json" },
      });

      if (response.error) {
        console.log(response.error);
      }
    },
    async deleteTask(task) {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);

      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "DELETE",
      });

      if (response.error) {
        console.log(response.error);
      }
    },
    async favTask(task) {
      const filteredTask = this.tasks.find((t) => t.id === task.id);
      filteredTask.isFav = !filteredTask.isFav;

      const response = await fetch(
        `http://localhost:3000/tasks/${filteredTask.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ isFav: filteredTask.isFav }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.error) {
        console.log(response.error);
      }
    },
  },
});
