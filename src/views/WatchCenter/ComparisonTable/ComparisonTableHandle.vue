<template>
  <div class="ComparisonTableHandle process">
    <div class="process-left">
      <!-- 登记信息 -->
      <el-form v-if="operationShow == 1" :inline="true" size="mini" :model="backfillSubmitForm" class="formBill" label-width="130px">

        <!-- <commonPart :parentToChild="'2'"></commonPart> -->
        <el-tooltip class="item" effect="dark" content="请输入户号/账号/客户编号/手机号/身份证号" placement="top">
          <el-select v-model="fuzzyQuery" placeholder="请选择" class="keyword-input" filterable remote :remote-method="search" @change="getRegInfo">
            <el-option v-for="item in allData" :key="item.userInfo.id" :label="item.userInfo.userNo" :value="item.userInfo.meterNo">
            </el-option>
          </el-select>
        </el-tooltip>

        <el-form-item label="单据编号：">
          <el-input class="read-only" disabled v-model="formData.msVerify.billNo" placeholder="-"></el-input>
        </el-form-item>
        <el-form-item label="单据日期：">
          <el-input class="read-only" disabled v-model="formData.msVerify.billDate" placeholder="-"></el-input>
        </el-form-item>

        <legend class="legendColumn">用户信息</legend>
        <el-form-item label="客户编号：">
          <el-input class="read-only" disabled v-model="formData.ctmInfo.ctmNo" placeholder="-"></el-input>
        </el-form-item>
        <el-form-item label="客户名称：">
          <el-input class="read-only" disabled v-model="formData.ctmInfo.ctmName" placeholder="-"></el-input>
        </el-form-item>
        <el-form-item label="客户地址：">
          <el-input class="read-only" disabled v-model="formData.ctmInfo.ctmAddr" placeholder="-"></el-input>
        </el-form-item>
        <el-form-item label="用户编号：">
          <el-input class="read-only" disabled v-model="formData.userInfo.userNo" placeholder="-"></el-input>
        </el-form-item>
        <el-form-item label="证件号码：">
          <el-input class="read-only" disabled v-model="formData.ctmInfo.certNo" placeholder="-"></el-input>
        </el-form-item>
        <legend class="legendColumn">登记信息</legend>
        <el-form-item label="水表编号：">
          <el-input v-model="formData.userInfo.meterNo" placeholder="-" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="装表地址：">
          <el-input v-model="formData.userInfo.setupMeterAddr" placeholder="-" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表形态：">
          <el-input v-model="formData.msInfo.meterFormName" placeholder="-" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表厂家：">
          <el-input v-model="formData.msInfo.meterFactoryName" placeholder="-" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表型号：">
          <el-input v-model="formData.msInfo.meterModelName" placeholder="-" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表口径：">
          <el-input v-model="formData.msInfo.meterBoreName" placeholder="-" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="装表日期：">
          <el-input v-model="formData.userInfo.setupMeterDate" placeholder="-" disabled class="read-only"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="支付押金：">
          <el-input v-model="formData.msVerify.deposit" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="备注：" class="f2">
          <el-input type="textarea" v-model="formData.msVerify.comments" size="mini" :rows="2" clearable placeholder="备注"></el-input>
        </el-form-item>
        <legend class="legendColumn">流程处理</legend>
        <procedure></procedure>
      </el-form>
      <!-- 换表信息 -->
      <el-form :inline="true" size="mini" v-if="operationShow == 2" :model="backfillSubmitForm" class="formBill" label-width="130px">
        <!-- <commonPart :parentToChild="'2'"></commonPart> -->

        <legend class="legendColumn">用户信息</legend>
        <el-form-item label="客户编号：">
          <el-input class="read-only" disabled v-model="formData.ctmInfo.ctmNo" placeholder="-"></el-input>
        </el-form-item>
        <el-form-item label="客户名称：">
          <el-input class="read-only" disabled v-model="formData.ctmInfo.ctmName" placeholder="-"></el-input>
        </el-form-item>
        <el-form-item label="客户地址：">
          <el-input class="read-only" disabled v-model="formData.ctmInfo.ctmAddr" placeholder="-"></el-input>
        </el-form-item>
        <el-form-item label="用户编号：">
          <el-input class="read-only" disabled v-model="formData.userInfo.userNo" placeholder="-"></el-input>
        </el-form-item>
        <el-form-item label="证件号码：">
          <el-input class="read-only" disabled v-model="formData.ctmInfo.certNo" placeholder="-"></el-input>
        </el-form-item>

        <legend class="legendColumn">换表信息</legend>

        <el-form-item label="原表底码：">
          <el-tooltip class="item" effect="dark" content="请上传底码照片" placement="top-start">
            <el-input v-model="formData.msVerify.oldMeterNum" placeholder="请输入原表底码">
              <el-button slot="append" icon="el-icon-upload2" type="primary" class="scanning-btn" @click="idCard()" size='mini'></el-button>
            </el-input>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="临时表起码：">
          <el-tooltip class="item" effect="dark" content="请上传起码照片" placement="top-start">
            <el-input v-model="formData.msVerify.tempMeterStartNum" placeholder="请输入临时表起码">
              <el-button slot="append" icon="el-icon-upload2" type="primary" class="scanning-btn" @click="idCard()" size='mini'></el-button>
            </el-input>
          </el-tooltip>
        </el-form-item>

        <!-- <el-form-item :label="v.label" v-for="(v,i) in backfillSubmitForm.backfillInput" :key="i">
          <el-input v-model="v.value" :placeholder="v.tips"></el-input>
        </el-form-item> -->

        <el-form-item label="水表编号：">
          <el-input v-model="formData.userInfo.meterNo" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="换表日期：">
          <el-date-picker v-model="formData.msVerify.replaceDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="装表地址：" class="f2">
          <el-input type="textarea" v-model="formData.msVerify.installAddr" :rows="2" placeholder=""></el-input>
        </el-form-item>

        <legend class="legendColumn">流程处理</legend>
        <procedure></procedure>

      </el-form>

      <!-- 校核信息 -->
      <el-form :inline="true" size="mini" v-if="operationShow == 3" :model="backfillSubmitForm" class="formBill" label-width="130px">
        <!-- <commonPart :parentToChild="'2'"></commonPart> -->

        <legend class="legendColumn">用户信息</legend>
        <el-form-item label="客户编号：">
          <el-input class="read-only" disabled v-model="formData.ctmInfo.ctmNo" placeholder="-"></el-input>
        </el-form-item>
        <el-form-item label="客户名称：">
          <el-input class="read-only" disabled v-model="formData.ctmInfo.ctmName" placeholder="-"></el-input>
        </el-form-item>
        <el-form-item label="客户地址：">
          <el-input class="read-only" disabled v-model="formData.ctmInfo.ctmAddr" placeholder="-"></el-input>
        </el-form-item>
        <el-form-item label="用户编号：">
          <el-input class="read-only" disabled v-model="formData.userInfo.userNo" placeholder="-"></el-input>
        </el-form-item>
        <el-form-item label="证件号码：">
          <el-input class="read-only" disabled v-model="formData.ctmInfo.certNo" placeholder="-"></el-input>
        </el-form-item>

        <legend class="legendColumn">校核信息</legend>
        <el-form-item label="校核人：">
          <el-input v-model="formData.msVerify.checkStaffName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="校核日期：">
          <el-date-picker v-model="formData.msVerify.checkDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="校核结果：">
          <el-select clearable v-model="formData.msVerify.checkResult" placeholder="正常" @change="reaultChange">
            <el-option v-for="(item,index) in descoptions" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注：" class="f3">
          <el-input type="textarea" v-model="formData.msVerify.comments" :rows="2" placeholder="备注"></el-input>
        </el-form-item>

        <legend class="legendColumn">流程处理</legend>
        <procedure></procedure>

      </el-form>

      <!-- 处理信息 -->
      <el-form :inline="true" size="mini" v-if="operationShow == 4" :model="backfillSubmitForm" class="formBill" label-width="130px">
        <!-- <commonPart :parentToChild="'2'"></commonPart> -->

        <legend class="legendColumn">用户信息</legend>
        <el-form-item label="客户编号：">
          <el-input class="read-only" disabled v-model="formData.ctmInfo.ctmNo" placeholder="-"></el-input>
        </el-form-item>
        <el-form-item label="客户名称：">
          <el-input class="read-only" disabled v-model="formData.ctmInfo.ctmName" placeholder="-"></el-input>
        </el-form-item>
        <el-form-item label="客户地址：">
          <el-input class="read-only" disabled v-model="formData.ctmInfo.ctmAddr" placeholder="-"></el-input>
        </el-form-item>
        <el-form-item label="用户编号：">
          <el-input class="read-only" disabled v-model="formData.userInfo.userNo" placeholder="-"></el-input>
        </el-form-item>
        <el-form-item label="证件号码：">
          <el-input class="read-only" disabled v-model="formData.ctmInfo.certNo" placeholder="-"></el-input>
        </el-form-item>

        <legend class="legendColumn">处理信息</legend>
        <div v-if="!resultShow" :model="formData.msVerify">
          <div style="padding: 5px 40px;color: #b5bbb5;">检验结果正常，换回原水表</div>
          <!-- <el-form-item :label="v.label" v-for="(v,i) in backfillSubmitForm.backfillInput" :key="i">
            <el-input v-model="v.value" :placeholder="v.tips"></el-input>
          </el-form-item> -->

          <el-form-item label="装表地址：">
            <el-input v-model="formData.msVerify.installAddr" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="水表编号：">
            <el-input v-model="formData.userInfo.meterNo" placeholder=""></el-input>
          </el-form-item>
        </div>

        <div v-else :model="backfillSubmitForm">
          <div style="padding: 5px 40px;color: #b5bbb5;">检验结果异常，退回押金</div>
          <el-form-item label="原表处理方式：">
            <el-select clearable v-model="formData.msVerify.oldHandleWay" placeholder="报废">
              <el-option v-for="(item,index) in backfillSubmitForm.OldTableProcessingoptions" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="退款方式：" style="width: 40%">
            <el-radio v-model="formData.msVerify.cashPledgeRefundWay" label="1">转余额</el-radio>
            <el-radio v-model="formData.msVerify.cashPledgeRefundWay" label="2">现金</el-radio>
            <el-radio v-model="formData.msVerify.cashPledgeRefundWay" label="3">转账</el-radio>
          </el-form-item>
        </div>
        <legend class="legendColumn">流程处理</legend>
        <procedure></procedure>

      </el-form>

      <!-- 结束 -->
      <el-form :inline="true" size="mini" v-if="operationShow == 5" :model="backfillSubmitForm" class="formBill" label-width="130px">
      </el-form>
    </div>

    <div class="StepCollapse" @click="collapse">
      <i class="el-icon-arrow-right leftChange"></i>
    </div>

    <div class="process-right" v-if="approvalShow">

      <div class="stepsTitle">流程信息</div>
      <div class="line"></div>
      <el-steps :active="operation" direction="vertical" finish-status="success">
        <el-step title="登记信息" @click.native="stepActive(1)"></el-step>
        <el-step title="换表信息" @click.native="stepActive(2)"></el-step>
        <el-step title="校核信息" @click.native="stepActive(3)"></el-step>
        <el-step title="处理信息" @click.native="stepActive(4)"></el-step>
        <el-step title="结束" @click.native="stepActive(5)"></el-step>
      </el-steps>
    </div>

  </div>
