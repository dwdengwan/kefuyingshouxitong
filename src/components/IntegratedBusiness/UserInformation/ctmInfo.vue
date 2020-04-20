

<template>
  <div class="ctmInfo">

    <el-form class="formBill" :inline="true" size="mini" :model="formData" label-width="130px" ref="ruleForm" >
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
      <div class="content">
        <legend class="legendColumn">账户列表</legend>
        
          <div class="kl-table">
            <el-table stripe 
              highlight-current-row  
              @row-click="handleRowChange"  
              border :data="accountData" 
              class="change-tables-table">

              <el-table-column type="index" label="NO." width="50"  :index="indexMethod">
              </el-table-column>

              <el-table-column prop="accountNo" min-width="180" label="账户编号">
              </el-table-column>

              <el-table-column prop="accountType" min-width="180" label="账户类型">
              </el-table-column>

              <el-table-column prop="payWay" min-width="100" label="缴费方式">
              </el-table-column>

              <el-table-column prop="accountBalance" min-width="180" label="余额">

              </el-table-column>

              <el-table-column label="操作" fixed="right" width="150">
                <template slot-scope="scope">

                  <el-button type="text" class="noclick" @click="getAccountEdit(scope.$index, scope.row)">详情</el-button>
                  <el-button type="text" class="noclick" @click="FlowingShow(scope.$index, scope.row)">查看流水</el-button>
                </template>
              </el-table-column>

            </el-table>
          </div>
        <legend class="legendColumn"> 用户列表</legend>
          <div class="kl-table">
            <el-table stripe border :data="userData" class="change-tables-table">

              <el-table-column type="index" label="NO." width="50" :index="indexMethod">
              </el-table-column>

              <el-table-column prop="userNo" min-width="120" label="用户编号">
              </el-table-column>

              <el-table-column prop="status" min-width="130" label="用户状态">
              </el-table-column>

              <el-table-column prop="businessAreaName" min-width="150" label="营业区域">
              </el-table-column>

              <el-table-column prop="useWaterTypeName" min-width="80" label="用水类型">
              </el-table-column>

              <el-table-column prop="useWaterObject" min-width="80" label="用水对象">
              </el-table-column>

              <el-table-column label="操作" fixed="right" width="150">
                <template slot-scope="scope">

                  <el-button type="text" class="noclick" @click="getUserEdit(scope.$index, scope.row)">详情</el-button>
                </template>
              </el-table-column>

            </el-table>
          </div>
      </div>
    </el-form>
    <!-- 账户详情 -->
    <el-dialog class="TwoModel" v-if="accountEditVisible" append-to-body :title="accountEditName" :close-on-click-modal="false" :visible.sync="accountEditVisible">

      <el-form class="formBill" size="mini" :inline="true" :model="accountEditData" label-width="130px" ref="ruleForm">
        

        <legend class="legendColumn">账户信息</legend>
          <el-form-item label="账户编号：">
            <el-input v-model="accountEditData.accountNo" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="缴费方式：">
            <el-input v-model="accountEditData.payWay" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="账户类型：">
            <el-input v-model="accountEditData.accountType" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="开户银行：">
            <el-input v-model="accountEditData.openAccountBankName" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="开户名称：">
            <el-input v-model="accountEditData.openAccountName" class="read-only" disabled placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="银行账户：">
            <el-input placeholder="" v-model="accountEditData.bankAccount" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="托号：">
            <el-input v-model="accountEditData.entrustNo" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="托收合同号：">
            <el-input v-model="accountEditData.entrustContract" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>

          <el-form-item label="投递方式：" >
            <el-input v-model="accountEditData.deliverWay" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          
          <el-form-item label="投递地址：">
            <el-input v-model="accountEditData.deliverAddr" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          
          <el-form-item label="邮箱地址：">
            <el-input v-model="accountEditData.emailAddr" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>

        <legend class="legendColumn">开票信息</legend>
          <el-form-item label="发票类型：">
            <el-input v-model="accountEditData.invoiceType" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="单位名称：">
            <el-input v-model="accountEditData.invoiceTitle" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别号：">
            <el-input v-model="accountEditData.invoiceTax" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="联系地址：">
            <el-input v-model="accountEditData.invoiceAddr" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="座机号码：">
            <el-input v-model="accountEditData.invoiceLink" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="开户银行：">
            <el-input v-model="accountEditData.invoiceBankName" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="银行账户：">
            <el-input v-model="accountEditData.invoiceAccount" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>

      </el-form>
    </el-dialog>
    <!-- 用户详情 -->
    <el-dialog :title="UserInformationName" v-if="userEditVisible" append-to-body :close-on-click-modal="false" :visible.sync="userEditVisible" class="TwoModel" @close="closeDialog">
      <el-form  size="mini" class="formBill" :inline="true" :model="userEditData" label-width="130px" ref="ruleForm" >

        <legend class="legendColumn">用户信息</legend>
          <el-form-item label="用户编号：" prop="userNume">
            <el-input disabled class="read-only" placeholder="" v-model="userEditData.userInfo.userNo"></el-input>
          </el-form-item>
          
          <el-form-item label="锁定状态：">
            <el-radio-group v-model="formData.userInfo.lockFlag" disabled>
              <el-radio :label=1>是</el-radio>
              <el-radio :label=0>否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="用户状态：">
            <el-input disabled class="read-only" v-model="userEditData.userInfo.status" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="房地产编号：" prop="houseCert">
            <el-input v-model="userEditData.userInfo.houseCert" class="read-only" disabled placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="合同编号：">
            <el-input disabled class="read-only" v-model="userEditData.userInfo.contractNo" placeholder="">
            </el-input>
          </el-form-item>

          <el-form-item label="合同地址：">
            <el-input disabled class="read-only" v-model="userEditData.userInfo.contractAddr" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="签订日期：">
            <el-input disabled class="read-only" v-model="userEditData.userInfo.contractDate" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="用水期限：">
            <el-input disabled class="read-only" v-model="userEditData.userInfo.useTimeLimit" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="营业所：">
            <el-input disabled class="read-only" v-model="userEditData.userInfo.businessAbodeName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="行政区域：">
            <el-input disabled class="read-only" v-model="userEditData.userInfo.adminAreaName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="营业区域：">
            <el-input disabled class="read-only" v-model="userEditData.userInfo.businessAreaName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="行业分类：">
            <el-input disabled class="read-only" v-model="userEditData.userInfo.tradeClassifyName" placeholder=""></el-input>
          </el-form-item>

        
          <el-form-item label="户表改造标记：">
            <el-radio-group v-model="formData.userInfo.reformFlag" disabled>
              <el-radio :label=1>是</el-radio>
              <el-radio :label=0>否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="立户日期：">
            <el-input disabled class="read-only" v-model="userEditData.userInfo.openDate" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="停用日期：">
            <el-input disabled class="read-only" v-model="userEditData.userInfo.stopDate" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="注销日期：">
            <el-input disabled class="read-only" v-model="userEditData.userInfo.cancelDate" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="备注：" class="Remarks">
            <el-input v-model="userEditData.userInfo.comments" placeholder="" disabled class="read-only">
            </el-input>
          </el-form-item>    

        <legend class="legendColumn">用户-抄表信息</legend>

          <el-form-item label="册本号：">
            <el-input v-model="userEditData.userInfo.bookNo" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="排序号：">
            <el-input v-model="userEditData.userInfo.sortNo" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="抄表日：">
            <el-input v-model="userEditData.userInfo.lastReadingDate" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="抄表周期：">
            <el-input v-model="userEditData.userInfo.meterReadingCycle" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="最后抄码：">
            <el-input v-model="userEditData.userInfo.lastReadingNum" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>

        <legend class="legendColumn">用户-水表信息</legend>
          <el-form-item label="水表编号：">
            <el-input v-model="userEditData.userInfo.meterNo" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="出厂编号：">
            <el-input v-model="userEditData.msInfo.factoryNo" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="装表地址：">
            <el-input v-model="userEditData.userInfo.setupMeterAddr" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="装表位置：">
            <el-input disabled class="read-only" v-model="userEditData.userInfo.setupMeterLocation" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="水表类型：">
            <el-input disabled class="read-only" v-model="userEditData.msInfo.meterTypeName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="虚拟计算公式：">
            <el-input v-model="userEditData.userInfo.virtualDesignFormulas" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="水表用途：">
            <el-input disabled class="read-only" v-model="userEditData.userInfo.meterUse" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="用水对象：">
            <el-input disabled class="read-only" v-model="userEditData.userInfo.useWaterObject" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="水表口径：">
            <el-input v-model="userEditData.msInfo.meterBoreName" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="水表厂家：">
            <el-input v-model="userEditData.msInfo.meterFactoryName" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="水表型号：">
            <el-input v-model="userEditData.msInfo.meterModelName" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="新装日期：">
            <el-input v-model="userEditData.userInfo.setupMeterDate" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="换表日期：">
            <el-input v-model="userEditData.userInfo.changeMeterDate" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="拆表日期：">
            <el-input v-model="userEditData.userInfo.splitMeterDate" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="拆表类型：">
            <el-input disabled class="read-only" v-model="userEditData.userInfo.splitMeterWay" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="远传通讯费：">
            <el-input v-model="userEditData.msInfo.transCommFee" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="通讯运营商：">
            <el-input v-model="userEditData.msInfo.commOperatorName" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="通讯费开始日期：">
            <el-input v-model="userEditData.msInfo.commFeeStart" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="通讯费结束日期：">
            <el-input v-model="userEditData.msInfo.commFeeEnd" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>



        <legend class="legendColumn">用户-价格信息</legend>

          <el-form-item label="用水类型：">
            <el-input v-model="userEditData.userInfo.useWaterTypeName" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="用水人口：">
            <el-input v-model="userEditData.userInfo.ladderPersonNum" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="优惠策略：">
            <el-input v-model="userEditData.userInfo.prefStrategyName" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>

          <el-form-item label="优惠证件号码：" prop="prefCertNo">
            <el-input v-model="userEditData.userInfo.prefCertNo" clearable placeholder="" disabled class="read-only"></el-input>
          </el-form-item>

          <el-form-item label="优惠策略开始日期：">
            <el-input v-model="userEditData.userInfo.lastReadingDate" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="优惠策略结束日期：">
            <el-input v-model="userEditData.userInfo.lastReadingDate" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="详细价格：">
            <el-button size="mini" type="text" class="viewBtn">查看</el-button>
          </el-form-item>

      </el-form>
    </el-dialog>

    <!-- 查看流水 -->

    <el-dialog title="查看流水" class="TwoModel" v-if="FlowingTableVisible" append-to-body :close-on-click-modal="false" :visible.sync="FlowingTableVisible" @close="FlowingTableVisible = false">
      <flowingDate :accountNoData="accountNoData"></flowingDate>
    </el-dialog>

  </div>
