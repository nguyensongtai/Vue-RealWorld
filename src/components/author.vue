<template>
  <div>
    <headerConduit />
    <div class="profile-page">
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <img :src="`${Profile.image}`" class="user-img" />
              <h4>{{ Profile.username }}</h4>
              <p></p>
              <button class="btn btn-sm action-btn btn-outline-secondary">
                <i class="ion-plus-round"></i>
                Follow {{ Profile.username }}
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
                    class="nav-link active"
                    :href="`/conduit/author/${Profile.username}`"
                    >My Articles</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    :href="`/conduit/author/favorited/${Profile.username}`"
                    >Favorited Articles</a
                  >
                  <!-- <router-link :to="`/conduit/author/favorited/${profile.author.username}`">Favorited Articles</router-link> -->
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="article-preview" v-for="(val, index) in authors" :key="index">
        <div class="article-meta">
          <a class="" href="#@dfqsdf"
            ><img
              src="https://static.productionready.io/images/smiley-cyrus.jpg"
          /></a>
          <div class="info">
            <a class="author" href="#@dfqsdf">{{ val.author.username }}</a
            ><span class="date">{{ Date(val.createdAt) }}</span>
          </div>
          <div class="pull-xs-right">
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart"></i>1
            </button>
          </div>
        </div>
        <a class="preview-link" href="#article/yjhjgf-rw1tyv"
          ><h1>{{ val.title }}</h1>
          <p>{{ val.description }}</p>
          <span>Read more...</span>
          <ul class="tag-list"></ul
        ></a>
      </div>
      <!-- react-empty: 2201 -->
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
      author: this.$route.params.username,
    };
  },
  mounted() {
    this.loadHeaderAuthor(this.$route.params.username);
    this.loadAuthors(this.author);
  },
  methods: {
    ...mapActions(["loadHeaderAuthor", "loadAuthors"]),
  },
  computed: {
    ...mapState(["authors", "profile"]),

    Profile() {
      return this.profile.profile;
    },
    userName() {
      if (this.author && this.author.username) {
        return this.author.username;
      }
      return "";
    },
  },
};
</script>

<style>
</style>