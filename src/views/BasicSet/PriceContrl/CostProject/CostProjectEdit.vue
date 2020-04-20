
<template>
    <div class="CostProjectEdit">
         <div class="backfillSubmitForm">
            <el-form class="CostProjectEditForm" ref="CostProjectEditForm" :rules="rules" :inline="true" size="mini" :model="ruleForm" label-width="100px">
                
                <el-form-item label="费用种类名称：" prop="costName">
                    <el-input 
                    v-model="ruleForm.costName" maxlength="50" clearable
                    placeholder="请输入费用名称">
                    </el-input>
                </el-form-item>
                
                <el-form-item label="费用种类编号：" prop="costNo">
                    <el-input 
                    v-model="ruleForm.costNo" maxlength="50" clearable
                    placeholder="请输入编号">
                    </el-input>
                </el-form-item>
                
                <el-form-item label="参考价格：" prop="consultPrice">
                    <el-input 
                    v-model.number="ruleForm.consultPrice" maxlength="10" clearable
                    placeholder="请输入参考价格">
                    </el-input>
                </el-form-item>

                <el-form-item label="排序号：" prop="sortNo">
                    <el-input v-model.number="ruleForm.sortNo" maxlength="6" clearable
                            placeholder="请输入排序号">
                    </el-input>
                </el-form-item>
                <el-form-item label="状态：" prop="status">
                    <el-select v-model="ruleForm.status" placeholder="请选择状态" clearable>
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input v-model="ruleForm.comments" show-word-limit maxlength="150" clearable
                            placeholder="请输入备注"
                            type="textarea">
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:"CostProjectEdit",
    data(){
        return{
            ruleForm:{
                
            },
            formData:{
                costId:"",
                costName: "",
                costNo: "",
                consultPrice:"",
                comments: "",
                status: '',
                sortNo:''
            },
            rules: {
              costName: [
                  { required: true, message: '请输入费用种类名称', trigger: 'blur' }
              ],
              costNo: [
                  { required: true, message: '请选择费用种类编号', trigger: 'blur' }
              ],
              consultPrice: [
                  { required: true, message: '请选择参考价格', trigger: 'blur' },
                   {type: 'number', message: '参考价格必须为数字值'}
              ],
              status: [
                  { required: true, message: '请选择状态', trigger: 'blur' }
              ],
              sortNo: [
                  { required: true, message: '请输入排序号', trigger: 'blur' },
                  { type: 'number', message: '排序号必须为数字值'}
              ],

          },
 
        }
        
    },
    methods: {
    //保存按钮
    resetForm() {
      this.$refs.CostProjectEditForm.resetFields();
    },
    submitForm(formName,type) {
      let _this = this;
      let params = {};
      this.$refs[formName].validate((valid) => {
        if (valid) {
            if(type === '添加'){
              
              params = {
                "busicode": "CostAdd",
                "data": this.ruleForm
            }
            }else{
              this.ruleForm = this.common.handleData(this.ruleForm,this.formData);
              params = {
                "busicode": "CostUpdate",
                "data": this.ruleForm
            };
            }
            this.$api.fetch({
              params: params,//参数
            }).then(res => {
              _this.$message({
                showClose:true,
                message:'保存成功',
                type:'success',
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
      this.common.chargeObjectEqual(this,this.ruleForm,'get','CostProjectEdit',this.$parent.closeDialog);
    },
    editData(val){
      this.ruleForm = val;
      
      
    }
  },
}
</script>
<style lang="scss">

.CostProjectEdit{
    height: 100%;
  width: 60%;
  margin: 10px auto;
  .backfillSubmitForm{
      margin: 0px;
      width: 100%;
      .el-form-item{
          width:100%;
          .el-form-item__content{
              width: calc(100% - 100px);
          }
      }
      .el-input--mini /deep/ .el-input__inner,.el-select{
              width: 100%;
      }
  }
}
</style>