</template>
<script>
import userInfo from "@/components/userInfo/ctmInfo"
import flowingDate from "@/views/CustomerCenter/customerManagement/flowingDate"
export default {
  name: "ctmInfo",
  props: ['formDataUserNo'],
  components: {
    userInfo,
    flowingDate
  },
  data() {
    return {
      
      formData:{
        ctmInfo:{
          ctmNo: "",//客户编号：
          ctmName: "",//客户名称：
          ctmName: "",//客户名称：
          certNo: "",//客户身份证号：
          certType: "",//证件类型：
          creditLevel: "",//信用等级：
          linkMan: "",//联系人：
          linkTel: "",//联系电话：
          mobile: "",//手机号码：
          faxNumber: "",//传真号码:
        },
      },
      // 账户表格数据
      accountData:[],
      // 账户详情数据
      accountEditData:{
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

      },
      accountEditName: "查询账户详情",
      accountEditVisible: false,
      // 用户表格数据
      userData:[],
      userEditData:{
        
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
      },
      UserInformationName: "查看用户资料详情",
      userEditVisible: false,
      //保存 账户编号
      accountNoData:[],
      //流水界面显示
      FlowingTableVisible: false,

    }
  },
  mounted() {
    this.init();
    this.getAccountInit()
    this.getUserInit()
  },
  watch: {
    formDataUserNo(val) {
      console.log(val);
      if (val =='') {
        
      }
      
    },
  },
  methods: {
    FlowingShow(index,row) {
      this.accountNoData = row.accountNo
      this.FlowingTableVisible = true
    },
    indexMethod(index) {
      return (index + 1);

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    init() {
      let _this = this
      let params = {
        "busicode": "ClientInfoQuery",
        "data": {
          'ctmNo':_this.formDataUserNo,
          }
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.formData.ctmInfo = res;
      })
    },
    //获取账户列表
    getAccountInit() {
      let _this = this
      let params = {
        "busicode": "QueryAccountByCtm",
        "data": {
          'ctmNo':_this.formDataUserNo,
          }
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.accountData = res;
      })
    },
    
    //账户详情数据获取
    getAccountEdit(index,row) {
      let _this = this
      let params = {
        "busicode": "AccountInfoQuery",
        "data": {
          'accountNo':row.accountNo,
          }
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.accountEditData = res;
        _this.accountEditVisible = true;
      })
      
    },
    
    //获取用户列表
    getUserInit(val) {
      
      let _this = this
      let params = {
        "busicode": "QueryUserByCtm",
        "data": {
          'ctmNo':_this.formDataUserNo,
          'accountNo':val,
          }
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.userData = res;
      })
    },
    //用户详情数据获取
    getUserEdit() {
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
        _this.userEditVisible = true;
        _this.userEditData = res
      })
      
    },
    closeDialog() { //关闭会话
    },
    // 点击账户行，切换用户列表
    handleRowChange(row, column, event){
      this.getUserInit(row.accountNo)
    },
  }
}
</script>
<style lang="scss">
.ctmInfo {
  .FlowingTabel {
    .el-form-item__content /deep/ .el-date-editor {
      width: 340px;
    }
    .el-dialog__body {
      padding: 10px;
    }
  }
  .UserInformation {
    .el-dialog__body {
      height: calc(100% - 60px);
      padding: 0px;
      overflow-y: auto;
    }
  }
  .account-left {
    width: 48%;
    float: left;
    padding: 0px 10px 0px 0px;
  }
  .user-right {
    width: 50%;
    float: right;
  }
  .el-steps--horizontal {
    margin: 0 auto;
    width: 50%;
    padding-bottom: 20px;
  }
}
</style>

