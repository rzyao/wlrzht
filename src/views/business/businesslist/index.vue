<template>
  <div class="app-container">
    <el-button
      size="medium "
      type="primary"
      style="margin-top: 10px;margin-left:20px ;"
      @click="addUser()"
    >新增商家</el-button>
    <business-form
      :visible="visible"
      background="AppMain"
      :action="action"
      :propsform="toChildForm"
      @UpdateForm="UpdateForm"
      @UploadForm="UploadForm"
      @CloseForm="CloseBusinessForm"
    />
    <el-table
      class="el-table"
      :data="tableData"
      height="string"
      border
      stripe
      style="width: auto;"
    >
      <el-table-column
        label="账号"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户名"
        width="120"
        align="center"
        prop="name"
      />
      <el-table-column
        label="数据统计"
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
          <el-tag v-if="scope.row.state == true" size="medium" type="success">正常</el-tag>
          <el-tag v-if="scope.row.state == false" size="medium" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="商家权限"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.roles }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
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
import BusinessForm from '@/views/business/businesslist/BusinessForm.vue'
import { getBusinessInfo, addBusiness, deleteBusiness, updateBusiness } from '@/api/business'
export default {
    name: 'Adminlist',
    components: {
        'business-form': BusinessForm
    },
    data() {
        return {
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,
            // 控制表单显示隐藏，默认为隐藏
            visible: false,
            // 控制表单打开时，新增还是编辑,'add'是新增，'edit'是编辑
            action: 'add',
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
            this.tableData = []
            getBusinessInfo().then(response => {
                this.tableData = response.data
                console.log(this.tableData)
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
        },
        // 打开表单添加用户
        addUser() {
            this.action = 'add'
            this.visible = true
        },
        // 添加管理员账户上传后台
        UploadForm(form) {
            this.form = form
            addBusiness(this.form).then(response => {
                const message = response.message
                this.$message({
                    message: message,
                    type: 'success'
                })
                this.fetchData()
                this.visible = false
            })
        },
        handleEdit(index, row) {
            console.log(row)
            const newform = {
                id: row.id,
                name: row.name,
                current_time: row.current_time,
                state: row.state,
                password: row.password
            }
            this.toChildForm = newform
            this.action = 'edit'
            this.visible = true
        },
        CloseBusinessForm() {
            this.toChildForm = {}
            this.visible = false
        },
        UpdateForm(form) {
            this.form = form
            if (this.form.password === undefined) {
                this.form.password = 'undefined'
            }
            updateBusiness(this.form).then(response => {
                const message = response.message
                this.$message({
                    message: message,
                    type: 'success'
                })
                this.visible = false
                this.fetchData()
            })
        },
        handleDelete(index, row) {
            console.log(index)
            console.log(row)
            this.$myalert({ msg: '确定删除这个商家吗' }).then(() => {
                deleteBusiness(row).then(response => {
                    const message = response.message
                    this.$message({
                        message: message,
                        type: 'success'
                    })
                    this.visible = false
                    this.fetchData()
                })
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
