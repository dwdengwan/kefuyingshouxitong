<template>
  <div class="PrintMeterReadingCard">
      <!-- 打印抄表卡 模块 -->
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>

      <div class="bread-contain-right">
        <el-button size="mini" type="primary">打印</el-button>
      </div>
    </div>
    
    <div class="toolbar">
      <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
        <div class="form-left">

          <el-form-item label="立户日期："> 
              <el-date-picker
                v-model="formData.meterDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="模糊查询：" class="searchInput">
            <el-tooltip class="item" effect="dark" content="册本号、用户编号、用户名称" placement="top">
              <el-input v-model="formData.userNum" clearable size="mini"></el-input>
            </el-tooltip>
          </el-form-item>

          <el-form-item>
            <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
          </el-form-item>
        </div>
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

        <el-table-column prop="address" min-width="150" label="装表地址">
        </el-table-column>

        <el-table-column prop="address" min-width="80" label="联系人">
        </el-table-column>
        <el-table-column prop="code" min-width="80" label="联系电话">
        </el-table-column>
        <el-table-column prop="code" min-width="80" label="用水类型">
        </el-table-column>
        <el-table-column prop="code" min-width="80" label="水表口径">
        </el-table-column>
        <el-table-column prop="code" min-width="80" label="最后抄码">
        </el-table-column>
        <el-table-column prop="code" min-width="80" label="抄表员">
        </el-table-column>
        <el-table-column prop="code" min-width="100" label="立户日期">
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
  name: "PrintMeterReadingCard",
  components: {
  },
  data() {
    return {
      crumbsData: {
        //面包屑
        titleList: [
          { title: "抄表开账" },
          { title: "抄表" },
          { title: "打印抄表卡" }
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
    };
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, ".PrintMeterReadingCard .kl-table", [
      ".PrintMeterReadingCard .toolbar",
      ".PrintMeterReadingCard .block",
      ".PrintMeterReadingCard #crumbs"
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
.PrintMeterReadingCard {
  width: 100%;
  height: 100%;

}
</style>