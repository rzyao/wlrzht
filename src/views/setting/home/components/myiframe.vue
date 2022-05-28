<template>
  <div class="app-container">
    <div class="iframe-box">
      <el-image :src="require('@/icons/phone.png')" style="height: 647px;width: 300px;position: absolute;pointer-events: none;" />
      <div class="iframe">
        <iframe v-if="isRefresh" id="iframe" width="286" height="590" :src="url" allowfullscreen="allowfullscreen" frameborder="0" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'MyIframe',
    props: {
        url: {
            default: 'http://localhost:8080/pages/index/index',
            type: String
        },
        refresh: {
            default: false,
            type: Boolean }
    },
    data() {
        return {
            isRefresh: true
        }
    },
    watch: {
        refresh: function(newval, oldval) {
            this.isRefresh = newval
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
.app-container{
  width: 350px;
  height: calc(100vh - 210px);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align:top;
  z-index: 1000;
}
.iframe-box{
      border-bottom-left-radius: 40px;
      border-bottom-right-radius: 40px;
      overflow: hidden;

      .iframe{
      margin: 0;
      margin-top: 37px;
      padding: 5px;
      border: 1px solid #000;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-content: center;
    }
}
</style>
