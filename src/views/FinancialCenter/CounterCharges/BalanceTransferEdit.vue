<template>
  <div class="BalanceTransferEdit">

    <el-form class="formBill" size="mini" :inline="true" :model="BalanceTransferEditForm" label-width="130px" ref="ruleForm" :rules="rules">

      <commonPart :parentToChild="'3'"></commonPart>
      <legend class="legendColumn">转出账户</legend>

      <el-form-item label="转出账户：">
        <el-input v-model="BalanceTransferEditForm.userNume" placeholder=""></el-input>
      </el-form-item>
      <el-button size="mini" class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
      <br>

      <el-form-item :label="v.label" v-for="(v,i) in BalanceTransferEditForm.backfillInputOnly" :key="i">
        <el-input class="read-only" v-model="v.value" :placeholder="v.tips" disabled></el-input>
      </el-form-item>
      <legend class="legendColumn">转入账户</legend>

      <el-form-item label="转入账户：">
        <el-input v-model="BalanceTransferEditForm.TransferAccount" placeholder=""></el-input>
      </el-form-item>
      <el-button size="mini" class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
      <br>

      <el-form-item :label="v.label" v-for="(v,i) in BalanceTransferEditForm.backfillInputOnly" :key="i">
        <el-input class="read-only" v-model="v.value" :placeholder="v.tips" disabled></el-input>
      </el-form-item>

      <legend class="legendColumn">过户金额</legend>

      <el-form-item label="过户金额：">
        <el-input class="read-only" v-model="BalanceTransferEditForm.TransferAccount" placeholder=""></el-input>
      </el-form-item>
      <el-button type="primary" size="mini">签名</el-button>

      <br>
      <el-form-item label="备注：" class="f2">
        <el-input type="textarea" v-model="desc" placeholder=""></el-input>
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
  name: "BalanceTransferEdit",
  components: {
    uploadFile,
    procedure,
    commonPart
  },
  data() {
    return {
      BalanceTransferEditForm: {
        // 查询内容
        backfillInputOnly: [
          {
            label: "客户编号：",
            value: "",
            tips: ""
          },
          {
            label: "客户名称：",
            value: "",
            tips: ""
          },
          {
            label: "客户地址：",
            value: "",
            tips: ""
          },

          {
            label: "账户余额：",
            value: "",
            tips: ""
          }
        ],

        desc: "",
        userNume: "",
        descoptions: [],
        TransferAccount: ""
      },
      rules: {
        userNume: [
          { required: true, message: "请输入用户编号", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请输入用户编号", trigger: "blur" }]
      },
      histroyData: {},
      label: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {}
  }
};
</script>
<style lang="scss">
.BalanceTransferEdit {
  height: 100%;
  overflow-y: auto;
}
</style>

