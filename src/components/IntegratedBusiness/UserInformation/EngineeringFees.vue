<template>
    <div class="EngineeringFees">
        <div class="toolbar">
            <el-form :inline="true" size="mini" :model="tableQuery" class="demo-form-inline">
                <el-form-item class="form-left">
                    <el-form-item label='收费日期：'>
                        <el-date-picker 
                        size="mini" 
                        v-model="dataList" 
                        type="daterange" 
                        format="yyyy-MM-dd" 
                        value-format="yyyy-MM-dd" 
                        unlink-panels range-separator="至" 
                        start-placeholder="开始日期" 
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="单据类型：">
                        <el-select  clearable v-model="tableQuery.billType" placeholder="">
                            <el-option  v-for="(item,index) in billTypeOptions" :key="index" :label="item.receiptName" :value="item.receiptId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="单据编号：" class="searchInput">
                        <el-input v-model="tableQuery.billNo" placeholder="单据编号"></el-input>
                    </el-form-item>
                    <el-form-item label="是否缴费：">
                        <el-select  clearable v-model="tableQuery.chargeFlag" placeholder="">
                            <el-option  v-for="(item,index) in chargingFlagOptions" :key="index" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item>
                    
                    <el-button class='searchBtn'  @click="search" icon="el-icon-search"></el-button>
                </el-form-item>
                    
                </el-form-item>
                <el-form-item class="form-right">
                </el-form-item>
            </el-form>
        </div>
        <div class="kl-table">
            <el-table      
                stripe
                border
                v-if="tableShow" 
                :max-height="maxHeight"
                :data="tableData.list"
                class="change-tables-table">

                <el-table-column 
                    type="index"  label="NO."
                    width="50" 
                    fixed="left"
                    :index="indexMethod">
                </el-table-column>


                <el-table-column
                    prop="billDate"
                    min-width="100"
                    label="单据日期">
                </el-table-column>


                <el-table-column
                    prop="billNo"
                    min-width="100"
                    label="单据编号">
                </el-table-column>
                
                <el-table-column
                    prop="billType"
                    min-width="80"
                    label="单据类型">
                </el-table-column>

                
                <el-table-column
                    prop="receivableMoney"
                    min-width="80"
                    label="应收金额">
                </el-table-column>

                <el-table-column
                    prop="depositMoney"
                    min-width="100"
                    label="押金">
                </el-table-column>

                <el-table-column
                    prop="totalMoney"
                    min-width="100"
                    label="合计金额">
                </el-table-column>
                
                <el-table-column
                    prop="payChannel"
                    min-width="100"
                    label="缴费渠道">
                    <template slot-scope="scope">
                    <el-select 
                        v-model="scope.row.payChannel" 
                        @keyup.esc.native="cancel(scope.$index, scope.row)">
                        <el-option v-for="item in dictionaryData.BPC" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                    </template>

                </el-table-column>

                <el-table-column
                    prop="payWay"
                    min-width="80"
                    label="缴费方式">
                    <template slot-scope="scope">
                    <el-select 
                        v-model="scope.row.payWay" 
                        @keyup.esc.native="cancel(scope.$index, scope.row)">
                        <el-option v-for="item in dictionaryData.BPW" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="chargeTime"
                    min-width="150"
                    label="收费时间">
                </el-table-column>

                <el-table-column
                    prop="chargeStaff"
                    min-width="80"
                    label="收费员"
                    show-overflow-tooltip>
                </el-table-column>


                <el-table-column
                    prop="invoiceCode"
                    min-width="80"
                    label="发票代码"
                    show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                    prop="invoiceNo"
                    min-width="80"
                    label="发票号码"
                    show-overflow-tooltip>
                </el-table-column>

                <el-table-column class="cell" label="操作" fixed="right" width="160" >
                    <template slot-scope="scope">
                    <el-button v-if="scope.row.chargeFlag ==0" type="text" @click.native="engineeCharge(scope.row)"  >收费</el-button>
                    <span  v-if="scope.row.chargeFlag ==0" >|</span>
                    <el-button type="text">发票</el-button>
                    <span  >|</span>
                    <el-button type="text">收据</el-button>
                    <span  >|</span>
                    <el-button type="text" >详情</el-button>

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
                    :page-size="20"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"EngineeringFees",
    components:{
    },
     data(){
        return{
            tableShow: false,
            maxHeight: 0,
            crumbsData :{  //面包屑
                titleList:[
                    {title:'账务中心',path:'/FinancialCenter'},
                    {title:'柜台收费',method:()=>{window.histroy.back()}},
                    {title:'工程类收费',method:()=>{window.histroy.back()}}
                ],
            },
            tableQuery:{
                beginDate:'',
                endDate:'',
                billNo:'',//单据编号
                billType:'',//单据类型
                chargeFlag:'',//
            },
            // 是否缴费
            chargingFlagOptions:[{ name:'是', value:1 },{ name:'否', value:0}],
            // 单据类型存值
            billTypeOptions:[],
            //数据字典存值
            dictionaryData:[],
            //日期段
            dataList:[this.common.date(-30*24*60*60*1000),this.common.date() ],
            tableData:{},
            
        }
    },
    mounted(){
        this.init();
        this.getBillTypeOptions();
        this.getDictionary();
        },
    methods:{
        init(){
            let _this = this
            this.tableQuery.beginDate=this.dataList[0]
            this.tableQuery.endDate=this.dataList[1]
            let params = {
                "busicode": "ProjectReceiptList",
                "data": this.tableQuery,
            }
            this.$api.fetch({
                params: params,//参数
            }).then(res => {
                _this.tableData = res; 
                //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
                _this.common.changeTable(this, ".EngineeringFees", [
                ".EngineeringFees .toolbar",
                ".EngineeringFees .block",
                ]);
            })
        },

        // 单据类型数据获取
        getBillTypeOptions() {
            var _this = this
            var params = {
                "busicode": "ReceiptList",
                "data": {},
             }
             this.$api.fetch({
            params: params,//参数
            }).then(res => {
                _this.billTypeOptions= res.list
            })
        },
        
        // 数据字典数据获取
        getDictionary() {
          var _this = this
          var params = {
            "busicode": "DictionarySelect",
            "data": "BPC,BPW"//缴费渠道、缴费方式
          }
          this.$api.fetch({
            params: params,//参数
          }).then(res => {
            _this.dictionaryData = res
          })
        },
        // 收费
        engineeCharge(row){
            var _this = this
            var params = {
                "busicode": "ProjectReceiptCharge",
                "data": {
                    "id":row.id,
                    'payChannel':row.payChannel,
                    'payWay':row.payWay,
                },
             }
             this.$api.fetch({
            params: params,//参数
            }).then(res => {
                _this.$notify({
                    title: '成功',
                    message: '收费成功',
                    type: 'success'
                });
                _this.init();
            })
        },
        search() {  //查询
            this.init()
        },
        //分页
        handleSizeChange(val) { //显示多少数据一页
            this.tableQuery.pageCount = val
            this.tableQuery.page = 1
            this.init()
        },
        handleCurrentChange(val) {  //显示多少页码
            this.tableQuery.page = val
            this.init()
        },
        indexMethod(index) {//获取表格序号
            return   (index+1)
        },
        closeDialog(){ //关闭会话
            this.backfillVisible = false
            this.crumbsData.titleList.splice(3, 1);
            this.init()
        },
        //弹出框
        submit(formName){	//提交
            this.$refs.childEngineeringFees.submit()
        },
        // 删除行
        deleteRow(index, row){
            this.$confirm('是否确认删除该行?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableData.list.splice(index,1)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    },
    watch: {
        maxHeight() {
            this.tableShow = false;
            this.$nextTick(() => {
                this.tableShow = true;
            });
        }
    },
}
</script>
<style lang="scss">
.EngineeringFees{
    width: 100%;
    height: 100%;
}
</style>
