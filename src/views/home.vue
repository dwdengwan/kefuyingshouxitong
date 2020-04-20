<template>
  <div class="custom-home">
    <header>
      <first-Nav :firstNav="firstNav" @changeNav="changeNav">
        <div class="leftItem header-top-right">
          <!-- <el-select v-model="checkedCompany" @change="sendCompany">
              <el-option
                  v-for="item in companyData"
                  :key="item.interiorCode"
                  :label="item.shortName"
                  :value="item.interiorCode">
              </el-option>
            </el-select> -->
          <img class="menu_img menu1" src="../assets/images/Home-active.png" @click="getSecondMenu('Home')" alt="" >
          <img class="menu_img menu2" src="../assets/images/Workbench.png" @click="getSecondMenu('Workbench')" alt="">
          <img class="menu_img menu3" src="../assets/images/Business.png" @click="getSecondMenu('Business')" alt="">
          <img class="menu_img menu4" src="../assets/images/Statistical.png" @click="getSecondMenu('Statistical')" alt="">
          <img class="menu_img menu5" src="../assets/images/Basics.png" @click="getSecondMenu('Basics')" alt="">
          <img class="menu_img menu6" src="../assets/images/system.png" @click="getSecondMenu('system')" alt="">

          <div class="loginArea" @mouseover="changeStyle" @mouseout="restStyle">
                <img :src=" userInfo.photourl" alt>

            <div class='infoPop'  >
                    <div class="nick">你好，周新宇</div>
                    <div class="line"></div>
                    <div class="loginout" @click="loginout()">[退出登录]</div>
            </div>
          </div>
            <!-- <i>  
                <img :src=" userInfo.photourl" alt>
            </i>
            <div style=''>
                    <el-button type="text">周新宇</el-button>
            </div>
          
          <span @click="quit">
            <i class="el-icon-switch-button"></i>
            退出
          </span> -->
        </div>
      </first-Nav>

    </header>

    <aside v-show="menuShow" class="primary-menu">
      <aside class="kl-aside">
        <!-- <second-Nav :secondNav="secondNav"></second-Nav> -->
        <!-- 业务办理 -->
        <second-Nav :secondNav="businessMenu.secondNav1" v-show="menuShowData.businessMenuShow1"></second-Nav>
        <second-Nav :secondNav="businessMenu.secondNav2" v-show="menuShowData.businessMenuShow2"></second-Nav>
        <second-Nav :secondNav="businessMenu.secondNav3" v-show="menuShowData.businessMenuShow3"></second-Nav>
        <second-Nav :secondNav="businessMenu.secondNav4" v-show="menuShowData.businessMenuShow4"></second-Nav>
        <second-Nav :secondNav="businessMenu.secondNav5" v-show="menuShowData.businessMenuShow5"></second-Nav>
        <second-Nav :secondNav="businessMenu.secondNav6" v-show="menuShowData.businessMenuShow6"></second-Nav>
        <!-- 基础信息 -->
        <second-Nav :secondNav="basicsMenu.secondNav1" v-show="menuShowData.basicsMenuShow1"></second-Nav>
        <second-Nav :secondNav="basicsMenu.secondNav2" v-show="menuShowData.basicsMenuShow2"></second-Nav>
        <!-- <second-Nav :secondNav="basicsMenu.secondNav3" v-show="menuShowData.basicsMenuShow3"></second-Nav> -->
        <second-Nav :secondNav="basicsMenu.secondNav4" v-show="menuShowData.basicsMenuShow4"></second-Nav>
        <second-Nav :secondNav="basicsMenu.secondNav5" v-show="menuShowData.basicsMenuShow5"></second-Nav>
        <second-Nav :secondNav="basicsMenu.secondNav6" v-show="menuShowData.basicsMenuShow6"></second-Nav>
      </aside>
      <div class="collapse" @click="collapse">
        <i class="el-icon-arrow-left leftChange"></i>
      </div>
    </aside>
    <section class="kl-container  aside-show-css">
      <div class="kl-main loadingHiden" style="margin-left: 0px;" id="main-home">
        <router-view v-if='isRouterAlive'></router-view>
      </div>
    </section>
  </div>
