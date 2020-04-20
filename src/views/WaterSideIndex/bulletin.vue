
<template>
    <div class="bulletin">

            <el-form :inline="true" size="mini" :model="formInline" class="demo-form-inline">
                
            </el-form>
                <div class="myDeskConBtn">

                  
                    <el-table class=" dataTable" border stripe :data="listTable" >

                        <el-table-column min-width="45" type="index" fixed="left" label="No." ></el-table-column>
                        <el-table-column prop="themeMu" min-width="180" label="主题"></el-table-column>
                        <el-table-column prop="themeCon" min-width="80" label="类型"></el-table-column>
                        <el-table-column prop="applicationUser" min-width="80" label="发布人"></el-table-column>  
                        <el-table-column prop="applicationTime" min-width="80" label="发布时间"></el-table-column>  
                        
                        
                        <el-table-column min-width="80" label="操作">
                            <template slot-scope="scope">                                         
                                <el-button type="text"  plain  @click.native="details(scope.$index, scope.row.themeTitle)">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <div class="block">
                        <el-pagination 
                        @size-change="handleSizeChange" 
                        @current-change="handleCurrentChange" 
                        :current-page="1" 
                        :page-sizes="[20, 100, 500, 1000]" 
                        :page-size="20" layout="total, sizes, prev, pager, next, jumper" 
                        :total="total">
                        </el-pagination>
                    </div>

                </div>

    </div>
</template>
<script>
export default {
    name:"bulletin",
    data(){
        return{
            listTable:[{
                themeMu:'深圳市罗湖区爱国路停水通知',
                themeCon:'通知',
                applicationUser:'admin',
                applicationTime:'2019-09-09',
                },{
                themeMu:'深圳水库2019年度水质报告',
                themeCon:'其他',
                applicationUser:'admin',
                applicationTime:'2019-09-09',
                },{
                themeMu:'罗湖水厂开放日通知',
                themeCon:'通知',
                applicationUser:'admin',
                applicationTime:'2019-10-09',
                },{
                themeMu:'非居民用水报装指南-永久用水',
                themeCon:'公告',
                applicationUser:'admin',
                applicationTime:'2019-09-09',
                },
            ],
            total:4,
            
            approvalPageVisible:false,
        }
    },
    mounted(){
    
    },
    methods: {
        search(){
        },
        closeDialog(){
            this.approvalPageVisible = false
        },
        //   详情
        details(index, row){
            this.approvalPageName = '办理-'+row.themeTitle
            this.approvalPageType =row.themeTitle
            this.approvalPageVisible = true
        },
        handleSelect(key, keyPath){
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
    },
    watch:{
    }
}
</script>
<style lang="scss">
  $imgWidth: 200px;
$theme-color:#297acc;
.bulletin{
    height: calc(100% - 20px);
    width: calc(100% - 40px);
    margin: 10px 20px;
    .dataTable{
        margin-top: 10px;
        width: 100% !important;
        .el-table__body {
            tr {
                td:nth-child(2) {
                    div {
                        color: #3195f4;
                        cursor: pointer;
                    }
                }
            }
        }
    }
      
    .block {
        text-align: right;
        padding: 10px 0px;
    }
}
</style>
