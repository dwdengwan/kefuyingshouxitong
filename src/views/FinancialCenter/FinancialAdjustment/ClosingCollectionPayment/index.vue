<template>
  <!-- 代收支付关闭 模块 -->
  <div class="ClosingCollectionPayment">
        <div class="bread-contain">
            <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
            <div class="bread-contain-right">
                <font v-if='indexShow==true'>
                    <el-button type="primary" size="mini" icon="el-icon-plus"  @click="add">添加</el-button>
                </font>
                <font v-else>
                    <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog"  >返回</el-button>
                </font>
            </div>
        </div>

    <ClosingCollectionPaymentEdit v-if='indexShow==false' ref="childWarehousing" :tableEdit="tableEdit" @chooseCtm="choosectm" @chooseAccount="chooseAccount"></ClosingCollectionPaymentEdit>


    <div v-else class='indexPage'>

      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="tableQuery" class="demo-form-inline">

          <el-form-item class="form-left">
            <el-form-item label='单据日期：'>
                <el-date-picker
                    v-model="tableQuery.billTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="状态：">
              <el-select clearable v-model="tableQuery.status" placeholder="">
                <el-option v-for="(item,index) in approvalStatusOptions" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="模糊查询：" class="searchInput">
              <el-tooltip class="item" effect="dark" content="单据编号、册本号、用户编号、用户名称" placement="top">
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
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="tableList.list" class="change-tables-table">

            <el-table-column type="index" label="NO." width="50" fixed="left">
            </el-table-column>

            <el-table-column prop="state" min-width="60" label="状态">
            </el-table-column>

            <el-table-column prop="engineeringState" min-width="100" label="进度">
            </el-table-column>

            <el-table-column prop="handleName" min-width="100" label="当前处理人">
            </el-table-column>

            <el-table-column prop="connect3" min-width="100" label="单据编号">
            </el-table-column>

            <el-table-column prop="connect2" min-width="100" label="单据时间">
            </el-table-column>
            
            <el-table-column prop="connect1" min-width="60" label="开始时间">
            </el-table-column>

            <el-table-column prop="engineeringState" min-width="100" label="结束日期">
            </el-table-column>

            <el-table-column prop="connect4" min-width="100" label="说明">
            </el-table-column>


        <el-table-column label="操作" fixed="right" width="80">
        <template slot-scope="scope">
            <el-button type="text" @click.native="edit(scope.$index, scope.row)">详情</el-button>
        </template>
        </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="tableList.total">
          </el-pagination>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import ClosingCollectionPaymentEdit from './ClosingCollectionPaymentEdit'
export default {
  name: "ClosingCollectionPayment",
  components: {
    ClosingCollectionPaymentEdit,
  },
  data() {
    return {
      tableEdit: false,
      activeName: 'EngineeringAccountOpening',
      indexShow: true,
      crumbsData: {  //面包屑
        titleList: [
          { title: '收费管理' },
          { title: '账务调整' },
          { title: '代收支付关闭' },
        ],
      },
      //审批状态下拉框
      approvalStatusOptions: [
        { value: '1', label: '全部' },
        { value: '2', label: '正常' },
        { value: '3', label: '非正常' },
      ],
      tableQuery: {
        page:1,
        pageCount:20,
        // beginDate:billTime[0],
        // endDate:billTime[1],
        fuzzyQuery: "",
        status: '1',
        billTime:'',
      },
      tableShow: false,
      maxHeight: 0,
      tableList: {
        list: [
          {
          },
        ]
      },
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
    }
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, '.ClosingCollectionPayment .kl-table', ['.ClosingCollectionPayment .toolbar', '.ClosingCollectionPayment .block', '.ClosingCollectionPayment .bread-contain'])
  },
  methods: {
    init() {
      let _this = this
      let params = {
        "busicode": "OpenUserList",
        "data": _this.tableQuery,
      }
    },
    search() {  //查询
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
    //   开户
    add() {
      this.indexShow = false;
    },

    closeDialog() { //关闭会话
      this.TransferDetailsVisible = false;
      this.indexShow = true;
      // this.crumbsData.titleList.pop();
      this.init()
    },
    //弹出框
    submit(formName) {	//提交
      this.$refs.childWaterEditor.submit()
    },
    // 编辑
    edit(val) {
      this.indexShow = false;
    },
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
.ClosingCollectionPayment {
  width: 100%;
  height: 100%;
}
</style>
