<template>
  <div class="MeterReadingCircuit">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right">
        <el-button size="mini" type="primary" style="margin-left: 0;" @click="solidID()">排序号整理</el-button>
        <el-button size="mini" type="primary">保存</el-button>
      </div>
    </div>
    <div class="company-content">
      <div class="company-left">
        <company-tree :treeData="treeDatas"></company-tree>
      </div>
      <div class="company-right">
        <div class="toolbar">
          <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
            <el-form-item label="">
              <el-input v-model="formData.searchType" placeholder="用户编号/排序号" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" @click="location()">定位</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="kl-table">
          <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="tableData" @cell-click="cellClick" class="wuserInfo-table">

            <el-table-column type="selection" min-width="55" fixed>
            </el-table-column>

            <el-table-column type="index" label="NO." min-width="50" :index="indexMethod" fixed>
            </el-table-column>

            <el-table-column prop="bookNum" label="排序号" min-width="60">
              <template slot-scope="scope">
                <el-input v-model="scope.row.bookNum" size="mini"></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="userNum" label="用户编号" min-width="120" show-overflow-tooltip>

            </el-table-column>

            <el-table-column prop="userName" label="用户名称" min-width="120" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="userAddress" label="用户地址" min-width="120" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="waterType" label="用水类型" min-width="120">
            </el-table-column>

            <el-table-column prop="paymentMethod" label="行业分类" min-width="120">
            </el-table-column>

            <el-table-column prop="state" label="用户状态" min-width="120">
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <!-- <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
            </el-pagination>
          </div> -->
        </div>
      </div>
      <el-dialog class='kr-dialog' title="抄表路线-上插入" :visible.sync="dialogFormVisible" width="90%" height="70%">
        <div class="kr-dialog-right">
          <company-tree :treeData="treeDatas"></company-tree>
        </div>
        <div class='kr-dialog-left'>
          <div class='kr-dialog-top'>
            <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">

              <el-form-item label="排序号：">
                <el-input v-model="formData.beginNumber" style="width: 47%"></el-input>
                -
                <el-input v-model="formData.endNumber" style="width: 47%"></el-input>
              </el-form-item>

              <el-form-item label="模糊查询：" class="width-200">
                <el-tooltip class="item" effect="dark" content="用户编号、用户名称、册本号" placement="top">
                  <el-input v-model="formData.searchContent" clearable></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item>
                <el-button class="searchBtn" @click="demand" icon="el-icon-search"></el-button>
              </el-form-item>
              <el-form-item style="float: right">
                <el-button size="mini" type="primary" style="margin-left: 0;">确定</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class='kr-dialog-bottom'>
            <el-table :data="gridData" v-if="tableShow" :max-height="maxHeight" stripe border>
              <el-table-column type="selection" min-width="55" fixed>
              </el-table-column>
              <el-table-column type="index" label="NO." :index="indexMethod" fixed>
              </el-table-column>
              <el-table-column prop="bookNum" label="册本号"></el-table-column>
              <el-table-column prop="orderBy" label="排序号"></el-table-column>
              <el-table-column prop="userCode" label="用户编号"></el-table-column>
              <el-table-column prop="userName" label="用户名称"></el-table-column>
              <el-table-column prop="userAddress" label="用户地址"></el-table-column>
              <el-table-column prop="waterAddress" label="水表地址"></el-table-column>
              <el-table-column prop="waterCode" label="水表编号"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
    </div>

    <!-- <div class="toolbar">
      <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">

        <el-form-item label="排序号：">
          <el-input v-model="formData.beginNumber" style="width: 47%"></el-input>
          -
          <el-input v-model="formData.endNumber" style="width: 47%"></el-input>
        </el-form-item>

        <el-form-item label="模糊查询：" class="longinput">
          <el-input v-model="formData.searchContent" placeholder="用户编号/用户名称/册本号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  class="searchBtn" @click="demand" icon="el-icon-search"></el-button>
        </el-form-item>

        <el-form-item label="">
          <el-input v-model="formData.searchType" placeholder="用户编号/排序号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary">定位</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button size="mini" type="primary" style="margin-left: 0;">保存</el-button>
          <el-button size="mini" type="primary">初始化</el-button>
          <el-button size="mini" type="primary">打印</el-button>
          <el-button size="mini" type="primary" icon="el-icon-upload2">导出</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <!-- <div class="kl-table">
      <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" @cell-click="cellClick" class="wuserInfo-table">

        <el-table-column type="index" label="NO." width="50" :index="indexMethod">
        </el-table-column>

        <el-table-column type="selection" width="55">
        </el-table-column>

        <el-table-column prop="bookNum" label="册本号">
        </el-table-column>

        <el-table-column prop="sortNum" label="排序号">
        </el-table-column>

        <el-table-column prop="userNum" label="用户编号">

        </el-table-column>

        <el-table-column prop="userName" label="用户名称">
        </el-table-column>

        <el-table-column prop="userAddress" label="用户地址">
        </el-table-column>

        <el-table-column prop="waterType" label="用水类型">
        </el-table-column>

        <el-table-column prop="paymentMethod" label="缴费方式">
        </el-table-column>

        <el-table-column prop="creditRating" label="信用等级">
        </el-table-column>

        <el-table-column prop="state" label="状态">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
        </el-pagination>
      </div>
    </div> -->
    <!-- <span class="btnBox">
      <el-button size="mini" type="primary" style="margin-left: 0;">保存</el-button>
      <el-button size="mini" type="primary">初始化</el-button>
      <el-button size="mini" type="primary">打印</el-button>
      <el-button size="mini" type="primary">导出</el-button>
    </span> -->
  </div>
