
<template>
    <div class="noticeApproval">

            <el-form :inline="true" size="mini" :model="formInline" class="demo-form-inline">
                

                <el-form-item label="关键字：" class="searchInput isactive" >
                    <el-input v-model="formInline.con" placeholder="关键字"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button  class="searchBtn"  icon="el-icon-search" @click="search()"></el-button>

                </el-form-item>

                <!-- <el-form-item >
                        <el-checkbox v-model="formInline.yiban">今日不再提醒</el-checkbox>
                </el-form-item> -->


                <div   class="applicationDate">
                    <p class="isactive">提醒类别：</p>
                    <ul>
                        <li v-for="(v, i) in documentoOptions1" :key="i">{{v.label}}</li>
                    </ul>
                </div>
                
                    

                <div   class="applicationDate">
                    <p class="isactive">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</p>
                    <ul>
                        <li v-for="(v, i) in approvalDate" :key="i">{{v}}</li>
                    </ul>
                </div>
            </el-form>
                <div class="myDeskConBtn">

                  
                    <el-table class="listTable dataTable" border stripe :data="listTable" >

                        <el-table-column min-width="45" type="index" fixed="left" label="No." ></el-table-column>
                        <el-table-column prop="themeTitle" min-width="100" label="提醒类别"></el-table-column>
                        <!-- <el-table-column prop="themeCon" min-width="80" label="单据编号"></el-table-column>
                        <el-table-column prop="applicationUser" min-width="80" label="申请人"></el-table-column>                  
                        <el-table-column prop="phoneNum" min-width="80" label="紧急程度"></el-table-column>                   -->
                        <el-table-column prop="applicationTime" min-width="120" label="开始时间"></el-table-column>
                        <el-table-column prop="updateTime" min-width="120" label="结束时间"></el-table-column>
                        <el-table-column prop="stepStart" min-width="80" label="状态"></el-table-column>
                        <!-- <el-table-column prop="stepEnd" min-width="180" label="进度"></el-table-column>
                        <el-table-column prop="handleEndUser" min-width="100" label="当前处理人"></el-table-column> -->

                        <el-table-column min-width="110" label="操作">
                            <template slot-scope="scope">                                         
                                <el-button type="text"  plain  @click.native="details(scope.$index, scope.row.themeTitle)">详情</el-button>
                                <el-button type="text"  plain  >今日不再提醒</el-button>
                                <el-button type="text"  plain  >不再提醒</el-button>
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

        
        <!-- 弹出审批界面 -->
        <!-- <el-dialog append-to-body class="TwoModel" :title="approvalPageName" :close-on-click-modal="false" :visible.sync="approvalPageVisible" @close="closeDialog">
            <approvalPage :approvalPageType="approvalPageType" ref="approvalPage"></approvalPage>
        </el-dialog> -->

    </div>
