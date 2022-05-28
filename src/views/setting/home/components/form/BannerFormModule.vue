<template>
  <div class="app">
    <!-- 遮罩层 -->
    <!-- <transition name="transition"> -->
    <div v-if="mask" class="mask" :style="{height:bodyHeight ,width:bodyWidth}" />
    <!-- </transition> -->
    <div v-if="mask" class="formbox" :style="{height:appHeight ,width:appWidth}">
      <div class="BannerForm">
        <div class="el-form">
          <el-form ref="form" :model="form" label-width="80px" label-position="left">
            <el-form-item
              label="名称"
              prop="name"
              :rules="[
                { required: true, message: '名称不能为空'}
              ]"
            >
              <el-input v-model="form.name" type="name" style="width:200px" />

            </el-form-item>
            <el-form-item v-if="Upload" :label="label">
              <el-upload
                class="upload"
                action="http://150.158.48.102/wlrz/temporary/imgstore.php"
                :on-remove="removeImg"
                list-type="picture"
                :auto-upload="true"
                :on-change="imgChange"
                :limit="1"
                :on-success="imgUploadSuccess"
                :on-error="imgUploadError"
              >
                <el-button size="small" type="primary">点击上传</el-button>

                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item v-if="Image" :label="label">

              <el-image :src="form.src" style="width:200px;height: 100px;" />

            </el-form-item>
            <el-form-item label="跳转链接">
              <el-input v-model="form.link" style="width:250px" />
            </el-form-item>
            <el-form-item
              label="排序"
              prop="number"
              :rules="[
                { required: true, message: '排序不能为空，1-99的数字，越大轮播图越靠前'},
                { type: 'number', min: 0,max: 99,message: '排序必须为数字值,0-99的数字，越大轮播图越靠前', trigger: ['blur','change']}
              ]"
            >
              <el-input v-model.number="form.number" type="number" style="width:80px" min="0" max="99" />

            </el-form-item>
            <el-form-item label="是否显示">
              <el-switch v-model="form.state" />
            </el-form-item>
            <div class="button">
              <el-button v-if="Upload" type="primary" @click="onSubmit('form')">立即添加</el-button>
              <el-button v-if="Image" type="primary" @click="Updateform('form')">保存修改</el-button>
              <el-button @click="closeForm">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: 'BannerFormModule',
    props: {
        formData: {
            default: null,
            type: Object
        },
        mask: {
            default: false,
            type: Boolean
        }
    },
    data() {
        return {
            msg: '',
            form: {
                id: null,
                name: '',
                src: '',
                link: '',
                number: 0,
                state: true
            },
            fileList: [],
            alertShow: false,
            // 控制表单上传时显示上传图片还是编辑时直接显示图片
            Upload: true,
            Image: false,
            label: '选择图片',
            AppMainHeight: '',
            AppMainWidth: '',
            BodyHeight: '',
            BodyWidth: ''

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

    },
    created() {
        this.BodyWidth = document.body.offsetWidth
        this.BodyHeight = document.body.offsetHeight
        this.AppMainWidth = document.getElementById('AppMain').offsetWidth
        this.AppMainHeight = document.getElementById('AppMain').offsetHeight

        window.addEventListener('resize', () => {
            return (() => {
                this.BodyWidth = document.body.offsetWidth
                this.BodyHeight = document.body.offsetHeight
                this.AppMainWidth = document.getElementById('AppMain').offsetWidth
                this.AppMainHeight = document.getElementById('AppMain').offsetHeight
                console.log(this.AppMainWidth)
            })()
        })
    },
    mounted() {
        // 判断父组件是否传值
        if (Object.keys(this.formData).length > 0) {
            console.log(Object.keys(this.formData))
            console.log('有传值，编辑表单')
            this.Upload = false
            this.Image = true
            this.label = '轮播图'
            this.form = this.formData
            console.log(this.form)
        }
    },
    methods: {
        closeForm() {
            console.log('closeForm')
            this.$emit('closeForm')
        },
        onSubmit(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    console.log(valid)
                    console.log(this.form)
                    console.log(typeof this.form.src)
                    console.log(this.form.src.length)
                    if (typeof this.form.src === 'string' && this.form.src.length !== 0) {
                        // 触发父组件的getAndUploadForm提交表单事件
                        this.$emit('uploadForm', this.form)
                        console.log(this.form)
                    } else {
                        this.$myalert({ msg: '请上传图片' })
                        return false
                    }
                } else {
                    return false
                }
            })
        },
        Updateform(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    console.log(valid)
                    console.log(this.form)
                    console.log(typeof this.form.src)
                    if (typeof this.form.src === 'string' && this.form.src.length !== 0) {
                        // 触发父组件的getAndUploadForm提交表单事件
                        this.$emit('updateForm', this.form)
                        console.log(this.form)
                    } else {
                        this.$myalert({ msg: '请上传图片' })
                        return false
                    }
                } else {
                    // console.log(this.$refs[form])
                    // this.$myalert({ msg: '请填写完整表单' }).then(() => {
                    //     console.log('确定关闭')
                    // }).catch(() => {
                    //     console.log('alert出错')
                    // })
                    return false
                }
            })
        },
        imgChange(file, fileList) {
            const isJPG = file.raw.type === 'image/jpeg'
            const isPNG = file.raw.type === 'image/png'
            const isLt2M = file.raw.size / 1024 / 1024 < 0.5
            this.hideUploadIcon = fileList.length >= 1
            if (!isPNG && !isJPG) {
                this.$message.error('上传图片只能是 JPG/PNG 格式!')
                return false
            } else if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 200kb!')
                return false
            } else if (isLt2M && (isPNG || isJPG)) {
                this.form.img = file// 图片
            }
        },
        removeImg() {
            this.form.img = ''
        },
        // 图片上传成功回调函数
        imgUploadSuccess(response, file, fileList) {
            console.log('图片上传结果:' + response)
            this.form.src = response
        },
        // 图片上传失败回调函数
        imgUploadError(error) {
            console.log(error)
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
  transition: all 0.3s
}
.app{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 999;
}
.app-container{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}

.mask{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.103);
  z-index: 999;
}
.formbox{
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  z-index: 10000;
}
.BannerForm{
  align-self:flex-start;
  margin-top: 100px;
  background-color: #fff;
  padding: 50px;
  border: 1px solid rgb(161, 161, 161);

}
.bitian{
  color: red;
  display: inline-block;
}
.button{
  display: flex;
  justify-content: space-evenly;
}
</style>
