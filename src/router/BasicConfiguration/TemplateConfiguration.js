
export default ([
    {
        path: '/TemplateConfiguration',
        meta: {
          title: '模板配置'
        },
        component: resolve => require(['@/views/BasicSet'], resolve),
        children:[
            {
                path: '/',
                redirect:"MaterialTemplate"
            },
            {//基础设置-领料模板
                path: '/TemplateConfiguration/MaterialTemplate',
                meta: {
                title: '领料模板'
                },
                component: resolve => require(['@/views/BasicSet/BasicInfo/MaterialTemplate'], resolve),
                children:[],
            },
            {//基础设置-短信短语
                path: '/TemplateConfiguration/ShortMessage',
                meta: {
                title: '短信短语'
                },
                component: resolve => require(['@/views/BasicSet/BasicInfo/ShortMessage'], resolve),
                children:[],
            },
        ],
    },
])