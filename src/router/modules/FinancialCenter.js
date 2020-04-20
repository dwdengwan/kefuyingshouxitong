
// export default ([
//     // {
//     //     path: '/FinancialCenter',
//     //     meta: {
//     //       title: '收费管理'
//     //     },
//     //     component: resolve => require(['@/views/FinancialCenter'], resolve),
//     //     children:[
//     //         {
//     //             path: '/',
//     //             redirect:"EngineeringFees"
//     //         },
//           {
//             path: 'TollInquiry',
//             meta: {
//               title: '余额过户'
//             },
//             component: resolve => require(['@/views/FinancialCenter/TollInquiry/TollInquiry'], resolve)
//           },
//           {
//             path: 'BalanceTransfer',
//             meta: {
//               title: '余额过户'
//             },
//             component: resolve => require(['@/views/FinancialCenter/CounterCharges/BalanceTransfer'], resolve)
//           },
//           {
//             path: 'BalanceWithdrawal',
//             meta: {
//               title: '余额取出'
//             },
//             component: resolve => require(['@/views/FinancialCenter/CounterCharges/BalanceWithdrawal'], resolve)
//           },
//           {
//             path: 'EngineeringFees',
//             meta: {
//               title: '工程类收费'
//             },
//             component: resolve => require(['@/views/FinancialCenter/CounterCharges/EngineeringFees'], resolve)
//           },
//           {
//             path: 'BankCharges',
//             meta: {
//               title: '银行收费'
//             },
//             component: resolve => require(['@/views/FinancialCenter/BankCharges'], resolve)
//           },
         
//           {
//             path: 'bankCollection',
//             meta: {
//               title: '银行托收'
//             },
//             component: resolve => require(['@/views/FinancialCenter/BankCharges/bankCollection'], resolve)
//           },
//           {
//             path: 'InternetCharging',
//             meta: {
//               title: '互联网收费'
//             },
//             component: resolve => require(['@/views/FinancialCenter/InternetCharging'], resolve)
//           },
//           {
//             path: 'FinancialAdjustment',
//             meta: {
//               title: '财务调整'
//             },
//             component: resolve => require(['@/views/FinancialCenter/FinancialAdjustment'], resolve)
//           },
//           {
//             path: 'FinancialManagement',
//             meta: {
//               title: '财结管理'
//             },
//             component: resolve => require(['@/views/FinancialCenter/FinancialManagement'], resolve)
//           },
//           {
//             path: 'BillManagement',
//             meta: {
//               title: '票据管理'
//             },
//             component: resolve => require(['@/views/FinancialCenter/BillManagement'], resolve)
//           },
//           {
//             path: 'AlipayCount',
//             meta: {
//               title: '支付宝'
//             },
//             component: resolve => require(['@/views/FinancialCenter/InternetCharging/Alipay'], resolve)
//           },
//           {
//             path: 'UnionPay',
//             meta: {
//               title: '银联'
//             },
//             component: resolve => require(['@/views/FinancialCenter/ReReceivables/UnionPay'], resolve)
//           },
//           {
//             path: 'Recover',
//             meta: {
//               title: '追缴费用'
//             },
//             component: resolve => require(['@/views/FinancialCenter/FinancialAdjustment/Recover'], resolve)
//           },
//           {
//             path: 'LiquidatedDamages',
//             meta: {
//               title: '违约金减免'
//             },
//             component: resolve => require(['@/views/FinancialCenter/FinancialAdjustment/LiquidatedDamages'], resolve)
//           },
//           {
//             path: 'AccountSplitting',
//             meta: {
//               title: '分账处理'
//             },
//             component: resolve => require(['@/views/FinancialCenter/FinancialAdjustment/AccountSplitting'], resolve)
//           },
//           {
//             path: 'DealingBadDebts',
//             meta: {
//               title: '呆账处理'
//             },
//             component: resolve => require(['@/views/FinancialCenter/FinancialAdjustment/DealingBadDebts'], resolve)
//           },
//           {
//             path: 'ReportingBadDebts',
//             meta: {
//               title: '坏账报损'
//             },
//             component: resolve => require(['@/views/FinancialCenter/FinancialAdjustment/ReportingBadDebts'], resolve)
//           },
//           {
//             path: 'RedFlushing',
//             meta: {
//               title: '冲红'
//             },
//             component: resolve => require(['@/views/FinancialCenter/FinancialAdjustment/RedFlushing'], resolve)
//           },
//           {
//             path: 'CancellMonthly',
//             meta: {
//               title: '取消当月收费'
//             },
//             component: resolve => require(['@/views/FinancialCenter/FinancialAdjustment/CancellMonthly'], resolve)
//           },
//           {
//             path: 'AccountPeriod',
//             meta: {
//               title: '账期'
//             },
//             component: resolve => require(['@/views/FinancialCenter/FinancialManagement/AccountPeriod'], resolve)
//           },

//           {
//             path: 'InvoiceAcquisition',
//             meta: {
//               title: '发票领用'
//             },
//             component: resolve => require(['@/views/FinancialCenter/BillManagement/InvoiceAcquisition'], resolve)
//           },
//           {
//             path: 'InvoiceBorrowing',
//             meta: {
//               title: '发票借用'
//             },
//             component: resolve => require(['@/views/FinancialCenter/BillManagement/InvoiceBorrowing'], resolve)
//           },
//           {
//             path: 'InvoiceRestoration',
//             meta: {
//               title: '发票还原'
//             },
//             component: resolve => require(['@/views/FinancialCenter/BillManagement/InvoiceRestoration'], resolve)
//           },
//           {
//             path: 'InvoiceInvalidated',
//             meta: {
//               title: '发票修改'
//             },
//             component: resolve => require(['@/views/FinancialCenter/BillManagement/InvoiceInvalidated'], resolve)
//           },
//           {
//             path: 'InvoiceEdit',
//             meta: {
//               title: '发票修改'
//             },
//             component: resolve => require(['@/views/FinancialCenter/BillManagement/InvoiceEdit'], resolve)
//           },
//           {
//             path: 'InvoicePayment',
//             meta: {
//               title: '发票交票'
//             },
//             component: resolve => require(['@/views/FinancialCenter/BillManagement/InvoicePayment'], resolve)
//           },
//           {
//             path: 'InvoiceSearch',
//             meta: {
//               title: '发票查询'
//             },
//             component: resolve => require(['@/views/FinancialCenter/BillManagement/InvoiceSearch'], resolve)
//           },
          
//       //   ]
//       // },
//   ])