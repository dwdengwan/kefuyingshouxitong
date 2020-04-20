
export default ([
    {
        path: '/NotificationManagement',
        meta: {
          title: '水费账单提醒'
        },
        component: resolve => require(['@/views/BasicSet'], resolve),
        children:[
            {
                path: '/',
                redirect:"WaterBill"
            },
            {//基础设置-水精灵管理-水费账单提醒
                path: '/NotificationManagement/WaterBill',
                meta: {
                title: '水费账单提醒'
                },
                component: resolve => require(['@/views/BasicSet/NotificationManagement/WaterBill'], resolve),
                children:[],
            },
            {//基础设置-水精灵管理-欠费催缴提醒
                path: '/NotificationManagement/ArrearsCharging',
                meta: {
                title: '欠费催缴提醒'
                },
                component: resolve => require(['@/views/BasicSet/NotificationManagement/ArrearsCharging'], resolve),
                children:[],
            },
            {//基础设置-水精灵管理-缴费通知提醒
                path: '/NotificationManagement/PaymentNotice',
                meta: {
                title: '缴费通知提醒'
                },
                component: resolve => require(['@/views/BasicSet/NotificationManagement/PaymentNotice'], resolve),
                children:[],
            },
            {//基础设置-水精灵管理-其他提醒
                path: '/NotificationManagement/OtherNotice',
                meta: {
                title: '其他提醒'
                },
                component: resolve => require(['@/views/BasicSet/NotificationManagement/OtherNotice'], resolve),
                children:[],
            },
           
        ],
    },
])