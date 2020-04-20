

<template>

    <div class="BusinessQuery">
        <div class="kl-table common-diaTa">
        <el-table
            v-if="tableShow"
            :max-height="maxHeight"         
            stripe
            border
            center
            :data="histroyData.list"
            class="change-tables-table">

            <el-table-column 
                type="index"  label="NO."
                width="50" 
                fixed="left"
                :index="indexMethod">
            </el-table-column>

            <el-table-column
                prop="billCode"
                
                min-width="200"
                label="单据编号">
            </el-table-column>

            <el-table-column
                prop="billType"
                min-width="150"
                label="单据类型">
            </el-table-column>

            <el-table-column
                prop="billTime"
                min-width="150"
                label="单据时间">
            </el-table-column>

            <el-table-column
                prop="billstatus"
                min-width="150"
                label="单据状态">
            </el-table-column>


            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    name:"BusinessQuery",
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
            BusinessQueryVisible:false,  //综合查询的显示和隐藏
            BusinessQueryName:'发票领用-领用',
            ruleFormData:{},
 
        }
    },
    mounted(){
        this.init();
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      
        this.common.changeTable(this,'.water-meter-inquiry .kl-table',['.water-meter-inquiry .block','.water-meter-inquiry #crumbs'])
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
                        billType:'工程登记',
                        billCode:'0011111',
                        billTime:'2019-07-08',
                        billstatus:'勘察',
                    },
                    {
                        billType:'换表',
                        billCode:'0011111',
                        billTime:'2019-09-08',
                        billstatus:'装表',
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
            this.BusinessQueryVisible = false;
            this.backfillVisible = false;
            this.init()
        },
        //弹出框
        submit(formName){	//提交
            this.$refs.childBusinessQuery.submit()
            // this.BusinessQueryVisible = false;
        },
        add(){
            this.BusinessQueryVisible = true;
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
.BusinessQuery{
    width: 100%;
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
        margin-bottom:8px;
    }
    .el-form--inline .el-form-item:first-of-type{
        margin-right: 0px;
    }
}
</style>