</template>
<script>
import WaterSideIndex from './WaterSideIndex/index'
export default {
  name: "custom-home",
  components: {
    WaterSideIndex,
  },
  data() {
    return {
      firstNav: {
        //系统名称
        title: '营业收费系统',
        //logo路径
        logoSrc: require('../assets/images/logo3.png'),
        //导航
        navData: {
          navList: [
          ],
          //默认路径
          activeChanel: '/CenterSideIndex',
        },
      },
      
      // 显示侧边栏
      menuShowData: {
        //工程管理
        businessMenuShow1: false,
        businessMenuShow2: false,
        businessMenuShow3: false,
        businessMenuShow4: false,
        businessMenuShow5: false,
        businessMenuShow6: false,
        // 基础信息
        basicsMenuShow1: false,
        basicsMenuShow2: false,
        basicsMenuShow3: false,
        basicsMenuShow4: false,
        basicsMenuShow5: false,
        basicsMenuShow6: false,
      },

      // 业务办理侧边栏菜单
      businessMenu: {
        // 工程管理
        secondNav1: {
          navList: [
            {
              NavName: "用户工程",
              icon: "EngineeringCenter1",
              type: 'submenu',
              url: "/EngineeringManagement/waterQuery",
              children: [
                {
                  type: 'firstmenu',
                  icon: "EngineeringCenter1-4 ",
                  children: [],
                  NavName: "用水咨询",
                  url: "/EngineeringManagement/waterQuery",
                  // showbadge: true,
                  // badge:{
                  //   color: 'rgb(226, 55, 85)',
                  //   value: '1',
                  //   marginL: '20px'
                  // }
                },
                {
                  type: 'firstmenu',
                  icon: "EngineeringCenter1-2 ",
                  children: [],
                  NavName: "用水安装",
                  url: "/EngineeringManagement/waterMeterInstall",
                  // showbadge: true,
                  // badge:{
                  //   color: 'rgb(226, 55, 85)',
                  //   value: '3',
                  //   marginL: '20px'
                  // }
                },
              ],
            },
            {
              icon: "EngineeringCenter2 ",
              type: 'firstmenu',
              children: [],
              url: "/EngineeringManagement/insideAllProjects",
              NavName: "内部工程"
            },
          ]
        },
        // 客户管理
        secondNav2: {
          navList: [
            {
              type: 'firstmenu',
              icon: "CustomerCenter1",
              url: "/CustomerManagement/userInfo",
              children: [],
              NavName: "查询"
            },
            {
              icon: "CustomerCenter2 ",
              type: 'firstmenu',
              children: [],
              url: "/CustomerManagement/OpenAccount",
              NavName: "开户"
            },
            {
              icon: "CustomerCenter3 ",
              type: 'firstmenu',
              children: [],
              url: "/CustomerManagement/Transfer",
              NavName: "过户",
              // showbadge: true,
              // badge:{
              //   color: 'rgb(226, 55, 85)',
              //   value: '1',
              //   marginL: '20px'
              // }
            },
            {
              icon: "CustomerCenter7 ",
              type: 'firstmenu',
              children: [],
              url: "/CustomerManagement/IncorporativeAccount",
              NavName: "并户"
            },
            {
              icon: "CustomerCenter4 ",
              type: 'firstmenu',
              children: [],
              url: "/CustomerManagement/DiscontinueUse",
              NavName: "停用"
            },
            {
              icon: "CustomerCenter5 ",
              type: 'firstmenu',
              children: [],
              url: "/CustomerManagement/multiplexing",
              NavName: "复用"
            },
            {
              icon: "CustomerCenter6 ",
              type: 'firstmenu',
              children: [],
              url: "/CustomerManagement/SalesAccount",
              NavName: "销户"
            },
            {
              icon: "CustomerCenter8 ",
              type: 'firstmenu',
              children: [],
              url: "/CustomerManagement/CustomerChange",
              NavName: "变更"
            },
            {
              icon: "CustomerCenter9 ",
              type: 'firstmenu',
              children: [],
              url: "/CustomerManagement/BatchManagement",
              NavName: "批量管理"
            },
          ]
        },
        // 抄表开账
        secondNav3: {
          navList: [
            {
              icon: "MeterReadingCenter1",
              type: 'submenu',
              url: "/MeterReading/MeterReadingRecord",
              children: [
                {
                  type: 'firstmenu',
                  icon: "MeterReadingCenter1-1",
                  children: [],
                  NavName: "抄表录入",
                  url: "/MeterReading/MeterReadingRecord"
                },
                {
                  type: 'firstmenu',
                  icon: "MeterReadingCenter1-4",
                  children: [],
                  NavName: "抄表轨迹",
                  url: "/MeterReading/MeterReadingTrack"
                },
                {
                  type: 'firstmenu',
                  icon: "MeterReadingCenter1-2",
                  children: [],
                  NavName: "打印抄表卡",
                  url: "/MeterReading/PrintMeterReadingCard"
                },
              ],
              NavName: "抄表"
            },
            {
              icon: "MeterReadingCenter2",
              type: 'submenu',
              url: "/MeterReading/AnomalyAnalysis",
              children: [
                {
                  type: 'firstmenu',
                  icon: "MeterReadingCenter3-1",
                  children: [],
                  NavName: "水量异常",
                  url: "/MeterReading/AnomalyAnalysis"
                },
                {
                  type: 'firstmenu',
                  icon: "MeterReadingCenter3-2",
                  children: [],
                  NavName: "水表异常",
                  url: "/MeterReading/AbnormalVerification"
                },
                {
                  type: 'firstmenu',
                  icon: "MeterReadingCenter3-4",
                  children: [],
                  NavName: "费用异常",
                  url: "/MeterReading/AbnormalExpenses"
                },
                {
                  type: 'firstmenu',
                  icon: "MeterReadingCenter3-3",
                  children: [],
                  NavName: "抄表抽查",
                  url: "/MeterReading/QualityReading"
                },
              ],
              NavName: "检查"
            },

            {
              icon: "MeterReadingCenter3",
              type: 'firstmenu',
              children: [],
              url: "/MeterReading/BatchOpening",
              NavName: "开账"
            },
            


            {
              icon: "MeterReadingCenter6",
              type: 'submenu',
              children: [
                {
                  type: 'firstmenu',
                  icon: "MeterReadingCenter6-1",
                  children: [],
                  NavName: "账单打印",
                  url: "/MeterReading/CustomerNotification",
                },
                {
                  type: 'firstmenu',
                  icon: "MeterReadingCenter6-2",
                  children: [],
                  NavName: "欠费催缴单",
                  url: "/MeterReading/ArrearageCollection"
                },
              ],
              // url: "/BookInfo",
              NavName: "打印管理"
            },


            {
              icon: "MeterReadingCenter4",
              type: 'submenu',
              url: "/MeterReading/TotalScoreAnalysis",
              children: [
                {
                  type: 'firstmenu',
                  icon: "MeterReadingCenter5-4",
                  children: [],
                  NavName: "总分分析",
                  url: "/MeterReading/TotalScoreAnalysis"
                },
                {
                  type: 'firstmenu',
                  icon: "MeterReadingCenter5-1",
                  children: [],
                  NavName: "用水分析",//分为用户用水分析、大用户用水分析、客户用水分析
                  url: "/MeterReading/Statistics"
                },
              ],
              NavName: "统计"
            },
            {
              icon: "MeterReadingCenter5",
              type: 'submenu',
              url: "/MeterReading/BookAdjustment",
              children: [
                {
                  type: 'firstmenu',
                  icon: "MeterReadingCenter5-1",
                  children: [],
                  NavName: "表册调整",
                  url: "/MeterReading/BookAdjustment"
                },
                {
                  type: 'firstmenu',
                  icon: "MeterReadingCenter5-4",
                  children: [],
                  NavName: "抄表计划",
                  url: "/MeterReading/PlanAdjustment"
                },
                {
                  type: 'firstmenu',
                  icon: "MeterReadingCenter5-3",
                  children: [],
                  NavName: "抄表路线",
                  url: "/MeterReading/MeterReadingCircuit"
                },
                {
                  type: 'firstmenu',
                  icon: "MeterReadingCenter5-2",
                  children: [],
                  NavName: "特权修改",
                  url: "/MeterReading/PrivilegeModification"
                },
                {
                  type: 'firstmenu',
                  icon: "MeterReadingCenter5-5",
                  children: [],
                  NavName: "表阀门管理",
                  url: "/MeterReading/TableValveManagement"
                },
              ],
              NavName: "计划维护"
            },
          ],
        },
        // 收费管理
        secondNav4: {
          navList: [
            {
              type: 'firstmenu',
              icon: "FinancialCenter1",
              children: [],
              url: "/ChargeManagement/TollInquiry",
              NavName: "收费查询"
            },
            {
              icon: "FinancialCenter2",
              type: 'firstmenu',
              children: [],
              url: "/ChargeManagement/BankCharges",
              NavName: "银行代扣"
            },
            {
              icon: "FinancialCenter3",
              type: 'firstmenu',
              children: [],
              url: "/ChargeManagement/ManualCollection",
              NavName: "手工托收"
            },
            
            {
              icon: "FinancialCenter4",
              type: 'submenu',
              url: "/ChargeManagement/UnionPay",
              children: [
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter3-1",
                  url: "/ChargeManagement/UnionPay",
                  NavName: "互联网对账"
                },
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter3-2",
                  url: '/ChargeManagement/DailyReconciliation',
                  NavName: "日收款对账"
                },
              ],
              NavName: "收款对账"
            },
            {
              icon: "FinancialCenter5",
              type: 'submenu',
              url: "/ChargeManagement/FinancialAdjustment",
              children: [
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter4-1",
                  url: "/ChargeManagement/FinancialAdjustment",
                  NavName: "费用调整"
                },
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter4-9",
                  url: "/ChargeManagement/OtherCharges",
                  NavName: "其他收费"
                },
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter4-2",
                  url: '/ChargeManagement/Recover',
                  NavName: "举报罚款"
                },
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter4-3",
                  url: "/ChargeManagement/LiquidatedDamages",
                  NavName: "违约金减免"
                },
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter4-4",
                  url: "/ChargeManagement/DealingBadDebts",
                  NavName: "呆账处理"
                },
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter4-5",
                  url: "/ChargeManagement/ReportingBadDebts",
                  NavName: "坏账报损"
                },
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter4-6",
                  url: "/ChargeManagement/RedFlushing",
                  NavName: "冲红"
                },
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter4-7",
                  url: "/ChargeManagement/CancellMonthly",
                  NavName: "取消当月收费"
                },
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter4-8",
                  url: "/ChargeManagement/ClosingCollectionPayment",
                  NavName: "代收支付关闭"
                },

              ],
              NavName: "账务调整"
            },
            {
              icon: "FinancialCenter6",
              type: 'submenu',
              url: "/ChargeManagement/BalanceWithdrawal",
              children: [
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter8-1",
                  url: "/ChargeManagement/BalanceWithdrawal",
                  NavName: "余额取出"
                },
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter8-2",
                  url: '/ChargeManagement/BalanceTransfer',
                  NavName: "余额过户"
                },
              ],
              NavName: "余额管理"
            },
            {
              icon: "FinancialCenter7",
              type: 'firstmenu',
              children: [],
              url: "/ChargeManagement/FinancialManagement",
              NavName: "月结"
            },
            {
              icon: "FinancialCenter8",
              type: 'submenu',
              url: "/ChargeManagement/BillManagement",
              children: [
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter7-1",
                  url: "/ChargeManagement/BillManagement",
                  NavName: "票据注册"
                },
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter7-2",
                  url: "/ChargeManagement/InvoiceAcquisition",
                  NavName: "票据领用"
                },
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter7-3",
                  url: "/ChargeManagement/InvoiceBorrowing",
                  NavName: "票据调用"
                },
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter7-4",
                  url: "/ChargeManagement/InvoiceInvalidated",
                  NavName: "票据修改"
                },
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter7-5",
                  url: "/ChargeManagement/InvoicePayment",
                  NavName: "票据交票"
                },
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter7-6",
                  url: "/ChargeManagement/InvoiceSearch",
                  NavName: "票据查询"
                },
              ],
              NavName: "票据管理"
            },
            {
              icon: "FinancialCenter9",
              type: 'submenu',
              url: "/WaterPrice/WaterPrice",
              children: [
                {
                  type: 'firstmenu',
                  icon: "BusinessArea9-1",
                  children: [],
                  NavName: "用水价格",
                  url: "/WaterPrice/WaterPrice"
                },
                // {
                //   type: 'firstmenu',
                //   icon: "BusinessArea9-2",
                //   children: [],
                //   NavName: "计费策略",
                //   url: "/WaterPrice/PriceInfo"
                // },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea9-3",
                  children: [],
                  NavName: "用水类型",
                  url: "/WaterPrice/WaterType"
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea9-4",
                  children: [],
                  NavName: "优惠策略",
                  url: "/WaterPrice/CheapStrategy"
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea9-5",
                  children: [],
                  NavName: "违约策略",
                  url: "/WaterPrice/BreakSet"
                },
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter9-9",
                  url: "/WaterPrice/GarbagePricing",
                  NavName: "垃圾费定价"
                },
                // {
                //   type: 'firstmenu',
                //   icon: "FinancialCenter9-10",
                //   url: "/WaterPrice/GarbageManagement",
                //   NavName: "垃圾费管理"
                // },
              ],
              NavName: "价格管理"
            },

          ],
        },
        // 表计管理
        secondNav5: {
          navList: [
            {
              icon: "WatchCenter1",
              type: 'firstmenu',
              children: [],
              NavName: "查询",
              url: "/MeterManagement/WaterMeterInquiry"
            },
            {
              icon: "WatchCenter2",
              type: 'firstmenu',
              children: [],
              NavName: "注册",
              url: "/MeterManagement/Warehousing",
              // showbadge: true,
              // badge:{
              //   color: 'rgb(226, 55, 85)',
              //   value: '1',
              //   marginL: '20px'
              // }
            },
            {
              icon: "WatchCenter3",
              type: 'firstmenu',
              children: [],
              NavName: "换表",
              url: "/MeterManagement/ChangeTables",
              // showbadge: true,
              // badge:{
              //   color: 'rgb(226, 55, 85)',
              //   value: '3',
              //   marginL: '20px'
              // }
            },
            {
              icon: "WatchCenter4",
              type: 'firstmenu',
              children: [],
              NavName: "拆表",
              url: "/MeterManagement/TableDismantling"
            },
            {
              icon: "WatchCenter5",
              type: 'firstmenu',
              children: [],
              NavName: "复表",
              url: "/MeterManagement/DuplicateTable"
            },
            {
              icon: "WatchCenter6",
              type: 'firstmenu',
              children: [],
              NavName: "用户复核",
              url: "/MeterManagement/ComparisonTable"
            },
            {
              icon: "WatchCenter7",
              type: 'firstmenu',
              children: [],
              NavName: "维检",
              url: "/MeterManagement/DimensionalInspection"
            },
            {
              icon: "WatchCenter8",
              type: 'firstmenu',
              children: [],
              NavName: "变更",
              url: "/MeterManagement/wMeterEdit"
            },
          ],
        },
        // 客户通知
        secondNav6: {
          navList: [
            {
              icon: "ServiceCentre1",
              type: 'firstmenu',
              children: [],
              url: "/CustomerNotificationCenter/InformationReleaseManagement",
              NavName: "通知公告"
            },
            {
              type: 'firstmenu',
              icon: "ServiceCentre3",
              url: "/CustomerNotificationCenter/NotificationDetails",
              children: [],
              NavName: "消息查询"
            },

            {
              type: 'firstmenu',
              icon: "ServiceCentre4",
              url: "/CustomerNotificationCenter/QuestionnaireManagement",
              children: [],
              NavName: "满意度调查"
            },
            {
              type: 'firstmenu',
              icon: "ServiceCentre5",
              url: "/CustomerNotificationCenter/MessageSending",
              children: [],
              NavName: "短信发送"
            },
          ],
        },
      },
      // 基础信息侧边栏菜单
      basicsMenu: {
        // 区域配置
        secondNav1: {
          navList: [
            {
              type: 'firstmenu',
              icon: "BusinessArea1-1",
              children: [],
              NavName: "营业所",
              url: "/RegionalConfiguration/BusinessArea"
            },
            {
              type: 'firstmenu',
              icon: "BusinessArea1-2",
              children: [],
              NavName: "营业区域",
              url: "/RegionalConfiguration/ManagementArea",
            },
            // {
            //   type: 'firstmenu',
            //   icon: "BusinessArea1-3",
            //   children: [],
            //   NavName: "行政区域",
            //   url: "/RegionalConfiguration/AdminRegion"
            // },
          ],
        },
        // 水表配置
        secondNav2: {
          navList: [
            {
              type: 'firstmenu',
              icon: "BusinessArea1-6",
              children: [],
              NavName: "水表型号",
              url: "/WaterMeterConfiguration/WatermeterModel"
            },
            // {
            //   type: 'firstmenu',
            //   icon: "BusinessArea1-7",
            //   children: [],
            //   NavName: "水表口径",
            //   url: "/WaterMeterConfiguration/CaliberInfo"
            // },
            {
              type: 'firstmenu',
              icon: "MeterReadingCenter1-5",
              children: [],
              NavName: "水表关系",
              url: "/WaterMeterConfiguration/MeterRelationship"
            },
            // {
            //   type: 'firstmenu',
            //   icon: "BusinessArea1-8",
            //   children: [],
            //   NavName: "抄表状态",
            //   url: "/WaterMeterConfiguration/MeterStatus"
            // },
            {
              type: 'firstmenu',
              icon: "BusinessArea1-5",
              children: [],
              NavName: "水表供应商",
              url: "/WaterMeterConfiguration/WaterMeterfacturer"
            },
          ],
        },
        // 用水价格
        secondNav3: {
          navList: [
            {
              type: 'firstmenu',
              icon: "BusinessArea3-1",
              children: [],
              NavName: "用水价格",
              url: "/WaterPrice/WaterPrice"
            },
            // {
            //   type: 'firstmenu',
            //   icon: "BusinessArea3-2",
            //   children: [],
            //   NavName: "计费策略",
            //   url: "/WaterPrice/PriceInfo"
            // },
            {
              type: 'firstmenu',
              icon: "BusinessArea3-3",
              children: [],
              NavName: "用水类型",
              url: "/WaterPrice/WaterType"
            },
            {
              type: 'firstmenu',
              icon: "BusinessArea3-4",
              children: [],
              NavName: "优惠策略",
              url: "/WaterPrice/CheapStrategy"
            },
            {
              type: 'firstmenu',
              icon: "BusinessArea3-5",
              children: [],
              NavName: "违约策略",
              url: "/WaterPrice/BreakSet"
            },
            {
              type: 'firstmenu',
              icon: "BusinessArea3-6",
              children: [],
              NavName: "费用种类",
              url: "/WaterPrice/CostProject"
            },
          ],
        },
        // 模板配置
        secondNav4: {
          navList: [
            {
              type: 'firstmenu',
              icon: "BusinessArea4-11",
              children: [],
              NavName: "领料模板",
              url: "/TemplateConfiguration/MaterialTemplate"
            },
            {
              type: 'firstmenu',
              icon: "BusinessArea4-1",
              children: [],
              NavName: "短信模板",
              url: "/TemplateConfiguration/ShortMessage"
            },
          ],
        },
        // 其他配置
        secondNav5: {
          navList: [
            {
              type: 'firstmenu',
              icon: "BusinessArea5-1",
              children: [],
              NavName: "册本信息",
              url: "/OtherConfigurations/BookInfo"
            },
            // {
            //   type: 'firstmenu',
            //   icon: "BusinessArea5-",
            //   children: [],
            //   NavName: "费用种类",
            //   url: "/OtherConfigurations/CostProject"
            // },
            {
              type: 'firstmenu',
              icon: "BusinessArea5-2",
              children: [],
              NavName: "银行信息",
              url: "/OtherConfigurations/BankInfo"
            },
            {
              type: 'firstmenu',
              icon: "BusinessArea5-3",
              children: [],
              NavName: "附件资料",
              url: "/OtherConfigurations/Appendix"
            },
            {
              type: 'firstmenu',
              icon: "BusinessArea5-4",
              children: [],
              NavName: "假期设置",
              url: "/OtherConfigurations/HolidaySet"
            },
            {
              type: 'firstmenu',
              icon: "BusinessArea5-5",
              children: [],
              NavName: "材料定价",
              url: "/OtherConfigurations/MaterialPrice"
            },
            {
              type: 'firstmenu',
              icon: "BusinessArea5-9",
              children: [],
              NavName: "票据类型",
              url: "/OtherConfigurations/BillType"
            },
            {
              type: 'firstmenu',
              icon: "BusinessArea5-8",
              children: [],
              NavName: "费用票据关系",
              url: "/OtherConfigurations/ExpenseBillRelationship"
            },
            {
              type: 'firstmenu',
              icon: "BusinessArea5-7",
              children: [],
              NavName: "通知规则配置",
              url: "/OtherConfigurations/NotificationRules"
            },
            {
              type: 'firstmenu',
              icon: "BusinessArea5-6",
              url: "/OtherConfigurations/GlobalParamSet",
              NavName: "其他参数配置",
              children: []
            },
            {
              type: 'firstmenu',
              icon: "BusinessArea5-10",
              url: "/OtherConfigurations/QuickChangeConfiguration",
              NavName: "快速变更配置",
              children: []
            },
          ],
        },
        // 通知配置
        secondNav6: {
          navList: [
            {
              type: 'firstmenu',
              icon: "BusinessArea6-1",
              children: [],
              NavName: "水费账单精灵",
              url: "/NotificationManagement/WaterBill"
            },
            {
              type: 'firstmenu',
              icon: "BusinessArea6-2",
              children: [],
              NavName: "欠费催缴精灵",
              url: "/NotificationManagement/ArrearsCharging"
            },
            {
              type: 'firstmenu',
              icon: "BusinessArea6-3",
              children: [],
              NavName: "缴费通知精灵",
              url: "/NotificationManagement/PaymentNotice"
            },
            {
              type: 'firstmenu',
              icon: "BusinessArea6-4",
              children: [],
              NavName: "其他精灵",
              url: "/NotificationManagement/OtherNotice"
            },
          ],
        },
      },
      secondNav: {
        navList: [

        ],
      },
      MenuData: [],
      loginInfo: '',
      companyData: [
        {
          companyId: 58,
          fullName: "集团总部",
          interiorCode: "C000000",
          shortName: "集团总部"
        },
        {
          companyId: 58,
          fullName: "南沙水司",
          interiorCode: "C000001",
          shortName: "南沙水司"

        },
        {
          companyId: 58,
          fullName: "南沙水司",
          interiorCode: "C000002",
          shortName: "南沙水司"

        },
      ],
      checkedCompany: 'C000000',
      showMenu: 1,
      isRouterAlive: true,
      defaultPage: '/',
      userInfo: { photourl: require('../assets/images/cute.jpeg')},
      host: "",
      controllChilder: [],
      firstIndex: 0, // 点击第几个一级菜单的索引
      menuShow: false,
      navTree: [],
      activeIndex: "/",

    }
  },
  mounted() {
    var _this = this
    eventBus.$on('asideMenuShow', (show) => {
      Object.keys(this.menuShowData).forEach(function (key) {
        if (key == show) {
          _this.menuShowData[key] = true
        } else {
          _this.menuShowData[key] = false
        }
      })
    })
    let n = window.location.host.search(':')
    let str = window.location.host + ""
    
    this.host = str.slice(0, n)
    // this.host = "jc.uat.gdhwater.com"
    if (this.host === '127.0.0.1')
      this.host = 'localhost'
    // this.getMenu()//获取菜单
    this.getSecondMenu('Home')
    // this.getUser()// 获取当前用户信息

  },
  updated() {
    this.$nextTick(() => {
      if (!this.hasReset) {
        this.hasReset = true
      }
    })
  },
  methods: {
    changeStyle(obj){
        // console.log(111111);
        $('.loginArea > .infoPop').css('display', 'block');
    },
    loginout(){
      localStorage.removeItem('token');
      let n = window.location.host.indexOf("/#/")+1;
      let str = window.location.host.substring(0,n);
      window.location.href=str;
    },
    restStyle(obj){
        $('.loginArea > .infoPop').css('display', 'none');
      
    },
    getSecondMenu(menuName) {

      if (menuName == 'Home') {// 首页
        if (localStorage.getItem('text') != 'true') {
          this.$router.push('/WaterSideIndex')
        }
        localStorage.setItem('text', 'false')
        $('.menu_img').eq(0).attr('src', require('../assets/images/Home-active.png'))
        $('.menu_img').eq(1).attr('src', require('../assets/images/Workbench.png'))
        $('.menu_img').eq(2).attr('src', require('../assets/images/Business.png'))
        $('.menu_img').eq(3).attr('src', require('../assets/images/Statistical.png'))
        $('.menu_img').eq(4).attr('src', require('../assets/images/Basics.png'))
        $('.menu_img').eq(5).attr('src', require('../assets/images/system.png'))
        this.firstNav.navData = {
          navList: [],
        }
        $('.custom-home header').css('height', '58px')
        $('.custom-home > .kl-container').css('height', 'calc(100% - 60px)')
        $('#firstNav .nav .navList > li').css('min-width', '80px')
      } else if (menuName == 'Workbench') {// 工作台
        this.$router.push('/HallBusiness')
        $('.menu_img').eq(0).attr('src',  require('../assets/images/Home.png'))
        $('.menu_img').eq(1).attr('src',  require('../assets/images/Workbench-active.png'))
        $('.menu_img').eq(2).attr('src',  require('../assets/images/Business.png'))
        $('.menu_img').eq(3).attr('src',  require('../assets/images/Statistical.png'))
        $('.menu_img').eq(4).attr('src',  require('../assets/images/Basics.png'))
        $('.menu_img').eq(5).attr('src',  require('../assets/images/system.png'))
        this.firstNav.navData = {
          navList: [],
        }
        $('.custom-home header').css('height', '58px')
        $('.custom-home > .kl-container').css('height', 'calc(100% - 60px)')
        $('#firstNav .nav .navList > li').css('min-width', '80px')
      } else if (menuName == 'Business') {// 业务管理
        this.$router.push('/EngineeringManagement')
        $('.menu_img').eq(0).attr('src',  require('../assets/images/Home.png'))
        $('.menu_img').eq(1).attr('src',  require('../assets/images/Workbench.png'))
        $('.menu_img').eq(2).attr('src',  require('../assets/images/Business-active.png'))
        $('.menu_img').eq(3).attr('src',  require('../assets/images/Statistical.png'))
        $('.menu_img').eq(4).attr('src',  require('../assets/images/Basics.png'))
        $('.menu_img').eq(5).attr('src',  require('../assets/images/system.png'))
        this.firstNav.navData = {
          navList: [
            //工程管理
            {
              Navtitle: '工程管理',
              path: "/EngineeringManagement",
              children: [
                {
                  NavName: "用户工程",
                  icon: "EngineeringCenter1",
                  type: 'submenu',
                  url: "/EngineeringManagement/waterQuery",

                  children: [
                    {
                      type: 'firstmenu',
                      icon: "EngineeringCenter1-4 ",
                      children: [],
                      NavName: "用水咨询",
                      url: "/EngineeringManagement/waterQuery",

                    },
                    {
                      type: 'firstmenu',
                      icon: "EngineeringCenter1-2 ",
                      children: [],
                      NavName: "用水安装",
                      url: "/EngineeringManagement/waterMeterInstall"
                    },
                  ],
                },
                {
                  icon: "EngineeringCenter2 ",
                  type: 'firstmenu',
                  children: [],
                  url: "/EngineeringManagement/insideAllProjects",
                  NavName: "内部工程"
                },
              ],
            },
            //客户管理
            {
              Navtitle: '客户管理',
              path: "/CustomerManagement",
              children: [
                {
                  type: 'firstmenu',
                  icon: "CustomerCenter1",
                  url: "/CustomerManagement/userInfo",
                  children: [],
                  NavName: "查询"
                },
                {
                  icon: "CustomerCenter2 ",
                  type: 'firstmenu',
                  children: [],
                  url: "/CustomerManagement/OpenAccount",
                  NavName: "开户"
                },
                {
                  icon: "CustomerCenter3 ",
                  type: 'firstmenu',
                  children: [],
                  url: "/CustomerManagement/Transfer",
                  NavName: "过户"
                },
                {
                  icon: "CustomerCenter7 ",
                  type: 'firstmenu',
                  children: [],
                  url: "/CustomerManagement/IncorporativeAccount",
                  NavName: "并户"
                },
                {
                  icon: "CustomerCenter4 ",
                  type: 'firstmenu',
                  children: [],
                  url: "/CustomerManagement/DiscontinueUse",
                  NavName: "停用"
                },
                {
                  icon: "CustomerCenter5 ",
                  type: 'firstmenu',
                  children: [],
                  url: "/CustomerManagement/multiplexing",
                  NavName: "复用"
                },
                {
                  icon: "CustomerCenter6 ",
                  type: 'firstmenu',
                  children: [],
                  url: "/CustomerManagement/SalesAccount",
                  NavName: "销户"
                },
                {
                  icon: "CustomerCenter8 ",
                  type: 'firstmenu',
                  children: [],
                  url: "/CustomerManagement/CustomerChange",
                  NavName: "变更"
                },
                {
                  icon: "CustomerCenter9 ",
                  type: 'firstmenu',
                  children: [],
                  url: "/CustomerManagement/BatchManagement",
                  NavName: "批量管理"
                },
              ],
            },
            // 抄表开账
            {
              Navtitle: '抄表开账',
              path: "/MeterReading",
              children: [
                {
                  icon: "MeterReadingCenter1",
                  type: 'submenu',
                  url: "/MeterReading/MeterReadingRecord",
                  children: [
                    {
                      type: 'firstmenu',
                      icon: "MeterReadingCenter1-1",
                      children: [],
                      NavName: "抄表录入",
                      url: "/MeterReading/MeterReadingRecord"
                    },
                    {
                      type: 'firstmenu',
                      icon: "MeterReadingCenter1-4",
                      children: [],
                      NavName: "抄表轨迹",
                      url: "/MeterReading/MeterReadingTrack"
                    },
                    {
                      type: 'firstmenu',
                      icon: "MeterReadingCenter1-2",
                      children: [],
                      NavName: "打印抄表卡",
                      url: "/MeterReading/PrintMeterReadingCard"
                    },
                  ],
                  NavName: "抄表"
                },
                {
                  icon: "MeterReadingCenter2",
                  type: 'submenu',
                  url: "/MeterReading/AnomalyAnalysis",
                  children: [
                    {
                      type: 'firstmenu',
                      icon: "MeterReadingCenter3-1",
                      children: [],
                      NavName: "水量异常",
                      url: "/MeterReading/AnomalyAnalysis"
                    },
                    {
                      type: 'firstmenu',
                      icon: "MeterReadingCenter3-2",
                      children: [],
                      NavName: "水表异常",
                      url: "/MeterReading/AbnormalVerification"
                    },
                    {
                      type: 'firstmenu',
                      icon: "MeterReadingCenter3-4",
                      children: [],
                      NavName: "费用异常",
                      url: "/MeterReading/AbnormalExpenses"
                    },
                    {
                      type: 'firstmenu',
                      icon: "MeterReadingCenter3-3",
                      children: [],
                      NavName: "抄表抽查",
                      url: "/MeterReading/QualityReading"
                    },
                  ],
                  NavName: "检查"
                },

                {
                  icon: "MeterReadingCenter3",
                  type: 'firstmenu',
                  children: [],
                  url: "/MeterReading/BatchOpening",
                  NavName: "开账"
                },
            


                {
                  icon: "MeterReadingCenter6",
                  type: 'submenu',
                  children: [
                    {
                      type: 'firstmenu',
                      icon: "MeterReadingCenter6-1",
                      children: [],
                      NavName: "账单打印",
                      url: "/MeterReading/CustomerNotification",
                    },
                    {
                      type: 'firstmenu',
                      icon: "MeterReadingCenter6-2",
                      children: [],
                      NavName: "欠费催缴单",
                      url: "/MeterReading/ArrearageCollection"
                    },
                  ],
                  // url: "/BookInfo",
                  NavName: "打印管理"
                },

                {
                  icon: "MeterReadingCenter4",
                  type: 'submenu',
                  url: "/MeterReading/TotalScoreAnalysis",
                  children: [
                    {
                      type: 'firstmenu',
                      icon: "MeterReadingCenter5-4",
                      children: [],
                      NavName: "总分分析",
                      url: "/MeterReading/TotalScoreAnalysis"
                    },
                    {
                      type: 'firstmenu',
                      icon: "MeterReadingCenter5-1",
                      children: [],
                      NavName: "用水分析",//分为用户用水分析、大用户用水分析、客户用水分析
                      url: "/MeterReading/Statistics"
                    },
                  ],
                  NavName: "统计"
                },
                {
                  icon: "MeterReadingCenter5",
                  type: 'submenu',
                  url: "/MeterReading/BookAdjustment",
                  children: [
                    {
                      type: 'firstmenu',
                      icon: "MeterReadingCenter5-1",
                      children: [],
                      NavName: "表册调整",
                      url: "/MeterReading/BookAdjustment"
                    },
                    {
                      type: 'firstmenu',
                      icon: "MeterReadingCenter5-4",
                      children: [],
                      NavName: "抄表计划",
                      url: "/MeterReading/PlanAdjustment"
                    },
                    {
                      type: 'firstmenu',
                      icon: "MeterReadingCenter5-3",
                      children: [],
                      NavName: "抄表路线",
                      url: "/MeterReading/MeterReadingCircuit"
                    },
                    {
                      type: 'firstmenu',
                      icon: "MeterReadingCenter5-2",
                      children: [],
                      NavName: "特权修改",
                      url: "/MeterReading/PrivilegeModification"
                    },
                    {
                      type: 'firstmenu',
                      icon: "MeterReadingCenter5-5",
                      children: [],
                      NavName: "表阀门管理",
                      url: "/MeterReading/TableValveManagement"
                    },
                  ],
                  NavName: "计划维护"
                },
              ],
            },
            // 收费管理
            {
              Navtitle: '收费管理',
              path: "/ChargeManagement",
              children: [
                {
                  type: 'firstmenu',
                  icon: "FinancialCenter1",
                  children: [],
                  url: "/ChargeManagement/TollInquiry",
                  NavName: "收费查询"
                },
                {
                  icon: "FinancialCenter2",
                  type: 'firstmenu',
                  children: [],
                  url: "/ChargeManagement/BankCharges",
                  NavName: "银行代扣"
                },
                {
                  icon: "FinancialCenter3",
                  type: 'firstmenu',
                  children: [],
                  url: "/ChargeManagement/ManualCollection",
                  NavName: "手工托收"
                },
                {
                  icon: "FinancialCenter4",
                  type: 'submenu',
                  url: "/ChargeManagement/UnionPay",
                  children: [
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter3-1",
                      url: "/ChargeManagement/UnionPay",
                      NavName: "互联网对账"
                    },
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter3-2",
                      url: '/ChargeManagement/DailyReconciliation',
                      NavName: "日收款对账"
                    },
                  ],
                  NavName: "收款对账"
                },
                // {
                //   icon: "FinancialCenter3",
                //   type: 'firstmenu',
                //   children: [],
                //   url: "/ChargeManagement/UnionPay",
                //   NavName: "互联网对账"
                // },
                {
                  icon: "FinancialCenter5",
                  type: 'submenu',
                  url: "/ChargeManagement/FinancialAdjustment",
                  children: [
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter4-1",
                      url: "/ChargeManagement/FinancialAdjustment",
                      NavName: "费用调整"
                    },
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter4-9",
                      url: "/ChargeManagement/OtherCharges",
                      NavName: "其他收费"
                    },
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter4-2",
                      url: '/ChargeManagement/Recover',
                      NavName: "举报罚款"
                    },
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter4-3",
                      url: "/ChargeManagement/LiquidatedDamages",
                      NavName: "违约金减免"
                    },
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter4-4",
                      url: "/ChargeManagement/DealingBadDebts",
                      NavName: "呆账处理"
                    },
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter4-5",
                      url: "/ChargeManagement/ReportingBadDebts",
                      NavName: "坏账报损"
                    },
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter4-6",
                      url: "/ChargeManagement/RedFlushing",
                      NavName: "冲红"
                    },
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter4-7",
                      url: "/ChargeManagement/CancellMonthly",
                      NavName: "取消当月收费"
                    },
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter4-8",
                      url: "/ChargeManagement/ClosingCollectionPayment",
                      NavName: "代收支付关闭"
                    },

                  ],
                  NavName: "账务调整"
                },
                {
                  icon: "FinancialCenter6",
                  type: 'submenu',
                  url: "/ChargeManagement/BalanceWithdrawal",
                  children: [
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter8-1",
                      url: "/ChargeManagement/BalanceWithdrawal",
                      NavName: "余额取出"
                    },
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter8-2",
                      url: '/ChargeManagement/BalanceTransfer',
                      NavName: "余额过户"
                    },
                  ],
                  NavName: "余额管理"
                },
                {
                  icon: "FinancialCenter7",
                  type: 'firstmenu',
                  children: [],
                  url: "/ChargeManagement/FinancialManagement",
                  NavName: "月结"
                },
                {
                  icon: "FinancialCenter8",
                  type: 'submenu',
                  url: "/ChargeManagement/BillManagement",
                  children: [
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter7-1",
                      url: "/ChargeManagement/BillManagement",
                      NavName: "票据注册"
                    },
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter7-2",
                      url: "/ChargeManagement/InvoiceAcquisition",
                      NavName: "票据领用"
                    },
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter7-3",
                      url: "/ChargeManagement/InvoiceBorrowing",
                      NavName: "票据调用"
                    },
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter7-4",
                      url: "/ChargeManagement/InvoiceInvalidated",
                      NavName: "票据修改"
                    },
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter7-5",
                      url: "/ChargeManagement/InvoicePayment",
                      NavName: "票据交票"
                    },
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter7-6",
                      url: "/ChargeManagement/InvoiceSearch",
                      NavName: "票据查询"
                    },
                  ],
                  // url: "/BillManagement",
                  NavName: "票据管理"
                },
                {
                  icon: "FinancialCenter9",
                  type: 'submenu',
                  url: "/WaterPrice/WaterPrice",
                  children: [
                    {
                      type: 'firstmenu',
                      icon: "BusinessArea9-1",
                      children: [],
                      NavName: "用水价格",
                      url: "/WaterPrice/WaterPrice"
                    },
                    // {
                    //   type: 'firstmenu',
                    //   icon: "BusinessArea9-2",
                    //   children: [],
                    //   NavName: "计费策略",
                    //   url: "/WaterPrice/PriceInfo"
                    // },
                    {
                      type: 'firstmenu',
                      icon: "BusinessArea9-3",
                      children: [],
                      NavName: "用水类型",
                      url: "/WaterPrice/WaterType"
                    },
                    {
                      type: 'firstmenu',
                      icon: "BusinessArea9-4",
                      children: [],
                      NavName: "优惠策略",
                      url: "/WaterPrice/CheapStrategy"
                    },
                    {
                      type: 'firstmenu',
                      icon: "BusinessArea9-5",
                      children: [],
                      NavName: "违约策略",
                      url: "/WaterPrice/BreakSet"
                    },
                    {
                      type: 'firstmenu',
                      icon: "FinancialCenter9-9",
                      url: "/WaterPrice/GarbagePricing",
                      NavName: "垃圾费定价"
                    },
                    // {
                    //   type: 'firstmenu',
                    //   icon: "FinancialCenter9-10",
                    //   url: "/WaterPrice/GarbageManagement",
                    //   NavName: "垃圾费管理"
                    // },
                  ],
                  NavName: "价格管理"
                }, ],
            },
            //表计管理
            {
              Navtitle: '表计管理',
              path: "/MeterManagement",
              children: [
                {
                  icon: "WatchCenter1",
                  type: 'firstmenu',
                  children: [],
                  NavName: "查询",
                  url: "/MeterManagement/WaterMeterInquiry"
                },
                {
                  icon: "WatchCenter2",
                  type: 'firstmenu',
                  children: [],
                  NavName: "注册",
                  url: "/MeterManagement/Warehousing"
                },
                {
                  icon: "WatchCenter3",
                  type: 'firstmenu',
                  children: [],
                  NavName: "换表",
                  url: "/MeterManagement/ChangeTables"
                },
                {
                  icon: "WatchCenter4",
                  type: 'firstmenu',
                  children: [],
                  NavName: "拆表",
                  url: "/MeterManagement/TableDismantling"
                },
                {
                  icon: "WatchCenter5",
                  type: 'firstmenu',
                  children: [],
                  NavName: "复表",
                  url: "/MeterManagement/DuplicateTable"
                },
                {
                  icon: "WatchCenter6",
                  type: 'firstmenu',
                  children: [],
                  NavName: "校表",
                  url: "/MeterManagement/ComparisonTable"
                },
                {
                  icon: "WatchCenter7",
                  type: 'firstmenu',
                  children: [],
                  NavName: "维检",
                  url: "/MeterManagement/DimensionalInspection"
                },
                {
                  icon: "WatchCenter8",
                  type: 'firstmenu',
                  children: [],
                  NavName: "变更",
                  url: "/MeterManagement/wMeterEdit"
                },
              ],
            },
            //通知公告
            {
              Navtitle: '客户通知',
              path: "/CustomerNotificationCenter",
              children: [
                {
                  icon: "ServiceCentre1",
                  type: 'firstmenu',
                  children: [],
                  url: "/CustomerNotificationCenter/InformationReleaseManagement",
                  NavName: "通知公告"
                },
                {
                  type: 'firstmenu',
                  icon: "ServiceCentre3",
                  url: "/CustomerNotificationCenter/NotificationDetails",
                  children: [],
                  NavName: "消息查询"
                },

                {
                  type: 'firstmenu',
                  icon: "ServiceCentre4",
                  url: "/CustomerNotificationCenter/QuestionnaireManagement",
                  children: [],
                  NavName: "满意度调查"
                },
                {
                  type: 'firstmenu',
                  icon: "ServiceCentre5",
                  url: "/CustomerNotificationCenter/MessageSending",
                  children: [],
                  NavName: "短信发送"
                },
              ],
            },
          ],
        }
        $('.custom-home header').css('height', '88px')
        $('.custom-home > .kl-container').css('height', 'calc(100% - 90px)')
        $('#firstNav .nav .navList > li').css('min-width', '80px')
      } else if (menuName == 'Statistical') {// 统计报表
        this.$router.push('/saleManagement')
        $('.menu_img').eq(0).attr('src', require('../assets/images/Home.png'))
        $('.menu_img').eq(1).attr('src', require('../assets/images/Workbench.png'))
        $('.menu_img').eq(2).attr('src', require('../assets/images/Business.png'))
        $('.menu_img').eq(3).attr('src', require('../assets/images/Statistical-active.png'))
        $('.menu_img').eq(4).attr('src', require('../assets/images/Basics.png'))
        $('.menu_img').eq(5).attr('src', require('../assets/images/system.png'))
        this.firstNav.navData = {
          navList: [
            {
              Navtitle: "销售管理分析",
              path: "/saleManagement",
              children: [],
            },
            {
              Navtitle: "业务办理分析",
              path: "/BusinessManagement",
              children: [],
            },
            {
              Navtitle: "客户管理中心",
              path: "/CustomerManagementCenter",
              children: [],
            },
            {
              Navtitle: "呼叫中心分析",
              path: "/CallCenter",
              children: [],
            },
          ],
        }
        $('.custom-home header').css('height', '88px')
        $('.custom-home > .kl-container').css('height', 'calc(100% - 90px)')
        this.$nextTick(function () {
          $('#firstNav .nav .navList > li').css('min-width', '100px')
        })
      } else if (menuName == 'Basics') {// 基础信息
        var _this = this
        this.$router.push('/RegionalConfiguration')
        $('.menu_img').eq(0).attr('src', require('../assets/images/Home.png'))
        $('.menu_img').eq(1).attr('src', require('../assets/images/Workbench.png'))
        $('.menu_img').eq(2).attr('src', require('../assets/images/Business.png'))
        $('.menu_img').eq(3).attr('src', require('../assets/images/Statistical.png'))
        $('.menu_img').eq(4).attr('src', require('../assets/images/Basics-active.png'))
        $('.menu_img').eq(5).attr('src', require('../assets/images/system.png'))
        this.firstNav.navData = {
          navList: [
            // 区域配置
            {
              path: "/RegionalConfiguration",
              Navtitle: "区域配置",
              children: [
                {
                  type: 'firstmenu',
                  icon: "BusinessArea1-1",
                  children: [],
                  NavName: "营业所",
                  url: "/RegionalConfiguration/BusinessArea"
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea1-2",
                  children: [],
                  NavName: "营业区域",
                  url: "/RegionalConfiguration/ManagementArea",
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea1-3",
                  children: [],
                  NavName: "行政区域",
                  url: "/RegionalConfiguration/AdminRegion"
                },
              ],
            },
            // 水表配置
            {
              path: "/WaterMeterConfiguration",
              Navtitle: "水表配置",
              children: [
                {
                  type: 'firstmenu',
                  icon: "BusinessArea1-6",
                  children: [],
                  NavName: "水表型号",
                  url: "/WaterMeterConfiguration/WatermeterModel"
                },
                // {
                //   type: 'firstmenu',
                //   icon: "BusinessArea1-7",
                //   children: [],
                //   NavName: "水表口径",
                //   url: "/WaterMeterConfiguration/CaliberInfo"
                // },
                {
                  type: 'firstmenu',
                  icon: "MeterReadingCenter1-5",
                  children: [],
                  NavName: "水表关系",
                  url: "/WaterMeterConfiguration/MeterRelationship"
                },
                // {
                //   type: 'firstmenu',
                //   icon: "BusinessArea1-8",
                //   children: [],
                //   NavName: "抄表状态",
                //   url: "/WaterMeterConfiguration/MeterStatus"
                // },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea1-5",
                  children: [],
                  NavName: "水表供应商",
                  url: "/WaterMeterConfiguration/WaterMeterfacturer"
                },
              ],
            },
            // 通知管理
            {
              path: "/NotificationManagement",
              Navtitle: "水精灵管理",
              children: [
                {
                  type: 'firstmenu',
                  icon: "BusinessArea6-1",
                  children: [],
                  NavName: "水费账单提醒",
                  url: "/NotificationManagement/WaterBill"
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea6-2",
                  children: [],
                  NavName: "欠费催缴提醒",
                  url: "/NotificationManagement/ArrearsCharging"
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea6-3",
                  children: [],
                  NavName: "缴费通知提醒",
                  url: "/NotificationManagement/PaymentNotice"
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea6-4",
                  children: [],
                  NavName: "其他提醒",
                  url: "/NotificationManagement/OtherNotice"
                },
              ],
            },
            // 模板配置
            {
              path: "/TemplateConfiguration",
              Navtitle: "模板配置",
              children: [
                {
                  type: 'firstmenu',
                  icon: "BusinessArea4-11",
                  children: [],
                  NavName: "领料模板",
                  url: "/TemplateConfiguration/MaterialTemplate"
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea4-1",
                  children: [],
                  NavName: "短信模板",
                  url: "/TemplateConfiguration/ShortMessage"
                },
              ],
            },
            // 其他配置
            {
              path: "/OtherConfigurations",
              Navtitle: "其他配置",
              children: [
                {
                  type: 'firstmenu',
                  icon: "BusinessArea3-6",
                  children: [],
                  NavName: "费用种类",
                  url: "/OtherConfigurations/CostProject"
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea5-1",
                  children: [],
                  NavName: "册本信息",
                  url: "/OtherConfigurations/BookInfo"
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea5-2",
                  children: [],
                  NavName: "银行信息",
                  url: "/OtherConfigurations/BankInfo"
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea5-3",
                  children: [],
                  NavName: "用户资料",
                  url: "/OtherConfigurations/Appendix"
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea5-4",
                  children: [],
                  NavName: "假期设置",
                  url: "/OtherConfigurations/HolidaySet"
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea5-5",
                  children: [],
                  NavName: "材料定价",
                  url: "/OtherConfigurations/MaterialPrice"
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea5-9",
                  children: [],
                  NavName: "票据类型",
                  url: "/OtherConfigurations/BillType"
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea5-8",
                  children: [],
                  NavName: "费用票据关系",
                  url: "/OtherConfigurations/ExpenseBillRelationship"
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea5-7",
                  children: [],
                  NavName: "通知规则配置",
                  url: "/OtherConfigurations/NotificationRules"
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea5-6",
                  url: "/OtherConfigurations/GlobalParamSet",
                  NavName: "其他参数配置",
                  children: []
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea5-10",
                  url: "/OtherConfigurations/QuickChangeConfiguration",
                  NavName: "快速变更配置",
                  children: []
                },
              ],
            },
          ],
        }
        $('.custom-home header').css('height', '88px')
        $('#firstNav .nav .navList > li').css('min-width', '80px')
      } else if (menuName == 'system') {// 系统管理
        this.$router.push('/RoleManage')
        $('.menu_img').eq(0).attr('src', require('../assets/images/Home.png'))
        $('.menu_img').eq(1).attr('src', require('../assets/images/Workbench.png'))
        $('.menu_img').eq(2).attr('src', require('../assets/images/Business.png'))
        $('.menu_img').eq(3).attr('src', require('../assets/images/Statistical.png'))
        $('.menu_img').eq(4).attr('src', require('../assets/images/Basics.png'))
        $('.menu_img').eq(5).attr('src', require('../assets/images/system-active.png'))
        this.firstNav.navData = {
          navList: [
            {
              Navtitle: "权限管理",
              icon: "RoleManage",
              path: "/RoleManage",
              children: []
            },
            {
              Navtitle: "用户管理",
              icon: "UserManage",
              path: "/UserManage",
              children: []
            }
          ],
        }
        $('.custom-home header').css('height', '88px')
        $('.custom-home > .kl-container').css('height', 'calc(100% - 90px)')
        $('#firstNav .nav .navList > li').css('min-width', '80px')
      }else if (menuName == 'Approval') {// 流程中心
        this.firstNav.navData = {
          navList: [
            {
              Navtitle: "",
              icon: "RoleManage",
              path: "/RoleManage",
              children: [
                {
                  type: 'firstmenu',
                  icon: "BusinessArea1-1",
                  children: [],
                  NavName: "待办",
                  url: "/RegionalConfiguration/BusinessArea"
                },
                {
                  type: 'firstmenu',
                  icon: "BusinessArea1-2",
                  children: [],
                  NavName: "已办",
                  url: "/RegionalConfiguration/ManagementArea",
                },]
            },
            // {
            //   Navtitle: "已办",
            //   icon: "UserManage",
            //   path: "/UserManage",
            //   children: []
            // }
          ],
        }
      }

    },
    //获取菜单
    getMenu() {
      this.MenuData = [];

      this.firstNav.navData = {
        navList: [
          //Navtitle:菜单标题，icon:菜单图标，路径：有三种形式  path，name，url，只可存在一种
          { Navtitle: '首页', icon: 'WaterSideIndex', path: '/WaterSideIndex', children: [] },
          { Navtitle: '工作台', icon: 'HallBusiness', path: '/HallBusiness', children: [] },
          {
            Navtitle: '流程审批',
            icon: 'WaterSideIndex2',
            path: '/ProcessApproval',
            children: [
              {
                icon: "ProcessApproval1",
                type: 'firstmenu',
                children: [],
                url: "/ProcessApproval/PendingTrial",
                NavName: "待审"
              },
              {
                icon: "ProcessApproval2",
                type: 'firstmenu',
                children: [],
                url: "/ProcessApproval/Examined",
                NavName: "已审"
              },
              {
                icon: "ProcessApproval3",
                type: 'firstmenu',
                children: [],
                url: "/ProcessApproval/allBill",
                NavName: "所有"
              },
              {
                NavName: '我的申请',
                icon: 'ProcessApproval4',
                type: 'submenu',
                children: [
                  {
                    icon: "EngineeringCenter4-1",
                    NavName: "废弃",
                    url: "/ProcessApproval/discard",
                    children: [],
                  },
                  {
                    icon: "EngineeringCenter4-2",
                    NavName: "草稿",
                    url: "/ProcessApproval/draft",
                    children: [],
                  },
                  {
                    icon: "EngineeringCenter4-3",
                    NavName: "待审",
                    url: "/ProcessApproval/trial",
                    children: [],
                  },
                  {
                    icon: "EngineeringCenter4-4",
                    NavName: "结束",
                    url: "/ProcessApproval/end",
                    children: [],
                  },
                ],
              },
            ]
          },
          {            Navtitle: '业务管理', icon: 'HallBusiness', path: '/views', children: [
              //工程管理
              {
                NavName: '工程管理',
                icon: 'el-icon-brush',
                type: 'submenu',
                children: [
                  {
                    NavName: "用户工程",
                    icon: "EngineeringCenter1",
                    type: 'thirdmenu',
                    children: [
                      {
                        icon: "EngineeringCenter1-4 ",
                        children: [],
                        NavName: "用水咨询",
                        url: "/views/waterQuery"
                      },
                      {
                        icon: "EngineeringCenter1-2 ",
                        children: [],
                        NavName: "用水安装",
                        url: "/views/waterMeterInstall"
                      },

                    ],

                  },
                  {
                    icon: "EngineeringCenter2 ",
                    type: 'firstmenu',
                    children: [],
                    url: "/views/insideAllProjects",
                    NavName: "内部工程"
                  },
                ],
              },
              //客户管理
              {
                NavName: '客户管理',
                icon: 'el-icon-user',
                // path: '/CustomerCenter',
                type: 'submenu',
                children: [
                  {
                    icon: "CustomerCenter1",
                    url: "/views/userInfo",
                    // type:'thirdmenu',
                    children: [
                      // {
                      //   icon:"CustomerCenter1 ",
                      //   type:'firstmenu',
                      //   children: [],
                      //   url: "/views/userInfo",
                      //   NavName:"用户资料"
                      // },
                      // {
                      //   icon:"CustomerCenter8 ",
                      //   type:'firstmenu',
                      //   children: [],
                      //   url: "/views/customerManagement",
                      //   NavName:"客户资料"
                      // },

                      // {
                      //   icon:"CustomerCenter7-2",
                      //   url:"/views/DataChange",
                      //   NavName:"用户资料变更"
                      // },
                      // {
                      //   icon:"CustomerCenter7-3",
                      //   url:"/views/TypesOfWaterUse",
                      //   NavName:"用水类型变更"
                      // },
                      // {
                      //   icon:"CustomerCenter7-4",
                      //   url:"/views/SteppedPopulation",
                      //   NavName:"用水人口变更"
                      // },
                      // {
                      //   icon:"CustomerCenter7-5",
                      //   url:"/views/PreferentialWaterUse",
                      //   NavName:"优惠用水变更"
                      // },
                      // {
                      //   icon:"CustomerCenter7-6",
                      //   url:"/views/PaymentMethod",
                      //   NavName:"缴费方式变更"
                      // },
                      // {
                      //   icon:"CustomerCenter7-7",
                      //   url:"/views/InvoiceInformation",
                      //   NavName:"开票资料变更"
                      // },
                    ],
                    NavName: "查询"
                  },
                  {
                    icon: "CustomerCenter2 ",
                    type: 'firstmenu',
                    children: [],
                    url: "/views/OpenAccount",
                    NavName: "开户"
                  },
                  {
                    icon: "CustomerCenter3 ",
                    type: 'firstmenu',
                    children: [],
                    url: "/views/Transfer",
                    NavName: "过户"
                  },

                  {
                    icon: "CustomerCenter7 ",
                    type: 'firstmenu',
                    children: [],
                    url: "/views/IncorporativeAccount",
                    NavName: "并户"
                  },
                  {
                    icon: "CustomerCenter4 ",
                    type: 'firstmenu',
                    children: [],
                    url: "/views/DiscontinueUse",
                    NavName: "停用"
                  },
                  {
                    icon: "CustomerCenter5 ",
                    type: 'firstmenu',
                    children: [],
                    url: "/views/multiplexing",
                    NavName: "复用"
                  },
                  {
                    icon: "CustomerCenter6 ",
                    type: 'firstmenu',
                    children: [],
                    url: "/views/SalesAccount",
                    NavName: "销户"
                  },
                  {
                    icon: "CustomerCenter8 ",
                    type: 'firstmenu',
                    children: [],
                    url: "/views/CustomerChange",
                    NavName: "变更"
                  },
                  {
                    icon: "CustomerCenter9 ",
                    type: 'firstmenu',
                    children: [],
                    url: "/CustomerManagement/BatchManagement",
                    NavName: "批量管理"
                  },
                ],
              },
              // 抄表开账
              {
                NavName: '抄表开账',
                icon: 'el-icon-document-copy',
                type: 'submenu',
                // path: '/MeterReadingCenter',
                children: [
                  {
                    icon: "MeterReadingCenter1",
                    type: 'thirdmenu',
                    children: [
                      {
                        icon: "MeterReadingCenter1-1",
                        children: [],
                        NavName: "抄表录入",
                        url: "/views/MeterReadingRecord"
                      },
                      {
                        icon: "MeterReadingCenter1-4",
                        children: [],
                        NavName: "抄表轨迹",
                        url: "/views/MeterReadingTrack"
                      },
                      {
                        type: 'firstmenu',
                        icon: "MeterReadingCenter1-2",
                        children: [],
                        NavName: "打印抄表卡",
                        url: "/MeterReading/PrintMeterReadingCard"
                      },
                      // {
                      //   children: [],
                      //   code: "001002003001",
                      //   id: "815",
                      //   name: "抄表设备管理",
                      //   
                      //   path: "/MeterReadingEquipment"
                      // },
                      // {
                      //   children: [],
                      //   code: "001002003001",
                      //   id: "815",
                      //   name: "监控调度",
                      //   
                      //   path: "/MonitorScheduler"
                      // }
                    ],
                    // url: "/MeterReadingCenter",
                    NavName: "抄表"
                  },
                  {
                    icon: "MeterReadingCenter2",
                    type: 'thirdmenu',
                    children: [
                      {
                        icon: "MeterReadingCenter3-1",
                        children: [],
                        NavName: "水量异常",
                        url: "/views/AnomalyAnalysis"
                      },
                      {
                        icon: "MeterReadingCenter3-2",
                        children: [],
                        NavName: "水表异常",
                        url: "/views/AbnormalVerification"
                      },
                      {
                        icon: "MeterReadingCenter3-4",
                        children: [],
                        NavName: "费用异常",
                        url: "/views/AbnormalExpenses"
                      },
                      {
                        icon: "MeterReadingCenter3-3",
                        children: [],
                        NavName: "抄表抽查",
                        url: "/views/QualityReading"
                      },
                    ],
                    // url: "/BookInfo",
                    NavName: "检查"
                  },

                  {
                    icon: "MeterReadingCenter3",
                    type: 'firstmenu',
                    children: [],
                    url: "/views/BatchOpening",
                    NavName: "开账"

                    // {
                    //   icon:"MeterReadingCenter2-1",
                    //   children: [],
                    //   NavName: "批量开账",
                    //   url: "/views/BatchOpening"
                    // },
                    // {
                    //   icon:"MeterReadingCenter2-2",
                    //   children: [],
                    //   NavName: "常规开账",
                    //   url: "/views/RegularOpening"
                    // }
                  },


                  {
                    icon: "MeterReadingCenter6",
                    type: 'thirdmenu',
                    children: [

                      {
                        icon: "MeterReadingCenter6-1",
                        children: [],
                        NavName: "账单打印",
                        url: "/views/CustomerNotification",
                      },
                      {
                        icon: "MeterReadingCenter6-2",
                        children: [],
                        NavName: "欠费催缴单",
                        url: "/views/ArrearageCollection"
                      },
                    ],
                    // url: "/BookInfo",
                    NavName: "打印管理"
                  },

                  {
                    icon: "MeterReadingCenter4",
                    type: 'thirdmenu',
                    children: [
                      // {
                      //   children: [],
                      //   code: "001002003001",
                      //   id: "812",
                      //   name: "大用户",
                      //   
                      //   path: "/BigUsers"
                      // }

                      {
                        icon: "MeterReadingCenter5-4",
                        children: [],
                        NavName: "总分分析",
                        url: "/views/TotalScoreAnalysis"
                      },
                      {
                        icon: "MeterReadingCenter5-1",
                        children: [],
                        NavName: "用水分析",//分为用户用水分析、大用户用水分析、客户用水分析
                        url: "/views/Statistics"
                      },

                      // {
                      //   icon:"MeterReadingCenter5-2",
                      //   children: [],
                      //   NavName: "用户用水排名表",
                      //   url: "/views/PrecedenceTable"
                      // },
                      // {
                      //   icon:"MeterReadingCenter5-3",
                      //   children: [],
                      //   NavName: "零水量查缴记录",
                      //   url: "/views/ZeroPay"
                      // },
                      // {
                      //   icon:"MeterReadingCenter5-5",
                      //   children: [],
                      //   NavName: "大用户",
                      //   url: "/views/BigUsers"
                      // },

                    ],
                    // url: "/AnomalyAnalysis",
                    NavName: "统计"
                  },
                  {
                    icon: "MeterReadingCenter5",
                    type: 'thirdmenu',
                    children: [
                      // {
                      //   children: [],
                      //   code: "001002003001",
                      //   id: "814",
                      //   name: "异常用水稽查",
                      //   
                      //   path: "/AbnormalInspection"
                      // },

                      {
                        icon: "MeterReadingCenter5-1",
                        children: [],
                        NavName: "表册调整",
                        url: "/views/BookAdjustment"
                      },
                      {
                        icon: "MeterReadingCenter5-4",
                        children: [],
                        NavName: "抄表计划",
                        url: "/views/PlanAdjustment"
                      },
                      {
                        icon: "MeterReadingCenter5-3",
                        children: [],
                        NavName: "抄表路线",
                        url: "/views/MeterReadingCircuit"
                      },
                      {
                        type: 'firstmenu',
                        icon: "MeterReadingCenter5-2",
                        children: [],
                        NavName: "特权修改",
                        url: "/MeterReading/PrivilegeModification"
                      },
                      {
                        type: 'firstmenu',
                        icon: "MeterReadingCenter5-5",
                        children: [],
                        NavName: "表阀门管理",
                        url: "/MeterReading/TableValveManagement"
                      },
                    ],
                    // url: "/CustomTable",
                    NavName: "计划维护"
                  },
                ],
              },
              // 收费管理
              {
                NavName: '收费管理',
                icon: 'el-icon-wallet',
                // path: '/FinancialCenter',
                type: 'submenu',
                children: [
                  {
                    icon: "FinancialCenter1",
                    children: [

                      // {
                      //   icon:"FinancialCenter1-1",
                      //   url:"/views/EngineeringFees",
                      //   NavName:"工程类收费"
                      // },
                      // {
                      //   icon:"FinancialCenter1-2",
                      //   url:"/views/BalanceWithdrawal",
                      //   NavName:"余额取出"
                      // },
                    ],
                    url: "/views/TollInquiry",
                    NavName: "收费查询"
                  },
                  // {
                  //   icon:"FinancialCenter8",
                  //   type: 'firstmenu',
                  //   children: [],
                  //   url: "/views/BalanceWithdrawal",
                  //   NavName:"余额取出"
                  // },
                  // {
                  //   icon:"FinancialCenter9",
                  //   type: 'firstmenu',
                  //   children: [],
                  //   url: "/views/BalanceTransfer",
                  //   NavName:"余额过户"
                  // },
                  {
                    icon: "FinancialCenter2",
                    type: 'firstmenu',
                    children: [],
                    url: "/views/BankCharges",
                    NavName: "银行代扣"
                  },
                  {
                    icon: "FinancialCenter2",
                    type: 'firstmenu',
                    children: [],
                    url: "/views/ManualCollection",
                    NavName: "手工托收"
                  },
                  {
                    icon: "FinancialCenter3",
                    type: 'submenu',
                    url: "/ChargeManagement/UnionPay",
                    children: [
                      {
                        type: 'firstmenu',
                        icon: "FinancialCenter3-1",
                        url: "/ChargeManagement/UnionPay",
                        NavName: "互联网对账"
                      },
                      {
                        type: 'firstmenu',
                        icon: "FinancialCenter3-2",
                        url: '/ChargeManagement/DailyReconciliation',
                        NavName: "日收款对账"
                      },
                    ],
                    NavName: "收款对账"
                  },
                  {
                    icon: "FinancialCenter4",
                    type: 'thirdmenu',
                    children: [
                      {
                        icon: "FinancialCenter4-1",
                        url: "/views/FinancialAdjustment",
                        NavName: "费用调整"
                      },
                      {
                        type: 'firstmenu',
                        icon: "FinancialCenter4-9",
                        url: "/views/OtherCharges",
                        NavName: "其他收费"
                      },
                      {
                        icon: "FinancialCenter4-2",
                        url: '/views/Recover',
                        NavName: "举报罚款"
                      },
                      {
                        icon: "FinancialCenter4-3",
                        url: "/views/LiquidatedDamages",
                        NavName: "违约金减免"
                      },
                      // {
                      //     path:"/AccountSplitting",
                      //     name:"分账处理"
                      // },
                      {
                        icon: "FinancialCenter4-4",
                        url: "/views/DealingBadDebts",
                        NavName: "呆账处理"
                      },
                      {
                        icon: "FinancialCenter4-5",
                        url: "/views/ReportingBadDebts",
                        NavName: "坏账报损"
                      },
                      {
                        icon: "FinancialCenter4-6",
                        url: "/views/RedFlushing",
                        NavName: "冲红"
                      },
                      {
                        icon: "FinancialCenter4-7",
                        url: "/views/CancellMonthly",
                        NavName: "取消当月收费"
                      },
                      {
                        type: 'firstmenu',
                        icon: "FinancialCenter4-8",
                        url: "/views/ClosingCollectionPayment",
                        NavName: "代收支付关闭"
                      },
                      {
                        type: 'firstmenu',
                        icon: "FinancialCenter4-9",
                        url: "/views/GarbagePricing",
                        NavName: "垃圾费定价"
                      },
                      // {
                      //   type: 'firstmenu',
                      //   icon: "FinancialCenter4-10",
                      //   url: "/views/GarbageManagement",
                      //   NavName: "垃圾费管理"
                      // },

                    ],
                    // url: "/FinancialAdjustment",
                    NavName: "账务调整"
                  },
                  {
                    icon: "FinancialCenter8",
                    type: 'thirdmenu',
                    children: [
                      {
                        icon: "FinancialCenter8-1",
                        url: "/views/BalanceWithdrawal",
                        NavName: "余额取出"
                      },
                      {
                        icon: "FinancialCenter8-2",
                        url: '/views/BalanceTransfer',
                        NavName: "余额过户"
                      },
                    ],
                    NavName: "余额管理"
                  },
                  {
                    icon: "FinancialCenter5",
                    type: 'firstmenu',
                    children: [
                      // {
                      //     path:"/FinancialManagement",
                      //     name:"月结"
                      // },
                      // {
                      //     path:"/AccountPeriod",
                      //     name:"账期"
                      // },
                    ],
                    url: "/views/FinancialManagement",
                    NavName: "月结"
                  },
                  {
                    icon: "FinancialCenter7",
                    type: 'thirdmenu',
                    children: [
                      {
                        icon: "FinancialCenter7-1",
                        url: "/views/BillManagement",
                        NavName: "票据注册"
                      },
                      {
                        icon: "FinancialCenter7-2",
                        url: "/views/InvoiceAcquisition",
                        NavName: "票据领用"
                      },
                      {
                        icon: "FinancialCenter7-3",
                        url: "/views/InvoiceBorrowing",
                        NavName: "票据调用"
                      },
                      {
                        icon: "FinancialCenter7-4",
                        url: "/views/InvoiceInvalidated",
                        NavName: "票据修改"
                      },
                      // {
                      //     path:"/InvoiceRestoration",
                      //     name:"发票还原"
                      // },
                      // {
                      //     path:"/InvoiceEdit",
                      //     name:"发票修改"
                      // },
                      {
                        icon: "FinancialCenter7-5",
                        url: "/views/InvoicePayment",
                        NavName: "票据交票"
                      },
                      {
                        icon: "FinancialCenter7-6",
                        url: "/views/InvoiceSearch",
                        NavName: "票据查询"
                      },
                    ],
                    // url: "/BillManagement",
                    NavName: "票据管理"
                  },

                ],
              },
              //表计管理
              {
                NavName: '表计管理',
                icon: 'el-icon-stopwatch',
                // path: '/WatchCenter',
                type: 'submenu',
                children: [
                  {
                    icon: "WatchCenter1",
                    type: 'firstmenu',
                    children: [],
                    NavName: "查询",
                    url: "/views/WaterMeterInquiry"
                  },
                  {
                    icon: "WatchCenter2",
                    type: 'firstmenu',
                    children: [],
                    NavName: "注册",
                    url: "/views/Warehousing"
                  },
                  {
                    icon: "WatchCenter3",
                    type: 'firstmenu',
                    children: [],
                    NavName: "换表",
                    url: "/views/ChangeTables"
                  },
                  {
                    icon: "WatchCenter4",
                    type: 'firstmenu',
                    children: [],
                    NavName: "拆表",
                    url: "/views/TableDismantling"
                  },
                  {
                    icon: "WatchCenter5",
                    type: 'firstmenu',
                    children: [],
                    NavName: "复表",
                    url: "/views/DuplicateTable"
                  },
                  {
                    icon: "WatchCenter6",
                    type: 'firstmenu',
                    children: [],
                    NavName: "校表",
                    url: "/views/ComparisonTable"
                  },
                  {
                    icon: "WatchCenter7",
                    type: 'firstmenu',
                    children: [],
                    NavName: "维检",
                    url: "/views/DimensionalInspection"
                  },
                  {
                    icon: "WatchCenter8",
                    type: 'firstmenu',
                    children: [
                      // {
                      //   icon:"WatchCenter8-1",
                      //   url:"/views/wMeterEdit",
                      //   NavName:"水表资料变更"
                      // },
                      // {
                      //   icon:"WatchCenter8-2",
                      //   url:"/views/meterInfoDel",
                      //   NavName:"水表资料删除"
                      // },
                    ],
                    NavName: "变更",
                    url: "/views/wMeterEdit"
                  },
                ],
              },

              //通知公告
              {
                NavName: '客户通知',
                icon: 'el-icon-bell',
                // path: '/ServiceCenter',
                type: 'submenu',
                children: [
                  {
                    icon: "ServiceCentre1",
                    type: 'firstmenu',
                    children: [],
                    url: "/views/InformationReleaseManagement",
                    NavName: "通知公告"
                  },
                  {
                    type: 'firstmenu',
                    icon: "ServiceCentre3",
                    url: "/views/NotificationDetails",
                    children: [],
                    NavName: "消息查询"
                  },
                  {
                    type: 'firstmenu',
                    icon: "ServiceCentre4",
                    url: "/views/QuestionnaireManagement",
                    children: [],
                    NavName: "满意度调查"
                  },
                  {
                    type: 'firstmenu',
                    icon: "ServiceCentre5",
                    url: "/views/MessageSending",
                    children: [],
                    NavName: "短信发送"
                  },



                ],
              },
            ]          },
          // {
          //   Navtitle: '信息发布', 
          //   icon: 'ServiceCenter', 
          //   path: '/ServiceCenter',
          //   children:[
          //     {
          //       icon:"ServiceCentre1",
          //       type: 'firstmenu',
          //       children: [
          //           // {
          //           //     path:"/ServiceCentre",
          //           //     name:"书面通知"
          //           // },
          //           // {
          //           //     path:"/ShortMessageNotification",
          //           //     name:"短信通知"
          //           // },
          //           // {
          //           //     path:"/WechatNotification",
          //           //     name:"微信通知"
          //           // },
          //       ],
          //       url: "/ServiceCenter/CustomerNotification",
          //       NavName:"客户通知"
          //     },
          //     // {
          //     //     children: [

          //     //     ],
          //     //     path: "/CustomerServiceWorkOrder",
          //     //     name:"客服工单"
          //     // },
          //     // {
          //     //   icon:"ServiceCentre2",
          //     //   type: 'firstmenu',
          //     //   children: [

          //     //   ],
          //     //   url: "/ServiceCenter/HallBusiness",
          //     //   NavName:"工作台"
          //     // },
          //     {
          //       type: 'submenu',
          //       icon:"ServiceCentre3",
          //         children: [
          //             {
          //               icon:"ServiceCentre3-1",
          //               url:"/ServiceCenter/InformationDelivery",
          //               NavName:"水厂开放日管理"
          //             },
          //             {
          //               icon:"ServiceCentre3-2",
          //               url:"/ServiceCenter/InformationReleaseManagement",
          //               NavName:"信息发布管理"
          //             },
          //             {
          //               icon:"ServiceCentre3-3",
          //               url:"/ServiceCenter/CommonFormManagement",
          //               NavName:"常用表格管理"
          //             },

          //         ],
          //         url: "/InformationDelivery",
          //         NavName:"信息发布"
          //     },

          //     {
          //       icon:"ServiceCentre4",
          //       type: 'submenu',
          //       children: [
          //           // {
          //           //     path:"/SatisfactionSurvey",
          //           //     name:"问题库管理"
          //           // },
          //           {
          //             icon:"ServiceCentre4-1",
          //             url:"/ServiceCenter/QuestionnaireManagement",
          //             NavName:"问卷管理"
          //           },
          //           // {
          //           //     path:"/Findings",
          //           //     name:"调查结果"
          //           // },
          //           {
          //             icon:"ServiceCentre4-2",
          //             url:"/ServiceCenter/QuestionnaireStatistics",
          //             NavName:"问卷统计"
          //           },

          //       ],
          //       url: "/SatisfactionSurvey",
          //       NavName:"满意度调查"
          //     },
          //   ],
          // },

          // 统计报表
          {
            Navtitle: '统计报表',
            icon: 'ReportCenter',
            path: '/ReportCenter',
            children: [
              {
                icon: "reportCenter1",
                type: 'firstmenu',
                children: [],
                NavName: "销售管理分析",
                url: "/ReportCenter/ReportCenter"
              },
              {
                icon: "reportCenter2",
                type: 'firstmenu',
                children: [],
                NavName: "业务办理分析",
                url: "/ReportCenter/BusinessManagement"
              },
              {
                icon: "reportCenter3",
                type: 'firstmenu',
                children: [],
                NavName: "客户管理中心",
                url: "/ReportCenter/CustomerManagementCenter"
              },
              {
                icon: "reportCenter4",
                type: 'firstmenu',
                children: [],
                NavName: "呼叫中心分析",
                url: "/ReportCenter/CallCenter"
              },
              // {
              //     children: [],
              //     code: "001002003001",
              //     id: "815",
              //     name: "客户报表",
              //     
              //     path: "/MeterReadData"
              // },
              // {
              //     children: [],
              //     code: "001002003001",
              //     id: "814",
              //     name: "财务报表",
              //     
              //     path: "/MeterReadData"
              // },
              // {
              //     children: [],
              //     code: "001002003001",
              //     id: "813",
              //     name: "服务报表",
              //     
              //     path: "/MeterReadData"
              // },
            ],

          },
          //基础信息
          {
            Navtitle: '基础信息',
            icon: 'BasicSet',
            path: '/BasicSet',
            children: [
              {
                icon: "BusinessArea1",
                type: 'submenu',
                url: "/BasicInfo",
                NavName: "区域配置",
                children: [
                  {
                    icon: "BusinessArea1-1",
                    children: [],
                    NavName: "营业所",
                    url: "/BasicSet/BusinessArea"
                  },
                  {
                    icon: "BusinessArea1-2",
                    children: [],
                    NavName: "营业区域",
                    url: "/BasicSet/ManagementArea",
                  },
                  {
                    icon: "BusinessArea1-3",
                    children: [],
                    NavName: "行政区域",
                    url: "/BasicSet/AdminRegion"
                  },
                ],
              },
              {
                icon: "BusinessArea2",
                type: 'submenu',
                url: "/BasicInfo",
                NavName: "水表配置",
                children: [
                  {
                    icon: "BusinessArea1-6",
                    children: [],
                    NavName: "水表型号",
                    url: "/BasicSet/WatermeterModel"
                  },
                  {
                    icon: "BusinessArea1-7",
                    children: [],
                    NavName: "水表口径",
                    url: "/BasicSet/CaliberInfo"
                  },
                  {
                    icon: "MeterReadingCenter1-5",
                    children: [],
                    NavName: "水表关系",
                    url: "/BasicSet/MeterRelationship"
                  },
                  {
                    icon: "BusinessArea1-8",
                    children: [],
                    NavName: "抄表状态",
                    url: "/BasicSet/MeterStatus"
                  },
                  {
                    icon: "BusinessArea1-5",
                    children: [],
                    NavName: "水表供应商",
                    url: "/BasicSet/WaterMeterfacturer"
                  },
                ],
              },

              {
                icon: "BusinessArea3",
                type: 'submenu',
                url: "/PriceContrl",
                NavName: "用水价格",
                children: [
                  {
                    icon: "BusinessArea3-1",
                    children: [],
                    NavName: "用水价格",
                    url: "/BasicSet/WaterPrice"
                  },
                  // {
                  //   icon: "BusinessArea3-2",
                  //   children: [],
                  //   NavName: "计费策略",
                  //   url: "/BasicSet/PriceInfo"
                  // },
                  {
                    icon: "BusinessArea3-3",
                    children: [],
                    NavName: "用水类型",
                    url: "/BasicSet/WaterType"
                  },
                  {
                    icon: "BusinessArea3-4",
                    children: [],
                    NavName: "优惠策略",
                    url: "/BasicSet/CheapStrategy"
                  },
                  {
                    icon: "BusinessArea3-5",
                    children: [],
                    NavName: "违约策略",
                    url: "/BasicSet/BreakSet"
                  },
                  {
                    icon: "BusinessArea3-6",
                    children: [],
                    NavName: "费用种类",
                    url: "/BasicSet/CostProject"
                  },
                ],
              },

              {
                icon: "BusinessArea4",
                type: 'submenu',
                url: "/BasicInfo",
                NavName: "模板配置",
                children: [

                  {
                    icon: "BusinessArea4-11",
                    children: [],
                    NavName: "领料模板",
                    url: "/BasicSet/MaterialTemplate"
                  },

                  {
                    icon: "BusinessArea4-1",
                    children: [],
                    NavName: "短信模板",
                    url: "/BasicSet/ShortMessage"
                  },

                ],
              },


              {
                icon: "BusinessArea5",
                type: 'submenu',
                url: "/BasicInfo",
                NavName: "其他配置",
                children: [


                  {
                    icon: "BusinessArea5-1",
                    children: [],
                    NavName: "册本信息",
                    url: "/BasicSet/BookInfo"
                  },
                  {
                    icon: "BusinessArea5-2",
                    children: [],
                    NavName: "银行信息",
                    url: "/BasicSet/BankInfo"
                  },
                  {
                    icon: "BusinessArea5-3",
                    children: [],
                    NavName: "用户资料",
                    url: "/BasicSet/Appendix"
                  },
                  {
                    icon: "BusinessArea5-4",
                    children: [],
                    NavName: "假期设置",
                    url: "/BasicSet/HolidaySet"
                  },
                  {
                    icon: "BusinessArea5-5",
                    children: [],
                    NavName: "材料定价",
                    url: "/BasicSet/MaterialPrice"
                  },
                  {
                    type: 'firstmenu',
                    icon: "BusinessArea5-6",
                    url: "/BasicSet/GlobalParamSet",
                    NavName: "其他参数配置",
                    children: []
                  },

                ],
              },
              // {
              //   type: 'firstmenu',
              //   icon:"BusinessArea4",
              //   url: "/BasicSet/DataDictionary",
              //   NavName:"数据字典",
              //   children: []
              // }
            ],
          },

          //基础信息
          {
            Navtitle: '系统管理',
            icon: 'SystemSet',
            path: '/SystemSet',
            children: [
              {
                icon: "RoleManage",
                type: 'firstmenu',
                url: "/SystemSet/RoleManage",
                NavName: "权限管理",
                children: []
              },
              {
                icon: "UserManage",
                type: 'firstmenu',
                url: "/SystemSet/UserManage",
                NavName: "用户管理",
                children: []
              }
            ]
          }

        ],
        //默认路径
        activeChanel: '/WaterSideIndex',
      };

      Array.apply(null, Array(10)).map(() => 0);//Array(10)生成一个长度为10的空数组
      this.controllChilder = Array.apply(null, Array(this.MenuData.length)).map(() => false)
      // this.chooseTopMenu(this.$router.history.current.path)
      // this.chooseTopMenu(this.firstNav.navData.navList[0].path)
      this.$router.push(this.firstNav.navData.navList[0].path)//进入第一个菜单


    },
    // 获取当前用户信息
    getUser() {
      let params = {
        "token": window.location.search.substring(1)
      }
      this.$api.fetch({
        apiUrl: 'TAuthorization/getLoginInfo.api',//路径
        method: 'post',//请求方法
        params: params,//参数
        needErrorCallback: true
      }).then(res => {
        if (res.code === 0) {
          this.loginInfo = JSON.parse(res.data.staff)
        }
      })

    },
    //退出登录
    quit() {
      // window.sessionStorage.removeItem("token");
      // // window.location.href = 'http://login2.ebs.krdev.gdhwater.com/cas.htm?urlhttp://oa.ds.com:8080/cas/login?service=http://' + this.host + ':8080/cas.htm'

      //         if(this.host=='localhost'){
      //           window.location.href = 'http://login2.ebs.krdev.gdhwater.com/cas.htm?urlhttp://oa.ds.com:8080/cas/login?service=http://' + this.host + ':8080/cas.htm'

      //         }else {
      //           window.location.href = 'http://login2.ebs.krdev.gdhwater.com/cas.htm?urlhttp://oa.ds.com:8080/cas/login?service=http://jc.uat.gdhwater.com/cas.htm'

      //         }
      // window.location.href = 'http://login2.ebs.krdev.gdhwater.com/cas.htm?urlhttp://oa.ds.com:8080/cas/login?service=http://' + this.host + ':8080/cas.htm'
    },

    // 页面重加载函数
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true))
    },
    chooseTopMenu(key, keyPath, val) {
      let arr = ['/WaterSideIndex', '/CenterSideIndex', '/LiveData', '/UserRole', '/']
      if (arr.includes(key)) {
      } else {

      }
      const menuData = this.MenuData

      for (let i = 0; i < menuData.length; i++) {
        if (menuData[i].children.length !== 0) {
          // 存在二级菜单
          for (let j = 0; j < menuData[i].children.length; j++) {
            if (menuData[i].children[j].path === key) {
              this.controllChilder[this.firstIndex] = false
              this.firstIndex = i
              this.controllChilder[i] = true
              break
            }
          }
        } else {
          this.controllChilder[this.firstIndex] = false
        }
      }
    },
    changeNav(val) {
      
      let strurl = val.path.match(/^(\/[\w]+)\/?/)[1];
      // let arr = ['/WaterSideIndex', '/CenterSideIndex', '/WaterSideIndex2', '/HallBusiness', '/CustomerAnalysisReport', '/ChargeAnalysisStatement', '/EngineeringAnalysisReport', '/StatementAnalysisReport'];
      var arr = ["/approvalPage",'/WaterSideIndex','/ProcessApproval/PendingTrial', '/HallBusiness', '/saleManagement', '/BusinessManagement', '/CustomerManagementCenter', '/CallCenter', '/RoleManage', '/UserManage']
      var arr1 = ['/ProcessApproval/PendingTrial']

      if (arr.includes(val.path)) {
        this.menuShow = false;
        $(".primary-menu").css('width', '0px');
        $('.kl-container').css('width', '100%');
        $('.primary-menu .kl-aside').css('display', 'none');
        $('.primary-menu .leftChange').addClass('el-icon-arrow-right').removeClass('el-icon-arrow-left');
      } else {
        this.menuShow = true;
        $(".primary-menu").css('width', '200px');
        $('.kl-container').css('width', 'calc(100% - 210px)');
        $('.primary-menu .kl-aside').css('display', 'block');
        $('.primary-menu .leftChange').addClass('el-icon-arrow-left').removeClass('el-icon-arrow-right');
      }

    },
    navTreeHandleSelect(key, keyPath) {
      this.activeIndex = key;
    },
    collapse() {
      this.util.menuShow('.primary-menu', '.kl-container', '.primary-menu .kl-aside', '.primary-menu .leftChange')
    }
  },
  watch: {
    controllChilder(a, b) {
    },
    defaultPage() {
      return this.defaultPage
    },
    MenuData() {
      // console.log(this.MenuData)
      return this.MenuData
    },
    $route(newVal) {
      this.changeNav(newVal);
    }


  },

}
</script>

