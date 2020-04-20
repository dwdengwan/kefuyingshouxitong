
<template>
    <div class="ChargeAnalysisStatement">
        <section class="ChargeAnalysisStatementCon" v-show="ChargeAnalysisStatement">
            <div class="ChargeAnalysisStatementConTop">
                <aside class="ChargeAnalysisStatementConL">
                    <div class="choooseArea" v-if="areaShow" @click="areashowWay($event)">
                        <el-input size="mini" placeholder="营业区域" @focus="areashowWay($event)">
                            
                        </el-input>
                        <i class="el-icon-arrow-down arrowIcon"></i>
                        
                        <div class="choooseAreaCon">
                            <aside class="AreaL">
                                <h4>
                                    <el-radio v-model="AreaPro" @change="area" label="1">省份</el-radio>
                                    <el-radio v-model="AreaPro" @change="area" label="2">片区</el-radio>
                                </h4>
                                <div class="checkboxGroup">
                                    <el-checkbox :indeterminate="isIndeterminate" v-model="areaAll" @change="areaAllChange">全选</el-checkbox>
                                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </aside>
                            <aside class="AreaR">
                                <h4>公司</h4>
                                <div class="checkboxGroup">
                                    <el-checkbox :indeterminate="isCompanys" v-model="companyAll" @change="companyAllChange">全选</el-checkbox>
                                    <el-checkbox-group v-model="checkedCompanys" @change="handleCheckedCompanysChange">
                                        <el-checkbox v-for="Companys in Companys" :label="Companys" :key="Companys">{{Companys}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </aside> 
                            <i class="areaTriangle"></i>
                             <i class="companyTriangle"></i>
                        </div>
                        
                    </div>
                    <!-- <el-cascader
                        expand-trigger="hover"
                        size="mini"
                        :options="SelectionIndicatorsOptions"
                        v-model="SelectionIndicators"
                        placeholder="选择指标"
                        :show-all-levels="false"
                        @change="SelectionIndicatorsHandle"
                        >
                    </el-cascader> -->
                    <el-select v-model="SelectionIndicators" @change="SelectionIndicatorsHandle" size="mini" placeholder="选择指标">
                        <el-option
                        v-for="item in SelectionIndicatorsOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="AnalyticalApproach" @change="AnalyticalApproachHandle" size="mini" placeholder="分析方式">
                        <el-option
                        v-for="item in AnalyticalApproachOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-date-picker
                        v-model="month"
                        type="month"
                        size="mini"
                        placeholder="201908">
                    </el-date-picker>
                </aside>
                <aside class="ChargeAnalysisStatementConR">
                    <el-radio v-model="tableOrEcharts" label="1" @change="tableOrEchartsChange">表格</el-radio>
                    <el-radio v-model="tableOrEcharts" label="2" @change="tableOrEchartsChange">图表</el-radio>
                </aside>

            </div>
            <div class="ChargeAnalysisStatementConCon">
                <div id="indexEcharts"></div>
            </div>
            
        </section>
        <div class="ChargeAnalysisStatementPie" v-show="ChargeAnalysisStatement">
            <ul>
                <li v-for="(v, i) in ReportPies" :key="i" :id="v.id"></li>
            </ul>
        </div>
        <div class="ChargeAnalysisStatementTable" v-show="!ChargeAnalysisStatement">
            <h3 class="ChargeAnalysisStatementConTop">
                <span class="ChargeAnalysisStatementConL">{{tableTile}}</span>
                <aside class="ChargeAnalysisStatementConR">
                    <el-radio v-model="tableOrEcharts" label="1" @change="tableOrEchartsChange">表格</el-radio>
                    <el-radio v-model="tableOrEcharts" label="2" @change="tableOrEchartsChange">图表</el-radio>
                </aside>
            </h3>
            <div class="kl-table">
             <el-table
                v-if="tableShow"
                :max-height="maxHeight"         
                stripe
                border
                :data="histroyData.list"
           
                class="ChargeAnalysisStatement-table">

                <!-- <el-table-column 
                    type="index"  label="NO."
                    width="50" 
                    fixed="left"
                    >
                </el-table-column> -->

                <el-table-column
                    prop="code"
                    
                    min-width="100"
                    :label="tableLable">
                </el-table-column>
                
               <el-table-column
                    prop="meter"
                    min-width="80"
                    :label="echartCategoryCustomLegend[0]">

                </el-table-column>

                <el-table-column
                    prop="daytime"
                    min-width="100"
                    :label="echartCategoryCustomLegend[1]">
                </el-table-column>
                                
                <el-table-column
                    prop="meterTime"
                    min-width="150"
                    :label="ChainType+'（%）'">

                </el-table-column>

                <!-- <el-table-column
                    prop="meterTime"
                    min-width="100"
                    label="换表日期">
                </el-table-column>

                <el-table-column
                    prop="peo"
                    min-width="100"
                    label="换表员">
                </el-table-column>

                <el-table-column
                    prop="getMeter"
                    min-width="80"
                    label="换表数量">
                </el-table-column>

                <el-table-column
                    prop="fixValue"
                    min-width="80"
                    label="完成数量">
                </el-table-column>

                <el-table-column
                    prop="fixValue"
                    min-width="80"
                    label="制单日期">

                </el-table-column>

                <el-table-column
                    prop="fixValue"
                    min-width="80"
                    label="制单人">
                </el-table-column> -->
                <!-- <el-table-column class="cell" label="操作" fixed="right" width="180">
                    <template slot-scope="scope">
                        <el-button type="text" @click="backfill(scope.$index, scope.row)">回填</el-button>
                        <span  >|</span>
                        <el-button type="text" class="noclick">审批</el-button>
                        <span  >|</span>
                        <el-button type="text">打印</el-button>
                        <span  >|</span>
                        <el-button type="text" class="noclick" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column> -->

                </el-table>
                <!-- 分页 -->
                <!-- <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="1"
                        :page-sizes="[20, 100, 500, 1000]"
                        :page-size="20"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="histroyData.total">
                    </el-pagination>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"ChargeAnalysisStatement",
    props:{
        areaShow:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return{
            month:"",
            ManagementArea:"",
            ManagementAreaOptions:[
                {
                    
                }
            ],
            SelectionIndicatorsOptions:[
                {
                    value: '客户总数',
                    label: '客户总数'
                }, 
                {
                    value: '用户总数',
                    label: '用户总数'
                }, 
                {
                    value: '居民用水户数',
                    label: '居民用水户数'
                }, 
                {
                    value: '非居民用水户数',
                    label: '非居民用水户数'
                },
                {
                    value: '区域用水户数',
                    label: '区域用水户数'
                }, 
                {
                    value: '特种用水户数',
                    label: '特种用水户数'
                }, 
                {
                    value: '原水用户数',
                    label: '原水用户数'
                }, 
                {
                    value: '大客户用户数',
                    label: '大客户用户数'
                },
                {
                    value: '一般客户用户数',
                    label: '一般客户用户数'
                }, 
                {
                    value: '智能表用户数',
                    label: '智能表用户数'
                }, 
                {
                    value: '欠费客户数',
                    label: '欠费客户数'
                }, 
                {
                    value: '微信客户关注数',
                    label: '微信客户关注数'
                },
                {
                    value: '网厅客户注册数',
                    label: '网厅客户注册数'
                }, 
                

            ],
            SelectionIndicators:"客户总数",
            AnalyticalApproach:"按时间同比",
            AnalyticalApproachOptions:[
                {
                    label:"按水司同比",
                    value:"按水司同比"
                },
                {
                    label:"按水司环比",
                    value:"按水司环比"
                },
                {
                    label:"按水司年累计同比",
                    value:"按水司年累计同比"
                },
                {
                    label:"按时间同比",
                    value:"按时间同比"
                },
                {
                    label:"按时间环比",
                    value:"按时间环比"
                },
            ],
            AnalyticalApproachOptions1:[

                {
                    label:"按时间同比",
                    value:"按时间同比"
                },
                {
                    label:"按时间环比",
                    value:"按时间环比"
                },
            ],
            tableOrEcharts:"2",
            ReportPies:[
                {
                    id:'selWater'
                },
                {
                    id:'caliberMeter'
                },
                {
                    id:'customers'
                },
                // {
                //     id:'customersEngineer'
                // },
                // {
                //     id:'waterPrice'
                // },
            ],
            ChargeAnalysisStatement:true,
            tableTile:"",
            tableShow:false,
            maxHeight:0,
            histroyData:{
                
            },
            AreaPro:"1",
            areaAll: false,
            companyAll: false,
            checkedCities: ['江苏省', '广东省', '广西壮族自治区', '海南省'],
            cities: ['江苏省', '广东省', '广西壮族自治区', '海南省'],
            isIndeterminate: true,
            isCompanys:true,
            checkedCompanys:  ['宝应水司', '常平水司', '清溪水司', '丰顺水司','高邮水司','高州水司','南沙水司',
            '儋州滨海','儋州水司','梅州水务','汕头水司','遂溪水务','梧州水司','盱眙水司','仪征水司'],
            Companys: ['宝应水司', '常平水司', '清溪水司', '丰顺水司','高邮水司','高州水司','南沙水司',
            '儋州滨海','儋州水司','梅州水务','汕头水司','遂溪水务','梧州水司','盱眙水司','仪征水司'],
            choooseAreaConShow:false,
            xData: ['12月','11月','10月','9月','8月','7月','6月','5月','4月','3月','2月','1月'],
            seriesType:'line',
            tableLable: "月份",
            yData1:[120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210],
            yData2:[220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330],
            echartCategoryCustomLegend:['本期','同期'],
            ChainType:"同比",
        }
        
        
    },
    created(){
        this.tableTile = this.SelectionIndicators+'-'+this.AnalyticalApproach;
    },
    mounted(){
        this.echartCategoryCustom();
        this.selWater();
        this.caliberMeter();
        this.customers();
        // this.customersEngineer();
        // this.waterPrice();
        this.init();
         //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        if(!this.areaShow){
            this.AnalyticalApproachOptions = this.AnalyticalApproachOptions1;
            
        }
      
        this.common.changeTable(this,'.ChargeAnalysisStatement .kl-table',['.ChargeAnalysisStatement .block']);
        // this.refs.choooseAreaInput.addEventListener('click',function(event){
        // 　　 event=event||window.event;
        // this.choooseAreaConShow = true;
        // 　　event.stopPropagation();
        // })

        
       
      
    },
    methods:{
        init(){
            
            this.histroyData = {
                list: [
                    {
                        code:"1月",
                        meter:"120",
                        daytime:"220",
                        meterTime:"",
                        peo:"",
                        getMeter:"",
                        fixValue:"",
                        fixValue:"",
                        fixValue:"",
                    },
                    {
                        code:"2月",
                        meter:"132",
                        daytime:"182",
                        meterTime:"",
                        peo:"",
                        getMeter:"",
                        fixValue:"",
                        fixValue:"",
                        fixValue:"",
                    },
                    {
                        code:"3月",
                        meter:"101",
                        daytime:"191",
                        meterTime:"",
                        peo:"",
                        getMeter:"",
                        fixValue:"",
                        fixValue:"",
                        fixValue:"",
                    },
                    {
                        code:"4月",
                        meter:"134",
                        daytime:"234",
                        meterTime:"",
                        peo:"",
                        getMeter:"",
                        fixValue:"",
                        fixValue:"",
                        fixValue:"",
                    },
                    {
                        code:"5月",
                        meter:"90",
                        daytime:"290",
                        meterTime:"",
                        peo:"",
                        getMeter:"",
                        fixValue:"",
                        fixValue:"",
                        fixValue:"",
                    },
                    {
                        code:"6月",
                        meter:"230",
                        daytime:"330",
                        meterTime:"",
                        peo:"",
                        getMeter:"",
                        fixValue:"",
                        fixValue:"",
                        fixValue:"",
                    },
                    {
                        code:"7月",
                        meter:"210",
                        daytime:"310",
                        meterTime:"",
                        peo:"",
                        getMeter:"",
                        fixValue:"",
                        fixValue:"",
                        fixValue:"",
                    },
                    {
                        code:"8月",
                        meter:"101",
                        daytime:"182",
                        meterTime:"",
                        peo:"",
                        getMeter:"",
                        fixValue:"",
                        fixValue:"",
                        fixValue:"",
                    },
                    {
                        code:"9月",
                        meter:"134",
                        daytime:"191",
                        meterTime:"",
                        peo:"",
                        getMeter:"",
                        fixValue:"",
                        fixValue:"",
                        fixValue:"",
                    },
                    {
                        code:"10月",
                        meter:"90",
                        daytime:"234",
                        meterTime:"",
                        peo:"",
                        getMeter:"",
                        fixValue:"",
                        fixValue:"",
                        fixValue:"",
                    },
                    {
                        code:"11月",
                        meter:"230",
                        daytime:"290",
                        meterTime:"",
                        peo:"",
                        getMeter:"",
                        fixValue:"",
                        fixValue:"",
                        fixValue:"",
                    },
                    {
                        code:"12月",
                        meter:"210",
                        daytime:"330",
                        meterTime:"",
                        peo:"",
                        getMeter:"",
                        fixValue:"",
                        fixValue:"",
                        fixValue:"",
                    },

                ],

            };
        },
        // 折线图
        echartCategoryCustom(){
             let myChart = this.$echarts.init(document.getElementById('indexEcharts'))
                let option = {
                    title: {
                        text: this.tableTile,
                        x:"center",
                        textStyle: {
                            fontWeight: "normal",
                            fontSize: 16
                        },
                    },
                    color:['#f77a76 ', '#66b5f0'],
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:this.echartCategoryCustomLegend,
                        y:"top",
                        x:"right"
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '8%',
                        // containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        // boundaryGap: false,
                        data:this.xData,
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: {
                        type: 'value',
                        // axisLabel:{
                        //     formatter:'{value} (万吨)'
                        // }
                    },
                    series: [
                        {
                            name:this.echartCategoryCustomLegend[0],
                            type:this.seriesType,
                            stack: '',
                            data:this.yData1,
                            lineStyle: {
                                width: 3 
                            },
                             barWidth: '20%',
                            // data:[120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210],
                        },
                        {
                            name:this.echartCategoryCustomLegend[1],
                            type:this.seriesType,
                            stack: '',
                            data:this.yData2,
                            lineStyle: {
                                width: 3 
                            },
                             barWidth: '20%',
                            // data:[220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330],
                        },

                    ]
                };

                myChart.setOption(option)
                window.addEventListener('resize', function () {
                myChart.resize()
            })
        },
        // 用户数量-按用户类型
        selWater(){
            let myChart = this.$echarts.init(document.getElementById('selWater'))
            let option = {
                title: {
                    text: '用户数量-按用户类型',
                    x:'center',
                    textStyle: {
                        fontWeight: "normal",
                        fontSize: 14
                    },
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}：{c}(户) <br/>{a}：{d}%"
                },
                legend: {
                    type: 'scroll',
	        	    orient: 'vertical',
	            	show: true,
                    right: 0,
                    top: 20,
                    bottom: 20,
                    textStyle: {
                        fontSize: 12
                    },
                    data:['居民','非居民','特种','区域','原水']
                },
                color:['#f77a76 ',   '#ffca64',   '#78d8cc', '#66b5f0',  '#a1de8e',  '#98adff',   '#ffca64',   '#78d8cc'],
                series: [
                    {
                        name:'占比',
                        type:'pie',
                        radius: ['45%', '65%'],
                        // radius:'55%',
                        center:['40%','60%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '12',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                           {value:335, name:'居民'},
                            {value:310, name:'非居民'},
                            {value:234, name:'特种'},
                            {value:135, name:'区域'},
                            {value:35, name:'原水'},
           
                        ]
                    }
                ]
            };
            myChart.setOption(option)
            window.addEventListener('resize', function () {
                myChart.resize()
            })
    
        },
        // 用户数量-按客户
        caliberMeter(){
            let myChart = this.$echarts.init(document.getElementById('caliberMeter'))
            let option = {
                title: {
                    text: '用户数量-按客户',
                    x:'center',
                    textStyle: {
                        fontWeight: "normal",
                        fontSize: 14
                    },
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}：{c}(户) <br/>{a}：{d}%"
                },
                legend: {
                    type: 'scroll',
	        	    orient: 'vertical',
	            	show: true,
                    right: 0,
                    top: 20,
                    bottom: 20,
                    textStyle: {
                        fontSize: 12
                    },
                    data:['大客户','一般客户']
                },
                color:['#ffca64',   '#78d8cc','#f77a76 ', '#66b5f0',  '#a1de8e',  '#98adff',   ],
                series: [
                    {
                        name:'占比',
                        type:'pie',
                        radius: ['45%', '65%'],
                        // radius:'55%',
                        center:['40%','60%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '12',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'大客户'},
                            {value:310, name:'一般客户'},
                            // {value:234, name:'特种'},
                            // {value:135, name:'区域'},
           
                        ]
                    }
                ]
            };
            myChart.setOption(option)
            window.addEventListener('resize', function () {
                myChart.resize()
            })
    
        },
        // 智能表用户占比仪表盘
 
        customers(){
            let myChart = this.$echarts.init(document.getElementById('customers'))
            let option = {
                title: {
                    text:'智能表使用率',
                    x:"center",
                    textStyle: {
                        fontWeight: "normal",
                        fontSize: 14
                    },
                },
                grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '8%',
                        // containLabel: true
                    },
                tooltip : {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                // toolbox: {
                //     feature: {
                //         restore: {},
                //         saveAsImage: {}
                //     }
                // },
                series: [
                    {
                        name: '智能表使用率',
                        type: 'gauge',
                        center:['40%','60%'],
                        detail: {formatter:'{value}%'},
                        data: [{value: 50, name: ''}],
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                width: 10
                            }
                        },
                        splitLine: {           // 分隔线
                            length:10,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                color: 'auto'
                            }
                        },
                    }
                ]
                
            };
            myChart.setOption(option)
            window.addEventListener('resize', function () {
                myChart.resize()
            })
        },
        // 大客户、一般客户安装工程收入占比
        customersEngineer(){
            let myChart = this.$echarts.init(document.getElementById('customersEngineer'))
            let option = {
                title: {
                    text: '大客户、一般客户安装工程收入占比',
                    x:'center',
                    textStyle: {
                        fontWeight: "normal",
                        fontSize: 14
                    },
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}：{c}(万吨) <br/>{a}：{d}%"
                },
                legend: {
                    type: 'scroll',
	        	    orient: 'vertical',
	            	show: true,
                    right: 0,
                    top: 20,
                    bottom: 20,
                    textStyle: {
                        fontSize: 12
                    },

                    data:['居民','非居民','特种','区域']
                },
                color:['#f77a76 ', '#66b5f0',  '#a1de8e',  '#98adff',   '#ffca64',   '#78d8cc'],
                series: [
                    {
                        name:'占比',
                        type:'pie',
                        radius: ['50%', '70%'],
                        // radius:'55%',
                        center:['40%','60%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '12',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'居民'},
                            {value:310, name:'非居民'},
                            {value:234, name:'特种'},
                            {value:135, name:'区域'},
           
                        ]
                    }
                ]
            };
            myChart.setOption(option)
            window.addEventListener('resize', function () {
                myChart.resize()
            })
    
        },
        // 各类水费收入占比
        waterPrice(){
            let myChart = this.$echarts.init(document.getElementById('waterPrice'))
            let option = {
                title: {
                    text: '各类水费收入占比',
                    x:'center',
                    textStyle: {
                        fontWeight: "normal",
                        fontSize: 14
                    },
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}：{c}(万吨) <br/>{a}：{d}%"
                },
                legend: {
                    type: 'scroll',
	        	    orient: 'vertical',
	            	show: true,
                    right: 0,
                    top: 20,
                    bottom: 20,
                    textStyle: {
                        fontSize: 12
                    },
                    data:['居民','非居民','特种','区域']
                },
                color:['#f77a76 ', '#66b5f0',  '#a1de8e',  '#98adff',   '#ffca64',   '#78d8cc'],
                series: [
                    {
                        name:'占比',
                        type:'pie',
                        radius: ['50%', '70%'],
                        // radius:'55%',
                        center:['40%','60%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '12',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'居民'},
                            {value:310, name:'非居民'},
                            {value:234, name:'特种'},
                            {value:135, name:'区域'},
           
                        ]
                    }
                ]
            };
            myChart.setOption(option)
            window.addEventListener('resize', function () {
                myChart.resize()
            })
    
        },
        // 显示图标还是表格
        tableOrEchartsChange(val){
            if(val==="1"){
                this.ChargeAnalysisStatement = false;
                if(this.AnalyticalApproach.startsWith('按时间')){
                    this.tableLable = "月份";
                     this.histroyData = {
                        list: [
                            {
                                code:"1月",
                                meter:"120",
                                daytime:"220",
                                meterTime:"12",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"2月",
                                meter:"132",
                                daytime:"182",
                                meterTime:"23",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"3月",
                                meter:"101",
                                daytime:"191",
                                meterTime:"34",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"4月",
                                meter:"134",
                                daytime:"234",
                                meterTime:"43",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"5月",
                                meter:"90",
                                daytime:"290",
                                meterTime:"56",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"6月",
                                meter:"230",
                                daytime:"330",
                                meterTime:"65",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"7月",
                                meter:"210",
                                daytime:"310",
                                meterTime:"78",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"8月",
                                meter:"101",
                                daytime:"182",
                                meterTime:"76",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"9月",
                                meter:"134",
                                daytime:"191",
                                meterTime:"89",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"10月",
                                meter:"90",
                                daytime:"234",
                                meterTime:"54",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"11月",
                                meter:"230",
                                daytime:"290",
                                meterTime:"55",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"12月",
                                meter:"210",
                                daytime:"330",
                                meterTime:"66",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },

                        ],

                    };
                }else{
                    this.tableLable = "水司名称";
                    this.histroyData = {
                        list: [
                            {
                                code:"宝应水司",
                                meter:"120",
                                daytime:"220",
                                meterTime:"12",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"常平水司",
                                meter:"132",
                                daytime:"182",
                                meterTime:"23",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"清溪水司",
                                meter:"101",
                                daytime:"191",
                                meterTime:"34",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"丰顺水司",
                                meter:"134",
                                daytime:"234",
                                meterTime:"32",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"高邮水司",
                                meter:"90",
                                daytime:"290",
                                meterTime:"45",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"高州水司",
                                meter:"230",
                                daytime:"330",
                                meterTime:"56",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"南沙水司",
                                meter:"210",
                                daytime:"310",
                                meterTime:"54",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"儋州滨海",
                                meter:"101",
                                daytime:"182",
                                meterTime:"67",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"儋州水司",
                                meter:"134",
                                daytime:"191",
                                meterTime:"87",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"梅州水务",
                                meter:"90",
                                daytime:"234",
                                meterTime:"65",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"汕头水司",
                                meter:"230",
                                daytime:"290",
                                meterTime:"43",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"遂溪水务",
                                meter:"210",
                                daytime:"330",
                                meterTime:"63",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"梧州水司",
                                meter:"90",
                                daytime:"234",
                                meterTime:"78",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"盱眙水司",
                                meter:"230",
                                daytime:"290",
                                meterTime:"23",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },
                            {
                                code:"仪征水司",
                                meter:"210",
                                daytime:"330",
                                meterTime:"34",
                                peo:"",
                                getMeter:"",
                                fixValue:"",
                                fixValue:"",
                                fixValue:"",
                            },

                        ],

                    };
                }
            }else{
                this.ChargeAnalysisStatement = true;
            }
            
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
        SelectionIndicatorsHandle(val){
            this.tableTile = val+'-'+this.AnalyticalApproach;
            // if(val[val.length-1].endsWith('率')){
            //     this.seriesType = 'line';
            // }else{
            //     this.seriesType = 'bar';
            // }
            this.echartCategoryCustom();
        },
        AnalyticalApproachHandle(val){
            this.tableTile = this.SelectionIndicators+'-'+val;
           if(val.startsWith('按水司')){
                this.xData = ['宝应', '常平', '清溪', '丰顺','高邮','高州','南沙',
                '儋州滨海','儋州','梅州水','汕','遂溪','梧州','盱眙','仪征'];
                this.yData1=[120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210, 90, 230, 210];
                this.yData2=[220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330, 234, 290, 330];
            }else{
                this.xData=['12月','11月','10月','9月','8月','7月','6月','5月','4月','3月','2月','1月'];
                this.yData1=[120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210];
                this.yData2=[220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330];
            }
            if(val.endsWith('环比')){
                this.seriesType = 'bar';
                this.echartCategoryCustomLegend = ['本期','上期'];
                this.ChainType = "环比";
            }else{
                this.seriesType = 'line';
                this.echartCategoryCustomLegend = ['本期','同期'];
                this.ChainType = "同比";
            }
            this.echartCategoryCustom();
        },
        areaAllChange(val) {
            this.checkedCities = val ? this.cities : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.areaAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        companyAllChange(val) {
            this.checkedCompanys = val ? this.Companys : [];
            this.isCompanys = false;
        },
        handleCheckedCompanysChange(value) {
            let checkedCount = value.length;
            // this.companyAll = checkedCount === this.Companys.length;
            // this.isIndeterminate = checkedCount > 0 && checkedCount < this.Companys.length;
        },
        area(val){
            if(val==="2"){
                this.checkedCities= ['梅州片区', '常平片区', '肇庆片区', '梧州片区','儋州片区','湛江片区','清溪水司',
                '宝应水司','高邮水司','仪征水司','南沙水司','徐州供水','盱眙水司','汕头水司','盐城水务'];
                this.cities= ['梅州片区', '常平片区', '肇庆片区', '梧州片区','儋州片区','湛江片区','清溪水司',
                '宝应水司','高邮水司','仪征水司','南沙水司','徐州供水','盱眙水司','汕头水司','盐城水务'];
            }else{
                this.checkedCities= ['江苏省', '广东省', '广西壮族自治区', '海南省'];
                this.cities= ['江苏省', '广东省', '广西壮族自治区', '海南省'];
            }
        },
        areashowWay(event){
            // this.choooseAreaConShow = true;
            let area = document.getElementsByClassName('choooseAreaCon')
            let areaCon = document.getElementsByClassName('choooseAreaCon')
            event=event||window.event;
            areaCon[0].style.display = "block";
        　　event.stopPropagation();
            document.addEventListener('click',function(event){
                
            　　event=event||window.event;
                // this.choooseAreaConShow = false;
                areaCon[0].style.display = "none";
            　　event.stopPropagation();
      
            })
            area[0].addEventListener('click',function(event){
            　　event=event||window.event;
                // this.choooseAreaConShow = true;
                areaCon[0].style.display = "block";
            　　event.stopPropagation();
            })
     
            
        }

    },
    watch:{
        maxHeight(){
            this.tableShow = false
            this.$nextTick(()=>{
            this.tableShow = true
            })
        },
    },

}
</script>
<style lang="scss">
@import "../../assets/styles/scss/base/fn";
$theme-color:#297acc;
.ChargeAnalysisStatement{
    width: 100%;
    height: 100%;
    .ChargeAnalysisStatementCon,.ChargeAnalysisStatementTable{
        width: 100%;
        height: 60%;
        .ChargeAnalysisStatementConTop{
            width: calc(100% - 30px);
            height: 30px;
            zoom: 1;
            border-bottom:5px solid #eaf4ff;
            padding:10px 15px;
            z-index: 15;
            &:after{
                @include _clearBoth()
            }
            .ChargeAnalysisStatementConL{
                float: left;
                .el-date-editor{
                    width: 160px !important;
                }
                .el-select-dropdown__item{
                    height: auto !important;
                }
                .el-select,.el-cascader{
                    margin-right: 15px;
                }
                .choooseArea{
                    position: relative;
                    display: inline-block;
                    background: #fff;
                    .arrowIcon{
                        position: absolute;
                        top: 8px;
                        right: 10px;
                        font-size: 14px;
                        color: #C0C4CC;
                    }
                    .areaTriangle::before,.areaTriangle::after{
                        display: block;
                        content: '';
                        position: absolute;
                        left: 15px;
                        top: -15px;
                        width: 0;
                        height:0;
                        border: 8px solid transparent;
                        z-index: 1122;
                    }
                    
                    .areaTriangle:before{
                        border-bottom-color:rgba(0,0,0,0.5);
                    }
                    .areaTriangle:after{
                        border-bottom-color:#fff;
                    }
                     .companyTriangle::before,.companyTriangle::after{
                        display: block;
                        content: '';
                        position: absolute;
                        left: 162px;
                        top: 15px;
                        width: 0;
                        height:0;
                        border: 8px solid transparent;
                        z-index: 1122;
                    }
                    
                    .companyTriangle:before{
                        border-right-color:rgba(0,0,0,0.5);
                    }
                    .companyTriangle:after{
                        border-right-color:#fff;
                    }
                    .choooseAreaCon{
                        position:absolute;
                        background: #fff;
                        top: 38px;
                        left: 0px;
                        width: 350px;
                        display: none;
                        z-index:111;
                        zoom: 1;
                        &:after{
                            @include _clearBoth()
                        }
                        .AreaL{
                            float: left;
                            border:1px solid #E4E7ED;
                            margin-right: 15px;
                            width: 140px;
                        }
                        .AreaR{
                            float:left;
                            border:1px solid #E4E7ED;
                            width: 140px;
                        }
                        .AreaL,.AreaR{
                            padding:10px;
                            height: 350px;
                            overflow: auto;
                            h4{
                                margin-bottom: 5px;
                            }
                            .el-checkbox{
                                width: 100%;
                                margin-right: 0px;
                            }
                        }
                    }
                }
            }
            .ChargeAnalysisStatementConR{
                float: right;
                height: 30px;
                line-height: 30px;
            }
        }
        .ChargeAnalysisStatementConCon{
            width: calc(100% - 30px);
            padding: 0 15px;
            height: calc(100% - 50px);
            #indexEcharts{
                width: 100%;
                height: 100%;
            }
        }
        
    }
    .ChargeAnalysisStatementPie{
        width: 100%;
        height: 40%;
        ul{
            width: 100%;
            height:100%;
            background: #eaf4ff;
            li{
                float:left;
                width: calc(33.3% - 10px);
                height: calc(100% - 25px);
                background: #fff;
                margin: 10px 5px 5px 5px;
                padding:5px 0px;
                text-align: center;
            }
        }
    }
    .ChargeAnalysisStatementTable{
        width: 100%;
        height: 100%;
        .ChargeAnalysisStatementConTop{
            span{
                font-size: 16px;
                line-height: 30px;
            }
        }
        .kl-table{
            width: calc(100% - 20px);
            height:calc(100% - 20px);
            padding:10px;
        }
    }
}
</style>

