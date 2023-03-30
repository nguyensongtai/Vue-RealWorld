<template>
  <nav class="navbar navbar-light">
    <div class="container container-flex">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        {{ $t("conduit") }}
      </router-link>
      <div class="switch-language">
        <div @click="changeLocale('vi')">
          <img
            src="https://www.svgrepo.com/show/242306/vietnam.svg"
            alt="svg-vn"
          />
          <span>{{ $t("vn") }}</span>
        </div>
        <div @click="changeLocale('en')">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/United-kingdom_flag_icon_round.svg/1024px-United-kingdom_flag_icon_round.svg.png"
            alt="svg-en"
          />
          <span>{{ $t("en") }}</span>
        </div>
      </div>
      <ul v-if="!isAuthenticated" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }"
          >
            {{ $t("home") }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'login' }"
          >
            <i class="ion-compose"></i>{{ $t("signIn") }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'register' }"
          >
            <i class="ion-compose"></i>{{ $t("signUp") }}
          </router-link>
        </li>
      </ul>
      <ul v-else class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }"
          >
            {{ $t("home") }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            :to="{ name: 'article-edit' }"
          >
            <i class="ion-compose"></i>&nbsp;{{ $t("newArticle") }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'settings' }"
          >
            <i class="ion-gear-a"></i>&nbsp;{{ $t("settings") }}
          </router-link>
        </li>
        <li class="nav-item" v-if="currentUser.username">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{
              name: 'profile',
              params: { username: currentUser.username }
            }"
          >
            {{ currentUser.username }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "RwvHeader",
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },

  methods: {
    changeLocale(locale) {
      this.$root.changeLocale(locale);
    }
  }
};
</script>

<style lang="scss">
.container-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .switch-language {
    display: flex;
    align-items: center;

    div {
      display: flex;
      align-items: center;
      cursor: pointer;

      span {
        padding: 0 8px;
      }

      img {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
