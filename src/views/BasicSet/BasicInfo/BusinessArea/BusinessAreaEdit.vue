
<template>
    <div>
         <div>
            <el-form :inline="true" class="formBill-One" size="mini" ref="BusinessAreaEditForm" :rules="rules" :model="ruleForm" label-width="100px">
                <el-form-item label="网点编号：" prop="branchNo">
                    <el-input v-model="ruleForm.branchNo" placeholder="网点编号"  maxlength="50" clearable  ></el-input>
                </el-form-item>
                <el-form-item label="网点名称：" prop="branchName">
                    <el-input v-model="ruleForm.branchName" placeholder="网点名称"  maxlength="50" clearable ></el-input>
                </el-form-item>
                <el-form-item label="网点坐标：" prop="branchOpsition">
                    <el-input v-model="ruleForm.branchOpsition" placeholder="网点坐标"  maxlength="50" clearable  ></el-input>
                </el-form-item>
                <el-form-item label="网点地址：" prop="branchAddr">
                    <el-input v-model="ruleForm.branchAddr" placeholder="网点地址"  maxlength="200" clearable ></el-input>
                </el-form-item>
                <el-form-item label="营业时间：" prop="businessTime">
                    
                    <el-input v-model="ruleForm.businessTime" type="textarea" :rows="2"  maxlength="200" placeholder="营业时间" clearable ></el-input>
                </el-form-item>
                <el-form-item label="排序号：" prop="sortNo">
                    <el-input v-model.number="ruleForm.sortNo" placeholder="排序号"  maxlength="6" clearable ></el-input>
                </el-form-item>
                <el-form-item label="状态：" prop="status">
                    <el-select v-model="ruleForm.status" placeholder="请选择状态">
                        <el-option label="停用" :value="0"></el-option>
                        <el-option label="启用" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input v-model="ruleForm.comments" type="textarea" :rows="3" show-word-limit maxlength="150" placeholder="备注" clearable  ></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:"BusinessAreaEdit",
    data(){
        return{
            ruleForm:{
                
            },
            formData:{
                id:"",
                branchNo:'',
                branchName:'',
                branchOpsition:'',
                branchAddr:'',
                businessTime:"",
                status:'',
                comments:'',
                sortNo:"",
            },
            rules: {
                branchNo: [
                    { required: true, message: '请输入网点编号', trigger: 'blur' }
                ],
                branchName: [
                    { required: true, message: '请输入网点名称', trigger: 'blur' }
                ],
                branchOpsition: [
                    { required: true, message: '请输入网点坐标', trigger: 'blur' }
                ],
                branchAddr: [
                    { required: true, message: '请输入网点地址', trigger: 'blur' }
                ],
                businessTime: [
                    { required: true, message: '请选择营业时间', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '请输入状态', trigger: 'blur' }
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
        this.$refs.BusinessAreaEditRuleForm.resetFields();
      },
      submitForm(formName) {
        let _this = this;
        let params = {};
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.ruleForm = this.common.handleData(this.ruleForm,this.formData);
             if(this.ruleForm.id){
               params = {
                  "busicode": "BusinessBranchUpdate",
                  "data": this.ruleForm
              }
             }else{
               params = {
                  "busicode": "BusinessBranchAdd",
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
        this.common.chargeObjectEqual(this,this.ruleForm,'get','BusinessAreaEdit',this.$parent.closeDialog);
      },
      editData(val){
        this.ruleForm = val;
      }
    },
}
</script>

