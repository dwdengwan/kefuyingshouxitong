
<template>
  <div class="DisuseProcedureAdd common-editDiv">
    <!-- 弹出表单明细 -->
    <el-dialog :title="TransferDetailsName" :close-on-click-modal="false" :visible.sync="TransferDetailsVisible" class="TransferDetails" @close="closeDialog" append-to-body>
      <DetailsArrears ref="DetailsArrears"></DetailsArrears>
    </el-dialog>
    <el-form class="formBill" size="mini" :inline="true" :model="DisuseProcedureForm" label-width="130px" ref="ruleForm" :rules="rules">

      <!-- <commonPart :parentToChild="'2'"></commonPart> -->
      <el-form-item label="用户编号：" class="search-btn" v-if="!detailsShow">
        <el-input class="read-only" v-model="tableQuery.userNo" placeholder="请输入户号" clearable></el-input>
        <el-button size="mini" class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
      </el-form-item>
      <el-form-item label="单据编号：" v-if="detailsShow">
        <el-input class="read-only" disabled="disabled" v-model="DisuseProcedureForm.billNo" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="单据日期：" v-if="detailsShow">
        <el-input class="read-only" disabled="disabled" v-model="DisuseProcedureForm.billDate" placeholder=""></el-input>
      </el-form-item>
      <legend class="legendColumn">停用信息</legend>

        <el-form-item label="停用日期：" prop="stopDate">
          <el-date-picker v-model="DisuseProcedureForm.stopDate" type="date" placeholder="选择日期" value-format='yyyy-MM-dd'>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否拆表：" prop="splitMeterFlag">
          <el-radio v-model="DisuseProcedureForm.splitMeterFlag" :label="1" @change="radioChange">是</el-radio>
          <el-radio v-model="DisuseProcedureForm.splitMeterFlag" :label="0" @change="radioChange">否</el-radio>
        </el-form-item>
        <el-form-item label="复表时限：" prop="reuseTimeLimit">
          <el-date-picker v-model="DisuseProcedureForm.reuseTimeLimit" value-format='yyyy-MM-dd' type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="拆表类型：" v-if="radioChangeShow">
          <el-select clearable v-model="DisuseProcedureForm.splitMeterWay" placeholder="请选择停用类型">
            <el-option v-for="(item,index) in mrmData" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拆表原因：" class="Remarks">
          <el-input type="textarea" v-model="DisuseProcedureForm.splitMeterRemark" placeholder=""></el-input>
        </el-form-item>

      <legend class="legendColumn">用户信息</legend>
        <el-form-item label="用户编号：" prop="userNo">
          <el-input v-model="formData.userInfo.userNo" clearable disabled class="read-only" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="房地产编号：" prop="houseCert">
          <el-input v-model="formData.userInfo.houseCert" clearable disabled class="read-only" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="用户状态：">
          <!-- <el-input v-model="formData.userInfo.status" clearable placeholder="" disabled class="read-only"></el-input> -->
          <el-select clearable v-model="formData.userInfo.status" disabled placeholder="">
            <el-option v-for="(item,index) in cusData" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="合同编号：">
          <el-input v-model="formData.userInfo.contractNo" disabled clearable placeholder="">
            <el-button slot="append" icon="el-icon-s-order" disabled type="primary" class="scanning-btn" size='mini' title="打印合同"></el-button>
          </el-input>
        </el-form-item>

        <!--无此字段  -->
        <el-form-item label="合同地址：">
          <el-input v-model="formData.userInfo.comments" disabled class="read-only" clearable placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="签订日期：">
          <el-date-picker v-model="formData.userInfo.contractDate" disabled type="date" placeholder="">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="营业所：">
          <el-select clearable v-model="formData.userInfo.businessAbodeName" disabled placeholder="">
            <el-option v-for="(item,index) in formData.areas" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="营业区域：">
          <el-select clearable v-model="formData.userInfo.businessAreaName" disabled placeholder="">
            <el-option v-for="(item,index) in formData.areas" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="行政区域：">
          <el-select clearable v-model="formData.userInfo.adminAreaName" disabled placeholder="">
            <el-option v-for="(item,index) in formData.areas" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="行业分类：">
          <el-select clearable v-model="formData.userInfo.tradeClassifyName" disabled placeholder="">
            <el-option v-for="(item,index) in formData.workType" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用水期限：">
          <el-date-picker v-model="formData.userInfo.useTimeLimit" type="date" disabled placeholder="">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注：" prop="comments" class="comments">
          <el-input type="textarea" v-model="formData.userInfo.comments" disabled class="read-only" clearable placeholder="">
          </el-input>
        </el-form-item>

      <!-- 过户模块 水表信息不可修改 -->
      <legend class="legendColumn">水表信息</legend>
        <el-form-item label="水表编号：" prop="code">
          <el-input v-model="formData.userInfo.meterNo" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>

        <el-form-item label="出厂编号：" prop="code">
          <el-input v-model="formData.msInfo.factoryNo" disabled placeholder="" class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="装表地址：" prop="setupMeterAddr">
          <el-input v-model="formData.userInfo.setupMeterAddr" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="装表位置：" prop="address1">
          <el-select clearable v-model="formData.userInfo.setupMeterLocation" placeholder="" disabled class="read-only">
            <el-option v-for="(item,index) in ctlData" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="水表类型：" prop="meterTypeName">
          <el-select clearable v-model="formData.msInfo.meterType" disabled placeholder="" class="read-only">
            <el-option v-for="(item,index) in mmtData" :key="index" :label="item.name" :value="item.value"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="虚拟计算公式：" prop="uuu" v-if="formData.TypesWaterUse == 2">
          <el-input v-model="formData.msInfo.factoryNo" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表用途：" prop="meterUse">
          <el-select clearable v-model="formData.userInfo.meterUse" placeholder="" disabled class="read-only">
            <el-option v-for="(item,index) in cmcData" :key="index" :label="item.name" :value="item.value"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="用水对象：" prop="useWaterObject">
          <el-select clearable v-model="formData.userInfo.useWaterObject" placeholder="" disabled class="read-only">
            <el-option v-for="(item,index) in uwsData" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="水表口径：" prop="meterBoreName">
          <el-input v-model="formData.msInfo.meterBoreName" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表厂家：" prop="meterFactoryName">
          <el-input v-model="formData.msInfo.meterFactoryName" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表型号：" prop="meterModelName">
          <el-input v-model="formData.msInfo.meterModelName" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="新装日期：" prop="setupMeterDate">
          <el-date-picker v-model="formData.userInfo.setupMeterDate" type="date" placeholder="" disabled class="read-only">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="换表日期：" prop="installDate">
          <el-date-picker v-model="formData.msInfo.installDate" type="date" placeholder="" disabled class="read-only">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="拆表日期：" prop="splitMeterDate">
          <el-date-picker v-model="formData.userInfo.splitMeterDate" type="date" placeholder="选择日期" disabled class="read-only">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="远传通讯费：" prop="transCommFee">
          <el-input v-model="formData.msInfo.transCommFee" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="通讯运营商：" prop="commOperator">
          <!-- <el-input v-model="formData.msInfo.commOperatorName" placeholder="" disabled class="read-only"></el-input> -->
          <el-select clearable v-model="formData.msInfo.commOperator" placeholder="" disabled class="read-only">
            <el-option v-for="(item,index) in txsData" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通讯费开始日期：" prop="commFeeStart">
          <el-input v-model="formData.msInfo.commFeeStart" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="通讯费结束日期：" prop="commFeeEnd">
          <el-input v-model="formData.msInfo.commFeeEnd" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>

      <legend class="legendColumn">上传附件</legend>
      <uploadFile></uploadFile>

      <legend class="legendColumn">流程处理</legend>
      <procedure></procedure>
    </el-form>

  </div>
