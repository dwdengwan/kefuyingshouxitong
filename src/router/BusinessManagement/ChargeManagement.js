
export default ([
    {
        path: '/ChargeManagement',
        meta: {
          title: '收费管理'
        },
        component: resolve => require(['@/views/FinancialCenter'], resolve),
        children:[
            {
                path: '/',
                redirect:"TollInquiry"
            },
            {
                path: '/ChargeManagement/TollInquiry',
                meta: {
                  title: '收费查询'
                },
                component: resolve => require(['@/views/FinancialCenter/TollInquiry/TollInquiry'], resolve)
            },
            {
                path: '/ChargeManagement/BankCharges',
                meta: {
                  title: '银行代扣'
                },
                component: resolve => require(['@/views/FinancialCenter/BankCharges'], resolve)
            },
            {
                path: '/ChargeManagement/ManualCollection',
                meta: {
                  title: '手工托收'
                },
                component: resolve => require(['@/views/FinancialCenter/ManualCollection'], resolve)
            },
            {
                path: '/ChargeManagement/UnionPay',
                meta: {
                  title: '互联网对账'
                },
                component: resolve => require(['@/views/FinancialCenter/ReReceivables/UnionPay'], resolve)
            },
            {
                path: '/ChargeManagement/DailyReconciliation',
                meta: {
                  title: '日收款对账'
                },
                component: resolve => require(['@/views/FinancialCenter/ReReceivables/DailyReconciliation'], resolve)
            },
            {
                path: '/ChargeManagement/ClosingCollectionPayment',
                meta: {
                  title: '代收支付关闭'
                },
                component: resolve => require(['@/views/FinancialCenter/FinancialAdjustment/ClosingCollectionPayment'], resolve)
            },


            {
                path: '/ChargeManagement/OtherCharges',
                meta: {
                  title: '其他收费'
                },
                component: resolve => require(['@/views/FinancialCenter/FinancialAdjustment/OtherCharges'], resolve)
            },
            {
                path: '/ChargeManagement/FinancialAdjustment',
                meta: {
                  title: '财务调整'
                },
                component: resolve => require(['@/views/FinancialCenter/FinancialAdjustment'], resolve)
            },
            {
                path: '/ChargeManagement/Recover',
                meta: {
                  title: '追缴费用'
                },
                component: resolve => require(['@/views/FinancialCenter/FinancialAdjustment/Recover'], resolve)
            },
            {
                path: '/ChargeManagement/LiquidatedDamages',
                meta: {
                  title: '违约金减免'
                },
                component: resolve => require(['@/views/FinancialCenter/FinancialAdjustment/LiquidatedDamages'], resolve)
            },
            {
                path: '/ChargeManagement/DealingBadDebts',
                meta: {
                  title: '呆账处理'
                },
                component: resolve => require(['@/views/FinancialCenter/FinancialAdjustment/DealingBadDebts'], resolve)
            },
            {
                path: '/ChargeManagement/ReportingBadDebts',
                meta: {
                  title: '坏账报损'
                },
                component: resolve => require(['@/views/FinancialCenter/FinancialAdjustment/ReportingBadDebts'], resolve)
            },
            {
                path: '/ChargeManagement/RedFlushing',
                meta: {
                  title: '冲红'
                },
                component: resolve => require(['@/views/FinancialCenter/FinancialAdjustment/RedFlushing'], resolve)
              },
              {
                path: '/ChargeManagement/CancellMonthly',
                meta: {
                  title: '取消当月收费'
                },
                component: resolve => require(['@/views/FinancialCenter/FinancialAdjustment/CancellMonthly'], resolve)
            },
            {
                path: '/ChargeManagement/BalanceWithdrawal',
                meta: {
                  title: '余额取出'
                },
                component: resolve => require(['@/views/FinancialCenter/CounterCharges/BalanceWithdrawal'], resolve)
            },
            {
                path: '/ChargeManagement/BalanceTransfer',
                meta: {
                  title: '余额过户'
                },
                component: resolve => require(['@/views/FinancialCenter/CounterCharges/BalanceTransfer'], resolve)
            },
            {
                path: '/ChargeManagement/FinancialManagement',
                meta: {
                  title: '财结管理'
                },
                component: resolve => require(['@/views/FinancialCenter/FinancialManagement'], resolve)
            },
            {
                path: '/ChargeManagement/BillManagement',
                meta: {
                  title: '票据管理'
                },
                component: resolve => require(['@/views/FinancialCenter/BillManagement'], resolve)
            },
            {
                path: '/ChargeManagement/InvoiceAcquisition',
                meta: {
                  title: '发票领用'
                },
                component: resolve => require(['@/views/FinancialCenter/BillManagement/InvoiceAcquisition'], resolve)
            },
            {
                path: '/ChargeManagement/InvoiceBorrowing',
                meta: {
                  title: '发票借用'
                },
                component: resolve => require(['@/views/FinancialCenter/BillManagement/InvoiceBorrowing'], resolve)
            },
            {
                path: '/ChargeManagement/InvoiceInvalidated',
                meta: {
                  title: '发票修改'
                },
                component: resolve => require(['@/views/FinancialCenter/BillManagement/InvoiceInvalidated'], resolve)
            },
            {
                path: '/ChargeManagement/InvoicePayment',
                meta: {
                  title: '发票交票'
                },
                component: resolve => require(['@/views/FinancialCenter/BillManagement/InvoicePayment'], resolve)
            },
            {
                path: '/ChargeManagement/InvoiceSearch',
                meta: {
                  title: '发票查询'
                },
                component: resolve => require(['@/views/FinancialCenter/BillManagement/InvoiceSearch'], resolve)
              },
        ],
    },
])