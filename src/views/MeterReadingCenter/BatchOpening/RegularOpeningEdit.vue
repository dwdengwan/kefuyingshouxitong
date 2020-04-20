<template>
    <div   class="RegularOpeningEdit">

        <el-form  class=" RegularOpeningEditForm " :inline="true" :model="RegularOpeningEditForm" label-width="130px" ref="ruleForm" :rules="rules">

          <legend class="legendColumn">用户信息</legend>

          <el-form-item label="上期抄码：">
            <el-input class="read-only" disabled="disabled" v-model=" RegularOpeningEditForm.ctmNo" placeholder="01003152" ></el-input>
          </el-form-item>
          <el-form-item label="本期抄码：">
            <el-input class="read-only" disabled="disabled" v-model=" RegularOpeningEditForm.ctmName" placeholder="谢顺新" ></el-input>
          </el-form-item>
          <el-form-item label="本期用水：">
            <el-input class="read-only" disabled="disabled" v-model=" RegularOpeningEditForm.ctmAddr" placeholder="宝积山路、体育巷" ></el-input>
          </el-form-item>
          <el-form-item label="增减水量：">
            <el-input class="read-only" disabled="disabled" v-model=" RegularOpeningEditForm.ctmNo" placeholder="01003152" ></el-input>
          </el-form-item>
          <el-form-item label="分摊水量：">
            <el-input class="read-only" disabled="disabled" v-model=" RegularOpeningEditForm.ctmName" placeholder="谢顺新" ></el-input>
          </el-form-item>
          <legend class="legendColumn">计算方式</legend>

        </el-form>
    </div>
    
</template>
<script>
export default {
  name: "RegularOpeningEdit",
  props: {
    parentToChild: String,
  },
  data() {
    return {
      tabsName:"after",
      RegularOpeningEditForm: {
        bankCountNum: "",
        desc: "",
        userNume: "",
        PriceStrategy: "",
        isfines: "",
        UpdateCodeCopye: "",
        Remarks: "",
        year: ""
      },
      histroyData: {},

    }
  },
  mounted() {
    this.init();
    
  },
  methods: {
    init() {

    },

  }
}
</script>
<style lang="scss">
.RegularOpeningEdit {
  .keyword-bottom{
    display: inline-block;
    height: 40px;
    line-height: 40px;
  }
  .el-form-item {
    margin-bottom: 0px !important;
}
.el-input__inner{
  height: 30px;
}
  .el-tabs--border-card {
    border: none;
    box-shadow: none;
  }
  .RegularOpeningEditForm {
    .el-form-item {
      width: 23%;
      .el-form-item__content {    
        width: calc(100% - 160px);
        .el-select {
          width: 100%;
        }
      }
    }
    .from-table {
      width: 100%;
      .el-form-item__content {
        width: 100%;
      }
    }
  }
  .el-steps--horizontal {
    margin: 0 auto;
    width: 50%;
    padding-bottom: 20px;
  }
}
</style>