
<template>
  <div class="SalesAccount">
    
    <!-- 弹出表单明细 -->
    <el-dialog title="欠费明细" :close-on-click-modal="false" :visible.sync="DetailsArrearsShow"  @close="closeDialog(0)" >
      <DetailsArrears ref="detailsArrears" :formData="formData"></DetailsArrears>
    </el-dialog>
    

  <div style="height:100%"  v-if="SalesAccountEditVisible">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right">
        <el-button type="primary" size="mini" @click="detailsArrears()">欠费明细</el-button>
        <el-button type="primary" size="mini" @click="submit();">保 存</el-button>
        <el-button type="primary" size="mini" v-if="$store.state.isRemove == true"  @click="open()">删除</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog(1)">返回</el-button>
      </div>
    </div>
    <SalesAccountEdit ref="childSalesAccount" :SalesAccountEditData="SalesAccountEditData"></SalesAccountEdit>
  </div>
  <div  v-else>
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <!-- <h2 class="tab-title">
            <i></i>
            销户</h2> -->
      <div class="bread-contain-right">
        <el-button icon="el-icon-plus" size="mini" @click="salesAdd" type="primary">添加</el-button>
        <!-- <el-button @click="exportExcel" icon="el-icon-upload2" size="mini" type="primary">导出</el-button> -->
      </div>
    </div>
    <div class="toolbar">
      <el-form :inline="true" size="mini" :model="tableQuery" class="demo-form-inline">

        <el-form-item class="form-left">
          <el-form-item label='单据日期：'>
            <el-date-picker v-model="billTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" :picker-options="pickerOptions" :clearable="true" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="状态：">
            <el-select clearable v-model="tableQuery.status" placeholder="未审">
              <el-option v-for="(item,index) in approvalStatusOptions" :key="index" :label="item.name" :value="item.value"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="模糊查询：" class="searchInput">
            <el-tooltip class="item" effect="dark" content="单据编号、用户编号、用户名称、受理人" placement="top">
                <el-input v-model="tableQuery.fuzzyQuery" clearable size="mini"></el-input>
              </el-tooltip>
          </el-form-item>

          <el-form-item>

            <el-button  class="searchBtn"  icon="el-icon-search" @click="search" ></el-button>
          </el-form-item>

        </el-form-item>

      </el-form>
    </div>
    <div class="kl-table">
      <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="tableData.list" class="change-tables-table">
       
        <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
        </el-table-column>   
        
        <el-table-column prop="status" min-width="60" label="状态">
        </el-table-column>

        <el-table-column prop="schedule" min-width="100" label="进度">
        </el-table-column>

        <el-table-column prop="currHandle" min-width="100" label="当前处理人">
        </el-table-column>

        <el-table-column prop="billNo" min-width="100" label="单据编号">
        </el-table-column>

        <el-table-column prop="billDate" min-width="100" label="单据日期">
        </el-table-column>

        <el-table-column prop="userNo" min-width="80" label="用户编号">

        </el-table-column>

        <el-table-column prop="ctmName" min-width="80" label="客户名称">
        </el-table-column>

        <el-table-column prop="comments" show-overflow-tooltip min-width="80" label="销户说明">
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="80">
          <template slot-scope="scope">

            <el-button type="text" @click="details(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
        </el-pagination>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import SalesAccountEdit from './SalesAccountEdit'
