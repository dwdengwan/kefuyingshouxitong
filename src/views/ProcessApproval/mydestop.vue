<template>
  <!-- 我的桌面 -->
  <div class="mydestop">
    <div class="mydestop-left">
      <el-menu :default-active="rightShow" class="el-menu-vertical" unique-opened @open="handleOpen" @select="handleSelect" @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <span>我的待办</span>
          </template>
          <el-menu-item index="1-1">
            <el-badge is-dot class="item2">
              待办
            </el-badge>
          </el-menu-item>

          <el-menu-item index="1-2">已办</el-menu-item>
          <el-menu-item index="1-3">我发起的</el-menu-item>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <span>按类别</span>
          </template>
          <el-menu-item index="2-1">
            <el-badge is-dot class="item4">
              工程管理
            </el-badge>
          </el-menu-item>
          <!-- <el-menu-item index="2-2">内部工程</el-menu-item> -->
          <el-menu-item index="2-6">抄表开账</el-menu-item>
          <el-menu-item index="2-7">收费管理</el-menu-item>
          <el-menu-item index="2-3">客户管理</el-menu-item>
          <el-menu-item index="2-4">表计管理</el-menu-item>
          <el-menu-item index="2-8">客户通知</el-menu-item>
          <!-- <el-menu-item index="2-9"></el-menu-item> -->
          <!-- <el-menu-item index="2-5">报警通知</el-menu-item> -->
        </el-submenu>
      </el-menu>
    </div>

    <div class="mydestop-right">
      <el-form :inline="true" size="mini" :model="formInline" class="demo-form-inline">

        <el-form-item label="关键字：" class="searchInput isactive">
          <el-input v-model="formInline.con" placeholder="关键字"></el-input>
        </el-form-item>

        <!-- <el-form-item v-if="rightShow!='1-1'&&rightShow!='1-2'&&rightShow!='1-3'">
                        <el-checkbox v-model="formInline.yiban">我的待办</el-checkbox>

                </el-form-item> -->

        <el-form-item>
          <el-button class="searchBtn" icon="el-icon-search"></el-button>
          <el-button type="primary" size="mini" @click.native="hidden" icon="el-icon-arrow-down upchange" class="soce-query">
            高级查询
          </el-button>

        </el-form-item>
        <el-form-item class="btn-right">
          <el-button type="primary" size="mini" icon="el-icon-refresh">刷新</el-button>

        </el-form-item>

        <div v-if="rightShow!='1-1'&&rightShow!='1-2'&&rightShow!='1-3'" class="applicationDate">
          <p class="isactive">流程类别：</p>
          <ul>
            <li v-for="(v, i) in documentoOptions1" :key="i">{{v.label}}</li>
          </ul>
        </div>

        <div v-if="rightShow=='1-3'" class="applicationDate">
          <p class="isactive">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</p>
          <ul>
            <li v-for="(v, i) in approvalDate" :key="i">{{v}}</li>
          </ul>
        </div>

        <!-- 高级查询内容 -->
        <div v-show="isActive" class="advancedQuery">

          <div v-if="rightShow!='1-1'&&rightShow!='1-3'" class="applicationDate">
            <p class="isactive">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</p>
            <ul>
              <li v-for="(v, i) in approvalDate" :key="i">{{v}}</li>
            </ul>
          </div>

          <div class="applicationDate">
            <p class="isactive">申请日期：</p>
            <ul>
              <li v-for="(v, i) in applicationDate" :key="i">{{v}}</li>
            </ul>
          </div>

          <br>

          <el-form-item class=" isactive" label="申请部门：">
            <el-select v-model="formInline.application" placeholder="选择申请部门">
              <el-option v-for="(v,i) in formInline.options" :label="v.name" :value="v.value" :key="i"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="申请人：">
            <el-select v-model="formInline.proposer" placeholder="选择申请人">
              <el-option v-for="(v,i) in proposerOptions" :label="v.label" :value="v.value" :key="i"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="rightShow=='1-1'||rightShow=='1-2'||rightShow=='1-3'" label="流程类别：" class="searchInput">
            <el-cascader v-model="formInline.document" :options="documentoOptions"></el-cascader>
          </el-form-item>
        </div>
        <div class="myDeskConBtn">

          <el-table class="listTable kl-table" border stripe :data="listTable">

            <el-table-column min-width="45" type="index" fixed="left" label="No."></el-table-column>
            <el-table-column prop="themeMu" min-width="200" label="主题">
              <template slot-scope="scope">
                {{scope.row.themeCon}}
                ({{scope.row.applicationUser}}
                {{scope.row.applicationTime}})
              </template>
            </el-table-column>
            <el-table-column prop="themeCon" min-width="80" label="单据编号"></el-table-column>
            <el-table-column prop="applicationUser" min-width="80" label="申请人"></el-table-column>
            <el-table-column prop="phoneNum" min-width="80" label="紧急程度"></el-table-column>
            <el-table-column prop="applicationTime" min-width="100" label="申请时间"></el-table-column>
            <el-table-column prop="updateTime" min-width="100" label="结束时间"></el-table-column>
            <el-table-column prop="status" min-width="80" label="状态"></el-table-column>
            <el-table-column min-width="130" label="进度">
              <template slot-scope="scope">
                {{scope.row.stepEnd}} ( {{scope.row.themeTitle}})
              </template>
            </el-table-column>
            <el-table-column prop="stepStart" show-overflow-tooltip min-width="80" label="当前处理人"></el-table-column>

            <el-table-column min-width="80" label="操作">
              <template slot-scope="scope">
                <el-button type="text" plain @click.native="details(scope.$index, scope.row)">详情</el-button>
                <!-- <el-button type="text"  plain  v-else  @click.native="details(scope.$index, scope.row)">办理</el-button> -->
              </template>
            </el-table-column>

          </el-table>
          <!-- 分页 -->
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>

        </div>
      </el-form>

    </div>

    <!-- 弹出审批界面 -->
    <el-dialog class="common-dialog" :title="approvalPageName" :close-on-click-modal="false" :visible.sync="approvalPageVisible" @close="closeDialog">
      <approvalPage :approvalPageType="approvalPageType" ref="approvalPage"></approvalPage>
    </el-dialog>

  </div>
