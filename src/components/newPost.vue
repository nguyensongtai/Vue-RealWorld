<template>
  <div>
    <headerConduit />
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <!-- react-empty: 789 -->
            <form>
              <fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Article Title"
                    v-model="title"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="What's this article about?"
                    v-model="description"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    v-model="body"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter tags"
                    v-model="tagList"
                  />
                  <div class="tag-list"></div>
                </fieldset>
                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  @click.prevent="publicArticle"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
    <footerConduit />
  </div>
</template>

<script>
import Axios from "axios";
import { mapActions, mapState } from "vuex";
import footerConduit from "./footerConduit";
import headerConduit from "./headerConduit";
export default {
  data() {
    return {
      body: "",
      description: "",
      tagList: "",
      title: "",
      slug: "",
      createdAt: "",
    };
  },
  components: {
    footerConduit,
    headerConduit,
  },
  created() {
    //this.loadCmts(this.slug);
  },
  mounted() {
    // if (localStorage.getItem("slug")) {
    //   try {
    //     this.slug = JSON.parse(localStorage.getItem("slug"));
    //     this.body = JSON.parse(localStorage.getItem("body"));
    //     this.description = JSON.parse(localStorage.getItem("description"));
    //     this.tagList = JSON.parse(localStorage.getItem("tagList"));
    //     this.title = JSON.parse(localStorage.getItem("title"));
    //     this.createdAt = JSON.parse(localStorage.getItem("createdAt"));
    //   } catch (e) {
    //     localStorage.removeItem("slug");
    //     localStorage.removeItem("body");
    //     localStorage.removeItem("description");
    //     localStorage.removeItem("tagList");
    //     localStorage.removeItem("title");
    //       localStorage.removeItem("createAt");
    //   }
    // }
  },
  methods: {
    ...mapActions(["loadCmts"]),
    async publicArticle() {
      try {
        let data = {
          article: {
            body: this.body,
            description: this.description,
            tagList: this.tagList,
            title: this.title,
          },
        };
        const datas = await Axios({
          url: "https://conduit.productionready.io/api/articles",
          data: data,
          method: "POST",
        });
        const slug = datas.data.article.slug;
        this.$router.push(`/conduit/user/commentuser/${slug}`);
        console.log(datas.data.article.slug, "dataPost");
      } catch (error) {
        console.log(error, "error");
      }
      // this.$store
      //   .dispatch("postArticles", data)

      // .then((res) => {
      //   this.slug = localStorage.getItem("slug");
      //   this.$router.push(`/conduit/user/commentuser/${this.slug}`);
      // })
      // .catch((err) => console.log(err));
    },
  },
  computed: {
    ...mapState(["postArticle", "cmts"]),
  },
  watch: {},
};
</script>

<style>
</style>