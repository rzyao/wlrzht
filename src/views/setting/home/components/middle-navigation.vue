<template>
  <div class="app-container">
    <!-- 轮播图添加按钮，点击弹出表单 -->
    <el-button type="primary" @click="addNavigation">添加导航</el-button>
    <transition name="transition">
      <!-- 轮播图添加表单 -->
      <!-- <div v-if="mask == true" class="formbox" :style="{height:appHeight ,width:appWidth}" @click="closeForm"> -->
      <!-- <div class="form" @click="StopResetMask"> -->
      <!-- 二次封装表单组件 -->
      <banner-form-module v-if="mask" :mask="mask" :form-data="formData" @uploadForm="UploadForm" @updateForm="updateForm" @closeForm="closeForm">表单组件</banner-form-module>
      <!-- </div> -->
      <!-- </div> -->
    </transition>

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
        align="center"
      />
      <el-table-column
        prop="name"
        label="名称"
        width="150"
        align="center"
      />
      <el-table-column
        prop="link_src"
        label="导航地址"
      />
      <el-table-column
        label="图片"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-image :src="scope.row.src" style="width: 50px;height:50px ;" />
        </template>
      </el-table-column>
      <el-table-column
        prop="creat_time"
        label="添加时间"
        width="180"
      />
      <el-table-column
        prop="state"
        label="状态"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state == true" size="medium" type="success">正常</el-tag>
          <el-tag v-if="scope.row.state == false" size="medium" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="small "
            type="primary"
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
  </div>
</template>

<script>
import { DeleteNavigation } from '@/api/setting/home'
import { UploadNavigation, GetNavigation, UpdateNavigation } from '@/api/setting/home'
import { Loading } from 'element-ui'
import BannerFormModule from '@/views/setting/home/components/form/BannerFormModule.vue'
export default {
    name: 'MiddleNavigation',
    components: {
        'banner-form-module': BannerFormModule
    },
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
            AppMainHeight: '',
            // 编辑表单传值
            formData: {},
            refresh: true
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
        window.addEventListener('resize', () => {
            return (() => {
                this.AppMainWidth = document.getElementById('AppMain').offsetWidth
                this.AppMainHeight = document.getElementById('AppMain').offsetHeight
            })()
        })
    },
    methods: {
        updateIframe() {
            this.$emit('refreshIframe')
        },
        handleDelete(index, row) {
            this.$myalert({ msg: '确定删除这个轮播图吗' }).then(() => {
                DeleteNavigation(row).then(response => {
                    console.log(response)
                    this.$message({
                        message: response.message,
                        type: 'success'
                    })
                    this.updateIframe()
                    this.fetchData()
                })
            })
        },
        handleEdit(index, row) {
            console.log(row)
            this.formData = row
            this.mask = true
            console.log(this.formData)
        },
        fetchData() {
            const loading = Loading.service({ })
            console.log('this.loading')
            GetNavigation().then(response => {
                console.log(response.data)
                console.log('GetNavigation.response.data')
                for (var i = 0; i < response.data.length; i++) {
                    response.data[i]['number'] = Number(response.data[i]['number'])
                    if (response.data[i]['state'] === 'true') {
                        response.data[i]['state'] = true
                    } else {
                        response.data[i]['state'] = false
                    }
                }
                this.tableData = response.data
                console.log('this.tableData')
                console.log(this.tableData)
                loading.close()
            })
        },
        handleClick(tab, event) {
            console.log(tab, event)
            console.log(process.env.VUE_APP_BASE_API)
        },
        addNavigation() {
            console.log(this)
            this.mask = true
            console.log(this.mask)
        },
        closeForm() {
            this.formData = {}
            console.log('closeForm')
            this.mask = false
        },
        StopResetMask(e) {
            e.stopPropagation()
        },
        UploadForm(data) {
            this.form = data
            console.log(this.form)
            const loading = Loading.service({ })
            UploadNavigation(this.form).then(Response => {
                const message = Response.message
                this.$message({
                    message: message,
                    type: 'success'
                })
                this.closeForm()
                this.updateIframe()
                setTimeout(() => {
                    this.fetchData()
                }, 300)
            })
        },
        updateForm(data) {
            this.form = data
            console.log('updateForm')
            const loading = Loading.service({ })
            UpdateNavigation(this.form).then(Response => {
                const message = Response.message
                this.$message({
                    message: message,
                    type: 'success'
                })
                this.closeForm()
                this.updateIframe()
                setTimeout(() => {
                    this.fetchData()
                }, 300)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
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
  display: flex;
  justify-content: center;
}

.el-tab-pane{
  width: 100%;
}
.el-table{
    width: 100%;
    height: calc(100vh - 195px);;
}
.el-table{
    width: 100%;
    height: calc(100vh - 198px);
}
</style>
