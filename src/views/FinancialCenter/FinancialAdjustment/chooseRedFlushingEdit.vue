

<template>

    <div class="chooseRedFlushingEdit">
        <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                
                <el-form-item class="form-left">
                    <el-form-item label="账期：">
                        <el-input v-model="formData.con" placeholder="201804"></el-input>
                    </el-form-item>

                    <el-form-item>
                        
                        <el-button class='searchBtn'  @click="demand" icon="el-icon-search"></el-button>
                    </el-form-item>
                    
                </el-form-item>
            </el-form>
        </div>
        <div class="kl-table">
        <el-table
            v-if="tableShow"
            :max-height="maxHeight"         
            stripe
            border
            :data="histroyData.list"
            class="change-tables-table">

           
            <el-table-column 
                type="selection"
                width="50" 
                fixed="left"
                >
            </el-table-column>

            <el-table-column 
                type="index"  
                label="NO."
                width="50" 
                fixed="left"
                :index="indexMethod">
            </el-table-column>

            <el-table-column
                prop="code"
                
                min-width="100"
                label="用户编号">
            </el-table-column>

            <el-table-column
                prop="factoryName"
                min-width="80"
                label="用户名称">

            </el-table-column>

            <el-table-column
                prop="daytime"
                min-width="100"
                label="账期">
            </el-table-column>

            <el-table-column
                prop="areaName"
                min-width="100"
                label="费用项目">
            </el-table-column>

            <el-table-column
                prop="fcode"
                min-width="80"
                label="阶梯1水量">
            </el-table-column>

            <el-table-column
                prop="fix"
                min-width="80"
                label="阶梯2水量">
            </el-table-column>

            <el-table-column
                prop="fix"
                min-width="80"
                label="阶梯3水量">
            </el-table-column>

            <el-table-column
                prop="fcode"
                min-width="80"
                label="水量">
            </el-table-column>

            <el-table-column
                prop="fcode"
                min-width="80"
                label="阶梯1水价">
            </el-table-column>

            <el-table-column
                prop="fixValue"
                min-width="80"
                label="阶梯2水价">
            </el-table-column>

            <el-table-column
                prop="fixValue"
                min-width="80"
                label="阶梯3水价">
            </el-table-column>

            <el-table-column
                prop="flux"
                min-width="80"
                label="金额">
            </el-table-column>
            <el-table-column
                prop="daytime"
                min-width="80"
                label="收费日期">
            </el-table-column>
            <el-table-column
                prop="isxz"
                min-width="80"
                label="缴费状态">
            </el-table-column>

            </el-table>
            <!-- 分页 -->
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :page-sizes="[20, 100, 500, 1000]"
                    :page-size="20"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="histroyData.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name:"chooseRedFlushingEdit",

     data(){
        return{

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

            tableShow:false,
            maxHeight:0,
            histroyData:{
                
            },

 
        }
    },
    mounted(){
        this.init();
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      
      this.common.changeTable(this,'.water-meter-inquiry .kl-table',['.water-meter-inquiry .toolbar','.water-meter-inquiry .block','.water-meter-inquiry #crumbs'])
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
                        areaName: "水费",
                        code: "C755199003",
                        concentrator: "",
                        connect: null,
                        daytime: "201907",
                        endTime: null,
                        factoryName: "周涵",
                        fcode: 12,
                        fix: 0,
                        fixValue: "0.00",
                        flux: "24",
                        getMeter: 1,
                        id: null,
                        isxz: "未缴",
                        lvalue: "-",
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
                     {
                        areaId: null,
                        areaName: "水费",
                        code: "C755199004",
                        concentrator: "",
                        connect: null,
                        daytime: "201907",
                        endTime: null,
                        factoryName: "周晗",
                        fcode: 12,
                        fix: 0,
                        fixValue: "0.00",
                        flux: "24",
                        getMeter: 1,
                        id: null,
                        isxz: "未缴",
                        lvalue: "-",
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
.chooseRedFlushingEdit{
    width: 100%;
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
        margin-bottom:8px;
    }
    .kl-table{
        padding: 0px 20px;
        .block{
            text-align: right;
            padding:10px 0px;
        }
    }
}
</style>
