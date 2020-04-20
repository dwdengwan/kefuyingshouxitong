
// export default ([
//     // {
//     //     path: '/ServiceCenter',
//     //     meta: {
//     //       title: '信息发布'
//     //     },
//     //     component: resolve => require(['@/views/ServiceCentre'], resolve),
//     //     children:[
//     //         {
//     //             path: '/',
//     //             redirect:"CustomerNotification"
//     //         },
//             {
//                 path: 'CustomerNotification',
//                 meta: {
//                   title: '客户通知'
//                 },
//                 component: resolve => require(['@/views/ServiceCentre/CustomerNotification'], resolve)
//               },
//           {
//             path: 'ShortMessageNotification',
//             meta: {
//               title: '短信通知'
//             },
//             component: resolve => require(['@/views/ServiceCentre/CustomerNotification/ShortMessageNotification'], resolve)
//           },
//           {
//             path: 'NotificationDetails',
//             meta: {
//               title: '消息查询'
//             },
//             component: resolve => require(['@/views/ServiceCentre/CustomerNotification/NotificationDetails'], resolve)
//           },
//           {
//             path: 'WechatNotification',
//             meta: {
//               title: '微信通知'
//             },
//             component: resolve => require(['@/views/ServiceCentre/CustomerNotification/WechatNotification'], resolve)
//           },
//           {
//             path: 'CustomerServiceWorkOrder',
//             meta: {
//               title: '客服工单'
//             },
//             component: resolve => require(['@/views/ServiceCentre/CustomerServiceWorkOrder'], resolve)
//           },
//           {
//             path: 'HallBusiness',
//             meta: {
//               title: '大厅业务'
//             },
//             component: resolve => require(['@/views/ServiceCentre/HallBusiness'], resolve)
//           },
//           {
//             path: 'InformationDelivery',
//             meta: {
//               title: '水厂开放日管理'
//             },
//             component: resolve => require(['@/views/ServiceCentre/InformationDelivery'], resolve)
//           },
//           {
//             path: 'InformationReleaseManagement',
//             meta: {
//               title: '信息发布管理'
//             },
//             component: resolve => require(['@/views/ServiceCentre/InformationDelivery/InformationReleaseManagement'], resolve)
//           },
//           {
//             path: 'CommonFormManagement',
//             meta: {
//               title: '常用表格管理'
//             },
//             component: resolve => require(['@/views/ServiceCentre/InformationDelivery/CommonFormManagement'], resolve)
//           },
//           {
//             path: 'SatisfactionSurvey',
//             meta: {
//               title: '问题库管理'
//             },
//             component: resolve => require(['@/views/ServiceCentre/SatisfactionSurvey'], resolve)
//           },
//           {
//             path: 'QuestionnaireManagement',
//             meta: {
//               title: '问卷管理'
//             },
//             component: resolve => require(['@/views/ServiceCentre/SatisfactionSurvey/QuestionnaireManagement'], resolve)
//           },
//           {
//             path: 'Findings',
//             meta: {
//               title: '调查结果'
//             },
//             component: resolve => require(['@/views/ServiceCentre/SatisfactionSurvey/Findings'], resolve)
//           },
//       //   ]
//       // },
//   ])