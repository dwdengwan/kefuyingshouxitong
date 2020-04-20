
export default ([
    {
        path: '/MeterReading',
        meta: {
          title: '用水价格'
        },
        component: resolve => require(['@/views/CustomerCenter'], resolve),
        children:[
            {
                path: '/',
                redirect:"MeterReadingRecord"
            },
            {// 抄表-抄表录入
                path: '/MeterReading/MeterReadingRecord',
                meta: {
                title: '抄表录入'
            },
                component: resolve => require(['@/views/MeterReadingCenter/MeterReadingRecord'], resolve)
            },
            {// 抄表-打印抄表卡
                path: '/MeterReading/PrintMeterReadingCard',
                meta: {
                title: '打印抄表卡'
            },
                component: resolve => require(['@/views/MeterReadingCenter/PrintMeterReadingCard'], resolve)
            },
            {// 抄表-抄表轨迹
                path: '/MeterReading/MeterReadingTrack',
                meta: {
                title: '抄表轨迹'
                },
                component: resolve => require(['@/views/MeterReadingCenter/MeterReadingTrack'], resolve)
            },
            {// 统计-异常用水分析
                path: '/MeterReading/AnomalyAnalysis',
                meta: {
                title: '异常用水分析'
                },
                component: resolve => require(['@/views/MeterReadingCenter/AnomalyAnalysis'], resolve)
            },
            {// 统计-水表异常
                path: '/MeterReading/AbnormalVerification',
                meta: {
                title: '水表异常'
                },
                component: resolve => require(['@/views/MeterReadingCenter/AbnormalVerification/index'], resolve)
            },
            {// 统计-费用异常
                path: '/MeterReading/AbnormalExpenses',
                meta: {
                title: '费用异常'
                },
                component: resolve => require(['@/views/MeterReadingCenter/AbnormalExpenses'], resolve)
            },
            {// 统计-水表异常
                path: '/MeterReading/QualityReading',
                meta: {
                title: '抄表质量检查'
                },
                component: resolve => require(['@/views/MeterReadingCenter/QualityReading/index'], resolve)
            },
            {// 开账-批量开账
                path: '/MeterReading/BatchOpening',
                meta: {
                title: '批量开账'
                },
                component: resolve => require(['@/views/MeterReadingCenter/BatchOpening/BatchOpening'], resolve)
            },
            {
                path: '/MeterReading/CustomerNotification',
                meta: {
                    title: '账单打印'//原客户通知
                },
                component: resolve => require(['@/views/MeterReadingCenter/CustomerNotification'], resolve)
            },
            {
                path: '/MeterReading/ArrearageCollection',
                meta: {
                    title: '欠费催缴单'//欠费催缴单
                },
                component: resolve => require(['@/views/MeterReadingCenter/ArrearageCollection'], resolve)
            },
            {// 统计-总分分析
                path: '/MeterReading/TotalScoreAnalysis',
                meta: {
                title: '总分分析'
                },
                component: resolve => require(['@/views/MeterReadingCenter/TotalScoreAnalysis'], resolve)
            },
            {// 统计-用水量分析
                path: '/MeterReading/Statistics',
                meta: {
                title: '客户用水排名表'
                },
                component: resolve => require(['@/views/MeterReadingCenter/WaterConsumptionAnalysis'], resolve)
            },
            {// 开账-册本调整
                path: '/MeterReading/BookAdjustment',
                meta: {
                title: '册本调整'
                },
                component: resolve => require(['@/views/MeterReadingCenter/BookAdjustment'], resolve)
            },
            {// 抄表-计划调整
                path: '/MeterReading/PlanAdjustment',
                meta: {
                title: '计划调整'
                },
                component: resolve => require(['@/views/MeterReadingCenter/PlanAdjustment'], resolve)
            },
            {
                path: '/MeterReading/MeterReadingCircuit',
                meta: {
                  title: '抄表路线'
                },
                component: resolve => require(['@/views/MeterReadingCenter/MeterReadingCircuit'], resolve)
            },
            {
                path: '/MeterReading/PrivilegeModification',
                meta: {
                  title: '特权修改'
                },
                component: resolve => require(['@/views/MeterReadingCenter/PrivilegeModification'], resolve)
            },
            {
                path: '/MeterReading/TableValveManagement',
                meta: {
                  title: '表阀门管理'
                },
                component: resolve => require(['@/views/MeterReadingCenter/TableValveManagement'], resolve)
            },
        ],
    },
])