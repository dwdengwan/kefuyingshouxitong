
<template>
  <div class="multiplexing">
    <!-- 弹出表单选择用户 -->
    	<el-dialog :title="chooseuserName" :visible.sync="chooseuserVisible" :close-on-click-modal="false" class="addDialog" @close="closeChooseuser">
            <chooseuser
                ref="childWaterEditor" 
                
            ></chooseuser>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain>确 定</el-button>
		      <el-button type="info" size="mini" plain @click="closeChooseuser">取 消</el-button>
		    </div>
    	</el-dialog>
    <span v-if="multiplexingVisible">
      <div class="multiplexing">
        <div class="bread-contain">
          <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
          <div class='bread-contain-right'>
            <!-- <el-button type="primary" size="mini">上传附件</el-button> -->
            <!-- <el-button type="primary" size="mini" @click="submit('ruleForm');">保 存</el-button> -->
            <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog('ruleForm')">返回</el-button>
          </div>
        </div>
        <multiplexingAdd ref="childmultiplexing"></multiplexingAdd>
      </div>
    </span>

    <span v-if="multiplexingAddVisible">
      <div class="multiplexing">
        <div class="bread-contain">
          <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
          <div class='bread-contain-right'>
            <!-- <el-button type="primary" size="mini">上传附件</el-button> -->
            <el-button type="primary" size="mini" @click="submit();">保 存</el-button>
            <el-button type="primary" size="mini" v-if="$store.state.isRemove == true"  @click="open()">删除</el-button>
            <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog('ruleForm')">返回</el-button>
          </div>
        </div>
        <multiplexingAdd ref="childmultiplexing" :multiplexingAddData="multiplexingAddData"></multiplexingAdd>
      </div>
    </span>

    <span v-if="!multiplexingVisible && !multiplexingAddVisible">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <!-- <h2 class="tab-title">
            <i></i>
            复用</h2> -->
        <div class="bread-contain-right">
          <el-button icon="el-icon-plus" size="mini" @click="multAdd" type="primary">添加</el-button>
          <!-- <el-button @click="exportExcel" icon="el-icon-upload2" size="mini" type="primary">导出</el-button> -->
        </div>
      </div>
      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="tableQuery" class="demo-form-inline">
          <el-form-item >

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

          <!-- <el-form-item class="form-right">
                    <el-button icon="el-icon-plus" size="mini" type="primary">添加</el-button>
                    <el-button @click="exportExcel" icon="el-icon-upload2" size="mini" type="primary">导出</el-button>
                </el-form-item> -->
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

          <el-table-column prop="ctmName" min-width="80" label="用户名称">
          </el-table-column>

          <el-table-column prop="reuseMeterFlag" :formatter="formatter" min-width="80" label="是否复表">
          </el-table-column>

          <!-- <el-table-column prop="flux" min-width="80" label="起始抄码">
          </el-table-column> -->

          <el-table-column prop="comments" min-width="80" show-overflow-tooltip label="复用说明">
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
    </span>

  </div>
</template>
<script>
import multiplexingAdd from './multiplexingAdd'
import chooseuser from "../Transfer/chooseuser"
export default {
  name: "multiplexing",
  components: {
    multiplexingAdd,
    chooseuser
  },
  data() {
    return {
      status:'add',//add新增 updata修改
      multiplexingAddData:{
        id:'',
      },
      chooseuserName:"选择用户",
      chooseuserVisible:false,
      multiplexingAddVisible: false,
      crumbsData: {  //面包屑
        titleList: [
          { title: '客户管理' },
          { title: '复用' }
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
      billTime: [],
      tableShow: false,
      maxHeight: 0,
      tableData: {},
      multiplexingVisible: false,  //综合查询的显示和隐藏
      multiplexingName: '复用办理',
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
        "busicode": "ReuseUserList",
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
      let saveData = this.$refs['childmultiplexing'].submit()
      console.log(saveData);
      let data = {
        id: _this.multiplexingAddData.id,
      }
      let params = {
        "busicode": "ReuseUserDelete",
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
        _this.multiplexingAddVisible = false;
        _this.init()
      })
    },
    formatter(row, column, cellValue, index){
      return row.reuseMeterFlag == '1'?'是':'否'
    },
    //   导出
    exportExcel() {
      //   	let listData = {}
      //   	this.tableQuery.pageCount = this.historyData.total ===0? 20:this.historyData.total
      //     let params ={
      //       "busicode":"MeterReadingList",
      //       "data": this.tableQuery
      //     }
      //     this.$api.fetch({
      //       apiUrl: 'interface.api',//路径
      //       method: 'post',//请求方法
      //       params:params,//参数
      //       needErrorCallback:true
      //     }).then(res =>{
      //     	if(res.code===0){
      //         listData = res.data
      //         if (!listData.list[0]) {
      //         		this.$notify({
      //               title: '警告',
      //               message:'表格没有相关数据',
      //               type: 'error'
      //             })
      //         	} else {
      //         		import('@/vendor/Export2Excel').then(excel => {
      // 			        const tHeader = ['水表编号', '抄表日期', '所属小区','厂家编号','厂家','型号', '当日读数', '修正读数', '当日水量', '数据状态',  '用户编号','集中器编号','用户地址']
      // 			        const filterVal = ['code', 'daytime', 'areaName','fcode','factoryName','model','lvalue', 'fixValue','flux', 'status', 'usn', 'concentrator', 'position']
      // 			        const list = listData.list
      // 			        const data = this.formatJson(filterVal, list)
      // 			        excel.export_json_to_excel({
      // 			          header: tHeader,
      // 			          data,
      // 			          filename: this.tableQuery.daytime + '抄表数据',
      // 			          autoWidth: '100'
      // 			        })
      // 			      })
      //         		this.tableQuery.pageCount = 20
      //         	}
      //       }
      //     })
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
      return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      // return (this.tableData.pageSize - 20) * this.tableData.pages + (index + 1);

    },
    closeDialog() { //关闭会话
      // this.crumbsData.titleList.pop();
      this.multiplexingVisible = false;
      this.backfillVisible = false;
      this.multiplexingAddVisible = false;
      this.init()
    },
    closeChooseuser(){
      this.chooseuserVisible = false;
    },
    //提交
    submit() {
      let _this = this
      let data = this.$refs['childmultiplexing'].submit()
      let params = {};
      let message = '';
      if (this.status == 'add') {
        params.busicode = "ReuseUserAdd";
        params.data = data;
        message = '新增成功！';
      }else{
        params.busicode = "ReuseUserUpdate";
        data.id = _this.multiplexingAddData.id;
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
        _this.multiplexingAddVisible = false;
        _this.init()
      })
    },
    details(i,row) {
      this.multiplexingAddData.id = row.id;
      this.status = 'updata';
      // this.multiplexingVisible = true;
      this.multiplexingAddVisible = true;
      // this.crumbsData.titleList.push({ title: '编辑', method: () => { window.histroy.back() } })
    },
    multAdd(){
      this.multiplexingAddData.id = '';
      this.status = 'add';
      this.$store.state.isRemove = false;
      this.multiplexingAddVisible = true;
      // this.chooseuserVisible = true;
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
.multiplexing {
  width: 100%;
  height: 100%;

}
</style>
