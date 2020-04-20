
<template>
  <div class="DimensionalInspectionHandle process">

    <div class="process-left">
      <!-- 登记信息 -->
      <el-form v-if="operationShow == 1" :inline="true" size="mini" :model="backfillSubmitForm" class="formBill " label-width="130px">
        <!-- <commonPart :parentToChild="'1'" :Dimens="'1'"></commonPart> -->
        <el-form-item class="searchContent">
          <el-input v-model="meterNo" placeholder="请输入水表编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class='searchBtn' @click="search" icon="el-icon-search"></el-button>
        </el-form-item>

        <legend class="legendColumn">水表信息</legend>
        <el-form-item label="水表编号：">
          <el-input v-model="formData.meterNo" disabled placeholder="-" class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="出厂编号：">
          <el-input v-model="formData.factoryNo" disabled placeholder="-" class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表厂家：">
          <el-input v-model="formData.meterFactory" disabled placeholder="-" class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表型号：">
          <el-input v-model="formData.meterModel" disabled placeholder="-" class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表口径：">
          <el-input v-model="formData.meterBore" disabled placeholder="-" class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表形态：">
          <el-input v-model="formData.meterForm" placeholder="-" clearable disabled class="read-only"></el-input>
        </el-form-item>

        <legend class="legendColumn">登记信息</legend>
        <el-form-item label="拆表日期：">
          <el-date-picker v-model="formData.removeDate" type="date" value-format="yyyy-MM-dd" :disabled="tableEdit" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="送修日期：">
          <el-date-picker v-model="formData.sendRepairDate" type="date" value-format="yyyy-MM-dd" :disabled="tableEdit" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="维检类型：">
          <el-select clearable v-model="formData.repairType" placeholder="维检类型">
            <el-option v-for="item in dictionaryData.REPAIR_TYPE" :key="item.id" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="备注：" class="f2">
          <el-input type="textarea" v-model="formData.comments" :disabled="tableEdit" size="mini" :rows="2" clearable placeholder="备注"></el-input>
        </el-form-item>

        <legend class="legendColumn">流程处理</legend>
        <procedure></procedure>
      </el-form>
      <!-- 维修信息 -->
      <el-form v-if="operationShow == 2" :inline="true" size="mini" :model="backfillSubmitForm" class="formBill " label-width="130px">
        <!-- <commonPart :parentToChild="'1'" :Dimens="'1'"></commonPart> -->

        <legend class="legendColumn">水表信息</legend>
        <el-form-item label="水表编号：">
          <el-input v-model="formData.meterNo" disabled placeholder="-" class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="出厂编号：">
          <el-input v-model="formData.factoryNo" disabled placeholder="-" class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表厂家：">
          <el-input v-model="formData.meterFactory" disabled placeholder="-" class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表型号：">
          <el-input v-model="formData.meterModel" disabled placeholder="-" class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表口径：">
          <el-input v-model="formData.meterBore" disabled placeholder="-" class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表形态：">
          <el-input v-model="formData.meterForm" placeholder="-" clearable disabled class="read-only"></el-input>
        </el-form-item>
        <legend class="legendColumn">维修信息</legend>
        
        <el-form-item label="维修结果：" class="f2">
          <el-input type="textarea" :rows="2" clearable v-model="formData.repairResult" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="维修日期：">
          <el-date-picker v-model="formData.repairDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="维修说明：" class="f2">
          <el-input type="textarea" :rows="2" clearable v-model="formData.repairComments" placeholder=""></el-input>
        </el-form-item>

        <legend class="legendColumn">流程处理</legend>
        <procedure></procedure>
      </el-form>
      <!-- 检定信息 -->
      <el-form v-if="operationShow == 3" :inline="true" size="mini" :model="backfillSubmitForm" class="formBill " label-width="130px">
        <!-- <commonPart :parentToChild="'1'" :Dimens="'1'"></commonPart> -->

        <legend class="legendColumn">水表信息</legend>
        <el-form-item label="水表编号：">
          <el-input v-model="formData.meterNo" disabled placeholder="-" class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="出厂编号：">
          <el-input v-model="formData.factoryNo" disabled placeholder="-" class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表厂家：">
          <el-input v-model="formData.meterFactory" disabled placeholder="-" class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表型号：">
          <el-input v-model="formData.meterModel" disabled placeholder="-" class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表口径：">
          <el-input v-model="formData.meterBore" disabled placeholder="-" class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表形态：">
          <el-input v-model="formData.meterForm" placeholder="-" clearable disabled class="read-only"></el-input>
        </el-form-item>
        <legend class="legendColumn">检定信息</legend>
        <el-form-item label="检定日期：">
          <el-date-picker v-model="formData.calibrationDate" type="date" value-format="yyyy-MM-dd" :disabled="tableEdit" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="检定结果：">
          <el-select v-model="formData.calibrationResult" placeholder="">
            <el-option v-for="item in dictionaryData.CALI_RESULT" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检定说明：" class="f2">
          <el-input type="textarea" :rows="2" clearable v-model="backfillSubmitForm.verificationDesc" placeholder=""></el-input>
        </el-form-item>

        <legend class="legendColumn">流程处理</legend>
        <procedure></procedure>
      </el-form>

      <!-- 流程结束 -->
      <el-form v-if="operationShow == 4" :inline="true" size="mini" :model="backfillSubmitForm" class="formBill " label-width="130px">

      </el-form>
    </div>

    <div class="StepCollapse" @click="collapse">
      <i class="el-icon-arrow-right leftChange"></i>
    </div>
    <div class="process-right" v-if="approvalShow">

      <div class="stepsTitle">流程信息</div>
      <div class="line"></div>
      <el-steps :active="operation" direction="vertical" v-if="backfillSubmitForm.fixType == '1'" finish-status="success">
        <el-step title="登记信息" @click.native="stepActive(1)"></el-step>
        <el-step title="维修信息" @click.native="stepActive(2)"></el-step>
        <el-step title="检定信息" @click.native="stepActive(3)"></el-step>
        <el-step title="结束" @click.native="stepActive(4)"></el-step>
      </el-steps>

      <el-steps :active="operation" direction="vertical" v-else finish-status="success">
        <el-step title="登记信息" @click.native="stepActive(1)"></el-step>
        <el-step title="检定信息" @click.native="stepActive(3)"></el-step>
        <el-step title="结束" @click.native="stepActive(4)"></el-step>
      </el-steps>
    </div>
  </div>
