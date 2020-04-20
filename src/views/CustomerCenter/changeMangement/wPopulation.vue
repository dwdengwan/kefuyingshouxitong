<template>
    <!-- 用水人口变更 -->
    <div class="wPopulation">
        <el-form class="formBill" size="mini"  :inline="true" :model="wPopulation" label-width="130px" ref="ruleForm" >
          <!-- <legend class="legendColumn">用水人口</legend> -->
            <el-form-item label="用水人数：" style="margin-left: -3px">
                <el-input v-model="wPopulation.userNum" disabled="disabled" class="read-only" placeholder=""></el-input>
            </el-form-item>
            <!-- <el-form-item label="备注："   class="Remarks">
                <el-input type="textarea" :rows="2" v-model="wPopulation.year" placeholder=""></el-input>
            </el-form-item> -->
            <el-button type="primary" size="mini" icon="el-icon-plus" style="float:right;" @click="addTable">添加</el-button>
            <el-table      
                stripe
                border
                :data="tableData.list"
                class="change-tables-table">

                <el-table-column 
                    type="index"  
                    label="NO."
                    width="50" 
                    fixed="left"
                    :index="indexMethod">
                     
                </el-table-column>

                <el-table-column
                    prop="name"
                    label="用户姓名">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name"></el-input>
                    </template>
                </el-table-column>
                    
                <el-table-column
                    prop="certType"
                    label="证件类型">
                    <template slot-scope="scope">
                        <el-select  clearable v-model="scope.row.certType" placeholder="">
                            <el-option  v-for="(item,index) in WpopDicData.idtData" :key="index" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="certNo"
                    min-width="130"
                    label="证件号码">
                    <template slot-scope="scope">
                        <el-input @change='checkId(scope.row.certNo)' placeholder="证件号码" v-model="scope.row.certNo" class="input-with-select" >
                            <i slot="suffix" v-if="idCardCheck == 1" size="medium" class="el-input__icon el-icon-success" style=" color: #67c23a;"></i>
                            <i slot="suffix"  size="medium" v-else-if="idCardCheck == 2" class="el-input__icon el-icon-error" style=" color: red;"></i>

                            <el-button  slot="append" class="scanning-btn" icon="el-icon-reading"  type="primary"  @click="idCard()" size='mini'></el-button>
                        </el-input>
                    </template>

                </el-table-column>

                <el-table-column
                    prop="linkTel"
                    label="联系方式">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.linkTel"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="comments"
                    min-width="120"
                    label="备注">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.comments"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="connect"
                    min-width="60"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" @click="removeTable(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>

                </el-table>

        </el-form>
    </div>
    
</template>
<script>
export default {
    name: "wPopulation",
    props:['wPopulationData','wPopDicData'],
    data() {
        return {
            idCardCheck:0,    
            wPopulation:{
                userNum:0,
            },
            WpopDicData:{},
            tableData:{
                list:[],
                page:1,
                pageSize:20,
            },
        }
    },
    mounted() {
        this.WpopDicData = this.wPopDicData;
        this.init();
    },
    methods: {
        submit(){
            let list = [];
            let data = this.tableData.list;
            for (let i = 0; i < data.length; i++) {
                let obj = {
                    id:'',
                    name: "",
                    certType: "",
                    certNo: "",
                    linkTel: "",
                    comments: "",
                };
                obj.id = data[i].id;
                obj.name = data[i].name;
                obj.certType = data[i].certType;
                obj.certNo = data[i].certNo;
                obj.linkTel = data[i].linkTel;
                obj.comments = data[i].comments;
                list.push(obj)
            }
            return list;
        },
        checkId(val){
            if(val ==1){
                this.idCardCheck = 1
            }else{
                this.idCardCheck = 2
            }

        },
        init() {
            let _this = this;
            _this.tableData.list = _this.wPopulationData;
            _this.wPopulation.userNum = _this.tableData.list.length;
        },
        
        addTable(){
            this.wPopulation.userNum ++ ;
            this.tableData.list.push({});
        },
        removeTable(i,row){
            console.log(i);
            this.wPopulation.userNum --;
            this.tableData.list.splice(i,1)
            // this.tableData.list.push({});
        },
            
        indexMethod(index) {//获取表格序号
            return (this.tableData.pageSize - 20) * this.tableData.page + (index + 1);
        },

    },
    watch:{
        idCardCheck(val,oldVal){
            if(val==2){
                this.$message.error('身份证号已重复');
            }
        },
    },
}
</script>
<style lang="scss">
.wPopulation {
}
</style>