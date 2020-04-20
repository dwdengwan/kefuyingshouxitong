<template>
    <div class="ScoringQuestions">
        <!-- <div class="backfillSubmitForm"> -->
        <!-- 评分题 -->
        <div v-if="questionType==1">
            <el-form class="basicInfoForm" :inline="true" :model="ScoringQuestionsForm" label-width="100px" ref="ruleForm">
                <el-form-item label="问题名称：">
                    <el-input
                        v-model="ScoringQuestionsForm.scQName" class="searchInput" placeholder="请输入问题名称"></el-input>
                </el-form-item>
                <!-- <br> -->
                <el-form-item label="必选题：">
                <el-radio v-model="ScoringQuestionsForm.scCusTemplate" label="1">是</el-radio>
                    <el-radio v-model="ScoringQuestionsForm.scCusTemplate" label="2">否</el-radio>
                </el-form-item>
            </el-form>
            <div class="kl-table">
                <div class="toolbar">
                    <div class="form-left">
                        <div class="toolbar-line"></div>
                        <div class="toolbar-font">问题选项</div>
                    </div>
                    <div class="form-right">
                        <el-button  @click="add" size="mini" icon="el-icon-plus" type="primary">添加行</el-button>
                    </div>
                </div>
                <el-table       
                    stripe
                    border
                    center
                    :data="ScoringTableData.list"
                    class="change-tables-table">

                    <el-table-column 
                        type="index" 
                        label="NO."
                        fixed="left"
                        width="50"  >
                    </el-table-column>

                    <el-table-column
                        prop="questionCon"
                        min-width="200"
                        label="问题选项">
                        
                        <template slot-scope="scope">
                            <el-input  v-model="scope.row.questionCon"> </el-input>
                        </template>

                    </el-table-column>

                    <el-table-column
                        prop="lvalue"
                        min-width="80"
                        label="评分值">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.lvalue"> </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" fixed="right" width="80">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" class="noclick"  @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </div>
        <!-- 单选 -->
        <div v-else-if="questionType==2">
            <el-form class="basicInfoForm" :inline="true" :model="SingleQuestionsForm" label-width="100px" ref="ruleForm">
                <el-form-item label="问题名称：">
                    <el-input
                        v-model="SingleQuestionsForm.slQName" class="searchInput" placeholder="请输入问题名称"></el-input>
                </el-form-item>
                <!-- <br> -->
                <el-form-item label="必选题：">
                <el-radio v-model="SingleQuestionsForm.slCusTemplate" label="1">是</el-radio>
                    <el-radio v-model="SingleQuestionsForm.slCusTemplate" label="2">否</el-radio>
                </el-form-item>
            </el-form>
            <div class="kl-table">
                <div class="toolbar">
                    <div class="form-left">
                        <div class="toolbar-line"></div>
                        <div class="toolbar-fontSon">问题选项</div>
                    </div>
                    <div class="form-right">
                        <el-button  @click="add" size="mini" icon="el-icon-plus" type="primary">添加行</el-button>
                    </div>
                </div>
                <el-table       
                    stripe
                    border
                    center
                    :data="SingleTableData.list"
                    class="change-tables-table">

                    <el-table-column 
                        type="index" 
                        label="NO."
                        fixed="left"
                        width="50"  >
                    </el-table-column>

                    <el-table-column
                        prop="questionCon"
                        min-width="200"
                        label="问题选项">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.questionCon"> </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="content"
                        min-width="200"
                        label="选项内容">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.content"> </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="lvalue"
                        min-width="80"
                        label="评分值">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.lvalue"> </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" fixed="right" width="80">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" class="noclick"  @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </div>
        <!-- 多选 -->
        <div v-else-if="questionType==3">
                <el-form class="basicInfoForm" :inline="true" :model="DoubleQuestionsForm" label-width="100px" ref="ruleForm">
                <el-form-item label="问题名称：">
                    <el-input
                        v-model="DoubleQuestionsForm.slQName" class="searchInput" placeholder="请输入问题名称"></el-input>
                </el-form-item>
                <!-- <br> -->
                <el-form-item label="必选题：">
                <el-radio v-model="DoubleQuestionsForm.slCusTemplate" label="1">是</el-radio>
                    <el-radio v-model="DoubleQuestionsForm.slCusTemplate" label="2">否</el-radio>
                </el-form-item>
            </el-form>
            <div class="kl-table">
                <div class="toolbar">
                    <div class="form-left">
                        <div class="toolbar-line"></div>
                        <div class="toolbar-fontSon">问题选项</div>
                    </div>
                    <div class="form-right">
                        <el-button  @click="add" size="mini" icon="el-icon-plus" type="primary">添加行</el-button>
                    </div>
                </div>
                <el-table       
                    stripe
                    border
                    center
                    :data="DoubleTableData.list"
                    class="change-tables-table">

                    <el-table-column 
                        type="index" 
                        label="NO."
                        fixed="left"
                        width="50"  >
                    </el-table-column>

                    <el-table-column
                        prop="questionCon"
                        min-width="200"
                        label="问题选项">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.questionCon"> </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="content"
                        min-width="200"
                        label="选项内容">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.content">  </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="lvalue"
                        min-width="80"
                        label="评分值">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.lvalue">  </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" fixed="right" width="80">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" class="noclick"  @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </div>
        <!-- 问答 -->
        <div v-else-if="questionType==4">
            <el-form class="basicInfoForm" :inline="true" :model="AnswersQuestionsForm" label-width="100px" ref="ruleForm">
                <el-form-item label="问题名称：">
                    <el-input
                        v-model="AnswersQuestionsForm.slQName" class="searchInput" placeholder="请输入问题名称"></el-input>
                </el-form-item>
                <!-- <br> -->
                <el-form-item label="必选题：">
                <el-radio v-model="AnswersQuestionsForm.slCusTemplate" label="1">是</el-radio>
                    <el-radio v-model="AnswersQuestionsForm.slCusTemplate" label="2">否</el-radio>
                </el-form-item>
                <el-form-item label="问题详情：">
                    <el-input
                    type="textarea"
                    placeholder="问题详情"
                    v-model="AnswersQuestionsForm.content"
                    maxlength="30"
                    show-word-limit
                    :rows="4"
                    >
                    </el-input>
                </el-form-item>

            </el-form>
            <!-- <div class="kl-table">
                <div class="toolbar">
                    <div class="form-left">
                        <div class="toolbar-line"></div>
                        <div class="toolbar-fontSon">问题选项</div>
                    </div>
                    <div class="form-right">
                        <el-button  @click="add" size="mini" icon="el-icon-plus" type="primary">添加行</el-button>
                    </div>
                </div> -->

                <!-- <el-table       
                    stripe
                    border
                    center
                    :data="AnswersTableData.list"
                    class="change-tables-table">

                    <el-table-column 
                        type="index" 
                        label="NO."
                        fixed="left"
                        width="50"  >
                    </el-table-column>

                    <el-table-column
                        prop="questionCon"
                        min-width="200"
                        label="问题选项">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.questionCon">
                                    <el-button slot="append" icon="el-icon-edit"></el-button>

                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="content"
                        min-width="200"
                        label="选项内容">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.content">
                                    <el-button slot="append" icon="el-icon-edit"></el-button>
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="lvalue"
                        min-width="80"
                        label="评分值">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.lvalue">
                                    <el-button slot="append" icon="el-icon-edit"></el-button>
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" fixed="right" width="80">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" class="noclick"  @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table> -->
            </div>
        </div>
   
