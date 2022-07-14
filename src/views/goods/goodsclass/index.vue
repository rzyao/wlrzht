<template>
  <div class="app-container">
    <el-table
      class="el-table"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        fixed
        prop="id"
        label="ID"
        width="150"
      />
      <el-table-column
        fixed
        prop="name"
        label="类目"
        width="150"
      />
      <el-table-column
        prop="time"
        label="添加时间"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            tableData: [],
            goodClass: [{
                id: 1,
                time: '2016-05-02',
                name: '运动鞋'
            }]
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style scoped>
.el-table{
  height: calc(100vh - 145px);
 max-height: calc(100vh - 145px);
}
</style>