<style lang="scss">
@import "../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;

// .el-tooltip__popper{
//       top: 600px !important;
// }
.fontRight{
  float: right;  
  margin: 0 0 10px; 
}
#second_nav .badge{
      height: 17px;
      line-height: 17px;
}
// .formBill {
//   #firstNav {
//     .top {
//       height: 68px;
//     }
//   }
//   .el-form-item {
//     width: 23%;
//     margin-bottom: 8px;
//     .el-form-item__content {
//       width: calc(100% - 130px);
//       .el-select {
//         width: 100%;
//       }
//       .el-radio__label{
//         font-size: 12px;
//       }
//     }
//     .el-input__inner {
//       height: 30px;
//       width: 100%;
//     }
//   }
//   .CheckGroup {
//     width: 47%;
//   }
//   .Remarks {
//     width: 47%;
//     .el-form-item__content {
//       width: calc(100% - 130px);
//     }
//   }
//   .kl-table {
//     padding: 10px;
//   }
// }
// .formBill-Three {
//   #firstNav {
//     .top {
//       height: 68px;
//     }
//   }
//   .el-form-item {
//     width: 31%;
//     margin-bottom: 8px;
//     .el-form-item__content {
//       width: calc(100% - 130px);
//       .el-select {
//         width: 100%;
//       }
//       .el-radio__label{
//         font-size: 12px;
//       }
//     }
//     .el-input__inner {
//       height: 30px;
//       width: 100% !important;
//     }
//   }
//   .CheckGroup {
//     width: 47%;
//   }
//   .Remarks {
//     width: 47%;
//     .el-form-item__content {
//       width: calc(100% - 130px);
//     }
//   }
//   .kl-table {
//     padding: 10px;
//   }
// }
// .formBill-Two {
//   #firstNav {
//     .top {
//       height: 68px;
//     }
//   }
//   .el-form-item {
//     width: 47%;
//     margin-bottom: 8px;
//     .el-form-item__content {
//       width: calc(100% - 130px);
//       .el-select {
//         width: 100%;
//       }
//       .el-radio__label{
//         font-size: 12px;
//       }
//     }
//     .el-input__inner {
//       height: 30px;
//       width: 100%;
//     }
//   }
//   .CheckGroup {
//     width: 47%;
//   }
//   .Remarks {
//     width: 47%;
//     .el-form-item__content {
//       width: calc(100% - 130px);
//     }
//   }
//   .kl-table {
//     padding: 10px;
//   }
// }
// .formBill-One {
//   margin-top: 2%;
//   #firstNav {
//     .top {
//       height: 68px;
//     }
//   }
//   .el-form-item {
//     width: 47%;
//     padding: 0 23%;
//     margin-bottom: 8px;
//     .el-form-item__content {
//       width: calc(100% - 130px);
//       .el-select {
//         width: 100%;
//       }
//       .el-radio__label{
//         font-size: 12px;
//       }
//     }
//     .el-input__inner {
//       height: 30px;
//       width: 100%;
//     }
//   }
//   .CheckGroup {
//     width: 47%;
//   }
//   .Remarks {
//     width: 47%;
//     .el-form-item__content {
//       width: calc(100% - 130px);
//     }
//   }
//   .kl-table {
//     padding: 10px;
//   }
// }

