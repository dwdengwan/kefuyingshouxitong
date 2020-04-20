

<template>
  <div class="waterQueryHandle">
    <!-- 预览电子签名 -->
    <el-dialog append-to-body :title="signName" :visible.sync="signVisible"  :close-on-click-modal="false" class="addDialog">
           <img src="@/assets/images/sign.jpg" alt="签名">

    	</el-dialog>

    

    <div v-if="!isExecution" class='process'>
      
      <!-- 登记 -->
      <div v-if="operationShow == 'register'" class="process-left">
        <waterQueryEdit ref="waterQueryEdit" 
        :NotDisabled="NotDisabled"  
        :indexAdd="indexAddDate"
        :wQEditData="formData" @fromChild="fromChildVal"></waterQueryEdit>
      </div>

      <div class="process-left" v-show="operationShow != 'register'">
          
            <el-form :model="formData" class="formBill" :inline="true" ref="form" :rules="rules" size="mini" label-width="130px">
              
              <el-form-item label="单据编号：" >
                <el-input class="read-only" disabled="disabled" v-model="formData.consult.billNo" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="单据日期：" >
                <el-input class="read-only" disabled="disabled" v-model="formData.consult.billDate" placeholder=""></el-input>
              </el-form-item>
              <!-- 勘察 -->
              <div v-if="operationShow == 'survey'"   >

                  <legend class="legendColumn">  勘察信息 </legend>
                  
                    <el-form-item  class="Remarks" style=" margin-left: 70px;">
                      <el-checkbox  true-label=1 false-label=0 v-model="formData.consult.branchRoadFlag" :disabled="NotDisabled">需要办开挖许可证手续</el-checkbox>
                      <el-checkbox  true-label=1 false-label=0 v-model="formData.consult.exceedHigh" :disabled="NotDisabled">超标高</el-checkbox>
                    </el-form-item>
                    <br>
                    <el-form-item label="勘察人员：" >
                      <el-input v-model="formData.consult.surveyStaff" size="mini" clearable :disabled="NotDisabled"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="勘察日期：" >
                      <el-date-picker v-model="formData.consult.surveyDate" value-format="yyyy-MM-dd" :disabled="NotDisabled" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>

                    <el-form-item label="勘察结论：" class="Remarks">
                      <el-input type="textarea" v-model="formData.consult.surveyResult" :disabled="NotDisabled" ></el-input>
                    </el-form-item>
                    
                  
                  <!-- <legend class="legendColumn">流程处理</legend>
                    <div id="workflowDiv"></div> -->

              </div>

              <!-- 设计 -->
              <div v-if="operationShow == 'design'"   >
                <el-tabs type="border-card" tab-position="bottom"  v-model="activeName" @tab-click="tabCurrent">
                  <el-tab-pane label="基础信息" name='基础信息'>
                    <!-- <el-form  :model="formData" class="formBill" :inline="true"  size="mini" ref="form"  :rules="rules" label-width="130px">
                      
                      <el-form-item label="单据编号：" >
                        <el-input class="read-only" disabled="disabled" v-model="formData.consult.billNo" placeholder=""></el-input>
                      </el-form-item>
                      <el-form-item label="单据日期：" >
                        <el-input class="read-only" disabled="disabled" v-model="formData.consult.billDate" placeholder=""></el-input>
                      </el-form-item> -->

                      <legend class="legendColumn">  设计信息 </legend>
                        <el-form-item label="设计人员：" prop="designStaff">
                          <el-input v-model="formData.consult.designStaff" clearable :disabled="NotDisabled"></el-input>
                        </el-form-item>
                        <el-form-item label="设计日期：" prop="designDate">
                          <el-date-picker v-model="formData.consult.designDate" value-format="yyyy-MM-dd" type="date" :disabled="NotDisabled" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="设计说明：" class="Remarks" prop="designDesc">
                          <el-input type="textarea" v-model="formData.consult.designDesc" :disabled="NotDisabled"></el-input>
                        </el-form-item>

                      <!-- <legend class="legendColumn">流程处理</legend>
                        <div id="workflowDiv"></div> -->

                    <!-- </el-form> -->
                  </el-tab-pane>
                  <el-tab-pane  label="施工材料" name='施工材料'>
                  
                    <legend class="legendColumn">  施工材料 </legend>
                      <ConstructionMaterials ref="ConstructionMaterials"  
                        :isId="formData.consult.id"
                        :NotDisabled="NotDisabled"  >
                      </ConstructionMaterials>
                  </el-tab-pane>
                </el-tabs>
                
              </div>

              <!-- 编制预算 -->
              <div v-if="operationShow == 'budget'"   >
                <!-- <el-form :model="formData"  class="formBill" :inline="true"  size="mini" ref="form" :rules="rules" label-width="130px">
                  
                  <el-form-item label="单据编号：" >
                    <el-input class="read-only" disabled="disabled" v-model="formData.consult.billNo" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="单据日期：" >
                    <el-input class="read-only" disabled="disabled" v-model="formData.consult.billDate" placeholder=""></el-input>
                  </el-form-item> -->

                  <legend class="legendColumn">  编制预算信息 </legend>
                    <el-form-item label="表前人工费预算：" >
                      <el-input v-model="formData.consult.budgetLaborMeterAfter" size="mini" clearable :disabled="NotDisabled"></el-input>
                    </el-form-item>

                    <el-form-item label="表后人工费预算：">
                      <el-input v-model="formData.consult.budgetLaborMeterBefore" size="mini" clearable :disabled="NotDisabled"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="表前材料费预算：" >
                      <el-input v-model="formData.consult.budgetMatrMeterAfter" size="mini" clearable :disabled="NotDisabled"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="表后材料费预算：" >
                      <el-input v-model="formData.consult.budgetMatrMeterBefore" size="mini" clearable :disabled="NotDisabled"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="其他预算：">
                      <el-input v-model="formData.consult.budgetOther" size="mini" clearable :disabled="NotDisabled"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="设计费：" >
                      <el-input v-model="formData.consult.designCost" size="mini" clearable :disabled="NotDisabled"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="押金：" >
                      <el-input v-model="formData.consult.depositMoney" size="mini" clearable :disabled="NotDisabled"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="预算合计：">
                      <el-input v-model="formData.consult.budgetMoney" size="mini" clearable :disabled="NotDisabled"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="结算方式：" >
                      <el-select v-model="formData.consult.prepayType" clearable size="mini" :disabled="NotDisabled">
                        <el-option v-for="item in dictionaryData.PCW" :key="item.value" :label="item.name" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                    
                    <el-form-item label="编制人员：" >
                      <el-input v-model="formData.consult.budgetStaff" size="mini" clearable :disabled="NotDisabled"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="编制日期：" >
                      <el-date-picker v-model="formData.consult.budgetDate" value-format="yyyy-MM-dd" :disabled="NotDisabled" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                    
                    <el-form-item label="编制说明：" class="Remarks">
                      <el-input type="textarea" v-model="formData.consult.budgetComments" :disabled="NotDisabled"></el-input>
                    </el-form-item>
                    
                  <!-- <legend class="legendColumn">流程处理</legend>
                    <div id="workflowDiv"></div> -->
                <!-- </el-form> -->
              </div>
              
              <legend class="legendColumn">流程处理</legend>
                <div id="workflowDiv"></div>
          
        </el-form>
      </div>
        
        <div class="StepCollapse" @click="collapse">
          <i class="el-icon-arrow-right leftChange"></i>
        </div>
        <div class="process-right" v-if="approvalShow">
          <div class="stepsTitle">流程信息</div>
          <div class="line"></div>
          <el-steps :active="operation" direction="vertical"  finish-status="success">
            <el-step title="登记信息" @click.native="stepActive(1,'register')"> </el-step>
            <el-step title="勘察" @click.native="stepActive(2,'survey')"></el-step>
            <el-step title="设计" @click.native="stepActive(3,'design')"></el-step>
            <el-step title="编制预算" @click.native="stepActive(4,'budget')"></el-step>
          </el-steps>
        </div>
    </div>

  </div>
