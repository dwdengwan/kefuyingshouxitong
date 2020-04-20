
export default ([
    {
        path: '/WaterPrice',
        meta: {
          title: '用水价格'
        },
        component: resolve => require(['@/views/BasicSet'], resolve),
        children:[
            {
                path: '/',
                redirect:"WaterPrice"
            },
            {//基础设置-价格管理-用水价格
                path: '/WaterPrice/WaterPrice',
                meta: {
                title: '用水价格'
                },
                component: resolve => require(['@/views/BasicSet/PriceContrl/WaterPrice/WaterPrice'], resolve),
                children:[],
            },
            {//基础设置-价格管理-费用明细
                path: '/WaterPrice/PriceInfo',
                meta: {
                title: '费用明细'
                },
                component: resolve => require(['@/views/BasicSet/PriceContrl/PriceInfo/index'], resolve),
                children:[],
            },
            {//基础设置-价格管理-用水类型
                path: '/WaterPrice/WaterType',
                meta: {
                title: '用水类型'
                },
                component: resolve => require(['@/views/BasicSet/PriceContrl/WaterType/index'], resolve),
                children:[],
            },
            {//基础设置-价格管理-优惠策略
                path: '/WaterPrice/CheapStrategy',
                meta: {
                title: '优惠策略'
                },
                component: resolve => require(['@/views/BasicSet/PriceContrl/CheapStrategy/index'], resolve),
                children:[],
            },
            {//基础设置-价格管理-违约设置
                path: '/WaterPrice/BreakSet',
                meta: {
                title: '违约设置'
                },
                component: resolve => require(['@/views/BasicSet/PriceContrl/BreakSet/index'], resolve),
                children:[],
            },
            {//基础设置-价格管理-费用组成
                path: '/WaterPrice/CostProject',
                meta: {
                title: '费用组成'
                },
                component: resolve => require(['@/views/BasicSet/PriceContrl/CostProject/index'], resolve),
                children:[],
            },
            {
                path: '/WaterPrice/GarbagePricing',
                meta: {
                  title: '垃圾费定价'
                },
                component: resolve => require(['@/views/BasicSet/PriceContrl/GarbagePricing'], resolve)
            },
            {
                path: '/WaterPrice/GarbageManagement',
                meta: {
                  title: '垃圾费管理'
                },
                component: resolve => require(['@/views/BasicSet/PriceContrl/GarbageManagement'], resolve)
            },
        ],
    },
])