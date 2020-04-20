
<template>
  <div class="sectionApproval">
    <el-form :inline="true" size="mini" :model="formInline" class="demo-form-inline">

      <div class="applicationDate">
        <p class="isactive">流程类别：</p>
        <ul>
          <li v-for="(v, i) in documentoOptions1" :key="i">{{v.label}}</li>
        </ul>
      </div>

    </el-form>
    <div class="myDeskConBtn">

      <el-table class="listTable dataTable" border stripe :data="listTable">

        <el-table-column min-width="45" type="index" fixed="left" label="No."></el-table-column>
        <el-table-column prop="themeMu" min-width="200" label="主题">
          <template slot-scope="scope">
            {{scope.row.themeCon}}
            ({{scope.row.applicationUser}}
            {{scope.row.applicationTime}})
          </template>
        </el-table-column>
        <!-- <el-table-column prop="themeTitle" min-width="100" label="流程类别"></el-table-column> -->
        <el-table-column prop="themeCon" min-width="80" label="单据编号"></el-table-column>
        <el-table-column prop="applicationUser" min-width="80" label="申请人"></el-table-column>
        <el-table-column prop="phoneNum" min-width="80" label="紧急程度"></el-table-column>
        <el-table-column prop="applicationTime" min-width="120" label="申请时间"></el-table-column>
        <el-table-column prop="updateTime" min-width="120" label="结束时间"></el-table-column>
        <el-table-column prop="stepStart" min-width="100" label="状态"></el-table-column>
        <el-table-column min-width="130" label="进度">
          <template slot-scope="scope">
            {{scope.row.stepEnd}} ( {{scope.row.themeTitle}})
          </template>
        </el-table-column>
        <!-- <el-table-column prop="status" min-width="100" label="进度"></el-table-column> -->
        <el-table-column prop="handleEndUser" show-overflow-tooltip min-width="100" label="当前处理人"></el-table-column>

        <el-table-column fixed="right" min-width="80" label="操作">
          <template slot-scope="scope">
            <el-button type="text" plain @click.native="details(scope.$index, scope.row)">办理</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

    </div>

    <!-- 弹出审批界面 -->
    <el-dialog append-to-body class="TwoModel" :title="approvalPageName" :close-on-click-modal="false" :visible.sync="approvalPageVisible" @close="closeDialog">
      <approvalPage :approvalPageType="approvalPageType" ref="approvalPage"></approvalPage>
    </el-dialog>

  </div>
