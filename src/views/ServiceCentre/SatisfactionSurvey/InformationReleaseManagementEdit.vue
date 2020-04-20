<template>
  <div class="InformationReleaseManagementEdit">
    <!-- 弹出表单含添加题目 -->
    <el-dialog class="QuestionDialog" :title="addQuestionsName" :visible.sync="addQuestionsVisible" :close-on-click-modal="false" @close="closeDialog">
      <Questionsadd ref="aQusScoring" :questionType="topicType"></Questionsadd>

      <div slot="footer" class="dialog-footer" ref="ruleForm">
        <el-button type="primary" size="mini" @click="submit('ruleForm');">保 存</el-button>
        <el-button type="info" size="mini" plain @click="closeDialog('ruleForm')">取 消</el-button>
      </div>
    </el-dialog>

    <el-form class="backfillSubmitForm" size="mini" :inline="true" :model="InfoReleaseManagementEditForm" label-width="150px" ref="ruleForm">
      <el-form-item style="width：100%" label="问卷主题：" class="remark">
        <el-input v-model="InfoReleaseManagementEditForm.shortMsgNum" placeholder="请输入问卷主题"></el-input>
      </el-form-item>
      <el-form-item label="问卷说明：" class="remark">
        <el-input type="textarea" :rows="3" v-model="InfoReleaseManagementEditForm.shortMsgCon" placeholder=""></el-input>
      </el-form-item>
      <br>
      <el-form-item label="开始日期：">
        <el-date-picker v-model="InfoReleaseManagementEditForm.startDate" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期：">
        <el-date-picker v-model="InfoReleaseManagementEditForm.endDate" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <br>
      <el-form-item label="发布渠道：">
        <el-checkbox-group v-model="InfoReleaseManagementEditForm.channel">
          <el-checkbox label="网上营业厅"></el-checkbox>
          <el-checkbox label="微信营业厅"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="是否允许同一用户多次调查：" class="MultipleInvestigations">
        <el-radio v-model="InfoReleaseManagementEditForm.CustomizedTemplate" label="1">是</el-radio>
        <el-radio v-model="InfoReleaseManagementEditForm.CustomizedTemplate" label="2">否</el-radio>
      </el-form-item>

    </el-form>
    <div class="kl-table">
      <!-- <h3>调查题库</h3> -->
      <div class="toolbar">
        <div class="form-left">
          <div class="toolbar-fontSon"> 调查题库</div>
        </div>
        <div class="form-right">
          <el-button size="mini" icon="el-icon-plus" type="primary" @click="addScoringQuestions('评分')">评分题</el-button>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="addScoringQuestions('单选')">单选题</el-button>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="addScoringQuestions('多选')">多选题</el-button>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="addScoringQuestions('问答')">问答题</el-button>

        </div>
      </div>
      <el-table stripe border :data="histroyData.list" class="change-tables-table">

        <el-table-column type="index" label="NO." fixed="left" width="50">
        </el-table-column>

        <el-table-column prop="questionCon" min-width="400" label="题目">
        </el-table-column>

        <el-table-column prop="lvalue" min-width="80" label="题型">
        </el-table-column>

        <el-table-column class="cell" label="排序" fixed="right" width="130">
          <template slot-scope="scope">
            <el-button type="text">上移</el-button>
            <span  >|</span>
            <el-button type="text" class="noclick">下移</el-button>
          </template>
        </el-table-column>

        <el-table-column class="cell" label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <el-button type="text" class="noclick">编辑</el-button>
            <span  >|</span>
            <el-button type="text" class="noclick" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

    </div>

    <legend class="legendColumn">流程处理</legend>
    <procedure></procedure>
  </div>
</template>
<script>
import Questionsadd from "./Questionsadd";
import procedure from "@/components/procedure"; //流程审核
export default {
  name: "InformationReleaseManagementEdit",
  components: {
    Questionsadd,
    procedure
  },
  data() {
    return {
      InfoReleaseManagementEditForm: {
        shortMsgNum: "",
        shortMsgName: "",
        CustomizedTemplate: "1",
        channel: ["网上营业厅"],
        state: "",
        shortMsgCon:
          "为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！",
        startDate: "",
        endDate: "",
        wechatCon: ""
      },
      histroyData: {
        list: [
          {
            questionCon: "客户服务类：服务态度",
            lvalue: "评分题"
          },
          {
            questionCon: "客户服务类：仪容仪表",
            lvalue: "评分题"
          },
          {
            questionCon: "客户服务类：联络与沟通",
            lvalue: "评分题"
          },
          {
            questionCon: "客户服务类：服务受理与反馈",
            lvalue: "评分题"
          }
        ]
      },
      addQuestionsName: "添加评分题",
      addQuestionsVisible: false,
      topicType: 1
    };
  },
  methods: {
    // 删除行
    deleteRow(index, row) {
      this.$confirm("是否确认删除该行?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.histroyData.list.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addScoringQuestions(val) {
      if (val === "评分") {
        //1
        this.topicType = 1;
      } else if (val === "单选") {
        this.topicType = 2;
      } else if (val === "多选") {
        this.topicType = 3;
      } else if (val === "问答") {
        this.topicType = 4;
      }
      this.addQuestionsName = `添加${val}题`;
      this.addQuestionsVisible = true;
    },
    closeDialog() {
      this.addQuestionsVisible = false;
    }
  }
};
</script>
<style  lang="scss">
.InformationReleaseManagementEdit {
  height: 100%;
  overflow-y: auto;
  .QuestionDialog {
    // background-color: red;
    .el-dialog {
      width: 50% !important;
      height: 80% !important;
      line-height: 70% !important;
      margin-top: 15vh !important;
    }
    .el-input-group__append {
      border: none;
      background-color: #f5f7fa00;
      color: #353840;
      padding: 0px;
    }
  }
  .backfillSubmitForm {
    width: 80%;
  }
  .MultipleInvestigations {
    width: 50%;
    .form-left {
      i {
        width: 4px;
        background: #c4d600;
        border-radius: 4px;
        height: 18px;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .el-form-item__label {
      width: 250px !important;
    }
  }
  .remark {
    width: 100%;
    .el-form-item__content {
      width: calc(100% - 150px);
      .el-input__inner {
        width: 100%;
      }
    }
  }
}
</style>
