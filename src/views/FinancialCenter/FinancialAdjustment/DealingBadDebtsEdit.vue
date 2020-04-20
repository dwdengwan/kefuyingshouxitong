

<template>
  <div class="DealingBadDebtsEdit">

    <commonPart :parentToChild="'2'"></commonPart>
    <el-form class="formBill" :inline="true" size="mini" :model="DealingBadDebtsEditForm" label-width="130px" ref="ruleForm" :rules="rules">
      <legend class="legendColumn">呆账处理信息</legend>
      <el-form-item label="用水类型：">
        <el-select v-model="DealingBadDebtsEditForm.PriceStrategy" placeholder="居民用水" disabled>
          <el-option v-for="item in DealingBadDebtsEditForm.descoptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="v.label" v-for="(v,i) in DealingBadDebtsEditForm.backfillInputOther" :key="i">
        <el-input v-model="v.value" :placeholder="v.tips" disabled></el-input>
      </el-form-item>

      <el-form-item class="Remarks" label="备注：">
        <el-input type="textarea" :rows="3" v-model="DealingBadDebtsEditForm.isfines" placeholder=""></el-input>
      </el-form-item>

      <el-table stripe border :data="histroyData.list" class="change-tables-table">

        <el-table-column label="NO." min-width="50" fixed="left" type="selection">
        </el-table-column>

        <el-table-column label="NO." min-width="50" fixed="left" type="index">
        </el-table-column>

        <el-table-column prop="daytime" min-width="100" label="账期">
        </el-table-column>

        <el-table-column prop="model" min-width="80" label="抄表日期">
        </el-table-column>

        <el-table-column prop="isxz" min-width="100" label="费用名称">
        </el-table-column>

        <el-table-column prop="fixValue" min-width="80" label="计费水量">
        </el-table-column>

        <el-table-column prop="lvalue" min-width="80" label="应缴金额">
        </el-table-column>

        <el-table-column prop="fixValue" min-width="80" label="违约天数">
        </el-table-column>

        <el-table-column prop="lvalue" min-width="80" label="违约金">
        </el-table-column>

      </el-table>
      <legend class="legendColumn">上传附件</legend>
      <uploadFile></uploadFile>

      <legend class="legendColumn">流程处理</legend>
      <procedure></procedure>

    </el-form>

  </div>
</template>
<script>
import uploadFile from "@/components/uploadPic"; //上传附件
import procedure from "@/components/procedure"; //流程审核
import commonPart from "../../CustomerCenter/changeMangement/commonPart"; //公告模块
export default {
  name: "DealingBadDebtsEdit",
  components: {
    uploadFile,
    commonPart,
    procedure
  },
  props: ["tableData"],
  data() {
    return {
      DealingBadDebtsEditForm: {
        // 查询内容
        backfillInput: [
          {
            label: "用户名称：",
            value: "",
            tips: "xx319"
          },
          {
            label: "用户地址：",
            value: "",
            tips: "登封路"
          }
        ],
        backfillInputOther: [
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
            name: "居民用水",
            value: "1"
          },
          {
            name: "非居民用水",
            value: "2"
          }
        ],
        userNum: "",
        PriceStrategy: "",
        isfines: ""
      },
      rules: {
        userNum: [
          { required: true, message: "请输入用户编号", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请输入用户编号", trigger: "blur" }]
      },
      histroyData: this.tableData
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
.DealingBadDebtsEdit {
  height: 100%;
  overflow-y: auto;
}
</style>

