<template>
  <!-- 开户 -->
  <div class="change-config">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right">
        <el-button size="mini" type="primary">保存</el-button>
      </div>
    </div>
    <div class="ctmInfo">
      <el-form size="mini" class="formBill" :inline="true" :model="userInforForm" label-width="130px" ref="ruleForm">

        <legend class="legendColumn">客户信息</legend>
        <el-checkbox-group v-model="userInforForm.ctmInfoData">
          <el-checkbox v-for="ctm in userInforForm.ctmInfo" :label="ctm.name" :key="ctm.value">{{ctm.name}}</el-checkbox>
        </el-checkbox-group>

        <legend class="legendColumn">用户信息</legend>
        <el-checkbox-group v-model="userInforForm.userInfoData">
          <el-checkbox v-for="user in userInforForm.userInfo" :label="user.name" :key="user.value">{{user.name}}</el-checkbox>
        </el-checkbox-group>

        <legend class="legendColumn">用户-分类信息</legend>
        <el-checkbox-group v-model="userInforForm.userSelectInfoData">
          <el-checkbox v-for="user in userInforForm.userSelectInfo" :label="user.name" :key="user.value">{{user.name}}</el-checkbox>
        </el-checkbox-group>

        <legend class="legendColumn">账户信息 </legend>
        <el-checkbox-group v-model="userInforForm.billInfoData">
          <el-checkbox v-for="user in userInforForm.billInfo" :label="user.name" :key="user.value">{{user.name}}</el-checkbox>
        </el-checkbox-group>

        <!-- 开户模块 水表信息可修改 -->
        <legend class="legendColumn">用户-水表信息 </legend>
        <el-checkbox-group v-model="userInforForm.userWaterInfoData">
          <el-checkbox v-for="user in userInforForm.userWaterInfo" :label="user.name" :key="user.value">{{user.name}}</el-checkbox>
        </el-checkbox-group>

        <legend class="legendColumn">用户-抄表信息</legend>
        <el-checkbox-group v-model="userInforForm.meterReadInfoData">
          <el-checkbox v-for="user in userInforForm.meterReadInfo" :label="user.name" :key="user.value">{{user.name}}</el-checkbox>
        </el-checkbox-group>

        <legend class="legendColumn">用户-价格信息 </legend>
        <el-checkbox-group v-model="userInforForm.userPriceInfoData">
          <el-checkbox v-for="user in userInforForm.userPriceInfo" :label="user.name" :key="user.value">{{user.name}}</el-checkbox>
        </el-checkbox-group>

      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "changeConfig",
  components: {

  },
  data() {
    return {
      crumbsData: {  //面包屑
        titleList: [
          // { title: '业务管理', path: '/OpenAccount' },
          { title: '其他配置' },
          { title: '快速变更配置' },
        ],
      },
      userInforForm: {
        ctmInfo: [
          {
            name: "客户编号",
            value: '1'
          },
          {
            name: "客户名称",
            value: '2'
          },
          {
            name: "客户地址",
            value: '3'
          },
          {
            name: "客户类型",
            value: '4'
          },
          {
            name: "信用等级",
            value: '5'
          },
          {
            name: "联系人",
            value: '6'
          },
          {
            name: "座机号码",
            value: '7'
          },
          {
            name: "手机号码",
            value: '8'
          },
        ],
        ctmInfoData: ['客户编号', '客户名称', '客户地址', '客户类型', '信用等级', '联系人', '座机号码', '手机号码',],
        userInfo: [
          {
            name: "用户编号",
            value: '1'
          },
          {
            name: "用户名称",
            value: '2'
          },
          {
            name: "用户地址",
            value: '3'
          },
          {
            name: "证件类型",
            value: '4'
          },
          {
            name: "证件号码",
            value: '5'
          },
          {
            name: "联系人",
            value: '6'
          },
          {
            name: "座机号码",
            value: '7'
          },
          {
            name: "邮箱",
            value: '8'
          },
          {
            name: "手机号码",
            value: '9'
          },
          {
            name: "传真号码",
            value: '10'
          },
          {
            name: "房产证编号",
            value: '11'
          },
        ],
        userInfoData: ['用户编号', '用户名称', '用户地址', '证件类型', '证件号码', '联系人', '座机号码', '邮箱', '手机号码', '传真号码', '房产证编号'],
        userSelectInfo: [
          {
            name: "锁定状态",
            value: '1'
          },
          {
            name: "用户状态",
            value: '2'
          },
          {
            name: "大用户",
            value: '3'
          },
          {
            name: "短信签约",
            value: '4'
          },
          {
            name: "合同编号",
            value: '5'
          },
          {
            name: "合同地址",
            value: '6'
          },
          {
            name: "签订日期",
            value: '7'
          },
          {
            name: "营业所",
            value: '8'
          },
          {
            name: "行政区域",
            value: '9'
          },
          {
            name: "营业区域",
            value: '10'
          },
          {
            name: "行业分类",
            value: '11'
          },
          {
            name: "立户日期",
            value: '12'
          },
          {
            name: "停用日期",
            value: '13'
          },
          {
            name: "注销日期",
            value: '14'
          },
          {
            name: "用水期限",
            value: '15'
          },
          {
            name: "拆表原因",
            value: '16'
          },
          {
            name: "投递标记",
            value: '17'
          },
          {
            name: "邮政编码",
            value: '18'
          },

        ],
        userSelectInfoData: ['锁定状态', '用户状态', '大用户', '短信签约', '合同编号', '合同地址', '签订日期', '营业所', '行政区域', '营业区域', '行业分类', '立户日期', '停用日期', '注销日期', '用水期限', '拆表原因', '投递标记', '邮政编码'],
        billInfo: [
          {
            name: "账号编号",
            value: '1'
          },
          {
            name: "缴费方式",
            value: '2'
          },
          {
            name: "账户类型",
            value: '3'
          },
          {
            name: "开户银行",
            value: '4'
          },
          {
            name: "账户名称",
            value: '5'
          },
          {
            name: "银行账户",
            value: '6'
          },
          {
            name: "托号",
            value: '7'
          },
          {
            name: "托收合同号",
            value: '8'
          },
          {
            name: "托号类型",
            value: '9'
          }
        ],
        billInfoData: ['账号编号', '缴费方式', '账户类型', '开户银行', '账户名称', '银行账户', '托号', '托收合同号', '托号类型'],
        userWaterInfo: [
          {
            name: "水表编号",
            value: '1'
          },
          {
            name: "出厂编号",
            value: '2'
          },
          {
            name: "装表地址",
            value: '3'
          },
          {
            name: "装表位置",
            value: '4'
          },
          {
            name: "水表类型",
            value: '5'
          },
          {
            name: "水表用途",
            value: '6'
          },
          {
            name: "用水对象",
            value: '7'
          },
          {
            name: "水表口径",
            value: '8'
          },
          {
            name: "水表厂家",
            value: '9'
          },
          {
            name: "水表型号",
            value: '10'
          },
          {
            name: "新装日期",
            value: '11'
          },
          {
            name: "换表日期",
            value: '12'
          },
          {
            name: "拆表日期",
            value: '13'
          },
          {
            name: "远传通讯费",
            value: '14'
          },
          {
            name: "通讯运营商",
            value: '15'
          },
          {
            name: "通讯费开始日期",
            value: '16'
          },
          {
            name: "通讯费结束日期",
            value: '17'
          },
        ],
        userWaterInfoData: ['水表编号', '出厂编号', '装表地址', '装表位置', '水表类型', '水表用途', '用水对象', '水表口径', '水表厂家', '水表型号', '新装日期', '换表日期', '拆表日期', '远传通讯费', '通讯运营商', '通讯费开始日期', '通讯费结束日期'],
        meterReadInfo: [
          {
            name: "册本号",
            value: '1'
          },
          {
            name: "排序号",
            value: '2'
          },
          {
            name: "抄表日",
            value: '3'
          },
          {
            name: "抄表周期",
            value: '4'
          },
          {
            name: "最后抄码",
            value: '5'
          },
          {
            name: "投递标记",
            value: '6'
          },
          {
            name: "邮政编码",
            value: '7'
          },
          {
            name: "投递备注",
            value: '8'
          },
        ],
        meterReadInfoData: ['册本号', '排序号', '抄表日', '抄表周期', '最后抄码', '投递标记', '邮政编码', '投递备注'],
        userPriceInfo: [
          {
            name: "用水类型",
            value: '1'
          },
          {
            name: "违约金策略",
            value: '2'
          },
          {
            name: "违约金策略开始日期",
            value: '3'
          },
          {
            name: "违约金策略结束日期",
            value: '4'
          },
          {
            name: "用水人口",
            value: '5'
          },
        ],
        userPriceInfoData: ['用水类型', '违约金策略', '违约金策略开始日期', '违约金策略结束日期', '用水人口'],
      },
    }
  },
  mounted() {

  },
  methods: {

  },
  watch: {

  }
}
</script>
<style lang="scss">
.change-config {
  height: 100%;
  .el-date-editor /deep/ .el-input__inner {
    width: 100% !important;
  }
  .el-steps--horizontal {
    margin: 0 auto;
    width: 50%;
    padding-bottom: 20px;
  }
  .el-checkbox{
    margin:10px 15px 10px 15px;
  }
}
</style>