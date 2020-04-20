
<template>
  <div class="TollInquiry">

    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right">
      </div>
    </div>
    <div class="toolbar">
      <el-form :inline="true" size="mini" :model="queryData" class="demo-form-inline">

        <el-form-item class="form-left">
          <el-form-item label='收费日期：'>
            <el-date-picker v-model="DateChoosevalue" type="daterange" value-format="yyyy-MM-dd" range-separator="至" :picker-options="pickerOptions" :clearable="true" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="收费渠道：">
            <el-select clearable v-model="queryData.watermeterWarehouse" placeholder="">
              <el-option v-for="(item,index) in queryData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>

            </el-select>
          </el-form-item>

          <el-form-item label="收费方式：">
            <el-select clearable v-model="queryData.watermeterWarehouse1" placeholder="">
              <el-option v-for="(item,index) in queryData.watermeterWarehouseOptions1" :key="index" :label="item.name" :value="item.value"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="用户编号：" class="">
            <el-tooltip class="item" effect="dark" content="用户编号" placement="top">
                <el-input v-model="queryData.con" clearable size="mini"></el-input>
              </el-tooltip>
          </el-form-item>

          <el-form-item>

            <el-button  class="searchBtn"  icon="el-icon-search" @click="search" ></el-button>
          </el-form-item>

        </el-form-item>
      </el-form>
    </div>
    <div class="kl-table">
      <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" class="change-tables-table">

        <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
        </el-table-column>

        <el-table-column prop="connect1" min-width="100" label="缴费日期">
        </el-table-column>

        <el-table-column prop="connect3" min-width="100" label="缴费渠道">
        </el-table-column>

        <el-table-column prop="connect2" min-width="100" label="缴费方式">
        </el-table-column>

        <el-table-column prop="connect" min-width="80" label="客户编号">

        </el-table-column>

        <el-table-column prop="lvalue" min-width="80" label="账户编号">
        </el-table-column>

        <el-table-column prop="fixValue" min-width="80" label="销账用户">
        </el-table-column>

        <el-table-column prop="flux" min-width="80" label="销账日期">
        </el-table-column>

        <el-table-column prop="fixValue" min-width="80" label="销户说明">
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
  name: "TollInquiry",
  components: {
  },
  data() {
    return {
      chooseuserName:"选择用户",
      chooseuserVisible:false,
      TollInquiryEditVisible: false,
      TransferDetailsGH: false,
      historyData: {
        list: [
          {
            month:'201905',
            fname:'污水费',
            value:'12',
            money:'123',
            fare:'正常',
            },
          {
            month:'201805',
            fname:'水费',
            value:'12',
            money:'123',
            fare:'坏账',
            },
          {
            month:'201705',
            fname:'水费',
            value:'12',
            money:'123',
            fare:'呆账',
            },
        ],
      },
      crumbsData: {  //面包屑
        titleList: [
          { title: '收费管理' },
          { title: '收费查询' }
        ],

      },
      queryData: {
        con: "",
        watermeterWarehouse: "1",
        
        watermeterWarehouseOptions:[
            {
                name:"微信缴费",
                value:"1"
            },
            {
                name:"柜台收费",
                value:"2"
            },
            {
                name:"银行代扣",
                value:"3"
            },
            {
                name:"支付宝缴费",
                value:"4"
            },
        ],
        watermeterWarehouse1: "1",
        watermeterWarehouseOptions1:[
            {
                name:"现金支付",
                value:"1"
            },
            {
                name:"线上支付",
                value:"2"
            },
            {
                name:"刷卡支付",
                value:"3"
            },
        ],
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
      TollInquiryVisible: false,  //综合查询的显示和隐藏
      TollInquiryName: '销户办理',

    }
  },
  mounted() {
    // 侧边栏
    eventBus.$emit('asideMenuShow', 'businessMenuShow4')
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, '.water-meter-inquiry .kl-table', ['.water-meter-inquiry .toolbar', '.water-meter-inquiry .block', '.water-meter-inquiry #crumbs'])
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
            code: "未审核",
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
            code: "未审核",
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
            code: "未审核",
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

    search() {  //查询
      // this.tableQuery.page = 1
      // this.tableQuery.pageCount = 20
      this.init()
    },
    //   导出
    exportExcel() {
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

    cellClick(row, column, cell, event) { //点击文件名
      let that = this;

    },
    indexMethod(index) {//获取表格序号
      //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      return (this.histroyData.pageSize - 20) * this.histroyData.pages + (index + 1);

    },
    closeChooseuser(){
      this.chooseuserVisible = false;
    },
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
.TollInquiry {
  width: 100%;
  height: 100%;
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 8px;
  }
}
</style>
