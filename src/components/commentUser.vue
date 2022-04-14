<template>
  <div>
    <headerConduit />
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>{{ article.title }}</h1>

          <div class="article-meta">
            <a class="" href="#@tainguyen10"><img :src="`${user.image}`" /></a>
            <div class="info">
              <a class="author" href="#@tainguyen10">{{ user.username }}</a>
              <span class="date">{{ user.createdAt }}</span>
            </div>
            <span
              ><a
                class="btn btn-outline-secondary btn-sm"
                :href="`/conduit/user/newpost/${this.slug}`"
                ><i class="ion-edit"></i
                ><!-- react-text: 182 -->
                Edit Article<!-- /react-text --></a
              ><button
                class="btn btn-outline-danger btn-sm"
                @click="DeleteArticle"
              >
                <i class="ion-trash-a"></i
                ><!-- react-text: 185 -->
                Delete Article<!-- /react-text -->
              </button></span
            >
          </div>
        </div>
      </div>
      <div class="container page">
        <div class="row article-content">
          <div class="col-xs-12">
            <div>
              <p>{{ article.body }}</p>
            </div>
            <ul class="tag-list"></ul>
          </div>
        </div>
        <hr />
        <div class="article-actions"></div>
        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <div>
              <!-- <list-errors></list-errors> -->
              <form class="card comment-form">
                <div class="card-block">
                  <textarea
                    class="form-control"
                    placeholder="Write a comment..."
                    rows="3"
                    v-model="contentComment"
                  ></textarea>
                </div>
                <div class="card-footer">
                  <img :src="`${user.image}`" class="comment-author-img" />
                  <button
                    class="btn btn-sm btn-primary"
                    type="button"
                    @click="postComment()"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
            <div class="card" v-for="(item, index) in listComment" :key="index">
              <div class="card-block">
                <p class="card-text">{{ item.body }}</p>
              </div>
              <div class="card-footer">
                <a class="comment-author" href="#@admin1881"
                  ><img :src="user.image" class="comment-author-img" /></a
                ><!-- react-text: 236 -->&nbsp;<!-- /react-text --><a
                  class="comment-author"
                  href="#@admin1881"
                  >{{ user.username }}</a
                ><span class="date-posted">{{ user.createdAt }}</span
                ><span class="mod-options"
                  ><i class="ion-trash-a" @click.prevent="deleteComment"></i
                ></span>
              </div>
            </div>
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
  async created() {
    this.slug = this.$route.params.slug;
    this.article = await this.getArticleBySlug();
    this.user = await this.getUser();
    this.listComment = await this.getListComment();
  },
  data() {
    return {
      slug: "",
      article: {
        title: "",
        body: "",
      },
      user: {
        image: "",
        username: "",
        createdAt: "",
      },
      contentComment: "",
      listComment: [],
    };
  },
  mounted() {
    // this.loadSlug(this.slug),
    // this.commentUser(this.slug);
    // console.log(this.slug,"s")
  },

  methods: {
    ...mapActions([
      "loadSlug",
      "commentUser",
      "loadUser",
      "loadHeaderAuthor",
      "loadCmts",
    ]),
    async getArticleBySlug() {
      let data = await Axios.get(
        `https://conduit.productionready.io/api/articles/${this.slug}`
      );
      // console.log(data.data.article);
      return data.data.article;
    },
    async getUser() {
      let data = await Axios.get("https://conduit.productionready.io/api/user");
      return data.data.user;
    },
    async getListComment() {
      let comments = await Axios.get(
        `https://conduit.productionready.io/api/articles/${this.slug}/comments`
      );
      this.id = comments.data.comments[0].id;
      return comments.data.comments;
    },
    async postComment() {
      console.log("action");
      const token = this.user.token;
      const headers = {
        authorization: ` Token ${token}`,
      };
      try {
        let data = {
          comment: {
            body: this.contentComment,
          },
        };
        await Axios({
          method: "POST",
          headers: headers,
          url: `https://conduit.productionready.io/api/articles/${this.slug}/comments`,
          data: data,
        });
        // if (response.status >= 200 && response.status <= 300) {
        // }
        this.listComment = await this.getListComment();
        console.log(this.listComment, "fadsfadsfsdfafdafdasffsdfsf");
      } catch (error) {
        // if (error.response.status > 400) {
        //   console.log(error);
        // }
      }
    },
    ...mapActions(["deleteArticle"]),
    async DeleteArticle() {
      const token = this.user.token;
      const headers = {
        authorization: ` Token ${token}`,
      };
      try {
        await Axios({
          method: "DELETE",
          headers: headers,
          url: `https://conduit.productionready.io/api/articles/${this.slug}`,
        });
        this.$router.push("/conduit/user/yourfeed");
        console.log("aa");
      } catch (error) {}
    },
    async deleteComment() {
      console.log("delete");
      const token = localStorage.getItem("token");

      const headers = {
        authorization: `Token ${token}`,
      };
      try {
        let data = {
          comment: {
            body: this.contentComment,
          },
        };

        await Axios({
          method: "DELETE",
          headers: headers,
          url: `https://conduit.productionready.io/api/articles/${this.slug}/comments/${this.id}`,
          data: data,
        });
        this.listComment = await this.getListComment();
        console.log(this.listComment, "delete");
      } catch {}
    },
  },
  computed: {
    ...mapState(["slugs", "commentSlug", "deleteAri", "cmts", "profile"]),
    Profile() {
      return this.profile.profile;
    },
  },
};
</script>

<style>
</style>