</template>
<script>
import commonPart from "@/views/CustomerCenter/changeMangement/commonPart"; //公告模块
import uploadFile from "@/components/uploadPic"; //上传附件
import procedure from "@/components/procedure"; //流程审核
export default {
  name: "ComparisonTableHandle",
  props: ['ComparisonTableHandleNeedData'],
  components: {
    uploadFile,
    procedure,
    commonPart
  },
  data() {
    return {
      // 模糊查询
      fuzzyQuery: '',
      // 模糊查询所有数据
      allData: {},
      // 用户信息数据
      userData: {
        ctmInfo: {},
        msInfo: {},
        userInfo: {},
      },
      // 所有信息数据
      formData: {
        ctmInfo: {},
        msInfo: {},
        userInfo: {},
        msVerify: {},
      },
      // 暂存按钮入参
      saveData: {},












      approvalShow: true,

      resultShow: true,
      operationShow: 1,
      operation: 1,
      descoptions: [
        {
          name: "正常",
          value: "1"
        },
        {
          name: "异常",
          value: "2"
        }
      ],
      backfillSubmitForm: {
        desc: "",
        date: "",
        status: "",
        remark: "",
        userNum: "",
        backfillInput: [
          //   {
          //     label: "用户编号：",
          //     value: "",
          //     tips: ""
          //   },
          // {
          //   label: "用户名称：",
          //   value: "",
          //   tips: ""
          // },
          // {
          //   label: "用户地址：",
          //   value: "",
          //   tips: ""
          // },
          {
            label: "装表地址：",
            value: "",
            tips: ""
          },
          {
            label: "水表编号：",
            value: "",
            tips: ""
          }
        ],
        fromBottm: [
          {
            label: "水表厂家：",
            value: "",
            tips: ""
          },
          {
            label: "水表型号：",
            value: "",
            tips: ""
          },
          {
            label: "水表口径：",
            value: "",
            tips: ""
          },
          {
            label: "装表日期：",
            value: "",
            tips: ""
          }
          //   {
          //     label: "支付押金：",
          //     value: "",
          //     tips: ""
          //   },
          //   {
          //     label: "备注：",
          //     value: "",
          //     tips: ""
          //   },
        ],
        desc: "",
        descoptions: [],
        waterMeterManufacturer: "",
        waterMeterManufacturerOptions: [
          {
            name: "新表",
            value: "1"
          },
          {
            name: "旧表",
            value: "2"
          }
        ]
      }
    };
  },
  mounted() {
    this.init('init')
  },
  methods: {
    // 初始化
    init(type) {
      var _this = this

      var params = {
        "busicode": "MsVeriQuery",
        "data": {}
      }
      console.log(type);
      if (type == 'init') {// 默认点详情进来当前条数据
        params.data.id = _this.ComparisonTableHandleNeedData.id
      } else {// 模糊查询
        if (type == '')
          return
        params.data.fuzzyQuery = type
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        if (type == 'init') {
          _this.formData = res
        } else {
          _this.allData = res
        }

      })
    },
    // 选中数据的所有信息
    getRegInfo(meterNo) {
      let _this = this
      // 获取选中用户（模糊查询下拉框）的用户信息
      console.log(_this.allData);
      for (let i = 0; i < _this.allData.length; i++) {
        if (_this.allData[i].userInfo.meterNo == meterNo) {
          _this.formData = _this.allData[i]
        }
      }
      console.log(_this.formData);
    },
    // 查询
    search(fuzzyQuery) {
      this.init(fuzzyQuery)
    },









    collapse() {
      if (this.approvalShow == true) {
        this.approvalShow = false;
        this.util.approvalShow(
          this.approvalShow,
          ".process-left",
          ".process-right",
          ".StepCollapse",
          ".leftChange"
        );
      } else {
        this.approvalShow = true;
        this.util.approvalShow(
          this.approvalShow,
          ".process-left",
          ".process-right",
          ".StepCollapse",
          ".leftChange"
        );
      }
    },
    reaultChange(val) {
      if (val == 2) {
        this.resultShow = false;
      } else {
        this.resultShow = true;
      }
    },
    stepActive(val) {
      this.operationShow = val;
      this.operation = val - 1;
    }
  }
};
</script>
<style lang="scss">
// @import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.ComparisonTableHandle {
  height: calc(100% - 41px);
  .formBill {
    height: 100%;
    overflow-y: auto;
    float: left;
    width: 100%;
  }
}
</style>
