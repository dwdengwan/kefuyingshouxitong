<template>

  <div class="userInfo">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <!-- //初始化按钮 -->
      <div class="bread-contain-right" v-if='backfillVisible'>
        <el-button size="mini" type="primary" @click="lockFlag">{{lockFlagStr}}</el-button>
        <el-button size="mini" icon="el-icon-edit" type="primary" @click="editShow">资料修改</el-button>
        <el-button size="mini" type="primary" @click="ctmChange">变动情况</el-button>
        <el-button size="mini" type="primary" @click="payInfo">费用信息</el-button>
        <el-button size="mini" type="primary" @click="meterInfo">抄表信息</el-button>
        <el-button size="mini" type="primary" @click="Predeposit">账户流水</el-button>
        <el-button size="mini" type="primary">打印合同</el-button>
        <el-button size="mini" type="primary">打印新卡</el-button>
        <el-button size="mini" type="primary" @click="AttachmentView">查看附件</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
      <!-- //录入 -->
      <div class="bread-contain-right" v-else>
        <el-button size="mini" type="primary" icon="el-icon-upload2" @click="DataDerivation">资料导出</el-button>
      </div>
    </div>
    <div v-if="backfillVisible" class="userInfoEdit">

      <!-- 弹出表资料变更 -->
      <el-dialog :title="DataChangeVisibleName" :visible.sync="DataChangeVisible" :close-on-click-modal="false" class="addDialog" @close="closeDialog1">

        <CustomerChangesAdd ref="CustomerChangesAdd"></CustomerChangesAdd>
        <div slot="footer" class="dialog-footer" ref="ruleForm">
          <el-button type="primary" size="mini" plain @click="submit('ruleForm')">保 存</el-button>
          <el-button type="info" size="mini" plain @click="closeDialog1('ruleForm')">取 消</el-button>
        </div>
      </el-dialog>

      <!-- 弹出表单客户变动情况 -->
      <el-dialog :title="ctmChangeName" :close-on-click-modal="false" :visible.sync="CustomerChangesVisible" @close="closeDialog1">
        <CustomerChangesEdit ref="ctmChangeEditor" :CustomerChangesEditData="CustomerChangesEditData"></CustomerChangesEdit>
      </el-dialog>
      <!-- 弹出表单费用信息 -->
      <el-dialog :title="payInfoName" :close-on-click-modal="false" :visible.sync="payInfoVisible" class="backfill" @close="closeDialog1">
        <WaterUseOverTheYears ref="payInfoEditor" :WaterUseOverTheYearsData="WaterUseOverTheYearsData"></WaterUseOverTheYears>
      </el-dialog>
      <!-- 弹出表单抄表信息 -->
      <el-dialog :title="MeterReadingName" :close-on-click-modal="false" :visible.sync="MeterReadingVisible" class="backfill" @close="closeDialog1">
        <MeterReadingInfo ref="MeterReading" :MeterReadingInfoData='MeterReadingInfoData'></MeterReadingInfo>
      </el-dialog>
      <!-- 弹出表单账户流水 -->
      <el-dialog :title="PredepositDdetailsName" :close-on-click-modal="false" :visible.sync="PredepositDdetailsVisible" class="backfill" @close="closeDialog1">
        <PredepositDdetailsInfo ref="PredepositDdetails" :PredepositDdetailsInfoData='PredepositDdetailsInfoData'></PredepositDdetailsInfo>
      </el-dialog>
      <!-- 弹出表单附件查看 -->
      <el-dialog :title="AttachmentViewName" :close-on-click-modal="false" :visible.sync="AttachmentViewVisible" class="AttachmentView" @close="closeDialog1">
        <AttachmentViewInfo ref="AttachmentView"></AttachmentViewInfo>
        <div slot="footer" class="dialog-footer" ref="ruleForm">
          <el-button type="primary" size="mini" plain @click="backfillSubmit">保 存</el-button>
          <el-button type="info" size="mini" plain @click="closeDialog1">取 消</el-button>
        </div>
      </el-dialog>

      <userInfoEdit 
        @fromLockFlag="getLockFlag"
        ref="userInfoEdit" :formDataUserNo="formDataUserNo"></userInfoEdit>

    </div>

    <div class="userInfoIndex" v-else>
      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="tableQuery" class="demo-form-inline">
          <!-- <el-form-item class="form-left"> -->
            <el-form-item label="营业所：">
              <el-select clearable v-model="tableQuery.businessAbode" placeholder="">
                <el-option v-for="(item,index) in businessAbodeOptions" :key="index" :label="item.name" :value="item.value"></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="模糊查询：">
              <el-tooltip class="item" effect="dark" content="用户编号、用户名称、用户地址、册本号、手机号码" placement="top">
                <el-input v-model="tableQuery.fuzzyQuery" clearable size="mini"></el-input>
              </el-tooltip>
            </el-form-item>
            <el-form-item>
              <el-button class='searchBtn' @click="search" icon="el-icon-search"></el-button>
              <el-button type="primary" size="mini" @click="ComprehensiveQuery"  class="soce-query">综合查询</el-button>
            </el-form-item>

          <!-- </el-form-item> -->

        </el-form>
      </div>

      <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" 
        stripe border :data="tableData.list" @cell-click="handle" class="wuserInfo-table">

          <el-table-column type="index" label="NO." width="50" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="ctmNo" min-width="100" label="客户编号">
          </el-table-column>

          <el-table-column prop="accountNo" min-width="100" label="账户编号">
          </el-table-column>

          <el-table-column prop="bookNo" min-width="100" label="册本号">
          </el-table-column>

          <el-table-column prop="userNo" min-width="100" label="用户编号">
          </el-table-column>

          <el-table-column prop="ctmName" min-width="120" label="客户名称">

          </el-table-column>

          <el-table-column prop="ctmAddr" min-width="120" label="客户地址">
          </el-table-column>

          <el-table-column prop="businessAbode" min-width="80" label="营业所">
          </el-table-column>

          <el-table-column prop="openDate" min-width="100" label="立户日期" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="meterReadingCycle" min-width="100" label="抄表周期">
          </el-table-column>

          <el-table-column prop="status" min-width="80" label="用户状态">

          </el-table-column>

          <el-table-column label="操作" fixed="right" width="80">
            <template slot-scope="scope">

              <el-button type="text" @click.native="details(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
          </el-pagination>
        </div>
      </div>
      
      <!-- 弹出表单综合查询 -->
      <el-dialog :title="WaterEditorName" :close-on-click-modal="false" :visible.sync="waterAddVisible" class="addDialog" @close="closeDialog">
        <ComprehensiveQuery ref="comprehensiveQuery" :tableQuery='tableQuery.l'></ComprehensiveQuery>
        <div slot="footer" class="dialog-footer" ref="ruleForm">
          <el-button type="primary" size="mini" plain @click="submit('ruleForm');">查询</el-button>
          <el-button type="info" size="mini" plain @click="closeDialog('ruleForm')">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 弹出表单客户资料 -->
      <el-dialog v-if="countManagementVisible" :title="countManagementName" :close-on-click-modal="false" :visible.sync="countManagementVisible" class="addDialog" @close="closeDialog">
        <countManagementEdit  :formDataUserNo="formDataUserNo" ref="childcountManagement"></countManagementEdit>
      </el-dialog>
      </div>
    </div>
