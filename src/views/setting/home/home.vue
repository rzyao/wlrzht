<template>
  <div class="app-container">
    <!-- 遮罩层 -->
    <transition name="transition">
      <div v-if="mask == true" class="mask" />
    </transition>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="顶部轮播图" name="first">
        <!-- 轮播图添加按钮，点击弹出表单 -->
        <el-button type="primary" @click="changemask">添加轮播图</el-button>
        <transition name="transition">
          <!-- 轮播图添加表单 -->
          <div v-if="mask == true" class="formbox" @click="ResetMask">
            <div class="form" @click="StopResetMask">
              <!-- 二次封装组件 -->
              <banner-form @sonform="getForm">表单组件</banner-form>
              <!-- <el-form ref="form" :model="form" label-width="80px" label-position="left">
                <el-form-item label="名称">
                  <el-input v-model="form.name" style="width:200px" />
                  <div class="bitian">*必填</div>
                </el-form-item>
                <el-form-item label="选择图片">
                  <el-button>选择图片</el-button>
                  <el-input v-model="form.img64" style="width:100px" />
                  <div class="bitian">*必填</div>
                </el-form-item>
                <el-form-item label="跳转链接">
                  <el-input v-model="form.link" style="width:200px" />
                </el-form-item>
                <el-form-item label="排序">
                  <el-input v-model="form.number" style="width:200px" />
                  <div class="bitian">*必填</div>
                </el-form-item>
                <el-form-item label="是否显示">
                  <el-switch v-model="form.state" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">立即添加</el-button>
                  <el-button @click="ResetMask">取消</el-button>
                </el-form-item>
              </el-form> -->
            </div>
          </div></transition>

        <!-- 中部显示轮播图信息 -->
        <el-table
          :data="tableData"
          height="250"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="number"
            label="排序"
            width="100"
          />
          <el-table-column
            prop="name"
            label="名称"
            width="180"
          />
          <el-table-column
            prop="address"
            label="链接地址"
            width="180"
          />
          <el-table-column
            prop="image"
            label="图片"
            width="400"
          />
          <el-table-column
            prop="lasttime"
            label="最后操作时间"
            width="180"
          />
          <el-table-column
            prop="state"
            label="状态"
            width="180"
          />
          <el-table-column
            prop="edit"
            label="操作"
            width="180"
          />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="底部导航" name="second">底部导航</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  name: '',
  data() {
    return {
      activeName: 'first',
      msg: '',
      mask: false, // 遮罩层
      // form表单数据
      form: {
        name: '',
        img64: '',
        link: '',
        number: '',
        state: ''
      }
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
      console.log(process.env.VUE_APP_BASE_API)
    },
    changemask() {
      console.log(this)
      this.mask = true
      console.log(this.mask)
    },
    ResetMask() {
      this.mask = false
    },
    StopResetMask(e) {
      e.stopPropagation()
    },
    getForm(data) {
      this.msg = data
      console.log(this.msg)
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
  transition: all 0.2s
}
.mask{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.103);
}
.formbox{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form{
  width: 600px;
  background-color: #fff;
  padding-top: 20px;
  padding-left: 100px;
  padding-right: 40px;
  border: 1px solid rgb(161, 161, 161);
}

</style>
