
<template>
  <div class="InformationReleaseManagementEditFrom">

    <!-- <div class="backfillSubmitForm"> -->
    <el-form :inline="true" class="basicInfoForm " size="mini" :model="InformationReleaseManagementEditFromForm" label-width="150px" ref="ruleForm" :rules="rules">
      <el-form-item label="通知类型：" prop="noticeType" class="selectClass">
        <el-select v-model="InformationReleaseManagementEditFromForm.noticeType" placeholder="">
          <el-option v-for="item in InformationReleaseManagementEditFromForm.descoptions" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章类型：" prop="factoryName" class="selectClass">
        <el-select v-model="InformationReleaseManagementEditFromForm.type" placeholder="">
          <el-option v-for="item in InformationReleaseManagementEditFromForm.informationType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" prop="title">
        <el-input v-model="InformationReleaseManagementEditFromForm.title" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="通知范围：" prop="title">
        <el-input v-model="InformationReleaseManagementEditFromForm.title" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="图标：" prop="userNume">
        <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <fieldset>
        <legend>微信通知</legend>
        <el-form-item label=" ">
          <el-switch v-model="InformationReleaseManagementEditFromForm.isWXNotice" active-text="发送微信通知">
          </el-switch>
        </el-form-item>
        <div v-if="InformationReleaseManagementEditFromForm.noticeType==1">
          <el-form-item label="停水区域：">
            <el-input type="text" placeholder="请输入停水区域" v-model="InformationReleaseManagementEditFromForm.wxAddress" maxlength="500" show-word-limit>
            </el-input>
          </el-form-item>
          <el-form-item label="停水期间：">
            <el-input type="text" placeholder="请输入停水期间" v-model="InformationReleaseManagementEditFromForm.wxTime" maxlength="500" show-word-limit>
            </el-input>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="通知内容：">
            <el-input type="textarea" placeholder="通知内容" v-model="InformationReleaseManagementEditFromForm.wxContent" maxlength="500" show-word-limit>
            </el-input>
          </el-form-item>
        </div>
      </fieldset>
      <fieldset>
        <legend>短信通知</legend>
        <el-form-item label=" ">
          <el-switch v-model="InformationReleaseManagementEditFromForm.isSMSNotice" active-text="发送短信通知">
          </el-switch>
        </el-form-item>
        <el-form-item label="通知内容：">
          <el-input type="textarea" placeholder="请输入短信通知内容" v-model="InformationReleaseManagementEditFromForm.smsContent" maxlength="500" show-word-limit>
          </el-input>
        </el-form-item>
      </fieldset>

      <!-- <el-form-item label="类型：">
                <el-input v-model="InformationReleaseManagementEditFromForm.type" placeholder=""></el-input>
            </el-form-item> -->
      <el-form-item v-if="InformationReleaseManagementEditFromForm.type==0" label="链接：">
        <el-input v-model="InformationReleaseManagementEditFromForm.LeavingMessage" placeholder=""></el-input>
      </el-form-item>
      <el-form-item v-else label="内容：" prop="userNume" class="userAdress">
        <!-- <el-input type="textarea" v-model="InformationReleaseManagementEditFromForm.userNume" placeholder=""></el-input> -->
        <InformationReleaseManagementEdit></InformationReleaseManagementEdit>
      </el-form-item>
      <legend class="legendColumn">流程处理</legend>
      <procedure :isOptions="true"></procedure>

    </el-form>
  </div>

  <!-- </div> -->
</template>
<script>
import InformationReleaseManagementEdit from "./InformationReleaseManagementEdit";
import procedure from "@/components/procedure";
export default {
  name: "InformationReleaseManagementEditFrom",
  components: {
    InformationReleaseManagementEdit,
    procedure
  },
  data() {
    return {
      InformationReleaseManagementEditFromForm: {
        informationType: [
          {
            label: "文章",
            value: "1"
          },
          {
            label: "链接",
            value: "0"
          }
        ],
        // 查询内容
        backfillInput: [
          {
            label: "用户名称：",
            value: "",
            tips: "xx319"
          },
          {
            label: "用户地址：",
            value: "",
            tips: "登封路"
          },
          {
            label: "联系人：",
            value: "",
            tips: ""
          },
          {
            label: "联系方式：",
            value: "",
            tips: ""
          }
        ],

        desc: "",
        userNume: "",
        descoptions: [
          {
            name: "新闻",
            value: "2"
          },
          {
            name: "公告",
            value: "3"
          },
          {
            name: "其它",
            value: "3"
          }
        ],
        title: "",
        describe: "",
        type: "1",
        LeavingMessage: ""
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        type: [{ required: true, message: "请输入类型", trigger: "blur" }],
        LeavingMessage: [
          { required: true, message: "请输入留言", trigger: "blur" }
        ],
        userNume: [{ required: true, message: "请输入留言", trigger: "blur" }]
      },
      fileList: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {},
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>
<style lang="scss">
.InformationReleaseManagementEditFrom {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  overflow-y: scroll;
  fieldset {
    padding-block-start: 0.35em;
    padding-inline-start: 0.75em;
    padding-inline-end: 0.75em;
    padding-block-end: 0.625em;
    min-inline-size: min-content;
    border-width: 1px;
    border-style: ridge;
    border-color: threedface;
    border-image: initial;
    width: 60%;
    margin: 0px 0px 20px 145px;
  }
  legend {
    //background: #f5f5f5;
    font-weight: 700;
    font-size: 12px;
    padding: 5px 8px;
    font-size: 14px;
  }
  fieldset .el-form-item {
    width: 90% !important;
  }
  .basicInfoForm {
    margin: 10px 0px;
  }

  .backfillSubmitForm {
    .userAdress {
      width: 100%;
      .el-form-item__content {
        width: calc(100% - 160px);
        .el-form-item__label {
          width: 100px !important;
        }
      }
    }
    .selectClass {
      width: 36.5% !important;
    }

    .Btngroup {
      width: 100%;
      .el-form-item__content {
        width: calc(100% - 160px);
      }
    }
  }
  .el-steps--horizontal {
    margin: 0 auto;
    width: 50%;
    padding-bottom: 20px;
  }
  #editor {
    border: 1px solid var(--ck-color-toolbar-border);
    height: 200px;
  }
}
</style>

