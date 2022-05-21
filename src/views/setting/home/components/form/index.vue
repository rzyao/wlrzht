<template>
  <div class="BannerForm">
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
      <el-form-item label="选择图片">
        <el-upload
          class="upload"
          action="https://www.htqq.sale/wlrz/temporary/imgstore.php"
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
        <el-input v-model.number="form.number" type="number" style="width:80px" />

      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch v-model="form.state" />
      </el-form-item>
      <div class="button">
        <el-button type="primary" @click="onSubmit('form')">立即添加</el-button>
        <el-button @click="resetMask">取消</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
    name: 'BannerForm',
    data() {
        return {
            msg: '',
            form: {
                name: '',
                src: '',
                link: '',
                number: 0,
                state: true
            },
            fileList: [],
            alertShow: false
        }
    },
    mounted() {

    },
    methods: {
        resetMask() {
            console.log('resetMask')
            this.$emit('resetMask')
        },
        onSubmit(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    console.log(valid)
                    console.log(this.form)
                    console.log(typeof this.form.src)
                    if (typeof this.form.src === 'string' && this.form.src.length !== 0) {
                        // 触发父组件的getAndUploadForm提交表单事件
                        this.$emit('sonform', this.form)
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
.bitian{
  color: red;
  display: inline-block;
}
.button{
  display: flex;
  justify-content: space-evenly;
}
</style>
