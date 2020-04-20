<template>
  <div class="waterMeterHandleInfo">
    <!-- 预览电子签名 -->
    <el-dialog :title="signName" :visible.sync="signVisible" :close-on-click-modal="false" class="button-dialog">
        <img src="@/assets/images/sign.jpg" alt="签名">

    </el-dialog>
    <!-- 查看需求咨询 -->
    <el-dialog :title="queryName" :visible.sync="queryDetailShow" :close-on-click-modal="false" class="common-dialog">
        <!-- <waterQuery ></waterQuery> -->
        
      <!-- 详情页面 -->
      <waterQuery   ref="handleInfo"  
        :wQEditData="queryDetailData" 
        :ConstructionShow="ConstructionShowData" 
        style="height:calc(100% - 41px)" 
        :indexAdd="indexAddDate"  
        v-if="queryDetailShow" 
        @fromHandleChild="getChildHandleNum" 
        @fromChildVal="getChildTabsNum">
    </waterQuery>

    </el-dialog>
    
    <div class='process'>
      <div class="process-left">
        <el-form :model="formData" class="formBill" :inline="true"  size="mini"  ref="form" :rules="rules" label-width="130px">
            <el-form-item label="单据编号：" >               
              <el-input class="read-only" disabled="disabled" v-model="formData.billNo" placeholder=""></el-input>  
            </el-form-item> 

            <el-form-item label="单据日期：" >               
              <el-input class="read-only" disabled="disabled" v-model="formData.billDate" placeholder=""></el-input>
            </el-form-item>

            <legend class="legendColumn">  客户信息 </legend>

              <el-form-item label="客户编号：" prop="ctmNo">
                <el-input v-model="formData.ctmInfo.ctmNo" size="mini"  clearable class="read-only" disabled="disabled"></el-input>
              </el-form-item>
            
              <el-form-item label="客户类型：" prop="ctmType">
                <el-input v-model="formData.ctmInfo.ctmType" size="mini"  clearable class="read-only" disabled="disabled"></el-input>
              </el-form-item>
            
              <el-form-item label="业主名称：" prop="ctmName">
                <el-input v-model="formData.ctmInfo.ctmName" size="mini"  clearable class="read-only" disabled="disabled"></el-input>
              </el-form-item>

              <el-form-item label="业主证件类型：" prop="certType">
                <el-input v-model="formData.ctmInfo.certType" size="mini"  clearable class="read-only" disabled="disabled"></el-input>
              </el-form-item>
            
              <el-form-item label="业主证件号码：" prop="certNo">
                <el-input v-model="formData.ctmInfo.certNo" size="mini"  clearable class="read-only" disabled="disabled"></el-input>
              </el-form-item>
            
              <el-form-item label="业主电话：" prop="mobile">
                <el-input v-model="formData.ctmInfo.mobile" size="mini"  clearable class="read-only" disabled="disabled"></el-input>
              </el-form-item>
                    
            <legend class="legendColumn">  工程信息 </legend>
                  
                    <el-form-item label="工程类型：" prop="pjType">
                      <el-input v-model="formData.register.pjType" size="mini"  clearable class="read-only" disabled="disabled"></el-input>
                    </el-form-item>
                  
                    <el-form-item label="紧急程度：" prop="urgentFlag">
                      <el-input v-model="formData.register.urgentFlag" size="mini"  clearable class="read-only" disabled="disabled"></el-input>
                    </el-form-item>

                    <el-form-item label="装表地址：" prop="installAddr">
                      <el-input v-model="formData.register.installAddr" size="mini"  clearable class="read-only" disabled="disabled"></el-input>
                    </el-form-item>
            <!-- 工程收款 -->
            <div   v-if="operationShow == 'charge'">          
              <legend class="legendColumn">  收款信息 </legend>
          
                      <el-form-item label="预缴合计：" prop="prepayMoney">
                        <el-input v-model="formData.charge.prepayMoney" size="mini"  clearable class="read-only" disabled="disabled"></el-input>
                      </el-form-item>
                      
                      <el-form-item label="押金合计：" prop="depositMoney">
                        <el-input v-model="formData.charge.depositMoney" size="mini"  clearable  class="read-only" disabled="disabled"></el-input>
                      </el-form-item>
                      
                      <el-form-item label="应收合计：" prop="budgetMoney">
                        <el-input v-model="formData.charge.budgetMoney" size="mini"  clearable  class="read-only" disabled="disabled"></el-input>
                      </el-form-item>
                      
                      <el-form-item label="收款人员：" prop="budgetPayStaff">
                        <el-input v-model="formData.charge.budgetPayStaff" size="mini"  clearable  class="read-only" disabled="disabled"></el-input>
                      </el-form-item>
                      
                      <el-form-item label="收款日期：" prop="budgetPayDate">
                        <el-input v-model="formData.charge.budgetPayDate" size="mini"  clearable  class="read-only" disabled="disabled"></el-input>
                      </el-form-item>
                      
                      <el-form-item label="缴款说明：" class="Remarks"  prop="budgetPayComments">
                        <el-input  type="textarea" disabled v-model="formData.charge.budgetPayComments"  ></el-input>
                      </el-form-item>
                    
                
            </div>
            <!-- 安装施工 -->
            <div   v-if="operationShow == 'build'">
                <el-tabs type="border-card" tab-position="bottom" @tab-click="tabCurrent">
                  <el-tab-pane label="基础信息">
                                
                      <legend class="legendColumn">  安装信息 </legend>
                      
                        <el-form-item label="派单日期：" prop="sendOrderDate">
                          <el-date-picker 
                            v-model="formData.build.sendOrderDate" 
                            format="yyyy-MM-dd" 
                            value-format="yyyy-MM-dd"  
                            :disabled="NotDisabled" 
                            type="date" 
                            placeholder="选择日期">
                          </el-date-picker>
                        </el-form-item>
                        
                        <el-form-item label="施工班组：" prop="constGroup">
                        <el-input v-model="formData.build.constGroup" size="mini" :disabled="NotDisabled" clearable></el-input>
                        </el-form-item>
                        
                        <el-form-item label="开始施工日期：" prop="constBeginDate">
                          <el-date-picker 
                            v-model="formData.build.constBeginDate"  
                            format="yyyy-MM-dd" 
                            value-format="yyyy-MM-dd"  
                            :disabled="NotDisabled" 
                            type="date" 
                            placeholder="选择日期">
                          </el-date-picker>
                        </el-form-item>
                        
                        <el-form-item label="结束施工日期：" prop="constEndDate">
                          <el-date-picker 
                            v-model="formData.build.constEndDate"  
                            format="yyyy-MM-dd" 
                            value-format="yyyy-MM-dd"  
                            :disabled="NotDisabled" 
                            type="date" 
                            placeholder="选择日期">
                          </el-date-picker>
                        </el-form-item>
                        
                        <el-form-item label="施工说明："  class="Remarks"  prop="constComments">
                        <el-input type="textarea" v-model="formData.build.constComments"  :disabled="NotDisabled"  ></el-input>
                        </el-form-item>         
                  </el-tab-pane>
                  
                  <el-tab-pane label="多水表">
                      <waterMeter ></waterMeter>
                  </el-tab-pane>

                  <el-tab-pane label="施工材料">
                    <ConstructionMaterials ref="ConstructionMaterials"  
                      v-if="ConstructionShow" :isId="formData.consult.id">
                    </ConstructionMaterials>
                  </el-tab-pane>
                </el-tabs>

            </div>
            <!-- 工程验收 -->
            <div   v-if="operationShow == 'check'">
              <legend class="legendColumn">  验收信息 </legend>
              
                <el-form-item label="验收人员：" prop="checkStaff">
                  <el-input v-model="formData.check.checkStaff" size="mini" :disabled="NotDisabled" clearable></el-input>
                </el-form-item>
                
                <el-form-item label="验收日期：" prop="checkDate">
                  <el-date-picker 
                    v-model="formData.check.checkDate"
                    format="yyyy-MM-dd" 
                    value-format="yyyy-MM-dd"  
                    :disabled="NotDisabled" 
                    type="date" 
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                
                <el-form-item label="验收说明："  class="Remarks"  prop="checkDesc">
                <el-input type="textarea" v-model="formData.check.checkDesc" :disabled="NotDisabled" ></el-input>
                </el-form-item>
            </div>
            <!-- 立户 -->
            <div   v-if="operationShow == 'open'">
              <legend class="legendColumn">水表明细 
                <!-- <el-button icon="el-icon-document-copy" type="text" size="mini">整列复制</el-button> -->
              </legend>
                <waterMeter  
                  ref="waterMeter"  
                  :NotDisabled="NotDisabled"  
                  :id="formData.id" >
                </waterMeter>
            </div>
            <!-- 编制结算 -->
            <div   v-if="operationShow == 'setmt'">
              <ConstructionMaterials ref="ConstructionMaterials" v-if="ConstructionShow" :isId="formData.consult.id"></ConstructionMaterials>
              <legend class="legendColumn">  编制结算信息 </legend>
                
                  <el-form-item label="表前人工费结算：" prop="setmtLaborMeterBefore">
                    <el-input v-model="formData.setmt.setmtLaborMeterBefore" :disabled="NotDisabled" size="mini" clearable></el-input>
                  </el-form-item>
                  
                  <el-form-item label="表后人工费结算：" prop="setmtLaborMeterAfter">
                    <el-input v-model="formData.setmt.setmtLaborMeterAfter" :disabled="NotDisabled" size="mini" clearable></el-input>
                  </el-form-item>
                  
                  <el-form-item label="表前材料费结算：" prop="setmtMatrMeterAfter">
                    <el-input v-model="formData.setmt.setmtMatrMeterAfter" :disabled="NotDisabled" size="mini" clearable></el-input>
                  </el-form-item>

                  <el-form-item label="表后材料费结算：" prop="setmtMatrMeterBefore">
                    <el-input v-model="formData.setmt.setmtMatrMeterBefore" :disabled="NotDisabled" size="mini" clearable></el-input>
                  </el-form-item>
                  
                  <el-form-item label="其他结算：" prop="setmtOtherMeter">
                    <el-input v-model="formData.setmt.setmtOtherMeter" :disabled="NotDisabled" size="mini" clearable></el-input>
                  </el-form-item>
                  
                  <el-form-item label="设计费结算：" prop="setmtDesignCost">
                    <el-input v-model="formData.setmt.setmtDesignCost" :disabled="NotDisabled" size="mini" clearable></el-input>
                  </el-form-item>
                  
                  <el-form-item label="总管分担费用：" prop="costShare">
                    <el-input v-model="formData.setmt.costShare" size="mini" :disabled="NotDisabled" clearable></el-input>
                  </el-form-item>
                  
                  <el-form-item label="结算合计：" prop="setmtMoney">
                    <el-input v-model="formData.setmt.setmtMoney" size="mini" :disabled="NotDisabled" clearable></el-input>
                  </el-form-item>
                  
                  <el-form-item label="预缴合计：" prop="prepayMoney">
                    <el-input v-model="formData.setmt.prepayMoney" size="mini" disabled class="read-only" clearable></el-input>
                  </el-form-item>
                  
                  <el-form-item label="退补金额：" prop="backFillMoney">
                    <el-input v-model="formData.setmt.backFillMoney" size="mini"  disabled class="read-only" clearable></el-input>
                  </el-form-item>
                  
                  <el-form-item label="编制人员：" prop="setmtStaff">
                    <el-input v-model="formData.setmt.setmtStaff" size="mini" :disabled="NotDisabled" clearable></el-input>
                  </el-form-item>
                  
                  <el-form-item label="编制日期：" prop="setmtDate">
                    <el-date-picker v-model="formData.setmt.setmtDate"
                      format="yyyy-MM-dd" 
                      value-format="yyyy-MM-dd"  
                      :disabled="NotDisabled" 
                      type="date" 
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  
                  <el-form-item label="编制说明："  class="Remarks"  prop="setmtComments">
                    <el-input type="textarea" v-model="formData.setmt.setmtComments" :disabled="NotDisabled" ></el-input>
                  </el-form-item>
            </div>
            <!-- 工程结算 -->
            <div   v-if="operationShow == 'refund'">
              <legend class="legendColumn">  退款信息</legend>
      
                  <el-form-item label="结算合计：" prop="settlementTotal">
                    <el-input v-model="formData.settlementTotal" size="mini" disabled clearable  type="number" @change ='countNum()'></el-input>
                  </el-form-item>
                  
                  <el-form-item label="预缴金额：" prop="advancePayment">
                    <el-input v-model="formData.advancePayment" size="mini" disabled clearable  type="number" @change ='countNum()'></el-input>
                  </el-form-item>
                  
                  <el-form-item label="退补金额：" prop="amountRefund">
                    <el-input v-model="formData.amountRefund" size="mini" clearable disabled></el-input>
                  </el-form-item>
                  
                  <el-form-item label="收款方式：" prop="paymentMethod">
                    <el-select v-model="formData.paymentMethod" clearable disabled size="mini"  >
                        <el-option v-for="item in paymentMethodList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  
                  <el-form-item label="结算人员：" prop="settlers">
                    <el-input v-model="formData.settlers" size="mini" disabled clearable></el-input>
                  </el-form-item>
                  
                  <el-form-item label="结算日期：" prop="settlementDate">
                    <el-date-picker v-model="formData.settlementDate" 
                      format="yyyy-MM-dd" 
                      value-format="yyyy-MM-dd"  
                      :disabled="NotDisabled" 
                      type="date" 
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  
                  <el-form-item label="结算说明：" class="Remarks"  prop="settlementStatement">
                    <el-input type="textarea" v-model="formData.settlementStatement" disabled  ></el-input>
                  </el-form-item>

                  <el-form-item label="余款退款方式：" class="Remarks"  prop="refundWay">
                    
                    <el-radio v-model="formData.refundMode" label="0" >无</el-radio>
                    <el-radio v-model="formData.refundMode" label="1" >现金</el-radio>
                    <el-radio v-model="formData.refundMode" label="10" >转账</el-radio>
                    <el-radio v-model="formData.refundMode" label="5" >转余额</el-radio>

                      <!-- <el-select v-model="formData.register.refundWay"  clearable size="mini"  >
                        <el-option v-for="item in dictionaryData.PBT" :key="item.value" :label="item.name" :value="item.value"></el-option>
                      </el-select> -->
                  </el-form-item>
                  <br>
                  
                  <el-form-item label="开户银行：" prop="bankName">
                    
                    <el-cascader
                        :disabled="NotDisabled"
                        v-model="formData.refund.bankName"
                        :options="openABankOptions"
                        :show-all-levels="false"
                        :props="props">
                      </el-cascader>
                  </el-form-item>
                  
                  <el-form-item label="开户名称：" prop="bankAccountName">
                    <el-input v-model="formData.openingBankName" size="mini" clearable :disabled="NotDisabled"></el-input>
                  </el-form-item>
                  
                  <el-form-item label="银行账户：" prop="bankAccount" class="id-card">
                    <el-input placeholder="证件号码" v-model="formData.bankAccount" class="input-with-select" clearable :disabled="NotDisabled">
                        <el-button slot="append" icon="el-icon-reading" class="scanning-btn" @click="idCard()" size='mini' ></el-button>
                    </el-input>
                  </el-form-item>
                              
              
            </div>
            <legend class="legendColumn">  流程处理 </legend>
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
            <el-step title="工程收款" @click.native="stepActive(0,'charge')"></el-step>
            <el-step title="安装施工" @click.native="stepActive(1,'build')"></el-step>
            <el-step title="工程验收" @click.native="stepActive(2,'check')"></el-step>
            <el-step title="立户" @click.native="stepActive(3,'open')"></el-step>
            <el-step title="编制结算" @click.native="stepActive(4,'setmt')"></el-step>
            <el-step title="工程结算" @click.native="stepActive(5,'refund')"></el-step>
            <!-- <el-step title="表计挂接" @click.native="stepActive(11)"></el-step> -->
            <!-- <el-step title="结束" @click.native="stepActive(12)"></el-step> -->
            </el-steps>
      
      </div>
    </div>
    
  </div>
