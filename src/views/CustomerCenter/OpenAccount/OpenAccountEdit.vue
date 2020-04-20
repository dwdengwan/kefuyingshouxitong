<template>
  <div class="OpenAccountEdit">
    <el-form class="formBill" size="mini" :inline="true" :model="userInfoEditForm" label-width="130px" ref="ruleForm" :rules="rules">

      <commonPart :commonPartForm="commonPartForm" v-if="commonPartFormShow && id"></commonPart>

      <userInfo :commonPart.sync="commonPart" v-if="userInfoFormShow" ref="userInfo"></userInfo>

      <legend class="legendColumn">上传附件</legend>
      <uploadFile></uploadFile>
      <legend class="legendColumn">流程处理</legend>
      <procedure></procedure>
    </el-form>

  </div>
</template>
<script>
import commonPart from "@/views/CustomerCenter/changeMangement/commonPart"//公告模块
import uploadFile from '@/components/uploadPic';//上传附件
import procedure from "@/components/procedure"//流程审核
import userInfo from "@/components/userInfo/ctmInfo.vue"
export default {
  name: "OpenAccountEdit",
  components: {
    uploadFile,
    userInfo,
    procedure,
    commonPart,
  },
  props:['tableEdit','id'],
  data() {
    return {
      userInfoFormShow: false,
      commonPartFormShow: false,
      userInfoEditForm: {},
      rules: {
        userNume: [
          { required: true, message: '请输入用户编号', trigger: 'blur' },
        ],
        desc: [
          { required: true, message: '请输入用户编号', trigger: 'blur' },
        ],
        region: [
          { required: true, message: '请选择城区', trigger: 'blur' },
        ],
        BusinessSite: [
          { required: true, message: '请选择营运站点', trigger: 'blur' },
        ],
        TypesWaterUse: [
          { required: true, message: '请选择用水类型', trigger: 'blur' },
        ],
        WaterPropertie: [
          { required: true, message: '请选择用水性质', trigger: 'blur' },
        ],
        CategorieWaterUse: [
          { required: true, message: '请选择用水类别', trigger: 'blur' },
        ],
        ClassificationUse: [
          { required: true, message: '请选择用途分类', trigger: 'blur' },
        ],
        caliber: [
          { required: true, message: '请选择水表口径', trigger: 'blur' },
        ]
      },
      commonPartForm: {
        parentToChild: '3',
      },
      commonPart: {
        parentToChild: '4',
        isEdit: false,
        ctmEdit:false,
        accEdit:false,
        legendTwo:'',
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let _this = this
      let id = _this.id;
      let data = {}
      let params = {}
      if (!_this.id) {
        _this.commonPartForm.billNo = '';
        _this.commonPartForm.billDate = '';
        _this.commonPart.id = id;
        _this.commonPart.userOpenInfo = {};
        _this.commonPart.userInfo = {};
        _this.commonPart.ctmInfo = {};
        _this.commonPart.accountInfo = {};
        _this.commonPart.isEdit = false;

        _this.commonPart.desc1 = 1;
        _this.commonPartFormShow = true;
        _this.userInfoFormShow = true;
        return
      } else {
        data = {
          id,
        }
        params = {
          busicode: "OpenAccQuery",
          data,
        }
      }
      _this.$api.fetch({
        params,//参数
      }).then(res => {
        // 父页面获取到值
        _this.commonPartForm.billNo = res.userOpenInfo.billNo;
        _this.commonPartForm.billDate = res.userOpenInfo.billDate;
        _this.commonPartForm.processState = res.userOpenInfo.processState;
        _this.commonPartForm.userCtmTempId = res.userOpenInfo.userCtmTempId;
        _this.commonPartForm.userAccountTempId = res.userOpenInfo.userAccountTempId;
        _this.commonPartForm.userInfoTempId = res.userOpenInfo.userInfoTempId;
        if(res.userOpenInfo.processState == null || res.userOpenInfo.processState == ''){
          _this.$store.state.isRemove = true
        }
        _this.commonPart.id = id;
        _this.commonPart.userOpenInfo = res.userOpenInfo;
        _this.commonPart.userInfo = res.userInfo;
        _this.commonPart.ctmInfo = res.ctmInfo;
        _this.commonPart.accountInfo = res.accountInfo;
        _this.commonPart.updateAccountFlag = res.updateAccountFlag;
        _this.commonPart.updateCtmFlag = res.updateCtmFlag;

        if (res.updateCtmFlag == 0) {
          _this.commonPart.ctmEdit = true;
        }else{
          _this.commonPart.ctmEdit = false;
        }

        if (res.updateAccountFlag == 0) {
          _this.commonPart.accEdit = true;
        }else{
          _this.commonPart.accEdit = false;
        }

        _this.commonPart.desc1 = 1;
        _this.commonPartFormShow = true;
        _this.userInfoFormShow = true;
      })
    },
    submit(){
      let data = {};
      if(this.id){
        data.commonPartForm = this.commonPartForm;
      }
      data.userInfo = this.$refs.userInfo.submit()
      return data;
    },
    chooseCtm() {
      this.$emit('chooseCtm', 'chooseCtm')
    },
    chooseAccount() {
      this.$emit('chooseAccount', 'chooseAccount')
    },
  }
}
</script>
<style lang="scss">
.OpenAccountEdit {
  overflow-y: auto;
  height: calc(100% - 41px);
}
</style>
