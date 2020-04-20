<template>
  <div class="Warehousing">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <!-- 添加 -->
      <div class="bread-contain-right" v-if="WarehousingVisible">
        <el-button icon="el-icon-bottom" @click="exportExcel" size="mini" type="primary" v-show="WarehousingEditNeedData.tableEdit">下载模板</el-button>
        <el-upload v-show="WarehousingEditNeedData.tableEdit" class="upload-demo" multiple :limit="1" :http-request="importExcel">
          <el-button icon="el-icon-download" size="mini" type="primary">导入</el-button>
        </el-upload>
        <el-button @click="save" size="mini" type="primary" v-show="WarehousingEditNeedData.tableEdit">暂存</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
      <div class="bread-contain-right" v-if="WarehousingCon">
        <el-button icon="el-icon-plus" @click="add" size="mini" type="primary">添加</el-button>
      </div>
      <!-- 校验按钮 -->
      <div class="bread-contain-right" v-if="WarehousingValidatorVisible">
        <el-button size="mini" type="primary">提交</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
    </div>
    <!-- 添加修改 -->
    <WarehousingEdit v-if="WarehousingVisible" ref="WarehousingEdit" :WarehousingEditNeedData="WarehousingEditNeedData"></WarehousingEdit>
    <!-- 校验 -->
    <WarehousingValidator ref="WarehousingValidator" :WarehousingValidatorNeedData='WarehousingValidatorNeedData' v-if="WarehousingValidatorVisible"></WarehousingValidator>

    <div v-if="WarehousingCon" class="WarehousingCon">

      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="tableQuery" class="demo-form-inline">
          <el-form-item class="form-left">
            <el-form-item label='单据日期：'>
              <el-date-picker v-model="tableQuery.Time" type="daterange" value-format="yyyy-MM-dd" range-separator="至" :picker-options="pickerOptions" :clearable="true" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="状态：">
              <el-select clearable v-model="tableQuery.processState" placeholder="状态">
                <el-option v-for="item in processStateData" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="单据编号：">
              <el-input v-model="tableQuery.billNo"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button class='searchBtn' icon="el-icon-search" @click="search"></el-button>
            </el-form-item>
          </el-form-item>

          <el-form-item class="form-right">
          </el-form-item>
        </el-form>
      </div>
      <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="tableData.list" @cell-click="cellClick" class="Warehousing-table">

          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="processStateName" min-width="60" label="状态">
          </el-table-column>

          <el-table-column prop="nodeName" min-width="100" label="进度">
          </el-table-column>

          <el-table-column prop="operator" min-width="100" label="当前处理人">
          </el-table-column>

          <el-table-column prop="billNo" min-width="80" label="单据编号">
          </el-table-column>

          <el-table-column prop="billDate" min-width="80" label="单据日期">
          </el-table-column>

          <el-table-column prop="stroageCount" min-width="80" label="注册数量">
          </el-table-column>

          <el-table-column prop="meterFactoryName" min-width="80" label="水表厂家">
          </el-table-column>

          <el-table-column class="cell" label="操作" fixed="right" width="150">
            <template slot-scope="scope">
              <el-button type="text" @click="details(scope.row)">详情</el-button>
              <span>|</span>
              <el-button type="text" class="noclick" @click="check(scope.row)">校验</el-button>
              <span>|</span>
              <el-button type="text" class="noclick" @click="remove(scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination 
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :current-page="tableQuery.page" :page-sizes="[20, 100, 500, 1000]" 
          :page-size="tableQuery.pageCount" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import WarehousingEdit from "./WarehousingEdit";
