
<template>
  <div class="AbnormalVerificationEdit">
    <div class="backfillSubmitForm">
      <el-form class="basicInfoForm" :inline="true" size="mini" :model="backfillSubmitForm" label-width="150px">
        <el-form-item label="处理人：">
          <el-input v-model="backfillSubmitForm.superiorArea" placeholder="处理人" clearable></el-input>
        </el-form-item>
        <el-form-item label="处理时间：">
          <el-date-picker v-model="areaName" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否换表：">
          <el-select v-model="backfillSubmitForm.state" placeholder="请选择状态">
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理方法：">
          <el-input v-model="backfillSubmitForm.desc" type="textarea" :rows="5" placeholder="处理结果" clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "AbnormalVerificationEdit",
  data() {
    return {
      backfillSubmitForm: {
        superiorArea: "",
        areaNum: "",
        state: "0",
        areaName: "",
        desc: ""
      },
      areaName: ""
    };
  }
};
</script>
<style lang="scss">
@import "../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.AbnormalVerificationEdit {
  height: 100%;
  width: 80%;
  margin: 0 auto;
  .backfillSubmitForm {
    .el-input--mini /deep/ .el-input__inner {
      width: 100%;
    }
  }
}
</style>
