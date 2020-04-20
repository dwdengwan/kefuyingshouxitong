
export default ([
  // {
  //   path: '/ReportCenter',
  //   meta: {
  //     title: '统计报表'
  //   },
  //   component: resolve => require(['@/views/ReportCenter'], resolve),
  //   children:[
  //       {
  //           path: '/',
  //           redirect:"ReportCenter"
  //       },
        {
          path: '/saleManagement',
          meta: {
            title: '销售管理分析'
          },
          component: resolve => require(['@/views/ReportCenter/saleManagement'], resolve)
        },
        {
          path: '/BusinessManagement',
          meta: {
            title: '业务办理分析'
          },
          component: resolve => require(['@/views/ReportCenter/BusinessManagement'], resolve)
        },
        {
          path: '/CustomerManagementCenter',
          meta: {
            title: '客户管理中心'
          },
          component: resolve => require(['@/views/ReportCenter/CustomerManagement'], resolve)
        },
        {
          path: '/CallCenter',
          meta: {
            title: '呼叫中心分析'
          },
        component: resolve => require(['@/views/ReportCenter/CallCenter'], resolve)
        },
  //   ]
  // }
])