
<template>
  <div class="CheapStrategyEdit">
    <div class="backfillSubmitForm">
      <div class="toolbar">
        <div class="form-left">
          <div class="info">
            <div class="toolbar-line"></div>策略信息
          </div>
        </div>
      </div>
      <el-form class="formBill-Two" :inline="true" size="mini" ref="CheapStrategyEditForm" :rules="rules" :model="ruleForm" label-width="100px">

        <el-form-item label="策略名称：" prop="strategyName">
          <el-input v-model="ruleForm.strategyName" placeholder="请输入策略名称"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择状态" clearable>
            <el-option label="启用" :value="1"></el-option>
            <el-option label="停用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="ruleForm.comments" show-word-limit maxlength="150" clearable placeholder="请输入备注" type="textarea">
          </el-input>
        </el-form-item>
      </el-form>

      <div class="toolbar">
        <div class="form-left">
          <div class="info">
            <div class="toolbar-line"></div>优惠明细
          </div>
        </div>
        <div class="form-right">
        </div>
      </div>

      <el-table stripe border v-if="tableShow" :max-height="maxHeight" :data="ruleForm.prefStrategylList" class="wuserInfo-table">

        <el-table-column type="index" label="NO." width="50">
        </el-table-column>

        <el-table-column prop="costName" min-width="80" label="费用名称">
          <template slot-scope="scope">
            <el-select v-model="scope.row.costName" placeholder="请选择费用名称">
              <el-option v-for="(item, index) in costNameOptions" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column prop="minRange" min-width="100" label="最小生效范围">
          <template slot-scope="scope">
            <el-input v-model="scope.row.minRange" type="number" maxlength="10" clearable placeholder="请输入最小生效范围">
            </el-input>
          </template>
        </el-table-column>

        <el-table-column prop="maxRange" min-width="100" label="最大生效范围">
          <template slot-scope="scope">
            <el-input v-model="scope.row.maxRange" type="number" maxlength="10" clearable placeholder="请输入最大生效范围">
            </el-input>
          </template>
        </el-table-column>

        <el-table-column prop="prefWay" min-width="100" label="优惠类型">
          <template slot-scope="scope">
            <el-select v-model="scope.row.prefWay" placeholder="请选择优惠类型">
              <el-option v-for="(item, index) in prefWayOptions" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column prop="prefValue" min-width="100" label="优惠值">
          <template slot-scope="scope">
            <el-input v-model="scope.row.prefValue" type="number" maxlength="14" clearable step="0.0001" placeholder="请输入优惠值">
            </el-input>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button type="text" @click.native="deleteRow(scope.$index, scope.row)" style="font-size:12px;">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "CheapStrategyEdit",
  data() {
    return {
      ruleForm: {},
      formData: {
        prefStrategyId: "",
        strategyName: "",
        status: "",
        comments: "",
        prefStrategylList: []
      },
      costNameOptions: [], //费用名称
      prefWayOptions: [], //优惠类型
      rules: {
        strategyName: [
          { required: true, message: "请输入策略名称", trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      maxHeight: 0,
      tableShow: false
    };
  },
  mounted() {
    this.getData();
    this.$nextTick(() => {
      this.common.changeTable(this, ".CheapStrategyEdit", [
        ".CheapStrategyEdit .backfillSubmitForm"
      ]);
    });
  },
  methods: {
    // 获取下拉框数据
    getData() {
      let _this = this;
      //费用名称
      this.$api
        .fetch({
          params: {
            busicode: "CostNameSelect",
            data: {}
          } //参数
        })
        .then(res => {
          _this.costNameOptions = res;
        });
      //优惠类型
      this.$api
        .fetch({
          params: {
            busicode: "DictionarySelect",
            data: "SPT"
          } //参数
        })
        .then(res => {
          _this.prefWayOptions = res;
        });
    },
    resetForm() {
      this.$refs.CheapStrategyEditForm.resetFields();
    },
    //保存按钮
    submitForm(formName, type) {
      let _this = this;
      let params = {};
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (type === "添加") {
            params = {
              busicode: "PrefStrategyAdd",
              data: this.ruleForm
            };
          } else {
            this.ruleForm = this.common.handleData(
              this.ruleForm,
              this.formData
            );
            params = {
              busicode: "PrefStrategyUpdate",
              data: this.ruleForm
            };
          }
          this.$api
            .fetch({
              params: params //参数
            })
            .then(res => {
              _this.$message({
                showClose: true,
                message: "保存成功",
                type: "success"
              });
              _this.$parent.init();
              _this.$parent.closeDialog();
            });
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.common.chargeObjectEqual(
        this,
        this.ruleForm,
        "get",
        "CheapStrategyEdit",
        this.$parent.closeDialog
      );
    },
    editData(val) {
      this.ruleForm = val;
    },
    // 添加行
    addRow() {
      this.ruleForm.prefStrategylList.push({
        costName: "",
        minRange: "",
        maxRange: "",
        prefWay: "",
        prefValue: ""
      });
    },
    // 删除行
    deleteRow(index, row) {
      this.$confirm("是否确认删除该行?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.ruleForm.prefStrategylList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
@import "../../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.CheapStrategyEdit {
  height: 100%;
  width: 95%;
  margin: 0 auto;
  .backfillSubmitForm {
    .el-input--mini /deep/ .el-input__inner {
      width: 100%;
    }
    .toolbar-line {
      width: 4px;
      background: #c4d600;
      border-radius: 4px;
      height: 1.5rem;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
    .info {
      margin: 10px 0px;
      // background: #f5f5f5;
      font-weight: 700;
      color: #000;
      height: 1.5rem;
      line-height: 1.5rem;
      padding: 0 1rem;
      font-size: 14px;
    }
  }
}
</style>
