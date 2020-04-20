
<template>
  <div class="CustomerChange">
    <!-- 变更选择框 -->
    <div  v-if="CustomerChangeAddVisible">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right">
          <el-button type="primary" size="mini" @click="submit();">保 存</el-button>
          <el-button type="primary" size="mini" v-if="userStatus == '草稿'" @click="open()">删 除</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog('ruleForm')">返回</el-button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right">
          <el-button type="primary" size="mini" icon="el-icon-plus"  @click="salesAdd">添加</el-button>
        </div>
      </div>
    </div>
    <div  v-if="CustomerChangeAddVisible" style="height: calc(100% - 41px);">
      <CustomerChangeAdd ref="CustomerChangeAdd" :id="id"></CustomerChangeAdd>
    </div>

    <div  v-else>
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

                  <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
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

              <!-- <el-table-column prop="useLevel" min-width="100" label="紧急程度" show-overflow-tooltip>
              </el-table-column> -->

              <el-table-column prop="billNo" min-width="100" label="单据编号">
              </el-table-column>

              <el-table-column prop="billDate" min-width="100" label="单据日期">
              </el-table-column>

              <el-table-column prop="userNo" min-width="80" label="用户编号">

              </el-table-column>

              <el-table-column prop="ctmName" min-width="80" label="客户名称">
              </el-table-column>

              <!-- <el-table-column prop="fixValue" min-width="80" label="变更类型">
              </el-table-column> -->

              <el-table-column prop="changeItems" min-width="160" label="变更事项" show-overflow-tooltip>
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
import CustomerChangeAdd from './CustomerChangeAdd'
export default {
  name: "CustomerChange",
  components: {
    // CustomerChangeEdit,
    CustomerChangeAdd,
    // chooseuser
  },
  data() {
    return {
      id:'',//详情主键id
      status:'add',//add 新增 updata 修改
      userStatus:'草稿',//流程状态
      chooseuserName:"选择用户",
      chooseuserVisible:false,
      CustomerChangeAddVisible: false,
      TransferDetailsGH: false,
      historyData: {
        list: [
          {
            month:'201905',
            fname:'污水费',
            value:'12',
            money:'123',
            fare:'正常',
            },
          {
            month:'201805',
            fname:'水费',
            value:'12',
            money:'123',
            fare:'坏账',
            },
          {
            month:'201705',
            fname:'水费',
            value:'12',
            money:'123',
            fare:'呆账',
            },
        ],
      },
      crumbsData: {  //面包屑
        titleList: [
          // { title: '业务管理', path: '/CustomerChange' },
          { title: '客户管理' },
          { title: '变更' },
        ],

      },
      approvalStatusOptions: this.common.processState(),//审批状态下拉框
      billTime:[],
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
      CustomerChangeVisible: false,  //综合查询的显示和隐藏
      CustomerChangeName: '销户办理',
      ruleFormData: {},

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
        "busicode": "ChangeUserList",
        data,
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.tableData = res;
      })
    },

    demand() {  //查询
      // this.tableQuery.page = 1
      // this.tableQuery.pageCount = 20
      this.init()
    },
    //   导出
    exportExcel() {
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

    cellClick(row, column, cell, event) { //点击文件名
      let that = this;

    },
    indexMethod(index) {//获取表格序号
      //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      return (this.tableData.pageSize - 20) * this.tableData.pages + (index + 1);

    },
    closeDialog() { //关闭会话
      // this.crumbsData.titleList.pop();
      this.CustomerChangeVisible = false;
      this.backfillVisible = false;
      this.CustomerChangeAddVisible = false;
      this.init()
    },
    closeChooseuser(){
      this.chooseuserVisible = false;
    },
    //弹出框
    submit() {	//提交
      let _this = this;
      let params = {
        busicode:'',
        data:{},
      }
      let message = '';
      let data = this.$refs.CustomerChangeAdd.submit();
      console.log(data);
      if (this.status == 'add') {
        params.busicode = 'ChangeUserAdd';
        params.data = data;
        message = "新增成功！"
      }else{
        params.busicode = 'ChangeUserUpdate';
        params.data = data;
        message = "修改成功！"
      }
      _this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.$message({
          message,
          type: 'success'
        });
        _this.CustomerChangeAddVisible = false;
        _this.init()
      })
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
    //删除
    remove(){
      let _this = this
      let data = {
        id: _this.id,
      }
      let params = {
        "busicode": "ChangeUserDelete",
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
        _this.CustomerChangeAddVisible = false;
        _this.init()
      })
    },
    details(i,row) {
      this.id = row.id;
      this.userStatus = row.status;
      this.status = "updata";
      this.CustomerChangeAddVisible = true;
      // this.crumbsData.titleList.push({ title: '编辑', method: () => { window.histroy.back() } })
    },
    salesAdd(){
      this.id = '';
      this.status = 'add';
      this.userStatus = '';
      this.$store.state.isRemove = false;
      this.CustomerChangeAddVisible = true;
    //   this.chooseuserVisible = true;
      // this.crumbsData.titleList.push({ title: '添加', method: () => { window.histroy.back() } })
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
.CustomerChange {
  width: 100%;
  height: 100%;
}
</style>
