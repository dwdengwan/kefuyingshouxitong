// import CustomerCenter from "./CustomerCenter"
// import MeterReadingCenter from "./MeterReadingCenter"
// import FinancialCenter from "./FinancialCenter"
// import WatchCenter from "./WatchCenter"
// import ServiceCenter from "./ServiceCenter"
// export default ([
//     // 工程中心
//    {// 用户工程-工程登记
//         path: '/views',
//         meta: {
//         title: '业务管理'
//         },
//         component: resolve => require(['@/views/EngineeringCenter'], resolve),
//         children:[
//             {
//                 path: '/',
//                 redirect:"waterQuery"
//             },
//             {
//                 path: 'waterQuery',
//                 meta: {
//                 title: '用水咨询'
//                 },
//                 component: resolve => require(['@/views/EngineeringCenter/waterQuery'], resolve)
//             },
//             {
//                 path: 'waterMeterInstall',
//                 meta: {
//                 title: '用水安装'
//                 },
//                 component: resolve => require(['@/views/EngineeringCenter/waterMeterInstall'], resolve)
//             },
//             {
//                 path: 'EngineeringRegistration',
//                 meta: {
//                 title: '工程登记'
//                 },
//                 component: resolve => require(['@/views/EngineeringCenter/EngineeringRegistration.vue'], resolve)
//             },
//             {// 用户工程-处理中
//                 path: 'Processing',
//                 meta: {
//                 title: '处理中'
//                 },
//                 component: resolve => require(['@/views/EngineeringCenter/Processing.vue'], resolve)
//             },
//             {// 用户工程-处理完成
//                 path: 'ProcessingCompleted',
//                 meta: {
//                 title: '处理完成'
//                 },
//                 component: resolve => require(['@/views/EngineeringCenter/ProcessingCompleted.vue'], resolve)
//             },
//             {// 用户工程-全部工程
//                 path: 'AllProjects',
//                 meta: {
//                 title: '全部工程'
//                 },
//                 component: resolve => require(['@/views/EngineeringCenter/AllProjects.vue'], resolve)
//             },
//             {// 用户工程-工程计提
//                 path: 'ProjectProvision',
//                 meta: {
//                 title: '工程计提'
//                 },
//                 component: resolve => require(['@/views/EngineeringCenter/ProjectProvision.vue'], resolve)
//             },
//             {// 内部工程-工程登记
//                 path: 'insideEngineeringRegistration',
//                 meta: {
//                 title: '工程登记'
//                 },
//                 component: resolve => require(['@/views/EngineeringCenter/insideEnging/insideEngineeringRegistration.vue'], resolve)
//             },
//             {// 内部工程-处理中
//                 path: 'insideProcessing',
//                 meta: {
//                 title: '处理中'
//                 },
//                 component: resolve => require(['@/views/EngineeringCenter/insideEnging/insideProcessing.vue'], resolve)
//             },
//             {// 内部工程-处理完成
//                 path: 'insideProcessingCompleted',
//                 meta: {
//                 title: '处理中'
//                 },
//                 component: resolve => require(['@/views/EngineeringCenter/insideEnging/insideProcessingCompleted.vue'], resolve)
//             },
//             {// 内部工程-全部工程
//                 path: 'insideAllProjects',
//                 meta: {
//                 title: '全部工程'
//                 },
//                 component: resolve => require(['@/views/EngineeringCenter/insideEnging/insideAllProjects.vue'], resolve)
//             },
//             {// 内部工程-工程计提
//                 path: 'insideProjectProvision',
//                 meta: {
//                 title: '工程计提'
//                 },
//                 component: resolve => require(['@/views/EngineeringCenter/insideEnging/insideProjectProvision.vue'], resolve)
//             },
//             // 表计管理
//             ...WatchCenter,
//             // 客户管理
//             ...CustomerCenter,
//             // 抄表中心
//             ...MeterReadingCenter,
//             // 收费管理
//             ...FinancialCenter,
//             // 收费管理
//             ...ServiceCenter,
//         ]
//     },
//   ])