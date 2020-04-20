<template>
  <div class="OtherChargesEdit">

    <el-form class="formBill" size="mini" :inline="true" :model="userInforForm" label-width="130px" ref="ruleForm" :rules="rules">
      <commonPart :parentToChild="'3'" :Dimens="'2'"></commonPart>

      <legend class="legendColumn">用户信息</legend>
        <el-form-item label="单据编号：" prop="year">
          <el-input v-model="userInforForm.year" disabled class="read-only" placeholder="003E"></el-input>
        </el-form-item>
        <el-form-item label="单据日期：" prop="userNume">
          <el-input v-model="userInforForm.userNume" disabled class="read-only" placeholder="09024334"></el-input>
        </el-form-item>
        <el-form-item label="用户编号：" prop="isfines">
          <el-input v-model="userInforForm.isfines" disabled class="read-only" placeholder="有限公司"></el-input>
        </el-form-item>
        <el-form-item label="用户名称：" prop="isfines">
          <el-input v-model="userInforForm.isfines" disabled class="read-only" placeholder="有限公司"></el-input>
        </el-form-item>
        <el-form-item label="装表地址：" prop="isfines">
          <el-input v-model="userInforForm.isfines" disabled class="read-only" placeholder="有限公司"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="isfines">
          <el-input v-model="userInforForm.isfines" disabled class="read-only" placeholder="有限公司"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="isfines">
          <el-input v-model="userInforForm.isfines" disabled class="read-only" placeholder="有限公司"></el-input>
        </el-form-item>

      <legend class="legendColumn">收费信息</legend>
        <el-form-item label="费用类型：" prop="year">
          <el-input v-model="userInforForm.year" placeholder="003E"></el-input>
        </el-form-item>
        <el-form-item label="费用金额：" prop="year">
          <el-input v-model="userInforForm.year" placeholder="003E"></el-input>
        </el-form-item>
        <el-form-item label="缴费渠道：" prop="year">
          <el-input v-model="userInforForm.year" placeholder="003E"></el-input>
        </el-form-item>
        <el-form-item label="缴费方式：" prop="year">
          <el-input v-model="userInforForm.year" placeholder="003E"></el-input>
        </el-form-item>
        <el-form-item label="收费时间：" prop="year">
          <el-input v-model="userInforForm.year" placeholder="003E"></el-input>
        </el-form-item>
        <el-form-item label="收费员：" prop="year">
          <el-input v-model="userInforForm.year" placeholder="003E"></el-input>
        </el-form-item>
        <el-form-item label="发票号码：" prop="year">
          <el-input v-model="userInforForm.year" placeholder="003E"></el-input>
        </el-form-item>
        <el-form-item label="开票项目：" prop="year">
          <el-select v-model="userInforForm.PriceStrategy" placeholder="">
            <el-option v-for="item in userInforForm.descoptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开票时间：" prop="year">
          <el-input v-model="userInforForm.year" placeholder="003E"></el-input>
        </el-form-item>
        <el-form-item label="开票人：" prop="year">
          <el-input v-model="userInforForm.year" placeholder="003E"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="year" class='f2'>
          <el-input type="textarea" v-model="userInforForm.Remarks" placeholder=""></el-input>
        </el-form-item>

      <legend class="legendColumn">流程处理</legend>
      <procedure></procedure>

    </el-form>

  </div>
</template>
<script>
import procedure from "@/components/procedure"; //流程审核
import commonPart from "@/views/CustomerCenter/changeMangement/commonPart"; //公告模块
export default {
  name: "OtherChargesEdit",
  components: {
    commonPart,
    procedure
  },
  data() {
    return {
      redTime: "",
      beginYearM: "",
      userInforForm: {
        descoptions:[
          {
            label: "修缮服务",
            value: "1",
          },
          {
            label: "其他现代服务",
            value: "2",
          },
          {
            label: "利息收入",
            value: "3",
          },
        ],

        // 查询内容
        cDate: "",
        cTime: "",
        backfillInput: [
          {
            label: "用户名称：",
            value: "",
            tips: ""
          },

          {
            label: "用户地址：",
            value: "",
            tips: ""
          },
          {
            label: "用水类型：",
            value: "",
            tips: ""
          },
          {
            label: "联系人：",
            value: "",
            tips: ""
          },
          {
            label: "座机号码：",
            value: "",
            tips: ""
          }
        ],

        desc: "",
        userNume: "",
        descoptions: [
          {
            name: "0040__生活用水2.85",
            value: "1"
          },
          {
            name: "0041__免费用水",
            value: "2"
          }
        ],
        IsFine: [
          {
            name: "是",
            value: "1"
          },
          {
            name: "否",
            value: "2"
          }
        ],
        UpdateCodeCopying: [
          {
            name: "是",
            value: "1"
          },
          {
            name: "否",
            value: "2"
          }
        ],
        userNum: "",
        PriceStrategy: "",
        isfines: "2",
        UpdateCodeCopye: "2",
        Remarks: "",
        priorPeriodNum: "",
        currendPeriodNum: "",
        currendPeriodWater: ""
      },
      rules: {
        userNum: [
          { required: true, trigger: "blur", message: "请输入用户编号" }
        ],
        desc: [{ required: true, trigger: "blur" }]
      },
      histroyData: {},
      label: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {

    }
  }
};
</script>
<style lang="scss">
.OtherChargesEdit {
  height: calc(100% - 41px);
  overflow-y: auto;
}
</style>