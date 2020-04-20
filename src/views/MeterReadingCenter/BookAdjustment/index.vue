<template>
  <div class="MeterReadingCircuit">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <!-- <h2 class="tab-title">
        <i></i>
        册本调整</h2> -->
    </div>

    <!-- <div class="toolbar">
      <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
        <el-form-item class="form-left">
          <el-form-item label="册本号：">
            <el-input v-model="formData.leftBookNum" placeholder="册本号"></el-input>
          </el-form-item>
          <br>

          <el-form-item label="序号/用户编号：">
            <el-input v-model="formData.leftBeginNumber" style="width: 47%"></el-input>
            -
            <el-input v-model="formData.leftEndNumber" style="width: 47%"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
          </el-form-item>

          <el-form-item label="册本号：" style="margin-left: 5%">
            <el-input v-model="formData.rightBook" placeholder="册本号"></el-input>
          </el-form-item>
          <br>

          <el-form-item label="序号/用户编号：">
            <el-input v-model="formData.rightBeginNumber" style="width: 47%"></el-input>
            -
            <el-input v-model="formData.rightEndNumber" style="width: 47%"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
          </el-form-item>

        </el-form-item>
      </el-form>
    </div> -->
    <!-- <span class="btnBox">
      <el-button size="mini" type="primary" style="margin-left: 0;">保存</el-button>
      <el-button size="mini" type="primary">初始化</el-button>
      <el-button size="mini" type="primary">打印</el-button>
      <el-button size="mini" type="primary" style="margin-right:4%;">导出</el-button>
    </span> -->
    <div class="adjuge">
      <el-tabs v-model="activeName2">
        


        <div class="one1 fl">
          
          <div class="toolbar">
              <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                <el-form-item class="form-left">
                  <el-form-item label="册本号：">
                    <el-input v-model="formData.leftBookNum" placeholder="册本号"></el-input>
                  </el-form-item>
                  <br>

                  <el-form-item label="序号/用户编号：">
                    <el-input v-model="formData.leftBeginNumber" style="width: 47%"></el-input>
                    -
                    <el-input v-model="formData.leftEndNumber" style="width: 47%"></el-input>
                  </el-form-item>

                  <el-form-item>
                    <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
                  </el-form-item>

                </el-form-item>
              </el-form>
          </div>

          <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="tableData" @cell-click="cellClick" class="wuserInfo-table">

            <el-table-column type="selection" width="55">
            </el-table-column>

            <el-table-column type="index" label="NO." width="50" :index="indexMethod">
            </el-table-column>

            <el-table-column prop="userCode" min-width="80" label="用户编号" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="userName" min-width="80" label="用户名称" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="address" min-width="80" label="用户地址" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="orderBy" min-width="80" label="排序号">
            </el-table-column>
          </el-table>
        </div>
        <div class="two1 fl">
          <div>
            <el-button type="primary" @click="save" size="mini">保存</el-button>
          </div>
          <div>
            <!-- <el-tooltip content="右移一户" placement="top" effect="light"> -->
              <el-button type="primary" @click="checkall" size="mini">右移</el-button>
              
            <!-- </el-tooltip> -->
          </div>
          <div>
            <!-- <el-tooltip content="左移一户" placement="top" effect="light"> -->
            <el-button type="primary" @click="reset1" size="mini">左移</el-button>
             
              
            <!-- </el-tooltip> -->
          </div>
          <!-- <div>
            <el-tooltip content="全部右移" placement="top" effect="light">
            <el-button type="primary" @click="reset1" size="mini">{{allRight}}</el-button>
              
              
            </el-tooltip>
          </div> -->
          <!-- <div>
            <el-tooltip content="全部左移" placement="top" effect="light">
            <el-button type="primary" @click="reset1" size="mini">{{allLeft}}</el-button>
          
            </el-tooltip>
          </div> -->
        </div>
        <div class="three1 fl">
          
          
          <div class="toolbar">
              <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                <el-form-item class="form-left">
                  <el-form-item label="册本号：">
                    <el-input v-model="formData.leftBookNum" placeholder="册本号"></el-input>
                  </el-form-item>
                  <br>

                  <el-form-item label="序号/用户编号：">
                    <el-input v-model="formData.leftBeginNumber" style="width: 47%"></el-input>
                    -
                    <el-input v-model="formData.leftEndNumber" style="width: 47%"></el-input>
                  </el-form-item>

                  <el-form-item>
                    <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
                  </el-form-item>

                </el-form-item>
              </el-form>
          </div>
          <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" @cell-click="cellClick" class="wuserInfo-table">

            <el-table-column type="selection" width="55">
            </el-table-column>

            <el-table-column type="index" label="NO." width="50" :index="indexMethod">
            </el-table-column>

            <el-table-column prop="userCode" min-width="80" label="用户编号" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="userName" min-width="80" label="用户名称" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="address" min-width="80" label="用户地址" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="orderBy" min-width="80" label="排序号">
            </el-table-column>
          </el-table>
        </div>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "MeterReadingCircuit",
  components: {

  },
  data() {
    return {
      tableData:[
        {

        },
      ],
      crumbsData: {  //面包屑
        titleList: [
          { title: '抄表开账' },
          { title: '计划维护' },
          { title: '表册调整' }
        ],

      },
      isActive: false,  //控制高级查询内容的显示
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
      histroyData: {

      },
      waterAddVisible: false,  //综合查询的显示和隐藏
      WaterEditorName: '综合查询',
      ruleFormData: {},
      backfillName: "用户基础资料管理-编辑",
      backfillVisible: false,
      allRight: '>>',
      allLeft: '<<',
    }
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, '.MeterReadingCircuit .kl-table', ['.MeterReadingCircuit .toolbar', '.MeterReadingCircuit .block', '.MeterReadingCircuit bread-contain'])
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
            code: "C7551990000003",
            concentrator: "",
            connect: null,
            daytime: "2019-07-02",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "-",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
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
            waterGroup: null,
          },
          {
            areaId: null,
            areaName: "东深小区",
            code: "C7551990000003",
            concentrator: "",
            connect: null,
            daytime: "2019-07-02",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "-",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
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
            waterGroup: null,
          },
          {
            areaId: null,
            areaName: "东深小区",
            code: "C7551990000003",
            concentrator: "",
            connect: null,
            daytime: "2019-07-02",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "-",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
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
            waterGroup: null,
          },
          {
            areaId: null,
            areaName: "东深小区",
            code: "C7551990000003",
            concentrator: "",
            connect: null,
            daytime: "2019-07-02",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "-",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
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
            waterGroup: null,
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
        total: 5,
      }
    },
    hidden() {
      if (this.isActive == true) {
        $('.upchange').addClass('el-icon-arrow-down').removeClass('el-icon-arrow-up')
        this.isActive = false;
        $('.el-table--fit').css('height', '66%');

      } else {
        $('.upchange').addClass('el-icon-arrow-up').removeClass('el-icon-arrow-down')

        this.isActive = true;
        $('.el-table--fit').css('height', '50%');
      }
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
      // this.tableQuery.pageCount = val
      // this.tableQuery.page = 1
      this.init()
    },
    handleCurrentChange(val) {  //显示多少页码
      // this.tableQuery.page = val
      this.init()
    },
    //   查看历史
    viewHistory(index, row) {

    },
    cellClick(row, column, cell, event) { //点击文件名
      let that = this;

    },
    indexMethod(index) {//获取表格序号
      //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      return (this.histroyData.pageSize - 1) * this.histroyData.pages + (index + 2) - 20;

    },
    closeDialog() { //关闭会话
      this.waterAddVisible = false;
      this.backfillVisible = false;
      this.init()
    },
    //弹出框
    submit(formName) {	//提交
      this.$refs.childWaterEditor.submit()
      // this.waterAddVisible = false;
    },
    // 添加
    add() {

    },
    // 批量编辑
    BatchEditing() {

    },
    // 资料导出
    DataDerivation() {

    },
    // 导出本页
    exportPage() {

    },
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
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
  }
}
</script>
<style lang="scss">
.MeterReadingCircuit {
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
  .btnBox {
    display: inline-block;
    width: 100%;
    text-align: right !important;
    // margin-bottom: 2%;
  }
  .btnBox .el-button {
    margin-left: 2%;
    font-size: 14px;
  }
  .el-tabs {
    height: 100%;
    .one1 {
      width: 40%;
      height: 92%;
      // overflow-y: scroll;
      // border: 1px solid #ebeef5;
      .role {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        text-align: center;
        // background:#f5f7fa;
        background: #dedfe0;
        font-size: 20px;
      }
      ul {
        margin: 0px auto;
        width: 100%;
        height: 100%;
      }
      li {
        width: calc(100% - 70px);
        margin: 0 auto;
        font-size: 17px;
      }
      ul li {
        margin-top: 15px;
      }
      ul li a {
        color: #000;
        font-size: 17px;
      }
      ul li a:hover {
        color: #006699;
      }
    }
    .two1 {
      width: 6%;
      height: 92%;
      text-align: center;
      div {
        margin-top: 20px;
        .el-button {
          height: 28px;
          width: 56px;
        }
      }
    }
    .three1 {
      width: 40%;
      height: 92%;
      // overflow: auto;
      // border: 1px solid #ebeef5;
      .rolefun {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        text-align: center;
        background: #dedfe0;
        font-size: 20px;
      }
    }
    .one1 {
      margin-left: 1%;
    }
    .two1,
    .three1 {
      margin-left: 5%;
    }
    // .el-button--primary {
    //   width: 80px;
    //   height: 40px;
    //   font-size: 20px;
    //   background: #47b5e8;
    //   border-color: #47b5e8;
    // }
    .el-tree {
      height: 90%;
      overflow-y: auto;
    }
    .el-checkbox__inner {
      margin-left: 0.1rem;
    }
    .el-tree-node__content > .el-tree-node__expand-icon {
      padding: 12px;
    }
  }
  .el-tabs__content {
    // height: calc(100% - 40px);
    height: 510px;
    width: 1280px;
    // width: calc(100%-220px);
    display: flex;
    flex-direction: row;
  }
  #pane-comprehensiveBusiness1,
  #pane-mydestop1 {
    width: 100%;
  }
  .form-left > .el-form-item__content {
    width: 100%;
  }
  .form-left {
    width: 100%;
  }
}
</style>
