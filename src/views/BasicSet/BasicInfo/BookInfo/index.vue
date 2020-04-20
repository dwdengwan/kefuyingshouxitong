<template>

  <div class="MeterReadingCircuit" v-if="editContent">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right">
        <el-button size="mini" type="primary" @click="closeEdit">保存</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="closeEdit">返回</el-button>
      </div>
    </div>

    <el-form :model="dialogForm" ref="form" :rules="rules" label-width="100px" class="formBill-Two">
      
        <el-form-item label="册本编号：" prop="bookNum">
          <el-input v-model="dialogForm.bookNum" size="mini" clearable></el-input>
        </el-form-item>
        <el-form-item label="抄 表 员：" prop="meterReader">
          <el-select v-model="dialogForm.meterReader" clearable size="mini">
            <el-option v-for="item in meterReaderList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="册本名称：" prop="bookName">
          <el-input v-model="dialogForm.bookName" size="mini" clearable></el-input>
        </el-form-item>
        <el-form-item label="抄表周期：" prop="meterReadingPeriod">
          <el-select v-model="dialogForm.meterReadingPeriod" clearable size="mini">
            <el-option label="每月抄" value="1"></el-option>
            <el-option label="奇月抄" value="2"></el-option>
            <el-option label="偶月抄" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="营业所：" prop="selectionArea"> 
          <el-select v-model="dialogForm.selectionArea" clearable size="mini">
            <el-option label="城区" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抄 表 日：" prop="meterReadingDay">
          <el-input v-model="dialogForm.meterReadingDay" size="mini" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="state">
          <el-select v-model="dialogForm.state" clearable size="mini">
            <el-option label="启用" value="1"></el-option>
            <el-option label="停用" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述：" prop="describe" class="f4">
          <el-input type="textarea" v-model="dialogForm.describe"></el-input>
        </el-form-item>
    </el-form>
  </div>
  <div class="MeterReadingCircuit" v-else>
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <!-- <h2 class="tab-title">
        <i></i>
        册本信息</h2> -->
      <div class="bread-contain-right">
        <el-button size="mini" type="primary" @click="edit('add')" icon="el-icon-plus">添加</el-button>
         <el-button size="mini" type="primary" icon="el-icon-upload2">导出</el-button>
      </div>
    </div>

    <div class="toolbar">
      <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline width-150">
        <!-- <el-form-item class="form-left"> -->

        <el-form-item label="营业所：">
          <el-select v-model="formData.businessArea" clearable size="mini">
            <el-option label="全部" value="1"></el-option>
            <el-option label="城市" value="2"></el-option>
            <el-option label="农村" value="3"></el-option>
            <!-- <el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value">
              </el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="抄表员：">
          <el-select v-model="formData.meterReader" size="mini">
            <el-option v-for="item in meterReaderList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- class="longinput" -->
        <el-form-item label="模糊查询：">
          <el-input v-model="formData.searchType" placeholder="册本号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
        </el-form-item>
        <!-- <el-form-item style="float: right">
          <el-button size="mini" type="primary" icon="el-icon-plus">增加</el-button>
          <el-button size="mini" type="primary">删除</el-button>
          <el-button size="mini" type="primary" icon="el-icon-upload2">导出</el-button>
        </el-form-item> -->

        <!-- </el-form-item> -->
      </el-form>
    </div>
    <div class="kl-table">
      <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="tableData" @cell-click="cellClick" class="wuserInfo-table">
        <!-- <el-table-column type="selection" width="55">
        </el-table-column> -->

        <el-table-column type="index" label="NO." width="50" :index="indexMethod">
        </el-table-column>

        <!-- <el-table-column prop="usn" min-width="120" label="开账状态" show-overflow-tooltip>
        </el-table-column> -->

        <el-table-column prop="lvalue" min-width="80" label="营业所">
        </el-table-column>

        <el-table-column prop="code" min-width="60" label="册本号">
        </el-table-column>

        <el-table-column prop="daytime" min-width="100" label="册本名称">
        </el-table-column>

        <!-- <el-table-column prop="areaName" min-width="80" label="用户编号">
        </el-table-column> -->

        <el-table-column prop="fixValue" min-width="80" label="抄表周期">
        </el-table-column>

        <el-table-column prop="flux" min-width="80" label="抄表日">
        </el-table-column>

        <el-table-column prop="status" min-width="80" label="抄表员">
        </el-table-column>

        <el-table-column prop="concentrator" min-width="80" label="状态">
        </el-table-column>

        <el-table-column prop="usn1" min-width="120" label="备注" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="85">
          <template slot-scope="scope">
            <el-button type="text" @click.native="edit">编辑</el-button>
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
  name: "MeterReadingCircuit",
  components: {

  },
  data() {
    return {
      tableData: [
        {
          code: 'ED001',
          daytime: '',
          areaName: 'F0001',
          lvalue: '城区',
          fixValue: '每月一次',
          flux: '每月28号',
          status: '焦文',
          concentrator: '停用',
          usn: '未开账',
          usn1: '客服营收系统已启用',
        }
      ],
      crumbsData: {  //面包屑
        titleList: [
          // { title: '抄表中心', path: '/MeterReadingCenter' },
          { title: '其他配置' },
          { title: '册本信息' }
        ],

      },
      isActive: false,  //控制高级查询内容的显示
      formData: {
        businessArea: '1',

        con: "",
        MeterReader: "",
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
      meterReaderList: [
        {
          value: 1,
          label: '全部'
        },
        {
          value: 2,
          label: '单飞'
        },
        {
          value: 3,
          label: '胡国飞'
        },
        {
          value: 4,
          label: '胡晓玲'
        },
        {
          value: 5,
          label: '胡志金'
        },
        {
          value: 6,
          label: '蒋保平'
        },
        {
          value: 7,
          label: '李明'
        },
      ],
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
      options6: [
        {
          value: 12,
          label: '用水报装'
        },
      ],
      editContent: false,
      dialogForm: {
        meterReader: 1,
        meterReadingPeriod: '1',
        bookType: '1',
        selectionArea: '1',
        state: '1',
      },
    }
  },
  mounted() {
    // 侧边栏
    eventBus.$emit('asideMenuShow', 'basicsMenuShow5')
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
            areaName: "城区",
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
            areaName: "城区",
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
            areaName: "城区",
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
            areaName: "城区",
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
      return (this.histroyData.pageSize - 20) * this.histroyData.pages + (index + 1);

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
    edit(val) {
      if(val==='add'){
        // this.crumbsData.titleList.push({ title: '添加' })
      }else{
        // this.crumbsData.titleList.push({ title: '编辑' })
      }
      this.editContent = true;
      
    },
    closeEdit() {
      this.editContent = false;
      // this.crumbsData.titleList.pop();
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
}
</style>
