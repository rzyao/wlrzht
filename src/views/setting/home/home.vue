<template>
  <div class="app-container">
    <!-- 遮罩层 -->
    <transition name="transition">
      <div v-if="mask == true" class="mask" />
    </transition>
    <div class="pane-left">
      <el-tabs v-model="activeName" style="width: 100%;" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="顶部轮播图" name="first" class="el-tab-pane">

          <!-- 轮播图添加按钮，点击弹出表单 -->
          <el-button type="primary" @click="changemask">添加轮播图</el-button>
          <transition name="transition">
            <!-- 轮播图添加表单 -->
            <div v-if="mask == true" class="formbox" :style="{height:appHeight ,width:appWidth}" @click="ResetMask">
              <div class="form" @click="StopResetMask">
                <!-- 二次封装表单组件 -->
                <banner-form v-if="mask == true" :form-data="formData" @sonform="getAndUploadForm" @Updateform="updateForm" @resetMask="ResetMask">表单组件</banner-form>
              </div>
            </div>
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
              label="链接地址"
            />
            <el-table-column
              label="图片"
              width="150"
              align="center"
            >
              <template slot-scope="scope">
                <el-image :src="scope.row.src" style="width: 100px;height:50px ;" />
              </template>
            </el-table-column>
            <el-table-column
              prop="creat_time"
              label="添加时间"
              width="180"
              align="center"
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

        </el-tab-pane>
        <el-tab-pane label="中部导航" name="second">
          <Middle-Navigation @refreshIframe="refreshIframe" />
        </el-tab-pane>
        <el-tab-pane label="一大三小广告图" name="third">
          <one-three @refreshIframe="refreshIframe" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="pane-right">
      <div class="iframe-box">
        <el-image :src="require('@/icons/phone.png')" style="height: 647px;width: 300px;position: absolute;pointer-events: none;" />
        <div class="iframe">
          <iframe v-if="refresh" id="iframe" width="286" height="590" src="https://www.htqq.sale/wlrz/h5/index.html" allowfullscreen="allowfullscreen" frameborder="0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteBanner } from '@/api/setting/home'
import { UploadBanner, getBannerList, UpdateBanner } from '@/api/setting/home'
import { Loading } from 'element-ui'
import MiddleNavigation from '@/views/setting/home/components/middle-navigation.vue'
import OneThree from '@/views/setting/home/components/onethree/OneThree.vue'
export default {
    name: '',
    components: {
        'Middle-Navigation': MiddleNavigation,
        'one-three': OneThree
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
    },
    methods: {
        handleDelete(index, row) {
            this.$myalert({ msg: '确定删除这个轮播图吗' }).then(() => {
                deleteBanner(row).then(response => {
                    console.log(response)
                    this.$message({
                        message: response.message,
                        type: 'success'
                    })
                    this.refreshIframe()
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
        refreshIframe() {
            this.refresh = false
            this.$nextTick(() => {
                this.refresh = true
            })
        },
        fetchData() {
            const loading = Loading.service({ })
            console.log('this.loading')
            getBannerList().then(response => {
                console.log(response.data)
                console.log('getBannerList.response.data')
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
        changemask() {
            console.log(this)
            this.mask = true
            console.log(this.mask)
        },
        ResetMask() {
            this.formData = {}
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
                this.ResetMask()
                this.refreshIframe()
                setTimeout(() => {
                    this.fetchData()
                }, 300)
            })
        },
        updateForm(data) {
            this.form = data
            console.log('updateForm')
            const loading = Loading.service({ })
            UpdateBanner(this.form).then(Response => {
                const message = Response.message
                this.$message({
                    message: message,
                    type: 'success'
                })
                this.ResetMask()
                this.refreshIframe()
                setTimeout(() => {
                    this.fetchData()
                }, 300)
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
  align-content: center;

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
.pane-left{
  display: inline-block;
  width: calc(100% - 350px);
  vertical-align:top;
}
.pane-right{
  width: 350px;
  height: calc(100vh - 210px);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align:top;
  .iframe-box{
      border-bottom-left-radius: 40px;
      border-bottom-right-radius: 40px;
      overflow: hidden;

      .iframe{
      margin: 0;
      margin-top: 37px;
      padding: 5px;
      border: 1px solid #000;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-content: center;
    }
}
}
.el-table{
    width: 100%;
    height: calc(100vh - 198px);
}

</style>
