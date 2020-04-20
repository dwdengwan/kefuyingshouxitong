
export default ([
    {
        path: '/EngineeringManagement',
        meta: {
          title: '用水咨询'
        },
        component: resolve => require(['@/views/EngineeringCenter'], resolve),
        children:[
            {
                path: '/',
                redirect:"waterQuery"
            },
            {
                path: '/EngineeringManagement/waterQuery',
                meta: {
                title: '用水咨询'
                },
                component: resolve => require(['@/views/EngineeringCenter/waterQuery'], resolve)
            },
            {
                path: '/EngineeringManagement/waterMeterInstall',
                meta: {
                title: '用水安装'
                },
                component: resolve => require(['@/views/EngineeringCenter/waterMeterInstall'], resolve)
            },
            {// 内部工程-内部工程
                path: '/EngineeringManagement/insideAllProjects',
                meta: {
                title: '内部工程'
                },
                component: resolve => require(['@/views/EngineeringCenter/insideEnging/index.vue'], resolve)
            },
        ],
    },
])