<template>
  <div class="MeterRelationship" v-if="dialogTableVisible">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" >
        <!-- <el-button size="mini" type="primary" @click="add">添加</el-button> -->
        <el-button size="mini" type="primary">保存</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
    </div>
    <div class="toolbar">
      <div class="form-left">
      </div>
    </div>
    <div class="toolbar">
      <el-form :inline="true" size="mini" :model="formData5" class="demo-form-inline">
        <el-form-item label="用户编号：">
          <el-input v-model="formData5.GeneralTableNum" placeholder="请输入用户编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary">定位</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button size="mini" type="primary" @click="add">选择水表</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="kl-table">
      <el-table stripe border :data="tableData" class="change-tables-table">
        <el-table-column type="selection" width="50">
        </el-table-column>

        <el-table-column type="index" label="NO." width="50" :index="indexMethod">
        </el-table-column>

        <el-table-column prop="bookCode" min-width="100" label="册本号">
        </el-table-column>

        <el-table-column prop="userCode" min-width="100" label="用户编号">

        </el-table-column>

        <el-table-column prop="userName" min-width="100" label="用户名称">
        </el-table-column>

        <el-table-column prop="address" min-width="100" label="用户地址">
        </el-table-column>

        <el-table-column prop="goldLevel" min-width="100" label="分摊比例(%)" v-if='activeName !== "third"'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.goldLevel"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="85">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click.native="handleContent = true">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="添加" :visible.sync="addVisible">
      <SelectWaterTable ref="SelectWaterTable"></SelectWaterTable>
      <div slot="footer" class="dialog-footer" ref="ruleForm">
        <el-button type="primary" size="mini" plain @click="addVisible = false">确 定</el-button>
        <el-button type="info" size="mini" plain @click="addVisible = false">返 回</el-button>
      </div>
    </el-dialog>
  </div>

  <div class="MeterRelationship" v-else>
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="总分表设置" name="first" class="first">
        <div class="first-right">
          <company-tree :treeData="treeDatas" @sendTreeData="backTreeData"></company-tree>
        </div>
        <div class='first-center'>
          <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
              <span class="meter-type">总表</span>

              <el-checkbox v-model="checked" style="margin-left: 2%;">存在分表</el-checkbox>

              <el-form-item>
                <el-input v-model="formData.inputContent" placeholder="用户编号/用户名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="searchBtn" @click="demand" icon="el-icon-search"></el-button>
              </el-form-item>

              <el-form-item style="float: right">
                <!-- <el-button size="mini" type="primary" icon="el-icon-upload2">导出</el-button> -->
              </el-form-item>
            </el-form>
          </div>
          <div class="kl-table">
            <el-table stripe border :data="tableData" class="change-tables-table">

              <el-table-column type="index" label="NO." width="50" :index="indexMethod">
              </el-table-column>

              <el-table-column prop="userCode" min-width="80" label="用户编号">

              </el-table-column>

              <el-table-column prop="userName" min-width="80" label="用户名称">
              </el-table-column>

              <el-table-column prop="address" min-width="80" label="地址">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class='first-left'>
          <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
              <span class="meter-type">分表</span>

              <el-form-item label="">
                <el-input v-model="formData.beginNumber" placeholder="用户编号" ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button class="searchBtn" @click="demand" icon="el-icon-search"></el-button>
              </el-form-item>

              <el-form-item style="float: right;">
                <el-button size="mini" type="primary" @click="weihu">维护</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="kl-table">
            <el-table stripe border :data="tableData" class="change-tables-table">

              <el-table-column type="index" label="NO." width="50" :index="indexMethod">
              </el-table-column>

              <el-table-column prop="userCode" min-width="80" label="用户编号">

              </el-table-column>

              <el-table-column prop="userName" min-width="80" label="用户名称">
              </el-table-column>

              <el-table-column prop="address" min-width="80" label="地址">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="监控表设置" name="third" class="first">
        <div class="first-right">
          <company-tree :treeData="treeDatas" @sendTreeData="backTreeData"></company-tree>
        </div>
        <div class='first-center'>
          <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData2" class="demo-form-inline">
              <span class="meter-type">监控表</span>
              <el-checkbox v-model="formData2.checked" style="margin-left: 5%;">存在子表</el-checkbox>
              <el-form-item label="">
                <el-input v-model="formData2.inputContent" placeholder="用户编号/用户名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="searchBtn" @click="demand" icon="el-icon-search"></el-button>
              </el-form-item>
              <el-form-item style="float: right">
              </el-form-item>

            </el-form>
          </div>
          <div class="kl-table">
            <el-table stripe border :data="tableData" class="change-tables-table">

              <el-table-column type="index" label="NO." width="50" :index="indexMethod">
              </el-table-column>

              <el-table-column prop="userNo" min-width="80" label="用户编号">
              </el-table-column>
              
              <el-table-column prop="userName" min-width="80" label="用户名称">
              </el-table-column>

              <el-table-column prop="address" min-width="80" label="地址">
              </el-table-column>

              <el-table-column prop="count" min-width="80" label="监控户数">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class='first-left'>
          <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData2" class="demo-form-inline">
              <span class="meter-type">子表</span>

              <el-form-item label="" style="margin-left:.5rem;">
                <el-input v-model="formData2.beginNumber" placeholder="用户编号" style="width: 45%;"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="searchBtn" @click="demand" icon="el-icon-search"></el-button>
              </el-form-item>

              <el-form-item style="float: right">
                <el-button size="mini" type="primary" @click="weihu">维护</el-button>
              </el-form-item>

            </el-form>
          </div>
          <div class="kl-table">
            <el-table stripe border :data="tableData" class="change-tables-table">

              <el-table-column type="index" label="NO." width="50" :index="indexMethod">
              </el-table-column>

              <el-table-column prop="userCode" min-width="80" label="用户编号">

              </el-table-column>

              <el-table-column prop="userName" min-width="80" label="用户名称">
              </el-table-column>

              <el-table-column prop="address" min-width="80" label="地址">
              </el-table-column>

            </el-table>
          </div>
        </div>

      </el-tab-pane>
      <el-tab-pane label="消防表设置" name="fourth" class="first">
        <div class='first-right'>
          <company-tree :treeData="treeDatas" @sendTreeData="backTreeData"></company-tree>
        </div>
        <div class="first-center">
          <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData3" class="demo-form-inline">
              <span class="meter-type">消防表</span>

              <el-checkbox v-model="formData3.checked" style="margin-left: 2%;">存在分摊表</el-checkbox>

              <el-form-item label="">
                <el-input v-model="formData3.inputContent" placeholder="用户编号/用户名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="searchBtn" @click="demand" icon="el-icon-search"></el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="kl-table">
            <el-table stripe border :data="tableData" class="change-tables-table">

              <el-table-column type="index" label="NO." width="50" :index="indexMethod">
              </el-table-column>


              <el-table-column prop="userCode" min-width="80" label="用户编号">

              </el-table-column>

              <el-table-column prop="userName" min-width="80" label="用户名称">
              </el-table-column>

              <el-table-column prop="address" min-width="80" label="地址">
              </el-table-column>

              <el-table-column prop="count" min-width="80" label="分摊方式">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class='first-left'>
          <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData4" class="demo-form-inline">
              <span class="meter-type">分摊表</span>

              <el-form-item label="用户编号：" style="margin-left: 2%;">
                <el-input v-model="formData4.beginNumber" placeholder="用户编号" style="width: 45%;"></el-input>

              </el-form-item>
              <el-form-item>
                <el-button class="searchBtn" @click="demand" icon="el-icon-search"></el-button>
              </el-form-item>

              <el-form-item style="float: right">
                <el-button size="mini" type="primary" @click="weihu">维护</el-button>

              </el-form-item>

            </el-form>
          </div>
          <div class="kl-table">
            <el-table stripe border :data="tableData" class="change-tables-table">

              <el-table-column type="index" label="NO." width="50" :index="indexMethod">
              </el-table-column>

              <el-table-column prop="userCode" min-width="80" label="用户编号">

              </el-table-column>

              <el-table-column prop="userName" min-width="80" label="用户名称">
              </el-table-column>

              <el-table-column prop="address" min-width="80" label="地址">
              </el-table-column>

              <el-table-column prop="goldLevel" min-width="80" label="分摊比例">
              </el-table-column>

            </el-table>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
