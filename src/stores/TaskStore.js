import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [
      //generate task objects with id, title and isFav properties
      { id: 1, title: "Task 1", isFav: false },
      { id: 2, title: "Task 2", isFav: true },
      { id: 3, title: "Task 3", isFav: false },
    ],
    name: "Yoshi",
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
    addTask(task) {
      this.tasks.push({ id: this.tasks.length + 1, title: task, isFav: false });
    },
    deleteTask(task) {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    },
    favTask(task) {
      const filteredTask = this.tasks.find((t) => t.id === task.id);
      filteredTask.isFav = !filteredTask.isFav;
    },
  },
});
