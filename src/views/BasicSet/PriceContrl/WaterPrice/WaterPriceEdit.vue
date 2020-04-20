
<template>
  <div class="WaterPriceEdit">

      <el-form :inline="true" ref="WaterPriceEditFrom" class="formBill" :rules="rules" size="mini" :model="ruleForm" label-width="130px">
        <el-form-item label='用水类型：' prop="useWaterType">
          <el-cascader :props="props" :options="useWaterTypeOptions" :show-all-levels="false" clearable v-model="ruleForm.useWaterType"></el-cascader>
        </el-form-item>

        <el-form-item label='生效日期：' prop="effectiveDate">
          <el-date-picker v-model="ruleForm.effectiveDate" type="date" placeholder="生效日期" clearable format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label='截至日期：' prop="expiryDate">
          <el-date-picker v-model="ruleForm.expiryDate" type="date" placeholder="截至日期" clearable format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="状态：" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择状态" clearable>
            <el-option label="启用" :value="1"></el-option>
            <el-option label="停用" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <legend class="legendColumn">水费</legend>
          <el-form-item label="违约金策略：" prop="detailName">
            <el-input v-model="ruleForm.detailName" placeholder="请输入策略名称"></el-input>
          </el-form-item>

          <el-form-item label="阶梯类型：" prop="ladderType">
            <el-select v-model="ruleForm.ladderType" placeholder="请选择阶梯类型">
              <el-option v-for="(item,index) in ladderTypeOptions" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="计算单位：" prop="calculateUnit">
            <el-select v-model="ruleForm.calculateUnit" placeholder="请选择状态">
              <el-option label="按户" :value="1"></el-option>
              <el-option label="按人" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="人口基数：" prop="personBase">
            <el-input v-model.number="ruleForm.personBase" placeholder="请输入人口基数" maxlength="1" clearable></el-input>
          </el-form-item>

          <el-form-item label="水量基数：" prop="waterBase">
            <el-input v-model.number="ruleForm.waterBase" placeholder="请输入水量基数" maxlength="1" clearable></el-input>
          </el-form-item>

          <div class="kl-table">
            <div class='table-content'>
              <font>阶梯明细</font>
              <el-button-group class="add-line">
                <el-button type="info" size="mini"  icon="el-icon-plus" ></el-button>
              </el-button-group>
            </div>
            <el-table stripe border v-if="tableShow" :max-height="maxHeight" :data="ruleForm.ladderlist" class="wuserInfo-table">

              <el-table-column type="index" label="NO." width="50">
              </el-table-column>

              <el-table-column prop="beginWater" min-width="100" label="开始水量">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.beginWater" type="number" maxlength="10" clearable placeholder="请输入开始水量">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="endWater" min-width="100" label="结束水量">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.endWater" type="number" maxlength="10" clearable placeholder="请输入结束水量">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="price" min-width="100" label="单价">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.price" type="number" maxlength="10" clearable step="0.0001" placeholder="请输入单价">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="coefficient" min-width="100" label="系数">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.coefficient" type="number" maxlength="10" clearable step="0.0001" placeholder="请输入系数">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="ladderBeginMoney" min-width="100" label="阶段起始金额">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.ladderBeginMoney" type="number" maxlength="14" clearable step="0.0001" placeholder="请输入阶段起始金额">
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
        <legend class="legendColumn">污水费</legend>
            
          <el-form-item label="违约金策略：" prop="detailName">
            <el-input v-model="ruleForm.detailName" placeholder="请输入策略名称"></el-input>
          </el-form-item>

          <el-form-item label="阶梯类型：" prop="ladderType">
            <el-select v-model="ruleForm.ladderType" placeholder="请选择阶梯类型">
              <el-option v-for="(item,index) in ladderTypeOptions" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="计算单位：" prop="calculateUnit">
            <el-select v-model="ruleForm.calculateUnit" placeholder="请选择状态">
              <el-option label="按户" :value="1"></el-option>
              <el-option label="按人" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="人口基数：" prop="personBase">
            <el-input v-model.number="ruleForm.personBase" placeholder="请输入人口基数" maxlength="1" clearable></el-input>
          </el-form-item>

          <el-form-item label="水量基数：" prop="waterBase">
            <el-input v-model.number="ruleForm.waterBase" placeholder="请输入水量基数" maxlength="1" clearable></el-input>
          </el-form-item>


          <div class="kl-table">
            <div class='table-content'>
              <font>阶梯明细</font>
              <el-button-group class="add-line">
                <el-button type="info" size="mini"  icon="el-icon-plus" ></el-button>
              </el-button-group>
            </div>
            <el-table stripe border v-if="tableShow" :max-height="maxHeight" :data="ruleForm.ladderlist" class="wuserInfo-table">

              <el-table-column type="index" label="NO." width="50">
              </el-table-column>

              <el-table-column prop="beginWater" min-width="100" label="开始水量">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.beginWater" type="number" maxlength="10" clearable placeholder="请输入开始水量">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="endWater" min-width="100" label="结束水量">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.endWater" type="number" maxlength="10" clearable placeholder="请输入结束水量">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="price" min-width="100" label="单价">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.price" type="number" maxlength="10" clearable step="0.0001" placeholder="请输入单价">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="coefficient" min-width="100" label="系数">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.coefficient" type="number" maxlength="10" clearable step="0.0001" placeholder="请输入系数">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="ladderBeginMoney" min-width="100" label="阶段起始金额">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.ladderBeginMoney" type="number" maxlength="14" clearable step="0.0001" placeholder="请输入阶段起始金额">
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

      </el-form>

  </div>
