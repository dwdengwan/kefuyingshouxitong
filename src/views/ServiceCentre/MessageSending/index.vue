<template>
  <div class="message-sending">
    <!-- class="formBill-One" -->
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right">
        <el-button size="mini" type="primary">发送</el-button>
      </div>
    </div>
    <div>
      <el-form :inline="true" size="mini" :model="tableQuery" class="formBill-One">
        <el-form-item label='用户编号：' class="user-no">
          <el-input v-model="tableQuery.userNo" placeholder="请输入用户编号"></el-input>
          <el-button class="searchBtn" icon="el-icon-search" @click="search"></el-button>
        </el-form-item>

        <el-form-item label="用户名称：">
          <el-input v-model="tableQuery.userName" placeholder="请输入用户名称"></el-input>
        </el-form-item>

        <el-form-item label="手机号码：">
          <el-input v-model="tableQuery.userPhone" placeholder="请输入手机号码"></el-input>
        </el-form-item>

        <el-form-item label="短信模板：">
          <el-select clearable v-model="tableQuery.note" placeholder="请选择短信模板">
            <el-option v-for="(item,index) in noteType" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="发送内容：">
          <el-input type="textarea" placeholder="请输入发送内容" v-model="tableQuery.content" maxlength="200" show-word-limit></el-input>
        </el-form-item>

        <el-form-item label="可定制内容：">
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
</template>
<script>
export default {
  name: "messageSending",
  components: {

  },
  data() {
    return {
      crumbsData: {  //面包屑
        titleList: [
          { title: '客户通知' },
          { title: '短信发送' },
        ],
      },
      tableQuery: {
        userNo: '',
        userName: '',
        userPhone: '',
      },
      noteType: [
        { value: '1', label: '普通模板' },
        { value: '2', label: '特殊模板' }
      ]
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {

    },
  },
  watch: {

  }
}
</script>
<style lang="scss">
.message-sending {
  width: 100%;
  height: 100%;
  .user-no{
    .el-input{
      width: 85%;
    }
  }
}
</style>