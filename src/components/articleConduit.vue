<template>

  <div>
   
    <div class="article-preview">
      <div class="article-meta">
        <a class="" href="">
          <img :src="`${art.author.image}`" />
        </a>
        <div class="info">
          <!-- <a class="author" :href="`/conduit/author/${art.author.username}`" >{{ art.author.username }}</a> -->
          <router-link :to="`/conduit/author/${art.author.username}`">{{
            art.author.username
          }}</router-link>
          <span class="date">{{ Date(art.createdAt) }}</span>
          
        </div>
        <div class="pull-xs-right">
          <button
            class="btn btn-sm btn-outline-primary"
            :class="{ active: this.favorited }"
            @click="like1(i)"
          >
         
            <i class="ion-heart"></i
            ><!-- react-text: 1165 -->
            <!-- /react-text --><!-- react-text: 1166 -->{{i}} <!-- /react-text -->
          </button>
        </div>
      </div>
      <a class="preview-link" :href="`/conduit/article/${art.slug}`">
        <h1>{{ art.title }}</h1>
        <p>{{ art.description }}</p>
        <span>Read more...</span>
        <ul class="tag-list"></ul>
      </a>
    </div>
    <div></div>
  </div>
</template>

<script>
import Axios from "axios";

import { mapState, mapActions } from "vuex";
export default {
  props: {
    art: Object,
  },

  data() {
    return {
      slug: this.art.slug,
      i: this.art.favoritesCount,
      isActive: false,
      favorited: this.art.favorited,
      token: localStorage.getItem('token')
    };
  },
  created() {
      
  },
  methods: {
    ...mapActions(["loadLists", "likeFavorite", "deleteLike"]),
    like1() {
       if (this.i = !this.i && this.token) 
     {  
       this.likeFavorite(this.slug, this.i = this.favorited + 1, this.favorited =  true)
     
       }
      else if (this.token){
        {this.deleteLike(this.slug, this.i = this.favorited - 1, this.favorited =  false);
       
        }
      }
    },
  },
  computed: {
    ...mapState([
      "tags",
      "lists",
      "pages",
      "cmts",
      "currentPage",
      "like",
      "delLike",
    ]),
  },
  //   watch:{
  //     $route (to, from){
  //         console.log($route)
  //     }
  // }
};
</script>

<style>
.active{
  background-color: green;
}
</style>