</template>
<script>
export default {
  name: "WaterPriceEdit",
  data() {
    return {
      ruleForm: {
        ladderlist: []
      },
      formData: {
        waterPriceId: "",
        useWaterType: "",
        penaltyStrategy: "",
        effectiveDate: "",
        expiryDate: "",
        status: "",
        ladderlist: []
      },
      detailNameOptions: {}, //明细名称
      useWaterTypeOptions: [], //用水类型
      penaltyStrategyOptions: [], //违约金策略
      rules: {
        useWaterType: [
          { required: true, message: "请选择用水类型", trigger: "blur" }
        ],
        penaltyStrategy: [
          { required: true, message: "请选择违约金策略", trigger: "blur" }
        ],
        effectiveDate: [
          { required: true, message: "请选择生效日期", trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      list: {
        costDetailId: ""
      },
      editList: {
        costDetailId: "",
        waterPriceDetailId: ""
      },
      maxHeight: 0,
      tableShow: false,
      // 级联选择器
      props: {
        label: "name",
        children: "children",
        value: "name",
        checkStrictly: true
      }
    };
  },
  mounted() {
    this.getData();
    this.$nextTick(() => {
      this.common.changeTable(this, ".WaterPriceEdit", [
        ".WaterPriceEdit .WaterPriceEditFrom"
      ]);
    });
  },
  methods: {
    // 获取下拉框数据
    getData() {
      let _this = this;
      //用水类型
      this.$api
        .fetch({
          params: {
            busicode: "WaterTypeNameSelect",
            data: {}
          } //参数
        })
        .then(res => {
          _this.useWaterTypeOptions = _this.treeData(res);
        });
      //违约金策略
      this.$api
        .fetch({
          params: {
            busicode: "StrategyNameSelect",
            data: {}
          } //参数
        })
        .then(res => {
          _this.penaltyStrategyOptions = res;
        });
    },
    //保存按钮
    resetForm() {
      this.$refs.WaterPriceEditFrom.resetFields();
    },
    submitForm(formName, type) {
      let _this = this;
      let params = {};
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            Object.prototype.toString.call(this.ruleForm.useWaterType) ==
            "[object Array]"
          ) {
            if (this.ruleForm.useWaterType.length > 0) {
              let leng = this.ruleForm.useWaterType.length;
              this.ruleForm.useWaterType = this.ruleForm.useWaterType[leng - 1];
            } else {
              this.ruleForm.useWaterType = "";
            }
          }
          debugger;
          if (type === "添加") {
            this.ruleForm.ladderlist = this.common.handleData(
              this.ruleForm.ladderlist,
              this.list
            );

            params = {
              busicode: "WaterPriceAdd",
              data: this.ruleForm
            };
          } else {
            this.ruleForm.ladderlist = this.common.handleData(
              this.ruleForm.ladderlist,
              this.editList
            );
            this.ruleForm = this.common.handleData(
              this.ruleForm,
              this.formData
            );
            params = {
              busicode: "WaterPriceUpdate",
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
        "WaterPriceEdit",
        this.$parent.closeDialog
      );
    },
    editData(val) {
      this.ruleForm = val;
    },
    // 选择明细名称
    detailChange(num, val) {
      debugger;
      _this.$set(_this.ruleForm.ladderlist, num, res);
      // let _this = this;
      // this.$api.fetch({
      //     params: {
      //         "busicode": "CostDetailSelect",
      //         "data": {
      //             detailName:val.detailName
      //         },
      //     },//参数

      // }).then(res => {
      //     _this.$set(_this.ruleForm.ladderlist,num,res);

      // })
    },
    //  用水类型数据处理（过滤掉children为空）
    treeData(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children) {
          if (data[i].children.length === 0) {
            data[i].children = undefined;
          } else {
            this.treeData(data[i].children);
          }
        }
      }
      return data;
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
.WaterPriceEdit {
    height: calc(100% - 20px);
    width: 100%;
    margin: 0 auto;
    padding: 10px 0px;
    overflow-y: auto;
    .table-content{
      height: 30px;
      background: #f3f5fb;
      padding: 5px 0px 0px 0px;
      font{
        font-weight: 700;
        padding: 5px 20px;
        font-size: 12px;
        margin-bottom: 5px;
      }
      .add-line {
        float: right;
        margin-right: 20px;
        // margin-bottom: 5px;
        .el-button--info{
          background-color: #b5bac3;
          border-color: #b5bac3;
        }
      }
    }
}
</style>
