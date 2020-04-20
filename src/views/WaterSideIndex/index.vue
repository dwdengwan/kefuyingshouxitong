<template>
  <div class="WaterSideIndex">

    <!-- 弹出审批界面 -->
    <el-dialog :title="approvalPageName" class='approvalPageDio' :close-on-click-modal="false" :visible.sync="approvalPageVisible" @close="closeDialog">
      <approvalPage :approvalPageType="approvalPageType" :codeStep="codeStep" ref="approvalPage"></approvalPage>
    </el-dialog>

    <!-- 弹出业务审批界面 -->
    <el-dialog :title="sectionApprovalName" class='approvalPageDio' :close-on-click-modal="false" :visible.sync="sectionApprovalVisible" @close="closeDialog">
      <sectionApproval :sectionApprovalType="sectionApprovalType" ref="sectionApproval"></sectionApproval>
    </el-dialog>

    <!-- 弹出通知界面 -->
    <el-dialog :title="noticeApprovalName" class='approvalPageDio' :close-on-click-modal="false" :visible.sync="noticeApprovalVisible" @close="closeDialog">
      <noticeApproval ref="noticeApproval"></noticeApproval>
    </el-dialog>

    <!-- 弹出公告列表 -->
    <el-dialog :title="bulletinName" class='approvalPageDio' :close-on-click-modal="false" :visible.sync="bulletinVisible" @close="closeDialog">
      <bulletin ref="bulletin"></bulletin>
    </el-dialog>

    <section v-show="idShow" class="homePage">
      <!-- 指标 -->

      <section class="WaterSideIndex-left">
        <div class="quota">
          <div>

            <el-date-picker size="mini" :clearable='false' class='monthSelect' v-model="value3" type="month" placeholder="请选择">
            </el-date-picker>

            <el-tooltip class="item" effect="dark" content="点击这里可以查看更多指标噢~" placement="top-start">
              <i class="el-icon-s-data" @click="moreAnaly" style="
                font-size: 18px;
                margin-left: 70px;
                color: #969e9e;"></i>
            </el-tooltip>
            <div class='quota-div' :span="v.Wprecent" v-for="(v,i) in quotaCon" :key="i">
              <div class="task-num-border">
                <div class="task-num">
                  <img :src="v.src" alt="">
                  <span>
                    <i>{{v.title}}</i>
                    <p>{{v.num}}
                    </p>
                    <p>
                      <b>{{v.Company}}</b>
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      <!-- 通知公共 快捷菜单 -->
      <div class="WaterSideIndex-center">
        <ol class="WaterSideIndex-pie">
          <li class="Notice">

            <h3>
              <div class="Highlight-line"></div>
              <span>{{NoticeTitle}}</span>
              <i class="el-icon-d-arrow-right" @click="bulletinShow()"></i>
            </h3>
            <aside class="NoticeLeft">

              <div>
                <h2 v-for="(v ,i) in NoticeCon" :key="i">
                  <i class="el-icon-bell"></i>
                  {{v.con}}
                  <i class="NoticeLeftTime">{{v.time}}</i></h2>
              </div>

            </aside>

          </li>

          <li class="shortcutMenu">
            <h3>
              <div class="Highlight-line"></div><span>{{menuTitle}}</span>
            </h3>
            <section>
              <ul>
                <li @click="addTab('工作台')">
                  <h4>
                    <i class="el-icon-data-board"></i>
                    <p>工作台</p>
                  </h4>

                </li>
                <li @click="addTab('用水咨询')">
                  <h4>
                    <i class="el-icon-phone-outline"></i>
                    <p>用水咨询</p>
                  </h4>

                </li>
                <li @click="addTab('抄表录入')">
                  <h4>
                    <i class="el-icon-edit-outline"></i>
                    <p>抄表录入</p>
                  </h4>

                </li>
                <li @click="addTab('业务办理分析')">
                  <h4>
                    <i class="el-icon-data-line"></i>
                    <p>业务办理分析</p>
                  </h4>

                </li>
                <li @click="addTab('权限管理')">
                  <h4>
                    <i class="el-icon-setting"></i>
                    <p>权限管理</p>
                  </h4>

                </li>
                <li v-for="(v ,i) in shortcutMenu" :key="i">
                  <h4>
                    <i :class="v.icon"></i>
                    <p>{{v.title}}</p>
                  </h4>
                </li>
              </ul>
            </section>

          </li>

        </ol>

      </div>
      <!-- 待办栏 -->
      <div class="WaterSideIndex-right">
        <ol class="WaterSideIndex-pie">
          <!-- 待办/待审 快捷 -->
          <li class="Notice">
            <aside class="pending">
              <h3>
                <div class="Highlight-line"></div>
                <span>{{AgencyTitle}}</span>
                <el-tooltip class="item" effect="dark" content="查看更多" placement="top-start">
                  <i class="el-icon-d-arrow-right" @click="addTab(AgencyTitle,'1-1')"></i>
                </el-tooltip>

                <el-tooltip class="item" effect="dark" content="刷新" placement="top-start">
                  <i class="el-icon-refresh" @click=""></i>
                </el-tooltip>

              </h3>

              <section class="btnsBlock">
                <div v-for="(v, i) in AgencyCion" :key="i" @click="sectionShow(v.label,v.mordel)">
                  <div class="circular">
                    <el-badge :value="v.num" class="item">
                      <!-- <i>{{v.num}}</i> -->
                    </el-badge>
                  </div>
                  <img :src="v.src" alt="" />
                  <p>{{v.label}}</p>

                </div>
              </section>
            </aside>

          </li>

          <!-- 待办/待审 快捷详细项目 -->
          <li class="Notice">
            <aside class="pending">
              <h3>
                <div class="Highlight-line"></div>
                <span>{{AgencyTitleDetail}}(6)</span>

                <el-tooltip class="item" effect="dark" content="查看更多" placement="top-start">
                  <i class="el-icon-d-arrow-right" @click="addTab(AgencyTitle,'1-1')"></i>
                </el-tooltip>
                <i class="el-icon-refresh" @click=""></i>
              </h3>
              <div>

                <h2 v-for="(v ,i) in Agencylist" :key="i" @click="handlePorject(v.projectName)">
                  <img src="@/assets/images/待办详细.png" alt="" style="  height: 12px; width: 10px;" />
                  <!-- <i class="el-icon-s-check" ></i> -->
                  <i> {{v.projectName}}:{{v.con}}</i>
                </h2>

                <el-tooltip class="item" effect="dark" content="你有一条新提醒噢，请尽快处理！" placement="top-start">

                  <img @click="cionLogoShow()" class='cionLogo' :src="cute" alt="" />
                </el-tooltip>
              </div>
            </aside>

          </li>

        </ol>
      </div>
    </section>

    <!-- 流程中心 -->
    <CenterSideIndex v-if="CenterSideIndexShow"></CenterSideIndex>

  </div>
