<template>
  <div>
    <!-- 
      child component
      {{ message }}
   <br>
      <input v-model="test" type="text">
      <button @click="sendData">send</button> -->

    <Header> </Header>
    <Body />
    <Footer />
  </div>
</template>

<script>
import Vuex, { mapActions } from "vuex";

import Header from "./header";
import Footer from "./footer";
import Body from "./body";

export default {
  // props: ["message"],

  components: {
    Header,
    Footer,
    Body,
  },

  data() {
    return {
      test: "",
    };
  },

  methods: {},
  computed: {},
};
</script>

<style>
</style>