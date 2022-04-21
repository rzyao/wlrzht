<template>
  <div class="BannerForm">
    <el-form ref="form" :model="form" label-width="80px" label-position="left">
      <el-form-item label="名称">
        <el-input v-model="form.name" style="width:200px" />
        <div class="bitian">*必填</div>
      </el-form-item>
      <el-form-item label="选择图片">
        <el-upload
          class="upload"
          action="#"
          :on-remove="removeImg"
          list-type="picture"
          :auto-upload="false"
          :on-change="imgChange"
          :http-request="uploadHttpRequest"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div class="bitian">*必填</div>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <!-- <el-button>选择图片</el-button>
        <el-input v-model="form.img64" style="width:200px" />
        <div class="bitian">*必填</div> -->
      </el-form-item>
      <el-form-item label="跳转链接">
        <el-input v-model="form.link" style="width:250px" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.number" style="width:50px" />
        <div class="bitian">*必填</div>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch v-model="form.state" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
        <el-button>取消</el-button>
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
        img64: '',
        link: '',
        number: '',
        state: ''
      },
      fileList: []
    }
  },
  mounted() {

  },
  methods: {
    onSubmit() {
      this.uploadHttpRequest()
      this.$emit('sonform', this.form)
      return (this.form)
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
        this.iconformData.img = file.raw// 图片的url
        this.iconformData.name = file.name// 图片的名字
      }
    },
    uploadHttpRequest(data) {
      console.log(data)
      const reader = new FileReader()
      const that = this
      reader.readAsText(data.file)
      reader.onload = function() {
        that.form.img64 = this.result
      }
    },
    removeImg() {
      this.form.img64 = ''
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