</template>
<script>
import waterQueryEdit from "./waterQueryEdit";//登记界面
import uploadFile from '@/components/uploadPic';
import ConstructionMaterials from '@/components/ConstructionMaterials';
import procedure from "@/components/procedure"
import chooseAccount from "@/components/accountInfo"
import choosectm from "@/components/ctmInfor"
export default {
  name:"waterQueryHandle",
  props: ['wQEditData'],
  // props:[],
  components: {
    waterQueryEdit,
    uploadFile,
    ConstructionMaterials,
    procedure,
    chooseAccount,
    choosectm
  },
  
  
  data() {
    return {
      indexAddDate:'',
      // 是否可编辑
      NotDisabled:false,
      approvalShow: true,
      eleSignType:"签名",
      procedureShow:true,
      procedureIcon:"el-icon-minus",
      uploadFileShow:true,
      uploadIcon:"el-icon-minus",
      signName:"电子签名",
      signVisible:false,
      hangUp:{},
      activeName: '基础信息',
      isShow:false,
      oldData:[],
      uploadPic:false,//上传附件
      isExecution:false,//施工材料
      editContent: false,//多水表录入
      isEdit:false,//多水表录入是否可编辑
      editContent1:false,
      dictionaryData:[],//数据字典存值
      //表单信息
      formData:{
        accountInfo:{//账户信息
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
            pjType: "",//工程类型
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
            limitFlag: "q",//用水期
            comments: "",//备注
          // 流程信息
            processInstanceId: "",//流程id
            processName: "",//节点名称
            processState: "",//节点编号
          // 勘察节点信息
            branchRoadFlag: 1,//需要办开挖许可证手续
            exceedHigh: 1,//超标高
            surveyDate: this.common.date(),//勘察日期
            surveyResult: "",//勘察结论
            surveyStaff: "",//勘察人员
          // 设计节点 信息
            designDate: this.common.date(),//设计日期
            designDesc: "",//设计说明
            designStaff: "",//设计人员
          // 预算节点信息
            budgetLaborMeterAfter: "",//表前人工费预算
            budgetLaborMeterBefore: "",//表后人工费预算
            budgetMatrMeterAfter: "",//表前材料费预算
            budgetMatrMeterBefore: "",//表后材料费预算
            budgetOther: "",//其他预算
            designCost: "",//设计费
            depositMoney: "",//押金
            budgetMoney: "",//预算合计
            prepayType: "1",//结算方式
            budgetStaff: "",//预算编制人员
            budgetDate: this.common.date(),//预算编制日期
            budgetComments: "",//预算编制说明


          },
        ctmInfo:{
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
      operationShow:2,
      operation:1,
      rules: {
        Applicant: [
          { required: true, message: '请输入申请人', trigger: 'blur' }
        ],
        applicantDate: [
          { required: true, message: '请输入申请日期', trigger: 'change' }
        ],
        engineerType: [
          { required: true, message: '请选择工程类型', trigger: 'change' }
        ],
        Contacts: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        documentType: [
          { required: true, message: '请输入证件类型', trigger: 'blur' }
        ],
        documentNumber: [
          { required: true, message: '请输入证件号码', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '请输入座机号码', trigger: 'blur' }
        ],
        Emergency: [
          { required: true, message: '请选择紧急程度', trigger: 'change' }
        ],
      },
      dialogForm: {
        userName:'',
        userAddress:'',
        meterAddress:'',
        bookNum:'',
        documentType:'',
        documentNum:'',
        meterDate:'',
        meterStaff:'',
        meterNum:'',
        meterCaliber:'',
        waterType:'',
        compression:'',
        deposit:'',
      },
    }
  },
  mounted() {
    if(this.wQEditData !=''){
      this.clearformData()
      this.formData = this.wQEditData
      this.operationShow = this.formData.consult.processState
    }else{
      this.clearformData()
    }
    //审批界面接口
    this.getHtmlData();
    eventBus.$on('operation', (item) => {
      this.operationShow = item.num;
    });
  },
  watch: {
    operationShow(newVal,oldVal){
      // console.log('当前节点'+this.formData.consult.processState);
      if (newVal == 'END') {
          this.operation = 0;
          this.NotDisabled = true;
          this.operationShow = 'register'
      }else if(newVal == 'CANCEL'){
          this.operation = 0;
          this.NotDisabled = true;
          this.operationShow = 'register'
      }else{
        if (newVal == 'survey') {//勘察
          this.operation = 1;
          this.formData.consult.branchRoadFlag = this.formData.consult.branchRoadFlag==1?true:false
          this.formData.consult.exceedHigh = this.formData.consult.exceedHigh==1?true:false
          
        }else if( newVal == 'design'){//设计
          this.operation = 2;
        }else if( newVal == 'budget'){//预算
          this.getDictionary();
          this.operation = 3;
        }else if( newVal == 'register'){//登记
          this.operation = 0;
          this.indexAddDate = 'handle'
        }

        //在相同业务节点下
        if (this.formData.consult.processState == newVal) {
          if (this.formData.approveFlag == 1) {
            //审批节点
            this.NotDisabled = true//不可修改
          }else{
            //非审批节点
            this.NotDisabled = false//可修改
          }
          // 不同的业务节点
        }else{
          if (this.formData.approveFlag == 1) {
            //审批节点
            // console.log('审批节点不可修改');
            this.NotDisabled = true//不可修改
          }else{
            //非审批节点
            if (this.formData.consult.processState =='budget') {
              //登记节点 预算节点时 不可修改
              this.NotDisabled = true//不可修改
            }else{
              //登记节点 非预算节点 可修改
              this.NotDisabled = false//可修改
            }
          }
        }
      }
    },
  },
  methods: {
    
    submit(index){//步骤条-工程登记-暂存/暂存
      var _this = this
      var params = {
        "busicode": "PjConsultSave",
        "data":_this.formData
      }
      //勘察 survey
      //设计 design
      //预算 budget
      this.formData.consult.branchRoadFlag = this.formData.consult.branchRoadFlag==true?1:(this.formData.consult.branchRoadFlag==1?1:0)
      this.formData.consult.exceedHigh = this.formData.consult.exceedHigh==true?1:(this.formData.consult.exceedHigh==1?1:0)
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
          this.$notify({
            title: '成功',
            message: '表单保存成功',
            type: 'success'
          });
          _this.Process();//启动审批流

      })
    },
    
    // 审批
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

    // 获取审批流前端代码
    getHtmlData() {
      let _this = this;
      //************启用流程代码************** */
      
      _this.common.getProcessShowView("PJ_CONSULT",
        "审批流配置:" + _this.formData.consult.processName + "(" + _this.formData.consult.billNo + ")",
        _this.formData.consult.id, 
        _this.formData.consult.processInstanceId, "workflowDiv", _this, () => {
        _this.$parent.closeDialog();
        }, _this.formData.approveFlag , () => {
          this.submit()
        });
    },
    // 数据字典数据获取
    getDictionary() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": "PCW"
        //结算方式
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.dictionaryData = res
      })
    },
    showTemplateDialog(){
      this.$refs.ConstructionMaterials.showTemplateDialog();//初始化 多水表页面
    },
    collapse(){
      if(this.approvalShow == true){
        this.approvalShow = false
        this.util.approvalShow(this.approvalShow, '.waterQueryHandle .process-left', '.waterQueryHandle .stepsCompar','.waterQueryHandle .StepCollapse', '.waterQueryHandle .leftChange')
      }else{
        
        this.approvalShow = true
        this.util.approvalShow(this.approvalShow, '.waterQueryHandle .process-left', '.waterQueryHandle .stepsCompar','.waterQueryHandle .StepCollapse', '.waterQueryHandle .leftChange')
      }
    },
    // 电子签名
    Signature(){
      if(this.eleSignType==="进行签名"){
        this.eleSignType = "查看";
        this.ruleForm.electronicSignature = "已签名";
      }else{
        this.signVisible = true;
      }
    },
    clearformData(){
      this.formData = {
        accountInfo:{//账户信息
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
            pjType: "",//工程类型
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
            limitFlag: "q",//用水期
            comments: "",//备注
          // 流程信息
            processInstanceId: "",//流程id
            processName: "",//节点名称
            processState: "",//节点编号
          // 勘察节点信息
            branchRoadFlag: "",//需要办开挖许可证手续
            exceedHigh: "",//超标高
            surveyDate: this.common.date(),//勘察日期
            surveyResult: "",//勘察结论
            surveyStaff: "",//勘察人员
          // 设计节点 信息
            designDate: this.common.date(),//设计日期
            designDesc: "",//设计说明
            designStaff: "",//设计人员
          // 预算节点信息
            budgetLaborMeterAfter: "",//表前人工费预算
            budgetLaborMeterBefore: "",//表后人工费预算
            budgetMatrMeterAfter: "",//表前材料费预算
            budgetMatrMeterBefore: "",//表后材料费预算
            budgetOther: "",//其他预算
            designCost: "",//设计费
            depositMoney: "",//押金
            budgetMoney: "",//预算合计
            prepayType: "1",//结算方式
            budgetStaff: "",//预算编制人员
            budgetDate: this.common.date(),//预算编制日期
            budgetComments: "",//预算编制说明


          },
        ctmInfo:{
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
    addExecution(){//步骤条-设计-施工材料-添加
      this.$refs.ConstructionMaterials.addExecution();
    },
    saveExecution(){
      this.$refs.ConstructionMaterials.save();
    },
    
    // 多页签的点击
    tabCurrent(val,tab){
      console.log(val,tab);
      if(val.index == '基础信息'){
        this.$emit('fromChildVal', val.index)//给父组件传递当前tabs值 0/登记界面 1/多水表界面  
      }else{
        this.$emit('fromChildVal', val.index)//给父组件传递当前tabs值 0/登记界面 1/多水表界面  
      }
    },
    //审批流程返回按钮
    operationReturn() {
      eventBus.$emit('operationReturn', false);
    },
    upload(){
      this.editContent = false;
      this.isExecution = false;
      this.uploadPic = true;
    },
    chooseCtm(){
      this.$emit('chooseCtm','chooseCtm')
    },
    stepActive(val,step){
      this.$emit('fromHandleChild',step)
      this.operationShow = step;
      this.operation = val-1;
      //审批界面接口
      this.getHtmlData();
    },
    fromChildVal(val){
      this.$emit('fromChildVal', val)
    },
    SaveWaterMeter(){
      this.$refs.waterQueryEdit.SaveWaterMeter(this.formData.consult.id)
    },
    closeDialog(){
        this.$parent.closeDialog();
    },
  },
}
</script>
<style lang="scss">
.waterQueryHandle{
  height: 100%;
}
</style>