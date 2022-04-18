<template>
  <div>
    <headerConduit />
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>
        <form>
          <fieldset>
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control"
                v-model="image"
                placeholder="URL of profile picture"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                v-model="username"
              />
            </fieldset>
            <fieldset class="form-group">
              <textarea
                class="form-control form-control-lg"
                rows="8"
                placeholder="Short bio about you"
                v-model="bio"
              ></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input
                type="email"
                class="form-control form-control-lg"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="New Password"
                v-model="password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              @click.prevent="update"
            >
              Update Settings
            </button>
          </fieldset>
        </form>
        <hr />
        <button class="btn btn-outline-danger" @click.prevent="logout">
          Or click here to logout.
        </button>
      </div>
    </div>
    <footerConduit />
  </div>
</template>


<script>
import Axios from "axios";
import { mapActions, mapState } from "vuex";
import footerConduit from "./footerConduit";
import headerConduit from "./headerConduit";
export default {
  components: {
    footerConduit,
    headerConduit,
  },
  data() {
    return {
      username: localStorage.getItem("username"),
      image: localStorage.getItem("image"),
      bio: localStorage.getItem("bio"),
      email: localStorage.getItem("email"),
      password: null,
    };
  },
  computed: {
    ...mapState(["updateUser", "profile"]),
    Profile() {
      return this.profile.profile;
    },
  },

  methods: {
    ...mapActions(["loadUpdateUser", "logout1", "loadHeaderAuthor"]),
    logout() {
      this.logout1(this.$router.push("/"));
    },

    // logout() {
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("bio");
    //   localStorage.removeItem("image");
    //   localStorage.removeItem("username");
    //   localStorage.removeItem("email");
    //   this.$router.push("/conduit");
    // },
    async update() {
      const token = localStorage.getItem("token");
      try {
        const response = await Axios.put(
          "https://conduit.productionready.io/api/user",
          {
            user: {
              email: this.email,
              bio: this.bio,
              image: this.image,
              username: this.username,
              password: this.password,
            },
          },
          {
            headers: {
              authorization: `Token ${token}`,
            },
          }
        );
        if (response.status >= 200 && response.status <= 300) {
          localStorage.setItem("image", response.data.user.image);
          localStorage.setItem("bio", response.data.user.bio);
          this.$router.push("/conduit/user");
        }
        console.log(data);
      } catch (error) {
        if (error.response.status > 400) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style>
</style>