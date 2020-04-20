


<template>
  <div class="BalanceWithdrawalEdit">
    <el-form class="formBill" size="mini" :inline="true" :model="BalanceWithdrawalEditForm" label-width="130px" ref="ruleForm" :rules="rules">

      <commonPart :parentToChild="'2'"></commonPart>

      <legend class="legendColumn">账户信息</legend>
      <el-form-item label="账户编号：">
        <el-input class="read-only" disabled="disabled" v-model="BalanceWithdrawalEditForm.userNo" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="账户类型：">
        <el-input v-model="BalanceWithdrawalEditForm.PriceStrategy" placeholder="" disabled class="read-only"></el-input>
      </el-form-item>

      <el-form-item label="开户行：">
        <el-input v-model="BalanceWithdrawalEditForm.PriceStrategy" placeholder="" disabled class="read-only"></el-input>
      </el-form-item>

      <legend class="legendColumn">取出信息</legend>
      <el-form-item label="取出金额：">
        <el-input v-model="BalanceWithdrawalEditForm.VirtualTable" placeholder="" class="read-only"></el-input>
      </el-form-item>

      <el-button type="primary" size="mini">签名</el-button>
      <el-form-item label="取出方式：">
        <el-select v-model="BalanceWithdrawalEditForm.TypesGarbageCharges" placeholder="请选择">
          <el-option v-for="item in TakeOutWay" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="备注：" class="f2">
        <el-input v-model="BalanceWithdrawalEditForm.PriceTypes" type="textarea" placeholder="" class="read-only"></el-input>
      </el-form-item>

      <legend class="legendColumn">上传附件</legend>
      <uploadFile></uploadFile>

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
  name: "BalanceWithdrawalEdit",
  components: {
    commonPart,
    uploadFile,
    procedure
  },
  data() {
    return {
      TakeOutWay: [
        {
          name: "微信",
          value: "1"
        },
        {
          name: "支付宝",
          value: "2"
        },
        {
          name: "现金",
          value: "3"
        }
      ],
      BalanceWithdrawalEditForm: {
        userNo: "101801012001",
        userStuse: "2",
        isfinesOptinon: [
          {
            name: "欠费拆表",
            value: "1"
          },
          {
            name: "停用拆表",
            value: "2"
          },
          {
            name: "销户拆表",
            value: "3"
          }
        ],
        countMsgOrder: [
          {
            label: "开户名：",
            value: "",
            tips: "梅州粤海水务有限公司"
          },
          {
            label: "银行账户：",
            value: "",
            tips: "101801012001"
          },
          {
            label: "托号：",
            value: "",
            tips: "101801012001"
          },
          {
            label: "托收合同号：",
            value: "",
            tips: "101801012001"
          }
        ],
        VirtualTable: "",
        TypesGarbageCharges: "",
        PriceTypes: ""
      },

      rules: {
        userNume: [
          { required: true, message: "请输入客户名称", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请输入取出金额", trigger: "blur" }]
      },
      histroyData: {},
      formData: {
        con: ""
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {},
    demand() {
      this.init();
    }
  }
};
</script>
<style lang="scss">
.BalanceWithdrawalEdit {
  height: 100%;
  overflow-y: auto;
}
</style>