</template>
<script>
// import approvalPage from "@/views/ProcessApproval/approvalPage"
export default {
    name:"noticeApproval",
    // components: {
    //     approvalPage
    // },
    // props:["noticeApprovalType"],
    data(){
        return{
            
            showType:'',  

            approvalPageType:'',
            //   查询表单
            formInline: {
                con: '',
                document:['0'],
                proposer:'',
                application:"",
                handle:'2',
                oApproval:'1',
                oApproval:'22',
                DocumentStatus:'1',
                yiban:true,
            },
            listTable:[
                {
                    applicationTime:"2019-06-03 12.27",
                    updateTime:"2019-06-03 14:05",
                    themeTitle:"微信对账异常提醒",
                    stepStart:"待处理",

                },
                // {
                    
                //     applicationTime:"2019-06-03 12.27",
                //     updateTime:"2019-06-03 14:05",
                //     themeTitle:"水表到期提醒",
                //     stepStart:"待处理",

                // },
            ],
            
            //   申请日期
            applicationDate:["全部","今天","3天内","7天内","30天内","指定时间"],
            //   单据状态
            approvalDate:[ "全部","待处理","已处理"],
            total:2,
            rightShow:'1-1',
            isActive:false,  //控制高级查询内容的显示
            documentoOptions:[],
            dOptions:[
                { 
                    label: '全部', 
                    value: '0', 
                },
                { 
                    label: '用户管理', 
                    value: '1', 
                    children: [
                    { label: '用水咨询', value: '22' }, 
                    { label: '用水安装', value: '22' }, 
                    { label: '内部工程', value: '2', },
                    ] 
                },
                { 
                    label: '抄表开账', 
                    value: '2', 
                    children: [
                        { label: '抄表质量检查', value: '321' }, 
                    ] 
                },
                { 
                    label: '收费管理', 
                    value: '3', 
                    children: [
                        { label: '费用调整', value: '321' }, 
                        { label: '举报罚款', value: '321' }, 
                        { label: '违约金减免', value: '321' }, 
                        { label: '呆账处理', value: '321' }, 
                        { label: '坏账处理', value: '321' }, 
                        { label: '冲红', value: '321' }, 
                        { label: '取消当月收费', value: '321' }, 
                        { label: '余额取出', value: '321' }, 
                        { label: '余额过户', value: '321' }, 
                    ] 
                },
                { 
                    label: '客户管理', 
                    value: '4', 
                    children: [
                        { label: '开户', value: '121' }, 
                        { label: '过户', value: '122' }, 
                        { label: '并户', value: '123' }, 
                        { label: '停用', value: '124' },
                        { label: '销户', value: '125' }, 
                        { label: '变更', value: '126' }, 
                    ] 
                },
                { 
                    label: '表计管理', 
                    value: '5', 
                    children: [
                        { label: '注册', value: '321' }, 
                        { label: '换表', value: '321' }, 
                        { label: '拆表', value: '322' }, 
                        { label: '复表', value: '322' }, 
                        { label: '校表', value: '322' }, 
                        { label: '变更', value: '323' }, 
                    ] 
                },
                { 
                    label: '客户通知', 
                    value: '6', 
                    children: [
                        { label: '通知公共', value: '321' }, 
                        { label: '满意度调查', value: '321' },
                    ] 
                },
                { 
                    label: '基础信息', 
                    value: '7', 
                    children: [
                        { label: '全部', value: '5', },
                        { label: '水价管理', value: '321' }, 
                    ] 
                },
            ],
            documentoOptions1:[
                { label: '全部', value: '5', },
                { label: '水表到期提醒', value: '121' }, 
                { label: '微信对账异常提醒', value: '122' }, 
                // { label: '并户', value: '123' }, 
                // { label: '停用', value: '124' },
                // { label: '销户', value: '125' }, 
                // { label: '变更', value: '126' },
                 ],
            approvalPageName:'办理',
            approvalPageVisible:false,
        }
    },
    mounted(){
    //   console.log( this.noticeApprovalType );
      
            // this.handleSelect(this.noticeApprovalType)
            // this.showType = this.noticeApprovalType;
    
    },
    methods: {
        search(){
        },
        closeDialog(){
            this.approvalPageVisible = false
        },
        //   详情
        details(index, row){
            // console.log(this.$parent.$parent.addTab);
            
            if (row === "微信对账异常提醒") {
                this.$parent.$parent.addTab('微信对账异常提醒')
            } else if (row === "水表到期提醒") {
                this.$parent.$parent.addTab('水表到期提醒')
            }
            // this.approvalPageType =row.themeTitle
            // this.approvalPageVisible = true
        },
        hidden() {
            if (this.isActive == true) {
            $('.upchange').addClass('el-icon-arrow-down').removeClass('el-icon-arrow-up')
            this.isActive = false;
            
            } else {
            $('.upchange').addClass('el-icon-arrow-up').removeClass('el-icon-arrow-down')
            
            this.isActive = true;
            }
      },
        handleSelect(key, keyPath){
            this.rightShow = key
            
            if(key=='1-1'){//待办

            }else if(key=='2-1'){//工程管理
                this.documentoOptions1 = this.dOptionsEngineering1

            }else if(key=='2-3'){//客户管理
                this.documentoOptions1 = this.dOptionsCustomer1

            }else if(key=='2-4'){//表计管理
                this.documentoOptions1 = this.dOptionsMeter1

            }else if(key=='2-6'){//抄表开账
                this.documentoOptions1 = this.MeterReadingRecord

            }else if(key=='2-7'){//收费管理
                this.documentoOptions1 = this.ChargeManagement
                
            }else if(key=='2-8'){//客户通知
                this.documentoOptions1 = this.CustomerNotCenter

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
    },
    watch:{
    //   noticeApprovalType(val) {
    //     this.handleSelect(val)
    //     this.showType = val;
    //   }
    }
}
</script>
<style lang="scss">
  $imgWidth: 200px;
$theme-color:#297acc;
.noticeApproval{
    height: calc(100% - 20px);
    width: calc(100% - 40px);
    margin: 10px 20px;
    .TwoModel{
        .el-dialog__body{
            height: calc(100% - 55px);
        }
    }
    .isactive{
        color: #328ED1;
        font-weight: 700;
        & > .el-form-item__label{
            color: #328ED1;
            font-weight: 700;
        }
    }
    
    .applicationDate{
        padding:8px 0;
        border-bottom:1px dashed #ccc;   
        width: 100%;    
        height: 20px;
        &:after{
            // @include _clearBoth()
        }
        & > p{
            float: left;
            padding:3px 0px;
            
        }
        & > ul{
            float: left;
            padding-left: 10px;
            &:after{
                // @include _clearBoth()
            }
            & > li{
                float: left;
                padding:3px 24px;
                border-radius: 2px;
            }
            & > li:first-child{
                background: #328ED1;
                color: #fff;
            }
        }
    }
    .dataTable{
        margin-top: 10px;
        width: 100% !important;
    }
      
    .block {
        text-align: right;
        padding: 10px 0px;
    }
}
</style>
