<template>
  <div class="BatchOpening">
    <!-- 按册开账模块 -->
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-if="EditVisible">
        <div class="bread-contain-right">
          <el-button size="mini" type="primary">开账</el-button>
          <el-button size="mini" type="primary">销账</el-button>
          <el-button size="mini" type="primary">作废</el-button>
        </div>
      </div>
      <div class="bread-contain-right" v-else>
        <div class="bread-contain-right">
          <el-button size="mini" type="primary">开账</el-button>
          <el-button size="mini" type="primary">销账</el-button>
          <el-button size="mini" type="primary">作废</el-button>
        </div>
      </div>
    </div>

    <el-tabs @tab-click="tabClick" class='tabsBlock' type="border-card">
      <el-tab-pane label="按册开账">
        <span slot="label"><i class="el-icon-document-remove"></i> 按册开账</span>
        
        <div class="toolbar">
          <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline" >
            <el-form-item class="form-left">

              
              <el-form-item label="账期：">
                <el-date-picker v-model="formData.beginYearM" size="mini" type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="选择月" style="width:100%;">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="册本号：">
                  <el-input v-model="formData.inputContent" clearable size="mini"></el-input>
              </el-form-item>
              <el-form-item label="开账状态：">
                  <el-select clearable v-model="formData.proportionMax1" placeholder="全部">
                    <el-option v-for="(item,index) in proportionList1" :key="index" :label="item.name" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="模糊查询：" class="width-150">
                <el-tooltip class="item" effect="dark" content="用户编号、用户名称、册本号" placement="top">
                  <el-input v-model="formData.inputContent" clearable size="mini"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click.native="hidden" icon="el-icon-arrow-down upchange" class="soce-query">高级查询</el-button>
                <el-button class='searchBtn' @click="search" icon="el-icon-search"></el-button>
              
              </el-form-item> 
              <el-form-item v-show="isActive" class="advancedQuery">
                
              <el-form-item label="抄表员：">
                <el-select v-model="formData.meterReader" size="mini">
                  <el-option v-for="item in meterReaderList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="抄表周期：">
                <el-select v-model="formData.options7go" clearable size="mini" style="width:100%">
                  <el-option v-for="item in options7" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
                <el-form-item label="异常类型：">
                  <el-select clearable v-model="formData.showContents" placeholder="显示内容">
                    <el-option v-for="(item,index) in showContentsList" :key="index" :label="item.name" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="水量偏差：">
                  <el-select clearable v-model="formData.proportionMax" placeholder="比例">
                    <el-option v-for="(item,index) in proportionList" :key="index" :label="item.name" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-form-item>
            </el-form-item>
            
          </el-form>
            
        </div>
        <div class="kl-table">
          <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="tableData" @cell-click="cellClick" class="change-tables-table">
            <el-table-column type="selection" fixed="left" width="55">
            </el-table-column>

            <el-table-column type="index" label="NO." fixed="left" width="50" :index="indexMethod">
            </el-table-column>

            <el-table-column prop="state" min-width="120" label="开账状态" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="bookName" min-width="80" label="册本号">
            </el-table-column>

            <el-table-column prop="bookName" min-width="80" label="抄表员">
            </el-table-column>

            <el-table-column prop="jihuaNum" min-width="100" label="计划抄表">
            </el-table-column>

            <el-table-column prop="chaojianNum" min-width="80" label="已抄表">

            </el-table-column>

            <el-table-column prop="leveled" min-width="120" label="抄表率">
            </el-table-column>

            <el-table-column prop="jihuaKNum" min-width="80" label="计划开账">
            </el-table-column>

            <el-table-column prop="kaiZedNum" min-width="80" label="开账数">
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="block">
            <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
            </el-pagination> -->
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="按户开账">
        <span slot="label"><i class="el-icon-user"></i> 按户开账</span>
        <RegularOpening></RegularOpening>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
import RegularOpening from "./RegularOpening";
export default {
  name: "BatchOpening",
  components: {
    RegularOpening
  },
  data() {
    return {
      isActive: false,
      EditVisible: "tab-1",
      tableData: [
        {
          bookName: "--",
          jihuaNum: "100",
          chaojianNum: "50",
          jihuaKNum: "100",
          kaiZedNum: "60",
          lastPeople: "焦文",
          lastTime: "2019/07/26",
          state: "未开账",
          leveled: "60%"
        }
      ],
      options6: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "未开账"
        },
        {
          value: 2,
          label: "已开账"
        },
        {
          value: 3,
          label: "部分开"
        }
      ],
      options7go: "",
      options7: [
        {
          value: 0,
          label: "每月抄"
        },
        {
          value: 1,
          label: "奇月抄"
        },
        {
          value: 2,
          label: "偶月抄"
        },
        {
          value: 3,
          label: "季度抄"
        }
      ],
      crumbsData: {
        //面包屑
        titleList: [
          // { title: '业务管理', path: '/MeterReadingCenter' },
          { title: "抄表开账" },
          { title: "开账" }
          // { title: '按册开账', method: () => { window.histroy.back() } }
        ]
      },
      isActive: false, //控制高级查询内容的显示
      formData: {
        con: "",
        beginNumber: "全部",
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

    this.common.changeTable(this, ".BatchOpening .kl-table", [
      ".BatchOpening .toolbar",
      ".BatchOpening .block",
      ".BatchOpening bread-contain"
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
            waterGroup: null
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
            waterGroup: null
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
            waterGroup: null
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
    tabClick(tab, event) {
      // this.$set(this.crumbsData.titleList,"3",{title:tab.label,method:()=>{window.histroy.back()}});

      if (tab.label == "按册开账") {
        this.EditVisible = true;
      } else {
        this.EditVisible = false;
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
.BatchOpening {
  width: 100%;
  height: 100%;
  .tabsBlock {
    height: calc(100% - 42px);
    .el-tabs--border-card {
      border: 1px solid #eaf4ff;
    }
    .el-tabs__conten {
      padding: 5px;
    }
  }
}
</style>
