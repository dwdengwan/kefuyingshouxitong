
<template>
  <div class="SalesAccountEdit common-editDiv">
    <el-form   class="formBill" size="mini" :inline="true" :model="SalesAccountEditForm" label-width="130px" ref="ruleForm" :rules="rules">
   
      <!-- <commonPart :parentToChild="'2'"></commonPart> -->
      <el-form-item label="用户编号：" class="search-btn" v-if="!SalesAccountEditData.id">
        <el-input class="read-only" v-model="tableQuery.userNo" placeholder="请输入户号" clearable></el-input>
        <el-button size="mini" class='searchBtn' @click="initUserNo(tableQuery.userNo)" icon="el-icon-search"></el-button>
      </el-form-item>

      <legend class="legendColumn">销户信息</legend>
        <el-form-item label="销户日期：" prop="cancelDate">
          <el-date-picker v-model="SalesAccountEditForm.cancelDate" value-format='yyyy-MM-dd' type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="信息来源：">
          <el-select  clearable v-model="SalesAccountEditForm.sourceFlag" placeholder="请选择销户类型">
            <el-option  v-for="(item,index) in pisData" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="延期天数：">
          <el-input v-model="SalesAccountEditForm.delayDays" placeholder=""  class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="销户原因：" class="Remarks" prop="comments">
          <el-input type="textarea" v-model="SalesAccountEditForm.comments" placeholder=""></el-input>
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
      
      <legend class="legendColumn">流程处理</legend>
        <procedure ></procedure>
    
    </el-form>

  </div>
</template>
<script>
import commonPart from "../changeMangement/commonPart"//公用模块
import uploadFile from '@/components/uploadPic';
import procedure from "@/components/procedure"
export default {
  name: "SalesAccountEdit",
  props:['SalesAccountEditData'],
  components: {
    commonPart,
    uploadFile,
    procedure
  },
  data() {
    return {
      SalesAccountEditForm: {},
      tableQuery:{
        userNo:'',
      },
      formData:{
        userInfo:{},
        msInfo:{},
      },
      pisData:[],
      rules: {
        userNume: [
          { required: true, message: '请输入报停日期', trigger: 'blur' },
        ],
        desc: [
          { required: true, message: '请输入用户编号', trigger: 'blur' },
        ]
      },
      histroyData: {},
      DetailsArrearsShow: false,
      ArrearsDetails: {}

    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.SalesAccountEditData.id !== '') {
        let _this = this;
        let params = {
          busicode: "CloseUserQuery",
          data:{
            id:_this.SalesAccountEditData.id
          },
        }
        this.$api.fetch({
          params,//参数
        }).then(res => {
          let data = {};
          data.cancelDate = res.cancelDate;
          data.delayDays = res.delayDays;
          data.comments = res.comments;
          data.sourceFlag = res.sourceFlag;
          if(res.processState == null || res.processState == ''){
            _this.$store.state.isRemove = true
          }
          
          _this.SalesAccountEditForm = Object.assign({},data);
          _this.SalesAccountEditForm.ctmNo = res.ctmNo;
          _this.initUserNo(res.userNo)
          _this.getDictionary()
        })
      }else{
        this.getDictionary()
        return
      }
    },
    submit(){
      this.SalesAccountEditForm.userNo = this.tableQuery.userNo;
      return this.SalesAccountEditForm
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
        status:'2',
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
        _this.SalesAccountEditForm.ctmNo = res.userInfo.ctmNo;
      })
    },
    //  数据字典（查询框）
    getDictionary() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": 'PIS'
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.$set(_this, 'pisData', res['PIS'])
      })
    },
    closeDialog() { //关闭会话
      this.DetailsArrearsShow = false;
      this.init()
    },
    Details() {
      this.DetailsArrearsShow = true;
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
