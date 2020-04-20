
export default ([
    {
        path: '/CustomerManagement',
        meta: {
          title: '用户资料'
        },
        component: resolve => require(['@/views/CustomerCenter'], resolve),
        children:[
            {
                path: '/',
                redirect:"userInfo"
            },
            {
                path: '/CustomerManagement/userInfo',
                meta: {
                title: '用户资料'
                },
                component: resolve => require(['@/views/CustomerCenter/userInfo'], resolve)
            },
            {
                path: '/CustomerManagement/OpenAccount',
                meta: {
                title: '开户'
                },
                component: resolve => require(['@/views/CustomerCenter/OpenAccount'], resolve)
            },
            {
                path: '/CustomerManagement/Transfer',
                meta: {
                title: '过户'
                },
                component: resolve => require(['@/views/CustomerCenter/Transfer'], resolve)
            },
            {
                path: '/CustomerManagement/IncorporativeAccount',
                meta: {
                title: '并户'
                },
                component: resolve => require(['@/views/CustomerCenter/IncorporativeAccount'], resolve)
            },
            {
                path: '/CustomerManagement/DiscontinueUse',
                meta: {
                title: '停用'
                },
                component: resolve => require(['@/views/CustomerCenter/DiscontinueUse'], resolve)
            },
            {
                path: '/CustomerManagement/multiplexing',
                meta: {
                title: '复用'
                },
                component: resolve => require(['@/views/CustomerCenter/multiplexing'], resolve)
            },
            {
                path: '/CustomerManagement/SalesAccount',
                meta: {
                title: '销户'
                },
                component: resolve => require(['@/views/CustomerCenter/SalesAccount'], resolve)
            },
            {
                path: '/CustomerManagement/CustomerChange',
                meta: {
                title: '变更'
                },
                component: resolve => require(['@/views/CustomerCenter/changeMangement/index'], resolve)
            },
            {
                path: '/CustomerManagement/BatchManagement',
                meta: {
                title: '批量管理'
                },
                component: resolve => require(['@/views/CustomerCenter/BatchManagement/index'], resolve)
            },
        ],
    },
])