
<template>
    <div>
         <div>
            <el-form class="formBill-One" ref="WaterMeterfacturerEditForm" :rules="rules" :inline="true" size="mini" :model="ruleForm" label-width="100px">
                
                <el-form-item label="厂家名称：" prop="factoryName">
                      <el-input v-model="ruleForm.factoryName" maxlength="50" clearable
                                placeholder="请输入厂家名称">
                      </el-input>
                    </el-form-item>
       
                    <el-form-item label="厂家全称：" prop="factoryFullName">
                      <el-input v-model="ruleForm.factoryFullName" maxlength="200" clearable
                                placeholder="请输入厂家全称">
                      </el-input>
                    </el-form-item>
       
                    <el-form-item label="厂家地址：" prop="factoryAddr">
                      <el-input v-model="ruleForm.factoryAddr" maxlength="200" clearable
                                placeholder="请输入厂家地址">
                      </el-input>
                    </el-form-item>
       
                    <el-form-item label="联系人：" prop="linkMan">
                      <el-input v-model="ruleForm.linkMan" maxlength="50" clearable
                                placeholder="请输入联系人">
                      </el-input>
                    </el-form-item>
       
                    <el-form-item label="座机号码：" prop="linkTel">
                      <el-input v-model="ruleForm.linkTel" maxlength="50" clearable
                                placeholder="请输入座机号码">
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
    name:"WaterMeterfacturerEdit",
    data(){
        return{
          ruleForm:{
          },
          formData:{
            factoryId:"",
            factoryName:'',
            factoryFullName:'',
            factoryAddr:'',
            linkMan:'',
            linkTel:"",
            status:'',
            sortNo:'',
            comments:'',
          },
          rules: {
                factoryName: [
                    { required: true, message: '请输入厂家名称', trigger: 'blur' }
                ],
                factoryFullName: [
                    { required: true, message: '请输入厂家全称', trigger: 'blur' }
                ],
                factoryAddr: [
                    { required: true, message: '请输入厂家地址', trigger: 'blur' }
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
        this.$refs.WaterMeterfacturerEditForm.resetFields();
      },
      submitForm(formName,type) {
        let _this = this;
        let params = {};
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
              
             if(type === '添加'){
               
               params = {
                  "busicode": "MeterFactoryAdd",
                  "data": this.ruleForm
              }
             }else{
                this.ruleForm = this.common.handleData(this.ruleForm,this.formData);
               params = {
                  "busicode": "MeterFactoryUpdate",
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
        this.common.chargeObjectEqual(this,this.ruleForm,'get','WaterMeterfacturerEdit',this.$parent.closeDialog);
      },
      editData(val){
        this.ruleForm = val;
      }
    },
}
</script>