import WarehousingValidator from "./WarehousingValidator";
export default {
  name: "Warehousing",
  components: {
    WarehousingEdit,
    WarehousingValidator
  },
  data() {
    return {
      // 表格数据
      tableData: {},
      //查询条件对象
      tableQuery: {
        page: 1,
        pageCount: 20,
      },
      // 添加/详情页面需要数据
      WarehousingEditNeedData: {
        // 单据编号
        billNo: '',
        //是否可编辑
        tableEdit: true,
        // 添加的子页面列表数据
        storageQueryData: [],
      },
      // 状态下拉框数据
      processStateData: this.common.processState(),
      // 暂存按钮判断字段
      saveType: 'add',
      // 导入按钮接口地址
      importExcelUrl: window.location.host + '/css2/exportExcel.api?json=' + encodeURI(JSON.stringify({
        "busicode": "MsStorageExport",
        "data": {},
        "token": localStorage.getItem('token'),
        "sysType": '002'
      })),
      // 校验页面所需数据
      WarehousingValidatorNeedData: {},


      crumbsData: {
        //面包屑
        titleList: [{ title: "表计管理" }, { title: "注册" }]
      },
      tableShow: false,
      maxHeight: 0,

      WarehousingVisible: false, //添加弹窗的显示和隐藏
      WarehousingName: "注册-编辑",
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
      WarehousingValidatorVisible: false,
      WarehousingCon: true
    };
  },
  mounted() {
    this.init()
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
    this.common.changeTable(this, ".Warehousing", [
      ".Warehousing .toolbar",
      ".Warehousing .block",
      ".Warehousing .bread-contain"
    ]);
  },
  methods: {
    // 初始化
    init() {
      let _this = this;
      let params = {
        busicode: "MsStorageList",
        data: this.tableQuery
      };
      this.$api.fetch({
        params: params,//参数

      }).then(res => {
        _this.tableData = res
      })
    },
    // 搜索
    search() {
      if (this.tableQuery.Time !== undefined) {
        this.tableQuery.beginTime = this.tableQuery.Time[0]
        this.tableQuery.endTime = this.tableQuery.Time[1]
        delete this.tableQuery.Time
      }
      console.log(this.tableQuery);
      this.tableQuery.page = 1;
      this.init();
    },
    // 详情按钮
    details(row) {
      this.WarehousingVisible = true;
      this.WarehousingCon = false;
      this.WarehousingEditNeedData = row
      this.WarehousingEditNeedData.content = 'details'
      // saveType 用于暂存按钮判断子页面数据属于添加数据还是修改数据
      this.saveType = 'update'
      if (row.processState === "已审批") {
        this.WarehousingEditNeedData.tableEdit = false;
      } else {
        this.WarehousingEditNeedData.tableEdit = true;
      }
    },
    // 校验按钮
    check(row) {
      this.WarehousingValidatorNeedData = row
      this.WarehousingValidatorVisible = true
      this.WarehousingCon = false
    },
    // 主页面列表删除按钮
    remove(row) {
      console.log(row);
      var _this = this
      this.$confirm("是否确认删除该行?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = {
            "busicode": "MsStorageDelete",
            "data": row.id
          }
          _this.$api.fetch({
            params: params,//参数
          }).then(res => {
            _this.$message({
              type: "success",
              message: "删除成功!"
            })
            _this.init()
          })

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 添加按钮
    add() {
      this.WarehousingVisible = true
      this.WarehousingCon = false
      this.WarehousingEditNeedData.tableEdit = true
      this.WarehousingEditNeedData.content = 'add'
    },
    // 暂存（调子页面保存方法）
    save() {
      var _this = this
      this.$refs.WarehousingEdit.save(_this.saveType, false)
    },
    // 下载模板（调子页面下载模板方法）
    exportExcel() {
      var _this = this
      this.$refs.WarehousingEdit.exportExcel()
    },
    // 导入按钮
    importExcel(file) {
      console.log(file);
      let _this = this;
      let params = {
        busicode: "MsStorageImport",
        type: 'import',
        data: {
          file: file.file
        }
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        eventBus.$emit('storageQueryData', res)
      })
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
      return (
        (this.tableQuery.page - 1) * this.tableQuery.pageCount + (index + 1)
      );
    },
    closeDialog() {
      //关闭会话
      this.WarehousingVisible = false;
      this.waterAddVisible = false;
      this.WarehousingValidatorVisible = false;
      this.WarehousingCon = true;
      // saveType 用于暂存按钮判断子页面数据属于添加数据还是修改数据(默认为add)
      this.saveType = 'add'
      // this.crumbsData.titleList.splice(2, 1);
      this.init();
    },
    //弹出框
    submit(formName) {
      //提交
      this.$refs.WarehousingEdit.submit();
      // this.WarehousingVisible = false;
    },
    
  },
  watch: {
    maxHeight() {
      this.tableShow = false;
      this.$nextTick(() => {
        this.tableShow = true;
      });
    }
    //   WarehousingVisible(newval){

    //       if(newval){

    //           this.$set(this.crumbsData.titleList,"2",{title:'编辑',method:()=>{window.histroy.back()}})
    //         //   this.crumbsData.titleList[2]= {title:'编辑',method:()=>{window.histroy.back()}}
    //       }else{
    //           this.crumbsData.titleList.splice(2,1);
    //       }
    //   }
  }
};
</script>
<style lang="scss">
@import "../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.Warehousing {
  width: 100%;
  height: 100%;
  .WarehousingCon {
    width: 100%;
    height: calc(100% - 41px);
  }
}
</style>
