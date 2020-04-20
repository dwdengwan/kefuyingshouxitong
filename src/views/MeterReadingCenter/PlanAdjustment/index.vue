<template>
  <div class="PlanAdjustment">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right">
        <el-button size="mini" type="primary">保存</el-button>
        <el-button size="mini" type="primary" icon="el-icon-upload2">导出</el-button>
      </div>
    </div>
    <div class="toolbar">
      <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
        <el-form-item label="营业所：">
          <el-select v-model="formData.engineerType" clearable size="mini" style="width:100%">
            <el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抄表员：">
          <el-select v-model="formData.meterReader" size="mini">
            <el-option v-for="item in meterReaderList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="册本号：">
            <el-input v-model="formData.inputContent" clearable size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="searchBtn" @click="demand" icon="el-icon-search"></el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="kl-table">
      <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" @cell-click="cellClick" class="wuserInfo-table">
        <el-table-column type="index" label="NO." width="50" :index="indexMethod" fixed>
        </el-table-column>
        <el-table-column prop="bookNum" min-width="100" label="册本号" fixed>
        </el-table-column>
        <el-table-column prop="bookName" min-width="100" label="册本名称" fixed>
        </el-table-column>
        <el-table-column prop="meterReaderWeek" min-width="120" label="抄表周期" fixed>
          <template slot-scope="scope">
            <el-select v-model="scope.row.meterReaderWeek" @keyup.esc.native="cancel(scope.$index, scope.row)">
              <el-option v-for="item in ReaderWeekoptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="meterReader" min-width="120" label="抄表员" fixed>
          <template slot-scope="scope">
            <el-select v-model="scope.row.meterReader" @keyup.esc.native="cancel(scope.$index, scope.row)">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="one" min-width="150" label="抄表日">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.one" @change="handleChange" :min="1" :max="31"></el-input-number>
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
</template>
<script>
export default {
  name: "PlanAdjustment",
  components: {},
  data() {
    return {
      crumbsData: {
        //面包屑
        titleList: [
          { title: "抄表开账" },
          { title: "计划维护" },
          { title: "抄表计划" }
        ]
      },
      meterReaderList: [
        {
          value: 1,
          label: "全部"
        },
        {
          value: 2,
          label: "单飞"
        },
        {
          value: 3,
          label: "胡国飞"
        },
        {
          value: 4,
          label: "胡晓玲"
        },
        {
          value: 5,
          label: "胡志金"
        },
        {
          value: 6,
          label: "蒋保平"
        },
        {
          value: 7,
          label: "李明"
        }
      ],
      isActive: false, //控制高级查询内容的显示
      formData: {
        engineerType: 1,

        con: "",
        meterReader: "",
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
      waterAddVisible: false, //综合查询的显示和隐藏
      WaterEditorName: "综合查询",
      ruleFormData: {},
      backfillName: "用户基础资料管理-编辑",
      backfillVisible: false,
      options6: [
        {
          value: 1,
          label: "全部"
        },
        {
          value: 2,
          label: "城区"
        },
        {
          value: 3,
          label: "农村"
        }
      ],
      meterReaderWeek: "1",
      ReaderWeekoptions: [
        {
          value: "1",
          label: "每月抄"
        },
        {
          value: "2",
          label: "奇月抄"
        },
        {
          value: "3",
          label: "偶月抄"
        },
        {
          value: "4",
          label: "季度抄"
        }
      ],
      options1: [
        {
          value: "1",
          label: "马布岗"
        }
      ],
      ruleForm: {}
    };
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, ".PlanAdjustment", [
      ".PlanAdjustment .toolbar",
      ".PlanAdjustment .block",
      ".PlanAdjustment bread-contain"
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
            bookNum: "00035E",
            bookName: "-",
            book: "-",
            meterReader: "1",
            meterReaderWeek: "1",
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
            six: "",
            seven: "",
            eight: "",
            nine: "",
            ten: "",
            eleven: "",
            tweleve: "",
            threetheen: "",
            fourtheen: "",
            fiftheen: "",
            sixtheen: "",
            seventheen: "",
            ninetheen: "",
            eightheen: "",
            twtney: "",
            twtneyOne: "",
            twtneyTwo: "",
            twtneyThree: "",
            twtneyFour: "",
            twtneyFive: "",
            twtneySix: "",
            twtneySeven: "",
            twtneyEight: "",
            twtneyNine: "",
            theenty: "",
            theentyOne: ""
          },
          {
            bookNum: "00154D",
            bookName: "-",
            book: "--",
            meterReader: "1",
            meterReaderWeek: "2",
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
            six: "",
            seven: "",
            eight: "",
            nine: "",
            ten: "",
            eleven: "",
            tweleve: "",
            threetheen: "",
            fourtheen: "",
            fiftheen: "",
            sixtheen: "",
            seventheen: "",
            ninetheen: "",
            eightheen: "",
            twtney: "",
            twtneyOne: "",
            twtneyTwo: "",
            twtneyThree: "",
            twtneyFour: "",
            twtneyFive: "",
            twtneySix: "",
            twtneySeven: "",
            twtneyEight: "",
            twtneyNine: "",
            theenty: "",
            theentyOne: ""
          },
          {
            bookNum: "00176S",
            book: "--",
            bookName: "-",
            meterReader: "1",
            meterReaderWeek: "3",
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
            six: "",
            seven: "",
            eight: "",
            nine: "",
            ten: "",
            eleven: "",
            tweleve: "",
            threetheen: "",
            fourtheen: "",
            fiftheen: "",
            sixtheen: "",
            seventheen: "",
            ninetheen: "",
            eightheen: "",
            twtney: "",
            twtneyOne: "",
            twtneyTwo: "",
            twtneyThree: "",
            twtneyFour: "",
            twtneyFive: "",
            twtneySix: "",
            twtneySeven: "",
            twtneyEight: "",
            twtneyNine: "",
            theenty: "",
            theentyOne: ""
          },
          {
            bookNum: "00254D",
            book: "--",
            bookName: "-",
            meterReader: "1",
            meterReaderWeek: "4",
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
            six: "",
            seven: "",
            eight: "",
            nine: "",
            ten: "",
            eleven: "",
            tweleve: "",
            threetheen: "",
            fourtheen: "",
            fiftheen: "",
            sixtheen: "",
            seventheen: "",
            ninetheen: "",
            eightheen: "",
            twtney: "",
            twtneyOne: "",
            twtneyTwo: "",
            twtneyThree: "",
            twtneyFour: "",
            twtneyFive: "",
            twtneySix: "",
            twtneySeven: "",
            twtneyEight: "",
            twtneyNine: "",
            theenty: "",
            theentyOne: ""
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
    hidden() {
      if (this.isActive == true) {
        $(".upchange")
          .addClass("el-icon-arrow-down")
          .removeClass("el-icon-arrow-up");
        this.isActive = false;
        // $('.el-table--fit').css('height', '66%');
      } else {
        $(".upchange")
          .addClass("el-icon-arrow-up")
          .removeClass("el-icon-arrow-down");

        this.isActive = true;
        // $('.el-table--fit').css('height', '50%');
      }
    },
    demand() {
      //查询
      // this.tableQuery.page = 1
      // this.tableQuery.pageCount = 20
      this.init();
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
    takeChange(num, row) {
      // console.log(num,row);
      let arrNum = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "eleven",
        "tweleve",
        "threetheen",
        "fourtheen",
        "fiftheen",
        "sixtheen",
        "seventheen",
        "ninetheen",
        "eightheen",
        "twtney",
        "twtneyOne",
        "twtneyTwo",
        "twtneyThree",
        "twtneyFour",
        "twtneyFive",
        "twtneySix",
        "twtneySeven",
        "twtneyEight",
        "twtneyNine",
        "theenty",
        "theentyOne"
      ];

      for (let i = 0; i < arrNum.length; i++) {
        let str = arrNum[i];
        if (i == num) {
          row[str] = true;
          console.log(row[str]);
        } else {
          row[str] = false;
          console.log(row[str]);
        }
      }
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
    //   查看历史
    viewHistory(index, row) {},
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
      this.waterAddVisible = false;
      this.backfillVisible = false;
      this.init();
    },
    //弹出框
    submit(formName) {
      //提交
      this.$refs.childWaterEditor.submit();
      // this.waterAddVisible = false;
    },
    // 添加
    add() {},
    // 批量编辑
    BatchEditing() {},
    // 资料导出
    DataDerivation() {},
    // 导出本页
    exportPage() {},
    // 综合查询
    ComprehensiveQuery() {
      this.waterAddVisible = true;
    },
    // 编辑
    edit() {
      this.backfillVisible = true;
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
.PlanAdjustment {
  width: 100%;
  height: 100%;
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 8px;
  }
}
</style>
