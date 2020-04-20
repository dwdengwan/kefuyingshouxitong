<template>
  <div class="water-manage">

    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right">
        <el-button size="mini" icon="el-icon-plus" @click="add('add')" type="primary">保存</el-button>
      </div>
    </div>
    <el-form class="lineForm" :model="formData" size="mini" label-width="100px">

      <legend class="legendColumn">对账异常通知</legend>
      <el-form-item label="通知人员：">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formData.user">
        </el-input>
      </el-form-item>

      <legend class="legendColumn">抄表异常通知</legend>
      <el-form-item label="通知人员：">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formData.type">
        </el-input>
      </el-form-item>

      <legend class="legendColumn">水表到期通知</legend>
      <el-form-item label="通知人员：">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formData.time">
        </el-input>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>

export default {
  name: "PaymentNotice",
  data() {
    return {
      formData: {
        user: '',
        type: '',
        time: '',
        branchAddr: '',
        businessTime: "",
        status: '',
        comments: '',
        sortNo: "",
      },
      crumbsData: {  //面包屑
        titleList: [
          // { title: '基础信息', path: '/BusinessArea' },
          { title: '水精灵管理', method: () => { window.histroy.back() } },
          { title: '其他精灵', method: () => { window.histroy.back() } }
        ],
      },

    }
  },
  mounted() {
    // 侧边栏
    eventBus.$emit('asideMenuShow', 'basicsMenuShow6')
  },
  methods: {
    init() {
      let _this = this
      let params = {
        "busicode": "BusinessBranchList",
        "data": {},
      }
      this.$api.fetch({
        params: params,//参数

      }).then(res => {
        _this.tableData = res;

      })

    },
    //保存按钮
    submitForm(formName) {
    },
  },
  watch: {
  }
}
</script>

