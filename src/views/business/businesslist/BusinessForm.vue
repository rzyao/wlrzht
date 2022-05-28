<template>
  <div class="background">
    <transition name="transition">
      <div v-if="mask == true" class="mask" />
    </transition>
    <transition name="transition1">
      <div v-if="mask == true" :key="1" class="form-background" :style="{height:appHeight ,width:appWidth}">
        <div class="formbox">
          <div class="position-static">
            <el-form ref="form" :model="form" label-width="80px" label-position="left">
              <el-form-item
                label="账号:"
                prop="id"
                :rules="[
                  { required: true, message: '用户名不能为空'}
                ]"
              >
                <el-input v-model="form.id" autocomplete="off" :disabled="action=='edit'" type="id" style="width:200px" placeholder="填写登录账号" />
              </el-form-item>
              <el-form-item
                label="密码:"
                prop="password"

                :rules="[
                  { required: true, message: '密码不能为空'}
                ]"
              >
                <!-- 防止浏览器自动填充账户 -->
                <input style="position: fixed;bottom: -9999px;">
                <!-- 防止浏览器自动填充密码 -->
                <input type="password" style="position: fixed;bottom: -9999px;">

                <el-input v-model="form.password" autocomplete="off" type="text" style="width:200px" :placeholder="action=='edit'?'密码不填写默认不修改':'请填写登录密码'" @focus="changeType" />
              </el-form-item>
              <el-form-item
                label="用户名:"
                prop="name"
                :rules="[
                  { required: true, message: '用户名不能为空'}
                ]"
              >
                <el-input v-model="form.name" type="name" style="width:200px" placeholder="填写用户昵称" />
              </el-form-item>
              <el-form-item
                label="状态:"
                :rules="[
                  { required: true}
                ]"
              >
                <el-switch v-model="form.state" />
              </el-form-item>
              <div class="button">
                <el-button v-if="action=='add'" type="primary" @click="UploadForm('form')">立即添加</el-button>
                <el-button v-if="action=='edit'" type="primary" @click="UpdateForm('form')">保存修改</el-button>
                <el-button @click="CloseForm">取消</el-button></div>
            </el-form>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>
<script>

export default {
    name: 'BusinessForm',
    props: {
        propsform: {
            type: Object,
            default: null
        },
        action: {
            type: String,
            default: 'add'
        },
        background: {
            type: String,
            default: 'body'
        }
    },
    data() {
        return {
            mask: false,
            form: {
                id: '',
                password: '',
                name: '',
                state: true
            },
            fileList: [],
            // 背景的宽高
            BGWidth: '',
            BGHeight: ''
        }
    },
    computed: {
        appHeight: function() {
            return this.BGHeight + 'px'
        },
        appWidth: function() {
            return this.BGWidth + 'px'
        }
    },
    watch: {

    },
    mounted() {
        if (this.action === 'edit') {
            console.log(this.action === 'edit')
            this.form = this.propsform
            console.log(this.propsform)
        }
        this.mask = true
        // 获取AppMain的宽高
        if (this.background === 'body') {
            this.BGWidth = document.body.offsetWidth
            this.BGHeight = document.body.offsetHeight
            // window.onresize = () => {
            //     return (() => {
            //         this.BGWidth = document.getElementById('AppMain').offsetWidth
            //         this.BGHeight = document.getElementById('AppMain').offsetHeight
            //     })()
            // }
            /**
         * 将 window.onresize 替换成 window.addEventListener(“resize”, () => { })解决多个window.onresize只能触发一个的问题
         */
            window.addEventListener('resize', () => {
                return (() => {
                    this.BGWidth = document.body.offsetWidth
                    this.BGHeight = document.body.offsetHeight
                })()
            })
            console.log(this.propsform)
        } else {
            this.BGWidth = document.getElementById('AppMain').offsetWidth
            this.BGHeight = document.getElementById('AppMain').offsetHeight
            window.addEventListener('resize', () => {
                return (() => {
                    this.BGWidth = document.getElementById('AppMain').offsetWidth
                    this.BGHeight = document.getElementById('AppMain').offsetHeight
                })()
            })
            console.log(this.propsform)
        }
    },
    methods: {
        changeType(e) {
            e.srcElement.type = 'password'
        },
        // 重置表单发放，已启用，现在用v-if来重置表单
        // resetForm() {
        //     this.$refs['form'].resetFields()
        // },
        CloseForm() {
            this.mask = false
            // this.resetForm()
            setTimeout(() => {
                this.$emit('CloseForm')
            }, 300)
        },
        UploadForm(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    console.log('valid')
                    console.log(valid)
                    this.$emit('UploadForm', this.form)
                } else {
                    return false
                }
            })
        },
        UpdateForm(form) {
            console.log(this.form)
            this.$emit('UpdateForm', this.form)
        }
    }
}
</script>

<style scoped>
/* 遮罩层缩放动画 */
.transition-enter, .transition-leave-to {
  transform: scale(0)
}
.transition-leave, .transition-enter-to {
  transform: scale(1)
}
.transition-enter-active, .transition-leave-active {
  transition: all 0.3s
}
/* 遮罩层样式 */
.mask{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.103);
}
/* 表单缩放动画 */
.transition1-enter, .transition1-leave-to {
  transform: scale(0)
}
.transition1-leave, .transition1-enter-to {
  transform: scale(1)
}
.transition1-enter-active, .transition1-leave-active {
  transition: all 0.3s
}
.bitian{
  color: red;
  display: inline-block;
}
.form-background{
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.103);
  display: flex;
  justify-content: center;
}
.formbox{
  margin-top: 40px;
  background-color: #fff;
  width: 500px;
  height: 550px;
  display: flex;
  justify-content: center;
  padding-top: 40px;
}
.position-static{
  position: static;
}
.button{
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
</style>