.legendColumn {
  background: #efefef;
  font-weight: 700;
  padding: 5px 20px;
  font-size: 14px;
  margin-bottom: 5px;
}
.qianfei {
  .el-dialog {
    height: 80% !important;
  }
}
.el-checkbox__label {
  font-size: 12px;
}
.searchInput,
.bigSelect {
  width: 220px;
  .el-form-item__content {
    width: calc(100% - 65px);
  }
  .el-input__inner,
  .el-select {
    width: 100%;
  }
}
.bigSelect {
  width: 230px;
}
.el-dialog {
  margin: 0 auto;
  width: 80%;
  height: 94%;
  margin-top: 38px !important;
}
.center-side-right .table-top {
  margin-top: 20px;
  .el-table__body-wrapper {
    font-weight: 700;
  }
  .el-table__body-wrapper tr td:nth-child(1) .cell {
    color: #3195f4;
    cursor: pointer;
  }
}
.custom-home .tab-title {
  height: 2.5rem;
  line-height: 2.5rem;
  margin: 0;
  background: #fff;
  color: #000;
  border-radius: 6px 6px 0 0;
  padding-left: 20px;
  font-size: large;
  font-weight: 600;
  border-bottom: 1px solid #f3f5fb;
  span {
    font-weight: 400;
  }
}
.custom-home .tab-title i {
  width: 4px;
  background: #c4d600;
  border-radius: 4px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #f5f5f5;
}
#firstNav {
  .top,
  .logo,
  .setting {
    height: 58px !important;
  }
  .logoLine {
    line-height: 58px;
  }
  .logo img {
    height: 42px;
  }
  .title {
    height: 58px;
    line-height: 58px;
    font-size: 23px;
  }
}
#firstNav .nav .navList > li {
  line-height: 25px;
  height: 24px !important;
}
.el-table__header {
  th {
    color: #111;
    background: #f3f5fb;
  }
}