</template>
<script>
export default {
    name:"ScoringQuestions",
    props:["questionType"],
    data(){
        return{
            ScoringQuestionsForm:{
                scQName:"",
                scCusTemplate:"",
            },
            ScoringTableData:{
                list:[
                    {
                        questionCon:"非常满意",
                        lvalue:"10"

                    },
                    {
                        questionCon:"满意",
                        lvalue:"8"

                    },
                    {
                        questionCon:"一般",
                        lvalue:"6"

                    },
                    {
                        questionCon:"很差",
                        lvalue:"4"
                    },
                    ]
            },
            SingleQuestionsForm:{
                slQName:"",
                slCusTemplate:"",
            },
            SingleTableData:{
                list:[
                    {
                        questionCon:"A",
                        lvalue:"10",
                        content:'-'

                    },
                    {
                        questionCon:"B",
                        lvalue:"0",
                        content:'-'

                    },
                    {
                        questionCon:"C",
                        lvalue:"0",
                        content:'-'

                    },
                    {
                        questionCon:"D",
                        lvalue:"0",
                        content:'-'

                        },
                    ]
                },
            DoubleQuestionsForm:{
                slQName:"",
                slCusTemplate:"",
            },
            DoubleTableData:{
                list:[
                    {
                        questionCon:"A",
                        lvalue:"0",
                        content:'-'

                    },
                    {
                        questionCon:"B",
                        lvalue:"5",
                        content:'-'

                    },
                    {
                        questionCon:"C",
                        lvalue:"5",
                        content:'-'

                    },
                    {
                        questionCon:"D",
                        lvalue:"0",
                        content:'-'

                        },
                    ]
                },
            AnswersQuestionsForm:{
                slQName:"",
                slCusTemplate:"",
                content:'',
            },
           
        }
    },
    
    mounted(){
        // console.log(this.questionType);
        
    },
    methods:{
        // 删除行
        deleteRow(index, row){
            this.$confirm('是否确认删除该行?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.histroyData.list.splice(index,1)
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
        add(){
            this.histroyData.list.push({})
        },

    }
}
</script>
<style lang="scss">
.ScoringQuestions{
    padding: 0px 15px;
         .toolbar-line{
          width: 4px;
          background: #c4d600;
          border-radius: 4px;
          height: 18px;
          display: inline-block;
          vertical-align: middle;
        }
        .toolbar-font{
          font-size: 14px;
          height: 19px;
          display: inline-block;
          line-height: 19px;
          vertical-align: middle;
  }
  .el-input__inner:hover{
        //   border: 1px solid #b8bdca
  }
}
</style>
