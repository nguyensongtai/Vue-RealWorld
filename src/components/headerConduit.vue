<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <router-link class="navbar-brand" to="/conduit/user"
          >conduit</router-link
        >
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <router-link class="nav-link" to="/conduit/user">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/conduit/signin"
              v-show="!isLoggedIn"
              >Sign in</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/conduit/signup"
              v-show="!isLoggedIn"
              >Sign up</router-link
            >
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" to="/conduit/user/newpost"
              ><i class="ion-compose"></i
              ><!-- react-text: 465 -->&nbsp;New Post<!-- /react-text --></router-link
            >
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" to="/conduit/user/setting"
              ><i class="ion-gear-router-link"></i
              ><!-- react-text: 469 -->&nbsp;Settings<!-- /react-text --></router-link
            >
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link
              class="nav-link"
              :to="`/conduit/user/profile/${username}`"
              ><img class="user-pic" :src="image" /><!-- react-text: 473 -->{{
                username
              }}<!-- /react-text --></router-link
            >
          </li>
        </ul>
        <!-- react-empty: 12 -->
      </div>
    </nav>
  </div>
</template>

<script>
import Axios from "axios";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      username: localStorage.getItem("username"),
      image: localStorage.getItem("image"),
      author: "",
      //   user: {
      //   image: "",
      //   username: "",
      //   createdAt: "",
      // },
    };
  },
  async mounted() {
    //  this.author = this.$route.params.username;
    // this.acticleAuthor(this.$route.params.username);
    // this.user = await this.getUser();
    // this.loadHeaderAuthorLogin(this.author);
  },
  methods: {
    ...mapActions(["acticleAuthor", "loadHeaderAuthor"]),
    async getUser() {
      let data = await Axios.get("https://conduit.productionready.io/api/user");

      return data.data.user;
    },
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState(["users", "profileUser", "profile"]),
    //   image() {
    //   return this.profile.profile && this.profile.profile.image
    // },
    //  username() {
    //   return this.profile.profile && this.profile.profile.username
    // },
  },
};
</script>

<style>
</style>