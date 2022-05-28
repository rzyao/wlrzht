<template>
  <transition name="transition">
    <div v-show="visible" class="mask" :style="{height:bodyHeight ,width:bodyWidth}">
      <div v-show="visible" class="app-container" :style="{height:appHeight ,width:appWidth}">
        <div class="alert" :style="{top:appHeight/2 }">
          <div class="icon" />
          <div class="information-box"><span class="information">{{ msg }}</span></div>
          <div :class="[cancel?'confirm-box':'enter-box']"><span class="enter" @click="confirm">确定</span></div>
          <div v-if="cancel" class="cancel-box"><span class="enter" @click="resetAlert">取消</span></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    name: 'MyAlert',
    // props: {
    //     text: {
    //         type: String,
    //         default: '系统错误,请联系管理员处理'
    //     },
    //     show: {
    //         type: Boolean,
    //         default: false
    //     }
    // },
    data() {
        return {
            msg: '',
            AppMainHeight: '',
            AppMainWidth: '',
            BodyWidth: '',
            BodyHeight: '',
            visible: false,
            visibleStates: null,
            cancel: true
        }
    },
    computed: {
        appHeight: function() {
            return this.AppMainHeight + 'px'
        },
        appWidth: function() {
            return this.AppMainWidth + 'px'
        },
        bodyHeight: function() {
            return this.BodyHeight + 'px'
        },
        bodyWidth: function() {
            return this.BodyWidth + 'px'
        }
    },
    watch: {
        // text: function(val) {
        //     this.msg = val
        // }
    },
    mounted() {
        // 获取AppMain的宽高
        this.AppMainWidth = document.getElementById('AppMain').offsetWidth
        window.CSS.supports('--AppMainWidth', this.AppMainWidth + 'px')
        this.AppMainHeight = document.getElementById('AppMain').offsetHeight
        window.CSS.supports('--AppMainHeight', this.AppMainHeight + 'px')
        this.BodyWidth = document.body.offsetWidth
        this.BodyHeight = document.body.offsetHeight

        // window.onresize = () => {
        //     return (() => {
        //         this.AppMainWidth = document.getElementById('AppMain').offsetWidth
        //         this.AppMainHeight = document.getElementById('AppMain').offsetHeight
        //     })()
        // }
        /**
         * 将 window.onresize 替换成 window.addEventListener(“resize”, () => { })解决多个window.onresize只能触发一个的问题
         */
        window.addEventListener('resize', () => {
            return (() => {
                this.AppMainWidth = document.getElementById('AppMain').offsetWidth
                window.CSS.supports('--AppMainWidth', this.AppMainWidth + 'px')
                this.AppMainHeight = document.getElementById('AppMain').offsetHeight
                window.CSS.supports('--AppMainHeight', this.AppMainHeight + 'px')
                this.BodyWidth = document.body.offsetWidth
                this.BodyHeight = document.body.offsetHeight
            })()
        })
        this.visible = true
    },
    methods: {
        resetAlert() {
            console.log('resetAlert')
            this.visible = false
            return false
            // setTimeout(() => {
            //     // 完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
            //     // https://cn.vuejs.org/v2/api/#vm-destroy
            //     this.$destroy(true)
            //     this.$el.parentNode.removeChild(this.$el) // 从父元素上移除当前组件 dom
            // }, 500)
        },
        confirm() {
            console.log('confirm')
            return true
        }
    }
}
</script>

<style scoped>
/* 缩放动画 */
.transition-enter, .transition-leave-to {
  transform: scale(0)
}
.transition-leave, .transition-enter-to {
  transform: scale(1)
}
.transition-enter-active, .transition-leave-active {
  transition: all 0.5s
}
.mask{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(10, 10, 10, 0.4);
}
.app-container{
    position: absolute;
  /* width: 100%;
  height: 100%; */
  z-index: 9999;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-content: center;
}
.alert{
  position: absolute;
  top: 40vh;
  width: 300px;
  height: 180px;
  margin-top: -150px;
  border-radius: 20px;
  background-color: green;
  overflow: hidden;
}
.information-box{
  width: 300px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
}
.cancel-box{
  width: 150px;
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: yellow;
}
.confirm-box{
  width: 150px;
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: yellow;
}
.enter-box{
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: yellow;
}
</style>