.custom-home {
  background: #eaf4ff;
  zoom: 1;
  &:after {
    @include _clearBoth();
  }
  .title {
    color: #fff;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    height: 50px;
    /* line-height: 50px; */
    padding: 0 20px;
  }
  height: 100%;
  .select-tree {
    z-index: 3000;
    position: fixed;
    right: 0;
    top: 60px;
    height: calc(100% - 60px);
    /*background: #ccc !important;*/
    transition: width 500ms linear;
    box-shadow: 0 0 10px 0 #ccc;
  }
  .show-tree {
    width: 300px;
  }
  .hide-tree {
    width: 0px;
  }
  header {
    height: 88px;
    background-color: #297acc;
    .header-top {
      // display: flex;
      padding-right: 30px;
      color: #fff;
      text-align: center;
      height: 68px;
      line-height: 38px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      zoom: 1;
      &::after {
        display: block;
        content: "";
        clear: both;
      }
      .nav-right {
        height: 38px;
      }
      .header-top-left {
        float: left;
        height: 38px;
        // & > * {
        //   float: left;
        //   margin-top: px2rem(8);
        // }
        img {
          // margin-right: px2rem(30);
          height: 34px;
          vertical-align: middle;
          line-height: 34px;
          margin-top: -13px;
        }
        i {
          width: 1.8px;
          height: 20px;
          margin-top: 9px;
          background-color: #dfdfea;
          display: inline-block;
          opacity: 0.5;
        }
        & > p {
          float: left;
          height: px2rem(24px);
          border-right: 1px solid #000;
          margin: px2rem(27) px2rem(20);
        }
        span {
          font-weight: bolder;
          font-size: 18px;
          vertical-align: top;
        }
      }
      // .header-outer {
      //   width: 55%;
      //   display: flex;
      //   flex: 1;
      //   .header-menu {
      //     background-color: #0c6ad7;
      //     border-right: 0px;
      //     display: flex;
      //     width: 50%;
      //     .el-menu-item:hover {
      //       background: #0c6ad7;
      //       color:#fff;
      //     }
      //     .el-menu-item {
      //       height: 100%;
      //     }
      //     .is-active {
      //       background: $theme-color !important;
      //     }
      //   }
      //   ul {
      //     height: 100%;
      //     .menu-item {
      //       display: flex;
      //       cursor: pointer;
      //     }
      //     .left-icon {
      //       height: 50px;
      //       width: 25px;
      //       background: url(../assets/images/icon.png) no-repeat;
      //     }
      //     li {
      //       font-size: 12px;
      //       display: flex;
      //       padding-left: 10px !important;
      //       padding-right: 10px !important;
      //     }
      //     li:hover {
      //       background: #0c6ad7 !important;
      //     }
      //   }
      // }
      & > b {
        font-size: 20px;
      }
      .kl-button--mini {
        padding: 2px 10px;
      }
    }
  }
  .header-top-right {
    // margin-right: px2rem(30);
    // margin-left:5.7rem;
    display: flex;
    align-items: center;
    height: 100%;
    float: right;
    .menu1{
      margin-right: 40px !important;
      height: 40px;
      cursor: pointer;
    }
    .menu6{
      margin-right: 5px !important;
    }
    .menu_img {
      margin-right: 30px;
      height: 40px;
      cursor: pointer;
    }
    .el-input__icon {
      line-height: 45px;
    }
    .loginArea{
      display: block;
      float: left;
      position: relative;
      line-height: 8px;
      padding: 0px 10px 0px 40px;
      font-size: 12px;
      text-align: center;
      img{
        width: 45px;
        height: 45px;
        margin: 5px 0;
        border-radius: 50%;
      }
      .infoPop{
          display: none;
          position: absolute;
          right: 3px;
          top: 55px;
          width: 100px;
          font-size: 12px;
          line-height: 22px;
          border: 1px solid #e2e2e2;
          background: #fff;
          padding: 10px;
          border-radius: 4px;
          -webkit-box-shadow: 1px 2px 2px #e2e2e2;
          box-shadow: 1px 2px 2px #e2e2e2;
          text-align: left;
          z-index: 2000;
        
        &:after{  
            content: '';
            display: block;
            border-bottom: 10px solid #c5343400;
            border-left: 10px solid #ffffff;
            position: absolute;
            right: 23px;
            top: -3px;
            z-index: 11;
            background-color: transparent;
            transform: rotate(45deg);
        }
        .nick{
          width: 100%;
          color: #4889f3;
          margin: 0;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .line{
          border-bottom: 1px dashed #e4e4e4;
          height: 0;
          font-size: 0;
          overflow: hidden;
          margin: 5px 0;
        }
        .loginout{
            color: #5c5c5c;
            cursor: pointer;
          &:hover{
            color: #bf5757;

          }
        }
      }
    }

    & > span {
      color: #fff;
      font-size: 14px;
      i {
        color: #fff;
        font-size: 14px;
        vertical-align: middle;
        height: 14px;
        width: 14px;
      }
    }
    & > * {
      float: left;
    }
    .el-button--primary {
      border-color: #f78e1e;
      background-color: #f78e1e;
    }
    i {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 10px;
      img {
        width: 40px;
        height: 40px;
        float: left;
      }
    }
    b {
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      padding: 0 20px 0 10px;
      font-weight: 400;
    }
    & > div {
      margin-left: 10px;
      span{
          font-size: 14px;
          color: #f5f7f9;
      }
      u {
        position: absolute;
        padding: 5px;
        border-radius: 50%;
        top: 5px;
        right: 0;
        &.active {
          background: red;
        }
      }
      .el-input.el-input--suffix {
        input {
          border: 0;
          color: #000;
          width: 2.5rem;
          padding-right: 0;
          padding-left: 10px;
          font-size: 12px;
          width: 90px;
          height: 26px;
        }
        .el-input__suffix {
          right: -4px;
          top: -3px;
          .el-input__suffix-inner {
            .el-select__caret {
              height: auto;
              // margin-top: -4px;
            }
          }
        }
      }
    }
  }
  .first_box {
    width: 100%;
    height: 0.35rem;
    .menu {
      height: 100%;
      div {
        display: inline-block;
        // width: 7%;
        height: 0.25rem;
        line-height: 0.25rem;
        background: white;
        text-align: center;
        border-radius: 0.05rem;
        border: 1px solid red;
        margin-left: 0.1%;
        cursor: pointer;
        margin-top: 0.4%;
        span {
          font-size: 0.12rem;
          color: #428ad2;
          // vertical-align: middle;
          line-height: 70%;
          display: inline-block;
          // margin-top: 2%;
          padding: 0.1rem;
        }
      }
    }
  }

  & > .kl-container {
    height: calc(100% - 90px);
    position: relative;
    background: #eaf4ff;
    padding: 10px;
    float: left;
    width: 100%;
    // width: calc(100% - 20px);
    .kl-aside {
      position: absolute;
      left: 10px;
      // top: 10px;
      width: $imgWidth;
      z-index: 1000;
      background: #fff;
      height: calc(100% - 18px);
      color: #000;
      border-radius: 3px;
    }
    .kl-main {
      height: 100%;
      margin-left: 210px;
      border-radius: 3px;
      background: #fff;
      .model-first-rank {
        padding: 0px;
      }
    }
  }
  & > .primary-menu {
    float: left;
    width: 200px;
    height: calc(100% - 110px);
    position: relative;
    background: #fff;
    margin: 10px;
    margin-right: 0px;
    .kl-aside {
      position: absolute;
      left: 0px;
      // top: 10px;
      width: 200px;
      z-index: 1000;
      background: #fff;
      height: calc(100% - 18px);
      color: #000;
      border-radius: 3px;
      .el-menu {
        width: 100%;
        border: none;
        overflow: auto;
        background: transparent;
        background: #fff;
        height: 100%;

        .el-menu-item {
          height: 38px;
        }

        .el-menu-item.is-active {
          background: #328ed1;
          color: #fff;
        }

        .el-menu-item {
          width: 100%;

          text-align: center;
        }
        .el-menu-item,
          // .el-submenu {
          //     i:first-child {
          //     display: inline-block;
          //     width: 15px;
          //     height: 20px;
          //     background-size: 100%;
          //     }
          // }
          li.el-submenu {
          color: #000;
          .el-menu {
            background: transparent;
          }
          .el-submenu__title {
            text-align: left;
            height: 50px !important;
            line-height: 50px !important;
            font-size: 14px;
            font-weight: 700;
            &:hover,
            &:focus {
              background: $theme-color;
            }
          }
        }
        .el-menu-item {
          background: transparent;
          color: #3b3a3a;
          text-align: left;
          height: 38px !important;
          line-height: 38px !important;
          font-size: 14px;
          min-width: 180px;
          &:hover,
          &:focus {
            background: $theme-color;
          }
          &.is-active {
            background: $theme-color;
            color: #fff;
            height: 38px !important;
            line-height: 38px !important;
          }
        }
      }
      .kr-title {
        color: #3195f4;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        text-align: center;
      }

      .switch-btn {
        position: relative;
        width: 18px;
        height: 100%;
        float: left;
        background: rgba(0, 70, 142, 0.1);
        line-height: 100%;
        text-align: center;
        .glyphicon-menu-right,
        .glyphicon-menu-left {
          vertical-align: middle;
          background: rgb(0, 70, 141);
          color: #fff;
          height: 60px;
          line-height: 60px;
          font-weight: bolder;
          position: absolute;
          top: 50%;
          left: 3%;
          transform: translateY(-50%);
          border-radius: 0 3px 3px 0;
        }
      }
    }
    .kl-main {
      height: 100%;
      margin-left: 210px;
      border-radius: 3px;
      background: #fff;
      .model-first-rank {
        padding: 0px;
      }
    }
  }
}
.el-select-dropdown__item {
  padding: 0 17px;
}

.header-menu {
  //ul
  background-color: #0c6ad7;
  border-right: 0px !important;
  display: flex;
  width: 50%;
  height: 100%;
  .menu-item {
    padding: 3px;
    & > li {
      padding: 11px 15px !important;
      height: 24px;
      font-size: 12px;
    }
    .el-menu-item {
      line-height: 2px;
      border-radius: 2px;
      color: #297acc;
    }
  }
  .el-menu-item:hover {
    //li
    background: #cdcdcd !important;
    color: #297acc !important;
  }
  .el-menu-item {
    height: 100%;
  }
  .is-active {
    background: #328ed1 !important;
    color: #fff !important;
  }
}
#firstNav .setting {
  margin-right: 50px;
}