</template>
<script>
import approvalPage from "@/views/ProcessApproval/approvalPage";
export default {
  name: "sectionApproval",
  components: {
    approvalPage
  },
  props: ["sectionApprovalType"],
  data() {
    return {
      showType: "",

      listTableList2: [
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "",
          applicationUser: "张三",
          themeTitle: "用水咨询",
          themeCon: "YY00001",
          stepStart: "进行中",
          stepEnd: "勘察",
          getAllConc: 1,
          status: "进行中",
          phoneNum: "紧急",
          handleEndUser: "贺雄浩;巫洋彬;周新宇"
        }
      ],
      approvalPageType: "",
      //   查询表单
      formInline: {
        con: "",
        document: ["0"],
        proposer: "",
        application: "",
        handle: "2",
        oApproval: "1",
        oApproval: "22",
        DocumentStatus: "1",
        yiban: true
      },
      listTable: [
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "2019-06-03 14:05",
          applicationUser: "张三",
          workflowname: "用水需求咨询",
          themeTitle: "用水咨询",
          themeCon: "SS00001",
          stepStart: "进行中",
          handleStartUser: "张三",
          stepEnd: "勘察",
          status: "进行中",
          handleEndUser: "李四",
          getAllConc: 0
        },
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "2019-06-03 14:05",
          applicationUser: "张三",
          workflowname: "用户资料变更",
          themeTitle: "停用",
          themeCon: "YY00001",
          stepStart: "进行中",
          handleStartUser: "张三",
          stepEnd: "部门领导审批",
          status: "进行中",
          handleEndUser: "李四",
          getAllConc: 1
        },
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "2019-06-03 14:05",
          applicationUser: "张三",
          workflowname: "换表",
          themeTitle: "停用",
          themeCon: "HH00001",
          stepStart: "进行中",
          handleStartUser: "张三",
          stepEnd: "部门领导审批",
          status: "进行中",
          handleEndUser: "李四",
          getAllConc: 0
        }
      ],

      //   申请日期
      applicationDate: ["全部", "今天", "3天内", "7天内", "30天内", "指定时间"],
      //   单据状态
      approvalDate: ["全部", "草稿", "进行中", "已办结", "已废弃"],
      total: 2,
      rightShow: "1-1",
      isActive: false, //控制高级查询内容的显示
      documentoOptions: [],
      dOptions: [
        {
          label: "全部",
          value: "0"
        },
        {
          label: "用户管理",
          value: "1",
          children: [
            { label: "用水咨询", value: "22" },
            { label: "用水安装", value: "22" },
            { label: "内部工程", value: "2" }
          ]
        },
        {
          label: "抄表开账",
          value: "2",
          children: [{ label: "抄表质量检查", value: "321" }]
        },
        {
          label: "收费管理",
          value: "3",
          children: [
            { label: "费用调整", value: "321" },
            { label: "举报罚款", value: "321" },
            { label: "违约金减免", value: "321" },
            { label: "呆账处理", value: "321" },
            { label: "坏账处理", value: "321" },
            { label: "冲红", value: "321" },
            { label: "取消当月收费", value: "321" },
            { label: "余额取出", value: "321" },
            { label: "余额过户", value: "321" }
          ]
        },
        {
          label: "客户管理",
          value: "4",
          children: [
            { label: "开户", value: "121" },
            { label: "过户", value: "122" },
            { label: "并户", value: "123" },
            { label: "停用", value: "124" },
            { label: "销户", value: "125" },
            { label: "变更", value: "126" }
          ]
        },
        {
          label: "表计管理",
          value: "5",
          children: [
            { label: "注册", value: "321" },
            { label: "换表", value: "321" },
            { label: "拆表", value: "322" },
            { label: "复表", value: "322" },
            { label: "校表", value: "322" },
            { label: "变更", value: "323" }
          ]
        },
        {
          label: "客户通知",
          value: "6",
          children: [
            { label: "通知公共", value: "321" },
            { label: "满意度调查", value: "321" }
          ]
        },
        {
          label: "基础信息",
          value: "7",
          children: [
            { label: "全部", value: "5" },
            { label: "水价管理", value: "321" }
          ]
        }
      ],
      documentoOptions1: [],
      dOptionsEngineering1: [
        {
          label: "全部",
          value: "5"
        },

        { label: "用水咨询", value: "22" },
        { label: "用水安装", value: "22" },
        { label: "内部工程", value: "22" }
      ],
      // 客户管理
      dOptionsCustomer1: [
        {
          label: "全部",
          value: "5"
        },
        { label: "开户", value: "121" },
        { label: "过户", value: "122" },
        { label: "并户", value: "123" },
        { label: "停用", value: "124" },
        { label: "销户", value: "125" },
        { label: "变更", value: "126" }
      ],

      listTableCustomer: [
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "",
          applicationUser: "张燕",
          themeTitle: "开户",
          themeCon: "YY00001",
          stepStart: "进行中",
          stepEnd: "结算收款",
          getAllConc: 1,
          status: "进行中",
          handleEndUser: "李四",
          phoneNum: "一般"
        },
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "",
          applicationUser: "张三",
          themeTitle: "停用",
          themeCon: "HH00001",
          stepStart: "进行中",
          stepEnd: "部门领导审批",
          getAllConc: 0,
          status: "进行中",
          handleEndUser: "李四",
          phoneNum: "一般"
        }
      ],
      // 表务
      dOptionsMeter1: [
        {
          label: "全部",
          value: "5"
        },
        { label: "注册", value: "321" },
        { label: "换表", value: "321" },
        { label: "拆表", value: "322" },
        { label: "复表", value: "322" },
        { label: "校表", value: "322" },
        { label: "变更", value: "323" }
      ],

      listTableMeter: [
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "",
          applicationUser: "张燕",
          themeTitle: "校表",
          themeCon: "YY00001",
          stepStart: "进行中;",
          stepEnd: "二次换表",
          getAllConc: 1,
          status: "进行中",
          handleEndUser: "李四",
          phoneNum: "一般"
        }
      ],
      //抄表开账
      MeterReadingRecord: [
        { label: "全部", value: "5" },
        { label: "抄表质量检查", value: "321" }
      ],
      listTableRecord: [
        // {
        //     applicationTime:"2019-06-03 12.27",
        //     updateTime:"2019-07-10 14:05",
        //     applicationUser:"张三",
        //     themeTitle:"抄表质量检查",
        //     themeCon:"HH00001",
        //     stepStart:"<无>",
        //     stepEnd:"结束节点",
        //     getAllConc:0,
        //     status:'已办结'   ,
        //     phoneNum:'一般'
        // },
      ],
      //收费管理
      ChargeManagement: [
        { label: "全部", value: "5" },
        { label: "费用调整", value: "321" },
        { label: "举报罚款", value: "321" },
        { label: "违约金减免", value: "321" },
        { label: "呆账处理", value: "321" },
        { label: "坏账处理", value: "321" },
        { label: "冲红", value: "321" },
        { label: "取消当月收费", value: "321" },
        { label: "余额取出", value: "321" },
        { label: "余额过户", value: "321" }
      ],
      listTableCharge: [
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "",
          applicationUser: "张三",
          themeTitle: "违约金减免",
          themeCon: "HH00001",
          stepStart: "进行中",
          stepEnd: "部门经理审核",
          getAllConc: 0,
          status: "进行中",
          phoneNum: "一般",
          handleEndUser: "李东乡"
        },
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "",
          applicationUser: "张三",
          themeTitle: "冲红",
          themeCon: "HH00001",
          stepStart: "进行中",
          stepEnd: "部门组长审核",
          getAllConc: 0,
          status: "进行中",
          handleEndUser: "李四",
          phoneNum: "急"
        }
      ],
      //客户通知
      CustomerNotCenter: [
        { label: "全部", value: "5" },
        { label: "通知公共", value: "321" },
        { label: "满意度调查", value: "321" }
      ],
      listTableNot: [
        // {
        //     applicationTime:"2019-06-03 12.27",
        //     updateTime:"2019-07-10 14:05",
        //     applicationUser:"张三",
        //     themeTitle:"满意度调查",
        //     themeCon:"HH00001",
        //     stepStart:"<无>",
        //     stepEnd:"部门组长审核",
        //     getAllConc:0,
        //     status:'进行中'   ,
        //     phoneNum:'一般'
        // },
      ],
      notificationAlarm: [
        {
          label: "全部",
          value: "5"
        },
        { label: "开账", value: "321" },
        { label: "互联网对账", value: "321" },
        { label: "抄表录入", value: "322" }
      ],

      approvalPageName: "办理",
      approvalPageVisible: false
    };
  },
  mounted() {
    this.handleSelect(this.sectionApprovalType);
    this.showType = this.sectionApprovalType;
  },
  methods: {
    search() {},
    closeDialog() {
      this.approvalPageVisible = false;
    },
    //   详情
    details(index, row) {
      this.approvalPageName = "办理-" + row.themeTitle;
      this.approvalPageType = row.themeTitle;
      this.approvalPageVisible = true;
    },
    hidden() {
      if (this.isActive == true) {
        $(".upchange")
          .addClass("el-icon-arrow-down")
          .removeClass("el-icon-arrow-up");
        this.isActive = false;
      } else {
        $(".upchange")
          .addClass("el-icon-arrow-up")
          .removeClass("el-icon-arrow-down");

        this.isActive = true;
      }
    },
    handleSelect(key, keyPath) {
      this.rightShow = key;
      if (key == "2-1") {
        //工程管理
        this.documentoOptions1 = this.dOptionsEngineering1;
        this.listTable = this.listTableList2;
      } else if (key == "2-3") {
        //客户管理
        this.documentoOptions1 = this.dOptionsCustomer1;
        this.listTable = this.listTableCustomer;
      } else if (key == "2-4") {
        //表计管理
        this.documentoOptions1 = this.dOptionsMeter1;
        this.listTable = this.listTableMeter;
      } else if (key == "2-6") {
        //抄表开账
        this.documentoOptions1 = this.MeterReadingRecord;
        this.listTable = this.listTableRecord;
      } else if (key == "2-7") {
        //收费管理
        this.documentoOptions1 = this.ChargeManagement;
        this.listTable = this.listTableCharge;
      } else if (key == "2-8") {
        //客户通知
        this.documentoOptions1 = this.CustomerNotCenter;
        this.listTable = this.listTableNot;

        // if(key=='1-1'){//待办

        // }else if(key=='2-1'){//工程管理
        //     this.documentoOptions1 = this.dOptionsEngineering1

        // }else if(key=='2-3'){//客户管理
        //     this.documentoOptions1 = this.dOptionsCustomer1

        // }else if(key=='2-4'){//表计管理
        //     this.documentoOptions1 = this.dOptionsMeter1

        // }else if(key=='2-6'){//抄表开账
        //     this.documentoOptions1 = this.MeterReadingRecord

        // }else if(key=='2-7'){//收费管理
        //     this.documentoOptions1 = this.ChargeManagement

        // }else if(key=='2-8'){//客户通知
        //     this.documentoOptions1 = this.CustomerNotCenter
      }
    },
    //分页
    handleSizeChange(val) {
      //显示多少数据一页
      // this.tableQuery.pageCount = val
      // this.tableQuery.page = 1
      this.init();
    },
    handleCurrentChange(val) {
      //显示多少页码
      // this.tableQuery.page = val
      this.init();
    }
  },
  watch: {
    sectionApprovalType(val) {
      this.handleSelect(val);
      this.showType = val;
    }
  }
};
</script>
<style lang="scss">
$imgWidth: 200px;
$theme-color: #297acc;
.sectionApproval {
  height: calc(100% - 20px);
  width: calc(100% - 40px);
  margin: 10px 20px;
  .TwoModel {
    .el-dialog__body {
      height: calc(100% - 55px);
    }
  }
  .isactive {
    color: #328ed1;
    font-weight: 700;
    & > .el-form-item__label {
      color: #328ed1;
      font-weight: 700;
    }
  }

  .applicationDate {
    padding: 8px 0;
    // border-bottom:1px dashed #ccc;
    width: 100%;
    height: 20px;
    &:after {
      // @include _clearBoth()
    }
    & > p {
      float: left;
      padding: 3px 0px;
    }
    & > ul {
      float: left;
      padding-left: 10px;
      &:after {
        // @include _clearBoth()
      }
      & > li {
        float: left;
        padding: 3px 24px;
        border-radius: 2px;
      }
      & > li:first-child {
        background: #328ed1;
        color: #fff;
      }
    }
  }
  .dataTable {
    margin-top: 10px;
    width: 100% !important;
  }

  .block {
    text-align: right;
    padding: 10px 0px;
  }
}
</style>
