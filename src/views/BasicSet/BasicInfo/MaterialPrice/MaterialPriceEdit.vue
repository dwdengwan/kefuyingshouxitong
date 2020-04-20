
<template>
  <div>
    <div>
      <el-form class="formBill-One" ref="MaterialPriceEditForm" :rules="rules" :inline="true" size="mini" :model="ruleForm" label-width="100px">

        <el-form-item label="材料编号：" prop="matrNo">
          <el-input v-model="ruleForm.matrNo" maxlength="50" clearable placeholder="请输入材料编号">
          </el-input>
        </el-form-item>

        <el-form-item label="材料单价：" prop="matrPrice">
          <el-input v-model.number="ruleForm.matrPrice" maxlength="10" clearable placeholder="请输入材料单价">
          </el-input>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "MaterialPriceEdit",
  data() {
    return {
      ruleForm: {

      },
      formData: {
        matrId: "",
        matrNo: "",
        matrPrice:  "",
      },
      rules: {
        matrNo: [
          { required: true, message: '请选择材料编号', trigger: 'blur' }
        ],
        matrPrice: [
          { required: true, message: '请选择材料单价', trigger: 'blur' },
          { type: 'number', message: '参考价格必须为数字值' }
        ],

      },

    }

  },
  methods: {
    //保存按钮
    resetForm() {
      this.$refs.MaterialPriceEditForm.resetFields();
    },
    submitForm(formName, type) {
      let _this = this;
      let params = {};
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (type === '添加') {

            params = {
              "busicode": "MatrAdd",
              "data": this.ruleForm
            }
          } else {
            this.ruleForm = this.common.handleData(this.ruleForm, this.formData);
            params = {
              "busicode": "MatrUpdate",
              "data": this.ruleForm
            };
          }
          this.$api.fetch({
            params: params,//参数
          }).then(res => {
            _this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success',
            });
            _this.$parent.init();
            _this.$parent.closeDialog();
          })

        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.common.chargeObjectEqual(this, this.ruleForm, 'get', 'MaterialPriceEdit', this.$parent.closeDialog);
    },
    editData(val) {
      this.ruleForm = val;


    }
  },
}
</script>