</template>
<script>
import IntegratedBusiness from "@/components/IntegratedBusiness";
import mydestop from "@/views/ProcessApproval/mydestop";
import CenterSideIndex from "@/views/CenterSideIndex";
import echartsWaterSales from "../CenterSideIndex/echartsWaterSales";
import approvalPage from "@/views/ProcessApproval/approvalPage";
import sectionApproval from "./sectionApproval";
import noticeApproval from "./noticeApproval";
import bulletin from "./bulletin";
export default {
  name: "WaterSideIndex",
  components: {
    IntegratedBusiness,
    mydestop,
    echartsWaterSales,
    approvalPage,
    sectionApproval,
    noticeApproval,
    bulletin,
    CenterSideIndex
  },
  data() {
    return {
      tableQuery: [],
      codeStep: "2",
      CenterSideIndexShow: false,
      noticeApprovalVisible: false,
      noticeApprovalName: "通知",
      noticeApprovalType: "",
      cute: require("@/assets/images/水精灵.png"),

      sectionApprovalType: "",
      sectionApprovalVisible: false,
      sectionApprovalName: "",

      bulletinVisible: false,
      bulletinName: "通知公告",

      value3: "2019",
      approvalPageVisible: false,
      approvalPageName: "办理",
      approvalPageType: "",
      historyData: [
        {
          name: "用户总数",
          value: "100万"
        },
        {
          name: "预存余额",
          value: "100万"
        },
        {
          name: "微厅关注数",
          value: "100万"
        },
        {
          name: "网厅注册数",
          value: "100万"
        },
        {
          name: "在用水表数量",
          value: "10万支"
        },
        {
          name: "在库水表数量",
          value: "20万支"
        }
      ],
      quotaCon: [
        {
          num: "本月：130万吨",
          title: "售水量",
          src: require("@/assets/images/售水量.png"),
          Company: "本年：13000万吨",
          Wprecent: 4,
          rank: 1
        },
        {
          num: "本月：99%",
          title: "水费回收率",
          src: require("@/assets/images/水质合格.png"),
          Company: "本年：95%",
          Wprecent: 3,
          rank: 1
        },
        {
          num: "本月：98%",
          title: "报装业务处理及时率",
          src: require("@/assets/images/水压合格.png"),
          Company: "本年：96%",
          Wprecent: 2,
          rank: 1
        },
        {
          num: "本月：98%",
          title: "投诉处理及时率",
          src: require("@/assets/images/投诉.png"),
          Company: "本年：95%",
          Wprecent: 1,
          rank: 1
        }
      ],
      NoticeTitle: "通知公告",
      AgencyTitle: "待办分类",
      menuTitle: "快捷菜单",
      AgencyTitleDetail: "待办项目",
      NoticeCon: [
        {
          con: "深圳市罗湖区爱国路停水通知",
          time: "2019-09-09 "
        },
        {
          con: "非居民用水报装指南-永久用水",
          time: "2019-09-11 "
        },
        {
          con: "深圳水库2019年度水质报告",
          time: "2019-09-09 "
        },
        {
          con: "罗湖水厂开放日通知",
          time: "2019-09-11 "
        }
      ],
      Agencylist: [
        {
          projectName: "用水咨询",
          con: "【SS00192】张三"
        },
        {
          projectName: "停用",
          con: "【CM00112】王燕"
        },
        {
          projectName: "销户",
          con: "【CH00192】李四"
        },
        // {
        //   projectName:'余额过户',
        //   con: "【CH00192】王五"
        // },
        {
          projectName: "违约金减免",
          con: "【CH00192】李四"
        },
        {
          projectName: "冲红",
          con: "【CH00192】李四"
        },
        {
          projectName: "校表",
          con: "【CH00192】李四"
        }
      ],
      AgencyCion: [
        {
          label: "工程管理",
          name: "InvoiceReplacement",
          src: require("@/assets/images/待办工程管理.png"),
          num: 1,
          mordel: "2-1"
        },
        {
          label: "抄表开账",
          name: "InvoiceReplacement",
          src: require("@/assets/images/待办抄表开账.png"),
          num: 0,
          mordel: "2-6"
        },
        {
          label: "收费管理",
          name: "InvoiceReplacement",
          src: require("@/assets/images/待办收费管理.png"),
          num: 2,
          mordel: "2-7"
        },
        {
          label: "客户管理",
          name: "UnsettledAccountsStatistics",
          src: require("@/assets/images/待办客户管理.png"),
          num: 2,
          mordel: "2-3"
        },
        {
          label: "表计管理",
          name: "CancellationChargeAuthorization",
          src: require("@/assets/images/待办表计管理.png"),
          num: 1,
          mordel: "2-4"
        },
        {
          label: "客户通知",
          name: "CancellationChargeAuthorization",
          src: require("@/assets/images/待办客户通知.png"),
          num: 0,
          mordel: "2-8"
        }
      ],
      idShow: true,
      shortcutMenu: [
        // {
        //     icon:"el-icon-menu",
        //     title:"工作台"
        // },
        {
          icon: "el-icon-plus",
          title: "自定义菜单"
        },
        {
          icon: "el-icon-plus",
          title: "自定义菜单"
        },
        {
          icon: "el-icon-plus",
          title: "自定义菜单"
        }
      ]
    };
  },
  mounted() {
    // this.initTest();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, ".WaterSideIndex .WaterSideIndex-right", [
        ".WaterSideIndex .table-top",
        ".WaterSideIndex .blank"
      ]);
    });
  },
  methods: {
    // initTest() {
    //   let _this = this;
    //   this.$api
    //     .fetch({
    //       params: {
    //         busicode: "CostNameSelect",
    //         data: {}
    //       } //参数
    //     })
    //     .then(res => {
    //       _this.tableQuery = res;
    //     });
    // },
    moreAnaly() {
      this.CenterSideIndexShow = true;
      this.idShow = false;
    },
    cionLogoShow() {
      this.noticeApprovalVisible = true;
    },
    handlePorject(val) {
      this.approvalPageType = val;
      this.approvalPageName = "办理-" + val;
      this.approvalPageVisible = true;
      this.codeStep = "2";
    },
    closeDialog() {
      //关闭会话
      this.waterAddVisible = false;
      this.approvalPageVisible = false;
      this.sectionApprovalVisible = false;
      this.noticeApprovalVisible = false;
      this.bulletinVisible = false;
      this.codeStep = "0";
    },
    sectionShow(val, value) {
      this.sectionApprovalType = value;
      this.sectionApprovalVisible = true;

      this.sectionApprovalName = "办理-" + val;
    },
    bulletinShow() {
      this.bulletinVisible = true;
    },
    addTab(targetName, mordel) {
      if (targetName === "待办分类") {
        let routeUrl = this.$router.resolve({
          path: "/ProcessApproval/PendingTrial"
        });
        window.open(routeUrl.href, "_blank");
        localStorage.setItem("text", "true");
        localStorage.setItem("mordel", mordel);
      } else if (targetName === "工作台") {
        this.$router.push({ path: "/HallBusiness" });
        $(".menu_img")
          .eq(0)
          .attr("src", require("../../assets/images/Home.png"));
        $(".menu_img")
          .eq(1)
          .attr("src", require("../../assets/images/Workbench-active.png"));
        $(".menu_img")
          .eq(2)
          .attr("src", require("../../assets/images/Business.png"));
        $(".menu_img")
          .eq(3)
          .attr("src", require("../../assets/images/Statistical.png"));
        $(".menu_img")
          .eq(4)
          .attr("src", require("../../assets/images/Basics.png"));
        $(".menu_img")
          .eq(5)
          .attr("src", require("../../assets/images/system.png"));
      } else if (targetName === "通知公告") {
        this.$parent.getSecondMenu("Business");
        this.$router.push({
          path: "/CustomerNotificationCenter/InformationReleaseManagement"
        });
      } else if (targetName === "用水咨询") {
        this.$parent.getSecondMenu("Business");
        this.$router.push({ path: "/EngineeringManagement/waterQuery" });
      } else if (targetName === "抄表录入") {
        this.$parent.getSecondMenu("Business");
        this.$router.push({ path: "/MeterReading/MeterReadingRecord" });
      } else if (targetName === "权限管理") {
        this.$parent.getSecondMenu("system");
        this.$router.push({ path: "/RoleManage" });
      } else if (targetName === "业务办理分析") {
        this.$parent.getSecondMenu("Statistical");
        this.$router.push({ path: "/BusinessManagement" });
      } else if (targetName === "微信对账异常提醒") {
        this.noticeApprovalVisible = false;
        this.$parent.getSecondMenu("Business");
        this.$router.push({ path: "/ChargeManagement/UnionPay" });
      } else if (targetName === "水表到期提醒") {
        this.noticeApprovalVisible = false;
        this.$parent.getSecondMenu("Business");
        this.$router.push({ path: "/MeterReading/AbnormalVerification " });
      }
    },
    backDialog() {
      this.CenterSideIndexShow = false;
      this.idShow = true;
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;

.WaterSideIndex {
  .approvalPageDio {
    .el-dialog {
      width: 94%;
      height: 96%;
    }
  }
  .homePage {
    width: 100%;
    height: 100%;
  }
  .mydestop,
  .BusinessHall {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    padding: 10px;
  }
  .el-table .el-table__body tr td:nth-child(1) div {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cionLogo {
    width: 50px;
    position: absolute;
    bottom: 260px;
    right: 36px;
  }
  .Highlight-line {
    height: 20px;
    width: 2px !important;
    background-color: #297acc;
    padding-left: 0px !important;
    margin-right: 10px;
    margin-top: 8px;
  }
  &:after {
    @include _clearBoth();
  }

  .WaterSideIndex-center {
    width: 55%;
    height: 100%;
    float: left;
    .WaterSideIndex-pie {
      width: 100%;
      height: 100%;
      zoom: 1;
      &:after {
        @include _clearBoth();
      }
      & > li {
        box-shadow: 0 0 10px #0000004a;
        float: left;
        width: calc(100% - 22px);
        height: calc(50% - 20px);
        border-radius: 2px;
        margin: 10px;
        border: 1px solid #e4e7ed;
        h3 {
          height: 35px;
          line-height: 35px;
          font-size: 16px;
          padding-left: 15px;
          border-bottom: 1px solid #e4e7ed;
          background-color: #f5f5f5;
          // color: #fff;
          zoom: 1;
          &:after {
            @include _clearBoth();
          }
          & > div {
            padding-left: 15px;
            float: left;
            zoom: 1;
            &:first-of-type {
              width: calc(50% - 16px);
              border-right: 1px solid #f5f5f5;
            }
            &:last-of-type {
              width: calc(50% - 15px);
            }
            &:after {
              @include _clearBoth();
            }
          }
          span {
            float: left;
          }
          i {
            float: right;
            font-size: 18px;
            width: 30px;
            height: 35px;
            line-height: 35px;
            &:hover {
              cursor: pointer;
            }
          }
          & > h5 {
            float: right;
            padding-right: 10px;
            .el-input__inner {
              padding-left: 2px;
            }
          }
        }
        section {
          width: 100%;
          height: calc(100% - 50px);
          margin-top: 10px;
          zoom: 1;
          &:after {
            @include _clearBoth();
          }
          div {
            float: left;
            width: 50%;
            height: calc(100% - 5px);
          }
          h2 {
            height: 25px;
            line-height: 25px;
            // text-align: center;
            padding-left: 15px;
            font-size: 14px;
            font-weight: 700;
          }

          ol {
            zoom: 1;
            &:after {
              @include _clearBoth();
            }
          }
          ol li {
            p {
              height: 25px;
              line-height: 25px;
              text-align: center;
              padding-left: 20px;
              font-size: 14px;
              font-weight: 700;
              span {
                margin-left: 10px;
              }
            }
          }
        }
      }
      & > .WaterSideIndex-left {
        width: calc(100% - 20px);
        zoom: 1;
        &:after {
          @include _clearBoth();
        }
        & > section {
          width: 50%;
          float: left;
          div {
            //    margin-top: 25px;
            height: 100%;
          }
        }
        .waterPay div {
          // margin-top: 25px;
        }
      }
      .Notice {
        width: calc(100% - 22px);
        zoom: 1;
        &:after {
          @include _clearBoth();
        }
        .NoticeLeft {
          float: left;
          width: calc(50% - 22px);
          // width: calc(50% - 10px);
          // border-right: 1px solid #f5f5f5;
        }
        .NoticeLeft {
          height: 100%;
          width: calc(100% - 22px);
          padding-left: 15px;
          h2 {
            color: #666666;
            font-weight: 400;
            margin-bottom: 10px;
            .el-icon-bell {
              color: #3991dc;
            }
            .NoticeLeftTime {
              font-style: unset;
              margin-top: 0px;
              line-height: 20px;
              font-size: 12px;
              white-space: nowrap;
              margin-right: 0;
              margin-left: 5px;
              width: 10em;
              max-width: 10em;
              display: inline-block;
              color: #9e9e9e;
              text-align: right;
              float: right;
              margin-right: 10px;
            }
            &:hover {
              cursor: pointer;
              color: $theme-color;
            }
          }

          & > div {
            padding-top: 15px;
          }
        }
        section {
          margin-top: 0px;

          div {
            padding-top: 15px;
            &:nth-of-type(1) {
              width: calc(50% - 1px);
              border-right: 1px solid #f5f5f5;
            }
            h2 {
              color: #666666;
              font-weight: 400;
              &:hover {
                text-decoration: underline;
                cursor: pointer;
                color: $theme-color;
              }
            }
          }
        }
      }
      .shortcutMenu {
        section {
          ul {
            width: 100%;
            height: 100%;
            zoom: 1;
            &:after {
              @include _clearBoth();
            }
            & > li {
              float: left;
              width: calc(25% - 12px);
              height: calc(50% - 12px);
              text-align: center;
              border: 1px dashed #b2b4b8ad;
              margin: 5px;
              position: relative;
              background-color: #fefeff;
              &:hover {
                cursor: pointer;
                background: #d0e0ff52;
              }
              &:nth-of-type(1) {
                color: #f77a76;
                // width: calc(50% - 12px);
              }
              &:nth-of-type(2) {
                color: #66b5f0;
                // width: calc(50% - 12px);
              }
              &:nth-of-type(3) {
                color: #a1de8e;
              }
              &:nth-of-type(4) {
                color: #98adff;
              }
              &:nth-of-type(5) {
                color: #ffca64;
              }
              &:nth-of-type(6) {
                color: #c0c4cc;
              }
              &:nth-of-type(7) {
                color: #c0c4cc;
              }
              &:nth-of-type(8) {
                color: #c0c4cc;
              }
              i {
                font-size: 3.5rem;
                padding: 0.65rem 1.68rem;
              }
              h4 {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            }
          }
        }
      }
    }
  }

  .WaterSideIndex-right {
    width: 25%;
    height: 100%;
    float: left;

    .WaterSideIndex-pie {
      width: 100%;
      height: 100%;
      zoom: 1;
      &:after {
        @include _clearBoth();
      }
      & > li {
        float: left;
        box-shadow: 0 0 10px #0000004a;
        width: calc(100% - 20px);
        height: calc(50% - 20px);
        border-radius: 2px;
        margin: 10px;
        border: 1px solid #e4e7ed;
        h3 {
          height: 35px;
          line-height: 35px;
          font-size: 16px;
          padding-left: 15px;
          border-bottom: 1px solid #e4e7ed;
          zoom: 1;
          background-color: #f5f5f5;
          &:after {
            @include _clearBoth();
          }
          & > div {
            padding-left: 15px;
            float: left;
            zoom: 1;
            &:first-of-type {
              width: calc(50% - 16px);
              border-right: 1px solid #f5f5f5;
            }
            &:last-of-type {
              width: calc(50% - 15px);
            }
            &:after {
              @include _clearBoth();
            }
          }
          span {
            float: left;
          }
          i {
            float: right;
            font-size: 18px;
            width: 30px;
            height: 35px;
            line-height: 35px;
            &:hover {
              cursor: pointer;
            }
          }
          & > h5 {
            float: right;
            padding-right: 10px;
            .el-input__inner {
              padding-left: 2px;
            }
          }
        }
      }
      .Notice {
        zoom: 1;
        &:after {
          @include _clearBoth();
        }
        .btnsBlock {
          width: 100%;
          height: calc(100% - 46px);
          margin: 5px auto;
          .circular {
            text-align: center;
            color: #fff;
            position: relative;
            z-index: 2;
            margin-left: 15px;
            position: absolute;
            left: calc(50% + 2px);
            top: -7px;
          }
          & > div {
            width: 17%;
            float: left;
            text-align: center;
            height: 43px;
            /* margin-right: 49px; */
            margin: 21px 27px;
            position: relative;
          }
        }
        .pending {
          height: 100%;
          h2 {
            color: #666666;
            font-weight: 400;
            margin-bottom: 10px;
            i {
              font-style: initial;
              display: inline-block;
              width: calc(100% - 30px);
            }
            &:hover {
              text-decoration: underline;
              cursor: pointer;
              color: $theme-color;
            }
          }

          & > div {
            padding-top: 15px;
            padding-left: 15px;
            position: relative;
          }
        }
      }
    }
  }
  .WaterSideIndex-left {
    width: 20%;
    height: 100%;
    float: left;
    background: #fafafa;
  }
  .quota {
    margin: 10px;
    /* margin: 0 auto; */
    height: calc(100% - 20px);
    padding: 10px;
    border: 1px solid #e4e7ed;
    /* border: 1px solid #E4E7ED; */
    box-shadow: 0 0 10px #0000004a;
    .monthSelect {
      margin-bottom: 10px;
      width: 60% !important;
    }
    .el-date-editor /deep/ .el-input__inner {
      font-size: 14px;
      color: #0f78ab;
      border: 0px;
    }
    .el-input__prefix {
      font-size: 14px;
      color: #0f78ab;
    }
    .quota-div {
      height: 21%;
      padding-bottom: 10px;
    }
    .task-num-border {
      border: 1px solid #e4e7ed;
      border-radius: 5px;
      background: #fff;
      // height: 100%;
    }
    .task-num {
      width: 185px;
      margin: 0 auto;
      padding: 2.3rem 0px;
      &:first {
        margin-left: 0;
      }

      &:after {
        @include _clearBoth();
      }
      &:hover {
        // background: #eaf4ff;
        cursor: pointer;
      }
      img {
        width: 3rem;
        height: 3.18rem;
        vertical-align: middle;
        float: left;
        margin-right: 10px;
        margin-top: 10px;
      }
      span {
        float: left;
      }
      p {
        font-size: 0.75rem;
        font-family: "\5FAE\8F6F\96C5\9ED1";
        color: #000;
        margin-top: 5px;
      }
      i {
        color: $theme-color;
        font-size: 14px;
        font-style: normal;
      }
      b {
        color: #000;
        font-size: 12px;
        font-weight: 400;
      }
    }
    .el-col:nth-of-type(1) {
      padding-left: 0px !important;
      .task-num {
        width: 163px;
        margin: 0 auto;
      }
    }
    .el-col:nth-of-type(4) {
      .task-num {
        width: 166px;
        margin: 0 auto;
      }
    }
    .el-col:nth-of-type(3) {
      .task-num {
        width: 185px;
        margin: 0 auto;
      }
    }
    .el-col:last-child {
      .task-num {
        width: 123px;
      }

      span {
        margin-top: 10px;
      }
    }
  }
}
@media screen and (max-width: 1440px) {
  .WaterSideIndex .WaterSideIndex-center .WaterSideIndex-pie .shortcutMenu {
    section {
      margin-top: 5px;
      height: calc(100% - 40px);
      ul {
        & > li {
          float: left;
          width: calc(25% - 12px);
          height: calc(50% - 12px);
          text-align: center;
          // border:1px dashed rgb(12, 16, 24);
          margin: 5px;
          &:nth-of-type(1) {
            width: calc(50% - 12px);
          }
          &:nth-of-type(2) {
            width: calc(50% - 12px);
          }
          i {
            font-size: 2rem;
            padding: 0.15rem 1.68rem;
          }
        }
      }
    }
  }
}
</style>
