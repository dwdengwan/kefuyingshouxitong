<template>
  <div class="wMeterEdit">

    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-if="wMeterEditVisible">
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
      <div class="bread-contain-right" v-else>
        <el-button icon="el-icon-plus" @click="edit('add')" size="mini" type="primary">添加</el-button>
      </div>
    </div>
    <wMeterEditAdd v-if="wMeterEditVisible" ref="wMeterEditAdd" :tableEdit="tableEdit"></wMeterEditAdd>
    <div v-else class="wMeterEditCon">
      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
          <el-form-item class="form-left">
            <el-form-item label='单据日期：'>
              <el-date-picker v-model="DateChoosevalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="状态：">
              <el-select clearable v-model="tableQuery.processState" placeholder="状态">
                <el-option v-for="item in processStateData" :key="item.value" :label="item.name" :value="item.value"></el-option>
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
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" center @cell-click="cellClick" class="wMeterEdit-table">

          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="state" min-width="60" label="状态">
          </el-table-column>

          <el-table-column prop="engineeringState" min-width="100" label="进度">
          </el-table-column>

          <el-table-column prop="handleName" min-width="100" label="当前处理人">
          </el-table-column>

          <el-table-column prop="isxz" min-width="80" label="单据编号">
          </el-table-column>

          <el-table-column prop="daytime" min-width="80" label="单据日期">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="80" label="变更类型">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="80" label="变更数量">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="120" label="变更原因">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="120" label="远传通讯费">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="120" label="通讯运营商">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="120" label="通讯费开始日期">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="120" label="通讯费结束日期">
          </el-table-column>

          <el-table-column label="操作" fixed="right" width="80">
            <template slot-scope="scope">

              <el-button type="text" @click="edit(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :current-page="1" :page-sizes="[20, 100, 500, 1000]" 
          :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wMeterEditAdd from "./wMeterEditAdd";
export default {
  name: "wMeterEdit",
  components: {
    wMeterEditAdd
  },
  data() {
    return {
      //查询条件对象
      tableQuery: {
        page: 1,
        pageCount: 20,
      },
      // 状态下拉框数据
      processStateData: this.common.processState(),



      crumbsData: {
        //面包屑
        titleList: [{ title: "表计管理" }, { title: "变更" }]
      },
      tableShow: false,
      maxHeight: 0,
      histroyData: {},
      wMeterEditVisible: false, //添加弹窗的显示和隐藏
      wMeterEditName: "注册-编辑",
      waterAddVisible: false, //添加弹窗的显示和隐藏
      WaterEditorName: "注册-添加",
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      DateChoosevalue: [],
      formData: {
        con: "",
        watermeterWarehouse: "",
        watermeterWarehouseOptions: [
          {
            name: "正常换表",
            value: "1"
          },
          {
            name: "异常换表",
            value: "1"
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
      tableEdit: true,
      waterChooseVisible: false,
      WaterEditorName: "水表选择"
    };
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, ".wMeterEdit", [
      ".wMeterEdit .toolbar",
      ".wMeterEdit .block",
      ".wMeterEdit .bread-contain"
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
            areaName: "经理审批",
            code: "C7551990000003",
            concentrator: "",
            connect: null,
            daytime: "20190702",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "-",
            flux: "-",
            getMeter: 15,
            id: null,
            isxz: "111",
            lvalue: "-",
            meter: null,
            model: null,
            modifyBy: null,
            modifyTime: null,
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "1栋3单元",
            protocolName: null,
            rowNumber: 0,
            sensorModel: null,
            sn: null,
            status: "未上传",
            totalPage: 0,
            type: 5,
            unusual: null,
            usn: "00",
            waterGroup: null
          },
          {
            areaId: null,
            areaName: "已审批",
            code: "C7551990000004",
            concentrator: "",
            connect: null,
            daytime: "20190702",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "-",
            flux: "-",
            getMeter: 15,
            id: null,
            isxz: "111",
            lvalue: "-",
            meter: null,
            model: null,
            modifyBy: null,
            modifyTime: null,
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "1栋3单元",
            protocolName: null,
            rowNumber: 0,
            sensorModel: null,
            sn: null,
            status: "未上传",
            totalPage: 0,
            type: 5,
            unusual: null,
            usn: "00",
            waterGroup: null
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
    downFile() {
      // var elemIF = document.createElement("iframe")
      // elemIF.src =  `${this.url}/fileDown.htm?importType=1`
      // elemIF.style.display = "none"
      // document.body.appendChild(elemIF)
    },
    // 上传模板
    uploading() {
      // this.uploadingVisible = true
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
    add() {
      this.init();
    },
    closeDialog() {
      //关闭会话
      this.wMeterEditVisible = false;
      this.waterAddVisible = false;
      // this.crumbsData.titleList.splice(3, 1);
      this.init();
    },
    closeChooseMtere() {
      this.waterChooseVisible = false;
    },
    //弹出框
    submit(formName) {
      //提交
      this.$refs.childwMeterEdit.submit();
      // this.wMeterEditVisible = false;
    },
    // 编辑
    edit(val, row) {
      this.wMeterEditVisible = true;

      if (val === "add") {
        this.tableEdit = true;
        // this.$set(this.crumbsData.titleList, "3", { title: '登记', method: () => { window.histroy.back() } })
      } else {
        if (row.areaName === "已审批") {
          this.tableEdit = false;
          // this.$set(this.crumbsData.titleList, "3", { title: '详情', method: () => { window.histroy.back() } })
        } else {
          this.tableEdit = true;
          // this.$set(this.crumbsData.titleList, "3", { title: '编辑', method: () => { window.histroy.back() } })
        }
      }
    },
    // 添加
    add() {
      this.waterAddVisible = true;
    },
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
    }
  }
};
</script>
<style lang="scss">
$imgWidth: 200px;
$theme-color: #297acc;
.wMeterEdit {
  width: 100%;
  height: 100%;
  .wMeterEditCon {
    width: 100%;
    height: calc(100% - 41px);
  }
}
</style>
