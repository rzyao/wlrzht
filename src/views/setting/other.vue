<template>
  <div class="app-container" />
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'second'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      }
    }
  }
</script>
<style scoped>
.app-cpntainer{
  margin: 100px;
}
</style>
