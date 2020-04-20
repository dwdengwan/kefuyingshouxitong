<template>
  <div class="ComparisonTable">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-if="backfillVisible">
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
      <div class="bread-contain-right" v-if="waterAddVisible">
        <el-button size="mini" type="primary" @click="save">暂存</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
      <div class="bread-contain-right" v-if="ComparisonTableShow">
        <el-button icon="el-icon-plus" @click="add" size="mini" type="primary">添加</el-button>
      </div>
    </div>
    <!-- 详情 -->
    <ComparisonTableHandle v-if="backfillVisible" :ComparisonTableHandleNeedData='ComparisonTableHandleNeedData' ref="ComparisonTableHandle"></ComparisonTableHandle>

    <!-- 添加 -->

    <ComparisonTableEdit v-if="waterAddVisible" ref="ComparisonTableEdit"></ComparisonTableEdit>

    <section v-show="ComparisonTableShow">
      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="tableQuery" class="demo-form-inline">
          <el-form-item class="form-left">

            <el-form-item label='单据日期：'>
              <el-date-picker v-model="tableTime" @change="getDatePicker" type="daterange" value-format="yyyy-MM-dd" range-separator="至" :picker-options="pickerOptions" :clearable="true" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="状态：">
              <el-select clearable v-model="tableQuery.processState" placeholder="状态">
                <el-option v-for="item in processStateData" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="水表类型：">
              <el-select clearable v-model="tableQuery.meterType" placeholder="水表类型">
                <el-option v-for="item in dictionaryData.MMT" :key="item.id" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="模糊查询：" class="width-200">
              <el-tooltip class="item" effect="dark" content="用户编号、水表编号" placement="top">
                <el-input v-model="tableQuery.fuzzyQuery"></el-input>
              </el-tooltip>
            </el-form-item>

            <el-form-item>
              <el-button class='searchBtn' @click="search" icon="el-icon-search"></el-button>
            </el-form-item>

          </el-form-item>

          <el-form-item class="form-right">

          </el-form-item>
        </el-form>
      </div>
      <div class="kl-table">
        <el-table stripe border :data="tableData.list" @cell-click="cellClick" class="ComparisonTable-table">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="processStateName" min-width="60" label="状态">
          </el-table-column>

          <el-table-column prop="nodeName" min-width="100" label="进度">
          </el-table-column>

          <el-table-column prop="operator" min-width="100" label="当前处理人">
          </el-table-column>

          <el-table-column prop="billNo" min-width="100" label="单据编号">
          </el-table-column>

          <el-table-column prop="billDate" min-width="100" label="单据日期">
          </el-table-column>

          <el-table-column prop="userNo" min-width="80" label="用户编号">
          </el-table-column>

          <el-table-column prop="ctmName" min-width="80" label="客户名称">
          </el-table-column>

          <el-table-column prop="checkResult" min-width="80" label="校核结果">
          </el-table-column>

          <el-table-column label="操作" fixed="right" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="details(scope.row)" class="noclick">详情</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import ComparisonTableEdit from "./ComparisonTableEdit";
import ComparisonTableHandle from "./ComparisonTableHandle";
export default {
  name: "ComparisonTable",
  components: {
    ComparisonTableEdit,
    ComparisonTableHandle
  },
  data() {
    return {
      //查询条件对象
      tableQuery: {
        page: 1,
        pageCount: 20,
      },
      // 列表数据
      tableData: [],
      // 数据字典数据
      dictionaryData: {},
      // 状态下拉框数据
      processStateData: this.common.processState(),
      // 单据日期数组
      tableTime: [],
      // 详情页所需数据
      ComparisonTableHandleNeedData: {},




      crumbsData: {
        //面包屑
        titleList: [{ title: "表计管理" }, { title: "用户复核" }]
      },
      tableShow: false,
      maxHeight: 0,
      histroyData: {},
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      DateChoosevalue: [],
      waterAddVisible: false, //添加弹窗的显示和隐藏
      WaterEditorName: "校表-添加",
      ruleFormData: {},
      backfillName: "校表-审批",
      backfillVisible: false,
      ComparisonTableShow: true
    };
  },
  mounted() {
    this.init()
    this.getDictionary()
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    //this.common.changeTable(this, '.ComparisonTable', ['.ComparisonTable .toolbar', '.ComparisonTable .block', '.ComparisonTable #crumbs'])
  },
  methods: {
    // 列表初始化
    init() {
      var _this = this
      var params = {
        "busicode": "MsVeriList",
        "data": this.tableQuery
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.tableData = res
      })
    },
    // 数据字典（查询框）
    getDictionary() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": "MMT"// 换表类型
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.dictionaryData = res
      })
    },
    // 获取日期框数据
    getDatePicker(date) {
      console.log(date);
      if (date !== undefined && date !== null) {
        this.tableQuery.beginDate = date[0]
        this.tableQuery.endDate = date[1]
      } else {
        this.tableQuery.beginDate = ''
        this.tableQuery.endDate = ''
      }
    },
    // 查询
    search() {
      this.tableQuery.page = 1;
      this.init();
    },
    // 添加
    add() {
      this.waterAddVisible = true
      this.ComparisonTableShow = false
    },
    // 添加-暂存
    save() {
      var _this = this
      this.$refs.ComparisonTableEdit.save()
    },
    // 详情
    details(row) {
      this.ComparisonTableHandleNeedData = row
      console.log(this.ComparisonTableHandleNeedData)
      this.backfillVisible = true;
      this.ComparisonTableShow = false;
    },








    
    //分页
    handleSizeChange(val) {
      //显示多少数据一页
      // this.tableQuery.pageCount = val
      // this.tableQuery.page = 1
      this.init();
    },
    handleCurrentChange(val) {
      //显示多少页码
      // this.tableQuery.page = val
      this.init();
    },
    cellClick(row, column, cell, event) {
      //点击文件名
      let that = this;
    },
    indexMethod(index) {
      //获取表格序号
      //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      return (
        (this.histroyData.pageSize - 20) * this.histroyData.pages + (index + 1)
      );
    },
    closeDialog() {
      //关闭会话
      this.waterAddVisible = false;
      this.backfillVisible = false;
      this.DetailedEnquiriesVisible = false;
      this.DetailsOfTableChangeVisible = false;
      this.ComparisonTableShow = true;
      // this.crumbsData.titleList.splice(2,1);

      this.init();
    },
    //弹出框
    submit(formName) {
      //提交
      this.$refs.childWaterEditor.submit();
      // this.waterAddVisible = false;
    },
    
    backfillSubmit() { }
  },
  watch: {
    maxHeight() {
      this.tableShow = false;
      this.$nextTick(() => {
        this.tableShow = true;
      });
    }
  }
};
</script>
<style lang="scss">
// @import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.ComparisonTable {
  width: 100%;
  height: 100%;
}
</style>
