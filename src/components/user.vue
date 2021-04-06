<template>
  <div>
     <headerConduit/>
     <tags/>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import tags from "./tags";
import tag from "./tag"
import page from "./page"
import headerConduit from './headerConduit'
export default {
  components: {
    tags,
    headerConduit,
    tag
    
  },
  methods: {
    ...mapActions(["loadTags", "loadFeed","loadLists"]),
  },
  created() {
    this.loadTags();
    //this.loadFeed();
    this.loadLists();
  },
  computed: {
    ...mapState([ "tags", "feed","list"]),
  },
};
</script>

<style>
</style>