<template>
  <!-- 开户 -->
  <div class="OpenAccount">
    <!-- 弹出表单选择客户 -->
    <el-dialog :title="choosectmName" :visible.sync="choosectmVisible" :close-on-click-modal="false" class="addDialog" @close="closechoosectm">
      <choosectm ref="childWaterEditor"></choosectm>
      <div slot="footer" class="dialog-footer" ref="ruleForm">
        <el-button type="primary" size="mini" plain @click="submit">确 定</el-button>
        <el-button type="info" size="mini" plain @click="closechoosectm">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 弹出表单选择账户 -->
    <el-dialog :title="chooseAccountName" :visible.sync="chooseAccountVisible" :close-on-click-modal="false" class="addDialog" @close="closechoosectm">
      <chooseAccount ref="childWaterEditor"></chooseAccount>
      <div slot="footer" class="dialog-footer" ref="ruleForm">
        <el-button type="primary" size="mini" plain @click="submit">确 定</el-button>
        <el-button type="info" size="mini" plain @click="closechoosectm">取 消</el-button>
      </div>
    </el-dialog>

    <div v-if="indexShow" class='indexPage'>

      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right">
          <el-button icon="el-icon-plus" size="mini" type="primary" @click.native="add">添加</el-button>
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
              <el-select clearable v-model="tableQuery.status" placeholder="">
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

          <el-table-column type="index" label="NO." width="50" :index="indexMethod" fixed="left">
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

          <el-table-column prop="ctmName" min-width="100" label="客户名称">
          </el-table-column>

          <el-table-column prop="ctmAddr" min-width="150" label="客户地址">
          </el-table-column>

          <el-table-column label="操作" fixed="right" width="80">
            <template slot-scope="scope">
              <el-button type="text" @click.native="details(scope.$index, scope.row)">详情</el-button>
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

    <div v-else class='EditPage' style="height:100%">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right">
          <el-button icon="el-icon-delete" type="primary" size="mini" v-if="$store.state.isRemove == true" @click="open()">删除</el-button>
          <el-button type="primary" size="mini" @click="submit(status)">保 存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog('ruleForm')">返回</el-button>
        </div>
      </div>
      <OpenAccountEdit ref="childWarehousing" :tableEdit="tableEdit" :id="id" @chooseCtm="choosectm" @chooseAccount="chooseAccount"></OpenAccountEdit>
    </div>
  </div>
</template>
<script>
import OpenAccountEdit from './OpenAccountEdit'
import choosectm from "@/components/ctmInfor"
import chooseAccount from "@/components/accountInfo"
export default {
  name: "OpenAccount",
  components: {
    OpenAccountEdit,
    choosectm,
    chooseAccount
  },
  data() {
    return {
      id: "",//详情主键id
      status: 'add',//添加add 修改update
      chooseAccountName: "选择账户",
      chooseAccountVisible: false,
      choosectmName: "选择客户",
      choosectmVisible: false,
      tableEdit: false,
      activeName: 'EngineeringAccountOpening',
      indexShow: true,
      crumbsData: {  //面包屑
        titleList: [
          // { title: '业务管理', path: '/OpenAccount' },
          { title: '客户管理' },
          { title: '开户' },
        ],

      },
      pcsData:[],
      processStateData:this.common.processState(),
      billTime: [],//单据日期
      //审批状态下拉框
      tableQuery: {
        page: 1,
        pageCount: 20,
        beginDate: '',
        endDate: '',
        fuzzyQuery: "",
        status: '',
      },
      tableShow: false,
      maxHeight: 0,
      tableData: {
        list: [
          {
          },
        ]
      },
      TransferEditVisible: false,  //编辑的显示和隐藏
      WaterEditorName: '新开户',
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      DateChoosevalue: [],
    }
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, '.OpenAccount .kl-table', ['.OpenAccount .toolbar', '.OpenAccount .block', '.OpenAccount .bread-contain'])
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
      let params = {
        "busicode": "OpenUserList",
        "data": _this.tableQuery,
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.tableData = res;
        // _this.getDictionary()
      })
    },
    //  数据字典（查询框）
    getDictionary() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": 'PCS'
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.$set(_this, 'pcsData', res['PCS'])
      })
    },
    search() {  //查询
      // this.tableQuery.page = 1
      // this.tableQuery.pageCount = 20
      this.init()
    },
    //   导出
    exportExcel() {
    },
    indexMethod(index) {//获取表格序号
      return (this.tableQuery.pageCount - 20) * this.tableQuery.page + (index + 1);
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

    // 插入行
    InsertRows() {
      this.tableData.list.push({})
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
    },
    closeDialog() { //关闭会话
      this.TransferEditVisible = false;
      this.TransferDetailsVisible = false;
      this.indexShow = true;
      // this.crumbsData.titleList.pop();
      this.init()
    },
    //弹出框
    submit(type) {	//提交
      let _this = this;
      let saveData = this.$refs.childWarehousing.submit();
      let message = '';
      let params = {};
      let data = {};
      if (type == 'add') {
        params.busicode = 'OpenUserAdd';
        message = "添加成功";
      } else if (type == 'update') {
        data = {
          userOpenInfo: {
            billNo: '',
            billDate: '',
            id: '',
            userCtmTempId: '',
            userAccountTempId: '',
            userInfoTempId: '',
          }
        };
        params.busicode = 'OpenAccUpdate';
        data.userOpenInfo.id = saveData.userInfo.id;
        data.userOpenInfo.userCtmTempId = saveData.commonPartForm.userCtmTempId;
        data.userOpenInfo.userAccountTempId = saveData.commonPartForm.userAccountTempId;
        data.userOpenInfo.userInfoTempId = saveData.commonPartForm.userInfoTempId;
        data.userOpenInfo.billNo = saveData.commonPartForm.billNo;
        data.userOpenInfo.billDate = saveData.commonPartForm.billDate;
        data.updateAccountFlag = saveData.userInfo.updateAccountFlag;
        data.updateCtmFlag = saveData.userInfo.updateCtmFlag;
        message = "修改成功";
      }
      data.userInfo = saveData.userInfo.userInfo;
      data.ctmInfo = saveData.userInfo.ctmInfo;
      data.accountInfo = saveData.userInfo.accountInfo;
      params.data = data;

      _this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.$message({
          message,
          type: 'success'
        });
        _this.init()
        _this.indexShow = true;
      })
    },
    //添加
    add() {
      this.id = '';
      this.status = 'add';
      this.$store.state.isRemove = false;
      this.tableEdit = false;
      this.indexShow = false;
      // this.crumbsData.titleList.push({ title: '添加', method: () => { window.histroy.back() } })
    },
    // 编辑
    details(i, row) {
      this.status = 'update';
      this.tableEdit = true;
      this.id = row.id;
      // this.crumbsData.titleList.push({ title: '编辑', method: () => { window.histroy.back() } })
      this.indexShow = false;
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
    remove() {
      let _this = this;
      let saveData = this.$refs.childWarehousing.submit();
      let data = {
        id: saveData.userInfo.id,
      }
      let params = {
        "busicode": "OpenAccDelete",
        data,
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.$message({
          message: '删除成功',
          type: 'success'
        });
        _this.init()
        _this.indexShow = true;
      })
    },
    closechoosectm() {
      this.choosectmVisible = false;
      this.chooseAccountVisible = false;
    },
    choosectm() {
      this.choosectmVisible = true;
    },
    chooseAccount() {
      this.chooseAccountVisible = true;
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
