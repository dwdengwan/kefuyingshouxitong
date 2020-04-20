


<template>

  <div class="WaterUseOverTheYears">

    <div class="toolbar">
      <el-form :inline="true" :model="tableQuery" class="demo-form-inline">

        <el-form-item class="form-left">
          <el-form-item label='账期：'>
            <el-date-picker v-model="DateChoosevalue" value-format="yyyyMM" :picker-options="pickerOptions" clearable type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
            </el-date-picker>
          </el-form-item>

          <el-form-item>

            <el-button size="mini" class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
          </el-form-item>

        </el-form-item>
      </el-form>
    </div>
    <div class="kl-table">
      <el-table stripe border :data="tableData.list" class="change-tables-table">

        <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
        </el-table-column>

        <el-table-column prop="accountPeriod" min-width="80" label="账期">
        </el-table-column>

        <el-table-column prop="meterReadingDate" min-width="120" label="抄表日期">
        </el-table-column>

        <el-table-column prop="priorPeriodNum" min-width="100" label="上期抄码">
        </el-table-column>

        <el-table-column prop="currendPeriodNum" min-width="80" label="本期抄码">
        </el-table-column>

        <el-table-column prop="realityWater" min-width="80" label="计费水量">
        </el-table-column>

        <el-table-column prop="synthesizePrice" min-width="80" label="综合单价">
        </el-table-column>

        <el-table-column prop="receivableMoney" min-width="80" label="应收金额">
        </el-table-column>

        <el-table-column prop="receivablePenaltyMoney" min-width="100" label="应收违约金">
        </el-table-column>

        <el-table-column prop="factoryName" min-width="80" label="应收合计">
        </el-table-column>

        <el-table-column prop="receivableTotal" min-width="80" label="是否核销">
        </el-table-column>

        <el-table-column prop="chargingTime" min-width="100" label="收费时间">
        </el-table-column>

        <el-table-column prop="chargingStaff" min-width="80" label="收费员">
        </el-table-column>

        <el-table-column prop="comments" min-width="100" label="备注">
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
  name: "WaterUseOverTheYears",
  props: ['WaterUseOverTheYearsData'],
  data() {
    return {
      crumbsData: {  //面包屑
        titleList: [
          { title: '财务中心', path: '/WaterUseOverTheYears' },
          { title: '票据管理', method: () => { window.histroy.back() } }
        ],

      },
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
      WaterUseOverTheYearsVisible: false,  //综合查询的显示和隐藏
      WaterUseOverTheYearsName: '发票领用-领用',
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
      console.log(this.WaterUseOverTheYearsData.userNo, this.DateChoosevalue);
      if (this.DateChoosevalue == null) {
        this.tableQuery.beginDate = '';
        this.tableQuery.endDate = '';
      } else {
        this.tableQuery.beginDate = this.DateChoosevalue[0];
        this.tableQuery.endDate = this.DateChoosevalue[1];
      }
      console.log(this.tableQuery);
      let _this = this
      let data = _this.tableQuery
      _this.tableQuery.userNo = _this.WaterUseOverTheYearsData.userNo;
      let params = {
        "busicode": "ChargeInfoList",
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
      //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      return (this.tableData.pageSize - 20) * this.tableData.pages + (index + 1);

    },
    closeDialog() { //关闭会话
      this.WaterUseOverTheYearsVisible = false;
      this.backfillVisible = false;
      this.init()
    },
    //弹出框
    submit(formName) {	//提交
      this.$refs.childWaterUseOverTheYears.submit()
      // this.WaterUseOverTheYearsVisible = false;
    },
    add() {
      this.WaterUseOverTheYearsVisible = true;
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
.WaterUseOverTheYears {
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

 