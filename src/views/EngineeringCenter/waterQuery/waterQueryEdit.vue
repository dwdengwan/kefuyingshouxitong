<template>
  <div class="waterQueryEdit">

    <!-- 预览电子签名 -->
    <el-dialog :title="signName" :visible.sync="signVisible" :close-on-click-modal="false" class="addDialog">
           <img src="@/assets/images/sign.jpg" alt="签名">
    	</el-dialog>

    <div class="engineer-center-right-content">
      <el-tabs type="border-card" tab-position="bottom"  v-model="activeName" @tab-click="tabCurrent">
        <el-tab-pane label="基础信息" name='基础信息'>
          <el-form :model="formData"  class="formBill" :inline="true" ref="form"  size="mini"  :show-message="false" :rules="rules"  label-width="130px">           
            <el-form-item label="单据编号：" >
              <el-input class="read-only" disabled="disabled" v-model="formData.consult.billNo" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="单据日期：" >
              <el-input class="read-only" disabled="disabled" v-model="formData.consult.billDate" placeholder=""></el-input>
            </el-form-item>
        
            <legend class="legendColumn"> 客户信息 </legend>
              <el-form-item label="客户编号：">
                <el-input v-model="formData.ctmInfo.ctmNo" placeholder="新开户" disabled class="read-only"></el-input>
              </el-form-item>

              <el-form-item label="客户类型：">
                <el-select v-model="formData.ctmInfo.ctmType" clearable size="mini" :class="{readOnly:NotDisabled}"  :disabled="NotDisabled">
                  <el-option v-for="item in dictionaryData.CTT" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="业主名称：" prop="ctmName">
                <el-input v-model="formData.ctmInfo.ctmName" size="mini"   :disabled="NotDisabled" clearable></el-input>
              </el-form-item>
              
              <el-form-item label="业主证件类型：" prop="certType">
                <el-select v-model="formData.ctmInfo.certType" clearable size="mini"  :disabled="NotDisabled" >
                  <el-option v-for="item in dictionaryData.IDT" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
                  
              <el-form-item label="业主证件号码：" prop="certNo">
                <el-input placeholder="证件号码" v-model="formData.ctmInfo.certNo" class="input-with-select" :disabled="NotDisabled">
                  <el-button slot="append" icon="el-icon-reading"   class="scanning-btn" @click="idCard()" size='mini'></el-button>
                </el-input>
              </el-form-item>

              <el-form-item label="业主电话：" prop="mobile">
                <el-input v-model="formData.ctmInfo.mobile" size="mini" clearable :disabled="NotDisabled"></el-input>
              </el-form-item>
              

              <el-form-item label="联系电话：" prop="linkTel">
                <el-input v-model="formData.ctmInfo.linkTel" size="mini" clearable :disabled="NotDisabled"></el-input>
              </el-form-item>

              <el-form-item label="经办人名称：" prop="agentMan">
                <el-input v-model="formData.consult.agentMan" size="mini" clearable :disabled="NotDisabled"></el-input>
              </el-form-item>
              

              <el-form-item label="经办人电话：" prop="agentLinkTel">
                <el-input v-model="formData.consult.agentLinkTel" size="mini" clearable :disabled="NotDisabled" ></el-input>
              </el-form-item>
              
              <el-form-item label="经办人证件类型：" prop="agentCertType">
                <el-select v-model="formData.consult.agentCertType" clearable size="mini" :disabled="NotDisabled" >
                  <el-option v-for="item in dictionaryData.IDT" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="经办人证件号码：" prop="agentCertNo">
                <el-input placeholder="证件号码" v-model="formData.consult.agentCertNo" class="input-with-select" :disabled="NotDisabled">
                  <el-button slot="append" icon="el-icon-reading"   class="scanning-btn" @click="idCard()" size='mini'></el-button>
                </el-input>
              </el-form-item>
            
              <el-form-item label="用户地址：" prop="ctmAddr">
                <el-input v-model="formData.ctmInfo.ctmAddr" size="mini" clearable :disabled="NotDisabled"></el-input>
              </el-form-item>

              <el-form-item label="信用等级：">
                <el-select v-model="formData.ctmInfo.creditLevel" clearable size="mini" :disabled="NotDisabled" >
                  <el-option v-for="item in dictionaryData.CDL" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              
              <!-- <el-form-item label="电子签名：" prop="electronicSignature" class="electronicSignature">
                <el-input v-model="formData.electronicSignature" size="mini" class="read-only" disabled></el-input>
                
              </el-form-item> -->
              
              
              <!-- <el-form-item class="SignatureBtn">
                <el-button type="primary" size="mini" @click="Signature">{{eleSignType}}</el-button>
              </el-form-item> -->
                  
            <legend class="legendColumn">工程信息</legend>
            
              <el-form-item label="工程类型：" prop="pjType">
                <el-select v-model="formData.consult.pjType" clearable size="mini" :disabled="NotDisabled" >
                  <el-option v-for="item in dictionaryData.PPT" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="紧急程度：" prop="urgentFlag">
                <el-select v-model="formData.consult.urgentFlag" clearable size="mini" :disabled="NotDisabled" >
                  <el-option v-for="item in dictionaryData.EGD" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="装表地址：" prop="installAddr">
                <el-input v-model="formData.consult.installAddr" size="mini" clearable :disabled="NotDisabled"></el-input>
              </el-form-item>
              
              <el-form-item label="信息来源：" prop="sourceFlag">
                <el-select v-model="formData.consult.sourceFlag" clearable size="mini"  :disabled="NotDisabled">
                  <el-option v-for="item in dictionaryData.PIS" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="行政区域：" prop="adminArea">
                  <el-cascader
                      :disabled="NotDisabled"
                      v-model="formData.consult.adminArea"
                      :options="adminAreaOptions"
                      :show-all-levels="false"
                      :props="props"
                      @change="handleChange">
                    </el-cascader>
              </el-form-item>
              
              <el-form-item label="营业所：" prop="businessAbode">
                <el-select v-model="formData.consult.businessAbode" :disabled="NotDisabled" clearable size="mini" @change='changeBAbode(formData.consult.businessAbode)' >
                  <el-option v-for="item in businessAbodeOptions"  :key="item.value" :label="item.name" :value="item.id"> </el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="营业区域：" prop="businessArea">
                <el-select v-model="formData.consult.businessArea" clearable size="mini" :disabled="NotDisabled" >
                  <el-option v-for="item in businessAreaOptions" :key="item.value" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="原户号：" prop="oloUserNo">
                <el-input v-model="formData.consult.oloUserNo" size="mini" clearable :disabled="NotDisabled"></el-input>
              </el-form-item>
              
              <el-form-item label="总表户号：" prop="suserNo">
                <el-input v-model="formData.consult.suserNo" size="mini" clearable :disabled="NotDisabled"></el-input>
              </el-form-item>
              
              <el-form-item label="总表户号2：" prop="suserNo2">
                <el-input v-model="formData.consult.suserNo2" size="mini" clearable :disabled="NotDisabled"></el-input>
              </el-form-item>
              
              <el-form-item label="用水期：" prop="limitFlag">
                <el-select v-model="formData.consult.limitFlag" clearable size="mini" :disabled="NotDisabled" >
                  <el-option v-for="item in dictionaryData.UWD" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="用水期限：" prop="limitDate">
                <el-date-picker v-model="formData.consult.limitDate" 
                value-format="yyyy-MM-dd" type="date" placeholder="选择日期" :disabled="NotDisabled">
                </el-date-picker>
              </el-form-item>
            
              <el-form-item label="备注：" class="Remarks" prop="comments">
                <el-input type="textarea" v-model="formData.consult.comments" :disabled="NotDisabled" ></el-input>
              </el-form-item>

            <legend class="legendColumn"> 账户信息 </legend>

              <el-form-item label="账户编号：">
                <el-select v-model="formData.accountInfo.accountNo" @change="changeAcount" clearable size="mini" :disabled="NotDisabled" >
                  <el-option label="新开户" value=""></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="缴费方式：">
                <el-select  clearable v-model="formData.accountInfo.payWay" placeholder="" :disabled="NotDisabled">
                    <el-option v-for="item in dictionaryData.BPW" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="账户类型：" >
                <el-select v-model="formData.accountInfo.accountType" clearable size="mini"  :disabled="NotDisabled">
                  <el-option v-for="item in dictionaryData.ACT" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="开户银行：">
                  <el-cascader
                      :disabled="NotDisabled"
                      v-model="formData.accountInfo.openAccountBank"
                      :show-all-levels="false"
                      :options="openABankOptions"
                      :props="props">
                    </el-cascader>
              </el-form-item> 
              
              <el-form-item label="账户名称：">
                <el-input v-model="formData.accountInfo.openAccountName" placeholder="" clearable :disabled="NotDisabled"></el-input>
              </el-form-item>
              
              <el-form-item label="银行账户：" >
                <el-input placeholder="银行账户" v-model="formData.accountInfo.bankAccount" class="input-with-select" :disabled="NotDisabled">
                  <el-button slot="append" icon="el-icon-reading"   class="scanning-btn" @click="idCard()" size='mini' ></el-button>
                </el-input>
              </el-form-item>
              
              <el-form-item label="托号：">
                <el-input v-model="formData.accountInfo.entrustNo" placeholder="101801012001" clearable :disabled="NotDisabled"></el-input>
              </el-form-item>
              
              <el-form-item label="托收合同号：">
                <el-input v-model="formData.accountInfo.entrustContract" placeholder="101801012001" clearable :disabled="NotDisabled"></el-input>
              </el-form-item>

              <el-form-item label="投递方式：" prop="desc1">
                <el-select  clearable v-model="formData.accountInfo.deliverWay" placeholder="" :disabled="NotDisabled">
                  <el-option v-for="item in dictionaryData.SDW" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="投递地址：">
                <el-input v-model="formData.accountInfo.deliverAddr" placeholder="101801012001" clearable :disabled="NotDisabled"></el-input>
              </el-form-item>
              
              <el-form-item label="邮箱地址：">
                <el-input v-model="formData.accountInfo.emailAddr" placeholder="101801012001" clearable :disabled="NotDisabled"></el-input>
              </el-form-item>
                      
            <legend class="legendColumn">开票信息</legend>
              
              <el-form-item label="发票类型：" prop="desc">
                <el-select  clearable v-model="formData.accountInfo.invoiceType" placeholder="" :disabled="NotDisabled">
                  <el-option v-for="item in dictionaryData.BBT" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="单位名称：">
                <el-input v-model="formData.accountInfo.invoiceTitle" placeholder="" clearable :disabled="NotDisabled"></el-input>
              </el-form-item>
              
              <el-form-item label="纳税人识别号：">
                <el-input v-model="formData.accountInfo.invoiceTax" placeholder="" clearable :disabled="NotDisabled"></el-input>
              </el-form-item>
              
              <el-form-item label="联系地址：">
                <el-input v-model="formData.accountInfo.invoiceAddr" placeholder="" clearable :disabled="NotDisabled"></el-input>
              </el-form-item>
              
              <el-form-item label="座机号码：">
                <el-input v-model="formData.accountInfo.invoiceLink" placeholder="" clearable :disabled="NotDisabled"></el-input>
              </el-form-item>
              
              <el-form-item label="开户银行：">
                  <el-cascader
                      :disabled="NotDisabled"
                      v-model="formData.accountInfo.invoiceBank"
                      :options="openABankOptions"
                      :show-all-levels="false"
                      :props="props">
                    </el-cascader>
              </el-form-item>

              <el-form-item label="银行账户：" prop="invoiceAccount">
                <el-input placeholder="银行账户" v-model="formData.accountInfo.invoiceAccount" class="input-with-select" :disabled="NotDisabled">
                  <el-button slot="append" icon="el-icon-reading"   class="scanning-btn" @click="idCard()" size='mini'></el-button>
                </el-input>
              </el-form-item>


              <legend class="legendColumn">上传附件 
                <i  class="fontRight" :class="uploadIcon" @click="showMore('uploadFileShow','uploadIcon')"></i>
              </legend>
                <uploadFile v-if="uploadFileShow"></uploadFile>
              <legend class="legendColumn" v-if="indexAdd!='DRAFT'||indexAdd!='handle'">流程处理 
                <i class="fontRight" :class="procedureIcon" @click="showMore('procedureShow','procedureIcon')"></i>
              </legend>
                <div id="workflowDiv"></div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :disabled="formData.consult.id==''" label="多水表" name='多水表'>
            <waterMeter  ref="waterMeter"  
            :NotDisabled="NotDisabled"  
            :id="formData.consult.id" 
            :editShow="false" 
            ></waterMeter>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import waterMeter from '@/components/waterMeter'
