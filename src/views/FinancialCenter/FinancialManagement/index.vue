<template>
  <div class="FinancialManagement">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-if="!historyShow">
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
    </div>
    <div class="FinancialManagementCon" v-show="historyShow">
      <ul>
        <li>最后月结账日期：
          <span>2018/03/24</span>
        </li>
        <li>本次月结账日期：
           <el-date-picker
            v-model="closingDateOfMonth"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <!-- <span>2018/04/24</span> -->
        </li>
      </ul>
      <p>账期2018/04/24预存余额为2168876.71元，请核对预收款统计分析报表是否一致！</p>
      <h4>
        <el-button type="primary">月结</el-button>
        <el-button type="primary" @click="history">历史查询</el-button>
      </h4>
    </div>
    <div v-show="!historyShow">
      <AccountPeriod></AccountPeriod>
    </div>
  </div>
</template>
<script>
import AccountPeriod from "./AccountPeriod";
export default {
  name: "FinancialManagement",
  components: {
    AccountPeriod
  },
  data() {
    return {
      closingDateOfMonth:'',
      crumbsData: {
        //面包屑
        titleList: [{ title: "收费管理" }, { title: "月结" }]
      },
      historyShow: true
    };
  },
  methods: {
    history() {
      this.historyShow = false;
      this.$set(this.crumbsData.titleList, "3", {
        title: "历史查询",
        method: () => {
          window.histroy.back();
        }
      });
    },
    closeDialog() {
      this.historyShow = true;
      this.crumbsData.titleList.splice(3, 1);
    }
  }
};
</script>
<style lang="scss">
.FinancialManagement {
  .FinancialManagementCon {
    width: 60%;
    margin: 20px auto;
    .el-input--suffix{
      width: 50% !important;
      .el-input__inner{
        width: 75% !important;
      }
    }
    & > ul {
      padding: 20px;
      width: 100%;
      zoom: 1;
      &::after {
        display: block;
        content: "";
        clear: both;
      }
      & > li {
        width: 50%;
        text-align: center;
        float: left;
        font-size: 18px;
        line-height: 50px;
        &:first-of-type {
          color: #3680cd;
        }
      }
    }
    & > p {
      text-align: center;
      color: #ccc;
      font-size: 16px;
    }
    & > h4 {
      text-align: center;
      padding: 30px;
      .el-button--primary {
        padding: 12px 100px;
      }
    }
  }
}
</style>

