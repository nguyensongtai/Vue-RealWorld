<template>
  <div>
    <div>
      <ul>
        <li class="todo" v-for="(todo, index) in listRender" :key="index">
          <div>
            <input
              type="checkbox"
              @click="changeStatus(todo)"
              v-model="todo.completed"
              v-if="todo.completed"
              checked
            />
            <input
              type="checkbox"
              @click="changeStatus(todo)"
              v-model="todo.completed"
              v-else
            />
            <span
              contenteditable="true"
              v-on:keydown.enter="updateTask($event, todo)"
              v-on:blur="updateTask($event, todo)"
              :class="{ completed: todo.completed }"
              >{{ todo.title }}</span
            >
            <!-- <label>{{ todo.completed }}</label> -->
            <button @click="deleteTodo(index)">X</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
     
    };
  },

  methods: {
    ...mapActions(["deleteTodo"]),
    ...mapActions(["changeStatus"]),
    ...mapActions(["updateTask"]),
  },
  computed: {
    ...mapState(["todos"]),
    ...mapGetters(["getTodos", "listRender"]),
  },
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>