import SelectWaterTable from "@/components/SelectWaterTable";
export default {
  name: "MeterRelationship",
  components: {
    SelectWaterTable
  },
  data() {
    return {
      tableData: [
        {
          userCode: 'D00E0001',
          userName: '焦文',
          address: '东深小区',
          gold: '--',
          goldLevel: '20',

          bookCode: 'DDSS0001',
          matherCode: 'SSDD1001',
          childCode: 'EELL0001',

          count: '--',
          bookName: '--',
        },
      ],
      dialogTableVisible: false,
      addVisible: false,
      treeDatas: {
        tree: [{ foreignkey: '全部', id: '222', _child: [{ foreignkey: '城区', id: '222', _child: [{ foreignkey: '0035E', id: '222' }, { foreignkey: '0036E', id: '222' }, { foreignkey: '0037E', id: '222' }, { foreignkey: '0038E', id: '222' }] }] }],       
        defaultProps: {
          label: 'foreignkey',
          children: '_child'
        },
        inputProp: {
          showSearch: false,
          Inp_placeholder: '请输入节点'
        },
        sendTreeProp: ['parentMask', 'mask', 'childMask', 'seq', 'id', 'type', 'foreignkey'],
        rootName: '总部',
        defaultOpen: {
          nodeKey: 'id',
          // nodeItem:164
        }
      },
      crumbsData: {  //面包屑
        titleList: [
          // { title: '基础信息', path: '/BusinessArea' },
          { title: '水表配置', method: () => { window.histroy.back() } },
          { title: '水表关系', method: () => { window.histroy.back() } },
          // { title: '总分表设置', method: () => { window.histroy.back() } }
        ],

      },
      isActive: false,  //控制高级查询内容的显示
      apportionmentMode: '1',
      formData: {
        con: "",
        watermeterWarehouse: "",
        watermeterWarehouseOptions: [],
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
      formData1: {},
      formData2: {},
      formData3: {},
      formData4: {},
      formData5: {},
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      DateChoosevalue: [],
      tableShow: false,
      maxHeight: 0,
      histroyData: {

      },
      waterAddVisible: false,  //综合查询的显示和隐藏
      WaterEditorName: '综合查询',
      ruleFormData: {},
      backfillName: "用户基础资料管理-编辑",
      backfillVisible: false,
      options6: [
        {
          value: 12,
          label: '全部'
        },
      ],
      ruleForm: {},
      activeName: 'first',
      indexMethod: '1',
    }
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, '.MeterRelationship .kl-table', ['.MeterRelationship .toolbar', '.MeterRelationship .block', '.MeterRelationship bread-contain'])
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
            areaName: "东深小区",
            code: "C7551990000003",
            concentrator: "",
            connect: null,
            daytime: "2019-07-02",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "-",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
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
            areaName: "东深小区",
            code: "C7551990000003",
            concentrator: "",
            connect: null,
            daytime: "2019-07-02",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "-",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
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
            areaName: "东深小区",
            code: "C7551990000003",
            concentrator: "",
            connect: null,
            daytime: "2019-07-02",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "-",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
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
            areaName: "东深小区",
            code: "C7551990000003",
            concentrator: "",
            connect: null,
            daytime: "2019-07-02",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "-",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
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
        total: 5,
      }
    },
    hidden() {
      if (this.isActive == true) {
        $('.upchange').addClass('el-icon-arrow-down').removeClass('el-icon-arrow-up')
        this.isActive = false;
        $('.el-table--fit').css('height', '66%');

      } else {
        $('.upchange').addClass('el-icon-arrow-up').removeClass('el-icon-arrow-down')

        this.isActive = true;
        $('.el-table--fit').css('height', '50%');
      }
    },
    add() {
      this.addVisible = true;
    },
    handleClick(){
      if(this.activeName == 'third'){
        // this.$set(this.crumbsData.titleList[3],'title','监控表设置')
      }else if(this.activeName == 'fourth'){
        // this.$set(this.crumbsData.titleList[3],'title','消防表设置')
      }else if(this.activeName == 'first'){
        // this.$set(this.crumbsData.titleList[3],'title','总分表设置')
      }
    },
    demand() {  //查询
      // this.tableQuery.page = 1
      // this.tableQuery.pageCount = 20
      this.init()
    },
    //   导出
    exportExcel() {
      //   	let listData = {}
      //   	this.tableQuery.pageCount = this.historyData.total ===0? 20:this.historyData.total
      //     let params ={
      //       "busicode":"MeterReadingList",
      //       "data": this.tableQuery
      //     }
      //     this.$api.fetch({
      //       apiUrl: 'interface.api',//路径
      //       method: 'post',//请求方法
      //       params:params,//参数
      //       needErrorCallback:true
      //     }).then(res =>{
      //     	if(res.code===0){
      //         listData = res.data
      //         if (!listData.list[0]) {
      //         		this.$notify({
      //               title: '警告',
      //               message:'表格没有相关数据',
      //               type: 'error'
      //             })
      //         	} else {
      //         		import('@/vendor/Export2Excel').then(excel => {
      // 			        const tHeader = ['水表编号', '抄表日期', '所属小区','厂家编号','厂家','型号', '当日读数', '修正读数', '当日水量', '数据状态',  '用户编号','集中器编号','用户地址']
      // 			        const filterVal = ['code', 'daytime', 'areaName','fcode','factoryName','model','lvalue', 'fixValue','flux', 'status', 'usn', 'concentrator', 'position']
      // 			        const list = listData.list
      // 			        const data = this.formatJson(filterVal, list)
      // 			        excel.export_json_to_excel({
      // 			          header: tHeader,
      // 			          data,
      // 			          filename: this.tableQuery.daytime + '抄表数据',
      // 			          autoWidth: '100'
      // 			        })
      // 			      })
      //         		this.tableQuery.pageCount = 20
      //         	}
      //       }
      //     })
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
    //   查看历史
    viewHistory(index, row) {

    },
    cellClick(row, column, cell, event) { //点击文件名
      let that = this;

    },
    indexMethod(index) {//获取表格序号
      //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      return (this.histroyData.pageSize - 1) * this.histroyData.pages + (index + 1);

    },
    closeDialog() { //关闭会话
      this.waterAddVisible = false;
      this.backfillVisible = false;
      this.dialogTableVisible = false;
      // this.crumbsData.titleList.splice(3, 1);
      this.init()
    },
    //弹出框
    submit(formName) {	//提交
      this.$refs.childWaterEditor.submit()
      // this.waterAddVisible = false;
    },
    // 批量编辑
    BatchEditing() {

    },
    // 资料导出
    DataDerivation() {

    },
    // 导出本页
    exportPage() {

    },
    // 综合查询
    ComprehensiveQuery() {
      this.waterAddVisible = true;
    },
    // 编辑
    edit() {
      this.backfillVisible = true;
    },
    weihu() {
      // this.crumbsData.titleList.push({ title: '维护', method: () => { window.histroy.back() } });
      this.dialogTableVisible = true;
    },
    backTreeData() { },
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
.MeterRelationship {
  width: 100%;
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 8px;
  }
  .first {
    display: flex;
    .first-right {
      width: 20%;
    }
    .first-center {
      width: 40%;
    }
    .first-left {
      width: 40%;
    }
  }
  .el-tabs__nav {
    margin-left: 20px;
  }
  .meter-type {
    font-weight: bolder;
    display: inline-block;
    line-height: 30px;
    height: 100%;
    font-size: 1rem;
  }
}
</style>
