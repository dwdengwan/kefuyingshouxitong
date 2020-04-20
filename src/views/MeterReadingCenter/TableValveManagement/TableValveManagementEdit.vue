
<template>
    <div class="TableValveManagementEdit">
        <el-form :inline="true" class="formBill-One" size="mini" ref="TableValveManagementEditForm" :rules="rules" :model="ruleForm" label-width="100px">
            <el-form-item label="用户编号：" prop="branchNo">
                <el-input v-model="ruleForm.branchNo" placeholder="用户编号"  maxlength="50" clearable  ></el-input>
            </el-form-item>
            <el-form-item label="用户名称：" prop="branchName">
                <el-input v-model="ruleForm.branchName" placeholder="用户名称"  maxlength="50" clearable ></el-input>
            </el-form-item>
            <el-form-item label="装表地址：" prop="branchOpsition">
                <el-input v-model="ruleForm.branchOpsition" placeholder="装表地址"  maxlength="50" clearable  ></el-input>
            </el-form-item>
            <el-form-item label="阀门状态：" prop="branchAddr">
                <el-input v-model="ruleForm.branchAddr" placeholder="阀门状态"  maxlength="200" clearable ></el-input>
            </el-form-item>
            <el-form-item label="是否通知：" prop="status">
                <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox label="通知（用户缴费后，是否通知抄表员）" name="type"></el-checkbox>
                    <el-checkbox label="不通知" name="type"></el-checkbox>
                    
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="开关人员：" prop="branchAddr">
                <el-input v-model="ruleForm.branchAddr" placeholder="开关人员"  maxlength="200" clearable ></el-input>
            </el-form-item>
            <el-form-item label="开关时间：" prop="sortNo">
                <el-date-picker
                    v-model="ruleForm.billTime"
                    type="dete"
                    placeholder="开关时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input v-model="ruleForm.comments" type="textarea" :rows="3" show-word-limit maxlength="150" placeholder="备注" clearable  ></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name:"TableValveManagementEdit",
    data(){
        return{
            ruleForm:{
                type:[],
            },
            formData:{
                businessBranchId:"",
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
                    { required: true, message: '请输入用户编号', trigger: 'blur' }
                ],
                branchName: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' }
                ],
                branchOpsition: [
                    { required: true, message: '请输入用户坐标', trigger: 'blur' }
                ],
                branchAddr: [
                    { required: true, message: '请输入用户地址', trigger: 'blur' }
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
        this.$refs.TableValveManagementEditRuleForm.resetFields();
      },
      submitForm(formName,type) {
        let _this = this;
        let params = {};
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.ruleForm = this.common.handleData(this.ruleForm,this.formData);
             if(type === '添加'){
               
               params = {
                  "busicode": "BusinessBranchAdd",
                  "data": this.ruleForm
              }
             }else{
               params = {
                  "busicode": "BusinessBranchUpdate",
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
        this.common.chargeObjectEqual(this,this.ruleForm,'get','TableValveManagementEdit',this.$parent.closeDialog);
      },
      editData(val){
        this.ruleForm = val;
      }
    },
}
</script>

