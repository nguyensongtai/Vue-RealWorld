<template>
  <div>
    <headerConduit />
    <tags />
    <footerConduit />
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
import tags from "./tags";
import headerConduit from "./headerConduit.vue";
import footerConduit from "./footerConduit.vue";

import Tags from "./tags.vue";
export default {
  props: {
    // counter: Number,
  },
  components: {
    tags,
    footerConduit,
    headerConduit,
  },
  data() {
    return {
      //loadArr: [],
    };
  },
  methods: {
    // increase() {
    //     this.$emit("increase");
    // },
    // ...mapActions(["set_load"]),
  },

  created() {
    // this.loadAPI();
    this.loadTags();
    // this.loadLists();
    // this.loadPages();
  },
  mounted() {},
  methods: {
    ...mapActions(["loadAPI", "loadTags", "loadLists", "loadPages"]),
  },
  computed: {
    ...mapState(["load", "tags", "lists", "pages"]),
  },
};
</script>