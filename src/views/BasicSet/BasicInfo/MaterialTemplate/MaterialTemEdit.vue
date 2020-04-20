

<template>
    <div class="MaterialTemEdit">
         <div class="backfillSubmitForm">
            <div  class="toolbar">
                    <div class="form-left">
                        <div class="info"><div class="toolbar-line"></div>模板信息</div>
                    </div>
                </div>
            <el-form :inline="true" class="formBill-Two" size="mini" ref="MaterialTemEditForm" :rules="rules" :model="ruleForm" label-width="100px">


                <el-form-item label="模板名称：" prop="templateName">
                    <el-input v-model="ruleForm.templateName" maxlength="50" clearable  placeholder="请输入模板名称"></el-input>
                </el-form-item>
                <el-form-item label="材料数量：" prop="matrNum">
                    <el-input v-model.number="ruleForm.matrNum" maxlength="10" clearable
                        placeholder="请输入材料数量">
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



                <div  class="toolbar">
                    <div class="form-left">
                        <div class="info"><div class="toolbar-line"></div>模板明细</div>
                    </div>
                    <div class="form-right">
                        <!-- <el-button icon="el-icon-plus" type="primary" size='mini'>增加费用阶梯</el-button> -->
                    </div>
                </div>

             <el-table
                    stripe border
                    :data="ruleForm.ladderlist"
                    class="wuserInfo-table">

              <el-table-column type="index" label="NO." width="50">
              </el-table-column>

              <el-table-column prop="matrNo" min-width="100" label="材料编号">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.matrNo"
                    placeholder="请输入材料编号">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="matrName" min-width="100" label="材料名称">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.matrName"
                    placeholder="请输入材料名称">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="matrMode" min-width="100" label="材料规格">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.matrMode"
                    placeholder="请输入材料规格">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="matrNum" min-width="100" label="材料数量">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.matrNum"
                    placeholder="请输入材料数量">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="matrUnit" min-width="100" label="材料单位">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.matrUnit"
                    placeholder="请输入材料单位">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column label="操作" width="70">
                <template slot-scope="scope">
                  <el-button type="text" @click.native="deleteRow(scope.$index, scope.row)" style="font-size:12px;">删除</el-button>
                </template>
              </el-table-column>

            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    name:"MaterialTemEdit",
    data(){
        return{

          ruleForm:{
            ladderlist:[],
          },
          formData:{
            templateId:"",
            templateName:"",
            matrNum:"",
            matrMoney:"",
            status: "",
            sortNo:'',
            comments: "",
            ladderlist:[],
          },
          rules: {
              templateName: [
                  { required: true, message: '请输入模板名称', trigger: 'blur' }
              ],
              matrNum: [
                  { required: true, message: '请输入材料数量', trigger: 'blur' },
                  { type: 'number', message: '材料数量必须为数字值'}
              ],
              matrMoney: [
                  { required: true, message: '请输入材料总价', trigger: 'blur' },
                  { type: 'number', message: '材料总价必须为数字值'}
              ],
              sortNo: [
                  { required: true, message: '请输入排序号', trigger: 'blur' },
                  { type: 'number', message: '排序号必须为数字值'}
              ],
              status: [
                  { required: true, message: '请选择状态', trigger: 'blur' }
              ],
              matrNo: [
                  { required: true, message: '请输入材料编号', trigger: 'blur' }
              ],
              matrName: [
            { required: true, message: '请输入材料名称', trigger: 'blur' }
             ],
              matrMode: [
                  { required: true, message: '请输入材料规格', trigger: 'blur' }
              ],
              matrNum: [
                  { required: true, message: '请输入材料数量', trigger: 'blur' }
              ],
              matrUnit: [
                  { required: true, message: '请输入材料单位', trigger: 'blur' }
              ],
              matrPrice: [
                  { required: true, message: '请输入材料单价', trigger: 'blur' }
              ],
              matrMoney: [
                  { required: true, message: '材料总价不能为空', trigger: 'blur' }
              ]
          },
        }
    },
    methods: {
        add(){
            this.ruleForm.ladderlist.push({
                matrNo:"",
                matrName:"",
                matrMode:"",
                matrNum:"",
                matrUnit:"",
                matrPrice:"",
                matrMoney:"",
            })
        },
        // 删除行
        deleteRow(index, row){
            this.$confirm('是否确认删除该行?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.ruleForm.ladderlist.splice(index,1)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        resetForm() {
            this.$refs.MaterialTemEditForm.resetFields();
        },
        //保存按钮
        submitForm(formName,type) {
            let _this = this;
            let params = {};
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(type === '添加'){

                    params = {
                        "busicode": "GetMatrTemplateAdd",
                        "data": this.ruleForm
                    }
                    }else{
                    this.ruleForm = this.common.handleData(this.ruleForm,this.formData);
                    params = {
                        "busicode": "GetMatrTemplateUpdate",
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
            this.common.chargeObjectEqual(this,this.ruleForm,'get','MaterialTemEdit',this.$parent.closeDialog);
        },
        editData(val){
            this.ruleForm = val;

        },

    },
}
</script>
<style lang="scss">
 @import "../../../../assets/styles/scss/base/fn";
  $imgWidth: 200px;
$theme-color:#297acc;
.MaterialTemEdit{
    height: 100%;
    width: 95%;
    margin: 0 auto;
    .backfillSubmitForm{
        .toolbar-line{
          width: 4px;
          background: #c4d600;
          border-radius: 4px;
          height: 1.5rem;
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
        }
      .info{
        margin:10px 0px;
        font-weight: 700;
        color:#000;
        height: 1.5rem;
        line-height: 1.5rem;
        padding:0 1rem;
        font-size: 14px;
      }
    }
}
</style>
