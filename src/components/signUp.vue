<template>
  <div>
    <headerConduit />
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Sign Up</h1>
            <p class="text-xs-center">
              <a class="" href="/conduit/signin">Have an account?</a>
            </p>
            <!-- react-empty: 1384 -->
            <form>
              <fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    id="username"
                    v-model="username"
                    required
                    autofocus
                    placeholder="Username"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="email"
                    id="email"
                    class="form-control form-control-lg"
                    placeholder="Email"
                    v-model="email"
                    required
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    id="password"
                    type="password"
                    class="form-control form-control-lg"
                    placeholder="Password"
                    required
                    v-model="password"
                  />
                </fieldset>
                <div>
                  <button
                    class="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    @click.prevent="signUp1"
                  >
                    Sign In
                  </button>
                </div>
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
import { mapActions, mapState } from "vuex";
import headerConduit from "./headerConduit.vue";
import footerConduit from "./footerConduit.vue";
import Axios from "axios";

export default {
  components: {
    headerConduit,
    footerConduit,
  },
  
  data() {
    return {
      username: null,
      email: null,
      password: null,
      //token: localStorage.getItem("token") || "",
      displayAlertError: false,
      displayAlertSuccess: false,
      errorUsername: "",
      errorEmail: "",
      errorPassword: "",
    };
  },
  methods: {
    ...mapActions(['register']),
    signUp1 () {
        let data = {
        user: {
              username: this.username,
              email: this.email,
              password: this.password,
            },   
        }
      this.$store.dispatch('register', data,
      localStorage.setItem("username", data.user.username)
     )
       .then(() => this.$router.push('/conduit/user'))
       .catch(err => console.log(err))
      },
    // async signUp() {
    //   try {
    //     const response = await Axios.post(
    //       "https://conduit.productionready.io/api/users",
    //       {
    //         user: {
    //           username: this.username,
    //           email: this.email,
    //           password: this.password,
    //         },
    //       }
    //     )
    //     if (response.status >= 200 && response.status <= 300) {
    //       this.displayAlertError = false;
    //       this.displayAlertSuccess = true;
    //       this.$router.push("/conduit/signin");
    //     }
    //   } catch (error) {
    //     if (error.response.status > 400) {
    //       this.displayAlertSuccess = false;
    //       this.displayAlertError = true;
    //       const errors = error?.response?.data?.errors;
    //       if (errors.username) {
    //         this.errorUsername = errors.username;
    //       } else this.errorUsername = "";
    //       if (errors.email) {
    //         this.errorEmail = error.email;
    //       } else this.errorEmail = "";
    //       if (errors.password) {
    //         this.errorPassword = error.password;
    //       } else this.errorPassword = "";
    //     }
    //   }
    // },
  },
  computed: {
    ...mapState(["user","token"]),
  },
};
</script>

<style>
</style>