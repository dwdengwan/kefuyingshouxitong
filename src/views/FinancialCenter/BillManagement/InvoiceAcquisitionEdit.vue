

<template>
    <div class="InvoiceAcquisitionEdit">

        <el-form class="BillManagementForm" :inline="true" :model="InvoiceAcquisitionEditForm" label-width="160px" ref="ruleForm" :rules="rules">
            <el-form-item label="发票类型：" prop="userNum">
                <el-select  clearable v-model="InvoiceAcquisitionEditForm.userNum" placeholder="水费发票">
                    <el-option  v-for="(item,index) in InvoiceAcquisitionEditForm.invoice" :key="index" :label="item.name" :value="item.value"></el-option>

                </el-select>
            </el-form-item>           
            <el-form-item label="领用人：" prop="PriceStrategy">
                <el-select  clearable v-model="InvoiceAcquisitionEditForm.PriceStrategy" placeholder="">
                    <el-option  v-for="(item,index) in InvoiceAcquisitionEditForm.descoptions" :key="index" :label="item.name" :value="item.value"></el-option>

                </el-select>
            </el-form-item>
            <el-form-item label="发票代码：" prop="isfines">
                <el-input v-model="InvoiceAcquisitionEditForm.isfines" placeholder=""></el-input>

            </el-form-item>

            <el-form-item label="开始号码：" prop="UpdateCodeCopye">
                <el-input v-model="InvoiceAcquisitionEditForm.UpdateCodeCopye" placeholder=""></el-input>

            </el-form-item>

            <el-form-item label="结束号码：" prop="Remarks">
                <el-input v-model="InvoiceAcquisitionEditForm.Remarks" placeholder=""></el-input>

            </el-form-item>
            <el-form-item label="张数：" prop="year">
                <el-input v-model="InvoiceAcquisitionEditForm.year" placeholder="" disabled class="read-only"></el-input>

            </el-form-item>


           
            
        </el-form>

    </div>
</template>
<script>
export default {
    name:"InvoiceAcquisitionEdit",
    data(){
        return{
            InvoiceAcquisitionEditForm:{
                // 查询内容
                backfillInput:[
                    {
                        label:"上期抄表：",
                        value:"2",
                        tips:"165497974"
                    },
                    {
                        label:"抄表日期：",
                        value:"3",
                        tips:""
                    },

                     {
                        label:"用户名称：",
                        value:"4",
                        tips:""
                    },
                    
                    {
                        label:"用户地址：",
                        value:"5",
                        tips:""
                    },
                   
                ],
                invoice:[
                    {
                        name:"水票发票",
                        value:"1"
                    }
                ],
               
                desc:"",
                userNume:"",
                descoptions:[
                     {
                        name:"徐林",
                        value:"1"
                    },
                    {
                        name:"系统管理员",
                        value:"2"
                    },
                    {
                        name:"王敬农",
                        value:"3"
                    },
                    {
                        name:"陈秀梅",
                        value:"4"
                    },
                ],
                userNum:"",
                PriceStrategy:"",
                isfines:"",
                UpdateCodeCopye:"",
                Remarks:"",
                year:""
            },
            rules:{
                userNume:[
                    { required: true, message: '请输入用户编号', trigger: 'blur' },
                ],
                desc:[
                    { required: true, message: '请输入用户编号', trigger: 'blur' },
                ],
                userNum:[
                    { required: true, message: '请输入张数', trigger: 'blur' },
                ],
                PriceStrategy:[
                    { required: true, message: '请输入票据来源', trigger: 'blur' },
                ],
                isfines:[
                    { required: true, message: '请输入开始号码', trigger: 'blur' },
                ],
                UpdateCodeCopye:[
                    { required: true, message: '请输入发票代码', trigger: 'blur' },
                ],
                Remarks:[
                    { required: true, message: '请输入结束号码', trigger: 'blur' },
                ],
                year:[
                    { required: true, message: '请输入年份', trigger: 'blur' },
                ],
            },
            histroyData:{
                
            },
            label:0,
         
    
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){

        },

    }
}
</script>
<style lang="scss">
$theme-font-color:#3680CD;
.InvoiceAcquisitionEdit{

    .BillManagementForm{
        margin-top: 15px;
    }
    .BillManagementForm{
        padding: 10px 20px;
        width: 93%;
        .el-form-item{
            width: 32%;
            margin-bottom: 10px;
            .el-form-item__content{
                width: 48%;
                .el-select,.el-input__inner{
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                }
            }
            .el-input__icon{
                line-height: 30px;
            }
        }
        .Remarks{
            width: 100%;
            .el-form-item__content{
                width:calc(100% - 160px);
            }
        }

    }
    .el-steps--horizontal{
        margin: 0 auto;
        width: 50%;
        padding-bottom: 20px;
    }
    .theme-color .cell{
        color:$theme-font-color;
    }

}
</style>

