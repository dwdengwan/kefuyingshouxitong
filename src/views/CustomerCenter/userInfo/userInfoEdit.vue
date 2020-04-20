<template>
  <div class="userInfoEdit">
    <el-form  size="mini" class="formBill" :inline="true" :model="formData" label-width="130px" ref="ruleForm" >
      <legend class="legendColumn">客户信息</legend>

        <el-form-item label="客户编号：">
          <el-input disabled class="read-only" v-model="formData.ctmInfo.ctmNo" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="客户名称：">
          <el-input disabled class="read-only" v-model="formData.ctmInfo.ctmName" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="客户地址：">
          <el-input disabled class="read-only" v-model="formData.ctmInfo.ctmAddr" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="客户类型：">
          <el-input disabled class="read-only" v-model="formData.ctmInfo.ctmType" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="客户身份证号：">
          <el-input disabled class="read-only" v-model="formData.ctmInfo.certNo" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="证件类型：">
          <el-input disabled class="read-only" v-model="formData.ctmInfo.certType" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="信用等级：">
          <el-input disabled class="read-only" v-model="formData.ctmInfo.creditLevel" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="联系电话：">
          <el-input disabled class="read-only" v-model="formData.ctmInfo.linkTel" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="手机号码：">
          <el-input disabled class="read-only" v-model="formData.ctmInfo.mobile" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="传真号码：">
          <el-input disabled v-model="formData.ctmInfo.faxNumber"  placeholder="" class="read-only"></el-input>
        </el-form-item>

      <legend class="legendColumn">用户信息</legend>
        <el-form-item label="用户编号：" prop="userNume">
          <el-input disabled class="read-only" placeholder="" v-model="formData.userInfo.userNo"></el-input>
        </el-form-item>
        
        <el-form-item label="锁定状态：">
          <el-radio-group v-model="formData.userInfo.lockFlag" disabled>
            <el-radio :label=1>是</el-radio>
            <el-radio :label=0>否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="用户状态：">
          <el-input disabled class="read-only" v-model="formData.userInfo.status" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="房地产编号：" prop="houseCert">
          <el-input v-model="formData.userInfo.houseCert" class="read-only" disabled placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="合同编号：">
          <el-input disabled class="read-only linkBtn" v-model="formData.userInfo.contractNo" placeholder="">
          </el-input>
        </el-form-item>

        <el-form-item label="合同地址：">
          <el-input disabled class="read-only" v-model="formData.userInfo.contractAddr" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="签订日期：">
          <el-input disabled class="read-only" v-model="formData.userInfo.contractDate" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="用水期限：">
          <el-input disabled class="read-only" v-model="formData.userInfo.useTimeLimit" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="营业所：">
          <el-input disabled class="read-only" v-model="formData.userInfo.businessAbodeName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="行政区域：">
          <el-input disabled class="read-only" v-model="formData.userInfo.adminAreaName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="营业区域：">
          <el-input disabled class="read-only" v-model="formData.userInfo.businessAreaName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="行业分类：">
          <el-input disabled class="read-only" v-model="formData.userInfo.tradeClassifyName" placeholder=""></el-input>
        </el-form-item>
        
        <el-form-item label="户表改造标记：">
          <el-radio-group v-model="formData.userInfo.reformFlag" disabled>
            <el-radio :label=1>是</el-radio>
            <el-radio :label=0>否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="立户日期：">
          <el-input disabled class="read-only" v-model="formData.userInfo.openDate" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="停用日期：">
          <el-input disabled class="read-only" v-model="formData.userInfo.stopDate" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="注销日期：">
          <el-input disabled class="read-only" v-model="formData.userInfo.cancelDate" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="备注：" class="Remarks">
          <el-input v-model="formData.userInfo.comments" placeholder="" disabled class="read-only">
          </el-input>
        </el-form-item>    

      <legend class="legendColumn">用户-抄表信息</legend>

        <el-form-item label="册本号：">
          <el-input v-model="formData.userInfo.bookNo" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="排序号：">
          <el-input v-model="formData.userInfo.sortNo" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="抄表日：">
          <el-input v-model="formData.userInfo.lastReadingDate" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="抄表周期：">
          <el-input v-model="formData.userInfo.meterReadingCycle" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="最后抄码：">
          <el-input v-model="formData.userInfo.lastReadingNum" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>

      <legend class="legendColumn">用户-水表信息</legend>
        <el-form-item label="水表编号：">
          <el-input v-model="formData.userInfo.meterNo" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="出厂编号：">
          <el-input v-model="formData.msInfo.factoryNo" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="装表地址：">
          <el-input v-model="formData.userInfo.setupMeterAddr" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="装表位置：">
          <el-input disabled class="read-only" v-model="formData.userInfo.setupMeterLocation" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="水表类型：">
          <el-input disabled class="read-only" v-model="formData.msInfo.meterTypeName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="虚拟计算公式：">
          <el-input v-model="formData.userInfo.virtualDesignFormulas" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表用途：">
          <el-input disabled class="read-only" v-model="formData.userInfo.meterUse" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="用水对象：">
          <el-input disabled class="read-only" v-model="formData.userInfo.useWaterObject" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="水表口径：">
          <el-input v-model="formData.msInfo.meterBoreName" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表厂家：">
          <el-input v-model="formData.msInfo.meterFactoryName" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表型号：">
          <el-input v-model="formData.msInfo.meterModelName" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="新装日期：">
          <el-input v-model="formData.userInfo.setupMeterDate" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="换表日期：">
          <el-input v-model="formData.userInfo.changeMeterDate" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="拆表日期：">
          <el-input v-model="formData.userInfo.splitMeterDate" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="拆表类型：">
          <el-input disabled class="read-only" v-model="formData.userInfo.splitMeterWay" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="远传通讯费：">
          <el-input v-model="formData.msInfo.transCommFee" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="通讯运营商：">
          <el-input v-model="formData.msInfo.commOperatorName" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="通讯费开始日期：">
          <el-input v-model="formData.msInfo.commFeeStart" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="通讯费结束日期：">
          <el-input v-model="formData.msInfo.commFeeEnd" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>

      <legend class="legendColumn">账户信息</legend>
        <el-form-item label="账户编号：">
          <el-input v-model="formData.accountInfo.accountNo" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="缴费方式：">
          <el-input v-model="formData.accountInfo.payWay" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="账户类型：">
          <el-input v-model="formData.accountInfo.accountType" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="开户银行：">
          <el-input v-model="formData.accountInfo.openAccountBank" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="开户名称：">
          <el-input v-model="formData.accountInfo.openAccountName" class="read-only" disabled placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="银行账户：">
          <el-input placeholder="" v-model="formData.accountInfo.bankAccount" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="托号：">
          <el-input v-model="formData.accountInfo.entrustNo" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="托收合同号：">
          <el-input v-model="formData.accountInfo.entrustContract" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>

        <el-form-item label="投递方式：" prop="deliverWay">
          <el-input v-model="formData.accountInfo.deliverWay" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        
        <el-form-item label="投递地址：">
          <el-input v-model="formData.accountInfo.deliverAddr" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        
        <el-form-item label="邮箱地址：">
          <el-input v-model="formData.accountInfo.emailAddr" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>

      <legend class="legendColumn">开票信息</legend>
        <el-form-item label="发票类型：">
          <el-input v-model="formData.accountInfo.invoiceType" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="单位名称：">
          <el-input v-model="formData.accountInfo.invoiceTitle" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="纳税人识别号：">
          <el-input v-model="formData.accountInfo.invoiceTax" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="联系地址：">
          <el-input v-model="formData.accountInfo.invoiceAddr" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="座机号码：">
          <el-input v-model="formData.accountInfo.invoiceLink" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="开户银行：">
          <el-input v-model="formData.accountInfo.invoiceBankName" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="银行账户：">
          <el-input v-model="formData.accountInfo.invoiceAccount" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>



      <legend class="legendColumn">用户-价格信息</legend>

        <el-form-item label="用水类型：">
          <el-input v-model="formData.userInfo.useWaterTypeName" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="用水人口：">
          <el-input v-model="formData.userInfo.ladderPersonNum" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="优惠策略：">
          <el-input v-model="formData.userInfo.prefStrategyName" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>

        <el-form-item label="优惠证件号码：" prop="prefCertNo">
          <el-input v-model="formData.userInfo.prefCertNo" clearable placeholder="" disabled class="read-only"></el-input>
        </el-form-item>

        <el-form-item label="优惠策略开始日期：">
          <el-input v-model="formData.userInfo.lastReadingDate" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="优惠策略结束日期：">
          <el-input v-model="formData.userInfo.lastReadingDate" placeholder="" disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="详细价格：">
          <el-button size="mini" type="text" class="viewBtn">查看</el-button>
        </el-form-item>

    </el-form>
  </div>
