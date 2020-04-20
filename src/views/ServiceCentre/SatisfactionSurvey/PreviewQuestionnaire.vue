<template>
  <div class="PreviewQuestionnaire">
    <ul>
      <li>
        <h3>
          1、服务受理与反馈<sup>*</sup><span>[单选题]</span><span>[必答题]</span>

        </h3>
        <div>
          <el-radio v-model="SingleElection" label="1">非常满意（100分）</el-radio>
          <el-radio v-model="SingleElection" label="2">一般（70分）</el-radio>
          <el-radio v-model="SingleElection" label="3">差（0分）</el-radio>

        </div>
      </li>
      <li>
        <h3>
          2、单选题<sup>*</sup><span>[评分题]</span><span>[必答题]</span>

        </h3>
        <div>
          <el-radio v-model="SingleElection" label="1">评分1（10分）</el-radio>
          <el-radio v-model="SingleElection" label="2">评分2（5分）</el-radio>
          <el-radio v-model="SingleElection" label="3">评分3（0分）</el-radio>

        </div>
      </li>
      <li>
        <h3>
          3、测试多选题<sup>*</sup><span>[多选题]</span><span>[必答题]</span><span>[至少选择1项]</span>

        </h3>
        <div>
          <el-checkbox v-model="v.vaule" v-for="(v, i) in multiple" :key="i">{{v.con}}</el-checkbox>

        </div>
      </li>
      <li>
        <h3>
          4、其他类：您认为需要改进或提高的服务<sup>*</sup><span>[多选题]</span><span>[必答题]</span>

        </h3>
        <div>
          <el-input v-model="otherType" :rows="3" type="textarea"></el-input>

        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "PreviewQuestionnaire",
  data() {
    return {
      SingleElection: "",
      multiple: [
        {
          con: "答案1",
          vaule: ""
        },
        {
          con: "答案2",
          vaule: ""
        },
        {
          con: "答案3",
          vaule: ""
        }
      ],
      otherType: ""
    };
  }
};
</script>
<style lang="scss">
$theme-color: #297acc;
.PreviewQuestionnaire {
  padding: 10px 15px;
  li {
    padding: 25px 10px;
    border-bottom: 1px solid #f5f5f5;
    &:last-of-type {
      border-bottom: 0px;
    }
    h3 {
      color: $theme-color;
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      margin-bottom: 15px;
      span {
        color: #606266;
        font-size: 14px;
        margin-left: 15px;
      }
      sup {
        color: red;
      }
    }
    .el-checkbox__label,
    .el-radio__label {
      font-size: 14px;
    }
  }
}
</style>
