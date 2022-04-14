<template>
  <div>
    <!-- <div>header</div>
      <input v-model="text" type="text">
      <button @click="sendData2222222">send</button> -->

    <header>
      <h1>TODOLIST</h1>
      <input
        v-model="newTodoText"
        type="text"
        name="text"
        id="text"
        placeholder="New Todo"
      />
      <button @click="addTask()" class="btn btn-dark">ADD</button>
      <br />
      <p><b>My Todos Tasks </b></p>
    </header>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      text: "",
      newTodoText: "",
    };
  },
  methods: {
    // ...mapActions(["sendData"]),
    // sendData2222222() {
    //     debugger
    //     // this.text;
    //     this.sendData(this.text);
    // },

    ...mapActions(["addNewTodo"]),

    addTask() {
      this.addNewTodo(this.newTodoText);
    },
  },
};
</script>

<style>
</style>