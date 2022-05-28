<template>
  <div class="app-container">
    <transition name="transition">
      <!-- 二次封装表单组件 -->
      <one-three-form v-if="mask" :mask="mask" :form-data="formData" @UpdateOneThree="UpdateForm" @closeForm="closeForm">表单组件</one-three-form>
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
        prop="size"
        label="图片规格"
        width="150"
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
        label="跳转链接"
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
        label="修改时间"
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
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { UpdateOneThree, GetOneThree } from '@/api/setting/home'
import { Loading } from 'element-ui'
import OneThreeForm from '@/views/setting/home/components/onethree/OneThreeForm.vue'
export default {
    name: 'OneThree',
    components: {
        'one-three-form': OneThreeForm
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
                state: '',
                size: ''
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
        handleEdit(index, row) {
            console.log(row)
            this.formData = row
            this.mask = true
            console.log(this.formData)
        },
        fetchData() {
            const loading = Loading.service({ })
            console.log('this.loading')
            GetOneThree().then(response => {
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
                loading.close()
            })
        },
        handleClick(tab, event) {

        },
        addNavigation() {
            this.mask = true
        },
        closeForm() {
            this.formData = {}
            console.log('closeForm')
            this.mask = false
        },
        StopResetMask(e) {
            e.stopPropagation()
        },
        UpdateForm(data) {
            this.form = data
            console.log('  UpdateForm(data) {')
            console.log(this.form)
            const loading = Loading.service({ })
            UpdateOneThree(this.form).then(Response => {
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
