


<template>
    <div class="WaterSideIndex2">

        <!-- 弹出表单含添加和修改 -->
    	<el-dialog :title="echartsDetailsName" :close-on-click-modal="false" :visible.sync="waterAddVisible" @close="closeDialog" >
            <WaterTablesDetails
                ref="childWaterEditor" 
                :histroyData="tableData"
                :listData="listData"
                :echartsDetailsName="echartsDetailsName"
                :tableShow="DialogTableShow"
                :unit="unit"
            ></WaterTablesDetails>

    	</el-dialog>
        <!-- 弹出配置指标-->
    	<el-dialog :title="echartsName" :close-on-click-modal="false" class="quotaSetting" :visible.sync="echartsDetailsVisible" @close="closeDialog" >
            <echartsDetails
             :echartName="echartsName"
            ></echartsDetails>
            <div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini">保 存</el-button>
             
		      <el-button type="info" size="mini" plain @click="closeDialog">返 回</el-button>

		    </div>
    	</el-dialog>
        <!-- 弹出echarts -->
    	<el-dialog :title="echartsWaterSalesName" class="echartsWaterSaless" :close-on-click-modal="false" :visible.sync="echartsWaterSalesVisible" @close="closeDialog" >
            <echartsWaterSales
             :echartName="echartsWaterSalesName"
             ref="echartsWaterSales" 
            ></echartsWaterSales>

    	</el-dialog>
        <!-- <section class="center-side-center">
            <ol class="center-side-pie">
                <li id="pie1"></li>
                <li id="pie2"></li>
                <li id="pie3"></li>
            </ol>
            <div class="center-side-centerCategory">
                <div class="alternative">
                    <el-radio-group v-model="radio">
                        <el-radio :label="3">按月</el-radio>
                        <el-radio :label="6">按年</el-radio>
                     
                    </el-radio-group>
                </div>
                <div id="CategoryCustom"></div>
            </div>
        </section>
        <section class="center-side-right">
       
        <el-table class="listTable table-top" border stripe :data="historyData" @cell-click="cellClick"
         >

          <el-table-column align="left" prop="name" min-width="150" label="指标名称"></el-table-column>

          <el-table-column prop="value" min-width="150" label="指标值"></el-table-column>

        </el-table>
        <p class="blank" style="height:30px;"></p>
        <el-table class="listTable" v-if="tableShow" :max-height="maxHeight" border stripe :data="tableData"
         >

          <el-table-column align="left" prop="name" min-width="150" label="指标名称"></el-table-column>

          <el-table-column prop="month" min-width="130" label="本月"></el-table-column>
          <el-table-column prop="lmonth" min-width="130" label="上月"></el-table-column>

          <el-table-column prop="year" min-width="130" label="本年"></el-table-column>

        </el-table>
        </section> -->
        <section class="center-side-top">
            <div class="date-picker-bg">
                <div class="date-picker">
                    <el-date-picker
                        v-model="month"
                        type="month"
                        size="mini"
                        placeholder="201908">
                    </el-date-picker>
                    <!-- <i class="el-icon-setting setIcon" @click="quotaSetting"></i> -->
                </div>
            </div>
            <div class="quota">
                <el-row :gutter="10">
                    <el-col :span="v.Wprecent" v-for="(v,i) in quotaCon" :key="i" >
                        <div class="task-num-border">
                            <!-- <div class="task-num" @click="businessDetails(v.title)"> -->
                            <div class="task-num">
                                <img :src="v.src" alt="">
                                <span>
                                    <i>{{v.title}}</i>
                                    <p>{{v.num}}
                                    
                                    </p>
                                    <p>
                                        <b>{{v.Company}}</b>
                                    </p>
                                    <p>排名：{{v.rank}}
                                    
                                    </p>
                                </span>
                            </div>
                        </div>
                    </el-col>

                </el-row>
            
            </div>
        </section>
        
        <div class="center-side-center">
            <ol class="center-side-pie">
                <li class="WaterMeter">
                    <h3><span>{{centersideTopTitle}}</span>
                        <h5>
                            <el-select v-model="selectWaterMeter" v-if="selectWaterMeterShow" @change="selectIndex(selectWaterMeter,'selectWaterMeterShow')" size="mini" placeholder="请选择">
                                <el-option
                                v-for="item in selectWaterMeterOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <i class="el-icon-edit-outline" @click="selectShow('selectWaterMeterShow','.WaterMeter .el-select-dropdown')" v-show="WaterMeterIconShow"></i>
                            <!-- <i class="el-icon-tickets" @click="echartsDetails(centersideTopTitle)">

                        </i> -->
                        </h5>
                    </h3>
                    <section>
                        <!-- <h2>4月售水量100万吨</h2> -->
                        <div id="WaterSales"></div>
                        <div id="pie1"></div>
                    </section>
                    <!-- <section class="waterPay">
                        <h2>4月缴费金额100万</h2>
                        <div id="Pay"></div>
                        <div id="pie2"></div>
                    </section> -->
                    
                </li>
                <li class="Pay">
                    <!-- <h3>收入</h3> -->
                    <h3><span>{{PayTitlt}}</span>
                    <h5>
                            <el-select v-model="Pay" v-if="PayShow" size="mini" @change="selectIndex(Pay,'PayShow')" placeholder="请选择">
                                <el-option
                                v-for="item in PayOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <i class="el-icon-edit-outline" @click="selectShow('PayShow','.Pay .el-select-dropdown')" v-show="PayIconShow"></i>

                            <!-- <i class="el-icon-tickets" @click="echartsDetails(PayTitlt)"></i> -->
                    </h5></h3>

                    <section>
                        <!-- <h2>4月缴费金额100万</h2> -->
                        <div id="Pay" v-show="payShow"></div>
                        <div id="waterRetrun" v-show="waterRetrunShow"></div>
                        <div id="RecoveryWater" v-show="RecoveryWaterShow"></div>
                        <div id="pie2" v-show="pie2Show"></div>
                        <div id="SinglePayment" v-show="SinglePayment"></div>
                    </section>
  
                </li>
                <li class="RevenueBusiness">
                    <!-- <h3>营收业务</h3> -->
                    <h3><span>{{RevenueBusinessTitlt}}</span>
                    <h5>
                            <el-select v-model="RevenueBusiness" v-if="RevenueBusinessShow" @change="selectIndex(RevenueBusiness,'RevenueBusinessShow')" size="mini" placeholder="请选择">
                                <el-option
                                v-for="item in RevenueBusinessOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <i class="el-icon-edit-outline" @click="selectShow('RevenueBusinessShow','.RevenueBusiness .el-select-dropdown')" v-show="RevenueBusinessIconShow"></i>

                            <!-- <i class="el-icon-tickets" @click="echartsDetails(RevenueBusinessTitlt)"></i> -->
                    </h5>
                    </h3>

                    <section>

                        <div id="business"></div>
                        <div id="channel" v-show="channelShow"></div>
                        <div id="Timeliness" v-show="TimelinessShow"></div>
                    </section>

                </li>
     
                <li class="callCenter">
                    <h3><span>{{callCenterTitle}}</span>
                    <h5>
                            <el-select v-model="callCenter" v-if="callCenterShow" @change="selectIndex(callCenter,'callCenterShow')" size="mini" placeholder="请选择">
                                <el-option
                                v-for="item in callCenterOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <i class="el-icon-edit-outline" @click="selectShow('callCenterShow','.callCenter .el-select-dropdown')" v-show="callCenterIconShow"></i>

                            <!-- <i class="el-icon-tickets" @click="echartsDetails(callCenterTitle)"></i> -->
                    </h5>
                    </h3>

                    <!-- <h3>呼叫中心（4月）</h3> -->
                    <section>
                        <!-- <ol>
                            <li v-for="(v,i) in callCenter" :key="i">
                                <p>
                                    <span v-for="(item,index) in v.val" :key="index">{{item}}</span>
                                </p>
                          
                            </li>
                        </ol> -->
                        <div id="category"></div>
                        <div id="pie3" v-show="pie3Show"></div>
                        <div id="TimelinessComplaints" v-show="TimelinessComplaintsShow"></div>
                    </section>

                </li>
                
            </ol>
            <!-- <div class="category" id="category">

            </div>
            <div class="center-side-centerCategory">
               
                <div id="CategoryCustom"></div>
            </div> -->
            
        </div>
        
    </div>