.read-only.el-input.is-disabled .el-input__inner {
  border: none;
  // border-bottom: 1px solid #ccc;
  background-color: transparent;
  border-radius: 0px;
  cursor: text !important;
  &::-webkit-input-placeholder {
    color: #000;
  }
  &::-moz-placeholder {
    color: #000;
  }
  &:-ms-input-placeholder {
    color: #000;
  }
}

.el-table {
  padding: 0px;
  .el-input__inner {
    // border:none;
    background: transparent;
    height: 30px;
    line-height: 30px;
    padding-right: 0px;
    width: 100% !important;
    padding-left: 0px;
  }
  .el-input__inner:hover {
    border: 1px solid #b8bdca;
  }
  .el-date-editor .el-input__inner {
    padding-left: 30px;
  }
}
#app .center-side .el-dialog {
  width: 70% !important;
  .el-dialog__body {
    height: calc(100% - 56px);
  }
}
#app .searchBtn {
  background: #faa646;
  color: #fff;
}
#app .textareaBecs {
  width: 100%;
  .el-form-item__content {
    width: 50%;
  }
}
#app .basicInfoForm {
  margin: 20px;
  .el-form-item {
    margin-bottom: 18px;
    width: 75%;
    .el-form-item__content {
      width: calc(100% - 150px);
      .el-select {
        width: 100%;
      }
    }
  }
  .el-input--mini /deep/ .el-input__inner {
    width: 100% !important;
  }
}

