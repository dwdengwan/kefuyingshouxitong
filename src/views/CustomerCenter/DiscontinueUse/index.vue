<template>

  <div class="DiscontinueUse">

    <el-dialog class="qianfei" title="欠费明细" :close-on-click-modal="false" :visible.sync="DetailsArrearsShow" append-to-body>
      <DetailsArrears ref="detailsArrears" :formData="formData"></DetailsArrears>
    </el-dialog>

    <div v-if="waterEditVisible" class='waterEditVisible'>
      <div class="bread-contain waterEditVisible-top">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class='bread-contain-right'>
          <el-button type="primary" size="mini" @click="detailsArrears()">欠费明细</el-button>
          <el-button type="primary" size="mini" @click="submit()">保存</el-button>
          <el-button type="primary" size="mini" @click="remove()" v-if="removeShow">删除</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog" style="margin-right:1.5%;">返回</el-button>
        </div>
      </div>
      <div style="height: 100%;">
        <DisuseProcedureEdit ref="childWaterEditor" :DisuseProcedureData="DisuseProcedureData" class="waterEditVisible-buttom"></DisuseProcedureEdit>
      </div>
    </div>

    <div v-else class="DiscontinueUseCon">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <!-- <h2 class="tab-title">
                <i></i>
                停用记录</h2> -->
        <div class='bread-contain-right'>
          <!-- <el-button icon="" size="mini" type="primary">欠费停用</el-button> -->
          <el-button icon="el-icon-plus" @click="add" size="mini" type="primary">添加</el-button>
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
              <el-select clearable v-model="tableQuery.status" placeholder="未审批">
                <el-option v-for="(item,index) in approvalStatusOptions" :key="index" :label="item.name" :value="item.value"></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="拆表类型：">
              <el-select clearable v-model="tableQuery.splitMeterWay" placeholder="全部">
                <el-option v-for="(item,index) in mrmData" :key="index" :label="item.name" :value="item.value"></el-option>

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
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border @selection-change="handleSelectionChange" :data="tableData.list">

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

          <el-table-column prop="ctmName" min-width="100" label="客户名称">
          </el-table-column>

          <el-table-column prop="splitMeterFlag" min-width="80" :formatter="formatter" label="是否拆表">
          </el-table-column>

          <el-table-column prop="lastReadingNum" min-width="80" label="上期抄码">
          </el-table-column>

          <!-- <el-table-column prop="connect" min-width="80" label="拆表拆码">
          </el-table-column> -->

          <el-table-column prop="splitMeterRemark" min-width="120" show-overflow-tooltip label="备注">
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

import DisuseProcedureEdit from './DisuseProcedureEdit'
import chooseuser from "../Transfer/chooseuser"
import DetailsArrears from "@/components/DetailsArrears/index"//欠费明细
export default {
  name: "DiscontinueUse",
  components: {
    DisuseProcedureEdit,
    chooseuser,
    DetailsArrears
  },
  data() {
    return {
      removeShow:false,//删除按钮的显示与隐藏
      billTime:[],//单据日期
      status: 'add',//'add'新增 'update'修改
      multipleSelection: '',
      DetailsArrearsShow: false,
      crumbsData: {  //面包屑
        titleList: [
          { title: '客户管理' },
          { title: '停用' }
        ],

      },
      approvalStatusOptions: this.common.processState(),//审批状态下拉框
      //拆表类型
      mrmData:[],
      
      tableQuery: {
        page:'',
        pageCount:'',
        beginDate:'',
        endDate:'',
        status:'',
        fuzzyQuery:'',
        splitMeterWay:'',
      },
      formData: {
        userNo: '',
        id:'',
      },
      DisuseProcedureData:{
        userNo: '',
        id:'',
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
      waterEditVisible: false,  //综合查询的显示和隐藏
      waterEditVisibleAdd: false,
      WaterEditorName: '停用',
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
      if (this.billTime !== null && this.billTime.length !== 0) {
        this.tableQuery.beginDate = this.billTime[0];
        this.tableQuery.endDate = this.billTime[1];
      }
      let _this = this;
      let params = {
        busicode: "StopUserList",
        data:_this.tableQuery,
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.tableData = res;
        _this.getDictionary()
      })
    },
    //  数据字典（查询框）
    getDictionary() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": 'MRM'
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.$set(_this, 'mrmData', res['MRM'])
      })
    },

    formatter(row, column, cellValue, index){
      return row.splitMeterFlag == 1?'是':'否'
    },

    remove(){
      let _this = this;
      let message = '删除成功！';
      let params = {
        busicode:'StopUserDelete',
        data:{
          id:_this.DisuseProcedureData.id,
        }
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.$message({
          message,
          type: 'success'
        });
        _this.waterEditVisible = false;
        _this.init()
      })
    },

    //保存
    submit() {
      let _this = this;
      let data = this.$refs.childWaterEditor.submit()
      let message = '';
      console.log(data);
      let params = {
        busicode: '',
        data: {},
      };
      if (this.status == 'add') {
        params.busicode = 'StopUserAdd';
        message = '添加成功！';
      } else {
        params.busicode = 'StopUserUpdate';
        message = '修改成功！';
      }
      params.data = data;
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.$message({
          message,
          type: 'success'
        });
        _this.waterEditVisible = false;
        _this.init()
      })
    },

    // 欠费明细
    detailsArrears() {
      let userNo = '';
      if (this.DisuseProcedureData.id !== '') {
        userNo = this.DisuseProcedureData.userNo;
      }else{
        userNo = this.$refs.childWaterEditor.tableQuery.userNo;
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

    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    indexMethod(index) {//获取表格序号
      return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      // return (this.tableData.pageSize - 20) * this.tableData.pages + (index + 1);

    },
    closeDialog() { //关闭会话
      this.waterEditVisible = false;
      this.waterEditVisibleAdd = false;
      // this.crumbsData.titleList.pop();
      this.init()
    },
    // 编辑
    details(i,row) {
      this.status = 'update';
      this.DisuseProcedureData.id = row.id;
      this.DisuseProcedureData.userNo = row.userNo;
      if (row.status == '草稿') {
        this.removeShow = true;
      }else{
        this.removeShow = false;
      }
      this.waterEditVisible = true;
      // this.crumbsData.titleList.push({ title: '编辑', method: () => { window.histroy.back() } })
    },
    // 添加
    add() {
      this.status = 'add';
      this.waterEditVisible = true;
      // this.crumbsData.titleList.push({ title: '添加', method: () => { window.histroy.back() } })
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
.DiscontinueUse {
  width: 100%;
  height: 100%;
  .DiscontinueUseCon {
    width: 100%;
    height: 100%;
  }
  .waterEditVisible {
    height: 100%;
  }
}
</style>
