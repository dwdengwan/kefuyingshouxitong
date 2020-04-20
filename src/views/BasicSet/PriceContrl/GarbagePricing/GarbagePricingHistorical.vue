<template>
  <!-- 垃圾费定价历史查询 模块 -->
  <div class="GarbagePricingHistorical">
      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="tableQuery" class="demo-form-inline">

          <el-form-item class="form-left">
            <el-form-item label='修改时间：'>
                <el-date-picker
                    v-model="tableQuery.billTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="模糊查询：" class="searchInput">
              <el-tooltip class="item" effect="dark" content="用户编号、用户地址、修改人" placement="top">
                <el-input v-model="tableQuery.fuzzyQuery" clearable size="mini"></el-input>
              </el-tooltip>
            </el-form-item>

            <el-form-item>
              <el-button class="searchBtn" icon="el-icon-search" @click="search"></el-button>
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>
      <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="tableList.list" class="change-tables-table">

            <el-table-column type="index" label="NO." width="50" fixed="left">
            </el-table-column>

            <el-table-column prop="state" min-width="60" label="用户编号">
            </el-table-column>

            <el-table-column prop="engineeringState" min-width="100" label="用户名称">
            </el-table-column>

            <el-table-column prop="handleName" min-width="100" label="用户地址">
            </el-table-column>

            <el-table-column prop="connect3" min-width="100" label="用水类型">
            </el-table-column>

            <el-table-column prop="connect2" min-width="100" label="变更事项">
            </el-table-column>
            
            <el-table-column prop="connect1" min-width="60" label="修改人">
            </el-table-column>

            <el-table-column prop="engineeringState" min-width="100" label="修改时间">
            </el-table-column>

            <el-table-column prop="connect4" min-width="100" label="说明">
            </el-table-column>



        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="tableList.total">
          </el-pagination>
        </div>
      </div>

  </div>
</template>
<script>
export default {
  name: "GarbagePricingHistorical",
  data() {
    return {
      tableEdit: false,
      activeName: 'EngineeringAccountOpening',
      indexShow: true,
      crumbsData: {  //面包屑
        titleList: [
          { title: '收费管理' },
          { title: '账务调整' },
          { title: '代收支付关闭' },
        ],
      },
      //审批状态下拉框
      approvalStatusOptions: [
        { value: '1', label: '全部' },
        { value: '2', label: '正常' },
        { value: '3', label: '非正常' },
      ],
      tableQuery: {
        page:1,
        pageCount:20,
        // beginDate:billTime[0],
        // endDate:billTime[1],
        fuzzyQuery: "",
        status: '1',
        billTime:'',
      },
      tableShow: false,
      maxHeight: 0,
      tableList: {
        list: [
          {
          },
        ]
      },
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
    }
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, '.GarbagePricingHistorical .kl-table', ['.GarbagePricingHistorical .toolbar', '.GarbagePricingHistorical .block', '.GarbagePricingHistorical .bread-contain'])
  },
  methods: {
    init() {
      let _this = this
      let params = {
        "busicode": "OpenUserList",
        "data": _this.tableQuery,
      }
    },
    search() {  //查询
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
    //   开户
    add() {
      this.indexShow = false;
    },

    closeDialog() { //关闭会话
      this.TransferDetailsVisible = false;
      this.indexShow = true;
      // this.crumbsData.titleList.pop();
      this.init()
    },
    //弹出框
    submit(formName) {	//提交
      this.$refs.childWaterEditor.submit()
    },
    // 编辑
    edit(val) {
      this.indexShow = false;
    },
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
.GarbagePricingHistorical {
  width: 100%;
  height: 100%;
}
</style>
