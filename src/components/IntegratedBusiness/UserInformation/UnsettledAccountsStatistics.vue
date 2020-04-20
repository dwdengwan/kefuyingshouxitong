
<template>

    <div class="UnsettledAccountsStatistics">
        <div>
            <el-form class="" :inline="true" :model="userInfoSearchEditForm" label-width="130px">
                
 
            <el-form-item label="日期：">
                <el-date-picker
                    v-model="formData.con"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item >
                <el-button size="mini"  class='searchBtn'  @click="demand" icon="el-icon-search"></el-button>

            </el-form-item>
            <br>

            <el-form-item label="状态：">
                
                <el-input v-model="userInfoEditForm.BusinessSite" placeholder="已保存" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="缴存日期：">
                <el-input v-model="userInfoEditForm.userNume" placeholder="2019-05-05" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="收费总额：">
                <el-input v-model="userInfoEditForm.isfines" placeholder="2008" disabled class="read-only"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="刷卡：" prop="isfines">
                <el-input v-model="userInfoEditForm.isfines" placeholder="200" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="转账：" prop="region">
                <el-input v-model="userInfoEditForm.isfines" placeholder="500" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="支票：" prop="desc">
                <el-input v-model="userInfoEditForm.isfines" placeholder="1000" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="现金：" prop="desc">
                <el-input v-model="userInfoEditForm.isfines" placeholder="308" disabled class="read-only"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="上日未缴：" prop="region">
                <el-input v-model="userInfoEditForm.isfines" placeholder="0" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="本日缴存：" prop="desc">
                <el-input v-model="userInfoEditForm.isfines" placeholder="2008"></el-input>
            </el-form-item>
            <el-form-item label="未缴金额：" prop="desc">
                <el-input v-model="userInfoEditForm.isfines" placeholder="0" disabled class="read-only"></el-input>
            </el-form-item>

            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:"UnsettledAccountsStatistics",
     data(){
        return{
            crumbsData :{  //面包屑
                titleList:[
                    {title:'财务中心',path:'/UnsettledAccountsStatistics'},
                    {title:'票据管理',method:()=>{window.histroy.back()}}
                ],
                
            },
            formData:{
                con:"",
                watermeterWarehouse:"",
                watermeterWarehouseOptions:[],
                waterMeterManufacturer:"",
                waterMeterManufacturerOptions:[],
                waterMeterType:"",
                waterMeterTypeOptions:[],
                waterMeterCaliber:"",
                waterMeterCaliberOptions:[],
                waterMeterStatus:"",
                waterMeterStatusOptions:[],
                subordinateDepartments:"",
                subordinateDepartmentsOptions:[]

            },
            // 日期选择器
            pickerOptions: {
                disabledDate(time) {
                return time.getTime() > Date.now() ;
                }
            },
            DateChoosevalue: [],
            tableShow:false,
            maxHeight:0,
            histroyData:{
                
            },
            UnsettledAccountsStatisticsVisible:false,  //综合查询的显示和隐藏
            UnsettledAccountsStatisticsName:'发票领用-领用',
            ruleFormData:{},
            PrintPayer:"",
            CombinedStrike:"",
            userInfoEditForm: {
                workType: [
                    {
                        name: "已保存",
                        value: "1"
                    },
                    {
                        name: "未保存",
                        value: "2"
                    },
                    
                    ],
                radio: '1',
                bankName: [
                {
                    name: "中国银行",
                    value: '1'
                }
                ],
                InvoiceInformation: [
                {
                    label: "单位名称：",
                    value: "",
                    tips: ""
                },
                {
                    label: "纳税人识别号：",
                    value: "",
                    tips: "12441400714861777E "
                },
                {
                    label: "联系地址：",
                    value: "",
                    tips: ""
                },
                {
                    label: "座机号码：",
                    value: "",
                    tips: ""
                },


                ],
                countMsgOrder: [
                {
                    label: "开户名：",
                    value: "",
                    tips: "梅州粤海水务有限公司"
                },
                {
                    label: "银行账户：",
                    value: "",
                    tips: "101801012001"
                },
                {
                    label: "托号：",
                    value: "",
                    tips: "101801012001"
                },
                {
                    label: "托收合同号：",
                    value: "",
                    tips: "101801012001"
                },

                // {
                //     label:"银行签约日期：",
                //     value:"",
                //     tips:"20180-02-13"
                // },
                ],
                countMsg: [
                {
                    label: "余额：",
                    value: "",
                    tips: ""
                },

                


                ],

                // 用户-基础信息
                ComparisonTableInfoForm: [
                // {
                //     label:"街区：",
                //     value:"",
                //     tips:""
                // },
                {
                    label: "联系人：",
                    value: "",
                    tips: ""
                },
                {
                    label: "座机号码：",
                    value: "",
                    tips: ""
                },
                {
                    label: "邮箱：",
                    value: "",
                    tips: ""
                },
                {
                    label: "手机号码：",
                    value: "",
                    tips: ""
                },


                ],
                ComparisonTableInfoForm1: [
                // {
                //     label:"街区：",
                //     value:"",
                //     tips:""
                // },
                {
                    label: "传真号码：",
                    value: "",
                    tips: ""
                },
                {
                    label: "停水联系人：",
                    value: "",
                    tips: ""
                },
                {
                    label: "停水座机号码：",
                    value: "",
                    tips: ""
                },


                ],
                Waterworks: "",
                pumpingStation: "",
                Pipeline: "",
                // 用户合同信息
                ContractInformation: [
                {
                    label: "身份证号：",
                    value: "",
                    tips: ""
                },
                {
                    label: "合同年限（月）：",
                    value: "",
                    tips: ""
                },
                {
                    label: "签订日期：",
                    value: "",
                    tips: ""
                },
                {
                    label: "供水合同号：",
                    value: "",
                    tips: ""
                },

                ],
                // 用户分类信息
                classifyPropOptions: [
                {
                    label: "行业分类：",
                    tips: "居民",
                    value: "",
                    options: [
                    {
                        name: "居民",
                        value: "1"
                    },
                    {
                        name: "学校",
                        value: "1"
                    },
                    {
                        name: "公共事业",
                        value: "1"
                    },
                    {
                        name: "福利、敬老院",
                        value: "1"
                    },
                    {
                        name: "行政事业单位",
                        value: "1"
                    },
                    {
                        name: "部队",
                        value: "1"
                    },
                    {
                        name: "医疗卫生单位",
                        value: "1"
                    },
                    {
                        name: "能源",
                        value: "1"
                    },
                    ]
                },
                {
                    label: "计量收费标志：",
                    tips: "计量收费",
                    value: "",
                    options: [
                    {
                        name: "计量收费",
                        value: "1"
                    },
                    {
                        name: "计量不收费",
                        value: "1"
                    },
                    {
                        name: "不计量收费",
                        value: "1"
                    },
                    {
                        name: "不计量不收费",
                        value: "1"
                    },
                    ]
                },
                {
                    label: "户型：",
                    tips: "单户",
                    value: "",
                    options: [
                    {
                        name: "单户",
                        value: "1"
                    },
                    {
                        name: "多户",
                        value: "1"
                    },

                    ]
                },
                ],
                TypesWaterUse: "",
                WaterPropertie: "",
                CategorieWaterUse: "",
                ClassificationUse: "",
                // 用户抄表信息
                MeterReading: [

                {
                    label: "抄表顺序号：",
                    value: "",
                    tips: "2753"
                },
                {
                    label: "新表起码：",
                    value: "",
                    tips: ""
                },
                {
                    label: "旧抄表码：",
                    value: "",
                    tips: ""
                },
                {
                    label: "邮箱：",
                    value: "",
                    tips: ""
                },
                {
                    label: "投递人：",
                    value: "",
                    tips: ""
                },
                {
                    label: "投递备注信息：",
                    value: "",
                    tips: ""
                },

                ],
                MeterReadingOnly: [
                {
                    label: "抄表日：",
                    value: "",
                    tips: "20"
                },
                {
                    label: "抄表周期：",
                    value: "",
                    tips: "每月"
                },
                {
                    label: "本期行度：",
                    value: "",
                    tips: ""
                },
                ],
                yes: "",
                no: "",
                // 用户水表信息
                WaterMeter: [
                {
                    label: "水表编号：",
                    value: "",
                    tips: "20"
                },
                {
                    label: "出厂编号：",
                    value: "",
                    tips: "每月"
                },
                {
                    label: "有效日期：",
                    value: "",
                    tips: ""
                },
                {
                    label: "装表日期：",
                    value: "",
                    tips: "2753"
                },
                {
                    label: "换表日期：",
                    value: "",
                    tips: ""
                },
                {
                    label: "拆表日期：",
                    value: "",
                    tips: ""
                },
                ],
                WaterMeterpOptions: [
                {
                    label: "表类型：",
                    tips: "机械表",
                    value: "",
                    options: [
                    {
                        name: "机械表",
                        value: "1"
                    },
                    {
                        name: "智能表",
                        value: "1"
                    },
                    ]
                },
                {
                    label: "厂家名称：",
                    tips: "宁波",
                    value: "",
                    options: [
                    {
                        name: "宁波",
                        value: "1"
                    },
                    {
                        name: "上海",
                        value: "1"
                    },
                    {
                        name: "梅花",
                        value: "1"
                    },
                    {
                        name: "常德",
                        value: "1"
                    },
                    {
                        name: "开封",
                        value: "1"
                    },
                    ]
                },
                {
                    label: "信用等级：",
                    tips: "A",
                    value: "",
                    options: [
                    {
                        name: "A",
                        value: "1"
                    },
                    {
                        name: "B",
                        value: "1"
                    },
                    {
                        name: "C",
                        value: "1"
                    },
                    {
                        name: "D",
                        value: "1"
                    },

                    ]
                },
                {
                    label: "总分表：",
                    tips: "",
                    value: "",
                    options: [
                    {
                        name: "否",
                        value: "1"
                    },
                    {
                        name: "总表",
                        value: "1"
                    },
                    {
                        name: "分表",
                        value: "1"
                    },
                    ]
                },
                {
                    label: "字母表：",
                    tips: "",
                    value: "",
                    options: [
                    {
                        name: "否",
                        value: "1"
                    },
                    {
                        name: "子表",
                        value: "1"
                    },
                    {
                        name: "母表",
                        value: "1"
                    },
                    ]
                },
                ],
                UnplannedMeterReading: "",
                caliber: "",
                caliberoptions1: [],
                caliberoptions2: [],
                caliberoptions3: [
                {
                    name: '户内',
                    value: "1"
                },
                {
                    name: '户外',
                    value: "2"
                },
                ],
                caliberoptions: [
                {
                    name: 15,
                    value: "1"
                },
                {
                    name: 20,
                    value: "2"
                },
                {
                    name: 25,
                    value: "3"
                },
                {
                    name: 40,
                    value: "4"
                },
                {
                    name: 50,
                    value: "5"
                },
                {
                    name: 80,
                    value: "6"
                },
                {
                    name: 100,
                    value: "7"
                },
                ],
                // 用户价格信息
                PriceInfo: [
                {
                    label: "水费比率（%）：",
                    value: "",
                    tips: "20"
                },
                {
                    label: "污水费比率（%）：",
                    value: "",
                    tips: "100.00"
                },
                {
                    label: "最低用水量：",
                    value: "",
                    tips: "0"
                },
                {
                    label: "人数：",
                    value: "",
                    tips: ""
                },
                {
                    label: "垃圾费比率（%）：",
                    value: "",
                    tips: "2753"
                },
                {
                    label: "垃圾费数量：",
                    value: "",
                    tips: ""
                },
                {
                    label: "每月应收垃圾费：",
                    value: "",
                    tips: ""
                },
                ],
                desc: "",
                userNume: "",
                descoptions: [
                ],
                asd: [
                {
                    name: "计量、计费",
                    value: "1"
                },
                {
                    name: "计量、不计费",
                    value: "2"
                },
                {
                    name: "不计量、计费",
                    value: "3"
                },
                {
                    name: "不计量、不计费",
                    value: "4"
                },
                ],
                areas: [
                {
                    name: "城区",
                    value: "1"
                },
                {
                    name: "农村",
                    value: "2"
                },
                ],
                BusinessSite: [
                {
                    name: "营业部",
                    value: "1"
                },
                ],
                idcardTypeList: [
                {
                    name: "居民身份证",
                    value: "1"
                },
                {
                    name: "户口本",
                    value: "2"
                },
                {
                    name: "护照",
                    value: "3"
                },
                {
                    name: "回乡证",
                    value: "4"
                },
                {
                    name: "台胞证",
                    value: "5"
                },
                ],
                TypesWwaterUse: [
                {
                    name: "实体表",
                    value: "1"
                },
                {
                    name: "虚拟表",
                    value: "2"
                },
                ],
                WaterProperties: [
                {
                    name: "一般用途",
                    value: "1"
                },
                {
                    name: "消防表",
                    value: "2"
                },
                {
                    name: "监控表",
                    value: "3"
                },
                ],
                CategoriesWaterUse: [
                {
                    name: "用户表",
                    value: "1"
                },
                {
                    name: "自用表",
                    value: "2"
                },
                ],
                ClassificationUses: [
                {
                    name: "正常表",
                    value: "1"
                },
                {
                    name: "总分总表",
                    value: "3"
                },
                {
                    name: "总分分表",
                    value: "4"
                },
                {
                    name: "公司表内部",
                    value: "5"
                },
                ],
                PriceType: [
                {
                    name: "0038__工业用水3.54",
                    value: "1"
                },
                {
                    name: "0015__特种用水3.54",
                    value: "2"
                },
                {
                    name: "0029__区域用水3.54",
                    value: "3"
                },
                {
                    name: "0030__基本水价3.54",
                    value: "4"
                },
                {
                    name: "0039__特种用水3.54",
                    value: "5"
                },
                {
                    name: "0040__生活用水3.54",
                    value: "6"
                },
                {
                    name: "0041__免费用水3.54",
                    value: "7"
                },
                ],
                userNum: "",
                PriceStrategy: "",
                isfines: "",
                UpdateCodeCopye: "",
                Remarks: "",
                year: "",
                countNum: "",
                PaymentMethod: "",
                bankName: "",
                status: "",
                region: "",
                BusinessSite: "",
                bankNameOptions: [
                {
                    name: "中国银行",
                    value: "1"
                }
                ],
                PaymentMethodOption: [
                {
                    name: "托收",
                    value: "1"
                }
                ],
                statusoptions: [
                {
                    name: "启用",
                    value: "1",

                },
                {
                    name: "停用",
                    value: "2"
                }
                ],
                VirtualTable: "",
                TypesGarbageCharges: "",
                PriceTypes: "",

            },
        }
    },
    mounted(){
        this.init();
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      
      this.$changeTable(this,'.water-meter-inquiry .kl-table',['.water-meter-inquiry .toolbar','.water-meter-inquiry .block','.water-meter-inquiry #crumbs'])
    },
    methods:{
        init(){
            
            this.histroyData = {
                areaId:"",
                endRow: 5,
                hasNextPage: false,
                hasPreviousPage: false,
                isFirstPage: true,
                isLastPage: true,
                list: [
                    {
                        areaId: null,
                        areaName: "东深小区",
                        code: "已保存",
                        concentrator: "",
                        connect: null,
                        daytime: "201907",
                        endTime: null,
                        factoryName: "东井",
                        fcode: null,
                        fix: false,
                        fixValue: "-",
                        flux: "-",
                        getMeter: 1,
                        id: null,
                        isxz: "未抄",
                        lvalue: "0.00",
                        meter: null,
                        model: null,
                        modifyBy: null,
                        modifyTime: null,
                        offset: 0,
                        page: 1,
                        pageCount: 20,
                        position: "1栋3单元",
                        protocolName: null,
                        rowNumber: 0,
                        sensorModel: null,
                        sn: null,
                        status: "未上传",
                        totalPage: 0,
                        type: 5,
                        unusual: null,
                        usn: "00",
                        waterGroup: null,
                    },

                ],
                navigateFirstPage: 1,
                navigateLastPage: 1,
                navigatePages: 8,
                navigatepageNums: Array(1),
                nextPage: 0,
                pageNum: 1,
                pageSize: 20,
                pages: 1,
                prePage: 0,
                size: 5,
                startRow: 1,
                total: 5,
            }
        },

      demand() {  //查询
        // this.tableQuery.page = 1
        // this.tableQuery.pageCount = 20
        this.init()
      },
    //   导出
      exportExcel(){
    //   	let listData = {}
    //   	this.tableQuery.pageCount = this.historyData.total ===0? 20:this.historyData.total
    //     let params ={
    //       "busicode":"MeterReadingList",
    //       "data": this.tableQuery
    //     }
    //     this.$api.fetch({
    //       apiUrl: 'interface.api',//路径
    //       method: 'post',//请求方法
    //       params:params,//参数
    //       needErrorCallback:true
    //     }).then(res =>{
    //     	if(res.code===0){
    //         listData = res.data
    //         if (!listData.list[0]) {
	//         		this.$notify({
	//               title: '警告',
	//               message:'表格没有相关数据',
	//               type: 'error'
	//             })
	//         	} else {
	//         		import('@/vendor/Export2Excel').then(excel => {
	// 			        const tHeader = ['水表编号', '抄表日期', '所属小区','厂家编号','厂家','型号', '当日读数', '修正读数', '当日水量', '数据状态',  '用户编号','集中器编号','用户地址']
	// 			        const filterVal = ['code', 'daytime', 'areaName','fcode','factoryName','model','lvalue', 'fixValue','flux', 'status', 'usn', 'concentrator', 'position']
	// 			        const list = listData.list
	// 			        const data = this.formatJson(filterVal, list)
	// 			        excel.export_json_to_excel({
	// 			          header: tHeader,
	// 			          data,
	// 			          filename: this.tableQuery.daytime + '抄表数据',
	// 			          autoWidth: '100'
	// 			        })
	// 			      })
	//         		this.tableQuery.pageCount = 20
	//         	}
    //       }
    //     })
      },
      //分页
      handleSizeChange(val) { //显示多少数据一页
        // this.tableQuery.pageCount = val
        // this.tableQuery.page = 1
        this.init()
      },
      handleCurrentChange(val) {  //显示多少页码
        // this.tableQuery.page = val
        this.init()
      },

      cellClick(row, column, cell, event) { //点击文件名
        let that = this;
        
      },
      indexMethod(index) {//获取表格序号
         //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
        return  (this.histroyData.pageSize-20)*this.histroyData.pages + (index+1) ;
    
      },
        closeDialog(){ //关闭会话
            this.UnsettledAccountsStatisticsVisible = false;
            this.backfillVisible = false;
            this.init()
        },
        //弹出框
        submit(formName){	//提交
            this.$refs.childUnsettledAccountsStatistics.submit()
            // this.UnsettledAccountsStatisticsVisible = false;
        },
        add(){
            this.UnsettledAccountsStatisticsVisible = true;
        },
        edit(){

        }
    },
    watch:{
        maxHeight(){
        this.tableShow = false
        this.$nextTick(()=>{
          this.tableShow = true
        })
      },
    }
}
</script>
<style lang="scss">
.UnsettledAccountsStatistics{
    width: 100%;
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
        margin-bottom:8px;
    }
    .el-form--inline .el-form-item:first-of-type{
        margin-right: 0px;
    }
}
</style>
