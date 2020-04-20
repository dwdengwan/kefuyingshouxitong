
<template>
    <div class="HolidaySetEdit">
         <div class="backfillSubmitForm">
            <el-form ref="HolidaySetEditForm" class="formBill-One" :rules="rules" :inline="true" size="mini" :model="ruleForm" label-width="100px">
                <el-form-item label="假期名称：" prop="vacationName">
                    <el-input 
                        v-model="ruleForm.vacationName" maxlength="100" clearable
                        placeholder="请输入假期名称">
                    </el-input>
                </el-form-item>

                <el-form-item label="假期时间：">
                    <el-date-picker
                    v-model="time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>

    
                <el-form-item label="假期说明：">
                    <el-input 
                        v-model="ruleForm.vacationComments" show-word-limit maxlength="150" clearable
                        type="textarea"
                        placeholder="请输入假期说明">
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:"HolidaySetEdit",
    data(){
        return{
            ruleForm:{
                vacationName:'',
                vacationBeginDate:'',
                vacationEndDate:'',
                vacationComments:'',
            },
            time:[],
            formData:{
                vacationName:'',
                vacationBeginDate:'',
                vacationEndDate:'',
                vacationComments:'',
                vacationId:"",
            },
            rules: {
                vacationName: [
                    { required: true, message: '请输入假期名称', trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
      //保存按钮
      resetForm() {
        this.$refs.HolidaySetEditForm.resetFields();
      },
      submitForm(formName,type) {
        let _this = this;
        let params = {};
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
             // 点击日期清除按钮time值为null需要处理
            if(this.time===null){
                this.time = ['','']
            }
            this.ruleForm.vacationBeginDate = this.time[0];
            this.ruleForm.vacationEndDate = this.time[1];
             if(type === '添加'){
               
               params = {
                  "busicode": "ConfigVacationAdd",
                  "data": this.ruleForm
              }
             }else{
                this.ruleForm = this.common.handleData(this.ruleForm,this.formData);
               params = {
                  "busicode": "ConfigVacationUpdate",
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
        this.common.chargeObjectEqual(this,this.ruleForm,'get','holidaySetEdit',this.$parent.closeDialog);
      },
      editData(val){
        this.ruleForm = val;
        
        this.$set(this.time,0,this.ruleForm.vacationBeginDate);
        this.$set(this.time,1,this.ruleForm.vacationEndDate);

      }
    },
}
</script>

