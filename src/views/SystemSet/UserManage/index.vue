
<template>
    <div class="UserManage">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-if="EditVisible">
            <el-button size="mini" type="primary">保存</el-button>
            <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
        <div class="bread-contain-right" v-else>
            <el-button size="mini"  icon="el-icon-plus" @click="add(this)" type="primary">添加</el-button>
        </div>
      </div>
      <div v-if="EditVisible" class="test">
        <UserManageEdit ref="UserManageEdit"></UserManageEdit>
      </div>
       

      <div v-else>
          <div class="toolbar">
              <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                  
                  <el-form-item class="form-left">
                      <el-form-item label="用户名称：">
                          <el-input v-model="formData.con" placeholder=""></el-input>
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
              :data="editData.list"
              class="change-tables-table">


              <el-table-column 
                  type="index"  label="NO."
                  width="50" 
                  fixed="left"
                  :index="indexMethod">
              </el-table-column>

              <el-table-column
                  prop="userName"
                  min-width="180"
                  label="用户名称">
              </el-table-column>

              <el-table-column
                  prop="departName"
                  min-width="300"
                  label="部门">
              </el-table-column>

              <el-table-column
                  prop="roles"
                  min-width="300"
                  label="所属角色">
              </el-table-column>

              <el-table-column
                  prop="static"
                  min-width="80"
                  :formatter="formatStatus"
                  label="状态">
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="50">
                  <template slot-scope="scope">
                    <el-button type="text" @click="edit(scope.$index, scope.row)">修改</el-button>
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
                    :total="editData.total">
                </el-pagination>
            </div>
          </div>
      </div>
           
    </div>
</template>
<script>

import UserManageEdit from "../UserManage/UserManageEdit"
export default {
    name:"UserManage",
    components:{
        UserManageEdit
    },
    data() {
      return {
        EditVisible:false,//弹出表单
        crumbsData :{  //面包屑
            titleList:[
                { title: '系统管理' },
                { title: '用户管理' },

            ],
            
        },
        formData:{
            con:"",
            watermeterWarehouse:"",
            watermeterWarehouseOptions:[
                {
                    name:"全部",
                    value:"1"
                },
                {
                    name:"已审",
                    value:"2"
                },
                {
                    name:"未审",
                    value:"3"
                },
                {
                    name:"经理审批",
                    value:"4"
                },
            ],
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
        editData:{
            
        },
        rules:{
            watermeterWarehouse:[
                { required: true, message: '请选择短语', trigger: 'blur' },
            ],
            desc:[
                { required: true, message: '请输入用户编号', trigger: 'blur' },
            ]
        },
        UserManageVisible:false, 
        UserManageName:'信息发布管理-添加',

      };
    },
    mounted(){
        this.init();
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      
      this.common.changeTable(this,'.ShortMessageNotification .kl-table',['.ShortMessageNotification .toolbar','.ShortMessageNotification .block','.ShortMessageNotification #crumbs'])
    },
    methods: {
        init(){
            
            this.editData = {
                areaId:"",
                endRow: 5,
                hasNextPage: false,
                hasPreviousPage: false,
                isFirstPage: true,
                isLastPage: true,
                list: [
                    {
                        id: null,
                        userName: "周新宇",
                        departName: "水务研发部",
                        static: "1",
                        roles: "系统管理员、抄表员、收费员",
                    },
                    {
                        
                        id: null,
                        userName: "周新宇",
                        departName: "水务研发部",
                        static: "1",
                        roles: "系统管理员、抄表员、收费员",
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
            };
             
        },

      handleClick(tab, event) {
          this.editData = {
                areaId:"",
                endRow: 5,
                hasNextPage: false,
                hasPreviousPage: false,
                isFirstPage: true,
                isLastPage: true,
                list: [
                    {
                        
                        id: null,
                        userName: "周新宇",
                        departName: "水务研发部",
                        static: "1",
                        roles: "系统管理员、抄表员、收费员",
                    },
                     {
                        
                        id: null,
                        userName: "周新宇",
                        departName: "水务研发部",
                        static: "1",
                        roles: "系统管理员、抄表员、收费员",
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
            };
      },
       demand() {  //查询
        // this.tableQuery.page = 1
        // this.tableQuery.pageCount = 20
        this.init()
      },
    
      formatStatus(row) { //格式化状态
        return row.status == 1 ?"启用" : "停用";
      },
        
        add(){//添加
            alert('直接弹出员工选择公共组件，选择完成后直接调用ajax接口，完成员工新增功能，');

        },
        edit(){
            // this.$set(this.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } })
            this.EditVisible = true;
        },
        closeDialog(){ //关闭会话
            // this.crumbsData.titleList.splice(2, 1);
            this.EditVisible = false;
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
        return  (this.editData.pageSize-20)*this.editData.pages + (index+1) ;
    
      },
        // 删除行
        deleteRow(index, row){
            this.$confirm('是否确认删除该行?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.editData.list.splice(index,1)
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
    watch:{
        maxHeight(){
        this.tableShow = false
        this.$nextTick(()=>{
          this.tableShow = true
        })
      },
    }
  };
</script>
<style lang="scss">
.UserManage{
    width: 100%;
    height: 100%;

    .test{
        height:calc(100% - 41px);
    }
    
}
</style>