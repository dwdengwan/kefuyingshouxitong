
export default ([
    {
        path: '/RegionalConfiguration',
        meta: {
          title: '区域配置'
        },
        component: resolve => require(['@/views/BasicSet'], resolve),
        children:[
            {
                path: '/',
                redirect:"BusinessArea"
            },
            {
                path: '/RegionalConfiguration/BusinessArea',
                meta: {
                title: '营业所'
                },
                component: resolve => require(['@/views/BasicSet/BasicInfo/BusinessArea/index'], resolve),
                children:[],
            },
            {//基础设置-基础信息-行政区域
                path: '/RegionalConfiguration/AdminRegion',
                meta: {
                title: '行政区域'
                },
                component: resolve => require(['@/views/BasicSet/BasicInfo/AdminRegion/index'], resolve),
                children:[],
            },
            {//基础设置-基础信息-营业区域
                path: '/RegionalConfiguration/ManagementArea',
                meta: {
                title: '营业区域'
                },
                component: resolve => require(['@/views/BasicSet/BasicInfo/ManagementArea/index'], resolve),
                children:[],
            },
        ],
    },
])