import uploadFile from '@/components/uploadPic'
import chooseAccount from "@/components/accountInfo"

export default {
  name: "waterQueryEdit",
  props: ['wQEditData','NotDisabled','indexAdd'],
  components: {
    uploadFile,
    waterMeter,
    chooseAccount,
  },
  data() {
    return {
      isId:'',
      activeName:'基础信息',
      procedureShow:true,
      procedureIcon:"el-icon-minus",
      uploadFileShow:true,
      uploadIcon:"el-icon-minus",
      signName:"电子签名",
      signVisible:false,
      chooseAccountName:"选择账户",
      chooseAccountVisible:false,
      isShow:false,
      icon:'\ue617',
      formData:{
        //账户信息
        accountInfo:{
          id: "",//
          ctmNo: "",//客户编号

          //账户信息
            accountNo: "",//账户编号
            payWay: "1",//缴费方式
            accountType: "1",//账户类型
            openAccountBank: "",//开户银行
            openAccountName: "",//账户名称
            bankAccount: "",//银行账户
            entrustNo: "",//托号
            entrustContract: "",//托收合同
            deliverWay: "1",//投递方式
            deliverAddr: "",//投递地址
            emailAddr: "",//邮箱地址
          // 开票信息
            invoiceType: "1",//发票类型
            invoiceTitle: "",//单位名称
            invoiceTax: "",//纳税人识别号
            invoiceAddr: "",//联系地址
            invoiceLink: "",//座机号码
            invoiceBank: "",//开户银行
            invoiceAccount: "",//银行账户

        },
        consult:{
            id: "",//
            tenantId: "",//租户id
          // 客户信息-经办人信息
            agentMan: "",//经办人姓名
            agentCertNo: "",//经办人证件号码
            agentCertType: "1",//经办人证件类型
            agentLinkTel: "",//经办人联系电话
          //单据信息
            billDate: "",//单据日期
            billNo: "",//单据编号
          // 工程信息
            pjName: "",//工程名称
            pjType: "1",//工程类型
            adminArea: "",//行政区域
            businessArea: "",//营业区域
            businessAbode: "",//营业所
            urgentFlag: "2",//紧急程度
            installAddr: "",//装表地址
            sourceFlag: "1",//信息来源
            oloUserNo: "",//原户号
            suserNo: "",//总表户号
            suserNo2: "",//总表户号2
            limitDate: "",//用水期限
            limitFlag: "1",//用水期
            comments: "",//备注
          // 流程信息
            processInstanceId: "",//流程id
            processName: "",//节点名称
            processState: "",//节点编号
          


          },
        ctmInfo:{
          // 客户信息
          id: "",//
          ctmNo: "",//客户编号
          ctmType: "2",//客户类型
          certType: "1",//证件类型
          certNo: "",//客户证件号码
          creditLevel: "1",//信用等级
          ctmAddr: "",//业主地址
          ctmName: "",//业主名称
          faxNumber: "",//传真号码
          linkTel: "",//联系电话
          mobile: "",//业主电话

        },
      },
      uploadPic:false,
      dialogEditContent:false,
      rules: {
      
      },
    
      dialogForm: {
        userName:'',
        userAddress:'',
        meterAddress:'',
        Contacts:'',
        contactNumber:'',
      },
      dictionaryData:[],//数据字典存值
      adminAreaOptions:[],//行政区域下拉框
      openABankOptions:[],//开户银行下拉框
      props: {//树结构格式
        value: 'id',
        label: 'name'
      },
      businessAbodeOptions:[],//营业所下拉框
      businessAreaOptions:[],//营业区域下拉框
      editContent: false,
      eleSignType:"进行签名"
    }
  },
  mounted() {
    if(this.wQEditData !=''){
      this.clearformData()
      this.formData = this.wQEditData
    }else{
      this.clearformData()
    }

    if(this.indexAdd=='DRAFT'||this.indexAdd=='handle'){
      this.$refs.waterMeter.initDraft(this.formData.consult.id);//初始化 多水表页面
    }
    
    //数据字典接口
    this.getDictionary();
    //审批界面接口
    this.getHtmlData();
    //行政区域接口
    this.selectTSubSystemTree();
    //营业所接口
    this.selectBAbodeOptions();
    //开户银行接口
    this.selectOABankOptions();
  },
  
  watch: {
  },
  methods: {
    // 电子签名
    // Signature(){
    //   if(this.eleSignType==="进行签名"){
    //     this.eleSignType = "查看";
    //     this.formData.electronicSignature = "已签名";
    //   }else{
    //     // this.eleSignType="进行签名"
    //     this.signVisible = true;
    //   }
    // },
    // 展示更多
    showMore(val,icon){
      if(this[val]){
        this[val] = false;
        this[icon] = "el-icon-plus";
      }else{
        this[val] = true;
        this[icon] = "el-icon-minus";
      }
    },
    //行政区域
    selectTSubSystemTree() {
      let _this = this
      let params = {
        "busicode": "DistrictTree",
        "data": {},
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        
        let data = _this.getArr(res.children)
        _this.adminAreaOptions = data;
      })
    },
    //树结构数据处理
    getArr(data){
      for (let i = 0; i< data.length; i++) {
        if(data[i].isParent === false) {
          delete data[i].children
        } else {
          this.getArr(data[i].children)
        }
      }
      return data
    },
    // 开户银行
    selectOABankOptions(){
      let _this = this
      let params = {
        "busicode": "BankTree",
        "data": {},
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        let data = _this.getArr(res.children)
        _this.openABankOptions = data;
        
      })
    },

    //营业所
    selectBAbodeOptions() {
      let _this = this
      let params = {
        "busicode": "BusinessAbodeSelect",
        "data": {},
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.businessAbodeOptions = res;
      })
    },
    changeBAbode(id){
     //营业区域
      this.selectBAreaOptions(id);
    },
    //营业区域
    selectBAreaOptions(id) {
      let _this = this
      let params = {
        "busicode": "BusinessAreaSelect",
        "data": {
          "businessAbodeId":id
        },
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.businessAreaOptions = res;
      })
    },
    // 数据字典数据获取
    getDictionary() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": "CTT,IDT,CDL,PPT,EGD,ACT,BBT,SDW,PIS,UWD,BPW"
        //客户类型、证件类型、信用级别、工程类型、紧急程度、账户类型 、发票类型、投递方式、信息来源、用水期、缴费方式
      }
      this.$api.fetch({
       params: params,//参数
      }).then(res => {
        _this.dictionaryData = res
      })
    },
    // 获取审批流前端代码
    getHtmlData() {
      let _this = this;
      //************启用流程代码************** */
      // console.log(_this.formData.consult);
      // console.log(_this.formData.approveFlag);
      
      _this.common.getProcessShowView(
        "PJ_CONSULT",
        "审批流配置:" + _this.formData.consult.processName + "(" + _this.formData.consult.billNo + ")",
        _this.formData.consult.id, 
        _this.formData.consult.processInstanceId, 
        "workflowDiv", 
        _this,() => {
          _this.$parent.closeDialog();
        },
        _this.formData.approveFlag , () => {
          this.submit()
        });
    },
    Preservation(){

      var _this = this 
      // 行政区域 只需要传最后一个值过去 
      if( typeof _this.formData.consult.adminArea == 'object'){
        _this.formData.consult.adminArea = _this.formData.consult.adminArea.pop()
      }
      // 开户银行 数据格式处理
      if (_this.formData.accountInfo.openAccountBank.length!=0) {
        _this.formData.accountInfo.openAccountBank = _this.formData.accountInfo.openAccountBank[0]
      }
      // 开户银行 数据格式处理
      if (_this.formData.accountInfo.invoiceBank.length!=0) {
        _this.formData.accountInfo.invoiceBank = _this.formData.accountInfo.invoiceBank[0]
      }
      var params = {
        "busicode": "PjConsultSave",
        "data":_this.formData
      }
      this.$api.fetch({
        params: params,//参数
        }).then(res => {
        _this.$notify({
          title: '成功',
          message: '表单保存成功',
          type: 'success'
        });
        if (_this.formData.consult.id=='') {
          //获取id
          _this.details(res,'Preservation')
        }
      })
    },

    //index判断 保存方法是暂存（true）按钮触发 还是提交（）按钮触发
    submit(){
      var _this = this 
      // 行政区域 只需要传最后一个值过去 
      if( typeof _this.formData.consult.adminArea == 'object'){
        _this.formData.consult.adminArea = _this.formData.consult.adminArea.pop()
      }
      // 开户银行 数据格式处理
      if (_this.formData.accountInfo.openAccountBank.length!=0) {
        _this.formData.accountInfo.openAccountBank = _this.formData.accountInfo.openAccountBank[0]
      }
      // 开户银行 数据格式处理
      if (_this.formData.accountInfo.invoiceBank.length!=0) {
        _this.formData.accountInfo.invoiceBank = _this.formData.accountInfo.invoiceBank[0]
      }
      
      this.formData.consult.branchRoadFlag = this.formData.consult.branchRoadFlag==true?1:(this.formData.consult.branchRoadFlag==1?1:0)
      this.formData.consult.exceedHigh = this.formData.consult.exceedHigh==true?1:(this.formData.consult.exceedHigh==1?1:0)
      var params = {
        "busicode": "PjConsultSave",
        "data":_this.formData
      }
      this.$api.fetch({
        params: params,//参数
        }).then(res => {
        _this.$notify({
          title: '成功',
          message: '表单保存成功',
          type: 'success'
        });
        
        if (_this.formData.consult.id=='') {
          //获取id
          _this.details(res)
        }else{
          _this.Process()
        }
      })
    },
    // 新建保存后，获取单据编号
    details(val,index){
      let _this = this;
      let params = {
        "busicode": "PjConsultQuery",
        "data":  {
          'id':val.id,
        }
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
          _this.formData = res;
          _this.$refs.waterMeter.SaveWaterMeter(val.id);//多水表页面保存 
          if (index!='Preservation') {
            _this.Process()
          }
      })
    },
    // 启动审批
    Process(){
      let _this = this;
      // 保存后启动审批
      _this.common.startProcess(
        //receiptType单据类型，一般是启用工作流的表的数据库名称
        "PJ_CONSULT",
        //title流程标题,一般是单据类型加单据编号等，容易区分的内容\用于主题
        "审批流配置:" + _this.formData.ctmInfo.ctmName + "(" + _this.formData.consult.billNo + ")",
        //billId单据Id
        _this.formData.consult.id,
        //that:"页面的this对象"
        _this,
        //_then 提交后的回调函数，一般用来执行界面跳转
        () => {
          _this.$parent.closeDialog();
        }
      );
    },
    //多水表保存
    SaveWaterMeter(){
          this.$refs.waterMeter.SaveWaterMeter(this.formData.consult.id);//初始化 多水表页面
    },
    handleChange(value) {
      // console.log(value);
    },
    clearformData(){
      
      this.formData = {
        //账户信息
        accountInfo:{
          id: "",//
          ctmNo: "",//客户编号

          //账户信息
            accountNo: "",//账户编号
            payWay: "1",//缴费方式
            accountType: "1",//账户类型
            openAccountBank: "",//开户银行
            openAccountName: "",//账户名称
            bankAccount: "",//银行账户
            entrustNo: "",//托号
            entrustContract: "",//托收合同

            
            deliverWay: "1",//投递方式

            deliverAddr: "",//投递地址
            emailAddr: "",//邮箱地址
          // 开票信息
            invoiceType: "1",//发票类型
            invoiceTitle: "",//单位名称
            invoiceTax: "",//纳税人识别号
            invoiceAddr: "",//联系地址
            invoiceLink: "",//座机号码
            invoiceBank: "",//开户银行
            invoiceAccount: "",//银行账户

        },
        consult:{
            id: "",//
            tenantId: "",//租户id
          // 客户信息-经办人信息
            agentMan: "",//经办人姓名
            agentCertNo: "",//经办人证件号码
            agentCertType: "1",//经办人证件类型
            agentLinkTel: "",//经办人联系电话
          //单据信息
            billDate: "",//单据日期
            billNo: "",//单据编号
          // 工程信息
            pjName: "",//工程名称
            pjType: "1",//工程类型
            adminArea: "",//行政区域
            businessArea: "",//营业区域
            businessAbode: "",//营业所
            urgentFlag: "2",//紧急程度
            installAddr: "",//装表地址
            sourceFlag: "1",//信息来源
            oloUserNo: "",//原户号
            suserNo: "",//总表户号
            suserNo2: "",//总表户号2
            limitDate: "",//用水期限
            limitFlag: "1",//用水期
            comments: "",//备注
          // 流程信息
            processInstanceId: "",//流程id
            processName: "",//节点名称
            processState: "",//节点编号
        },
        ctmInfo:{
          // 客户信息
          id: "",//
          ctmNo: "",//客户编号
          ctmType: "2",//客户类型
          certType: "1",//证件类型
          certNo: "",//客户证件号码
          creditLevel: "1",//信用等级
          ctmAddr: "",//业主地址
          ctmName: "",//业主名称
          faxNumber: "",//传真号码
          linkTel: "",//联系电话
          mobile: "",//业主电话
        },
      }
    },
    idCard(){ 
    },
    // 多页签的点击
    tabCurrent(val,tab){
      if(val.index == '多水表'){
        if (this.indexAdd=='add') {//点击添加按钮时 不用调用此方法
        }else{
            this.$refs.waterMeter.init();//初始化 多水表页面
        }
      }
      this.$emit('fromChild', val.index)//给父组件传递当前tabs值 0/登记界面 1/多水表界面  
    },
    upload(){//附件上传
      this.uploadPic = true;
    },
    closeDialog(val){
      this.editContent = false;
      this.uploadPic = false;
    },
    chooseAccount(){
      this.chooseAccountVisible = true;
    },
    changeAcount(val){
      if(val==="1"){
        this.chooseAccount();
      }else{
        this.closechoosectm();
      }
    },
    closechoosectm(){
      this.choosectmVisible = false;
      this.chooseAccountVisible = false;
    },

    },
  

}
</script>
<style lang="scss">
@import "../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.waterQueryEdit {    
  height: 100%;
  position: relative;
  .engineer-center-right-content {
    height: 100%;
    overflow-y: auto;
  }
}
</style>