</template>
<script>
import WaterTablesDetails from '../CenterSideIndex/WaterTablesDetails'
import echartsDetails from "../CenterSideIndex/echartsDetails"
import echartsWaterSales from "../CenterSideIndex/echartsWaterSales"
export default {
    name:"WaterSideIndex2",
    components:{
        WaterTablesDetails,
        echartsDetails,
        echartsWaterSales
    },
    data(){
        return{
            SinglePayment:false,
            PayShow:false,
            RevenueBusinessShow:false,
            callCenterShow:false,
            selectWaterMeterShow:false,
            selectWaterMeter:"售水总量",
            selectWaterMeterOptions:[
                {
                    label:"售水总量",
                    value:"售水总量"
                },
                {
                    label:"大口径用户用水量",
                    value:"大口径用户用水量"
                },
            ],
            Pay:"售水收入",
            PayOptions:[
                {
                    label:"总收入",
                    value:"总收入"
                },
                {
                    label:"售水收入",
                    value:"售水收入"
                },
                {
                    label:"工程收入",
                    value:"工程收入"
                },
                {
                    label:"水费回收率",
                    value:"水费回收率"
                },
                {
                    label:"追缴水费金额",
                    value:"追缴水费金额"
                },
                {
                    label:"缴费金额占比",
                    value:"缴费金额占比"
                },
            ],
            echartsDetailsName:"",
            echartsName:"配置指标",
            centersideTopTitle:"售水量",
            callCenterTitle:"呼叫中心",
            RevenueBusinessTitlt:"业务办理",
            PayTitlt:"收入",
            maxHeight: 0,
            tableShow:false,
            echartsDetailsVisible:false,
            echartsWaterSalesName:"",
            echartsWaterSalesVisible:false,
            month:"",
            // tableData:[
            //     {
            //         name:"缴费总金额",
            //         month:"100万",
            //         lmonth:"100万",
            //         year:"100万"
            //     },
            //     {
            //         name:"微信缴费金额",
            //         month:"10万",
            //         lmonth:"10万",
            //         year:"10万"
            //     },
            //     {
            //         name:"支付宝缴费金额",
            //         month:"10万",
            //         lmonth:"10万",
            //         year:"10万"
            //     },
            //     {
            //         name:"银行代扣缴费金额",
            //         month:"10万",
            //         lmonth:"10万",
            //         year:"10万"
            //     },

            //     {
            //         name:"银行托收缴费金额",
            //         month:"10万",
            //         lmonth:"10万",
            //         year:"10万"
            //     },
            //     {
            //         name:"第三方软件缴费金额",
            //         month:"10万",
            //         lmonth:"10万",
            //         year:"10万"
            //     },
 
            //     {
            //         name:"预存缴费金额",
            //         month:"10万",
            //         lmonth:"10万",
            //         year:"10万"
            //     },
            //     {
            //         name:"现金缴费金额",
            //         month:"10万",
            //         lmonth:"10万",
            //         year:"10万"
            //     },
            //     {
            //         name:"非现场缴费金额",
            //         month:"10万",
            //         lmonth:"10万",
            //         year:"10万"
            //     },
            //     {
            //         name:"水费回收率",
            //         month:"80%",
            //         lmonth:"80%",
            //         year:"80%"
            //     },
            //     {
            //         name:"应收回水费",
            //         month:"10万",
            //         lmonth:"10万",
            //         year:"10万"
            //     },
            //     {
            //         name:"已收回水费",
            //         month:"10万",
            //         lmonth:"10万",
            //         year:"10万"
            //     },
            //     {
            //         name:"欠费户数",
            //         month:"10万",
            //         lmonth:"10万",
            //         year:"10万"
            //     },
            //     {
            //         name:"欠费金额",
            //         month:"10万",
            //         lmonth:"10万",
            //         year:"10万"
            //     },
            //     {
            //         name:"污拉费回收率",
            //         month:"80%",
            //         lmonth:"80%",
            //         year:"80%"
            //     },
            //      {
            //         name:"应收回污拉费",
            //         month:"10万",
            //         lmonth:"10万",
            //         year:"10万"
            //     },
            //     {
            //         name:"已收回污拉费",
            //         month:"10万",
            //         lmonth:"10万",
            //         year:"10万"
            //     },
            //     {
            //         name:"污拉欠费户数",
            //         month:"10万",
            //         lmonth:"10万",
            //         year:"10万"
            //     },
            //     {
            //         name:"污拉欠费金额",
            //         month:"10万",
            //         lmonth:"10万",
            //         year:"10万"
            //     },
            //     {
            //         name:"售水总金额",
            //         month:"10万",
            //         lmonth:"10万",
            //         year:"10万"
            //     },
            //     {
            //         name:"抄表总水量",
            //         month:"10吨",
            //         lmonth:"10吨",
            //         year:"10吨"
            //     },
            //     {
            //         name:"工程总收入",
            //         month:"10万",
            //         lmonth:"10万",
            //         year:"10万"
            //     },
            //     {
            //         name:"工程总数量",
            //         month:"10单",
            //         lmonth:"10单",
            //         year:"100单"
            //     },
            //     {
            //         name:"工程处理及时率",
            //         month:"10单",
            //         lmonth:"10单",
            //         year:"100单"
            //     },
            // ],
          
            tableData:{
                list:[
                    {
                        name:"南沙",
                        value:"100",
                        Wvalue:"50"
                    },
                    {
                        name:"梧州",
                        value:"100",
                        Wvalue:"50"
                    },
                    {
                        name:"肇庆",
                        value:"100",
                        Wvalue:"50"
                    },
                    {
                        name:"高州",
                        value:"100",
                        Wvalue:"50"
                    },
                    {
                        name:"梅州",
                        value:"100",
                        Wvalue:"50"
                    },
                    {
                        name:"清溪",
                        value:"100",
                        Wvalue:"50"
                    },
                    {
                        name:"水司1",
                        value:"100",
                        Wvalue:"50"
                    },
                    {
                        name:"水司2",
                        value:"100",
                        Wvalue:"50"
                    },
                    {
                        name:"水司3",
                        value:"100",
                        Wvalue:"50"
                    },
                    {
                        name:"水司4",
                        value:"100",
                        Wvalue:"50"
                    },
                    {
                        name:"水司5",
                        value:"100",
                        Wvalue:"50"
                    },
                    {
                        name:"水司6",
                        value:"100",
                        Wvalue:"50"
                    },
                    {
                        name:"水司7",
                        value:"100",
                        Wvalue:"50"
                    },
                    {
                        name:"水司8",
                        value:"100",
                        Wvalue:"50"
                    },
                    {
                        name:"水司9",
                        value:"100",
                        Wvalue:"50"
                    },
                    {
                        name:"水司10",
                        value:"100",
                        Wvalue:"50"
                    },
                    {
                        name:"水司11",
                        value:"100",
                        Wvalue:"50"
                    },
                    {
                        name:"水司12",
                        value:"100",
                        Wvalue:"50"
                    },
                ]
            },
            listData:{
                list:[
                    {
                        name:"南沙",
                        month:"98%",
                        year:"97%",
                        LMonth:"96%",
                        circle:"95%"
                    },
                    {
                        name:"梧州",
                        month:"98%",
                        year:"97%",
                        LMonth:"96%",
                        circle:"95%"
                    },
                    {
                        name:"肇庆",
                        month:"98%",
                        year:"97%",
                        LMonth:"96%",
                        circle:"95%"
                    },
                    {
                        name:"高州",
                        month:"98%",
                        year:"97%",
                        LMonth:"96%",
                        circle:"95%"
                    },
                    {
                        name:"梅州",
                        month:"98%",
                        year:"97%",
                        LMonth:"96%",
                        circle:"95%"
                    },
                    {
                        name:"清溪",
                        month:"98%",
                        year:"97%",
                        LMonth:"96%",
                        circle:"95%"
                    },
                    {
                        name:"水司1",
                        month:"98%",
                        year:"97%",
                        LMonth:"96%",
                        circle:"95%"
                    },
                    {
                        name:"水司2",
                        month:"98%",
                        year:"97%",
                        LMonth:"96%",
                        circle:"95%"
                    },
                    {
                        name:"水司3",
                        month:"98%",
                        year:"97%",
                        LMonth:"96%",
                        circle:"95%"
                    },
                    {
                        name:"水司4",
                        month:"98%",
                        year:"97%",
                        LMonth:"96%",
                        circle:"95%"
                    },
                    {
                        name:"水司5",
                        month:"98%",
                        year:"97%",
                        LMonth:"96%",
                        circle:"95%"
                    },
                    {
                        name:"水司6",
                        month:"98%",
                        year:"97%",
                        LMonth:"96%",
                        circle:"95%"
                    },
                    {
                        name:"水司7",
                        month:"98%",
                        year:"97%",
                        LMonth:"96%",
                        circle:"95%"
                    },
                    {
                        name:"水司8",
                        month:"98%",
                        year:"97%",
                        LMonth:"96%",
                        circle:"95%"
                    },
                    {
                        name:"水司9",
                        month:"98%",
                        year:"97%",
                        LMonth:"96%",
                        circle:"95%"
                    },
                    {
                        name:"水司10",
                        month:"98%",
                        year:"97%",
                        LMonth:"96%",
                        circle:"95%"
                    },
                    {
                        name:"水司11",
                        month:"98%",
                        year:"97%",
                        LMonth:"96%",
                        circle:"95%"
                    },
                    {
                        name:"水司12",
                        month:"98%",
                        year:"97%",
                        LMonth:"96%",
                        circle:"95%"
                    },
                ]
            },
            historyData:[
                {
                    name:"用户总数",
                    value:"100万"
                },
                {
                    name:"预存余额",
                    value:"100万"
                },
                {
                    name:"微厅关注数",
                    value:"100万"
                },
                {
                    name:"网厅注册数",
                    value:"100万"
                },
                {
                    name:"在用水表数量",
                    value:"10万支"
                },
                {
                    name:"在库水表数量",
                    value:"20万支"
                },
            ],
            radio: 3,
            companyName:["南沙水司","梧州水司","梧州水司","梧州水司","梧州水司","梧州水司","梧州水司","梧州水司","梧州水司"],
            WaterEditorName:"用户总数",
            waterAddVisible:false,
            quotaCon:[
                // {
                //     num:"130",
                //     title:"售水量",
                //     src: require('@/assets/images/售水量.png'),
                //     Company:"/万吨"
                // },
                // {
                //     num:"98%",
                //     title:"投诉及时率",
                //     src: require('@/assets/images/投诉.png')
                // },
                // {
                //     num:"99%",
                //     title:"售水服务及时率",
                //     src: require('@/assets/images/售水服务.png')
                // },
                // {
                //     num:"98%",
                //     title:"漏水率",
                //     src: require('@/assets/images/注册.png'),
                //     Company:""
                // },
                // {
                //     num:"90%",
                //     title:"水质合格率",
                //     src: require('@/assets/images/水质合格.png')
                // },
                // {
                //     num:"99%",
                //     title:"水压合格率",
                //     src: require('@/assets/images/水压合格.png')
                // },
                // {
                //     num:"100",
                //     title:"用户总数",
                //     src: require('@/assets/images/用户.png'),
                //     Company:"/万"
                // },
                
                // {
                //     num:"100",
                //     title:"网厅注册数",
                //     src: require('@/assets/images/注册.png'),
                //     Company:"/万"
                // },
                {
                    num:"本月：130万吨",
                    title:"售水量",
                    src: require('@/assets/images/售水量.png'),
                    Company:"本年：13000万吨",
                    Wprecent:4,
                    rank:1
                },

                {
                   num:"本月：80万元",
                    title:"售水收入",
                    src: require('@/assets/images/注册.png'),
                    Company:"本年：1000万元",
                    Wprecent:4,
                    rank:1
                },
                {
                    num:"本月：100万元",
                    title:"工程收入",
                    src: require('@/assets/images/售水服务.png'),
                    Company:"本年：10000万元",
                    Wprecent:4,
                    rank:1
                },
                {
                    num:"本月：99%",
                    title:"水费回收率",
                    src: require('@/assets/images/水质合格.png'),
                    Company:"本年：95%",
                    Wprecent:3,
                    rank:1
                },
                {
                    num:"本月：98%",
                    title:"报装业务处理及时率",
                    src: require('@/assets/images/水压合格.png'),
                    Company:"本年：96%",
                    Wprecent:3,
                    rank:1
                },
                {
                    num:"本月：98%",
                    title:"投诉处理及时率",
                    src: require('@/assets/images/投诉.png'),
                    Company:"本年：95%",
                    Wprecent:3,
                    rank:1
                },

                {
                    num:"100万",
                    title:"用户总数",
                    src: require('@/assets/images/用户.png'),
                    Company:"",
                    Wprecent:3,
                    rank:1
                },
            ],
            callCenter:[

                {
                    val:["咨询：100"," 政府转投诉：100","售后：100 ","业务办理：100"],
                    // con:["售后：100 ","业务办理：100"]
                },
            ],
            WaterMeterIconShow:true,
            PayIconShow:true,
            RevenueBusinessIconShow:true,
            callCenterIconShow:true,
            echartPieCustomTitle:"售水量-按用水类型",
            echartPieCustomLegend:['居民','非居民','特种','区域','原水'],
            echartPieCustomData:[
                            {value:335, name:'居民'},
                            {value:310, name:'非居民'},
                            {value:234, name:'特种'},
                            {value:135, name:'区域'},
                            {value:310, name:'原水'},
           
                        ],
            echartCategoryCustomTitlt:'售水总量 (万吨)',
            echartCategoryCustomYData1:[120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210],
            echartCategoryCustomYData2:[220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330],
            echartPieCustom1Title:'售水收入-按用水类型',
            echartPieCustom1Legend: ['居民','非居民','特种','区域','原水'],
            echartPieCustom1Data:
             [
                        {value:135, name:'原水'},
                        {value:410, name:'居民'},
                        {value:310, name:'非居民'},
                        {value:234, name:'特种'},
                        {value:135, name:'区域'},

                    ],
            echartPieCustom1Data2:[],
            echartPayTitle:'售水收入',
            echartPayLegend:['本期','同期'],
            echartPayYData1:[20, 32, 11, 14, 90, 20, 20, 11, 14, 90, 20, 23],
            echartPayYData2:[20, 32, 1, 34, 9, 30, 10, 1, 34, 9, 3, 10],
            pie2Show:true,
            waterRetrunShow:false,
            RecoveryWaterShow:false,
            payShow:true,
            channelShow:false,
            TimelinessShow:true,
            RevenueBusiness:"大客户业务办理及时率",
            RevenueBusinessOptions:[
                {
                    label:"业务办理总数",
                    value:"业务办理总数"
                },
                {
                    label:"大客户业务办理次数",
                    value:"大客户业务办理次数"
                },
                {
                    label:"业务办理及时率",
                    value:"业务办理及时率"
                },
                {
                    label:"大客户业务办理及时率",
                    value:"大客户业务办理及时率"
                },
            ],
            echartbusinessTitle:'大客户业务办理及时率（%）',
            echartbusinessLegend:['本期','同期'],
            echartbusinessYData1:[80, 232, 171, 174, 90, 100],
            echartbusinessYData2:[120, 12, 11, 114, 90, 230],
            echartchannelTitle:'大客户业务办理及时率',
            echartchannelLegend:['柜台','微厅','网厅','智慧营业厅'],
            echartchannelData:
            [
                {value:335, name:'柜台'},
                {value:310, name:'微厅'},
                {value:234, name:'网厅'},
                {value:135, name:'智慧营业厅'},
            ],
            callCenter:"呼叫中心业务总量",
            callCenterOptions:[
                {
                    label:"呼叫中心业务总量",
                    value:"呼叫中心业务总量"
                },
                {
                    label:"投诉次数",
                    value:"投诉次数"
                },
                {
                    label:"大客户投诉次数",
                    value:"大客户投诉次数"
                },
                {
                    label:"投诉处理及时率",
                    value:"投诉处理及时率"
                },
                {
                    label:"大客户投诉处理及时率",
                    value:"大客户投诉处理及时率"
                },
                
            ],
            categoryTitle:'呼叫中心业务总量(次)',
            categoryYData1:[80, 232, 171, 174, 90, 100],
            categoryYData2:[120, 12, 11, 114, 90, 230],
            echartPieCustom2Title:'呼叫中心业务数量-按类型',
            echartPieCustom2Legend:['咨询','用水申请','报修报漏','举报','服务投诉','应急','表杨','其它'],
            echartPieCustom2Data:
            [
                {value:135, name:'咨询'},
                {value:410, name:'用水申请'},
                {value:335, name:'报修报漏'},
                {value:310, name:'举报'},
                {value:234, name:'服务投诉'},
                {value:24, name:'应急'},
                {value:310, name:'表杨'},
                {value:135, name:'其它'},
            ],
            pie3Show:true,
            TimelinessComplaintsShow:false,
            DialogTableShow:false,
            unit:"",
            SinglePaymentPieTitle:"缴费单数-按缴费方式",
            SinglePaymentPieLegend:['现场缴费','支付宝','微信','代扣','托收','第三方'],
            SinglePaymentPieData:[
                        {value:135, name:'现场缴费'},
                        {value:410, name:'支付宝'},
                        {value:135, name:'微信'},
                        {value:410, name:'代扣'},
                        {value:135, name:'托收'},
                        {value:410, name:'第三方'},
                    ],
        }
        
    },
    mounted(){
        this.echartPieCustom();
        this.echartPieCustom1();
        this.echartPieCustom2();
        // this.TimelinessComplaints();
        this.echartCategoryCustom();
        this.category();
        this.echartPay();
        this.echartbusiness();
        // this.echartchannel();
        this.Timeliness();
        this.$nextTick(()=>{
             //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
              this.$changeTable(this, '.center-side .center-side-right', ['.center-side .table-top','.center-side .blank'])
        })
         
    },
    methods:{
        // 饼图--用水类型
        echartPieCustom(){
             let myChart = this.$echarts.init(document.getElementById('pie1'))
            let option = {
                title: {
                    text: this.echartPieCustomTitle,
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
                    data:this.echartPieCustomLegend
                },
                color:['#f77a76 ', '#66b5f0',  '#a1de8e',  '#98adff',   '#ffca64',   '#78d8cc'],
                series: [
                    {
                        name:'占比',
                        type:'pie',
                        radius: ['40%', '60%'],
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
                        data:this.echartPieCustomData
                    }
                ]
            };
            myChart.setOption(option)
            window.addEventListener('resize', function () {
                myChart.resize()
            })
    
        },
        // 饼图--缴费方式
        echartPieCustom1(){
             let myChart = this.$echarts.init(document.getElementById('pie2'))
            let option = {
                title: {
                    text: this.echartPieCustom1Title,

                    x:'center',
                    textStyle: {
                        fontWeight: "normal",
                        fontSize: 14
                    },
                },
                tooltip: {
                    trigger: 'item',
                    formatter:  "{b}：{c}(万元) <br/>{a}：{d}%"
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
                    data:this.echartPieCustom1Legend
                },
                color:['#f77a76 ', '#66b5f0',  '#a1de8e',  '#98adff',   '#ffca64',   '#78d8cc'],
                series: [
                    {
                        name:'占比',
                        type:'pie',
                        radius: ['40%', '60%'],
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
                        data:this.echartPieCustom1Data
                    }
                ],
                // series : [
                //    {
                //         name:'缴费占比',
                //         type:'pie',
                //         radius : [20, 80],
                //         center : ['50%', '50%'],
                //         roseType : 'radius',
                //         label: {
                //             normal: {
                //                 show: false
                //             },
                //             emphasis: {
                //                 show: true
                //             }
                //         },
                //         lableLine: {
                //             normal: {
                //                 show: false
                //             },
                //             emphasis: {
                //                 show: true
                //             }
                //         },
                //         data:[
                //             {value:335, name:'现场缴费'},
                //             {value:310, name:'支付宝'},
                //             {value:234, name:'微信'},
                //             {value:135, name:'代扣'},
                //             {value:234, name:'托收'},
                //             {value:135, name:'第三方'},
           
                //         ]
                //     },
                // ]
            };
            myChart.setOption(option)
            window.addEventListener('resize', function () {
                myChart.resize()
            })
    
        },
        // 饼图--投诉类型
        echartPieCustom2(){
             let myChart = this.$echarts.init(document.getElementById('pie3'))
            let option = {
                title: {
                    text: this.echartPieCustom2Title,

                    x:'center',
                    textStyle: {
                        fontWeight: "normal",
                        fontSize: 14
                    },
                },
                tooltip: {
                    trigger: 'item',
                    formatter:  "{b}：{c}(次) <br/>{a}：{d}%"
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
                    data:this.echartPieCustom2Legend
                },
                color:['#f77a76 ', '#66b5f0',  '#a1de8e',  '#98adff',   '#ffca64',   '#78d8cc'],
                
                series: [
                    {
                        name:'占比',
                        type:'pie',
                        radius: ['40%', '60%'],
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
                        data:this.echartPieCustom2Data
                    }
                ]
            };
            myChart.setOption(option)
            window.addEventListener('resize', function () {
                myChart.resize()
            })
    
        },
        // 售水量
        echartCategoryCustom(){
             let myChart = this.$echarts.init(document.getElementById('WaterSales'))
                let option = {
                    title: {
                        text: this.echartCategoryCustomTitlt,
                        x:"center",
                        textStyle: {
                            fontWeight: "normal",
                            fontSize: 14
                        },
                    },
                    color:['#f77a76 ', '#66b5f0'],
                    tooltip: {
                        trigger: 'axis'
                    },

                    legend: {
                        orient: 'vertical',
                        data:['本期','同期'],
                            y:"top",
                        x:"right"
                    },
                    grid: {
                        left: '13%',
                        right: '4%',
                        bottom: '12%',
                        // containLabel: true
                    },
                    
                    // toolbox: {
                    //     feature: {
                    //         saveAsImage: {}
                    //     }
                    // },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['12月','11月','10月','9月','8月','7月','6月','5月','4月','3月','2月','1月']
                    },
                    yAxis: {
                        type: 'value',
                        // axisLabel:{
                        //     formatter:'{value} (万吨)'
                        // }
                    },
                    series: [
                        {
                            name:'本期',
                            type:'line',
                            stack: '总量',
                            data:this.echartCategoryCustomYData1,
                            lineStyle: {
                                width: 3 
                            },
                        },
                        {
                            name:'同期',
                            type:'line',
                            stack: '',
                            data:this.echartCategoryCustomYData2,
                            lineStyle: {
                                width: 3 
                            },//折线的粗细
                        },
                        // {
                        //     name:'已收水费',
                        //     type:'line',
                        //     stack: '总量',
                        //     data:[150, 232, 201, 154, 190, 330, 410]
                        // },
                        // {
                        //     name:'售水总金额',
                        //     type:'line',
                        //     stack: '总量',
                        //     data:[320, 332, 301, 334, 390, 330, 320]
                        // }
                    ]
                };

             myChart.setOption(option)
            window.addEventListener('resize', function () {
                myChart.resize()
            })
        },
        // 收入
        echartPay(){
             let myChart = this.$echarts.init(document.getElementById('Pay'))
                let option = {
                    title: {
                        text:this.echartPayTitle ,
                        x:"center",
                        textStyle: {
                            fontWeight: "normal",
                            fontSize: 14
                        },
                    },
                    tooltip: {
                        trigger: 'axis'
                    },

                    legend: {
                        orient: 'vertical',
                        data:this.echartPayLegend,
                            y:"top",
                        x:"right"
                    },
                    grid: {
                        left: '13%',
                        right: '4%',
                        bottom: '12%',
                        // containLabel: true
                    },
                    color:['#f77a76 ', '#66b5f0',  '#a1de8e',  '#98adff',   '#ffca64',   '#78d8cc'],

                    // toolbox: {
                    //     feature: {
                    //         saveAsImage: {}
                    //     }
                    // },
                    xAxis: {
                        type: 'category',
                        data: ['12月','11月','10月','9月','8月','7月','6月','5月','4月','3月','2月','1月'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: {
                        // type: 'value',
                        // axisLabel:{
                        //     formatter:'{value}%'
                        // }
                    },
                    series: [
                        {
                            name:'本期',
                            type:'line',
                
                            data:this.echartPayYData1,
                            lineStyle: {
                                width: 3 
                            },
                        },
                        {
                            name:'同期',
                            type:'line',
                
                            data:this.echartPayYData2,
                            lineStyle: {
                                width: 3 
                            },
                        },
                        // {
                        //     name:'应收水费',
                        //     type:'line',
                        //     stack: '总量',
                        //     data:[220, 182, 191, 234, 290, 330, 310]
                        // },
                        // {
                        //     name:'已收水费',
                        //     type:'line',
                        //     stack: '总量',
                        //     data:[150, 232, 201, 154, 190, 330, 410]
                        // },
                        // {
                        //     name:'售水总金额',
                        //     type:'line',
                        //     stack: '总量',
                        //     data:[320, 332, 301, 334, 390, 330, 320]
                        // }
                    ]
                };

             myChart.setOption(option)
            window.addEventListener('resize', function () {
                myChart.resize()
            })
        },
        // 折线图--投诉
        category(){
             let myChart = this.$echarts.init(document.getElementById('category'));
            let option = {
                title : {
                    text: this.categoryTitle,
                    x:'center',
                    textStyle: {
                        fontWeight: "normal",
                        fontSize: 14
                    },
                },
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                color:['#f77a76 ', '#66b5f0',  '#a1de8e',  '#98adff',   '#ffca64',   '#78d8cc'],
                legend: {
                    orient: 'vertical',
                    data:['本期','同期'],
                    y:"top",
                    x:"right"
                },
                grid: {
                    left: '13%',
                    right: '4%',
                    bottom: '12%',
                    // containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        // data : ['南沙', '梧州', '高州', '梅州', '肇庆', '清溪', '水司1',
                        // '水司2', '水司3', '水司4', '水司5', '水司6', '水司7', '水司8',
                        // '水司9', '水司10', '水司11', '水司12', '水司13', '水司14', '水司15'],
                        // data: ['12月','11月','10月','9月','8月','7月','6月','5月','4月','3月','2月','1月'],
                        data: ['12月','11月','10月','9月','8月','7月'],

                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        // axisLabel:{
                        //     formatter:'{value}（次）'
                        // }
                    }
                ],
                series : [
                    {
                        name:'本期',
                        type:'line',
                        // barWidth: '20%',
                        // data:[80, 132, 101, 134, 90, 100, 70, 101, 134, 90, 130, 110],
                        data:this.categoryYData1,
                        lineStyle: {
                                width: 3 
                            },

                        // itemStyle:{
                        //     color:'#C33531'
                        // }

                        // data:[105, 52, 200, 334, 390, 330, 220,
                        // 100, 82, 200, 334, 390, 330, 220,
                        // 100, 82, 200, 334, 390, 330, 220]
                    },
                    {
                        name:'同期',
                        type:'line',
                        // barWidth: '20%',
                        data:this.categoryYData2,
                        lineStyle: {
                                width: 3 
                            },
                      
                    },
                    // {
                    //     name:'一般客户本期',
                    //     type:'line',
                    //     // barWidth: '20%',
                    //     data:[120, 132,211, 234, 90, 151],
                    //     lineStyle: {
                    //             width: 3 
                    //         },
                       
                    // },
                    // {
                    //     name:'一般客户同期',
                    //     type:'line',
                    //     // barWidth: '20%',
                    //     data:[170, 102,111, 134, 190, 111],
                    //     lineStyle: {
                    //             width: 3
                    //         },
                       
                    // },

                ]
            };
            myChart.setOption(option)
            window.addEventListener('resize', function () {
                myChart.resize()
            })


        },
        // 折线图--报装业务处理及时率
        echartbusiness(){
             let myChart = this.$echarts.init(document.getElementById('business'));
            let option = {
                title : {
                    text: this.echartbusinessTitle,
                    x:'center',
                    textStyle: {
                        fontWeight: "normal",
                        fontSize: 14
                    },
                },
                color:['#f77a76 ', '#66b5f0',  '#a1de8e',  '#98adff',   '#ffca64',   '#78d8cc'],
              
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },

                legend: {
                    orient: 'vertical',
                    data:this.echartbusinessLegend,
                    y:"top",
                    x:"right"
                },
                grid: {
                    left: '13%',
                    right: '4%',
                    bottom: '12%',
                    // containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        // data : ['南沙', '梧州', '高州', '梅州', '肇庆', '清溪', '水司1',
                        // '水司2', '水司3', '水司4', '水司5', '水司6', '水司7', '水司8',
                        // '水司9', '水司10', '水司11', '水司12', '水司13', '水司14', '水司15'],
                        // data: ['12月','11月','10月','9月','8月','7月','6月','5月','4月','3月','2月','1月'],
                        data: ['12月','11月','10月','9月','8月','7月'],

                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        // axisLabel:{
                        //     formatter:'{value}（次）'
                        // }
                        
                    }
                ],
                series : [
                    {
                        name:'本期',
                        type:'line',
                        data:this.echartbusinessYData1,
                        lineStyle: {
                                width: 3 
                            },
                    },
                    {
                        name:'同期',
                        type:'line',
                        // barWidth: '20%',
                        data:this.echartbusinessYData2,
                        lineStyle: {
                                width: 3 
                            },
                   
                    },

                ]
            };
            myChart.setOption(option)
            window.addEventListener('resize', function () {
                myChart.resize()
            })


        },
        // echartbusiness(){
        //      let myChart = this.$echarts.init(document.getElementById('business'))
        //     let option = {
        //         title: {
        //             text: '业务占比',
        //             x:'center',
        //             textStyle: {
        //                 fontWeight: "normal",
        //                 fontSize: 14
        //             },
        //         },
        //         tooltip: {
        //             trigger: 'item',
        //             formatter: "{a} <br/>{b}: {c} ({d}%)"
        //         },
        //         legend: {
        //             orient: 'horizontal',
        //             y: 'bottom',
        //             data:['用水报装','资料变更','水表管理','客户服务']
        //         },
        //         series: [
        //             {
        //                 name:'占比',
        //                 type:'pie',
        //                 // radius: ['50%', '70%'],
        //                 radius:'55%',
        //                 avoidLabelOverlap: false,
        //                 label: {
        //                     normal: {
        //                         show: false,
        //                         position: 'center'
        //                     },
        //                     emphasis: {
        //                         show: true,
        //                         textStyle: {
        //                             fontSize: '12',
        //                             fontWeight: 'bold'
        //                         }
        //                     }
        //                 },
        //                 labelLine: {
        //                     normal: {
        //                         show: false
        //                     }
        //                 },
        //                 data:[
        //                     {value:335, name:'用水报装'},
        //                     {value:310, name:'资料变更'},
        //                     {value:234, name:'水表管理'},
        //                     {value:135, name:'客户服务'},
           
        //                 ]
        //             }
        //         ]
        //     };
        //     myChart.setOption(option)
        //     window.addEventListener('resize', function () {
        //         myChart.resize()
        //     })
    
        // },
        // 饼图--业务办理渠道
        echartchannel(){
             let myChart = this.$echarts.init(document.getElementById('channel'))
            let option = {
                title: {
                    text: this.echartchannelTitle,

                    x:'center',
                    textStyle: {
                        fontWeight: "normal",
                        fontSize: 14
                    },
                },
                tooltip: {
                    trigger: 'item',
                    formatter:  "{b}：{c}(次) <br/>{a}：{d}%"
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
                    data:this.echartchannelLegend
                },
                color:['#f77a76 ', '#66b5f0',  '#a1de8e',  '#98adff',   '#ffca64',   '#78d8cc'],

                series: [
                    {
                        name:'占比',
                        type:'pie',
                        radius: ['40%', '60%'],
                        center:['40%','60%'],
                        // radius:'55%',
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
                        data:this.echartchannelData
                    }
                ]
            };
            myChart.setOption(option)
            window.addEventListener('resize', function () {
                myChart.resize()
            })
    
        },
        // 缴费单数
        SinglePaymentPie(){
             let myChart = this.$echarts.init(document.getElementById('SinglePayment'))
            let option = {
                title: {
                    text: this.SinglePaymentPieTitle,

                    x:'center',
                    textStyle: {
                        fontWeight: "normal",
                        fontSize: 14
                    },
                },
                tooltip: {
                    trigger: 'item',
                    formatter:  "{b}：{c}(次) <br/>{a}：{d}%"
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
                    data:this.SinglePaymentPieLegend
                },
                color:['#f77a76 ', '#66b5f0',  '#a1de8e',  '#98adff',   '#ffca64',   '#78d8cc'],

                series: [
                    {
                        name:'占比',
                        type:'pie',
                        radius: ['45%', '65%'],
                        center:['40%','60%'],
                        // radius:'55%',
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
                        data:this.SinglePaymentPieData
                    }
                ]
            };
            myChart.setOption(option)
            window.addEventListener('resize', function () {
                myChart.resize()
            })
    
        },
        // 水费回收率仪表盘
        waterRetrun(){
            let myChart = this.$echarts.init(document.getElementById('waterRetrun'))
            let option = {
                title: {
                    text:this.echartPayTitle ,
                    x:"center",
                    textStyle: {
                        fontWeight: "normal",
                        fontSize: 14
                    },
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
                        name: '水费回率',
                        type: 'gauge',
                        detail: {
                            formatter:'{value}%',
                            fontSize:16,
                        },
                        data: [{value: 50, name: ''}],
                        center:['40%','60%'],
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
        // 追缴水费金额折线图
        RecoveryWater(){
             let myChart = this.$echarts.init(document.getElementById('RecoveryWater'))
                let option = {
                    title: {
                        text:this.echartPieCustom1Title ,
                        x:"center",
                        textStyle: {
                            fontWeight: "normal",
                            fontSize: 14
                        },
                    },
                    tooltip: {
                        trigger: 'axis'
                    },

                    legend: {
                        orient: 'vertical',
                        data:this.echartPieCustom1Legend,
                        y:"top",
                        x:"right"
                    },
                    grid: {
                        left: '13%',
                        right: '4%',
                        bottom: '12%',
                        // containLabel: true
                    },
                    color:['#f77a76 ', '#66b5f0',  '#a1de8e',  '#98adff',   '#ffca64',   '#78d8cc'],

                    // toolbox: {
                    //     feature: {
                    //         saveAsImage: {}
                    //     }
                    // },
                    xAxis: {
                        type: 'category',
                        data: ['12月','11月','10月','9月','8月','7月','6月','5月','4月','3月','2月','1月'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: {
                        // type: 'value',
                        // axisLabel:{
                        //     formatter:'{value}%'
                        // }
                    },
                    series: [
                        {
                            name:'本期',
                            type:'line',
                
                            data:this.echartPieCustom1Data,
                            lineStyle: {
                                width: 3 
                            },
                        },
                        {
                            name:'同期',
                            type:'line',
                
                            data:this.echartPieCustom1Data2,
                            lineStyle: {
                                width: 3 
                            },
                        },

                    ]
                };

             myChart.setOption(option)
            window.addEventListener('resize', function () {
                myChart.resize()
            })
        },
        // 业务办理及时率仪表盘
        Timeliness(){
            let myChart = this.$echarts.init(document.getElementById('Timeliness'))
            let option = {
                title: {
                    text:this.echartchannelTitle ,
                    x:"center",
                    textStyle: {
                        fontWeight: "normal",
                        fontSize: 14
                    },
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
                        name: this.echartchannelTitle,
                        type: 'gauge',
                        detail: {
                            formatter:'{value}%',
                            fontSize:16,
                        },
                        data: [{value: 50, name: ''}],
                        center:['40%','60%'],
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
        // 投诉处理及时率仪表盘
        TimelinessComplaints(){
            let myChart = this.$echarts.init(document.getElementById('TimelinessComplaints'))
            let option = {
                title: {
                    text:this.echartPieCustom2Title ,
                    x:"center",
                    textStyle: {
                        fontWeight: "normal",
                        fontSize: 14
                    },
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
                        name: this.echartPieCustom2Title,
                        type: 'gauge',
                        detail: {
                            formatter:'{value}%',
                            fontSize:16,
                        },
                        data: [{value: 50, name: ''}],
                        center:['40%','60%'],
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
        businessDetails(val) { 

            switch(val){
                case '售水量':
                    this.listData={
                        list:[
                            {
                                name:"南沙",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"梧州",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"肇庆",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"高州",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"梅州",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"清溪",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司1",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司2",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司3",
                                month:"100",
                                year:"100",
                                LMonth:"92",
                                circle:"10000"
                            },
                            {
                                name:"水司4",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司5",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司6",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司7",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司8",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司9",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司10",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司11",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司12",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                        ]
                    }
                    this.unit = '万吨';
                    this.DialogTableShow = false;
                break;
                case '用户总数':
                    
                    this.DialogTableShow = true;
                break;
                case '售水收入':
                    this.unit = '万元';
                    this.DialogTableShow = false;
                    this.listData={
                        list:[
                            {
                                name:"南沙",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"梧州",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"肇庆",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"高州",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"梅州",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"清溪",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司1",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司2",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司3",
                                month:"100",
                                year:"100",
                                LMonth:"92",
                                circle:"10000"
                            },
                            {
                                name:"水司4",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司5",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司6",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司7",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司8",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司9",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司10",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司11",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司12",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                        ]
                    }
                break;
                case '工程收入':
                    this.unit = '万元';
                    this.DialogTableShow = false;
                    this.listData={
                        list:[
                            {
                                name:"南沙",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"梧州",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"肇庆",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"高州",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"梅州",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"清溪",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司1",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司2",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司3",
                                month:"100",
                                year:"100",
                                LMonth:"92",
                                circle:"10000"
                            },
                            {
                                name:"水司4",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司5",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司6",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司7",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司8",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司9",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司10",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司11",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                            {
                                name:"水司12",
                                month:"100",
                                year:"100",
                                LMonth:"96",
                                circle:"10000"
                            },
                        ]
                    }
                break;
                default:
                    this.listData={
                        list:[
                            {
                                name:"南沙",
                                month:"98",
                                year:"97",
                                LMonth:"96",
                                circle:"95"
                            },
                            {
                                name:"梧州",
                                month:"98",
                                year:"97",
                                LMonth:"96",
                                circle:"95"
                            },
                            {
                                name:"肇庆",
                                month:"98",
                                year:"97",
                                LMonth:"96",
                                circle:"95"
                            },
                            {
                                name:"高州",
                                month:"96",
                                year:"97",
                                LMonth:"96",
                                circle:"95"
                            },
                            {
                                name:"梅州",
                                month:"98",
                                year:"97",
                                LMonth:"96",
                                circle:"95"
                            },
                            {
                                name:"清溪",
                                month:"91",
                                year:"97",
                                LMonth:"96",
                                circle:"95"
                            },
                            {
                                name:"水司1",
                                month:"98",
                                year:"97",
                                LMonth:"96",
                                circle:"95"
                            },
                            {
                                name:"水司2",
                                month:"98",
                                year:"97",
                                LMonth:"96",
                                circle:"95"
                            },
                            {
                                name:"水司3",
                                month:"98",
                                year:"97",
                                LMonth:"96",
                                circle:"95"
                            },
                            {
                                name:"水司4",
                                month:"98",
                                year:"97",
                                LMonth:"96",
                                circle:"95"
                            },
                            {
                                name:"水司5",
                                month:"98",
                                year:"97",
                                LMonth:"96",
                                circle:"95"
                            },
                            {
                                name:"水司6",
                                month:"98",
                                year:"97",
                                LMonth:"96",
                                circle:"95"
                            },
                            {
                                name:"水司7",
                                month:"98",
                                year:"97",
                                LMonth:"96",
                                circle:"95"
                            },
                            {
                                name:"水司8",
                                month:"98",
                                year:"97",
                                LMonth:"96",
                                circle:"95"
                            },
                            {
                                name:"水司9",
                                month:"98",
                                year:"97",
                                LMonth:"96",
                                circle:"95"
                            },
                            {
                                name:"水司10",
                                month:"98",
                                year:"97",
                                LMonth:"96",
                                circle:"95"
                            },
                            {
                                name:"水司11",
                                month:"98",
                                year:"97",
                                LMonth:"96",
                                circle:"95"
                            },
                            {
                                name:"水司12",
                                month:"98",
                                year:"97",
                                LMonth:"96",
                                circle:"95"
                            },
                        ]
                    }
                    this.DialogTableShow = false;
                    this.unit = '%';
            }
            this.waterAddVisible = true;
            this.echartsDetailsName = val;

           
        },
        closeDialog(){ //关闭会话
            this.waterAddVisible = false;
            this.echartsDetailsVisible = false;
            this.echartsWaterSalesVisible = false;
        },
        echartsDetails(val){
            this.echartsWaterSalesVisible = true;
            this.echartsWaterSalesName = val;
            this.$nextTick(()=>{
                 this.$refs.echartsWaterSales.echartsChange();
            })
           
        },
        quotaSetting(){
            this.echartsDetailsVisible = true;
        },
        selectShow(val,name){
            this[val] = true;
            this.$nextTick(()=>{
                 $(name).eq(0).css('display','block')
            })
        },
        // 选择指标
        selectIndex(val,valShow){
            switch(val){
                case "大口径用户用水量":
                    this.echartPieCustomTitle = "售水量-按水表口径";
                    this.echartPieCustomLegend = ['大口径','小口径'];
                    this.echartPieCustomData = [
                                {value:335, name:'大口径'},
                                {value:310, name:'小口径'},
                            ];
                    this.echartCategoryCustomTitlt = '大口径用户用水量(万吨)';
                    this.echartCategoryCustomYData1 = [120,  130, 210,132, 101, 134, 90, 101, 134, 90, 230, 210];
                    this.echartCategoryCustomYData2 = [220, 122,310, 182, 191, 234, 191, 234, 290, 330,  290, 330];
                    this.echartPieCustom();
                    this.echartCategoryCustom();
                break;
                case "售水总量":
                    this.echartPieCustomTitle = "售水量-按用水类型";
                    this.echartPieCustomLegend = ['居民','非居民','特种','区域','原水'];
                    this.echartPieCustomData = [
                            {value:335, name:'居民'},
                            {value:310, name:'非居民'},
                            {value:234, name:'特种'},
                            {value:135, name:'区域'},
                            {value:310, name:'原水'},
           
                        ];
                    this.echartCategoryCustomTitlt = '售水量 (万吨)';
                    this.echartCategoryCustomYData1 = [120, 122, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210];
                    this.echartCategoryCustomYData2 = [220, 132, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330];
                    this.echartPieCustom();
                    this.echartCategoryCustom();
                break;
                case "总收入":
                    this.echartPieCustom1Title='总收入-按收入类型';
                    this.echartPieCustom1Legend=['售水','工程'];
                    this.echartPieCustom1Data=
                    [
                        {value:335, name:'售水'},
                        {value:310, name:'工程'},

                    ];
                    this.echartPayTitle='总收入(万元)';
                    this.echartPayLegend=['本期','同期'];
                    this.echartPayYData1=[20, 32, 34, 14, 90, 20, 20, 11, 14, 90, 20, 23];
                    this.echartPayYData2=[20, 32,77, 34, 9, 30, 10, 1, 34, 9, 3, 10];
                    this.pie2Show=true;
                    this.waterRetrunShow=false;
                    this.RecoveryWaterShow=false;
                    this.SinglePayment=false;
                    this.payShow=true;
                    this.echartPieCustom1();
                    this.echartPay();
                break;
                case "售水收入":
                    this.echartPieCustom1Title='售水收入-按用水类型';
                    this.echartPieCustom1Legend= ['居民','非居民','特种','区域','原水'];
                    this.echartPieCustom1Data=
                    [
                        {value:135, name:'原水'},
                        {value:410, name:'居民'},
                        {value:310, name:'非居民'},
                        {value:234, name:'特种'},
                        {value:135, name:'区域'},

                    ];
                    this.echartPayTitle='售水收入(万元)';
                    this.echartPayLegend=['本期','同期'];
                    this.echartPayYData1=[20, 32,34, 14, 90, 20, 20, 11, 14, 90, 20, 23];
                    this.echartPayYData2=[20, 32, 45, 34, 9, 30, 10, 1, 34, 9, 3, 10];
                    this.pie2Show=true;
                    this.waterRetrunShow=false;
                    this.RecoveryWaterShow=false;
                    this.SinglePayment=false;
                    this.payShow=true;
                    this.echartPieCustom1();
                    this.echartPay();
                break;
                case "工程收入":
                    this.echartPieCustom1Title='工程收入-按用户类型';
                    this.echartPieCustom1Legend= ['大客户','一般客户'];
                    this.echartPieCustom1Data=
                    [
                        {value:135, name:'大客户'},
                        {value:410, name:'一般客户'},

                    ];
                    this.echartPayTitle='工程收入(万元)';
                    this.echartPayLegend=['本期','同期'];
                    this.echartPayYData1=[20, 32, 17, 14, 90, 20, 20, 11, 14, 90, 20, 23];
                    this.echartPayYData2=[20, 32, 15, 34, 9, 30, 10, 1, 34, 9, 3, 10];
                    this.pie2Show=true;
                    this.waterRetrunShow=false;
                    this.RecoveryWaterShow=false;
                    this.SinglePayment=false;
                    this.payShow=true;
                    this.echartPieCustom1();
                    this.echartPay();
                break;
                case "水费回收率":
                    this.echartPieCustom1Title='水费回率';
                    
                    this.echartPayTitle='水费回收率(%)';
                    this.echartPayLegend=['本期','同期'];
                    this.echartPayYData1=[20, 32, 13, 14, 90, 20, 20, 11, 14, 90, 20, 23];
                    this.echartPayYData2=[20, 32, 12, 34, 9, 30, 10, 1, 34, 9, 3, 10];
                    this.pie2Show=false;
                    this.RecoveryWaterShow=false;
                    this.SinglePayment=false;
                    this.waterRetrunShow=true;
                    
                    this.payShow=true;
                    this.$nextTick(()=>{
                        this.echartPay();
                        this.waterRetrun();
                    })
                    
                break;
                case "追缴水费金额":
                    this.echartPieCustom1Title='追缴水量（万吨）';
                    this.echartPieCustom1Legend= ['本期','同期'];
                    this.echartPieCustom1Data=[20, 32, 11, 14, 90, 20, 20, 11, 14, 90, 20, 23];
                    this.echartPieCustom1Data2=[20,  90, 20, 20, 32, 11, 14,11, 14, 90, 20, 23];
                    this.echartPayTitle='追缴水费金额(万元)';
                    this.echartPayLegend=['本期','同期'];
                    this.echartPayYData1=[20, 32, 11, 14, 30, 20, 20, 11, 14, 90, 20, 23];
                    this.echartPayYData2=[20, 32, 1, 34, 78, 30, 10, 1, 34, 9, 3, 10];
                    this.pie2Show=false;
                    this.waterRetrunShow=false;
                    this.SinglePayment=false;
                    this.RecoveryWaterShow=true;
                    this.payShow=true;
                    this.$nextTick(()=>{
                        this.RecoveryWater();
                        this.echartPay();
                    })
                    
                break;
                case "缴费金额占比":
                    this.echartPieCustom1Title='缴费金额-按缴费方式';
                    this.echartPieCustom1Legend= ['现场缴费','支付宝','微信','代扣','托收','第三方'];
                    this.echartPieCustom1Data=
                    [
                        {value:135, name:'现场缴费'},
                        {value:410, name:'支付宝'},
                        {value:135, name:'微信'},
                        {value:410, name:'代扣'},
                        {value:135, name:'托收'},
                        {value:410, name:'第三方'},
                    ];
                    this.pie2Show=true;
                    this.waterRetrunShow=false;
                    this.RecoveryWaterShow=false;
                    this.payShow=false;
                    this.SinglePayment=true;
                    // setTimeout(function(){
                    //     this.echartPieCustom1();
                    // },0)
                    this.$nextTick(()=>{
                        this.echartPieCustom1();
                        this.SinglePaymentPie();
                    })
                    
                break;
                case "业务办理总数":
                    this.echartchannelTitle='业务办理次数-按渠道';
                    this.echartchannelLegend= ['柜台','微厅','网厅','智慧营业厅'];
                    this.echartchannelData=
                    [
                        {value:135, name:'柜台'},
                        {value:410, name:'微厅'},
                        {value:135, name:'网厅'},
                        {value:410, name:'智慧营业厅'},
                    ];
                    this.echartbusinessTitle='业务办理总数(次)';
                    this.echartbusinessLegend=['本期','同期'];
                    this.echartbusinessYData1=[80, 232, 161, 174, 90, 100],
                    this.echartbusinessYData2=[120, 12, 15, 114, 90, 230],
                    this.channelShow=true;
                    this.TimelinessShow=false;
                    this.$nextTick(()=>{
                        this.echartchannel();
                        this.echartbusiness();
                    })
                    
                break;
                case "大客户业务办理次数":
                    this.echartchannelTitle='业务办理-按用户类型';
                    this.echartchannelLegend= ['大客户','一般客户'];
                    this.echartchannelData=
                    [
                        {value:135, name:'大客户'},
                        {value:410, name:'一般客户'},
                    ];
                    this.echartbusinessTitle='大客户业务办理次数(次)';
                    this.echartbusinessLegend=['本期','同期'];
                    this.echartbusinessYData1=[80, 232, 131, 174, 90, 100],
                    this.echartbusinessYData2=[120, 52, 11, 114, 90, 230],
                    this.channelShow=true;
                    this.TimelinessShow=false;
                    this.$nextTick(()=>{
                        this.echartchannel();
                        this.echartbusiness();
                    })
                    
                break;
                case "业务办理及时率":
                    this.echartchannelTitle='业务办理及时率';
                    this.echartbusinessTitle='业务办理及时率(%)';
                    this.echartbusinessLegend=['本期','同期'];
                    this.echartbusinessYData1=[82, 232, 171, 174, 90, 100],
                    this.echartbusinessYData2=[120, 32, 11, 114, 90, 230],
                    this.channelShow=false;
                    this.TimelinessShow=true;
                    this.$nextTick(()=>{
                        this.Timeliness();
                        this.echartbusiness();
                    })
                    
                break;
                case "大客户业务办理及时率":
                    this.echartchannelTitle='大客户业务办理及时率';
                    this.echartbusinessTitle='大客户业务办理及时率(%)';
                    this.echartbusinessLegend=['本期','同期'];
                    this.echartbusinessYData1=[80, 256, 171, 174, 90, 100],
                    this.echartbusinessYData2=[120, 232, 11, 114, 90, 230],
                    this.channelShow=false;
                    this.TimelinessShow=true;
                    this.$nextTick(()=>{
                         this.Timeliness();
                        this.echartbusiness();
                    })
                   
                break;
                case "投诉次数":
                    this.echartPieCustom2Title='投诉次数-按类型';
                    this.echartPieCustom2Legend= ['水质','水压','计费','报装','窗口服务','其它'];
                    this.echartPieCustom2Data=
                    [
                        {value:135, name:'水质'},
                        {value:410, name:'水压'},
                        {value:335, name:'计费'},
                        {value:310, name:'报装'},
                        {value:234, name:'窗口服务'},
                        {value:135, name:'其它'},
                    ];
                    this.categoryTitle='投诉次数(次)';
                    this.categoryYData1=[80, 232, 171, 174, 90, 100],
                    this.categoryYData2=[120, 12, 11, 114, 90, 230],
                    this.pie3Show=true;
                    this.TimelinessComplaintsShow=false;
                    this.$nextTick(()=>{
                        this.echartPieCustom2();
                        this.category();
                    })
                    
                break;
                case "大客户投诉次数":
                    this.echartPieCustom2Title='投诉次数-按用户类型';
                    this.echartPieCustom2Legend= ['大客户','一般客户'];
                    this.echartPieCustom2Data=
                    [
                        {value:135, name:'大客户'},
                        {value:410, name:'一般客户'},
                    ];
                    this.categoryTitle='大客户投诉次数(次)';
                    this.categoryYData1=[80, 232, 171, 174, 90, 100],
                    this.categoryYData2=[120, 12, 11, 114, 90, 230],
                    this.pie3Show=true;
                    this.TimelinessComplaintsShow=false;
                    this.$nextTick(()=>{
                        this.echartPieCustom2();
                        this.category();
                    })
                    
                break;
                case "投诉处理及时率":
                    this.echartPieCustom2Title='投诉处理及时率';
                    this.categoryTitle='投诉处理及时率(%)';
                    this.categoryYData1=[80, 242, 171, 174, 90, 100],
                    this.categoryYData2=[120, 212, 11, 114, 90, 230],
                    this.pie3Show=false;
                    this.TimelinessComplaintsShow=true;
                    this.$nextTick(()=>{
                         this.TimelinessComplaints();
                        this.category();
                    })
                    
                break;
                case "大客户投诉处理及时率":
                    this.echartPieCustom2Title='大客户投诉处理及时率';
                    this.categoryTitle='大客户投诉处理及时率(%)';
                    this.categoryYData1=[80, 232, 271, 174, 90, 100],
                    this.categoryYData2=[120, 12, 111, 114, 90, 230],
                    this.pie3Show=false;
                    this.TimelinessComplaintsShow=true;
                    this.$nextTick(()=>{
                        this.TimelinessComplaints();
                        this.category();
                    })
                    
                break;
                case "呼叫中心业务总量":
                    this.echartPieCustom2Title='呼叫中心业务数量-按类型';
                    this.echartPieCustom2Legend= ['咨询','用水申请','报修报漏','举报','服务投诉','应急','表杨','其它'];
                    this.echartPieCustom2Data=
                    [
                        {value:135, name:'咨询'},
                        {value:410, name:'用水申请'},
                        {value:335, name:'报修报漏'},
                        {value:310, name:'举报'},
                        {value:234, name:'服务投诉'},
                        {value:24, name:'应急'},
                        {value:310, name:'表杨'},
                        {value:135, name:'其它'},
                    ];
                    this.categoryTitle='呼叫中心业务总量(次)';
                    this.categoryYData1=[80, 232, 171, 174, 90, 100],
                    this.categoryYData2=[120, 12, 11, 114, 90, 230],
                    this.pie3Show=true;
                    this.TimelinessComplaintsShow=false;
                    this.$nextTick(()=>{
                        this.echartPieCustom2();
                        this.category();
                    })
                    
                break;
            }
            this[valShow] = !this[valShow];

        }

    },
    watch:{
        maxHeight() {
            this.tableShow = false
            this.$nextTick(() => {
                this.tableShow = true
            })
        },
    }
}
</script>
<style lang="scss" scoped>
 @import "../../assets/styles/scss/base/fn";
  $imgWidth: 200px;
$theme-color:#297acc;

  .WaterSideIndex2{
    //   padding-left:10px;
      .el-table .el-table__body tr td:nth-child(1) div {
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    
    
    &:after{
        @include _clearBoth()
    }
    & > .center-side-center,& > .center-side-right{
        float: left;
        height: 100%;
    }
    
    .center-side-center{
        width: 100%;
        height: calc(100% - 165px);
       .center-side-pie{
            width: 100%;
            height: 100%;
            zoom: 1;
            &:after{
                @include _clearBoth()
            }
            & > li{
                float: left;
                width: calc(50% - 12px);
                height: calc(50% - 12px);
                border-radius: 5px;
                margin-left: 10px;
                margin-top: 10px;
                border:1px solid #E4E7ED;
                
                h3{
                    height: 35px;
                    line-height: 35px;
                    font-size: 16px;
                    padding-left: 15px;
                    border-bottom:1px solid #E4E7ED;
                    // color: #fff;
                    zoom: 1;
                    &:after{
                        @include _clearBoth()
                    }
                    & > span{
                        float: left;
                    }
                    & > i{
                        // float: right;
                        font-size: 18px;
                        width: 30px;
                        height: 35px;
                        line-height: 35px;
                        &:hover{
                            cursor: pointer;
                        }
                    }
                    & > h5{
                        float: right;
                        padding-right: 10px;
                        .el-input__inner{
                            padding-left: 2px;
                        }
                    }
                }
                section{
                    width: 100%;
                    height: calc(100% - 50px);
                    margin-top: 10px;
                    zoom: 1;
                    &:after{
                        @include _clearBoth()
                    }
                    div{
                        float: left;
                        width: 50%;
                        //  height: calc(100% - 35px);
                        height: 100%;
                    }
                    h2{
                        height: 25px;
                        line-height: 25px;
                        // text-align: center;
                        padding-left: 15px; 
                        font-size: 14px;
                        font-weight: 700;
                    }
                    ol{
                        zoom: 1;
                        &:after{
                            @include _clearBoth()
                        }
                    }
                    ol li{
                        // float: left;
                        // &:nth-of-type(1){
                        //     width: 55%;
                        // }
                        // &:nth-of-type(2){
                        //     width: 45%;
                        // }
                    
                        p{
                            height: 25px;
                            line-height: 25px;
                            text-align: center;
                            padding-left: 20px;
                            font-size: 14px;
                            font-weight: 700;
                            span{
                                margin-left: 10px;
                            }
                        }
                    }
                }


            }
            & > .center-side-top{
                width: calc(100% - 20px);
                zoom: 1;
                &:after{
                    @include _clearBoth()
                }
                & > section{
                    width: 50%;
                    float: left;
                    div{
                    //    margin-top: 25px;
                    height: 100%;
                    }
                }
                .waterPay div{
                    // margin-top: 25px;
                }
            }
            // & > li:nth-of-type(3),& > li:nth-of-type(4){
            //     margin-top: 10px;
            // }
            & > li:nth-of-type(2n){
                width: calc(50% - 22px);
                margin-right: 10px;
            }
            .callCenter section div{
                // height: calc(100% - 25px);
                height: 100%;
                // margin-top: 25px;
                &:nth-of-type(1){
                    width: 55%;
                }
                &:nth-of-type(2),&:nth-of-type(3){
                    width: 45%;
                }
            }
            .RevenueBusiness section  div{
                height: 100%;
                &:nth-of-type(1){
                    width: 55%;
                }
                &:nth-of-type(2),&:nth-of-type(3){
                    width: 45%;
                }
            }
        }
        .center-side-centerCategory{
            width: 100%;
            height: 32%;
            #CategoryCustom{
                width: 100%;
                height: 95%;
            }
        }
        .category{
            width: 100%;
            height: 32%;
        }
    }
    & > .center-side-right{
        width: 30%;
        padding:15px;
        height:96%;
        margin-left: 6%;
        .table-top{
            margin-top: 20px;
            .el-table__body-wrapper{
                font-weight: 700;
            }
            .el-table__body-wrapper tr td:nth-child(1) .cell {
                color: #31b7fa;
                cursor: pointer;
            }
        }
      
    }
    .center-side-top{
        width: 100%;
        // background: #f8f9fb;
        background: #fafafa;
        .date-picker-bg{
            background: #fff;
        }
        .date-picker{
            width: 184px;
            margin-left: auto;
            padding-top: 5px;
            padding-left: 10px;
            
            .setIcon{
                font-size: 20px;
                vertical-align: middle;
                cursor: pointer;
            }
        }
    }
    .quota{
        padding:10px;
        
        margin: 0 auto;
        // display: inline-block;
        .el-row{
            width:100%;
            margin:0px !important;
            .el-col{
                width: 14.285% !important;
            }
            .task-num-border{
                border: 1px solid #E4E7ED;
                border-radius: 5px;
                background: #fff;
            }
            .task-num{
                width: 137px;
                margin:0 auto;
                height: 84px;
                padding:0.56rem 0px;
                &:first{
                margin-left:0; 
                }
                
                &:after{
                    @include _clearBoth()
                }
                &:hover{
                    // background: #eaf4ff;
                    cursor: pointer;
                }
                img{
                    width: 3rem;
                    height: 3.18rem;;
                    vertical-align: middle;
                    float: left;
                    margin-right:10px;
                    margin-top: 10px;
                }
                span{
                    float:left;
                    
                }
                p{
                    font-size: 0.75rem;
                    font-family: "\5FAE\8F6F\96C5\9ED1";
                    color: #000;
                    margin-top: 5px;
                }
                 i{
                    color: $theme-color;
                    font-size: 14px;
                    font-style:normal;
                }
                b{
                    color:#000;
                    font-size: 12px;
                    font-weight: 400;
                }
            }
            .el-col:nth-of-type(1){
                padding-left: 0px !important;
                .task-num{
                    width: 163px;
                    margin:0 auto;
                }
            }
            .el-col:nth-of-type(6){
                .task-num{
                    width: 166px;
                    margin:0 auto;
                }
            }
            .el-col:nth-of-type(5){
                .task-num{
                    width: 185px;
                    margin:0 auto;
                }
            }
            .el-col:nth-of-type(2),.el-col:nth-of-type(3){
                .task-num{
                    width: 157px;
                    margin:0 auto;
                }
            }
            .el-col:last-child{
                .task-num{
                    width: 123px;
                }
                
                span{
                    margin-top: 10px;
                }
            }
             
        }
    }
    
    
  }

</style>
