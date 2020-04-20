<template>
  <div class="Meter-Reading-Record">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <!-- //初始化按钮 -->
      <div class="bread-contain-right" v-if='divChange==1'>
        <el-button size="mini" type="primary" @click="dataEntryShow()">录入</el-button>
        <el-button size="mini" type="primary" @click="CollectionImportShow()" icon="el-icon-download">集抄导入</el-button>
        <el-button size="mini" type="primary" icon="el-icon-bottom">下载模板</el-button>
        <el-button size="mini" type="primary" icon="el-icon-download">导入</el-button>
        <el-button size="mini" type="primary" icon="el-icon-upload2" @click="exportExcel()">导出</el-button>
      </div>
      <!-- //录入 -->
      <div class="bread-contain-right" v-else-if='divChange==0'>
        <el-button icon="el-icon-caret-left" size="mini" @click="callBack()">返回</el-button>
      </div>
      <!-- //集抄导入 -->
      <div class="bread-contain-right" v-else-if='divChange==2'>

        <el-button size="mini" type="primary">删除</el-button>
        <el-button size="mini" type="primary">保存</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="callBack()">返回</el-button>
      </div>
    </div>

    <div class="company-content" v-if='divChange==1'>
        <div class="company-left">  
                <div class="toolbarRecord">
                  <el-form :inline="true" size="mini" :model="tableQuery" class="demo-form-inline" >
                      <el-form-item label="">
                        <el-date-picker v-model="tableQuery.accountPeriod" @change='accountPeriodChange' size="mini" type="month" unlink-panels format="yyyy-MM" value-format="yyyyMM" placeholder="选择月"  >
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item class="readingStaff" label="">
                        <el-select v-model="tableQuery.meterReadingStaff" @change='meterReadingStaffChange' size="mini" placeholder="抄表员">
                          <el-option v-for="item in meterReaderList" :key="item.value" :label="item.label"  :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                  </el-form>
                </div>
          <company-tree :treeData="treeDatas" @sendTreeData="getTreeChildren"></company-tree>
        </div>
        <div class="company-right">
          
          <div class="toolbar">
            <el-form :inline="true" size="mini" :model="tableQuery" class="demo-form-inline" >
              
              <el-form-item label="账期：">
                {{treeBooks.bookName}}
              </el-form-item>
              <el-form-item label="册本：">
                {{treeBooks.bookName}}
              </el-form-item>
              <el-form-item label="总水量：">
                <font color="red">{{treeBooks.totalWater}}</font>
              </el-form-item>
              <el-form-item label="总户数：">
                <font color="red">{{treeBooks.totalUser}}</font>
              </el-form-item>
              <el-form-item label="异常户数：">
                <font color="red">{{treeBooks.abnormalAmount}}</font>
              </el-form-item>
              <el-form-item label="已抄：">
                <font color="red">{{treeBooks.meterReadingAmount}}</font>
              </el-form-item>
              <br>
              <!-- <el-form-item label="账期：">
                <el-date-picker v-model="tableQuery.accountPeriod" size="mini" type="month" unlink-panels format="yyyy-MM" value-format="yyyyMM" placeholder="选择月"  >
                </el-date-picker>
              </el-form-item> -->
                  
                <el-form-item label="用户编号：">
                    <el-input v-model="tableQuery.userNo"></el-input>
                </el-form-item>

                <el-form-item label="异常类型：">
                  <el-select v-model="tableQuery.abnormalStatus" size="mini">
                    <el-option v-for="item in dictionaryData.WEP" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

              <!-- <el-form-item label="册本号：" >
                <el-input v-model="tableQuery.bookNo" clearable placeholder="册本号"></el-input>
              </el-form-item> -->

              <el-form-item label="是否抄表：">
                <el-select  v-model="tableQuery.status" clearable size="mini">
                  <el-option v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <!-- <el-button type="primary" size="mini" @click.native="hidden" icon="el-icon-arrow-down upchange" class="soce-query">高级查询</el-button> -->
                <el-button class='searchBtn' @click="search" icon="el-icon-search"></el-button>
              </el-form-item>
              <!-- 高级查询内容 -->
              <!-- <el-form-item v-show="isActive" class="advancedQuery">

                <el-form-item label="抄表员：">
                  <el-select v-model="tableQuery.meterReadingStaff" size="mini">
                    <el-option v-for="item in meterReaderList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-form-item> -->
            </el-form>
          </div>
          <div class="kl-table">
            <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="tableData.list"  class="wuserInfo-table">
              <el-table-column type="index" label="NO." min-width="50" :index="indexMethod" fixed></el-table-column>
              <el-table-column prop="userNo" min-width="100" label="用户编号"></el-table-column>
              <el-table-column prop="ctmName" min-width="100" label="用户名称"></el-table-column>
              <el-table-column prop="priorPeriodNum" min-width="80" label="上期抄码"></el-table-column>
              <el-table-column prop="currendPeriodNum" min-width="70" label="本期抄码"></el-table-column>
              <el-table-column prop="currendPeriodWater" min-width="70" label="本期水量"></el-table-column>
              <el-table-column prop="addWater" min-width="90" label="增减水量"></el-table-column>
              <el-table-column prop="shareWater" min-width="90" label="分摊水量"></el-table-column>
              <el-table-column prop="realityWater" min-width="90" label="实际用水量"></el-table-column>
              <el-table-column prop="meterReadingDate" min-width="100" label="抄表日期"></el-table-column>
              <el-table-column prop="status" min-width="80" label="抄表状态"></el-table-column>
              <el-table-column label="操作" fixed="right" width="80px">
                <template slot-scope="scope">
                  <el-button type="text" @click="dataEntryShow(scope)" >详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="block">
              <el-pagination @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="tableQuery.page" 
                :page-sizes="[20, 100, 500, 1000]" 
                :page-size="tableQuery.pageCount" 
                layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
              </el-pagination>
            </div>
          </div>
        </div>
      <!-- </div> -->
    </div>
    <!-- 录入 -->
    <MeterReadingDataEntry 
      @calback="closeDialog" 
      :booksVal="booksVal"  
      v-else-if='divChange==0'>
    </MeterReadingDataEntry>
    <!-- 集抄导入 -->
    <DataCollectionEdit 
      @calback="closeDialog"
      :booksVal="booksVal"  
      v-else-if='divChange==2'>
    </DataCollectionEdit>
  </div>
