<template>
  <div class="FindingsEdit">
    <div class="kl-table">
      <el-table stripe border :data="histroyData.list" class="change-tables-table">

        <el-table-column type="index" label="NO." width="50">
        </el-table-column>

        <el-table-column prop="questionCon" min-width="400" label="问题">

        </el-table-column>

        <el-table-column prop="lvalue" min-width="100" label="评分">
        </el-table-column>

      </el-table>

    </div>
    <label>其他评价：</label>
    <el-input type="textarea" :rows="4" v-model="OtherEvaluations" />
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      OtherEvaluations: "",
      histroyData: {
        list: [
          {
            questionCon: "请问您对我司营收人员的服务态度是否满意？",
            lvalue: "9"
          },
          {
            questionCon: "请问您对我们整体的产品和服务质量的满意度评价如何？",
            lvalue: "8"
          },
          {
            questionCon: "请问您对我司营收人员的服务态度是否满意？",
            lvalue: "9"
          },
          {
            questionCon: "请问您对我们整体的产品和服务质量的满意度评价如何？",
            lvalue: "8"
          }
        ]
      }
    };
  }
};
</script>
<style lang="scss">
.FindingsEdit {
  padding-top: 15px;
  label {
    padding-left: 20px;
  }
  .el-textarea {
    width: 60%;
    margin-top: 20px;
    vertical-align: middle;
  }
}
</style>