</template>
<script>
export default {
  name: "MeterReadingCircuit",
  components: {},
  data() {
    return {
      tableData: [
        {
          bookNum: "1",
          sortNum: "1",
          userNum: "10101011",
          userName: "李晓天",
          userAddress: "丰登桥",
          waterType: "企业用水",
          paymentMethod: "--",
          creditRating: "",
          state: "正常"
        },
        {
          bookNum: "2",
          sortNum: "2",
          userNum: "10101012",
          userName: "高友贵",
          userAddress: "丰登桥",
          waterType: "居民用水",
          paymentMethod: "--",
          creditRating: "",
          state: "停用"
        },
        {
          bookNum: "3",
          sortNum: "1",
          userNum: "10101011",
          userName: "焦文",
          userAddress: "丰登桥",
          waterType: "事业单位用水",
          paymentMethod: "--",
          creditRating: "",
          state: "销户"
        }
      ],
      dialogFormVisible: false,
      rules: {
        severCode: [
          { required: true, message: "请输入服务器编号", trigger: "blur" }
        ],
        dbName: [
          { required: true, message: "请选择活动区域", trigger: "blur" }
        ],
        severPort: [{ required: true, message: "请选择日期", trigger: "blur" }],
        severName: [{ required: true, message: "请选择时间", trigger: "blur" }],
        ipAdress: [
          { required: true, message: "请至少选择一个活动性质", trigger: "blur" }
        ],
        station: [
          { required: true, message: "请选择活动资源", trigger: "blur" }
        ],
        remark: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      formLabelWidth: "120px",
      gridData: [
        {
          bookNum: "C0000001",
          orderBy: "0000001",
          userCode: "C001001",
          userName: "李小天",
          userAddress: "深圳市罗湖区东深小区",
          waterAddress: "深圳市罗湖区东深小区",
          waterCode: "C00A001"
        },
        {
          bookNum: "C0000002",
          orderBy: "0000002",
          userCode: "C001002",
          userName: "高友贵",
          userAddress: "深圳市罗湖区东深小区",
          waterAddress: "深圳市罗湖区东深小区",
          waterCode: "C00A002"
        },
        {
          bookNum: "C0000003",
          orderBy: "0000003",
          userCode: "C001003",
          userName: "焦文",
          userAddress: "深圳市罗湖区东深小区",
          waterAddress: "深圳市罗湖区东深小区",
          waterCode: "C00A003"
        }
      ],
      treeDatas: {
        tree: [
          {
            foreignkey: "全部",
            id: "222",
            _child: [
              {
                foreignkey: "城区",
                id: "222",
                _child: [
                  { foreignkey: "0035E", id: "222" },
                  { foreignkey: "0036E", id: "222" },
                  { foreignkey: "0037E", id: "222" },
                  { foreignkey: "0038E", id: "222" }
                ]
              }
            ]
          }
        ],
        defaultProps: {
          label: "foreignkey",
          children: "_child"
        },
        inputProp: {
          showSearch: false,
          Inp_placeholder: "请输入节点"
        },
        sendTreeProp: [
          "parentMask",
          "mask",
          "childMask",
          "seq",
          "id",
          "type",
          "foreignkey"
        ],
        rootName: "总部",
        defaultOpen: {
          nodeKey: "id"
          // nodeItem:164
        }
      },
      crumbsData: {
        //面包屑
        titleList: [
          { title: "抄表开账" },
          { title: "计划维护" },
          { title: "抄表路线" }
        ]
      },
      isActive: false, //控制高级查询内容的显示
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
      waterAddVisible: false, //综合查询的显示和隐藏
      WaterEditorName: "综合查询",
      ruleFormData: {},
      backfillName: "用户基础资料管理-编辑",
      backfillVisible: false
    };
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, ".MeterReadingCircuit .kl-table", [
      ".MeterReadingCircuit .toolbar",
      ".MeterReadingCircuit .block",
      ".MeterReadingCircuit bread-contain"
    ]);
  },
  methods: {
    //编辑
    edit(index, row) {
      console.log(row.bookNum);
      this.dialogFormVisible = true;
    },
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
            bookNum: "s10201",
            sortNum: "1",
            userNum: "10101011",
            userName: "李晓天",
            userAddress: "丰登桥",
            waterType: "",
            paymentMethod: "现金",
            creditRating: "",
            state: ""
          },
          {},
          {},
          {}
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
        $(".el-table--fit").css("height", "66%");
      } else {
        $(".upchange")
          .addClass("el-icon-arrow-up")
          .removeClass("el-icon-arrow-down");

        this.isActive = true;
        $(".el-table--fit").css("height", "50%");
      }
    },
    location() {
      //定位
      console.log(this.formData.searchType);
      let str = this.formData.searchType;
    },
    solidID() {
      //排序号整理
      for (let i = 0; i < this.tableData.length; i++) {
        let num = Number(this.tableData[i].bookNum);
        if (num == 1) {
          num = 1;
        } else {
          num = (num - 1) * 10;
        }
        this.tableData[i].bookNum = num;
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
    }
    // 编辑
    // edit() {
    //   this.backfillVisible = true;
    // }
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
.MeterReadingCircuit {
  width: 100%;
  height: 100%;
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 8px;
  }
}
</style>
