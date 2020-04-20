<template>
  <div class="DailyReconciliation">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-if="DailyReEditVisible">
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        <el-button type="primary" size="mini">确认对账</el-button>
      </div>
    </div>
    <DailyReconciliationEdit v-if="DailyReEditVisible"> </DailyReconciliationEdit>

    <div v-else>
      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">

          <el-form-item class="form-left">

            <el-form-item label="收费日期：">
              <el-date-picker v-model="formData.con" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="对账状态：">
              <el-select clearable v-model="formData.subordinateDepartments" placeholder="全部">
                <el-option v-for="(item,index) in formData.subordinateDepartmentsOptions" :key="index" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
            </el-form-item>

          </el-form-item>

        </el-form>

      </div>
      <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" class="change-tables-table">

          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="date" min-width="100" label="收费日期">
          </el-table-column>

          <el-table-column prop="TotalCharge" min-width="100" label="收费总金额">
          </el-table-column>

          <el-table-column prop="card" min-width="100" label="刷卡/金额">

          </el-table-column>

          <el-table-column prop="transfer" min-width="100" label="转账/金额">
          </el-table-column>

          <el-table-column prop="check" min-width="100" label="支票/金额">
          </el-table-column>

          <el-table-column prop="cash" min-width="100" label="现金/金额">

          </el-table-column>

          <el-table-column prop="UnionPay" min-width="100" label="支付宝/金额">
          </el-table-column>

          <el-table-column prop="Wchat" min-width="80" label="微信/金额">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="80" label="对账状态">
          </el-table-column>

          <el-table-column label="操作" fixed="right" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click.native="details(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import DailyReconciliationEdit from "./DailyReconciliationEdit";
export default {
  name: "DailyReconciliation",
  components: {
    DailyReconciliationEdit
  },
  data() {
    return {
      crumbsData: {
        //面包屑
        titleList: [
          { title: "收费管理" },
          { title: "收款对账" },
          { title: "日收款对账" }
        ]
      },
      formData: {
        con: "",
        waterMeterType: "",
        waterMeterTypeOptions: [],
        waterMeterCaliber: "",
        waterMeterCaliberOptions: [],
        subordinateDepartments: "",
        subordinateDepartmentsOptions: [
          {
            name: "已对账",
            value: "1"
          },
          {
            name: "未对账",
            value: "2"
          }
        ]
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
      histroyData: {},
      DailyReEditVisible: false, //综合查询的显示和隐藏
      ruleFormData: {},
      PrintPayer: "",
      CombinedStrike: ""
    };
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, ".DailyReconciliation", [
      ".DailyReconciliation .toolbar",
      ".DailyReconciliation .block",
      ".DailyReconciliation #crumbs"
    ]);
  },
  methods: {
    init() {
      this.histroyData = {
        areaId: "",
        endRow: 5,
        hasNextPage: false,
        hasPreviousPage: false,
        isFirstPage: true,
        isLastPage: true,
        list: [
          {
            date: "2019-10-09",
            TotalCharge: "10000",
            card: "1000",
            transfer: "5000",
            check: "0",
            cash: "2000",
            UnionPay: "1000",
            Wchat: "1000",
            fixValue: "已对账"
          },

          {
            date: "2019-03-09",
            TotalCharge: "11000",
            card: "1000",
            transfer: "5000",
            check: "0",
            cash: "3000",
            UnionPay: "500",
            Wchat: "1500",
            fixValue: "已对账"
          },
          {
            date: "2019-10-09",
            TotalCharge: "10000",
            card: "1000",
            transfer: "5000",
            check: "0",
            cash: "2000",
            UnionPay: "1000",
            Wchat: "1000",
            fixValue: "未对账"
          }
        ],
        pageSize: 20,
        pages: 1,
        total: 5
      };
    },

    demand() {
      //查询
      // this.tableQuery.page = 1
      // this.tableQuery.pageCount = 20
      this.init();
    },
    //分页
    handleSizeChange(val) {
      //显示多少数据一页
      // this.tableQuery.pageCount = val
      // this.tableQuery.page = 1
      this.init();
    },
    handleCurrentChange(val) {
      //显示多少页码
      // this.tableQuery.page = val
      this.init();
    },

    cellClick(row, column, cell, event) {
      //点击文件名
      let that = this;
    },
    indexMethod(index) {
      //获取表格序号
      //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      return (
        (this.histroyData.pageSize - 20) * this.histroyData.pages + (index + 1)
      );
    },
    closeDialog() {
      //关闭会话
      // this.crumbsData.titleList.splice(3, 1);

      this.DailyReEditVisible = false;
      this.init();
    },
    //弹出框
    submit(formName) {
      //提交
      this.$refs.childDailyReconciliation.submit();
      // this.DailyReconciliation = false;
    },
    details() {
      this.DailyReEditVisible = true;
      // this.$set(this.crumbsData.titleList, "3", { title: '详情', method: () => { window.histroy.back() } })
    }
  },
  watch: {
    maxHeight() {
      this.tableShow = false;
      this.$nextTick(() => {
        this.tableShow = true;
      });
    }
  }
};
</script>
<style lang="scss">
.DailyReconciliation {
  width: 100%;
  height: 100%;
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }
  .el-form--inline .el-form-item {
    margin-right: 0px;
  }
}
</style>