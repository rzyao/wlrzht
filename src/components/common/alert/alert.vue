<template>
  <transition name="transition">
    <div v-if="visible" class="app-container" :style="{height:appHeight ,width:appWidth}">

      <div class="alert">
        <div class="icon" />
        <div class="information-box"><span class="information">{{ msg }}</span></div>
        <div class="enter-box"><span class="enter" @click="resetAlert">确定</span></div>
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
            visible: false,
            visibleStates: null
        }
    },
    computed: {
        appHeight: function() {
            return this.AppMainHeight + 'px'
        },
        appWidth: function() {
            return this.AppMainWidth + 'px'
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
        this.AppMainHeight = document.getElementById('AppMain').offsetHeight

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
                this.AppMainHeight = document.getElementById('AppMain').offsetHeight
            })()
        })
        this.confirm()
    },
    methods: {
        resetAlert() {
            this.visible = false
            setTimeout(() => {
                // 完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
                // https://cn.vuejs.org/v2/api/#vm-destroy
                this.$destroy(true)
                this.$el.parentNode.removeChild(this.$el) // 从父元素上移除当前组件 dom
            }, 500)
            this.visibleStates && this.visibleStates.resolve()
        },
        confirm() {
            return new Promise((resolve, reject) => {
                this.visibleStates = { resolve, reject }
            })
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
.app-container{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9999;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
}
.alert{
  width: 300px;
  height: 180px;
  margin-top: 12%;
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
.enter-box{
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: yellow;
}
</style>
