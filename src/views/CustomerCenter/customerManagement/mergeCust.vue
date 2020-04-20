
<template>
    <div class="mergeCust">
        
        <div class="toolbar">
        <el-form :inline="true" size="mini" :model="formData" class=" qurey" label-width="130px">

            <el-form-item class="form-left">
                <el-form-item label="身份证号码：" class="labelClass">
                    <el-input v-model="formData.con" placeholder="请输入需要并户的身份证号码"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
                </el-form-item>

            </el-form-item>
        </el-form>
        <i class="tips">双击切换主客户号，默认第一户为主客户号</i>
        </div>
    <div class="kl-table">
      <el-table @row-dblclick="changeTag" @selection-change="handleSelectionChange" current-change stripe border :data="histroyData.list" class="change-tables-table">
  
        <el-table-column   type="selection"  width="55">   </el-table-column>

        <el-table-column type="index" label="NO." width="50" fixed="left">
        </el-table-column>

        <el-table-column prop="code" min-width="100" label="客户编号">
        </el-table-column>

        <el-table-column prop="areaName" min-width="180" label="客户名称">
        </el-table-column>

        <el-table-column prop="address" min-width="180" label="客户地址">
        </el-table-column>

        <el-table-column prop="type" min-width="100" label="客户类型">
        </el-table-column>

        <el-table-column prop="name" min-width="100" label="联系人">
        </el-table-column>

        <el-table-column prop="nameTel" min-width="80" label="座机号码">
        </el-table-column>

        <el-table-column
        prop="tag"
        label="标签"
        width="100">
        <template slot-scope="scope">
            <el-tag
            :type="scope.row.tag === '主' ? 'danger' : 'success'"
            disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
        </el-table-column>

      </el-table>

        </div>
    </div>
</template>
<script>
export default {
    name:"mergeCust",
    data(){
        return{
            histroyData: {
                list: [
                    {
                        areaName: "淮汽集团盱眙汽车客运有限公司",
                        tag: '主',
                        name:'',
                        nameTel:'',
                        type:'',
                        address:'',
                        code:'0000001',
                    },
                    {
                        areaName: "盱眙国联建设工程质量检测有限公司",
                        tag: '次',
                        name:'',
                        nameTel:'',
                        type:'',
                        address:'',
                        code:'0000002',
                    },
                ],
            },
            
            formData: {
                con: "",
                waterMeterManufacturer: "",
                waterMeterManufacturerOptions: [],
                waterMeterType: "",
                waterMeterTypeOptions: [],
                waterMeterCaliber: "",
                waterMeterCaliberOptions: [],
                waterMeterStatus: "",
                waterMeterStatusOptions: [],
                subordinateDepartments: "",
                subordinateDepartmentsOptions: []

            },
            backfillSubmitForm:{
                superiorArea:'',
                areaNum:'',
                state:'0',
                areaName:'',
                desc:"",
            },
        }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      changeTag(row, column, event){
        // console.log(column); 
      },
      
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
}
</script>
<style lang="scss">
  @import "../../../assets/styles/scss/base/fn";
  $imgWidth: 200px;
$theme-color:#297acc;
.mergeCust{
    height: 100%;
    width: 90%;
    margin: 0 auto;
    .tips{
        font-size: 12px;
        font-style: inherit;   
        color: #7b7579;
    }
    .qurey{
    height: 50px;
    width: 100%;
    padding: 10px;
        .form-left{
            width: 100%;
            .el-form-item__content{
                width: 100%;
                .labelClass {
                    width: calc(100% - 100px);
                    .el-form-item__content{
                        width: calc(100% - 130px);
                        .el-input__inner{
                            width: 100%;

                        }
                    }

                }

            }
        }

    }
    .backfillSubmitForm{
        // margin-top: 15px;
        // padding: 10px 20px;
        // // width: 93%
        .el-input--mini /deep/ .el-input__inner{
                width: 100%;
        }
    }
}
</style>
