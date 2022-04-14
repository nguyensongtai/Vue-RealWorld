<template>
  <div>
    <headerConduit />
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>{{ article.title }}</h1>
          <div class="article-meta">
            <a class="" href="#@admin1881"><img :src="user.image" /></a>
            <div class="info">
              <a class="author" href="#@admin1881">{{ user.username }}</a
              ><span class="date">{{ Date(user.createdAt) }}</span>
            </div>
            <span
              ><a
                class="btn btn-outline-secondary btn-sm"
                :href="`/conduit/user/newpost/${this.slug}`"
                ><i class="ion-edit"></i
                ><!-- react-text: 165 -->
                Edit Article<!-- /react-text --></a
              ><button
                class="btn btn-outline-danger btn-sm"
                @click="DeleteArticle"
              >
                <i class="ion-trash-a"></i
                ><!-- react-text: 168 -->
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
                  <img :src="user.image" class="comment-author-img" />
                  <button
                    class="btn btn-sm btn-primary"
                    type="submit"
                    @click.prevent="postComment()"
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
import footerConduit from "./footerConduit";
import headerConduit from "./headerConduit";
import { mapActions, mapState } from "vuex";
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
      },
      user: {
        image: "",
        username: "",
        createdAt: "",
      },
      contentComment: "",
      listComment: [],
      id: "",
    };
  },
  async created() {
    this.slug = this.$route.params.slug;
    //console.log(this.$route, "ss");
    this.article = await this.getArticleBySlug();
    this.listComment = await this.getListComment();

    this.user = await this.getUser();

    //  this.loadSlug();
    //  this.commentUser();
    //  this.loadUser();
  },
  mounted() {
    // if (localStorage.getItem("slug")) {
    //   try {
    //     this.slug = JSON.parse(localStorage.getItem("slug"));
    //     this.body = JSON.parse(localStorage.getItem("body"));
    //     this.description = JSON.parse(localStorage.getItem("description"));
    //     this.tagList = JSON.parse(localStorage.getItem("tagList"));
    //     this.title = JSON.parse(localStorage.getItem("title"));
    //   } catch (e) {
    //     localStorage.removeItem("slug");
    //     localStorage.removeItem("body");
    //     localStorage.removeItem("description");
    //     localStorage.removeItem("tagList");
    //     localStorage.removeItem("title");
    //   }
    // }
  },
  methods: {
    ...mapActions([
      "loadSlug",
      "commentUser",
      "loadHeaderAuthor",
      "loadUser",
      "deleteArticle",
    ]),
    async DeleteArticle() {
      const token = localStorage.getItem("token");
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
    async getArticleBySlug() {
      let data = await Axios.get(
        `https://conduit.productionready.io/api/articles/${this.slug}`
      );
      console.log(data, "data ");
      return data.data.article;
    },
    async getListComment() {
      let comments = await Axios.get(
        `https://conduit.productionready.io/api/articles/${this.slug}/comments`
      );
      this.id = comments.data.comments[0].id;
      return comments.data.comments;
    },
    async getUser() {
      let data = await Axios.get("https://conduit.productionready.io/api/user");
      return data.data.user;
    },
    async postComment() {
      const token = localStorage.getItem("token");
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
    ...mapState(["slugs", "commentSlug", "deleteAri", "profile", "users"]),
    image() {
      return this.profile.profile && this.profile.profile.image;
    },
    username() {
      return this.profile.profile && this.profile.profile.username;
    },
  },
};
</script>

<style>
</style>