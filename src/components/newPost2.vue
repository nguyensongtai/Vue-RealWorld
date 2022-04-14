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
                    v-model="article.title"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="What's this article about?"
                    v-model="article.description"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    v-model="article.body"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter tags"
                    v-model="article.tagList"
                  />
                  <div class="tag-list"></div>
                </fieldset>
                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  @click.prevent="putArticleBySlug"
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
  components: {
    footerConduit,
    headerConduit,
  },
  data() {
    return {
      slug: "",
      article: {
        title: "",
        body: "",
        description: "",
        tagList: "",
      },
    };
  },
  async created() {
    this.slug = this.$route.params.slug;
    this.article = await this.getArticleBySlug();
  },
  methods: {
    async getArticleBySlug() {
      let data = await Axios.get(
        `https://conduit.productionready.io/api/articles/${this.slug}`
      );
      console.log(data, "data ");
      return data.data.article;
    },
    async putArticleBySlug() {
      try {
        let data = {
          article: this.article,
        };
        const datas = await Axios({
          url: `https://conduit.productionready.io/api/articles/${this.slug}`,
          data: data,
          method: "PUT",
        });
        const slug = datas.data.article.slug;
        this.$router.push(`/conduit/user/commentuser/${slug}`);
        console.log(datas.data.article.slug, "dataPost");
      } catch (error) {
        console.log(error, "error");
      }
    },
  },
};
</script>

<style>
</style>