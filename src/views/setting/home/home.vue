<template>
  <div class="app-container">
    <!-- 遮罩层 -->
    <transition name="transition">
      <div v-if="mask == true" class="mask" />
    </transition>
    <el-tabs v-model="activeName" style="width: 100%;" type="border-card" :stretch="true" @tab-click="handleClick">
      <el-tab-pane label="顶部轮播图" name="first" class="el-tab-pane">
        <!-- 轮播图添加按钮，点击弹出表单 -->
        <el-button type="primary" @click="changemask">添加轮播图</el-button>
        <transition name="transition">
          <!-- 轮播图添加表单 -->
          <div v-if="mask == true" class="formbox" :style="{height:appHeight ,width:appWidth}" @click="ResetMask">
            <div class="form" @click="StopResetMask">
              <!-- 二次封装表单组件 -->
              <banner-form @sonform="getAndUploadForm" @resetMask="ResetMask">表单组件</banner-form>
            </div>
          </div></transition>

        <!-- 中部显示轮播图信息 -->
        <el-table
          class="el-table"
          :data="tableData"
          height="el-table"
          border
          style="width: auto;"
        >
          <el-table-column
            prop="number"
            label="排序"
            width="80"
          />
          <el-table-column
            prop="name"
            label="名称"
            width="180"
          />
          <el-table-column
            prop="link_src"
            label="链接地址"
            width="180"
          />
          <el-table-column
            prop="url"
            label="图片"
          />
          <el-table-column
            prop="creat_time"
            label="添加时间"
            width="180"
          />
          <el-table-column
            prop="state"
            label="状态"
            width="180"
          />
          <el-table-column
            label="操作"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="small "
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="small "
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="底部导航" name="second">底部导航</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { UploadBanner, getBannerList } from '@/api/setting/home'
import { Loading } from 'element-ui'
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
                src: '',
                link: '',
                number: '',
                state: ''
            },
            tableData: [],
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
    created() {
        this.fetchData()
    },
    mounted() {
        this.AppMainWidth = document.getElementById('AppMain').offsetWidth
        this.AppMainHeight = document.getElementById('AppMain').offsetHeight
    },
    methods: {
        handleEdit(index, row) {
            console.log(row)
        },
        fetchData() {
            const loading = Loading.service({ })
            console.log('this.loading')
            getBannerList().then(response => {
                console.log(response.data)
                console.log('response.data')
                this.tableData = response.data
                loading.close()
            })
        },
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
            console.log('ResetMask')
            this.mask = false
        },
        StopResetMask(e) {
            e.stopPropagation()
        },
        getAndUploadForm(data) {
            this.form = data
            console.log(this.form)
            const loading = Loading.service({ })
            UploadBanner(this.form).then(Response => {
                const message = Response.message
                this.$message({
                    message: message,
                    type: 'success'
                })
                setTimeout(() => {
                    this.fetchData()
                }, 500)
            })
        }
    }
}
</script>

<style lang="less" scoped>
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
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.103);
}
.formbox{
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
}
.form{
  align-self:flex-start;
  margin-top: 100px;
  background-color: #fff;
  padding: 50px;
  border: 1px solid rgb(161, 161, 161);
}
.el-tab-pane{
  width: 100%;
}
.el-table{
    width: 100%;
    height: calc(100vh - 184px);;
    margin: 20px;
}

</style>
