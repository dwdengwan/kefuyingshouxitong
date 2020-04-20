<template>
    <div class="DetailsOfTableChange">
         <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
            <el-form-item class="form-left">
                <el-form-item label='换表类型：'>
                    <el-select  clearable v-model="formData.watermeterWarehouse" placeholder="换表类型">
                        <el-option  v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                    </el-select>
                </el-form-item>
                <el-form-item label="计划完工时间：">
                    <el-input v-model="formData.con" placeholder="计划完工时间"></el-input>
                </el-form-item>
                <el-form-item label="换表原因：">
                    <el-input type="textarea" :rows="2" class="changeTabTextarea" v-model="formData.reason" placeholder="换表原因"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class='searchBtn'  @click="demand" icon="el-icon-search"></el-button>
                </el-form-item>
            </el-form-item>
            
            <el-form-item class="form-right">
                <h4>
                    <span>换表总数：</span><span>100支</span>
                    <span>换表完成：</span><span>50支</span>
                </h4>
            
            </el-form-item>
        </el-form>
        <div class="kl-table">
            <el-table       
            stripe
            border
            :data="histroyData.list"
    
            class="change-tables-table">

            <el-table-column 
                type="index"  label="NO."
                width="50" 
                fixed="left"
                :index="indexMethod">
            </el-table-column>

            <el-table-column
                prop="daytime"
                
                min-width="120"
                label="换表日期">
            </el-table-column>

            <el-table-column
                prop="code"
                min-width="100"
                label="册本">
            </el-table-column>

            <el-table-column
                prop="areaName"
                min-width="80"
                label="用户编号">

            </el-table-column>

            <el-table-column
                prop="lvalue"
                min-width="80"
                label="用户地址">
            </el-table-column>

            <el-table-column
                prop="fixValue"
                min-width="80"
                label="换表员">
            </el-table-column>

            <el-table-column
                prop="endTime"
                min-width="80"
                label="上期抄码">
            </el-table-column>

            <el-table-column
                prop="fcode"
                min-width="80"
                label="旧表底码"
                >
            </el-table-column>

            <el-table-column
                prop="fcode"
                min-width="120"
                label="新表底码">
            </el-table-column>
                                    
            <el-table-column
                prop="factoryName"
                min-width="120"
                label="换表水量"
                show-overflow-tooltip>
            </el-table-column>


            <el-table-column 
                prop="fix" 
                min-width="100" 
                label="旧水表口径" 
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="fix"
                min-width="80"
                label="新水表口径"
                >
            </el-table-column>

            <el-table-column
                prop="flux"
                min-width="120"
                label="旧水表出厂编号">
            </el-table-column>
                                    
            <el-table-column
                prop="flux"
                min-width="120"
                label="新水表出厂编号"
                show-overflow-tooltip>
            </el-table-column>


            <el-table-column 
                prop="flux" 
                min-width="100" 
                label="旧表处理方式" 
                show-overflow-tooltip>
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
    name:"DetailsOfTableChange",
    data(){
        return{
            formData:{},
            histroyData:{
                
            },
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            this.formData= {
                watermeterWarehouse:"",
                watermeterWarehouseOptions:[
                    {
                        name:"异常",
                        value:""
                    },
                    {
                        name:"校表",
                        value:""
                    },
 
                ],
                con:"",
                reason:""
            };
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
                        areaName: "012345",
                        code: "C0003",
                        concentrator: "",
                        connect: null,
                        daytime: "2019-07-02",
                        endTime: 567,
                        factoryName: "136",
                        fcode: 703,
                        fix: 50,
                        fcode: "-",
                        flux: "-",
                        getMeter: 1,
                        id: null,
                        isxz: "未抄",
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
        indexMethod(index) {//获取表格序号
        //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
        return  (this.histroyData.pageSize-20)*this.histroyData.pages + (index+1) ;
        
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
        demand() {  //查询
            // this.tableQuery.page = 1
            // this.tableQuery.pageCount = 20
            this.init()
        },
    }
}
</script>
<style lang="scss">
@import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color:#297acc;
.DetailsOfTableChange{
    .demo-form-inline{
        &:after{
            @include _clearBoth()
        }
        & > .form-left{
            float:left;
            .changeTabTextarea{
                width: 300px;
            }
        }
        & > .form-right{
            float:right;
        }   
    }
    .kl-table{
        padding:0px;
    }
    
}
</style>

