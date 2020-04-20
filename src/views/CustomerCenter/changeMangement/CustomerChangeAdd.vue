<template>
  <div class="CustomerChangeAdd">
    <el-form size="mini" class="commonPartFormTwo commonPartForm " v-if="!id" :inline="true" :model="commonPartForm" label-width="130px" ref="ruleForm" :rules="rules">
      <el-form-item label="用户编号：" class="search-btn">
        <el-input class="read-only" v-model="userNo" placeholder="请输入户号" clearable></el-input>
        <el-button size="mini" class='searchBtn' @click="initUserNo()" icon="el-icon-search"></el-button>
      </el-form-item>

      <!-- <el-form-item label="单据编号：">
        <el-input class="read-only" disabled="disabled" v-model=" commonPartForm.billNo" placeholder="01003152"></el-input>
      </el-form-item>
      <el-form-item label="单据日期：">
        <el-input class="read-only" disabled="disabled" v-model=" commonPartForm.billDate" placeholder="2019年11月21日"></el-input>
      </el-form-item> -->
    </el-form>
    
    <el-tabs type="border-card" @tab-click="tabClick" class="tabsBlock" >
      <el-tab-pane label="用户资料变更">
        <span slot="label"><i class="el-icon-user"></i> 用户资料变更</span>
        <!-- :parentToChild="'3'"  :isEdit="isEdit" -->
        <userInfo :commonPart="commonPart" v-if="userInfoFormShow" ref="commonPart"></userInfo>
      
      </el-tab-pane>
      <el-tab-pane label="用水类型变更">
        <span slot="label"><i class="el-icon-user"></i> 用水类型变更</span>
        <!-- <typesOfWater :typesOfWaterData="typesOfWaterData"></typesOfWater> -->
        <el-form class="formBill" size="mini"  :inline="true" :model="typesOfWaterForm" label-width="130px" ref="ruleForm" :rules="rules">
          <el-form-item label="用水类型：">
            <el-cascader
              v-model="typesOfWaterForm.useWaterType"
              :options="waterTypeData"
              :show-all-levels="false"
              :props="props"
              @change="areaHandleChange">
          </el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="用水人口变更">
        <span slot="label"><i class="el-icon-user"></i> 用水人口变更</span>
        <wPopulation :wPopulationData='wPopulationData' :wPopDicData='wPopDicData' v-if="wPopulationShow" ref="wPopulation"></wPopulation>
      </el-tab-pane>
      <el-tab-pane label="优惠用水变更">
        <span slot="label"><i class="el-icon-user"></i> 优惠用水变更</span>
        <PreferentialWater :PreferentialWaterData='PreferentialWaterData' v-if="PreferentialWaterShow" ref="PreferentialWater"></PreferentialWater>
      </el-tab-pane>
      <el-tab-pane label="缴费方式变更">
        <span slot="label"><i class="el-icon-user"></i> 缴费方式变更</span>
        <PaymentM :PaymentMData='PaymentMData' :PMdicData="PMdicData" v-if="PaymentMShow" ref="PaymentM"></PaymentM>
      </el-tab-pane>
      <el-tab-pane label="开票资料变更">
        <span slot="label"><i class="el-icon-user"></i> 开票资料变更</span>
        <InvoiceInformation :InvoiceInformationData='InvoiceInformationData' :IIMdicData="IIMdicData" v-if="InvoiceInformationShow" ref="InvoiceInformation"></InvoiceInformation>
      </el-tab-pane>
      <el-tab-pane label="客户资料变更">
        <span slot="label"><i class="el-icon-user"></i> 客户资料变更</span>
        <customerManagementEdit :customerManagementEditData='customerManagementEditData' :CMEdicData="CMEdicData" v-if="customerManagementEditShow" ref="customerManagementEdit"></customerManagementEdit>
      </el-tab-pane>
      <!-- <el-tab-pane label="变更事项">
        <span slot="label"><i class="el-icon-user"></i> 变更事项</span>
      </el-tab-pane> -->
    </el-tabs>

    <legend class="legendColumn" v-if="id">变更事项</legend>
    <changeMatters class="" v-if="id && changeMattersShow" :changeMattersData='changeMattersData'></changeMatters>

    <legend class="legendColumn">上传附件</legend>
    <uploadFile ></uploadFile>
    
    <legend class="legendColumn">流程处理</legend>
    <procedure ></procedure>

  </div>