</template>
<script>
import MeterReadingDataEntry from "./MeterReadingDataEntry";
import DataCollectionEdit from "./DataCollectionEdit";
export default {
  name: "Meter-Reading-Record-index",
  components: {
    MeterReadingDataEntry,
    DataCollectionEdit
  },
  data() {
    return {
      tableDataTest:[
        {
          userName: "焦文",
          userNum: "100",
          bookCode: "EF001",
          path:[[114.137585,22.563908],[114.137617,22.564116],[114.137563,22.564404]]
        },
        {
          userName: "焦文",
          userNum: "200",
          bookCode: "EF002",
          path:[[114.13877,22.564448],[114.138835,22.564716],[114.138835,22.564716],[114.138835,22.564716],[114.138277,22.565285]]
        },
        {
          userName: "焦文",
          userNum: "300",
          bookCode: "EF003",
          path:[[114.135809,22.566455],[114.135933,22.566455],[114.136839,22.566138],[114.136802,22.566009],[114.137236,22.565979],[114.136115,22.56582]]
        }
      ],
      //列表存值
      tableData: [],
      booksVal:{
        bookNo:'',
        total:''
      },
      treeBooks:{
        bookNo:'',//册本号
        showName:'',//册本号
        bookName:'',//册本名称
        showName:'',//树显示名称
        totalWater:'',//总水量
        totalUser:'',//总户数
        abnormalAmount:'',//异常户数
        meterReadingAmount:'',//已抄
      },
      crumbsData: {
        //面包屑
        titleList: [
          { title: "抄表开账" },
          { title: "抄表" },
          { title: "抄表录入" }
        ]
      },
      statusOption:[{//树结构格式
        value: 0,
        label: '已抄'
      },{
        value: 1,
        label: '未抄'
      }],
      isActive: false, //控制高级查询内容的显示
      dialogFormVisible: false, //弹出表单
      dialogCollectionImportShow: false, //集抄弹出表单
      tableQuery: {
        //查询表单数据
        page: 1,
        pageCount: 20,
        accountPeriod: "202004",//账期
        bookNo: "",//册本号
        userNo:'',//用户编号
        meterReadingStaff:'',//抄表员
        readingStatus:'',//抄表状态
        abnormalStatus:'',//异常状态
      },
      //数据字典
      dictionaryData:[],
      //抄表员
      meterReaderList:[],
      maxHeight: 0,
      tableShow: false,
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      divChange: 1,
      //公司组件树
      treeDatas: {
        // 树数据
        tree: [
          {
            books:[],
            businessAbode:'',
            showName:'全部'
          }
        ],
        // 树的label和children 字段分别是对应的什么字段
        defaultProps: {
          label: "showName",
          children: "books"
        },
        // 输入框的一些选项
        inputProp: {
          // 是否显示input框
          showSearch: true,
          // placeholder提示
          Inp_placeholder: "请输入节点"
        },
        // 根节点名称
        rootName: "总部",
        // 返回的字段
        sendTreeProp:['businessAbodeName','businessAbode','books','totalWater','totalUser','showName','meterReadingAmount','bookNo','bookName','abnormalAmount'],
        // 默认展开某一个节点
        defaultOpen: {
          // 节点的唯一key
          nodeKey: "businessAbode",
          // 默认展开的节点 ，和key对应
          // nodeItem:'',
        }
      },
      
    };
  },
  mounted() {
    let _this = this
    // 侧边栏
    eventBus.$emit("asideMenuShow", "businessMenuShow3");
    _this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      _this.common.changeTable(
        _this,
        ".Meter-Reading-Record .company-right",
        [".Meter-Reading-Record .toolbar",".Meter-Reading-Record .block"]
      );
    });
    //左侧树接口
    this.backTreeData()
    //数据字典接口
    this.getDictionary()
  },
  methods: {
    
    //树接口
    backTreeData() {
      let _this = this
      let params = {
        "busicode": "BookCheckTree",
        "data": {
          "accountPeriod": this.tableQuery.accountPeriod,//账期
          'meterReadingStaff':this.tableQuery.meterReadingStaff//抄表员
        },
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.treeDatas.tree[0].books = res
      })
    },
      //初始化
    init() {
      let _this = this
      let params = {
          "busicode": "MrRecordList",
          "data": this.tableQuery,
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
          _this.tableData = res; 
          _this.$nextTick(() => {
            //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
            _this.common.changeTable(
              _this,
              ".Meter-Reading-Record .company-right",
              [".Meter-Reading-Record .toolbar",".Meter-Reading-Record .block"]
            );
          });
      })
    },
    // 数据字典数据获取
    getDictionary() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": "WEP,"//异常类型
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.dictionaryData = res
      })
    },
    // 抄表员数据获取
    getReadingStaff() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": {}//
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.meterReaderList = res
      })
    },
    getTreeChildren(val){
      if (val.books.length > 0) {
        if (val.businessAbode == '暂无') {
          this.tableQuery.bookNo = val.bookNo//册本号
          this.treeBooks.bookNo = val.bookNo//册本号
          this.treeBooks.bookName = val.bookName//册本名称
          this.treeBooks.showName = val.showName//树显示名称
          this.treeBooks.totalWater = val.totalWater//总水量
          this.treeBooks.totalUser = val.totalUser//总户数
          this.treeBooks.abnormalAmount = val.abnormalAmount//异常户数
          this.treeBooks.meterReadingAmount = val.meterReadingAmount//已抄
          this.init();
        }else{
          this.tableQuery.bookNo = ''//册本号
          this.treeBooks.bookNo = ''//册本号
          this.treeBooks.bookName = ''//册本名称
          this.treeBooks.showName = ''//树显示名称
          this.treeBooks.totalWater = ''//总水量
          this.treeBooks.totalUser = ''//总户数
          this.treeBooks.abnormalAmount = ''//异常户数
          this.treeBooks.meterReadingAmount = ''//已抄
          this.tableData =[]
          
        }
      }else{
          this.$notify({
            title: '警告',
            message: val.showName +'暂无册本',
            type: 'warning'
          });
        this.tableQuery.bookNo = ''//册本号
        this.treeBooks.bookNo = ''//册本号
        this.treeBooks.bookName = ''//册本名称
        this.treeBooks.showName = ''//树显示名称
        this.treeBooks.totalWater = ''//总水量
        this.treeBooks.totalUser = ''//总户数
        this.treeBooks.abnormalAmount = ''//异常户数
        this.treeBooks.meterReadingAmount = ''//已抄
        this.tableData =[]

      }
    },
    //查询
    search(){
      this.init()
    },
    //查询
    accountPeriodChange(){
      this.backTreeData()
    },
    //查询
    meterReadingStaffChange(){
      this.backTreeData()
    },
    // 高级查询按钮事件
    hidden() {
      if (this.isActive == true) {
        $(".upchange")
          .addClass("el-icon-arrow-down")
          .removeClass("el-icon-arrow-up");
        this.isActive = false;
      } else {
        $(".upchange")
          .addClass("el-icon-arrow-up")
          .removeClass("el-icon-arrow-down");

        this.isActive = true;
      }
      this.$nextTick(() => {
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        this.common.changeTable(
          this,
          ".Meter-Reading-Record .Meter-Reading-Record-right",
          [".Meter-Reading-Record .table-top"]
        );
      });
    },
    //分页
    handleSizeChange(val) {
      //显示多少数据一页
      this.tableQuery.pageCount = val
      this.tableQuery.page = 1
      this.init();
    },
    handleCurrentChange(val) {
      //显示多少页码
      this.tableQuery.page = val
      this.init();
    },
    indexMethod(index) {//获取表格序号
      return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1)
    },
    //显示集抄界面
    CollectionImportShow() {
      this.divChange = 2;
      this.booksVal.bookNo = this.tableQuery.bookNo 
      // this.booksVal.total = this.tableData.bookNo 
      console.log(this.booksVal);
      
      this.dialogCollectionImportShow = true;
    },
    //显示录入界面
    dataEntryShow(row) {
      if (this.tableQuery.bookNo =='') {
          this.$notify({
            title: '警告',
            message: '册本号不可为空',
            type: 'warning'
          });
      }else{
        this.booksVal.bookNo = this.tableQuery.bookNo 
        this.booksVal.total = this.tableData.bookNo 
        this.divChange = 0;
      }
    },
    callBack() {
      this.divChange = 1;
      this.booksVal= {
        bookNo:'',
        total:''
      };
      
    },
    exportExcel() {

    },
    closeDialog(val) {

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
.Meter-Reading-Record {
  height: 100%;
  width: 100%;
  .toolbarRecord{
    padding: 10px 10px 0px;
    border-right: 1px solid #EAEBEC;
    width: 100%;
    .el-form{
      width: 100%;
      .el-form-item{
        width: 48%;
        margin-bottom: 0px;   
        margin-right: 3px;
        .el-form-item__content{
          width: 100%;
          .el-input__inner{
          width: 100% !important;
          }
        }
      }
      .readingStaff{
        width: 49%;
        margin-bottom: 0px;
        margin-right: 0px;
      }
    }
  }
  #tree{
    height: calc(100% - 38px);
    .search{
      padding: 10px 10px;
      height: 60px;
    }
    .el-tree{
    height: calc(100% - 60px) !important;

    }
  }
}
</style>

