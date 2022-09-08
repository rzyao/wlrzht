<template>
  <div class="app">
    <el-button @click="click">弹窗</el-button>
    <div class="app-concent">
      <el-table
        class="el-table"
        :data="tableData"
        border
        style="width: 100%"
        :row-style="{'max-height':'60px'}"
      >
        <el-table-column
          fixed
          prop="create_time"
          label="创建日期"
          width="180"
        />
        <el-table-column
          prop="title"
          label="商品标题"
        />
        <el-table-column
          prop="class"
          label="商品分类"
          width="80"
        />
        <el-table-column
          prop="sales"
          label="销量"
          width="80"
        />
        <el-table-column
          prop="userid"
          label="所属商家"
          width="80"
        />
        <el-table-column
          prop="state"
          label="状态"
          width="120"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.state == '出售中'"
              :key="scope.row.id"
              type="success"
            >
              {{ scope.row.state }}
            </el-tag>
            <el-tag
              v-if="scope.row.state == '已下架'"
              :key="scope.row.id"
              type="info"
            >
              {{ scope.row.state }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="changeStateToNormal(scope.row.id)">上架</el-button>
            <el-button type="text" size="small" @click="changeStateToDisable(scope.row.id)">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom">
      <div class="block">
        <el-pagination
          :key="currentPage"
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsList, changeGoodState } from '@/api/goods/getgoodslist'
export default {

    data() {
        return {
            total: 0,
            tableData: [],
            currentPage: 1
        }
    },
    mounted() {
        this.getGoodsInfo()
    },
    methods: {
        click() {
            this.$myalert({ msg: '提示信息' }).then(() => {
                console.log('点击了确定')
            })
        },
        changeStateToDisable(id) {
            const paramas = {
                id: id,
                state: 1
            }
            changeGoodState(paramas).then(res => {
                if (res) {
                    this.getGoodsInfo()
                }
            })
        },
        changeStateToNormal(id) {
            const paramas = {
                id: id,
                state: 0
            }
            changeGoodState(paramas).then(res => {
                if (res) {
                    this.getGoodsInfo()
                }
            })
        },
        handleSizeChange() {
            this.getGoodsInfo()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.currentPage = val
            this.getGoodsInfo()
        },
        handleClick(row) {
            console.log(row)
        },
        getGoodsInfo() {
            getGoodsList(this.currentPage).then((res) => {
                // 打印结果
                console.log(res)
                this.total = Number(res.data.num)
                this.tableData = res.data.data
            })
        }
    }
}
</script>

<style scoped lang="scss">
.el-table{
  height: calc(100vh - 145px);
 max-height: calc(100vh - 145px);
}
.app{
width: 100%;
height: 100%;
flex-direction: column;
display: flex;
justify-content: center;
align-items: center;
    .app-concent{
    width: 98%;
    max-height: calc(100vh - 145px);
    }
    .bottom{
      width: 98%;
      .block{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
      }
    }
}
</style>
