
<template>
    <div class="ClosingCollectionPaymentEdit">
        <el-form   class="formBill" size="mini" :inline="true" :model="ruleForm" label-width="130px" ref="ruleForm" :rules="rules">
            <commonPart :parentToChild="'3'"></commonPart>
            <legend class="legendColumn">代收支付关闭信息</legend>
                <el-form-item label="开始日期：" prop="branchOpsition">
                    <el-date-picker
                        v-model="ruleForm.billTime"
                        type="datetime"
                        placeholder="开始日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期：" prop="branchAddr">
                    <el-date-picker
                        v-model="ruleForm.billTime"
                        type="datetime"
                        placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <br>
                <el-form-item label="备注：" class="Remarks">
                    <el-input v-model="ruleForm.comments" type="textarea" :rows="3" show-word-limit maxlength="150" placeholder="备注" clearable  ></el-input>
                </el-form-item>

            <legend class="legendColumn">流程处理</legend>
                <procedure ></procedure>
        </el-form>
    </div>
</template>
<script>
import procedure from "@/components/procedure"//审批
export default {
    name:"ClosingCollectionPaymentEdit",
  components: {
      procedure,
  },
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
        this.$refs.ClosingCollectionPaymentEditRuleForm.resetFields();
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
        this.common.chargeObjectEqual(this,this.ruleForm,'get','ClosingCollectionPaymentEdit',this.$parent.closeDialog);
      },
      editData(val){
        this.ruleForm = val;
      }
    },
}
</script>

<style lang="scss">
.ClosingCollectionPaymentEdit {
  width: 100%;
  height:calc(100% - 41px) ;
  overflow-y: auto
}
</style>