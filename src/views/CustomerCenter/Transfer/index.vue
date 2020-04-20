<template>
  <div class="Transfer">

    <el-dialog title="欠费明细" :close-on-click-modal="false" :visible.sync="DetailsArrearsShow" append-to-body>
      <DetailsArrears ref="detailsArrears" :formData="formData"></DetailsArrears>
    </el-dialog>

    <div v-if="TransferEditVisible" style="height:100%">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right">
          <el-button icon="el-icon-delete" type="primary" size="mini" v-if="deleteShow" @click='remove()'>删除</el-button>
          <el-button type="primary" size="mini" @click="detailsArrears()" v-if="arrearsShow">欠费明细</el-button>
          <el-button type="primary" size="mini" @click="submit();">保 存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog('ruleForm')">返回</el-button>
        </div>
      </div>
      <TransferEdit ref="childWaterEditor" :formData="formData"></TransferEdit>
    </div>

    <div class="TransferIndex" v-else>
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <!-- <h2 class="tab-title">
            <i></i>
            过户记录</h2> -->
        <div class="bread-contain-right">
          <el-button icon="el-icon-plus" size="mini" type="primary" @click="add">添加</el-button>
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
                <el-option v-for="(item,index) in processStateData" :key="index" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模糊查询：" class="searchInput">
              <el-tooltip class="item" effect="dark" content="单据编号、用户编号、用户名称、受理人" placement="top">
                <el-input v-model="tableQuery.fuzzyQuery" clearable size="mini"></el-input>
              </el-tooltip>
            </el-form-item>

            <el-form-item>

              <el-button class="searchBtn" icon="el-icon-search" @click="search"></el-button>
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

          <el-table-column prop="userNo" min-width="100" label="用户编号">
          </el-table-column>

          <el-table-column prop="changeItems" min-width="100" label="变更事项">
          </el-table-column>

          <el-table-column prop="flux" min-width="60" label="操作" fixed="right">
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
import TransferEdit from './TransferEdit'
import DetailsArrears from "@/components/DetailsArrears/index"//欠费明细
export default {
  name: "Transfer",
  components: {
    TransferEdit,
    DetailsArrears
  },
  data() {
    return {
      formData:{
        id:'',
        userNo:'',
      },
      DetailsArrearsShow:false,
      deleteShow:false,//只有草稿状态 删除按钮才显示
      arrearsShow: false,
      TransferEditVisible: false,
      crumbsData: {  //面包屑
        titleList: [
          { title: '客户管理' },
          { title: '过户' }
        ],

      },

      status:'add',//增加add 修改update
      processStateData: this.common.processState(),//审批状态下拉框
      billTime: [],//单据日期
      tableQuery: {
        page: 1,
        pageCount: 20,
        beginDate: '',
        endDate: '',
        fuzzyQuery: "",
        status: '',
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
      tableData: {},
      TransferEditVisible: false,  //编辑的显示和隐藏
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
      if (!_this.billTime ) {
        _this.tableQuery.beginDate = '';
        _this.tableQuery.endDate = '';
      } else {
        _this.tableQuery.beginDate = _this.billTime[0];
        _this.tableQuery.endDate = _this.billTime[1];
      }
      console.log(_this.tableQuery);
      let params = {
        "busicode": "TransferUserList",
        "data": _this.tableQuery,
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.tableData = res;
        // _this.getDictionary()
      })
    },
    hidden() {
      if (this.isActive == true) {
        $('.upchange').addClass('el-icon-arrow-down').removeClass('el-icon-arrow-up')
        this.isActive = false;
        $('.el-table--fit').css('height', '66%');

      } else {
        $('.upchange').addClass('el-icon-arrow-up').removeClass('el-icon-arrow-down')

        this.isActive = true;
        $('.el-table--fit').css('height', '50%');
      }
    },
    search() {  //查询
      // this.tableQuery.page = 1
      // this.tableQuery.pageCount = 20
      this.init()
    },
    // 欠费明细
    detailsArrears(){
      this.DetailsArrearsShow = true;
      this.$refs['detailsArrears'].init();
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
    //   查看历史
    viewHistory(index, row) {

    },
    cellClick(row, column, cell, event) { //点击文件名
      let that = this;

    },
    indexMethod(index) {//获取表格序号
      return (this.tableQuery.page - 1) * this.tableQuery.pageCount + (index + 1);
    },
    closeDialog() { //关闭会话
      this.TransferEditVisible = false;

      this.init()
    },
    //弹出框
    submit() {	//提交
      let _this = this;
      let message="";
      let params = {
        busicode:'',
        data:{}
      };
      let data = {};
      data = this.$refs.childWaterEditor.submit();
      if(_this.status == 'add'){
        params.busicode = 'TransferUserAdd';
        message = "添加成功";
        console.log(params);
      }else if(_this.status == 'update'){
        params.busicode = 'TransferUserUpdate';
        message = "修改成功";
      }
      params.data.userInfo = data.userInfo;
      params.data.accountInfo = data.accountInfo;
      params.data.ctmInfo = data.ctmInfo;
      params.data.userTransferInfo = data.TransferEditForm;
      // let params = {
      //   "busicode": "TransferUserList",
      //   "data": _this.tableQuery,
      // }

      _this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.$message({
          message,
          type: 'success'
        });
        _this.init()
        _this.TransferEditVisible = false;
      })
    },
    // 编辑
    details(i,row) {
      console.log(row);
      this.status = 'update';
      this.formData.id = row.id;
      this.arrearsShow = true;
      this.formData.userNo = row.userNo;
      if(row.status == '草稿'){
        this.deleteShow = true;
      }
      this.TransferEditVisible = true;
    },
    // 添加
    add() {
      this.status = 'add';
      this.formData.id = '';
      this.arrearsShow = false;
      this.deleteShow = false;
      this.TransferEditVisible = true;
    },
    //
    remove(){
      let _this = this;
      let message = '删除成功！';
      let data ={
        id:this.formData.id,
      }
      let params = {
        "busicode": "TransferUserDelete",
        data
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.$message({
          message,
          type: 'success'
        });
        _this.init()
        _this.TransferEditVisible = false;
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
.Transfer {
  width: 100%;
  height: 100%;
  .TransferIndex {
    width: 100%;
    height: 100%;
  }
}
</style>
