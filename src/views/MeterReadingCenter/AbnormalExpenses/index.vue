<template>
  <div class="AbnormalExpenses">
    
      <!-- 费用异常 模块 -->
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>

      <div class="bread-contain-right">
        <el-button size="mini" type="primary" icon="el-icon-upload2">导出</el-button>
      </div>
    </div>
    
    <div class="toolbar">
      <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
        <div class="form-left">
          <el-form-item label="账期："> 
            <el-date-picker
                v-model="formData.AccountPeriod"
                type="month"
                placeholder="选择月">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button class='searchBtn' @click="demand" icon="el-icon-search">检查</el-button>
          </el-form-item>
        </div>

      </el-form>
    </div>
    <legend class="legendColumn">重复开账检查</legend>
        <div class="checkContent">
            <span >检查完成，无重复开账</span>
        </div>
    <legend class="legendColumn">水费金额检查</legend>

        <div class="kl-table">
        <el-table stripe border :data="histroyData.list" class="change-tables-table">
            <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
            </el-table-column>
            <el-table-column prop="code" min-width="80" label="用户编号">
            </el-table-column>
            <el-table-column prop="areaName" min-width="100" label="用户名称">
            </el-table-column>
            <el-table-column prop="address" min-width="100" label="金额">
            </el-table-column>
            <el-table-column prop="address" min-width="80" label="水费">
            </el-table-column>
            <el-table-column prop="code" min-width="80" label="一级金额">
            </el-table-column>
            <el-table-column prop="code" min-width="80" label="二级金额">
            </el-table-column>
            <el-table-column prop="code" min-width="80" label="三级金额">
            </el-table-column>
            <el-table-column prop="code" min-width="80" label="一级水量">
            </el-table-column>
            <el-table-column prop="code" min-width="80" label="二级水量">
            </el-table-column>
            <el-table-column prop="code" min-width="80" label="三级水量">
            </el-table-column>
            <el-table-column prop="code" min-width="80" label="追加表计">
            </el-table-column>
            <el-table-column prop="code" min-width="80" label="优惠水量">
            </el-table-column>
            <el-table-column prop="code" min-width="80" label="优惠单价">
            </el-table-column>
            <el-table-column prop="code" min-width="80" label="优惠金额">
            </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
            </el-pagination>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AbnormalExpenses",
  components: {
  },
  data() {
    return {
      crumbsData: {
        //面包屑
        titleList: [
          { title: "抄表开账" },
          { title: "检查" },
          { title: "费用异常" }
        ]
      },
      formData: {
        AccountPeriod: "",
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
      isActive: false
      
    };
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, ".AbnormalExpenses .kl-table", [
      ".AbnormalExpenses .toolbar",
      ".AbnormalExpenses .block",
      ".AbnormalExpenses #crumbs"
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
            callTime: "2019-07-04",
            bookNum: "0001",
            code: "000030",
            areaName: "袁正林",
            address: "东湖小区",
            concentrator: "201908",
            areaId: "2018-07-04",
            connect: "11.40",
            daytime: "12",
            endTime: "4.20",
            fcode: "0.80",
            fix: "20",
            fixValue: "已通知"
          },
          {
            callTime: "2019-07-04",
            bookNum: "0002",
            code: "000030",
            areaName: "袁超",
            address: "东湖小区",
            concentrator: "201907",
            areaId: "2018-07-09",
            connect: "11.40",
            daytime: "13",
            endTime: "4.20",
            fcode: "0.80",
            fix: "20",
            fixValue: "已通知"
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

    handleClick(tab, event) {

      this.$set(this.crumbsData.titleList, "3", {
        title: tab.label,
        method: () => {
          window.histroy.back();
        }
      });
    },
    demand() {
      //查询
      // this.tableQuery.page = 1
      // this.tableQuery.pageCount = 20
      this.init();
    },
    //   导出
    exportExcel() {},
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

    hidden() {
      if (this.isActive == true) {
        $(".upchange")
          .addClass("el-icon-arrow-down")
          .removeClass("el-icon-arrow-up");
        this.isActive = false;
        //   $('.el-table--fit').css('height', '66%');
      } else {
        $(".upchange")
          .addClass("el-icon-arrow-up")
          .removeClass("el-icon-arrow-down");

        this.isActive = true;
      }
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
.AbnormalExpenses {
    width: 100%;
    height: 100%;
    .checkContent{
        padding: 10px;
        padding-left: 20px;
        span{
            font-size: 12px;
        }
    }
}
</style>