</template>
<script>
import ComprehensiveQuery from "./ComprehensiveQuery"
import userInfoEdit from "./userInfoEdit"

import countManagementEdit from "@/components/IntegratedBusiness/UserInformation/ctmInfo"//客户资料

import CustomerChangesEdit from "@/components/IntegratedBusiness/UserInformation/CustomerChanges"
import WaterUseOverTheYears from "@/components/IntegratedBusiness/UserInformation/WaterUseOverTheYears"
import MeterReadingInfo from "@/components/IntegratedBusiness/UserInformation/MeterReadingInfo"
import PredepositDdetailsInfo from "@/components/IntegratedBusiness/UserInformation/PredepositDdetailsInfo"
import AttachmentViewInfo from "@/components/IntegratedBusiness/UserInformation/AttachmentViewInfo"

import DataChangeVisible from "@/views/CustomerCenter/DataChange/DataChangeAdd"//资料变更
import CustomerChangesAdd from "@/views/CustomerCenter/changeMangement/CustomerChangeAdd"
import customerManagement from "../customerManagement"

export default {
  name: "userInfo",
  components: {
    ComprehensiveQuery,
    userInfoEdit,
    DataChangeVisible,
    CustomerChangesAdd,
    CustomerChangesEdit,
    WaterUseOverTheYears,
    MeterReadingInfo,
    PredepositDdetailsInfo,
    AttachmentViewInfo,
    customerManagement,
    countManagementEdit
  },
  data() {
    return {
      CustomerChangesEditData:{//变动情况
        userNo:'',
      },
      WaterUseOverTheYearsData:{//费用信息
        userNo:'',
      },
      MeterReadingInfoData:{//抄表信息
        userNo:'',
      },
      PredepositDdetailsInfoData:{//账户流水
        userNo:'',
      },
      lockFlagStr:'锁定',
      DataChangeVisibleName: "资料变更",
      DataChangeVisible: false,
      countManagementName: '查看客户资料',
      countManagementVisible: false,
      test: '测试',
      crumbsData: {  //面包屑
        titleList: [
          { title: '客户管理' },
          { title: '查询' }
        ],

      },
      crumbsData1: {  //面包屑
        titleList: [
          { title: '客户管理', path: '/CustomerCenter' },
          { title: '查询', method: () => { window.histroy.back() } },
          // { title: '编辑', method: () => { window.histroy.back() } },
        ],

      },
      isActive: false,  //控制高级查询内容的显示
      tableQuery: {
        page: 1,
        pageCount: 20,
        businessAbode: "",
        fuzzyQuery: '',
        businessAbode:'',
        list: []
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
      tableData: {
        list: [
        ]
      },
      formData: {//编辑页面的id
        userNo: '',
      },
      waterAddVisible: false,  //综合查询的显示和隐藏
      WaterEditorName: '综合查询',
      ruleFormData: {},
      backfillVisible: false,
      userInfoName: "用户资料-编辑",
      userInfoVisible: false,
      CustomerChangesVisible: false,
      ctmChangeName: '变动情况',
      ruleFormData: {},
      payInfoName: "费用信息",
      payInfoVisible: false,
      MeterReadingName: "抄表信息",
      MeterReadingVisible: false,
      PredepositDdetailsName: "账户流水",
      PredepositDdetailsVisible: false,
      AttachmentViewName: "查看附件",
      AttachmentViewVisible: false,
      businessAbodeOptions:[],//营业所下拉框
      formDataUserNo:'',//用户编号存值
    }
  },
  mounted() {
    // 侧边栏
    eventBus.$emit('asideMenuShow', 'businessMenuShow2')
    this.init();
    this.businessInit()
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, '.userInfoIndex', ['.userInfo .toolbar', '.userInfo .block',])
    });
  },
  methods: {
    init() {
      let _this = this
      let params = {
        "busicode": "UserInfoList",
        "data": _this.tableQuery,
      }
      this.$api.fetch({
        params,//参数

      }).then(res => {
        _this.tableData = res;
        this.$nextTick(() => {
          //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
          this.common.changeTable(this, '.userInfoIndex', ['.userInfo .toolbar', '.userInfo .block',])
        });
      })
    },
    lockFlag() {//锁定
      let _this = this;
      let data = this.$refs.userInfoEdit.toParentData();
      let params = {
        "busicode": "UserLockFlagUpdate",
        data,
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        if(_this.lockFlagStr == '锁定'){
          _this.lockFlagStr = "解锁";
        }else if ( _this.lockFlagStr == "解锁"){
          _this.lockFlagStr = "锁定";
        }
        _this.$refs.userInfoEdit.userInfoShow = false
        _this.$refs.userInfoEdit.init()
      })
    },
    // 营业所下拉框的初始化
    businessInit() {
      let _this = this
      let params = {
          "busicode": "BusinessAbodeSelect",
          "data": {},
      }
      this.$api.fetch({
      params: params,//参数

      }).then(res => {
        _this.businessAbodeOptions = res;
      })
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

    // 返回
    handleClose() {
      this.$refs.BusinessAreaEdit.handleClose();
    },
    backfillSubmit() {

    },
    search() {  //查询
      this.init()
    },
    //   导出

    //分页
    handleSizeChange(val) { //显示多少数据一页
      this.tableQuery.pageCount = val
      this.tableQuery.page = 1
      this.init()
    },
    handleCurrentChange(val) {  //显示多少页码
      this.tableQuery.page = val
      this.init()
    },
    handle(row, column, cell, event) { //点击文件名
      let that = this;
      if (column.label === '客户编号') {
        this.countManagementVisible = true
        this.formDataUserNo = row.ctmNo
      }

    },
    getLockFlag(val){
      if(val == '1'){
        this.lockFlagStr = "解锁";
      }else {
        this.lockFlagStr = "锁定";
      }
    },
    indexMethod(index) {//获取表格序号
      return (this.tableQuery.pageCount - 20) * this.tableQuery.page + (index + 1);
    },
    closeDialog() { //关闭会话
      this.waterAddVisible = false;
      this.backfillVisible = false;
      this.userInfoVisible = false;
      //客户资料查看
      this.formDataUserNo = '';
      this.countManagementVisible = false;
    },

    closeDialog1() {
      this.CustomerChangesVisible = false;
      this.payInfoVisible = false;
      this.MeterReadingVisible = false;
      this.PredepositDdetailsVisible = false;
      this.AttachmentViewVisible = false;
      this.DataChangeVisible = false;
    },
    //弹出框
    submit(formName) {	//提交
      // this.$refs.comprehensiveQuery.submit()
      let that = this;
      let list = that.tableQuery.list;
      let gridData = that.$refs.comprehensiveQuery.gridData;
      let message = '';
      for (let i = 0; i < gridData.length; i++) {
        if (!gridData[i].FieldName || !gridData[i].Operator || !gridData[i].LogicalValue || !gridData[i].QueryValue) {
          if (!gridData[i].FieldName) {
            message = "字段名不能为空";
          } else if (!gridData[i].Operator) {
            message = "操作符不能为空";
          } else if (!gridData[i].QueryValue) {
            message = "查询值不能为空";
          } else if (!gridData[i].LogicalValue) {
            message = "逻辑值不能为空";
          }
          this.$message({
            message,
            type: 'warning'
          });
          return
        }
      }
      that.tableQuery.list = that.$refs.comprehensiveQuery.gridData;
      that.init()
      that.waterAddVisible = false;
    },
    // 资料导出
    DataDerivation() {

    },
    // 综合查询
    ComprehensiveQuery() {
      this.waterAddVisible = true;
    },
    // 详情
    details(i, row) {
      this.formDataUserNo = row.userNo;
      this.CustomerChangesEditData.userNo = row.userNo;
      this.WaterUseOverTheYearsData.userNo = row.userNo;
      this.MeterReadingInfoData.userNo = row.userNo;
      this.PredepositDdetailsInfoData.userNo = row.userNo;
      this.backfillVisible = true;
    },
    editShow() {
      this.DataChangeVisible = true
    },
    ctmChange() {
      this.CustomerChangesVisible = true;
    },
    payInfo() {
      this.payInfoVisible = true;
    },
    meterInfo() {
      this.MeterReadingVisible = true;
    },
    Predeposit() {
      this.PredepositDdetailsVisible = true;
    },
    AttachmentView() {
      this.AttachmentViewVisible = true;
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
.userInfo {
  height: 100%;
  width: 100%;
  .userInfoIndex{
    height: calc(100% - 41px);
  }
  .bread-contain #crumbs {
    width: 20% !important;
  }
  .bread-contain .bread-contain-right {
    width: 78% !important;
  }
  .wuserInfo-table {
    .el-table__body {
      tr {
        td:nth-child(2) {
          div {
            color: #3195f4;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
