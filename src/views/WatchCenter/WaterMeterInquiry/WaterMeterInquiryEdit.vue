<template>
  <div class="water-meter-inquiry">

    <el-form size="mini" class="formBill" :inline="true" :model="formData" label-width="130px" ref="ruleForm" :rules="rules">

      <legend class="legendColumn">基础信息</legend>
      <el-form-item label="水表编号：">
        <el-input class="read-only" disabled="disabled" v-model=" formData.meterNo" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="出厂编号：">
        <el-input class="read-only" disabled="disabled" v-model=" formData.factoryNo" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="水表口径：">
        <el-input class="read-only" disabled="disabled" v-model=" formData.meterBoreName" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="水表厂家：">
        <el-input class="read-only" disabled="disabled" v-model=" formData.meterFactoryName" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="水表形态：">
        <el-input class="read-only" disabled="disabled" v-model=" formData.meterFormName" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="水表类型：">
        <el-input class="read-only" disabled="disabled" v-model=" formData.meterTypeName" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="水表型号：">
        <el-input class="read-only" disabled="disabled" v-model=" formData.meterModelName" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="合格证号：">
        <el-input class="read-only" disabled="disabled" v-model=" formData.meterCert" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="水表状态：">
        <el-input class="read-only" disabled="disabled" v-model=" formData.meterStatusName" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="注册日期：">
        <el-input class="read-only" disabled="disabled" v-model=" formData.billDate" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="用户编号：">
        <el-input class="read-only" disabled="disabled" v-model=" formData.userNo" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="用户名称：">
        <el-input class="read-only" disabled="disabled" v-model=" formData.userName" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="营业所：">
        <el-input class="read-only" disabled="disabled" v-model=" formData.departBelongName" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="远程通讯费：">
        <el-input class="read-only" disabled="disabled" v-model=" formData.transCommFee" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="通讯运营商：">
        <el-input class="read-only" disabled="disabled" v-model=" formData.commOperatorName" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="通讯费开始日期：">
        <el-input class="read-only" disabled="disabled" v-model=" formData.commFeeStart" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="通讯费结束日期：">
        <el-input class="read-only" disabled="disabled" v-model=" formData.commFeeEnd" placeholder=""></el-input>
      </el-form-item>

      <legend class="legendColumn">操作历史</legend>

      <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="tableData.list" class="water-meter-inquiry-table">

          <el-table-column type="index" label="NO." width="50" fixed="left">
          </el-table-column>

          <el-table-column prop="operateType" min-width="100" label="操作类型">
          </el-table-column>

          <el-table-column prop="operateDate" min-width="100" label="操作日期">
          </el-table-column>

          <el-table-column prop="operateStaff" min-width="100" label="操作人">
          </el-table-column>

          <el-table-column prop="createTime" min-width="100" label="建立时间">
          </el-table-column>

          <el-table-column prop="createName" min-width="120" label="建立人">
          </el-table-column>

        </el-table>
      </div>

    </el-form>
  </div>
</template>
<script>
export default {
  name: "water-meter-inquiry",
  props: ['meterId'],
  data() {
    return {
      tableShow: false,
      maxHeight: 0,
      tableData: {},
      formData: {},
      histroyData: {},
      tableQuery: {
        page: 1,
        pageCount: 50
      },
      rules: {},
    };
  },
  mounted() {
    console.log(this.meterId);
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, ".water-meter-inquiry", [
        ".water-meter-inquiry .toolbar",
        ".water-meter-inquiry .block",
        ".water-meter-inquiry #crumbs"
      ]);
    });
  },
  methods: {
    init() {
      this.getFormData()
    },
    // 上半部数据
    getFormData() {
      let _this = this;
      let params = {
        busicode: "MsInfoList",
        data: {
          meterId: _this.meterId
        }
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.formData = res.list[0]
        _this.getTableData()
      })
    },
    // 下半部列表数据
    getTableData() {
      let _this = this;
      let params = {
        busicode: "MsInfoHistoryList",
        data: {
          meterNo: _this.formData.meterNo
        }
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.tableData = res
      })
    },

    //分页
    handleSizeChange(val) {
      //显示多少数据一页
      this.tableQuery.pageCount = val;
      this.tableQuery.page = 1;
      this.init();
    },
    handleCurrentChange(val) {
      //页码点击
      this.tableQuery.page = val;
      this.init();
    },
    // 列表的NO列
    indexMethod(index) {
      return (
        (this.tableQuery.page - 1) * this.tableQuery.pageCount + (index + 1)
      );
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
@import "../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.water-meter-inquiry {
  width: 100%;
  height: 100%;
}
</style>
