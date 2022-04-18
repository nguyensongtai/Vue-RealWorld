<template>
  <div>
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="isLoggedIn">
                <a href="/conduit/user/yourfeed" class="nav-link">Your Feed</a>
              </li>
              <li class="nav-item">
                <a href="/conduit/user" class="nav-link active">Global Feed</a>
              </li>
            </ul>
          </div>
          <div>
            <articleConduit
              v-for="(value, index) in lists"
              :key="index"
              :art="value"
            />
            <yourFeed
              v-for="(value, index) in feed"
              :key="index"
              :feed="value"
            />
            <nav>
              <ul class="pagination">
                <page
                  v-for="(val, index) in totalPage"
                  :key="index"
                  :pagess="val"
                  @pageChanged="onPageChange"
                ></page>
                <!-- <page v-for="(value, index) in pages" :key="index"
                :pagess="value"
                 @pageChanged="onPageChange"
              >
              </page> -->
              </ul>
            </nav>
          </div>
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
    </div>
  </div>
</template>

<script>
import yourFeed from "./yourFeed";
import tag from "./tag";
import articleConduit from "./articleConduit";
import comments from "./comment";
import { mapActions, mapState, mapGetters } from "vuex";
import page from "./page";
import Axios from "axios";
import Comment from "./comment.vue";
import Page from "./page.vue";

export default {
  components: {
    tag,
    articleConduit,
    page,
    comments,
    yourFeed,
  },

  data() {
    return {};
  },

  methods: {
    ...mapActions(["loadPages"]),
    ...mapActions(["loadCmts"]),
    ...mapActions(["loadLists"]),
    ...mapActions(["loadFeed"]),

    onPageChange() {
      console.log("apii");
    },
  },

  mounted() {
    this.loadLists();
  },
  computed: {
    ...mapState([
      "tags",
      "lists",
      "pages",
      "cmts",
      "page",
      "perPage",
      "feed",
      "articlesCount",
    ]),

    ...mapGetters(["isLoggedIn"]),
    totalPage() {
      return Array.from(
        { length: this.articlesCount / 10 },
        (_, indexx) => indexx + 1
      );
    },
  },
};
</script>


<style>
  .article-preview {
    text-align: left;
  }
</style>



  
