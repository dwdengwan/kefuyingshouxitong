<template>
  <div class="insideHandleInfo">
     
    
    <div  class='process'>

      <!-- 登记信息 -->
      <div class="process-left" v-if="operationShow == 1">
        <el-form :model="ruleForm" ref="form" :show-message="false" :rules="rules" class="formBill" :inline="true" size="mini" label-width="130px">
          
          <commonPart :parentToChild="'3'"></commonPart>

          <legend  class="legendColumn">工程信息</legend>
              <el-form-item label="工程类型：" prop="engineerType">
                <el-select v-model="ruleForm.engineerType" clearable size="mini">
                  <el-option v-for="item in engineerTypeList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="紧急程度：" prop="Emergency">
                <el-select v-model="ruleForm.Emergency" clearable size="mini">
                  <el-option label="一般" value="0"></el-option>
                  <el-option label="紧急" value="1"></el-option>
                  <!-- <el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value">
                    </el-option> -->
                </el-select>
              </el-form-item>
              
              <el-form-item label="用水地址：" prop="waterAddress">
                <el-input v-model="ruleForm.waterAddress" size="mini" clearable></el-input>
              </el-form-item>
              
              <el-form-item label="联系人：" prop="Contacts">
                <el-input v-model="ruleForm.Contacts" size="mini" clearable></el-input>
              </el-form-item>
              
              <el-form-item label="座机号码：" prop="contactNumber">
                <el-input v-model="ruleForm.contactNumber" size="mini" clearable></el-input>
              </el-form-item>
              
              <el-form-item label="申请原因：" class="Remarks" prop="applicationReasons">
                <el-input type="textarea" v-model="ruleForm.applicationReasons"></el-input>
              </el-form-item>
              
              <el-form-item label="派单说明：" class="Remarks" prop="paymentNote">
                <el-input type="textarea" v-model="ruleForm.paymentNote"></el-input>
              </el-form-item>
              
          <legend  class="legendColumn">上传附件 
            <i :class="uploadIcon" @click="showMore('uploadFileShow','uploadIcon')"></i>
          </legend>
              <uploadFile ></uploadFile>

          <legend  class="legendColumn">流程处理 
            <i :class="procedureIcon" @click="showMore('procedureShow','procedureIcon')"></i>
          </legend>
              <procedure ></procedure>
        </el-form>

        <el-dialog class="waterdialog" :close-on-click-modal="false" title="水表明细" :visible.sync="editContent">
          <el-form :model="dialogForm" ref="form" label-width="120px">
            <div class="my-input">
              <el-form-item label="用户编号：" prop="userNum">
                <el-input v-model="dialogForm.userNum" size="mini" clearable></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="用户名称：" prop="userName">
                <el-input v-model="dialogForm.userName" size="mini" clearable></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="用户地址：" prop="userAddress">
                <el-input v-model="dialogForm.userAddress" size="mini" clearable></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="装表地址：" prop="meterAddress">
                <el-input v-model="dialogForm.meterAddress" size="mini" clearable></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="街区：" prop="block">
                <el-input v-model="dialogForm.block" size="mini" clearable></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="小区：" prop="village">
                <el-input v-model="dialogForm.village" size="mini" clearable></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="册本号：" prop="bookNum">
                <el-input v-model="dialogForm.bookNum" size="mini" clearable></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="联系人：" prop="Contacts">
                <el-input v-model="dialogForm.Contacts" size="mini" clearable></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="座机号码：" prop="contactNumber">
                <el-input v-model="dialogForm.contactNumber" size="mini" clearable></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="手机号码：" prop="phoneNumber">
                <el-input v-model="dialogForm.phoneNumber" size="mini" clearable></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="证件类型：" prop="documentType">
                <el-select v-model="dialogForm.documentType" clearable size="mini"  >
                  <el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="证件号码：" prop="documentNum">
                <el-input v-model="dialogForm.documentNum" size="mini" clearable></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="装表日期：" prop="meterDate">
                <el-input v-model="dialogForm.documentNum" size="mini" clearable></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="装表员：" prop="meterStaff">
                <el-input v-model="dialogForm.meterStaff" size="mini" clearable></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="水表编号：" prop="meterNum">
                <el-input v-model="dialogForm.meterNum" size="mini" clearable></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="水表口径：" prop="meterCaliber">
                <el-input v-model="dialogForm.meterCaliber" size="mini" clearable></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="用水类型：" prop="waterType">
                <el-input v-model="dialogForm.waterType" size="mini" clearable></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="供水合同：" prop="waterContract">
                <el-input v-model="dialogForm.waterType" size="mini" clearable></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="是否加压：" prop="compression">
                <el-select v-model="dialogForm.compression" clearable size="mini"  >
                  <el-option key="0" label="是" value="0"></el-option>
                  <el-option key="1" label="否" value="1"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="押金：" prop="deposit">
                <el-input v-model="dialogForm.deposit" size="mini" clearable></el-input>
              </el-form-item>
            </div>
            <div class="my-input gocenter1">
              <el-form-item label="备注：" prop="remarks">
                <el-input type="textarea" v-model="dialogForm.remarks"  ></el-input>
              </el-form-item>
            </div>

          </el-form>
          <span slot="footer" class="dialog-footer">
            <div class="sub" style="text-align:center;">
              <el-button type="primary" style="margin-right:10px;" size="mini">保存</el-button>
              <el-button @click="editContent = false" size="mini">返回</el-button>
            </div>
          </span>
        </el-dialog>
      </div>

      <!-- 勘察设计 -->
      <div class="process-left" v-if="operationShow == 2">
        <el-form :model="ruleForm1" ref="form" :rules="rules" class="formBill" :inline="true" size="mini" label-width="130px">
          
          <commonPart :parentToChild="'3'"></commonPart>
          <legend  class="legendColumn">勘察设计信息</legend>
            <el-form-item  class="Remarks" style=" margin-left: 70px;">
              <el-checkbox v-model="ruleForm1.checked">需要办破路手续</el-checkbox>
              <el-checkbox v-model="ruleForm1.checked2">超标高</el-checkbox>
            </el-form-item>
            <br>

            <el-form-item label="勘察人员：" prop="surveyors">
              <el-input v-model="ruleForm1.surveyors" size="mini" clearable></el-input>
            </el-form-item>
            
            <el-form-item label="勘察日期：" prop="investigationDate">
              <el-date-picker v-model="ruleForm1.investigationDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            
            <el-form-item label="勘察结论："  class="Remarks" prop="investigationConclusion">
              <el-input type="textarea" v-model="ruleForm1.investigationConclusion"  ></el-input>
            </el-form-item>
            
            <el-form-item label="设计人员：" prop="designer">
              <el-input v-model="ruleForm1.designer" size="mini" clearable></el-input>
            </el-form-item>
            
            <el-form-item label="设计日期：" prop="designDate">
              <el-date-picker v-model="ruleForm1.designDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            
            <el-form-item label="设计说明： "  class="Remarks" prop="designInstructions">
              <el-input type="textarea" v-model="ruleForm1.designInstructions"  ></el-input>
            </el-form-item>
            
            <legend class="legendColumn">流程处理</legend>
            <procedure></procedure>
        </el-form>
      </div>

      <!-- 工程预算 -->
      <div class="process-left" v-if="operationShow == 3">
        <el-form :model="ruleForm2" ref="form" :rules="rules" class="formBill" :inline="true" size="mini" label-width="130px">
          
          <commonPart :parentToChild="'3'"></commonPart>
          <legend  class="legendColumn">工程预算信息</legend>
            <el-form-item label="预算合计：" prop="total">
              <el-input v-model="ruleForm2.total" size="mini" clearable></el-input>
            </el-form-item>

            <el-form-item label="编制人员：" prop="staffingStaff">
              <el-input v-model="ruleForm2.staffingStaff" size="mini" clearable></el-input>
            </el-form-item>
            
            <el-form-item label="编制日期：" prop="compileDate">
              <el-date-picker v-model="ruleForm2.compileDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            
            <el-form-item label="编制说明：" class="Remarks" prop="compilationNotes">
              <el-input type="textarea" v-model="ruleForm2.compilationNotes"  ></el-input>
            </el-form-item>
            
            <legend class="legendColumn">流程处理</legend>
            <procedure></procedure>
        </el-form>
      </div>
      <!-- 安装施工 -->
      <div class="process-left" v-if="operationShow == 4">
        <el-form :model="ruleForm3" ref="form" :rules="rules"  class="formBill" :inline="true" size="mini" label-width="130px">
          <commonPart :parentToChild="'3'"></commonPart>
          <legend  class="legendColumn">安装施工信息</legend>
            <el-form-item label="派单日期：" prop="paymentDate">
              <el-date-picker v-model="ruleForm3.paymentDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>

            <el-form-item label="施工班组：" prop="constructionTeam">
              <el-input v-model="ruleForm3.constructionTeam" size="mini" clearable></el-input>
            </el-form-item>
            
            <el-form-item label="开始施工日期：" prop="beginConstructionDate">
              <el-date-picker v-model="ruleForm3.beginConstructionDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            
            <el-form-item label="结束施工日期：" prop="endConstructionDate">
              <el-date-picker v-model="ruleForm3.endConstructionDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            
            <el-form-item label="施工说明：" class="Remarks" prop="constructionInstructions">
              <el-input type="textarea" v-model="ruleForm3.constructionInstructions"  ></el-input>
            </el-form-item>
            
            <legend class="legendColumn">流程处理</legend>
            <procedure></procedure>
        </el-form>
      </div>
      
      <!-- 工程验收 -->
      <div class="process-left" v-if="operationShow == 5">
        <el-form :model="ruleForm4" ref="form" :rules="rules" class="formBill" :inline="true" size="mini" label-width="130px">
          <commonPart :parentToChild="'3'"></commonPart>
          <legend  class="legendColumn">安装施工信息</legend>
            <el-form-item label="验收人员：" prop="acceptancePersonnel">
              <el-input v-model="ruleForm4.acceptancePersonnel" size="mini" clearable></el-input>
            </el-form-item>
            
            <el-form-item label="验收日期：" prop="acceptanceDate">
              <el-date-picker v-model="ruleForm4.acceptanceDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            
            <el-form-item label="验收说明：" class="Remarks" prop="acceptanceNote">
              <el-input type="textarea" v-model="ruleForm4.acceptanceNote"  ></el-input>
            </el-form-item>
            
          <legend class="legendColumn">流程处理</legend>
            <procedure></procedure>
        </el-form>
      </div>

      <!-- 工程结算 -->
      <div class="process-left" v-if="operationShow == 6">
        <el-form :model="ruleForm6" ref="form" :rules="rules" class="formBill" :inline="true" size="mini" label-width="130px">
          <commonPart :parentToChild="'3'"></commonPart>
          <legend  class="legendColumn">安装施工信息</legend>
            <el-form-item label="结算合计：" prop="settlementTotal">
              <el-input v-model="ruleForm6.settlementTotal" size="mini" clearable></el-input>
            </el-form-item>

            <el-form-item label="编制人员：" prop="staffingStaff">
              <el-input v-model="ruleForm6.staffingStaff" size="mini" clearable></el-input>
            </el-form-item>
            
            <el-form-item label="编制日期：" prop="compileDate">
              <el-date-picker v-model="ruleForm1.compileDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            
            <el-form-item label="编制说明：" class="Remarks" prop="compilationNotes">
              <el-input type="textarea" v-model="ruleForm6.compilationNotes"  ></el-input>
            </el-form-item>
            
          <legend class="legendColumn">流程处理</legend>
            <procedure></procedure>
        </el-form>
      </div>

      <!-- 结束 -->
      <div class="process-left" v-if="operationShow == 7">
        <el-form :model="ruleForm6" ref="form" :rules="rules" class="formBill" :inline="true" size="mini" label-width="130px">
          
        </el-form>
      </div>

      <div class="StepCollapse" @click="collapse">
        <i class="el-icon-arrow-right leftChange"></i>
      </div>
      <div class="stepsCompar" v-if="approvalShow">
        
        <div class="stepsTitle">流程信息</div>
        <!-- <div class="stepsBottom"> 
          <el-button type="primary" size="mini" class="el-icon-arrow-up"></el-button>
        </div> -->
        <div class="line"></div>
        <el-steps :active="operation" direction="vertical"  finish-status="success">
          <el-step title="登记信息" @click.native="stepActive(1)"></el-step>
          <el-step title="勘察设计" @click.native="stepActive(2)"></el-step>
          <el-step title="工程预算" @click.native="stepActive(3)"></el-step>
          <el-step title="安装施工" @click.native="stepActive(4)"></el-step>
          <el-step title="工程验收" @click.native="stepActive(5)"></el-step>
          <el-step title="工程结算" @click.native="stepActive(6)"></el-step>
          <el-step title="结束" @click.native="stepActive(7)"></el-step>
        </el-steps>
      </div>
    </div>


  </div>
