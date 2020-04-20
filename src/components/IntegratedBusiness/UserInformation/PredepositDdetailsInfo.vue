
<template>

  <div class="PredepositDdetailsInfo">

    <div class="toolbar">

      <el-form :inline="true" :model="tableQuery" class="demo-form-inline">

        <el-form-item class="form-left">
          <el-form-item label='账期：'>
            <el-date-picker v-model="DateChoosevalue" value-format="yyyyMM" :picker-options="pickerOptions" clearable type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="用户编号：">
            <el-input v-model="tableQuery.userNo" placeholder="" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button size="mini" class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
          </el-form-item>

        </el-form-item>

        <el-form-item class="form-right">
          <!-- <el-button @click="exportExcel" icon="el-icon-upload2" size="mini" type="primary">导出</el-button> -->

        </el-form-item>
      </el-form>
    </div>
    <div class="kl-table">
      <el-table stripe border :data="tableData.list" class="change-tables-table">

        <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
        </el-table-column>

        <el-table-column prop="payTime" min-width="150" label="收款时间">
        </el-table-column>

        <!-- <el-table-column prop="daytime" min-width="100" label="票据号">
        </el-table-column> -->

        <el-table-column prop="comments" min-width="200" label="摘要">
        </el-table-column>

        <el-table-column prop="payMoney" min-width="80" label="收费金额">
        </el-table-column>

        <el-table-column prop="currendPeriodMoney" min-width="100" label="本期余额">
        </el-table-column>

        <el-table-column prop="chargingStaff" min-width="200" label="收款员">
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
  name: "PredepositDdetailsInfo",
  props: ['PredepositDdetailsInfoData'],
  data() {
    return {
      tableQuery: {
        page: 1,
        pageCount: 20,
        userNo: "",
        beginDate: "",
        endDate: ""
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
      tableData: {

      },
      PredepositDdetailsInfoVisible: false,  //综合查询的显示和隐藏
      PredepositDdetailsInfoName: '发票领用-领用',
      ruleFormData: {},

    }
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, '.PredepositDdetailsInfo .blocks-info-right', ['.blocks-info .table-top'])
    })
  },
  methods: {
    init() {
      if (this.DateChoosevalue == null) {
        this.tableQuery.beginDate = '';
        this.tableQuery.endDate = '';
      } else {
        this.tableQuery.beginDate = this.DateChoosevalue[0];
        this.tableQuery.endDate = this.DateChoosevalue[1];
      }
      let _this = this
      let data = _this.tableQuery
      _this.tableQuery.userNo = _this.PredepositDdetailsInfoData.userNo;
      let params = {
        "busicode": "AccountFlowList",
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
      //   	let listData = {}
      //   	this.tableQuery.pageCount = this.historyData.total ===0? 20:this.historyData.total
      //     let params ={
      //       "busicode":"MeterReadingList",
      //       "data": this.tableQuery
      //     }
      //     this.$api.fetch({
      //       apiUrl: 'interface.api',//路径
      //       method: 'post',//请求方法
      //       params:params,//参数
      //       needErrorCallback:true
      //     }).then(res =>{
      //     	if(res.code===0){
      //         listData = res.data
      //         if (!listData.list[0]) {
      //         		this.$notify({
      //               title: '警告',
      //               message:'表格没有相关数据',
      //               type: 'error'
      //             })
      //         	} else {
      //         		import('@/vendor/Export2Excel').then(excel => {
      // 			        const tHeader = ['水表编号', '抄表日期', '所属小区','厂家编号','厂家','型号', '当日读数', '修正读数', '当日水量', '数据状态',  '用户编号','集中器编号','用户地址']
      // 			        const filterVal = ['code', 'daytime', 'areaName','fcode','factoryName','model','lvalue', 'fixValue','flux', 'status', 'usn', 'concentrator', 'position']
      // 			        const list = listData.list
      // 			        const data = this.formatJson(filterVal, list)
      // 			        excel.export_json_to_excel({
      // 			          header: tHeader,
      // 			          data,
      // 			          filename: this.tableQuery.daytime + '抄表数据',
      // 			          autoWidth: '100'
      // 			        })
      // 			      })
      //         		this.tableQuery.pageCount = 20
      //         	}
      //       }
      //     })
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
      this.PredepositDdetailsInfoVisible = false;
      this.backfillVisible = false;
      this.init()
    },
    //弹出框
    submit(formName) {	//提交
      this.$refs.childPredepositDdetailsInfo.submit()
      // this.PredepositDdetailsInfoVisible = false;
    },
    add() {
      this.PredepositDdetailsInfoVisible = true;
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
.PredepositDdetailsInfo {
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
  .el-date-editor .el-range__icon,
  .el-date-editor .el-range-separator {
    line-height: 22px;
  }
}
</style>
