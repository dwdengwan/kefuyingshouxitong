<template>
  <div class="meterInfoDel">
      <!-- 弹出表单选择水表 -->
    <el-dialog :title="WaterEditorName" :visible.sync="waterChooseVisible" :close-on-click-modal="false" class="addDialog" @close="closeChooseMtere" append-to-body>
        <!-- <chooseWaterMeter ref="childWaterEditor"></chooseWaterMeter> -->
        <SelectWaterTable ref="SelectWaterTable"></SelectWaterTable>
        <div slot="footer" class="dialog-footer" ref="ruleForm">
            <el-button type="primary" size="mini" plain @click="submit;">确 定</el-button>
            <el-button type="info" size="mini" plain @click="closeChooseMtere">取 消</el-button>
        </div>
    </el-dialog>
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-if="meterInfoDelVisible">
          <!-- <el-button icon="el-icon-bottom" @click="downFile" size="mini" type="primary" v-show="tableEdit">下载模板</el-button> -->
          <el-button size="mini" type="primary" @click="chooseWaterMeter" v-show="tableEdit">选择水表</el-button>
          <el-button size="mini" type="primary" v-show="tableEdit">提交</el-button>
          <el-button size="mini" type="primary" v-show="tableEdit">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
      <div class="bread-contain-right" v-else>
          <el-button icon="el-icon-plus" @click="edit('add')" size="mini" type="primary">登记</el-button>
      </div>
    </div>
    <div v-if="meterInfoDelVisible">    
      <meterInfoDelAdd ref="wMeterEditAdd" :tableEdit="tableEdit"></meterInfoDelAdd>
    </div>

    <div v-else class="meterInfoDelCon">

      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
          <el-form-item class="form-left">
            <el-form-item label='单据日期：'>
                <el-date-picker
                v-model="DateChoosevalue"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
              <!-- <el-date-picker v-model="DateChoosevalue" type="date" placeholder="选择日期">
              </el-date-picker> -->
            </el-form-item>
            <el-form-item label="审批状态：">
              <el-select clearable v-model="formData.waterMeterManufacturer" placeholder="">
                <el-option v-for="(item,index) in formData.waterMeterManufacturerOptions" :key="index" :label="item.name" :value="item.value"></el-option>

              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
            </el-form-item>

          </el-form-item>

          <el-form-item class="form-right">

            <!-- <el-button icon="el-icon-plus" @click="edit('add')" size="mini" type="primary">登记</el-button> -->

          </el-form-item>
        </el-form>
      </div>
      <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" @cell-click="cellClick" class="meterInfoDel-table">

          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="areaName" min-width="100" label="审批状态">
          </el-table-column>

          <el-table-column prop="isxz" min-width="80" label="单据编号">
          </el-table-column>

          <el-table-column prop="daytime" min-width="80" label="制单日期">

          </el-table-column>


          <!-- <el-table-column prop="fixValue" min-width="80" label="水表口径">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="80" label="水表厂家">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="80" label="水表类型">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="80" label="水表型号">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="80" label="所属部门">
          </el-table-column> -->

          <el-table-column prop="fixValue" min-width="80" label="制单人">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="80" label="水表数量">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="120" label="删除原因">
          </el-table-column>

          <el-table-column class="cell" label="操作" fixed="right" width="150">
            <template slot-scope="scope">

              <el-button v-show="scope.row.areaName=='已审批'" type="text" @click="edit(scope.$index, scope.row)">详情</el-button>
              <el-button v-show="scope.row.areaName=='未审批'" type="text" @click="edit(scope.$index, scope.row)">编辑</el-button>
              <span v-show="scope.row.areaName=='未审批'"  >|</span>
              <el-button v-show="scope.row.areaName=='未审批'" type="text" class="noclick">审批</el-button>
              <span v-show="scope.row.areaName=='未审批'"  >|</span>

              <el-button v-show="scope.row.areaName=='未审批'" type="text" class="noclick" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
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
import meterInfoDelAdd from "./meterInfoDelAdd"
import chooseWaterMeter from '../chooseWaterMeter'
import SelectWaterTable from "@/components/SelectWaterTable"; 
export default {
  name: "meterInfoDel",
  components: {
   meterInfoDelAdd,
   chooseWaterMeter,
   SelectWaterTable
  },
  data() {
    return {
      crumbsData: {  //面包屑
        titleList: [
          { title: '表务中心', path: '/Warehousing' },
          { title: '水表变更', method: () => { window.histroy.back() } },
          { title: '水表资料删除', method: () => { window.histroy.back() } }
        ],

      },
      tableShow: false,
      maxHeight: 0,
      histroyData: {

      },
      meterInfoDelVisible: false,  //添加弹窗的显示和隐藏
      meterInfoDelName: '注册-编辑',
      waterAddVisible: false,  //添加弹窗的显示和隐藏
      WaterEditorName: '注册-添加',
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
          },

        ],
        waterMeterManufacturer: "",
        waterMeterManufacturerOptions: [
          // {
          //     name:"全部",
          //     value:"1"
          // },
          {
            name: "已审批",
            value: "1"
          },
          {
            name: "未审批",
            value: "2"
          },
          {
            name: "已删除",
            value: "3"
          },
        ],
        waterMeterType: "",
        waterMeterTypeOptions: [],
        waterMeterCaliber: "",
        waterMeterCaliberOptions: [],
        waterMeterStatus: "",
        waterMeterStatusOptions: [],
        subordinateDepartments: "",
        subordinateDepartmentsOptions: []

      },
      tableEdit: true,
      waterChooseVisible:false,  
      WaterEditorName:'水表选择',
    }
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, '.meterInfoDel', ['.meterInfoDel .toolbar', '.meterInfoDel .block', '.meterInfoDel .bread-contain'])
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
            waterGroup: null,
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
            waterGroup: null,
          },

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
        total: 5,
      }
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
    handleSizeChange(val) { //显示多少数据一页
      // this.tableQuery.pageCount = val
      // this.tableQuery.page = 1
      this.init()
    },
    handleCurrentChange(val) {  //显示多少页码
      // this.tableQuery.page = val
      this.init()
    },
    cellClick(row, column, cell, event) { //点击文件名
      let that = this;

    },
    indexMethod(index) {//获取表格序号
      //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      return (this.histroyData.pageSize - 20) * this.histroyData.pages + (index + 1);

    },
    add() {
      this.init()
    },
    closeDialog() { //关闭会话
      this.meterInfoDelVisible = false;
      this.waterAddVisible = false;
      this.crumbsData.titleList.splice(3, 1);
      this.init()
    },
    //弹出框
    submit(formName) {	//提交
      this.$refs.childmeterInfoDel.submit()
      // this.meterInfoDelVisible = false;
    },
    // 编辑
    edit(val, row) {
      this.meterInfoDelVisible = true;

      if (val === "add") {
        this.tableEdit = true;
        this.$set(this.crumbsData.titleList, "3", { title: '登记', method: () => { window.histroy.back() } })
      } else {
        
        if (row.areaName === "已审批") {
          this.tableEdit = false;
          this.$set(this.crumbsData.titleList, "3", { title: '详情', method: () => { window.histroy.back() } })
        } else {
          this.tableEdit = true;
          this.$set(this.crumbsData.titleList, "3", { title: '编辑', method: () => { window.histroy.back() } })
        }

      }
    },
    // 添加
    add() {
      this.waterAddVisible = true
    },
    // 删除行
    deleteRow(index, row) {
      this.$confirm('是否确认删除该行?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.histroyData.list.splice(index, 1)
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
    closeChooseMtere(){
        this.waterChooseVisible = false;
    },
    chooseWaterMeter(){
        this.waterChooseVisible = true;
    },
  },
  watch: {
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
    //   meterInfoDelVisible(newval){

    //       if(newval){

    //           this.$set(this.crumbsData.titleList,"2",{title:'编辑',method:()=>{window.histroy.back()}})
    //         //   this.crumbsData.titleList[2]= {title:'编辑',method:()=>{window.histroy.back()}}
    //       }else{
    //           this.crumbsData.titleList.splice(2,1);
    //       }
    //   }
  }
}
</script>
<style lang="scss">
@import "../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.meterInfoDel {
  width: 100%;
  height: 100%;
  .meterInfoDelCon{
    width: 100%;
    height: calc(100% - 41px);
  }
  .toolBtn {
    text-align: right;
    padding-bottom: 15px;
  }
  .kl-table {
    padding: 0px 20px;
    width: calc( - 40px);
    height: calc(100% - 81px);
    .block {
      text-align: right;
      padding: 10px 0px;
    }
  }
}
#app .meterInfoDel .bread-contain #crumbs{
  width: 50%;
}
#app .meterInfoDel .bread-contain .bread-contain-right{
  width: 45%;
}
</style>
