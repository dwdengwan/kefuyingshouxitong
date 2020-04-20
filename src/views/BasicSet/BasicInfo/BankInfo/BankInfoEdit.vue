
<template>
    <div class="BankInfoEdit">
        <el-form class="formBill-One" ref="BankInfoEditForm" :rules="rules" :inline="true" size="mini" :model="ruleForm" label-width="100px">
            <el-form-item label="银行名称：" prop="bankName"> 
                <el-input 
                v-model="ruleForm.bankName" maxlength="50" clearable
                placeholder="请输入银行名称">
                </el-input>
            </el-form-item>
            <el-form-item label="银行行号：" prop="bankNumber">
                <el-input 
                v-model="ruleForm.bankNumber" maxlength="50" clearable
                placeholder="请输入银行行号">
                </el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="linkMan">   
                <el-input 
                v-model="ruleForm.linkMan" maxlength="50" clearable
                placeholder="请输入联系人">
                </el-input>
            </el-form-item>
            <el-form-item label="座机号码：" prop="linkTel">
                <el-input 
                v-model="ruleForm.linkTel" maxlength="50" clearable
                placeholder="请输入座机号码">
                </el-input>
            </el-form-item>
            <el-form-item label="排序号：" prop="sortNo">
                <el-input v-model.number="ruleForm.sortNo" placeholder="排序号"  maxlength="6" clearable ></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="status">
                <el-select v-model="ruleForm.status"  placeholder="请选择状态">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注：" prop="comments">
                <el-input v-model="ruleForm.comments" type="textarea" :rows="3" show-word-limit maxlength="150" placeholder="备注" clearable  ></el-input>
            </el-form-item>
            
        </el-form>
    </div>
</template>
<script>
export default {
    name:"BankInfoEdit",
    data(){
        return{
            ruleForm:{
            },
            formData:{
                bankId:"",
                bankName:'',
                bankNumber:'',
                linkMan:'',
                linkTel:'',
                sortNo:'',
                status:'',
                comments:"",
            },
            rules: {
                bankName: [
                { required: true, message: '请输入银行名称', trigger: 'blur' }
                ],
                bankNumber: [
                { required: true, message: '请输入银行行号', trigger: 'blur' }
                ],
                linkMan: [
                { required: true, message: '请输入联系人', trigger: 'blur' }
                ],
                linkTel: [
                { required: true, message: '请输入座机号码', trigger: 'blur' }
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
        this.$refs.BankInfoEditForm.resetFields();
      },
      submitForm(formName,type,id) {
        let _this = this;
        let params = {};
        
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
             if(type === '添加'){
               this.ruleForm.parentId = id;
               params = {
                  "busicode": "BankAdd",
                  "data": this.ruleForm
              }
             }else{
                this.ruleForm = this.common.handleData(this.ruleForm,this.formData);
               params = {
                  "busicode": "BankUpdate",
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
                if(type === '添加') {
                  _this.$parent.getTreeDatas(); 
                }else{
                    _this.$parent.init();
                }
                
                _this.$parent.closeDialog();   
                
              })
              
          } else {
            return false;
          }
        });
      },
      handleClose() {
        this.common.chargeObjectEqual(this,this.ruleForm,'get','BankInfoEdit',this.$parent.closeDialog);
      },
      editData(val){
        this.ruleForm = val;
      }
    },
}
</script>

