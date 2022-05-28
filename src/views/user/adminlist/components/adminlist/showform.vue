<template>
  <div class="background">
    <transition name="transition">
      <div v-if="mask == true" class="mask" />
    </transition>
    <transition name="transition1">
      <div v-if="mask == true" :key="1" class="adminform" :style="{height:appHeight ,width:appWidth}">
        <div class="formbox">
          <div class="position-static">
            <el-form ref="form" :model="form" label-width="80px" label-position="left">
              <el-form-item
                label="•  账号:"
                prop="id"
              >
                <div>{{ form.id }}</div>
                <!-- <el-input v-model="form.id" type="id" style="width:200px" placeholder="填写登录账号" /> -->
              </el-form-item>
              <el-form-item
                label="密码:"
                prop="password"

                :rules="[
                  { required: true, message: '密码不能为空'}
                ]"
              >
                <el-input v-model="form.password" type="password" style="width:200px" placeholder="填写登录密码" />
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
                label="身份:"
                prop="identity"
                :rules="[
                  { required: true, message: '请选择身份'}
                ]"
              >
                <el-select v-model="form.identity" placeholder="请选择身份">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
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
                <el-button type="primary" @click="SubmitToFather('form')">保存</el-button>
                <el-button @click="resetMask">取消</el-button></div>
            </el-form>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>
<script>

export default {
    name: 'ShowForm',
    props: {
        mask: {
            type: Boolean,
            default: true
        },
        propsform: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            msg: '',
            form: {
                id: '',
                password: '',
                name: '',
                identity: '', /* 即el-select的value*/
                state: true
            },
            fileList: [],
            alertShow: false,
            options: [{
                value: '普通管理员',
                label: '普通管理员'
            }, {
                value: '基础管理员',
                label: '基础管理员'
            }],
            value: '',
            AppMainWidth: '',
            AppMainHeight: ''
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
        propsform: function(newVal, oldVal) {
            this.form.id = newVal.id
            this.form.name = newVal.name
            this.form.identity = newVal.identity
            if (newVal.state === '正常') {
                this.form.state = true
            } else {
                this.form.state = false
            }
        },
        mask: function(newVal, oldVal) {
            this.form.password = ''
        }
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
        console.log(this.propsform)
    },
    methods: {
        resetForm() {
            this.$refs['form'].resetFields()
        },
        resetMask() {
            this.resetForm()
            this.$emit('resetMask')
        },
        SubmitToFather(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    console.log('valid')
                    console.log(valid)
                    // this.form.identity = this.value
                    if (this.form.identity.length !== 0) {
                        // 触发父组件的getAndUploadForm提交表单事件
                        this.$emit('updateform', this.form)
                    } else {
                        this.$myalert({ msg: '请选择身份' })
                        return false
                    }
                } else {
                    return false
                }
            })
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
  z-index: 999;
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
.adminform{
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 1000;
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