</template>
<script>
import ConstructionMaterials from '@/components/ConstructionMaterials';
import waterMeter from '@/components/waterMeter';
import chooseAccount from "@/components/accountInfo"
import choosectm from "@/components/ctmInfor"
import waterQuery from "../waterQuery/waterQueryHandle"
export default {
  name:"waterMeterHandleInfo",
  components: {
    ConstructionMaterials,
    waterMeter,
    chooseAccount,
    choosectm,
    waterQuery,
  },
  props: ['wQEditData','ConstructionShow'],
  data() {
    return {
      approvalShow: true,
      queryName:"用水需求咨询",
      queryDetailShow:false,
      eleSignType:"进行签名",
      signName:"电子签名",
      signVisible:false,
      choosectmName:"选择客户",
      choosectmVisible:false,
      chooseAccountName:"选择账户",
      chooseAccountVisible:false,
      operationShow: 5,
      operation:0,
      NotDisabled:false,// 是否可编辑
      dictionaryData:[],//数据字典存值
      openABankOptions:[],//开户银行下拉框
      props: {//树结构格式
        value: 'id',
        label: 'name'
      },
      crumbsData: { //面包屑
        titleList: [
          { title: '工程管理' },
          { title: '用户工程' },
          { title: '用水安装' },
        ],
      },
      // 用水咨询数据获取
      queryDetailData:[],
      // 校验
      rules: {
        Applicant: [
          { required: true, message: '请输入申请人', trigger: 'blur' }
        ],
      },
      formData: {
        // 单据信息
          billNo: '',//单据编号
          billDate: '',//单据日期
        // 客户信息
          ctmInfo:{
            ctmNo: "",//客户编号
            ctmType: "1", //客户类型
            ctmName: "",//业主名称
            certType: "1", //业主证件类型
            certNo: "", //业主证件号码
            mobile: "",//业主电话
          },
        // 工程信息
          register:{
            pjType: "1",//工程类型
            urgentFlag: "1",//紧急程度
            installAddr: "",//装表地址
          },
        // 工程收款节点
          charge:{    
            prepayMoney: "",//预缴合计
            depositMoney: "",//押金合计
            budgetMoney: "",//应收合计
            budgetPayStaff: "",//收款人员
            budgetPayDate: this.common.date(),//收款日期
            budgetPayComments: "",//缴款说明
          },
        // 施工安装节点
          build:{    
            sendOrderDate: this.common.date(),//派单日期
            constGroup: "",//施工班组
            constBeginDate: this.common.date(),//开始施工日期
            constEndDate: this.common.date(),//结束施工日期
            constComments: "",//施工说明
          },
        // 工程验收节点
          check:{    
            checkStaff: "",//验收人员
            checkDate:this.common.date(),//验收日期
            checkDesc: "",//验收说明
          },
          //编制结算节点
          setmt:{
            setmtLaborMeterBefore: "",//表前人工费结算
            setmtLaborMeterAfter: "",//表后人工费结算
            setmtMatrMeterAfter: "",//表前材料费结算
            setmtMatrMeterBefore: "",//表后材料费结算
            setmtOtherMeter: "",//其他结算
            setmtDesignCost: "",//设计费结算
            costShare: "",//总管分担费用
            setmtMoney: "",//结算合计
            prepayMoney: "",//预缴合计
            backFillMoney: "",//退补金额
            setmtStaff: "",//编制人员
            setmtDate:this.common.date(),//编制日期
            setmtComments: "",//编制说明
          },
          refund:{

            bankName: "",//开户银行
            bankAccountName: "",//开户名称
            bankAccount: "",//银行账户
            refundWay: "",//余款退款方式
          },
      },


    }
  },
  mounted() {
    this.clearformData()
    this.formData = this.wQEditData
    this.operationShow = this.formData.processState
    // 开户银行
    this.selectOABankOptions()
    //审批界面接口
    this.getHtmlData();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
    this.$nextTick(() => {
      this.common.changeTable(this, '.engineer-center .engineer-center-right', ['.engineer-center .table-top'])
    })
    eventBus.$on('operation', (item) => {
      this.operationShow = item.num;
    });
  },
  watch: {
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
    operationShow(newVal,oldVal){
      if (newVal == 'END') {//已完成
          this.operation = 0;
          this.NotDisabled = true;
          this.operationShow = 'charge'
      }else if(newVal == 'CANCEL'){//已废弃
          this.operation = 0;
          this.NotDisabled = true;
          this.operationShow = 'charge'
      }else{//进行中
      
        if( newVal == 'charge'){//工程收款
          this.operation = 0;
        }else if( newVal == 'build'){//安装施工
          this.operation = 1;
        }else if( newVal == 'check'){//工程验收
          this.operation = 2;
        }else if( newVal == 'open'){//开户
          this.operation = 3;
          eventBus.$emit('openInit', 'open');
        }else if( newVal == 'setmt'){//编制结算
          this.operation = 4;
        }else if( newVal == 'refund'){//工程结算
          this.operation = 5;
          // 数据字典
          this.getDictionary();
        }
        //在相同业务节点下
          if (this.formData.processState == newVal) {
            if (this.formData.approveFlag == 1) {
              //审批节点
              this.NotDisabled = true//不可修改
            }else{
              //非审批节点
              this.NotDisabled = false//可修改
            }
            // 不同的业务节点
          }else{
            this.NotDisabled = true//不可修改
          }
      }
    },
  },
  methods: {
    
    submit(index){//步骤条-工程登记-暂存/暂存
      var _this = this
      let data = []
      //安装施工
      if (this.formData.processState == 'build') {
        data = {
            id:  this.formData.id,
            processState:  this.formData.processState,
            sendOrderDate: this.formData.build.sendOrderDate,
            constGroup: this.formData.build.constGroup,
            constBeginDate: this.formData.build.constBeginDate,
            constEndDate: this.formData.build.constEndDate,
            constComments: this.formData.build.constComments,
        }
      //工程验收
      }else if (this.formData.processState == 'check') {
        data = {
            id:  this.formData.id,
            processState:  this.formData.processState,
            checkStaff: this.formData.check.checkStaff,//验收人员
            checkDate: this.formData.check.checkDate,//验收日期
            checkDesc: this.formData.check.checkDesc,//验收说明
        }
      //立户
      }else if(this.formData.processState == 'open'){
        data = {
            id:  this.formData.id,
            processState:  this.formData.processState,
        }
      //编制结算
      }else if(this.formData.processState == 'setmt'){
        data = {
            id:  this.formData.id,
            processState:  this.formData.processState,
            setmtLaborMeterBefore: this.formData.setmt.setmtLaborMeterBefore,//表前人工费结算
            setmtLaborMeterAfter: this.formData.setmt.setmtLaborMeterAfter,//表后人工费结算
            setmtMatrMeterAfter: this.formData.setmt.setmtMatrMeterAfter,//表前材料费结算
            setmtMatrMeterBefore: this.formData.setmt.setmtMatrMeterBefore,//表后材料费结算
            setmtOtherMeter: this.formData.setmt.setmtOtherMeter,//其他结算
            setmtDesignCost: this.formData.setmt.setmtDesignCost,//设计费结算
            costShare: this.formData.setmt.costShare,//总管分担费用

            setmtMoney: this.formData.setmt.setmtMoney,//结算合计
            prepayMoney: this.formData.setmt.prepayMoney,//预缴合计
            backFillMoney: this.formData.setmt.backFillMoney,//退补金额
            setmtStaff: this.formData.setmt.setmtStaff,//编制人员
            setmtDate:this.formData.setmt.setmtDate,//编制日期
            setmtComments: this.formData.setmt.setmtComments,//编制说明
        }
      //工程结算
      }else if(this.formData.processState == 'refund'){
       
        
      }
      var params = {
        "busicode": "PjInstallSave",
        "data":data
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
          this.$notify({
            title: '成功',
            message: '表单保存成功',
            type: 'success'
          });
          _this.startProcess();//启动审批流

      })
    },
    startProcess(){
      let _this = this;
      // 保存后启动审批
      _this.common.startProcess(
        //receiptType单据类型，一般是启用工作流的表的数据库名称
        "PJ_INSTALL",
        //title流程标题,一般是单据类型加单据编号等，容易区分的内容\用于主题
        "审批流配置:" + _this.formData.processName + "(" + _this.formData.billNo + ")",
        //billId单据Id
        _this.formData.id,
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
      _this.common.getProcessShowView("PJ_INSTALL",
        "审批流配置:" + _this.formData.processName + "(" + _this.formData.billNo + ")",
        _this.formData.id, 
        _this.formData.processInstanceId, "workflowDiv", _this, () => {
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
        "data": "PBT"
        //余款退款方式
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.dictionaryData = res
      })
    },
    clearformData(){
      
      this.formData = {
        // 单据信息
          billNo: '',//单据编号
          billDate: '',//单据日期
        // 客户信息
          ctmInfo:{
            ctmNo: "",//客户编号
            ctmType: "1", //客户类型
            ctmName: "",//业主名称
            certType: "1", //业主证件类型
            certNo: "", //业主证件号码
            mobile: "",//业主电话
          },
        // 工程信息
          register:{
            pjType: "1",//工程类型
            urgentFlag: "1",//紧急程度
            installAddr: "",//装表地址
          },
        // 工程收款节点
          charge:{    
            prepayMoney: "",//预缴合计
            depositMoney: "",//押金合计
            budgetMoney: "",//应收合计
            budgetPayStaff: "",//收款人员
            budgetPayDate: this.common.date(),//收款日期
            budgetPayComments: "",//缴款说明
          },
        // 施工安装节点
          build:{    
            sendOrderDate: this.common.date(),//派单日期
            constGroup: "",//施工班组
            constBeginDate: this.common.date(),//开始施工日期
            constEndDate: this.common.date(),//结束施工日期
            constComments: "",//施工说明
          },
        // 工程验收节点
          check:{    
            checkStaff: "",//验收人员
            checkDate:this.common.date(),//验收日期
            checkDesc: "",//验收说明
          },
          //编制结算节点
          setmt:{
            setmtLaborMeterBefore: "",//表前人工费结算
            setmtLaborMeterAfter: "",//表后人工费结算
            setmtMatrMeterAfter: "",//表前材料费结算
            setmtMatrMeterBefore: "",//表后材料费结算
            setmtOtherMeter: "",//其他结算
            setmtDesignCost: "",//设计费结算
            costShare: "",//总管分担费用
            setmtMoney: "",//结算合计
            prepayMoney: "",//预缴合计
            backFillMoney: "",//退补金额
            setmtStaff: "",//编制人员
            setmtDate:this.common.date(),//编制日期
            setmtComments: "",//编制说明
          },
          refund:{

            bankName: "",//开户银行
            bankAccountName: "",//开户名称
            bankAccount: "",//银行账户
            refundWay: "",//余款退款方式
          },
      }
    },
    collapse(){
      if(this.approvalShow == true){
        this.approvalShow = false
        this.util.approvalShow(this.approvalShow, '.process-left', '.stepsCompar','.StepCollapse', '.leftChange')
      }else{
        this.approvalShow = true
        this.util.approvalShow(this.approvalShow, '.process-left', '.stepsCompar','.StepCollapse', '.leftChange')
      }
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
    // 查看用水咨询单
    queryDetail(){
        // 详情按钮事件
        // 根据单据状态判断进入的界面
        // 单据状态 processState ：
        let params = {
          "busicode": "PjConsultQuery",
          "data":  {
            'id':this.formData.consultId,
          }
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          this.queryDetailData = res;
          this.queryDetailShow = true;
        })
    },
    addExecution(){//步骤条-设计-施工材料-添加
      this.$refs.ConstructionMaterials.addExecution();
    },
    saveExecution(){
      this.$refs.ConstructionMaterials.saveExecution();
    },
    //审批流程返回按钮
    operationReturn() {
      eventBus.$emit('operationReturn', false);
    },
    closeDialog(){
    },
    // 多页签的点击
    tabCurrent(val){
      if(val.index == '多水表'){
        if (this.indexAdd=='add') {//点击添加按钮时 不用调用此方法
        }else{
            this.$refs.waterMeter.init();//初始化 多水表页面
        }
      }
      this.$emit('fromChild', val.index)//给父组件传递当前tabs值 0/登记界面 1/多水表界面  
    },
    countNum(){

      let settlementTotal = this.formData.settlementTotal;
      let advancePayment = this.formData.advancePayment;
      if(!settlementTotal){
        settlementTotal = 0;
      }
      if(!advancePayment){
        advancePayment = 0;
      }
      let amountRefund = Number(settlementTotal) - Number(advancePayment)
      amountRefund = amountRefund.toFixed(2)
      this.$set(this.formData,'amountRefund',amountRefund);
    },
    chooseCtm(){
      this.$emit('chooseCtm','chooseCtm')
    },
    chooseAccount(){
      this.chooseAccountVisible = true;
    },
    changeAcount(val){
      if(val==="1"){
        this.chooseAccount();
      }else{
        this.closeDialog();
      }
    },
    stepActive(val,step){
      this.$emit('fromHandleChild', step)
      this.operationShow = step;
      this.operation = val;
    },
    closechoosectm(){
      this.choosectmVisible = false;
      this.chooseAccountVisible = false;
    },
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
    // // 电子签名
    // Signature(){
    //   if(this.eleSignType==="进行签名"){
    //     this.eleSignType = "查看";
    //     this.formData.electronicSignature = "已签名";
    //   }else{
    //     // this.eleSignType="进行签名"
    //     this.signVisible = true;
    //   }
    // },
  },
}
</script>
<style lang="scss">
.waterMeterHandleInfo{
  height: 100%;
}
</style>