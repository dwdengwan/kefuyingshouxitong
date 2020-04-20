
export default ([
    {
        path: '/MeterManagement',
        meta: {
          title: '水表查询'
        },
        component: resolve => require(['@/views/WatchCenter'], resolve),
        children:[
            {
                path: '/',
                redirect:"WaterMeterInquiry"
            },
            {
              path: '/MeterManagement/WaterMeterInquiry',
              meta: {
                title: '水表查询'
              },
              component: resolve => require(['@/views/WatchCenter/WaterMeterInquiry/index'], resolve)
          },
          {
            path: '/MeterManagement/Warehousing',
            meta: {
            title: '注册'
            },
            component: resolve => require(['@/views/WatchCenter/Warehousing/index'], resolve)
          },
          {
            path: '/MeterManagement/ChangeTables',
            meta: {
            title: '换表'
            },
            component: resolve => require(['@/views/WatchCenter/ChangeTables'], resolve)
          },
          {
            path: '/MeterManagement/TableDismantling',
            meta: {
            title: '拆表'
            },
            component: resolve => require(['@/views/WatchCenter/TableDismantling'], resolve)
          },
          {
            path: '/MeterManagement/DuplicateTable',
            meta: {
            title: '复表'
            },
            component: resolve => require(['@/views/WatchCenter/DuplicateTable'], resolve)
          },
          {
            path: '/MeterManagement/ComparisonTable',
            meta: {
            title: '校表'
            },
            component: resolve => require(['@/views/WatchCenter/ComparisonTable/index'], resolve)
          },
          {
            path: '/MeterManagement/DimensionalInspection',
            meta: {
            title: '维检'
            },
            component: resolve => require(['@/views/WatchCenter/DimensionalInspection/index'], resolve)
          },
          {
            path: '/MeterManagement/wMeterEdit',
            meta: {
            title: '水表资料修改'
            },
            component: resolve => require(['@/views/WatchCenter/wMeterEdit'], resolve)
        },
        ],
    },
])