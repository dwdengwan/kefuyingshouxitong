<template>
  <div class="Appendix">

    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right">
        <el-button size="mini" icon="el-icon-plus" @click="add('add')" type="primary">保存</el-button>
      </div>
    </div>

    <div class="ShortMessageEdit">
      <el-form class="" :inline="true" :model="ruleForm" label-width="100px" ref="ruleForm" :rules="rules">
        <legend>个人业务</legend>
        <legend class="ml-80">用水申请</legend>
        <el-form-item class="ml-120" label=" " prop="waterBill">
          <el-checkbox v-model="checked">业主身份证正面</el-checkbox>
          <el-checkbox v-model="checked">业主身份证反面</el-checkbox>
          <el-checkbox v-model="checked">银行卡</el-checkbox>
          <el-checkbox v-model="checked">房产证</el-checkbox>
        </el-form-item>
        <legend class="ml-80">资料变更</legend>
        <legend class="ml-160">用户资料变更</legend>
        <el-form-item class="ml-120" label=" " prop="oweFee">
          <el-checkbox v-model="checked">业主身份证正面</el-checkbox>
          <el-checkbox v-model="checked">业主身份证反面</el-checkbox>
          <el-checkbox v-model="checked">银行卡</el-checkbox>
          <el-checkbox v-model="checked">房产证</el-checkbox>
        </el-form-item>
        <legend class="ml-160">委托银行代扣</legend>
        <el-form-item class="ml-120" label=" " prop="oweFee">
          <el-checkbox v-model="checked">业主身份证正面</el-checkbox>
          <el-checkbox v-model="checked">业主身份证反面</el-checkbox>
          <el-checkbox v-model="checked">银行卡</el-checkbox>
          <el-checkbox v-model="checked">房产证</el-checkbox>
        </el-form-item>
        <legend class="ml-80">水表管理</legend>
        <legend class="ml-160">水表停用</legend>
        <el-form-item class="ml-120" label=" " prop="payFee">
          <el-checkbox v-model="checked">业主身份证正面</el-checkbox>
          <el-checkbox v-model="checked">业主身份证反面</el-checkbox>
          <el-checkbox v-model="checked">银行卡</el-checkbox>
          <el-checkbox v-model="checked">房产证</el-checkbox>
        </el-form-item>
        <legend>对公业务</legend>
        <legend class="ml-80">用水申请</legend>
        <el-form-item class="ml-120" label=" " prop="waterBill">
          <el-checkbox v-model="checked">业主身份证正面</el-checkbox>
          <el-checkbox v-model="checked">业主身份证反面</el-checkbox>
          <el-checkbox v-model="checked">银行卡</el-checkbox>
          <el-checkbox v-model="checked">房产证</el-checkbox>
        </el-form-item>
        <legend class="ml-80">资料变更</legend>
        <legend class="ml-160">用户资料变更</legend>
        <el-form-item class="ml-120" label=" " prop="oweFee">
          <el-checkbox v-model="checked">业主身份证正面</el-checkbox>
          <el-checkbox v-model="checked">业主身份证反面</el-checkbox>
          <el-checkbox v-model="checked">银行卡</el-checkbox>
          <el-checkbox v-model="checked">房产证</el-checkbox>
        </el-form-item>
        <legend class="ml-160">委托银行代扣</legend>
        <el-form-item class="ml-120" label=" " prop="oweFee">
          <el-checkbox v-model="checked">业主身份证正面</el-checkbox>
          <el-checkbox v-model="checked">业主身份证反面</el-checkbox>
          <el-checkbox v-model="checked">银行卡</el-checkbox>
          <el-checkbox v-model="checked">房产证</el-checkbox>
        </el-form-item>
        <legend class="ml-80">水表管理</legend>
        <legend class="ml-160">水表停用</legend>
        <el-form-item class="ml-120" label=" " prop="payFee">
          <el-checkbox v-model="checked">业主身份证正面</el-checkbox>
          <el-checkbox v-model="checked">业主身份证反面</el-checkbox>
          <el-checkbox v-model="checked">银行卡</el-checkbox>
          <el-checkbox v-model="checked">房产证</el-checkbox>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script>
export default {
  name: "Appendix",
  components: {
  },
  data() {
    return {
      ruleForm: {
      },
      rules: {
      },
      crumbsData: {  //面包屑
        titleList: [
          // { title: '基础信息', path: '/BusinessArea' },
          { title: '其他配置' },
          { title: '附件资料' }
        ],
      },
      histroyData: {},
      maxHeight: 0,
      tableShow: false,
    }
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      // this.common.changeTable(this, '.Appendix .kl-table', [])
    })
  },
  methods: {
    init() {
    },
    //保存按钮
    submitForm(formName) {
      let type = this.crumbsData.titleList[3].title;
      this.$refs.ShortMessageEdit.submitForm(formName, type);
    },
  },
  watch: {
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
  }
}
</script>
<style lang="scss">
.Appendix {
  width: 100%;
  height: 100%;
  .ShortMessageEdit {
    height: calc(100% - 45px);
    overflow-y: auto;
    overflow-x: hidden;
    legend {
      background: #f5f5f5;
      font-weight: 700;
      font-size: 12px;
      padding: 5px 20px;
      font-size: 14px;
      margin-bottom: 5px;
      i {
        float: right;
        margin-top: 5px;
        cursor: pointer;
      }
    }
    .ml-80 {
      margin-left: 80px;
    }
    .ml-120 {
      width: 100%;
      margin-left: 120px;
    }
    .ml-160 {
      margin-left: 160px;
    }
  }
}
</style>
