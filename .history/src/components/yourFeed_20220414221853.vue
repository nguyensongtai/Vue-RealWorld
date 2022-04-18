<template>
  <div>
    <headerConduit />
    <div class="feed-toggle">
      <ul class="nav nav-pills outline-active">
        <li class="nav-item">
          <a href="/conduit/user/yourfeed" class="nav-link active">Your Feed</a>
        </li>
        <li class="nav-item">
          <a href="/conduit/user" class="nav-link">Global Feed</a>
        </li>
      </ul>
    </div>
    <div class="row">
      <div class="col-md-9">
        <div class="article-preview">No articles are here... yet.</div>
      </div>
      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>
          <div class="tag-list">
            <tag v-for="(val, index) in tags" :key="index" :valueText="val" />
          </div>
        </div>
      </div>
    </div>
    <footerConduit />
  </div>
</template>

<script>
import tag from "./tag";
import footerConduit from "./footerConduit";
import headerConduit from "./headerConduit";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    footerConduit,
    headerConduit,
    tag,
  },
  methods: {
    ...mapActions(["loadTags"]),
  },
  computed: {
    ...mapState(["tags"]),
  },
  mounted() {
    this.loadTags();
  },
};
</script>

<style>
</style>