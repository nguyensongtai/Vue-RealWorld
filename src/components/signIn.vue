<template>
  <div>
    <headerConduit />
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Sign In</h1>
            <p class="text-xs-center">
              <a class="" href="/conduit/signup">Need an account?</a>
            </p>
            <!-- react-empty: 1401 -->
            <form @submit.prevent="signIn">
              <fieldset>
                <fieldset class="form-group">
                  <input
                    type="email"
                    class="form-control form-control-lg"
                    id="email"
                    placeholder="Email"
                    v-model="email"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="password"
                    id="password"
                    class="form-control form-control-lg"
                    placeholder="Password"
                    v-model="password"
                  />
                </fieldset>
                <button
                  class="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  Sign in
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
import headerConduit from "./headerConduit.vue";
import footerConduit from "./footerConduit.vue";
import { mapActions, mapState } from "vuex";
import Axios from "axios";

export default {
  components: {
    headerConduit,
    footerConduit,
  },
  data() {
    return {
      email: "",
      password: "",
      displayAlert: false,
      errorAlert: "",
      item: [],
    };
  },

  methods: {
    ...mapActions(["login"]),
    signIn() {
      let data = {
        user: {
          email: this.email,
          password: this.password,
        },
      };
      this.$store
        .dispatch(
          "login",
          data,
          localStorage.setItem("email", data.user.email),
          localStorage.setItem("username", data.user.username)
        )
        .then(() => this.$router.push("/conduit/user"))
        .catch((err) => console.log(err));
    },
  },
  computed: {},
};
</script>

<style>
</style>