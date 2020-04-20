<template>
  <div class="BankCharges">
    <!-- 银行代扣模块 -->
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-if="SellOutVisible">
        <el-button type="primary" size="mini" @click="submit('ruleForm');">确 定</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
      <div class="bread-contain-right" v-if="invoiceVisible">
        <el-button @click="exportExcel" size="mini" type="primary">生成电子发票</el-button>
        <el-button @click="exportExcel" size="mini" type="primary">打印发票</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
      <div class="bread-contain-right" v-if="TypesOfWaterUseVisible">
        <el-button @click="exportExcel" icon="el-icon-upload2" size="mini" type="primary">导出</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
      <div class="bread-contain-right" v-show="BankChargesCon">
        <el-button size="mini" type="primary" @click="SellOutShow">出盘</el-button>
      </div>
    </div>
    <div v-if="TypesOfWaterUseVisible" class="TypesOfWaterUseCon">
      <bankDetails></bankDetails>
    </div>
    <div v-if="SellOutVisible" class="SellOutCon">
      <SellOut></SellOut>
    </div>
    <div v-if="invoiceVisible" class="invoiceCon">
      <invoice></invoice>
    </div>
    <section v-show="BankChargesCon" class="BankChargesCon">
      <!-- 代扣出盘 -->
      <div class="DeductionOffer">

        <div class="toolbar">
          <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">

            <el-form-item class="form-left">

              <el-form-item label="账期：">
                <el-date-picker v-model="formData.con" type="month" placeholder="选择月">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="收费类型：">
                <el-select clearable v-model="formData.waterMeterType" placeholder="银行代扣">
                  <el-option v-for="(item,index) in formData.waterMeterTypeOptions" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="营业所：">
                <el-select clearable v-model="formData.waterMeterType1" placeholder="营业所">
                  <el-option v-for="(item,index) in formData.waterMeterTypeOptions1" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              

              <el-form-item>
                <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
              </el-form-item>

            </el-form-item>

            <el-form-item class="form-right">

            </el-form-item>

          </el-form>
        </div>
        <div class="kl-table">
          <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" class="change-tables-table">

            <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
            </el-table-column>

            <el-table-column prop="outBank" min-width="100" label="银行名称">
            </el-table-column>

            <el-table-column prop="outAmount" min-width="100" label="出盘金额">
            </el-table-column>

            <el-table-column prop="outMoney" min-width="100" label="出盘笔数">
            </el-table-column>

            <el-table-column prop="outDate" min-width="80" label="出盘时间">

            </el-table-column>

            <el-table-column prop="successAmount" min-width="100" label="成功数">
            </el-table-column>

            <el-table-column prop="loseAmount" min-width="80" label="失败数">

            </el-table-column>

            <el-table-column prop="returnDate" min-width="100" label="上传时间">
            </el-table-column>

            <el-table-column prop="flux" min-width="80" label="操作" fixed="right">
              <template   slot-scope="scope">
                <div class="cell"  v-if="scope.row.returnDate !== '-'"> 
                  <el-button  type="text" @click="details">详情</el-button>
                  <span >|</span>
                  <el-button type="text" @click="invoiceShow">发票</el-button>
                </div>
                <div class="cell"  v-else> 
                  <el-button type="text">回盘</el-button>
                  <span >|</span>
                  <el-button type="text">撤销</el-button>
                </div>
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
    </section>
    <!-- 代扣回盘 -->
    <div class="DeductionRebate" v-if="DeductionRebate">
      <div class="toolbar">
        <div class="toolBtn">
          <el-button size="mini" type="primary">保存</el-button>

          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>

        </div>

      </div>
      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">

          <el-form-item class="form-left">
            <el-form-item label='上传日期：'>
              <el-date-picker v-model="DateChoosevalue" type="daterange" value-format="yyyy-MM-dd" range-separator="至" :picker-options="pickerOptions" :clearable=false start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="出盘记录：">
              <el-select clearable v-model="formData.watermeterWarehouse" placeholder="未审">
                <el-option v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="回盘银行：">
              <el-select clearable v-model="formData.waterMeterManufacturer" placeholder="未审">
                <el-option v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
            </el-form-item>

          </el-form-item>

          <el-form-item class="form-right">
            <el-button @click="exportExcel" icon="el-icon-upload2" size="mini" type="primary">上传回盘文件</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" class="change-tables-table">

          <el-table-column type="index" label="NO." width="50" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="code" min-width="100" label="回盘银行">
          </el-table-column>

          <el-table-column prop="daytime" min-width="100" label="回盘总户数">
          </el-table-column>

          <el-table-column prop="areaName" min-width="80" label="已处理户数">

          </el-table-column>

          <el-table-column prop="lvalue" min-width="100" label="成功数">
          </el-table-column>

          <el-table-column prop="daytime" min-width="100" label="失败数">
          </el-table-column>

          <el-table-column prop="areaName" min-width="100" label="上传时间">

          </el-table-column>

          <el-table-column prop="lvalue" min-width="100" label="上传人">
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 代扣清单 -->
    <div class="DeductionList" v-if="DeductionList">
      <div class="toolbar">
        <div class="toolBtn">
          <el-button size="mini" type="primary">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
      </div>

      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">

          <el-form-item class="form-left">

            <el-form-item label="代扣银行：">
              <el-select clearable v-model="formData.watermeterWarehouse" placeholder="请选择银行">
                <el-option v-for="(item,index) in formData.waterMeterTypeOptions" :key="index" :label="item.name" :value="item.value"></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="出盘状态：">
              <el-select clearable v-model="formData.waterMeterManufacturer" placeholder="未出盘">
                <el-option v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="回盘状态：">
              <el-select clearable v-model="formData.waterMeterCaliber" placeholder="已回盘">
                <el-option v-for="(item,index) in formData.waterMeterManufacturerOptions" :key="index" :label="item.name" :value="item.value"></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="开始年月：">
              <el-input v-model="formData.con" placeholder="" clearable></el-input>
            </el-form-item>

            <el-form-item>

              <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
            </el-form-item>

          </el-form-item>

          <el-form-item class="form-right">
            <el-button @click="exportExcel" size="mini" type="primary">打印失败清单</el-button>
            <el-button @click="exportExcel" size="mini" type="primary">打印清单</el-button>
            <el-button @click="exportExcel" icon="el-icon-upload2" size="mini" type="primary">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" class="change-tables-table">

          <el-table-column type="index" label="NO." width="50" :index="indexMethod">
          </el-table-column>

          <el-table-column type="selection" width="50">
          </el-table-column>

          <el-table-column prop="code" min-width="100" label="用户编号">
          </el-table-column>

          <el-table-column prop="daytime" min-width="80" label="用户名称">
          </el-table-column>

          <el-table-column prop="areaName" min-width="180" label="用户地址">

          </el-table-column>

          <el-table-column prop="endTime" min-width="80" label="册本">
          </el-table-column>

          <el-table-column prop="fcode" min-width="80" label="排序">
          </el-table-column>

          <el-table-column prop="fix" min-width="100" label="座机号码">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="100" label="手机号码">

          </el-table-column>

          <el-table-column prop="flux" min-width="150" label="开户行">
          </el-table-column>

          <el-table-column prop="getMeter" min-width="180" label="开户账号">
          </el-table-column>

          <el-table-column prop="daytime" min-width="100" label="开户名">
          </el-table-column>

          <el-table-column prop="isxz" min-width="80" label="合计">

          </el-table-column>

          <el-table-column prop="meter" min-width="80" label="笔数">
          </el-table-column>

          <el-table-column prop="model" min-width="80" label="销账标记">

          </el-table-column>

          <el-table-column prop="modifyBy" min-width="80" label="票据类型">
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 代扣发票 -->

    <div class="WithholdingInvoice" v-if="WithholdingInvoice">

      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">

          <el-form-item class="form-left">

            <el-form-item label='收费日期：'>
              <el-date-picker v-model="DateChoosevalue" type="daterange" value-format="yyyy-MM-dd" range-separator="至" :picker-options="pickerOptions" :clearable="true" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="收费银行：">
              <el-select clearable v-model="formData.watermeterWarehouse" placeholder="">
                <el-option v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="户号：">
              <el-input v-model="formData.con" placeholder="200101" clearable></el-input>
            </el-form-item>

            <el-form-item>
              <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
            </el-form-item>

          </el-form-item>

          <el-form-item class="form-right">
            <el-button @click="exportExcel" size="mini" type="primary">生成电子发票</el-button>
            <el-button @click="exportExcel" icon="el-icon-download" size="mini" type="primary">下载电子发票</el-button>
            <el-button @click="exportExcel" size="mini" type="primary">补打收据</el-button>
            <el-button @click="exportExcel" size="mini" type="primary">发票作废</el-button>
          </el-form-item>

        </el-form>
      </div>
      <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" class="change-tables-table">

          <el-table-column type="index" label="NO." width="50" :index="indexMethod">
          </el-table-column>

          <el-table-column type="selection" width="50">
          </el-table-column>

          <el-table-column prop="code" min-width="150" label="用户编号">
          </el-table-column>

          <el-table-column prop="daytime" min-width="100" label="用户名称">
          </el-table-column>

          <el-table-column prop="areaName" min-width="80" label="用户地址">

          </el-table-column>

          <el-table-column prop="lvalue" min-width="200" label="册本">
          </el-table-column>

          <el-table-column prop="code" min-width="150" label="排序">
          </el-table-column>

          <el-table-column prop="daytime" min-width="100" label="座机号码">
          </el-table-column>

          <el-table-column prop="areaName" min-width="80" label="手机号码">

          </el-table-column>

          <el-table-column prop="lvalue" min-width="200" label="开户行">
          </el-table-column>
          
          <el-table-column prop="code" min-width="150" label="开户账号">
          </el-table-column>

          <el-table-column prop="daytime" min-width="100" label="开户名">
          </el-table-column>

          <el-table-column prop="areaName" min-width="80" label="合计">

          </el-table-column>

          <el-table-column prop="lvalue" min-width="200" label="笔数">
          </el-table-column>

          <el-table-column prop="areaName" min-width="80" label="销账标记">

          </el-table-column>

          <el-table-column prop="lvalue" min-width="200" label="票据类型">
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import bankDetails from "./bankDetails";
import SellOut from "./SellOut";
import invoice from "./invoice";
export default {
  name: "BankCharges",
  components: {
    bankDetails,
    SellOut,
    invoice
  },
  data() {
    return {
      crumbsData: {
        //面包屑
        titleList: [{ title: "收费管理" }, { title: "银行代扣" }]
      },
      formData: {
        con: "",
        watermeterWarehouse: "",
        watermeterWarehouseOptions: [
          {
            name: "全部",
            value: "1"
          },
          {
            name: "未审批",
            value: "2"
          },
          {
            name: "已审批",
            value: "3"
          },
          {
            name: "已取消",
            value: "4"
          }
        ],
        waterMeterManufacturer: "",
        waterMeterManufacturerOptions: [
          {
            name: "全部",
            value: "1"
          },
          {
            name: "未回盘",
            value: "2"
          },
          {
            name: "已回盘",
            value: "3"
          },
          {
            name: "回盘成功",
            value: "4"
          },
          {
            name: "回盘失败",
            value: "5"
          }
        ],
        waterMeterType: "",
        waterMeterTypeOptions: [
          {
            name: "银行代扣",
            value: "4"
          },
          {
            name: "银行托收",
            value: "5"
          }
        ],
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
      DeductionOffer: true,
      DeductionRebate: false,
      DeductionList: false,
      WithholdingInvoice: false,
      TypesOfWaterUseVisible: false, //综合查询的显示和隐藏
      TypesOfWaterUseName: "详情",
      SellOutName: "出盘",
      SellOutVisible: false,
      invoiceName: "发票",
      invoiceVisible: false,
      BankChargesCon: true
    };
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, ".BankCharges", [
      ".BankCharges .toolbar",
      ".BankCharges .block",
      ".BankCharges #crumbs"
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
            outBank: "030501横沥农信",
            outAmount: 3001,
            outMoney:10000,
            outDate:'2020-01-10',
            successAmount:122,
            loseAmount:0,
            returnDate:'2020-01-15',
          },
          {
            outBank: "030501横沥农信",
            outAmount: 3001,
            outMoney:10000,
            outDate:'2020-01-10',
            successAmount:'-',
            loseAmount:'-',
            returnDate:'-',
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
      this.ArrearsDetails = {
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
            sub: "",
            Total: ""
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
            sub: "",
            Total: ""
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
            areaName: "",
            code: "",
            concentrator: "",
            connect: null,
            daytime: "",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "合计：",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
            lvalue: "笔数：",
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
            sub: "3",
            Total: "17.7"
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
    handleClick(tab, event) {},
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
      this.SellOutVisible = false;
      this.TypesOfWaterUseVisible = false;
      this.invoiceVisible = false;
      this.BankChargesCon = true;
      // this.crumbsData.titleList.splice(2,1);
    },
    details() {
      this.TypesOfWaterUseVisible = true;
      this.BankChargesCon = false;
      // this.$set(this.crumbsData.titleList,"2",{title:'详情',method:()=>{window.histroy.back()}})
    },
    SellOutShow() {
      this.SellOutVisible = true;
      this.BankChargesCon = false;
      // this.$set(this.crumbsData.titleList,"2",{title:'出盘',method:()=>{window.histroy.back()}})
    },
    invoiceShow() {
      this.invoiceVisible = true;
      this.BankChargesCon = false;
      // this.$set(this.crumbsData.titleList,"2",{title:'发票',method:()=>{window.histroy.back()}})
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
.BankCharges {
  width: 100%;
  height: 100%;
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 8px;
  }
  .el-dialog .el-dialog__body {
    height: 100%;
  }
  .SellOutDialog,
  .invoiceDialog {
    .el-dialog__body {
      height: calc(100% - 136px) !important;
      overflow: auto;
      padding: 0px;
    }
  }
}
#app .SellOutDialog .el-dialog {
  width: 50%;
  height: 70%;
  margin-top: 5% !important;
}
</style>

