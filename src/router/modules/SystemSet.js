
export default ([
    // {//系统管理
    //     path: '/SystemSet',
    //     meta: {
    //       title: '系统管理'
    //     },
    //     component: resolve => require(['@/views/SystemSet'], resolve),
    //     children:[
    //         {
    //             path: '/',
    //             redirect:"RoleManage"
    //         },
            {//系统管理-用户管理
                path: '/UserManage',
                meta: {
                title: '用户管理'
                },
                component: resolve => require(['@/views/SystemSet/UserManage/index'], resolve),
                children:[],
            },
            {//系统管理-角色管理-角色管理
                path: '/RoleManage',
                meta: {
                title: '角色管理'
                },
                component: resolve => require(['@/views/SystemSet/RoleManage/index'], resolve),
                children:[],
            },
    //     ],
    // },
])