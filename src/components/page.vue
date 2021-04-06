<template>
 <li class="page-item">
    <div
      class="page-link"
      href=""
      @click="onClickPage(pagess)"
      :class="[currentPage === pagess ? 'active' : '']"
    >
      {{ pagess }}
    </div>
  </li> 
</template>

<script>
import Axios from "axios";
import { mapActions, mapState } from "vuex";
export default {
  props: {
    pagess: Number,
    load: Object,
  },
  data() {
    return {
     
    };
  },
  methods: {
    ...mapActions(["loadLists", "isActivePagination"]),
    onClickPage(currentPage) {
      this.$emit(
        "pageChanged",
        this.isActivePagination((currentPage = this.pagess)),
        this.loadLists()
      );
    },
  },
 
  computed: {
    ...mapState([
      "currentPage",
      "test",
      "perPage",
      "totalPage",
      "pages",
      "callback",
    ]),
  }
};
</script>

<style>
.active {
  background: green;
  color: white;
}
</style>