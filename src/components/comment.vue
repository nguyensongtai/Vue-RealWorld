<template>
  <div>
    <headerConduit />
    <div >
      <div class="banner">
        <div class="container">
          <h1>{{ title}}</h1>
          <div class="article-meta">
            <a class="" href="#@hoannt17">
              <img :src="image" />
            </a>
            <div class="info">
              <a class="author" href="#@hoannt17">{{username }}</a
              ><span class="date">{{ Date(createdAt) }}</span>
            </div>
            <div>
               <span v-show="author"
              ><a
                class="btn btn-outline-secondary btn-sm"
                :href="`/conduit/user/newpost2/${this.slug}`"
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
      </div>
      <div class="container page">
        <div class="row article-content">
          <div class="col-xs-12">
            <div>
              <p>{{ body }}</p>
            </div>
            <ul class="tag-list"></ul>
          </div>
        </div>
        <hr />
        <div class="article-actions"></div>
        <div class="row" v-if="!isLoggedIn">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <p>
              <a class="" href="/conduit/signin">Sign in</a
              ><!-- react-text: 4200 -->&nbsp;or&nbsp;<!-- /react-text --><a
                class=""
                href="/conduit/signup"
                >sign up</a
              ><!-- react-text: 4202 -->&nbsp;to add comments on this article.<!-- /react-text -->
            </p>
          </div>
        </div>
        <div class="row" v-if="isLoggedIn">
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
                  <img   class="comment-author-img" /><button
                    class="btn btn-sm btn-primary"
                    type="button"
                    @click="postComment"
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
                <a class="comment-author" href="#@admin1881">
                  <img :src="`${user.image}`" class="comment-author-img" />
                </a>
                <!-- react-text: 236 -->&nbsp;<!-- /react-text -->
                <a
                  class="comment-author"
                  href="#@admin1881"
                  >{{ user.username }}
                  </a>
                  <span class="mod-options">
                    <i class="ion-trash-a"></i>
                  </span>
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
import headerConduit from "./headerConduit";
import footerConduit from "./footerConduit";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: {
    headerConduit,
    footerConduit,
  },
  data() {
    return {
     
      slug: "",
      user: {
        image: "",
        username: "",
        createdAt: "",
      },
      contentComment: "",
      listComment: [],
      isAuthor: true,
      usernameUser:"",
      usernameAdmin:""
      
    };
  },
  async created() {
    this.slug = this.$route.params.slug;
   // this.article = await this.getArticleBySlug();
    console.log(this.user)
    // this.user = await this.getUser();
    // console.log(this.loadCmts, "slug");
    // this.listComment = await this.getListComment();
    this.loadCmts(this.$route.params.slug);
    this.listComment = await this.getListComment();
    this.user = await this.getUser();
    console.log(this.usernameAdmin,"admin")
    console.log(this.cmts.article.author.username,"cmts")
    this.usernameUser = this.cmts.article.author.username

  },

  methods: {
    ...mapActions(["loadCmts", "deleteArticle"]),
    async DeleteArticle() {
        const token =  this.user.token;
        const headers = {
            authorization: ` Token ${token}`,
        };
     try {
       await Axios({
          method: "DELETE",
          headers: headers,
          url: `https://conduit.productionready.io/api/articles/${this.slug}`,
        });    
        this.$router.push("/conduit/user/yourfeed")
        console.log("aa")  
     } catch(error){

     }
  },
    async getArticleBySlug() {
      let data = await Axios.get(
        `https://conduit.productionready.io/api/articles/${this.slug}`
      );
       this.name = localStorage.setItem("username", name)
        this.name = data.data.article.author.username
      console.log(this.name, "11user");
      return data;
    },
   
    async getListComment() {
      let comments = await Axios.get(
        `https://conduit.productionready.io/api/articles/${this.slug}/comments`
      );
    // console.log(comments, "Tai1 ");
      return comments.data.comments;
    },
    async postComment() {
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
      //  console.log(this.listComment, "fadsfadsfsdfafdafdasffsdfsf");
      } catch (error) {
        // if (error.response.status > 400) {
        //   console.log(error);
        // }
      }
    },
    async getUser() {
      let data = await Axios.get("https://conduit.productionready.io/api/user");
      this.usernameAdmin = localStorage.getItem("username")
      return data.data.user;
    },
     
  },
  computed: {
    ...mapState(["cmts"]),
    title(){
    return this.cmts.article && this.cmts.article.title
    },
    image(){
        return this.cmts.article.author && this.cmts.article.author.image
    },
    username(){
        return this.cmts.article.author && this.cmts.article.author.username
    },
    createdAt(){
        return this.cmts.article && this.cmts.article.createdAt
    },
    body(){
        return this.cmts.article && this.cmts.article.body
    },
  
    ...mapGetters(["isLoggedIn", "authStatus", "deleteAri"]),

    author(){
      if(this.usernameUser === this.usernameAdmin)
      return this.isAuthor = true
      else
      return this.isAuthor = false
    }
  },
};
</script>

<style>
</style>

