<template>
  <div class="app-container">
    <div class="alert">
      <div class="icon">
        <img src="../../icons/svg/alertclose.svg" alt="">
      </div>
      <span class="span">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'MyAlert',
    data() {
        return {
            msg: '',
            text: ''
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style scoped>

</style>
