<template>
    <div>
        <child-component @increase="handleEvent" :counter="counter" />
         <template slot="name">
    con day
  </template>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                counter: 1,
            }
        },
        methods: {
            handleEvent() {
                this.counter += 1;
            }
        }
    }
</script>