</template>
<script>
import userInfo from "@/components/userInfo/ctmInfo.vue"//用户资料变更
import typesOfWater from "./typesOfWater"//用水类型变更
import wPopulation from "./wPopulation"//用水类型变更
import PreferentialWater from "./PreferentialWater"//优惠用水变更
import PaymentM from "./PaymentM"//缴费方式变更
import InvoiceInformation from "./InvoiceInformation"//开票资料变更

import uploadFile from '@/components/uploadPic';//上传附件
import procedure from "@/components/procedure"//审批
import changeMatters from "@/components/changeMatters"//变更事项
import customerManagementEdit from '@/views/CustomerCenter/customerManagement/customerManagementEdit'//客户资料变更

export default {
  name: "CustomerChangeAdd",
  props:['id'],
  components: {
    uploadFile,
    customerManagementEdit,
    procedure,
    changeMatters,
    typesOfWater,
    wPopulation,
    userInfo,
    PreferentialWater,
    PaymentM,
    InvoiceInformation,
  },
  data() {
    return {
      rules:{

      },
      userChangeInfo:{},
      userNo:'',
      userInfoFormShow:false,
      //用水类型变更 
      typesOfWaterData:{
        useWaterType:'',
      },
      //用水人口变更 
      wPopulationShow:false,
      wPopulationData:[],
      wPopDicData:{
        idtData:[],
      },
      //优惠用水变更
      PreferentialWaterShow:false,
      PreferentialWaterData:{},
      //缴费方式变更 
      PaymentMShow:false,
      PaymentMData:{},
      PMdicData:{
        actData:[],
        bpwData:[],
      },
      //开票资料变更
      InvoiceInformationShow:false,
      InvoiceInformationData:{},
      IIMdicData:{
        bbtData:[],
        sdwData:[],
      },
      //客户资料变更
      customerManagementEditShow:false,
      customerManagementEditData:{},
      CMEdicData:{
        cttData:[],
        cdlData:[]
      },
      //变更事项
      changeMattersShow:false,
      changeMattersData:'',
      props: {//树结构格式
        value: 'id',
        label: 'name'
      },
      typesOfWaterForm:{
        useWaterType:'',
      },
      // 客户类型
      cttData: [],
      // 信用等级
      cdlData: [],
      // 账户类型
      actData: [],
      //发票类型
      bbtData: [],
      //证件类型
      idtData: [],
      //装表位置
      ctlData: [],
      //用水类型
      bwtData:[],
      mmtData: [],
      //水表用途
      cmcData: [],
      //用水对象
      uwsData: [],
      //投递方式
      sdwData: [],
      //缴费方式
      bpwData: [],
      //抄表周期
      rtpData: [],
      //用户状态
      cusData:[],
      //通讯运营商
      txsData:[],
      //水表类型
      wmtData:[],
      // 用水类型
      waterTypeData:[],
      commonPart: {
        parentToChild: '5',
        isEdit: false,
        ctmEdit:false,
        accEdit:false,
        userOpenInfo:{},
        userInfo:{},
        ctmInfo:{},
        accountInfo:{},
      },
      // isfromThen: false,
      commonPartForm:{},

      isEdit:false,
      tovalue:'1',
      EditVisible:'tab-1',
      tableData:[
        {
          bookName:"--",
          jihuaNum:'100',
          chaojianNum:'50',
          jihuaKNum:'100',
          kaiZedNum:'60',
          lastPeople:'焦文',
          lastTime:'2019/07/26',
          state:'未开账',
          leveled:'60%',
        },
      ],
      crumbsData: {  //面包屑
        titleList: [
          { title: '业务管理', path: '/MeterReadingCenter' },
          { title: '抄表开账',  method: () => { window.histroy.back() } },
          { title: '开账', method: () => { window.histroy.back() } },
          { title: '按册开账', method: () => { window.histroy.back() } }
        ],

      },
      isActive: false,  //控制高级查询内容的显示
      formData: {
        con: "",
        beginNumber:"全部",
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
    }
  },
  mounted() {
    this.init();
    this.getDictionary()
    this.getWaterType();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, '.CustomerChangeAdd .kl-table', ['.CustomerChangeAdd .toolbar', '.CustomerChangeAdd .block', '.CustomerChangeAdd bread-contain'])
  },
  methods: {
    init() {
      let _this = this
      let id = _this.id;
      let data = {}
      let params = {}
      if (!_this.id) {
        _this.commonPartForm.billNo = '';
        _this.commonPartForm.billDate = '';
        _this.commonPart.id = id;
        _this.commonPart.userOpenInfo = {};
        _this.commonPart.userInfo = {};
        _this.commonPart.ctmInfo = {};
        _this.commonPart.accountInfo = {};
        _this.commonPart.isEdit = false;

        _this.commonPart.desc1 = 1;
        // _this.commonPartFormShow = true;
        _this.PaymentMShow = true;
        _this.InvoiceInformationShow = true;
        _this.customerManagementEditShow = true;
        _this.changeMattersShow = true;
        _this.PreferentialWaterShow = true;
        _this.wPopulationShow = true;
        _this.userInfoFormShow = true;
        console.log(_this.commonPart);
        return
      } else {
        data = {
          id,
        }
        params = {
          busicode: "ChangeUserQuery",
          data,
        }
        console.log(_this.commonPart);
      }
      _this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.commonPart.userInfo = res.userInfo;
        _this.commonPart.accountInfo = res.accountInfo;
        _this.commonPart.ctmInfo = res.ctmInfo;
        _this.commonPart.msInfo = res.msInfo;
        _this.commonPart.person = res.person;
        _this.wPopulationData = res.person;
        //用水类型变更 
        // _this.typesOfWaterForm.useWaterType = res.userInfo.useWaterType;
        _this.$set(_this.typesOfWaterForm,'useWaterType',res.userInfo.useWaterType);
        _this.PreferentialWaterData = res.userInfo;
        _this.PaymentMData = res.accountInfo;
        _this.InvoiceInformationData = res.accountInfo;
        _this.customerManagementEditData = res.ctmInfo;
        _this.userChangeInfo = res.userChangeInfo;
        _this.changeMattersData = res.userChangeInfo.changeItems;
        if(_this.commonPart.ctmInfo.ctmNo !== '' && _this.commonPart.ctmInfo.ctmNo !== null && _this.commonPart.ctmInfo.ctmNo !== undefined){
          _this.commonPart.isEdit = true;
        }else{
          _this.commonPart.isEdit = false;
        }
        _this.PaymentMShow = true;
        _this.InvoiceInformationShow = true;
        _this.customerManagementEditShow = true;
        _this.changeMattersShow = true;
        _this.PreferentialWaterShow = true;
        _this.wPopulationShow = true;
        _this.userInfoFormShow = true;
      }).catch(res=>{
        _this.commonPart.userInfo = {};
        _this.commonPart.accountInfo = {};
        _this.commonPart.ctmInfo = {};
        _this.commonPart.msInfo = {};
        _this.commonPart.isEdit = false;
        _this.PaymentMShow = true;
        _this.InvoiceInformationShow = true;
        _this.customerManagementEditShow = true;
        _this.changeMattersShow = true;
        _this.PreferentialWaterShow = true;
        _this.wPopulationShow = true;
        _this.userInfoFormShow = true;
      })
    },
    tabClick(tab, event){
      this.$set(this.crumbsData.titleList,"3",{title:tab.label,method:()=>{window.histroy.back()}});

      if(tab.label == '按册开账'){
        this.EditVisible = true
      }else{
        this.EditVisible = false
      }
    },
    demand() {  //查询
      // this.tableQuery.page = 1
      // this.tableQuery.pageCount = 20
      this.initUserNo()
    },
    test(res){
      let _this = this
      console.log(_this.commonPart);
      console.log(res); 
    },
    initUserNo(){//用户编号查询
      let _this = this;
      if(_this.userNo == ''){
        _this.$message({
          message: '用户编号不能为空。',
          type: 'warning'
        });
        return
      }
      _this.PaymentMShow = false;
      _this.InvoiceInformationShow = false;
      _this.customerManagementEditShow = false;
      _this.changeMattersShow = false;
      _this.PreferentialWaterShow = false;
      _this.wPopulationShow = false;
      _this.userInfoFormShow = false;
      let data = {
        userNo: _this.userNo,
      };
      let params = {
        "busicode": "UserSelect",
        data,
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        // _this.isfromThen = true
        _this.test(res)
        _this.commonPart.userInfo = res.userInfo;
        _this.commonPart.accountInfo = res.accountInfo;
        _this.commonPart.ctmInfo = res.ctmInfo;
        _this.commonPart.msInfo = res.msInfo;
        _this.commonPart.person = res.person;
        // _this.$set(_this.commonPart,'userInfo',res.userInfo);
        // _this.$set(_this.commonPart,'accountInfo',res.accountInfo);
        // _this.$set(_this.commonPart,'ctmInfo',res.ctmInfo);
        // _this.$set(_this.commonPart,'msInfo',res.msInfo);
        // _this.$set(_this.commonPart,'person',res.person);
        console.log(_this.commonPart);
        _this.wPopulationData = res.person;
        //用水类型变更 
        // _this.typesOfWaterForm.useWaterType = res.userInfo.useWaterType;
        _this.$set(_this.typesOfWaterForm,'useWaterType',res.userInfo.useWaterType);
        _this.PreferentialWaterData = res.userInfo;
        _this.PaymentMData = res.accountInfo;
        _this.InvoiceInformationData = res.accountInfo;
        _this.customerManagementEditData = res.ctmInfo;
        // _this.changeMattersData = res.userChangeInfo.changeItems;
        if(_this.commonPart.ctmInfo.ctmNo !== '' && _this.commonPart.ctmInfo.ctmNo !== null && _this.commonPart.ctmInfo.ctmNo !== undefined){
          _this.commonPart.isEdit = true;
        }else{
          _this.commonPart.isEdit = false;
        }
        _this.PaymentMShow = true;
        _this.InvoiceInformationShow = true;
        _this.customerManagementEditShow = true;
        _this.changeMattersShow = true;
        _this.PreferentialWaterShow = true;
        _this.wPopulationShow = true;
        _this.userInfoFormShow = true;
      }).catch(res=>{
        _this.commonPart.userInfo = {};
        _this.commonPart.accountInfo = {};
        _this.commonPart.ctmInfo = {};
        _this.commonPart.msInfo = {};
        _this.commonPart.isEdit = false;
        _this.PaymentMShow = true;
        _this.InvoiceInformationShow = true;
        _this.customerManagementEditShow = true;
        _this.changeMattersShow = true;
        _this.PreferentialWaterShow = true;
        _this.wPopulationShow = true;
        _this.userInfoFormShow = true;
      })
    },
    //  数据字典（查询框）
    getDictionary() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": 'CTT,CDL,ACT,IDT,CTL,MMT,UWS,BBT,SDW,BPW,RTP,CMC,CUS,TXS,WMT,BWT'
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.$set(_this, 'cttData', res['CTT'])
        _this.$set(_this, 'cdlData', res['CDL'])
        _this.$set(_this, 'actData', res['ACT'])
        _this.$set(_this, 'idtData', res['IDT'])
        _this.$set(_this, 'ctlData', res['CTL'])
        _this.$set(_this, 'mmtData', res['MMT'])
        _this.$set(_this, 'cmcData', res['CMC'])
        _this.$set(_this, 'uwsData', res['UWS'])
        _this.$set(_this, 'bbtData', res['BBT'])
        _this.$set(_this, 'sdwData', res['SDW'])
        _this.$set(_this, 'bpwData', res['BPW'])
        _this.$set(_this, 'rtpData', res['RTP'])
        _this.$set(_this, 'cusData', res['CUS'])
        _this.$set(_this, 'txsData', res['TXS'])
        _this.$set(_this, 'wmtData', res['WMT'])
        _this.$set(_this, 'bwtData', res['BWT'])

        _this.$set(_this.PMdicData,'actData',res['ACT'])
        _this.$set(_this.PMdicData,'bpwData',res['BPW'])
        _this.$set(_this.CMEdicData,'cttData',res['CTT'])
        _this.$set(_this.CMEdicData,'cdlData',res['CDL'])
        _this.$set(_this.IIMdicData,'bbtData',res['BBT'])
        _this.$set(_this.IIMdicData,'sdwData',res['SDW'])
        _this.$set(_this.wPopDicData,'idtData',res['IDT'])
      })
    },
    //用水类型
    getWaterType(){
      let _this = this
      let params = {
        "busicode": "WaterTypeTree",
        "data": {},
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        // _this.$set(_this, 'bwtData', res['BWT'])
        let data = _this.getArr(res.children)
        _this.waterTypeData = data;
      })
    },
    //树结构数据处理
    getArr(data){
      for (let i = 0; i< data.length; i++) {
        if(data[i].isParent === false) {
          delete data[i].children
        } else {
          this.getArr(data[i].children)
        }
      }
      return data
    },
    //用水类型下拉框值发生改变
    areaHandleChange(value){
      let length = value.length;
      this.formData.userInfo.adminArea = value[length - 1]
    },
    indexMethod(index) {//获取表格序号
      //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      return (this.histroyData.pageSize - 20) * this.histroyData.pages + (index + 1);

    },
    closeDialog() { //关闭会话
      this.waterAddVisible = false;
      this.backfillVisible = false;
      this.init()
    },
    //弹出框
    submit() {	//提交
      let data = {
        userInfo:{},
        accountInfo:{},
        ctmInfo:{},
        person:[],
      };
      if (this.id !=='') {
        data.userChangeInfo = this.userChangeInfo;
      }
      data.userInfo = this.$refs.commonPart.submit()
      data.userInfo.useWaterType = this.typesOfWaterForm.useWaterType;
      data.person = this.$refs.wPopulation.submit();
      data.userInfo = this.$refs.PreferentialWater.submit()
      data.accountInfo = this.$refs.InvoiceInformation.submit()
      data.accountInfo = this.$refs.PaymentM.submit();
      data.ctmInfo = this.$refs.customerManagementEdit.submit()
      return data

      // this.waterAddVisible = false;
    },
    // 添加
    add() {

    },
    // 综合查询
    ComprehensiveQuery() {
      this.waterAddVisible = true;
    },
    // 编辑
    edit() {
      this.backfillVisible = true;
    }
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
.CustomerChangeAdd {
  width:100% ;
  height: 100%;
  overflow-y: auto;
  .el-card{
    width: 100%;
    height: 140px;
    margin: 5px 0px;
    .el-card__header{
      font-weight: 700;
      padding: 5px 20px;
      border-bottom: 1px solid #EBEEF5;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      font-size: 14px;
    }
    .item {
      margin-bottom: 5px;
      font-size: 12px
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
  }

  .tabsBlock{    
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    margin-top: 10px;
    .el-tabs__header{
      margin: 0 0 5px;
    }
    .el-tabs--border-card{
      border: 1px solid #eaf4ff;
    }
    .el-tabs__content{
      padding: 5px;
      height: calc(100% - 60px);
      .idCard{
        border: 0px;
      }
      .el-tab-pane{
        height: 100%;
      }

    }
  }
  .search-btn {
    .el-form-item__content {
      .el-input {
        width: 70% !important;
      }
    }
  }
}
</style>
