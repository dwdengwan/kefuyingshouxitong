<template>
  <div class="WaterConsumptionAnalysis">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right">
        <el-button size="mini" type="primary" icon="el-icon-upload2">导出</el-button>
      </div>
    </div>

    <el-tabs @tab-click="tabClick" class='tabsBlock' type="border-card">
      <el-tab-pane label="用户用水分析">
        <span slot="label"><i class="el-icon-user"></i> 用户用水分析</span>
        <PrecedenceTable></PrecedenceTable>
      </el-tab-pane>
      <el-tab-pane label="客户用水分析">
        <span slot="label"><i class="el-icon-user"></i> 客户用水分析</span>
        <CustomTable></CustomTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import PrecedenceTable from "./PrecedenceTable";
import CustomTable from "./CustomTable";
import BigUsers from "./BigUsers";
export default {
  name: "WaterConsumptionAnalysis",
  components: {
    PrecedenceTable,
    CustomTable,
    BigUsers
  },
  data() {
    return {
      EditVisible: "tab-1",
      crumbsData: {
        //面包屑
        titleList: [
          // { title: '业务管理', path: '/MeterReadingCenter' },
          { title: "抄表开账" },
          { title: "统计" },
          { title: "用水分析" }
        ]
      }
    };
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, ".WaterConsumptionAnalysis .kl-table", [
      ".WaterConsumptionAnalysis .toolbar",
      ".WaterConsumptionAnalysis .block",
      ".WaterConsumptionAnalysis bread-contain"
    ]);
  },
  methods: {
    tabClick(tab, event) {
      // this.$set(this.crumbsData.titleList,"3",{title:tab.label,method:()=>{window.histroy.back()}});

      if (tab.label == "tab-1") {
        this.EditVisible = true;
      } else {
        this.EditVisible = false;
      }
    }
  },
  watch: {
    maxHeight() {
      this.tableShow = false;
      this.$nextTick(() => {
        this.tableShow = true;
      });
    }
  }
};
</script>
<style lang="scss">
.WaterConsumptionAnalysis {
  width: 100%;
  height: 100%;
  .tabsBlock {
    height: calc(100% - 42px);
    .el-tabs--border-card {
      border: 1px solid #eaf4ff;
    }
  }

  .el-tabs__conten {
    padding: 5px;
  }
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 8px;
  }
  .kl-table {
    padding: 0px 5px;
    .block {
      text-align: right;
      padding: 10px 0px;
    }
  }
  .btnBox {
    display: inline-block;
    width: 100%;
    text-align: center;
    margin-bottom: 2%;
  }
  .btnBox .el-button {
    margin-left: 2%;
    font-size: 14px;
  }
  .longinput .el-input__inner {
    width: 160px;
  }
}
</style>
