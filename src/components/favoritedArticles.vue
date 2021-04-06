<template>
  <div>
    <headerConduit />
    <div >
      <div class="profile-page">
        <div class="user-info">
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-md-10 offset-md-1">
                <img
                  :src="`${Profile.image}`"
                  class="user-img"
                />
                <h4>{{ Profile.username }}</h4>
                <p></p>
                <button class="btn btn-sm action-btn btn-outline-secondary">
                  <i class="ion-plus-round"></i> Follow {{Profile.username}}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <div class="articles-toggle">
                <ul class="nav nav-pills outline-active">
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      :href="`/conduit/author/${Profile.username}`"
                      >My Articles</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" href="#@dfqsdf/favorites"
                      >Favorited Articles</a
                    >
                  </li>
                </ul>
              </div>
              <div>
                <div class="article-preview" v-for="(val, index) in favorited" :key="index">
                  <div class="article-meta">
                    <a class="" href="#@Zeynep"
                      ><img :src="`${val.author.images}`"
                    /></a>
                    <div class="info">
                      <a class="author" href="#@Zeynep">{{
                        val.author.username
                      }}</a>
                      <span class="date">{{ Date(val.createdAT) }}</span>
                    </div>
                    <div class="pull-xs-right">
                      <button class="btn btn-sm btn-outline-primary">
                        <i class="ion-heart"></i>
                      </button>
                    </div>
                  </div>
                  <a
                    class="preview-link"
                    href="#article/supercalifragilisticexpialidocious-xh3ioi"
                    ><h1>{{ val.title }}</h1>
                    <p>{{ val.description }}</p>
                    <span>Read more...</span>
                    <ul class="tag-list"></ul
                  ></a>
                </div>
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
import headerConduit from "./headerConduit";
import footerConduit from "./footerConduit";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    headerConduit,
    footerConduit,
  },
  data() {
    return {
      author: "",
    };
  },
  // created() {
  //    //this.author =  this.$route.params.username
  //   console.log("fav:", this.$route.params);
  //   this.loadFavoriteds(this.$route.params.username);
  // },
  mounted() {
    
    this.loadFavoriteds(this.$route.params.username);
    this.loadHeaderAuthor(this.$route.params.username)
  },
  methods: {
    ...mapActions(["loadFavoriteds","loadHeaderAuthor"]),
  },
  computed: {
    ...mapState(["favorited","profile"]),
    Profile(){
      return this.profile.profile
    }
  },
};
</script>

<style>
</style>