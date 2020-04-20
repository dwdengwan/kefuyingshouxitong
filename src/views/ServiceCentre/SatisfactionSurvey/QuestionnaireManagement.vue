

<template>
  <div class="InformationReleaseManagement">
    <el-dialog class="common-dialog" :title="PreviewQuestionnaireName" :close-on-click-modal="false" :visible.sync="PreviewQuestionnaireVisible">
      <PreviewQuestionnaire ref="PreviewQuestionnaire"></PreviewQuestionnaire>
    </el-dialog>

    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-if="EditVisible">
        <div v-if="divType=='1'">
          <el-button size="mini" type="primary" @click="PreviewQuestionnaire()">预览问卷</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
        <div v-else>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
      </div>
      <div class="bread-contain-right" v-else>
        <el-button size="mini" icon="el-icon-plus" @click="add('1')" type="primary">添加</el-button>
      </div>
    </div>

    <div v-if="EditVisible" style=" height: calc(100% - 41px);">
      <InformationReleaseManagementEdit v-if="divType=='1'" ref="childWarehousing"></InformationReleaseManagementEdit>
      <Findings v-else ref="childWarehousing"></Findings>
    </div>

    <div v-else>
      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">

          <el-form-item class="form-left">

            <el-form-item label='单据日期：'>
              <el-date-picker v-model="DateChoosevalue" type="daterange" value-format="yyyy-MM-dd" range-separator="至" :picker-options="pickerOptions" :clearable="true" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="状态：">
              <el-select clearable v-model="formData.watermeterWarehouse" placeholder="全部">
                <el-option v-for="(item,index) in approvalStatusOptions" :key="index" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
            </el-form-item>

          </el-form-item>
          <el-form-item class="form-right">
          </el-form-item>
        </el-form>
      </div>
      <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" class="change-tables-table">

          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="themeMu" min-width="150" label="主题"></el-table-column>

          <el-table-column prop="state" min-width="60" label="状态">
          </el-table-column>

          <el-table-column prop="engineeringState" min-width="100" label="进度">
          </el-table-column>

          <el-table-column prop="handleName" min-width="100" label="当前处理人">
          </el-table-column>

          <el-table-column prop="qusName" min-width="150" label="问卷主题">
          </el-table-column>

          <el-table-column prop="qusNum" min-width="80" label="选题数量">
          </el-table-column>

          <el-table-column prop="sDate" min-width="100" label="开始时间">
          </el-table-column>

          <el-table-column prop="eDate" min-width="100" label="结束时间">
          </el-table-column>

          <el-table-column prop="collectNums" min-width="80" label="收集数量">
          </el-table-column>

          <el-table-column class="cell" label="操作" fixed="right" width="230">
            <template slot-scope="scope">
              <el-button type="text" @click="add('1')">详情</el-button>
              <span  >|</span>
              <el-button type="text" class="noclick" @click="PreviewQuestionnaire">预览</el-button>
              <span  >|</span>
              <el-button type="text" class="noclick">图表统计</el-button>
              <span  >|</span>
              <el-button type="text" class="noclick" @click="add('2')">调查结果</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Findings from "./Findings";
import InformationReleaseManagementEdit from "./InformationReleaseManagementEdit";
import PreviewQuestionnaire from "./PreviewQuestionnaire";
export default {
  name: "InformationReleaseManagement",
  components: {
    Findings,
    InformationReleaseManagementEdit,
    PreviewQuestionnaire
  },
  data() {
    return {
      EditVisible: false, //弹出表单
      crumbsData: {
        //面包屑
        titleList: [{ title: "客户通知" }, { title: "满意度调查" }]
      },
      //审批状态下拉框
      approvalStatusOptions: [
        { value: "1", name: "全部" },
        { value: "2", name: "草稿" },
        { value: "3", name: "进行中" },
        { value: "4", name: "已办结" },
        { value: "5", name: "已废弃" }
      ],
      formData: {
        con: "",
        watermeterWarehouse: "1",
        waterMeterManufacturer: "",
        waterMeterManufacturerOptions: [],
        waterMeterType: "",
        waterMeterTypeOptions: [],
        waterMeterCaliber: "",
        waterMeterCaliberOptions: [],
        waterMeterStatus: "",
        waterMeterStatusOptions: [],
        subordinateDepartments: "",
        subordinateDepartmentsOptions: []
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
      histroyData: {},
      rules: {
        watermeterWarehouse: [
          { required: true, message: "请选择短语", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请输入用户编号", trigger: "blur" }]
      },
      InformationReleaseManagementVisible: false,
      InformationReleaseManagementName: "问卷管理-添加",
      PreviewQuestionnaireName: "预览问卷",
      PreviewQuestionnaireVisible: false,
      divType: "1"
    };
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, ".ShortMessageNotification .kl-table", [
      ".ShortMessageNotification .toolbar",
      ".ShortMessageNotification .block",
      ".ShortMessageNotification #crumbs"
    ]);
  },
  methods: {
    init() {
      this.histroyData = {
        areaId: "",
        endRow: 5,
        hasNextPage: false,
        hasPreviousPage: false,
        isFirstPage: true,
        isLastPage: true,
        list: [
          {
            lvalue: "已审批",
            qusName: "网上营业厅的便利程度",
            qusNum: "10",
            sDate: "2019-07-30",
            eDate: "2019-09-30",
            collectNums: "1000"
          },
          {
            lvalue: "经理审批",
            qusName: "微信营业厅的便利程度",
            qusNum: "10",
            sDate: "2019-07-30",
            eDate: "2019-09-30",
            collectNums: "1000"
          }
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
        total: 5
      };
    },
    handleClick(tab, event) {},
    demand() {
      //查询
      // this.tableQuery.page = 1
      // this.tableQuery.pageCount = 20
      this.init();
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
    //弹出框
    submit(formName) {
      //提交
      this.$refs.childInformationReleaseManagement.submit();
      // this.InformationReleaseManagementVisible = false;
    },

    add(val) {
      //添加
      this.divType = val;
      this.EditVisible = true;
      if (val == 1) {
        // this.$set(this.crumbsData.titleList, "3", { title: '添加', method: () => { window.histroy.back() } })
      } else {
        // this.$set(this.crumbsData.titleList, "3", { title: '调查结果', method: () => { window.histroy.back() } })
      }
    },
    edit() {
      // this.$set(this.crumbsData.titleList, "3", { title: '编辑', method: () => { window.histroy.back() } })
      this.EditVisible = true;
    },
    closeDialog() {
      //关闭会话
      // this.crumbsData.titleList.splice(3, 1);
      this.EditVisible = false;
    },
    // resultCheck(){

    // },
    // 删除行
    deleteRow(index, row) {
      this.$confirm("是否确认删除该行?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.histroyData.list.splice(index, 1);
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
    },
    // 预览问卷
    PreviewQuestionnaire() {
      this.PreviewQuestionnaireVisible = true;
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
.InformationReleaseManagement {
  width: 100%;
}
</style>