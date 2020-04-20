<template>
  <div class="insideEngineeringRegistration">
    <!-- <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right">
        <el-button size="mini" type="primary"  @click="submitForm('insideEngineeringForm')">暂存</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="operationReturn()" >返回</el-button>
      </div>
    </div> -->
    <div class="engineer-content">
      <el-form :model="ruleForm" class="formBill" size="mini" :inline="true"  ref="insideEngineeringForm" :show-message="false" :rules="rules" label-width="130px">
        <commonPart :parentToChild="'3'"></commonPart>

        <legend class="legendColumn">工程信息</legend>
            <el-form-item label="工程类型：" prop="engineerType">
              <el-select v-model="ruleForm.engineerType" clearable size="mini" style="width:100%">
                <el-option v-for="item in engineerTypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="紧急程度：" prop="Emergency">
              <el-select v-model="ruleForm.Emergency" clearable size="mini" style="width:100%">
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
            <!-- <br> -->
            <el-form-item label="申请原因：" class="Remarks" prop="applicationReasons">
              <el-input type="textarea" v-model="ruleForm.applicationReasons" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item label="派单说明：" class="Remarks" prop="paymentNote">
              <el-input type="textarea" v-model="ruleForm.paymentNote" style="width:100%"></el-input>
            </el-form-item>
            
        <!-- <legend class="legendColumn">上传附件</legend>
          <uploadFile ></uploadFile> -->
        <legend class="legendColumn">流程处理</legend>
          <procedure ></procedure>
      
      </el-form>
      <!-- 水表明细 -->
      <el-dialog :close-on-click-modal="false" title="水表明细" :visible.sync="editContent">
        <el-form :model="dialogForm" ref="form" label-width="100px">
            <el-form-item label="用户编号：" prop="userNum">
              <el-input v-model="dialogForm.userNum" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="用户名称：" prop="userName">
              <el-input v-model="dialogForm.userName" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="用户地址：" prop="userAddress">
              <el-input v-model="dialogForm.userAddress" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="装表地址：" prop="meterAddress">
              <el-input v-model="dialogForm.meterAddress" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="街区：" prop="block">
              <el-input v-model="dialogForm.block" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="小区：" prop="village">
              <el-input v-model="dialogForm.village" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="册本号：" prop="bookNum">
              <el-input v-model="dialogForm.bookNum" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="Contacts">
              <el-input v-model="dialogForm.Contacts" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="座机号码：" prop="contactNumber">
              <el-input v-model="dialogForm.contactNumber" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号码：" prop="phoneNumber">
              <el-input v-model="dialogForm.phoneNumber" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="证件类型：" prop="documentType">
              <el-select v-model="dialogForm.documentType" clearable size="mini" style="width:100%">
                <el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件号码：" prop="documentNum">
              <el-input v-model="dialogForm.documentNum" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="装表日期：" prop="meterDate">
              <el-input v-model="dialogForm.documentNum" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="装表员：" prop="meterStaff">
              <el-input v-model="dialogForm.meterStaff" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="水表编号：" prop="meterNum">
              <el-input v-model="dialogForm.meterNum" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="水表口径：" prop="meterCaliber">
              <el-input v-model="dialogForm.meterCaliber" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="用水类型：" prop="waterType">
              <el-input v-model="dialogForm.waterType" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="供水合同：" prop="waterContract">
              <el-input v-model="dialogForm.waterType" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="是否加压：" prop="compression">
              <el-select v-model="dialogForm.compression" clearable size="mini" style="width:100%">
                <el-option key="0" label="是" value="0"></el-option>
                <el-option key="1" label="否" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="押金：" prop="deposit">
              <el-input v-model="dialogForm.deposit" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="deposit">
              <el-input type="textarea" v-model="ruleForm.deposit" style="width:100%"></el-input>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <!-- 1px solid #ebeef5  -->
          <div class="sub" style="text-align:center;">
            <el-button type="primary" style="margin-right:10px;" size="mini">保存</el-button>
            <el-button @click="back" size="mini">返回</el-button>
            <!-- <div style="text-align:center;"><span style="color:#FF0000;">上传附件，请先保存</span></div> -->
          </div>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import commonPart from "@/views/CustomerCenter/changeMangement/commonPart"//公告模块
import uploadFile from '@/components/uploadPic';//上传附件
import procedure from "@/components/procedure"//流程审核
export default {
  name: "insideEngineeringRegistration",
  components: {
    commonPart,
    uploadFile,
    procedure,
  },
  data() {
    return {
      crumbsData: { //面包屑
        titleList: [
          { title: '工程管理' },
          { title: '内部工程' },
          // { title: '处理中', method: () => { window.histroy.back() } },
          // { title: '添加', method: () => { window.histroy.back() } }
        ],
      },
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
        engineerType: 1,
        applicantDate: '',
        Contacts: '',
        documentType: '',
        documentNumber: '',
        contactNumber: '',
        Emergency: '0',
        businessArea: 1,
        residentialType: '0',
        userType: 1,
        waterUse: '0',
      },
      dialogForm: {},
      options6: [
        {
          value: 1,
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
    }
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    // this.common.changeTable(this, '.userInfo .kl-table', ['.userInfo .toolbar', '.userInfo .block', '.userInfo bread-contain'])

    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, '.engineer-center .engineer-center-right', ['.engineer-center .table-top'])
    })
  },
  methods: {
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
    back() {
      this.editContent = false;
    },
    submitForm(formName) {
    },
    isNull(prop,name){
      if(this.ruleForm[prop]===""){
        this.$message.error('请输入'+name);
      }
    },
    closeDialog(val){
      this.crumbsData.titleList.splice(3,1);
      // this.editContent = false;
      if(val==='add'){
        this.$parent.closeDialog();
      }
    },
    //返回按钮
    operationReturn() {
      eventBus.$emit('insideRegistrationReturn', false);
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
@import "../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.insideEngineeringRegistration {
  height: 100%;
  .engineer-content{
    overflow-y: auto;
    height: 100%;
  }


}
</style>
