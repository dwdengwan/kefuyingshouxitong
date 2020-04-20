

<template>

  <div class="AccountPeriod">
    <div class="AccountPeriodEditCon" v-if="AccountPeriodVisible">
      <AccountPeriodEdit ref="childAccountPeriod"></AccountPeriodEdit>
    </div>
    <section class="AccountPeriodCon" v-show="AccountPeriodCon">
      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">

          <el-form-item class="form-left">
            <el-form-item label='账期：'>
              <el-date-picker v-model="beginYearM" size="mini" type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="选择月" style="width:100%;">
              </el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
            </el-form-item>

          </el-form-item>
          <el-form-item class="form-right">
          </el-form-item>

        </el-form>
      </div>
      <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" class="change-tables-table">

          <el-table-column type="selection" width="50" fixed="left">
          </el-table-column>

          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="daytime" min-width="100" label="账期">
          </el-table-column>

          <el-table-column prop="concentrator" min-width="80" label="开始日期">
          </el-table-column>

          <el-table-column prop="code" min-width="100" label="结束日期">
          </el-table-column>

          <el-table-column prop="flux" min-width="150" label="本次预存金额">
          </el-table-column>

          <el-table-column prop="factoryName" min-width="100" label="建立时间">
          </el-table-column>

          <el-table-column prop="isxz" min-width="80" label="建立人">
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import AccountPeriodEdit from "./AccountPeriodEdit";
export default {
  name: "AccountPeriod",
  components: {
    AccountPeriodEdit
  },
  data() {
    return {
      beginYearM: "",
      crumbsData: {
        //面包屑
        titleList: [
          { title: "账务中心", path: "/AccountPeriod" },
          {
            title: "账结管理",
            method: () => {
              window.histroy.back();
            }
          }
        ]
      },
      formData: {
        con: "",
        watermeterWarehouse: "",
        watermeterWarehouseOptions: [],
        waterMeterManufacturer: "",
        waterMeterManufacturerOptions: [],
        waterMeterType: "",
        waterMeterTypeOptions: [],
        waterMeterCaliber: "",
        waterMeterCaliberOptions: [],
        waterMeterStatus: "",
        waterMeterStatusOptions: [],
        subordinateDepartments: "",
        subordinateDepartmentsOptions: []
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
      AccountPeriodVisible: false,
      AccountPeriodName: "账期-增加",
      AccountPeriodCon: true
    };
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, ".AccountPeriod", [
      ".AccountPeriod .toolbar",
      ".AccountPeriod .block",
      ".AccountPeriod #crumbs"
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
            areaId: null,
            areaName: "东深小区",
            code: "20190325",
            concentrator: "201902",
            connect: null,
            daytime: "201903",
            endTime: null,
            factoryName: "20190326 10:09:41",
            fcode: null,
            fix: false,
            fixValue: "-",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "管理员",
            lvalue: "-",
            meter: null,
            model: null,
            modifyBy: null,
            modifyTime: null,
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "1栋3单元",
            protocolName: null,
            rowNumber: 0,
            sensorModel: null,
            sn: null,
            status: "未上传",
            totalPage: 0,
            type: 5,
            unusual: null,
            usn: "00",
            waterGroup: null
          },
          {
            areaId: null,
            areaName: "东深小区",
            code: "20190325",
            concentrator: "201902",
            connect: null,
            daytime: "201903",
            endTime: null,
            factoryName: "20190326 10:09:41",
            fcode: null,
            fix: false,
            fixValue: "-",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "管理员",
            lvalue: "-",
            meter: null,
            model: null,
            modifyBy: null,
            modifyTime: null,
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "1栋3单元",
            protocolName: null,
            rowNumber: 0,
            sensorModel: null,
            sn: null,
            status: "未上传",
            totalPage: 0,
            type: 5,
            unusual: null,
            usn: "00",
            waterGroup: null
          }
        ],
        navigateFirstPage: 1,
        navigateLastPage: 1,
        navigatePages: 8,
        navigatepageNums: Array(1),
        nextPage: 0,
        pageNum: 1,
        pageSize: 20,
        pages: 1,
        prePage: 0,
        size: 5,
        startRow: 1,
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
      this.AccountPeriodVisible = false;
      this.backfillVisible = false;
      this.AccountPeriodCon = true;
      this.crumbsData.titleList.splice(2, 1);
      this.init();
    },
    //弹出框
    submit(formName) {
      //提交
      this.$refs.childAccountPeriod.submit();
      // this.AccountPeriodVisible = false;
    },
    add() {
      this.AccountPeriodVisible = true;
      this.AccountPeriodCon = false;
      this.$set(this.crumbsData.titleList, "2", {
        title: "添加",
        method: () => {
          window.histroy.back();
        }
      });
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
.AccountPeriod {
  width: 100%;
  height: 100%;
}
</style>
