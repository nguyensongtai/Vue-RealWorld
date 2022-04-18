import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

var filters = {
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed;
    });
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  },
};
export default new Vuex.Store({
  state: {
    posts: null,
    load: [],
    allTask: "",
    currentFilter: "default",
    todos: [
      {
        id: 1,
        title: " Đi học!",
        completed: false,
      },
      {
        id: 2,
        title: "Đi chơi!",
        completed: false,
      },
      {
        id: 3,
        title: "Đi làm!",
        completed: false,
      },
    ],
    nextTodoId: 4,
    tags: [],
    lists: [],
    pages: [],
    articlesCount: 0,
    // limit: 10,
    totalPage: "",
    currentPage: 1,
    test: 1,
    cmts: {
      article: {
        author: {
          image: "",
          username: "",
        },
      },
      title: "",
      body: "",
      createdAt: "",
    },
    authors: [],
    favorited: [],
    feed: [],
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    users: [],
    profile: {
      image: '',
      bio: '',
      following: '',
      username: ''
    },
    updateUser: [],
    profileUser: [],
    postArticle: [],
    slugs: [],
    like: [],
    delLike: [],
    favorAuthor: [],
    commentSlug: [],
    deleteAri: [],
    getSlug: [],
    slug: localStorage.getItem("slug"),
    perPage: []


  },

  getters: {
    listRender: (state) => {
      //logic
      // lasdhkasdas
      switch (state.currentFilter) {
        case "default":

          state.allTask = state.todos
          console.log(state.allTask)
          return state.todos;
        case "get":
          return state.todos
        case "showAll":

          return state.todos
        case "completed":
          return state.todo.filter((item) => item.completed);
        case "clearCompleted":
          return state.todo.filter((item) => !item.completed);
      }
    },
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,

  },
  mutations: {
    // thay doi state
    // sendData(state, data) {
    //   state.text = data;
    // },
    changeStatus(state, val) {
      state.currentFilter = "get"
      state.todos.map((item) => {
        if (item.id === val.id) {
          item.completed = !item.completed;
        }
      });
    },
    // sendData() {
    //   console.log(this.test);
    //   this.$emit("tencuathangduocsend", this.test);
    // },
    sendTodo() {
      this.$$emit("todo", this.todo);
    },
    addNewTodo(state, todo) {
      state.todos.push({
        id: state.nextTodoId++,
        title: todo,
        completed: false,
      });
    },
    deleteTodo(state, index) {
      state.todos.splice(index, 1);
    },
    deleteAll(state, todo) {
      state.todos = [];
    },
    updateTask(state, e) {
      e.preventDefault();
      state.title = e.target.innerText;
      e.target.blur();
    },
    //active cai da lam roi
    removeCompleted: function (state, todo) {
      state.todos = filters.active(state.todos);
    },
    setFilter(filter) {
      this.currentFilter = filter
    },
    showAll(state) {
      state.currentFilter = "showAll"
      state.todos = state.allTask
    },
    set_load(state, load) {

      state.load = load
    },
    loadTags(state, data) {

      state.tags = data
    },
    loadLists(state, { articles, articlesCount }) {

      state.lists = articles
      state.articlesCount = articlesCount


    },
    loadPages(state, data) {

      state.pages = data

    },
    loadCmts(state, data) {

      state.cmts = data
    },
    loadAuthors(state, data) {


      state.authors = data

    },
    loadFavoriteds(state, favorited) {

      state.favorited = favorited

    },
    isActivePagination(state, data) {

      state.currentPage = data
    },
    loadFeed(state, feed) {
      state.feed = feed
    },
    acticleAuthor(state, users) {

      state.users = users
    },
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
    loadProfile(state, profile) {
      state.profile = profile
    },
    loadHeaderAuthor(state, profile) {
      state.profile = profile
    },
    loadUpdateUser(state, updateUser) {

      state.updateUser = updateUser
    },
    loadHeaderAuthorLogin(state, profileUser) {
      state.profileUser = profileUser
    },
    postArticles(state, postArticle) {
      state.postArticle = postArticle
    },
    loadSlug(state, slugs) {
      state.slugs = slugs
    },
    likeFavorite(state, like) {
      state.like = like
    },
    favoritedAuthor(state, favorAuthor) {
      state.favorAuthor = favorAuthor
    },
    commentUser(state, commentSlug) {
      state.commentSlug = commentSlug
    },
    deleteArticle(state, deleteAri) {
      state.deleteAri = deleteAri
    },
    getSlug1(state, getSlug) {
      state.getSlug = getSlug
    },
    deleteLike(state, delLike) {
      state.delLike = delLike
    },



  },
  actions: {
    // tuowng tac vs ui + xu ly logic + call api + xu ly bat dong bo
    // sendData(content, data) {
    //   // xu ly logic
    //   //  debugger
    //   content.commit("sendData", data)
    // },
    changeStatus(content, data) {
      content.commit("changeStatus", data)
    },
    addNewTodo(content, todo) {

      content.commit("addNewTodo", todo)
    },
    deleteTodo(content, data) {
      content.commit("deleteTodo", data)
    },
    deleteAll(content, data) {
      content.commit("deleteAll", data)
    },
    showAll(content, todo) {
      content.commit("showAll", todo)
    },
    updateTask(content, data) {
      content.commit("updateTask", data)
    },
    removeCompleted(content, data) {
      content.commit("removeCompleted", data)
    },
    filterData(content, data) {
      content.commit("filterData", data)
    },
    listRender(content, data) {
      content.commit("listRender", data)
    },
    setFilter(content, data) {
      content.commit('setFilter', data)
    },
    load(content, data) {
      content.commit('load', data)
    },
    loadAPI({ commit }) {
      Axios
        .get('https://conduit.productionready.io/api/articles?author=sadasdsadas111&limit=5&offset=0')
        .then(response => {
          commit('set_load', response.data)
        })
        .catch(e => {
          this.error.push(e);
        })
    },
    loadTags({ commit }) {
      Axios.get("https://conduit.productionready.io/api/tags")
        .then(data => {
          commit('loadTags', data.data.tags)
        })
    },
    loadLists({ commit, state }) {
      const currentPage = state.currentPage
      const offset = (currentPage - 1) * 10

      Axios.get(`https://conduit.productionready.io/api/articles?limit=10&offset=${offset}`)
        .then(data => {
          const { articles, articlesCount } = data.data

          commit('loadLists', { articles: articles, articlesCount: articlesCount })
        })
    },

    loadCmts({ commit }, slug) {
      Axios.get(`https://conduit.productionready.io/api/articles/${slug}`)

        .then(data => {

          commit('loadCmts', data.data)
        })
    },
    loadAuthors({ commit }, author) {
      Axios.get(`https://conduit.productionready.io/api/articles?author=${author}`)
        .then(data => {
          commit("loadAuthors", data.data.articles)
        })
    },
    loadFavoriteds({ commit }, author) {
      Axios.get(`https://conduit.productionready.io/api/articles?favorited=${author}`)
        .then(data => {

          commit("loadFavoriteds", data.data.articles)
        })
    },

    isActivePagination({ commit }, currentPage) {
      commit('isActivePagination', currentPage)
    },

    loadFeed({ commit }) {
      Axios.get(`https://conduit.productionready.io/api/articles/feed?limit=10&offset=0`)
        .then(data => {
          commit('loadFeed', data.data)
        })
    },

    acticleAuthor({ commit }, author) {
      Axios.get(`https://conduit.productionready.io/api/articles?author=${author}&limit=10&offset=0`)
        .then(data => {
          commit('acticleAuthor', data.data.articles)
        })
    },

    favoritedAuthor({ commit }, author) {
      Axios.get(`https://conduit.productionready.io/api/articles?favorited=${author}&limit=10&offset=0`)
        .then(data => {
          commit('favoritedAuthor', data.data.articles)
        })
    },

    loadUpdateUser({ commit }) {
      Axios.put("https://conduit.productionready.io/api/user")
        .then(data => {
          commit('loadUpdateUser', data)
        })
    },

    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Axios({ url: 'https://conduit.productionready.io/api/users', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.user.token
            const user = resp.data.user.user
            const username = resp.data.user.username
            localStorage.setItem('token', token)
            localStorage.setItem("username", username)
            Axios.defaults.headers.common['authorization'] = `Token ${token}`
            commit('auth_success', token, user, username)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Axios({ url: 'https://conduit.productionready.io/api/users/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.user.token
            const user = resp.data.user.user
            const username = resp.data.user.username
            const email = resp.data.user.email
            localStorage.setItem('token', token)
            localStorage.setItem("username", username)
            localStorage.setItem("email", email)
            Axios.defaults.headers.common['authorization'] = `Token ${token}`
            commit('auth_success', token, user, username)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout1({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('bio')
        localStorage.removeItem('body')
        localStorage.removeItem('description')
        localStorage.removeItem('title')
        localStorage.removeItem('tagList')
        localStorage.removeItem('image')
        localStorage.removeItem('createdAt')
        localStorage.removeItem('email')
        resolve()
      })
    },

    loadUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Axios.get("https://conduit.productionready.io/api/user")
          .then((res) => {
            const token = res.data.user.token
            const user = res.data.user.user
            localStorage.setItem('token', token)
            Axios.defaults.headers.common['authorization'] = `Token ${token}`
            commit('auth_success', token, user)
            resolve(resp)
          }).catch(err => {
            commit('auth_error')
            reject(err)
          })
      })
    },
    loadHeaderAuthor({ commit }, author) {
      Axios.get(`https://conduit.productionready.io/api/profiles/${author}`)
        .then(res => {
          console.log(res, "blka")
          commit("loadHeaderAuthor", res.data)
        })
    },

    postArticles({ commit }, article) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Axios({ url: 'https://conduit.productionready.io/api/articles', data: article, method: 'POST' })
          .then(resp => {
            const body = resp.data.article.body
            const title = resp.data.article.title
            const description = resp.data.article.description
            const tagList = resp.data.article.tagList
            const token = localStorage.getItem('token')
            const slug = resp.data.article.slug
            const createdAt = resp.data.article.createdAt
            Axios.defaults.headers.common['authorization'] = `Token ${token}`
            localStorage.setItem("body", body);
            localStorage.setItem("title", title);
            localStorage.setItem("description", description);
            localStorage.setItem("tagList", tagList);
            localStorage.setItem("slug", slug)
            localStorage.setItem("createdAt", createdAt)
            commit('auth_success', article, body, title, description, tagList, slug, createdAt)
            commit("postArticles", slug)
            resolve(resp)

          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },

    loadSlug({ commit, state }) {
      const slug = state.slug
      Axios.get(`https://conduit.productionready.io/api/articles/${slug}`)
        .then(data => {

          commit('loadSlug', data.data)
        })
    },

    likeFavorite({ commit }, slug) {
      Axios.post(`https://conduit.productionready.io/api/articles/${slug}/favorite`)
        .then(data => {
          commit('likeFavorite', data.data)
        })
    },

    deleteLike({ commit }, slug) {
      Axios.delete(`https://conduit.productionready.io/api/articles/${slug}/favorite`)
        .then(data => {
          commit('deleteLike', data.data)
        })
    },

    commentUser({ commit, state }) {
      const slug = state.slug
      Axios.get(`https://conduit.productionready.io/api/articles/${slug}/comments`)
        .then(data => {
          commit("commentUser", data.data)
        })
    },

    deleteArticle({ commit }) {
      const slug = localStorage.getItem("slug")
      Axios.delete(`https://conduit.productionready.io/api/articles/${slug}`)
        .then(data => {
          commit('deleteArticle', data, slug)
        })
    },

  },
  modules: {
  },
})