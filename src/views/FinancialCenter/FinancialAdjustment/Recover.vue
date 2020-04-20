
<template>

  <div class="Recover">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-if="RecoverVisible">
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
      <div class="bread-contain-right" v-else>
        <el-button icon="el-icon-plus" size="mini" @click="add" type="primary">添加</el-button>
      </div>
    </div>
    <div class="indexContent" v-if="RecoverVisible">
      <RecoverEdit ref="childRecover"></RecoverEdit>
    </div>
    <div class="indexContent" v-else>
      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">

          <el-form-item class="form-left">

            <el-form-item label="状态：">
              <el-select clearable v-model="formData.waterMeterManufacturer" placeholder="未审">
                <el-option v-for="(item,index) in approvalStatusOptions" :key="index" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="账期：">
              <el-date-picker v-model="beginYearM" size="mini" type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="选择月" style="width:100%;">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="模糊查询：" class="width-200">
              <el-input v-model="formData.con" placeholder="用户编号/用户名称/用户地址"></el-input>
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

          <el-table-column prop="state" min-width="60" label="状态">
          </el-table-column>

          <el-table-column prop="engineeringState" min-width="100" label="进度">
          </el-table-column>

          <el-table-column prop="handleName" min-width="100" label="当前处理人">
          </el-table-column>

          <el-table-column prop="concentrator1" min-width="100" label="单据编号">

          </el-table-column>

          <el-table-column prop="concentrator1" min-width="100" label="单据时间">

          </el-table-column>

          <el-table-column prop="concentrator" min-width="100" label="用户编号">

          </el-table-column>

          <el-table-column prop="factoryName" min-width="100" label="用户名称">
          </el-table-column>

          <el-table-column prop="daytime" min-width="80" label="追缴账期">
          </el-table-column>

          <el-table-column prop="flux" min-width="80" label="追缴水量">
          </el-table-column>

          <el-table-column prop="model" min-width="80" label="总金额">
          </el-table-column>

          <el-table-column class="cell" label="操作" fixed="right" width="80">
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="add(scope.$index, scope.row)">编辑</el-button>
              <span  >|</span> -->
              <el-button type="text" class="noclick">详情</el-button>
              <!-- <span  >|</span>
              <el-button size="mini" type="text">审批</el-button>
              <span  >|</span>
              <el-button type="text" class="noclick" @click="deleteRow(scope.$index, scope.row)">删除</el-button> -->

            </template>
          </el-table-column>

        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import RecoverEdit from "./RecoverEdit";
export default {
  name: "Recover",
  components: {
    RecoverEdit
  },
  data() {
    return {
      beginYearM: "",
      crumbsData: {
        //面包屑
        titleList: [
          { title: "收费管理" },
          { title: "账务调整" },
          { title: "举报罚款" }
        ]
      },
      formData: {
        con: "",
        watermeterWarehouse: "",
        watermeterWarehouseOptions: [
          // {
          //     name:"全部",
          //     value:"1"
          // },
          {
            name: "是",
            value: "2"
          },
          {
            name: "否",
            value: "3"
          }
        ],
        waterMeterManufacturer: "1",
        waterMeterType: "",
        waterMeterTypeOptions: [],
        waterMeterCaliber: "",
        waterMeterCaliberOptions: [],
        waterMeterStatus: "",
        waterMeterStatusOptions: [],
        subordinateDepartments: "",
        subordinateDepartmentsOptions: []
      },
      //审批状态下拉框
      approvalStatusOptions: [
        { value: "1", name: "全部" },
        { value: "2", name: "草稿" },
        { value: "3", name: "进行中" },
        { value: "4", name: "已办结" },
        { value: "5", name: "已废弃" }
      ],
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
      RecoverVisible: false, //综合查询的显示和隐藏
      RecoverName: "费用调整-增加",
      ruleFormData: {}
    };
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, ".Recover", [
      ".Recover .toolbar",
      ".Recover .block",
      ".Recover #crumbs"
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
            areaId: null,
            areaName: "未审批",
            code: "NN903",
            concentrator: "NN191-126-00",
            connect: null,
            daytime: "201807",
            endTime: null,
            factoryName: "园林管理处",
            fcode: null,
            fix: false,
            fixValue: "东山桥侧珍珠花园",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "189.42",
            lvalue: "107.80",
            meter: "10.05",
            model: "457.72",
            modifyBy: null,
            modifyTime: null,
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "20180709",
            woker: "张三",
            protocolName: null,
            rowNumber: 0,
            sensorModel: null,
            sn: null,
            status: "未上传",
            totalPage: 0,
            type: 5,
            unusual: null,
            usn: "00",
            waterGroup: null,
            businessBranch: "-",
            useWaterType: "居民用水",
            costName: "-"
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

    demand() {
      //查询
      // this.tableQuery.page = 1
      // this.tableQuery.pageCount = 20
      this.init();
    },
    //   导出
    exportExcel() {},
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
      this.RecoverVisible = false;
      this.backfillVisible = false;
      this.init();
    },
    //弹出框
    submit(formName) {
      //提交
      this.$refs.childRecover.submit();
      // this.RecoverVisible = false;
    },
    add() {
      this.RecoverVisible = true;
    },
    edit() {},
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
    }
  },
  watch: {
    maxHeight() {
      this.tableShow = false;
      this.$nextTick(() => {
        this.tableShow = true;
      });
    },
    RecoverVisible(newval) {
      if (newval) {
        // this.$set(this.crumbsData.titleList, "3", { title: '添加' })
      } else {
        // this.crumbsData.titleList.splice(3, 1)
      }
    }
  }
};
</script>
<style lang="scss">
.Recover {
  width: 100%;
  height: 100%;

  .indexContent {
    height: calc(100% - 41px);
  }
}
</style>
