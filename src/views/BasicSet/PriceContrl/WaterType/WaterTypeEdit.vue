
<template>
  <div class="WaterTypeEdit">
    <div>
      <el-form class="formBill-One" ref="WaterTypeEditForm" :rules="rules" :inline="true" size="mini" :model="ruleForm" label-width="100px">

        <el-form-item label="类型名称：" prop="waterTypeName">
          <el-input v-model="ruleForm.waterTypeName" maxlength="50" clearable placeholder="">
          </el-input>
        </el-form-item>

        <el-form-item label="排序号：" prop="sortNo">
          <el-input v-model.number="ruleForm.sortNo" placeholder="排序号" maxlength="6" clearable></el-input>
        </el-form-item>

        <el-form-item label="状态：" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="停用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "WaterTypeEdit",
  data() {
    return {
      ruleForm: {},
      formData: {
        waterTypeId: "",
        waterTypeName: "",
        sortNo: "",
        status: ""
      },
      options1: [
        {
          value: 12,
          label: "居民用水"
        },
        {
          value: 11,
          label: "非居民用水"
        },
        {
          value: 10,
          label: "特种用水"
        }
      ],
      rules: {
        waterTypeName: [
          { required: true, message: "请输入类型名称", trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        sortNo: [
          { required: true, message: "请输入排序号", trigger: "blur" },
          { type: "number", message: "排序号必须为数字值" }
        ]
      }
    };
  },
  methods: {
    //保存按钮
    resetForm() {
      this.$refs.WaterTypeEditForm.resetFields();
    },
    submitForm(formName, type, id) {
      let _this = this;
      let params = {};

      this.$refs[formName].validate(valid => {
        if (valid) {
          if (type === "添加") {
            this.ruleForm.parentId = id;
            params = {
              busicode: "WaterTypeAdd",
              data: this.ruleForm
            };
          } else {
            this.ruleForm = this.common.handleData(
              this.ruleForm,
              this.formData
            );
            params = {
              busicode: "WaterTypeUpdate",
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
              if (type === "添加") {
                _this.$parent.getTreeDatas();
              } else {
                _this.$parent.init();
              }

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
        "WaterTypeEdit",
        this.$parent.closeDialog
      );
    },
    editData(val) {
      this.ruleForm = val;
    }
  }
};
</script>
<style lang="scss">
.WaterTypeEdit {
  height: 100%;
  width: 100%;
}
</style>
