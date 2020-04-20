<template>
  <div class="ComparisonTableEdit">

    <el-form :inline="true" size="mini" ref="ruleForm" :rules="rules" :model="saveData" class="formBill" label-width="130px">

      <!-- <el-tooltip class="item" effect="dark" content="请输入户号/账号/客户编号/手机号/身份证号" placement="top">
        <el-input class="keyword-input" v-model="tableQuery.fuzzyQuery" @keyup.enter.native="search" placeholder=""></el-input>
      </el-tooltip>
      <div class="keyword-bottom">
        <el-button size="mini" class='searchBtn' @click="search" icon="el-icon-search"></el-button>
      </div> -->
      <el-tooltip class="item" effect="dark" content="请输入户号/账号/客户编号/手机号/身份证号" placement="top">
        <el-select v-model="fuzzyQuery" placeholder="请选择" class="keyword-input" filterable remote :remote-method="search" @change="getRegInfo">
          <el-option v-for="item in allData" :key="item.userInfo.id" :label="item.userInfo.userNo" :value="item.userInfo.meterNo">
          </el-option>
        </el-select>
      </el-tooltip>

      <legend class="legendColumn">用户信息</legend>
      <el-form-item label="客户编号：">
        <el-input class="read-only" disabled v-model="userData.ctmInfo.ctmNo" placeholder="-"></el-input>
      </el-form-item>
      <el-form-item label="客户名称：">
        <el-input class="read-only" disabled v-model="userData.ctmInfo.ctmName" placeholder="-"></el-input>
      </el-form-item>
      <el-form-item label="客户地址：">
        <el-input class="read-only" disabled v-model="userData.ctmInfo.ctmAddr" placeholder="-"></el-input>
      </el-form-item>
      <el-form-item label="用户编号：">
        <el-input class="read-only" disabled v-model="userData.userInfo.userNo" placeholder="-"></el-input>
      </el-form-item>
      <el-form-item label="证件号码：">
        <el-input class="read-only" disabled v-model="userData.ctmInfo.certNo" placeholder="-"></el-input>
      </el-form-item>
      <legend class="legendColumn">登记信息</legend>

      <el-form-item label="水表编号：">
        <el-input v-model="userData.userInfo.meterNo" placeholder="-" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="装表地址：">
        <el-input v-model="userData.userInfo.setupMeterAddr" placeholder="-" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="水表形态：">
        <el-input v-model="userData.msInfo.meterFormName" placeholder="-" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="水表厂家：">
        <el-input v-model="userData.msInfo.meterFactoryName" placeholder="-" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="水表型号：">
        <el-input v-model="userData.msInfo.meterModelName" placeholder="-" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="水表口径：">
        <el-input v-model="userData.msInfo.meterBoreName" placeholder="-" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="装表日期：">
        <el-input v-model="userData.userInfo.setupMeterDate" placeholder="-" disabled class="read-only"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="支付押金：" prop="deposit">
        <el-input v-model="saveData.deposit" placeholder="请输入" type="number"></el-input>
      </el-form-item>
      <el-form-item label="备注：" class="f2" prop="comments">
        <el-input type="textarea" v-model="saveData.comments" size="mini" :rows="2" clearable placeholder="请输入"></el-input>
      </el-form-item>
      <legend class="legendColumn">流程处理</legend>
      <procedure></procedure>
    </el-form>

  </div>
</template>
<script>
import commonPart from "@/views/CustomerCenter/changeMangement/commonPart"; //公告模块
import uploadFile from "@/components/uploadPic"; //上传附件
import procedure from "@/components/procedure"; //流程审核
export default {
  name: "ComparisonTableEdit",
  components: {
    uploadFile,
    procedure,
    commonPart
  },
  data() {
    return {
      // 模糊查询
      fuzzyQuery: '',
      // 模糊查询所有数据
      allData: {},
      // 用户信息数据
      userData: {
        ctmInfo: {},
        msInfo: {},
        userInfo: {},
      },
      // 暂存按钮入参
      saveData: {},
      // 表单校验
      rules: {
        deposit: [
          { required: true, message: '请输入支付押金', trigger: 'blur' },
        ],
        comments: [
          { required: true, message: '请输入备注', trigger: 'blur' },
        ],
      },





      resultShow: true,
      operationShow: 1,
      operation: 0,
      descoptions: [
        {
          name: "正常",
          value: "1"
        },
        {
          name: "异常",
          value: "2"
        }
      ],
    };
  },
  methods: {
    // 用户信息数据
    search(fuzzyQuery) {
      if(fuzzyQuery == ''){
        return
      }
      var _this = this
      var params = {
        "busicode": "UserInfoFuzzyQuery",
        "data": {
          fuzzyQuery: fuzzyQuery
        }
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.allData = res
      })
    },
    // 登记信息数据
    getRegInfo(meterNo) {
      let _this = this
      // 获取选中用户（模糊查询下拉框）的用户信息
      console.log(_this.allData);
      for (let i = 0; i < _this.allData.length; i++) {
        if (_this.allData[i].userInfo.meterNo == meterNo) {
          _this.userData = _this.allData[i]
        }
      }
      console.log(_this.userData);
    },
    // 暂存按钮（添加）
    save() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          var _this = this
          var params = {
            "busicode": "MsVeriAdd",
            "data": {
              userNo: _this.formData.userNo,
              meterNo: _this.formData.meterNo,
              installDate: _this.formData.installDate,
              deposit: _this.saveData.deposit,
              comments: _this.saveData.comments,
            }
          }
          this.$api.fetch({
            params: params,//参数
          }).then(res => {
            _this.$notify({
              title: '成功',
              message: '添加成功！',
              type: 'success'
            });
            _this.$parent.closeDialog()
          })
        } else {

          return false;
        }
      });





    },




    reaultChange(val) {
      if (val == 2) {
        this.resultShow = false;
      } else {
        this.resultShow = true;
      }
    },
    stepActive(val) {
      this.operationShow = val;
      this.operation = val - 1;
    }
  }
};
</script>
<style lang="scss">
// @import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.ComparisonTableEdit {
  height: calc(100% - 41px);
  overflow-y: auto;
}
</style>
