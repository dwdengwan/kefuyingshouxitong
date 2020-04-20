<template>
  <div class="short-message">

    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right">
        <el-button size="mini" icon="el-icon-plus" @click="add('add')" type="primary">保存</el-button>
      </div>
    </div>

    <div class="ShortMessageEdit">
      <div class="ShortMessageEditForm">
        <el-form class="backfillSubmitForm" :inline="true" :model="ruleForm" label-width="100px" ref="ruleForm" :rules="rules">
          <legend class="common-legend">水费帐单模板</legend>
          <el-form-item style="width: 100%;" label=" " prop="waterBill">
            <el-input type="textarea" :rows="3" v-model="ruleForm.waterBill" placeholder=""></el-input>
          </el-form-item>
          <legend class="common-legend">欠费催缴模板</legend>
          <el-form-item style="width: 100%;" label=" " prop="oweFee">
            <el-input type="textarea" :rows="3" v-model="ruleForm.oweFee" placeholder=""></el-input>
          </el-form-item>
          <legend class="common-legend">缴费通知模板</legend>
          <el-form-item style="width: 100%;" label=" " prop="payFee">
            <el-input type="textarea" :rows="3" v-model="ruleForm.payFee" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="可定制内容" class="Btngroup">
            <el-button type="text" size="mini">用户编号</el-button>
            <el-button type="text" size="mini">用户名称</el-button>
            <el-button type="text" size="mini">用户地址</el-button>
            <el-button type="text" size="mini">帐期</el-button>
            <el-button type="text" size="mini">用户余额</el-button>
            <el-button type="text" size="mini">帐单金额</el-button>
            <el-button type="text" size="mini">水表编号</el-button>
            <el-button type="text" size="mini">欠费合计（不含违约金）</el-button>
            <el-button type="text" size="mini">欠费合计（含违约金）</el-button>
            <el-button type="text" size="mini">违约金</el-button>
            <el-button type="text" size="mini">当前日期</el-button>
            <el-button type="text" size="mini">客服热线</el-button>
            <el-button type="text" size="mini">支付链接</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "short-message-index",
  components: {
  },
  data() {
    return {
      ruleForm: {
        waterBill: "尊敬的[用户名称],您[帐期]的帐单金额为[帐单金额]，最后缴费日期[最后缴费日期]，请及时缴费",
        oweFee: "尊敬的[用户名称],您当前欠费合计[欠费合计（含违约金）],其中违约金[违约金]，请及时缴费",
        payFee: "尊敬的[用户名称],您于[缴费日期]日成功缴费[缴费金额]元，感谢您的支持",
      },
      rules: {
        waterBill: [
          { required: true, message: '请输入水费帐单模板', trigger: 'blur' },
        ],
        oweFee: [
          { required: true, message: '请输入欠费催缴模板', trigger: 'blur' },
        ],
        payFee: [
          { required: true, message: '请输入缴费通知模板', trigger: 'blur' },
        ],
      },
      crumbsData: {  //面包屑
        titleList: [
          // { title: '基础信息', path: '/BusinessArea' },
          { title: '模板配置', method: () => { window.histroy.back() } },
          { title: '短信模板', method: () => { window.histroy.back() } }
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
      // this.common.changeTable(this, '.short-message .kl-table', [])
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
.short-message {
  width: 100%;
  height: 100%;
  .el-textarea {
    width: 600px;
  }
  legend {
    i {
      float: right;
      margin-top: 5px;
      cursor: pointer;
    }
  }
}
</style>
