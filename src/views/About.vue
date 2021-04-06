<template>
  <div>
    <!-- <div> {{ message }} </div>
    <ul>
      <li v-for="(value, index) in arr" :key="index">{{ value }}</li>
    </ul>

    <div v-if="condition">true</div>
    {{ text }}
    <input v-model="text" type="text">
    <button @click="handleClick">submit</button>

    {{even}} -->
     
    <Test :message="text" @tencuathangduocsend="handleData"/>
  
  </div>
</template>

<script>
import Test from "../components/Test";
export default {
  props: [],
  components: {Test},
  data() {
    return {
      // message: "abc",
      // arr: [1,10,3,4,5],
      // condition: true,
      text: "",
      // age: 19
    
    }
  },

  methods: {
  //   handleClick() {
  //     console.log(1)
  //   },
    handleData(data) {
      console.log(data)
      console.log("this is from child")
    }
  //}

  // computed: {
  //   isOver18() {
  //     return this.age > 18;
  //   },

  //   even() {
  //     console.log(parseInt(this.text))
  //     return +this.text % 2 == 0;
  //   }
  // },

  // watch: {
  //   text(val) {
  //     console.log("texxt change", val)
  //   }
   }
}
</script>

<style>

</style>