

<template>

  <div class="CustomerChanges">
    <div class="toolbar">
      <!-- <el-form :inline="true" :model="tableQuery" class="demo-form-inline">

        <el-form-item class="form-left">
          <el-form-item label="模糊查询：">
            <el-input v-model="tableQuery.fuzzyQuery" placeholder="" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button size="mini" class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
          </el-form-item>

        </el-form-item>
      </el-form> -->
    </div>
    <div class="kl-table">
      <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="tableData.list" class="change-tables-table">

        <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
        </el-table-column>

        <el-table-column prop="createTime" min-width="200" label="变动时间">
        </el-table-column>

        <el-table-column prop="changeItems" min-width="150" label="变动事项">
        </el-table-column>

        <!-- <el-table-column
                prop="lvalue"
                min-width="200"
                label="备注">
            </el-table-column> -->

        <el-table-column prop="createName" min-width="200" label="操作员">
        </el-table-column>

      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CustomerChanges",
  props:['CustomerChangesEditData'],
  data() {
    return {
      tableQuery: {
        page: 1,
        pageCount: 20,
        userNo: "",
      },
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      DateChoosevalue: [],
      tableShow: false,
      maxHeight: 0,
      tableData: {},
      CustomerChangesVisible: false,  //综合查询的显示和隐藏
      CustomerChangesName: '发票领用-领用',
      ruleFormData: {},

    }
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
    this.common.changeTable(this, '.water-meter-inquiry .kl-table', ['.water-meter-inquiry .toolbar', '.water-meter-inquiry .block', '.water-meter-inquiry #crumbs'])
  },
  methods: {
    init() {
      let _this = this
      let data = _this.tableQuery
      _this.tableQuery.userNo = _this.CustomerChangesEditData.userNo;
      let params = {
        "busicode": "UserInfoChgList",
        data,
      }
      _this.$api.fetch({
        params,//参数
      }).then(res => {
          _this.tableData = res;
      })
    },

    demand() {  //查询
      // this.tableQuery.page = 1
      // this.tableQuery.pageCount = 20
      this.init()
    },
    //   导出
    exportExcel() {
    },
    //分页
    handleSizeChange(val) { //显示多少数据一页
      this.tableQuery.pageCount = val
      this.tableQuery.page = 1
      this.init()
    },
    handleCurrentChange(val) {  //显示多少页码
      this.tableQuery.page = val
      this.init()
    },

    cellClick(row, column, cell, event) { //点击文件名
      let that = this;

    },
    indexMethod(index) {//获取表格序号
        return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;

    },
    closeDialog() { //关闭会话
      this.CustomerChangesVisible = false;
      this.backfillVisible = false;
      this.init()
    },
    //弹出框
    submit(formName) {	//提交
      this.$refs.childCustomerChanges.submit()
      // this.CustomerChangesVisible = false;
    },
    add() {
      this.CustomerChangesVisible = true;
    },
    edit() {

    }
  },
  watch: {
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
  }
}
</script>
<style lang="scss">
.CustomerChanges {
  width: 100%;
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 8px;
  }
  .kl-table {
    padding: 0px 20px;
    .block {
      text-align: right;
      padding: 10px 0px;
    }
  }
  .el-form--inline .el-form-item:first-of-type {
    margin-right: 0px;
  }
}
</style>
