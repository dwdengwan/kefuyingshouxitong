
<template>
  <div class="DimensionalInspectionEdit">
    <el-form :inline="true" size="mini" :model="formData" class="formBill" label-width="130px">
      <!-- <commonPart :parentToChild="'1'"></commonPart> -->

      <el-tooltip class="item" effect="dark" content="请输入户号/账号/客户编号/手机号/身份证号" placement="top">
        <el-select v-model="fuzzyQuery" placeholder="请选择" class="keyword-input" filterable remote :remote-method="search" @change="getRegInfo">
          <el-option v-for="item in allData" :key="item.userInfo.id" :label="item.userInfo.userNo" :value="item.userInfo.meterNo">
          </el-option>
        </el-select>
      </el-tooltip>

      <legend class="legendColumn">水表信息</legend>
      <el-form-item label="水表编号：">
        <el-input v-model="userData.userInfo.meterNo" disabled placeholder="-" class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="出厂编号：">
        <el-input v-model="userData.msInfo.factoryNo" disabled placeholder="-" class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="水表厂家：">
        <el-input v-model="userData.msInfo.meterFactoryName" disabled placeholder="-" class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="水表型号：">
        <el-input v-model="userData.msInfo.meterModelName" disabled placeholder="-" class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="水表口径：">
        <el-input v-model="userData.msInfo.meterBoreName" disabled placeholder="-" class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="水表形态：">
        <el-input v-model="userData.msInfo.meterFormName" placeholder="-" clearable disabled class="read-only"></el-input>
      </el-form-item>
      <legend class="legendColumn">送修信息</legend>
      <el-form-item label="拆表日期：">
        <el-date-picker v-model="backfillSubmitForm.disassemblyDate" type="date" :disabled="tableEdit" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="送修日期：">
        <el-date-picker v-model="backfillSubmitForm.repairsDate" type="date" :disabled="tableEdit" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="维检类型：">
        <el-select v-model="backfillSubmitForm.fixType" clearable placeholder="" :disabled="tableEdit">
          <el-option v-for="item in backfillSubmitForm.fixTypeoptions" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="备注：" class="f2">
        <el-input type="textarea" v-model="backfillSubmitForm.subordinateDepartments" :disabled="tableEdit" size="mini" :rows="2" clearable placeholder="备注"></el-input>
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
  name: "DimensionalInspectionEdit",
  components: {
    uploadFile,
    procedure,
    commonPart
  },
  props: {
    tableEdit: {
      type: Boolean
    }
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











      backfillSubmitForm: {
        desc: "",
        descoptions: [
          {
            name: "新表",
            value: "1"
          },
          {
            name: "旧表",
            value: "2"
          }
        ],
        con: "",
        watermeterWarehouse: "",
        waterMeterManufacturer: "",
        waterMeterType: "",
        waterMeterCaliber: "",
        waterMeterStatus: "",
        subordinateDepartments: "",
        fixType: "",
        fixTypeoptions: [
          {
            name: "维修",
            value: "1"
          },
          {
            name: "检测",
            value: "2"
          }
        ],
        disassemblyDate: "",
        repairsDate: "",
        userNum: ""
      }
    };
  },
  mounted() {
    
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
  },
};
</script>
<style lang="scss">
// @import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.DimensionalInspectionEdit {
  height: calc(100% - 41px);
  overflow-y: auto;
}
</style>