</template>
<script>
import approvalPage from "@/views/ProcessApproval/approvalPage";
export default {
  name: "mydestop",
  components: {
    approvalPage
  },
  data() {
    return {
      approvalPageName: "办理",
      approvalPageVisible: false,
      approvalPageType: "",
      total: 6,
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
        }
        // {
        //     label: '基础信息',
        //     value: '7',
        //     children: [
        //         { label: '全部', value: '5', },
        //         { label: '水价管理', value: '321' },
        //     ]
        // },
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
          stepStart: "贺雄浩;巫洋彬;",
          stepEnd: "结算收款",
          getAllConc: 1,
          status: "进行中",
          phoneNum: "一般"
        },
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "2019-07-10 14:05",
          applicationUser: "张三",
          themeTitle: "停用",
          themeCon: "HH00001",
          stepStart: " ",
          stepEnd: "结束节点",
          getAllConc: 0,
          status: "已办结",
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
          stepStart: "王五;",
          stepEnd: "二次换表",
          getAllConc: 1,
          status: "进行中",
          phoneNum: "一般"
        }
      ],
      //抄表开账
      MeterReadingRecord: [
        { label: "全部", value: "5" },
        { label: "抄表质量检查", value: "321" }
      ],
      listTableRecord: [
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "2019-07-10 14:05",
          applicationUser: "张三",
          themeTitle: "抄表质量检查",
          themeCon: "HH00001",
          stepStart: " ",
          stepEnd: "结束节点",
          getAllConc: 0,
          status: "已办结",
          phoneNum: "一般"
        }
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
          updateTime: "2019-07-10 14:05",
          applicationUser: "张三",
          themeTitle: "违约金减免",
          themeCon: "HH00001",
          stepStart: " ",
          stepEnd: "结束节点",
          getAllConc: 0,
          status: "已办结",
          phoneNum: "一般"
        },
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "2019-07-10 14:05",
          applicationUser: "余额过户",
          themeTitle: "冲红",
          themeCon: "HH00001",
          stepStart: "张红",
          stepEnd: "部门组长审核",
          getAllConc: 0,
          status: "进行中",
          phoneNum: "一般"
        }
      ],
      //客户通知
      CustomerNotCenter: [
        { label: "全部", value: "5" },
        { label: "通知公共", value: "321" },
        { label: "满意度调查", value: "321" }
      ],
      listTableNot: [
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "2019-07-10 14:05",
          applicationUser: "张三",
          themeTitle: "满意度调查",
          themeCon: "HH00001",
          stepStart: " ",
          stepEnd: "结束节点",
          getAllConc: 0,
          status: "已办结",
          phoneNum: "一般"
        }
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

      //   申请人
      proposerOptions: [],
      //   办理状态
      processingStatus: "commission",
      //   表格的高度
      maxHeight: 0,
      //   控制表格的显示
      tableShow: false,
      //   关联类型
      associatedType: ["全部", "我发起的", "我经办的"],
      //   申请日期
      applicationDate: ["全部", "今天", "3天内", "7天内", "30天内", "指定时间"],
      //   单据状态
      approvalDate: ["全部", "草稿", "进行中", "已办结", "已废弃"],
      //  办理状态
      handleOptions: [
        { name: "全部", value: "1" },
        { name: "待办", value: "2" },
        { name: "已办", value: "3" }
      ],
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
      tabsActiveName: "home",
      listTable: [],
      listTableList: [
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "",
          applicationUser: "张晓风",
          themeTitle: "用水咨询",
          themeCon: "SS00001",
          stepStart: "周新宇",
          stepEnd: "勘察",
          getAllConc: 0,
          status: "进行中",
          phoneNum: "一般"
        },
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "",
          applicationUser: "张晓风",
          themeTitle: "停用",
          themeCon: "SS00001",
          stepStart: "周新宇",
          stepEnd: "停用",
          getAllConc: 0,
          status: "进行中",
          phoneNum: "一般"
        },
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "",
          applicationUser: "张晓风",
          themeTitle: "销户",
          themeCon: "SS00001",
          stepStart: "周新宇",
          stepEnd: "销户",
          getAllConc: 0,
          status: "进行中",
          phoneNum: "一般"
        },
        // {
        //     applicationTime:"2019-06-03 12.27",
        //     updateTime:"",
        //     applicationUser:"张燕",
        //     themeTitle:"余额过户",
        //     themeCon:"YY00001",
        //     stepStart:"贺雄浩;巫洋彬;周新宇",
        //     stepEnd:"余额过户",
        //     getAllConc:1,
        //     status:'进行中'  ,
        //     phoneNum:'紧急'
        // },
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "",
          applicationUser: "张三",
          themeTitle: "违约金减免",
          themeCon: "HH00001",
          stepStart: "周新宇",
          stepEnd: "违约金减免",
          getAllConc: 0,
          status: "进行中",
          phoneNum: "紧急"
        },
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "",
          applicationUser: "张晓风",
          themeTitle: "冲红",
          themeCon: "SS00001",
          stepStart: "周新宇",
          stepEnd: "冲红",
          getAllConc: 0,
          status: "进行中",
          phoneNum: "紧急"
        },
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "",
          applicationUser: "张晓风",
          themeTitle: "校表",
          themeCon: "SS00001",
          stepStart: "周新宇",
          stepEnd: "校表",
          getAllConc: 0,
          status: "进行中",
          phoneNum: "紧急"
        }
      ],
      listTableList2: [
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "",
          applicationUser: "张燕",
          themeTitle: "余额过户",
          themeCon: "YY00001",
          stepStart: "贺雄浩;巫洋彬;周新宇",
          stepEnd: "余额过户",
          getAllConc: 1,
          status: "进行中",
          phoneNum: "紧急"
        },
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "2019-07-10 14:05",
          applicationUser: "张三",
          themeTitle: "违约金减免",
          themeCon: "HH00001",
          stepStart: "巫洋彬",
          stepEnd: "结束节点",
          getAllConc: 0,
          status: "进行中",
          phoneNum: "紧急"
        },
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "2019-07-10 14:05",
          applicationUser: "张三",
          themeTitle: "违约金减免",
          themeCon: "HH00001",
          stepStart: "巫洋彬",
          stepEnd: "结束节点",
          getAllConc: 0,
          status: "进行中",
          phoneNum: "紧急"
        }
      ],
      listTableList3: [
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "",
          applicationUser: "张燕",
          themeTitle: "用水安装",
          themeCon: "YY00001",
          stepStart: "贺雄浩;巫洋彬;",
          stepEnd: "结算收款",
          getAllConc: 1,
          status: "进行中",
          phoneNum: "一般"
        },
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "2019-07-10 14:05",
          applicationUser: "张三",
          themeTitle: "换表",
          themeCon: "HH00001",
          stepStart: " ",
          stepEnd: "结束节点",
          getAllConc: 0,
          status: "已办结",
          phoneNum: "一般"
        }
      ],
      EngineeList: [
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "",
          applicationUser: "张燕",
          themeTitle: "用水咨询",
          themeCon: "YY00001",
          stepStart: "贺雄浩;巫洋彬;",
          stepEnd: "勘察",
          getAllConc: 1,
          status: "进行中",
          phoneNum: "一般"
        },
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "2019-07-10 14:05",
          applicationUser: "张三",
          themeTitle: "用水安装",
          themeCon: "HH00001",
          stepStart: " ",
          stepEnd: "安装施工",
          getAllConc: 0,
          status: "已办结",
          phoneNum: "一般"
        }
      ],
      EngineeList: [
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "",
          applicationUser: "张燕",
          themeTitle: "用水咨询",
          themeCon: "YY00001",
          stepStart: "贺雄浩;巫洋彬;",
          stepEnd: "勘察",
          getAllConc: 1,
          status: "进行中",
          phoneNum: "一般"
        },
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "2019-07-10 14:05",
          applicationUser: "张三",
          themeTitle: "用水安装",
          themeCon: "HH00001",
          stepStart: " ",
          stepEnd: "安装施工",
          getAllConc: 0,
          status: "已办结",
          phoneNum: "一般"
        }
      ],
      launchList: [
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "",
          applicationUser: "周新宇",
          themeTitle: "余额过户",
          themeCon: "YY00001",
          stepStart: "贺雄浩;巫洋彬;周新宇",
          stepEnd: "余额过户",
          getAllConc: 1,
          status: "进行中",
          phoneNum: "紧急"
        },
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "2019-07-10 14:05",
          applicationUser: "周新宇",
          themeTitle: "用水安装",
          themeCon: "HH00001",
          stepStart: " ",
          stepEnd: "安装施工",
          getAllConc: 0,
          status: "已办结",
          phoneNum: "一般"
        },
        {
          applicationTime: "2019-06-03 12.27",
          updateTime: "2019-07-10 14:05",
          applicationUser: "周新宇",
          themeTitle: "换表",
          themeCon: "HH00001",
          stepStart: " ",
          stepEnd: "结束节点",
          getAllConc: 0,
          status: "已办结",
          phoneNum: "一般"
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, ".water-side .mydestop", [
        ".water-side .demo-form-inline",
        ".water-side .applicationDate",
        ".water-side .applicationDate"
      ]);
    });
    this.documentoOptions = this.dOptions;
    this.listTable = this.listTableList;

    if (localStorage.getItem("mordel") != undefined) {
      // 首页

      this.rightShow = localStorage.getItem("mordel");
      this.handleSelect(localStorage.getItem("mordel"));
    }
  },
  methods: {
    closeDialog() {
      this.approvalPageVisible = false;
    },
    handleSelect(key, keyPath) {
      this.rightShow = key;
      if (key == "1-1") {
        //待办
        this.documentoOptions = this.dOptions;
        this.listTable = this.listTableList;
      } else if (key == "1-2") {
        //已办
        this.documentoOptions = this.dOptions;
        this.listTable = this.listTableList2;
      } else if (key == "1-3") {
        //我发起的
        this.documentoOptions = this.dOptions;
        this.listTable = this.launchList;
      } else if (key == "2-1") {
        //工程管理
        this.documentoOptions1 = this.dOptionsEngineering1;
        this.listTable = this.EngineeList;
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
      } else if (key == "2-9") {
        //基础信息
        this.documentoOptions1 = this.RegionalConfiguration;
      }
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose() {},

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
    },
    //   详情
    details(index, row) {
      this.approvalPageType = row.themeTitle;
      this.approvalPageVisible = true;
    },
    tabsShow(val) {
      this.tabsActiveName = val;
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
      this.$nextTick(() => {
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        this.common.changeTable(this, ".water-meter-inquiry", [
          ".water-meter-inquiry .toolbar",
          ".water-meter-inquiry .block",
          ".water-meter-inquiry #crumbs"
        ]);
      });
    }
  },
  watch: {
    maxHeight() {
      this.tableShow = false;
      this.$nextTick(() => {
        this.tableShow = true;
      });
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/styles/scss/base/fn";
.mydestop {
  height: calc(100% - 50px);
  background: #eaf4ff;
  padding-top: 10px;

  .mydestop-left {
    height: 100%;
    width: 200px;
    float: left;
    position: relative;
    background: #fff;
    .item2 {
      .el-badge__content {
        right: 0px;
        top: 16px;
        left: 19px;
      }
    }
    .item4 {
      .el-badge__content {
        right: 0px;
        top: 16px;
        left: 49px;
      }
    }
    // .el-badge__content.is-fixed.is-dot{
    //     right: 0px;
    //     top: 23px;
    //     left: 116px;
    // }
    .el-menu-vertical {
      .el-submenu {
        font-weight: 700;
      }
      .el-menu-item {
        font-weight: 700;
      }
      .el-menu-item:focus,
      .el-menu-item:hover,
      .el-menu-item.is-active {
        color: #fff;
        background: #297acc;
      }
    }
  }
  .mydestop-right {
    height: calc(100% - 20px);
    width: calc(100% - 230px);
    position: relative;
    float: left;
    background: #fff;
    margin-left: 10px;
    padding: 10px;

    .block {
      text-align: right;
      padding: 10px 0px;
    }
  }
  .btn-right {
    float: right;
  }
  .isactive {
    color: #328ed1;
    font-weight: 700;
    & > .el-form-item__label {
      color: #328ed1;
      font-weight: 700;
    }
  }

  .el-input .el-input__inner {
    height: 28px;
    line-height: 28px;
  }
  .applicationDate {
    padding: 8px 0;
    border-bottom: 1px dashed #ccc;
    width: 100%;
    &:after {
      @include _clearBoth();
    }
    & > p {
      float: left;
      padding: 3px 0px;
    }
    & > ul {
      float: left;
      padding-left: 10px;
      &:after {
        @include _clearBoth();
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
  .myDeskConBtn {
    padding-top: 10px;
  }
  .dataTable {
    margin-top: 10px;
    width: 100% !important;
  }
  .water-side-left,
  .water-side-center,
  .water-side-right {
    float: left;
    height: 100%;
  }

  .home {
    width: 100%;
    height: 100%;
    &:after {
      @include _clearBoth();
    }
    .water-side-con {
      width: 100%;
      height: 100%;
      zoom: 1;
      &:after {
        @include _clearBoth();
      }
    }
    .water-side-center {
      width: 55%;
      margin-right: 20px;
      height: 100%;
      & > .water-side-pie {
        width: 100%;
        height: 40%;
        zoom: 1;
        &:after {
          @include _clearBoth();
        }
        & > li {
          padding-top: 10px;
          text-align: center;
          height: 86%;
          width: 50%;
          margin: auto;
        }
      }
      & > .water-side-centerCategory {
        width: 100%;
        height: 60%;
        padding-left: 20px;
        #CategoryCustom {
          width: 100%;
          height: 90%;
        }
      }
    }
    .water-side-right {
      width: 40%;
      padding: 15px;
      height: 96%;
      .table-top {
        margin-top: 20px;
      }
    }
    .el-table .el-table__body tr .cell:nth-child(1) {
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .el-tabs__header.is-top {
    margin: 0px;
  }
  .el-tabs.el-tabs--border-card.el-tabs--top {
    height: 100%;
    .el-tabs__content {
      height: calc(100% - 68px);
      #pane-home {
        height: 100%;
        .reportCenterCon {
          height: 100%;
        }
      }
    }
  }
}
</style>