
export default ([
    {
        path: '/OtherConfigurations',
        meta: {
          title: '用水价格'
        },
        component: resolve => require(['@/views/BasicSet'], resolve),
        children:[
            {
                path: '/',
                redirect:"BookInfo"
            },
            {// 开账-册本信息
                path: '/OtherConfigurations/BookInfo',
                meta: {
                title: '册本信息'
                },
                component: resolve => require(['@/views/BasicSet/BasicInfo/BookInfo/index'], resolve)
            },
            {//基础设置-基础信息-银行信息
                path: '/OtherConfigurations/BankInfo',
                meta: {
                title: '银行信息'
                },
                component: resolve => require(['@/views/BasicSet/BasicInfo/BankInfo/index'], resolve),
                children:[],
            },
            {//基础设置-基础信息-附件文件
                path: '/OtherConfigurations/Appendix',
                meta: {
                title: '用户资料'
                },
                component: resolve => require(['@/views/BasicSet/BasicInfo/Appendix/index'], resolve),
                children:[],
            },
            {//基础设置-基础信息-假期设置
                path: '/OtherConfigurations/HolidaySet',
                meta: {
                title: '假期设置'
                },
                component: resolve => require(['@/views/BasicSet/BasicInfo/HolidaySet/index'], resolve),
                children:[],
            },
            {//基础设置-材料价格
                path: '/OtherConfigurations/MaterialPrice',
                meta: {
                title: '材料价格'
                },
                component: resolve => require(['@/views/BasicSet/BasicInfo/MaterialPrice'], resolve),
                children:[],
            },
            {//基础设置-通知规则配置
                path: '/OtherConfigurations/NotificationRules',
                meta: {
                title: '通知规则配置'
                },
                component: resolve => require(['@/views/BasicSet/PriceContrl/NotificationRules'], resolve),
                children:[],
            },
            {//基础设置-全局参数设置
                path: '/OtherConfigurations/GlobalParamSet',
                meta: {
                title: '全局参数设置'
                },
                component: resolve => require(['@/views/BasicSet/GlobalParamSet/index'], resolve),
                children:[],
            },
            {//基础设置-价格管理-费用组成
                path: '/OtherConfigurations/CostProject',
                meta: {
                title: '费用组成'
                },
                component: resolve => require(['@/views/BasicSet/PriceContrl/CostProject/index'], resolve),
                children:[],
            },
            {//基础设置-票据类型
                path: '/OtherConfigurations/BillType',
                meta: {
                title: '票据类型'
                },
                component: resolve => require(['@/views/BasicSet/Bill/BillType/index'], resolve),
                children:[],
            },
            {//基础设置-费用票据关系
                path: '/OtherConfigurations/ExpenseBillRelationship',
                meta: {
                title: '费用票据关系'
                },
                component: resolve => require(['@/views/BasicSet/Bill/ExpenseBillRelationship'], resolve),
                children:[],
            },
            {//基础设置-快速变更配置
                path: '/OtherConfigurations/QuickChangeConfiguration',
                meta: {
                title: '快速变更配置'
                },
                component: resolve => require(['@/views/BasicSet/QuickChangeConfiguration/index'], resolve),
                children:[],
            },
        ],
    },
])