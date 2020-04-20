<template>
  <div class="ArrearageCollection">
    
      <!-- 欠费催缴单 模块 -->
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>

      <div class="bread-contain-right">
        <el-button size="mini" type="primary">打印</el-button>
        <el-button size="mini" type="primary" icon="el-icon-upload2">导出</el-button>
      </div>
    </div>
    
    <div class="toolbar">
      <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
        <div class="form-left">
          <el-form-item label="账期：">    
            <el-date-picker
                v-model="formData.AccountPeriod"
                type="monthrange"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="抄表日期："> 
              <el-date-picker
                v-model="formData.meterDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="模糊查询：" class="searchInput">
            <el-tooltip class="item" effect="dark" content="册本号、客户编号、账户编号、用户编号、用户名称、银行账户" placement="top">
              <el-input v-model="formData.userNum" clearable size="mini"></el-input>
            </el-tooltip>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="mini" @click.native="hidden" icon="el-icon-arrow-down upchange" class="soce-query">高级查询</el-button>
            <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
          </el-form-item>
        </div>
        <el-form-item v-show="isActive" class="advancedQuery">



          <el-form-item label="营业所：">
            <el-select clearable v-model="formData.waterMeterCaliber" placeholder="全部">
              <el-option v-for="(item,index) in formData.waterMeterCaliberOptions" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="抄表员：">
            <el-select clearable v-model="formData.IsBigUser" placeholder="是">
              <el-option v-for="(item,index) in formData.IsBigUserOptions" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="缴费方式：">
            <el-select clearable v-model="formData.waterMeterManufacturer" placeholder="全部">
              <el-option v-for="(item,index) in formData.waterMeterManufacturerOptions" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="大于期数：">
            <el-input v-model="formData.book" placeholder="大于期数"></el-input>
          </el-form-item>
          <el-form-item label="大于水量：">
            <el-input v-model="formData.book" placeholder="大于水量"></el-input>
          </el-form-item>

          <el-form-item label="大于金额：">
            <el-input v-model="formData.book" placeholder="大于金额"></el-input>
          </el-form-item>
        </el-form-item>

      </el-form>
    </div>
    <div class="kl-table">
      <el-table stripe border :data="histroyData.list" class="change-tables-table">

        <el-table-column type="selection" width="50" fixed="left">
        </el-table-column>

        <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
        </el-table-column>

        <el-table-column prop="bookNum" min-width="80" label="册本号">
        </el-table-column>

        <el-table-column prop="bookNum" min-width="60" label="排序号">
        </el-table-column>
        <el-table-column prop="code" min-width="80" label="用户编号">
        </el-table-column>

        <el-table-column prop="areaName" min-width="100" label="用户名称">
        </el-table-column>

        <el-table-column prop="address" min-width="150" label="用户地址">
        </el-table-column>

        <el-table-column prop="address" min-width="80" label="用户类型">
        </el-table-column>
        <el-table-column prop="code" min-width="80" label="水表口径">
        </el-table-column>
        <el-table-column prop="code" min-width="80" label="期数">
        </el-table-column>
        <el-table-column prop="code" min-width="80" label="水量合计">
        </el-table-column>
        <el-table-column prop="code" min-width="80" label="其中水费">
        </el-table-column>
        <el-table-column prop="code" min-width="100" label="其中污水费">
        </el-table-column>
        <el-table-column prop="code" min-width="100" label="其他费合计">
        </el-table-column>
        <el-table-column prop="code" min-width="80" label="预存金额">
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
  name: "ArrearageCollection",
  components: {
  },
  data() {
    return {
      crumbsData: {
        //面包屑
        titleList: [
          { title: "抄表开账" },
          { title: "打印管理" },
          { title: "欠费催缴单" }
        ]
      },
      formData: {
        con: "",
        watermeterWarehouse: "",
        watermeterWarehouseOptions: [
          {
            name: "0038__工业用水3.54",
            value: "1"
          },
          {
            name: "0015__特种用水3.54",
            value: "2"
          },
          {
            name: "0029__区域用水3.54",
            value: "3"
          },
          {
            name: "0030__基本水价3.54",
            value: "4"
          },
          {
            name: "0039__特种用水3.54",
            value: "5"
          },
          {
            name: "0040__生活用水3.54",
            value: "6"
          },
          {
            name: "0041__免费用水3.54",
            value: "7"
          }
        ],
        waterMeterManufacturer: "",
        waterMeterManufacturerOptions: [
          {
            name: "全部",
            value: "1"
          },
          {
            name: "现金",
            value: "2"
          },
          {
            name: "代扣",
            value: "3"
          },
          {
            name: "托收",
            value: "4"
          },
          {
            name: "预存",
            value: "5"
          }
        ],
        waterMeterType: "",
        waterMeterTypeOptions: [
          {
            name: "19年5月调价通知",
            value: "1"
          }
        ],
        waterMeterCaliber: "",
        waterMeterCaliberOptions: [
          {
            name: "A",
            value: "1"
          },
          {
            name: "B",
            value: "2"
          },
          {
            name: "C",
            value: "3"
          }
        ],
        waterMeterStatus: "",
        waterMeterStatusOptions: [
          {
            name: "启用",
            value: "1"
          },
          {
            name: "停用",
            value: "2"
          }
        ],
        subordinateDepartments: "",
        subordinateDepartmentsOptions: [
          {
            name: "一月",
            value: "1"
          },
          {
            name: "三月",
            value: "2"
          },
          {
            name: "偶月",
            value: "3"
          }
        ],
        meterDate: "",
        AccountPeriod: "",
        userNum: "",
        book: "",
        notificationStatus: [
          {
            name: "全部",
            value: "1"
          },
          {
            name: "未通知",
            value: "2"
          },
          {
            name: "已打印通知",
            value: "3"
          },
          {
            name: "已短信通知",
            value: "4"
          },
          {
            name: "已微信通知",
            value: "5"
          }
        ],
        IsBigUser: "",
        IsBigUserOptions: [
          {
            name: "是",
            value: "1"
          },
          {
            name: "否",
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
      isActive: false
      
    };
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, ".ArrearageCollection .kl-table", [
      ".ArrearageCollection .toolbar",
      ".ArrearageCollection .block",
      ".ArrearageCollection #crumbs"
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
.ArrearageCollection {
  width: 100%;
  height: 100%;

}
</style>