<template>
  <div>
    <!-- <div>this is footer</div>
      <div>data from header = {{getText}}</div> -->
    <div>
      <button class="btn btn-danger" @click="deleteAll(todo)">Clear All</button>
      <button class="btn btn-success" @click="removeCompleted">
        Clear Completed
      </button>
      <!-- <button class="btn btn-primary" @click="checkComplete">Complete</button> -->
      <button class="btn btn-info" @click="showAll">All</button>

      <!-- <p>{{ listRender }}</p> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  // mounted(){
  //    this.allTask = this.todos
  // },
  methods: {
    ...mapActions(["deleteAll"]),
    ...mapActions(["removeCompleted"]),
    ...mapActions(["filterData"]),
    ...mapActions(["showAll"]),
    ...mapActions(["setFilter"]),
    ...mapActions(["load"]),
    checkComplete(value) {
      this.listRender.forEach(function (todo) {
        todo.completed = value;
      });
    },
  },

  //...mapGetters(["all"]),
  // ...mapState(["text"]),
  // ...mapGetters(["getText"]),
  computed: {
    // ...mapGetters(["all"]),
    ...mapState(["currentFilter"]),
    ...mapGetters(["listRender"]),
    ...mapState(["todos"]),
  },
};
</script>

<style>
</style>