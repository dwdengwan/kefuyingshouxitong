
export default ([
  {
      path: '/CustomerNotificationCenter',
      meta: {
        title: '信息发布管理'
      },
      component: resolve => require(['@/views/ServiceCentre'], resolve),
      children:[
          {
              path: '/',
              redirect:"InformationReleaseManagement"
          },
        {
            path: '/CustomerNotificationCenter/InformationReleaseManagement',
            meta: {
              title: '信息发布管理'
            },
            component: resolve => require(['@/views/ServiceCentre/InformationDelivery/InformationReleaseManagement'], resolve)
        },
        
        {
          path: '/CustomerNotificationCenter/CommonFormManagementEdit',
          meta: {
            title: '信息发布管理-添加'
          },
          component: resolve => require(['@/views/ServiceCentre/InformationDelivery/CommonFormManagementEdit'], resolve)
        },
        {
          path: '/CustomerNotificationCenter/NotificationDetails',
          meta: {
            title: '消息查询'
          },
          component: resolve => require(['@/views/ServiceCentre/CustomerNotification/NotificationDetails'], resolve)
        },
        {
          path: '/CustomerNotificationCenter/QuestionnaireManagement',
          meta: {
            title: '问卷管理'
          },
          component: resolve => require(['@/views/ServiceCentre/SatisfactionSurvey/QuestionnaireManagement'], resolve)
        },
        {
          path: '/CustomerNotificationCenter/MessageSending',
          meta: {
            title: '短信发送'
          },
          component: resolve => require(['@/views/ServiceCentre/MessageSending'], resolve)
        },
      ],
  },
])