#app .water-side .el-tabs__header.is-top,
#app .WaterSideIndex .el-tabs__header.is-top {
  display: none !important;
}

#app .water-side .mydestop .el-tabs .el-tabs__content,
#app .WaterSideIndex .mydestop .el-tabs .el-tabs__content {
  width: calc(100% - 41px);
}
#app .toolbar-line {
  width: 4px;
  background: #c4d600;
  border-radius: 4px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
}
#app .toolbar-font {
  font-weight: 700;
  font-size: 16px;
  height: 19px;
  display: inline-block;
  line-height: 19px;
  vertical-align: middle;
}
#app .toolbar-fontSon {
  font-size: 14px;
  height: 19px;
  display: inline-block;
  line-height: 19px;
  vertical-align: middle;
}
// #app .bread-contain {
//   width: calc(100% - 10px);
//   height: 40px;
//   zoom: 1;
//   border-bottom: 1px solid #eaf4ff;
//   &::after {
//     @include _clearBoth();
//   }
//   .bread-contain-right {
//     float: right;
//     width: 50%;
//     text-align: right;
//     line-height: 40px;
//   }
//   #crumbs {
//     float: left;
//     width: 40%;
//     padding-right: 0px;
//   }
// }

.el-tree {
  .el-tree-node__label {
    font-size: 12px;
  }
}
.date-picker .el-date-editor {
  display: inline-block;
  width: calc(100% - 30px) !important;
  .el-input__inner {
    width: 100% !important;
    border: none;
    border-bottom: 1px solid #ccc;
    background-color: transparent;
    border-radius: 0px;
  }
}
#app .center-side .quotaSetting .el-dialog__body,
#app .WaterSideIndex2 .quotaSetting .el-dialog__body {
  height: calc(100% - 136px);
}
#app .center-side .echartsWaterSaless .el-dialog {
  height: 70%;
  margin-top: 30px !important;
}
#app .el-input.is-disabled .el-input__inner {
  color: #000;
}
#app .collapse {
  z-index: 1122;
  position: absolute;
  right: 0;
  top: 50%;
  margin-bottom: 25px;
  cursor: pointer;
  background-color: #000;
  color: #f3f3f3;
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  -webkit-border-top-left-radius: 3px;
  -webkit-border-bottom-left-radius: 3px;
  -moz-border-radius-topleft: 3px;
  -moz-border-radius-bottomleft: 3px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  filter: alpha(opacity=25);
  -moz-opacity: 0.25;
  opacity: 0.25;
}
#app .StepCollapse{
      z-index: 1122;
      position: absolute;
      right: 153px;
      top: 50%;
      margin-bottom: 25px;
      cursor: pointer;
      background-color: #000;
      color: #f3f3f3;
      height: 32px;
      line-height: 32px;
      font-size: 12px;
      -webkit-border-top-right-radius: 3px;
      -webkit-border-bottom-right-radius: 3px;
      -moz-border-radius-topright: 3px;
      -moz-border-radius-bottomright: 3px;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      filter: alpha(opacity=25);
      -moz-opacity: 0.25;
      opacity: 0.25;
    }
#app .stepsCompar{
    width: 150px;
    height: 100%;
    display: inline-block;
    border-left: 10px solid #eaf4ff;
    position: relative;
    .stepsTitle{
      font-size: 16px;
      margin-left: 10px;
      font-weight: 700;
      color: #4593d8;
      display: inline-block;
    }
    .el-step__title{
      font-size: 14px;
    }
    .el-steps {
      width: calc(100% - 30px);
      height: calc(100% - 80px) !important;
      margin-left: 30px;
    }
    .line{
      border-bottom: 1px solid #4593d8;
      height: 0;
      font-size: 0;
      overflow: hidden;
      margin: 5px 10px;
    }

}
#app .approvalPageDio{
    .el-dialog__body{
      height: calc(100% - 55px);
    }
  }
#app .animation {
  transition: all 0.5s;
  -webkit-transform: translateX(0px);
  -ms-transform: translateX(0px);
  transform: translateX(0px);
}
#app .el-checkbox__input.is-checked + .el-checkbox__label {
  margin-right: 0px !important;
}
.el-loading-spinner i {
  font-size: 50px;
}
.el-loading-spinner .el-loading-text {
  font-size: 18px;
}
#app .el-textarea .el-input__count {
  height: 20px;
}
</style>
