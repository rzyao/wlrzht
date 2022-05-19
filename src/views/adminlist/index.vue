<template>
  <div id="adminlist" class="app-container">
    <el-button
      size="medium "
      type="primary"
      style="margin-top: 10px;margin-left:20px ;"
      @click="addUser()"
    >新增用户</el-button>
    <admin-form :mask="mask" @sonform="getAndUploadForm" @resetMask="ResetMask" />
    <show-form :mask="visible" :propsform="toChildForm" @updateform="updateForm" @resetMask="closeShowForm" />
    <el-table
      :data="tableData"
      height="string"
      border
      stripe
      style="width: auto;"
      class="el-table"
    >
      <el-table-column
        label="账号"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户名"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="身份"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.identity }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.state }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="权限"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.roles }}</span>
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
    <div class="block">
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { addadmin, getAdminList, deleteInfo, updateAdmin } from '@/api/adminlist'
import { Loading } from 'element-ui'
export default {
    name: 'Adminlist',
    data() {
        return {
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,
            // 控制输入表单关闭
            mask: false,
            visible: false,
            // 请求的表单数据
            form: [],
            // 获取到的用户列表
            tableData: [],
            // 传递给表单组件的数据
            toChildForm: {}
        }
    },
    created() {
        this.fetchData()
    },
    mounted() {

    },
    methods: {
        fetchData() {
            const loading = Loading.service({ })
            console.log('this.loading')
            console.log(loading)
            getAdminList().then(response => {
                console.log(response.data)
                console.log('response.data')
                this.tableData = response.data
                loading.close()
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
        },
        ResetMask() {
            console.log(this.$props)
            this.mask = false
        },
        addUser() {
            this.mask = true
        },
        // 添加管理员账户
        getAndUploadForm(form) {
            this.form = form
            addadmin(this.form).then(response => {
                const message = response.message
                this.$message({
                    message: message,
                    type: 'success'
                })
                this.fetchData()
            })
            this.mask = false
        },
        handleEdit(index, row) {
            console.log(row)
            const newform = {
                id: row.username,
                name: row.nickname,
                identity: row.identity,
                state: row.state
            }
            this.toChildForm = newform
            this.visible = true
        },
        closeShowForm() {
            this.visible = false
        },
        updateForm(form) {
            this.form = form
            console.log(this.form)
            const loading = Loading.service({ })
            console.log('this.loading')
            console.log(loading)
            updateAdmin(this.form).then(response => {
                const message = response.message
                this.$message({
                    message: message,
                    type: 'success'
                })
                this.visible = false
                setTimeout(() => {
                    this.fetchData()
                }, 500)
            })
        },
        handleDelete(index, row) {
            console.log(index)
            console.log(row)
            deleteInfo(row).then(response => {
                const message = response.message
                this.$message({
                    message: message,
                    type: 'success'
                })
                this.visible = false
                this.fetchData()
            })
        }
    }
}
</script>

<style scoped>
.app-container{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
.el-table{
    width: 100%;
    height: calc(100vh - 216px);
    margin: 20px;
}
.block{
    float:right;
    margin-right: 40px;
}
</style>
