<template>
  <div>
    <headerConduit />
    <div class="profile-page">
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
             
              <img  :src="image" class="user-img" />
              <h4>{{ username }}</h4>
              <p>{{ bio }}</p>
              <a
                class="btn btn-sm btn-outline-secondary action-btn"
                href="/conduit/user/setting"
                ><i class="ion-gear-a"></i
                ><!-- react-text: 178 -->
                Edit Profile Settings<!-- /react-text --></a
              ><!-- react-empty: 179 -->
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" href="#@tai">My Articles</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :href="`/conduit/user/profile/far/${user.username}`"
                  >Favorited Articles</a>
              </li>
            </ul>
          </div>
          <div>
            <div
              class="article-preview"
              v-for="(value, index) in users"
              :key="index"
            >
              <div class="article-meta">
                <router-link class="" to="#@tai">
                  <img :src="`${value.author.image}`" />
                </router-link>
                <div class="info">
                  <router-link class="author" to="#@tai">{{
                    value.author.username
                  }}</router-link
                  ><span class="date">{{ Date(value.created) }}</span>
                </div>
                <div class="pull-xs-right">
                  <button class="btn btn-sm btn-outline-primary">
                    <i class="ion-heart">{{value.favoritesCount}}</i
                    ><!-- react-text: 224 -->
                    <!-- /react-text --><!-- react-text: 225 --><!-- /react-text -->
                  </button>
                </div>
              </div>
              <router-link
                class="preview-link"
                :to="`/conduit/user/profileCMT/${value.slug}`"
                ><h1>{{ value.title }}</h1>
                <p>{{ value.description }}</p>
                <span>Read more...{{ value.slug }}</span>
                <ul class="tag-list"></ul
              ></router-link>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
    
    <footerConduit />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import footerConduit from "./footerConduit";
import headerConduit from "./headerConduit";
import Axios from 'axios'
export default {
  components: {
    footerConduit,
    headerConduit,
  },
  data() {
    return {
      dataInfo: {},
      slug: "",
      // image: localStorage.getItem("image"),
      name: "",
      author: this.$route.params.username,
      body:"",
      tagList:"",
      title:"",
      description:"",
      user: {
        image: "",
        username: "",
        createdAt: "",
      },
    };
  },
  
   async mounted() {
     this.loadHeaderAuthor(this.author);
  //  if (localStorage.getItem("slug")) {
  //     try {
  //       this.slug = JSON.parse(localStorage.getItem("slug"));
  //       this.body = JSON.parse(localStorage.getItem("body"));
  //       this.description = JSON.parse(localStorage.getItem("description"));
  //       this.tagList = JSON.parse(localStorage.getItem("tagList"));
  //       this.title = JSON.parse(localStorage.getItem("title"));
  //     } catch (e) {
  //       localStorage.removeItem("slug");
  //       localStorage.removeItem("body");
  //       localStorage.removeItem("description");
  //       localStorage.removeItem("tagList");
  //       localStorage.removeItem("title");
  //     }
  //   }
     this.user = await this.getUser();
     this.acticleAuthor(this.author)
  },
  methods: {
    ...mapActions(["loadHeaderAuthor", "acticleAuthor", "loadSlug"]),
  async getUser() {
      let data = await Axios.get("https://conduit.productionready.io/api/user");

      return data.data.user;
    },

  },
  computed: {
    ...mapState(["profile", "users", "slugs"]),
    image() {
      return this.profile.profile && this.profile.profile.image
    },
     username() {
      return this.profile.profile && this.profile.profile.username
    },
     bio() {
      return this.profile.profile && this.profile.profile.bio
    }
   
  },
};
</script>


<style>
</style>