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
          action="#"
          :on-remove="removeImg"
          list-type="picture"
          :auto-upload="false"
          :on-change="imgChange"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>

          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <!-- <el-button>选择图片</el-button>
        <el-input v-model="form.img64" style="width:200px" />
         -->
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
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即添加</el-button>
        <el-button @click="resetMask">取消</el-button>
      </el-form-item>
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
        img: '',
        link: '',
        number: 0,
        state: ''
      },
      fileList: []
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
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.$emit('sonform', this.form)
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
    }
  }
}
</script>

<style scoped>
.bitian{
  color: red;
  display: inline-block;
}
</style>
