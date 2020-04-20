
// export default ([
//     {
//         path: '/BasicSet',
//         meta: {
//           title: '基础配置'
//         },
//         component: resolve => require(['@/views/BasicSet'], resolve),
//         children:[
//             {
//                 path: '/',
//                 redirect:"BusinessArea"
//             },
//             {//基础设置-基础信息-行业分类
//                 path: 'IndustryCategory',
//                 meta: {
//                 title: '行业分类'
//                 },
//                 component: resolve => require(['@/views/BasicSet/BasicInfo/IndustryCategory/index'], resolve),
//                 children:[],
//             },
//             {//基础设置-基础信息-街区信息
//                 path: 'BlocksInfo',
//                 meta: {
//                 title: '街区信息'
//                 },
//                 component: resolve => require(['@/views/BasicSet/BasicInfo/BlocksInfo/index'], resolve),
//                 children:[],
//             },
//             {//基础设置-基础信息-小区信息
//                 path: 'CommunityInfo',
//                 meta: {
//                 title: '小区信息'
//                 },
//                 component: resolve => require(['@/views/BasicSet/BasicInfo/CommunityInfo/Add'], resolve),
//                 children:[],
//             },
//             {//基础设置-基础信息-水表厂家
//                 path: 'WaterMeterfacturer',
//                 meta: {
//                 title: '水表厂家'
//                 },
//                 component: resolve => require(['@/views/BasicSet/BasicInfo/WaterMeterfacturer/index'], resolve),
//                 children:[],
//             },
//             {//基础设置-基础信息-水表型号
//                 path: 'WatermeterModel',
//                 meta: {
//                 title: '水表型号'
//                 },
//                 component: resolve => require(['@/views/BasicSet/BasicInfo/WatermeterModel/index'], resolve),
//                 children:[],
//             },
            
//             {// 抄表-水表关系
//                 path: 'MeterRelationship',
//                 meta: {
//                 title: '水表关系'
//                 },
//                 component: resolve => require(['@/views/BasicSet/BasicInfo/MeterRelationship/index'], resolve)
//             },
//             {//基础设置-基础信息-水表口径
//                 path: 'CaliberInfo',
//                 meta: {
//                 title: '水表口径'
//                 },
//                 component: resolve => require(['@/views/BasicSet/BasicInfo/CaliberInfo/index'], resolve),
//                 children:[],
//             },
//             {//基础设置-基础信息-抄表状态
//                 path: 'MeterStatus',
//                 meta: {
//                 title: '抄表状态'
//                 },
//                 component: resolve => require(['@/views/BasicSet/BasicInfo/MeterStatus/index'], resolve),
//                 children:[],
//             },
//             {//基础设置-基础信息-银行信息
//                 path: 'BankInfo',
//                 meta: {
//                 title: '银行信息'
//                 },
//                 component: resolve => require(['@/views/BasicSet/BasicInfo/BankInfo/index'], resolve),
//                 children:[],
//             },
            