</template>
<script>
export default {
  name: "userInfoEdit",
  props: ['formDataUserNo'],
  data() {
    return {
      formData:{
        ctmInfo:{
          ctmNo: "",//客户编号：
          ctmName: "",//客户名称：
          certNo: "",//客户身份证号：
          certType: "",//证件类型：
          ctmAddr: "",//客户地址：
          ctmType: "",//客户类型：
          creditLevel: "",//信用等级：
          linkMan: "",//联系人：
          linkTel: "",//联系电话：
          mobile: "",//手机号码：
        },
        userInfo:{
          userNo: "",//用户编号：
          lockFlag:'',//锁定状态： 
          status: "",//用户状态：
          houseCert: "",//房地产编号：
          comments: "",//备注：

          reformFlag:'',//户表改造标记： 
          contractNo: "",//合同编号：
          contractAddr: "",//合同地址：
          contractDate: "",//签订日期：
          businessAbodeName: "",//营业所：
          adminAreaName: "",//行政区域：
          businessAreaName:'',//营业区域： 
          tradeClassifyName:'',//行业分类： 
          openDate:'',//立户日期： 
          stopDate:'',//停用日期： 
          cancelDate:'',//注销日期： 
          useTimeLimit:'',//用水期限： 

          // 用户-水表信息
          meterNo:'',//水表编号： 
          setupMeterAddr:'',//装表地址： 
          setupMeterLocation:'',//装表位置： 
          virtualDesignFormulas:'',//虚拟计算公式： 
          meterUse:'',//水表用途： 
          useWaterObject:'',//用水对象： 
          setupMeterDate:'',//新装日期： 
          changeMeterDate:'',//换表日期： 
          splitMeterDate:'',//拆表日期： 
          splitMeterWay:'',//拆表类型： 

          // 用户-抄表信息
          bookNo:'',//册本号： 
          sortNo:'',//排序号： 
          lastReadingDate:'',//抄表日： 
          meterReadingCycle:'',//抄表周期： 
          lastReadingNum:'',//最后抄码：

          // 用户-价格信息
          useWaterTypeName:'',//用水类型： 
          prefStrategyName:'',//优惠策略： 
          prefCertNo:'',//优惠证件号码： 
          lastReadingDate:'',//优惠策略开始日期：
          lastReadingDate:'',//优惠策略结束日期： 
          ladderPersonNum:'',//用水人口： 

        },
        msInfo:{
        // 用户-水表信息
          factoryNo:'',//出厂编号： 
          meterTypeName:'',//水表类型： 
          meterBoreName:'',//水表口径： 
          meterFactoryName:'',//水表厂家： 
          meterModelName:'',//水表型号： 
          transCommFee:'',//远传通讯费： 
          commOperatorName:'',//通讯运营商： 
          commFeeStart:'',//通讯费开始日期： 
          commFeeEnd:'',//通讯费结束日期： 

        },
        accountInfo:{
          // 账户信息
            accountNo: "",//账户编号
            payWay: "",//缴费方式
            accountType: "",//账户类型
            openAccountBank: "",//开户银行
            openAccountName: "",//开户名称
            bankAccount: "",//银行账户
            entrustNo: "",//托号
            entrustContract: "",//托收合同
            deliverWay: "",//投递方式
            deliverAddr: "",//投递地址
            emailAddr: "",//邮箱地址
          // 开票信息
            invoiceType: "",//发票类型
            invoiceTitle: "",//单位名称
            invoiceTax: "",//纳税人识别号
            invoiceAddr: "",//联系地址
            invoiceLink: "",//座机号码
            invoiceBank: "",//开户银行
            invoiceAccount: "",//银行账户
        }

      },
    }
  },
  mounted() {

    this.init()
  },
  methods: {
    init() {
      let _this = this
      let data = {
        userNo: this.formDataUserNo,
      }
      let params = {
        "busicode": "UserInfoQuery",
        data,
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.formData = res
        
        _this.$emit('fromLockFlag',_this.formData.userInfo.lockFlag)//
      })
    },
  },
}
</script>
<style lang="scss">
.userInfoEdit {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>