</template>
<script>
import commonPart from "@/views/CustomerCenter/changeMangement/commonPart"; //公告模块
import uploadFile from "@/components/uploadPic"; //上传附件
import procedure from "@/components/procedure"; //流程审核
export default {
  name: "DimensionalInspectionHandle",
  props: ['DimensionalInspectionHandleNeedData', 'tableEdit'],
  components: {
    uploadFile,
    procedure,
    commonPart
  },
  data() {
    return {
      // 水表编号查询条件
      meterNo: '',
      // 详情接口数据
      formData: {},
      // 数据字典数据
      dictionaryData: {},






      operationShow: 1,
      operation: 1,
      approvalShow: true,
      verificationResultOption: [
        {
          name: "注册",
          value: "1"
        },
        {
          name: "报废",
          value: "2"
        }
      ],
      resultOption: [
        {
          name: "送检",
          value: "1"
        },
        {
          name: "报废",
          value: "2"
        }
      ],
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
      backfillSubmitForm: {
        desc: "",
        con: "",
        watermeterWarehouse: "",
        waterMeterManufacturer: "",
        waterMeterType: "",
        waterMeterCaliber: "",
        waterMeterStatus: "",
        subordinateDepartments: "",
        fixType: "1",
        disassemblyDate: "",
        repairsDate: "",
        userNum: ""
      }
    };
  },
  mounted() {
    console.log(this.DimensionalInspectionHandleNeedData);
    this.init(this.DimensionalInspectionHandleNeedData.meterNo)
    this.getDictionary()
  },
  methods: {
    // 表单初始化
    init(meterNo) {
      var _this = this
      var params = {
        "busicode": "MsRepairList",
        "data": {
          meterNo: meterNo
        }
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.formData = res.list[0]
      })
    },
    // 数据字典（查询框）
    getDictionary() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": "REPAIR_TYPE,CALI_RESULT"// 维检类型,维修结果
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.dictionaryData = res
      })
    },
    // 查询
    search() {
      var _this = this
      this.init(_this.meterNo)
    },















    collapse() {
      if (this.approvalShow == true) {
        this.approvalShow = false;
        this.util.approvalShow(
          this.approvalShow,
          ".process-left",
          ".process-right",
          ".StepCollapse",
          ".leftChange"
        );
      } else {
        this.approvalShow = true;
        this.util.approvalShow(
          this.approvalShow,
          ".process-left",
          ".process-right",
          ".StepCollapse",
          ".leftChange"
        );
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
.DimensionalInspectionHandle {
  height: calc(100% - 41px);
  .formBill {
    height: 100%;
    overflow-y: auto;
    float: left;
    width: 100%;
    .searchContent {
      margin: 10px 10px;
      margin-left: 70px;
      .el-form-item__content {
        width: 100%;
      }
    }
    .searchBtn {
      margin: 10px 0;
    }
  }
}
</style>
