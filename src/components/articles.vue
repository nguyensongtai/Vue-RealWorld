<template>
  <div>
    <div class="article-preview">
      <div class="article-meta">
        <article v-for="(value, index) in lists" :key="index" :art="value" />
      </div>
    </div>
  </div>
</template>

<script>
import article from "./article";
import { mapState } from "vuex";

export default {
  components: {
    article,
  },
  computed: {
    ...mapState(["lists"]),
  },
};
</script>

<style>
</style>