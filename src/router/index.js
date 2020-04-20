import Vue from 'vue'
import Router from 'vue-router'

// 统计报表
import ReportCenter from "./modules/ReportCenter"
//系统管理
import SystemSet from "./modules/SystemSet"

// 基础配置
import RegionalConfiguration from './BasicConfiguration/RegionalConfiguration'
import WaterMeterConfiguration from './BasicConfiguration/WaterMeterConfiguration'
import WaterPrice from './BasicConfiguration/WaterPrice'
import NotificationManagement from './BasicConfiguration/NotificationManagement'
import TemplateConfiguration from './BasicConfiguration/TemplateConfiguration'
import OtherConfigurations from './BasicConfiguration/OtherConfigurations'

// 业务管理
import EngineeringManagement from './BusinessManagement/EngineeringManagement';
import CustomerManagement from './BusinessManagement/CustomerManagement';
import MeterReading from './BusinessManagement/MeterReading';
import ChargeManagement from "./BusinessManagement/ChargeManagement"
import MeterManagement from "./BusinessManagement/MeterManagement"
import CustomerNotificationCenter from "./BusinessManagement/CustomerNotificationCenter"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      meta: {
        title: '主容器'
      },
      component: resolve => require(['@/views/home'], resolve),
      children:[
      	{
          path: '/',
          meta: {
            title: '水司端首页'
          },
          component: resolve => require(['@/views/WaterSideIndex'], resolve)
        },
        {
          path: '/WaterSideIndex',
          meta: {
            title: '水司端首页'//important
          },
          component: resolve => require(['@/views/WaterSideIndex'], resolve)
        },
        {
          path: '/HallBusiness',
          meta: {
            title: '工作台'//important
          },
          component: resolve => require(['@/views/ServiceCentre/HallBusiness'], resolve)
        },
        {
          path: '/CenterSideIndex',
          meta: {
            title: '集团首页'
          },
          component: resolve => require(['@/views/CenterSideIndex'], resolve)
        },
        
        {
          path: '/ProcessApproval/PendingTrial',
          meta: {
            title: '流程中心'
          },
          component: resolve => require(['@/views/ProcessApproval/PendingTrial'], resolve)
        },
        // 统计报表
        ...ReportCenter,
        
        
        // 系统管理
        ...SystemSet,
        


        // 一级菜单-基础配置
        // 区域配置
        ...RegionalConfiguration,
        // 水表配置
        ...WaterMeterConfiguration,
        // 用水价格
        ...WaterPrice,
        //通知管理
        ...NotificationManagement,
        // 模板配置
        ...TemplateConfiguration,
        // 其他配置
        ...OtherConfigurations,

        // 一级菜单-业务管理
        // 工程管理
        ...EngineeringManagement,
        // 客户管理
        ...CustomerManagement,
        // 抄表开张
        ...MeterReading,
        // 收费管理
        ...ChargeManagement,
        // 表计管理
        ...MeterManagement,
        // 客户通知
        ...CustomerNotificationCenter,






        // 销售管理
        {
          path: '/CustomerAnalysisReport',
          meta: {
            title: '销售管理'
          },
          component: resolve => require(['@/views/CustomerAnalysisReport'], resolve),
          children:[]
        },
        // 客户管理
        {
          path: '/ChargeAnalysisStatement',
          meta: {
            title: '客户管理'
          },
          component: resolve => require(['@/views/ChargeAnalysisStatement'], resolve),
          children:[]
        },
        // 业务办理
        {
          path: '/EngineeringAnalysisReport',
          meta: {
            title: '业务办理'
          },
          component: resolve => require(['@/views/EngineeringAnalysisReport'], resolve),
          children:[]
        },
        // 呼叫中心
        {
          path: '/StatementAnalysisReport',
          meta: {
            title: '呼叫中心'
          },
          component: resolve => require(['@/views/AnalysisCenter/StatementAnalysisReport'], resolve),
          children:[]
        },
        // 微厅分析报表
        {
          path: '/MicrosoftAnalysisReport',
          meta: {
            title: '微厅分析报表'
          },
          component: resolve => require(['@/views/AnalysisCenter/MicrosoftAnalysisReport'], resolve),
          children:[]
        },
        // 网厅分析报表
        {
          path: '/NetOfficeAnalysisReport',
          meta: {
            title: '网厅分析报表'
          },
          component: resolve => require(['@/views/AnalysisCenter/NetOfficeAnalysisReport'], resolve),
          children:[]
        },
        // 智慧营业厅分析报表
        {
          path: '/AnalysisReportIntelligentBusiness',
          meta: {
            title: '智慧营业厅分析报表'
          },
          component: resolve => require(['@/views/AnalysisCenter/AnalysisReportIntelligentBusiness'], resolve),
          children:[]
        },
      ]
    },
    {
      path: '/error',
      meta: {
        title: '错误页面'
      },
      component: resolve => require(['@/views/errorPage'], resolve)
    },
  ]
})
