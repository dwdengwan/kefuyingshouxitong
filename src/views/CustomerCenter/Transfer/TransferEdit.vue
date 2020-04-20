

<template>
  <div class="TransferEdit common-editDiv commonPart">
    <el-form class="formBill commonPartFormTwo commonPartForm " size="mini" :inline="true" :model="TransferEditForm" label-width="130px" ref="ruleForm" :rules="rules">

      <!-- <commonPart :commonPartForm="commonPartForm" v-if="commonPartFormShow"></commonPart> -->
      <!-- <el-form-item>
        <el-input class="read-only" v-model="TransferEditForm.userInfo.ctmNo" placeholder="请输入户号"></el-input>
        <el-button size="mini" class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
      </el-form-item> -->
      <el-form-item label="用户编号：" class="search-btn" v-if="searchBtnShow">
        <el-input class="read-only" v-model="userNo" placeholder="请输入户号" clearable></el-input>
        <el-button size="mini" class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
      </el-form-item>

      <el-form-item label="单据编号：">
        <el-input class="read-only"  disabled="disabled"  v-model="TransferEditForm.billNo" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="单据日期：">
        <el-input class="read-only" disabled="disabled" v-model="TransferEditForm.billDate" placeholder=""></el-input>
        <!-- <el-date-picker v-model="TransferEditForm.billDate" type="date" value-format='yyyy-MM-dd' placeholder="">
        </el-date-picker> -->
      </el-form-item>
      <el-form-item label="过户日期：" prop="transferDate">
        <el-date-picker v-model="TransferEditForm.transferDate" type="date" value-format='yyyy-MM-dd' placeholder="">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="过户原因：" prop="transferComments">
        <el-input type="textarea" v-model="TransferEditForm.transferComments" placeholder=""></el-input>
      </el-form-item>
      <userInfo :commonPart.sync="commonPart" v-if="userInfoFormShow" ref="userInfo"></userInfo>

      <legend class="legendColumn">变更事项</legend>
      <changeMatters :changeMattersData="changeMattersData" v-if="changeMattersShow"></changeMatters>

      <legend class="legendColumn">上传附件</legend>
      <uploadFile></uploadFile>

      <legend class="legendColumn">流程处理</legend>
      <procedure></procedure>

    </el-form>

  </div>
</template>
<script>
import commonPart from "@/views/CustomerCenter/changeMangement/commonPart"//公告模块
import uploadFile from '@/components/uploadPic';
import procedure from "@/components/procedure"
import changeMatters from "@/components/changeMatters"
import userInfo from "@/components/userInfo/ctmInfo.vue"

export default {
  name: "TransferEdit",
  components: {
    uploadFile,
    procedure,
    commonPart,
    changeMatters,
    userInfo,
  },
  props: ['formData'],
  data() {
    return {
      searchBtnShow:true,
      userNo:'',//用户编号
      readyonlyShow: true,
      ArrearsDetails: {},
      userInfoFormShow: false,
      commonPartFormShow: false,
      changeMattersShow: false,
      changeMattersData: {},
      commonPartForm: {
        parentToChild: '2',
      },
      commonPart: {
        parentToChild: '4',
        legendTwo: '2',
      },
      TransferEditForm: {
        billNo:'',
        billDate:'',
        transferDate:'',
        transferComments:'',

        // userInfo: {},
        // accountInfo: {},
        // ctmInfo: {},
        // userTransferInfo: {},
      },
      rules: {
        transferDate: [
          { required: true, message: '请输入过户日期', trigger: 'blur' },
        ],
        transferComments: [
          { required: true, message: '请输入过户原因', trigger: 'blur' },
        ]
      },
      histroyData: {}

    }
  },
  mounted() {
    console.log(this.formData.id);
    if (this.formData.id !== '') {
      this.searchBtnShow = false;
      this.init();
    } else if (this.formData.id == '') {
      this.commonPart.userInfo = {};
      this.commonPart.accountInfo = {};
      this.commonPart.ctmInfo = {};
      this.commonPart.userTransferInfo = {};
      this.commonPart.msInfo = {};
      // this.TransferEditForm.billNo = '1126';
      // this.TransferEditForm.billDate = '2020-11-26';
      this.commonPart.id = '';
      this.commonPart.isEdit = false;
      this.userInfoFormShow = true;
      this.changeMattersShow = true;
    }
  },
  methods: {
    init() {
      let _this = this;
      let data = {
        id: _this.formData.id,
      };
      let params = {
        "busicode": "TransferUserQuery",
        data,
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.TransferEditForm = res.userTransferInfo;
        _this.commonPart.userInfo = res.userInfo;
        _this.commonPart.accountInfo = res.accountInfo;
        _this.commonPart.ctmInfo = res.ctmInfo;
        _this.commonPart.userTransferInfo = res.userTransferInfo;
        _this.commonPart.msInfo = res.msInfo;
        _this.userInfoFormShow = true;
        _this.changeMattersShow = true;
      }).catch(res=>{
        _this.userInfoFormShow = true;
        _this.changeMattersShow = true;
      })
    },
    initUserNo(){//用户编号查询
      let _this = this;
      if(_this.userNo == ''){
        _this.$message({
          message: '用户编号不能为空。',
          type: 'warning'
        });
        return
      }
      _this.userInfoFormShow = false;
      let data = {
        userNo: _this.userNo,
      };
      let params = {
        "busicode": "UserSelect",
        data,
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.commonPart.userInfo = res.userInfo;
        _this.commonPart.accountInfo = {};
        _this.commonPart.ctmInfo = {};
        _this.commonPart.msInfo = res.msInfo;
        // _this.commonPart.userTransferInfo = res.userTransferInfo;
        console.log(_this.commonPart.ctmInfo.ctmNo);
        if(_this.commonPart.ctmInfo.ctmNo !== '' && _this.commonPart.ctmInfo.ctmNo !== null && _this.commonPart.ctmInfo.ctmNo !== undefined){
          _this.commonPart.isEdit = true;
        }else{
          _this.commonPart.isEdit = false;
        }
        console.log(_this.commonPart.isEdit);
        _this.userInfoFormShow = true;
      }).catch(res=>{
        _this.commonPart.userInfo = {};
        _this.commonPart.accountInfo = {};
        _this.commonPart.ctmInfo = {};
        _this.commonPart.msInfo = {};
        _this.commonPart.isEdit = false;
        _this.userInfoFormShow = true;
      })
    },
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let data = this.$refs.userInfo.submit();
          data.TransferEditForm = this.TransferEditForm;
          console.log(data)
          return data
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    demand() {
      this.initUserNo()
    }
  }
}
</script>
<style lang="scss" scoped>
.search-btn{
  .el-form-item__content{
    .el-input {
      width: 70% !important;
    }
  }
}
</style>