</template>
<script>
import steps from "@/components/Steps"
import uploadFile from '@/components/uploadPic';
import procedure from "@/components/procedure"
import commonPart from "@/views/CustomerCenter/changeMangement/commonPart"//公告模块
export default {
  components: {
    steps,
    uploadFile,
    procedure,
    commonPart,
  },
  data() {
    return {
      crumbsData: { //面包屑
        titleList: [
          { title: '工程管理' },
          { title: '内部工程' },
          // { title: '处理中', method: () => { window.histroy.back() } },
          // { title: '办理', method: () => { window.histroy.back() } }
        ],
      },
      activeName: 'first',
      active: 3,
      operationShow: 2,
      operation:0,
      rules: {
        Applicant: [
          { required: true, message: '请输入申请人', trigger: 'blur' }
        ],
        applicantDate: [
          { required: true, message: '请输入申请日期', trigger: 'blur' }
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
      ruleForm: {
        Applicant: '',
        applicantDate:'',
        engineerType: 1,
        Contacts:'',
        contactNumber:'',
        Emergency: '0',
        applicationReasons:'',
        paymentNote:'',
        waterAddress:'',
      },
      ruleForm1: {
        projectName:'',
        checked:false,
        checked2:false,
        surveyors:'',
        investigationDate:'',
        investigationConclusion:'',
        designer:'',
        designDate:'',
        designInstructions:'',
      },
      ruleForm2: {
        total:'',
        staffingStaff:'',
        compileDate:'',
        compilationNotes:'',
      },
      ruleForm3: {
        paymentDate:'',
        constructionTeam:'',
        beginConstructionDate:'',
        endConstructionDate:'',
        constructionInstructions:'',
      },
      ruleForm4: {
        acceptancePersonnel:'',
        acceptanceDate:'',
        acceptanceNote:'',
      },
      ruleForm6: {
        settlementTotal:'',
        staffingStaff:'',
        compileDate:'',
        compilationNotes:'',
      },
      dialogForm: {},
      options6: [
        {
          value: 12,
          label: '用水报装'
        },
      ],
      engineerTypeList: [
        {
          value: 1,
          label: '小管道工程'
        },
        {
          value: 2,
          label: '大管道工程'
        },
        {
          value: 3,
          label: '维修'
        },
        {
          value: 4,
          label: '其他工程'
        },
      ],
      histroyData: {},
      maxHeight: 0,
      tableShow: false,
      editContent: false,
      approvalShow: true,
    }
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
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
  },
  methods: {
    
    collapse(){
      if(this.approvalShow == true){
        this.approvalShow = false
        this.util.approvalShow(this.approvalShow, '.insideEnging .process-left', '.insideEnging .stepsCompar','.insideEnging .StepCollapse', '.insideEnging .leftChange')
      }else{
        
        this.approvalShow = true
        this.util.approvalShow(this.approvalShow, '.insideEnging .process-left', '.insideEnging .stepsCompar','.insideEnging .StepCollapse', '.insideEnging .leftChange')
      }
    },
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
          }
        ],
        list1: [
          {
            time: '2019-06-21 16:27:35',
            node: '工程登记',
            operator: '张三',
            operation: '通过',
            disposal: '尽快完成',
            enclosure: '无',
          },
          {},
          {},
          {}
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
        total: 5,
      }
    },
    submitEdit(num){
      if(num == 0){
        
      }else if(num == 1){
        
      }else if(num == 2){
        
      }else if(num == 3){
        
      }else if(num == 4){
        
      }else if(num == 5){
        
      }
    },
    operationReturn() {
      eventBus.$emit('insideOperationReturn', false);
    },
    stepActive(val){
      this.$emit('fromHandleChild', val)
      this.operationShow = val;
      this.operation = val-1;
     
    },
  },
}
</script>
<style lang="scss">
.insideHandleInfo {
  height: 100%;
}
</style>