<template>
<div class="insideEnging">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div  class="bread-contain-right">
        <!-- index -->
          <div class="waterQuery"  v-if="IndexShow">
            <el-button type="primary" size="mini" icon="el-icon-plus" style="margin-right: 1.5%" @click="add">添加</el-button>
          </div>
        <!-- 添加页面 -->
          <div class="waterQuery"  v-if="EditShow">
            <el-button size="mini" type="primary"  @click="submitForm('insideEngineeringForm')">暂存</el-button>
            <el-button icon="el-icon-caret-left" size="mini" @click="operationReturn()" >返回</el-button>
          </div>
        <!-- 编辑/详情页面 -->
          <div class="waterQuery"  v-if="handleShow">
            <font v-if="HandleVal==1">
              <el-button size="mini" type="primary"  @click="submitForm('insideEngineeringForm')">暂存</el-button>
              <el-button icon="el-icon-caret-left" size="mini" @click="operationReturn" >返回</el-button>
            </font>
            <font   v-else-if="HandleVal == 2">
              <el-button size="mini" type="primary">施工材料</el-button>
              <el-button size="mini" icon="el-icon-caret-left" @click="operationReturn"  >返回</el-button>
            </font>
            <font   v-else-if="HandleVal == 3">
              <el-button size="mini" icon="el-icon-caret-left" @click="operationReturn"  >返回</el-button>
            </font>
            <font   v-else-if="HandleVal == 4">
              <el-button size="mini" type="primary">施工材料</el-button>
              <el-button size="mini" icon="el-icon-caret-left" @click="operationReturn"  >返回</el-button>
            </font>
            <font   v-else-if="HandleVal == 5">
              <el-button size="mini" icon="el-icon-caret-left" @click="operationReturn"  >返回</el-button>
            </font>
            <font   v-else-if='HandleVal == 6'>
              <el-button  icon="el-icon-caret-left" size="mini" @click="operationReturn" >返回</el-button>
            </font>
            <font   v-else-if='HandleVal == 7'>
              <el-button  icon="el-icon-caret-left" size="mini" @click="operationReturn" >返回</el-button>
            </font>
          </div>
      </div>
    </div>
    
    <insideEngingEdit  style="height:calc(100% - 41px)" @fromChild="getChild"  v-if="EditShow"></insideEngingEdit>
    <insideHandleInfo  style="height:calc(100% - 41px)" @fromHandleChild="getChildHandle"  v-if="handleShow"></insideHandleInfo>
    <div v-if="IndexShow" class="insideEngingIndex">
      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline" >
          
          <el-form-item label="单据日期：">
            <el-date-picker :editable="false" size="mini" v-model="formData.dataList" style="width:206px" type="daterange" align="right" format="yyyy-MM-dd" value-format="yyyy-MM-dd" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="formData.processNode" size="mini">
              <el-option v-for="item in processNodeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="紧急程度：">
            <el-select v-model="formData.Emergency" size="mini">
              <el-option v-for="item in EmergencyList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="信息来源：">
            <el-select v-model="information" size="mini">
              <el-option v-for="item in inforList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item> -->
          
          
          
          <el-form-item label="模糊查询：">
            
              <el-tooltip class="item" effect="dark" content="工程编号、工程名称、申请人、联系人、座机号码" placement="top">
                <el-input v-model="formData.inputContent"></el-input>
              </el-tooltip>

          </el-form-item>
          
          <el-form-item>
            <el-button class='searchBtn' @click="search" icon="el-icon-search"></el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="kl-table">
        <el-table stripe border :data="tableData" >

          <el-table-column type="index" label="NO." width="50" :index="indexMethod" fixed="left">
          </el-table-column>
          
          <el-table-column prop="themeMu" min-width="180" label="主题">
            <template slot-scope="scope">
                {{scope.row.engineeringTime}}
                ({{scope.row.userPeople}}
                {{scope.row.engineeringCode}})
            </template>
            
          </el-table-column>
          

          <el-table-column prop="engineeringState" min-width="60" label="状态">
          </el-table-column>

          <el-table-column prop="State" min-width="100" label="进度">
          </el-table-column>

          <el-table-column prop="handleName" min-width="100" label="当前处理人" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="useLevel" min-width="80" label="紧急程度" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="engineeringCode" min-width="80" label="单据编号">

          </el-table-column>

          <el-table-column prop="engineeringTime" min-width="100" label="单据日期">
          </el-table-column>

          <!-- <el-table-column prop="engineeringType" min-width="100" label="工程类型">
          </el-table-column> -->

          <el-table-column prop="engineeringName" min-width="80" label="工程名称">
          </el-table-column>

          <el-table-column prop="userName" min-width="80" label="申请人">
          </el-table-column>

          <el-table-column prop="userPeople" min-width="80" label="联系人">
          </el-table-column>

          <el-table-column prop="telphone" min-width="120" label="座机号码" show-overflow-tooltip>
          </el-table-column>

          <!-- <el-table-column prop="address" min-width="100" label="用水地址" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="userLevel" min-width="100" label="用户类型" show-overflow-tooltip>
          </el-table-column> -->

          <el-table-column label="操作" width="85" fixed="right">
            <!-- fixed="right" -->
            <template slot-scope="scope">
              <el-button type="text" @click.native="edit() " style="font-size:12px;">详情</el-button>
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
import insideHandleInfo from './insideHandleInfo'
import insideEngingEdit from './insideEngingEdit'
export default {
  name: "insideEnging",
  components: {
    insideHandleInfo,
    insideEngingEdit
  },
  data() {
    return {
      HandleVal:2,
      EditShow:false,
      IndexShow:true,
      tableData:[
        {
          engineeringState:'进行中',
          State:'施工安装',
          handleName:'王燕',
          engineeringType:'小管道工程',
          engineeringCode:"SS00001",
          engineeringTime:'2019/07/21',
          engineeringName:'-',
          userName:'焦文',
          userPeople:'丁文',
          telphone:'15566778899',
          address:'东深小区',
          userLevel:'-',
          useLevel:'紧急',
          waterTime:'-',
          waterNum:'1000',
        },
        {
          engineeringState:'进行中',
          State:'勘察设计',
          handleName:'周新宇',
          engineeringType:'维修',
          engineeringCode:"SS00001",
          engineeringTime:'2019/07/21',
          engineeringName:'-',
          userName:'焦文',
          userPeople:'丁文',
          telphone:'15566778899',
          address:'东深小区',
          userLevel:'-',
          useLevel:'紧急',
          waterTime:'-',
          waterNum:'1000',
        },
        {
          engineeringState:'已完结',
          State:'',
          handleName:'<无>',
          engineeringType:'大管道工程',
          engineeringCode:"SS00001",
          engineeringTime:'2019/07/21',
          engineeringName:'-',
          userName:'焦文',
          userPeople:'丁文',
          telphone:'15566778899',
          address:'东深小区',
          userLevel:'-',
          useLevel:'一般',
          waterTime:'-',
          waterNum:'1000',
        },
      ],
      crumbsData: { //面包屑
        titleList: [
          
          { title: '工程管理' },
          { title: '内部工程' },

          // { title: '工程中心', path: '/EngineeringCenter' },
          // { title: '内部工程', path: '/insideEngineeringRegistration' },
        ],
      },
      inforList: [
        { value: 1, label: '柜台' },
        { value: 2, label: '网厅' },
        { value: 3, label: '微厅' },
        { value: 4, label: 'APP' },
        { value: 5, label: '自助机' },
      ],
      processNodeList: [
        { value: '1', label: '全部' },
        { value: '2', label: '草稿' },
        { value: '3', label: '进行中' },
        { value: '3', label: '已办结' },
        { value: '3', label: '已废弃' },
      ],
      stateOptions:[
        { value: '1', label: '全部' },
        { value: '2', label: '草稿' },
        { value: '3', label: '进行中' },
        { value: '3', label: '已办结' },
        { value: '3', label: '已废弃' },
      ],
      EmergencyList:[
        { value: '1', label: '紧急' },
        { value: '2', label: '一般' },
      ],
      
      formData: {
        processNode: '1',
        inputContent: '',
        searchType: 1,
        information: 1,
        state:'1',
        Emergency:'1',
        dataList: [],
      },
      histroyData: {},
      handleShow: false,
    }
  },
  mounted() {
    this.init();
    // 接收insideHandleinfo的返回
    eventBus.$on('insideOperationReturn', (bool) => {
      this.handleShow = bool;
      this.IndexShow = true;
    });
    eventBus.$on('insideRegistrationReturn', (item) => {
      this.EditShow = item;
      this.IndexShow = true;
    });
  },
  methods: {
    
    
    operationReturn(){
      this.HandleVal = 2;
      this.EditShow = false;
      this.handleShow = false;
      this.IndexShow = true;
    },
    getChild(){

    },
    getChildHandle(v){
      this.HandleVal = v;

    },
    init() {
      this.histroyData = {
        areaId: "",
        endRow: 5,
        hasNextPage: false,
        hasPreviousPage: false,
        isFirstPage: true,
        isLastPage: true,
        list: [
          {},
          {},
          {},
          {}
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
    edit(){
      this.handleShow = true;
      this.IndexShow = false;

    },
    add(){
      this.EditShow = true;
      this.IndexShow = false;
    },
    search(){//查询
      console.log(this.formData);
    },
    closeDialog() { //关闭会话
      this.waterChoooseVisible = false
      this.init()
    },
    //弹出框
    submit(formName) {	//提交
      this.$refs.childWaterEditor.submit()
      // this.waterChoooseVisible = false;
    },
    indexMethod(index) {//获取表格序号
      //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      return (this.histroyData.pageSize - 20) * this.histroyData.pages + (index + 1);

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
  }
}
</script>

<style lang="scss">
.insideEnging,.insideEnging {
  
    width: 100%;
    height: 100%;
  .waterMeterInstallIndex{
    width: 100%;
    height: 100%;
  }
  
}
</style>