import chooseuser from "../Transfer/chooseuser"
import DetailsArrears from "@/components/DetailsArrears/index"//欠费明细
export default {
  name: "SalesAccount",
  components: {
    SalesAccountEdit,
    DetailsArrears,
    chooseuser
  },
  data() {
    return {
      status:'add',//add新增 updata修改
      SalesAccountEditData:{
        id:'',
        userNo:'',
      },
      formData: {
        userNo: '',
        id:'',
      },
      billTime:[],
      SalesAccountEditVisible: false,
      DetailsArrearsShow: false,
      historyData: {},
      crumbsData: {  //面包屑
        titleList: [
          // { title: '业务管理', path: '/SalesAccount' },
          { title: '客户管理' },
          { title: '销户' }
        ],

      },
      approvalStatusOptions: this.common.processState(),//审批状态下拉框
      tableQuery: {
        page: 1,
        pageCount: 20,
        beginDate:"",
        endDate:"",
        fuzzyQuery: "",
        status: "",
      },
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      DateChoosevalue: [],
      tableShow: false,
      maxHeight: 0,
      tableData: {

      },
      SalesAccountName: '销户办理',

    }
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, '.water-meter-inquiry .kl-table', ['.water-meter-inquiry .toolbar', '.water-meter-inquiry .block', '.water-meter-inquiry #crumbs'])
  },
  methods: {
    init() {
      let _this = this
      if (!_this.billTime) {
        _this.tableQuery.beginDate = '';
        _this.tableQuery.endDate = '';
      } else {
        _this.tableQuery.beginDate = _this.billTime[0];
        _this.tableQuery.endDate = _this.billTime[1];
      }
      let data = _this.tableQuery;
      let params = {
        "busicode": "CloseUserList",
        data,
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.tableData = res;
      })
    },

    search() {  //查询
      // this.tableQuery.page = 1
      // this.tableQuery.pageCount = 20
      this.init()
    },
    // 欠费明细
    detailsArrears() {
      let userNo = '';
      if (this.SalesAccountEditData.id !== '') {
        userNo = this.SalesAccountEditData.userNo;
      }else{
        userNo = this.$refs.childSalesAccount.tableQuery.userNo;
      }
      if (userNo == '') {
        this.$message({
          message: '查询用户编号不能为空！',
          type: 'warning'
        });
        return
      }
      this.formData.userNo = userNo;
      this.DetailsArrearsShow = true;
      this.$refs['detailsArrears'].init();
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
      return (this.tableQuery.pageCount - 20) * this.tableQuery.page + (index + 1);

    },
    closeDialog(num) { //关闭会话
      this.DetailsArrearsShow = false;
      if (num == 0) {
        this.SalesAccountEditVisible = true;
      }else{
        this.SalesAccountEditVisible = false;
        this.init()
      }
    },
    //弹出框
    submit() {	//提交
      let _this = this
      let data = this.$refs['childSalesAccount'].submit()
      let params = {};
      let message = '';
      if (this.status == 'add') {
        params.busicode = "CloseUserAdd";
        params.data = data;
        message = '新增成功！';
      }else{
        params.busicode = "CloseUserUpdate";
        data.id = _this.SalesAccountEditData.id;
        params.data = data;
        message = '修改成功！';
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.$message({
          message,
          type: 'success'
        });
        _this.SalesAccountEditVisible = false;
        _this.init()
      })
      
    },
    details(i,row) {
      this.status = 'updata';
      this.SalesAccountEditData.id = row.id;
      this.SalesAccountEditData.userNo = row.userNo;
      this.SalesAccountEditVisible = true;
    },
    salesAdd(){
      this.status = 'add';
      this.SalesAccountEditData.id = '';
      this.$store.state.isRemove = false;
      this.SalesAccountEditVisible = true;
    },
    open() {
      let _this = this;
      this.$confirm('此操作将永久删除该单据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.remove()
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    remove(){//删除
      let _this = this
      let saveData = this.$refs['childSalesAccount'].submit()
      let data = {
        id: _this.SalesAccountEditData.id,
      }
      let params = {
        "busicode": "CloseUserDelete",
        data,
      };
      let message = '删除成功！';
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.$message({
          message,
          type: 'success'
        });
        _this.SalesAccountEditVisible = false;
        _this.init()
      })
    },
    // 删除行
    deleteRow(index, row) {
      this.$confirm('是否确认删除该行?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.list.splice(index, 1)
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
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
  }
}
</script>
<style lang="scss">
.SalesAccount {
  width: 100%;
  height: 100%;
}
</style>
