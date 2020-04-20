<template>
  <div class="CustomTable">
    <div class="toolbar">
      <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
        <el-form-item class="form-left">

          <el-form-item label="账期：" class="width-200">
            <el-date-picker v-model="formData.beginYearM" type="monthrange" size="mini" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="客户类型：">
            <el-select v-model="formData.priceClassification" size="mini">
              <el-option label="普通客户" value="0"></el-option>
              <el-option label="大客户" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="排序：">
            <el-select v-model="formData.priceClassification" size="mini">
              <el-option label="上期水量" value="0"></el-option>
              <el-option label="环比" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="mini" @click.native="hidden" icon="el-icon-arrow-down upchange" class='soce-query'>高级查询</el-button>

            <el-button class="searchBtn" @click="demand" icon="el-icon-search"></el-button>
          </el-form-item>
          <!-- 高级查询 -->
          <el-form-item v-show="isActive" class="advancedQuery">

            <el-form-item label="增减率：">
              <el-select v-model="formData.gradient" size="mini">
                <el-option label="大于等于" value="0"></el-option>
                <el-option label="小于等于" value="1"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-input v-model="formData.gradientPercent" style="display: inline-block;width:90%"></el-input>%
            </el-form-item>

            <el-form-item label="排名前：">
              <el-input v-model="formData.ranking" placeholder="300"></el-input>
            </el-form-item>

            <el-form-item label="上期水量：">
              <el-select v-model="formData.CTPNumber" size="mini">
                <el-option label="大于等于" value="0"></el-option>
                <el-option label="小于等于" value="1"></el-option>
                <el-option label="等于" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-input v-model="formData.CTPNumberCube" style="display: inline-block;width:88%"></el-input>m³
            </el-form-item>

            <el-form-item label="本期水量：">
              <el-select v-model="formData.CurrentIssueNumber" size="mini">
                <el-option label="大于等于" value="0"></el-option>
                <el-option label="小于等于" value="1"></el-option>
                <el-option label="等于" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-input v-model="formData.CurrentIssueNumberCube" style="display: inline-block;width:88%"></el-input>m³
            </el-form-item>

            <el-form-item>
              <el-radio v-model="formData.radio" label="0">比上月</el-radio>
              <el-radio v-model="formData.radio" label="1">比上年</el-radio>
            </el-form-item>
          </el-form-item>

        </el-form-item>
      </el-form>
    </div>
    <div class="kl-table">
      <el-table stripe border :data="histroyData.list" @cell-click="cellClick" class="wuserInfo-table">
        <el-table-column type="index" label="NO." width="50" :index="indexMethod"></el-table-column>
        <el-table-column prop="userAddress" min-width="80" label="客户编号"></el-table-column>
        <el-table-column prop="meterAddress" min-width="80" label="客户名称"></el-table-column>
        <el-table-column prop="meterAddress" min-width="80" label="信用等级"></el-table-column>
        <el-table-column prop="meterAddress" min-width="80" label="用户数量"></el-table-column>
        <el-table-column prop="meterAddress" min-width="100" label="本期水量"></el-table-column>
        <el-table-column prop="meterAddress" min-width="100" label="上期水量"></el-table-column>
        <el-table-column prop="meterAddress" min-width="80" label="环比增减率"></el-table-column>
        <el-table-column prop="meterAddress" min-width="100" label="同比水量"></el-table-column>
        <el-table-column prop="meterAddress" min-width="120" label="同比增减"></el-table-column>
        <el-table-column prop="meterAddress" min-width="120" label="同比增减率"></el-table-column>
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
  name: "CustomTable",
  components: {},
  data() {
    return {
      isActive: false,
      crumbsData: {
        //面包屑
        titleList: [
          { title: "抄表中心", path: "/MeterReadingCenter" },
          { title: "统计", path: "/CustomTable" },
          {
            title: "用水排名表",
            method: () => {
              window.histroy.back();
            }
          }
        ]
      },
      isActive: false, //控制高级查询内容的显示
      formData: {
        beginYearM: [],
        businessArea: "0",
        meterReader: 1,
        priceClassification: "0",
        caliber: "0",
        caliberItem: "0",
        gradient: "0",
        CTPNumber: "0",
        CurrentIssueNumber: "0",
        radio: "0",

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
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      DateChoosevalue: [],
      maxHeight: 0,
      histroyData: {},
      waterAddVisible: false, //综合查询的显示和隐藏
      WaterEditorName: "综合查询",
      ruleFormData: {},
      backfillName: "客户基础资料管理-编辑",
      backfillVisible: false,
      indexMethod: "1"
    };
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, ".CustomTable .kl-table", [
      ".CustomTable .toolbar",
      ".CustomTable .block",
      ".CustomTable bread-contain"
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
      // 			        const tHeader = ['水表编号', '抄表日期', '所属小区','厂家编号','厂家','型号', '当日读数', '修正读数', '当日水量', '数据状态',  '客户编号','集中器编号','客户地址']
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
        (this.histroyData.pageSize - 1) * this.histroyData.pages + (index + 1)
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
    }
  },
  watch: {}
};
</script>
<style lang="scss">
.CustomTable {
  width: 100%;
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 8px;
  }
}
</style>