</template>
<script>
import commonPart from "../changeMangement/commonPart"//公用模块
// import TransferDetails from '../Transfer/TransferDetails'
import uploadFile from '@/components/uploadPic';
import procedure from "@/components/procedure"
import DetailsArrears from "@/components/DetailsArrears/index"//欠费明细
export default {
  name: "DisuseProcedureAdd",
  props: ['DisuseProcedureData'],
  components: {
    // TransferDetails,
    commonPart,
    uploadFile,
    procedure,
    DetailsArrears
  },
  data() {
    return {
      detailsShow: false,//显示详情 true 新增 false
      radioChangeShow:false,//显示拆表类型 拆表时显示 不拆表就隐藏
      tableQuery: {
        userNo: '',
      },

      formData: {
        userInfo: {},
        msInfo: {}
      },
      // 客户类型
      cttData: [],
      // 信用等级
      cdlData: [],
      // 账户类型
      actData: [],
      //发票类型
      bbtData: [],
      //证件类型
      idtData: [],
      //装表位置
      ctlData: [],
      //用水类型
      mmtData: [],
      //水表用途
      cmcData: [],
      //用水对象
      uwsData: [],
      //投递方式
      sdwData: [],
      //缴费方式
      bpwData: [],
      //抄表周期
      rtpData: [],
      //用户状态
      cusData: [],
      //通讯运营商
      txsData: [],
      //拆表类型
      mrmData: [],
      value1: '',
      value2: '',
      DisuseProcedureForm: {
        billNo:'',
        billDate:'',
        userNo: '',
        ctmNo: '',
        stopDate: '',
        splitMeterFlag: '',
        reuseTimeLimit: '',
        splitMeterWay: '',
        splitMeterRemark: '',
      },
      rules: {
        stopDate: [
          { required: true, message: '请输入报停日期', trigger: 'blur' },
        ],
        splitMeterFlag: [
          { required: true, message: '请选择是否拆表', trigger: 'blur' },
        ],
        reuseTimeLimit: [
          { required: true, message: '请输入复表时限', trigger: 'blur' },
        ]
      },
      histroyData: {},
      TransferDetailsName: "欠费明细",
      TransferDetailsVisible: false,
      ArrearsDetails: {}

    }
  },
  mounted() {
    console.log(this.DisuseProcedureData);
    if (this.DisuseProcedureData.id !== '') {
      this.detailsShow = true;
      this.init();
    } else {
      this.getDictionary()
    }
  },
  methods: {
    init() {
      let _this = this;
      let params = {
        busicode: "StopUserQuery",
        data:{
          id:_this.DisuseProcedureData.id,
        },
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.DisuseProcedureForm = res;
        console.log(res.userNo);
        _this.initUserNo(res.userNo);
        _this.radioChange();
        _this.getDictionary()
      })
    },
    demand() {
      this.initUserNo(this.tableQuery.userNo)
    },
    submit() {
      this.DisuseProcedureForm.userNo = this.tableQuery.userNo;
      this.DisuseProcedureForm.ctmNo = this.formData.userInfo.ctmNo;
      console.log(this.DisuseProcedureForm);
      return this.DisuseProcedureForm
    },
    radioChange(){
      console.log(this.DisuseProcedureForm.splitMeterFlag)
      if (this.DisuseProcedureForm.splitMeterFlag == 1) {
        this.radioChangeShow = true;
      }else{
        this.radioChangeShow = false;
      }
    },
    //  数据字典（查询框）
    getDictionary() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": 'CTT,CDL,ACT,IDT,CTL,MMT,UWS,BBT,SDW,BPW,RTP,CMC,CUS,TXS,MRM'
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.$set(_this, 'cttData', res['CTT'])
        _this.$set(_this, 'cdlData', res['CDL'])
        _this.$set(_this, 'actData', res['ACT'])
        _this.$set(_this, 'idtData', res['IDT'])
        _this.$set(_this, 'ctlData', res['CTL'])
        _this.$set(_this, 'mmtData', res['MMT'])
        _this.$set(_this, 'cmcData', res['CMC'])
        _this.$set(_this, 'uwsData', res['UWS'])
        _this.$set(_this, 'bbtData', res['BBT'])
        _this.$set(_this, 'sdwData', res['SDW'])
        _this.$set(_this, 'bpwData', res['BPW'])
        _this.$set(_this, 'rtpData', res['RTP'])
        _this.$set(_this, 'cusData', res['CUS'])
        _this.$set(_this, 'txsData', res['TXS'])
        _this.$set(_this, 'mrmData', res['MRM'])
      })
    },
    initUserNo(userNo) {//用户编号查询
      console.log(userNo);
      let _this = this;
      if (userNo == '') {
        _this.$message({
          message: '用户编号不能为空。',
          type: 'warning'
        });
        return
      }
      _this.userInfoFormShow = false;
      let data = {
        userNo,
      };
      let params = {
        "busicode": "UserSelect",
        data,
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.formData.userInfo = res.userInfo;
        _this.formData.msInfo = res.msInfo;
      })
    },
    closeDialog() { //关闭会话
      this.TransferDetailsVisible = false;
      this.init()
    },
    Details() {
      this.TransferDetailsVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.search-btn {
  .el-form-item__content {
    .el-input {
      width: 70% !important;
    }
  }
}
</style>



