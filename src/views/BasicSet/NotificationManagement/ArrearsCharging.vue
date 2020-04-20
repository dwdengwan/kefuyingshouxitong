<template>
  <div class="water-manage">

    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right">
        <el-button size="mini" icon="el-icon-plus" @click="add('add')" type="primary">保存</el-button>
      </div>
    </div>
    <el-form class="lineForm" :model="formData" size="mini" label-width="100px">
      <el-form-item label="产生违约前">
        <el-input v-model="formData.user" placeholder="1"></el-input>
        <span style=" font-size: 12px;color: #606266;">天自动发送欠费提醒（为空时不发送）</span>
      </el-form-item>
      <el-form-item label="产生违约后">
        <el-input v-model="formData.user" placeholder="3"></el-input>
        <span style=" font-size: 12px;color: #606266;">天自动发送欠费提醒（为空时不发送）</span>
      </el-form-item>

      <el-form-item label="通知方式：">
        <el-checkbox-group v-model="formData.type">
          <el-checkbox label="微信" name="type"></el-checkbox>
          <el-checkbox label="短信" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="通知时间：">
        <el-date-picker v-model="formData.time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>

export default {
  name: "ArrearsCharging",
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
          { title: '欠费催缴精灵', method: () => { window.histroy.back() } }
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
