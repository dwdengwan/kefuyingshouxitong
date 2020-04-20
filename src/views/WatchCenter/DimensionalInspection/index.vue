<template>
  <div class="DimensionalInspection">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-if="waterAddVisible">
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
      <div class="bread-contain-right" v-if="InspectionExamineVisible">
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
      <div class="bread-contain-right" v-show="DimensionalInspectionShow">
        <el-button icon="el-icon-plus" @click="add('add')" size="mini" type="primary">添加</el-button>
      </div>
    </div>
    <!-- 添加/修改 -->
    <DimensionalInspectionEdit v-if="waterAddVisible" ref="DimensionalInspectionEdit" :tableEdit="tableEdit"></DimensionalInspectionEdit>
    <!-- 详情 -->
    <DimensionalInspectionHandle ref="DimensionalInspectionHandle" :DimensionalInspectionHandleNeedData='DimensionalInspectionHandleNeedData' v-if="InspectionExamineVisible"></DimensionalInspectionHandle>

    <section v-show="DimensionalInspectionShow" class="DimensionalInspectionCon">
      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
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

            <el-form-item label="模糊查询：" class="searchInput">
              <el-tooltip class="item" effect="dark" content="水表编号、合格证号、户号" placement="top">
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
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="tableData.list" @cell-click="cellClick" class="DimensionalInspection-table">

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

          <el-table-column prop="meterNo" min-width="100" label="水表编号">
          </el-table-column>

          <el-table-column prop="calibrationResult" min-width="100" label="维检类型">
          </el-table-column>

          <el-table-column prop="repairDate" min-width="80" label="维修日期">
          </el-table-column>

          <el-table-column prop="repairResult" min-width="80" label="维修结果">
          </el-table-column>

          <el-table-column label="操作" fixed="right" width="80">
            <template slot-scope="scope">
              <el-button type="text" @click="details(scope.row)">详情</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
          </el-pagination>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import DimensionalInspectionEdit from "./DimensionalInspectionEdit";
import DimensionalInspectionHandle from "./DimensionalInspectionHandle";
// .vue
export default {
  name: "DimensionalInspection",
  components: {
    DimensionalInspectionEdit,
    DimensionalInspectionHandle
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
      // 详情页面所需数据
      DimensionalInspectionHandleNeedData: {},



      crumbsData: {
        //面包屑
        titleList: [{ title: "表计管理" }, { title: "维检" }]
      },
      formData: {
        con: "",
        watermeterWarehouse: "",
        watermeterWarehouseOptions: [
          {
            name: "15",
            value: "1"
          },
          {
            name: "20",
            value: "1"
          },
          {
            name: "25",
            value: "1"
          },
          {
            name: "40",
            value: "1"
          },
          {
            name: "200",
            value: "1"
          }
        ],
        waterMeterManufacturer: "1",
        waterMeterManufacturerOptions: [
          {
            name: "宁波",
            value: "1"
          },
          {
            name: "上海",
            value: "1"
          },
          {
            name: "梅花",
            value: "1"
          },
          {
            name: "常德",
            value: "1"
          },
          {
            name: "开封",
            value: "1"
          }
        ],
        waterMeterType: "",
        waterMeterCaliber: "",
        waterMeterStatus: "",
        waterMeterStatusOptions: [],
        subordinateDepartments: "",
        subordinateDepartmentsOptions: []
      },
      tableShow: false,
      maxHeight: 0,
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      DateChoosevalue: [],
      waterAddVisible: false, //添加弹窗的显示和隐藏
      WaterEditorName: "维检-添加",
      DimensionalInspectionShow: true,
      InspectionExamineVisible: false,
      tableEdit: true
    };
  },
  mounted() {
    this.init()
    this.getDictionary()
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, ".DimensionalInspection", [
      ".DimensionalInspection .toolbar",
      ".DimensionalInspection .block",
      ".DimensionalInspection #crumbs"
    ]);
  },
  methods: {
    // 列表初始化
    init() {
      var _this = this
      var params = {
        "busicode": "MsRepairList",
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
    // 查询按钮
    search() {
      this.tableQuery.page = 1;
      this.init();
    },
    // 详情
    details(row) {
      console.log(row);
      this.DimensionalInspectionHandleNeedData = row
      this.InspectionExamineVisible = true
      this.DimensionalInspectionShow = false
    },
















    
    // 添加
    add(val) {
      this.waterAddVisible = true;
      this.DimensionalInspectionShow = false;
      if (val === "add") {
        this.tableEdit = false;
        // this.$set(this.crumbsData.titleList,"2",{title:'添加',method:()=>{window.histroy.back()}});
      } else {
        if (val === "详情") {
          this.tableEdit = true;
          // this.$set(this.crumbsData.titleList, "2", { title: '详情', method: () => { window.histroy.back() } })
        } else {
          this.tableEdit = false;
          // this.$set(this.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } })
        }
      }
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
        (this.tableData.pageSize - 20) * this.tableData.pages + (index + 1)
      );
    },
    closeDialog() {
      //关闭会话
      this.waterAddVisible = false;
      this.backfillVisible = false;
      this.InspectionExamineVisible = false;
      this.DetailsOfTableChangeVisible = false;
      this.DimensionalInspectionShow = true;
      // this.crumbsData.titleList.splice(2,1);
      this.init();
    },
    //弹出框
    submit(formName) {
      //提交
      this.$refs.childWaterEditor.submit();
      // this.waterAddVisible = false;
    },
    
    backfillSubmit() {},

    // 删除行
    deleteRow(index, row) {
      this.$confirm("是否确认删除该行?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.list.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
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
//  @import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.DimensionalInspection {
  width: 100%;
  height: 100%;
}
</style>
