<template>
    <div class="NotificationRules">
        <div class="bread-contain">
            <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
            <div class="bread-contain-right">
                <el-button size="mini" type="primary" @click="submitForm('NotificationRulesForm')">保存</el-button>
            </div>
      </div>
        <el-form :inline="true" size="mini" ref="NotificationRulesForm" :rules="rules" :model="ruleForm"  label-width="100px">
            <el-form-item label="欠费通知：" prop="violateDay">
                <el-select v-model="ruleForm.noticeType" placeholder="请选择欠费">
                    <el-option label="违约前" :value="1"></el-option>
                    <el-option label="违约后" :value="2"></el-option>
                </el-select>
                <el-input v-model.number="ruleForm.violateDay" type="number" maxlength="6" clearable></el-input>天
            </el-form-item>
            <el-form-item label="水费通知：" prop="openAccountAfterDay">
                开账后<el-input v-model.number="ruleForm.openAccountAfterDay" type="number" maxlength="6" clearable></el-input>天
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name:"NotificationRules",
    data(){
        return{
            ruleForm:{
                chargeNoticeId:"",
                noticeType:1,
                violateDay:"",
                openAccountAfterDay:"",
            },
            formData:{
                chargeNoticeId:"",
                noticeType:1,
                violateDay:"",
                openAccountAfterDay:"",
            },
            rules:{
                violateDay: [
                    { required: true, message: '请输入欠费通知天数', trigger: 'blur' },
                    { type: 'number', message: '欠费通知天数必须为数字值'}
                ],
                openAccountAfterDay: [
                    { required: true, message: '请输入水费通知天数', trigger: 'blur' },
                    { type: 'number', message: '水费通知天数必须为数字值'}
                ],
            },
            crumbsData: {  //面包屑
                titleList: [
                // { title: '系统设置', path: '/BusinessArea' },
                { title: '其他配置' },
                { title: '通知规则配置' }
                ],
            },
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        getData(){
            let _this = this;
            //欠费通知
            this.$api.fetch({
            params: {
                "busicode": "ChargeNoticeList",
                "data": {},
            },//参数
            
            }).then(res => {
                _this.ruleForm = res;
                
            })
        },
        resetForm() {
            this.$refs.NotificationRulesForm.resetFields();
        },
        //保存按钮
        submitForm(formName,type) {
            let _this = this;
            let params = {};
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm = this.common.handleData(this.ruleForm,this.formData);
                    params = {
                        "busicode": "ChargeNoticeUpdate",
                        "data": this.ruleForm
                    }
                    this.$api.fetch({
                        params: params,//参数
                        }).then(res => {
                        _this.$message({
                            showClose:true,
                            message:'保存成功',
                            type:'success',
                        }); 
                    })
                    
                } else {
                return false;
                }
            });
        },
    }
}
</script>
<style lang="scss">
.NotificationRules{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .el-form {
        width: 80%;
        margin: 10px auto;
        height: calc(100% - 20px);
        .el-form-item__label{
            font-size: 14px;
        }
        .el-form-item{
            width: 100%;
            margin-right: 0px;
            .el-form-item__content{
                width: calc(100% - 100px);
                .el-select,.el-input{
                    width: 25% !important;
                    margin-right: 15px;
                    .el-input{ 
                        width: 100% !important;
                    }
                    
                }
                .el-input{
                    width: 25% !important;
                    margin-left: 15px;
                    .el-input__inner{
                        width: 100% !important;
                    }
                }
            }
        }
    }
}
</style>