//             {// 开账-册本信息
//                 path: 'BookInfo',
//                 meta: {
//                 title: '册本信息'
//                 },
//                 component: resolve => require(['@/views/BasicSet/BasicInfo/BookInfo/index'], resolve)
//             },
//             {//基础设置-基础信息-代扣设置
//                 path: 'WithholdConfig',
//                 meta: {
//                 title: '代扣设置'
//                 },
//                 component: resolve => require(['@/views/BasicSet/BasicInfo/WithholdConfig/index'], resolve),
//                 children:[],
//             },
//             {//基础设置-基础信息-假期设置
//                 path: 'HolidaySet',
//                 meta: {
//                 title: '假期设置'
//                 },
//                 component: resolve => require(['@/views/BasicSet/BasicInfo/HolidaySet/index'], resolve),
//                 children:[],
//             },
//             {//基础设置-基础信息-附件文件
//                 path: 'Appendix',
//                 meta: {
//                 title: '用户资料'
//                 },
//                 component: resolve => require(['@/views/BasicSet/BasicInfo/Appendix/index'], resolve),
//                 children:[],
//             },
//             // {//基础设置-基础信息-水厂信息
//             //   path: '/WaterInfor',
//             //   meta: {
//             //     title: '水厂信息'
//             //   },
//             //   component: resolve => require(['@/views/BasicSet/BasicInfo/WaterInfor/WaterInfor'], resolve),
//             //   children:[],
//             // },
//             {//基础设置-基础信息-泵站信息
//                 path: 'PumpStationInfo',
//                 meta: {
//                 title: '泵站信息'
//                 },
//                 component: resolve => require(['@/views/BasicSet/BasicInfo/PumpStationInfo/PumpStationInfo'], resolve),
//                 children:[],
//             },
//             // {//基础设置-基础信息-管线信息
//             //   path: '/PipelineInfor',
//             //   meta: {
//             //     title: '管线信息'
//             //   },
//             //   component: resolve => require(['@/views/BasicSet/BasicInfo/PipelineInfor/PipelineInfor'], resolve),
//             //   children:[],
//             // },
//             {//基础设置-价格管理-用水类型
//                 path: 'WaterType',
//                 meta: {
//                 title: '用水类型'
//                 },
//                 component: resolve => require(['@/views/BasicSet/PriceContrl/WaterType/index'], resolve),
//                 children:[],
//             },
//             {//基础设置-价格管理-用水价格
//                 path: 'WaterPrice',
//                 meta: {
//                 title: '用水价格'
//                 },
//                 component: resolve => require(['@/views/BasicSet/PriceContrl/WaterPrice/WaterPrice'], resolve),
//                 children:[],
//             },
//             {//基础设置-价格管理-费用组成
//                 path: 'CostProject',
//                 meta: {
//                 title: '费用组成'
//                 },
//                 component: resolve => require(['@/views/BasicSet/PriceContrl/CostProject/index'], resolve),
//                 children:[],
//             },
//             {//基础设置-价格管理-费用明细
//                 path: 'PriceInfo',
//                 meta: {
//                 title: '费用明细'
//                 },
//                 component: resolve => require(['@/views/BasicSet/PriceContrl/PriceInfo/index'], resolve),
//                 children:[],
//             },
//             {//基础设置-价格管理-优惠策略
//                 path: 'CheapStrategy',
//                 meta: {
//                 title: '优惠策略'
//                 },
//                 component: resolve => require(['@/views/BasicSet/PriceContrl/CheapStrategy/index'], resolve),
//                 children:[],
//             },
//             {//基础设置-价格管理-违约设置
//                 path: 'BreakSet',
//                 meta: {
//                 title: '违约设置'
//                 },
//                 component: resolve => require(['@/views/BasicSet/PriceContrl/BreakSet/index'], resolve),
//                 children:[],
//             },
//             // {//基础设置-自动开账设置
//             //   path: '/AutoOpen',
//             //   meta: {
//             //     title: '自动开账设置'
//             //   },
//             //   component: resolve => require(['@/views/BasicSet/AutoOpen'], resolve),
//             //   children:[],
//             // },
//             {//基础设置-全局参数设置
//                 path: 'MesNotRules',
//                 meta: {
//                 title: '全局参数设置'
//                 },
//                 component: resolve => require(['@/views/BasicSet/MesNotRules/MesNotRules'], resolve),
//                 children:[],
//             },
//             {//基础设置-全局参数设置
//                 path: 'GlobalParamSet',
//                 meta: {
//                 title: '全局参数设置'
//                 },
//                 component: resolve => require(['@/views/BasicSet/GlobalParamSet/index'], resolve),
//                 children:[],
//             },
//             {//基础设置-数据字典-添加修改组
//                 path: 'DataDictionary',
//                 meta: {
//                 title: '添加修改组'
//                 },
//                 component: resolve => require(['@/views/BasicSet/DataDictionary/AddSet'], resolve),
//                 children:[],
//             },
//             {//基础设置-数据字典-添加修改参数
//                 path: 'DataDictionarySet',
//                 meta: {
//                 title: '添加修改参数'
//                 },
//                 component: resolve => require(['@/views/BasicSet/DataDictionary/AddSetParam'], resolve),
//                 children:[],
//             },
//             {//基础设置-材料价格
//                 path: 'MaterialPrice',
//                 meta: {
//                 title: '材料价格'
//                 },
//                 component: resolve => require(['@/views/BasicSet/BasicInfo/MaterialPrice'], resolve),
//                 children:[],
//             },
//             {//基础设置-领料模板
//                 path: 'MaterialTemplate',
//                 meta: {
//                 title: '领料模板'
//                 },
//                 component: resolve => require(['@/views/BasicSet/BasicInfo/MaterialTemplate'], resolve),
//                 children:[],
//             },
//             {//基础设置-短信短语
//                 path: 'ShortMessage',
//                 meta: {
//                 title: '短信短语'
//                 },
//                 component: resolve => require(['@/views/BasicSet/BasicInfo/ShortMessage'], resolve),
//                 children:[],
//             },
//             {//基础设置-通知规则配置
//                 path: 'NotificationRules',
//                 meta: {
//                 title: '通知规则配置'
//                 },
                
//                 component: resolve => require(['@/views/BasicSet/PriceContrl/NotificationRules'], resolve),
//                 children:[],
//             },
//         ],
//     },
// ])